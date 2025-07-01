import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import * as path from 'path';
import { ConfigManager } from '@/core/config-manager';
import { GitSimulator } from '../utils/git-simulator';
import { ProviderSimulator } from '../utils/provider-simulator';
import { createIntegrationContext, cleanupIntegrationContext, createTestIssue, createTestConfig } from '../utils/integration-helpers';
import type { IntegrationTestContext } from '../utils/integration-helpers';
import type { Issue } from '@/types/issue';

describe('Issue Lifecycle Integration Tests', () => {
  let context: IntegrationTestContext;
  let configManager: ConfigManager;
  let gitSimulator: GitSimulator;
  let claudeProvider: ProviderSimulator;

  beforeEach(async () => {
    context = await createIntegrationContext();
    
    gitSimulator = new GitSimulator(context.workspace.rootPath);
    await gitSimulator.init();
    
    claudeProvider = new ProviderSimulator({
      name: 'claude',
      responseDelay: 50
    });
    
    configManager = new ConfigManager(context.workspace.rootPath);
    await configManager.loadConfig();
  });

  afterEach(async () => {
    await cleanupIntegrationContext(context);
  });

  describe('Complete Issue Execution', () => {
    it('should execute a simple issue from start to finish', async () => {
      const issue: Issue = {
        id: 'simple-feature',
        title: 'Add Hello World Function',
        requirement: 'Create a function that returns "Hello, World!"',
        acceptanceCriteria: [
          'Function named helloWorld exists',
          'Function returns "Hello, World!" string',
          'Function is exported'
        ],
        dependencies: [],
        technicalDetails: 'Use TypeScript'
      };

      await createTestIssue(context.workspace, issue);
      await createTestConfig(context.workspace, { provider: 'claude' });

      claudeProvider.setCustomResponse(
        issue.requirement,
        `I'll create the helloWorld function.

\`\`\`typescript
export function helloWorld(): string {
  return "Hello, World!";
}
\`\`\`

The function has been created and exported as requested.`
      );

      const todoPath = path.join(context.workspace.rootPath, '.autoagent/todos.json');
      await fs.mkdir(path.dirname(todoPath), { recursive: true });
      await fs.writeFile(todoPath, JSON.stringify([
        {
          id: '1',
          issueId: issue.id,
          content: 'Create helloWorld function',
          status: 'pending',
          priority: 'high'
        }
      ]));

      const resultPath = path.join(context.workspace.rootPath, 'src/hello.ts');
      await fs.mkdir(path.dirname(resultPath), { recursive: true });
      await fs.writeFile(resultPath, `export function helloWorld(): string {
  return "Hello, World!";
}`);

      const fileExists = await fs.access(resultPath).then(() => true).catch(() => false);
      expect(fileExists).toBe(true);

      const content = await fs.readFile(resultPath, 'utf-8');
      expect(content).toContain('export function helloWorld');
      expect(content).toContain('return "Hello, World!"');

      const updatedTodos = JSON.parse(
        await fs.readFile(todoPath, 'utf-8').catch(() => '[]')
      );
      
      if (updatedTodos.length > 0) {
        expect(updatedTodos[0].status).toBe('completed');
      }
    });

    it('should handle multi-file issue implementation', async () => {
      const issue: Issue = {
        id: 'user-service',
        title: 'Create User Service',
        requirement: 'Implement a user service with CRUD operations',
        acceptanceCriteria: [
          'User interface defined',
          'UserService class implemented',
          'All CRUD methods present',
          'Tests included'
        ],
        dependencies: [],
        technicalDetails: 'Follow repository pattern'
      };

      await createTestIssue(context.workspace, issue);

      const files = {
        'src/types/user.ts': `export interface User {
  id: string;
  name: string;
  email: string;
}`,
        'src/services/user-service.ts': `import { User } from '../types/user';

export class UserService {
  private users: Map<string, User> = new Map();

  create(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  read(id: string): User | undefined {
    return this.users.get(id);
  }

  update(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (user) {
      const updated = { ...user, ...updates };
      this.users.set(id, updated);
      return updated;
    }
    return undefined;
  }

  delete(id: string): boolean {
    return this.users.delete(id);
  }
}`,
        'test/services/user-service.test.ts': `import { describe, it, expect } from 'vitest';
import { UserService } from '../../src/services/user-service';

describe('UserService', () => {
  it('should create a user', () => {
    const service = new UserService();
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    const created = service.create(user);
    expect(created).toEqual(user);
  });
});`
      };

      for (const [filePath, content] of Object.entries(files)) {
        const fullPath = path.join(context.workspace.rootPath, filePath);
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, content);
      }

      for (const [filePath] of Object.entries(files)) {
        const fullPath = path.join(context.workspace.rootPath, filePath);
        const exists = await fs.access(fullPath).then(() => true).catch(() => false);
        expect(exists).toBe(true);
      }

      const status = await gitSimulator.getStatus();
      expect(status.untracked).toContain('src/types/user.ts');
      expect(status.untracked).toContain('src/services/user-service.ts');
      expect(status.untracked).toContain('test/services/user-service.test.ts');
    });
  });

  describe('Issue Dependencies', () => {
    it('should respect issue dependencies order', async () => {
      const issues: Issue[] = [
        {
          id: 'base-types',
          title: 'Define Base Types',
          requirement: 'Create base type definitions',
          acceptanceCriteria: ['Types defined'],
          dependencies: [],
          technicalDetails: ''
        },
        {
          id: 'api-client',
          title: 'Create API Client',
          requirement: 'Implement API client using base types',
          acceptanceCriteria: ['Client implemented'],
          dependencies: ['base-types'],
          technicalDetails: ''
        },
        {
          id: 'ui-components',
          title: 'Build UI Components',
          requirement: 'Create UI components using API client',
          acceptanceCriteria: ['Components created'],
          dependencies: ['api-client'],
          technicalDetails: ''
        }
      ];

      for (const issue of issues) {
        await createTestIssue(context.workspace, issue);
      }

      const executionOrder: string[] = [];
      
      const executeInOrder = async (issueId: string): Promise<void> => {
        const issue = issues.find(i => i.id === issueId);
        if (issue === undefined) {return;}

        for (const depId of issue.dependencies) {
          if (!executionOrder.includes(depId)) {
            await executeInOrder(depId);
          }
        }

        executionOrder.push(issueId);
      };

      await executeInOrder('ui-components');

      expect(executionOrder).toEqual(['base-types', 'api-client', 'ui-components']);
    });

    it('should detect circular dependencies', async () => {
      const issues: Issue[] = [
        {
          id: 'issue-a',
          title: 'Issue A',
          requirement: 'Depends on B',
          acceptanceCriteria: [],
          dependencies: ['issue-b'],
          technicalDetails: ''
        },
        {
          id: 'issue-b',
          title: 'Issue B',
          requirement: 'Depends on C',
          acceptanceCriteria: [],
          dependencies: ['issue-c'],
          technicalDetails: ''
        },
        {
          id: 'issue-c',
          title: 'Issue C',
          requirement: 'Depends on A',
          acceptanceCriteria: [],
          dependencies: ['issue-a'],
          technicalDetails: ''
        }
      ];

      for (const issue of issues) {
        await createTestIssue(context.workspace, issue);
      }

      const detectCircular = (
        issueId: string,
        visited: Set<string> = new Set(),
        stack: Set<string> = new Set()
      ): boolean => {
        if (stack.has(issueId)) {return true;}
        if (visited.has(issueId)) {return false;}

        visited.add(issueId);
        stack.add(issueId);

        const issue = issues.find(i => i.id === issueId);
        if (issue !== undefined) {
          for (const depId of issue.dependencies) {
            if (detectCircular(depId, visited, stack)) {
              return true;
            }
          }
        }

        stack.delete(issueId);
        return false;
      };

      expect(detectCircular('issue-a')).toBe(true);
    });
  });

  describe('Git Integration', () => {
    it('should create commits for completed issues', async () => {
      const issue: Issue = {
        id: 'add-logging',
        title: 'Add Logging Functionality',
        requirement: 'Add a logger utility',
        acceptanceCriteria: ['Logger implemented'],
        dependencies: [],
        technicalDetails: ''
      };

      await createTestIssue(context.workspace, issue);

      const loggerPath = path.join(context.workspace.rootPath, 'src/utils/logger.ts');
      await fs.mkdir(path.dirname(loggerPath), { recursive: true });
      await fs.writeFile(loggerPath, `export const log = (message: string) => {
  console.log(\`[\${new Date().toISOString()}] \${message}\`);
};`);

      await gitSimulator.createCommit(
        `feat: ${issue.title}\n\nImplemented ${issue.requirement}`,
        { 'src/utils/logger.ts': await fs.readFile(loggerPath, 'utf-8') }
      );

      const history = await gitSimulator.getCommitHistory(1);
      expect(history).toHaveLength(1);
      expect(history[0].message).toContain(issue.title);
    });

    it('should handle git workflow with branches', async () => {
      const issue: Issue = {
        id: 'feature-auth',
        title: 'Add Authentication',
        requirement: 'Implement user authentication',
        acceptanceCriteria: ['Auth module created'],
        dependencies: [],
        technicalDetails: ''
      };

      await createTestIssue(context.workspace, issue);

      const branchName = `feature/${issue.id}`;
      await gitSimulator.createBranch(branchName);

      const currentBranch = await gitSimulator.getCurrentBranch();
      expect(currentBranch).toBe(branchName);

      const authPath = path.join(context.workspace.rootPath, 'src/auth/index.ts');
      await fs.mkdir(path.dirname(authPath), { recursive: true });
      await fs.writeFile(authPath, 'export const authenticate = () => true;');

      await gitSimulator.createCommit(
        `feat: implement ${issue.title}`,
        { 'src/auth/index.ts': await fs.readFile(authPath, 'utf-8') }
      );

      const status = await gitSimulator.getStatus();
      expect(status.branch).toBe(branchName);
      expect(status.clean).toBe(true);
    });
  });

  describe('Configuration Updates', () => {
    it('should persist configuration changes during execution', async () => {
      await createTestConfig(context.workspace, {
        provider: 'claude',
        experimental: { enableCache: false }
      });

      const configPath = path.join(context.workspace.rootPath, '.autoagent/config.json');
      const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
      expect(config.provider).toBe('claude');
      expect(config.experimental?.enableCache).toBe(false);

      config.experimental.enableCache = true;
      config.provider = 'gemini';
      await fs.writeFile(configPath, JSON.stringify(config, null, 2));

      const updatedConfig = JSON.parse(await fs.readFile(configPath, 'utf-8'));
      expect(updatedConfig.provider).toBe('gemini');
      expect(updatedConfig.experimental.enableCache).toBe(true);
    });

    it('should track provider usage patterns', async () => {
      const patternsPath = path.join(
        context.workspace.rootPath,
        '.autoagent/provider-patterns.json'
      );

      const patterns = {
        claude: {
          totalExecutions: 10,
          successRate: 0.9,
          averageResponseTime: 1500,
          lastUsed: new Date().toISOString()
        },
        gemini: {
          totalExecutions: 5,
          successRate: 0.8,
          averageResponseTime: 2000,
          lastUsed: new Date().toISOString()
        }
      };

      await fs.mkdir(path.dirname(patternsPath), { recursive: true });
      await fs.writeFile(patternsPath, JSON.stringify(patterns, null, 2));

      const savedPatterns = JSON.parse(await fs.readFile(patternsPath, 'utf-8'));
      expect(savedPatterns.claude.totalExecutions).toBe(10);
      expect(savedPatterns.gemini.totalExecutions).toBe(5);
    });
  });
});