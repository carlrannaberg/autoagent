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

const mockFiles = new Map<string, string[]>();
const mockFileContents = new Map<string, string>();

vi.mock('fs/promises');

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
    fileManager = new InMemoryFileManager('/test');
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
      const createTestIssue = (issueNumber: number, title: string = `test-issue-${issueNumber}`) => {
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
});