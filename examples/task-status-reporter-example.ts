#!/usr/bin/env node

/**
 * Example demonstrating how to use the TaskStatusReporter for displaying
 * task execution results with user-friendly feedback.
 */

import { TaskStatusReporter } from '../src/utils/status-reporter';
import { ExecutionResult } from '../src/types';

// Create reporter instance
const reporter = new TaskStatusReporter();

// Example 1: Successful task completion
console.log('=== Example 1: Successful Task ===');
const successResult: ExecutionResult = {
  success: true,
  issueNumber: 42,
  issueTitle: 'Implement user authentication',
  duration: 45000,
  provider: 'claude',
  filesChanged: ['src/auth.ts', 'src/middleware/auth.ts', 'test/auth.test.ts'],
  taskCompletion: {
    isComplete: true,
    confidence: 95,
    issues: [],
    recommendations: []
  }
};
reporter.reportCompletion(successResult);

// Example 2: Partial completion with issues
console.log('\n=== Example 2: Partial Completion ===');
const partialResult: ExecutionResult = {
  success: true,
  issueNumber: 15,
  issueTitle: 'Refactor database layer',
  duration: 120000,
  provider: 'gemini',
  filesChanged: ['src/db/connection.ts', 'src/db/models.ts'],
  taskCompletion: {
    isComplete: false,
    confidence: 65,
    issues: [
      'Unit tests not updated for new database structure',
      'Missing migration script for schema changes',
      'Documentation not updated'
    ],
    recommendations: [
      'Update unit tests to match new database API',
      'Create migration script using npm run migrate:create',
      'Update README.md with new database configuration options'
    ]
  },
  toolFailures: [
    {
      type: 'test_failure',
      pattern: 'FAIL',
      message: '3 tests failed in db.test.ts',
      severity: 'warning',
      toolName: 'Jest'
    }
  ]
};
reporter.reportCompletion(partialResult);

// Example 3: Failed task with errors
console.log('\n=== Example 3: Failed Task ===');
const failedResult: ExecutionResult = {
  success: false,
  issueNumber: 99,
  issueTitle: 'Deploy to production',
  duration: 5000,
  error: 'TypeScript compilation failed: Cannot find module \'@types/node\'. Please run npm install.',
  provider: 'claude',
  taskCompletion: {
    isComplete: false,
    confidence: 10,
    issues: [
      'TypeScript compilation errors prevent build',
      'Missing dependencies',
      'No deployable artifacts generated'
    ],
    recommendations: [
      'Run npm install to install missing dependencies',
      'Fix TypeScript errors before attempting deployment',
      'Ensure all tests pass locally before deployment'
    ]
  },
  toolFailures: [
    {
      type: 'typescript_error',
      pattern: 'TS\\d+',
      message: "Cannot find module '@types/node'",
      severity: 'error',
      toolName: 'TypeScript'
    },
    {
      type: 'build_error',
      pattern: 'error',
      message: 'Build failed with exit code 1',
      severity: 'error',
      toolName: 'npm'
    }
  ]
};
reporter.reportCompletion(failedResult);

// Example 4: Detailed report for verbose output
console.log('\n=== Example 4: Detailed Report ===');
console.log(reporter.formatDetailedReport(failedResult));

// Example 5: Quick success without validation details
console.log('\n=== Example 5: Simple Success ===');
const simpleResult: ExecutionResult = {
  success: true,
  issueNumber: 7,
  duration: 1500
};
reporter.reportCompletion(simpleResult);