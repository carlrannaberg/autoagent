import { Config } from '../../src/types';

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

  async loadConfig(): Promise<Config> {
    return this.config;
  }

  getConfig(): Config {
    return this.config;
  }

  updateConfig(updates: Partial<Config>): void {
    this.config = { ...this.config, ...updates };
  }

  async isProviderRateLimited(provider: string): Promise<boolean> {
    const limitTime = this.rateLimits.get(provider);
    if (!limitTime) return false;
    return Date.now() < limitTime;
  }

  async getAvailableProviders(): Promise<string[]> {
    const available: string[] = [];
    for (const provider of this.config.providers) {
      const isLimited = await this.isProviderRateLimited(provider);
      if (!isLimited) {
        available.push(provider);
      }
    }
    return available;
  }

  async updateRateLimit(provider: string, resetTime: number): Promise<void> {
    this.rateLimits.set(provider, resetTime);
  }

  async checkRateLimit(provider: string): Promise<{ isLimited: boolean; resetTime?: number }> {
    const isLimited = await this.isProviderRateLimited(provider);
    const resetTime = this.rateLimits.get(provider);
    return { isLimited, resetTime };
  }
}