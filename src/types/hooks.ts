/**
 * Lifecycle hook points in the AutoAgent execution flow.
 * 
 * - PreExecutionStart: Before AI provider starts processing an issue
 * - PostExecutionStart: After AI provider has started but before any code changes
 * - PreExecutionEnd: Before execution completes (after all changes made)
 * - PostExecutionEnd: After execution completes successfully
 * - Stop: When execution is stopped or interrupted
 */
export type HookPoint =
  | 'PreExecutionStart'
  | 'PostExecutionStart'
  | 'PreExecutionEnd'
  | 'PostExecutionEnd'
  | 'Stop';

/**
 * Data passed to hooks via stdin as JSON.
 * Command hooks receive this data and can use it to make decisions.
 * Additional fields may be added based on the specific hook point.
 */
export interface HookData {
  /** Name of the lifecycle event (matches HookPoint) */
  eventName: string;
  /** Unique session identifier */
  sessionId: string;
  /** Working directory path */
  workspace: string;
  /** Unix timestamp in milliseconds */
  timestamp: number;
  /** Additional event-specific data (e.g., issueNumber, filesModified) */
  [key: string]: unknown;
}

/**
 * Result from hook execution.
 * For command hooks, this is derived from the JSON output and exit code.
 * Exit code 0 = success, 2 = blocked (Pre hooks only), other = error.
 */
export interface HookResult {
  /** Whether the hook blocked execution (Pre hooks with exit code 2) */
  blocked: boolean;
  /** Reason for blocking (if blocked) - from JSON output */
  reason?: string;
  /** Output from the hook (stdout for debugging) */
  output?: string;
}

/**
 * Result from executing a command.
 * Used internally by HookManager to track command execution results.
 */
export interface CommandResult {
  /** Exit code from the command (0 = success, 2 = blocked, other = error) */
  exitCode: number;
  /** Standard output */
  stdout: string;
  /** Standard error */
  stderr: string;
  /** Whether the command timed out */
  timedOut?: boolean;
}

import { Hook } from './index.js';

/**
 * Interface for built-in hook handlers.
 * Implement this interface to add new built-in hook types.
 */
export interface BuiltinHookHandler {
  /**
   * Execute the built-in hook with the given configuration.
   * @param data - Hook event data
   * @param config - Hook configuration
   * @returns Promise resolving to hook result
   */
  execute(data: HookData, config: Hook): Promise<HookResult>;
}

/**
 * Template variable names that can be interpolated in commands and messages.
 * Variables are replaced with their actual values at runtime using {{variable}} syntax.
 * 
 * Available variables:
 * - issueNumber: Current issue number being processed
 * - issueTitle: Title of the current issue
 * - issueFile: Path to the issue file
 * - planFile: Path to the plan file
 * - sessionId: Unique session identifier
 * - workspace: Working directory path
 * - provider: AI provider used (claude/gemini)
 * - success: Whether execution succeeded (true/false)
 * - duration: Execution duration in milliseconds
 * - filesModified: Comma-separated list of modified files
 */
export type TemplateVariable = 
  | 'issueNumber'
  | 'issueTitle'
  | 'issueFile'
  | 'planFile'
  | 'sessionId'
  | 'workspace'
  | 'provider'
  | 'success'
  | 'duration'
  | 'filesModified';