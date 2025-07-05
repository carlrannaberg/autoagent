import { promises as fs } from 'fs';
import * as path from 'path';
import type { ImprovementChange, ReflectionAnalysis, Gap } from '../../../../src/types/index';
import { ChangeType } from '../../../../src/types/index';

/**
 * Creates a sample specification file for testing
 */
export async function createTestSpec(
  dir: string,
  name: string,
  content: string
): Promise<string> {
  const specPath = path.join(dir, 'specs');
  await fs.mkdir(specPath, { recursive: true });
  const filePath = path.join(specPath, name);
  await fs.writeFile(filePath, content);
  return filePath;
}

/**
 * Creates test issues and plans for reflection testing
 */
export async function createTestDecomposition(
  workspace: string,
  issues: Array<{ number: number; title: string; content: string }>,
  plans: Array<{ number: number; content: string }>
): Promise<void> {
  // Create issues
  for (const issue of issues) {
    const filename = `${issue.number}-${issue.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    await fs.writeFile(
      path.join(workspace, 'issues', filename),
      issue.content
    );
  }

  // Create plans
  for (const plan of plans) {
    const issueFile = issues.find(i => i.number === plan.number);
    if (issueFile) {
      const filename = `${plan.number}-${issueFile.title.toLowerCase().replace(/\s+/g, '-')}.md`;
      await fs.writeFile(
        path.join(workspace, 'plans', filename),
        plan.content
      );
    }
  }
}

/**
 * Creates a mock reflection analysis response
 */
export function createMockReflectionAnalysis(
  score: number,
  gaps: Gap[] = [],
  changes: ImprovementChange[] = [],
  reasoning: string = 'Test reasoning'
): ReflectionAnalysis {
  return {
    iterationNumber: 1,
    score,
    gaps,
    changes,
    reasoning,
    timestamp: new Date().toISOString()
  };
}

/**
 * Common test specifications
 */
export const TEST_SPECS = {
  simple: {
    name: 'simple-feature.md',
    content: `# Simple Feature

Implement a basic logging utility with the following:
- Log to console
- Log to file
- Support log levels (debug, info, warn, error)`
  },
  
  complex: {
    name: 'complex-system.md',
    content: `# Distributed Task Processing System

## Overview
Build a comprehensive distributed task processing system with the following components:

### Core Features
1. **Task Queue Management**
   - Priority-based task scheduling
   - Task persistence and recovery
   - Dead letter queue handling
   - Task retry with exponential backoff

2. **Worker Management**
   - Dynamic worker scaling
   - Health monitoring and auto-restart
   - Load balancing across workers
   - Graceful shutdown handling

3. **Monitoring and Observability**
   - Real-time metrics dashboard
   - Performance analytics
   - Error tracking and alerting
   - Distributed tracing

4. **API Layer**
   - RESTful API for task submission
   - WebSocket support for real-time updates
   - Rate limiting and authentication
   - API versioning

### Technical Requirements
- Microservices architecture
- Container orchestration with Kubernetes
- Message queue (RabbitMQ/Kafka)
- Time-series database for metrics
- Distributed caching layer
- Comprehensive test coverage
- CI/CD pipeline setup`
  },
  
  minimal: {
    name: 'minimal-task.md',
    content: `# Add Button

Add a submit button to the form.`
  }
};

/**
 * Common improvement scenarios for testing
 */
export const IMPROVEMENT_SCENARIOS = {
  addDependencies: [
    {
      type: ChangeType.ADD_DEPENDENCY,
      target: '1-core-feature.md',
      description: 'Add database dependency',
      content: '- Database configuration must be completed first',
      rationale: 'Core feature requires database access'
    },
    {
      type: ChangeType.ADD_DEPENDENCY,
      target: '2-api-layer.md',
      description: 'Add authentication dependency',
      content: '- Authentication service must be implemented',
      rationale: 'API requires authentication for security'
    }
  ],
  
  enhanceAcceptanceCriteria: [
    {
      type: ChangeType.MODIFY_ISSUE,
      target: '1-core-feature.md',
      description: 'Add performance criteria',
      content: `## Acceptance Criteria
- [ ] Response time under 100ms for 95th percentile
- [ ] Supports 1000 concurrent connections
- [ ] Memory usage stays under 512MB
- [ ] All endpoints have integration tests`,
      rationale: 'Performance requirements were missing'
    }
  ],
  
  addMissingIssues: [
    {
      type: ChangeType.ADD_ISSUE,
      target: '5-monitoring-setup.md',
      description: 'Add monitoring issue',
      content: `# Issue 5: Monitoring Setup

## Requirements
Set up comprehensive monitoring for the system.

## Acceptance Criteria
- [ ] Metrics collection configured
- [ ] Dashboards created
- [ ] Alerts defined
- [ ] Documentation updated`,
      rationale: 'Monitoring was not included in initial decomposition'
    }
  ],
  
  improveImplementationPlans: [
    {
      type: ChangeType.MODIFY_PLAN,
      target: 'plan-for-issue-1.md',
      description: 'Add testing phase',
      content: `### Phase 3: Testing and Validation
- [ ] Write unit tests for core logic
- [ ] Create integration test suite
- [ ] Performance testing setup
- [ ] Security audit`,
      rationale: 'Testing strategy was not defined'
    }
  ]
};

/**
 * Verifies that improvements were applied correctly
 */
export async function verifyImprovementsApplied(
  workspace: string,
  improvements: ImprovementChange[]
): Promise<{ verified: boolean; errors: string[] }> {
  const errors: string[] = [];
  
  for (const improvement of improvements) {
    try {
      const targetPath = improvement.target.includes('/')
        ? path.join(workspace, improvement.target)
        : path.join(workspace, improvement.type.includes('PLAN') ? 'plans' : 'issues', improvement.target);
      
      const content = await fs.readFile(targetPath, 'utf-8');
      
      // Verify content based on type
      switch (improvement.type) {
        case ChangeType.ADD_ISSUE:
        case ChangeType.ADD_PLAN:
          // File should exist with the content
          if (!content.includes(improvement.content.trim())) {
            errors.push(`Content not found in ${improvement.target}`);
          }
          break;
          
        case ChangeType.MODIFY_ISSUE:
        case ChangeType.MODIFY_PLAN: {
          // Modified content should be present
          const contentLines = improvement.content.split('\n').filter(line => line.trim());
          for (const line of contentLines) {
            if (!content.includes(line.trim())) {
              errors.push(`Modified content "${line}" not found in ${improvement.target}`);
              break;
            }
          }
          break;
        }
          
        case ChangeType.ADD_DEPENDENCY:
          // Dependency section should exist with the content
          if (!content.includes('## Dependencies') || !content.includes(improvement.content.trim())) {
            errors.push(`Dependency not added to ${improvement.target}`);
          }
          break;
      }
    } catch (error) {
      errors.push(`Failed to verify ${improvement.target}: ${error as string}`);
    }
  }
  
  return {
    verified: errors.length === 0,
    errors
  };
}

/**
 * Creates a reflection iteration sequence for testing
 */
export function createReflectionSequence(iterations: Array<{
  score: number;
  gapCount: number;
  changeCount: number;
}>): Array<() => string> {
  return iterations.map((iteration, index) => {
    return () => JSON.stringify({
      improvementScore: iteration.score,
      identifiedGaps: Array(iteration.gapCount).fill({
        type: 'test-gap',
        description: `Gap ${index + 1}`,
        relatedIssues: ['1', '2']
      }),
      recommendedChanges: Array(iteration.changeCount).fill({
        type: ChangeType.ADD_ISSUE,
        target: `${10 + index}-new-issue.md`,
        description: 'Test change',
        content: 'Test content',
        rationale: 'Test rationale'
      }),
      reasoning: `Iteration ${index + 1} analysis`
    });
  });
}

/**
 * Asserts that reflection was performed with expected results
 */
export async function assertReflectionPerformed(
  workspace: string,
  expectedIterations: number,
  expectedImprovements: number
): Promise<void> {
  // In a real implementation, we would check logs or events
  // For now, we can verify by checking if new files were created
  const issuesDir = path.join(workspace, 'issues');
  const files = await fs.readdir(issuesDir);
  
  // Count files that look like improvements (higher issue numbers)
  const improvementFiles = files.filter(f => {
    const match = f.match(/^(\d+)-/);
    return match && parseInt(match[1]) > 5; // Assuming original had <= 5 issues
  });
  
  if (improvementFiles.length < expectedImprovements) {
    throw new Error(
      `Expected at least ${expectedImprovements} improvements, found ${improvementFiles.length}`
    );
  }
}

/**
 * Mock reflection responses for different scenarios
 */
export const REFLECTION_RESPONSES = {
  perfectDecomposition: {
    improvementScore: 0.0,
    identifiedGaps: [],
    recommendedChanges: [],
    reasoning: 'The decomposition is comprehensive and well-structured'
  },
  
  minorImprovements: {
    improvementScore: 0.2,
    identifiedGaps: [
      {
        type: 'clarity',
        description: 'Some acceptance criteria could be more specific',
        relatedIssues: ['1', '3']
      }
    ],
    recommendedChanges: [
      {
        type: ChangeType.MODIFY_ISSUE,
        target: '1-core-feature.md',
        description: 'Clarify acceptance criteria',
        content: '## Acceptance Criteria\n- [ ] Feature completes in < 100ms\n- [ ] Error rate < 0.1%',
        rationale: 'More specific metrics needed'
      }
    ],
    reasoning: 'Minor improvements to clarity and specificity'
  },
  
  majorGaps: {
    improvementScore: 0.8,
    identifiedGaps: [
      {
        type: 'missing-component',
        description: 'Security considerations not addressed',
        relatedIssues: ['*']
      },
      {
        type: 'missing-component',
        description: 'No error handling strategy',
        relatedIssues: ['1', '2', '3']
      }
    ],
    recommendedChanges: [
      {
        type: ChangeType.ADD_ISSUE,
        target: '6-security-audit.md',
        description: 'Add security audit issue',
        content: `# Issue 6: Security Audit

## Requirements
Perform comprehensive security audit and implement recommendations.

## Acceptance Criteria
- [ ] OWASP Top 10 vulnerabilities addressed
- [ ] Security headers implemented
- [ ] Input validation on all endpoints
- [ ] Authentication and authorization tested`,
        rationale: 'Security is critical for the system'
      },
      {
        type: ChangeType.ADD_PLAN,
        target: 'plan-for-issue-6.md',
        description: 'Add security audit plan',
        content: `# Plan for Issue 6: Security Audit

## Implementation Plan
### Phase 1: Assessment
- [ ] Run automated security scanners
- [ ] Manual penetration testing
- [ ] Review authentication flow

### Phase 2: Implementation
- [ ] Fix identified vulnerabilities
- [ ] Implement security headers
- [ ] Add input validation`,
        rationale: 'Detailed plan for security implementation'
      }
    ],
    reasoning: 'Critical security and error handling components missing'
  }
};