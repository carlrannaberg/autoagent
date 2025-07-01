import { describe, bench, beforeAll, afterEach } from 'vitest';
import { executeIssues } from '~/core/executor';
import { parseIssue } from '~/core/parser';
import { createProvider } from '~/providers';
import { loadConfig } from '~/utils/config';
import { withMemoryTracking, measureMemory, formatMemory } from '../utils/benchmark.utils';
import { createMockConfig, createMockIssue, mockCommandRunner } from '../../test-helpers';
import type { Issue, Config } from '~/types';

describe('Memory Usage Benchmarks', () => {
  let config: Config;
  let issues: Issue[];

  beforeAll(() => {
    config = createMockConfig();
    mockCommandRunner();
    
    issues = Array.from({ length: 50 }, (_, i) => 
      createMockIssue({
        title: `Memory Test Issue ${i + 1}`,
        content: `# Issue ${i + 1}\n\n## Requirement\n${'x'.repeat(1000)}\n\n## Details\n${'y'.repeat(5000)}`,
        path: `issues/memory-test-${i + 1}.md`
      })
    );
  });

  afterEach(() => {
    if (global.gc) {
      global.gc();
    }
  });

  describe('Memory Usage During Execution', () => {
    bench('memory per single issue', async () => {
      const { memoryDelta } = await withMemoryTracking(
        'single-issue',
        async () => {
          const issue = parseIssue(issues[0].content, issues[0].path);
          await executeIssues([issue], config, { dryRun: true });
        }
      );
      
      console.log(`Memory used: ${formatMemory(memoryDelta.heapUsed)}`);
    });

    bench('memory for 5 issues batch', async () => {
      const { memoryDelta } = await withMemoryTracking(
        '5-issues',
        async () => {
          const parsedIssues = issues.slice(0, 5).map(issue => 
            parseIssue(issue.content, issue.path)
          );
          await executeIssues(parsedIssues, config, { dryRun: true });
        }
      );
      
      console.log(`Memory used: ${formatMemory(memoryDelta.heapUsed)}`);
    });

    bench('memory for 20 issues batch', async () => {
      const { memoryDelta } = await withMemoryTracking(
        '20-issues',
        async () => {
          const parsedIssues = issues.slice(0, 20).map(issue => 
            parseIssue(issue.content, issue.path)
          );
          await executeIssues(parsedIssues, config, { dryRun: true });
        }
      );
      
      console.log(`Memory used: ${formatMemory(memoryDelta.heapUsed)}`);
    });
  });

  describe('Memory Growth Patterns', () => {
    bench('memory growth with issue count', async () => {
      const measurements: Array<{ count: number; memory: number }> = [];
      
      for (const count of [1, 5, 10, 20, 30, 40, 50]) {
        const { memoryDelta } = await withMemoryTracking(
          `${count}-issues`,
          async () => {
            const parsedIssues = issues.slice(0, count).map(issue => 
              parseIssue(issue.content, issue.path)
            );
            await executeIssues(parsedIssues, config, { dryRun: true });
          }
        );
        
        measurements.push({ count, memory: memoryDelta.heapUsed });
      }
      
      // Calculate memory per issue
      const avgMemoryPerIssue = measurements.reduce((sum, m, i) => {
        if (i === 0) return sum;
        const memoryDiff = m.memory - measurements[i - 1].memory;
        const countDiff = m.count - measurements[i - 1].count;
        return sum + (memoryDiff / countDiff);
      }, 0) / (measurements.length - 1);
      
      console.log(`Average memory per issue: ${formatMemory(avgMemoryPerIssue)}`);
    });

    bench('memory cleanup efficiency', async () => {
      const initialMemory = measureMemory();
      
      // Execute and measure
      for (let i = 0; i < 5; i++) {
        const parsedIssues = issues.slice(i * 10, (i + 1) * 10).map(issue => 
          parseIssue(issue.content, issue.path)
        );
        await executeIssues(parsedIssues, config, { dryRun: true });
        
        if (global.gc) {
          global.gc();
        }
      }
      
      const finalMemory = measureMemory();
      const retainedMemory = finalMemory.heapUsed - initialMemory.heapUsed;
      
      console.log(`Retained memory after cleanup: ${formatMemory(retainedMemory)}`);
    });
  });

  describe('Provider Memory Usage', () => {
    bench('Claude provider memory footprint', async () => {
      const { memoryDelta } = await withMemoryTracking(
        'claude-provider',
        () => {
          const providers = Array.from({ length: 100 }, () => 
            createProvider('claude', config)
          );
          return providers;
        }
      );
      
      console.log(`Memory for 100 Claude providers: ${formatMemory(memoryDelta.heapUsed)}`);
    });

    bench('Gemini provider memory footprint', async () => {
      const { memoryDelta } = await withMemoryTracking(
        'gemini-provider',
        () => {
          const providers = Array.from({ length: 100 }, () => 
            createProvider('gemini', config)
          );
          return providers;
        }
      );
      
      console.log(`Memory for 100 Gemini providers: ${formatMemory(memoryDelta.heapUsed)}`);
    });
  });

  describe('Configuration Memory', () => {
    bench('config loading memory', async () => {
      const { memoryDelta } = await withMemoryTracking(
        'config-loading',
        async () => {
          const configs = await Promise.all(
            Array.from({ length: 50 }, () => loadConfig('/tmp/test'))
          );
          return configs;
        }
      );
      
      console.log(`Memory for 50 config loads: ${formatMemory(memoryDelta.heapUsed)}`);
    });

    bench('large config memory usage', () => {
      const { memoryDelta } = withMemoryTracking(
        'large-config',
        () => {
          const largeConfig = {
            ...config,
            customData: Array.from({ length: 10000 }, (_, i) => ({
              id: i,
              data: 'x'.repeat(100),
              nested: { a: i, b: i * 2, c: i * 3 }
            }))
          };
          return JSON.parse(JSON.stringify(largeConfig));
        }
      );
      
      console.log(`Large config memory: ${formatMemory(memoryDelta.heapUsed)}`);
    });
  });

  describe('Memory Leak Detection', () => {
    bench('repeated execution memory leak test', async () => {
      const measurements: number[] = [];
      
      for (let i = 0; i < 10; i++) {
        if (global.gc) global.gc();
        const beforeMemory = measureMemory();
        
        const issue = parseIssue(issues[0].content, issues[0].path);
        await executeIssues([issue], config, { dryRun: true });
        
        if (global.gc) global.gc();
        const afterMemory = measureMemory();
        
        measurements.push(afterMemory.heapUsed - beforeMemory.heapUsed);
      }
      
      // Check if memory usage is increasing
      const isIncreasing = measurements.every((val, i) => 
        i === 0 || val > measurements[i - 1] * 0.9
      );
      
      console.log(`Potential memory leak: ${isIncreasing ? 'YES' : 'NO'}`);
      console.log(`Memory growth: ${measurements.map(m => formatMemory(m)).join(', ')}`);
    });
  });
});