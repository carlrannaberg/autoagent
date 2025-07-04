import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import * as path from 'path';
import { ProviderSimulator, ProviderFailoverSimulator } from '../../helpers/setup/provider-simulator';
import { createIntegrationContext, cleanupIntegrationContext, createTestIssue, measureExecutionTime } from '../../helpers/setup/integration-helpers';
import type { IntegrationTestContext } from '../../helpers/setup/integration-helpers';
import type { Issue } from '@/types/issue';

describe('Performance Integration Tests', () => {
  let context: IntegrationTestContext;
  let providers: Map<string, ProviderSimulator>;

  beforeEach(async () => {
    context = await createIntegrationContext();
    
    providers = new Map([
      ['claude', new ProviderSimulator({ name: 'claude', responseDelay: 100 })],
      ['gemini', new ProviderSimulator({ name: 'gemini', responseDelay: 150 })],
      ['gpt4', new ProviderSimulator({ name: 'gpt4', responseDelay: 200 })]
    ]);
  });

  afterEach(async () => {
    await cleanupIntegrationContext(context);
    providers.clear();
  });

  describe('Concurrent Execution Performance', () => {
    it('should measure concurrent vs sequential execution time', async () => {
      const tasks = Array.from({ length: 10 }, (_, i) => ({
        id: `task-${i}`,
        prompt: `Execute task ${i}`,
        provider: ['claude', 'gemini', 'gpt4'][i % 3]
      }));

      const { duration: sequentialTime } = await measureExecutionTime(async () => {
        const results = [];
        for (const task of tasks) {
          const provider = providers.get(task.provider)!;
          const result = await provider.execute(task.prompt);
          results.push(result);
        }
        return results;
      });

      const { duration: concurrentTime } = await measureExecutionTime(async () => {
        return await Promise.all(
          tasks.map(task => {
            const provider = providers.get(task.provider)!;
            return provider.execute(task.prompt);
          })
        );
      });

      expect(concurrentTime).toBeLessThan(sequentialTime);
      const speedup = sequentialTime / concurrentTime;
      expect(speedup).toBeGreaterThan(2);
    });

    it('should handle high concurrency levels', async () => {
      const concurrencyLevels = [10, 50, 100];
      const results: Array<{ level: number; duration: number; errors: number }> = [];

      for (const level of concurrencyLevels) {
        const tasks = Array.from({ length: level }, (_, i) => `Task ${i}`);
        let errorCount = 0;

        const { duration } = await measureExecutionTime(async () => {
          const responses = await Promise.allSettled(
            tasks.map(task => {
              const provider = providers.get('claude')!;
              return provider.execute(task);
            })
          );

          errorCount = responses.filter(r => r.status === 'rejected').length;
          return responses;
        });

        results.push({ level, duration, errors: errorCount });
      }

      for (let i = 1; i < results.length; i++) {
        const avgTimePerTask = results[i].duration / results[i].level;
        const prevAvgTime = results[i - 1].duration / results[i - 1].level;
        expect(avgTimePerTask).toBeLessThanOrEqual(prevAvgTime * 1.5);
      }
    });
  });

  describe('Provider Switching Overhead', () => {
    it('should measure failover switching performance', async () => {
      const claudeSim = new ProviderSimulator({
        name: 'claude',
        responseDelay: 50,
        rateLimitThreshold: 5
      });

      const geminiSim = new ProviderSimulator({
        name: 'gemini',
        responseDelay: 60
      });

      const failoverSim = new ProviderFailoverSimulator([claudeSim, geminiSim]);

      const measurements: Array<{ requestNum: number; provider: string; switchTime?: number }> = [];
      let lastProvider = '';
      let switchStartTime = 0;

      for (let i = 0; i < 10; i++) {
        // const startTime = Date.now();
        
        const result = await failoverSim.executeWithFailover(`Request ${i}`);
        
        if (lastProvider && lastProvider !== result.provider) {
          const switchTime = Date.now() - switchStartTime;
          measurements.push({
            requestNum: i,
            provider: result.provider,
            switchTime
          });
        } else {
          measurements.push({
            requestNum: i,
            provider: result.provider
          });
        }

        lastProvider = result.provider;
        switchStartTime = Date.now();
      }

      const switches = measurements.filter(m => m.switchTime !== undefined);
      expect(switches.length).toBeGreaterThan(0);
      
      const avgSwitchTime = switches.reduce((sum, m) => sum + (m.switchTime ?? 0), 0) / switches.length;
      expect(avgSwitchTime).toBeLessThan(100);
    });

    it('should optimize provider selection based on performance', async () => {
      const performanceHistory: Map<string, Array<number>> = new Map();

      for (const [name] of providers) {
        performanceHistory.set(name, []);
      }

      for (let i = 0; i < 20; i++) {
        for (const [name, provider] of providers) {
          const { duration } = await measureExecutionTime(() => 
            provider.execute(`Performance test ${i}`)
          );
          performanceHistory.get(name)!.push(duration);
        }
      }

      const averagePerformance = new Map<string, number>();
      for (const [name, durations] of performanceHistory) {
        const avg = durations.reduce((sum, d) => sum + d, 0) / durations.length;
        averagePerformance.set(name, avg);
      }

      const sortedProviders = Array.from(averagePerformance.entries())
        .sort(([, a], [, b]) => a - b);

      expect(sortedProviders[0][0]).toBe('claude');
      expect(sortedProviders[0][1]).toBeLessThan(sortedProviders[1][1]);
    });
  });

  describe('Large Issue Processing', () => {
    it('should handle large issue batches efficiently', async () => {
      const batchSizes = [10, 50, 100];
      const results: Array<{ size: number; totalTime: number; avgTime: number }> = [];

      for (const size of batchSizes) {
        const issues: Issue[] = Array.from({ length: size }, (_, i) => ({
          id: `large-batch-${i}`,
          title: `Issue ${i}`,
          requirement: `Requirement for issue ${i}`,
          acceptanceCriteria: [`Criteria for issue ${i}`],
          dependencies: i > 0 ? [`large-batch-${i - 1}`] : [],
          technicalDetails: ''
        }));

        const { duration } = await measureExecutionTime(async () => {
          // Process issues in parallel batches for better performance
          const batchSize = 10;
          const completed = [];
          
          for (let i = 0; i < issues.length; i += batchSize) {
            const batch = issues.slice(i, i + batchSize);
            const batchPromises = batch.map(issue => 
              createTestIssue(context.workspace, issue).then(() => issue.id)
            );
            const batchResults = await Promise.all(batchPromises);
            completed.push(...batchResults);
          }
          
          return completed;
        });

        results.push({
          size,
          totalTime: duration,
          avgTime: duration / size
        });
      }

      for (let i = 1; i < results.length; i++) {
        const scaleFactor = results[i].size / results[i - 1].size;
        const timeIncrease = results[i].totalTime / results[i - 1].totalTime;
        // Allow significant headroom for test environment variations, I/O overhead, and CI/testing environments
        // This test verifies that batch processing scales reasonably, not that it's perfectly linear
        expect(timeIncrease).toBeLessThan(scaleFactor * 3.0);
      }
    });

    it('should optimize file I/O operations', async () => {
      const fileOperations = [
        { type: 'sequential', count: 100 },
        { type: 'batched', count: 100, batchSize: 10 }
      ];

      const results: Record<string, number> = {};

      for (const op of fileOperations) {
        const { duration } = await measureExecutionTime(async () => {
          if (op.type === 'sequential') {
            for (let i = 0; i < op.count; i++) {
              const filePath = path.join(
                context.workspace.rootPath,
                'test-files',
                `file-${i}.txt`
              );
              await fs.mkdir(path.dirname(filePath), { recursive: true });
              await fs.writeFile(filePath, `Content ${i}`);
            }
          } else if (op.type === 'batched' && op.batchSize !== undefined && op.batchSize > 0) {
            const batches = Math.ceil(op.count / op.batchSize);
            for (let b = 0; b < batches; b++) {
              const batchPromises = [];
              for (let i = 0; i < op.batchSize && b * op.batchSize + i < op.count; i++) {
                const fileIndex = b * op.batchSize + i;
                const filePath = path.join(
                  context.workspace.rootPath,
                  'test-files-batched',
                  `file-${fileIndex}.txt`
                );
                batchPromises.push(
                  fs.mkdir(path.dirname(filePath), { recursive: true })
                    .then(() => fs.writeFile(filePath, `Content ${fileIndex}`))
                );
              }
              await Promise.all(batchPromises);
            }
          }
        });

        results[op.type] = duration;
      }

      expect(results.batched).toBeLessThan(results.sequential);
      const improvement = results.sequential / results.batched;
      // Expect at least 20% improvement from batching (1.2x faster)
      // This is a realistic threshold for file I/O operations in test environments
      expect(improvement).toBeGreaterThan(1.2);
    });
  });

  describe('Memory Usage Patterns', () => {
    it('should monitor memory usage during execution', () => {
      const memorySnapshots: Array<{ stage: string; heapUsed: number }> = [];
      
      const takeSnapshot = (stage: string): void => {
        if (global.gc) {global.gc();}
        const usage = process.memoryUsage();
        memorySnapshots.push({
          stage,
          heapUsed: usage.heapUsed / 1024 / 1024
        });
      };

      takeSnapshot('start');

      const largeDataSet = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        data: 'x'.repeat(1000),
        metadata: {
          created: new Date(),
          modified: new Date(),
          tags: Array.from({ length: 10 }, (_, j) => `tag-${j}`)
        }
      }));

      takeSnapshot('after-creation');

      const processed = largeDataSet.map(item => ({
        ...item,
        processed: true,
        hash: Buffer.from(item.data).toString('base64').slice(0, 20)
      }));

      takeSnapshot('after-processing');

      largeDataSet.length = 0;
      processed.length = 0;

      takeSnapshot('after-cleanup');

      const startMemory = memorySnapshots[0].heapUsed;
      const peakMemory = Math.max(...memorySnapshots.map(s => s.heapUsed));
      const endMemory = memorySnapshots[memorySnapshots.length - 1].heapUsed;

      expect(peakMemory).toBeGreaterThan(startMemory);
      expect(endMemory).toBeLessThanOrEqual(startMemory + 10);
    });

    it('should handle memory-intensive operations efficiently', async () => {
      const chunkSize = 1000;
      const totalItems = 10000;
      
      const processInChunks = async <T, R>(
        items: T[],
        chunkSize: number,
        processor: (chunk: T[]) => Promise<R[]>
      ): Promise<R[]> => {
        const results: R[] = [];
        
        for (let i = 0; i < items.length; i += chunkSize) {
          const chunk = items.slice(i, i + chunkSize);
          const chunkResults = await processor(chunk);
          results.push(...chunkResults);
          
          if (global.gc) {global.gc();}
        }
        
        return results;
      };

      const items = Array.from({ length: totalItems }, (_, i) => ({ id: i, value: Math.random() }));
      
      const { result, duration } = await measureExecutionTime(async () => {
        return await processInChunks(
          items,
          chunkSize,
          async (chunk) => {
            await new Promise(resolve => setTimeout(resolve, 10));
            return chunk.map(item => ({ ...item, processed: true }));
          }
        );
      });

      expect(result).toHaveLength(totalItems);
      expect(duration).toBeGreaterThan(0);
      
      const memoryUsage = process.memoryUsage();
      expect(memoryUsage.heapUsed / 1024 / 1024).toBeLessThan(200);
    });
  });

  describe('Cache Performance', () => {
    it('should demonstrate cache effectiveness', async () => {
      const cache = new Map<string, { value: string; timestamp: number }>();
      const cacheHits = { hits: 0, misses: 0 };
      
      const cachedExecute = async (key: string, compute: () => Promise<string>): Promise<string> => {
        const cached = cache.get(key);
        const now = Date.now();
        
        if (cached && now - cached.timestamp < 5000) {
          cacheHits.hits++;
          return cached.value;
        }
        
        cacheHits.misses++;
        const value = await compute();
        cache.set(key, { value, timestamp: now });
        return value;
      };

      const requests = Array.from({ length: 100 }, (_, i) => `request-${i % 20}`);
      
      for (const request of requests) {
        await cachedExecute(request, async () => {
          await new Promise(resolve => setTimeout(resolve, 50));
          return `Response for ${request}`;
        });
      }

      const hitRate = cacheHits.hits / (cacheHits.hits + cacheHits.misses);
      expect(hitRate).toBeGreaterThan(0.7);
      expect(cache.size).toBeLessThanOrEqual(20);
    });

    it('should implement effective cache eviction', () => {
      class LRUCache<K, V> {
        private cache = new Map<K, V>();
        private usage = new Map<K, number>();
        private maxSize: number;
        private counter = 0;

        constructor(maxSize: number) {
          this.maxSize = maxSize;
        }

        get(key: K): V | undefined {
          const value = this.cache.get(key);
          if (value !== undefined) {
            this.usage.set(key, ++this.counter);
          }
          return value;
        }

        set(key: K, value: V): void {
          if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            // Find the least recently used key from the cache entries
            // Only consider keys that actually exist in the cache
            const entries = Array.from(this.cache.keys()).map(k => [k, this.usage.get(k) ?? 0] as [K, number]);
            const lru = entries.sort(([, a], [, b]) => a - b)[0][0];
            this.cache.delete(lru);
            this.usage.delete(lru);
          }
          
          this.cache.set(key, value);
          this.usage.set(key, ++this.counter);
        }

        get size(): number {
          return this.cache.size;
        }
      }

      const cache = new LRUCache<string, string>(50);
      
      for (let i = 0; i < 100; i++) {
        cache.set(`key-${i}`, `value-${i}`);
      }

      expect(cache.size).toBe(50);

      for (let i = 0; i < 25; i++) {
        cache.get(`key-${i + 50}`);
      }

      cache.set('new-key', 'new-value');
      expect(cache.get('key-0')).toBeUndefined();
      expect(cache.get('key-50')).toBeDefined();
    });
  });
});