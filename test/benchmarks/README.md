# AutoAgent Performance Benchmarks

This directory contains performance benchmarks for the AutoAgent project, measuring execution time, memory usage, and overall system performance.

## Running Benchmarks

```bash
# Run all benchmarks
npm run test:bench

# Run specific benchmark file
npm run test:bench -- test/benchmarks/core/execution.bench.ts

# Run with custom reporter
npm run test:bench -- --reporter=verbose

# Run benchmarks and save results
npm run test:bench -- --outputJson=test/benchmarks/results.json
```

## Benchmark Categories

### Core Performance (`core/`)
- **execution.bench.ts**: Measures issue execution performance
  - Single issue execution time
  - Batch execution (5, 10, 20 issues)
  - Sequential vs concurrent execution
  
- **config.bench.ts**: Configuration operations
  - Config loading from file
  - Config merging and validation
  - Serialization performance
  
- **parsing.bench.ts**: Markdown parsing performance
  - Issue parsing (simple vs complex)
  - Plan parsing
  - Markdown processing operations

### Provider Benchmarks (`providers/`)
- **provider.bench.ts**: AI provider performance
  - Provider initialization time
  - Provider switching overhead
  - Execution performance
  - Rate limit handling

### Memory Benchmarks (`memory/`)
- **memory.bench.ts**: Memory usage analysis
  - Memory per issue execution
  - Memory growth patterns
  - Provider memory footprint
  - Memory leak detection

## Performance Baselines

Performance baselines are stored in `baselines.json`. These represent acceptable performance thresholds:

```json
{
  "execution": {
    "singleIssue": {
      "p50": 1000,    // 1 second median
      "p90": 2000,    // 2 seconds 90th percentile
      "p95": 3000,    // 3 seconds 95th percentile
      "max": 5000     // 5 seconds maximum
    }
  }
}
```

## Benchmark Utilities

### BenchmarkTimer
Precise timing utility for measuring operation duration:

```typescript
const timer = new BenchmarkTimer();
timer.mark('start');
// ... operation ...
timer.mark('end');
console.log(`Duration: ${timer.getMark('end') - timer.getMark('start')}ms`);
```

### Memory Tracking
Utilities for measuring memory usage:

```typescript
const { result, memoryDelta } = await withMemoryTracking('operation', async () => {
  // ... memory-intensive operation ...
  return result;
});
console.log(`Memory used: ${formatMemory(memoryDelta.heapUsed)}`);
```

### Benchmark Reporter
Generates formatted reports with baseline comparisons:

```typescript
const report = await generateBenchmarkReport(results, {
  outputPath: 'reports/benchmark.json',
  format: 'markdown'
});
```

## Performance Targets

| Operation | Target (p50) | Target (p95) | Max Allowed |
|-----------|-------------|--------------|-------------|
| Single Issue | < 1s | < 3s | 5s |
| 5 Issues Batch | < 4s | < 8s | 10s |
| Provider Init | < 50ms | < 150ms | 200ms |
| Config Load | < 5ms | < 15ms | 20ms |
| Issue Parse | < 2ms | < 8ms | 10ms |

## Memory Targets

| Metric | Target | Max Allowed |
|--------|--------|-------------|
| Per Issue | < 2MB | 5MB |
| Baseline | < 20MB | 50MB |
| Provider Instance | < 500KB | 1MB |

## Regression Detection

Benchmarks automatically detect performance regressions:
- **Warning**: Performance degrades by >10% from baseline
- **Error**: Performance degrades by >25% from baseline
- **Critical**: Performance exceeds maximum allowed threshold

## Writing New Benchmarks

1. Create a new `.bench.ts` file in the appropriate category
2. Use the `bench` function from vitest:

```typescript
import { bench, describe } from 'vitest';
import { createBenchmark } from '../utils/benchmark.utils';

describe('My Feature Benchmarks', () => {
  bench('operation name', async () => {
    // Operation to measure
  });
  
  // Or use the utility for more control
  createBenchmark(
    'complex operation',
    async () => {
      // Complex operation
    },
    { iterations: 100, time: 5000, warmup: 10 }
  );
});
```

3. Add baseline values to `baselines.json`
4. Update this README with the new benchmark description

## CI Integration

Benchmarks can be integrated into CI pipelines:

```yaml
- name: Run Benchmarks
  run: npm run test:bench
  
- name: Check Performance
  run: node test/benchmarks/runner.ts
```

The runner will exit with code 1 if regressions are detected.

## Tips for Accurate Benchmarks

1. **Isolate Operations**: Measure only the specific operation you're interested in
2. **Use Warmup**: Allow warmup iterations to stabilize JIT optimization
3. **Multiple Runs**: Use sufficient iterations for statistical significance
4. **Control Environment**: Run benchmarks on consistent hardware/environment
5. **Mock External Calls**: Mock I/O operations for consistent results
6. **Force GC**: Use `global.gc()` when measuring memory (requires `--expose-gc` flag)

## Troubleshooting

### Inconsistent Results
- Increase iteration count
- Add more warmup iterations
- Check for background processes
- Ensure mocks are properly configured

### Memory Measurements
- Run with `node --expose-gc` to enable manual garbage collection
- Use `withMemoryTracking` utility for accurate measurements
- Consider heap snapshots for detailed analysis

### Benchmark Failures
- Check that all dependencies are mocked
- Verify file paths are correct
- Ensure proper async handling
- Check for rate limiting in provider benchmarks