import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import { TestWorkspace } from '../../utils/test-workspace';
import type { AIProvider } from '@/types/ai-provider';
import type { Task, TaskCreateInput } from 'simple-task-master';
import type { TaskContent } from '@/types/stm-types';
import type { Configuration } from '@/types/config';
import { InMemorySTMManager } from '../test-doubles/in-memory-stm-manager';

export interface IntegrationTestContext {
  workspace: TestWorkspace;
  providers: Map<string, MockProvider>;
  stmManager: InMemorySTMManager;
  capturedLogs: string[];
}

export class MockProvider implements AIProvider {
  name: string;
  private responses: Map<string, string>;
  private callCount: Map<string, number>;
  private shouldFail: boolean;
  private failAfter: number;
  private responseDelay: number;
  public calls: Array<{ method: string; args: any[] }>;

  constructor(name: string, options: {
    responses?: Map<string, string>;
    shouldFail?: boolean;
    failAfter?: number;
    responseDelay?: number;
  } = {}) {
    this.name = name;
    this.responses = options.responses || new Map();
    this.shouldFail = options.shouldFail ?? false;
    this.failAfter = options.failAfter ?? Infinity;
    this.responseDelay = options.responseDelay ?? 0;
    this.callCount = new Map();
    this.calls = [];
  }

  async execute(prompt: string, options: any = {}): Promise<string> {
    const methodKey = 'execute';
    const count = (this.callCount.get(methodKey) ?? 0) + 1;
    this.callCount.set(methodKey, count);
    this.calls.push({ method: methodKey, args: [prompt, options] });

    if (this.responseDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.responseDelay));
    }

    if (this.shouldFail || count > this.failAfter) {
      throw new Error(`${this.name} provider failed: Rate limit exceeded`);
    }

    const defaultResponse = `Executed by ${this.name}: ${prompt.slice(0, 50)}...`;
    return this.responses.get(prompt) ?? defaultResponse;
  }

  setResponse(prompt: string, response: string): void {
    this.responses.set(prompt, response);
  }

  simulateRateLimit(): void {
    this.shouldFail = true;
  }

  resetRateLimit(): void {
    this.shouldFail = false;
  }

  getCallCount(method: string = 'execute'): number {
    return this.callCount.get(method) ?? 0;
  }

  reset(): void {
    this.callCount.clear();
    this.calls = [];
    this.shouldFail = false;
  }
}

export async function createIntegrationContext(): Promise<IntegrationTestContext> {
  const workspace = new TestWorkspace();
  await workspace.setup();

  const providers = new Map<string, MockProvider>([
    ['claude', new MockProvider('claude')],
    ['gemini', new MockProvider('gemini')]
  ]);

  const stmManager = new InMemorySTMManager();
  const capturedLogs: string[] = [];

  return {
    workspace,
    providers,
    stmManager,
    capturedLogs
  };
}

export async function cleanupIntegrationContext(context: IntegrationTestContext): Promise<void> {
  await context.workspace.cleanup();
  context.providers.clear();
  context.stmManager.reset();
  context.capturedLogs.length = 0;
}

export async function runAutoAgent(args: string[], cwd?: string): Promise<{
  stdout: string;
  stderr: string;
  exitCode: number;
}> {
  return new Promise((resolve, reject) => {
    const nodePath = process.execPath;
    const scriptPath = path.join(__dirname, '../../../bin/autoagent');
    
    const env = {
      ...process.env,
      NODE_ENV: 'test',
      AUTOAGENT_TEST_MODE: 'true'
    };

    const proc = spawn(nodePath, [scriptPath, ...args], {
      cwd: cwd ?? process.cwd(),
      env
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      resolve({
        stdout,
        stderr,
        exitCode: code ?? 0
      });
    });

    proc.on('error', reject);
  });
}

/**
 * Creates a test task in the STM manager.
 */
export async function createTestTask(
  stmManager: InMemorySTMManager, 
  title: string, 
  content: TaskContent,
  options: { id?: number } = {}
): Promise<{ taskId: string; task: Task }> {
  // If specific ID is requested, set it
  if (options.id) {
    stmManager.setNextId(options.id);
  }

  const taskId = await stmManager.createTask(title, content);
  const task = await stmManager.getTask(taskId);
  
  if (!task) {
    throw new Error(`Failed to create test task: ${title}`);
  }

  return { taskId, task };
}

/**
 * Creates a test task using TaskCreateInput format.
 */
export async function createTestTaskFromInput(
  stmManager: InMemorySTMManager,
  input: TaskCreateInput
): Promise<{ taskId: string; task: Task }> {
  // Extract TaskContent from the markdown content if needed
  const content: TaskContent = {
    description: extractSectionFromMarkdown(input.content, 'Why & what') || 'Default task description',
    technicalDetails: extractSectionFromMarkdown(input.content, 'How') || 'Default technical details',
    implementationPlan: 'Default implementation plan',
    acceptanceCriteria: extractAcceptanceCriteria(input.content) || ['Task is complete'],
    tags: input.tags?.filter(tag => tag !== 'autoagent')
  };

  return createTestTask(stmManager, input.title, content);
}

/**
 * Helper to extract sections from STM markdown content.
 */
function extractSectionFromMarkdown(content: string | undefined, sectionName: string): string | undefined {
  if (!content) {return undefined;}
  
  const lines = content.split('\n');
  let inSection = false;
  const sectionContent: string[] = [];
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (inSection) {break;} // End of current section
      inSection = line.substring(3).trim() === sectionName;
    } else if (inSection && !line.startsWith('###')) {
      sectionContent.push(line);
    }
  }
  
  return sectionContent.length > 0 ? sectionContent.join('\n').trim() : undefined;
}

/**
 * Helper to extract acceptance criteria from markdown content.
 */
function extractAcceptanceCriteria(content: string | undefined): string[] | undefined {
  if (!content) {return undefined;}
  
  const lines = content.split('\n');
  let inCriteriaSection = false;
  const criteria: string[] = [];
  
  for (const line of lines) {
    if (line.startsWith('### Acceptance Criteria')) {
      inCriteriaSection = true;
    } else if (line.startsWith('##') || line.startsWith('###')) {
      inCriteriaSection = false;
    } else if (inCriteriaSection && line.trim().startsWith('- [ ]')) {
      criteria.push(line.trim().substring(5).trim());
    }
  }
  
  return criteria.length > 0 ? criteria : undefined;
}

export async function createTestConfig(workspace: TestWorkspace, config: Partial<Configuration>): Promise<void> {
  const configPath = path.join(workspace.rootPath, '.autoagent/config.json');
  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, JSON.stringify({
    version: '1.0.0',
    provider: 'claude',
    ...config
  }, null, 2));
}

export async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error(`Condition not met within ${timeout}ms`);
}

export function createProviderWithBehavior(name: string, behavior: {
  failureRate?: number;
  responseTime?: number;
  rateLimitAfter?: number;
  responses?: Record<string, string>;
}): MockProvider {
  const provider = new MockProvider(name, {
    responseDelay: behavior.responseTime ?? 0,
    failAfter: behavior.rateLimitAfter ?? Infinity,
    responses: behavior.responses ? new Map(Object.entries(behavior.responses)) : undefined
  });

  if (behavior.failureRate !== undefined && behavior.failureRate > 0) {
    const originalExecute = provider.execute.bind(provider);
    provider.execute = async function(prompt: string, options: any): Promise<string> {
      if (Math.random() < behavior.failureRate!) {
        throw new Error(`${name} provider failed: Random failure`);
      }
      return originalExecute(prompt, options);
    };
  }

  return provider;
}

export async function simulateFileSystemError(workspace: TestWorkspace, operation: 'read' | 'write' | 'permission'): Promise<void> {
  const testFile = path.join(workspace.rootPath, 'test-file.txt');
  
  switch (operation) {
    case 'permission':
      await fs.writeFile(testFile, 'test');
      await fs.chmod(testFile, 0o000);
      break;
    case 'read':
      break;
    case 'write':
      await fs.mkdir(testFile, { recursive: true });
      break;
  }
}

export async function measureExecutionTime<T>(fn: () => Promise<T>): Promise<{ result: T; duration: number }> {
  const startTime = process.hrtime.bigint();
  const result = await fn();
  const endTime = process.hrtime.bigint();
  const duration = Number(endTime - startTime) / 1_000_000;
  
  return { result, duration };
}

/**
 * STM-specific cleanup utilities for tests.
 */
export const stmTestUtils = {
  /**
   * Reset STM manager to clean state.
   */
  async resetSTMManager(stmManager: InMemorySTMManager): Promise<void> {
    stmManager.reset();
  },

  /**
   * Create multiple test tasks for collection testing.
   */
  async createMultipleTasks(
    stmManager: InMemorySTMManager,
    count: number,
    baseContent?: Partial<TaskContent>
  ): Promise<Task[]> {
    const tasks: Task[] = [];
    
    for (let i = 1; i <= count; i++) {
      const content: TaskContent = {
        description: `Test task ${i} description`,
        technicalDetails: `Technical details for task ${i}`,
        implementationPlan: `Implementation plan for task ${i}`,
        acceptanceCriteria: [`Task ${i} is complete`],
        ...baseContent
      };
      
      const { task } = await createTestTask(stmManager, `Test Task ${i}`, content, { id: i });
      tasks.push(task);
    }
    
    return tasks;
  },

  /**
   * Verify task content matches expected structure.
   */
  async verifyTaskContent(stmManager: InMemorySTMManager, taskId: string, expected: Partial<TaskContent>): Promise<boolean> {
    const sections = await stmManager.getTaskSections(taskId);
    
    if (expected.description && !sections.description?.includes(expected.description)) {
      return false;
    }
    
    if (expected.technicalDetails && !sections.details?.includes(expected.technicalDetails)) {
      return false;
    }
    
    if (expected.testingStrategy && !sections.validation?.includes(expected.testingStrategy)) {
      return false;
    }
    
    return true;
  },

  /**
   * Setup STM test environment with initialization check.
   */
  async setupSTMEnvironment(stmManager: InMemorySTMManager): Promise<void> {
    // Reset to clean state
    stmManager.reset();
    
    // Verify initialization works
    if (!stmManager.isInitialized()) {
      // Force initialization by calling a method that triggers it
      await stmManager.listTasks();
    }
    
    if (!stmManager.isInitialized()) {
      throw new Error('Failed to initialize STM manager for testing');
    }
  },

  /**
   * Cleanup STM environment after tests.
   */
  async cleanupSTMEnvironment(stmManager: InMemorySTMManager): Promise<void> {
    stmManager.reset();
  },

  /**
   * Create test task with specific status.
   */
  async createTaskWithStatus(
    stmManager: InMemorySTMManager,
    title: string,
    status: 'pending' | 'in-progress' | 'done',
    content?: Partial<TaskContent>
  ): Promise<{ taskId: string; task: Task }> {
    const taskContent: TaskContent = {
      description: `Task with ${status} status`,
      technicalDetails: 'Standard technical details',
      implementationPlan: 'Standard implementation plan',
      acceptanceCriteria: ['Task completion criteria'],
      ...content
    };
    
    const { taskId, task } = await createTestTask(stmManager, title, taskContent);
    
    if (status !== 'pending') {
      await stmManager.updateTaskStatus(taskId, status);
    }
    
    return { taskId, task: await stmManager.getTask(taskId) || task };
  },

  /**
   * Create a task hierarchy with dependencies for testing relationships.
   */
  async createTaskHierarchy(stmManager: InMemorySTMManager): Promise<Task[]> {
    const tasks: Task[] = [];
    
    // Root task (no dependencies)
    const { task: rootTask } = await this.createTaskWithStatus(
      stmManager,
      'Root Task: Project Setup',
      'done',
      {
        description: 'Initialize project structure and configuration',
        technicalDetails: 'Setup package.json, TypeScript config, and basic structure',
        acceptanceCriteria: ['Project is initialized', 'All tools are configured']
      }
    );
    tasks.push(rootTask);

    // Child tasks (depend on root)
    const { task: childTask1 } = await this.createTaskWithStatus(
      stmManager,
      'Child Task 1: Add Authentication',
      'in-progress',
      {
        description: 'Implement user authentication system',
        technicalDetails: 'Use OAuth2 and JWT for secure authentication',
        acceptanceCriteria: ['Login works', 'Sessions are managed', 'Security is verified']
      }
    );
    tasks.push(childTask1);

    const { task: childTask2 } = await this.createTaskWithStatus(
      stmManager,
      'Child Task 2: Add Database',
      'pending',
      {
        description: 'Setup database connection and models',
        technicalDetails: 'Use PostgreSQL with TypeORM for data persistence',
        acceptanceCriteria: ['Database connected', 'Models defined', 'Migrations work']
      }
    );
    tasks.push(childTask2);

    // Grandchild task (depends on both children)
    const { task: grandchildTask } = await this.createTaskWithStatus(
      stmManager,
      'Final Task: Integration Testing',
      'pending',
      {
        description: 'Test complete application flow',
        technicalDetails: 'End-to-end testing of authentication and database integration',
        acceptanceCriteria: ['All flows tested', 'Performance validated', 'Security audited']
      }
    );
    tasks.push(grandchildTask);

    return tasks;
  },

  /**
   * Validate STM task structure and content integrity.
   */
  async validateTaskStructure(stmManager: InMemorySTMManager, taskId: string): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    try {
      const task = await stmManager.getTask(taskId);
      if (!task) {
        errors.push('Task not found');
        return { isValid: false, errors, warnings };
      }

      // Validate required fields
      if (!task.title) {errors.push('Task title is missing');}
      if (!task.status) {errors.push('Task status is missing');}
      if (!task.created) {errors.push('Task created timestamp is missing');}
      if (!task.updated) {errors.push('Task updated timestamp is missing');}
      if (!Array.isArray(task.tags)) {errors.push('Task tags must be an array');}
      if (!Array.isArray(task.dependencies)) {errors.push('Task dependencies must be an array');}
      
      // Validate sections
      const sections = await stmManager.getTaskSections(taskId);
      if (!sections.description) {warnings.push('Task description section is empty');}
      if (!sections.details) {warnings.push('Task details section is empty');}
      
      // Validate acceptance criteria
      const acceptanceCriteria = await stmManager.getAcceptanceCriteria(taskId);
      if (!acceptanceCriteria || acceptanceCriteria.length === 0) {
        warnings.push('Task has no acceptance criteria');
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings
      };
    } catch (error) {
      errors.push(`Validation error: ${error instanceof Error ? error.message : String(error)}`);
      return { isValid: false, errors, warnings };
    }
  },

  /**
   * Create tasks with realistic test data for comprehensive testing.
   */
  async createRealisticTestSuite(stmManager: InMemorySTMManager): Promise<{
    tasks: Task[];
    summary: { total: number; byStatus: Record<string, number>; byTag: Record<string, number> };
  }> {
    const taskDefinitions = [
      {
        title: 'Setup CI/CD Pipeline',
        status: 'done' as const,
        content: {
          description: 'Configure automated testing and deployment pipeline',
          technicalDetails: 'Use GitHub Actions for CI/CD with automated testing and deployment',
          implementationPlan: '1. Setup GitHub Actions\n2. Configure test automation\n3. Setup deployment pipeline',
          acceptanceCriteria: ['Tests run on PR', 'Deployment is automated', 'Pipeline is secure'],
          tags: ['devops', 'automation', 'ci-cd']
        }
      },
      {
        title: 'Implement User Management',
        status: 'in-progress' as const,
        content: {
          description: 'Create user registration, authentication, and profile management',
          technicalDetails: 'OAuth2 with JWT tokens, user profiles stored in PostgreSQL',
          implementationPlan: '1. User registration\n2. Login/logout\n3. Profile management\n4. Password reset',
          acceptanceCriteria: ['Users can register', 'Login works', 'Profiles are editable', 'Password reset works'],
          tags: ['authentication', 'users', 'security']
        }
      },
      {
        title: 'Add Real-time Notifications',
        status: 'pending' as const,
        content: {
          description: 'Implement real-time push notifications for important events',
          technicalDetails: 'WebSocket connection with fallback to Server-Sent Events',
          implementationPlan: '1. WebSocket server\n2. Client connection\n3. Event handlers\n4. Fallback mechanism',
          acceptanceCriteria: ['Real-time updates work', 'Fallback is reliable', 'Performance is good'],
          tags: ['real-time', 'websocket', 'notifications']
        }
      },
      {
        title: 'Performance Optimization',
        status: 'pending' as const,
        content: {
          description: 'Optimize application performance and reduce load times',
          technicalDetails: 'Code splitting, lazy loading, caching, and bundle optimization',
          implementationPlan: '1. Analyze bundle size\n2. Implement code splitting\n3. Add caching\n4. Optimize images',
          acceptanceCriteria: ['Load time < 2s', 'Bundle size reduced', 'Caching works'],
          tags: ['performance', 'optimization', 'caching']
        }
      },
      {
        title: 'Security Audit',
        status: 'pending' as const,
        content: {
          description: 'Comprehensive security review and vulnerability assessment',
          technicalDetails: 'Automated security scanning, manual review, and penetration testing',
          implementationPlan: '1. Automated scanning\n2. Manual code review\n3. Penetration testing\n4. Fix issues',
          acceptanceCriteria: ['No critical vulnerabilities', 'Security standards met', 'Documentation updated'],
          tags: ['security', 'audit', 'compliance']
        }
      }
    ];

    const tasks: Task[] = [];
    const statusCounts: Record<string, number> = {};
    const tagCounts: Record<string, number> = {};

    for (const def of taskDefinitions) {
      const { task } = await this.createTaskWithStatus(stmManager, def.title, def.status, def.content);
      tasks.push(task);

      // Count by status
      statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;

      // Count by tags
      task.tags.forEach(tag => {
        if (tag !== 'autoagent') { // Skip the auto-added tag
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      });
    }

    return {
      tasks,
      summary: {
        total: tasks.length,
        byStatus: statusCounts,
        byTag: tagCounts
      }
    };
  }
};