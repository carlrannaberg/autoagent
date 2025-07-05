import { spawn, ChildProcess } from 'child_process';
import { ProviderName } from '../types';
import { ProviderRateLimiter } from './provider-rate-limiter';
import { StreamFormatter } from '../utils/stream-formatter';
import { Logger } from '../utils/logger';

/**
 * Custom error for rate limit detection
 */
export class RateLimitDetectedError extends Error {
  constructor(
    public readonly provider: ProviderName,
    public readonly originalError: string
  ) {
    super(`Rate limit detected for ${provider}: ${originalError}`);
    this.name = 'RateLimitDetectedError';
  }
}

/**
 * Result of monitored process execution
 */
export interface MonitoredProcessResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  rateLimitDetected: boolean;
  terminatedEarly: boolean;
}

/**
 * Rate limit monitor for real-time detection and early termination
 */
export class RateLimitMonitor {
  constructor(private readonly rateLimiter: ProviderRateLimiter) {}

  /**
   * Spawn a process with real-time rate limit monitoring
   */
  async spawnWithMonitoring(
    command: string,
    args: string[],
    provider: ProviderName,
    options?: {
      signal?: AbortSignal;
      stdinContent?: string;
      enableStreaming?: boolean;
    }
  ): Promise<MonitoredProcessResult> {
    return new Promise((resolve, reject) => {
      const child: ChildProcess = spawn(command, args, {
        stdio: (options?.stdinContent ?? '').length > 0 ? ['pipe', 'pipe', 'pipe'] : ['ignore', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';
      let rateLimitDetected = false;
      let terminatedEarly = false;

      // Show header if streaming is enabled
      if (options?.enableStreaming === true) {
        if (provider === 'gemini') {
          StreamFormatter.showHeader('gemini');
        } else if (provider === 'claude') {
          StreamFormatter.showHeader('claude');
        }
      }

      // Handle abort signal
      if (options?.signal) {
        options.signal.addEventListener('abort', () => {
          child.kill('SIGTERM');
          reject(new Error('Process aborted by user'));
        });
      }

      // Write to stdin if provided
      if ((options?.stdinContent ?? '').length > 0 && child.stdin) {
        child.stdin.write(options?.stdinContent ?? '');
        child.stdin.end();
      }

      // Monitor stdout for rate limit detection and streaming
      child.stdout?.on('data', (data: Buffer) => {
        const chunk = data.toString();
        stdout += chunk;

        // Stream output if enabled
        if (options?.enableStreaming === true) {
          this.handleStreamingOutput(chunk, provider);
        }

        // Check for rate limit indicators in stdout
        if (!rateLimitDetected && this.rateLimiter.isRateLimitError(provider, chunk)) {
          rateLimitDetected = true;
          terminatedEarly = true;
          Logger.warning(`Rate limit detected in stdout for ${provider} - terminating process`);
          child.kill('SIGTERM');
        }
      });

      // Monitor stderr for rate limit detection
      child.stderr?.on('data', (data: Buffer) => {
        const chunk = data.toString();
        stderr += chunk;

        // Debug logging
        if (process.env.DEBUG === 'true') {
          console.error(`[DEBUG] ${provider} stderr chunk: ${chunk}`);
        }

        // Check for rate limit immediately and kill process
        if (!rateLimitDetected && this.rateLimiter.isRateLimitError(provider, chunk)) {
          rateLimitDetected = true;
          terminatedEarly = true;
          Logger.warning(`Rate limit detected in stderr for ${provider} - terminating process immediately`);
          
          // Kill the process immediately to avoid waiting for internal retries
          child.kill('SIGTERM');
        }
      });

      // Handle process errors
      child.on('error', (error) => {
        reject(error);
      });

      // Handle process completion
      child.on('close', (code) => {
        // Flush streaming buffers
        if (options?.enableStreaming === true) {
          if (provider === 'gemini') {
            const remaining = StreamFormatter.flushGeminiBuffer();
            if (remaining) {
              StreamFormatter.displayGeminiText(remaining);
            }
            StreamFormatter.showFooter();
          } else if (provider === 'claude') {
            StreamFormatter.showFooter();
          }
        }

        // If we detected a rate limit, mark it
        if (rateLimitDetected) {
          this.rateLimiter.markProviderRateLimited(
            provider,
            stderr || stdout || 'Rate limit detected during real-time monitoring'
          ).catch(err => {
            Logger.error(`Failed to mark rate limit: ${err}`);
          });
        }

        resolve({
          stdout,
          stderr,
          exitCode: code,
          rateLimitDetected,
          terminatedEarly
        });
      });
    });
  }

  /**
   * Execute Gemini with automatic model fallback on rate limits
   */
  async executeGeminiWithFallback(
    args: string[],
    options?: {
      signal?: AbortSignal;
      stdinContent?: string;
      enableStreaming?: boolean;
    }
  ): Promise<MonitoredProcessResult> {
    // Get the best available Gemini model
    const bestModel = await this.rateLimiter.getBestGeminiModel();
    
    // Add model to args if not already present
    let finalArgs = [...args];
    if (!finalArgs.includes('--model')) {
      finalArgs.push('--model', bestModel);
    }

    console.log(`Using Gemini model: ${bestModel}`);

    try {
      const result = await this.spawnWithMonitoring('gemini', finalArgs, 'gemini', options);
      
      // If rate limit was detected and we were using the primary model, try fallback
      if (result.rateLimitDetected && result.terminatedEarly && bestModel === 'gemini-2.5-pro') {
        console.log('Switching to Gemini Flash model due to rate limit');
        
        // Update args to use fallback model
        finalArgs = args.filter(arg => arg !== '--model' && arg !== 'gemini-2.5-pro');
        finalArgs.push('--model', 'gemini-2.5-flash');
        
        // Try again with fallback model
        return await this.spawnWithMonitoring('gemini', finalArgs, 'gemini', options);
      }
      
      return result;
    } catch (error) {
      // Check if the error message contains rate limit indicators
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (this.rateLimiter.isRateLimitError('gemini', errorMessage)) {
        await this.rateLimiter.markProviderRateLimited('gemini', errorMessage);
        throw new RateLimitDetectedError('gemini', errorMessage);
      }
      
      throw error;
    }
  }

  /**
   * Execute Claude with rate limit monitoring (no model fallback)
   */
  async executeClaudeWithMonitoring(
    args: string[],
    options?: {
      signal?: AbortSignal;
      stdinContent?: string;
      enableStreaming?: boolean;
    }
  ): Promise<MonitoredProcessResult> {
    try {
      const result = await this.spawnWithMonitoring('claude', args, 'claude', options);
      
      // If rate limit was detected, throw error
      if (result.rateLimitDetected && result.terminatedEarly) {
        throw new RateLimitDetectedError('claude', result.stderr || 'Rate limit detected');
      }
      
      return result;
    } catch (error) {
      // Check if the error message contains rate limit indicators
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (this.rateLimiter.isRateLimitError('claude', errorMessage)) {
        await this.rateLimiter.markProviderRateLimited('claude', errorMessage);
        throw new RateLimitDetectedError('claude', errorMessage);
      }
      
      throw error;
    }
  }

  /**
   * Handle streaming output display
   */
  private handleStreamingOutput(chunk: string, provider: ProviderName): void {
    if (process.env.DEBUG === 'true') {
      console.error('[DEBUG] Raw chunk:', chunk);
    }

    if (provider === 'gemini') {
      // Format Gemini text output with line breaks
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      if (formatted) {
        StreamFormatter.displayGeminiText(formatted);
      }
    } else if (provider === 'claude') {
      // Parse streaming JSON and output text content
      const lines = chunk.split('\n').filter(line => line.trim().length > 0);
      for (const line of lines) {
        try {
          const message = JSON.parse(line) as Record<string, unknown>;
          StreamFormatter.formatClaudeMessage(message);
        } catch (e) {
          // Log parse errors in debug mode
          if (process.env.DEBUG === 'true') {
            console.error('[DEBUG] Parse error:', e, 'Line:', line);
          }
        }
      }
    }
  }
}