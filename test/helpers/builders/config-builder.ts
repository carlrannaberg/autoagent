import { Config } from '../../../src/types';

export class ConfigBuilder {
  private config: Partial<Config> = {
    providers: ['claude', 'gemini'],
    maxTokens: 100000,
    rateLimitCooldown: 3600000,
    retryAttempts: 3,
    failoverDelay: 5000,
    gitAutoCommit: false,
    gitCommitInterval: 600000,
    logLevel: 'info',
    customInstructions: ''
  };

  withProviders(providers: string[]): this {
    this.config.providers = providers;
    return this;
  }

  withMaxTokens(tokens: number): this {
    this.config.maxTokens = tokens;
    return this;
  }

  withRateLimitCooldown(cooldown: number): this {
    this.config.rateLimitCooldown = cooldown;
    return this;
  }

  withRetryAttempts(attempts: number): this {
    this.config.retryAttempts = attempts;
    return this;
  }

  withFailoverDelay(delay: number): this {
    this.config.failoverDelay = delay;
    return this;
  }

  withGitAutoCommit(enabled: boolean): this {
    this.config.gitAutoCommit = enabled;
    return this;
  }

  withGitCommitInterval(interval: number): this {
    this.config.gitCommitInterval = interval;
    return this;
  }

  withLogLevel(level: 'debug' | 'info' | 'warn' | 'error'): this {
    this.config.logLevel = level;
    return this;
  }

  withCustomInstructions(instructions: string): this {
    this.config.customInstructions = instructions;
    return this;
  }

  build(): Config {
    return this.config;
  }

  static default(): Config {
    return new ConfigBuilder().build();
  }

  static minimal(): Config {
    return new ConfigBuilder()
      .withProviders(['mock'])
      .withMaxTokens(1000)
      .withRetryAttempts(1)
      .withRateLimitCooldown(0)
      .build();
  }

  static production(): Config {
    return new ConfigBuilder()
      .withProviders(['claude', 'gemini'])
      .withMaxTokens(200000)
      .withRetryAttempts(5)
      .withFailoverDelay(10000)
      .withRateLimitCooldown(7200000) // 2 hours
      .withGitAutoCommit(true)
      .withGitCommitInterval(300000) // 5 minutes
      .withLogLevel('warn')
      .build();
  }

  static testing(): Config {
    return new ConfigBuilder()
      .withProviders(['mock'])
      .withMaxTokens(100)
      .withRetryAttempts(0)
      .withFailoverDelay(0)
      .withRateLimitCooldown(0)
      .withGitAutoCommit(false)
      .withLogLevel('debug')
      .build();
  }

  static withOverrides(overrides: Partial<Config>): Config {
    return {
      ...ConfigBuilder.default(),
      ...overrides
    };
  }
}