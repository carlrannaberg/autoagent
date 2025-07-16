import { 
  ToolFailure, 
  FailureType, 
  TaskCompletionValidator,
  CompletionValidationResult,
  ToolResult
} from '../types/completion.js';

/**
 * Detects and analyzes tool failures from command output
 */
export class ToolFailureDetector {
  /**
   * Static array of regex patterns for detecting common failures
   */
  static readonly FAILURE_PATTERNS: Array<{
    pattern: RegExp;
    type: FailureType;
    severity: 'error' | 'warning' | 'info';
  }> = [
    // Generic error patterns
    { pattern: /^Error:/i, type: 'generic_error', severity: 'error' },
    { pattern: /\bFailed to\b/i, type: 'generic_error', severity: 'error' },
    { pattern: /\bCannot find\b/i, type: 'file_not_found', severity: 'error' },
    { pattern: /\bNo such file or directory\b/i, type: 'file_not_found', severity: 'error' },
    { pattern: /\bPermission denied\b/i, type: 'permission_denied', severity: 'error' },
    { pattern: /\bAccess denied\b/i, type: 'permission_denied', severity: 'error' },
    { pattern: /\bcommand not found\b/i, type: 'command_not_found', severity: 'error' },
    { pattern: /\bcannot execute\b/i, type: 'permission_denied', severity: 'error' },
    { pattern: /\bOperation not permitted\b/i, type: 'permission_denied', severity: 'error' },
    
    // File system errors
    { pattern: /\bENOENT\b/, type: 'file_not_found', severity: 'error' },
    { pattern: /\bEACCES\b/, type: 'permission_denied', severity: 'error' },
    { pattern: /\bEEXIST\b/, type: 'file_already_exists', severity: 'error' },
    { pattern: /\bENOTDIR\b/, type: 'not_a_directory', severity: 'error' },
    { pattern: /\bEISDIR\b/, type: 'is_a_directory', severity: 'error' },
    
    // Node.js/npm specific errors
    { pattern: /^npm ERR!/i, type: 'npm_error', severity: 'error' },
    { pattern: /\bSyntaxError:/i, type: 'syntax_error', severity: 'error' },
    { pattern: /\bTypeError:/i, type: 'type_error', severity: 'error' },
    { pattern: /\bReferenceError:/i, type: 'reference_error', severity: 'error' },
    { pattern: /\bmodule not found\b/i, type: 'module_not_found', severity: 'error' },
    { pattern: /\bCannot resolve\b/i, type: 'module_not_found', severity: 'error' },
    
    // Git errors
    { pattern: /^fatal:/i, type: 'git_error', severity: 'error' },
    { pattern: /\bMerge conflict\b/i, type: 'git_merge_conflict', severity: 'error' },
    { pattern: /\bCONFLICT\b/, type: 'git_merge_conflict', severity: 'error' },
    { pattern: /\bnot a git repository\b/i, type: 'git_error', severity: 'error' },
    
    // Build/compilation errors
    { pattern: /\bTS\d{4}:/i, type: 'typescript_error', severity: 'error' },
    { pattern: /\bCompilation failed\b/i, type: 'build_error', severity: 'error' },
    { pattern: /\bBuild failed\b/i, type: 'build_error', severity: 'error' },
    { pattern: /\berror TS\d+:/i, type: 'typescript_error', severity: 'error' },
    
    // Test failures
    { pattern: /\bFAIL\b.*\.(test|spec)\.(ts|js)/i, type: 'test_failure', severity: 'warning' },
    { pattern: /\bAssertionError:/i, type: 'test_failure', severity: 'warning' },
    { pattern: /\bExpected .* Received\b/i, type: 'test_failure', severity: 'warning' },
    { pattern: /\b\d+ failing\b/i, type: 'test_failure', severity: 'warning' },
    
    // Network/API errors
    { pattern: /\bECONNREFUSED\b/, type: 'network_error', severity: 'error' },
    { pattern: /\bETIMEDOUT\b/, type: 'network_error', severity: 'error' },
    { pattern: /\bECONNRESET\b/, type: 'network_error', severity: 'error' },
    { pattern: /\b(401|403|404|500|502|503)\s+(Unauthorized|Forbidden|Not Found|Internal Server Error|Bad Gateway|Service Unavailable)\b/i, type: 'api_error', severity: 'error' },
    
    // Memory/Resource errors
    { pattern: /\bOut of memory\b/i, type: 'resource_error', severity: 'error' },
    { pattern: /\bJavaScript heap out of memory\b/i, type: 'resource_error', severity: 'error' },
    { pattern: /\bMaximum call stack size exceeded\b/i, type: 'resource_error', severity: 'error' },
    
    // Process errors
    { pattern: /\bExit code: (?!0)\d+\b/i, type: 'process_error', severity: 'error' },
    { pattern: /\bProcess terminated\b/i, type: 'process_error', severity: 'error' },
    { pattern: /\bKilled\b/, type: 'process_error', severity: 'error' },
    
    // Tool-specific patterns
    { pattern: /\bMultiEdit failed\b/i, type: 'tool_error', severity: 'error' },
    { pattern: /\bEdit failed\b/i, type: 'tool_error', severity: 'error' },
    { pattern: /\bOld string not found\b/i, type: 'string_not_found', severity: 'error' },
    { pattern: /\bNo changes made\b/i, type: 'no_changes', severity: 'info' },
    
    // Warning patterns
    { pattern: /\bWARNING:/i, type: 'warning', severity: 'warning' },
    { pattern: /\bDeprecated\b/i, type: 'deprecation', severity: 'warning' },
    { pattern: /\bWARN\b/i, type: 'warning', severity: 'warning' },
    
    // Info patterns
    { pattern: /\bHINT:/i, type: 'hint', severity: 'info' },
    { pattern: /\bTIP:/i, type: 'tip', severity: 'info' },
    { pattern: /\bNOTE:/i, type: 'note', severity: 'info' }
  ];

  /**
   * Analyzes tool output to detect failures
   * @param output - The output string from a tool execution
   * @returns Array of detected failures with context
   */
  analyzeToolOutput(output: string): ToolFailure[] {
    const failures: ToolFailure[] = [];
    const lines = output.split('\n');
    const processedLines = new Set<number>();

    for (let i = 0; i < lines.length; i++) {
      if (processedLines.has(i)) {
        continue;
      }
      
      const line = lines[i];
      if (line === undefined || line === null || line === '') {
        continue; // Skip undefined/null/empty lines
      }
      
      // Find the most specific pattern that matches
      let bestMatch: { pattern: RegExp; type: FailureType; severity: 'error' | 'warning' | 'info' } | null = null;
      let bestSpecificity = -1;
      
      for (const patternInfo of ToolFailureDetector.FAILURE_PATTERNS) {
        if (patternInfo.pattern.test(line)) {
          // Calculate specificity based on pattern type
          const specificity = this.getPatternSpecificity(patternInfo.type);
          if (specificity > bestSpecificity) {
            bestMatch = patternInfo;
            bestSpecificity = specificity;
          }
        }
      }
      
      if (bestMatch) {
        const failure: ToolFailure = {
          pattern: bestMatch.pattern.source,
          type: bestMatch.type,
          message: line.trim(),
          severity: this.determineSeverity(bestMatch.type, line),
          lineNumber: i + 1,
          context: this.extractContext(lines, i)
        };
        
        // Mark lines as processed to avoid duplicates
        const contextLines = this.getContextLineNumbers(lines, i);
        contextLines.forEach(lineNum => processedLines.add(lineNum));
        
        // Check if we already have a similar failure
        const isDuplicate = failures.some(f => 
          f.type === failure.type && 
          f.message === failure.message
        );
        
        if (!isDuplicate) {
          failures.push(failure);
        }
      }
    }

    return failures;
  }

  /**
   * Calculates pattern specificity for prioritizing matches
   * More specific patterns get higher scores
   * @param type - The failure type
   * @returns Specificity score
   */
  private getPatternSpecificity(type: FailureType): number {
    // Specific error types have higher priority than generic ones
    const specificityMap: Record<FailureType, number> = {
      // Most specific errors (file system, code errors)
      'file_not_found': 90,
      'permission_denied': 90,
      'command_not_found': 90,
      'syntax_error': 90,
      'type_error': 90,
      'reference_error': 90,
      'module_not_found': 90,
      'git_error': 85,
      'git_merge_conflict': 95,
      'typescript_error': 90,
      'build_error': 85,
      'test_failure': 80,
      'network_error': 85,
      'api_error': 85,
      'resource_error': 85,
      'process_error': 80,
      'tool_error': 85,
      'string_not_found': 90,
      'npm_error': 85,
      'file_already_exists': 90,
      'not_a_directory': 90,
      'is_a_directory': 90,
      
      // Less specific patterns
      'generic_error': 10,
      'warning': 50,  // Higher than deprecation to match WARNING: prefix first
      'deprecation': 40,
      'no_changes': 20,
      'hint': 20,
      'tip': 20,
      'note': 20
    };
    
    return specificityMap[type] || 50;
  }

  /**
   * Determines the severity of a failure based on its type and content
   * @param type - The failure type
   * @param message - The failure message
   * @returns The severity level
   */
  determineSeverity(type: FailureType, message: string): 'error' | 'warning' | 'info' {
    // Check patterns for explicit severity
    for (const { pattern, severity } of ToolFailureDetector.FAILURE_PATTERNS) {
      if (pattern.test(message)) {
        return severity;
      }
    }

    // Fallback based on type
    const errorTypes: FailureType[] = [
      'generic_error', 'file_not_found', 'permission_denied', 'command_not_found',
      'syntax_error', 'type_error', 'reference_error', 'module_not_found',
      'git_error', 'git_merge_conflict', 'typescript_error', 'build_error',
      'network_error', 'api_error', 'resource_error', 'process_error',
      'tool_error', 'string_not_found', 'npm_error', 'file_already_exists',
      'not_a_directory', 'is_a_directory'
    ];

    const warningTypes: FailureType[] = [
      'test_failure', 'warning', 'deprecation'
    ];

    const infoTypes: FailureType[] = [
      'no_changes', 'hint', 'tip', 'note'
    ];

    if (errorTypes.includes(type)) {
      return 'error';
    }
    if (warningTypes.includes(type)) {
      return 'warning';
    }
    if (infoTypes.includes(type)) {
      return 'info';
    }

    // Default to warning for unknown types
    return 'warning';
  }

  /**
   * Extracts context around a failure (e.g., stack traces, related errors)
   * @param lines - All output lines
   * @param failureIndex - Index of the line containing the failure
   * @returns Contextual lines around the failure
   */
  private extractContext(lines: string[], failureIndex: number): string[] {
    const context: string[] = [];
    const maxContextLines = 10;
    
    // Include the failure line itself
    const failureLine = lines[failureIndex];
    if (failureLine !== undefined && failureLine !== '') {
      context.push(failureLine);
    }
    
    // Look for stack traces or continued error messages
    let i = failureIndex + 1;
    let indentLevel = 0;
    
    while (i < lines.length && context.length < maxContextLines) {
      const line = lines[i];
      if (line === undefined || line === null) {
        i++;
        continue;
      }
      
      // Stop if we hit another error pattern
      const isNewError = ToolFailureDetector.FAILURE_PATTERNS.some(({ pattern }) => 
        pattern.test(line)
      );
      if (isNewError) {
        break;
      }
      
      // Include lines that appear to be part of the error
      if (line.trim() === '') {
        // Empty line might separate errors
        if (indentLevel > 0) {
          break;
        }
      } else if (line.startsWith('  ') || line.startsWith('\t')) {
        // Indented lines are likely part of the error
        context.push(line);
        indentLevel++;
      } else if (line.match(/^\s*at\s+/)) {
        // Stack trace lines
        context.push(line);
      } else if (line.match(/^\s*\^+\s*$/)) {
        // Error position indicators
        context.push(line);
      } else if (indentLevel > 0) {
        // If we were in an indented section, stop at non-indented line
        break;
      }
      
      i++;
    }
    
    return context;
  }

  /**
   * Gets the line numbers that are part of a failure's context
   * @param lines - All output lines
   * @param failureIndex - Index of the line containing the failure
   * @returns Array of line numbers that are part of this failure
   */
  private getContextLineNumbers(lines: string[], failureIndex: number): number[] {
    const numbers = [failureIndex];
    const context = this.extractContext(lines, failureIndex);
    
    // Find the line numbers for all context lines
    for (let i = 1; i < context.length; i++) {
      numbers.push(failureIndex + i);
    }
    
    return numbers;
  }
}

/**
 * Helper function to check if any failures are critical (error severity)
 * @param failures - Array of tool failures
 * @returns True if any failures have error severity
 */
export function hasCriticalFailures(failures: ToolFailure[]): boolean {
  return failures.some(f => f.severity === 'error');
}

/**
 * Helper function to group failures by type
 * @param failures - Array of tool failures
 * @returns Map of failure types to failures
 */
export function groupFailuresByType(failures: ToolFailure[]): Map<FailureType, ToolFailure[]> {
  const grouped = new Map<FailureType, ToolFailure[]>();
  
  for (const failure of failures) {
    const existing = grouped.get(failure.type) || [];
    existing.push(failure);
    grouped.set(failure.type, existing);
  }
  
  return grouped;
}

/**
 * Helper function to format failures for display
 * @param failures - Array of tool failures
 * @returns Formatted string for console output
 */
export function formatFailuresForDisplay(failures: ToolFailure[]): string {
  if (failures.length === 0) {
    return 'No failures detected';
  }
  
  const lines: string[] = [`Detected ${failures.length} failure(s):\n`];
  
  for (const failure of failures) {
    const icon = failure.severity === 'error' ? '❌' : 
                 failure.severity === 'warning' ? '⚠️' : 'ℹ️';
    
    const lineInfo = failure.lineNumber !== undefined && failure.lineNumber > 0 ? ` (line ${failure.lineNumber})` : '';
    lines.push(`${icon} ${failure.type}${lineInfo}: ${failure.message}`);
    
    if (failure.context && failure.context.length > 1) {
      lines.push('  Context:');
      failure.context.slice(1).forEach((line: string) => {
        lines.push(`    ${line}`);
      });
    }
    
    lines.push(''); // Empty line between failures
  }
  
  return lines.join('\n');
}

/**
 * Validates whether a task has been successfully completed by analyzing
 * task objectives, execution output, and tool results.
 */
export class TaskObjectiveValidator implements TaskCompletionValidator {
  private toolFailureDetector: ToolFailureDetector;

  constructor() {
    this.toolFailureDetector = new ToolFailureDetector();
  }

  /**
   * Validates whether the original task has been completed successfully.
   * @param originalTask - The original task description or prompt
   * @param execution - The execution result from the provider
   * @param toolResults - Array of results from individual tool operations
   * @returns Promise resolving to completion validation result
   */
  validateCompletion(
    originalTask: string,
    execution: { output?: string } | null,
    toolResults: ToolResult[]
  ): Promise<CompletionValidationResult> {
    // Extract task keywords and objectives
    const taskObjectives = this.extractTaskObjectives(originalTask);
    
    // Analyze execution output for failures
    const executionOutput = execution?.output ?? '';
    const toolFailures = this.toolFailureDetector.analyzeToolOutput(executionOutput);
    
    // Check for critical tool failures
    const hasCriticalErrors = hasCriticalFailures(toolFailures);
    
    // Analyze tool results for failures
    const failedTools = toolResults.filter(tool => !tool.success);
    
    // Look for positive completion indicators
    const completionIndicators = this.findCompletionIndicators(executionOutput, taskObjectives);
    
    // Calculate completion confidence score
    const confidence = this.calculateConfidence(
      taskObjectives,
      completionIndicators,
      toolFailures,
      failedTools
    );
    
    // Determine if task is complete
    const isComplete = !hasCriticalErrors && 
                       failedTools.length === 0 && 
                       confidence >= 70;
    
    // Generate issues and recommendations
    const issues = this.generateIssues(toolFailures, failedTools, taskObjectives, completionIndicators);
    const recommendations = this.generateRecommendations(
      toolFailures, 
      failedTools, 
      taskObjectives, 
      completionIndicators,
      executionOutput
    );
    
    return Promise.resolve({
      isComplete,
      confidence,
      issues,
      recommendations
    });
  }

  /**
   * Extracts key objectives and keywords from the task description
   * @param taskDescription - The original task description
   * @returns Object containing keywords and action verbs
   */
  private extractTaskObjectives(taskDescription: string): TaskObjectives {
    // Common action verbs in programming tasks
    const actionVerbs = [
      'create', 'implement', 'add', 'update', 'fix', 'refactor',
      'test', 'validate', 'build', 'deploy', 'configure', 'install',
      'remove', 'delete', 'optimize', 'debug', 'analyze', 'write',
      'generate', 'extract', 'move', 'rename', 'convert', 'migrate'
    ];
    
    // Extract action verbs from task
    const foundActions = actionVerbs.filter(verb => 
      new RegExp(`\\b${verb}\\b`, 'i').test(taskDescription)
    );
    
    // Extract file/class/function names (CamelCase or snake_case)
    const namePattern = /\b[A-Z][a-zA-Z0-9]*(?:[A-Z][a-zA-Z0-9]*)*\b|\b[a-z_]+(?:_[a-z]+)*\b/g;
    const potentialNames = taskDescription.match(namePattern) || [];
    
    // Extract file paths
    const pathPattern = /(?:src\/|test\/|\.\/|\/)?[\w\-./]+\.\w+/g;
    const filePaths = taskDescription.match(pathPattern) || [];
    
    // Extract quoted strings as important targets
    const quotedPattern = /["']([^"']+)["']/g;
    const quotedStrings: string[] = [];
    let match;
    while ((match = quotedPattern.exec(taskDescription)) !== null) {
      if (match[1] !== undefined && match[1] !== '') {
        quotedStrings.push(match[1]);
      }
    }
    
    return {
      actions: foundActions,
      targets: [...new Set([...potentialNames, ...filePaths, ...quotedStrings])],
      keywords: this.extractKeywords(taskDescription)
    };
  }

  /**
   * Extracts important keywords from the task description
   * @param text - The text to extract keywords from
   * @returns Array of keywords
   */
  private extractKeywords(text: string): string[] {
    // Remove common words and extract meaningful terms
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'that', 'this', 'it', 'as', 'are', 'is',
      'was', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
      'should', 'could', 'may', 'might', 'must', 'can', 'need', 'want'
    ]);
    
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));
    
    // Count word frequency
    const wordFreq = new Map<string, number>();
    words.forEach(word => {
      wordFreq.set(word, (wordFreq.get(word) ?? 0) + 1);
    });
    
    // Return top keywords by frequency
    return Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }

  /**
   * Finds indicators of task completion in the execution output
   * @param output - The execution output
   * @param objectives - The task objectives
   * @returns Completion indicators found
   */
  private findCompletionIndicators(
    output: string, 
    objectives: TaskObjectives
  ): CompletionIndicators {
    const indicators: CompletionIndicators = {
      successMessages: [],
      createdFiles: [],
      modifiedFiles: [],
      testsPass: false,
      buildSuccess: false,
      targetsMentioned: []
    };
    
    const lines = output.split('\n');
    
    // Look for success patterns
    const successPatterns = [
      /successfully created/i,
      /successfully updated/i,
      /successfully added/i,
      /successfully implemented/i,
      /completed successfully/i,
      /task completed/i,
      /all tests pass/i,
      /build successful/i,
      /\d+ passing/i,
      /File written successfully/i,
      /Changes saved/i,
      /Committed \w+ files?/i
    ];
    
    lines.forEach(line => {
      // Check success patterns
      successPatterns.forEach(pattern => {
        if (pattern.test(line)) {
          indicators.successMessages.push(line.trim());
        }
      });
      
      // Check for file operations
      if (/(?:created?|wrote|generated?)\s+(?:file\s+)?([^\s]+\.\w+)/i.test(line)) {
        const match = line.match(/(?:created?|wrote|generated?)\s+(?:file\s+)?([^\s]+\.\w+)/i);
        if (match?.[1] !== undefined && match[1] !== '') {
          indicators.createdFiles.push(match[1]);
        }
      }
      
      if (/(?:modified|updated|changed|edited)\s+(?:file\s+)?([^\s]+\.\w+)/i.test(line)) {
        const match = line.match(/(?:modified|updated|changed|edited)\s+(?:file\s+)?([^\s]+\.\w+)/i);
        if (match?.[1] !== undefined && match[1] !== '') {
          indicators.modifiedFiles.push(match[1]);
        }
      }
      
      // Check if tests passed
      if (/all tests pass|tests? passed?|✓ \d+ tests?/i.test(line) && !/fail/i.test(line)) {
        indicators.testsPass = true;
      }
      
      // Check if build succeeded
      if (/build successful|compilation successful|built successfully/i.test(line)) {
        indicators.buildSuccess = true;
      }
      
      // Check if task targets are mentioned
      objectives.targets.forEach(target => {
        if (line.includes(target)) {
          indicators.targetsMentioned.push(target);
        }
      });
    });
    
    // Deduplicate arrays
    indicators.targetsMentioned = [...new Set(indicators.targetsMentioned)];
    indicators.createdFiles = [...new Set(indicators.createdFiles)];
    indicators.modifiedFiles = [...new Set(indicators.modifiedFiles)];
    
    return indicators;
  }

  /**
   * Calculates a confidence score for task completion
   * @param objectives - The task objectives
   * @param indicators - Completion indicators found
   * @param toolFailures - Tool failures detected
   * @param failedTools - Failed tool results
   * @returns Confidence score (0-100)
   */
  private calculateConfidence(
    objectives: TaskObjectives,
    indicators: CompletionIndicators,
    toolFailures: ToolFailure[],
    failedTools: ToolResult[]
  ): number {
    let score = 50; // Base score
    
    // Positive indicators
    if (indicators.successMessages.length > 0) {
      score += Math.min(20, indicators.successMessages.length * 5);
    }
    
    if (indicators.testsPass) {
      score += 15;
    }
    
    if (indicators.buildSuccess) {
      score += 10;
    }
    
    // Check if task targets were addressed
    const targetCoverage = objectives.targets.length > 0
      ? (indicators.targetsMentioned.length / objectives.targets.length) * 20
      : 10;
    score += targetCoverage;
    
    // File operations matching task actions
    const hasFileOperations = indicators.createdFiles.length > 0 || 
                              indicators.modifiedFiles.length > 0;
    if (hasFileOperations && 
        objectives.actions.some(action => ['create', 'add', 'update', 'fix', 'implement'].includes(action))) {
      score += 10;
    }
    
    // Negative indicators
    const criticalFailures = toolFailures.filter(f => f.severity === 'error');
    score -= Math.min(40, criticalFailures.length * 10);
    
    score -= Math.min(30, failedTools.length * 10);
    
    // Ensure score is within bounds
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Generates a list of issues preventing task completion
   * @param toolFailures - Tool failures detected
   * @param failedTools - Failed tool results
   * @param objectives - Task objectives
   * @param indicators - Completion indicators
   * @returns Array of issue descriptions
   */
  private generateIssues(
    toolFailures: ToolFailure[],
    failedTools: ToolResult[],
    objectives: TaskObjectives,
    indicators: CompletionIndicators
  ): string[] {
    const issues: string[] = [];
    
    // Add critical tool failures
    const criticalFailures = toolFailures.filter(f => f.severity === 'error');
    criticalFailures.forEach(failure => {
      issues.push(`${failure.type}: ${failure.message}`);
    });
    
    // Add failed tool operations
    failedTools.forEach(tool => {
      issues.push(`Tool '${tool.toolName}' failed: ${tool.error ?? 'Unknown error'}`);
    });
    
    // Check if objectives were not met
    if (objectives.targets.length > 0 && indicators.targetsMentioned.length === 0) {
      issues.push('None of the specified targets were found in the execution output');
    }
    
    // Check for specific action requirements
    if (objectives.actions.includes('test') && !indicators.testsPass && 
        !indicators.successMessages.some(msg => /test/i.test(msg))) {
      issues.push('Tests were not executed or did not pass');
    }
    
    if (objectives.actions.includes('build') && !indicators.buildSuccess &&
        !indicators.successMessages.some(msg => /build/i.test(msg))) {
      issues.push('Build was not executed or did not succeed');
    }
    
    return issues;
  }

  /**
   * Generates recommendations for completing the task
   * @param toolFailures - Tool failures detected
   * @param failedTools - Failed tool results
   * @param objectives - Task objectives
   * @param indicators - Completion indicators
   * @param output - Full execution output
   * @returns Array of recommendations
   */
  private generateRecommendations(
    toolFailures: ToolFailure[],
    failedTools: ToolResult[],
    objectives: TaskObjectives,
    indicators: CompletionIndicators,
    _output: string
  ): string[] {
    const recommendations: string[] = [];
    
    // Group failures by type for better recommendations
    const failureGroups = groupFailuresByType(toolFailures);
    
    // File not found errors
    if (failureGroups.has('file_not_found')) {
      recommendations.push('Verify that all required files exist and paths are correct');
      const fileNotFoundFailures = failureGroups.get('file_not_found');
      const missingFiles = fileNotFoundFailures
        ? fileNotFoundFailures.map(f => f.message.match(/['"](.*?)['"]/)?.[1])
            .filter((file): file is string => file !== undefined && file !== '')
        : [];
      if (missingFiles.length > 0) {
        recommendations.push(`Create missing files: ${[...new Set(missingFiles)].join(', ')}`);
      }
    }
    
    // Permission errors
    if (failureGroups.has('permission_denied')) {
      recommendations.push('Check file permissions and ensure write access to the target directories');
    }
    
    // Module/dependency errors
    if (failureGroups.has('module_not_found') || failureGroups.has('npm_error')) {
      recommendations.push('Run "npm install" to install missing dependencies');
      recommendations.push('Verify that all required packages are listed in package.json');
    }
    
    // TypeScript errors
    if (failureGroups.has('typescript_error')) {
      recommendations.push('Fix TypeScript compilation errors before proceeding');
      recommendations.push('Run "npm run typecheck" to see detailed error messages');
    }
    
    // Test failures
    if (failureGroups.has('test_failure') || 
        (objectives.actions.includes('test') && !indicators.testsPass)) {
      recommendations.push('Fix failing tests or update test expectations');
      recommendations.push('Run tests locally to debug failures');
    }
    
    // Build errors
    if (failureGroups.has('build_error') ||
        (objectives.actions.includes('build') && !indicators.buildSuccess)) {
      recommendations.push('Resolve build errors before completing the task');
      recommendations.push('Check build configuration and dependencies');
    }
    
    // Git errors
    if (failureGroups.has('git_error')) {
      recommendations.push('Ensure you are in a git repository with proper configuration');
      recommendations.push('Check git status and resolve any conflicts');
    }
    
    // Tool-specific errors
    if (failureGroups.has('string_not_found')) {
      recommendations.push('Verify that the text to be replaced exists exactly as specified');
      recommendations.push('Check for whitespace and formatting differences');
    }
    
    // General recommendations based on objectives
    if (objectives.actions.includes('create') && indicators.createdFiles.length === 0) {
      recommendations.push('Ensure that new files are being created as required');
    }
    
    if (objectives.actions.includes('update') && indicators.modifiedFiles.length === 0) {
      recommendations.push('Verify that existing files are being modified as expected');
    }
    
    // If no specific issues but low confidence
    const criticalFailures = toolFailures.filter(f => f.severity === 'error');
    if (recommendations.length === 0 && failedTools.length === 0 && criticalFailures.length === 0) {
      recommendations.push('Review the task requirements to ensure all objectives are met');
      recommendations.push('Add validation or tests to confirm the implementation works correctly');
    }
    
    return [...new Set(recommendations)]; // Remove duplicates
  }
}

/**
 * Interface for task objectives extracted from the task description
 */
interface TaskObjectives {
  actions: string[];
  targets: string[];
  keywords: string[];
}

/**
 * Interface for completion indicators found in output
 */
interface CompletionIndicators {
  successMessages: string[];
  createdFiles: string[];
  modifiedFiles: string[];
  testsPass: boolean;
  buildSuccess: boolean;
  targetsMentioned: string[];
}