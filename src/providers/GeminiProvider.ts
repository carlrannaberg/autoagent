import { Provider } from './Provider';
import { ExecutionResult } from '../types';
import { ChatOptions } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ProviderRateLimiter } from '../core/provider-rate-limiter';
import { RateLimitMonitor, RateLimitDetectedError } from '../core/rate-limit-monitor';
import { Logger } from '../utils/logger';

/**
 * Gemini provider implementation.
 * Uses the Gemini CLI tool to execute autonomous agent tasks.
 */
export class GeminiProvider extends Provider {
  private rateLimiter: ProviderRateLimiter;
  private monitor: RateLimitMonitor;

  constructor() {
    super();
    this.rateLimiter = new ProviderRateLimiter();
    this.monitor = new RateLimitMonitor(this.rateLimiter);
  }

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
   * Execute a task with Gemini using enhanced rate limiting.
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
      // Check if Gemini is rate limited
      const isRateLimited = await this.rateLimiter.isProviderRateLimited('gemini');
      if (isRateLimited) {
        const status = await this.rateLimiter.getRateLimitStatus('gemini');
        const remainingTime = Math.ceil((status.timeRemaining ?? 0) / 1000 / 60);
        throw new Error(`Gemini is rate limited. Try again in ${remainingTime} minutes.`);
      }

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
      
      // Execute with rate limit monitoring and automatic model fallback
      const result = await this.monitor.executeGeminiWithFallback(args, {
        signal,
        stdinContent: prompt,
        enableStreaming: true
      });

      if (result.exitCode !== 0) {
        throw new Error(`Gemini execution failed with code ${result.exitCode}: ${result.stderr}`);
      }

      // Parse output for success indicators and file changes
      const filesChanged = this.extractFilesChanged(result.stdout);
      const success = this.determineSuccess(result.stdout, result.stderr, result.exitCode);

      return {
        success,
        issueNumber,
        duration: Date.now() - startTime,
        output: result.stdout,
        error: success ? undefined : result.stderr,
        provider: 'gemini',
        filesChanged: filesChanged.length > 0 ? filesChanged : undefined
      };
    } catch (error) {
      // Handle rate limit errors specifically
      if (error instanceof RateLimitDetectedError) {
        Logger.error(`Rate limit detected for Gemini: ${error.message}`);
        return {
          success: false,
          issueNumber,
          duration: Date.now() - startTime,
          error: `Rate limit detected: ${error.message}`,
          provider: 'gemini'
        };
      }

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

  /**
   * Send a chat message to Gemini and get a response with enhanced rate limiting.
   * Used for reflection and other interactive AI operations.
   * @param prompt - The prompt to send to Gemini
   * @param options - Optional configuration for the chat request
   * @returns Promise resolving to Gemini's response
   */
  async chat(prompt: string, options?: ChatOptions): Promise<string> {
    try {
      // Check if Gemini is rate limited
      const isRateLimited = await this.rateLimiter.isProviderRateLimited('gemini');
      if (isRateLimited) {
        const status = await this.rateLimiter.getRateLimitStatus('gemini');
        const remainingTime = Math.ceil((status.timeRemaining ?? 0) / 1000 / 60);
        throw new Error(`Gemini is rate limited. Try again in ${remainingTime} minutes.`);
      }
      
      // Build the full prompt with optional system prompt
      let fullPrompt = prompt;
      if (options?.systemPrompt !== undefined) {
        fullPrompt = `${options.systemPrompt}\n\n${prompt}`;
      }

      // Execute with rate limit monitoring
      const result = await this.monitor.executeGeminiWithFallback([fullPrompt], {
        signal: options?.signal,
        enableStreaming: false
      });

      if (result.exitCode !== 0) {
        throw new Error(result.stderr || `Gemini exited with code ${result.exitCode}`);
      }

      // Extract the response text
      const responseText = result.stdout.trim();
      
      if (!responseText) {
        throw new Error('No response text received from Gemini');
      }

      return responseText;
    } catch (error) {
      // Handle rate limit errors specifically
      if (error instanceof RateLimitDetectedError) {
        throw new Error(`Gemini rate limit detected: ${error.message}`);
      }
      
      throw new Error(`Gemini chat error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}