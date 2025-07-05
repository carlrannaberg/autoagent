/**
 * Context for reflection operations
 */
export interface ReflectionContext {
  specPath: string;
  originalContent: string;
  currentContent: string;
  iteration: number;
  improvements: Array<{
    iteration: number;
    score: number;
    changes: string[];
  }>;
  scores: number[];
}