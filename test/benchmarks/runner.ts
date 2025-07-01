#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import { generateBenchmarkReport } from './utils/reporter';
import type { BenchmarkResult } from './utils/reporter';

async function runBenchmarks() {
  console.log('🚀 Running performance benchmarks...\n');
  
  try {
    // Run vitest benchmarks
    execSync('npm run test:bench', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'test' }
    });
    
    // Read results if they were saved
    const resultsPath = path.join(__dirname, 'results.json');
    const resultsExist = await fs.access(resultsPath).then(() => true).catch(() => false);
    
    if (resultsExist) {
      const resultsData = await fs.readFile(resultsPath, 'utf-8');
      const results: BenchmarkResult[] = JSON.parse(resultsData);
      
      // Generate report
      const report = await generateBenchmarkReport(results, {
        outputPath: path.join(__dirname, 'reports', `benchmark-${Date.now()}.json`),
        format: 'markdown'
      });
      
      console.log('\n' + report);
      
      // Save markdown report
      const reportPath = path.join(__dirname, 'reports', 'latest.md');
      await fs.mkdir(path.dirname(reportPath), { recursive: true });
      await fs.writeFile(reportPath, report);
      
      console.log(`\n✅ Report saved to: ${reportPath}`);
      
      // Check for regressions
      const hasRegressions = report.includes('REGRESSION');
      if (hasRegressions) {
        console.error('\n❌ Performance regressions detected!');
        process.exit(1);
      }
    }
    
    console.log('\n✅ All benchmarks passed!');
  } catch (error) {
    console.error('\n❌ Benchmark run failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runBenchmarks().catch(console.error);
}

export { runBenchmarks };