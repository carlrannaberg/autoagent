import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { EventEmitter } from 'events';
import { ExecutionResult } from '@/types';
import { InMemoryConfigManager } from '../../helpers/test-doubles/in-memory-config-manager';
import { InMemoryFileManager } from '../../helpers/test-doubles/in-memory-file-manager';
import { InMemoryProviderLearning } from '../../helpers/test-doubles/in-memory-provider-learning';
import { TestProvider } from '../../helpers/test-doubles/test-provider';
import { GitSimulator } from '../../helpers/test-doubles/git-simulator';
import * as gitUtils from '@/utils/git';

// Keep provider mocks as they're external dependencies
const { createProvider, getFirstAvailableProvider, mockFiles, mockFileContents } = vi.hoisted(() => {
  return {
    createProvider: vi.fn(),
    getFirstAvailableProvider: vi.fn(),
    mockFiles: new Map<string, string[]>(),
    mockFileContents: new Map<string, string>()
  };
});

vi.mock('fs/promises', () => ({
  default: {
    readdir: vi.fn().mockImplementation((dir: string) => {
      return Promise.resolve(mockFiles.get(dir) ?? []);
    }),
    readFile: vi.fn().mockImplementation((path: string) => {
      return Promise.resolve(Buffer.from(mockFileContents.get(path) ?? 'Template content'));
    })
  },
  readdir: vi.fn().mockImplementation((dir: string) => {
    return Promise.resolve(mockFiles.get(dir) ?? []);
  }),
  readFile: vi.fn().mockImplementation((path: string) => {
    return Promise.resolve(Buffer.from(mockFileContents.get(path) ?? 'Template content'));
  })
}));

// Replace the actual implementations with our test doubles
vi.mock('@/core/config-manager', () => ({
  ConfigManager: vi.fn(() => new InMemoryConfigManager())
}));

vi.mock('@/utils/file-manager', () => ({
  FileManager: vi.fn(() => new InMemoryFileManager('/test'))
}));

vi.mock('@/core/provider-learning', () => ({
  ProviderLearning: vi.fn(() => new InMemoryProviderLearning())
}));

vi.mock('@/providers', () => ({
  createProvider,
  getFirstAvailableProvider
}));

vi.mock('child_process');

describe('AutonomousAgent', () => {
  let agent: AutonomousAgent;
  let configManager: InMemoryConfigManager;
  let fileManager: InMemoryFileManager;
  let providerLearning: InMemoryProviderLearning;
  let gitSimulator: GitSimulator;
  let testProviders: Map<string, TestProvider>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFiles.clear();
    mockFileContents.clear();
    
    // Remove all listeners to prevent memory leak warnings
    process.removeAllListeners('SIGINT');
    process.removeAllListeners('SIGTERM');
    
    // Create test doubles
    configManager = new InMemoryConfigManager();
    fileManager = new InMemoryFileManager('/test');
    providerLearning = new InMemoryProviderLearning();
    gitSimulator = new GitSimulator();
    testProviders = new Map();

    // Set up test providers
    const claudeProvider = new TestProvider({ name: 'claude' });
    const geminiProvider = new TestProvider({ name: 'gemini' });
    testProviders.set('claude', claudeProvider);
    testProviders.set('gemini', geminiProvider);

    // Mock git utilities with simulator
    vi.spyOn(gitUtils, 'checkGitAvailable').mockImplementation(() => gitSimulator.checkGitAvailable());
    vi.spyOn(gitUtils, 'isGitRepository').mockImplementation(() => gitSimulator.isGitRepository());
    vi.spyOn(gitUtils, 'hasChangesToCommit').mockImplementation(() => gitSimulator.hasChangesToCommit());
    vi.spyOn(gitUtils, 'stageAllChanges').mockImplementation(() => gitSimulator.stageAllChanges());
    vi.spyOn(gitUtils, 'createCommit').mockImplementation((msg) => gitSimulator.createCommit(msg));
    vi.spyOn(gitUtils, 'getCurrentCommitHash').mockImplementation(() => gitSimulator.getCurrentCommitHash());
    vi.spyOn(gitUtils, 'getUncommittedChanges').mockImplementation(() => gitSimulator.getUncommittedChanges());
    vi.spyOn(gitUtils, 'revertToCommit').mockImplementation((hash) => gitSimulator.revertToCommit(hash));

    // Mock the path module to ensure consistent paths
    vi.doMock('path', () => ({
      join: (...args: string[]): string => args.join('/'),
      dirname: (p: string): string => p.substring(0, p.lastIndexOf('/')),
      basename: (p: string): string => p.substring(p.lastIndexOf('/') + 1),
      extname: (p: string): string => {
        const lastDot = p.lastIndexOf('.');
        return lastDot > 0 ? p.substring(lastDot) : '';
      },
      isAbsolute: (p: string): boolean => p.startsWith('/')
    }));

    // Mock provider creation
    createProvider.mockImplementation((name: string) => {
      // Ensure name is one of the valid provider names
      const validName = ['claude', 'gemini', 'mock'].includes(name) ? name : 'mock';
      const provider = testProviders.get(validName) || new TestProvider({ name: validName });
      
      // Add the prompt-based execute method for createIssue/bootstrap
      if (!provider.execute.length || provider.execute.length === 2) {
        // Monkey-patch the prompt-based execute for createIssue
        const originalExecute = provider.execute.bind(provider);
        provider.execute = function(...args: any[]): any {
          if (args.length === 2 && typeof args[0] === 'string' && !args[0].includes('/')) {
            // This is a prompt-based call (createIssue/bootstrap)
            const _prompt = args[0];
            const response = this.responses?.get('create') ?? this.defaultResponse ?? 'Created successfully';
            return Promise.resolve({ output: response });
          }
          // Regular file-based execute
          return originalExecute(...args);
        }.bind(provider);
      }
      
      return provider;
    });

    getFirstAvailableProvider.mockImplementation((preferredProviders?: string[]) => {
      const order = preferredProviders || ['claude', 'gemini', 'mock'];
      for (const name of order) {
        const provider = testProviders.get(name);
        if (provider != null && provider.checkAvailability()) {
          return provider;
        }
      }
      return Promise.resolve(null);
    });

    // Set up file system structure for issues and plans
    // Use the correct workspace path
    const workspace = '/test';
    mockFiles.set(`${workspace}/issues`, ['1-test-issue.md']);
    mockFiles.set(`${workspace}/plans`, ['1-test-plan.md']);
    
    // Add the issue and plan content
    mockFileContents.set(`${workspace}/issues/1-test-issue.md`, '# Test Issue\n\nTest content');
    mockFileContents.set(`${workspace}/plans/1-test-plan.md`, '# Test Plan\n\nTest plan content');
    
    // Add provider instruction files
    mockFileContents.set(`${workspace}/CLAUDE.md`, 'Claude instructions');
    mockFileContents.set(`${workspace}/GEMINI.md`, 'Gemini instructions');
    mockFileContents.set(`${workspace}/AGENT.md`, 'Agent instructions');

    agent = new AutonomousAgent({ workspace: '/test', signal: true }); // Use signal: true to prevent signal handler setup
    
    // Replace internal instances with our test doubles
    (agent as any).configManager = configManager;
    (agent as any).fileManager = fileManager;
    (agent as any).providerLearning = providerLearning;
  });

  afterEach(() => {
    // Clean up any event listeners
    if (agent) {
      agent.removeAllListeners();
    }
    process.removeAllListeners('SIGINT');
    process.removeAllListeners('SIGTERM');
  });

  describe('constructor', () => {
    it('should create an instance with default config', () => {
      expect(agent).toBeInstanceOf(EventEmitter);
      expect(agent).toBeInstanceOf(AutonomousAgent);
    });

    it('should accept custom config', () => {
      const customConfig = {
        providers: ['gemini'],
        maxTokens: 50000
      };
      
      const customConfigManager = new InMemoryConfigManager(customConfig);
      const customAgent = new AutonomousAgent({ workspace: '/test', signal: true });
      (customAgent as any).configManager = customConfigManager;
      
      expect(customConfigManager.getConfig().providers).toEqual(['gemini']);
      expect(customConfigManager.getConfig().maxTokens).toBe(50000);
      
      customAgent.removeAllListeners();
    });
  });

  describe('initialize', () => {
    it('should initialize successfully', async () => {
      await agent.initialize();
      // The initialize method doesn't return a value, so we just check it doesn't throw
      expect(true).toBe(true);
    });

    it('should handle missing git', async () => {
      gitSimulator.setGitAvailable(false);
      await agent.initialize();
      expect(true).toBe(true);
    });

    it('should handle non-git repository', async () => {
      gitSimulator.setIsRepository(false);
      await agent.initialize();
      expect(true).toBe(true);
    });
  });

  describe('executeIssue', () => {
    beforeEach(async () => {
      await agent.initialize();
      fileManager.addTodo(1, 'Test Issue', false);
      
      // Issue and plan files are already set up in main beforeEach
    });

    it('should execute an issue successfully', async () => {
      const claudeProvider = testProviders.get('claude')!;
      claudeProvider.setResponse('test task', 'Issue completed successfully');

      const result = await agent.executeIssue(1);
      
      expect(result.success).toBe(true);
      expect(result.issueNumber).toBe(1);
      expect(result.provider).toBe('claude');
      expect(claudeProvider.getExecutionCount()).toBeGreaterThan(0);
    });

    it('should handle provider failure with fallback', async () => {
      const claudeProvider = testProviders.get('claude')!;
      const geminiProvider = testProviders.get('gemini')!;
      
      claudeProvider.failAfter = 0; // Fail immediately
      geminiProvider.setResponse('test task', 'Fallback response');

      // Set up provider mocks to return gemini when claude fails
      createProvider.mockImplementation((name: string) => {
        if (name === 'gemini') {return geminiProvider;}
        if (name === 'claude') {return claudeProvider;}
        return null;
      });
      
      getFirstAvailableProvider.mockResolvedValueOnce(geminiProvider);

      const result = await agent.executeIssue(1);
      
      expect(result.success).toBe(true);
      expect(result.provider).toBe('gemini');
    });

    it('should emit events during execution', async () => {
      const events: string[] = [];
      agent.on('execution-start', () => events.push('start'));
      agent.on('execution-complete', () => events.push('complete'));

      await agent.executeIssue(1);

      expect(events).toContain('start');
      expect(events).toContain('complete');
    });
  });

  describe('executeAll', () => {
    beforeEach(async () => {
      await agent.initialize();
      fileManager.addTodo(1, 'Issue 1', false);
      fileManager.addTodo(2, 'Issue 2', false);
      fileManager.addTodo(3, 'Issue 3', false);
      
      // Add more issue and plan files to the mock file system
      mockFiles.set('/test/issues', ['1-test-issue.md', '2-test-issue.md', '3-test-issue.md']);
      mockFiles.set('/test/plans', ['1-test-plan.md', '2-test-plan.md', '3-test-plan.md']);
      mockFileContents.set('/test/issues/1-test-issue.md', '# Issue 1\n\nContent');
      mockFileContents.set('/test/issues/2-test-issue.md', '# Issue 2\n\nContent');
      mockFileContents.set('/test/issues/3-test-issue.md', '# Issue 3\n\nContent');
      mockFileContents.set('/test/plans/1-test-plan.md', '# Plan 1\n\nPlan content');
      mockFileContents.set('/test/plans/2-test-plan.md', '# Plan 2\n\nPlan content');
      mockFileContents.set('/test/plans/3-test-plan.md', '# Plan 3\n\nPlan content');
    });

    it('should execute all pending issues', async () => {
      const results = await agent.executeAll();
      
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(r => r.success)).toBe(true);
    });
  });

  describe('executeNext', () => {
    beforeEach(async () => {
      await agent.initialize();
      fileManager.addTodo(1, 'Issue 1', false);
      fileManager.addTodo(2, 'Issue 2', false);
      
      // Add issue and plan files for executeNext tests
      mockFiles.set('/test/issues', ['1-test-issue.md', '2-test-issue.md']);
      mockFiles.set('/test/plans', ['1-test-plan.md', '2-test-plan.md']);
      mockFileContents.set('/test/issues/1-test-issue.md', '# Issue 1\n\nContent');
      mockFileContents.set('/test/issues/2-test-issue.md', '# Issue 2\n\nContent');
      mockFileContents.set('/test/plans/1-test-plan.md', '# Plan 1\n\nPlan content');
      mockFileContents.set('/test/plans/2-test-plan.md', '# Plan 2\n\nPlan content');
    });

    it('should execute the next pending issue', async () => {
      const result = await agent.executeNext();
      
      expect(result.success).toBe(true);
      expect(result.issueNumber).toBe(1);
    });

    it('should return error when no pending issues', async () => {
      // Mark all as completed
      await fileManager.updateTodo(1, true);
      await fileManager.updateTodo(2, true);

      const result = await agent.executeNext();
      expect(result.success).toBe(false);
      expect(result.error).toContain('No pending issues');
    });
  });

  describe('createIssue', () => {
    it('should create a new issue', async () => {
      const claudeProvider = testProviders.get('claude')!;
      claudeProvider.setResponse(
        'Create a new feature for user authentication', 
        '# Issue 2: User Authentication\n\n## Requirements\nImplement user authentication'
      );

      const issueNumber = await agent.createIssue('User Authentication');

      expect(issueNumber).toBe(2);
    });

    it('should handle issue creation failure', async () => {
      const claudeProvider = testProviders.get('claude')!;
      claudeProvider.failAfter = 0;

      await expect(agent.createIssue('Failed Issue')).rejects.toThrow();
    });
  });

  describe('getStatus', () => {
    beforeEach(async () => {
      await agent.initialize();
      fileManager.addTodo(1, 'Issue 1', false);
      fileManager.addTodo(2, 'Issue 2', true);
      fileManager.addTodo(3, 'Issue 3', false);
    });

    it('should return current status', async () => {
      const status = await agent.getStatus();
      
      expect(status.total).toBe(3);
      expect(status.completed).toBe(1);
      expect(status.pending).toBe(2);
    });
  });

  describe('rollback', () => {
    it('should rollback when enabled', async () => {
      const rollbackAgent = new AutonomousAgent({ 
        workspace: '/test', 
        signal: true,
        enableRollback: true 
      });
      
      (rollbackAgent as any).configManager = configManager;
      (rollbackAgent as any).fileManager = fileManager;
      (rollbackAgent as any).providerLearning = providerLearning;

      gitSimulator.setUncommittedChanges('file1.ts\nfile2.ts');

      const executionResult: ExecutionResult = {
        success: false,
        issueNumber: 1,
        provider: 'claude',
        error: 'Test error',
        rollbackData: {
          hasGitChanges: true,
          commitHash: 'previous-commit'
        }
      };

      const result = await rollbackAgent.rollback(executionResult);
      expect(result).toBe(true);
      
      rollbackAgent.removeAllListeners();
    });

    it('should handle rollback when disabled', async () => {
      const executionResult: ExecutionResult = {
        success: false,
        issueNumber: 1,
        provider: 'claude',
        error: 'Test error'
      };

      const result = await agent.rollback(executionResult);
      expect(result).toBe(false);
    });
  });

  describe('bootstrap', () => {
    it('should bootstrap from master plan', async () => {
      mockFileContents.set('/test/master-plan.md', `
# Master Plan

## Issues to Create
1. Setup project structure
2. Implement authentication
3. Add user management
      `);

      const claudeProvider = testProviders.get('claude')!;
      claudeProvider.setResponse('Create issue from master plan', '# Issue 1: Setup\n\n## Requirements\nSetup project');

      await agent.bootstrap('/test/master-plan.md');
      
      // Bootstrap creates issues, so we just verify it doesn't throw
      expect(true).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle provider creation failure', async () => {
      createProvider.mockImplementation(() => {
        throw new Error('Provider creation failed');
      });

      const result = await agent.executeIssue(1);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Provider creation failed');
    });

    it('should handle concurrent execution attempt', async () => {
      // Start first execution
      const promise1 = agent.executeIssue(1);
      
      // Try to start second execution
      await expect(agent.executeIssue(2)).rejects.toThrow('Agent is already executing');
      
      // Wait for first to complete
      await promise1;
    });
  });
});