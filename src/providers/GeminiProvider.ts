import chalk from 'chalk';
import { Provider } from './Provider';
import { ExecutionResult } from '../types';

/**
 * Gemini provider implementation.
 * Uses the Gemini CLI tool to execute autonomous agent tasks.
 */
export class GeminiProvider extends Provider {
  /**
   * Get the name of this provider.
   */
  get name(): string {
    return 'gemini';
  }

  /**
   * Check if Gemini CLI is available on the system.
   * @returns Promise resolving to true if Gemini is available
   */
  async checkAvailability(): Promise<boolean> {
    try {
      const { stdout, code } = await this.spawnProcess('gemini', ['--version']);
      return code === 0 && stdout.includes('gemini');
    } catch (error) {
      return false;
    }
  }

  /**
   * Execute a task with Gemini.
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
        console.log(chalk.green(`Executing with Gemini: Issue #${issueNumber}`));
      }
      
      const { stdout, stderr, code } = await this.spawnProcess('gemini', args, signal);

      if (code !== 0) {
        throw new Error(`Gemini execution failed with code ${code}: ${stderr}`);
      }

      // Parse output for success indicators and file changes
      const filesChanged = this.extractFilesChanged(stdout);
      const success = this.determineSuccess(stdout, stderr, code);

      return {
        success,
        issueNumber,
        duration: Date.now() - startTime,
        output: stdout,
        error: success ? undefined : stderr,
        provider: 'gemini',
        filesChanged: filesChanged.length > 0 ? filesChanged : undefined
      };
    } catch (error) {
      return {
        success: false,
        issueNumber,
        duration: Date.now() - startTime,
        error: this.formatError(error),
        provider: 'gemini'
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

  /**
   * Extract files changed from Gemini output.
   * @param output - Gemini stdout output
   * @returns Array of file paths that were changed
   */
  private extractFilesChanged(output: string): string[] {
    const files: string[] = [];
    const lines = output.split('\n');
    
    // Look for common file modification indicators
    lines.forEach(line => {
      // Match patterns like "Modified: path/to/file.ts"
      const modifiedMatch = line.match(/Modified:\s+(.+)/);
      if (modifiedMatch !== null && modifiedMatch[1] !== undefined) {
        files.push(modifiedMatch[1].trim());
      }
      
      // Match patterns like "Created: path/to/file.ts"
      const createdMatch = line.match(/Created:\s+(.+)/);
      if (createdMatch !== null && createdMatch[1] !== undefined) {
        files.push(createdMatch[1].trim());
      }
      
      // Match patterns like "Updated: path/to/file.ts"
      const updatedMatch = line.match(/Updated:\s+(.+)/);
      if (updatedMatch !== null && updatedMatch[1] !== undefined) {
        files.push(updatedMatch[1].trim());
      }
    });

    return [...new Set(files)]; // Remove duplicates
  }

  /**
   * Determine if execution was successful based on output.
   * @param stdout - Standard output
   * @param stderr - Standard error
   * @param code - Exit code
   * @returns True if execution was successful
   */
  private determineSuccess(stdout: string, stderr: string, code: number | null): boolean {
    // First check exit code
    if (code !== 0) {
      return false;
    }

    // Check for error indicators in output
    const errorIndicators = [
      'error:',
      'failed:',
      'exception:',
      'fatal:',
      'could not',
      'unable to'
    ];

    const outputLower = stdout.toLowerCase() + stderr.toLowerCase();
    return !errorIndicators.some(indicator => outputLower.includes(indicator));
  }
}