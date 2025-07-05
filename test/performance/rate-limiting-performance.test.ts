import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { performance } from 'perf_hooks';
import { EventEmitter } from 'events';
import { ProviderRateLimiter } from '../../src/core/provider-rate-limiter';
import { RateLimitMonitor } from '../../src/core/rate-limit-monitor';

// Mock fs with fast in-memory operations
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

vi.mock('os', () => ({
  homedir: vi.fn(() => '/mock/home')
}));

vi.mock('child_process', () => ({
  spawn: vi.fn()
}));

vi.mock('../../src/utils/stream-formatter', () => ({
  StreamFormatter: {
    showHeader: vi.fn(),
    showFooter: vi.fn(),
    formatGeminiOutput: vi.fn(),
    displayGeminiText: vi.fn(),
    flushGeminiBuffer: vi.fn().mockReturnValue(''),
    formatClaudeMessage: vi.fn()
  }
}));

vi.mock('../../src/utils/logger', () => ({
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

describe('Rate Limiting Performance Tests', () => {
  let rateLimiter: ProviderRateLimiter;
  let monitor: RateLimitMonitor;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFileSystem.clear();
    
    rateLimiter = new ProviderRateLimiter();
    monitor = new RateLimitMonitor(rateLimiter);
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockFileSystem.clear();
  });

  describe('Rate Limit Check Performance', () => {
    it('should check rate limit status quickly when not rate limited', async () => {
      const iterations = 1000;
      const start = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        await rateLimiter.isProviderRateLimited('gemini');
      }
      
      const end = performance.now();
      const totalTime = end - start;
      const averageTime = totalTime / iterations;
      
      // Should be very fast - less than 1ms per check on average
      expect(averageTime).toBeLessThan(1);
      
      // Performance info: Rate limit checks: ${iterations} operations in ${totalTime.toFixed(2)}ms (${averageTime.toFixed(3)}ms avg)
    });

    it('should check rate limit status quickly when rate limited', async () => {
      // Setup rate limited state
      await rateLimiter.markProviderRateLimited('gemini', 'test error');
      
      const iterations = 1000;
      const start = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        await rateLimiter.isProviderRateLimited('gemini');
      }
      
      const end = performance.now();
      const totalTime = end - start;
      const averageTime = totalTime / iterations;
      
      // Should be very fast even when rate limited
      expect(averageTime).toBeLessThan(1);
      
      // Performance info: Rate limited checks: ${iterations} operations in ${totalTime.toFixed(2)}ms (${averageTime.toFixed(3)}ms avg)
    });

    it('should handle concurrent rate limit checks efficiently', async () => {
      const concurrentChecks = 100;
      const start = performance.now();
      
      const promises = Array.from({ length: concurrentChecks }, () =>
        rateLimiter.isProviderRateLimited('gemini')
      );
      
      await Promise.all(promises);
      
      const end = performance.now();
      const totalTime = end - start;
      
      // Concurrent checks should complete quickly
      expect(totalTime).toBeLessThan(100);
      
      // Performance info: Concurrent rate limit checks: ${concurrentChecks} operations in ${totalTime.toFixed(2)}ms
    });
  });

  describe('Cache Performance', () => {
    it('should cache loading be efficient', async () => {
      // Setup a cache with multiple providers
      const cacheData = {
        gemini: {
          provider: 'gemini' as const,
          limitedAt: Date.now(),
          attempts: 1
        },
        claude: {
          provider: 'claude' as const,
          limitedAt: Date.now() - 1800000,
          attempts: 2
        }
      };
      
      mockFileSystem.set('/mock/home/.autoagent/provider-rate-limits.json', JSON.stringify(cacheData));
      
      const iterations = 100;
      const start = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        const newRateLimiter = new ProviderRateLimiter();
        await newRateLimiter.loadCache();
      }
      
      const end = performance.now();
      const totalTime = end - start;
      const averageTime = totalTime / iterations;
      
      // Cache loading should be fast
      expect(averageTime).toBeLessThan(5);
      
      // Performance info: Cache loading: ${iterations} operations in ${totalTime.toFixed(2)}ms (${averageTime.toFixed(3)}ms avg)
    });

    it('should handle cache saves efficiently', async () => {
      const iterations = 100;
      const start = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        await rateLimiter.markProviderRateLimited('gemini', `error ${i}`);
      }
      
      const end = performance.now();
      const totalTime = end - start;
      const averageTime = totalTime / iterations;
      
      // Cache saves should be reasonably fast
      expect(averageTime).toBeLessThan(10);
      
      // Performance info: Cache saves: ${iterations} operations in ${totalTime.toFixed(2)}ms (${averageTime.toFixed(3)}ms avg)
    });
  });

  describe('Pattern Matching Performance', () => {
    it('should detect rate limit patterns quickly', () => {
      const testTexts = [
        'Error: quota exceeded for your project',
        'Request failed with status 429: Too Many Requests',
        'rateLimitExceeded: The request was rate limited',
        'resource_exhausted: Quota exceeded',
        'Normal error message without rate limit indicators',
        'Connection timeout error',
        'Invalid authentication credentials',
        'Network error occurred'
      ];
      
      const iterations = 1000;
      const start = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        for (const text of testTexts) {
          rateLimiter.isRateLimitError('gemini', text);
          rateLimiter.isRateLimitError('claude', text);
        }
      }
      
      const end = performance.now();
      const totalTime = end - start;
      const totalChecks = iterations * testTexts.length * 2; // 2 providers
      const averageTime = totalTime / totalChecks;
      
      // Pattern matching should be very fast
      expect(averageTime).toBeLessThan(0.01);
      
      // Performance info: Pattern matching: ${totalChecks} checks in ${totalTime.toFixed(2)}ms (${(averageTime * 1000).toFixed(3)}μs avg)
    });
  });

  describe('Process Monitoring Overhead', () => {
    it('should add minimal overhead to process execution', async () => {
      // Setup fast mock process
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        // Simulate immediate completion
        setImmediate(() => {
          child.stdout.emit('data', Buffer.from('Success'));
          child.emit('close', 0);
        });
        return child as any;
      });
      
      const iterations = 50; // Fewer iterations due to async nature
      const start = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        await monitor.spawnWithMonitoring('gemini', ['--version'], 'gemini');
      }
      
      const end = performance.now();
      const totalTime = end - start;
      const averageTime = totalTime / iterations;
      
      // Process monitoring should add minimal overhead
      // This is mainly testing that we don't have any blocking operations
      expect(averageTime).toBeLessThan(20); // 20ms per spawn call is reasonable
      
      // Performance info: Process monitoring: ${iterations} spawns in ${totalTime.toFixed(2)}ms (${averageTime.toFixed(2)}ms avg)
    });

    it('should handle stream chunks efficiently during rate limit detection', async () => {
      // Setup process that emits many chunks before rate limit
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        
        setImmediate(() => {
          // Emit many normal chunks
          for (let i = 0; i < 100; i++) {
            child.stdout.emit('data', Buffer.from(`Normal output chunk ${i}\n`));
          }
          
          // Then emit rate limit error
          child.stderr.emit('data', Buffer.from('Error: quota exceeded'));
          
          setImmediate(() => child.emit('close', 1));
        });
        
        return child as any;
      });
      
      const start = performance.now();
      
      const result = await monitor.spawnWithMonitoring('gemini', ['--test'], 'gemini');
      
      const end = performance.now();
      const totalTime = end - start;
      
      expect(result.rateLimitDetected).toBe(true);
      expect(result.terminatedEarly).toBe(true);
      
      // Should handle many chunks quickly
      expect(totalTime).toBeLessThan(100);
      
      // Performance info: Stream processing with rate limit: ${totalTime.toFixed(2)}ms
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory with repeated rate limit operations', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Perform many rate limit operations
      for (let i = 0; i < 1000; i++) {
        await rateLimiter.markProviderRateLimited('gemini', `error ${i}`);
        await rateLimiter.isProviderRateLimited('gemini');
        await rateLimiter.clearProviderRateLimit('gemini');
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be minimal (less than 2MB)
      expect(memoryIncrease).toBeLessThan(2 * 1024 * 1024);
      
      // Performance info: Memory increase after 1000 operations: ${(memoryIncrease / 1024).toFixed(2)}KB
    });
  });
});