import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TaskStatusReporter } from '../../src/utils/status-reporter';
import { ExecutionResult } from '../../src/types';
import chalk from 'chalk';

describe('TaskStatusReporter', () => {
  let reporter: TaskStatusReporter;
  let consoleSpy: {
    log: any;
    error: any;
  };

  beforeEach(() => {
    reporter = new TaskStatusReporter();
    vi.clearAllMocks();
    // Disable colors in tests for consistent assertions
    chalk.level = 0;
    
    // Set up console spies
    consoleSpy = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {})
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('reportCompletion', () => {
    it('should report full success when task is completed successfully', () => {
      const result: ExecutionResult = {
        success: true,
        issueNumber: 42,
        issueTitle: 'Fix validation logic',
        duration: 5432,
        filesChanged: ['src/validation.ts', 'test/validation.test.ts'],
        taskCompletion: {
          isComplete: true,
          confidence: 95,
          issues: [],
          recommendations: []
        }
      };

      reporter.reportCompletion(result);

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('✅ Successfully completed issue #42: Fix validation logic')
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('Modified 2 files')
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('Duration: 5.4s')
      );
    });

    it('should report partial completion when confidence is moderate', () => {
      const result: ExecutionResult = {
        success: true,
        issueNumber: 15,
        duration: 3000,
        taskCompletion: {
          isComplete: false,
          confidence: 55,
          issues: ['Tests not updated', 'Documentation missing'],
          recommendations: ['Update unit tests', 'Add JSDoc comments']
        }
      };

      reporter.reportCompletion(result);

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('⚠️  Partially completed issue #15')
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('Task appears incomplete (55% confidence)')
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('Tests not updated')
      );
    });

    it('should report failure when task fails', () => {
      const result: ExecutionResult = {
        success: false,
        issueNumber: 99,
        issueTitle: 'Implement new feature',
        duration: 1500,
        error: 'TypeScript compilation failed with 5 errors'
      };

      reporter.reportCompletion(result);

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('❌ Failed to complete issue #99: Implement new feature')
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('Error: TypeScript compilation failed with 5 errors')
      );
    });

    it('should report tool failures when present', () => {
      const result: ExecutionResult = {
        success: true,
        issueNumber: 7,
        duration: 2000,
        toolFailures: [
          {
            type: 'typescript_error',
            pattern: 'TS\\d+',
            message: "Cannot find module 'nonexistent'",
            severity: 'error',
            toolName: 'TypeScript'
          },
          {
            type: 'warning',
            pattern: 'warning',
            message: 'Unused variable',
            severity: 'warning',
            toolName: 'ESLint'
          }
        ]
      };

      reporter.reportCompletion(result);

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('🔧 Tool Issues:')
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('1 error encountered')
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('1 warning encountered')
      );
    });

    it('should show recommendations when available', () => {
      const result: ExecutionResult = {
        success: true,
        issueNumber: 23,
        duration: 4000,
        taskCompletion: {
          isComplete: false,
          confidence: 60,
          issues: ['Some tests failing'],
          recommendations: [
            'Fix failing unit tests',
            'Update test data',
            'Review error handling',
            'Add integration tests',
            'Update documentation'
          ]
        }
      };

      reporter.reportCompletion(result);

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('💡 Recommendations:')
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('Fix failing unit tests')
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('... and 2 more suggestions')
      );
    });
  });

  describe('formatDetailedReport', () => {
    it('should format a comprehensive report', () => {
      const result: ExecutionResult = {
        success: false,
        issueNumber: 10,
        issueTitle: 'Refactor authentication',
        duration: 120500,
        provider: 'claude',
        filesChanged: ['src/auth.ts', 'src/middleware/auth.ts'],
        error: 'Failed to complete refactoring due to circular dependency issues',
        taskCompletion: {
          isComplete: false,
          confidence: 25,
          issues: ['Circular dependencies detected', 'Tests failing'],
          recommendations: ['Resolve circular dependencies first', 'Update import structure']
        },
        toolFailures: [
          {
            type: 'typescript_error',
            pattern: 'TS\\d+',
            message: 'Circular dependency detected',
            severity: 'error',
            toolName: 'TypeScript'
          }
        ]
      };

      const report = reporter.formatDetailedReport(result);

      expect(report).toContain('📋 Detailed Execution Report');
      expect(report).toContain('Issue: #10 - Refactor authentication');
      expect(report).toContain('Duration: 2m 0s');
      expect(report).toContain('Provider: claude');
      expect(report).toContain('Status:');
      expect(report).toContain('Files Changed:');
      expect(report).toContain('src/auth.ts');
      expect(report).toContain('Task Completion Analysis:');
      expect(report).toContain('Completion:');
      expect(report).toContain('Confidence: 25%');
      expect(report).toContain('Circular dependencies detected');
      expect(report).toContain('Tool Failures:');
      expect(report).toContain('TypeScript: Circular dependency detected');
      expect(report).toContain('Error Details:');
      expect(report).toContain('Failed to complete refactoring');
    });

    it('should handle successful execution with output preview', () => {
      const longOutput = 'Task completed successfully. '.repeat(20);
      const result: ExecutionResult = {
        success: true,
        issueNumber: 5,
        duration: 1500,
        output: longOutput
      };

      const report = reporter.formatDetailedReport(result);

      expect(report).toContain('Status:');
      expect(report).toContain('completed');
      expect(report).toContain('Output Preview:');
      expect(report).toContain('Task completed successfully.');
      expect(report).toContain('...');
    });

    it('should format duration correctly', () => {
      const result1: ExecutionResult = {
        success: true,
        issueNumber: 1,
        duration: 500
      };

      const result2: ExecutionResult = {
        success: true,
        issueNumber: 2,
        duration: 45000
      };

      const result3: ExecutionResult = {
        success: true,
        issueNumber: 3,
        duration: 185000
      };

      const report1 = reporter.formatDetailedReport(result1);
      const report2 = reporter.formatDetailedReport(result2);
      const report3 = reporter.formatDetailedReport(result3);

      expect(report1).toContain('Duration: 500ms');
      expect(report2).toContain('Duration: 45.0s');
      expect(report3).toContain('Duration: 3m 5s');
    });
  });
});