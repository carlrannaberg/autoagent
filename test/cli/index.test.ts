import { ConfigManager } from '../../src/core/config-manager';
import { AutonomousAgent } from '../../src/core/autonomous-agent';
import { Logger } from '../../src/utils/logger';

// Mock modules
jest.mock('../../src/core/config-manager');
jest.mock('../../src/core/autonomous-agent');
jest.mock('../../src/utils/logger');
jest.mock('../../src/providers', () => ({
  createProvider: jest.fn().mockReturnValue({
    name: 'claude',
    checkAvailability: jest.fn().mockResolvedValue(true),
    execute: jest.fn()
  })
}));

describe('CLI Integration Tests', () => {
  let mockConfigManager: jest.Mocked<ConfigManager>;
  let mockAgent: jest.Mocked<AutonomousAgent>;
  let mockLogger: any;
  let processExitSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock process.exit to prevent test runner from exiting
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });
    
    // Mock console methods
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // Mock Logger
    mockLogger = {
      info: jest.fn(),
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
      debug: jest.fn(),
      progress: jest.fn(),
      clear: jest.fn(),
      newline: jest.fn()
    };
    Object.assign(Logger, mockLogger);
    
    mockConfigManager = {
      initConfig: jest.fn().mockResolvedValue(undefined),
      setProvider: jest.fn().mockResolvedValue(undefined),
      setFailoverProviders: jest.fn().mockResolvedValue(undefined),
      updateConfig: jest.fn().mockResolvedValue(undefined),
      setIncludeCoAuthoredBy: jest.fn().mockResolvedValue(undefined),
      clearRateLimit: jest.fn().mockResolvedValue(undefined),
      showConfig: jest.fn().mockResolvedValue(undefined),
      loadConfig: jest.fn().mockResolvedValue({
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
      getAvailableProviders: jest.fn().mockResolvedValue(['claude', 'gemini'])
    } as any;

    mockAgent = {
      initialize: jest.fn().mockResolvedValue(undefined),
      executeIssue: jest.fn().mockResolvedValue({
        success: true,
        issueNumber: 1,
        duration: 1000,
        provider: 'claude'
      }),
      executeAll: jest.fn().mockResolvedValue([]),
      executeNext: jest.fn().mockResolvedValue({
        success: true,
        issueNumber: 1,
        duration: 1000,
        provider: 'claude'
      }),
      createIssue: jest.fn().mockResolvedValue(1),
      getStatus: jest.fn().mockResolvedValue({
        totalIssues: 5,
        completedIssues: 2,
        pendingIssues: 3,
        availableProviders: ['claude', 'gemini'],
        rateLimitedProviders: []
      }),
      bootstrap: jest.fn().mockResolvedValue(undefined)
    } as any;

    (ConfigManager as unknown as jest.Mock).mockImplementation(() => mockConfigManager);
    (AutonomousAgent as unknown as jest.Mock).mockImplementation(() => mockAgent);
  });

  afterEach(() => {
    processExitSpy.mockRestore();
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('config commands', () => {
    it('should initialize config', async () => {
      await mockConfigManager.initConfig(false);
      expect(mockConfigManager.initConfig).toHaveBeenCalledWith(false);
    });

    it('should set provider', async () => {
      await mockConfigManager.setProvider('claude', false);
      expect(mockConfigManager.setProvider).toHaveBeenCalledWith('claude', false);
    });

    it('should set failover providers', async () => {
      await mockConfigManager.setFailoverProviders(['claude', 'gemini'], false);
      expect(mockConfigManager.setFailoverProviders).toHaveBeenCalledWith(['claude', 'gemini'], false);
    });

    it('should update config for auto-commit', async () => {
      await mockConfigManager.updateConfig({ gitAutoCommit: true }, 'local');
      expect(mockConfigManager.updateConfig).toHaveBeenCalledWith({ gitAutoCommit: true }, 'local');
    });

    it('should clear rate limits', async () => {
      await mockConfigManager.clearRateLimit('claude');
      expect(mockConfigManager.clearRateLimit).toHaveBeenCalledWith('claude');
    });
  });

  describe('run command', () => {
    it('should execute single issue', async () => {
      const result = await mockAgent.executeIssue(1);
      expect(result.success).toBe(true);
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(1);
    });

    it('should execute all issues', async () => {
      await mockAgent.executeAll();
      expect(mockAgent.executeAll).toHaveBeenCalled();
    });
  });

  describe('status command', () => {
    it('should get and display status', async () => {
      const status = await mockAgent.getStatus();
      expect(status.totalIssues).toBe(5);
      expect(status.completedIssues).toBe(2);
      expect(status.pendingIssues).toBe(3);
    });
  });

  describe('check command', () => {
    it('should check provider availability', async () => {
      const providers = await mockConfigManager.getAvailableProviders();
      expect(providers).toContain('claude');
      expect(providers).toContain('gemini');
    });
  });

  describe('create command', () => {
    it('should create new issue', async () => {
      const issueNumber = await mockAgent.createIssue('New test issue');
      expect(issueNumber).toBe(1);
      expect(mockAgent.createIssue).toHaveBeenCalledWith('New test issue');
    });
  });

  describe('bootstrap command', () => {
    it('should bootstrap from master plan', async () => {
      await mockAgent.bootstrap('master-plan.md');
      expect(mockAgent.bootstrap).toHaveBeenCalledWith('master-plan.md');
    });
  });
});