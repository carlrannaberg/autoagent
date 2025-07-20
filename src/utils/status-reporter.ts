import chalk from 'chalk';
import { ExecutionResult, ToolFailure } from '../types/index.js';

/**
 * Task status reporter that provides user-friendly status messages
 * for task execution results.
 */
export class TaskStatusReporter {
  /**
   * Reports the completion status of a task execution with appropriate messaging.
   * @param result - The execution result to report
   */
  public reportCompletion(result: ExecutionResult): void {
    // Extract task completion validation if available
    const validation = result.taskCompletion;
    const hasToolFailures = result.toolFailures !== undefined && result.toolFailures.length > 0;
    
    // Determine overall status
    if (result.success && (!validation || validation.isComplete)) {
      this.reportFullSuccess(result);
    } else if (validation && validation.confidence >= 70 && validation.issues.length === 0) {
      // High confidence completion even if marked as incomplete
      this.reportFullSuccess(result);
    } else if (validation && (validation.confidence >= 40 || validation.issues.length <= 2)) {
      this.reportPartialCompletion(result);
    } else {
      this.reportFailure(result);
    }

    // Show tool failure details if present
    if (hasToolFailures && result.toolFailures !== undefined) {
      this.reportToolFailures(result.toolFailures);
    }

    // Show recommendations if available
    if (validation && validation.recommendations.length > 0) {
      this.reportRecommendations(validation.recommendations);
    }
  }

  /**
   * Formats a detailed error report for verbose output.
   * @param result - The execution result to format
   * @returns Formatted error report string
   */
  public formatDetailedReport(result: ExecutionResult): string {
    const lines: string[] = [];
    
    // Header
    lines.push(chalk.bold('\n📋 Detailed Execution Report'));
    lines.push(chalk.gray('─'.repeat(50)));
    
    // Basic info
    lines.push(`${chalk.bold('Task:')} ${result.taskId}${result.taskTitle !== undefined && result.taskTitle !== null && result.taskTitle !== '' ? ` - ${result.taskTitle}` : ''}`);
    lines.push(`${chalk.bold('Duration:')} ${this.formatDuration(result.duration)}`);
    if (result.provider !== undefined && result.provider !== null) {
      lines.push(`${chalk.bold('Provider:')} ${result.provider}`);
    }
    
    // Status
    const status = this.determineStatus(result);
    const statusColor = status === 'completed' ? chalk.green : 
                       status === 'partial' ? chalk.yellow : 
                       chalk.red;
    lines.push(`${chalk.bold('Status:')} ${statusColor(status)}`);
    
    // Files changed
    if (result.filesChanged && result.filesChanged.length > 0) {
      lines.push(`\n${chalk.bold('Files Changed:')}`);
      result.filesChanged.forEach(file => {
        lines.push(`  • ${file}`);
      });
    }
    
    // Task completion details
    if (result.taskCompletion) {
      lines.push(`\n${chalk.bold('Task Completion Analysis:')}`);
      lines.push(`  ${chalk.bold('Completion:')} ${result.taskCompletion.isComplete ? chalk.green('Yes') : chalk.red('No')}`);
      lines.push(`  ${chalk.bold('Confidence:')} ${this.formatConfidence(result.taskCompletion.confidence)}`);
      
      if (result.taskCompletion.issues.length > 0) {
        lines.push(`  ${chalk.bold('Issues Found:')}`);
        result.taskCompletion.issues.forEach(issue => {
          lines.push(`    • ${issue}`);
        });
      }
      
      if (result.taskCompletion.recommendations.length > 0) {
        lines.push(`  ${chalk.bold('Recommendations:')}`);
        result.taskCompletion.recommendations.forEach(rec => {
          lines.push(`    • ${rec}`);
        });
      }
    }
    
    // Tool failures
    if (result.toolFailures && result.toolFailures.length > 0) {
      lines.push(`\n${chalk.bold('Tool Failures:')}`);
      result.toolFailures.forEach(failure => {
        const severityColor = failure.severity === 'error' ? chalk.red :
                            failure.severity === 'warning' ? chalk.yellow :
                            chalk.gray;
        lines.push(`  ${severityColor('•')} ${failure.toolName !== undefined && failure.toolName !== null && failure.toolName !== '' ? failure.toolName : 'Unknown tool'}: ${failure.message}`);
        if (failure.type !== 'generic_error') {
          lines.push(`    Type: ${failure.type}`);
        }
      });
    }
    
    // Error details
    if (result.error !== undefined && result.error !== null && result.error !== '') {
      lines.push(`\n${chalk.bold('Error Details:')}`);
      lines.push(chalk.red(this.wrapText(result.error, 2)));
    }
    
    // Output preview (if no error)
    if ((result.error === undefined || result.error === null || result.error === '') && result.output !== undefined && result.output !== null && result.output !== '') {
      const preview = result.output.slice(0, 200);
      const hasMore = result.output.length > 200;
      lines.push(`\n${chalk.bold('Output Preview:')}`);
      lines.push(chalk.gray(this.wrapText(preview + (hasMore ? '...' : ''), 2)));
    }
    
    lines.push(chalk.gray('─'.repeat(50)));
    
    return lines.join('\n');
  }

  private reportFullSuccess(result: ExecutionResult): void {
    const title = result.taskTitle !== undefined && result.taskTitle !== null && result.taskTitle !== '' ? `: ${result.taskTitle}` : '';
    console.log(chalk.green(`\n✅ Successfully completed task ${result.taskId}${title}`));
    
    if (result.filesChanged && result.filesChanged.length > 0) {
      console.log(chalk.gray(`   Modified ${result.filesChanged.length} file${result.filesChanged.length === 1 ? '' : 's'}`));
    }
    
    console.log(chalk.gray(`   Duration: ${this.formatDuration(result.duration)}`));
  }

  private reportPartialCompletion(result: ExecutionResult): void {
    const title = result.taskTitle !== undefined && result.taskTitle !== null && result.taskTitle !== '' ? `: ${result.taskTitle}` : '';
    console.log(chalk.yellow(`\n⚠️  Partially completed task ${result.taskId}${title}`));
    
    if (result.taskCompletion) {
      console.log(chalk.yellow(`   Task appears incomplete (${result.taskCompletion.confidence}% confidence)`));
      
      if (result.taskCompletion.issues.length > 0) {
        console.log(chalk.yellow('   Issues detected:'));
        result.taskCompletion.issues.slice(0, 3).forEach(issue => {
          console.log(chalk.yellow(`   • ${issue}`));
        });
        if (result.taskCompletion.issues.length > 3) {
          console.log(chalk.yellow(`   • ... and ${result.taskCompletion.issues.length - 3} more`));
        }
      }
    }
    
    console.log(chalk.gray(`   Duration: ${this.formatDuration(result.duration)}`));
  }

  private reportFailure(result: ExecutionResult): void {
    const title = result.taskTitle !== undefined && result.taskTitle !== null && result.taskTitle !== '' ? `: ${result.taskTitle}` : '';
    console.log(chalk.red(`\n❌ Failed to complete task ${result.taskId}${title}`));
    
    if (result.error !== undefined && result.error !== null && result.error !== '') {
      const errorPreview = result.error.slice(0, 100);
      const hasMore = result.error.length > 100;
      console.log(chalk.red(`   Error: ${errorPreview}${hasMore ? '...' : ''}`));
    }
    
    if (result.taskCompletion && result.taskCompletion.confidence < 40) {
      console.log(chalk.red(`   Low completion confidence: ${result.taskCompletion.confidence}%`));
    }
    
    console.log(chalk.gray(`   Duration: ${this.formatDuration(result.duration)}`));
  }

  private reportToolFailures(failures: ToolFailure[]): void {
    const errorCount = failures.filter(f => f.severity === 'error').length;
    const warningCount = failures.filter(f => f.severity === 'warning').length;
    
    if (errorCount > 0 || warningCount > 0) {
      console.log(chalk.bold('\n🔧 Tool Issues:'));
      
      if (errorCount > 0) {
        console.log(chalk.red(`   ${errorCount} error${errorCount === 1 ? '' : 's'} encountered`));
      }
      
      if (warningCount > 0) {
        console.log(chalk.yellow(`   ${warningCount} warning${warningCount === 1 ? '' : 's'} encountered`));
      }
      
      // Show first few critical failures
      const criticalFailures = failures
        .filter(f => f.severity === 'error')
        .slice(0, 2);
      
      criticalFailures.forEach(failure => {
        console.log(chalk.red(`   • ${failure.toolName !== undefined && failure.toolName !== null && failure.toolName !== '' ? failure.toolName : 'Tool'}: ${failure.message}`));
      });
    }
  }

  private reportRecommendations(recommendations: string[]): void {
    if (recommendations.length === 0) {return;}
    
    console.log(chalk.bold('\n💡 Recommendations:'));
    recommendations.slice(0, 3).forEach(rec => {
      console.log(chalk.cyan(`   • ${rec}`));
    });
    
    if (recommendations.length > 3) {
      console.log(chalk.cyan(`   • ... and ${recommendations.length - 3} more suggestions`));
    }
  }

  private determineStatus(result: ExecutionResult): 'completed' | 'partial' | 'failed' {
    if (!result.success) {return 'failed';}
    
    const validation = result.taskCompletion;
    if (!validation) {return 'completed';}
    
    if (validation.isComplete || validation.confidence >= 70) {
      return 'completed';
    } else if (validation.confidence >= 40 || validation.issues.length <= 2) {
      return 'partial';
    } else {
      return 'failed';
    }
  }

  private formatDuration(milliseconds: number): string {
    if (milliseconds < 1000) {
      return `${milliseconds}ms`;
    } else if (milliseconds < 60000) {
      return `${(milliseconds / 1000).toFixed(1)}s`;
    } else {
      const minutes = Math.floor(milliseconds / 60000);
      const seconds = Math.floor((milliseconds % 60000) / 1000);
      return `${minutes}m ${seconds}s`;
    }
  }

  private formatConfidence(confidence: number): string {
    const color = confidence >= 70 ? chalk.green :
                  confidence >= 40 ? chalk.yellow :
                  chalk.red;
    return color(`${confidence}%`);
  }

  private wrapText(text: string, indent: number): string {
    const maxWidth = 80 - indent;
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    for (const word of words) {
      if (currentLine.length + word.length + 1 > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    const indentStr = ' '.repeat(indent);
    return lines.map(line => indentStr + line).join('\n');
  }
}