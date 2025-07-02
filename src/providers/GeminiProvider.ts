import { Provider } from './Provider';
import { ExecutionResult } from '../types';
import * as fs from 'fs/promises';
import * as path from 'path';

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
      const { code } = await this.spawnProcess('gemini', ['--version']);
      return code === 0;
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
      // Read issue and plan files
      const issueContent = await fs.readFile(issueFile, 'utf-8');
      const planContent = await fs.readFile(planFile, 'utf-8');
      
      // Build the prompt
      let prompt = `You are an autonomous AI agent tasked with completing the following issue and plan.

## Issue

${issueContent}

## Plan

${planContent}

Please execute the plan to complete the issue. Make all necessary code changes, create files as needed, and ensure all acceptance criteria are met.

When you make changes to files, please clearly indicate which files were modified.`;
      
      // Add context files if provided
      if (contextFiles && contextFiles.length > 0) {
        prompt += '\n\n## Additional Context Files\n';
        for (const file of contextFiles) {
          try {
            const content = await fs.readFile(file, 'utf-8');
            const filename = path.basename(file);
            prompt += `\n### ${filename}\n\n${content}\n`;
          } catch (err) {
            // Skip files that can't be read
          }
        }
      }
      
      // Build command arguments
      const args: string[] = [];
      
      // Add all_files flag to give access to current directory
      args.push('--all_files');
      
      // Enable YOLO mode for autonomous operation (auto-approve all tool calls)
      args.push('--yolo');
      
      // Use stdin to pass the prompt (more reliable than -p flag for long prompts)
      const { stdout, stderr, code } = await this.spawnProcessWithStreamingAndStdin('gemini', args, prompt, signal);

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
   * Determine if execution was successful based on output.
   * @param stdout - Standard output
   * @param stderr - Standard error
   * @param code - Exit code
   * @returns True if successful
   */
  private determineSuccess(stdout: string, stderr: string, code: number): boolean {
    // Exit code 0 is success
    if (code !== 0) {
      return false;
    }
    
    // Check for error indicators in output
    const errorIndicators = ['error:', 'failed:', 'exception:', 'traceback:'];
    const outputLower = (stdout + stderr).toLowerCase();
    
    return !errorIndicators.some(indicator => outputLower.includes(indicator));
  }
}