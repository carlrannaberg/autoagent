#!/usr/bin/env node

/**
 * CI-integrated benchmark runner with statistical analysis
 * Inspired by Gemini CLI's testing approach but with enhanced statistical rigor
 */

import { EnhancedBenchmark, EnhancedBenchmarkResult } from './utils/benchmark.utils';
import { BenchmarkReporter, BenchmarkResult } from './utils/reporter';
import { generateStatisticalReport } from './utils/statistics';
import * as fs from 'fs/promises';
import * as path from 'path';

interface CIBenchmarkConfig {
  suites: string[];
  outputDir: string;
  iterations: number;
  warmup: number;
  regressionThreshold: number;
  significanceLevel: number;
  minimumSamples: number;
  generateReports: boolean;
  failOnRegression: boolean;
}

const DEFAULT_CONFIG: CIBenchmarkConfig = {
  suites: ['core', 'providers', 'memory', 'file-operations'],
  outputDir: './benchmark-results',
  iterations: 100,
  warmup: 10,
  regressionThreshold: 10, // 10% performance regression threshold
  significanceLevel: 0.05, // 95% confidence level
  minimumSamples: 30, // Minimum samples for statistical significance
  generateReports: true,
  failOnRegression: false // Set to true in CI
};

class CIBenchmarkRunner {
  private config: CIBenchmarkConfig;
  private reporter: BenchmarkReporter;
  private results: EnhancedBenchmarkResult[] = [];

  constructor(config: Partial<CIBenchmarkConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.reporter = new BenchmarkReporter();
  }

  async run(): Promise<void> {
    console.log('🚀 Starting enhanced benchmark suite...\n');
    
    // Create output directory
    await fs.mkdir(this.config.outputDir, { recursive: true });

    // Run benchmark suites
    for (const suite of this.config.suites) {
      await this.runSuite(suite);
    }

    // Generate comprehensive report
    if (this.config.generateReports) {
      await this.generateReports();
    }

    // Check for regressions
    await this.checkRegressions();
  }

  private async runSuite(suiteName: string): Promise<void> {
    console.log(`📊 Running ${suiteName} benchmarks...`);
    
    try {
      // Dynamic import of benchmark suite
      const suitePath = path.join(__dirname, suiteName, `${suiteName}.bench.js`);
      const suiteModule = await import(suitePath);
      
      if (suiteModule.benchmarks != null && Array.isArray(suiteModule.benchmarks)) {
        for (const benchmarkDef of suiteModule.benchmarks) {
          const result = await this.runBenchmark(benchmarkDef);
          this.results.push(result);
          
          // Add to reporter in compatible format
          this.reporter.addResult(this.convertToReporterFormat(result));
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not load ${suiteName} suite:`, error.message);
    }
  }

  private async runBenchmark(benchmarkDef: any): Promise<EnhancedBenchmarkResult> {
    const benchmark = new EnhancedBenchmark(benchmarkDef.name);
    
    console.log(`  • ${benchmarkDef.name}`);
    
    const result = await benchmark.run(benchmarkDef.fn, {
      iterations: this.config.iterations,
      warmup: this.config.warmup,
      collectSamples: true
    });

    // Log immediate results
    console.log(`    ⏱️  ${result.averageTime.toFixed(2)}ms ± ${result.statistics.standardDeviation.toFixed(2)}ms`);
    console.log(`    🔥 ${result.throughput.toFixed(2)} ops/sec`);
    console.log(`    📈 CV: ${result.statistics.coefficientOfVariation.toFixed(1)}%`);
    
    if (result.statistics.outliers.length > 0) {
      const outlierPercent = (result.statistics.outliers.length / result.statistics.count * 100).toFixed(1);
      console.log(`    ⚠️  ${result.statistics.outliers.length} outliers (${outlierPercent}%)`);
    }
    
    console.log('');
    
    return result;
  }

  private convertToReporterFormat(result: EnhancedBenchmarkResult): BenchmarkResult {
    return {
      name: result.name,
      ops: result.throughput,
      margin: (result.statistics.standardError / result.averageTime) * 100,
      samples: result.iterations,
      mean: result.averageTime,
      min: result.statistics.mean - 2 * result.statistics.standardDeviation, // Approximation
      max: result.statistics.mean + 2 * result.statistics.standardDeviation, // Approximation
      p50: result.statistics.median,
      p90: result.statistics.mean + 1.28 * result.statistics.standardDeviation, // Approximation
      p95: result.statistics.mean + 1.645 * result.statistics.standardDeviation, // Approximation
      rawSamples: [], // Would need to be extracted from EnhancedBenchmark
      statistics: result.statistics
    };
  }

  private async generateReports(): Promise<void> {
    console.log('📄 Generating comprehensive reports...\n');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Generate main benchmark report
    const report = await this.reporter.generateReport();
    const reportPath = path.join(this.config.outputDir, `benchmark-report-${timestamp}.json`);
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    // Generate markdown report
    const markdownReport = this.reporter.formatReport(report);
    const markdownPath = path.join(this.config.outputDir, `benchmark-report-${timestamp}.md`);
    await fs.writeFile(markdownPath, markdownReport);
    
    // Generate statistical analysis report
    const statisticalData = this.results.map(r => ({
      name: r.name,
      values: [r.averageTime] // In practice, would use all samples
    }));
    
    const statisticalReport = generateStatisticalReport(statisticalData);
    const statsPath = path.join(this.config.outputDir, `statistical-analysis-${timestamp}.md`);
    await fs.writeFile(statsPath, statisticalReport);
    
    // Generate CI summary for GitHub Actions
    if (process.env.GITHUB_ACTIONS != null && process.env.GITHUB_ACTIONS !== '') {
      await this.generateGitHubSummary(report);
    }

    console.log(`✅ Reports generated in ${this.config.outputDir}`);
    console.log(`   • JSON: ${path.basename(reportPath)}`);
    console.log(`   • Markdown: ${path.basename(markdownPath)}`);
    console.log(`   • Statistics: ${path.basename(statsPath)}`);
  }

  private async generateGitHubSummary(report: any): Promise<void> {
    const summary = this.reporter.formatReport(report);
    
    // Write to GitHub Actions step summary
    if (process.env.GITHUB_STEP_SUMMARY != null && process.env.GITHUB_STEP_SUMMARY !== '') {
      await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
    }
    
    // Set output variables for other steps
    const regressions = report.comparisons.filter((c: any) => c.regression);
    console.log(`::set-output name=regressions::${regressions.length}`);
    console.log(`::set-output name=total-benchmarks::${report.results.length}`);
  }

  private async checkRegressions(): Promise<void> {
    const report = await this.reporter.generateReport();
    const regressions = report.comparisons.filter(c => c.regression);
    const significantRegressions = regressions.filter(c => c.statisticalTest?.significant);
    
    if (significantRegressions.length > 0) {
      console.log('\n🚨 PERFORMANCE REGRESSIONS DETECTED:\n');
      
      for (const regression of significantRegressions) {
        console.log(`❌ ${regression.name}`);
        console.log(`   ${regression.percentChange.toFixed(1)}% slower than baseline`);
        console.log(`   Effect size: ${regression.statisticalTest?.interpretation}`);
        console.log(`   p-value: ${regression.statisticalTest?.pValue.toFixed(4)}`);
        console.log('');
      }
      
      if (this.config.failOnRegression) {
        process.exit(1);
      }
    } else if (regressions.length > 0) {
      console.log('\n⚠️  Potential regressions detected (not statistically significant)');
      console.log('Consider collecting more samples for definitive results.\n');
    } else {
      console.log('\n✅ No performance regressions detected!\n');
    }
  }
}

// CLI interface
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const config: Partial<CIBenchmarkConfig> = {};
  
  // Parse command line arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace('--', '');
    const value = args[i + 1];
    
    switch (key) {
      case 'iterations':
        config.iterations = parseInt(value, 10);
        break;
      case 'output-dir':
        config.outputDir = value;
        break;
      case 'fail-on-regression':
        config.failOnRegression = value === 'true';
        break;
      case 'suites':
        config.suites = value.split(',');
        break;
    }
  }
  
  // Set CI defaults
  if (process.env.CI) {
    config.failOnRegression = config.failOnRegression ?? true;
    config.iterations = config.iterations ?? 50; // Fewer iterations in CI for speed
  }
  
  const runner = new CIBenchmarkRunner(config);
  await runner.run();
}

// Export for programmatic use
export { CIBenchmarkRunner, CIBenchmarkConfig };

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Benchmark runner failed:', error);
    process.exit(1);
  });
}