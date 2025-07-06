/**
 * Compiled regex patterns for performance optimization
 */

/**
 * Usage limit detection patterns
 */
export const USAGE_LIMIT_PATTERNS = {
  /** Claude-specific usage limit with timestamp */
  CLAUDE_TIMESTAMPED: /Claude AI usage limit reached\|(\d+)/i,
  
  /** Generic usage limit with timestamp */
  GENERIC_TIMESTAMPED: /usage limit reached\|(\d+)/i,
  
  /** Usage limit without timestamp */
  USAGE_LIMIT: /usage limit/i,
  
  /** Combined pattern for any usage limit message */
  ANY_USAGE_LIMIT: /usage limit[^|]*\|?\d*/i
} as const;

/**
 * Rate limit detection patterns
 */
export const RATE_LIMIT_PATTERNS = {
  /** Rate limit with retry-after */
  WITH_RETRY_AFTER: /rate limit.*retry[- ]?after[: ]+(\d+)/i,
  
  /** Generic rate limit */
  RATE_LIMIT: /rate limit/i,
  
  /** Too many requests */
  TOO_MANY_REQUESTS: /too many requests/i,
  
  /** Quota exceeded */
  QUOTA_EXCEEDED: /quota exceeded/i
} as const;

/**
 * Provider command patterns
 */
export const PROVIDER_PATTERNS = {
  /** Issue number extraction from file path */
  ISSUE_NUMBER: /(\d+)-/,
  
  /** Version command detection */
  VERSION_COMMAND: /--version/,
  
  /** File change indicators in output */
  FILE_CHANGES: /(?:modified|created|updated|changed):\s*([^\n]+)/gi
} as const;

/**
 * Error classification patterns
 */
export const ERROR_PATTERNS = {
  /** General error indicators */
  ERROR_INDICATORS: /(?:error|failed|exception|traceback):/i,
  
  /** Network-related errors */
  NETWORK_ERRORS: /(?:timeout|connection|network)/i,
  
  /** Authentication errors */
  AUTH_ERRORS: /(?:unauthorized|forbidden|authentication)/i,
  
  /** Not found errors */
  NOT_FOUND_ERRORS: /not found/i
} as const;

/**
 * Utility functions for pattern matching
 */
export class PatternMatcher {
  /**
   * Extract usage limit timestamp from message
   */
  static extractUsageLimitTimestamp(message: string): number | undefined {
    const match = message.match(USAGE_LIMIT_PATTERNS.CLAUDE_TIMESTAMPED) || 
                  message.match(USAGE_LIMIT_PATTERNS.GENERIC_TIMESTAMPED);
    
    if (match?.[1] !== undefined && match[1] !== '') {
      const timestamp = parseInt(match[1], 10);
      return isNaN(timestamp) ? undefined : timestamp;
    }
    
    return undefined;
  }

  /**
   * Extract retry-after seconds from rate limit message
   */
  static extractRetryAfter(message: string): number | undefined {
    const match = message.match(RATE_LIMIT_PATTERNS.WITH_RETRY_AFTER);
    
    if (match?.[1] !== undefined && match[1] !== '') {
      const seconds = parseInt(match[1], 10);
      return isNaN(seconds) ? undefined : seconds;
    }
    
    return undefined;
  }

  /**
   * Extract issue number from file path
   */
  static extractIssueNumber(filePath: string): number {
    const match = filePath.match(PROVIDER_PATTERNS.ISSUE_NUMBER);
    return match?.[1] !== undefined && match[1] !== '' ? parseInt(match[1], 10) : 0;
  }

  /**
   * Extract changed files from provider output
   */
  static extractChangedFiles(output: string): string[] {
    const matches = Array.from(output.matchAll(PROVIDER_PATTERNS.FILE_CHANGES));
    return matches.map(match => match[1]?.trim()).filter((file): file is string => Boolean(file));
  }

  /**
   * Check if message indicates a usage limit error
   */
  static isUsageLimitError(message: string): boolean {
    return USAGE_LIMIT_PATTERNS.USAGE_LIMIT.test(message);
  }

  /**
   * Check if message indicates a rate limit error
   */
  static isRateLimitError(message: string): boolean {
    return RATE_LIMIT_PATTERNS.RATE_LIMIT.test(message) ||
           RATE_LIMIT_PATTERNS.TOO_MANY_REQUESTS.test(message) ||
           RATE_LIMIT_PATTERNS.QUOTA_EXCEEDED.test(message);
  }

  /**
   * Check if message indicates any limit error (rate or usage)
   */
  static isLimitError(message: string): boolean {
    return this.isUsageLimitError(message) || this.isRateLimitError(message);
  }

  /**
   * Check if output contains error indicators
   */
  static hasErrorIndicators(output: string): boolean {
    return ERROR_PATTERNS.ERROR_INDICATORS.test(output);
  }

  /**
   * Check if error is retryable
   */
  static isRetryableError(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    
    // Always retry limit errors
    if (this.isLimitError(message)) {
      return true;
    }
    
    // Don't retry auth or not found errors
    if (ERROR_PATTERNS.AUTH_ERRORS.test(lowerMessage) || 
        ERROR_PATTERNS.NOT_FOUND_ERRORS.test(lowerMessage)) {
      return false;
    }
    
    // Retry network errors
    if (ERROR_PATTERNS.NETWORK_ERRORS.test(lowerMessage)) {
      return true;
    }
    
    return true;
  }

  /**
   * Check if command is a version check
   */
  static isVersionCommand(args: string[]): boolean {
    return args.some(arg => PROVIDER_PATTERNS.VERSION_COMMAND.test(arg));
  }
}

/**
 * Legacy compatibility - re-export the main pattern matching function
 */
export const isRateLimitOrUsageError = (message: string): boolean => PatternMatcher.isLimitError(message);