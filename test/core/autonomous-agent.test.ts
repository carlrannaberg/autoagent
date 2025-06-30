import { AutonomousAgent } from '../../src/core/autonomous-agent';
import { ConfigManager } from '../../src/core/config-manager';
import { FileManager } from '../../src/utils/file-manager';
import { Provider } from '../../src/providers/Provider';
import { ProviderLearning } from '../../src/core/provider-learning';
import { EventEmitter } from 'events';
import * as gitUtils from '../../src/utils/git';
import { ExecutionResult } from '../../src/types';

// Mock dependencies
jest.mock('../../src/core/config-manager');
jest.mock('../../src/utils/file-manager');
jest.mock('../../src/core/provider-learning');
jest.mock('../../src/providers', () => ({
  createProvider: jest.fn(),
  getFirstAvailableProvider: jest.fn()
}));
jest.mock('../../src/utils/git');
jest.mock('child_process');

describe('AutonomousAgent', () => {
  let agent: AutonomousAgent;
  let mockConfigManager: jest.Mocked<ConfigManager>;
  let mockFileManager: jest.Mocked<FileManager>;
  let mockProviderLearning: jest.Mocked<ProviderLearning>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    
    // Setup mock implementations
    mockConfigManager = {
      loadConfig: jest.fn().mockResolvedValue({}),
      getConfig: jest.fn().mockReturnValue({
        providers: ['claude', 'gemini'],
        failoverDelay: 5000,
        retryAttempts: 3,
        maxTokens: 100000,
        rateLimitCooldown: 3600000,
        gitAutoCommit: false,
        gitCommitInterval: 600000,
        logLevel: 'info',
        customInstructions: ''
      }),
      isProviderRateLimited: jest.fn().mockResolvedValue(false),
      getAvailableProviders: jest.fn().mockResolvedValue(['claude', 'gemini']),
      updateRateLimit: jest.fn().mockResolvedValue(undefined),
      checkRateLimit: jest.fn().mockResolvedValue({ isLimited: false })
    } as any;

    mockFileManager = {
      createProviderInstructionsIfMissing: jest.fn().mockResolvedValue(undefined),
      readIssue: jest.fn().mockResolvedValue({
        number: 1,
        title: 'Test Issue',
        file: 'issues/1-test-issue.md',
        requirements: 'Test requirements',
        acceptanceCriteria: ['Test criteria']
      }),
      readPlan: jest.fn().mockResolvedValue({
        issueNumber: 1,
        file: 'plans/1-plan.md',
        phases: [{ name: 'Phase 1', tasks: ['Task 1'] }]
      }),
      readTodoList: jest.fn().mockResolvedValue(['- [ ] Issue #1: Test Issue']),
      updateTodoList: jest.fn().mockResolvedValue(undefined),
      readProviderInstructions: jest.fn().mockResolvedValue(''),
      updateProviderInstructions: jest.fn().mockResolvedValue(undefined),
      updateTodo: jest.fn().mockResolvedValue(undefined),
      getNextIssue: jest.fn().mockResolvedValue(1),
      createIssue: jest.fn().mockResolvedValue('issues/2-new-issue.md'),
      createPlan: jest.fn().mockResolvedValue('plans/2-plan.md'),
      getTodoStats: jest.fn().mockResolvedValue({
        total: 3,
        completed: 1,
        pending: 2
      }),
      getChangedFiles: jest.fn().mockResolvedValue(['test.ts'])
    } as any;

    mockProviderLearning = {
      updateProviderLearnings: jest.fn().mockResolvedValue(undefined)
    } as any;

    // Mock constructor dependencies
    (ConfigManager as unknown as jest.Mock).mockImplementation(() => mockConfigManager);
    (FileManager as unknown as jest.Mock).mockImplementation(() => mockFileManager);
    (ProviderLearning as unknown as jest.Mock).mockImplementation(() => mockProviderLearning);

    // Mock git utilities
    (gitUtils.checkGitAvailable as jest.Mock).mockResolvedValue(true);
    (gitUtils.isGitRepository as jest.Mock).mockResolvedValue(true);
    (gitUtils.hasChangesToCommit as jest.Mock).mockResolvedValue(true);
    (gitUtils.stageAllChanges as jest.Mock).mockResolvedValue(undefined);
    (gitUtils.createCommit as jest.Mock).mockResolvedValue({ success: true, commitHash: 'abc123' });
    (gitUtils.getCurrentCommitHash as jest.Mock).mockResolvedValue('abc123');
    (gitUtils.getUncommittedChanges as jest.Mock).mockResolvedValue('');
    (gitUtils.revertToCommit as jest.Mock).mockResolvedValue(true);

    agent = new AutonomousAgent();
  });

  describe('constructor', () => {
    it('should create an instance with default config', () => {
      expect(agent).toBeInstanceOf(EventEmitter);
      expect(agent).toBeInstanceOf(AutonomousAgent);
    });

    it('should accept custom config', () => {
      const customConfig = {
        workspace: '/custom/path',
        provider: 'claude' as const,
        debug: true
      };
      
      const customAgent = new AutonomousAgent(customConfig);
      expect(customAgent).toBeInstanceOf(AutonomousAgent);
    });
  });

  describe('initialize', () => {
    it('should load config and create provider instructions', async () => {
      await agent.initialize();
      
      expect(mockConfigManager.loadConfig).toHaveBeenCalled();
      expect(mockFileManager.createProviderInstructionsIfMissing).toHaveBeenCalled();
    });
  });

  describe('getStatus', () => {
    it('should return correct status', async () => {
      mockFileManager.readTodoList.mockResolvedValueOnce([
        '- [x] Issue #1: Completed',
        '- [ ] Issue #2: Pending',
        '- [ ] Issue #3: Pending'
      ]);

      const status = await agent.getStatus();
      
      expect(status).toEqual({
        totalIssues: 3,
        completedIssues: 1,
        pendingIssues: 2,
        availableProviders: ['claude', 'gemini'],
        rateLimitedProviders: []
      });
    });
  });

  describe('executeIssue', () => {
    let mockProvider: jest.Mocked<Provider>;

    beforeEach(() => {
      mockProvider = {
        name: 'claude',
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({
          success: true,
          issueNumber: 1,
          duration: 1000,
          output: 'Success',
          provider: 'claude'
        })
      } as any;

      const { getFirstAvailableProvider } = require('../../src/providers');
      getFirstAvailableProvider.mockResolvedValue(mockProvider);
    });

    it('should execute an issue successfully', async () => {
      // Mock file finding
      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue('issues/1-test-issue.md');
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue('plans/1-plan.md');

      const result = await agent.executeIssue(1);

      expect(result).toEqual({
        success: true,
        issueNumber: 1,
        duration: expect.any(Number),
        output: 'Success',
        provider: 'claude',
        issueTitle: 'Test Issue',
        filesModified: undefined
      });
      
      expect(mockProvider.execute).toHaveBeenCalledWith(
        'issues/1-test-issue.md',
        'plans/1-plan.md',
        expect.any(Array),
        expect.any(Object)
      );
    });

    it('should handle missing issue file', async () => {
      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue(null);
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue(null);

      // Prevent unhandled error events
      agent.on('error', () => {});

      const result = await agent.executeIssue(1);

      expect(result).toEqual({
        success: false,
        issueNumber: 1,
        duration: 0,
        error: 'Issue #1 not found'
      });
    });

    it('should handle execution failure', async () => {
      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue('issues/1-test-issue.md');
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue('plans/1-plan.md');
      
      mockProvider.execute.mockResolvedValueOnce({
        success: false,
        issueNumber: 1,
        duration: 1000,
        error: 'Execution failed',
        provider: 'claude'
      });

      const result = await agent.executeIssue(1);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Execution failed');
    });
  });

  describe('executeAll', () => {
    it('should execute all pending issues', async () => {
      mockFileManager.readTodoList.mockResolvedValue([
        '- [x] Issue #1: Completed',
        '- [ ] Issue #2: Pending',
        '- [ ] Issue #3: Pending'
      ]);

      // Mock executeIssue
      const executeIssueSpy = jest.spyOn(agent, 'executeIssue')
        .mockResolvedValueOnce({
          success: true,
          issueNumber: 2,
          duration: 1000,
          provider: 'claude'
        })
        .mockResolvedValueOnce({
          success: true,
          issueNumber: 3,
          duration: 1000,
          provider: 'claude'
        });

      const results = await agent.executeAll();

      expect(results).toHaveLength(2);
      expect(executeIssueSpy).toHaveBeenCalledWith(2);
      expect(executeIssueSpy).toHaveBeenCalledWith(3);
    });

    it('should stop on failure when debug is false', async () => {
      mockFileManager.readTodoList.mockResolvedValue([
        '- [ ] Issue #1: Pending',
        '- [ ] Issue #2: Pending'
      ]);

      const executeIssueSpy = jest.spyOn(agent, 'executeIssue')
        .mockResolvedValueOnce({
          success: false,
          issueNumber: 1,
          duration: 1000,
          error: 'Failed'
        });

      const results = await agent.executeAll();

      expect(results).toHaveLength(1);
      expect(executeIssueSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createIssue', () => {
    it('should create a new issue from a description', async () => {
      const mockProvider = {
        name: 'claude',
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({
          success: true,
          output: 'Issue Title: Test Issue 2\nContent: Test content'
        })
      } as any;

      const { getFirstAvailableProvider } = require('../../src/providers');
      getFirstAvailableProvider.mockResolvedValue(mockProvider);

      mockFileManager.getNextIssue.mockResolvedValue({
        number: 2,
        title: 'Test Issue 2',
        file: 'issues/2-test-issue.md',
        requirements: 'Test requirements',
        acceptanceCriteria: ['Test criteria']
      });
      mockFileManager.createIssue.mockResolvedValue('issues/2-test-issue.md');
      mockFileManager.createPlan.mockResolvedValue('plans/2-plan.md');
      mockFileManager.readTodoList.mockResolvedValue(['- [ ] Issue #1: Test']);
      mockFileManager.updateTodoList.mockResolvedValue(undefined);

      const result = await agent.createIssue('Test issue description');

      expect(result).toBe(2);
      expect(mockFileManager.createIssue).toHaveBeenCalledWith(
        2,
        expect.stringContaining('test issue'),
        expect.any(String)
      );
      expect(mockFileManager.createPlan).toHaveBeenCalled();
      expect(mockFileManager.updateTodoList).toHaveBeenCalled();
    });
  });

  describe('executeNext', () => {
    it('should execute the next pending issue', async () => {
      mockFileManager.getNextIssue.mockResolvedValue({
        number: 2,
        title: 'Test Issue 2',
        file: 'issues/2-test-issue.md',
        requirements: 'Test requirements',
        acceptanceCriteria: ['Test criteria']
      });
      const executeIssueSpy = jest.spyOn(agent, 'executeIssue')
        .mockResolvedValue({
          success: true,
          issueNumber: 2,
          duration: 1000,
          provider: 'claude'
        });

      const result = await agent.executeNext();

      expect(result.issueNumber).toBe(2);
      expect(executeIssueSpy).toHaveBeenCalledWith(2);
    });

    it('should return error result when no pending issues', async () => {
      mockFileManager.getNextIssue.mockResolvedValue(undefined);

      const result = await agent.executeNext();

      expect(result).toEqual({
        success: false,
        issueNumber: 0,
        duration: 0,
        error: 'No pending issues to execute'
      });
    });
  });

  describe('bootstrap', () => {
    let mockProvider: jest.Mocked<Provider>;

    beforeEach(() => {
      mockProvider = {
        name: 'claude',
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({
          success: true,
          issueNumber: 1,
          duration: 1000,
          output: 'Created 10 issues',
          provider: 'claude'
        })
      } as any;

      const { getFirstAvailableProvider } = require('../../src/providers');
      getFirstAvailableProvider.mockResolvedValue(mockProvider);
    });

    it('should bootstrap from master plan', async () => {
      const result = await agent.bootstrap('master-plan.md');

      expect(result).toBe(undefined); // bootstrap returns void
      expect(mockProvider.execute).toHaveBeenCalledWith(
        'master-plan.md',
        null,
        ['bootstrap'],
        expect.any(Object)
      );
    });

    it('should handle bootstrap failure', async () => {
      mockProvider.execute.mockResolvedValue({
        success: false,
        issueNumber: 0,
        duration: 1000,
        error: 'Bootstrap failed'
      });

      await agent.bootstrap('master-plan.md');

      // Bootstrap doesn't throw, but provider execute should be called
      expect(mockProvider.execute).toHaveBeenCalled();
    });
  });

  describe('git operations', () => {
    let mockProvider: jest.Mocked<Provider>;

    beforeEach(() => {
      mockProvider = {
        name: 'claude',
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({
          success: true,
          issueNumber: 1,
          duration: 1000,
          output: 'Success',
          provider: 'claude'
        })
      } as any;

      const { getFirstAvailableProvider } = require('../../src/providers');
      getFirstAvailableProvider.mockResolvedValue(mockProvider);
    });

    it('should perform git commit when autoCommit is enabled', async () => {
      agent = new AutonomousAgent({ autoCommit: true });
      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue('issues/1-test-issue.md');
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue('plans/1-plan.md');

      await agent.executeIssue(1);

      expect(gitUtils.hasChangesToCommit).toHaveBeenCalled();
      expect(gitUtils.stageAllChanges).toHaveBeenCalled();
      expect(gitUtils.createCommit).toHaveBeenCalledWith({
        message: expect.stringContaining('feat: Complete issue'),
        coAuthor: expect.objectContaining({
          name: 'Claude',
          email: 'claude@autoagent'
        })
      });
    });

    it('should skip git commit when no changes', async () => {
      agent = new AutonomousAgent({ autoCommit: true });
      (gitUtils.hasChangesToCommit as jest.Mock).mockResolvedValue(false);
      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue('issues/1-test-issue.md');
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue('plans/1-plan.md');

      await agent.executeIssue(1);

      expect(gitUtils.createCommit).not.toHaveBeenCalled();
    });

    it('should handle git not available', async () => {
      agent = new AutonomousAgent({ autoCommit: true, debug: true });
      (gitUtils.checkGitAvailable as jest.Mock).mockResolvedValue(false);
      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue('issues/1-test-issue.md');
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue('plans/1-plan.md');

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await agent.executeIssue(1);

      expect(gitUtils.createCommit).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Git not available')
      );

      consoleSpy.mockRestore();
    });
  });

  describe('provider failover', () => {
    let mockProvider1: jest.Mocked<Provider>;
    let mockProvider2: jest.Mocked<Provider>;

    beforeEach(() => {
      mockProvider1 = {
        name: 'claude',
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn()
      } as any;

      mockProvider2 = {
        name: 'gemini',
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({
          success: true,
          issueNumber: 1,
          duration: 1000,
          output: 'Success',
          provider: 'gemini'
        })
      } as any;
    });

    it('should failover to alternate provider on rate limit', async () => {
      const { getFirstAvailableProvider } = require('../../src/providers');
      getFirstAvailableProvider
        .mockResolvedValueOnce(mockProvider1)
        .mockResolvedValueOnce(mockProvider2);

      mockProvider1.execute.mockResolvedValue({
        success: false,
        issueNumber: 1,
        duration: 1000,
        error: 'Rate limit exceeded',
        provider: 'claude'
      });

      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue('issues/1-test-issue.md');
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue('plans/1-plan.md');
      
      // Mock the delay to avoid timeout
      jest.spyOn(agent as any, 'delay').mockResolvedValue(undefined);

      const result = await agent.executeIssue(1);

      expect(result.success).toBe(true);
      expect(result.provider).toBe('gemini');
      expect(mockConfigManager.updateRateLimit).toHaveBeenCalledWith('claude');
    }, 10000); // Increase timeout
  });

  describe('rollback', () => {
    it('should capture pre-execution state when rollback is enabled', async () => {
      agent = new AutonomousAgent({ enableRollback: true });
      const captureStateSpy = jest.spyOn(agent as any, 'capturePreExecutionState');

      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue('issues/1-test-issue.md');
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue('plans/1-plan.md');

      const mockProvider = {
        name: 'claude',
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({
          success: true,
          issueNumber: 1,
          duration: 1000,
          output: 'Success',
          provider: 'claude'
        })
      } as any;

      const { getFirstAvailableProvider } = require('../../src/providers');
      getFirstAvailableProvider.mockResolvedValue(mockProvider);

      await agent.executeIssue(1);

      expect(captureStateSpy).toHaveBeenCalled();
      expect(gitUtils.getCurrentCommitHash).toHaveBeenCalled();
      expect(gitUtils.getUncommittedChanges).toHaveBeenCalled();
    });

    it('should perform rollback on failure', async () => {
      const executionResult: ExecutionResult = {
        success: false,
        issueNumber: 1,
        duration: 1000,
        error: 'Failed',
        rollbackData: {
          gitCommit: 'abc123',
          fileBackups: new Map([['test.txt', 'original content']])
        }
      };

      const result = await agent.rollback(executionResult);

      expect(result).toBe(true);
      expect(gitUtils.revertToCommit).toHaveBeenCalledWith('abc123');
    });
  });

  describe('event handling', () => {
    it('should emit progress events', async () => {
      agent = new AutonomousAgent({ debug: false }); // Create non-debug agent to test events
      const progressHandler = jest.fn();
      agent.on('progress', progressHandler);
      agent.on('execution-start', progressHandler);
      agent.on('provider-selected', progressHandler);

      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue('issues/1-test-issue.md');
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue('plans/1-plan.md');

      const mockProvider = {
        name: 'claude',
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockResolvedValue({
          success: true,
          issueNumber: 1,
          duration: 1000,
          output: 'Success',
          provider: 'claude'
        })
      } as any;

      const { getFirstAvailableProvider } = require('../../src/providers');
      getFirstAvailableProvider.mockResolvedValue(mockProvider);

      await agent.executeIssue(1);

      expect(progressHandler).toHaveBeenCalled();
    });

    it('should handle cancellation', async () => {
      const abortController = new AbortController();
      agent = new AutonomousAgent({ signal: abortController.signal });

      jest.spyOn(agent as any, 'findIssueFile').mockResolvedValue('issues/1-test-issue.md');
      jest.spyOn(agent as any, 'findPlanFile').mockResolvedValue('plans/1-plan.md');

      const mockProvider = {
        name: 'claude',
        checkAvailability: jest.fn().mockResolvedValue(true),
        execute: jest.fn().mockImplementation(() => {
          // Simulate cancellation during execution
          abortController.abort();
          return Promise.resolve({
            success: false,
            error: 'Cancelled'
          });
        })
      } as any;

      const { getFirstAvailableProvider } = require('../../src/providers');
      getFirstAvailableProvider.mockResolvedValue(mockProvider);

      const result = await agent.executeIssue(1);

      expect(result.success).toBe(false);
    });
  });
});