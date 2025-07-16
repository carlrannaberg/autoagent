export * from './hooks.js';
export * from './session.js';
export * from './completion.js';

import { HookData, HookResult } from './hooks.js';
import { CompletionValidationResult, ToolFailure } from './completion.js';

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
 * Configuration for hooks at each lifecycle point.
 * Maps hook points to arrays of hooks that should execute at that point.
 * Hooks are executed in the order they appear in the array.
 */
export interface HookConfig {
  [key: string]: Hook[];
}

/**
 * Individual hook configuration supporting different hook types.
 * 
 * Hook types:
 * - command: Execute an external command with JSON input/output
 * - git-commit: Perform a git commit with configurable options
 * - git-push: Push changes to a remote repository
 */
export interface Hook {
  /** Type of hook - command or built-in */
  type: 'command' | 'git-commit' | 'git-push';
  /** Command to execute (required for command type) */
  command?: string;
  /** Timeout in milliseconds (default: 60000) */
  timeout?: number;
  /** Whether the hook can block execution (Pre hooks only, exit code 2 blocks) */
  blocking?: boolean;
  /** Commit message template (git-commit) - supports template variables */
  message?: string;
  /** Skip git pre-commit hooks (git-commit) */
  noVerify?: boolean;
  /** Remote repository (git-push, default: 'origin') */
  remote?: string;
  /** Branch to push (git-push, default: current branch) */
  branch?: string;
}

/**
 * Core data structure for tracking issues in the autonomous agent system.
 */
export interface Issue {
  /** Unique issue number */
  number: number;
  /** Descriptive title of the issue */
  title: string;
  /** File path where the issue details are stored */
  file: string;
  /** Description of what needs to be done */
  requirements: string;
  /** List of criteria that must be met for issue completion */
  acceptanceCriteria: string[];
  /** Additional technical implementation details */
  technicalDetails?: string;
  /** References to documentation or external resources */
  resources?: string[];
}

/**
 * Implementation plan for resolving an issue.
 */
export interface Plan {
  /** Reference to the associated issue number */
  issueNumber: number;
  /** File path where the plan is stored */
  file: string;
  /** List of implementation phases */
  phases: Phase[];
  /** Description of the technical approach */
  technicalApproach?: string;
  /** Potential challenges and considerations */
  challenges?: string[];
}

/**
 * A phase within an implementation plan.
 */
export interface Phase {
  /** Name or title of the phase */
  name: string;
  /** List of tasks to complete in this phase */
  tasks: string[];
}

/**
 * Result of executing an autonomous agent task.
 */
export interface ExecutionResult {
  /** Whether the execution completed successfully */
  success: boolean;
  /** Issue number that was executed */
  issueNumber: number;
  /** Duration of execution in milliseconds */
  duration: number;
  /** Output from the execution */
  output?: string;
  /** Error message if execution failed */
  error?: string;
  /** Provider used for execution */
  provider?: ProviderName;
  /** List of files modified during execution */
  filesChanged?: string[];
  /** Data needed for potential rollback */
  rollbackData?: RollbackData;
  /** Title of the issue for display purposes */
  issueTitle?: string;
  /** List of files that were modified (full paths) */
  filesModified?: string[];
  /** Task completion validation result */
  taskCompletion?: CompletionValidationResult;
  /** List of tool failures encountered during execution */
  toolFailures?: ToolFailure[];
}

/**
 * Data needed to rollback changes made during execution.
 */
export interface RollbackData {
  /** Git commit hash before changes were made */
  gitCommit?: string;
  /** Map of file paths to their original contents */
  fileBackups?: Map<string, string>;
  /** Information about git push operations performed */
  gitPush?: {
    /** Remote that was pushed to */
    remote: string;
    /** Branch that was pushed */
    branch: string;
    /** Commit hash that was pushed */
    commit: string;
  };
}

/**
 * Callback function for reporting progress during execution.
 */
export interface ProgressCallback {
  /**
   * @param message - Progress message to display
   * @param percentage - Optional percentage complete (0-100)
   */
  (message: string, percentage?: number): void;
}

/**
 * Configuration options for the autonomous agent.
 */
export interface AgentConfig {
  /** AI provider to use */
  provider?: ProviderName;
  /** Working directory for the agent */
  workspace?: string;
  /** Include co-authored-by in commit messages */
  includeCoAuthoredBy?: boolean;
  /** Automatically update context files after execution */
  autoUpdateContext?: boolean;
  /** Enable debug logging */
  debug?: boolean;
  /** Preview mode without making actual changes */
  dryRun?: boolean;
  /** Abort signal for cancellation support */
  signal?: AbortSignal;
  /** Progress tracking callback */
  onProgress?: ProgressCallback;
  /** Enable rollback capability */
  enableRollback?: boolean;
  /** Configuration for the reflection engine */
  reflection?: ReflectionConfig;
  /** Additional directories to give AI providers access to */
  additionalDirectories?: string[];
  /** Skip git pre-commit hooks when committing */
  noVerify?: boolean;
  /** Require strict task completion validation */
  strictCompletion?: boolean;
  /** Minimum confidence threshold for completion validation (0-100) */
  completionConfidence?: number;
  /** Mark tasks complete even with tool failures */
  ignoreToolFailures?: boolean;
  /** Maximum retry attempts for failed tasks */
  maxRetryAttempts?: number;
}

/**
 * User configuration stored in config files.
 */
export interface UserConfig {
  /** List of providers in order of preference */
  providers: ProviderName[];
  /** Delay before trying failover provider (ms) */
  failoverDelay: number;
  /** Number of retry attempts for failed operations */
  retryAttempts: number;
  /** Maximum tokens for provider requests */
  maxTokens: number;
  /** Cooldown period for rate-limited providers (ms) */
  rateLimitCooldown: number;
  /** Logging level */
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  /** Custom instructions for providers */
  customInstructions: string;
  /** Include co-authored-by in commit messages */
  includeCoAuthoredBy?: boolean;
  /** Additional directories to give AI providers access to */
  additionalDirectories?: string[];
  /** Hook configuration for lifecycle events */
  hooks?: HookConfig;
  /** Require strict task completion validation */
  strictCompletion?: boolean;
  /** Minimum confidence threshold for completion validation (0-100) */
  completionConfidence?: number;
  /** Mark tasks complete even with tool failures */
  ignoreToolFailures?: boolean;
  /** Maximum retry attempts for failed tasks */
  maxRetryAttempts?: number;
}

/**
 * Events emitted by the autonomous agent.
 */
export type AgentEvent = 
  | 'issue-created'
  | 'execution-start'
  | 'execution-end'
  | 'error';

/**
 * Current status of the autonomous agent system.
 */
export interface Status {
  /** Total number of issues in the system */
  totalIssues: number;
  /** Number of completed issues */
  completedIssues: number;
  /** Number of pending issues */
  pendingIssues: number;
  /** Currently executing issue */
  currentIssue?: Issue;
  /** List of available AI providers */
  availableProviders?: string[];
  /** List of rate-limited providers */
  rateLimitedProviders?: string[];
}

/**
 * Provider name type
 */
export type ProviderName = 'claude' | 'gemini' | 'mock';

/**
 * Rate limit tracking data for a provider
 */
export interface RateLimitData {
  /** Timestamp when provider was rate limited */
  limitedAt?: number;
  /** Number of rate limit attempts */
  attempts?: number;
}

/**
 * Configuration for the reflection engine that iteratively improves decomposition quality.
 */
export interface ReflectionConfig {
  /** Whether reflection is enabled */
  enabled: boolean;
  /** Maximum number of reflection iterations to perform */
  maxIterations: number;
  /** Minimum improvement score (0.0-1.0) required to continue iterations */
  improvementThreshold: number;
  /** Skip reflection for simple specifications (< 500 words) */
  skipForSimpleSpecs: boolean;
}

/**
 * Score indicating how much improvement is needed for the current decomposition.
 * Range: 0.0 (perfect, no improvement needed) to 1.0 (major gaps, significant improvement needed)
 */
export type ImprovementScore = number;

/**
 * Types of changes that can be made during reflection.
 */
export enum ChangeType {
  /** Add a new issue to the decomposition */
  ADD_ISSUE = 'ADD_ISSUE',
  /** Modify an existing issue */
  MODIFY_ISSUE = 'MODIFY_ISSUE',
  /** Add a new plan for an issue */
  ADD_PLAN = 'ADD_PLAN',
  /** Modify an existing plan */
  MODIFY_PLAN = 'MODIFY_PLAN',
  /** Add a dependency between issues */
  ADD_DEPENDENCY = 'ADD_DEPENDENCY'
}

/**
 * A specific improvement change recommended by the reflection engine.
 */
export interface ImprovementChange {
  /** Type of change to make */
  type: ChangeType;
  /** Target issue or plan identifier (e.g., issue number or plan file) */
  target: string;
  /** Description of what to change and why */
  description: string;
  /** Specific content to add or modify */
  content: string;
  /** Rationale for this change */
  rationale: string;
}

/**
 * A gap or missing element identified during reflection analysis.
 */
export interface IdentifiedGap {
  /** Type of gap (e.g., "dependency", "scope", "detail", "testing") */
  type: string;
  /** Description of the gap */
  description: string;
  /** Issues related to this gap */
  relatedIssues: string[];
}

/**
 * Analysis result from the reflection engine containing improvement recommendations.
 */
export interface ImprovementAnalysis {
  /** Overall improvement score (0.0-1.0) */
  score: ImprovementScore;
  /** List of identified gaps or missing elements */
  gaps: IdentifiedGap[];
  /** List of recommended changes to apply */
  changes: ImprovementChange[];
  /** Reasoning explaining the most important changes */
  reasoning: string;
  /** Number of the current reflection iteration */
  iterationNumber: number;
  /** Timestamp of when this analysis was performed */
  timestamp: string;
}

/**
 * Result of applying reflection improvements to a decomposition.
 */
export interface ReflectionResult {
  /** Whether reflection was enabled for this decomposition */
  enabled: boolean;
  /** Number of iterations performed */
  performedIterations: number;
  /** Total number of improvements identified across all iterations */
  totalImprovements: number;
  /** Final improvement score after all iterations */
  finalScore: ImprovementScore;
  /** List of improvement analyses from each iteration */
  improvements?: ImprovementAnalysis[];
  /** Reason why reflection was skipped (if applicable) */
  skippedReason?: string;
}

/**
 * State tracking for the reflection process during decomposition.
 */
export interface ReflectionState {
  /** Current iteration number */
  currentIteration: number;
  /** List of improvement analyses from each iteration */
  improvements: ImprovementAnalysis[];
  /** Current improvement score */
  currentScore: number;
  /** Whether the reflection process is complete */
  isComplete: boolean;
  /** Current issue files being improved */
  currentIssues: string[];
  /** Current plan files being improved */
  currentPlans: string[];
}

// Re-export hook types
export * from './hooks.js';

// Re-export session types
export * from './session.js';