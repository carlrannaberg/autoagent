/**
 * Session data structure for tracking AutoAgent executions.
 */
export interface Session {
  /** Unique session identifier */
  id: string;
  /** Start timestamp of the session */
  startTime: number;
  /** End timestamp of the session (null if still running) */
  endTime: number | null;
  /** Current status of the session */
  status: 'active' | 'completed' | 'failed';
  /** Issue number being executed */
  issueNumber?: number;
  /** Provider used for execution */
  provider?: string;
  /** Working directory for the session */
  workspace: string;
  /** Files modified during the session */
  filesModified?: string[];
  /** Error message if session failed */
  error?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}