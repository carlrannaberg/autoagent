import { describe, bench, beforeAll } from 'vitest';
import { ClaudeProvider } from '~/providers/claude';
import { GeminiProvider } from '~/providers/gemini';
import { createProvider } from '~/providers';
import { createBenchmark, BenchmarkTimer } from '../utils/benchmark.utils';
import { createMockConfig, mockCommandRunner } from '../../test-helpers';
import type { Config, Provider } from '~/types';

describe('Provider Performance Benchmarks', () => {
  let config: Config;
  let claudeProvider: Provider;
  let geminiProvider: Provider;

  beforeAll(() => {
    config = createMockConfig();
    mockCommandRunner();
    claudeProvider = new ClaudeProvider(config);
    geminiProvider = new GeminiProvider(config);
  });

  describe('Provider Initialization', () => {
    bench('initialize Claude provider', () => {
      new ClaudeProvider(config);
    });

    bench('initialize Gemini provider', () => {
      new GeminiProvider(config);
    });

    bench('create provider with factory (Claude)', () => {
      createProvider('claude', config);
    });

    bench('create provider with factory (Gemini)', () => {
      createProvider('gemini', config);
    });

    createBenchmark(
      'initialize providers 100 times',
      () => {
        for (let i = 0; i < 100; i++) {
          if (i % 2 === 0) {
            new ClaudeProvider(config);
          } else {
            new GeminiProvider(config);
          }
        }
      },
      { iterations: 10 }
    );
  });

  describe('Provider Switching', () => {
    bench('switch from Claude to Gemini', () => {
      const timer = new BenchmarkTimer();
      
      timer.mark('claude-init');
      const claude = createProvider('claude', config);
      
      timer.mark('gemini-init');
      const gemini = createProvider('gemini', config);
      
      timer.mark('complete');
    });

    bench('switch providers 10 times', () => {
      const providers: Provider[] = [];
      for (let i = 0; i < 10; i++) {
        const provider = createProvider(i % 2 === 0 ? 'claude' : 'gemini', config);
        providers.push(provider);
      }
    });

    createBenchmark(
      'provider switching with state',
      async () => {
        const claude = createProvider('claude', config);
        await claude.execute('test prompt 1');
        
        const gemini = createProvider('gemini', config);
        await gemini.execute('test prompt 2');
        
        const claude2 = createProvider('claude', config);
        await claude2.execute('test prompt 3');
      },
      { iterations: 20 }
    );
  });

  describe('Provider Execution', () => {
    bench('Claude execute (mocked)', async () => {
      await claudeProvider.execute('Test prompt for benchmarking');
    });

    bench('Gemini execute (mocked)', async () => {
      await geminiProvider.execute('Test prompt for benchmarking');
    });

    bench('execute with retry logic', async () => {
      const provider = createProvider('claude', { 
        ...config, 
        providers: { ...config.providers, retryLimit: 3 } 
      });
      await provider.execute('Test prompt');
    });

    createBenchmark(
      'concurrent executions',
      async () => {
        const promises = Array.from({ length: 5 }, (_, i) => 
          claudeProvider.execute(`Prompt ${i}`)
        );
        await Promise.all(promises);
      },
      { iterations: 10 }
    );
  });

  describe('Rate Limit Handling', () => {
    bench('check rate limit (not limited)', () => {
      const provider = new ClaudeProvider(config);
      provider.isRateLimited();
    });

    bench('handle rate limit error', async () => {
      const provider = new ClaudeProvider(config);
      try {
        await provider.execute('prompt', { simulateRateLimit: true });
      } catch (error) {
        // Expected rate limit error
      }
    });

    createBenchmark(
      'rate limit recovery cycle',
      async () => {
        const provider = new ClaudeProvider(config);
        
        // Simulate hitting rate limit
        try {
          await provider.execute('prompt', { simulateRateLimit: true });
        } catch {}
        
        // Check if still rate limited
        for (let i = 0; i < 10; i++) {
          provider.isRateLimited();
        }
      },
      { iterations: 50 }
    );
  });

  describe('Provider Configuration', () => {
    bench('update provider config', () => {
      const provider = new ClaudeProvider(config);
      const newConfig = { ...config, providers: { ...config.providers, retryLimit: 5 } };
      provider.updateConfig(newConfig);
    });

    bench('validate provider options', () => {
      const provider = new ClaudeProvider(config);
      provider.validateOptions({
        temperature: 0.7,
        maxTokens: 2048,
        topP: 0.9
      });
    });

    bench('serialize provider state', () => {
      const provider = new ClaudeProvider(config);
      JSON.stringify({
        type: provider.name,
        config: provider.config,
        metrics: provider.getMetrics()
      });
    });
  });
});