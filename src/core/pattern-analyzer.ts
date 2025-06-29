import { ExecutionResult } from '../types';

interface Pattern {
  name: string;
  description: string;
  confidence: number;
  occurrences: number;
}

// FileChangePattern interface reserved for future use
// interface FileChangePattern {
//   type: 'creation' | 'modification' | 'deletion';
//   extensions: string[];
//   directories: string[];
//   frequency: number;
// }

export class PatternAnalyzer {
  private executionHistory: ExecutionResult[] = [];
  private patterns: Map<string, Pattern> = new Map();

  /**
   * Add an execution result to the history for pattern analysis
   */
  addExecution(result: ExecutionResult): void {
    this.executionHistory.push(result);
    this.analyzePatterns();
  }

  /**
   * Analyze patterns from execution history
   */
  private analyzePatterns(): void {
    // Clear existing patterns
    this.patterns.clear();

    // Analyze success patterns
    this.analyzeSuccessPatterns();

    // Analyze failure patterns
    this.analyzeFailurePatterns();

    // Analyze file change patterns
    this.analyzeFileChangePatterns();

    // Analyze duration patterns
    this.analyzeDurationPatterns();

    // Analyze provider-specific patterns
    this.analyzeProviderPatterns();
  }

  /**
   * Analyze success rate patterns
   */
  private analyzeSuccessPatterns(): void {
    const successfulExecutions = this.executionHistory.filter(e => e.success);
    const totalExecutions = this.executionHistory.length;

    if (totalExecutions === 0) return;

    const successRate = successfulExecutions.length / totalExecutions;

    if (successRate >= 0.95) {
      this.addPattern({
        name: 'high-success-rate',
        description: 'Consistently successful execution pattern',
        confidence: Math.min(totalExecutions / 10, 1), // More executions = higher confidence
        occurrences: successfulExecutions.length
      });
    } else if (successRate < 0.7) {
      this.addPattern({
        name: 'high-failure-rate',
        description: 'Frequent failures requiring investigation',
        confidence: Math.min(totalExecutions / 10, 1),
        occurrences: totalExecutions - successfulExecutions.length
      });
    }
  }

  /**
   * Analyze failure patterns
   */
  private analyzeFailurePatterns(): void {
    const failures = this.executionHistory.filter(e => !e.success && e.error);
    
    // Group failures by error type
    const errorTypes: Map<string, number> = new Map();
    
    failures.forEach(failure => {
      if (failure.error) {
        const errorType = this.categorizeError(failure.error);
        errorTypes.set(errorType, (errorTypes.get(errorType) || 0) + 1);
      }
    });

    // Find common error patterns
    errorTypes.forEach((count, errorType) => {
      if (count >= 3) {
        this.addPattern({
          name: `frequent-${errorType}`,
          description: `Recurring ${errorType} errors`,
          confidence: count / Math.max(failures.length, 1),
          occurrences: count
        });
      }
    });
  }

  /**
   * Categorize error messages
   */
  private categorizeError(error: string): string {
    const lowerError = error.toLowerCase();
    
    if (lowerError.includes('rate limit')) {
      return 'rate-limit';
    } else if (lowerError.includes('timeout')) {
      return 'timeout';
    } else if (lowerError.includes('permission') || lowerError.includes('access')) {
      return 'permission';
    } else if (lowerError.includes('not found') || lowerError.includes('404')) {
      return 'not-found';
    } else if (lowerError.includes('syntax') || lowerError.includes('parse')) {
      return 'syntax';
    } else {
      return 'unknown';
    }
  }

  /**
   * Analyze file change patterns
   */
  private analyzeFileChangePatterns(): void {
    const executionsWithFiles = this.executionHistory.filter(e => e.filesModified && e.filesModified.length > 0);
    
    if (executionsWithFiles.length < 3) return;

    // Track file extensions
    const extensionCounts: Map<string, number> = new Map();
    let totalFiles = 0;

    executionsWithFiles.forEach(execution => {
      execution.filesModified?.forEach(file => {
        totalFiles++;
        const ext = this.getFileExtension(file);
        extensionCounts.set(ext, (extensionCounts.get(ext) || 0) + 1);
      });
    });

    // Find dominant file types
    extensionCounts.forEach((count, ext) => {
      const percentage = count / totalFiles;
      if (percentage > 0.3) {
        this.addPattern({
          name: `frequent-${ext}-changes`,
          description: `High frequency of ${ext} file modifications`,
          confidence: percentage,
          occurrences: count
        });
      }
    });

    // Check for test file patterns
    const testFiles = this.executionHistory.filter(e => 
      e.filesModified?.some(f => f.includes('test') || f.includes('spec'))
    ).length;

    if (testFiles / executionsWithFiles.length > 0.7) {
      this.addPattern({
        name: 'test-focused',
        description: 'Strong focus on test file modifications',
        confidence: 0.8,
        occurrences: testFiles
      });
    }
  }

  /**
   * Analyze execution duration patterns
   */
  private analyzeDurationPatterns(): void {
    const durations = this.executionHistory
      .filter(e => e.duration > 0)
      .map(e => e.duration);

    if (durations.length < 5) return;

    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const stdDev = Math.sqrt(
      durations.reduce((sum, d) => sum + Math.pow(d - avgDuration, 2), 0) / durations.length
    );

    // Check for consistent fast execution
    if (avgDuration < 30000 && stdDev < 10000) {
      this.addPattern({
        name: 'fast-execution',
        description: 'Consistently fast execution times',
        confidence: Math.min(durations.length / 10, 1),
        occurrences: durations.length
      });
    }

    // Check for highly variable execution times
    if (stdDev > avgDuration * 0.5) {
      this.addPattern({
        name: 'variable-duration',
        description: 'Highly variable execution times',
        confidence: 0.7,
        occurrences: durations.length
      });
    }
  }

  /**
   * Analyze provider-specific patterns
   */
  private analyzeProviderPatterns(): void {
    const providerCounts: Map<string, number> = new Map();
    const providerSuccesses: Map<string, number> = new Map();

    this.executionHistory.forEach(execution => {
      if (execution.provider) {
        providerCounts.set(execution.provider, (providerCounts.get(execution.provider) || 0) + 1);
        if (execution.success) {
          providerSuccesses.set(execution.provider, (providerSuccesses.get(execution.provider) || 0) + 1);
        }
      }
    });

    // Check for provider preferences
    providerCounts.forEach((count, provider) => {
      const totalExecutions = this.executionHistory.length;
      const usage = count / totalExecutions;
      
      if (usage > 0.8) {
        this.addPattern({
          name: `${provider}-dominant`,
          description: `Heavy reliance on ${provider} provider`,
          confidence: usage,
          occurrences: count
        });
      }

      // Check provider-specific success rates
      const successes = providerSuccesses.get(provider) || 0;
      const successRate = successes / count;

      if (count >= 5 && successRate < 0.6) {
        this.addPattern({
          name: `${provider}-struggles`,
          description: `${provider} provider has lower success rate`,
          confidence: Math.min(count / 10, 1),
          occurrences: count - successes
        });
      }
    });
  }

  /**
   * Get file extension from path
   */
  private getFileExtension(filePath: string): string {
    const parts = filePath.split('.');
    return parts.length > 1 ? parts[parts.length - 1] || 'no-ext' : 'no-ext';
  }

  /**
   * Add a pattern to the collection
   */
  private addPattern(pattern: Pattern): void {
    this.patterns.set(pattern.name, pattern);
  }

  /**
   * Get detected patterns
   */
  getPatterns(): Pattern[] {
    return Array.from(this.patterns.values())
      .sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Get pattern recommendations
   */
  getRecommendations(): string[] {
    const recommendations: string[] = [];
    const patterns = this.getPatterns();

    patterns.forEach(pattern => {
      switch (pattern.name) {
        case 'high-failure-rate':
          recommendations.push('Consider reviewing error logs and adjusting provider instructions');
          break;
        case 'frequent-rate-limit':
          recommendations.push('Implement better rate limit handling or increase delay between requests');
          break;
        case 'variable-duration':
          recommendations.push('Consider breaking down complex tasks into smaller, more predictable units');
          break;
        case 'test-focused':
          recommendations.push('Good testing practices detected - maintain this pattern');
          break;
        default:
          if (pattern.name.includes('-struggles')) {
            const provider = pattern.name.replace('-struggles', '');
            recommendations.push(`Consider updating ${provider.toUpperCase()}.md with more specific instructions`);
          }
      }
    });

    return [...new Set(recommendations)]; // Remove duplicates
  }

  /**
   * Clear history and patterns
   */
  clear(): void {
    this.executionHistory = [];
    this.patterns.clear();
  }
}