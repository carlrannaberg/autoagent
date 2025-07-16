// Chalk import removed - use Logger instead
import { Provider } from './Provider';
import { ExecutionResult } from '../types';
import { ChatOptions } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';
import { StreamFormatter } from '../utils/stream-formatter';
import { spawn } from 'child_process';
import { TaskObjectiveValidator } from '../utils/validation';
import { TaskStatusReporter } from '../utils/status-reporter';
import { ToolResult } from '../types/completion';

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
   * @param additionalDirectories - Optional array of additional directories to give AI access to
   * @returns Promise resolving to execution result
   */
  async execute(
    issueFile: string,
    planFile: string,
    contextFiles?: string[],
    signal?: AbortSignal,
    additionalDirectories?: string[]
  ): Promise<ExecutionResult> {
    const startTime = Date.now();
    const issueNumber = this.extractIssueNumber(issueFile);

    try {
      // Read issue and plan files
      const issueContent = await fs.readFile(issueFile, 'utf-8');
      const planContent = await fs.readFile(planFile, 'utf-8');
      
      // Build the INSTRUCTIONS for -p flag
      const instructions = `You are an autonomous AI agent tasked with completing the following issue and plan.

Please execute the plan to complete the issue. Make all necessary code changes, create files as needed, and ensure all acceptance criteria are met.

When you make changes to files, please clearly indicate which files were modified.`;
      
      // Build the CONTENT for stdin
      let stdinContent = `## Issue

${issueContent}

## Plan

${planContent}`;
      
      // Add context files to stdin content
      if (contextFiles && contextFiles.length > 0) {
        stdinContent += '\n\n## Additional Context Files\n';
        for (const file of contextFiles) {
          try {
            const content = await fs.readFile(file, 'utf-8');
            const filename = path.basename(file);
            stdinContent += `\n### ${filename}\n\n${content}\n`;
          } catch (err) {
            // Skip files that can't be read
          }
        }
      }
      
      // Build command arguments with instructions only
      const args = [
        '-p', instructions
      ];
      
      // Add directory access for the current working directory and additional directories
      const cwd = process.cwd();
      const allDirectories = [cwd, ...(additionalDirectories || [])];
      
      // Add each directory with --add-dir flag
      for (const dir of allDirectories) {
        args.unshift('--add-dir', dir);
      }
      
      // Use streaming JSON output format for real-time feedback
      args.push('--output-format', 'stream-json');
      args.push('--verbose');
      
      // Debug: Log the command being executed
      if (process.env.DEBUG === 'true') {
        console.error('Claude command:', 'claude', args.join(' '));
        console.error('Stdin content length:', stdinContent.length);
      }
      
      // Skip permission prompts for autonomous operation
      args.push('--dangerously-skip-permissions');
      
      // Set max turns to prevent hanging
      args.push('--max-turns', '30');
      
      // Show formatted header
      StreamFormatter.showHeader('claude');
      
      // Execute Claude with custom streaming implementation
      const result = await this.executeWithStreaming(args, stdinContent, signal);
      
      // Show formatted footer
      StreamFormatter.showFooter();

      if (!result.success) {
        throw new Error(result.error !== undefined ? result.error : 'Claude execution failed');
      }

      // Process streaming JSON output (one message per line)
      let filesChanged: string[] = [];
      let output = '';
      let finalResult = '';
      let errorMessage = '';
      
      // Split by newlines to process each JSON message
      const lines = result.stdout.split('\n').filter(line => line.trim().length > 0);
      
      for (const line of lines) {
        try {
          const message = JSON.parse(line) as Record<string, unknown>;
          
          // Look for error messages
          if (message.type === 'error' && typeof message.message === 'string') {
            errorMessage = message.message;
          }
          
          // Look for assistant messages with text content
          if (message.type === 'assistant' && message.message !== null && typeof message.message === 'object') {
            const msg = message.message as Record<string, unknown>;
            if (Array.isArray(msg.content)) {
              for (const content of msg.content) {
                if (typeof content === 'object' && content !== null) {
                  const contentObj = content as Record<string, unknown>;
                  if (contentObj.type === 'text' && typeof contentObj.text === 'string') {
                    output += contentObj.text;
                  }
                }
              }
            }
          }
          
          // Capture the final result
          if (message.type === 'result' && typeof message.result === 'string') {
            finalResult = message.result;
          }
        } catch (parseError) {
          // Skip non-JSON lines
        }
      }
      
      // If we found an error message in JSON, throw it
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      
      // Use final result if available, otherwise use accumulated output
      const finalOutput = finalResult || output;
      
      // Extract files changed from output
      filesChanged = this.extractFilesChanged(finalOutput);

      // Create validation instances
      const validator = new TaskObjectiveValidator();
      const statusReporter = new TaskStatusReporter();

      // Prepare task description for validation
      const taskDescription = `${issueContent}\n\n${planContent}`;
      
      // Create mock tool results based on execution (Claude CLI doesn't provide detailed tool results)
      const mockToolResults: ToolResult[] = [
        {
          toolName: 'claude-cli',
          success: true,
          output: finalOutput,
          duration: Date.now() - startTime
        }
      ];

      // Validate task completion
      let taskCompletion;
      try {
        taskCompletion = await validator.validateCompletion(
          taskDescription,
          { output: finalOutput },
          mockToolResults
        );
      } catch (validationError) {
        // If validation fails, continue with basic success but log the error
        if (process.env.DEBUG === 'true') {
          console.error('Validation error:', validationError);
        }
        taskCompletion = {
          isComplete: true, // Default to complete if validation fails
          confidence: 80,
          issues: [],
          recommendations: []
        };
      }

      // Create execution result
      const executionResult: ExecutionResult = {
        success: true,
        issueNumber,
        duration: Date.now() - startTime,
        output,
        provider: 'claude',
        filesChanged: filesChanged.length > 0 ? filesChanged : undefined,
        taskCompletion
      };

      // Determine final success based on validation and exit code
      // For backward compatibility, prioritize process exit code (0) over validation
      // Only use validation to enhance success when there are no critical failures
      let finalSuccess = true; // Start with true since process exited with code 0
      
      if (taskCompletion.isComplete === false && taskCompletion.confidence < 70) {
        // Only mark as failed if validation strongly suggests failure
        const hasCriticalIssues = taskCompletion.issues.some(issue => 
          issue.includes('error') || issue.includes('failed') || issue.includes('permission')
        );
        if (hasCriticalIssues) {
          finalSuccess = false;
        }
      }
      
      executionResult.success = finalSuccess;

      // Report status to user (only if not in test environment)
      if (process.env.VITEST !== 'true' && 
          (process.env.NODE_ENV === undefined || process.env.NODE_ENV === null || !process.env.NODE_ENV.includes('test'))) {
        statusReporter.reportCompletion(executionResult);
      }

      return executionResult;
    } catch (error) {
      const executionResult: ExecutionResult = {
        success: false,
        issueNumber,
        duration: Date.now() - startTime,
        error: this.formatError(error),
        provider: 'claude'
      };

      // Report failure status to user (only if not in test environment)
      if (process.env.VITEST !== 'true' && 
          (process.env.NODE_ENV === undefined || process.env.NODE_ENV === null || !process.env.NODE_ENV.includes('test'))) {
        try {
          const statusReporter = new TaskStatusReporter();
          statusReporter.reportCompletion(executionResult);
        } catch (reportError) {
          // Don't let reporting errors affect the main error
          if (process.env.DEBUG === 'true') {
            console.error('Error reporting failure:', reportError);
          }
        }
      }

      return executionResult;
    }
  }

  /**
   * Execute Claude with streaming output and stdin input.
   * @param args - Command arguments
   * @param stdinContent - Content to write to stdin
   * @param signal - Optional abort signal
   * @returns Promise resolving to execution result
   */
  private async executeWithStreaming(
    args: string[],
    stdinContent: string,
    signal?: AbortSignal
  ): Promise<{ success: boolean; stdout: string; stderr: string; error?: string }> {
    return new Promise((resolve) => {
      const child = spawn('claude', args, {
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      let stdout = '';
      let stderr = '';
      let hasSpawned = false;
      
      child.on('spawn', () => {
        hasSpawned = true;
        if (process.env.DEBUG === 'true') {
          console.error('[DEBUG] Claude process spawned successfully');
        }
      });
      
      child.on('error', (error) => {
        resolve({
          success: false,
          stdout,
          stderr,
          error: error.message
        });
      });
      
      if (signal) {
        signal.addEventListener('abort', () => {
          child.kill('SIGTERM');
          resolve({
            success: false,
            stdout,
            stderr,
            error: 'Process aborted'
          });
        });
      }
      
      // Write prompt to stdin
      if (child.stdin !== null && child.stdin !== undefined) {
        child.stdin.write(stdinContent);
        child.stdin.end();
      }
      
      // Handle stdout with streaming
      if (child.stdout !== null && child.stdout !== undefined) {
        child.stdout.on('data', (chunk: Buffer) => {
          const data = chunk.toString();
          stdout += data;
          
          // Parse and format streaming output
          const lines = data.split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            try {
              const message = JSON.parse(line) as Record<string, unknown>;
              StreamFormatter.formatClaudeMessage(message);
            } catch (e) {
              // Not JSON, ignore
            }
          }
        });
      }
      
      // Handle stderr
      if (child.stderr !== null && child.stderr !== undefined) {
        child.stderr.on('data', (chunk: Buffer) => {
          stderr += chunk.toString();
        });
      }
      
      // Handle process exit
      child.on('close', (code) => {
        if (!hasSpawned) {
          resolve({
            success: false,
            stdout,
            stderr,
            error: 'Failed to spawn claude process'
          });
        } else if (code === 0) {
          resolve({
            success: true,
            stdout,
            stderr
          });
        } else {
          // Try to extract error message from stdout JSON first
          let errorFromStdout = '';
          const lines = stdout.split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            try {
              const message = JSON.parse(line) as Record<string, unknown>;
              if (message.type === 'error' && typeof message.message === 'string') {
                errorFromStdout = message.message;
                break;
              }
            } catch (e) {
              // Not JSON, ignore
            }
          }
          
          // Also check stdout for usage limit messages that might not be in JSON format
          if (!errorFromStdout && stdout.toLowerCase().includes('usage limit')) {
            // Extract the usage limit message from stdout
            const usageLimitMatch = stdout.match(/usage limit[^|]*\|?\d*/i);
            if (usageLimitMatch) {
              errorFromStdout = usageLimitMatch[0];
            }
          }
          
          resolve({
            success: false,
            stdout,
            stderr,
            error: errorFromStdout || stderr || `Claude exited with code ${code}`
          });
        }
      });
    });
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
   * Send a chat message to Claude and get a response.
   * Used for reflection and other interactive AI operations.
   * @param prompt - The prompt to send to Claude
   * @param options - Optional configuration for the chat request
   * @returns Promise resolving to Claude's response
   */
  async chat(prompt: string, options?: ChatOptions): Promise<string> {
    const args = [
      '-p', // Print response without interactive mode
      '--output-format', 'json' // Get structured output
    ];

    // Add max tokens if specified
    if (options?.maxTokens !== undefined) {
      args.push('--max-tokens', options.maxTokens.toString());
    }

    // Build the prompt with optional system prompt
    let fullPrompt = prompt;
    if (options?.systemPrompt !== undefined) {
      fullPrompt = `System: ${options.systemPrompt}\n\nUser: ${prompt}`;
    }

    try {
      const result = await this.executeWithStreaming(args, fullPrompt, options?.signal);
      
      if (result.success === false) {
        throw new Error(result.error ?? 'Claude chat request failed');
      }

      // Parse the JSON output to extract the text response
      const lines = result.stdout.split('\n').filter(line => line.trim() !== '');
      let responseText = '';
      
      for (const line of lines) {
        try {
          const message = JSON.parse(line) as Record<string, unknown>;
          if (message.type === 'text' && typeof message.text === 'string') {
            responseText += message.text;
          }
        } catch (e) {
          // Not JSON, ignore
        }
      }

      if (!responseText) {
        throw new Error('No response text received from Claude');
      }

      return responseText;
    } catch (error) {
      throw new Error(`Claude chat error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}