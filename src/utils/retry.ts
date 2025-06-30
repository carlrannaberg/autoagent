import { Logger } from './logger';

export interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: Error) => boolean;
  onRetry?: (error: Error, attempt: number) => void;
}

export class RetryError extends Error {
  constructor(
    message: string,
    public readonly attempts: number,
    public readonly lastError: Error
  ) {
    super(message);
    this.name = 'RetryError';
  }
}

export class RateLimitError extends Error {
  constructor(
    message: string,
    public readonly retryAfter?: number
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 30000,
  backoffMultiplier: 2,
  shouldRetry: (error: Error) => {
    // Always retry rate limit errors
    if (error instanceof RateLimitError) {
      return true;
    }
    
    // Check for common rate limit patterns in error messages
    const message = error.message.toLowerCase();
    if (message.includes('rate limit') || 
        message.includes('too many requests') ||
        message.includes('quota exceeded')) {
      return true;
    }
    
    // Don't retry on specific errors
    if (message.includes('not found') ||
        message.includes('unauthorized') ||
        message.includes('forbidden')) {
      return false;
    }
    
    // Retry on network errors
    if (error.name === 'NetworkError' ||
        message.includes('timeout') ||
        message.includes('connection')) {
      return true;
    }
    
    return true;
  },
  onRetry: (error: Error, attempt: number) => {
    Logger.warning(`Retry attempt ${attempt}: ${error.message}`);
  }
};

export async function retry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Check if we should retry
      if (!opts.shouldRetry(lastError)) {
        throw lastError;
      }
      
      // Don't retry if this is the last attempt
      if (attempt === opts.maxAttempts) {
        throw new RetryError(
          `Failed after ${opts.maxAttempts} attempts`,
          opts.maxAttempts,
          lastError
        );
      }
      
      // Calculate delay with exponential backoff
      let delay = opts.initialDelay * Math.pow(opts.backoffMultiplier, attempt - 1);
      
      // Handle rate limit errors with specific retry-after
      if (lastError instanceof RateLimitError && lastError.retryAfter !== undefined && lastError.retryAfter !== null && lastError.retryAfter > 0) {
        delay = lastError.retryAfter * 1000; // Convert seconds to milliseconds
      }
      
      // Cap the delay at maxDelay
      delay = Math.min(delay, opts.maxDelay);
      
      // Call the retry callback
      opts.onRetry(lastError, attempt);
      
      // Wait before retrying
      await sleep(delay);
    }
  }
  
  // This should never be reached, but TypeScript needs it
  throw new RetryError(
    `Failed after ${opts.maxAttempts} attempts`,
    opts.maxAttempts,
    lastError || new Error('Unknown error')
  );
}

export async function retryWithJitter<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const jitteredOptions: RetryOptions = {
    ...options,
    onRetry: (error: Error, attempt: number) => {
      // Call original onRetry if provided
      options?.onRetry?.(error, attempt);
    }
  };
  
  return retry(async () => {
    // Add jitter to the actual execution
    const jitterDelay = Math.random() * 100; // 0-100ms jitter
    await sleep(jitterDelay);
    return fn();
  }, jitteredOptions);
}

export function createRetryableFunction<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  options?: RetryOptions
): T {
  return (async (...args: Parameters<T>) => {
    return retry(() => fn(...args), options);
  }) as T;
}

export function isRateLimitError(error: Error): boolean {
  if (error instanceof RateLimitError) {
    return true;
  }
  
  const message = error.message.toLowerCase();
  return message.includes('rate limit') || 
         message.includes('too many requests') ||
         message.includes('quota exceeded');
}

export function extractRetryAfter(error: Error): number | undefined {
  if (error instanceof RateLimitError) {
    return error.retryAfter;
  }
  
  // Try to extract retry-after from error message
  const match = error.message.match(/retry[- ]?after[: ]+(\d+)/i);
  if (match !== null && match[1] !== undefined && match[1] !== '') {
    return parseInt(match[1], 10);
  }
  
  return undefined;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const retryDefaults = {
  maxAttempts: defaultOptions.maxAttempts,
  initialDelay: defaultOptions.initialDelay,
  maxDelay: defaultOptions.maxDelay,
  backoffMultiplier: defaultOptions.backoffMultiplier,
};