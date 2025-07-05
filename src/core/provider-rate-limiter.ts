import { promises as fs } from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ProviderName } from '../types';
import { Logger } from '../utils/logger';

/**
 * Rate limit tracking data for providers
 */
export interface ProviderRateLimitData {
  /** Provider name */
  provider: ProviderName;
  /** Timestamp when rate limit was detected */
  limitedAt: number;
  /** Number of consecutive rate limit hits */
  attempts: number;
  /** Last error message that triggered the rate limit */
  lastError?: string;
}

/**
 * Rate limit cache for fast lookups
 */
export interface RateLimitCache {
  [provider: string]: ProviderRateLimitData;
}

/**
 * Rate limit patterns for different providers
 */
const RATE_LIMIT_PATTERNS: Record<string, string[]> = {
  gemini: [
    'status 429',
    'quota exceeded',
    'Quota exceeded',
    'rateLimitExceeded',
    'rate limit exceeded',
    'resource_exhausted',
    'rate_limit_exceeded',
    'too many requests'
  ],
  claude: [
    'rate limit',
    'rate_limit',
    'status 429',
    'too many requests',
    'quota exceeded',
    'resource_exhausted'
  ],
  mock: [
    'rate limit',
    'quota exceeded'
  ]
};

/**
 * Provider-specific configurations
 */
const PROVIDER_CONFIG: Record<string, {
  primaryModel: string;
  fallbackModel?: string;
  cooldownPeriod: number;
}> = {
  gemini: {
    primaryModel: 'gemini-2.5-pro',
    fallbackModel: 'gemini-2.5-flash',
    cooldownPeriod: 3600000 // 1 hour
  },
  claude: {
    primaryModel: 'claude-sonnet-4-20250514',
    fallbackModel: undefined, // No fallback for Claude
    cooldownPeriod: 3600000 // 1 hour
  },
  mock: {
    primaryModel: 'mock-model',
    fallbackModel: undefined,
    cooldownPeriod: 3600000
  }
};

/**
 * Simple but effective rate limiter for providers
 */
export class ProviderRateLimiter {
  private static readonly CACHE_FILE = 'provider-rate-limits.json';
  private static readonly CONFIG_DIR = path.join(os.homedir(), '.autoagent');

  private cache: RateLimitCache = {};
  private cachePath: string;
  private cacheLoaded = false;

  constructor() {
    this.cachePath = path.join(ProviderRateLimiter.CONFIG_DIR, ProviderRateLimiter.CACHE_FILE);
  }

  /**
   * Load rate limit cache from disk
   */
  async loadCache(): Promise<void> {
    if (this.cacheLoaded) { return; }

    try {
      const content = await fs.readFile(this.cachePath, 'utf-8');
      this.cache = JSON.parse(content) as RateLimitCache;
      this.cacheLoaded = true;
    } catch {
      // Cache doesn't exist or is invalid, start with empty cache
      this.cache = {};
      this.cacheLoaded = true;
    }
  }

  /**
   * Save rate limit cache to disk
   */
  async saveCache(): Promise<void> {
    await this.ensureDirectoryExists(path.dirname(this.cachePath));
    await fs.writeFile(this.cachePath, JSON.stringify(this.cache, null, 2));
  }

  /**
   * Check if a provider is currently rate limited
   */
  async isProviderRateLimited(provider: ProviderName): Promise<boolean> {
    await this.loadCache();

    const rateLimitData = this.cache[provider];
    if (!rateLimitData) { return false; }

    const config = PROVIDER_CONFIG[provider];
    if (!config) { return false; }
    
    const timeSinceLimited = Date.now() - rateLimitData.limitedAt;
    
    return timeSinceLimited < config.cooldownPeriod;
  }

  /**
   * Mark a provider as rate limited
   */
  async markProviderRateLimited(provider: ProviderName, error?: string): Promise<void> {
    await this.loadCache();

    const existing = this.cache[provider];
    
    this.cache[provider] = {
      provider,
      limitedAt: Date.now(),
      attempts: (existing?.attempts ?? 0) + 1,
      lastError: error
    };

    await this.saveCache();
    
    Logger.warning(`Rate limit detected for ${provider}. Attempts: ${this.cache[provider].attempts}`);
  }

  /**
   * Clear rate limit for a provider
   */
  async clearProviderRateLimit(provider: ProviderName): Promise<void> {
    await this.loadCache();

    delete this.cache[provider];
    await this.saveCache();
    
    Logger.info(`Rate limit cleared for ${provider}`);
  }

  /**
   * Check if text contains rate limit indicators for a provider
   */
  isRateLimitError(provider: ProviderName, text: string): boolean {
    const patterns = RATE_LIMIT_PATTERNS[provider] || [];
    const lowerText = text.toLowerCase();
    
    return patterns.some((pattern: string) => lowerText.includes(pattern.toLowerCase()));
  }

  /**
   * Get the best model for Gemini (with fallback logic)
   */
  async getBestGeminiModel(): Promise<string> {
    const isRateLimited = await this.isProviderRateLimited('gemini');
    const config = PROVIDER_CONFIG.gemini;
    
    if (!config) { return 'gemini-2.5-pro'; } // Fallback to default
    
    // If rate limited, use fallback model if available
    if (isRateLimited && config.fallbackModel !== null && config.fallbackModel !== undefined && config.fallbackModel !== '') {
      return config.fallbackModel;
    }
    
    return config.primaryModel;
  }

  /**
   * Get rate limit status for a provider
   */
  async getRateLimitStatus(provider: ProviderName): Promise<{
    isLimited: boolean;
    timeRemaining?: number;
    attempts?: number;
    lastError?: string;
  }> {
    await this.loadCache();

    const rateLimitData = this.cache[provider];
    if (!rateLimitData) {
      return { isLimited: false };
    }

    const config = PROVIDER_CONFIG[provider];
    if (!config) {
      return { isLimited: false };
    }
    
    const timeSinceLimited = Date.now() - rateLimitData.limitedAt;
    const isLimited = timeSinceLimited < config.cooldownPeriod;

    return {
      isLimited,
      timeRemaining: isLimited ? config.cooldownPeriod - timeSinceLimited : undefined,
      attempts: rateLimitData.attempts,
      lastError: rateLimitData.lastError
    };
  }

  /**
   * Get summary of all rate limit statuses
   */
  async getRateLimitSummary(): Promise<Record<ProviderName, {
    isLimited: boolean;
    timeRemaining?: number;
    attempts?: number;
  }>> {
    await this.loadCache();

    const summary: Record<ProviderName, {
      isLimited: boolean;
      timeRemaining?: number;
      attempts?: number;
    }> = {} as Record<ProviderName, {
      isLimited: boolean;
      timeRemaining?: number;
      attempts?: number;
    }>;
    
    for (const provider of ['claude', 'gemini'] as ProviderName[]) {
      const status = await this.getRateLimitStatus(provider);
      summary[provider] = {
        isLimited: status.isLimited,
        timeRemaining: status.timeRemaining,
        attempts: status.attempts
      };
    }

    return summary;
  }

  /**
   * Ensure directory exists
   */
  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error;
      }
    }
  }
}