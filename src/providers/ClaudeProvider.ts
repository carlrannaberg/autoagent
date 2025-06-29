import chalk from 'chalk';
import { Provider } from './Provider';
import { ExecutionResult } from '../types';

/**
 * Claude provider implementation.
 * Uses the Claude CLI tool to execute autonomous agent tasks.
 */
export class ClaudeProvider extends Provider {
  /**
   * Get the name of this provider.
   */
  get name(): string {
    return 'claude';
  }

  /**
   * Check if Claude CLI is available on the system.
   * @returns Promise resolving to true if Claude is available
   */
  async checkAvailability(): Promise<boolean> {
    try {
      const { stdout, code } = await this.spawnProcess('claude', ['--version']);
      return code === 0 && stdout.includes('claude');
    } catch (error) {
      return false;
    }
  }

  /**
   * Execute a task with Claude.
   * @param issueFile - Path to the issue file to execute
   * @param planFile - Path to the plan file to execute
   * @param contextFiles - Optional array of context file paths
   * @param signal - Optional abort signal for cancellation
   * @returns Promise resolving to execution result
   */
  async execute(
    issueFile: string,
    planFile: string,
    contextFiles?: string[],
    signal?: AbortSignal
  ): Promise<ExecutionResult> {
    const startTime = Date.now();
    const issueNumber = this.extractIssueNumber(issueFile);

    try {
      // Build command arguments
      const args = [
        'autonomous',
        '--json',
        '--issue', issueFile,
        '--plan', planFile
      ];

      // Add context files if provided
      if (contextFiles && contextFiles.length > 0) {
        contextFiles.forEach(file => {
          args.push('--context', file);
        });
      }

      // Log execution start if not in silent mode
      if (process.env.AUTOAGENT_SILENT !== 'true') {
        console.log(chalk.blue(`Executing with Claude: Issue #${issueNumber}`));
      }
      
      const { stdout, stderr, code } = await this.spawnProcess('claude', args, signal);

      if (code !== 0) {
        throw new Error(`Claude execution failed with code ${code}: ${stderr}`);
      }

      // Parse JSON output
      let result: Partial<ExecutionResult> = {};
      try {
        const parsed = JSON.parse(stdout) as Partial<ExecutionResult>;
        result = parsed;
      } catch (parseError) {
        // If JSON parsing fails, treat as plain text output
        result = {
          success: true,
          output: stdout
        };
      }

      return {
        success: result.success !== false,
        issueNumber,
        duration: Date.now() - startTime,
        output: result.output,
        error: result.error,
        provider: 'claude',
        filesChanged: result.filesChanged,
        rollbackData: result.rollbackData
      };
    } catch (error) {
      return {
        success: false,
        issueNumber,
        duration: Date.now() - startTime,
        error: this.formatError(error),
        provider: 'claude'
      };
    }
  }

  /**
   * Extract issue number from file path.
   * @param filePath - Path to issue file
   * @returns Issue number or 0 if not found
   */
  private extractIssueNumber(filePath: string): number {
    const match = filePath.match(/(\d+)-/);
    return (match !== null && match[1] !== undefined) ? parseInt(match[1], 10) : 0;
  }
}