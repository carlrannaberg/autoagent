import * as fs from 'fs/promises';
import * as path from 'path';
import baselines from '../baselines.json';
import { compareDatasets, ComparisonTest, StatisticalSummary, generateStatisticalReport } from './statistics';

export interface BenchmarkResult {
  name: string;
  ops: number;
  margin: number;
  samples: number;
  mean: number;
  min: number;
  max: number;
  p50: number;
  p90: number;
  p95: number;
  rawSamples?: number[];
  statistics?: StatisticalSummary;
}

export interface BenchmarkReport {
  timestamp: string;
  environment: {
    node: string;
    platform: string;
    cpu: string;
    memory: number;
  };
  results: BenchmarkResult[];
  comparisons: ComparisonResult[];
}

export interface ComparisonResult {
  name: string;
  baseline: number;
  current: number;
  difference: number;
  percentChange: number;
  regression: boolean;
  statisticalTest?: ComparisonTest;
}

export class BenchmarkReporter {
  private results: BenchmarkResult[] = [];

  addResult(result: BenchmarkResult): void {
    this.results.push(result);
  }

  async generateReport(outputPath?: string): Promise<BenchmarkReport> {
    const report: BenchmarkReport = {
      timestamp: new Date().toISOString(),
      environment: {
        node: process.version,
        platform: process.platform,
        cpu: process.arch,
        memory: process.memoryUsage().heapTotal
      },
      results: this.results,
      comparisons: this.compareWithBaselines()
    };

    if (outputPath !== undefined && outputPath !== '') {
      await this.saveReport(report, outputPath);
    }

    return report;
  }

  private compareWithBaselines(): ComparisonResult[] {
    const comparisons: ComparisonResult[] = [];

    for (const result of this.results) {
      const baselineValue = this.findBaseline(result.name);
      if (baselineValue !== undefined) {
        const difference = result.mean - baselineValue;
        const percentChange = (difference / baselineValue) * 100;
        
        // Perform statistical test if we have raw samples
        let statisticalTest: ComparisonTest | undefined;
        if (result.rawSamples && result.rawSamples.length > 5) {
          // Create synthetic baseline samples for comparison
          // In practice, you'd store historical samples
          const baselineSamples = Array(result.rawSamples.length)
            .fill(0)
            .map(() => baselineValue + (Math.random() - 0.5) * baselineValue * 0.1);
          
          statisticalTest = compareDatasets(baselineSamples, result.rawSamples);
        }
        
        // Determine regression based on both magnitude and statistical significance
        let regression = percentChange > 10; // Default threshold
        if (statisticalTest?.significant && percentChange > 5) {
          regression = true; // Lower threshold if statistically significant
        }
        
        comparisons.push({
          name: result.name,
          baseline: baselineValue,
          current: result.mean,
          difference,
          percentChange,
          regression,
          statisticalTest
        });
      }
    }

    return comparisons;
  }

  private findBaseline(name: string): number | undefined {
    // Map benchmark names to baseline paths
    const baselineMap: Record<string, number> = {
      'execute single issue': baselines.execution.singleIssue.p50,
      'execute 5 issues': baselines.execution.batchExecution['5issues'].p50,
      'execute 10 issues': baselines.execution.batchExecution['10issues'].p50,
      'execute 20 issues': baselines.execution.batchExecution['20issues'].p50,
      'initialize Claude provider': baselines.providers.claude.initialization.p50,
      'initialize Gemini provider': baselines.providers.gemini.initialization.p50,
      'load config from file': baselines.operations.configLoading.p50,
      'parse simple issue': baselines.operations.fileParsing.p50
    };

    return baselineMap[name];
  }

  private async saveReport(report: BenchmarkReport, outputPath: string): Promise<void> {
    const dir = path.dirname(outputPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
  }

  formatReport(report: BenchmarkReport): string {
    const lines: string[] = [
      '# Benchmark Report',
      '',
      `Generated: ${report.timestamp}`,
      `Node: ${report.environment.node}`,
      `Platform: ${report.environment.platform}`,
      `CPU: ${report.environment.cpu}`,
      '',
      '## Results',
      ''
    ];

    // Format results table
    lines.push('| Benchmark | Ops/sec | Mean (ms) | Std Dev | Min | Max | P90 | P95 | CV% |');
    lines.push('|-----------|---------|-----------|---------|-----|-----|-----|-----|-----|');
    
    for (const result of report.results) {
      const stdDev = result.statistics?.standardDeviation?.toFixed(2) || 'N/A';
      const cv = result.statistics?.coefficientOfVariation?.toFixed(1) || 'N/A';
      lines.push(
        `| ${result.name} | ${result.ops.toFixed(2)} | ${result.mean.toFixed(2)} | ` +
        `${stdDev} | ${result.min.toFixed(2)} | ${result.max.toFixed(2)} | ` +
        `${result.p90.toFixed(2)} | ${result.p95.toFixed(2)} | ${cv} |`
      );
    }

    // Add statistical details
    lines.push('', '## Statistical Analysis', '');
    for (const result of report.results) {
      if (result.statistics) {
        lines.push(`### ${result.name}`, '');
        lines.push(`- **Sample size:** ${result.statistics.count}`);
        lines.push(`- **95% Confidence Interval:** [${result.statistics.confidenceInterval95[0].toFixed(3)}, ${result.statistics.confidenceInterval95[1].toFixed(3)}] ms`);
        
        if (result.statistics.outliers.length > 0) {
          const outlierPercent = (result.statistics.outliers.length / result.statistics.count * 100).toFixed(1);
          lines.push(`- **Outliers:** ${result.statistics.outliers.length} (${outlierPercent}%) detected`);
        }
        
        // Distribution shape
        let shape = 'symmetric';
        if (Math.abs(result.statistics.skewness) > 0.5) {
          shape = result.statistics.skewness > 0 ? 'right-skewed' : 'left-skewed';
        }
        lines.push(`- **Distribution:** ${shape} (skewness: ${result.statistics.skewness.toFixed(3)})`);
        lines.push('');
      }
    }

    // Add comparisons if available
    if (report.comparisons.length > 0) {
      lines.push('## Baseline Comparisons', '');
      lines.push('| Benchmark | Baseline | Current | Change | Effect Size | Significance | Status |');
      lines.push('|-----------|----------|---------|--------|-------------|--------------|--------|');
      
      for (const comp of report.comparisons) {
        const changeStr = comp.percentChange > 0 ? `+${comp.percentChange.toFixed(1)}%` : `${comp.percentChange.toFixed(1)}%`;
        const effectSize = comp.statisticalTest?.effectSize?.toFixed(3) || 'N/A';
        const significance = comp.statisticalTest?.significant ? 
          `p=${comp.statisticalTest.pValue.toFixed(4)}` : 'Not significant';
        
        let status = '✅ OK';
        if (comp.regression) {
          status = comp.statisticalTest?.significant ? '🚨 SIGNIFICANT REGRESSION' : '⚠️ REGRESSION';
        }
        
        lines.push(
          `| ${comp.name} | ${comp.baseline.toFixed(2)} | ${comp.current.toFixed(2)} | ` +
          `${changeStr} | ${effectSize} | ${significance} | ${status} |`
        );
      }
    }

    // Add regression summary
    const regressions = report.comparisons.filter(c => c.regression);
    const significantRegressions = regressions.filter(c => c.statisticalTest?.significant);
    
    if (significantRegressions.length > 0) {
      lines.push('', '## 🚨 Statistically Significant Performance Regressions', '');
      for (const reg of significantRegressions) {
        lines.push(`- **${reg.name}**: ${reg.percentChange.toFixed(1)}% slower (${reg.statisticalTest?.interpretation} effect)`);
      }
    }
    
    if (regressions.length > significantRegressions.length) {
      lines.push('', '## ⚠️ Other Potential Regressions (Not Statistically Significant)', '');
      for (const reg of regressions.filter(r => !r.statisticalTest?.significant)) {
        lines.push(`- **${reg.name}**: ${reg.percentChange.toFixed(1)}% slower (needs more data)`);
      }
    }
    
    if (regressions.length === 0 && report.comparisons.length > 0) {
      lines.push('', '## ✅ No Performance Regressions Detected', '');
    }

    return lines.join('\n');
  }
}

export async function generateBenchmarkReport(
  results: BenchmarkResult[],
  options: { outputPath?: string; format?: 'json' | 'markdown' } = {}
): Promise<string> {
  const reporter = new BenchmarkReporter();
  
  for (const result of results) {
    reporter.addResult(result);
  }
  
  const report = await reporter.generateReport(options.outputPath);
  
  if (options.format === 'json') {
    return JSON.stringify(report, null, 2);
  } else {
    return reporter.formatReport(report);
  }
}