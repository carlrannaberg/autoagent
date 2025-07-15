/**
 * Session status values.
 * 
 * - active: Session is currently running
 * - completed: Session finished successfully
 * - failed: Session terminated with an error
 */
export type SessionStatus = 'active' | 'completed' | 'failed';

/**
 * Session data structure for tracking AutoAgent executions.
 * Sessions provide a complete audit trail of agent activities, including
 * issue progress, file modifications, and execution metadata.
 */
export interface Session {
  /** Unique session identifier (UUID format recommended) */
  id: string;
  /** Start timestamp of the session (Unix timestamp in milliseconds) */
  startTime: number;
  /** End timestamp of the session (null if still running) */
  endTime: number | null;
  /** Current status of the session */
  status: SessionStatus;
  /** Issue number being executed */
  issueNumber?: number;
  /** Issue title for display purposes */
  issueTitle?: string;
  /** Provider used for execution (claude/gemini) */
  provider?: string;
  /** Working directory for the session */
  workspace: string;
  /** Files modified during the session (full paths) */
  filesModified?: string[];
  /** Issues created during the session */
  issuesCreated?: number[];
  /** Issues completed during the session */
  issuesCompleted?: number[];
  /** Issues that failed during the session */
  issuesFailed?: number[];
  /** Error message if session failed */
  error?: string;
  /** Additional metadata (e.g., hook execution results, environment info) */
  metadata?: Record<string, unknown>;
}