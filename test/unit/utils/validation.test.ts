import { describe, it, expect, beforeEach } from 'vitest';
import { ToolFailureDetector, hasCriticalFailures, groupFailuresByType, formatFailuresForDisplay } from '../../../src/utils/validation.js';
import { ToolFailure } from '../../../src/types/completion.js';

describe('ToolFailureDetector', () => {
  describe('analyzeToolOutput', () => {
    it('should detect basic error patterns', () => {
      const output = 'Error: File not found';
      const failures = ToolFailureDetector.analyzeToolOutput(output);
      
      expect(failures).toHaveLength(2); // Matches both "Error:" and "File not found"
      expect(failures[0].type).toBe('generic_error');
      expect(failures[0].severity).toBe('error');
      expect(failures[0].message).toBe('Error: File not found');
    });

    it('should detect tool-specific failures', () => {
      const output = 'Found 2 matches of the string to replace, but replace_all is false';
      const failures = ToolFailureDetector.analyzeToolOutput(output, 'MultiEdit');
      
      expect(failures).toHaveLength(1);
      expect(failures[0].type).toBe('tool_error');
      expect(failures[0].pattern).toContain('Found \\d+ matches.*but replace_all is false');
      expect(failures[0].toolName).toBe('MultiEdit');
    });

    it('should detect TypeScript errors', () => {
      const output = `src/index.ts:10:5 - error TS2339: Property 'foo' does not exist on type 'Bar'.

10     bar.foo();
       ~~~`;
      
      const failures = ToolFailureDetector.analyzeToolOutput(output);
      
      // Should detect the TS error pattern
      const tsError = failures.find(f => f.pattern.includes('TS\\d{4}:'));
      expect(tsError).toBeDefined();
      expect(tsError?.type).toBe('build_error');
      expect(tsError?.severity).toBe('error');
      expect(tsError?.message).toContain('TS2339');
    });

    it('should detect npm errors', () => {
      const output = `npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /path/to/package.json
npm ERR! errno -2`;
      
      const failures = ToolFailureDetector.analyzeToolOutput(output);
      
      expect(failures.some(f => f.message.includes('npm ERR!'))).toBe(true);
      expect(failures.some(f => f.type === 'file_not_found')).toBe(true);
    });

    it('should detect git errors', () => {
      const output = 'fatal: not a git repository (or any of the parent directories): .git';
      const failures = ToolFailureDetector.analyzeToolOutput(output);
      
      expect(failures).toHaveLength(2); // Matches both "fatal:" and "not a git repository"
      expect(failures.some(f => f.type === 'git_error')).toBe(true);
      expect(failures[0].severity).toBe('error');
    });

    it('should detect permission errors', () => {
      const output = 'Error: EACCES: permission denied, open \'/etc/passwd\'';
      const failures = ToolFailureDetector.analyzeToolOutput(output);
      
      expect(failures.some(f => f.type === 'permission_denied')).toBe(true);
      expect(failures.some(f => f.message.includes('EACCES'))).toBe(true);
    });

    it('should extract multi-line error context', () => {
      const output = `TypeError: Cannot read property 'length' of undefined
    at processArray (index.js:10:15)
    at main (index.js:20:5)
    at Object.<anonymous> (index.js:25:1)`;
      
      const failures = ToolFailureDetector.analyzeToolOutput(output);
      
      // The TypeError pattern should be detected
      const typeError = failures.find(f => f.pattern.includes('TypeError:'));
      expect(typeError).toBeDefined();
      expect(typeError?.message).toContain('TypeError:');
      expect(typeError?.message).toContain('at processArray');
      expect(typeError?.message).toContain('at main');
    });

    it('should avoid duplicate failures', () => {
      const output = `Error: File not found
Error: File not found
Error: File not found`;
      
      const failures = ToolFailureDetector.analyzeToolOutput(output);
      
      // Should only have unique failures
      const fileNotFoundErrors = failures.filter(f => 
        f.message === 'Error: File not found' && f.pattern.includes('Error:')
      );
      expect(fileNotFoundErrors).toHaveLength(1);
    });

    it('should handle empty output', () => {
      const failures = ToolFailureDetector.analyzeToolOutput('');
      expect(failures).toHaveLength(0);
    });

    it('should handle output with no errors', () => {
      const output = 'Everything completed successfully!\nAll tests passed.';
      const failures = ToolFailureDetector.analyzeToolOutput(output);
      expect(failures).toHaveLength(0);
    });
  });

  describe('determineSeverity', () => {
    it('should classify critical errors correctly', () => {
      const severity1 = ToolFailureDetector.determineSeverity('fatal: repository not found', /fatal:/i);
      expect(severity1).toBe('error');

      const severity2 = ToolFailureDetector.determineSeverity('npm ERR! missing script', /npm ERR!/);
      expect(severity2).toBe('error');

      const severity3 = ToolFailureDetector.determineSeverity('SyntaxError: unexpected token', /SyntaxError:/);
      expect(severity3).toBe('error');
    });

    it('should classify warnings correctly', () => {
      const severity1 = ToolFailureDetector.determineSeverity('warning: deprecated function', /warning:/i);
      expect(severity1).toBe('warning');

      const severity2 = ToolFailureDetector.determineSeverity('Test failed: expected 5 got 4', /Test failed/i);
      expect(severity2).toBe('warning');
    });

    it('should classify info messages correctly', () => {
      const severity1 = ToolFailureDetector.determineSeverity('info: processing file', /info:/i);
      expect(severity1).toBe('info');

      const severity2 = ToolFailureDetector.determineSeverity('hint: use --force to override', /hint:/i);
      expect(severity2).toBe('info');
    });

    it('should default to error for unknown patterns', () => {
      const severity = ToolFailureDetector.determineSeverity('Something went wrong', /Something went wrong/);
      expect(severity).toBe('error');
    });
  });
});

describe('Helper Functions', () => {
  let sampleFailures: ToolFailure[];

  beforeEach(() => {
    sampleFailures = [
      {
        type: 'file_not_found',
        pattern: '/File not found/',
        message: 'Error: File not found',
        severity: 'error',
        timestamp: new Date()
      },
      {
        type: 'permission_denied',
        pattern: '/Permission denied/',
        message: 'Permission denied: /etc/passwd',
        severity: 'error',
        timestamp: new Date()
      },
      {
        type: 'test_failure',
        pattern: '/Test failed/',
        message: 'Test failed: expected true',
        severity: 'warning',
        toolName: 'Jest',
        timestamp: new Date()
      }
    ];
  });

  describe('hasCriticalFailures', () => {
    it('should return true when there are error severity failures', () => {
      expect(hasCriticalFailures(sampleFailures)).toBe(true);
    });

    it('should return false when only warnings exist', () => {
      const warnings = sampleFailures.filter(f => f.severity === 'warning');
      expect(hasCriticalFailures(warnings)).toBe(false);
    });

    it('should return false for empty array', () => {
      expect(hasCriticalFailures([])).toBe(false);
    });
  });

  describe('groupFailuresByType', () => {
    it('should group failures by type correctly', () => {
      const grouped = groupFailuresByType(sampleFailures);
      
      expect(grouped.size).toBe(3);
      expect(grouped.get('file_not_found')).toHaveLength(1);
      expect(grouped.get('permission_denied')).toHaveLength(1);
      expect(grouped.get('test_failure')).toHaveLength(1);
    });

    it('should handle multiple failures of same type', () => {
      const duplicateFailures = [
        ...sampleFailures,
        {
          type: 'file_not_found',
          pattern: '/ENOENT/',
          message: 'ENOENT: no such file',
          severity: 'error' as const,
          timestamp: new Date()
        }
      ];
      
      const grouped = groupFailuresByType(duplicateFailures);
      expect(grouped.get('file_not_found')).toHaveLength(2);
    });

    it('should handle empty array', () => {
      const grouped = groupFailuresByType([]);
      expect(grouped.size).toBe(0);
    });
  });

  describe('formatFailuresForDisplay', () => {
    it('should format failures for display', () => {
      const formatted = formatFailuresForDisplay(sampleFailures);
      
      expect(formatted).toContain('FILE NOT FOUND:');
      expect(formatted).toContain('PERMISSION DENIED:');
      expect(formatted).toContain('TEST FAILURE:');
      expect(formatted).toContain('❌'); // Error icon
      expect(formatted).toContain('⚠️'); // Warning icon
      expect(formatted).toContain('Tool: Jest');
    });

    it('should handle empty failures', () => {
      const formatted = formatFailuresForDisplay([]);
      expect(formatted).toBe('No failures detected');
    });

    it('should format failures without tool names', () => {
      const failuresWithoutTools = sampleFailures.map(f => ({
        ...f,
        toolName: undefined
      }));
      
      const formatted = formatFailuresForDisplay(failuresWithoutTools);
      expect(formatted).not.toContain('Tool:');
    });

    it('should use correct icons for severity levels', () => {
      const mixedFailures: ToolFailure[] = [
        {
          type: 'error',
          pattern: '/./',
          message: 'Critical error',
          severity: 'error',
          timestamp: new Date()
        },
        {
          type: 'warning',
          pattern: '/./',
          message: 'Warning message',
          severity: 'warning',
          timestamp: new Date()
        },
        {
          type: 'info',
          pattern: '/./',
          message: 'Info message',
          severity: 'info',
          timestamp: new Date()
        }
      ];
      
      const formatted = formatFailuresForDisplay(mixedFailures);
      expect(formatted).toContain('❌ Critical error');
      expect(formatted).toContain('⚠️ Warning message');
      expect(formatted).toContain('ℹ️ Info message');
    });
  });
});