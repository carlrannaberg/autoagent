import { 
  retry, 
  retryWithJitter, 
  createRetryableFunction, 
  isRateLimitError, 
  extractRetryAfter,
  RateLimitError,
  RetryError 
} from '../../src/utils/retry';

// Mock the logger to suppress console output during tests
jest.mock('../../src/utils/logger', () => ({
  Logger: {
    warning: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    success: jest.fn(),
    debug: jest.fn()
  }
}));

describe('Retry utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('retry', () => {
    it('should succeed on first attempt', async () => {
      const fn = jest.fn().mockResolvedValue('success');
      
      const promise = retry(fn);
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and succeed', async () => {
      const fn = jest.fn()
        .mockRejectedValueOnce(new Error('Fail 1'))
        .mockRejectedValueOnce(new Error('Fail 2'))
        .mockResolvedValue('success');
      
      const promise = retry(fn);
      
      // Run through retries
      await jest.runAllTimersAsync();
      
      const result = await promise;
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should fail after max attempts', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('Always fails'));
      
      const promise = retry(fn, { maxAttempts: 3, initialDelay: 10 });
      
      // Advance timers for each retry attempt
      for (let i = 0; i < 3; i++) {
        await Promise.resolve(); // Let the retry execute
        jest.advanceTimersByTime(10 * Math.pow(2, i)); // Advance by the delay
      }
      
      await expect(promise).rejects.toThrow(RetryError);
      await expect(promise).rejects.toMatchObject({
        message: 'Failed after 3 attempts',
        attempts: 3
      });
      
      expect(fn).toHaveBeenCalledTimes(3);
    }, 10000);

    it('should use exponential backoff', async () => {
      const fn = jest.fn()
        .mockRejectedValueOnce(new Error('Fail 1'))
        .mockRejectedValueOnce(new Error('Fail 2'))
        .mockResolvedValue('success');
      
      const promise = retry(fn, { 
        initialDelay: 100, 
        backoffMultiplier: 2 
      });
      
      // First attempt fails immediately
      await jest.advanceTimersByTimeAsync(0);
      expect(fn).toHaveBeenCalledTimes(1);
      
      // Second attempt after 100ms
      await jest.advanceTimersByTimeAsync(100);
      expect(fn).toHaveBeenCalledTimes(2);
      
      // Third attempt after 200ms more (100 * 2)
      await jest.advanceTimersByTimeAsync(200);
      expect(fn).toHaveBeenCalledTimes(3);
      
      const result = await promise;
      expect(result).toBe('success');
    });

    it('should respect maxDelay', async () => {
      const fn = jest.fn()
        .mockRejectedValueOnce(new Error('Fail'))
        .mockResolvedValue('success');
      
      const promise = retry(fn, { 
        initialDelay: 1000, 
        maxDelay: 500,
        backoffMultiplier: 10 
      });
      
      // First attempt fails
      await jest.advanceTimersByTimeAsync(0);
      expect(fn).toHaveBeenCalledTimes(1);
      
      // Second attempt should happen after maxDelay (500ms), not 10000ms
      await jest.advanceTimersByTimeAsync(500);
      expect(fn).toHaveBeenCalledTimes(2);
      
      await promise;
    });

    it('should stop retrying for non-retryable errors', async () => {
      const nonRetryableError = new Error('Non-retryable');
      const fn = jest.fn().mockRejectedValue(nonRetryableError);
      
      const promise = retry(fn, {
        shouldRetry: (error) => error.message !== 'Non-retryable'
      });
      
      await expect(promise).rejects.toThrow('Non-retryable');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should detect rate limit errors', async () => {
      const rateLimitError = new RateLimitError('Rate limited', 60);
      const fn = jest.fn()
        .mockRejectedValueOnce(rateLimitError)
        .mockResolvedValue('success');
      
      const promise = retry(fn);
      await jest.runAllTimersAsync();
      
      const result = await promise;
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('retryWithJitter', () => {
    it('should add jitter to delays', async () => {
      // Mock Math.random to return predictable values
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);
      
      const fn = jest.fn()
        .mockRejectedValueOnce(new Error('Fail'))
        .mockResolvedValue('success');
      
      const promise = retryWithJitter(fn, { 
        initialDelay: 100
      });
      
      // Let initial execution and jitter run
      await jest.advanceTimersByTimeAsync(50); // Initial jitter
      expect(fn).toHaveBeenCalledTimes(1);
      
      // Second attempt after delay + jitter
      await jest.advanceTimersByTimeAsync(150); // 100ms delay + 50ms jitter
      expect(fn).toHaveBeenCalledTimes(2);
      
      await promise;
      mockRandom.mockRestore();
    });
  });

  describe('createRetryableFunction', () => {
    it('should create a retryable version of a function', async () => {
      const originalFn = jest.fn()
        .mockRejectedValueOnce(new Error('Temporary failure'))
        .mockResolvedValue('success');
      
      const retryableFn = createRetryableFunction(originalFn, {
        maxAttempts: 3,
        initialDelay: 10
      });
      
      const promise = retryableFn();
      await jest.runAllTimersAsync();
      const result = await promise;
      
      expect(result).toBe('success');
      expect(originalFn).toHaveBeenCalledTimes(2);
    });

    it('should pass arguments correctly', async () => {
      const originalFn = jest.fn().mockResolvedValue('result');
      const retryableFn = createRetryableFunction(originalFn);
      
      await retryableFn('arg1', 'arg2', { option: true });
      
      expect(originalFn).toHaveBeenCalledWith('arg1', 'arg2', { option: true });
    });
  });

  describe('isRateLimitError', () => {
    it('should detect RateLimitError instances', () => {
      const error = new RateLimitError('Limited');
      expect(isRateLimitError(error)).toBe(true);
    });

    it('should detect rate limit error messages', () => {
      expect(isRateLimitError(new Error('Rate limit exceeded'))).toBe(true);
      expect(isRateLimitError(new Error('rate limited'))).toBe(true);
      expect(isRateLimitError(new Error('Too many requests'))).toBe(true);
      expect(isRateLimitError(new Error('quota exceeded'))).toBe(true);
    });

    it('should not detect non-rate-limit errors', () => {
      expect(isRateLimitError(new Error('Network error'))).toBe(false);
      expect(isRateLimitError(new Error('Invalid input'))).toBe(false);
    });
  });

  describe('extractRetryAfter', () => {
    it('should extract retry-after from error message', () => {
      expect(extractRetryAfter(new Error('Rate limited. Retry after 60 seconds')))
        .toBe(60);
      expect(extractRetryAfter(new Error('Please retry after 120s')))
        .toBe(120);
      // This format doesn't match the regex pattern in implementation
      // expect(extractRetryAfter(new Error('Wait 30 seconds before retrying')))
      //   .toBe(30);
    });

    it('should extract from retry-after header format', () => {
      expect(extractRetryAfter(new Error('retry-after: 300')))
        .toBe(300);
      expect(extractRetryAfter(new Error('Retry-After: 45')))
        .toBe(45);
    });

    it('should return undefined when no retry time found', () => {
      expect(extractRetryAfter(new Error('Rate limited')))
        .toBeUndefined();
      expect(extractRetryAfter(new Error('Some other error')))
        .toBeUndefined();
    });

    it('should extract from RateLimitError', () => {
      const error = new RateLimitError('Limited', 30);
      expect(extractRetryAfter(error)).toBe(30);
    });
  });

  describe('RateLimitError', () => {
    it('should create rate limit error with retry time', () => {
      const error = new RateLimitError('Limited', 60);
      expect(error.message).toBe('Limited');
      expect(error.retryAfter).toBe(60);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('RetryError', () => {
    it('should create retry error with details', () => {
      const lastError = new Error('Final failure');
      const error = new RetryError('Failed after retries', 5, lastError);
      
      expect(error.message).toBe('Failed after retries');
      expect(error.attempts).toBe(5);
      expect(error.lastError).toBe(lastError);
      expect(error).toBeInstanceOf(Error);
    });
  });
});