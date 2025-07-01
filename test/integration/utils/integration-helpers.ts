import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import { TestWorkspace } from '@test/utils/test-workspace';
import type { AIProvider } from '@/types/ai-provider';
import type { Issue } from '@/types/issue';
import type { ExecutionResult } from '@/types/execution';
import type { Configuration } from '@/types/config';

export interface IntegrationTestContext {
  workspace: TestWorkspace;
  providers: Map<string, MockProvider>;
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
    this.shouldFail = options.shouldFail || false;
    this.failAfter = options.failAfter || Infinity;
    this.responseDelay = options.responseDelay || 0;
    this.callCount = new Map();
    this.calls = [];
  }

  async execute(prompt: string, options: any = {}): Promise<string> {
    const methodKey = 'execute';
    const count = (this.callCount.get(methodKey) || 0) + 1;
    this.callCount.set(methodKey, count);
    this.calls.push({ method: methodKey, args: [prompt, options] });

    if (this.responseDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.responseDelay));
    }

    if (this.shouldFail || count > this.failAfter) {
      throw new Error(`${this.name} provider failed: Rate limit exceeded`);
    }

    const defaultResponse = `Executed by ${this.name}: ${prompt.slice(0, 50)}...`;
    return this.responses.get(prompt) || defaultResponse;
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
    return this.callCount.get(method) || 0;
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

  const capturedLogs: string[] = [];

  return {
    workspace,
    providers,
    capturedLogs
  };
}

export async function cleanupIntegrationContext(context: IntegrationTestContext): Promise<void> {
  await context.workspace.cleanup();
  context.providers.clear();
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
      cwd: cwd || process.cwd(),
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
        exitCode: code || 0
      });
    });

    proc.on('error', reject);
  });
}

export async function createTestIssue(workspace: TestWorkspace, issue: Partial<Issue>): Promise<string> {
  const issueContent = `# ${issue.title || 'Test Issue'}

## Requirement
${issue.requirement || 'Test requirement'}

## Acceptance Criteria
${(issue.acceptanceCriteria || ['Test criteria']).map(c => `- [ ] ${c}`).join('\n')}
`;

  const issuePath = path.join(workspace.rootPath, 'issues', `${issue.id || 'test-issue'}.md`);
  await fs.mkdir(path.dirname(issuePath), { recursive: true });
  await fs.writeFile(issuePath, issueContent);
  return issuePath;
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
    responseDelay: behavior.responseTime || 0,
    failAfter: behavior.rateLimitAfter || Infinity,
    responses: behavior.responses ? new Map(Object.entries(behavior.responses)) : undefined
  });

  if (behavior.failureRate && behavior.failureRate > 0) {
    const originalExecute = provider.execute.bind(provider);
    provider.execute = async function(prompt: string, options: any) {
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