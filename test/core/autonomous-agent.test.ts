import { AutonomousAgent } from '../../src/core/autonomous-agent';
import { ConfigManager } from '../../src/core/config-manager';
import { FileManager } from '../../src/utils/file-manager';
import { Provider } from '../../src/providers/Provider';
import { EventEmitter } from 'events';

// Mock dependencies
jest.mock('../../src/core/config-manager');
jest.mock('../../src/utils/file-manager');
jest.mock('../../src/providers', () => ({
  createProvider: jest.fn(),
  getFirstAvailableProvider: jest.fn()
}));

describe('AutonomousAgent', () => {
  let agent: AutonomousAgent;
  let mockConfigManager: jest.Mocked<ConfigManager>;
  let mockFileManager: jest.Mocked<FileManager>;

  beforeEach(() => {
    jest.clearAllMocks();
    
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
      updateProviderInstructions: jest.fn().mockResolvedValue(undefined)
    } as any;

    // Mock constructor dependencies
    (ConfigManager as unknown as jest.Mock).mockImplementation(() => mockConfigManager);
    (FileManager as unknown as jest.Mock).mockImplementation(() => mockFileManager);

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
        provider: 'claude'
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
});