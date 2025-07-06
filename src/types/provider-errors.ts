/**
 * Standardized error types for AI provider operations
 */

/**
 * Base interface for structured provider errors
 */
export interface ProviderError {
  type: string;
  provider: string;
  message: string;
  timestamp: number;
  code?: string;
}

/**
 * Usage limit error structure
 */
export interface UsageLimitError extends ProviderError {
  type: 'usage_limit';
  resetTime?: number;
  quotaType?: 'daily' | 'monthly' | 'hourly';
}

/**
 * Rate limit error structure
 */
export interface RateLimitError extends ProviderError {
  type: 'rate_limit';
  retryAfter?: number;
  rateLimitType?: 'requests_per_minute' | 'requests_per_second';
}

/**
 * Provider execution error structure
 */
export interface ExecutionError extends ProviderError {
  type: 'execution_error';
  exitCode?: number;
  stderr?: string;
}

/**
 * Provider availability error structure
 */
export interface AvailabilityError extends ProviderError {
  type: 'availability_error';
  reason: 'not_installed' | 'not_authenticated' | 'network_error' | 'service_unavailable';
}

/**
 * Union type for all provider errors
 */
export type AnyProviderError = UsageLimitError | RateLimitError | ExecutionError | AvailabilityError;

/**
 * Factory functions for creating structured errors
 */
export class ProviderErrorFactory {
  static createUsageLimitError(
    provider: string,
    message: string,
    resetTime?: number,
    quotaType?: 'daily' | 'monthly' | 'hourly'
  ): UsageLimitError {
    return {
      type: 'usage_limit',
      provider,
      message,
      timestamp: Date.now(),
      resetTime,
      quotaType
    };
  }

  static createRateLimitError(
    provider: string,
    message: string,
    retryAfter?: number,
    rateLimitType?: 'requests_per_minute' | 'requests_per_second'
  ): RateLimitError {
    return {
      type: 'rate_limit',
      provider,
      message,
      timestamp: Date.now(),
      retryAfter,
      rateLimitType
    };
  }

  static createExecutionError(
    provider: string,
    message: string,
    exitCode?: number,
    stderr?: string
  ): ExecutionError {
    return {
      type: 'execution_error',
      provider,
      message,
      timestamp: Date.now(),
      exitCode,
      stderr
    };
  }

  static createAvailabilityError(
    provider: string,
    message: string,
    reason: AvailabilityError['reason']
  ): AvailabilityError {
    return {
      type: 'availability_error',
      provider,
      message,
      timestamp: Date.now(),
      reason
    };
  }
}

/**
 * Type guards for provider errors
 */
export function isUsageLimitError(error: unknown): error is UsageLimitError {
  return typeof error === 'object' && error !== null && 'type' in error && error.type === 'usage_limit';
}

export function isRateLimitError(error: unknown): error is RateLimitError {
  return typeof error === 'object' && error !== null && 'type' in error && error.type === 'rate_limit';
}

export function isExecutionError(error: unknown): error is ExecutionError {
  return typeof error === 'object' && error !== null && 'type' in error && error.type === 'execution_error';
}

export function isAvailabilityError(error: unknown): error is AvailabilityError {
  return typeof error === 'object' && error !== null && 'type' in error && error.type === 'availability_error';
}

export function isProviderError(error: unknown): error is AnyProviderError {
  return isUsageLimitError(error) || isRateLimitError(error) || isExecutionError(error) || isAvailabilityError(error);
}

/**
 * Utility to extract time remaining from usage/rate limit errors
 */
export function getTimeRemaining(error: UsageLimitError | RateLimitError): number | undefined {
  if (isUsageLimitError(error) && error.resetTime !== undefined && error.resetTime > 0) {
    return Math.max(0, error.resetTime * 1000 - Date.now());
  }
  
  if (isRateLimitError(error) && error.retryAfter !== undefined && error.retryAfter > 0) {
    return error.retryAfter * 1000;
  }
  
  return undefined;
}

/**
 * Utility to format error messages consistently
 */
export function formatProviderError(error: AnyProviderError): string {
  const timeRemaining = getTimeRemaining(error as UsageLimitError | RateLimitError);
  const timeStr = timeRemaining !== undefined && timeRemaining > 0 ? ` (retry in ${Math.ceil(timeRemaining / 1000)}s)` : '';
  
  return `${error.provider} ${error.type.replace('_', ' ')}: ${error.message}${timeStr}`;
}