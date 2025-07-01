import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ConfigManager } from '../../src/core/config-manager';
import { AutonomousAgent } from '../../src/core/autonomous-agent';
import { Logger } from '../../src/utils/logger';

// Mock modules
vi.mock('../../src/core/config-manager');
vi.mock('../../src/core/autonomous-agent');
vi.mock('../../src/utils/logger');
vi.mock('../../src/providers', () => ({
  createProvider: vi.fn().mockReturnValue({
    name: 'claude',
    checkAvailability: vi.fn().mockResolvedValue(true),
    execute: vi.fn()
  })
}));

describe('CLI Integration Tests', () => {
  let mockConfigManager: any;
  let mockAgent: any;
  let processExitSpy: any;
  let consoleLogSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock process.exit to prevent test runner from exiting
    processExitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit called');
    }) as any);
    
    // Mock console methods
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation();
    
    // Mock Logger static methods
    vi.spyOn(Logger, 'info').mockImplementation();
    vi.spyOn(Logger, 'success').mockImplementation();
    vi.spyOn(Logger, 'error').mockImplementation();
    vi.spyOn(Logger, 'warning').mockImplementation();
    vi.spyOn(Logger, 'debug').mockImplementation();
    vi.spyOn(Logger, 'progress').mockImplementation();
    vi.spyOn(Logger, 'clear').mockImplementation();
    vi.spyOn(Logger, 'newline').mockImplementation();
    
    mockConfigManager = {
      initConfig: vi.fn().mockResolvedValue(undefined),
      setProvider: vi.fn().mockResolvedValue(undefined),
      setFailoverProviders: vi.fn().mockResolvedValue(undefined),
      updateConfig: vi.fn().mockResolvedValue(undefined),
      setIncludeCoAuthoredBy: vi.fn().mockResolvedValue(undefined),
      clearRateLimit: vi.fn().mockResolvedValue(undefined),
      showConfig: vi.fn().mockResolvedValue(undefined),
      loadConfig: vi.fn().mockResolvedValue({
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
      getAvailableProviders: vi.fn().mockResolvedValue(['claude', 'gemini'])
    } as unknown as any;

    mockAgent = {
      initialize: vi.fn().mockResolvedValue(undefined),
      executeIssue: vi.fn().mockResolvedValue({
        success: true,
        issueNumber: 1,
        duration: 1000,
        provider: 'claude'
      }),
      executeAll: vi.fn().mockResolvedValue([]),
      executeNext: vi.fn().mockResolvedValue({
        success: true,
        issueNumber: 1,
        duration: 1000,
        provider: 'claude'
      }),
      createIssue: vi.fn().mockResolvedValue(1),
      getStatus: vi.fn().mockResolvedValue({
        totalIssues: 5,
        completedIssues: 2,
        pendingIssues: 3,
        availableProviders: ['claude', 'gemini'],
        rateLimitedProviders: []
      }),
      bootstrap: vi.fn().mockResolvedValue(undefined)
    } as unknown as any;

    (ConfigManager as unknown as any).mockImplementation(() => mockConfigManager);
    (AutonomousAgent as unknown as any).mockImplementation(() => mockAgent);
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