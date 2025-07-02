import { describe, bench } from 'vitest';
import { EnhancedBenchmark } from './utils/benchmark.utils';
import { calculateStatistics, generateStatisticalReport } from './utils/statistics';

describe('Enhanced Benchmark Example', () => {
  // Example using the new EnhancedBenchmark class
  bench('Array operations comparison', async () => {
    const arrayPush = new EnhancedBenchmark('Array.push');
    const arrayConcat = new EnhancedBenchmark('Array.concat');
    const arraySpread = new EnhancedBenchmark('Array spread');

    // Test different array operations
    const baseArray = Array.from({ length: 1000 }, (_, i) => i);
    const newItems = [1001, 1002, 1003];

    // Benchmark array push
    const pushResult = await arrayPush.run(() => {
      const arr = [...baseArray];
      arr.push(...newItems);
      return arr;
    }, { iterations: 1000, warmup: 100 });

    // Benchmark array concat
    const concatResult = await arrayConcat.run(() => {
      const arr = baseArray.concat(newItems);
      return arr;
    }, { iterations: 1000, warmup: 100 });

    // Benchmark array spread
    const spreadResult = await arraySpread.run(() => {
      const arr = [...baseArray, ...newItems];
      return arr;
    }, { iterations: 1000, warmup: 100 });

    // Generate statistical comparison
    console.log('\n=== Array Operations Performance Analysis ===');
    console.log(`Push:   ${pushResult.averageTime.toFixed(3)}ms ± ${pushResult.statistics.standardDeviation.toFixed(3)}ms`);
    console.log(`Concat: ${concatResult.averageTime.toFixed(3)}ms ± ${concatResult.statistics.standardDeviation.toFixed(3)}ms`);
    console.log(`Spread: ${spreadResult.averageTime.toFixed(3)}ms ± ${spreadResult.statistics.standardDeviation.toFixed(3)}ms`);

    // Statistical significance test would go here
    const winner = [pushResult, concatResult, spreadResult]
      .sort((a, b) => a.averageTime - b.averageTime)[0];
    
    console.log(`\nFastest method: ${winner.name} (${winner.throughput.toFixed(0)} ops/sec)`);
    
    // Memory analysis
    if (pushResult.memoryUsage) {
      console.log('\nMemory usage (avg heap increase):');
      console.log(`Push:   ${(pushResult.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
      console.log(`Concat: ${(concatResult.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
      console.log(`Spread: ${(spreadResult.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    }
  });

  // Example using statistical analysis utilities directly
  bench('Statistical analysis demonstration', () => {
    // Simulate performance data with different characteristics
    const stablePerformance = Array.from({ length: 100 }, () => 10 + Math.random() * 2);
    const unstablePerformance = Array.from({ length: 100 }, () => {
      // Simulate occasional slowdowns
      return Math.random() < 0.9 ? 10 + Math.random() * 2 : 50 + Math.random() * 10;
    });

    const stableStats = calculateStatistics(stablePerformance);
    const unstableStats = calculateStatistics(unstablePerformance);

    console.log('\n=== Performance Stability Analysis ===');
    console.log(`Stable CV:   ${stableStats.coefficientOfVariation.toFixed(1)}%`);
    console.log(`Unstable CV: ${unstableStats.coefficientOfVariation.toFixed(1)}%`);
    console.log(`Stable outliers:   ${stableStats.outliers.length}`);
    console.log(`Unstable outliers: ${unstableStats.outliers.length}`);

    // Generate detailed statistical report
    const report = generateStatisticalReport([
      { name: 'Stable Performance', values: stablePerformance },
      { name: 'Unstable Performance', values: unstablePerformance }
    ]);

    console.log('\n=== Detailed Statistical Report ===');
    console.log(report);
  });

  // Example of trend analysis (simulated)
  bench('Performance trend analysis', () => {
    // Simulate a gradual performance degradation over time
    const trendData = Array.from({ length: 50 }, (_, i) => {
      const baseline = 10;
      const degradation = i * 0.1; // 0.1ms slowdown per sample
      const noise = (Math.random() - 0.5) * 2;
      return baseline + degradation + noise;
    });

    const stats = calculateStatistics(trendData);
    console.log('\n=== Performance Trend Analysis ===');
    console.log(`Mean performance: ${stats.mean.toFixed(3)}ms`);
    console.log(`Performance range: ${stats.range.toFixed(3)}ms`);
    console.log(`Trend direction: ${trendData[trendData.length - 1] > trendData[0] ? 'Degrading' : 'Improving'}`);
    
    // In a real scenario, you would:
    // 1. Store historical performance data
    // 2. Compare current run against historical baseline
    // 3. Detect significant trends using statistical tests
    // 4. Alert if performance is degrading over time
  });
});

// Export benchmark definitions for CI runner
export const benchmarks = [
  {
    name: 'String concatenation performance',
    fn: () => {
      let result = '';
      for (let i = 0; i < 1000; i++) {
        result += 'test';
      }
      return result;
    }
  },
  {
    name: 'Array creation performance',
    fn: () => {
      return Array.from({ length: 1000 }, (_, i) => i * 2);
    }
  },
  {
    name: 'Object property access',
    fn: () => {
      const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      let sum = 0;
      for (let i = 0; i < 1000; i++) {
        sum += obj.a + obj.b + obj.c + obj.d + obj.e;
      }
      return sum;
    }
  }
];