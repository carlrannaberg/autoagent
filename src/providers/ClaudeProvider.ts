import { Provider } from './Provider';
import { ChatOptions } from './types';
import { spawn } from 'child_process';

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
   * @param prompt - The task prompt/context to execute
   * @param workspace - Working directory for the task
   * @param additionalDirectories - Optional array of additional directories to give AI access to
   * @param signal - Optional abort signal for cancellation
   * @returns Promise resolving to the task output string
   */
  async execute(
    prompt: string,
    workspace: string,
    additionalDirectories?: string[],
    signal?: AbortSignal
  ): Promise<string> {
    // Build Claude command
    const args = [
      '-p',  // Print mode
      prompt
    ];

    // Add workspace directory
    args.push('--add-dir', workspace);

    // Add additional directories if provided
    if (additionalDirectories && additionalDirectories.length > 0) {
      for (const dir of additionalDirectories) {
        args.push('--add-dir', dir);
      }
    }

    // Add model if specified
    args.push('--model', 'claude-sonnet-4-20250514');

    // Execute Claude
    return new Promise((resolve, reject) => {
      const child = spawn('claude', args, {
        cwd: workspace,
        env: { ...process.env }
      });

      let output = '';
      let error = '';

      child.stdout.on('data', (data: Buffer) => {
        const text = data.toString();
        output += text;
        // In the future, we could add real-time output formatting here
      });

      child.stderr.on('data', (data: Buffer) => {
        error += data.toString();
      });

      child.on('close', (code: number | null) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(`Claude exited with code ${code}: ${error}`));
        }
      });

      child.on('error', (err: Error) => {
        reject(err);
      });

      // Handle abort signal
      if (signal) {
        signal.addEventListener('abort', () => {
          child.kill('SIGTERM');
          reject(new Error('Process aborted'));
        });
      }
    });
  }

  /**
   * Send a chat message to Claude and get a response.
   * @param prompt - The message to send to Claude
   * @param options - Optional chat configuration
   * @returns Promise resolving to Claude's response
   */
  async chat(prompt: string, options?: ChatOptions): Promise<string> {
    const args = ['-p', prompt];

    if (options?.systemPrompt) {
      // Claude doesn't have a direct system prompt flag in the CLI,
      // so we'll prepend it to the prompt
      args[1] = `${options.systemPrompt}\n\n${prompt}`;
    }

    // Add model if specified
    args.push('--model', 'claude-sonnet-4-20250514');

    if (options?.maxTokens) {
      args.push('--max-tokens', options.maxTokens.toString());
    }

    try {
      const { stdout } = await this.spawnProcess('claude', args, options?.signal);
      return stdout.trim();
    } catch (error) {
      throw new Error(`Claude chat failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}