export interface ValidationIssue {
  file: string;
  line?: number;
  column?: number;
  severity: 'error' | 'warning';
  message: string;
  rule: string;
  suggestion?: string;
  canAutofix?: boolean;
  isFormatting?: boolean;
}

export class ValidationError extends Error {
  constructor(
    public readonly issues: ValidationIssue[],
    message?: string
  ) {
    super(message ?? `Validation failed with ${issues.length} issue(s)`);
    this.name = 'ValidationError';
  }

  formatIssues(): string {
    return this.issues
      .map(issue => {
        const location = issue.line !== undefined
          ? `${issue.file}:${issue.line}${issue.column !== undefined ? `:${issue.column}` : ''}`
          : issue.file;
        
        const formatted = `${issue.severity.toUpperCase()}: ${location}\n  ${issue.message}`;
        
        if (issue.suggestion !== undefined && issue.suggestion !== '') {
          return `${formatted}\n  Suggestion: ${issue.suggestion}`;
        }
        
        return formatted;
      })
      .join('\n\n');
  }

  hasErrors(): boolean {
    return this.issues.some(issue => issue.severity === 'error');
  }

  getFormattingIssues(): ValidationIssue[] {
    return this.issues.filter(issue => issue.isFormatting === true && issue.canAutofix === true);
  }

  getContentIssues(): ValidationIssue[] {
    return this.issues.filter(issue => issue.isFormatting !== true);
  }
}