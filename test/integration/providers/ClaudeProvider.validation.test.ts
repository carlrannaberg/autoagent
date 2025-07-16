import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ClaudeProvider } from '@/providers/ClaudeProvider';
import { spawn } from 'child_process';
import { EventEmitter } from 'events';
import * as fs from 'fs/promises';
import * as path from 'path';
import { TaskObjectiveValidator } from '@/utils/validation';
import { TaskStatusReporter } from '@/utils/status-reporter';
// ExecutionResult is used by the ClaudeProvider internally

// Mock dependencies
vi.mock('child_process');
vi.mock('fs/promises');
vi.mock('path');
vi.mock('@/utils/validation');
vi.mock('@/utils/status-reporter');

// Mock child process implementation
class MockChildProcess extends EventEmitter {
  stdout = new EventEmitter();
  stderr = new EventEmitter();
  stdin = {
    write: vi.fn(),
    end: vi.fn()
  };
  kill = vi.fn();
}

describe('ClaudeProvider - Validation Integration Tests', () => {
  let provider: ClaudeProvider;
  let mockSpawn: ReturnType<typeof vi.fn>;
  let mockProcess: MockChildProcess;
  let mockValidator: ReturnType<typeof vi.mocked<TaskObjectiveValidator>>;
  let mockStatusReporter: ReturnType<typeof vi.mocked<TaskStatusReporter>>;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Don't suppress status reporter in these tests - we want to test it
    delete process.env.VITEST;
    delete process.env.NODE_ENV;
    
    provider = new ClaudeProvider();
    mockProcess = new MockChildProcess();
    mockSpawn = vi.mocked(spawn);
    mockSpawn.mockReturnValue(mockProcess as unknown as ReturnType<typeof spawn>);
    
    // Mock validation and status reporter
    mockValidator = vi.mocked(TaskObjectiveValidator).prototype;
    mockStatusReporter = vi.mocked(TaskStatusReporter).prototype;
    
    // Default mock implementations
    vi.mocked(fs.readFile).mockResolvedValue('File content');
    vi.mocked(path.basename).mockReturnValue('filename.txt');
    vi.spyOn(process, 'cwd').mockReturnValue('/test/dir');
  });
  
  afterEach(() => {
    delete process.env.VITEST;
    delete process.env.NODE_ENV;
  });

  describe('TaskObjectiveValidator Integration', () => {
    it('should integrate correctly with TaskObjectiveValidator', async () => {
      // Mock file reads
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Create a new feature to handle user authentication')
        .mockResolvedValueOnce('1. Implement auth service\n2. Add login endpoint\n3. Write tests');
      
      // Mock validation result
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: true,
        confidence: 85,
        issues: [],
        recommendations: []
      });
      
      const executePromise = provider.execute('1-auth-feature.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      // Simulate successful execution
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Created auth service\nModified: src/auth.service.ts\nAdded login endpoint\nModified: src/auth.controller.ts\nAll tests pass'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // Verify validator was called with correct parameters
      expect(mockValidator.validateCompletion).toHaveBeenCalledWith(
        expect.stringContaining('Create a new feature to handle user authentication'),
        expect.objectContaining({ output: expect.stringContaining('Created auth service') }),
        expect.arrayContaining([
          expect.objectContaining({
            toolName: 'claude-cli',
            success: true,
            output: expect.stringContaining('Created auth service')
          })
        ])
      );
      
      // Verify result includes validation data
      expect(result.taskCompletion).toEqual({
        isComplete: true,
        confidence: 85,
        issues: [],
        recommendations: []
      });
      
      expect(result.success).toBe(true);
    });

    it('should mark task as incomplete when tools fail despite exit code 0', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Fix the broken test suite')
        .mockResolvedValueOnce('Run tests and fix all failures');
      
      // Mock validation detecting test failures
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: false,
        confidence: 30,
        issues: [
          'test_failure: 5 tests failed',
          'Tests were not executed or did not pass'
        ],
        recommendations: [
          'Fix failing tests or update test expectations',
          'Run tests locally to debug failures'
        ]
      });
      
      const executePromise = provider.execute('2-fix-tests.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      // Simulate execution with test failures
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Ran tests\nFAIL src/auth.test.ts\n5 failing\nError: Expected true, received false'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0); // Exit code 0 but tests failed
      
      const result = await executePromise;
      
      // Verify task marked as failed despite exit code 0
      expect(result.success).toBe(false);
      expect(result.taskCompletion).toEqual({
        isComplete: false,
        confidence: 30,
        issues: [
          'test_failure: 5 tests failed',
          'Tests were not executed or did not pass'
        ],
        recommendations: [
          'Fix failing tests or update test expectations',
          'Run tests locally to debug failures'
        ]
      });
    });

    it('should calculate confidence scores properly', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Implement three new endpoints for user management')
        .mockResolvedValueOnce('1. GET /users\n2. POST /users\n3. DELETE /users/:id');
      
      // Mock partial completion
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: false,
        confidence: 67,
        issues: ['Only 2 of 3 endpoints were implemented'],
        recommendations: ['Implement the missing DELETE endpoint']
      });
      
      const executePromise = provider.execute('3-user-endpoints.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Created GET /users endpoint\nCreated POST /users endpoint\nModified: src/users.controller.ts'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // With 67% confidence, task should still be marked as success
      expect(result.success).toBe(true);
      expect(result.taskCompletion?.confidence).toBe(67);
      expect(result.taskCompletion?.isComplete).toBe(false);
    });

    it('should handle validation errors gracefully', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Create a simple hello world function')
        .mockResolvedValueOnce('Write a function that returns "Hello, World!"');
      
      // Mock validation throwing an error
      mockValidator.validateCompletion.mockRejectedValue(new Error('Validation service unavailable'));
      
      const executePromise = provider.execute('4-hello-world.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Created hello world function\nModified: src/hello.ts'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // Should default to success when validation fails
      expect(result.success).toBe(true);
      expect(result.taskCompletion).toEqual({
        isComplete: true,
        confidence: 80,
        issues: [],
        recommendations: []
      });
    });

    it('should populate taskCompletion field correctly', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Add error handling to the API')
        .mockResolvedValueOnce('Wrap all endpoints in try-catch blocks');
      
      const validationResult = {
        isComplete: true,
        confidence: 95,
        issues: [],
        recommendations: ['Consider adding error logging for debugging']
      };
      
      mockValidator.validateCompletion.mockResolvedValue(validationResult);
      
      const executePromise = provider.execute('5-error-handling.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Added error handling to all endpoints\nModified: src/api.controller.ts'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      expect(result.taskCompletion).toEqual(validationResult);
    });
  });

  describe('TaskStatusReporter Integration', () => {
    it('should call TaskStatusReporter with correct execution result', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Implement logging service')
        .mockResolvedValueOnce('Create a service for application logging');
      
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: true,
        confidence: 90,
        issues: [],
        recommendations: []
      });
      
      const executePromise = provider.execute('6-logging-service.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Created logging service\nModified: src/logger.service.ts'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      await executePromise;
      
      // Verify status reporter was called (mocked, so no output)
      expect(mockStatusReporter.reportCompletion).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          issueNumber: 6,
          provider: 'claude',
          taskCompletion: expect.objectContaining({
            isComplete: true,
            confidence: 90
          })
        })
      );
    });

    it('should report failures through TaskStatusReporter', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Deploy application to production')
        .mockResolvedValueOnce('Run deployment scripts');
      
      const executePromise = provider.execute('7-deploy-app.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      mockProcess.stderr.emit('data', 'Error: Deployment failed - insufficient permissions');
      mockProcess.emit('close', 1);
      
      await executePromise;
      
      // Verify failure was reported
      expect(mockStatusReporter.reportCompletion).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('Deployment failed'),
          provider: 'claude'
        })
      );
    });
  });

  describe('Different Scenarios', () => {
    it('should handle complete success scenario', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Create a calculator module')
        .mockResolvedValueOnce('Implement add, subtract, multiply, divide functions with tests');
      
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: true,
        confidence: 100,
        issues: [],
        recommendations: []
      });
      
      const executePromise = provider.execute('8-calculator.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Created calculator module\nModified: src/calculator.ts\nCreated tests\nModified: src/calculator.test.ts\nAll tests pass'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      expect(result).toMatchObject({
        success: true,
        issueNumber: 8,
        provider: 'claude',
        filesChanged: ['src/calculator.ts', 'src/calculator.test.ts'],
        taskCompletion: {
          isComplete: true,
          confidence: 100,
          issues: [],
          recommendations: []
        }
      });
    });

    it('should handle partial completion scenario', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Refactor authentication to use JWT tokens')
        .mockResolvedValueOnce('1. Update auth service\n2. Modify login endpoint\n3. Update middleware\n4. Write tests');
      
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: false,
        confidence: 75,
        issues: ['Middleware was not updated', 'No tests were written'],
        recommendations: ['Update the authentication middleware', 'Add unit tests for JWT functionality']
      });
      
      const executePromise = provider.execute('9-jwt-auth.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Updated auth service\nModified: src/auth.service.ts\nUpdated login endpoint\nModified: src/auth.controller.ts'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // With 75% confidence, should still be marked as success
      expect(result.success).toBe(true);
      expect(result.taskCompletion).toMatchObject({
        isComplete: false,
        confidence: 75,
        issues: expect.arrayContaining(['Middleware was not updated', 'No tests were written'])
      });
    });

    it('should handle complete failure scenario', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Optimize database queries')
        .mockResolvedValueOnce('Analyze and optimize slow queries');
      
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: false,
        confidence: 20,
        issues: [
          'permission_denied: Cannot access database',
          'No queries were optimized',
          'Database connection failed'
        ],
        recommendations: [
          'Check database permissions',
          'Ensure database connection is configured correctly'
        ]
      });
      
      const executePromise = provider.execute('10-optimize-db.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Error: Permission denied\nCannot connect to database\nFailed to analyze queries'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // Low confidence with critical errors should fail
      expect(result.success).toBe(false);
      expect(result.taskCompletion).toMatchObject({
        isComplete: false,
        confidence: 20,
        issues: expect.arrayContaining(['permission_denied: Cannot access database'])
      });
    });

    it('should handle mixed tool results scenario', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Set up CI/CD pipeline')
        .mockResolvedValueOnce('Configure GitHub Actions for automated testing and deployment');
      
      // Simulate partial success - some tools worked, some failed
      // Based on ClaudeProvider logic, confidence < 70 alone doesn't fail
      // It needs critical issues with error/failed/permission keywords
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: false,
        confidence: 60,
        issues: [
          'GitHub Actions workflow has syntax issues',
          'Deployment step is incomplete'
        ],
        recommendations: [
          'Fix YAML syntax in workflow file',
          'Add deployment credentials as GitHub secrets'
        ]
      });
      
      const executePromise = provider.execute('11-setup-cicd.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Created GitHub Actions workflow\nModified: .github/workflows/ci.yml\nWorkflow has syntax issues\nPartially configured deployment'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // 60% confidence without critical error keywords should still pass
      expect(result.success).toBe(true);
      expect(result.taskCompletion?.confidence).toBe(60);
      expect(result.taskCompletion?.issues).toHaveLength(2);
      expect(result.taskCompletion?.recommendations).toHaveLength(2);
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain backward compatibility when validation is disabled', async () => {
      // Mock validator to throw immediately
      mockValidator.validateCompletion.mockRejectedValue(new Error('Validation disabled'));
      
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Simple task')
        .mockResolvedValueOnce('Do something simple');
      
      const executePromise = provider.execute('12-simple.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Task completed'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // Should work exactly as before with default success
      expect(result.success).toBe(true);
      expect(result.taskCompletion).toBeDefined();
      expect(result.taskCompletion?.isComplete).toBe(true);
    });

    it('should respect process exit codes as primary success indicator', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Run build process')
        .mockResolvedValueOnce('Execute npm run build');
      
      // Validation says success but process failed
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: true,
        confidence: 90,
        issues: [],
        recommendations: []
      });
      
      const executePromise = provider.execute('13-build.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      mockProcess.stderr.emit('data', 'Build failed with exit code 1');
      mockProcess.emit('close', 1); // Non-zero exit code
      
      const result = await executePromise;
      
      // Exit code should take precedence
      expect(result.success).toBe(false);
      expect(result.error).toContain('Build failed');
    });

    it('should handle legacy file extraction patterns', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Update configuration files')
        .mockResolvedValueOnce('Modify app config');
      
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: true,
        confidence: 85,
        issues: [],
        recommendations: []
      });
      
      const executePromise = provider.execute('14-config.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      // Use various file modification patterns that are actually supported
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Updated: config/app.json\nModified: .env\nCreated: config/database.yml\nSaved: settings.ini'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // Should extract all file patterns correctly
      expect(result.filesChanged).toEqual(expect.arrayContaining([
        'config/app.json',
        '.env',
        'config/database.yml',
        'settings.ini'
      ]));
    });
  });

  describe('Mock Validation Components', () => {
    it('should correctly mock TaskObjectiveValidator', () => {
      // Verify mock is working correctly
      const validator = new TaskObjectiveValidator();
      expect(validator.validateCompletion).toBeDefined();
      expect(vi.isMockFunction(validator.validateCompletion)).toBe(true);
    });

    it('should correctly mock TaskStatusReporter', () => {
      // Verify mock is working correctly
      const reporter = new TaskStatusReporter();
      expect(reporter.reportCompletion).toBeDefined();
      expect(vi.isMockFunction(reporter.reportCompletion)).toBe(true);
    });

    it('should handle complex validation scenarios with multiple tool results', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Complex multi-step task')
        .mockResolvedValueOnce('1. Create files\n2. Run tests\n3. Deploy');
      
      // Mock a complex validation scenario
      mockValidator.validateCompletion.mockImplementation((task, execution, toolResults) => {
        // Simulate analyzing multiple tool results
        const failedTools = toolResults.filter(t => t.success === false);
        const successRate = ((toolResults.length - failedTools.length) / toolResults.length) * 100;
        
        return Promise.resolve({
          isComplete: successRate >= 80,
          confidence: Math.round(successRate),
          issues: failedTools.map(t => `${t.toolName} failed: ${t.error}`),
          recommendations: failedTools.length > 0 ? ['Review and fix failed operations'] : []
        });
      });
      
      const executePromise = provider.execute('15-complex.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Created files successfully\nTests passed\nDeployment completed'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // Verify the mock was called and returned expected result
      expect(mockValidator.validateCompletion).toHaveBeenCalled();
      expect(result.taskCompletion?.confidence).toBe(100); // All tools succeeded
      expect(result.taskCompletion?.isComplete).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty output gracefully', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Do nothing task')
        .mockResolvedValueOnce('This task requires no action');
      
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: true,
        confidence: 100,
        issues: [],
        recommendations: []
      });
      
      const executePromise = provider.execute('16-noop.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      mockProcess.stdout.emit('data', ''); // Empty output
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      expect(result.success).toBe(true);
      expect(result.output).toBe('');
    });

    it('should handle malformed JSON output', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Task with bad output')
        .mockResolvedValueOnce('Do something');
      
      // Mock validation to return success since we want to test JSON parsing
      mockValidator.validateCompletion.mockResolvedValue({
        isComplete: true,
        confidence: 80,
        issues: [],
        recommendations: []
      });
      
      const executePromise = provider.execute('17-bad-json.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      // Send malformed JSON followed by valid JSON
      mockProcess.stdout.emit('data', '{"type": "assistant", "message": {broken json\n');
      mockProcess.stdout.emit('data', JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Task completed despite JSON issues'
          }]
        }
      }));
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // Should handle gracefully and extract valid messages
      expect(result.success).toBe(true);
      expect(result.output).toBe('Task completed despite JSON issues');
    });

    it('should handle validation timeout scenarios', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce('Time-sensitive task')
        .mockResolvedValueOnce('Complete quickly');
      
      // Mock slow validation
      mockValidator.validateCompletion.mockImplementation(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            isComplete: true,
            confidence: 80,
            issues: [],
            recommendations: []
          }), 100)
        )
      );
      
      const executePromise = provider.execute('18-timeout.md', 'plan.md');
      
      await new Promise(resolve => setImmediate(resolve));
      
      mockProcess.emit('spawn');
      const jsonOutput = JSON.stringify({
        type: 'assistant',
        message: {
          content: [{
            type: 'text',
            text: 'Task completed quickly'
          }]
        }
      });
      mockProcess.stdout.emit('data', jsonOutput);
      mockProcess.emit('close', 0);
      
      const result = await executePromise;
      
      // Should wait for validation to complete
      expect(result.taskCompletion?.confidence).toBe(80);
    });
  });
});