// Chalk import removed - use Logger instead
import { Provider } from './Provider';
import { ExecutionResult } from '../types';
import * as fs from 'fs/promises';
import * as path from 'path';

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
      return code === 0 && stdout.toLowerCase().includes('claude');
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
      const args = [
        '-p', prompt
      ];
      
      // Add directory access for the current working directory
      const cwd = process.cwd();
      args.unshift('--add-dir', cwd);
      
      // Use JSON output format if available
      args.push('--output-format', 'json');
      
      // Skip permission prompts for autonomous operation
      args.push('--dangerously-skip-permissions');
      
      const { stdout, stderr, code } = await this.spawnProcess('claude', args, signal);

      if (code !== 0) {
        throw new Error(`Claude execution failed with code ${code}: ${stderr}`);
      }

      // Try to parse JSON output
      let filesChanged: string[] = [];
      let output = stdout;
      
      try {
        const parsed = JSON.parse(stdout) as unknown;
        // Claude's JSON output structure might vary
        if (typeof parsed === 'object' && parsed !== null) {
          const obj = parsed as Record<string, unknown>;
          if (typeof obj.content === 'string') {
            output = obj.content;
          } else if (typeof obj.output === 'string') {
            output = obj.output;
          }
        } else if (typeof parsed === 'string') {
          output = parsed;
        }
      } catch (parseError) {
        // Not JSON or failed to parse, use raw output
      }

      // Extract files changed from output
      filesChanged = this.extractFilesChanged(output);

      return {
        success: true,
        issueNumber,
        duration: Date.now() - startTime,
        output,
        provider: 'claude',
        filesChanged: filesChanged.length > 0 ? filesChanged : undefined
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