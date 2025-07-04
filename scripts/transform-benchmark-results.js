#!/usr/bin/env node

/**
 * Transform Vitest benchmark results to format expected by benchmark-action/github-action-benchmark
 * 
 * Input: Vitest benchmark JSON output
 * Output: Array of BenchmarkResult objects for customBiggerIsBetter tool
 */

const fs = require('fs');
const path = require('path');

// Read input file
const inputFile = process.argv[2] || 'bench-results.json';
const outputFile = process.argv[3] || 'bench-results-transformed.json';

if (!fs.existsSync(inputFile)) {
  console.error(`Input file ${inputFile} not found`);
  process.exit(1);
}

const vitestResults = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// Transform to expected format
const benchmarkResults = [];

// Process each file's results
for (const file of vitestResults.files || []) {
  const fileRelativePath = path.relative(process.cwd(), file.filepath);
  
  for (const group of file.groups || []) {
    for (const benchmark of group.benchmarks || []) {
      // Skip benchmarks with no results
      if (!benchmark.hz || benchmark.hz === 0) continue;
      
      benchmarkResults.push({
        name: `${fileRelativePath} > ${benchmark.name}`,
        value: benchmark.hz, // Operations per second (higher is better)
        unit: 'ops/s',
        extra: {
          mean: benchmark.mean,
          min: benchmark.min,
          max: benchmark.max,
          p75: benchmark.p75,
          p99: benchmark.p99,
          p995: benchmark.p995,
          p999: benchmark.p999
        }
      });
    }
  }
}

// Sort by name for consistent ordering
benchmarkResults.sort((a, b) => a.name.localeCompare(b.name));

// Write output
fs.writeFileSync(outputFile, JSON.stringify(benchmarkResults, null, 2));

console.log(`Transformed ${benchmarkResults.length} benchmark results`);
console.log(`Output written to ${outputFile}`);