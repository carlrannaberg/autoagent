import { Provider } from './Provider';
import { ChatOptions } from './types';
import { spawn } from 'child_process';

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
      return code === 0 && stdout.toLowerCase().includes('gemini');
    } catch (error) {
      return false;
    }
  }

  /**
   * Execute a task with Gemini.
   * @param prompt - The task prompt/context to execute
   * @param workspace - Working directory for the task
   * @param additionalDirectories - Optional array of additional directories to give AI access to
   * @param signal - Optional abort signal for cancellation
   * @returns Promise resolving to the task output string
   */
  async execute(
    prompt: string,
    workspace: string,
    _additionalDirectories?: string[],
    signal?: AbortSignal
  ): Promise<string> {
    // Gemini CLI expects prompt as a positional argument
    const args = [prompt];

    // Add sandbox mode for code execution
    args.push('--sandbox');

    // Execute Gemini
    return new Promise((resolve, reject) => {
      const child = spawn('gemini', args, {
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
          reject(new Error(`Gemini exited with code ${code}: ${error}`));
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
   * Send a chat message to Gemini and get a response.
   * @param prompt - The message to send to Gemini
   * @param options - Optional chat configuration
   * @returns Promise resolving to Gemini's response
   */
  async chat(prompt: string, options?: ChatOptions): Promise<string> {
    const args = [prompt];

    if (options?.systemPrompt) {
      // Prepend system prompt to the user prompt
      args[0] = `${options.systemPrompt}\n\n${prompt}`;
    }

    try {
      const { stdout } = await this.spawnProcess('gemini', args, options?.signal);
      return stdout.trim();
    } catch (error) {
      throw new Error(`Gemini chat failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}