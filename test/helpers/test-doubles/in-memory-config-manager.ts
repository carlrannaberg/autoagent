import { Config } from '../../../src/types';

export class InMemoryConfigManager {
  private config: Config;
  private rateLimits: Map<string, number> = new Map();

  constructor(initialConfig?: Partial<Config>) {
    this.config = {
      providers: ['claude', 'gemini'],
      failoverDelay: 5000,
      retryAttempts: 3,
      maxTokens: 100000,
      rateLimitCooldown: 3600000,
      gitAutoCommit: false,
      gitCommitInterval: 600000,
      logLevel: 'info',
      customInstructions: '',
      ...initialConfig
    };
  }

  loadConfig(): Config {
    return this.config;
  }

  getConfig(): Config {
    return this.config;
  }

  updateConfig(updates: Partial<Config>): void {
    this.config = { ...this.config, ...updates };
  }

  isProviderRateLimited(provider: string): boolean {
    const limitTime = this.rateLimits.get(provider);
    if (limitTime === null || limitTime === undefined) {return false;}
    return Date.now() < limitTime;
  }

  getAvailableProviders(): string[] {
    const available: string[] = [];
    for (const provider of this.config.providers) {
      const isLimited = this.isProviderRateLimited(provider);
      if (!isLimited) {
        available.push(provider);
      }
    }
    return available;
  }

  updateRateLimit(provider: string, resetTime: number): void {
    this.rateLimits.set(provider, resetTime);
  }

  checkRateLimit(provider: string): { isLimited: boolean; resetTime?: number } {
    const isLimited = this.isProviderRateLimited(provider);
    const resetTime = this.rateLimits.get(provider);
    return { isLimited, resetTime };
  }

  resolveAdditionalDirectories(
    _configDirs: string[] = [],
    _cliDirs: string[] = [],
    _basePath?: string
  ): Promise<string[]> {
    // Simple mock implementation that returns empty array
    return Promise.resolve([]);
  }
}