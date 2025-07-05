import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EventEmitter } from 'events';
import { RateLimitMonitor, RateLimitDetectedError } from '../../../src/core/rate-limit-monitor';
import { ProviderRateLimiter } from '../../../src/core/provider-rate-limiter';

// Mock child_process
vi.mock('child_process', () => ({
  spawn: vi.fn()
}));

// Mock StreamFormatter
vi.mock('../../../src/utils/stream-formatter', () => ({
  StreamFormatter: {
    showHeader: vi.fn(),
    showFooter: vi.fn(),
    formatGeminiOutput: vi.fn(),
    displayGeminiText: vi.fn(),
    flushGeminiBuffer: vi.fn(),
    formatClaudeMessage: vi.fn()
  }
}));

// Mock Logger
vi.mock('../../../src/utils/logger', () => ({
  Logger: {
    warning: vi.fn(),
    info: vi.fn(),
    error: vi.fn()
  }
}));

import { spawn } from 'child_process';
import { StreamFormatter } from '../../../src/utils/stream-formatter';
import { Logger } from '../../../src/utils/logger';

const mockSpawn = vi.mocked(spawn);
const mockStreamFormatter = vi.mocked(StreamFormatter);
vi.mocked(Logger);

// Mock child process
class MockChildProcess extends EventEmitter {
  stdout = new EventEmitter();
  stderr = new EventEmitter();
  stdin = {
    write: vi.fn(),
    end: vi.fn()
  };
  kill = vi.fn();

  constructor() {
    super();
  }
}

describe('RateLimitMonitor', () => {
  let rateLimitMonitor: RateLimitMonitor;
  let mockRateLimiter: ProviderRateLimiter;
  let mockChild: MockChildProcess;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockRateLimiter = {
      isRateLimitError: vi.fn(),
      markProviderRateLimited: vi.fn().mockResolvedValue(undefined),
      getBestGeminiModel: vi.fn(),
      isProviderRateLimited: vi.fn()
    } as any;

    rateLimitMonitor = new RateLimitMonitor(mockRateLimiter);
    mockChild = new MockChildProcess();
    mockSpawn.mockReturnValue(mockChild as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('spawnWithMonitoring', () => {
    it('should spawn process with correct arguments', async () => {
      const resultPromise = rateLimitMonitor.spawnWithMonitoring(
        'gemini',
        ['--version'],
        'gemini'
      );

      // Simulate successful process completion
      setTimeout(() => {
        mockChild.emit('close', 0);
      }, 10);

      await resultPromise;

      expect(mockSpawn).toHaveBeenCalledWith('gemini', ['--version'], {
        stdio: ['ignore', 'pipe', 'pipe']
      });
    });

    it('should enable stdin when stdinContent is provided', async () => {
      const resultPromise = rateLimitMonitor.spawnWithMonitoring(
        'gemini',
        ['--yolo'],
        'gemini',
        { stdinContent: 'test prompt' }
      );

      // Simulate successful process completion
      setTimeout(() => {
        mockChild.emit('close', 0);
      }, 10);

      await resultPromise;

      expect(mockSpawn).toHaveBeenCalledWith('gemini', ['--yolo'], {
        stdio: ['pipe', 'pipe', 'pipe']
      });
      expect(mockChild.stdin.write).toHaveBeenCalledWith('test prompt');
      expect(mockChild.stdin.end).toHaveBeenCalled();
    });

    it('should show headers when streaming is enabled', async () => {
      const resultPromise = rateLimitMonitor.spawnWithMonitoring(
        'gemini',
        ['--version'],
        'gemini',
        { enableStreaming: true }
      );

      setTimeout(() => {
        mockChild.emit('close', 0);
      }, 10);

      await resultPromise;

      expect(mockStreamFormatter.showHeader).toHaveBeenCalledWith('gemini');
      expect(mockStreamFormatter.showFooter).toHaveBeenCalled();
    });

    it('should detect rate limit in stderr and terminate process', async () => {
      vi.mocked(mockRateLimiter.isRateLimitError).mockReturnValue(true);

      const resultPromise = rateLimitMonitor.spawnWithMonitoring(
        'gemini',
        ['--version'],
        'gemini'
      );

      // Simulate rate limit error in stderr
      // Use process.nextTick to ensure the promise is set up before emitting events
      process.nextTick(() => {
        mockChild.stderr.emit('data', Buffer.from('Error: quota exceeded'));
        // When rate limit is detected, the monitor kills the process
        // We need to simulate the close event after kill() is called
        process.nextTick(() => {
          mockChild.emit('close', 1);
        });
      });

      const result = await resultPromise;

      expect(mockChild.kill).toHaveBeenCalledWith('SIGTERM');
      expect(result.rateLimitDetected).toBe(true);
      expect(result.terminatedEarly).toBe(true);
      expect(mockRateLimiter.markProviderRateLimited).toHaveBeenCalledWith(
        'gemini',
        'Error: quota exceeded'
      );
    });

    it('should detect rate limit in stdout and terminate process', async () => {
      vi.mocked(mockRateLimiter.isRateLimitError).mockReturnValue(true);

      const resultPromise = rateLimitMonitor.spawnWithMonitoring(
        'claude',
        ['--version'],
        'claude'
      );

      // Simulate rate limit error in stdout
      process.nextTick(() => {
        mockChild.stdout.emit('data', Buffer.from('rate limit exceeded'));
        process.nextTick(() => {
          mockChild.emit('close', 1);
        });
      });

      const result = await resultPromise;

      expect(mockChild.kill).toHaveBeenCalledWith('SIGTERM');
      expect(result.rateLimitDetected).toBe(true);
      expect(result.terminatedEarly).toBe(true);
    });

    it('should handle abort signal', async () => {
      const abortController = new AbortController();
      
      const resultPromise = rateLimitMonitor.spawnWithMonitoring(
        'gemini',
        ['--version'],
        'gemini',
        { signal: abortController.signal }
      );

      // Abort the process
      process.nextTick(() => {
        abortController.abort();
      });

      await expect(resultPromise).rejects.toThrow('Process aborted by user');
      expect(mockChild.kill).toHaveBeenCalledWith('SIGTERM');
    });

    it('should handle process errors', async () => {
      const resultPromise = rateLimitMonitor.spawnWithMonitoring(
        'gemini',
        ['--version'],
        'gemini'
      );

      setTimeout(() => {
        mockChild.emit('error', new Error('spawn failed'));
      }, 10);

      await expect(resultPromise).rejects.toThrow('spawn failed');
    });

    it('should collect stdout and stderr', async () => {
      const resultPromise = rateLimitMonitor.spawnWithMonitoring(
        'gemini',
        ['--version'],
        'gemini'
      );

      setTimeout(() => {
        mockChild.stdout.emit('data', Buffer.from('output chunk 1'));
        mockChild.stdout.emit('data', Buffer.from('output chunk 2'));
        mockChild.stderr.emit('data', Buffer.from('error chunk'));
        mockChild.emit('close', 0);
      }, 10);

      const result = await resultPromise;

      expect(result.stdout).toBe('output chunk 1output chunk 2');
      expect(result.stderr).toBe('error chunk');
      expect(result.exitCode).toBe(0);
      expect(result.rateLimitDetected).toBe(false);
      expect(result.terminatedEarly).toBe(false);
    });
  });

  describe('executeGeminiWithFallback', () => {
    beforeEach(() => {
      vi.mocked(mockRateLimiter.getBestGeminiModel).mockResolvedValue('gemini-2.5-pro');
    });

    it('should add model argument when not present', async () => {
      const resultPromise = rateLimitMonitor.executeGeminiWithFallback(['--yolo']);

      setTimeout(() => {
        mockChild.emit('close', 0);
      }, 10);

      await resultPromise;

      expect(mockSpawn).toHaveBeenCalledWith('gemini', ['--yolo', '--model', 'gemini-2.5-pro'], {
        stdio: ['ignore', 'pipe', 'pipe']
      });
    });

    it('should fall back to flash model on rate limit detection', async () => {
      vi.mocked(mockRateLimiter.isRateLimitError).mockReturnValue(true);
      
      let callCount = 0;
      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        callCount++;
        
        if (callCount === 1) {
          // First call - simulate rate limit
          process.nextTick(() => {
            child.stderr.emit('data', Buffer.from('quota exceeded'));
            process.nextTick(() => {
              child.emit('close', 1);
            });
          });
        } else {
          // Second call - simulate success
          vi.mocked(mockRateLimiter.isRateLimitError).mockReturnValue(false);
          process.nextTick(() => {
            child.emit('close', 0);
          });
        }
        
        return child as any;
      });

      const result = await rateLimitMonitor.executeGeminiWithFallback(['--yolo']);

      expect(mockSpawn).toHaveBeenCalledTimes(2);
      
      // First call with pro model
      expect(mockSpawn).toHaveBeenNthCalledWith(1, 'gemini', ['--yolo', '--model', 'gemini-2.5-pro'], {
        stdio: ['ignore', 'pipe', 'pipe']
      });
      
      // Second call with flash model
      expect(mockSpawn).toHaveBeenNthCalledWith(2, 'gemini', ['--yolo', '--model', 'gemini-2.5-flash'], {
        stdio: ['ignore', 'pipe', 'pipe']
      });
      
      expect(result.rateLimitDetected).toBe(false); // Second attempt succeeded
    });

    it('should log model selection', async () => {
      vi.mocked(mockRateLimiter.getBestGeminiModel).mockResolvedValue('gemini-2.5-pro');
      
      const resultPromise = rateLimitMonitor.executeGeminiWithFallback(['--yolo']);

      setTimeout(() => {
        mockChild.emit('close', 0);
      }, 10);

      await resultPromise;

      // Check that the model argument was added correctly
      expect(mockSpawn).toHaveBeenCalledWith('gemini', 
        expect.arrayContaining(['--model', 'gemini-2.5-pro', '--yolo']),
        expect.any(Object)
      );
    });

    it('should throw RateLimitDetectedError when fallback also fails', async () => {
      vi.mocked(mockRateLimiter.getBestGeminiModel)
        .mockResolvedValueOnce('gemini-2.5-pro')
        .mockResolvedValueOnce('gemini-2.5-flash');
      vi.mocked(mockRateLimiter.isRateLimitError).mockReturnValue(true);

      // Create new mock instances for each spawn call
      let callCount = 0;
      mockSpawn.mockImplementation(() => {
        callCount++;
        const child = new MockChildProcess();
        process.nextTick(() => {
          child.stderr.emit('data', Buffer.from('quota exceeded'));
          process.nextTick(() => {
            child.emit('close', 1);
          });
        });
        return child as any;
      });

      await expect(rateLimitMonitor.executeGeminiWithFallback(['--yolo']))
        .rejects.toThrow('All Gemini models are rate limited');
      
      expect(callCount).toBe(2); // Both models should be tried
    });
  });

  describe('executeClaudeWithMonitoring', () => {
    it('should execute Claude without model fallback', async () => {
      const resultPromise = rateLimitMonitor.executeClaudeWithMonitoring(['-p', 'test']);

      setTimeout(() => {
        mockChild.emit('close', 0);
      }, 10);

      const result = await resultPromise;

      expect(mockSpawn).toHaveBeenCalledWith('claude', ['-p', 'test'], {
        stdio: ['ignore', 'pipe', 'pipe']
      });
      expect(result.rateLimitDetected).toBe(false);
    });

    it('should throw RateLimitDetectedError on rate limit detection', async () => {
      vi.mocked(mockRateLimiter.isRateLimitError).mockReturnValue(true);

      mockSpawn.mockImplementation(() => {
        const child = new MockChildProcess();
        setTimeout(() => {
          child.stderr.emit('data', Buffer.from('rate limit exceeded'));
          setTimeout(() => child.emit('close', 1), 5);
        }, 10);
        return child as any;
      });

      await expect(rateLimitMonitor.executeClaudeWithMonitoring(['-p', 'test']))
        .rejects.toThrow('Rate limit detected for claude');
    });

    it('should detect rate limits in error messages', async () => {
      vi.mocked(mockRateLimiter.isRateLimitError).mockReturnValue(true);

      const promise = rateLimitMonitor.executeClaudeWithMonitoring(['-p', 'test']);

      process.nextTick(() => {
        mockChild.emit('error', new Error('rate limit exceeded'));
      });

      await expect(promise).rejects.toThrow(RateLimitDetectedError);
      expect(mockRateLimiter.markProviderRateLimited).toHaveBeenCalledWith(
        'claude',
        'rate limit exceeded'
      );
    });
  });
});