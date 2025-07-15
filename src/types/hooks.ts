/**
 * Lifecycle hook points in the AutoAgent execution flow
 */
export type HookPoint = 
  | 'PreExecutionStart' 
  | 'PostExecutionStart'
  | 'PreExecutionEnd' 
  | 'PostExecutionEnd'
  | 'Stop';

/**
 * Configuration for hooks at each lifecycle point
 */
export interface HookConfig {
  [key: string]: Hook[];
}

/**
 * Individual hook configuration
 */
export interface Hook {
  /** Type of hook - command or built-in */
  type: 'command' | 'git-commit' | 'git-push';
  /** Command to execute (for command type) */
  command?: string;
  /** Timeout in milliseconds (default: 60000) */
  timeout?: number;
  /** Whether the hook can block execution (Pre hooks only) */
  blocking?: boolean;
  /** Commit message template (git-commit) */
  message?: string;
  /** Skip git pre-commit hooks (git-commit) */
  noVerify?: boolean;
  /** Remote repository (git-push) */
  remote?: string;
  /** Branch to push (git-push) */
  branch?: string;
}

/**
 * Data passed to hooks via stdin
 */
export interface HookData {
  /** Name of the lifecycle event */
  eventName: string;
  /** Unique session identifier */
  sessionId: string;
  /** Working directory path */
  workspace: string;
  /** Unix timestamp */
  timestamp: number;
  /** Additional event-specific data */
  [key: string]: unknown;
}

/**
 * Result from hook execution
 */
export interface HookResult {
  /** Whether the hook blocked execution */
  blocked: boolean;
  /** Reason for blocking (if blocked) */
  reason?: string;
  /** Output from the hook */
  output?: string;
}

/**
 * Result from executing a command
 */
export interface CommandResult {
  /** Exit code from the command */
  exitCode: number;
  /** Standard output */
  stdout: string;
  /** Standard error */
  stderr: string;
  /** Whether the command timed out */
  timedOut?: boolean;
}

/**
 * Interface for built-in hook handlers
 */
export interface BuiltinHookHandler {
  execute(data: HookData, config: Hook): Promise<HookResult>;
}

/**
 * Template variable names that can be interpolated
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