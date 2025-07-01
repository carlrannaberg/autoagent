import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ConfigManager } from '../../src/core/config-manager';
import { promises as fs } from 'fs';
import { UserConfig } from '../../src/types';

vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
    mkdir: vi.fn()
  }
}));

vi.mock('os', () => ({
  homedir: vi.fn(() => '/home/user')
}));

describe('ConfigManager', () => {
  const mockFs = fs as any;
  let configManager: ConfigManager;
  const testWorkingDir = '/test/project';

  beforeEach(() => {
    vi.clearAllMocks();
    configManager = new ConfigManager(testWorkingDir);
  });

  describe('loadConfig', () => {
    it('should load and merge configurations with proper precedence', async () => {
      const globalConfig: Partial<UserConfig> = {
        providers: ['gemini', 'claude'],
        retryAttempts: 5,
        logLevel: 'debug'
      };

      const localConfig: Partial<UserConfig> = {
        providers: ['claude'],
        gitAutoCommit: true
      };

      mockFs.readFile
        .mockResolvedValueOnce(JSON.stringify(globalConfig))
        .mockResolvedValueOnce(JSON.stringify(localConfig));

      const result = await configManager.loadConfig();

      expect(mockFs.readFile).toHaveBeenCalledWith(
        '/home/user/.autoagent/config.json',
        'utf-8'
      );
      expect(mockFs.readFile).toHaveBeenCalledWith(
        '/test/project/.autoagent/config.json',
        'utf-8'
      );

      expect(result.providers).toEqual(['claude']);
      expect(result.retryAttempts).toBe(5);
      expect(result.gitAutoCommit).toBe(true);
      expect(result.logLevel).toBe('debug');
    });

    it('should use default config when no files exist', async () => {
      mockFs.readFile.mockRejectedValue(new Error('File not found'));

      const result = await configManager.loadConfig();

      expect(result.providers).toEqual(['claude', 'gemini']);
      expect(result.failoverDelay).toBe(5000);
      expect(result.retryAttempts).toBe(3);
      expect(result.maxTokens).toBe(100000);
      expect(result.rateLimitCooldown).toBe(3600000);
      expect(result.gitAutoCommit).toBe(false);
      expect(result.gitCommitInterval).toBe(600000);
      expect(result.logLevel).toBe('info');
      expect(result.customInstructions).toBe('');
    });

    it('should handle invalid JSON gracefully', async () => {
      mockFs.readFile
        .mockResolvedValueOnce('invalid json')
        .mockResolvedValueOnce('{}');

      const result = await configManager.loadConfig();

      expect(result).toBeDefined();
      expect(result.providers).toEqual(['claude', 'gemini']);
    });
  });

  describe('updateConfig', () => {
    it('should update local config by default', async () => {
      mockFs.readFile.mockResolvedValue('{}');
      mockFs.mkdir.mockResolvedValue(undefined);

      const updates: Partial<UserConfig> = {
        providers: ['gemini'],
        logLevel: 'warn'
      };

      await configManager.updateConfig(updates);

      expect(mockFs.mkdir).toHaveBeenCalledWith(
        '/test/project/.autoagent',
        { recursive: true }
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        '/test/project/.autoagent/config.json',
        JSON.stringify(updates, null, 2)
      );
    });

    it('should update global config when specified', async () => {
      mockFs.readFile.mockResolvedValue('{}');
      mockFs.mkdir.mockResolvedValue(undefined);

      const updates: Partial<UserConfig> = {
        providers: ['claude']
      };

      await configManager.updateConfig(updates, 'global');

      expect(mockFs.mkdir).toHaveBeenCalledWith(
        '/home/user/.autoagent',
        { recursive: true }
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        '/home/user/.autoagent/config.json',
        JSON.stringify(updates, null, 2)
      );
    });
  });

  describe('isProviderRateLimited', () => {
    it('should return false when provider is not rate limited', async () => {
      mockFs.readFile.mockResolvedValue('{}');

      const result = await configManager.isProviderRateLimited('claude');

      expect(result).toBe(false);
    });

    it('should return true when provider is rate limited within cooldown', async () => {
      const rateLimits = {
        claude: {
          limitedAt: Date.now() - 1000, // 1 second ago
          attempts: 1
        }
      };

      mockFs.readFile.mockResolvedValue(JSON.stringify(rateLimits));
      await configManager.loadConfig(); // Load default config with 1 hour cooldown

      const result = await configManager.isProviderRateLimited('claude');

      expect(result).toBe(true);
    });

    it('should return false when cooldown period has passed', async () => {
      const rateLimits = {
        claude: {
          limitedAt: Date.now() - 3700000, // More than 1 hour ago
          attempts: 1
        }
      };

      mockFs.readFile.mockResolvedValue(JSON.stringify(rateLimits));
      await configManager.loadConfig();

      const result = await configManager.isProviderRateLimited('claude');

      expect(result).toBe(false);
    });
  });

  describe('updateRateLimit', () => {
    it('should add rate limit entry when limiting', async () => {
      mockFs.readFile.mockResolvedValue('{}');
      mockFs.mkdir.mockResolvedValue(undefined);

      const beforeTime = Date.now();
      await configManager.updateRateLimit('claude', true);
      const afterTime = Date.now();

      expect(mockFs.writeFile).toHaveBeenCalled();
      const writeCall = mockFs.writeFile.mock.calls[0];
      expect(writeCall).toBeDefined();
      const writtenData = JSON.parse(writeCall![1] as string) as Record<string, { limitedAt: number; attempts: number }>;

      expect(writtenData.claude).toBeDefined();
      expect(writtenData.claude!.limitedAt).toBeGreaterThanOrEqual(beforeTime);
      expect(writtenData.claude!.limitedAt).toBeLessThanOrEqual(afterTime);
      expect(writtenData.claude!.attempts).toBe(1);
    });

    it('should increment attempts on subsequent rate limits', async () => {
      const existingLimits = {
        claude: {
          limitedAt: Date.now() - 1000,
          attempts: 2
        }
      };

      mockFs.readFile.mockResolvedValue(JSON.stringify(existingLimits));
      mockFs.mkdir.mockResolvedValue(undefined);

      await configManager.updateRateLimit('claude', true);

      expect(mockFs.writeFile).toHaveBeenCalled();
      const writeCall = mockFs.writeFile.mock.calls[0];
      expect(writeCall).toBeDefined();
      const writtenData = JSON.parse(writeCall![1] as string) as Record<string, { attempts: number }>;

      expect(writtenData.claude!.attempts).toBe(3);
    });

    it('should remove rate limit entry when clearing', async () => {
      const existingLimits = {
        claude: {
          limitedAt: Date.now(),
          attempts: 1
        }
      };

      mockFs.readFile.mockResolvedValue(JSON.stringify(existingLimits));
      mockFs.mkdir.mockResolvedValue(undefined);

      await configManager.updateRateLimit('claude', false);

      expect(mockFs.writeFile).toHaveBeenCalled();
      const writeCall = mockFs.writeFile.mock.calls[0];
      expect(writeCall).toBeDefined();
      const writtenData = JSON.parse(writeCall![1] as string) as Record<string, unknown>;

      expect(writtenData.claude).toBeUndefined();
    });
  });

  describe('getAvailableProviders', () => {
    it('should return all providers when none are rate limited', async () => {
      mockFs.readFile.mockResolvedValue('{}');
      await configManager.loadConfig();

      const result = await configManager.getAvailableProviders();

      expect(result).toEqual(['claude', 'gemini']);
    });

    it('should exclude rate limited providers', async () => {
      const rateLimits = {
        claude: {
          limitedAt: Date.now() - 1000,
          attempts: 1
        }
      };

      mockFs.readFile
        .mockResolvedValueOnce('{}') // Global config
        .mockResolvedValueOnce('{}') // Local config
        .mockResolvedValue(JSON.stringify(rateLimits)); // Rate limits

      await configManager.loadConfig();
      const result = await configManager.getAvailableProviders();

      expect(result).toEqual(['gemini']);
    });

    it('should return empty array when all providers are rate limited', async () => {
      const rateLimits = {
        claude: {
          limitedAt: Date.now() - 1000,
          attempts: 1
        },
        gemini: {
          limitedAt: Date.now() - 2000,
          attempts: 2
        }
      };

      mockFs.readFile
        .mockResolvedValueOnce('{}') // Global config
        .mockResolvedValueOnce('{}') // Local config
        .mockResolvedValue(JSON.stringify(rateLimits)); // Rate limits

      await configManager.loadConfig();
      const result = await configManager.getAvailableProviders();

      expect(result).toEqual([]);
    });
  });

  describe('checkRateLimit', () => {
    it('should return not limited when no rate limit exists', async () => {
      mockFs.readFile.mockResolvedValue('{}');

      const result = await configManager.checkRateLimit('claude');

      expect(result.isLimited).toBe(false);
      expect(result.timeRemaining).toBeUndefined();
      expect(result.attempts).toBeUndefined();
    });

    it('should return rate limit details when limited', async () => {
      const limitedAt = Date.now() - 30000; // 30 seconds ago
      const rateLimits = {
        claude: {
          limitedAt,
          attempts: 3
        }
      };

      mockFs.readFile.mockResolvedValue(JSON.stringify(rateLimits));
      await configManager.loadConfig();

      const result = await configManager.checkRateLimit('claude');

      expect(result.isLimited).toBe(true);
      expect(result.attempts).toBe(3);
      expect(result.timeRemaining).toBeGreaterThan(3500000); // More than 59 minutes
      expect(result.timeRemaining).toBeLessThan(3600000); // Less than 60 minutes
    });
  });

  describe('getConfig', () => {
    it('should return a copy of the current configuration', async () => {
      await configManager.loadConfig();
      const config1 = configManager.getConfig();
      const config2 = configManager.getConfig();

      expect(config1).toEqual(config2);
      expect(config1).not.toBe(config2); // Different object references
    });
  });

  describe('directory handling', () => {
    it('should create directories when they do not exist', async () => {
      mockFs.readFile.mockResolvedValue('{}');
      mockFs.mkdir.mockResolvedValue(undefined);

      await configManager.updateConfig({ providers: ['claude'] });

      expect(mockFs.mkdir).toHaveBeenCalledWith(
        '/test/project/.autoagent',
        { recursive: true }
      );
    });

    it('should handle EEXIST error when directory already exists', async () => {
      mockFs.readFile.mockResolvedValue('{}');
      const error = new Error('Directory exists') as NodeJS.ErrnoException;
      error.code = 'EEXIST';
      mockFs.mkdir.mockRejectedValueOnce(error);

      await expect(configManager.updateConfig({ providers: ['claude'] }))
        .resolves.not.toThrow();
    });

    it('should throw other errors when creating directories', async () => {
      mockFs.readFile.mockResolvedValue('{}');
      const error = new Error('Permission denied');
      mockFs.mkdir.mockRejectedValueOnce(error);

      await expect(configManager.updateConfig({ providers: ['claude'] }))
        .rejects.toThrow('Permission denied');
    });
  });
});