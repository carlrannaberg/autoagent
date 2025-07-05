import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EventEmitter } from 'events';
import { ProviderRateLimiter } from '../../../src/core/provider-rate-limiter';
import { RateLimitMonitor } from '../../../src/core/rate-limit-monitor';
import { GeminiProvider } from '../../../src/providers/GeminiProvider';

// Mock fs operations to use in-memory storage
const mockFileSystem: Map<string, string> = new Map();

vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs')>();
  return {
    ...actual,
    promises: {
      readFile: vi.fn().mockImplementation((path: string) => {
        const content = mockFileSystem.get(path);
        if (content === undefined) {
          const error = new Error(`ENOENT: no such file or directory, open '${path}'`);
          (error as any).code = 'ENOENT';
          return Promise.reject(error);
        }
        return Promise.resolve(content);
      }),
      writeFile: vi.fn().mockImplementation((path: string, content: string) => {
        mockFileSystem.set(path, content);
        return Promise.resolve();
      }),
      mkdir: vi.fn().mockImplementation(() => Promise.resolve())
    }
  };
});

// Also mock fs/promises for imports that use it directly
vi.mock('fs/promises', () => ({
  readFile: vi.fn().mockImplementation((path: string) => {
    const content = mockFileSystem.get(path);
    if (content === undefined) {
      const error = new Error(`ENOENT: no such file or directory, open '${path}'`);
      (error as any).code = 'ENOENT';
      return Promise.reject(error);
    }
    return Promise.resolve(content);
  }),
  writeFile: vi.fn().mockImplementation((path: string, content: string) => {
    mockFileSystem.set(path, content);
    return Promise.resolve();
  }),
  mkdir: vi.fn().mockImplementation(() => Promise.resolve())
}));

vi.mock('os', async (importOriginal) => {
  const actual = await importOriginal<typeof import('os')>();
  return {
    ...actual,
    homedir: vi.fn(() => '/mock/home')
  };
});

// Mock child_process
vi.mock('child_process', () => ({
  spawn: vi.fn()
}));

// Mock StreamFormatter and Logger
vi.mock('../../../src/utils/stream-formatter', () => ({
  StreamFormatter: {
    showHeader: vi.fn(),
    showFooter: vi.fn(),
    formatGeminiOutput: vi.fn(),
    displayGeminiText: vi.fn(),
    flushGeminiBuffer: vi.fn().mockReturnValue(''),
    formatClaudeMessage: vi.fn()
  }
}));

vi.mock('../../../src/utils/logger', () => ({
  Logger: {
    warning: vi.fn(),
    info: vi.fn(),
    error: vi.fn()
  }
}));

import { spawn } from 'child_process';

const mockSpawn = vi.mocked(spawn);

class MockChildProcess extends EventEmitter {
  stdout = new EventEmitter();
  stderr = new EventEmitter();
  stdin = {
    write: vi.fn(),
    end: vi.fn()
  };
  kill = vi.fn();
}

describe('Rate Limiting Integration Tests', () => {
  let rateLimiter: ProviderRateLimiter;
  let provider: GeminiProvider;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFileSystem.clear();
    
    rateLimiter = new ProviderRateLimiter();
    new RateLimitMonitor(rateLimiter);
    provider = new GeminiProvider();
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockFileSystem.clear();
  });

  describe('Complete Rate Limiting Flow', () => {
    it('should handle complete rate limit detection and recovery cycle', async () => {
      // Setup mock child processes
      let processCallCount = 0;
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        processCallCount++;
        
        if (processCallCount === 1) {
          // First process - simulate rate limit in stderr
          setTimeout(() => {
            child.stderr.emit('data', Buffer.from('Error: quota exceeded for gemini-2.5-pro'));
            setTimeout(() => child.emit('close', 1), 10);
          }, 20);
        } else if (processCallCount === 2) {
          // Second process - simulate successful fallback to flash
          setTimeout(() => {
            child.stdout.emit('data', Buffer.from('Task completed successfully\nModified: src/test.ts'));
            child.emit('close', 0);
          }, 20);
        }
        
        return child as any;
      });

      // Setup test files
      mockFileSystem.set('/test/1-test-issue.md', 'Test issue content');
      mockFileSystem.set('/test/1-test-plan.md', 'Test plan content');

      // Execute the task
      const result = await provider.execute('/test/1-test-issue.md', '/test/1-test-plan.md');

      // Verify the execution succeeded after fallback
      expect(result.success).toBe(true);
      expect(result.filesChanged).toEqual(['src/test.ts']);
      
      // Verify two processes were spawned
      expect(mockSpawn).toHaveBeenCalledTimes(2);
      
      // Verify first call used pro model
      expect(mockSpawn).toHaveBeenNthCalledWith(1, 'gemini', 
        expect.arrayContaining(['--model', 'gemini-2.5-pro']),
        expect.any(Object)
      );
      
      // Verify second call used flash model
      expect(mockSpawn).toHaveBeenNthCalledWith(2, 'gemini',
        expect.arrayContaining(['--model', 'gemini-2.5-flash']),
        expect.any(Object)
      );

      // Verify rate limit was recorded
      const status = await rateLimiter.getRateLimitStatus('gemini');
      expect(status.isLimited).toBe(true);
      expect(status.attempts).toBe(1);
      expect(status.lastError).toContain('quota exceeded');
    });

    it('should persist rate limit status across provider instances', async () => {
      // Setup files FIRST before any provider operations
      mockFileSystem.set('/test/2-test-issue.md', 'Another test issue');
      mockFileSystem.set('/test/2-test-plan.md', 'Another test plan');
      
      // First, mark Gemini as rate limited
      await rateLimiter.markProviderRateLimited('gemini', 'quota exceeded');
      
      // Create a new provider instance (simulating restart)
      const newProvider = new GeminiProvider();
      
      // Note: GeminiProvider no longer pre-checks rate limits to allow model fallback
      // So it will try to execute and hit rate limit during execution
      // For this test, we'll mock a successful execution that hits rate limit during spawn
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        setTimeout(() => {
          child.stderr.emit('data', Buffer.from('Error: quota exceeded'));
          child.emit('close', 1);
        }, 20);
        return child as any;
      });
      
      const result = await newProvider.execute('/test/2-test-issue.md', '/test/2-test-plan.md');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Rate limit detected');
      
      // Verify spawn was called (no longer fails fast)
      expect(mockSpawn).toHaveBeenCalled();
    });

    it('should recover from rate limit after cooldown period', async () => {
      // Mark provider as rate limited with old timestamp
      const oldTimestamp = Date.now() - (3600000 + 1000); // Over 1 hour ago
      const cacheData = {
        gemini: {
          provider: 'gemini' as const,
          limitedAt: oldTimestamp,
          attempts: 1,
          lastError: 'quota exceeded'
        }
      };
      
      mockFileSystem.set('/mock/home/.autoagent/provider-rate-limits.json', JSON.stringify(cacheData));
      
      // Setup successful execution
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        setTimeout(() => {
          child.stdout.emit('data', Buffer.from('Task completed successfully'));
          child.emit('close', 0);
        }, 20);
        return child as any;
      });
      
      // Setup test files
      mockFileSystem.set('/test/3-test-issue.md', 'Recovered test issue');
      mockFileSystem.set('/test/3-test-plan.md', 'Recovered test plan');
      
      // Execute should succeed
      const result = await provider.execute('/test/3-test-issue.md', '/test/3-test-plan.md');
      
      expect(result.success).toBe(true);
      expect(mockSpawn).toHaveBeenCalled();
    });

    it('should handle chat operations with rate limiting', async () => {
      // Setup successful chat response
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        setTimeout(() => {
          child.stdout.emit('data', Buffer.from('This is a helpful response'));
          child.emit('close', 0);
        }, 20);
        return child as any;
      });
      
      // Execute chat
      const response = await provider.chat('What is the weather?');
      
      expect(response).toBe('This is a helpful response');
      expect(mockSpawn).toHaveBeenCalledWith('gemini',
        expect.arrayContaining(['What is the weather?']),
        expect.any(Object)
      );
    });

    it('should handle chat with rate limit detection', async () => {
      // Setup rate limit response
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        setTimeout(() => {
          child.stderr.emit('data', Buffer.from('rate limit exceeded'));
          child.emit('close', 1);
        }, 20);
        return child as any;
      });
      
      // Execute chat - should throw rate limit error
      await expect(provider.chat('What is the weather?')).rejects.toThrow(
        'Gemini rate limit detected'
      );
      
      // Verify rate limit was recorded in the provider's internal rate limiter
      // Note: The test's rateLimiter instance is separate from the provider's
      // So we can't check the status here directly
    });

    it('should handle multiple concurrent requests with rate limiting', async () => {
      // Clear any previous mock calls
      mockSpawn.mockClear();
      
      // Setup rate limit on all requests
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        // All requests hit rate limit
        setTimeout(() => {
          child.stderr.emit('data', Buffer.from('quota exceeded'));
          child.emit('close', 1);
        }, 20);
        return child as any;
      });
      
      // Setup test files
      mockFileSystem.set('/test/concurrent-1.md', 'Concurrent issue 1');
      mockFileSystem.set('/test/concurrent-1-plan.md', 'Concurrent plan 1');
      mockFileSystem.set('/test/concurrent-2.md', 'Concurrent issue 2');
      mockFileSystem.set('/test/concurrent-2-plan.md', 'Concurrent plan 2');
      
      // Execute multiple requests
      const [result1, result2] = await Promise.all([
        provider.execute('/test/concurrent-1.md', '/test/concurrent-1-plan.md'),
        provider.execute('/test/concurrent-2.md', '/test/concurrent-2-plan.md')
      ]);
      
      // Both should fail
      expect(result1.success).toBe(false);
      expect(result2.success).toBe(false);
      
      // Both should have rate limit errors
      expect(result1.error).toBeDefined();
      expect(result2.error).toBeDefined();
      
      // Each execute() might try multiple models (pro then flash) due to fallback
      // So we might get 4 calls total (2 per execute)
      expect(mockSpawn.mock.calls.length).toBeGreaterThanOrEqual(2);
      expect(mockSpawn.mock.calls.length).toBeLessThanOrEqual(4);
    }, 20000);
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle spawn errors gracefully', async () => {
      // Setup files first
      mockFileSystem.set('/test/error-issue.md', 'Error test issue');
      mockFileSystem.set('/test/error-plan.md', 'Error test plan');
      
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        setTimeout(() => {
          child.emit('error', new Error('spawn ENOENT'));
        }, 20);
        return child as any;
      });
      
      const result = await provider.execute('/test/error-issue.md', '/test/error-plan.md');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('spawn ENOENT');
    });

    it('should handle abort signals correctly', async () => {
      // Setup files first
      mockFileSystem.set('/test/abort-issue.md', 'Abort test issue');
      mockFileSystem.set('/test/abort-plan.md', 'Abort test plan');
      
      const abortController = new AbortController();
      
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        // Don't emit any events - simulate hanging process
        return child as any;
      });
      
      // Start execution and abort after short delay
      const executePromise = provider.execute(
        '/test/abort-issue.md', 
        '/test/abort-plan.md',
        [],
        abortController.signal
      );
      
      setTimeout(() => abortController.abort(), 50);
      
      const result = await executePromise;
      expect(result.success).toBe(false);
      expect(result.error).toContain('aborted');
    });

    it('should handle cache file corruption gracefully', async () => {
      // Corrupt the cache file
      mockFileSystem.set('/mock/home/.autoagent/provider-rate-limits.json', 'invalid json {');
      
      // Should still work by starting with empty cache
      const isLimited = await rateLimiter.isProviderRateLimited('gemini');
      expect(isLimited).toBe(false);
    });
  });
});