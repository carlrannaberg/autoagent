import * as fs from 'fs/promises';
import * as path from 'path';
import baselines from '../baselines.json';

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
        
        comparisons.push({
          name: result.name,
          baseline: baselineValue,
          current: result.mean,
          difference,
          percentChange,
          regression: percentChange > 10 // 10% threshold for regression
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
    lines.push('| Benchmark | Ops/sec | Mean (ms) | Min | Max | P90 | P95 |');
    lines.push('|-----------|---------|-----------|-----|-----|-----|-----|');
    
    for (const result of report.results) {
      lines.push(
        `| ${result.name} | ${result.ops.toFixed(2)} | ${result.mean.toFixed(2)} | ` +
        `${result.min.toFixed(2)} | ${result.max.toFixed(2)} | ` +
        `${result.p90.toFixed(2)} | ${result.p95.toFixed(2)} |`
      );
    }

    // Add comparisons if available
    if (report.comparisons.length > 0) {
      lines.push('', '## Baseline Comparisons', '');
      lines.push('| Benchmark | Baseline | Current | Change | Status |');
      lines.push('|-----------|----------|---------|--------|--------|');
      
      for (const comp of report.comparisons) {
        const status = comp.regression ? '⚠️ REGRESSION' : '✅ OK';
        const changeStr = comp.percentChange > 0 ? `+${comp.percentChange.toFixed(1)}%` : `${comp.percentChange.toFixed(1)}%`;
        
        lines.push(
          `| ${comp.name} | ${comp.baseline.toFixed(2)} | ${comp.current.toFixed(2)} | ` +
          `${changeStr} | ${status} |`
        );
      }
    }

    // Add regression summary
    const regressions = report.comparisons.filter(c => c.regression);
    if (regressions.length > 0) {
      lines.push('', '## ⚠️ Performance Regressions Detected', '');
      for (const reg of regressions) {
        lines.push(`- **${reg.name}**: ${reg.percentChange.toFixed(1)}% slower than baseline`);
      }
    } else if (report.comparisons.length > 0) {
      lines.push('', '## ✅ No Performance Regressions', '');
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