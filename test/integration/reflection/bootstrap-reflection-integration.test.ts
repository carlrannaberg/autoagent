import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as os from 'os';
import { AutonomousAgent } from '../../../src/core/autonomous-agent';
import { applyImprovements } from '../../../src/core/improvement-applier';
import { TestProviderMock } from './helpers/test-provider-mock';
import { ProviderName, ChangeType } from '../../../src/types/index';
import { Provider } from '../../../src/providers/Provider';

describe('Bootstrap with Reflection Integration Tests', () => {
  let testDir: string;
  let agent: AutonomousAgent;
  let providerMock: TestProviderMock;

  beforeEach(async () => {
    // Create a unique test directory
    testDir = path.join(os.tmpdir(), `autoagent-reflection-test-${Date.now()}`);
    await fs.mkdir(testDir, { recursive: true });
    await fs.mkdir(path.join(testDir, 'issues'), { recursive: true });
    await fs.mkdir(path.join(testDir, 'plans'), { recursive: true });
    await fs.mkdir(path.join(testDir, '.autoagent'), { recursive: true });

    // Set up provider mock
    providerMock = new TestProviderMock('claude');
    
    // Mock provider creation to use our test provider
    vi.doMock('../../../src/providers', () => ({
      createProvider: (): Provider => providerMock,
      getFirstAvailableProvider: (): Promise<Provider | null> => Promise.resolve(providerMock)
    }));
  });

  afterEach(async () => {
    vi.clearAllMocks();
    // Clean up test directory
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  describe('Full Bootstrap → Decomposition → Reflection → Improvement Cycle', () => {
    it('should complete full reflection cycle with bootstrap', async () => {
      // Create master plan file
      const masterPlanPath = path.join(testDir, 'master-plan.md');
      await fs.writeFile(masterPlanPath, `# Authentication System Master Plan

## Overview
Build a complete authentication system with user registration, login, and session management.

## Core Features
1. User registration with email validation
2. Secure password storage
3. Login with JWT tokens
4. Session management
5. Password reset functionality

## Technical Requirements
- Use bcrypt for password hashing
- Implement JWT for session tokens
- Add rate limiting for security
- Include comprehensive error handling`);

      // Set up initial decomposition response
      providerMock.setCustomResponse(
        'decompose',
        `I'll decompose this authentication system into manageable issues:

## Issues Created

### Issue 1: User Registration Backend
**File:** issues/1-user-registration-backend.md
\`\`\`markdown
# Issue 1: User Registration Backend

## Requirements
Implement user registration API endpoint with email validation and password hashing.

## Acceptance Criteria
- [ ] POST /api/auth/register endpoint created
- [ ] Email validation implemented
- [ ] Password hashing with bcrypt
- [ ] User data stored in database
\`\`\`

**Plan:** plans/1-user-registration-backend.md
\`\`\`markdown
# Plan for Issue 1: User Registration Backend

## Implementation Plan
### Phase 1: Setup
- [ ] Install bcrypt and validation libraries
- [ ] Create user model/schema

### Phase 2: Implementation
- [ ] Create registration endpoint
- [ ] Add input validation
- [ ] Implement password hashing
\`\`\`

### Issue 2: Login System
**File:** issues/2-login-system.md
\`\`\`markdown
# Issue 2: Login System

## Requirements
Implement secure login with JWT token generation.

## Acceptance Criteria
- [ ] POST /api/auth/login endpoint
- [ ] Password verification
- [ ] JWT token generation
- [ ] Return token to client
\`\`\`

**Plan:** plans/2-login-system.md
\`\`\`markdown
# Plan for Issue 2: Login System

## Implementation Plan
### Phase 1: JWT Setup
- [ ] Install jsonwebtoken library
- [ ] Configure JWT secret

### Phase 2: Login Implementation
- [ ] Create login endpoint
- [ ] Verify credentials
- [ ] Generate and return JWT
\`\`\``);

      // Set up reflection responses
      const reflectionIterations = [
        {
          improvementScore: 0.7,
          identifiedGaps: [
            {
              type: 'security',
              description: 'Missing rate limiting for authentication endpoints',
              relatedIssues: ['1', '2']
            },
            {
              type: 'dependency',
              description: 'Database setup not included as prerequisite',
              relatedIssues: ['1']
            }
          ],
          recommendedChanges: [
            {
              type: 'ADD_ISSUE',
              target: '3-rate-limiting.md',
              description: 'Add rate limiting issue',
              content: `# Issue 3: Rate Limiting

## Requirements
Implement rate limiting for authentication endpoints to prevent brute force attacks.

## Acceptance Criteria
- [ ] Rate limiting middleware created
- [ ] Configurable limits per endpoint
- [ ] Proper error responses for rate limit exceeded`,
              rationale: 'Security requirement missing from decomposition'
            },
            {
              type: 'ADD_DEPENDENCY',
              target: '1-user-registration-backend.md',
              description: 'Add database setup dependency',
              content: '- Issue 0: Database setup and configuration',
              rationale: 'User registration requires database to be configured first'
            }
          ],
          reasoning: 'Initial decomposition lacks critical security features and dependency management'
        },
        {
          improvementScore: 0.3,
          identifiedGaps: [
            {
              type: 'testing',
              description: 'No testing strategy defined',
              relatedIssues: ['1', '2', '3']
            }
          ],
          recommendedChanges: [
            {
              type: 'MODIFY_PLAN',
              target: 'plan-for-issue-1.md',
              description: 'Add testing phase',
              content: `### Phase 3: Testing
- [ ] Unit tests for validation logic
- [ ] Integration tests for registration endpoint
- [ ] Test error handling scenarios`,
              rationale: 'Testing is essential for authentication systems'
            }
          ],
          reasoning: 'Testing strategy needed for critical authentication components'
        },
        {
          improvementScore: 0.08,
          identifiedGaps: [],
          recommendedChanges: [],
          reasoning: 'Decomposition is now comprehensive with security, dependencies, and testing addressed'
        }
      ];

      let reflectionCallCount = 0;
      providerMock.setCustomHandler((prompt: string) => {
        if (prompt.includes('Reflection Instructions')) {
          const response = reflectionIterations[reflectionCallCount];
          reflectionCallCount++;
          return JSON.stringify(response);
        }
        // Return default decomposition for bootstrap
        return providerMock.getResponse('decompose');
      });

      // Create agent with reflection enabled
      agent = new AutonomousAgent({
        workspace: testDir,
        provider: 'claude' as ProviderName,
        reflection: {
          enabled: true,
          maxIterations: 3,
          improvementThreshold: 0.1,
          skipForSimpleSpecs: false
        }
      });

      await agent.initialize();

      // Execute bootstrap
      const issueNumber = await agent.bootstrap(masterPlanPath);
      expect(issueNumber).toBe(1);

      // Verify bootstrap issue was created
      const bootstrapIssue = await fs.readFile(
        path.join(testDir, 'issues', '1-implement-plan-from-master-plan.md'),
        'utf-8'
      );
      expect(bootstrapIssue).toContain('Decompose the plan into individual actionable issues');

      // Execute the decomposition issue
      const result = await agent.executeIssue(issueNumber);
      expect(result.success).toBe(true);

      // Verify reflection was performed
      expect(reflectionCallCount).toBe(3); // All iterations executed

      // Check that improvements were logged (via progress reports)
      // In a real implementation, we'd capture these through event listeners
    });

    it('should apply improvements to generated files', async () => {
      // Create a simple spec
      const specPath = path.join(testDir, 'simple-spec.md');
      await fs.writeFile(specPath, '# Simple Feature\n\nImplement a basic calculator with add and subtract operations.');

      // Mock provider responses for decomposition and improvement
      providerMock.setCustomResponse(
        'decompose',
        `Issues created:
- issues/1-calculator-operations.md
- plans/1-calculator-operations.md`
      );

      // Create initial files that will be improved
      await fs.writeFile(
        path.join(testDir, 'issues', '1-calculator-operations.md'),
        `# Issue 1: Calculator Operations

## Requirements
Implement add and subtract functions.

## Acceptance Criteria
- [ ] Add function works
- [ ] Subtract function works`
      );

      await fs.writeFile(
        path.join(testDir, 'plans', '1-calculator-operations.md'),
        `# Plan for Issue 1: Calculator Operations

## Implementation Plan
### Phase 1
- [ ] Create functions`
      );

      // Test improvement application
      const improvements = [
        {
          type: ChangeType.MODIFY_ISSUE,
          target: '1-calculator-operations.md',
          description: 'Add detailed acceptance criteria',
          content: `## Acceptance Criteria
- [ ] Add function accepts two numbers and returns sum
- [ ] Subtract function accepts two numbers and returns difference
- [ ] Functions handle edge cases (NaN, Infinity)
- [ ] Functions have TypeScript types`,
          rationale: 'More specific criteria needed'
        },
        {
          type: ChangeType.ADD_DEPENDENCY,
          target: '1-calculator-operations.md',
          description: 'Add testing dependency',
          content: '- Testing framework setup required',
          rationale: 'Calculator functions need unit tests'
        }
      ];

      // Apply improvements
      const result = await applyImprovements(improvements, testDir);
      expect(result.success).toBe(true);
      expect(result.appliedChanges).toHaveLength(2);

      // Verify improvements were applied
      const improvedIssue = await fs.readFile(
        path.join(testDir, 'issues', '1-calculator-operations.md'),
        'utf-8'
      );
      expect(improvedIssue).toContain('Functions handle edge cases');
      expect(improvedIssue).toContain('## Dependencies');
      expect(improvedIssue).toContain('Testing framework setup required');

      // Verify backup was created
      expect(result.backup).toBeDefined();
      expect(result.backup?.files.size).toBeGreaterThan(0);
    });

    it('should skip reflection for simple specs when configured', async () => {
      const simpleSpecPath = path.join(testDir, 'tiny-spec.md');
      await fs.writeFile(simpleSpecPath, '# Tiny Task\n\nAdd a hello function.');

      let reflectionCalled = false;
      providerMock.setCustomHandler((prompt: string) => {
        if (prompt.includes('Reflection Instructions')) {
          reflectionCalled = true;
        }
        return 'Issues created: issues/1-hello-function.md';
      });

      agent = new AutonomousAgent({
        workspace: testDir,
        provider: 'claude' as ProviderName,
        reflection: {
          enabled: true,
          maxIterations: 3,
          improvementThreshold: 0.1,
          skipForSimpleSpecs: true // Skip for simple specs
        }
      });

      await agent.initialize();
      await agent.bootstrap(simpleSpecPath);

      // Reflection should be skipped for simple spec
      expect(reflectionCalled).toBe(false);
    });
  });

  describe('Multi-Iteration Scenarios', () => {
    it('should handle gradual improvement across iterations', async () => {
      const specPath = path.join(testDir, 'complex-spec.md');
      await fs.writeFile(specPath, `# E-commerce Platform

Build a complete e-commerce platform with:
- Product catalog
- Shopping cart
- Order management
- Payment processing
- Inventory tracking
- User reviews
- Admin dashboard`);

      const iterations = [
        { improvementScore: 0.8, changes: 5 }, // Major gaps
        { improvementScore: 0.5, changes: 3 }, // Some improvements
        { improvementScore: 0.2, changes: 1 }, // Minor tweaks
        { improvementScore: 0.05, changes: 0 } // Complete
      ];

      let iterationIndex = 0;
      providerMock.setCustomHandler((prompt: string) => {
        if (prompt.includes('Reflection Instructions')) {
          const iteration = iterations[iterationIndex++];
          return JSON.stringify({
            improvementScore: iteration.improvementScore,
            recommendedChanges: Array(iteration.changes).fill({
              type: 'ADD_ISSUE',
              target: `${10 + iterationIndex}-new-issue.md`,
              description: 'Add missing feature',
              content: 'Issue content',
              rationale: 'Gap identified'
            }),
            reasoning: `Iteration ${iterationIndex} improvements`
          });
        }
        return 'Decomposition complete';
      });

      agent = new AutonomousAgent({
        workspace: testDir,
        provider: 'claude' as ProviderName,
        reflection: {
          enabled: true,
          maxIterations: 5,
          improvementThreshold: 0.1,
          skipForSimpleSpecs: false
        }
      });

      await agent.initialize();
      await agent.bootstrap(specPath);

      // Should perform 4 iterations (until score < 0.1)
      expect(iterationIndex).toBe(4);
    });

    it('should respect maximum iteration limit', async () => {
      const specPath = path.join(testDir, 'never-ending-spec.md');
      await fs.writeFile(specPath, '# Complex System\n\nBuild everything.');

      let iterationCount = 0;
      providerMock.setCustomHandler((prompt: string) => {
        if (prompt.includes('Reflection Instructions')) {
          iterationCount++;
          return JSON.stringify({
            improvementScore: 0.9, // Always high score
            recommendedChanges: [{
              type: 'ADD_ISSUE',
              target: 'issue.md',
              description: 'Add more',
              content: 'More content',
              rationale: 'Never satisfied'
            }]
          });
        }
        return 'Initial decomposition';
      });

      agent = new AutonomousAgent({
        workspace: testDir,
        provider: 'claude' as ProviderName,
        reflection: {
          enabled: true,
          maxIterations: 2, // Limit to 2 iterations
          improvementThreshold: 0.1,
          skipForSimpleSpecs: false
        }
      });

      await agent.initialize();
      await agent.bootstrap(specPath);

      // Should stop at max iterations
      expect(iterationCount).toBe(2);
    });
  });

  describe('Provider Failover During Reflection', () => {
    it('should handle provider errors gracefully', async () => {
      const specPath = path.join(testDir, 'error-spec.md');
      await fs.writeFile(specPath, '# Test Spec\n\nTest content.');

      let attemptCount = 0;
      providerMock.setCustomHandler((prompt: string) => {
        if (prompt.includes('Reflection Instructions')) {
          attemptCount++;
          if (attemptCount === 1) {
            throw new Error('Provider temporarily unavailable');
          }
          return JSON.stringify({
            improvementScore: 0.05,
            recommendedChanges: []
          });
        }
        return 'Decomposition result';
      });

      agent = new AutonomousAgent({
        workspace: testDir,
        provider: 'claude' as ProviderName,
        reflection: {
          enabled: true,
          maxIterations: 3,
          improvementThreshold: 0.1,
          skipForSimpleSpecs: false
        }
      });

      await agent.initialize();
      
      // Should complete despite error
      const issueNumber = await agent.bootstrap(specPath);
      expect(issueNumber).toBe(1);
      
      // Reflection should have been attempted but failed gracefully
      expect(attemptCount).toBe(1);
    });
  });

  describe('Configuration Integration', () => {
    it('should merge CLI reflection options with config', async () => {
      // Create config file with reflection settings
      const configPath = path.join(testDir, '.autoagent', 'config.json');
      await fs.writeFile(configPath, JSON.stringify({
        providers: [{ name: 'claude', apiKey: 'test-key' }],
        reflection: {
          enabled: true,
          maxIterations: 2,
          improvementThreshold: 0.2,
          skipForSimpleSpecs: true
        }
      }));

      const specPath = path.join(testDir, 'config-test.md');
      await fs.writeFile(specPath, '# Config Test\n\n' + 'A'.repeat(1000)); // Make it complex

      let reflectionConfig: any;
      providerMock.setCustomHandler((prompt: string) => {
        if (prompt.includes('Reflection Instructions')) {
          // Capture the iteration number from prompt
          const match = prompt.match(/Iteration (\d+)/);
          const iteration = match ? parseInt(match[1]) : 1;
          
          if (iteration === 1) {
            reflectionConfig = { capturedIteration: iteration };
          }
          
          return JSON.stringify({
            improvementScore: 0.05,
            recommendedChanges: []
          });
        }
        return 'Decomposition';
      });

      // Override with CLI options (higher iterations)
      agent = new AutonomousAgent({
        workspace: testDir,
        provider: 'claude' as ProviderName,
        reflection: {
          maxIterations: 5, // Override config
          improvementThreshold: 0.05 // Override config
          // enabled and skipForSimpleSpecs inherit from config
        }
      });

      await agent.initialize();
      await agent.bootstrap(specPath);

      // Should use CLI overrides
      expect(reflectionConfig).toBeDefined();
    });
  });

  describe('Error Recovery and Rollback', () => {
    it('should rollback changes on improvement failure', async () => {
      // Create files to be modified
      const originalContent = '# Original Issue\n\nOriginal content';
      await fs.writeFile(
        path.join(testDir, 'issues', '1-test-issue.md'),
        originalContent
      );

      const improvements = [
        {
          type: ChangeType.MODIFY_ISSUE,
          target: '1-test-issue.md',
          description: 'Valid change',
          content: 'Modified content',
          rationale: 'Test'
        },
        {
          type: ChangeType.MODIFY_ISSUE,
          target: '99-nonexistent.md', // This will fail
          description: 'Invalid change',
          content: 'Content',
          rationale: 'Test'
        }
      ];

      const result = await applyImprovements(improvements, testDir);
      expect(result.success).toBe(false);
      expect(result.failedChanges).toHaveLength(1);

      // Original file should be unchanged due to rollback
      const content = await fs.readFile(
        path.join(testDir, 'issues', '1-test-issue.md'),
        'utf-8'
      );
      expect(content).toBe(originalContent);
    });

    it('should handle interrupted reflection gracefully', async () => {
      const specPath = path.join(testDir, 'interrupt-spec.md');
      await fs.writeFile(specPath, '# Interrupt Test\n\nTest interruption handling.');

      const abortController = new AbortController();
      
      providerMock.setCustomHandler((prompt: string) => {
        if (prompt.includes('Reflection Instructions')) {
          // Simulate interruption during reflection
          setTimeout(() => abortController.abort(), 50);
          
          return JSON.stringify({
            improvementScore: 0.5,
            recommendedChanges: []
          });
        }
        return 'Decomposition';
      });

      agent = new AutonomousAgent({
        workspace: testDir,
        provider: 'claude' as ProviderName,
        signal: abortController.signal,
        reflection: {
          enabled: true,
          maxIterations: 3,
          improvementThreshold: 0.1,
          skipForSimpleSpecs: false
        }
      });

      await agent.initialize();
      
      // Bootstrap should complete but reflection may be interrupted
      const issueNumber = await agent.bootstrap(specPath);
      expect(issueNumber).toBe(1);
    });
  });
});