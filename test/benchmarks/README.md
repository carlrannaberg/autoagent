# Enhanced AutoAgent Performance Benchmarks with Statistical Analysis

This directory contains performance benchmarks for the AutoAgent project with comprehensive statistical analysis capabilities, measuring execution time, memory usage, and overall system performance.

## ✨ Enhanced Features

- **📊 Statistical Analysis**: Comprehensive statistics including confidence intervals, outlier detection, and distribution analysis
- **🔍 Regression Detection**: Statistical significance testing for performance changes  
- **💾 Memory Profiling**: Detailed memory usage tracking
- **📈 Trend Analysis**: Long-term performance trend monitoring
- **🤖 CI Integration**: Automated benchmark runs with GitHub Actions
- **📝 Rich Reporting**: Detailed reports with insights and recommendations

## Running Benchmarks

### Standard Benchmarks
```bash
# Run all benchmarks
npm run test:bench

# Run specific benchmark file
npm run test:bench -- test/benchmarks/core/execution.bench.ts

# Run with custom reporter
npm run test:bench -- --reporter=verbose
```

### Enhanced Statistical Benchmarks
```bash
# Enhanced benchmarks with statistical analysis
npm run bench:enhanced

# CI mode (fails on significant regressions)
npm run bench:ci

# Extended statistical analysis with detailed reports
npm run bench:stats

# Custom configuration
npx tsx test/benchmarks/ci-runner.ts --iterations 200 --output-dir ./results
```

## Benchmark Categories

### Core Performance (`core/`)
- **execution.bench.ts**: Measures issue execution performance
  - Single issue execution time with statistical analysis
  - Batch execution (5, 10, 20 issues) with variance analysis
  - Sequential vs concurrent execution comparison
  
- **config.bench.ts**: Configuration operations
  - Config loading with performance distribution analysis
  - Config merging and validation with outlier detection
  - Serialization performance with memory tracking
  
- **parsing.bench.ts**: Markdown parsing performance
  - Issue parsing with complexity analysis
  - Plan parsing with statistical validation
  - Markdown processing with memory profiling

### Provider Benchmarks (`providers/`)
- **provider.bench.ts**: AI provider performance
  - Provider initialization with confidence intervals
  - Provider switching overhead analysis
  - Execution performance with regression detection
  - Rate limit handling with statistical validation

### Memory Benchmarks (`memory/`)
- **memory.bench.ts**: Enhanced memory analysis
  - Memory per issue execution with leak detection
  - Memory growth pattern analysis
  - Provider memory footprint with statistical profiling
  - Comprehensive memory leak detection

### Enhanced Statistical Utilities (`utils/`)
- **statistics.ts**: Comprehensive statistical analysis functions
- **benchmark.utils.ts**: Enhanced benchmark utilities with memory tracking
- **reporter.ts**: Rich reporting with statistical insights

## Enhanced Statistical Analysis

### Statistical Metrics Provided
- **Descriptive Statistics**: Mean, median, mode, range, variance, standard deviation
- **Confidence Intervals**: 95% confidence intervals for performance estimates
- **Outlier Detection**: Automatic identification using IQR method
- **Distribution Analysis**: Skewness and kurtosis analysis
- **Variability Assessment**: Coefficient of variation for stability
- **Significance Testing**: Statistical hypothesis testing for comparisons
- **Effect Size**: Cohen's d for practical significance

### Enhanced Benchmark Class
```typescript
import { EnhancedBenchmark } from './utils/benchmark.utils';

const benchmark = new EnhancedBenchmark('Complex Operation');
const result = await benchmark.run(async () => {
  // Your operation
}, {
  iterations: 1000,
  warmup: 100,
  collectSamples: true
});

console.log(`Average: ${result.averageTime}ms ± ${result.statistics.standardDeviation}ms`);
console.log(`Throughput: ${result.throughput} ops/sec`);
console.log(`95% CI: [${result.statistics.confidenceInterval95.join(', ')}]`);
console.log(`Outliers: ${result.statistics.outliers.length}`);
```

## Performance Baselines with Statistical Validation

Enhanced baselines now include statistical validation:

```json
{
  "execution": {
    "singleIssue": {
      "p50": 1000,
      "p90": 2000,
      "p95": 3000,
      "max": 5000,
      "standardDeviation": 150,
      "coefficientOfVariation": 15
    }
  }
}
```

## Advanced Regression Detection

The enhanced system uses multiple criteria:

1. **Magnitude Threshold**: >10% performance degradation
2. **Statistical Significance**: p-value < 0.05 with proper hypothesis testing
3. **Effect Size**: Cohen's d to ensure practical significance
4. **Confidence Intervals**: Non-overlapping CIs indicate likely differences

### Regression Levels
- **🚨 Critical**: Statistically significant regression >25%
- **⚠️ Warning**: Statistically significant regression >10%
- **ℹ️ Notice**: Potential regression <10% or not statistically significant

## Enhanced Benchmark Utilities

### BenchmarkTimer with Statistical Tracking
```typescript
const timer = new BenchmarkTimer();
// Automatically collects samples for statistical analysis
const stats = timer.getStatistics();
console.log(`Mean: ${stats.mean}ms, CV: ${stats.coefficientOfVariation}%`);
```

### Statistical Analysis Functions
```typescript
import { calculateStatistics, compareDatasets } from './utils/statistics';

const stats = calculateStatistics(samples);
console.log(`95% CI: [${stats.confidenceInterval95.join(', ')}]`);
console.log(`Outliers: ${stats.outliers.length}`);

// Statistical comparison
const comparison = compareDatasets(baseline, current);
console.log(`Significant difference: ${comparison.significant}`);
console.log(`Effect size: ${comparison.interpretation}`);
```

### Enhanced Memory Tracking
```typescript
const { result, memoryDelta } = await withMemoryTracking('operation', async () => {
  return await complexOperation();
});

console.log(`Memory used: ${formatMemory(memoryDelta.heapUsed)}`);
console.log(`Memory efficiency: ${result.length / memoryDelta.heapUsed} items/byte`);
```

## Enhanced Performance Targets

| Operation | Target (p50) | Target (p95) | Max CV | Statistical Power |
|-----------|-------------|--------------|--------|------------------|
| Single Issue | < 1s | < 3s | < 15% | 80% |
| 5 Issues Batch | < 4s | < 8s | < 20% | 80% |
| Provider Init | < 50ms | < 150ms | < 10% | 90% |
| Config Load | < 5ms | < 15ms | < 5% | 95% |

## Memory Targets with Statistical Validation

| Metric | Target | Max Allowed | CV Threshold |
|--------|--------|-------------|--------------|
| Per Issue | < 2MB | 5MB | < 25% |
| Baseline | < 20MB | 50MB | < 10% |
| Provider Instance | < 500KB | 1MB | < 15% |

## CI Integration with GitHub Actions

### Automated Benchmark Workflow
The `.github/workflows/benchmarks.yml` provides:

- **PR Comments**: Automatic benchmark results in pull requests
- **Regression Detection**: Fails CI on significant performance regressions
- **Trend Analysis**: Long-term performance monitoring
- **Historical Storage**: Maintains performance history for analysis

### GitHub Actions Configuration
```yaml
- name: Run Enhanced Benchmarks
  run: npm run bench:ci
  env:
    CI: true
    GITHUB_ACTIONS: true
```

## Rich Reporting and Insights

### Benchmark Report Features
- **Statistical Summary**: Comprehensive performance statistics
- **Regression Analysis**: Detailed regression detection with significance testing
- **Memory Analysis**: Memory usage patterns and leak detection
- **Performance Insights**: Recommendations for optimization
- **Trend Analysis**: Performance evolution over time

### Report Formats
- **JSON**: Machine-readable results for further analysis
- **Markdown**: Human-readable reports with visualizations
- **Statistical**: Detailed statistical analysis reports
- **GitHub**: Formatted for GitHub Actions integration

## Writing Enhanced Benchmarks

### Simple Statistical Benchmark
```typescript
import { bench, describe } from 'vitest';
import { EnhancedBenchmark } from '../utils/benchmark.utils';

describe('My Feature Benchmarks', () => {
  bench('enhanced operation', async () => {
    const benchmark = new EnhancedBenchmark('My Operation');
    const result = await benchmark.run(() => myOperation(), {
      iterations: 500,
      warmup: 50,
      collectSamples: true
    });
    
    // Access detailed statistics
    expect(result.statistics.coefficientOfVariation).toBeLessThan(20);
  });
});
```

### Statistical Comparison Benchmark
```typescript
import { compareDatasets } from '../utils/statistics';

bench('performance comparison', () => {
  const baselineData = collectBaselineData();
  const currentData = collectCurrentData();
  
  const comparison = compareDatasets(baselineData, currentData);
  
  console.log(`Statistically significant: ${comparison.significant}`);
  console.log(`Effect size: ${comparison.interpretation}`);
  
  // Fail if significant regression
  if (comparison.significant && comparison.effectSize > 0.5) {
    throw new Error('Significant performance regression detected');
  }
});
```

## Interpreting Statistical Results

### Coefficient of Variation (CV)
- **< 5%**: Very stable performance, excellent
- **5-15%**: Acceptable variability for most operations
- **15-25%**: High variability, investigate causes
- **> 25%**: Very high variability, likely indicates issues

### Effect Size (Cohen's d)
- **< 0.2**: Negligible difference
- **0.2-0.5**: Small effect (may not be practically significant)
- **0.5-0.8**: Medium effect (likely noticeable)
- **> 0.8**: Large effect (definitely significant)

### Statistical Significance
- **p < 0.01**: Very strong evidence of difference
- **p < 0.05**: Strong evidence of difference (standard threshold)
- **p < 0.10**: Weak evidence of difference
- **p ≥ 0.10**: No significant evidence of difference

## Troubleshooting Enhanced Benchmarks

### High Variability (CV > 25%)
- Increase warmup iterations
- Check for background processes
- Ensure consistent test environment
- Consider memory pressure effects
- Use longer measurement periods

### No Statistical Significance
- Increase sample size (iterations)
- Check if there's actually a meaningful difference
- Verify benchmark measures the right operation
- Consider effect size even if not significant

### Memory Issues
- Use `--expose-gc` flag for accurate measurements
- Check for memory leaks with trend analysis
- Monitor memory growth patterns
- Use memory profiling tools for detailed analysis

### Inconsistent Results Across Runs
- Standardize test environment
- Increase statistical power with more samples
- Check for external factors (CPU throttling, etc.)
- Use confidence intervals to assess reliability

## Advanced Features

### Trend Analysis
```typescript
import { analyzeTrend } from './utils/statistics';

const historicalData = getHistoricalPerformanceData();
const trend = analyzeTrend(historicalData);

console.log(`Performance trend: ${trend.trend}`);
console.log(`Change rate: ${trend.changeRate}% per measurement`);
```

### Custom Statistical Reports
```typescript
import { generateStatisticalReport } from './utils/statistics';

const report = generateStatisticalReport([
  { name: 'Operation A', values: dataA },
  { name: 'Operation B', values: dataB }
], { includeRawData: true });

console.log(report);
```

This enhanced benchmark suite provides enterprise-grade performance monitoring with rigorous statistical analysis, ensuring reliable detection of performance changes and comprehensive understanding of system behavior.