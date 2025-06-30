import { spawn, ChildProcess } from 'child_process';
import { ExecutionResult } from '../types';

/**
 * Abstract base class for AI provider implementations.
 * Provides common interface for executing tasks with different AI providers.
 */
export abstract class Provider {
  /**
   * Get the name of this provider.
   */
  abstract get name(): string;

  /**
   * Check if this provider is available on the system.
   * @returns Promise resolving to true if provider is available
   */
  abstract checkAvailability(): Promise<boolean>;

  /**
   * Execute a task with this provider.
   * @param issueFile - Path to the issue file to execute
   * @param planFile - Path to the plan file to execute
   * @param contextFiles - Optional array of context file paths
   * @param signal - Optional abort signal for cancellation
   * @returns Promise resolving to execution result
   */
  abstract execute(
    issueFile: string,
    planFile: string,
    contextFiles?: string[],
    signal?: AbortSignal
  ): Promise<ExecutionResult>;

  /**
   * Spawn a child process and handle output.
   * @param command - Command to execute
   * @param args - Command arguments
   * @param signal - Optional abort signal
   * @returns Promise resolving to process output
   */
  protected spawnProcess(
    command: string,
    args: string[],
    signal?: AbortSignal
  ): Promise<{ stdout: string; stderr: string; code: number | null }> {
    return new Promise((resolve, reject) => {
      const child: ChildProcess = spawn(command, args);
      let stdout = '';
      let stderr = '';

      if (signal) {
        signal.addEventListener('abort', () => {
          child.kill('SIGTERM');
          reject(new Error('Process aborted'));
        });
      }

      child.stdout?.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      child.stderr?.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      child.on('error', (error) => {
        reject(error);
      });

      child.on('close', (code) => {
        resolve({ stdout, stderr, code });
      });
    });
  }

  /**
   * Format error message from provider output.
   * @param error - Error object or string
   * @returns Formatted error message
   */
  protected formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Unknown error occurred';
  }

  /**
   * Extract list of changed files from provider output.
   * @param output - Provider output text
   * @returns Array of file paths that were changed
   */
  protected extractFilesChanged(output: string): string[] {
    const files: string[] = [];
    
    // Common patterns for file modifications
    const patterns = [
      /Modified:\s+(.+)/gi,
      /Created:\s+(.+)/gi,
      /Updated:\s+(.+)/gi,
      /Changed:\s+(.+)/gi,
      /File changed:\s+(.+)/gi,
      /Wrote to:\s+(.+)/gi,
      /Writing to:\s+(.+)/gi,
      /Saved:\s+(.+)/gi
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(output)) !== null) {
        const file = match[1]?.trim();
        if (file !== undefined && file !== '' && !files.includes(file)) {
          files.push(file);
        }
      }
    }
    
    return files;
  }
}