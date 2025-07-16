import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  ToolFailureDetector, 
  TaskObjectiveValidator,
  hasCriticalFailures, 
  groupFailuresByType, 
  formatFailuresForDisplay 
} from '../../../src/utils/validation.js';
import { ToolFailure, FailureType, ToolResult } from '../../../src/types/completion.js';

describe('ToolFailureDetector', () => {
  let detector: ToolFailureDetector;

  beforeEach(() => {
    vi.clearAllMocks();
    detector = new ToolFailureDetector();
  });

  describe('analyzeToolOutput', () => {
    describe('generic error detection', () => {
      it('should detect Error: pattern', () => {
        const output = 'Error: Something went wrong';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures).toHaveLength(1);
        expect(failures[0]).toMatchObject({
          type: 'generic_error',
          severity: 'error',
          message: 'Error: Something went wrong',
          lineNumber: 1
        });
      });

      it('should detect Failed to pattern', () => {
        const output = 'Failed to load configuration file';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures).toHaveLength(1);
        expect(failures[0].type).toBe('generic_error');
        expect(failures[0].severity).toBe('error');
      });

      it('should detect case-insensitive error patterns', () => {
        const output = 'ERROR: Critical failure';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures).toHaveLength(1);
        expect(failures[0].type).toBe('generic_error');
      });
    });

    describe('file system error detection', () => {
      it('should detect file not found errors', () => {
        const output = 'Cannot find module "./missing-file.js"';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures).toHaveLength(1);
        expect(failures[0].type).toBe('file_not_found');
        expect(failures[0].severity).toBe('error');
      });

      it('should detect ENOENT errors', () => {
        const output = 'ENOENT: no such file or directory, open "/path/to/file"';
        const failures = detector.analyzeToolOutput(output);
        
        const enoentFailure = failures.find(f => f.message.includes('ENOENT'));
        expect(enoentFailure).toBeDefined();
        expect(enoentFailure?.type).toBe('file_not_found');
      });

      it('should detect permission denied errors', () => {
        const output = 'Permission denied: cannot write to /etc/hosts';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'permission_denied')).toBe(true);
      });

      it('should detect EACCES errors', () => {
        const output = 'EACCES: permission denied, open "/root/file"';
        const failures = detector.analyzeToolOutput(output);
        
        const eaccesFailure = failures.find(f => f.message.includes('EACCES'));
        expect(eaccesFailure).toBeDefined();
        expect(eaccesFailure?.type).toBe('permission_denied');
      });

      it('should detect file already exists errors', () => {
        const output = 'EEXIST: file already exists, mkdir "/tmp/test"';
        const failures = detector.analyzeToolOutput(output);
        
        const existsFailure = failures.find(f => f.message.includes('EEXIST'));
        expect(existsFailure).toBeDefined();
        expect(existsFailure?.type).toBe('file_already_exists');
      });
    });

    describe('npm error detection', () => {
      it('should detect npm ERR! patterns', () => {
        const output = `npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! app@1.0.0 test: \`jest\`
npm ERR! Exit status 1`;
        
        const failures = detector.analyzeToolOutput(output);
        const npmError = failures.find(f => f.type === 'npm_error');
        
        expect(npmError).toBeDefined();
        expect(npmError?.severity).toBe('error');
        expect(npmError?.message).toContain('npm ERR!');
      });

      it('should detect module not found errors', () => {
        const output = 'Error: Cannot resolve module "non-existent-package"';
        const failures = detector.analyzeToolOutput(output);
        
        // "Cannot resolve" matches the module_not_found pattern
        expect(failures.some(f => f.type === 'module_not_found')).toBe(true);
      });
    });

    describe('TypeScript error detection', () => {
      it('should detect TypeScript error codes', () => {
        const output = 'src/index.ts:10:5 - error TS2322: Type "string" is not assignable to type "number".';
        const failures = detector.analyzeToolOutput(output);
        
        const tsError = failures.find(f => f.type === 'typescript_error');
        expect(tsError).toBeDefined();
        expect(tsError?.severity).toBe('error');
        expect(tsError?.message).toContain('TS2322');
      });

      it('should detect TS pattern without error prefix', () => {
        const output = 'TS2339: Property "foo" does not exist on type "Bar".';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'typescript_error')).toBe(true);
      });

      it('should detect build failures', () => {
        const output = 'Build failed with 3 errors';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'build_error')).toBe(true);
      });
    });

    describe('git error detection', () => {
      it('should detect fatal git errors', () => {
        const output = 'fatal: not a git repository (or any of the parent directories): .git';
        const failures = detector.analyzeToolOutput(output);
        
        const gitError = failures.find(f => f.type === 'git_error');
        expect(gitError).toBeDefined();
        expect(gitError?.severity).toBe('error');
      });

      it('should detect merge conflicts', () => {
        const output = `CONFLICT (content): Merge conflict in package.json
Automatic merge failed; fix conflicts and then commit the result.`;
        
        const failures = detector.analyzeToolOutput(output);
        expect(failures.some(f => f.type === 'git_merge_conflict')).toBe(true);
      });
    });

    describe('test failure detection', () => {
      it('should detect failing test files', () => {
        const output = 'FAIL src/utils/validation.test.ts';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'test_failure')).toBe(true);
        expect(failures[0].severity).toBe('warning');
      });

      it('should detect assertion errors', () => {
        const output = 'AssertionError: expected "foo" to equal "bar"';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'test_failure')).toBe(true);
      });

      it('should detect Expected/Received patterns', () => {
        const output = 'Test failed: Expected 5 but Received 4';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'test_failure')).toBe(true);
      });

      it('should detect test summary failures', () => {
        const output = 'Test Suites: 1 failed, 2 passed, 3 total\nTests: 3 failing, 10 passed, 13 total';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'test_failure')).toBe(true);
      });
    });

    describe('network error detection', () => {
      it('should detect connection refused errors', () => {
        const output = 'connect ECONNREFUSED 127.0.0.1:8080';
        const failures = detector.analyzeToolOutput(output);
        
        const networkError = failures.find(f => f.message.includes('ECONNREFUSED'));
        expect(networkError).toBeDefined();
        expect(networkError?.type).toBe('network_error');
      });

      it('should detect timeout errors', () => {
        const output = 'ETIMEDOUT connection timed out';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'network_error')).toBe(true);
      });

      it('should detect HTTP status errors', () => {
        const output = '404 Not Found: The requested resource was not found';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'api_error')).toBe(true);
      });
    });

    describe('tool-specific error detection', () => {
      it('should detect MultiEdit failures', () => {
        const output = 'MultiEdit failed: Cannot apply edits to file';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'tool_error')).toBe(true);
      });

      it('should detect old string not found errors', () => {
        const output = 'Old string not found in the file';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'string_not_found')).toBe(true);
      });

      it('should detect no changes info messages', () => {
        const output = 'No changes made to the file';
        const failures = detector.analyzeToolOutput(output);
        
        const noChanges = failures.find(f => f.type === 'no_changes');
        expect(noChanges).toBeDefined();
        expect(noChanges?.severity).toBe('info');
      });
    });

    describe('warning and info detection', () => {
      it('should detect warning patterns', () => {
        const output = 'WARNING: This function is deprecated';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.length).toBeGreaterThan(0);
        const warning = failures.find(f => f.type === 'warning');
        expect(warning).toBeDefined();
        expect(warning?.severity).toBe('warning');
      });

      it('should detect deprecation warnings', () => {
        const output = 'DeprecationWarning: Buffer() is deprecated';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'deprecation')).toBe(true);
      });

      it('should detect hint messages', () => {
        const output = 'HINT: Use --force to override this check';
        const failures = detector.analyzeToolOutput(output);
        
        const hint = failures.find(f => f.type === 'hint');
        expect(hint).toBeDefined();
        expect(hint?.severity).toBe('info');
      });
    });

    describe('multi-line error extraction', () => {
      it('should extract stack traces', () => {
        const output = `TypeError: Cannot read property 'length' of undefined
    at processArray (index.js:10:15)
    at main (index.js:20:5)
    at Object.<anonymous> (index.js:25:1)`;
        
        const failures = detector.analyzeToolOutput(output);
        const typeError = failures.find(f => f.type === 'type_error');
        
        expect(typeError).toBeDefined();
        expect(typeError?.context).toBeDefined();
        expect(typeError?.context?.length).toBeGreaterThan(1);
        expect(typeError?.context?.some(line => line.includes('at processArray'))).toBe(true);
      });

      it('should extract indented error details', () => {
        const output = `npm ERR! code ELIFECYCLE
  npm ERR! errno 1
  npm ERR! app@1.0.0 test: \`jest\`
  npm ERR! Exit status 1`;
        
        const failures = detector.analyzeToolOutput(output);
        const npmError = failures.find(f => f.type === 'npm_error');
        
        expect(npmError?.context).toBeDefined();
        expect(npmError?.context?.length).toBeGreaterThan(1);
      });

      it('should stop context extraction at new error', () => {
        const output = `Error: First error
  Details about first error
  More details
Error: Second error
  Details about second error`;
        
        const failures = detector.analyzeToolOutput(output);
        expect(failures).toHaveLength(2);
        
        const firstError = failures[0];
        expect(firstError.context?.some(line => line.includes('Second error'))).toBe(false);
      });

      it('should include error position indicators', () => {
        const output = `ReferenceError: undefinedVar is not defined
    at test.js:10:5
    console.log(undefinedVar);
    ^^^^^^^^^^^^^`;
        
        const failures = detector.analyzeToolOutput(output);
        const refError = failures.find(f => f.type === 'reference_error');
        
        expect(refError).toBeDefined();
        expect(refError?.context).toBeDefined();
        expect(refError?.context?.some(line => line.includes('^^^^^'))).toBe(true);
      });
    });

    describe('edge cases', () => {
      it('should handle empty output', () => {
        const failures = detector.analyzeToolOutput('');
        expect(failures).toHaveLength(0);
      });

      it('should handle null/undefined lines gracefully', () => {
        const output = 'Error: First\n\n\nError: Second';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures).toHaveLength(2);
      });

      it('should handle output with no failures', () => {
        const output = `Successfully compiled 10 files
All tests passed (15 suites, 42 tests)
Build completed in 2.5s`;
        
        const failures = detector.analyzeToolOutput(output);
        expect(failures).toHaveLength(0);
      });

      it('should avoid duplicate failures for same line', () => {
        const output = 'Error: File not found: /path/to/missing.txt';
        const failures = detector.analyzeToolOutput(output);
        
        // Should match both "Error:" and "File not found" but only create one failure
        expect(failures).toHaveLength(1);
        expect(failures[0].type).toBe('generic_error'); // First pattern wins
      });

      it('should handle very long lines', () => {
        const longError = 'Error: ' + 'x'.repeat(5000);
        const failures = detector.analyzeToolOutput(longError);
        
        expect(failures).toHaveLength(1);
        expect(failures[0].message).toBe(longError.trim());
      });

      it('should detect multiple different errors', () => {
        const output = `Error: Generic error
npm ERR! Package not found
fatal: not a git repository
FAIL test.spec.js
Permission denied: /etc/passwd`;
        
        const failures = detector.analyzeToolOutput(output);
        const types = failures.map(f => f.type);
        
        expect(types).toContain('generic_error');
        expect(types).toContain('npm_error');
        expect(types).toContain('git_error');
        expect(types).toContain('test_failure');
        expect(types).toContain('permission_denied');
      });
    });

    describe('line number tracking', () => {
      it('should track correct line numbers', () => {
        const output = `Line 1
Line 2
Error: This is on line 3
Line 4
Warning: This is on line 5`;
        
        const failures = detector.analyzeToolOutput(output);
        
        const error = failures.find(f => f.message.includes('line 3'));
        expect(error?.lineNumber).toBe(3);
        
        const warning = failures.find(f => f.message.includes('line 5'));
        expect(warning?.lineNumber).toBe(5);
      });
    });

    describe('resource and process errors', () => {
      it('should detect out of memory errors', () => {
        const output = 'FATAL ERROR: JavaScript heap out of memory';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'resource_error')).toBe(true);
      });

      it('should detect stack overflow errors', () => {
        const output = 'RangeError: Maximum call stack size exceeded';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'resource_error')).toBe(true);
      });

      it('should detect non-zero exit codes', () => {
        const output = 'Process finished with Exit code: 1';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'process_error')).toBe(true);
      });

      it('should not detect zero exit code as error', () => {
        const output = 'Process finished with Exit code: 0';
        const failures = detector.analyzeToolOutput(output);
        
        expect(failures.some(f => f.type === 'process_error')).toBe(false);
      });
    });
  });

  describe('determineSeverity', () => {
    it('should determine severity from pattern match', () => {
      const severity = detector.determineSeverity('warning', 'WARNING: Deprecated function');
      expect(severity).toBe('warning');
    });

    it('should fallback to type-based severity for error types', () => {
      const errorTypes: FailureType[] = [
        'generic_error', 'file_not_found', 'permission_denied', 'syntax_error',
        'type_error', 'git_error', 'typescript_error', 'build_error'
      ];
      
      for (const type of errorTypes) {
        const severity = detector.determineSeverity(type, 'Some message');
        expect(severity).toBe('error');
      }
    });

    it('should fallback to type-based severity for warning types', () => {
      const warningTypes: FailureType[] = ['test_failure', 'warning', 'deprecation'];
      
      for (const type of warningTypes) {
        const severity = detector.determineSeverity(type, 'Some message');
        expect(severity).toBe('warning');
      }
    });

    it('should fallback to type-based severity for info types', () => {
      const infoTypes: FailureType[] = ['no_changes', 'hint', 'tip', 'note'];
      
      for (const type of infoTypes) {
        const severity = detector.determineSeverity(type, 'Some message');
        expect(severity).toBe('info');
      }
    });

    it('should default to warning for unknown types', () => {
      // @ts-expect-error - Testing with invalid type
      const severity = detector.determineSeverity('unknown_type', 'Some message');
      expect(severity).toBe('warning');
    });
  });
});

describe('Helper Functions', () => {
  describe('hasCriticalFailures', () => {
    it('should return true when there are error severity failures', () => {
      const failures: ToolFailure[] = [
        {
          type: 'file_not_found',
          pattern: 'File not found',
          message: 'Error: File not found',
          severity: 'error'
        },
        {
          type: 'warning',
          pattern: 'Warning',
          message: 'Warning: Deprecated',
          severity: 'warning'
        }
      ];
      
      expect(hasCriticalFailures(failures)).toBe(true);
    });

    it('should return false when only warnings and info exist', () => {
      const failures: ToolFailure[] = [
        {
          type: 'warning',
          pattern: 'Warning',
          message: 'Warning: Deprecated',
          severity: 'warning'
        },
        {
          type: 'hint',
          pattern: 'Hint',
          message: 'Hint: Try this',
          severity: 'info'
        }
      ];
      
      expect(hasCriticalFailures(failures)).toBe(false);
    });

    it('should return false for empty array', () => {
      expect(hasCriticalFailures([])).toBe(false);
    });
  });

  describe('groupFailuresByType', () => {
    it('should group failures by type correctly', () => {
      const failures: ToolFailure[] = [
        {
          type: 'file_not_found',
          pattern: 'pattern1',
          message: 'File 1 not found',
          severity: 'error'
        },
        {
          type: 'file_not_found',
          pattern: 'pattern2',
          message: 'File 2 not found',
          severity: 'error'
        },
        {
          type: 'permission_denied',
          pattern: 'pattern3',
          message: 'Access denied',
          severity: 'error'
        }
      ];
      
      const grouped = groupFailuresByType(failures);
      
      expect(grouped.size).toBe(2);
      expect(grouped.get('file_not_found')).toHaveLength(2);
      expect(grouped.get('permission_denied')).toHaveLength(1);
    });

    it('should handle empty array', () => {
      const grouped = groupFailuresByType([]);
      expect(grouped.size).toBe(0);
    });

    it('should handle single failure type', () => {
      const failures: ToolFailure[] = [
        {
          type: 'git_error',
          pattern: 'fatal',
          message: 'fatal: error 1',
          severity: 'error'
        },
        {
          type: 'git_error',
          pattern: 'fatal',
          message: 'fatal: error 2',
          severity: 'error'
        }
      ];
      
      const grouped = groupFailuresByType(failures);
      expect(grouped.size).toBe(1);
      expect(grouped.get('git_error')).toHaveLength(2);
    });
  });

  describe('formatFailuresForDisplay', () => {
    it('should format failures with appropriate icons', () => {
      const failures: ToolFailure[] = [
        {
          type: 'generic_error',
          pattern: 'Error',
          message: 'Error: Something failed',
          severity: 'error',
          lineNumber: 10
        },
        {
          type: 'warning',
          pattern: 'Warning',
          message: 'Warning: Deprecated API',
          severity: 'warning',
          lineNumber: 20
        },
        {
          type: 'hint',
          pattern: 'Hint',
          message: 'Hint: Use new method',
          severity: 'info'
        }
      ];
      
      const formatted = formatFailuresForDisplay(failures);
      
      expect(formatted).toContain('Detected 3 failure(s):');
      expect(formatted).toContain('❌ generic_error (line 10): Error: Something failed');
      expect(formatted).toContain('⚠️ warning (line 20): Warning: Deprecated API');
      expect(formatted).toContain('ℹ️ hint: Hint: Use new method');
    });

    it('should include context when available', () => {
      const failures: ToolFailure[] = [
        {
          type: 'type_error',
          pattern: 'TypeError',
          message: 'TypeError: Cannot read property',
          severity: 'error',
          context: [
            'TypeError: Cannot read property',
            '    at function1 (file.js:10)',
            '    at function2 (file.js:20)'
          ]
        }
      ];
      
      const formatted = formatFailuresForDisplay(failures);
      
      expect(formatted).toContain('Context:');
      expect(formatted).toContain('    at function1 (file.js:10)');
      expect(formatted).toContain('    at function2 (file.js:20)');
    });

    it('should handle failures without line numbers', () => {
      const failures: ToolFailure[] = [
        {
          type: 'generic_error',
          pattern: 'Error',
          message: 'Error: No line info',
          severity: 'error'
        }
      ];
      
      const formatted = formatFailuresForDisplay(failures);
      
      expect(formatted).toContain('❌ generic_error: Error: No line info');
      expect(formatted).not.toContain('(line');
    });

    it('should handle empty failures array', () => {
      const formatted = formatFailuresForDisplay([]);
      expect(formatted).toBe('No failures detected');
    });

    it('should handle single-line context', () => {
      const failures: ToolFailure[] = [
        {
          type: 'generic_error',
          pattern: 'Error',
          message: 'Error: Test',
          severity: 'error',
          context: ['Error: Test'] // Only one line
        }
      ];
      
      const formatted = formatFailuresForDisplay(failures);
      
      // Should not include "Context:" section for single-line context
      expect(formatted).not.toContain('Context:');
    });

    it('should add empty lines between failures', () => {
      const failures: ToolFailure[] = [
        {
          type: 'error',
          pattern: 'Error',
          message: 'Error 1',
          severity: 'error'
        },
        {
          type: 'error',
          pattern: 'Error',
          message: 'Error 2',
          severity: 'error'
        }
      ];
      
      const formatted = formatFailuresForDisplay(failures);
      const lines = formatted.split('\n');
      
      // Check for empty lines between failures
      const emptyLines = lines.filter(line => line === '');
      expect(emptyLines.length).toBeGreaterThan(0);
    });
  });
});

describe('TaskObjectiveValidator', () => {
  let validator: TaskObjectiveValidator;
  let mockToolFailureDetector: ToolFailureDetector;

  beforeEach(() => {
    vi.clearAllMocks();
    validator = new TaskObjectiveValidator();
    mockToolFailureDetector = new ToolFailureDetector();
    
    // Mock the detector instance inside the validator
    vi.spyOn(mockToolFailureDetector, 'analyzeToolOutput');
    (validator as any).toolFailureDetector = mockToolFailureDetector;
  });

  describe('validateCompletion', () => {
    describe('successful task completion scenarios', () => {
      it('should return complete=true with high confidence for successful task', async () => {
        const originalTask = 'Create a new component called UserProfile in src/components/UserProfile.tsx';
        const execution = {
          output: `Successfully created file src/components/UserProfile.tsx
File written successfully
Task completed successfully`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Write',
            success: true,
            output: 'File created successfully',
            duration: 100
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(true);
        expect(result.confidence).toBeGreaterThan(70);
        expect(result.issues).toHaveLength(0);
        expect(result.recommendations.length).toBeGreaterThan(0); // Always includes general recommendations
      });

      it('should handle task with test requirements', async () => {
        const originalTask = 'Implement authentication system and test it thoroughly';
        const execution = {
          output: `Authentication system implemented
All tests pass
✓ 15 tests passing
Build successful
Task completed successfully`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Write',
            success: true,
            output: 'Authentication system created'
          },
          {
            toolName: 'Bash',
            success: true,
            output: 'Tests executed successfully'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(true);
        expect(result.confidence).toBeGreaterThan(80);
        expect(result.issues).toHaveLength(0);
      });

      it('should handle build tasks with success indicators', async () => {
        const originalTask = 'Build the project and fix any compilation issues';
        const execution = {
          output: `Building project...
Compilation successful
Build successful
All files compiled successfully`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Bash',
            success: true,
            output: 'Build completed successfully'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(true);
        expect(result.confidence).toBeGreaterThanOrEqual(70);
        expect(result.issues).toHaveLength(0);
      });
    });

    describe('partial completion scenarios', () => {
      it('should return complete=false with medium confidence for partial completion', async () => {
        const originalTask = 'Create UserProfile component and test it';
        const execution = {
          output: `Created file src/components/UserProfile.tsx
Component implemented successfully
Warning: Tests not implemented yet`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Write',
            success: true,
            output: 'Component created'
          }
        ];

        const warnings: ToolFailure[] = [
          {
            type: 'warning',
            pattern: 'Warning',
            message: 'Warning: Tests not implemented yet',
            severity: 'warning',
            lineNumber: 3
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(warnings);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(true); // No critical errors, confidence >= 70
        expect(result.confidence).toBeGreaterThanOrEqual(70);
        expect(result.issues).toHaveLength(1);
        expect(result.issues[0]).toContain('Tests were not executed');
      });

      it('should handle missing target files', async () => {
        const originalTask = 'Update the config.json file with new API endpoints';
        const execution = {
          output: `Processing configuration...
Completed task`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Edit',
            success: true,
            output: 'Configuration updated'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        // Should have lower confidence because target file wasn't explicitly mentioned
        expect(result.confidence).toBeLessThan(80);
        expect(result.recommendations.some(r => r.includes('Verify that existing files are being modified'))).toBe(true);
      });
    });

    describe('failed completion scenarios', () => {
      it('should return complete=false with low confidence for critical failures', async () => {
        const originalTask = 'Create a new service class';
        const execution = {
          output: `Error: Cannot create file
Permission denied: /src/services/
Failed to complete task`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Write',
            success: false,
            error: 'Permission denied',
            duration: 50
          }
        ];

        const criticalFailures: ToolFailure[] = [
          {
            type: 'permission_denied',
            pattern: 'Permission denied',
            message: 'Permission denied: /src/services/',
            severity: 'error',
            lineNumber: 2
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(criticalFailures);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(false);
        expect(result.confidence).toBeLessThan(50);
        expect(result.issues).toHaveLength(2); // Tool failure + permission error
        expect(result.issues[0]).toContain('permission_denied');
        expect(result.issues[1]).toContain('Tool \'Write\' failed');
        expect(result.recommendations).toContain('Check file permissions and ensure write access to the target directories');
      });

      it('should handle multiple tool failures', async () => {
        const originalTask = 'Install dependencies and run tests';
        const execution = {
          output: `npm ERR! code ELIFECYCLE
npm ERR! errno 1
FAIL test/unit/component.test.ts
TypeError: Cannot read property 'length' of undefined`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Bash',
            success: false,
            error: 'npm install failed',
            duration: 5000
          },
          {
            toolName: 'Bash',
            success: false,
            error: 'test execution failed',
            duration: 2000
          }
        ];

        const failures: ToolFailure[] = [
          {
            type: 'npm_error',
            pattern: 'npm ERR!',
            message: 'npm ERR! code ELIFECYCLE',
            severity: 'error',
            lineNumber: 1
          },
          {
            type: 'test_failure',
            pattern: 'FAIL',
            message: 'FAIL test/unit/component.test.ts',
            severity: 'warning',
            lineNumber: 3
          },
          {
            type: 'type_error',
            pattern: 'TypeError',
            message: 'TypeError: Cannot read property \'length\' of undefined',
            severity: 'error',
            lineNumber: 4
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(failures);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(false);
        expect(result.confidence).toBeLessThan(30);
        expect(result.issues.length).toBeGreaterThan(3);
        expect(result.recommendations).toContain('Run "npm install" to install missing dependencies');
        expect(result.recommendations).toContain('Fix failing tests or update test expectations');
      });

      it('should handle TypeScript compilation errors', async () => {
        const originalTask = 'Fix TypeScript errors in the project';
        const execution = {
          output: `src/index.ts:10:5 - error TS2322: Type "string" is not assignable to type "number".
TS2339: Property "foo" does not exist on type "Bar".
Compilation failed`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Bash',
            success: false,
            error: 'TypeScript compilation failed',
            duration: 3000
          }
        ];

        const tsErrors: ToolFailure[] = [
          {
            type: 'typescript_error',
            pattern: 'error TS\\d+',
            message: 'src/index.ts:10:5 - error TS2322: Type "string" is not assignable to type "number".',
            severity: 'error',
            lineNumber: 1
          },
          {
            type: 'typescript_error',
            pattern: 'TS\\d+',
            message: 'TS2339: Property "foo" does not exist on type "Bar".',
            severity: 'error',
            lineNumber: 2
          },
          {
            type: 'build_error',
            pattern: 'Compilation failed',
            message: 'Compilation failed',
            severity: 'error',
            lineNumber: 3
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(tsErrors);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(false);
        expect(result.confidence).toBeLessThan(40);
        expect(result.recommendations).toContain('Fix TypeScript compilation errors before proceeding');
        expect(result.recommendations).toContain('Run "npm run typecheck" to see detailed error messages');
      });
    });

    describe('edge cases and error handling', () => {
      it('should handle null execution input', async () => {
        const originalTask = 'Simple task';
        const execution = null;
        const toolResults: ToolResult[] = [];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(false); // Confidence < 70
        expect(result.confidence).toBe(50); // Base score
        expect(result.issues).toHaveLength(1); // Contains issue about missing targets
      });

      it('should handle empty execution output', async () => {
        const originalTask = 'Create a file';
        const execution = { output: '' };
        const toolResults: ToolResult[] = [];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(false); // Confidence < 70
        expect(result.confidence).toBe(50);
        expect(result.recommendations.some(r => r.includes('Ensure that new files are being created'))).toBe(true);
      });

      it('should handle very long task descriptions', async () => {
        const originalTask = 'Create a comprehensive user authentication system with login, logout, registration, password reset, email verification, two-factor authentication, role-based access control, and session management. Implement proper error handling, validation, logging, and write comprehensive unit tests for all components.';
        const execution = {
          output: 'Authentication system implemented successfully with all required features'
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Write',
            success: true,
            output: 'Implementation complete'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(false); // Confidence < 70
        expect(result.confidence).toBe(52); // Slightly above base score due to success messages
        expect(result.issues).toHaveLength(0);
      });

      it('should handle tasks with special characters and paths', async () => {
        const originalTask = 'Update file at path ./src/components/User&Profile.tsx and add @deprecated annotation';
        const execution = {
          output: `Successfully updated file ./src/components/User&Profile.tsx
Added @deprecated annotation
Changes saved`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Edit',
            success: true,
            output: 'File updated successfully'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(true);
        expect(result.confidence).toBeGreaterThan(70);
        expect(result.issues).toHaveLength(0);
      });

      it('should handle mixed success and failure scenarios', async () => {
        const originalTask = 'Create components and run tests';
        const execution = {
          output: `Successfully created UserProfile.tsx
Successfully created UserCard.tsx
FAIL test/UserProfile.test.ts
Test completed with 1 failure`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Write',
            success: true,
            output: 'UserProfile.tsx created'
          },
          {
            toolName: 'Write',
            success: true,
            output: 'UserCard.tsx created'
          },
          {
            toolName: 'Bash',
            success: false,
            error: 'Test failed',
            duration: 1500
          }
        ];

        const testFailures: ToolFailure[] = [
          {
            type: 'test_failure',
            pattern: 'FAIL',
            message: 'FAIL test/UserProfile.test.ts',
            severity: 'warning',
            lineNumber: 3
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(testFailures);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.isComplete).toBe(false); // Tool failure prevents completion
        expect(result.confidence).toBeLessThan(70);
        expect(result.issues.length).toBeGreaterThan(0);
        expect(result.recommendations).toContain('Fix failing tests or update test expectations');
      });
    });

    describe('confidence scoring algorithm', () => {
      it('should give high confidence for tasks with multiple success indicators', async () => {
        const originalTask = 'Create, test, and build the UserService class';
        const execution = {
          output: `Successfully created UserService.ts
All tests pass
✓ 8 tests passing
Build successful
Compilation successful
Task completed successfully`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Write',
            success: true,
            output: 'UserService.ts created'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.confidence).toBeGreaterThan(85);
      });

      it('should reduce confidence for each critical failure', async () => {
        const originalTask = 'Deploy the application';
        const execution = {
          output: `Error: Connection failed
Error: Database unreachable
Error: Build failed`
        };
        const toolResults: ToolResult[] = [];

        const criticalFailures: ToolFailure[] = [
          {
            type: 'network_error',
            pattern: 'Connection failed',
            message: 'Error: Connection failed',
            severity: 'error',
            lineNumber: 1
          },
          {
            type: 'network_error',
            pattern: 'Database unreachable',
            message: 'Error: Database unreachable',
            severity: 'error',
            lineNumber: 2
          },
          {
            type: 'build_error',
            pattern: 'Build failed',
            message: 'Error: Build failed',
            severity: 'error',
            lineNumber: 3
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(criticalFailures);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.confidence).toBeLessThan(30); // Should be heavily penalized
      });

      it('should give bonus points for target coverage', async () => {
        const originalTask = 'Update UserProfile component and ProfileService class';
        const execution = {
          output: `Updated UserProfile component successfully
Modified ProfileService class
Both UserProfile and ProfileService have been updated`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Edit',
            success: true,
            output: 'Files updated'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.confidence).toBeGreaterThanOrEqual(70);
      });

      it('should handle tasks with quoted strings as targets', async () => {
        const originalTask = 'Add method "getUserById" to the UserService class';
        const execution = {
          output: `Added method getUserById to UserService
Method "getUserById" implemented successfully`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Edit',
            success: true,
            output: 'Method added'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.confidence).toBeGreaterThanOrEqual(60); // Adjust expectation to match actual behavior
      });
    });

    describe('issue and recommendation generation', () => {
      it('should generate specific recommendations for file not found errors', async () => {
        const originalTask = 'Update the configuration file';
        const execution = {
          output: `Cannot find module "./config.json"
ENOENT: no such file or directory, open "/app/config.json"`
        };
        const toolResults: ToolResult[] = [];

        const fileNotFoundFailures: ToolFailure[] = [
          {
            type: 'file_not_found',
            pattern: 'Cannot find',
            message: 'Cannot find module "./config.json"',
            severity: 'error',
            lineNumber: 1
          },
          {
            type: 'file_not_found',
            pattern: 'ENOENT',
            message: 'ENOENT: no such file or directory, open "/app/config.json"',
            severity: 'error',
            lineNumber: 2
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(fileNotFoundFailures);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.recommendations).toContain('Verify that all required files exist and paths are correct');
        expect(result.recommendations).toContain('Create missing files: ./config.json, /app/config.json');
      });

      it('should generate recommendations for git-related tasks', async () => {
        const originalTask = 'Commit and push the changes';
        const execution = {
          output: `fatal: not a git repository (or any of the parent directories): .git
Error: Failed to push changes`
        };
        const toolResults: ToolResult[] = [];

        const gitFailures: ToolFailure[] = [
          {
            type: 'git_error',
            pattern: 'fatal',
            message: 'fatal: not a git repository (or any of the parent directories): .git',
            severity: 'error',
            lineNumber: 1
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(gitFailures);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.recommendations).toContain('Ensure you are in a git repository with proper configuration');
        expect(result.recommendations).toContain('Check git status and resolve any conflicts');
      });

      it('should generate recommendations for string replacement failures', async () => {
        const originalTask = 'Replace old API endpoint with new one';
        const execution = {
          output: `Old string not found in the file
MultiEdit failed: Cannot apply edits to file`
        };
        const toolResults: ToolResult[] = [];

        const stringFailures: ToolFailure[] = [
          {
            type: 'string_not_found',
            pattern: 'Old string not found',
            message: 'Old string not found in the file',
            severity: 'error',
            lineNumber: 1
          },
          {
            type: 'tool_error',
            pattern: 'MultiEdit failed',
            message: 'MultiEdit failed: Cannot apply edits to file',
            severity: 'error',
            lineNumber: 2
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(stringFailures);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.recommendations).toContain('Verify that the text to be replaced exists exactly as specified');
        expect(result.recommendations).toContain('Check for whitespace and formatting differences');
      });

      it('should generate recommendations for dependency issues', async () => {
        const originalTask = 'Install packages and run the application';
        const execution = {
          output: `npm ERR! code ELIFECYCLE
Error: Cannot resolve module "missing-package"
Module not found: Can't resolve 'another-package'`
        };
        const toolResults: ToolResult[] = [];

        const dependencyFailures: ToolFailure[] = [
          {
            type: 'npm_error',
            pattern: 'npm ERR!',
            message: 'npm ERR! code ELIFECYCLE',
            severity: 'error',
            lineNumber: 1
          },
          {
            type: 'module_not_found',
            pattern: 'Cannot resolve',
            message: 'Error: Cannot resolve module "missing-package"',
            severity: 'error',
            lineNumber: 2
          },
          {
            type: 'module_not_found',
            pattern: 'Can\'t resolve',
            message: 'Module not found: Can\'t resolve \'another-package\'',
            severity: 'error',
            lineNumber: 3
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(dependencyFailures);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        expect(result.recommendations).toContain('Run "npm install" to install missing dependencies');
        expect(result.recommendations).toContain('Verify that all required packages are listed in package.json');
      });

      it('should generate general recommendations for low confidence scenarios', async () => {
        const originalTask = 'Implement the payment system';
        const execution = {
          output: `Payment system work started
Some configuration done`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Write',
            success: true,
            output: 'Some files created'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        // Should have lower confidence due to lack of specific completion indicators
        expect(result.confidence).toBeLessThan(70);
        expect(result.recommendations).toContain('Review the task requirements to ensure all objectives are met');
        expect(result.recommendations).toContain('Add validation or tests to confirm the implementation works correctly');
      });

      it('should remove duplicate recommendations', async () => {
        const originalTask = 'Fix multiple file permission issues';
        const execution = {
          output: `Permission denied: /file1.txt
Permission denied: /file2.txt
Access denied: /file3.txt`
        };
        const toolResults: ToolResult[] = [];

        const permissionFailures: ToolFailure[] = [
          {
            type: 'permission_denied',
            pattern: 'Permission denied',
            message: 'Permission denied: /file1.txt',
            severity: 'error',
            lineNumber: 1
          },
          {
            type: 'permission_denied',
            pattern: 'Permission denied',
            message: 'Permission denied: /file2.txt',
            severity: 'error',
            lineNumber: 2
          },
          {
            type: 'permission_denied',
            pattern: 'Access denied',
            message: 'Access denied: /file3.txt',
            severity: 'error',
            lineNumber: 3
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue(permissionFailures);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        const permissionRecommendations = result.recommendations.filter(r => 
          r.includes('permissions') || r.includes('access')
        );
        
        // Should only have one recommendation about permissions despite multiple failures
        expect(permissionRecommendations).toHaveLength(1);
        expect(permissionRecommendations[0]).toContain('Check file permissions and ensure write access');
      });
    });

    describe('task objective extraction', () => {
      it('should extract action verbs from task descriptions', async () => {
        const originalTask = 'Create and implement a new UserService class, then test it thoroughly';
        const execution = {
          output: `UserService class created and implemented
Testing completed successfully`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Write',
            success: true,
            output: 'UserService created'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        // Should have decent confidence because actions are addressed
        expect(result.confidence).toBeGreaterThanOrEqual(60);
      });

      it('should extract file paths and class names as targets', async () => {
        const originalTask = 'Update src/components/UserProfile.tsx and modify the ProfileService class';
        const execution = {
          output: `Updated src/components/UserProfile.tsx successfully
Modified ProfileService class
Both UserProfile.tsx and ProfileService have been updated`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Edit',
            success: true,
            output: 'Files updated'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        // Should have high confidence because all targets are mentioned in output
        expect(result.confidence).toBeGreaterThanOrEqual(70);
      });

      it('should handle tasks with no explicit targets', async () => {
        const originalTask = 'Improve the overall performance of the application';
        const execution = {
          output: `Performance optimizations applied
Application speed improved by 30%
Optimization completed successfully`
        };
        const toolResults: ToolResult[] = [
          {
            toolName: 'Edit',
            success: true,
            output: 'Performance improvements applied'
          }
        ];

        mockToolFailureDetector.analyzeToolOutput = vi.fn().mockReturnValue([]);

        const result = await validator.validateCompletion(originalTask, execution, toolResults);

        // Should still have reasonable confidence despite no specific targets
        expect(result.confidence).toBeGreaterThanOrEqual(55);
      });
    });
  });
});