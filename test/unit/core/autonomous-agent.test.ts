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
import * as fs from 'fs/promises';

// Keep provider mocks as they're external dependencies
const { createProvider, getFirstAvailableProvider } = vi.hoisted(() => {
  return {
    createProvider: vi.fn(),
    getFirstAvailableProvider: vi.fn()
  };
});

// Hoist execMock to avoid initialization errors
const execMock = vi.hoisted(() => vi.fn());

const mockFiles = new Map<string, string[]>();
const mockFileContents = new Map<string, string>();

vi.mock('fs/promises');

// Replace the actual implementations with our test doubles
vi.mock('@/core/config-manager', () => ({
  ConfigManager: vi.fn(() => new InMemoryConfigManager())
}));

vi.mock('@/utils/file-manager', () => ({
  FileManager: vi.fn(() => new InMemoryFileManager('/test', mockFiles))
}));

vi.mock('@/core/provider-learning', () => ({
  ProviderLearning: vi.fn(() => new InMemoryProviderLearning())
}));

vi.mock('@/providers', () => ({
  createProvider,
  getFirstAvailableProvider
}));

// Mock exec from child_process
vi.mock('child_process', () => ({
  exec: execMock
}));

// Mock promisify to return a promisified version of our mock
vi.mock('util', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    promisify: (fn: any): any => {
      if (fn === execMock) {
        // Return a promisified version of execMock that calls the original mock
        return (cmd: string) => {
          return new Promise((resolve, reject) => {
            // Call the original execMock with a callback
            execMock(cmd, (err: any, stdout: string, stderr: string) => {
              if (err !== null && err !== undefined) {
                reject(err);
              } else {
                resolve({ stdout, stderr });
              }
            });
          });
        };
      }
      return (actual as any).promisify(fn);
    }
  };
});

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
    
    // Set up fs mocks
    vi.mocked(fs.readdir).mockImplementation((dir: string) => {
      const files = mockFiles.get(dir);
      if (!files) {
        return Promise.resolve([]);
      }
      return Promise.resolve(files as any);
    });
    
    vi.mocked(fs.readFile).mockImplementation((path: string) => {
      const content = mockFileContents.get(path);
      if (content === null || content === undefined || content === '') {
        return Promise.reject(new Error(`ENOENT: no such file or directory, open '${path}'`));
      }
      return Promise.resolve(Buffer.from(content));
    });
    
    // Remove all listeners to prevent memory leak warnings
    process.removeAllListeners('SIGINT');
    process.removeAllListeners('SIGTERM');
    
    // Create test doubles
    configManager = new InMemoryConfigManager();
    fileManager = new InMemoryFileManager('/test', mockFiles);
    providerLearning = new InMemoryProviderLearning();
    gitSimulator = new GitSimulator();
    testProviders = new Map();

    // Set up test providers
    const claudeProvider = new TestProvider({ name: 'claude' });
    const geminiProvider = new TestProvider({ name: 'gemini' });
    testProviders.set('claude', claudeProvider);
    testProviders.set('gemini', geminiProvider);
    
    // Reset provider states
    claudeProvider.failAfter = Infinity;
    geminiProvider.failAfter = Infinity;

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

    // Reset and re-implement provider creation mock
    createProvider.mockReset();
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
            // Using the prompt to create the issue response
            const response = this.responses?.get('create') ?? this.defaultResponse ?? 'Created successfully';
            return Promise.resolve({ output: response });
          }
          // Regular file-based execute
          return originalExecute(...args);
        }.bind(provider);
      }
      
      return provider;
    });

    getFirstAvailableProvider.mockReset();
    getFirstAvailableProvider.mockImplementation((preferredProviders?: string[]) => {
      const order = preferredProviders || ['claude', 'gemini', 'mock'];
      for (const name of order) {
        const provider = testProviders.get(name);
        if (provider !== null && provider !== undefined && provider.checkAvailability()) {
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
    
    // Clear todos and add the default one
    fileManager.clearTodos();
    fileManager.addTodo(1, 'Test Issue', false);
    
    // Sync the fileManager with the mock filesystem
    fileManager.setIssueFiles(['1-test-issue.md']);

    // Create agent with workspace config
    agent = new AutonomousAgent({ workspace: '/test', signal: true }); // Use signal: true to prevent signal handler setup
    
    // Replace internal instances with our test doubles
    (agent as any).configManager = configManager;
    (agent as any).fileManager = fileManager;
    (agent as any).providerLearning = providerLearning;
    
    // Ensure the config has the correct workspace
    (agent as any).config.workspace = '/test';
  });

  afterEach(() => {
    // Clean up any event listeners
    if (agent !== null && agent !== undefined) {
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
      // Todo and files are already set up in main beforeEach
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
      
      // Make claude fail immediately
      claudeProvider.reset();
      claudeProvider.failAfter = -1; // This means always fail
      claudeProvider.setAvailability(false); // Make it unavailable
      
      // Ensure gemini is available and will succeed
      geminiProvider.reset();
      geminiProvider.setResponse('test task', 'Fallback response');
      geminiProvider.setAvailability(true);

      const result = await agent.executeIssue(1);
      
      expect(result.success).toBe(true);
      expect(result.provider).toBe('gemini');
    });

    it('should emit events during execution', async () => {
      const events: string[] = [];
      agent.on('execution-start', () => events.push('start'));
      agent.on('execution-end', () => events.push('complete'));

      await agent.executeIssue(1);

      expect(events).toContain('start');
      expect(events).toContain('complete');
    });
  });

  describe('executeAll', () => {
    beforeEach(async () => {
      await agent.initialize();
      
      // Clear existing todos and add new ones
      fileManager.clearTodos();
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
      
      // Clear existing todos and add new ones
      fileManager.clearTodos();
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
      fileManager.updateTodoStatus(1, true);
      fileManager.updateTodoStatus(2, true);

      const result = await agent.executeNext();
      expect(result.success).toBe(false);
      expect(result.error).toContain('No pending issues');
    });
  });

  describe('createIssue', () => {
    beforeEach(() => {
      // Add issue 2 files to mock for the created issue
      mockFiles.set('/test/issues', ['1-test-issue.md', '2-user-authentication.md']);
      mockFileContents.set('/test/issues/2-user-authentication.md', '# Issue 2: User Authentication\n\n## Requirements\nImplement user authentication');
    });
    
    it('should create a new issue', async () => {
      const claudeProvider = testProviders.get('claude')!;
      claudeProvider.setResponse(
        'create', 
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
      
      // Clear existing todos and add new ones
      fileManager.clearTodos();
      fileManager.addTodo(1, 'Issue 1', false);
      fileManager.addTodo(2, 'Issue 2', true);
      fileManager.addTodo(3, 'Issue 3', false);
    });

    it('should return current status', async () => {
      const status = await agent.getStatus();
      
      expect(status.totalIssues).toBe(3);
      expect(status.completedIssues).toBe(1);
      expect(status.pendingIssues).toBe(2);
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
      (rollbackAgent as any).config.workspace = '/test';
      (rollbackAgent as any).config.enableRollback = true;

      gitSimulator.setUncommittedChanges('file1.ts\nfile2.ts');
      
      // Create a commit in the simulator so we can rollback to it
      gitSimulator.stageAllChanges();
      const commitResult = gitSimulator.createCommit('Previous commit');

      const executionResult: ExecutionResult = {
        success: false,
        issueNumber: 1,
        provider: 'claude',
        error: 'Test error',
        rollbackData: {
          gitCommit: commitResult.commitHash!,
          fileBackups: new Map()
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
    beforeEach(async () => {
      await agent.initialize();
      
      // Add template files needed for bootstrap
      mockFiles.set('/test/templates', ['issue.md', 'plan.md']);
      mockFileContents.set('/test/templates/issue.md', '# Issue Template\n\n## Requirements\n\n## Acceptance Criteria');
      mockFileContents.set('/test/templates/plan.md', '# Plan Template\n\n## Implementation Plan\n\n### Phase 1');
    });
    
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

    describe('issue numbering', () => {
      // Helper function to create test issues in mock filesystem
      const createTestIssue = (issueNumber: number, title: string = `test-issue-${issueNumber}`): void => {
        const filename = `${issueNumber}-${title}.md`;
        const existingFiles = mockFiles.get('/test/issues') || [];
        if (!existingFiles.includes(filename)) {
          mockFiles.set('/test/issues', [...existingFiles, filename]);
          mockFileContents.set(`/test/issues/${filename}`, `# Issue ${issueNumber}: ${title}\n\nTest content`);
        }
      };

      it('should create issue #1 in empty project', async () => {
        // Clear the issues directory
        mockFiles.set('/test/issues', []);
        
        // Update fileManager to sync with empty filesystem
        fileManager.setIssueFiles([]);
        fileManager.clearTodos();
        
        // Mock file manager to track issue creation
        const createIssueSpy = vi.spyOn(fileManager, 'createIssue');

        mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest plan content');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        await agent.bootstrap('/test/master-plan.md');

        // Verify that issue #1 was created
        expect(createIssueSpy).toHaveBeenCalled();
        const firstCall = createIssueSpy.mock.calls[0];
        expect(firstCall[0]).toBe(1); // First argument is issue number
      });

      it('should create next sequential issue number with existing issues', async () => {
        // Create existing issues 1, 2, 3
        createTestIssue(1);
        createTestIssue(2);
        createTestIssue(3);
        
        // Update fileManager to sync with filesystem
        fileManager.setIssueFiles(['1-test-issue-1.md', '2-test-issue-2.md', '3-test-issue-3.md']);
        
        const createIssueSpy = vi.spyOn(fileManager, 'createIssue');

        mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest plan content');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        await agent.bootstrap('/test/master-plan.md');

        // Verify that issue #4 was created
        expect(createIssueSpy).toHaveBeenCalled();
        const firstCall = createIssueSpy.mock.calls[0];
        expect(firstCall[0]).toBe(4); // Should be 4, not 1
      });

      it('should handle gaps in issue numbering', async () => {
        // Create issues with gaps: 1, 3, 7
        createTestIssue(1);
        createTestIssue(3);
        createTestIssue(7);
        
        // Update fileManager to sync with filesystem
        fileManager.setIssueFiles(['1-test-issue-1.md', '3-test-issue-3.md', '7-test-issue-7.md']);
        
        const createIssueSpy = vi.spyOn(fileManager, 'createIssue');

        mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest plan content');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        await agent.bootstrap('/test/master-plan.md');

        // Verify that issue #8 was created (max + 1)
        expect(createIssueSpy).toHaveBeenCalled();
        const firstCall = createIssueSpy.mock.calls[0];
        expect(firstCall[0]).toBe(8);
      });

      it('should not overwrite existing issues', async () => {
        // Create existing issue #1
        createTestIssue(1, 'existing-issue');
        
        // Update fileManager to sync with filesystem
        fileManager.setIssueFiles(['1-existing-issue.md']);
        
        // Store original content
        const originalContent = mockFileContents.get('/test/issues/1-existing-issue.md');
        
        // Mock file manager to track issue creation
        const createIssueSpy = vi.spyOn(fileManager, 'createIssue');
        
        mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest plan content');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        await agent.bootstrap('/test/master-plan.md');

        // Verify that issue #1 was not overwritten
        const afterContent = mockFileContents.get('/test/issues/1-existing-issue.md');
        expect(afterContent).toBe(originalContent);
        
        // Verify new issue was created with number 2
        expect(createIssueSpy).toHaveBeenCalled();
        const firstCall = createIssueSpy.mock.calls[0];
        expect(firstCall[0]).toBe(2);
      });

      it('should handle malformed issue filenames gracefully', async () => {
        // Create issues with various malformed names
        const issueFiles = [
          '1-valid-issue.md',
          'not-a-number-issue.md',      // No number prefix
          'abc-invalid.md',             // Letters instead of number
          '2.md',                       // Missing dash
          '-3-no-number.md',            // Leading dash
          '4-valid-issue.md',
          '  5-spaces.md',              // Leading spaces
          '6--double-dash.md'           // Double dash
        ];
        mockFiles.set('/test/issues', issueFiles);
        
        // Update fileManager to sync with filesystem
        fileManager.setIssueFiles(issueFiles);
        fileManager.clearTodos();
        fileManager.addTodo(1, 'Valid Issue', false);
        fileManager.addTodo(4, 'Valid Issue', false);
        
        // Add content for valid issues only
        mockFileContents.set('/test/issues/1-valid-issue.md', '# Issue 1\n\nContent');
        mockFileContents.set('/test/issues/4-valid-issue.md', '# Issue 4\n\nContent');
        
        const createIssueSpy = vi.spyOn(fileManager, 'createIssue');

        mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest plan content');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        await agent.bootstrap('/test/master-plan.md');

        // Should create issue #7 (max issue number found is 6 from '6--double-dash.md')
        expect(createIssueSpy).toHaveBeenCalled();
        const firstCall = createIssueSpy.mock.calls[0];
        expect(firstCall[0]).toBe(7);
      });

      it('should create matching issue and plan filenames during bootstrap', async () => {
        // Clear issues
        mockFiles.set('/test/issues', []);
        mockFiles.set('/test/plans', []);
        fileManager.setIssueFiles([]);
        fileManager.clearTodos();
        
        const createIssueSpy = vi.spyOn(fileManager, 'createIssue');
        const createPlanSpy = vi.spyOn(fileManager, 'createPlan');

        mockFileContents.set('/test/master-plan.md', '# Test Bootstrap Plan\n\n## Goals\n- Test feature');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        await agent.bootstrap('/test/master-plan.md');

        // Verify both issue and plan were created
        expect(createIssueSpy).toHaveBeenCalled();
        expect(createPlanSpy).toHaveBeenCalled();
        
        // Get the arguments passed to both methods
        const issueCall = createIssueSpy.mock.calls[0];
        const planCall = createPlanSpy.mock.calls[0];
        
        // Verify same issue number and title were used
        expect(planCall[0]).toBe(issueCall[0]); // Same issue number
        expect(planCall[2]).toBe(issueCall[1]); // Same title
      });

      it('should generate consistent slugs for issue and plan files', async () => {
        // Test slug generation consistency
        const testTitles = [
          'Simple Title',
          'Title with Numbers 123',
          'Title-with-hyphens',
          'Title.with.dots',
          'Title!@#$%^&*()',
          'UPPERCASE TITLE'
        ];

        for (const title of testTitles) {
          // Clear issues
          mockFiles.set('/test/issues', []);
          mockFiles.set('/test/plans', []);
          fileManager.setIssueFiles([]);
          
          const createIssueSpy = vi.spyOn(fileManager, 'createIssue');
          const createPlanSpy = vi.spyOn(fileManager, 'createPlan');

          mockFileContents.set('/test/master-plan.md', `# Master Plan\n\n## Goals\n- ${title}`);
          
          const claudeProvider = testProviders.get('claude')!;
          claudeProvider.setResponse('decompose', 'Generated issues from master plan');

          await agent.bootstrap('/test/master-plan.md');

          // The bootstrap creates an issue with title like "Implement plan from master-plan"
          expect(createIssueSpy).toHaveBeenCalled();
          expect(createPlanSpy).toHaveBeenCalled();
          
          const issueTitle = createIssueSpy.mock.calls[0][1];
          const planTitle = createPlanSpy.mock.calls[0][2];
          
          // Both should receive the same title
          expect(planTitle).toBe(issueTitle);
          
          // Clear spies for next iteration
          createIssueSpy.mockClear();
          createPlanSpy.mockClear();
        }
      });

      it('should handle empty issues directory errors gracefully', async () => {
        // Clear any existing issue files and sync fileManager
        mockFiles.set('/test/issues', []);
        fileManager.setIssueFiles([]);
        
        // Simulate directory read error
        vi.mocked(fs.readdir).mockRejectedValueOnce(
          Object.assign(new Error('ENOENT: no such file or directory'), { code: 'ENOENT' })
        );
        
        fileManager.clearTodos();
        
        const createIssueSpy = vi.spyOn(fileManager, 'createIssue');

        mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest plan content');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        await agent.bootstrap('/test/master-plan.md');

        // Should create issue #1 when directory doesn't exist
        expect(createIssueSpy).toHaveBeenCalled();
        const firstCall = createIssueSpy.mock.calls[0];
        expect(firstCall[0]).toBe(1);
      });

      it.skip('should handle filesystem permission errors', async () => {
        // Simulate permission error when reading directory
        vi.mocked(fs.readdir).mockRejectedValueOnce(
          Object.assign(new Error('EACCES: permission denied'), { code: 'EACCES' })
        );
        
        mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest plan content');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        // Should throw the permission error
        await expect(agent.bootstrap('/test/master-plan.md')).rejects.toThrow('EACCES');
      });

      it.skip('should handle concurrent bootstrap execution', async () => {
        // Create a few existing issues
        createTestIssue(1);
        createTestIssue(2);
        
        mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest plan content');
        mockFileContents.set('/test/master-plan-2.md', '# Another Master Plan\n\nDifferent content');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        // Reset the executing flag to allow first execution
        (agent as any).isExecuting = false;

        // Start first bootstrap
        const promise1 = agent.bootstrap('/test/master-plan.md');
        
        // Try to start second bootstrap immediately (should fail)
        const promise2 = agent.bootstrap('/test/master-plan-2.md');

        // First should succeed
        await expect(promise1).resolves.not.toThrow();
        
        // Second should fail with concurrent execution error
        await expect(promise2).rejects.toThrow('Agent is already executing');
      });

      it('should create valid issue filenames from complex titles', async () => {
        // Clear issues
        mockFiles.set('/test/issues', []);
        fileManager.setIssueFiles([]);
        fileManager.clearTodos();
        
        const createIssueSpy = vi.spyOn(fileManager, 'createIssue');

        mockFileContents.set('/test/master-plan.md', '# Master Plan with Special/Characters & Symbols!\n\n## Goals\n- Test special chars');
        
        const claudeProvider = testProviders.get('claude')!;
        claudeProvider.setResponse('decompose', 'Generated issues from master plan');

        await agent.bootstrap('/test/master-plan.md');

        // Verify issue was created with sanitized filename
        expect(createIssueSpy).toHaveBeenCalled();
        const firstCall = createIssueSpy.mock.calls[0];
        expect(firstCall[0]).toBe(1);
        expect(firstCall[1]).toContain('Implement plan from');
        // The filename should be sanitized (no special chars)
        expect(firstCall[1]).not.toMatch(/[/&!]/);
      });
    });
  });

  describe('embedded template functionality', () => {
    beforeEach(async () => {
      await agent.initialize();
    });

    it('should use embedded templates when no template files exist', async () => {
      // Ensure no template files exist on filesystem
      mockFiles.delete('/test/templates');
      mockFileContents.delete('/test/templates/issue.md');
      mockFileContents.delete('/test/templates/plan.md');
      
      // Clear issues directory
      mockFiles.set('/test/issues', []);
      fileManager.setIssueFiles([]);
      fileManager.clearTodos();
      
      // Set up test provider to capture the prompt
      const testProvider = testProviders.get('claude')!;
      let capturedPrompt = '';
      
      // Mock the execute method to capture the prompt
      const originalExecute = testProvider.execute.bind(testProvider);
      testProvider.execute = vi.fn().mockImplementation(async (prompt: string, contextFilePath: string) => {
        capturedPrompt = prompt;
        return originalExecute(prompt, contextFilePath);
      });

      mockFileContents.set('/test/master-plan.md', '# Master Plan\n\n## Goals\n- Test embedded templates');
      
      await agent.bootstrap('/test/master-plan.md');

      // Verify the prompt includes embedded templates
      expect(capturedPrompt).toContain('ISSUE TEMPLATE:');
      expect(capturedPrompt).toContain('# Issue [NUMBER]: [TITLE]');
      expect(capturedPrompt).toContain('## Requirement');
      expect(capturedPrompt).toContain('## Acceptance Criteria');
      expect(capturedPrompt).toContain('## Technical Details');
      
      expect(capturedPrompt).toContain('PLAN TEMPLATE:');
      expect(capturedPrompt).toContain('# Plan for Issue [NUMBER]: [TITLE]');
      expect(capturedPrompt).toContain('## Implementation Plan');
      expect(capturedPrompt).toContain('### Phase 1: Initial Setup');
    });

    it('should not attempt to read template files from filesystem', async () => {
      // Clear issues
      mockFiles.set('/test/issues', []);
      fileManager.setIssueFiles([]);
      fileManager.clearTodos();
      
      // Create a spy to track fs.readFile calls
      const readFileSpy = vi.mocked(fs.readFile);
      readFileSpy.mockClear();

      mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest content');
      
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('bootstrap', 'Generated issues');

      await agent.bootstrap('/test/master-plan.md');

      // Verify no attempts were made to read template files
      const readFileCalls = readFileSpy.mock.calls;
      const templateReadAttempts = readFileCalls.filter(call => {
        const path = call[0] as string;
        return path.includes('templates/issue.md') || path.includes('templates/plan.md');
      });
      
      expect(templateReadAttempts).toHaveLength(0);
    });

    it('should use embedded templates even when template directory exists', async () => {
      // Create template directory with files (these should be ignored)
      mockFiles.set('/test/templates', ['issue.md', 'plan.md']);
      mockFileContents.set('/test/templates/issue.md', '# Wrong Template - Should Not Be Used');
      mockFileContents.set('/test/templates/plan.md', '# Wrong Plan Template - Should Not Be Used');
      
      // Clear issues
      mockFiles.set('/test/issues', []);
      fileManager.setIssueFiles([]);
      fileManager.clearTodos();
      
      // Capture the prompt
      const testProvider = testProviders.get('claude')!;
      let capturedPrompt = '';
      
      const originalExecute = testProvider.execute.bind(testProvider);
      testProvider.execute = vi.fn().mockImplementation(async (prompt: string, contextFilePath: string) => {
        capturedPrompt = prompt;
        return originalExecute(prompt, contextFilePath);
      });

      mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest content');
      
      await agent.bootstrap('/test/master-plan.md');

      // Verify embedded templates were used, not filesystem templates
      expect(capturedPrompt).not.toContain('Wrong Template');
      expect(capturedPrompt).not.toContain('Wrong Plan Template');
      expect(capturedPrompt).toContain('# Issue [NUMBER]: [TITLE]');
      expect(capturedPrompt).toContain('# Plan for Issue [NUMBER]: [TITLE]');
    });

    it('should include complete embedded template structure in prompt', async () => {
      // Clear issues
      mockFiles.set('/test/issues', []);
      fileManager.setIssueFiles([]);
      fileManager.clearTodos();
      
      const testProvider = testProviders.get('claude')!;
      let capturedPrompt = '';
      
      const originalExecute = testProvider.execute.bind(testProvider);
      testProvider.execute = vi.fn().mockImplementation(async (prompt: string, contextFilePath: string) => {
        capturedPrompt = prompt;
        return originalExecute(prompt, contextFilePath);
      });

      mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nDetailed test plan');
      
      await agent.bootstrap('/test/master-plan.md');

      // Verify all sections of embedded templates are present
      // Issue template sections
      expect(capturedPrompt).toContain('[REQUIREMENT]');
      expect(capturedPrompt).toContain('[ACCEPTANCE_CRITERIA]');
      expect(capturedPrompt).toContain('[TECHNICAL_DETAILS]');
      expect(capturedPrompt).toContain('[DEPENDENCIES]');
      expect(capturedPrompt).toContain('[RESOURCES]');
      expect(capturedPrompt).toContain('[NOTES]');
      
      // Plan template sections
      expect(capturedPrompt).toContain('[PHASE_1_TASKS]');
      expect(capturedPrompt).toContain('[PHASE_2_TASKS]');
      expect(capturedPrompt).toContain('[PHASE_3_TASKS]');
      expect(capturedPrompt).toContain('[PHASE_4_TASKS]');
      expect(capturedPrompt).toContain('[TECHNICAL_APPROACH]');
      expect(capturedPrompt).toContain('[POTENTIAL_CHALLENGES]');
      expect(capturedPrompt).toContain('[SUCCESS_METRICS]');
      expect(capturedPrompt).toContain('[ROLLBACK_STRATEGY]');
    });

    it('should handle undefined embedded templates gracefully', async () => {
      // Mock the templates to be undefined to test error handling
      vi.doMock('@/templates/default-templates', () => ({
        DEFAULT_ISSUE_TEMPLATE: undefined,
        DEFAULT_PLAN_TEMPLATE: undefined
      }));

      // Create a new agent instance to pick up the mocked templates
      const testAgent = new AutonomousAgent({ workspace: '/test', signal: true });
      (testAgent as any).configManager = configManager;
      (testAgent as any).fileManager = fileManager;
      (testAgent as any).providerLearning = providerLearning;

      mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nTest content');
      
      // Should throw an error when templates are undefined
      await expect(testAgent.bootstrap('/test/master-plan.md')).rejects.toThrow('Embedded templates are not properly defined');
      
      // Restore the original module
      vi.doUnmock('@/templates/default-templates');
    });

    it('should use embedded templates for generated issues in bootstrap output', async () => {
      // Clear issues
      mockFiles.set('/test/issues', []);
      fileManager.setIssueFiles([]);
      fileManager.clearTodos();
      
      const createIssueSpy = vi.spyOn(fileManager, 'createIssue');
      
      mockFileContents.set('/test/master-plan.md', '# Master Plan\n\n## Goals\n- Feature implementation');
      
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('bootstrap', 'Generated issues based on templates');

      await agent.bootstrap('/test/master-plan.md');

      // Verify createIssue was called
      expect(createIssueSpy).toHaveBeenCalled();
      
      // Get the issue content that was created
      const issueContent = createIssueSpy.mock.calls[0][2];
      
      // Verify the created issue contains expected sections from bootstrap
      expect(issueContent).toContain('# Issue');
      expect(issueContent).toContain('## Requirement');
      expect(issueContent).toContain('## Acceptance Criteria');
      expect(issueContent).toContain('## Technical Details');
      expect(issueContent).toContain('## Generated Issues');
    });

    it('should ensure bootstrap works without any filesystem template operations', async () => {
      // Mock fs.readdir to throw for templates directory
      const originalReaddir = vi.mocked(fs.readdir).getMockImplementation();
      vi.mocked(fs.readdir).mockImplementation(async (path: string) => {
        if (path.includes('templates')) {
          throw new Error('ENOENT: no such file or directory');
        }
        return originalReaddir ? originalReaddir(path) : [];
      });
      
      // Clear issues
      mockFiles.set('/test/issues', []);
      fileManager.setIssueFiles([]);
      fileManager.clearTodos();
      
      mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nBootstrap without templates');
      
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('bootstrap', 'Bootstrap completed successfully');

      // Should complete successfully without reading template files
      await expect(agent.bootstrap('/test/master-plan.md')).resolves.not.toThrow();
      
      // Verify issue was created - check mockFiles for issues directory
      const issueFiles = mockFiles.get('/test/issues') || [];
      expect(issueFiles.length).toBeGreaterThan(0);
    });

    it('should maintain backwards compatibility with embedded templates', async () => {
      // Test that bootstrap behavior remains consistent
      mockFiles.set('/test/issues', ['1-existing.md', '2-another.md']);
      fileManager.setIssueFiles(['1-existing.md', '2-another.md']);
      fileManager.clearTodos();
      fileManager.addTodo(1, 'Existing', false);
      fileManager.addTodo(2, 'Another', false);
      
      const createIssueSpy = vi.spyOn(fileManager, 'createIssue');
      const createPlanSpy = vi.spyOn(fileManager, 'createPlan');
      
      mockFileContents.set('/test/master-plan.md', '# Master Plan\n\nBackwards compatibility test');
      
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('bootstrap', 'Bootstrap with embedded templates');

      await agent.bootstrap('/test/master-plan.md');

      // Should create issue #3 (next available)
      expect(createIssueSpy).toHaveBeenCalledWith(
        3,
        expect.stringContaining('Implement plan from'),
        expect.any(String)
      );
      
      // Should create corresponding plan
      expect(createPlanSpy).toHaveBeenCalledWith(
        3,
        expect.any(Object),
        expect.stringContaining('Implement plan from')
      );
    });
  });

  describe('error handling', () => {
    beforeEach(async () => {
      await agent.initialize();
    });
    
    it('should handle provider creation failure', async () => {
      // Ensure agent is not executing
      (agent as any).isExecuting = false;
      
      // Make all providers fail/unavailable
      createProvider.mockImplementation(() => {
        throw new Error('Provider creation failed');
      });
      getFirstAvailableProvider.mockResolvedValue(null);

      // executeIssue should catch the error and return it in the result
      // Note: The autonomous agent's executeIssue actually throws when no providers are available
      // This is different from other errors which are caught and returned in the result
      await expect(agent.executeIssue(1)).rejects.toThrow('No available providers found');
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

  describe('git validation for auto-commit', () => {
    beforeEach(async () => {
      await agent.initialize();
      // Clear exec mock before each test
      execMock.mockClear();
    });

    it('should skip validation when auto-commit is disabled', async () => {
      // Configure agent with auto-commit disabled (default)
      const agentNoCommit = new AutonomousAgent({ 
        workspace: '/test', 
        signal: true,
        autoCommit: false 
      });
      (agentNoCommit as any).configManager = configManager;
      (agentNoCommit as any).fileManager = fileManager;
      (agentNoCommit as any).providerLearning = providerLearning;

      // Configure provider and git state
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('execute', { success: true, output: 'Completed' });
      gitSimulator.setGitAvailable(false); // Git not available, but should not matter

      // Execute issue should succeed without git validation
      const result = await agentNoCommit.executeIssue(1);
      expect(result.success).toBe(true);
      
      // Verify git check was never called
      expect(gitUtils.checkGitAvailable).not.toHaveBeenCalled();
    });

    it('should validate git availability when auto-commit is enabled', async () => {
      // Configure agent with auto-commit enabled
      const agentWithCommit = new AutonomousAgent({ 
        workspace: '/test', 
        signal: true,
        autoCommit: true 
      });
      (agentWithCommit as any).configManager = configManager;
      (agentWithCommit as any).fileManager = fileManager;
      (agentWithCommit as any).providerLearning = providerLearning;

      // Configure git as not available
      gitSimulator.setGitAvailable(false);
      gitSimulator.setIsRepository(true);
      gitSimulator.setHasChanges(true);

      // Configure provider
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('execute', { success: true, output: 'Completed' });

      // Execute should succeed but git commit should fail gracefully
      const result = await agentWithCommit.executeIssue(1);
      expect(result.success).toBe(true); // Issue execution succeeds
      
      // Verify git availability was checked
      expect(gitUtils.checkGitAvailable).toHaveBeenCalled();
    });

    it('should validate git repository when auto-commit is enabled', async () => {
      // Configure agent with auto-commit enabled
      const agentWithCommit = new AutonomousAgent({ 
        workspace: '/test', 
        signal: true,
        autoCommit: true 
      });
      (agentWithCommit as any).configManager = configManager;
      (agentWithCommit as any).fileManager = fileManager;
      (agentWithCommit as any).providerLearning = providerLearning;

      // Configure git as available but not a repository
      gitSimulator.setGitAvailable(true);
      gitSimulator.setIsRepository(false);
      gitSimulator.setHasChanges(true);

      // Configure provider
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('execute', { success: true, output: 'Completed' });

      // Execute should succeed but git commit should fail gracefully
      const result = await agentWithCommit.executeIssue(1);
      expect(result.success).toBe(true); // Issue execution succeeds
      
      // Verify repository check was called
      expect(gitUtils.isGitRepository).toHaveBeenCalled();
    });

    it('should validate git user configuration when auto-commit is enabled', async () => {
      // Configure agent with auto-commit enabled and debug mode
      const agentWithCommit = new AutonomousAgent({ 
        workspace: '/test', 
        signal: true,
        autoCommit: true,
        debug: true 
      });
      (agentWithCommit as any).configManager = configManager;
      (agentWithCommit as any).fileManager = fileManager;
      (agentWithCommit as any).providerLearning = providerLearning;

      // Configure git as fully available
      gitSimulator.setGitAvailable(true);
      gitSimulator.setIsRepository(true);
      gitSimulator.setHasChanges(true);

      // Mock git config commands
      execMock.mockImplementation((cmd: string, callback: any) => {
        if (cmd === 'git config user.name') {
          callback(null, 'Test User\n', '');
        } else if (cmd === 'git config user.email') {
          callback(null, 'test@example.com\n', '');
        } else {
          // Default for other commands
          callback(null, '', '');
        }
      });

      // Configure provider
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('execute', { success: true, output: 'Completed' });

      // Capture debug messages
      const debugMessages: string[] = [];
      agentWithCommit.on('debug', (msg: string) => debugMessages.push(msg));

      // Execute should succeed with valid git config
      const result = await agentWithCommit.executeIssue(1);
      expect(result.success).toBe(true);
      
      // Verify git config was checked
      expect(execMock).toHaveBeenCalledWith('git config user.name', expect.any(Function));
      expect(execMock).toHaveBeenCalledWith('git config user.email', expect.any(Function));
      
      // Verify debug message
      expect(debugMessages).toContain('Git validation passed for auto-commit');
    });

    it('should fail gracefully when git user.name is not configured', async () => {
      // Configure agent with auto-commit enabled
      const agentWithCommit = new AutonomousAgent({ 
        workspace: '/test', 
        signal: true,
        autoCommit: true,
        debug: true 
      });
      (agentWithCommit as any).configManager = configManager;
      (agentWithCommit as any).fileManager = fileManager;
      (agentWithCommit as any).providerLearning = providerLearning;

      // Configure git as available and repository
      gitSimulator.setGitAvailable(true);
      gitSimulator.setIsRepository(true);
      gitSimulator.setHasChanges(true);

      // Mock git config to fail for user.name
      execMock.mockImplementation((cmd: string, callback: any) => {
        if (cmd === 'git config user.name') {
          callback(null, '', ''); // Empty name
        } else if (cmd === 'git config user.email') {
          callback(null, 'test@example.com\n', '');
        } else {
          callback(null, '', '');
        }
      });

      // Configure provider
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('execute', { success: true, output: 'Completed' });

      // Capture debug messages
      const debugMessages: string[] = [];
      agentWithCommit.on('debug', (msg: string) => debugMessages.push(msg));

      // Execute should succeed but commit should fail
      const result = await agentWithCommit.executeIssue(1);
      expect(result.success).toBe(true); // Issue execution still succeeds
      
      // Verify git config was checked
      expect(execMock).toHaveBeenCalledWith('git config user.name', expect.any(Function));
      
      // Verify error was logged in debug mode
      const errorMsg = debugMessages.find(msg => msg.includes('Git commit error'));
      expect(errorMsg).toBeDefined();
      expect(errorMsg).toContain('Git user configuration is incomplete');
    });

    it('should fail gracefully when git user.email is not configured', async () => {
      // Configure agent with auto-commit enabled
      const agentWithCommit = new AutonomousAgent({ 
        workspace: '/test', 
        signal: true,
        autoCommit: true,
        debug: true 
      });
      (agentWithCommit as any).configManager = configManager;
      (agentWithCommit as any).fileManager = fileManager;
      (agentWithCommit as any).providerLearning = providerLearning;

      // Configure git as available and repository
      gitSimulator.setGitAvailable(true);
      gitSimulator.setIsRepository(true);
      gitSimulator.setHasChanges(true);

      // Mock git config to fail for user.email
      execMock.mockImplementation((cmd: string, callback: any) => {
        if (cmd === 'git config user.name') {
          callback(null, 'Test User\n', '');
        } else if (cmd === 'git config user.email') {
          callback(null, '', ''); // Empty email
        } else {
          callback(null, '', '');
        }
      });

      // Configure provider
      const testProvider = testProviders.get('claude')!;
      testProvider.setResponse('execute', { success: true, output: 'Completed' });

      // Capture debug messages
      const debugMessages: string[] = [];
      agentWithCommit.on('debug', (msg: string) => debugMessages.push(msg));

      // Execute should succeed but commit should fail
      const result = await agentWithCommit.executeIssue(1);
      expect(result.success).toBe(true); // Issue execution still succeeds
      
      // Verify git config was checked
      expect(execMock).toHaveBeenCalledWith('git config user.email', expect.any(Function));
      
      // Verify error was logged in debug mode
      const errorMsg = debugMessages.find(msg => msg.includes('Git commit error'));
      expect(errorMsg).toBeDefined();
      expect(errorMsg).toContain('Git user configuration is incomplete');
    });

    it('should provide helpful error messages for git configuration issues', async () => {
      // Directly test the validation method for error messages
      const agentWithCommit = new AutonomousAgent({ 
        workspace: '/test', 
        signal: true,
        autoCommit: true 
      });
      (agentWithCommit as any).configManager = configManager;
      (agentWithCommit as any).fileManager = fileManager;
      (agentWithCommit as any).providerLearning = providerLearning;

      // Test git not available error
      gitSimulator.setGitAvailable(false);
      try {
        await (agentWithCommit as any).validateGitForAutoCommit();
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toContain('Git is not available on your system');
        expect(error.message).toContain('Install git from https://git-scm.com/downloads');
        expect(error.message).toContain('git --version');
      }

      // Test not a repository error
      gitSimulator.setGitAvailable(true);
      gitSimulator.setIsRepository(false);
      try {
        await (agentWithCommit as any).validateGitForAutoCommit();
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toContain('Current directory is not a git repository');
        expect(error.message).toContain('git init');
        expect(error.message).toContain('git clone');
      }

      // Test user config error
      gitSimulator.setIsRepository(true);
      execMock.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('git config user')) {
          callback(null, '', '');
        } else {
          callback(null, '', '');
        }
      });
      
      try {
        await (agentWithCommit as any).validateGitForAutoCommit();
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toContain('Git user configuration is incomplete');
        expect(error.message).toContain('git config --global user.name');
        expect(error.message).toContain('git config --global user.email');
        expect(error.message).toContain('git config user.name');
        expect(error.message).toContain('git config user.email');
      }
    });
  });
});