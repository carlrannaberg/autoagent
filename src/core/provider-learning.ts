import * as path from 'path';
import { ExecutionResult, ProviderName } from '../types';
import { FileManager } from '../utils/file-manager';
import { PatternAnalyzer } from './pattern-analyzer';

interface ExecutionMetrics {
  totalExecutions: number;
  successCount: number;
  failureCount: number;
  averageDuration: number;
  fileTypesModified: { [key: string]: number };
  commonPatterns: string[];
  lastExecutionDate: string;
}

interface ProviderInsights {
  strengths: string[];
  weaknesses: string[];
  bestPractices: string[];
  commonIssues: string[];
}

export class ProviderLearning {
  private fileManager: FileManager;
  private metricsCache: Map<ProviderName, ExecutionMetrics> = new Map();
  private patternAnalyzers: Map<ProviderName, PatternAnalyzer> = new Map();

  constructor(fileManager: FileManager, _workspace: string = process.cwd()) {
    this.fileManager = fileManager;
    // _workspace parameter is kept for API compatibility but not used internally
    
    // Initialize pattern analyzers for each provider
    const providers: ProviderName[] = ['claude', 'gemini'];
    providers.forEach(provider => {
      this.patternAnalyzers.set(provider, new PatternAnalyzer());
    });
  }

  /**
   * Update provider instruction file with execution results and learnings
   */
  async updateProviderLearnings(result: ExecutionResult): Promise<void> {
    if (!result.provider) {
      return;
    }

    const provider = result.provider.toUpperCase() as 'CLAUDE' | 'GEMINI';
    const providerLower = result.provider.toLowerCase() as ProviderName;
    
    // Add to pattern analyzer
    const analyzer = this.patternAnalyzers.get(providerLower);
    if (analyzer) {
      analyzer.addExecution(result);
    }
    
    // Get existing content
    const existingContent = await this.fileManager.readProviderInstructions(provider);
    
    // Extract current metrics from the file or initialize new ones
    const metrics = this.extractOrInitializeMetrics(provider, existingContent);
    
    // Update metrics with new execution
    this.updateMetrics(metrics, result);
    
    // Analyze patterns and generate insights
    const insights = this.generateInsights(metrics, result);
    
    // Get pattern-based recommendations
    const patternRecommendations = analyzer?.getRecommendations() || [];
    if (patternRecommendations.length > 0) {
      insights.bestPractices.push(...patternRecommendations);
    }
    
    // Update the provider instruction file
    const updatedContent = this.formatProviderFile(
      provider,
      existingContent,
      metrics,
      insights,
      result
    );
    
    await this.fileManager.updateProviderInstructions(provider, updatedContent);
  }

  /**
   * Extract existing metrics from provider file or initialize new ones
   */
  private extractOrInitializeMetrics(
    provider: 'CLAUDE' | 'GEMINI',
    content: string
  ): ExecutionMetrics {
    // Check cache first
    const cached = this.metricsCache.get(provider.toLowerCase() as ProviderName);
    if (cached) {
      return cached;
    }

    // Try to extract from execution history section
    const metrics: ExecutionMetrics = {
      totalExecutions: 0,
      successCount: 0,
      failureCount: 0,
      averageDuration: 0,
      fileTypesModified: {},
      commonPatterns: [],
      lastExecutionDate: new Date().toISOString().split('T')[0] ?? ''
    };

    // Count executions from history
    const executionMatches = content.match(/- \*\*\d{4}-\d{2}-\d{2}\*\*: (Successfully completed|Failed) Issue #\d+/g) || [];
    metrics.totalExecutions = executionMatches.length;
    metrics.successCount = executionMatches.filter(m => m.includes('Successfully completed')).length;
    metrics.failureCount = executionMatches.filter(m => m.includes('Failed')).length;

    // Extract file type statistics if present
    const fileTypeMatch = content.match(/### File Types Modified[\s\S]*?(?=###|$)/);
    if (fileTypeMatch) {
      const fileTypeLines = fileTypeMatch[0].match(/- `\.(\w+)`: (\d+) files?/g) || [];
      fileTypeLines.forEach(line => {
        const match = line.match(/- `\.(\w+)`: (\d+)/);
        if (match !== null && match[1] !== undefined && match[1] !== '' && match[2] !== undefined && match[2] !== '') {
          metrics.fileTypesModified[match[1]] = parseInt(match[2], 10);
        }
      });
    }

    this.metricsCache.set(provider.toLowerCase() as ProviderName, metrics);
    return metrics;
  }

  /**
   * Update metrics with new execution data
   */
  private updateMetrics(metrics: ExecutionMetrics, result: ExecutionResult): void {
    metrics.totalExecutions++;
    
    if (result.success) {
      metrics.successCount++;
    } else {
      metrics.failureCount++;
    }

    // Update average duration if available
    if (result.duration) {
      const totalDuration = metrics.averageDuration * (metrics.totalExecutions - 1) + result.duration;
      metrics.averageDuration = totalDuration / metrics.totalExecutions;
    }

    // Update file types if we have that information
    if (result.filesModified) {
      result.filesModified.forEach(file => {
        const ext = path.extname(file).substring(1) || 'no-ext';
        metrics.fileTypesModified[ext] = (metrics.fileTypesModified[ext] ?? 0) + 1;
      });
    }

    metrics.lastExecutionDate = new Date().toISOString().split('T')[0] ?? '';
  }

  /**
   * Generate insights based on metrics and execution patterns
   */
  private generateInsights(metrics: ExecutionMetrics, result: ExecutionResult): ProviderInsights {
    const insights: ProviderInsights = {
      strengths: [],
      weaknesses: [],
      bestPractices: [],
      commonIssues: []
    };

    // Success rate analysis
    const successRate = metrics.totalExecutions > 0 
      ? (metrics.successCount / metrics.totalExecutions) * 100 
      : 0;

    if (successRate >= 90) {
      insights.strengths.push('High success rate in task completion');
    } else if (successRate < 70) {
      insights.weaknesses.push('Lower than expected success rate - may need additional context');
    }

    // File type expertise
    const topFileTypes = Object.entries(metrics.fileTypesModified)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    if (topFileTypes.length > 0) {
      const fileTypeList = topFileTypes.map(([ext]) => `.${ext}`).join(', ');
      insights.strengths.push(`Strong experience with ${fileTypeList} files`);
    }

    // Duration insights
    if (metrics.averageDuration > 0) {
      if (metrics.averageDuration < 30000) { // 30 seconds
        insights.strengths.push('Fast execution times');
      } else if (metrics.averageDuration > 120000) { // 2 minutes
        insights.bestPractices.push('Consider breaking down complex tasks for faster execution');
      }
    }

    // Add provider-specific insights
    if (result.provider === 'claude') {
      insights.bestPractices.push('Provide clear, structured requirements for best results');
      insights.bestPractices.push('Use CLAUDE.md to maintain project context across sessions');
    } else if (result.provider === 'gemini') {
      insights.bestPractices.push('Gemini works well with explicit file paths and clear instructions');
      insights.bestPractices.push('Update GEMINI.md regularly to improve context awareness');
    }

    // Common patterns based on recent executions
    if (metrics.totalExecutions > 5) {
      insights.commonIssues.push('Rate limits may occur with rapid successive executions');
      insights.bestPractices.push('Use provider failover to maintain continuous operation');
    }

    return insights;
  }

  /**
   * Format the complete provider instruction file
   */
  private formatProviderFile(
    provider: 'CLAUDE' | 'GEMINI',
    existingContent: string,
    metrics: ExecutionMetrics,
    insights: ProviderInsights,
    result: ExecutionResult
  ): string {
    const date = new Date().toISOString().split('T')[0];
    const issueTitle = result.issueTitle ?? `Issue #${result.issueNumber}`;
    
    // Preserve the original content structure but update specific sections
    let content = existingContent;

    // Update or add execution history
    const historyEntry = `- **${date}**: ${result.success ? 'Successfully completed' : 'Failed'} Issue #${result.issueNumber}: ${issueTitle}`;
    
    if (content.includes('## Execution History')) {
      // Insert new entry at the top of the history
      content = content.replace(
        /## Execution History\n/,
        `## Execution History\n${historyEntry}\n`
      );
    } else {
      // Add execution history section before the first section or at the end
      const firstSectionIndex = content.search(/\n## /);
      if (firstSectionIndex > -1) {
        const beforeSection = content.substring(0, firstSectionIndex);
        const afterSection = content.substring(firstSectionIndex);
        content = `${beforeSection}\n\n## Execution History\n${historyEntry}\n${afterSection}`;
      } else {
        content += `\n\n## Execution History\n${historyEntry}`;
      }
    }

    // Update or add performance metrics
    const metricsSection = this.formatMetricsSection(metrics);
    if (content.includes('## Performance Metrics')) {
      content = content.replace(
        /## Performance Metrics[\s\S]*?(?=\n## |$)/,
        metricsSection + '\n'
      );
    } else {
      // Add after execution history
      content = content.replace(
        /## Execution History[\s\S]*?\n(?=\n## |$)/,
        (match) => match + '\n' + metricsSection + '\n'
      );
    }

    // Update or add insights
    const insightsSection = this.formatInsightsSection(insights);
    if (content.includes('## Learning Insights')) {
      content = content.replace(
        /## Learning Insights[\s\S]*?(?=\n## |$)/,
        insightsSection + '\n'
      );
    } else {
      // Add after metrics
      content = content.replace(
        /## Performance Metrics[\s\S]*?\n(?=\n## |$)/,
        (match) => match + '\n' + insightsSection + '\n'
      );
    }

    // Add pattern analysis if available
    const providerLower = provider.toLowerCase() as ProviderName;
    const analyzer = this.patternAnalyzers.get(providerLower);
    if (analyzer) {
      const patterns = analyzer.getPatterns();
      if (patterns.length > 0) {
        const patternSection = this.formatPatternSection(patterns);
        if (content.includes('## Detected Patterns')) {
          content = content.replace(
            /## Detected Patterns[\s\S]*?(?=\n## |$)/,
            patternSection + '\n'
          );
        } else {
          // Add after insights
          content = content.replace(
            /## Learning Insights[\s\S]*?\n(?=\n## |$)/,
            (match) => match + '\n' + patternSection + '\n'
          );
        }
      }
    }

    return content.trim() + '\n';
  }

  /**
   * Format the metrics section
   */
  private formatMetricsSection(metrics: ExecutionMetrics): string {
    const successRate = metrics.totalExecutions > 0 
      ? ((metrics.successCount / metrics.totalExecutions) * 100).toFixed(1)
      : '0.0';

    let section = '## Performance Metrics\n';
    section += `- **Total Executions**: ${metrics.totalExecutions}\n`;
    section += `- **Success Rate**: ${successRate}% (${metrics.successCount} successful, ${metrics.failureCount} failed)\n`;
    
    if (metrics.averageDuration > 0) {
      const avgDurationSec = (metrics.averageDuration / 1000).toFixed(1);
      section += `- **Average Duration**: ${avgDurationSec} seconds\n`;
    }

    if (Object.keys(metrics.fileTypesModified).length > 0) {
      section += '\n### File Types Modified\n';
      Object.entries(metrics.fileTypesModified)
        .sort(([, a], [, b]) => b - a)
        .forEach(([ext, count]) => {
          section += `- \`.${ext}\`: ${count} file${count !== 1 ? 's' : ''}\n`;
        });
    }

    return section;
  }

  /**
   * Format the insights section
   */
  private formatInsightsSection(insights: ProviderInsights): string {
    let section = '## Learning Insights\n';

    if (insights.strengths.length > 0) {
      section += '\n### Strengths\n';
      insights.strengths.forEach(strength => {
        section += `- ${strength}\n`;
      });
    }

    if (insights.weaknesses.length > 0) {
      section += '\n### Areas for Improvement\n';
      insights.weaknesses.forEach(weakness => {
        section += `- ${weakness}\n`;
      });
    }

    if (insights.bestPractices.length > 0) {
      section += '\n### Best Practices\n';
      insights.bestPractices.forEach(practice => {
        section += `- ${practice}\n`;
      });
    }

    if (insights.commonIssues.length > 0) {
      section += '\n### Common Issues\n';
      insights.commonIssues.forEach(issue => {
        section += `- ${issue}\n`;
      });
    }

    return section;
  }

  /**
   * Analyze file changes to detect patterns
   */
  analyzeFileChanges(result: ExecutionResult): string[] {
    const patterns: string[] = [];
    
    if (!result.filesModified || result.filesModified.length === 0) {
      return patterns;
    }

    // Group files by directory
    const filesByDir: { [dir: string]: string[] } = {};
    result.filesModified.forEach(file => {
      const dir = path.dirname(file);
      if (!filesByDir[dir]) {
        filesByDir[dir] = [];
      }
      filesByDir[dir].push(path.basename(file));
    });

    // Detect patterns
    if (Object.keys(filesByDir).length === 1) {
      patterns.push('All changes in a single directory - focused modification');
    } else if (Object.keys(filesByDir).length > 3) {
      patterns.push('Changes across multiple directories - broad refactoring');
    }

    // Check for test files
    const testFiles = result.filesModified.filter(f => 
      f.includes('test') || f.includes('spec') || f.endsWith('.test.ts') || f.endsWith('.spec.ts')
    );
    if (testFiles.length > 0) {
      patterns.push('Includes test file modifications - good testing practices');
    }

    // Check for configuration files
    const configFiles = result.filesModified.filter(f => 
      f.includes('config') || f.endsWith('.json') || f.endsWith('.yml') || f.endsWith('.yaml')
    );
    if (configFiles.length > 0) {
      patterns.push('Modified configuration files - structural changes');
    }

    return patterns;
  }

  /**
   * Format the pattern analysis section
   */
  private formatPatternSection(patterns: Array<{name: string; description: string; confidence: number; occurrences: number}>): string {
    let section = '## Detected Patterns\n';
    
    if (patterns.length === 0) {
      section += 'No significant patterns detected yet.\n';
      return section;
    }

    section += '\n### High Confidence Patterns\n';
    const highConfidence = patterns.filter(p => p.confidence >= 0.7);
    if (highConfidence.length > 0) {
      highConfidence.forEach(pattern => {
        section += `- **${pattern.description}** (${(pattern.confidence * 100).toFixed(0)}% confidence, ${pattern.occurrences} occurrences)\n`;
      });
    } else {
      section += 'No high confidence patterns detected.\n';
    }

    const mediumConfidence = patterns.filter(p => p.confidence >= 0.4 && p.confidence < 0.7);
    if (mediumConfidence.length > 0) {
      section += '\n### Medium Confidence Patterns\n';
      mediumConfidence.forEach(pattern => {
        section += `- ${pattern.description} (${(pattern.confidence * 100).toFixed(0)}% confidence)\n`;
      });
    }

    return section;
  }

  /**
   * Clear cached metrics for a provider
   */
  clearCache(provider?: ProviderName): void {
    if (provider) {
      this.metricsCache.delete(provider);
      const analyzer = this.patternAnalyzers.get(provider);
      if (analyzer) {
        analyzer.clear();
      }
    } else {
      this.metricsCache.clear();
      this.patternAnalyzers.forEach(analyzer => analyzer.clear());
    }
  }
}