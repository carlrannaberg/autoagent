/**
 * Test data generators for STM (Simple Task Master) related structures.
 * Provides factory functions and mock data utilities for testing.
 */

import type { Task, TaskStatus, TaskCreateInput, TaskUpdateInput } from 'simple-task-master';
import type { TaskContent } from '../../src/types/stm-types';

/**
 * Generate test TaskContent with realistic data.
 */
export function generateTaskContent(overrides: Partial<TaskContent> = {}): TaskContent {
  const defaults: TaskContent = {
    description: 'Implement user authentication system with secure login flow',
    technicalDetails: 'Use industry-standard OAuth2 and JWT tokens for secure authentication',
    implementationPlan: '1. Set up OAuth2 providers\n2. Implement JWT service\n3. Create login UI\n4. Add session management',
    acceptanceCriteria: [
      'Users can log in with Google OAuth2',
      'JWT tokens are properly validated',
      'Sessions expire after 24 hours',
      'Login UI is responsive and accessible'
    ],
    testingStrategy: 'Unit tests for auth service, integration tests for OAuth flow, E2E tests for complete user journey',
    verificationSteps: '1. Manual testing with test accounts\n2. Security audit\n3. Performance testing',
    tags: ['authentication', 'security', 'oauth2']
  };

  return { ...defaults, ...overrides };
}

/**
 * Generate a complete STM Task with realistic data.
 */
export function generateTask(overrides: Partial<Task> = {}): Task {
  const now = new Date().toISOString();
  const id = overrides.id ?? Math.floor(Math.random() * 1000) + 1;
  
  const defaults: Task = {
    schema: 1,
    id,
    title: `Task ${id}: Implement Authentication System`,
    status: 'pending',
    created: now,
    updated: now,
    tags: ['autoagent', 'authentication', 'security'],
    dependencies: [],
    content: generateTaskMarkdownContent()
  };

  return { ...defaults, ...overrides };
}

/**
 * Generate STM task markdown content in the expected format.
 */
export function generateTaskMarkdownContent(taskContent?: Partial<TaskContent>): string {
  const content = generateTaskContent(taskContent);
  
  return `## Why & what

${content.description}

### Acceptance Criteria

${content.acceptanceCriteria.map(criteria => `- [ ] ${criteria}`).join('\n')}

## How

${content.technicalDetails}

### Implementation Plan

${content.implementationPlan}

## Validation

### Testing Strategy

${content.testingStrategy || 'Standard testing approach with unit, integration, and E2E tests'}

### Verification Steps

${content.verificationSteps || '1. Code review\n2. Manual testing\n3. Automated test execution'}`;
}

/**
 * Generate TaskCreateInput for STM task creation.
 */
export function generateTaskCreateInput(overrides: Partial<TaskCreateInput> = {}): TaskCreateInput {
  const defaults: TaskCreateInput = {
    title: 'Test Task: Implement Feature',
    content: generateTaskMarkdownContent(),
    tags: ['autoagent', 'test'],
    dependencies: []
  };

  return { ...defaults, ...overrides };
}

/**
 * Generate TaskUpdateInput for STM task updates.
 */
export function generateTaskUpdateInput(overrides: Partial<TaskUpdateInput> = {}): TaskUpdateInput {
  return { ...overrides };
}

/**
 * Generate multiple tasks for testing collections.
 */
export function generateTaskList(count: number, baseOverrides: Partial<Task> = {}): Task[] {
  return Array.from({ length: count }, (_, index) => {
    return generateTask({
      id: index + 1,
      title: `Task ${index + 1}: ${['Implement', 'Fix', 'Update', 'Create', 'Refactor'][index % 5]} Component`,
      status: (['pending', 'in-progress', 'done'] as TaskStatus[])[index % 3],
      ...baseOverrides
    });
  });
}

/**
 * Mock data sets for different testing scenarios.
 */
export const mockTaskData = {
  /**
   * Simple task for basic testing.
   */
  simple: (): Task => generateTask({
    id: 1,
    title: 'Simple Test Task',
    status: 'pending',
    content: '## Why & what\n\nBasic task for testing\n\n## How\n\nSimple implementation'
  }),

  /**
   * Complex task with all optional fields.
   */
  complex: (): Task => generateTask({
    id: 42,
    title: 'Complex Authentication System Implementation',
    status: 'in-progress',
    tags: ['autoagent', 'authentication', 'security', 'oauth2', 'high-priority'],
    dependencies: [1, 2, 3],
    content: generateTaskMarkdownContent({
      description: 'Implement a comprehensive authentication system with OAuth2, JWT, and MFA support',
      technicalDetails: 'Use passport.js, jsonwebtoken, and speakeasy for secure authentication',
      implementationPlan: '1. OAuth2 setup\n2. JWT service\n3. MFA implementation\n4. Session management\n5. Security audit',
      acceptanceCriteria: [
        'OAuth2 providers (Google, GitHub) work correctly',
        'JWT tokens are secure and properly validated',
        'MFA can be enabled/disabled per user',
        'Sessions have configurable timeouts',
        'All security tests pass'
      ],
      testingStrategy: 'Comprehensive testing including security penetration testing',
      verificationSteps: '1. Manual OAuth testing\n2. JWT validation\n3. MFA flows\n4. Security audit\n5. Performance testing',
      tags: ['authentication', 'security', 'oauth2', 'mfa']
    })
  }),

  /**
   * Task in completed state.
   */
  completed: (): Task => generateTask({
    id: 99,
    title: 'Completed Task: Bug Fix',
    status: 'done',
    content: '## Why & what\n\nFixed critical login bug\n\n## How\n\nUpdated session validation logic'
  }),

  /**
   * Minimal task with only required fields.
   */
  minimal: (): Task => ({
    schema: 1,
    id: 100,
    title: 'Minimal Task',
    status: 'pending',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    tags: ['autoagent'],
    dependencies: []
  }),

  /**
   * Task with specific tags for filtering tests.
   */
  withTags: (tags: string[]): Task => generateTask({
    tags: ['autoagent', ...tags]
  }),

  /**
   * Task with dependencies for relationship tests.
   */
  withDependencies: (dependencies: number[]): Task => generateTask({
    dependencies
  })
};

/**
 * Mock TaskContent variations for different test scenarios.
 */
export const mockTaskContent = {
  simple: (): TaskContent => generateTaskContent({
    description: 'Simple task description',
    technicalDetails: 'Basic technical approach',
    implementationPlan: 'Simple implementation steps',
    acceptanceCriteria: ['Task is complete']
  }),

  withoutOptionals: (): TaskContent => ({
    description: 'Task without optional fields',
    technicalDetails: 'Basic technical details',
    implementationPlan: 'Basic plan',
    acceptanceCriteria: ['Completion criteria']
  }),

  withAllFields: (): TaskContent => generateTaskContent(),

  withValidation: (): TaskContent => generateTaskContent({
    testingStrategy: 'Comprehensive validation testing',
    verificationSteps: 'Manual and automated verification'
  }),

  withTags: (tags: string[]): TaskContent => generateTaskContent({ tags }),

  withLongContent: (): TaskContent => generateTaskContent({
    description: 'This is a very long description that spans multiple lines and contains detailed information about what needs to be implemented, why it\'s important, and how it fits into the overall system architecture.',
    technicalDetails: 'Extensive technical details covering multiple aspects of the implementation including architecture decisions, technology choices, performance considerations, security requirements, and integration points with existing systems.',
    implementationPlan: 'Detailed step-by-step plan:\n1. Analysis and planning phase\n2. Environment setup\n3. Core implementation\n4. Testing and validation\n5. Documentation\n6. Deployment\n7. Monitoring and maintenance',
    acceptanceCriteria: [
      'All functional requirements are met',
      'Performance benchmarks are achieved',
      'Security requirements are satisfied',
      'Code coverage exceeds 90%',
      'Documentation is complete and accurate',
      'Integration tests pass',
      'User acceptance testing is successful'
    ]
  })
};

/**
 * Utility functions for test data manipulation.
 */
export const testDataUtils = {
  /**
   * Create a sequence of tasks with incrementing IDs.
   */
  createSequence: (start: number, count: number): Task[] => {
    return Array.from({ length: count }, (_, index) => 
      generateTask({ id: start + index })
    );
  },

  /**
   * Create tasks with specific statuses.
   */
  withStatuses: (statuses: TaskStatus[]): Task[] => {
    return statuses.map((status, index) => 
      generateTask({ id: index + 1, status })
    );
  },

  /**
   * Create tasks with specific creation dates.
   */
  withDates: (dates: string[]): Task[] => {
    return dates.map((date, index) => 
      generateTask({ id: index + 1, created: date, updated: date })
    );
  },

  /**
   * Create a task hierarchy with dependencies.
   */
  createHierarchy: (): Task[] => {
    return [
      generateTask({ id: 1, title: 'Root Task', dependencies: [] }),
      generateTask({ id: 2, title: 'Child Task 1', dependencies: [1] }),
      generateTask({ id: 3, title: 'Child Task 2', dependencies: [1] }),
      generateTask({ id: 4, title: 'Grandchild Task', dependencies: [2, 3] })
    ];
  }
};