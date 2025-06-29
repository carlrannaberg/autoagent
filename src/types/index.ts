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
  provider?: 'claude' | 'gemini';
  /** List of files modified during execution */
  filesChanged?: string[];
  /** Data needed for potential rollback */
  rollbackData?: RollbackData;
}

/**
 * Data needed to rollback changes made during execution.
 */
export interface RollbackData {
  /** Git commit hash before changes were made */
  gitCommit?: string;
  /** Map of file paths to their original contents */
  fileBackups?: Map<string, string>;
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
  provider?: 'claude' | 'gemini';
  /** Working directory for the agent */
  workspace?: string;
  /** Whether to automatically commit changes */
  autoCommit?: boolean;
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
  /** Whether to automatically commit changes */
  gitAutoCommit: boolean;
  /** Interval for git auto-commits (ms) */
  gitCommitInterval: number;
  /** Logging level */
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  /** Custom instructions for providers */
  customInstructions: string;
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
export type ProviderName = 'claude' | 'gemini';

/**
 * Rate limit tracking data for a provider
 */
export interface RateLimitData {
  /** Timestamp when provider was rate limited */
  limitedAt?: number;
  /** Number of rate limit attempts */
  attempts?: number;
}