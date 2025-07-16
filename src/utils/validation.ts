/**
 * Tool failure detection and validation utilities for AutoAgent.
 * Provides robust detection of tool operation failures to improve task completion accuracy.
 */

import { ToolFailure } from '../types/completion.js';

/**
 * Detects and analyzes tool failures from execution output.
 * Implements pattern-based detection for common failure scenarios.
 */
export class ToolFailureDetector {
  /**
   * Common failure patterns that indicate tool operation failures.
   * These patterns are designed to catch various error conditions across different tools.
   */
  private static readonly FAILURE_PATTERNS: RegExp[] = [
    // Generic error patterns
    /Error:/i,
    /Failed to/i,
    /Cannot find/i,
    /Permission denied/i,
    /File not found/i,
    
    // File system errors
    /ENOENT/,
    /EACCES/,
    /EISDIR/,
    /ENOTDIR/,
    /EMFILE/,
    /ENFILE/,
    
    // Node.js/npm specific errors
    /npm ERR!/,
    /npm error/i,
    /SyntaxError:/,
    /TypeError:/,
    /ReferenceError:/,
    /RangeError:/,
    
    // Tool-specific patterns
    /Found \d+ matches.*but replace_all is false/,
    /No such file or directory/i,
    /Command not found/i,
    /is not recognized as an internal or external command/i,
    
    // Git errors
    /fatal:/i,
    /error: pathspec/i,
    /not a git repository/i,
    /merge conflict/i,
    
    // TypeScript/Build errors
    /TS\d{4}:/,  // TypeScript error codes (e.g., TS2339)
    /Build failed/i,
    /Compilation failed/i,
    /Type error:/i,
    
    // Test failures
    /Test failed/i,
    /FAIL/,
    /✗/,  // Common test failure symbol
    /expected .* to be .* but got/i,
    /AssertionError:/,
    
    // Network/API errors
    /ECONNREFUSED/,
    /ETIMEDOUT/,
    /ENOTFOUND/,
    /Rate limit exceeded/i,
    /Unauthorized/i,
    /Forbidden/i,
    /404 Not Found/i,
    
    // Memory/Resource errors
    /Out of memory/i,
    /JavaScript heap out of memory/,
    /Maximum call stack size exceeded/i,
    
    // Process errors
    /Process exited with code \d+/,
    /Command failed with exit code \d+/,
    /killed/i,
    /terminated/i
  ];

  /**
   * Analyzes tool output to detect failures using pattern matching.
   * @param output - The combined stdout and stderr output from tool execution
   * @param toolName - Optional name of the tool that generated the output
   * @returns Array of detected tool failures
   */
  static analyzeToolOutput(output: string, toolName?: string): ToolFailure[] {
    const failures: ToolFailure[] = [];
    const lines = output.split('\n');
    
    // Check each line against failure patterns
    for (const line of lines) {
      for (const pattern of this.FAILURE_PATTERNS) {
        const matches = line.match(pattern);
        if (matches) {
          // Extract the full error message (current line + context)
          const errorMessage = this.extractErrorMessage(lines, lines.indexOf(line));
          
          // Check if we already have this failure (avoid duplicates)
          const isDuplicate = failures.some(f => 
            f.message === errorMessage && f.pattern === pattern.toString()
          );
          
          if (!isDuplicate) {
            failures.push({
              type: this.categorizeFailure(matches[0], pattern),
              pattern: pattern.toString(),
              message: errorMessage,
              severity: this.determineSeverity(errorMessage, pattern),
              toolName,
              timestamp: new Date()
            });
          }
        }
      }
    }
    
    return failures;
  }

  /**
   * Determines the severity of a failure based on the error message and pattern.
   * @param message - The error message
   * @param pattern - The pattern that matched
   * @returns Severity level: 'error', 'warning', or 'info'
   */
  static determineSeverity(message: string, pattern: RegExp): 'error' | 'warning' | 'info' {
    // Critical errors that prevent task completion
    const criticalPatterns = [
      /fatal:/i,
      /npm ERR!/,
      /ENOENT/,
      /Permission denied/i,
      /Command not found/i,
      /is not recognized as an internal or external command/i,
      /SyntaxError:/,
      /TypeError:/,
      /ReferenceError:/,
      /JavaScript heap out of memory/,
      /Process exited with code [1-9]\d*/,
      /Command failed with exit code [1-9]\d*/,
      /Build failed/i,
      /Compilation failed/i,
      /TS\d{4}:/,
      /not a git repository/i,
      /merge conflict/i
    ];
    
    // Warning patterns that might not block completion
    const warningPatterns = [
      /warning:/i,
      /deprecated/i,
      /Found \d+ matches.*but replace_all is false/,
      /Test failed/i,
      /FAIL/,
      /expected .* to be .* but got/i
    ];
    
    // Info patterns that are mostly informational
    const infoPatterns = [
      /info:/i,
      /notice:/i,
      /hint:/i,
      /tip:/i
    ];
    
    // Check against critical patterns first
    for (const criticalPattern of criticalPatterns) {
      if (pattern.toString() === criticalPattern.toString() || message.match(criticalPattern)) {
        return 'error';
      }
    }
    
    // Check against warning patterns
    for (const warningPattern of warningPatterns) {
      if (pattern.toString() === warningPattern.toString() || message.match(warningPattern)) {
        return 'warning';
      }
    }
    
    // Check against info patterns
    for (const infoPattern of infoPatterns) {
      if (pattern.toString() === infoPattern.toString() || message.match(infoPattern)) {
        return 'info';
      }
    }
    
    // Default to error for unknown patterns
    return 'error';
  }

  /**
   * Categorizes the type of failure based on the error pattern and message.
   * @param errorMatch - The matched error text
   * @param pattern - The pattern that matched
   * @returns Categorized failure type
   */
  private static categorizeFailure(errorMatch: string, pattern: RegExp): string {
    // File system errors
    if (pattern.toString().match(/ENOENT|File not found|No such file/i)) {
      return 'file_not_found';
    }
    if (pattern.toString().match(/EACCES|Permission denied/i)) {
      return 'permission_denied';
    }
    if (pattern.toString().match(/EISDIR|ENOTDIR/)) {
      return 'file_system_error';
    }
    
    // Tool errors
    if (errorMatch.match(/Command not found|is not recognized/i)) {
      return 'command_not_found';
    }
    if (errorMatch.match(/Found \d+ matches.*but replace_all is false/)) {
      return 'tool_error';
    }
    
    // Build/compilation errors
    if (pattern.toString().match(/TS\\d\{4\}:|Build failed|Compilation failed/i) || 
        errorMatch.match(/TS\d{4}:/)) {
      return 'build_error';
    }
    
    // Test errors
    if (pattern.toString().match(/Test failed|FAIL|AssertionError/i)) {
      return 'test_failure';
    }
    
    // Git errors
    if (pattern.toString().match(/fatal:|not a git repository|merge conflict/i)) {
      return 'git_error';
    }
    
    // Network errors
    if (pattern.toString().match(/ECONNREFUSED|ETIMEDOUT|ENOTFOUND/)) {
      return 'network_error';
    }
    
    // Process errors
    if (pattern.toString().match(/Process exited|Command failed|killed|terminated/i)) {
      return 'process_error';
    }
    
    // Resource errors
    if (pattern.toString().match(/Out of memory|heap out of memory|call stack/i)) {
      return 'resource_error';
    }
    
    // Default
    return 'generic_error';
  }

  /**
   * Extracts a complete error message with context from surrounding lines.
   * @param lines - All output lines
   * @param errorLineIndex - Index of the line containing the error
   * @returns Complete error message with context
   */
  private static extractErrorMessage(
    lines: string[], 
    errorLineIndex: number
  ): string {
    // Start with the matched line (safe access with fallback)
    const errorLine = lines[errorLineIndex];
    if (errorLine === undefined || errorLine === null) {
      return '';
    }
    
    let message = errorLine.trim();
    
    // Look for multi-line error messages (common in stack traces)
    const contextLines: string[] = [message];
    
    // Check previous lines for context (up to 2 lines)
    for (let i = 1; i <= 2 && errorLineIndex - i >= 0; i++) {
      const prevLine = lines[errorLineIndex - i];
      if (prevLine !== undefined && prevLine !== null) {
        const trimmedPrevLine = prevLine.trim();
        if (trimmedPrevLine.length > 0 && !this.isUnrelatedLine(trimmedPrevLine)) {
          contextLines.unshift(trimmedPrevLine);
        }
      }
    }
    
    // Check following lines for context (up to 5 lines for stack traces)
    for (let i = 1; i <= 5 && errorLineIndex + i < lines.length; i++) {
      const nextLine = lines[errorLineIndex + i];
      if (nextLine !== undefined && nextLine !== null) {
        const trimmedNextLine = nextLine.trim();
        if (trimmedNextLine.length > 0 && this.isErrorContinuation(trimmedNextLine)) {
          contextLines.push(trimmedNextLine);
        } else if (this.isEndOfError(trimmedNextLine)) {
          break;
        }
      }
    }
    
    // Join context lines
    message = contextLines.join('\n');
    
    // Truncate very long messages
    if (message.length > 500) {
      message = message.substring(0, 497) + '...';
    }
    
    return message;
  }

  /**
   * Checks if a line is likely part of an error continuation.
   * @param line - The line to check
   * @returns True if the line appears to be part of an error message
   */
  private static isErrorContinuation(line: string): boolean {
    // Common patterns for error continuations
    return line.match(/^\s*at\s+/i) !== null ||  // Stack trace
           line.match(/^\s*↳/i) !== null ||       // Error pointer
           line.match(/^\s*\^/i) !== null ||      // Error pointer
           line.match(/^\s*\|/i) !== null ||      // Error context
           line.match(/^\s*>/i) !== null ||       // Error context
           line.match(/^\s*\d+\s*\|/i) !== null;  // Line numbers
  }

  /**
   * Checks if a line indicates the end of an error message.
   * @param line - The line to check
   * @returns True if the line appears to end an error block
   */
  private static isEndOfError(line: string): boolean {
    // Patterns that typically indicate we've moved past the error
    return line === '' ||
           line.match(/^✓|^✅|^Success|^OK/i) !== null ||
           line.match(/^\$ |^> |^❯/i) !== null;  // New command prompt
  }

  /**
   * Checks if a line is unrelated to the error context.
   * @param line - The line to check
   * @returns True if the line should not be included in error context
   */
  private static isUnrelatedLine(line: string): boolean {
    // Lines that are typically not part of error context
    return line.match(/^npm timing/i) !== null ||
           line.match(/^npm notice/i) !== null ||
           line.match(/^npm verb/i) !== null ||
           line.length === 0;
  }
}

/**
 * Helper type for severity levels.
 * Re-exported for convenience.
 */
export type FailureSeverity = 'error' | 'warning' | 'info';

/**
 * Helper function to check if any failures are critical (severity = 'error').
 * @param failures - Array of tool failures
 * @returns True if any failure has 'error' severity
 */
export function hasCriticalFailures(failures: ToolFailure[]): boolean {
  return failures.some(f => f.severity === 'error');
}

/**
 * Helper function to group failures by type.
 * @param failures - Array of tool failures
 * @returns Map of failure type to array of failures
 */
export function groupFailuresByType(failures: ToolFailure[]): Map<string, ToolFailure[]> {
  const grouped = new Map<string, ToolFailure[]>();
  
  for (const failure of failures) {
    const existing = grouped.get(failure.type) || [];
    existing.push(failure);
    grouped.set(failure.type, existing);
  }
  
  return grouped;
}

/**
 * Helper function to format failures for user display.
 * @param failures - Array of tool failures
 * @returns Formatted string for console output
 */
export function formatFailuresForDisplay(failures: ToolFailure[]): string {
  if (failures.length === 0) {
    return 'No failures detected';
  }
  
  const grouped = groupFailuresByType(failures);
  const lines: string[] = [];
  
  for (const [type, typeFailures] of grouped) {
    lines.push(`\n${type.replace(/_/g, ' ').toUpperCase()}:`);
    
    for (const failure of typeFailures) {
      const icon = failure.severity === 'error' ? '❌' : 
                   failure.severity === 'warning' ? '⚠️' : 'ℹ️';
      
      lines.push(`  ${icon} ${failure.message}`);
      
      if (failure.toolName !== undefined && failure.toolName !== null && failure.toolName.length > 0) {
        lines.push(`     Tool: ${failure.toolName}`);
      }
    }
  }
  
  return lines.join('\n');
}