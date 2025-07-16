/**
 * Task completion validation types for AutoAgent.
 * These interfaces support robust validation of task completion beyond simple exit codes.
 */

/**
 * Interface for validating whether a task has been successfully completed.
 * Analyzes task objectives, execution output, and tool results to determine completion status.
 */
export interface TaskCompletionValidator {
  /**
   * Validates whether the original task has been completed successfully.
   * @param originalTask - The original task description or prompt
   * @param execution - The execution result from the provider
   * @param toolResults - Array of results from individual tool operations
   * @returns Promise resolving to completion validation result
   */
  validateCompletion(
    originalTask: string,
    execution: any, // Using any to avoid circular dependency with ExecutionResult
    toolResults: ToolResult[]
  ): Promise<CompletionValidationResult>;
}

/**
 * Result of task completion validation.
 * Provides detailed information about completion status and any issues found.
 */
export interface CompletionValidationResult {
  /** Whether the task is considered complete */
  isComplete: boolean;
  /** Confidence level in the completion assessment (0-100) */
  confidence: number;
  /** List of issues or problems detected during validation */
  issues: string[];
  /** Recommendations for resolving issues or completing the task */
  recommendations: string[];
}

/**
 * Information about a tool operation failure.
 * Used to track and report failures in individual tool operations during task execution.
 */
export interface ToolFailure {
  /** Type of failure (e.g., 'tool_error', 'permission_denied', 'file_not_found') */
  type: string;
  /** Regular expression pattern that matched the failure */
  pattern: string;
  /** Actual error message from the tool */
  message: string;
  /** Severity of the failure ('error', 'warning', 'info') */
  severity: 'error' | 'warning' | 'info';
  /** Optional tool name that failed */
  toolName?: string;
  /** Optional timestamp when the failure occurred */
  timestamp?: Date;
}

/**
 * Result of validating task objectives.
 * Analyzes whether the original task objectives have been met.
 */
export interface ObjectiveValidationResult {
  /** Whether the task objective is complete */
  isComplete: boolean;
  /** Confidence level in the assessment (0-100) */
  confidence: number;
  /** List of issues preventing completion */
  issues: string[];
  /** Recommendations for achieving the objective */
  recommendations: string[];
  /** Whether all completion criteria were met */
  allCriteriaMet?: boolean;
  /** List of unmet criteria */
  unmetCriteria?: string[];
}

/**
 * Detailed error report for task execution failures.
 * Provides comprehensive information about what went wrong and how to fix it.
 */
export interface DetailedErrorReport {
  /** Overall status of the task */
  taskStatus: 'completed' | 'partial' | 'failed';
  /** List of tool failures encountered */
  toolFailures: ToolFailure[];
  /** Recommendations for resolving issues */
  recommendations: string[];
  /** Whether the task can be retried */
  retryable: boolean;
  /** Confidence level in the status assessment (0-100) */
  confidence: number;
  /** Optional error code for categorization */
  errorCode?: string;
  /** Optional stack trace or detailed error information */
  details?: string;
}

/**
 * Result from an individual tool operation.
 * Used by the TaskCompletionValidator to assess tool success.
 */
export interface ToolResult {
  /** Name of the tool that was executed */
  toolName: string;
  /** Whether the tool operation succeeded */
  success: boolean;
  /** Output from the tool */
  output?: string;
  /** Error message if the tool failed */
  error?: string;
  /** Execution time in milliseconds */
  duration?: number;
}