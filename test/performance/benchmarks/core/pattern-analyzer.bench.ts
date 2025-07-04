import { describe, bench, beforeAll } from 'vitest';
import { PatternAnalyzer } from '../../../../src/core/pattern-analyzer';
import { createBenchmark } from '../utils/benchmark.utils';
import { createTempDir } from '../../../setup';
import * as fs from 'fs/promises';
import * as path from 'path';
import type { ExecutionResult } from '../../../../src/types';

describe('PatternAnalyzer Performance Benchmarks', () => {
  let tempDir: string;
  let analyzer: PatternAnalyzer;
  let sampleResults: ExecutionResult[];

  beforeAll(async () => {
    tempDir = createTempDir();
    analyzer = new PatternAnalyzer(tempDir);
    
    // Create sample execution results
    sampleResults = [];
    const providers = ['claude', 'gemini', 'openai'];
    const successRates = [0.9, 0.8, 0.7];
    
    for (let i = 0; i < 100; i++) {
      const provider = providers[i % providers.length];
      const isSuccess = Math.random() < successRates[i % successRates.length];
      
      sampleResults.push({
        issueNumber: i + 1,
        success: isSuccess,
        duration: Math.floor(Math.random() * 60000) + 5000, // 5-65 seconds
        filesModified: isSuccess ? [
          `src/file${i}.ts`,
          `test/file${i}.test.ts`,
          `docs/file${i}.md`
        ] : [],
        error: isSuccess ? undefined : `Error in issue ${i + 1}`,
        provider,
        timestamp: Date.now() - (100 - i) * 3600000, // Spread over 100 hours
        output: `Output for issue ${i + 1}\n`.repeat(50)
      });
    }
    
    // Create results directory and files
    const resultsDir = path.join(tempDir, '.autoagent', 'results');
    await fs.mkdir(resultsDir, { recursive: true });
    
    for (const result of sampleResults) {
      await fs.writeFile(
        path.join(resultsDir, `${result.issueNumber}.json`),
        JSON.stringify(result, null, 2)
      );
    }
    
    // Add all sample results to the analyzer
    for (const result of sampleResults) {
      analyzer.addExecution(result);
    }
  });

  describe('Pattern Analysis', () => {
    bench('add executions and analyze', () => {
      const newAnalyzer = new PatternAnalyzer(tempDir);
      for (const result of sampleResults) {
        newAnalyzer.addExecution(result);
      }
    });

    bench('get patterns', () => {
      analyzer.getPatterns();
    });

    bench('get recommendations', () => {
      analyzer.getRecommendations();
    });

    bench('get execution count', () => {
      analyzer.getExecutionCount();
    });

    createBenchmark(
      'full analysis 10 times',
      () => {
        for (let i = 0; i < 10; i++) {
          const newAnalyzer = new PatternAnalyzer(tempDir);
          for (const result of sampleResults) {
            newAnalyzer.addExecution(result);
          }
          newAnalyzer.getPatterns();
          newAnalyzer.getRecommendations();
        }
      },
      { iterations: 5 }
    );
  });

  describe('Statistical Calculations', () => {
    bench('calculate success rate', () => {
      const successful = sampleResults.filter(r => r.success).length;
      return successful / sampleResults.length;
    });

    bench('calculate average duration', () => {
      const totalDuration = sampleResults.reduce((sum, r) => sum + r.duration, 0);
      return totalDuration / sampleResults.length;
    });

    bench('group by provider', () => {
      const groups = new Map<string, ExecutionResult[]>();
      for (const result of sampleResults) {
        if (!groups.has(result.provider)) {
          groups.set(result.provider, []);
        }
        groups.get(result.provider)!.push(result);
      }
      return groups;
    });

    bench('find common error patterns', () => {
      const errors = sampleResults
        .filter(r => !r.success && r.error)
        .map(r => r.error!);
      
      const errorCounts = new Map<string, number>();
      for (const error of errors) {
        const key = error.split(' ').slice(0, 3).join(' '); // First 3 words
        errorCounts.set(key, (errorCounts.get(key) ?? 0) + 1);
      }
      
      return Array.from(errorCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    });
  });

  describe('Time-based Analysis', () => {
    bench('analyze hourly patterns', () => {
      const hourlyStats = new Array(24).fill(0).map(() => ({
        count: 0,
        successes: 0
      }));
      
      for (const result of sampleResults) {
        const hour = new Date(result.timestamp).getHours();
        hourlyStats[hour].count++;
        if (result.success === true) {
          hourlyStats[hour].successes++;
        }
      }
      
      return hourlyStats;
    });

    bench('analyze daily patterns', () => {
      const dailyStats = new Map<string, { count: number; successes: number }>();
      
      for (const result of sampleResults) {
        const day = new Date(result.timestamp).toISOString().split('T')[0];
        if (!dailyStats.has(day)) {
          dailyStats.set(day, { count: 0, successes: 0 });
        }
        const stats = dailyStats.get(day)!;
        stats.count++;
        if (result.success === true) {
          stats.successes++;
        }
      }
      
      return dailyStats;
    });
  });

  describe('File Pattern Analysis', () => {
    bench('analyze file modification frequency', () => {
      const fileFrequency = new Map<string, number>();
      
      for (const result of sampleResults) {
        for (const file of result.filesModified) {
          fileFrequency.set(file, (fileFrequency.get(file) ?? 0) + 1);
        }
      }
      
      return Array.from(fileFrequency.entries())
        .sort((a, b) => b[1] - a[1]);
    });

    bench('analyze file type distribution', () => {
      const typeCount = new Map<string, number>();
      
      for (const result of sampleResults) {
        for (const file of result.filesModified) {
          const ext = path.extname(file);
          typeCount.set(ext, (typeCount.get(ext) ?? 0) + 1);
        }
      }
      
      return typeCount;
    });
  });
});