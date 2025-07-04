import { describe, bench, beforeAll } from 'vitest';
import { ConfigManager } from '../../../../src/core/config-manager';
import { createBenchmark } from '../utils/benchmark.utils';
import { createTempDir } from '../../../setup';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('ConfigManager Performance Benchmarks', () => {
  let tempDir: string;
  let configPath: string;
  let configManager: ConfigManager;
  let largeConfig: any;

  beforeAll(async () => {
    tempDir = createTempDir();
    configPath = path.join(tempDir, '.autoagent', 'config.json');
    await fs.mkdir(path.dirname(configPath), { recursive: true });
    configManager = new ConfigManager(tempDir);
    
    largeConfig = {
      providers: ['claude', 'gemini'],
      failoverDelay: 5000,
      retryAttempts: 3,
      maxTokens: 100000,
      rateLimitCooldown: 3600000,
      gitAutoCommit: false,
      gitCommitInterval: 600000,
      logLevel: 'info' as const,
      customData: Array.from({ length: 100 }, (_, i) => ({
        id: i,
        value: `data-${i}`,
        nested: {
          prop1: `prop1-${i}`,
          prop2: `prop2-${i}`,
          prop3: `prop3-${i}`
        }
      }))
    };
    
    await fs.writeFile(configPath, JSON.stringify(largeConfig, null, 2));
  });

  describe('Config Loading', () => {
    bench('load config from file', async () => {
      const manager = new ConfigManager(tempDir);
      await manager.loadConfig();
    });

    bench('load config with defaults', async () => {
      const manager = new ConfigManager('/non/existent/path');
      await manager.loadConfig();
    });

    createBenchmark(
      'load large config',
      async () => {
        const manager = new ConfigManager(tempDir);
        await manager.loadConfig();
      },
      { iterations: 100 }
    );
  });

  describe('Provider Management', () => {
    bench('check rate limit status', async () => {
      await configManager.isProviderRateLimited('claude');
    });

    bench('get available providers', async () => {
      await configManager.getAvailableProviders();
    });

    bench('filter rate-limited providers', async () => {
      const providers = ['claude', 'gemini', 'openai', 'anthropic'];
      const available = [];
      for (const provider of providers) {
        if (!await configManager.isProviderRateLimited(provider as any)) {
          available.push(provider);
        }
      }
    });
  });

  describe('Rate Limit Management', () => {
    beforeAll(async () => {
      // Setup some rate limit data
      const rateLimits = {
        claude: { timestamp: Date.now() - 1000000, count: 5 },
        gemini: { timestamp: Date.now() - 2000000, count: 3 }
      };
      await fs.writeFile(
        path.join(tempDir, '.autoagent', 'rate-limits.json'),
        JSON.stringify(rateLimits)
      );
    });

    bench('load rate limits', async () => {
      const manager = new ConfigManager(tempDir);
      await manager.loadRateLimits();
    });

    bench('save rate limits', async () => {
      await configManager.saveRateLimits();
    });

    createBenchmark(
      'check rate limits 100 times',
      async () => {
        for (let i = 0; i < 100; i++) {
          await configManager.isProviderRateLimited('claude');
        }
      },
      { iterations: 10 }
    );
  });
});