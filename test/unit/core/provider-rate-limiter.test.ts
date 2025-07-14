import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import * as path from 'path';

// Mock os module FIRST - before other imports
vi.mock('os', async (importOriginal) => {
  const actual = await importOriginal<typeof import('os')>();
  return {
    ...actual,
    homedir: vi.fn(() => '/mock/home')
  };
});

// Mock fs module
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
    mkdir: vi.fn()
  }
}));

import { ProviderRateLimiter } from '../../../src/core/provider-rate-limiter';

const mockFs = fs as any;
const mockReadFile = mockFs.readFile;
const mockWriteFile = mockFs.writeFile;
const mockMkdir = mockFs.mkdir;

describe('ProviderRateLimiter', () => {
  let rateLimiter: ProviderRateLimiter;
  const mockHomeDir = '/mock/home';
  const mockCachePath = path.join(mockHomeDir, '.autoagent', 'provider-rate-limits.json');

  beforeEach(() => {
    vi.clearAllMocks();
    rateLimiter = new ProviderRateLimiter();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('loadCache', () => {
    it('should load existing cache from disk', async () => {
      const mockCacheData = {
        gemini: {
          provider: 'gemini' as const,
          limitedAt: Date.now() - 1000,
          attempts: 1,
          lastError: 'quota exceeded'
        }
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockCacheData));

      await rateLimiter.loadCache();

      expect(mockReadFile).toHaveBeenCalledWith(mockCachePath, 'utf-8');
    });

    it('should start with empty cache if file does not exist', async () => {
      mockReadFile.mockRejectedValue(new Error('ENOENT'));

      await rateLimiter.loadCache();

      const isLimited = await rateLimiter.isProviderRateLimited('gemini');
      expect(isLimited).toBe(false);
    });

    it('should start with empty cache if file contains invalid JSON', async () => {
      mockReadFile.mockResolvedValue('invalid json');

      await rateLimiter.loadCache();

      const isLimited = await rateLimiter.isProviderRateLimited('gemini');
      expect(isLimited).toBe(false);
    });

    it('should only load cache once', async () => {
      mockReadFile.mockResolvedValue('{}');

      await rateLimiter.loadCache();
      await rateLimiter.loadCache();

      expect(mockReadFile).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveCache', () => {
    it('should save cache to disk', async () => {
      mockReadFile.mockRejectedValue(new Error('ENOENT'));
      mockMkdir.mockResolvedValue(undefined);
      mockWriteFile.mockResolvedValue(undefined);

      await rateLimiter.markProviderRateLimited('gemini', 'test error');

      expect(mockMkdir).toHaveBeenCalledWith(
        path.dirname(mockCachePath),
        { recursive: true }
      );
      expect(mockWriteFile).toHaveBeenCalledWith(
        mockCachePath,
        expect.stringContaining('"provider": "gemini"')
      );
    });
  });

  describe('isProviderRateLimited', () => {
    it('should return false for provider that has never been rate limited', async () => {
      mockReadFile.mockRejectedValue(new Error('ENOENT'));

      const isLimited = await rateLimiter.isProviderRateLimited('gemini');

      expect(isLimited).toBe(false);
    });

    it('should return true for recently rate limited provider', async () => {
      const recentTime = Date.now() - 1000; // 1 second ago
      const mockCacheData = {
        gemini: {
          provider: 'gemini' as const,
          limitedAt: recentTime,
          attempts: 1
        }
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockCacheData));

      const isLimited = await rateLimiter.isProviderRateLimited('gemini');

      expect(isLimited).toBe(true);
    });

    it('should return false for provider rate limited longer than cooldown period', async () => {
      const oldTime = Date.now() - (3600000 + 1000); // More than 1 hour ago
      const mockCacheData = {
        gemini: {
          provider: 'gemini' as const,
          limitedAt: oldTime,
          attempts: 1
        }
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockCacheData));

      const isLimited = await rateLimiter.isProviderRateLimited('gemini');

      expect(isLimited).toBe(false);
    });
  });

  describe('markProviderRateLimited', () => {
    beforeEach(() => {
      mockReadFile.mockRejectedValue(new Error('ENOENT'));
      mockMkdir.mockResolvedValue(undefined);
      mockWriteFile.mockResolvedValue(undefined);
    });

    it('should mark provider as rate limited with current timestamp', async () => {
      const beforeTime = Date.now();
      
      await rateLimiter.markProviderRateLimited('gemini', 'test error');
      
      const afterTime = Date.now();

      expect(mockWriteFile).toHaveBeenCalled();
      const writeCall = mockWriteFile.mock.calls[0];
      const savedData = JSON.parse(writeCall[1] as string);
      
      expect(savedData.gemini.provider).toBe('gemini');
      expect(savedData.gemini.limitedAt).toBeGreaterThanOrEqual(beforeTime);
      expect(savedData.gemini.limitedAt).toBeLessThanOrEqual(afterTime);
      expect(savedData.gemini.attempts).toBe(1);
      expect(savedData.gemini.lastError).toBe('test error');
    });

    it('should increment attempts for existing rate limited provider', async () => {
      const existingData = {
        gemini: {
          provider: 'gemini' as const,
          limitedAt: Date.now() - 1000,
          attempts: 2
        }
      };

      mockReadFile.mockResolvedValue(JSON.stringify(existingData));

      await rateLimiter.markProviderRateLimited('gemini', 'another error');

      const writeCall = mockWriteFile.mock.calls[0];
      const savedData = JSON.parse(writeCall[1] as string);
      
      expect(savedData.gemini.attempts).toBe(3);
    });
  });

  describe('clearProviderRateLimit', () => {
    it('should remove provider from rate limit cache', async () => {
      const mockCacheData = {
        gemini: {
          provider: 'gemini' as const,
          limitedAt: Date.now(),
          attempts: 1
        }
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockCacheData));
      mockWriteFile.mockResolvedValue(undefined);

      await rateLimiter.clearProviderRateLimit('gemini');

      const writeCall = mockWriteFile.mock.calls[0];
      const savedData = JSON.parse(writeCall[1] as string);
      
      expect(savedData.gemini).toBeUndefined();
    });
  });

  describe('isRateLimitError', () => {
    it('should detect Gemini rate limit patterns', () => {
      const testCases = [
        'status 429',
        'quota exceeded',
        'Quota exceeded',
        'rateLimitExceeded',
        'rate limit exceeded',
        'resource_exhausted',
        'rate_limit_exceeded',
        'too many requests'
      ];

      for (const pattern of testCases) {
        expect(rateLimiter.isRateLimitError('gemini', pattern)).toBe(true);
        expect(rateLimiter.isRateLimitError('gemini', `Error: ${pattern}`)).toBe(true);
        expect(rateLimiter.isRateLimitError('gemini', pattern.toUpperCase())).toBe(true);
      }
    });

    it('should detect Claude rate limit patterns', () => {
      const testCases = [
        'rate limit',
        'rate_limit',
        'status 429',
        'too many requests',
        'quota exceeded',
        'resource_exhausted'
      ];

      for (const pattern of testCases) {
        expect(rateLimiter.isRateLimitError('claude', pattern)).toBe(true);
        expect(rateLimiter.isRateLimitError('claude', `Error: ${pattern}`)).toBe(true);
        expect(rateLimiter.isRateLimitError('claude', pattern.toUpperCase())).toBe(true);
      }
    });

    it('should not detect non-rate-limit errors', () => {
      const testCases = [
        'network error',
        'connection timeout',
        'invalid request',
        'authentication failed'
      ];

      for (const pattern of testCases) {
        expect(rateLimiter.isRateLimitError('gemini', pattern)).toBe(false);
        expect(rateLimiter.isRateLimitError('claude', pattern)).toBe(false);
      }
    });
  });

  describe('getBestGeminiModel', () => {
    it('should return primary model when not rate limited', async () => {
      mockReadFile.mockRejectedValue(new Error('ENOENT'));

      const model = await rateLimiter.getBestGeminiModel();

      expect(model).toBe('gemini-2.5-pro');
    });

    it('should return fallback model when rate limited', async () => {
      const mockCacheData = {
        gemini: {
          provider: 'gemini' as const,
          limitedAt: Date.now(),
          attempts: 1
        }
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockCacheData));

      const model = await rateLimiter.getBestGeminiModel();

      expect(model).toBe('gemini-2.5-flash');
    });
  });

  describe('getRateLimitStatus', () => {
    it('should return not limited status for non-rate-limited provider', async () => {
      mockReadFile.mockRejectedValue(new Error('ENOENT'));

      const status = await rateLimiter.getRateLimitStatus('gemini');

      expect(status.isLimited).toBe(false);
      expect(status.timeRemaining).toBeUndefined();
      expect(status.attempts).toBeUndefined();
      expect(status.lastError).toBeUndefined();
    });

    it('should return detailed status for rate limited provider', async () => {
      const limitedAt = Date.now() - 1800000; // 30 minutes ago
      const mockCacheData = {
        claude: {
          provider: 'claude' as const,
          limitedAt,
          attempts: 3,
          lastError: 'too many requests'
        }
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockCacheData));

      const status = await rateLimiter.getRateLimitStatus('claude');

      expect(status.isLimited).toBe(true);
      // Allow for small timing variations (1-2ms) during test execution
      expect(status.timeRemaining).toBeGreaterThan(1799990); // At least 29:59.990 remaining
      expect(status.timeRemaining).toBeLessThanOrEqual(1800000); // At most 30:00.000 remaining
      expect(status.attempts).toBe(3);
      expect(status.lastError).toBe('too many requests');
    });
  });

  describe('getRateLimitSummary', () => {
    it('should return summary of all providers', async () => {
      const mockCacheData = {
        gemini: {
          provider: 'gemini' as const,
          limitedAt: Date.now(),
          attempts: 1
        },
        claude: {
          provider: 'claude' as const,
          limitedAt: Date.now() - 3700000, // Over 1 hour ago
          attempts: 2
        }
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockCacheData));

      const summary = await rateLimiter.getRateLimitSummary();

      expect(summary.gemini.isLimited).toBe(true);
      expect(summary.gemini.attempts).toBe(1);
      expect(summary.claude.isLimited).toBe(false);
      expect(summary.claude.attempts).toBe(2);
    });
  });
});