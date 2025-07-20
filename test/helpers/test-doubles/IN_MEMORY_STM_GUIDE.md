# InMemorySTMManager Usage Guide

## Overview

The `InMemorySTMManager` is a test double implementation of the STMManager that operates entirely in memory. It provides a complete STM interface without file system operations, making it ideal for fast, isolated testing.

## Basic Usage

### Import and Setup

```typescript
import { InMemorySTMManager } from '../test/helpers/test-doubles/in-memory-stm-manager';

// Create an instance
const stmManager = new InMemorySTMManager();

// Or with configuration
const stmManager = new InMemorySTMManager({
  defaultTags: ['test', 'autoagent']
});
```

### Creating Tasks

```typescript
// Minimal task
const taskId = await stmManager.createTask('Fix login bug', {
  description: 'Users cannot log in with special characters'
});

// Full-featured task
const taskId = await stmManager.createTask('Implement OAuth', {
  description: 'Add OAuth2 authentication support',
  technicalDetails: `
    - Support Google and GitHub providers
    - Use OAuth2 authorization code flow
    - Store tokens securely
  `,
  implementationPlan: `
    1. Install OAuth libraries
    2. Create provider configurations
    3. Implement callback handlers
    4. Add token storage
    5. Create login UI
  `,
  acceptanceCriteria: [
    'Users can log in with Google',
    'Users can log in with GitHub',
    'Tokens are stored securely',
    'Session management works correctly',
    'Logout revokes tokens'
  ],
  testingStrategy: 'Unit tests for auth logic, E2E tests for login flow',
  verificationSteps: 'Run: npm run test:auth && npm run test:e2e:login',
  tags: ['authentication', 'security', 'feature']
});
```

## Task Operations

### Retrieving Tasks

```typescript
// Get a specific task
const task = await stmManager.getTask(taskId);
if (task) {
  console.log(task.title);
  console.log(task.status);
}

// Get all tasks
const allTasks = await stmManager.listTasks();

// Filter by status
const pendingTasks = await stmManager.listTasks({ 
  status: 'pending' 
});

// Filter by tags
const securityTasks = await stmManager.listTasks({ 
  tags: ['security'] 
});

// Combined filters
const urgentPendingTasks = await stmManager.listTasks({
  status: 'pending',
  tags: ['urgent', 'high-priority']
});
```

### Searching Tasks

```typescript
// Simple search
const results = await stmManager.searchTasks('login');

// Search with filters
const bugResults = await stmManager.searchTasks('error', {
  status: 'in-progress',
  tags: ['bug']
});

// Case-insensitive search (default)
const matches = await stmManager.searchTasks('oauth', {
  ignoreCase: true
});
```

### Updating Tasks

```typescript
// Update status
await stmManager.markTaskInProgress(taskId);
await stmManager.markTaskComplete(taskId);

// Custom status update
await stmManager.updateTaskStatus(taskId, 'done');

// Update multiple fields
await stmManager.updateTask(taskId, {
  title: 'Updated: Implement OAuth with MFA',
  status: 'in-progress',
  tags: ['authentication', 'security', 'mfa'],
  content: 'Updated content with MFA requirements'
});
```

### Task Sections

The InMemorySTMManager can parse and retrieve specific sections from task content:

```typescript
const sections = await stmManager.getTaskSections(taskId);
// Returns: {
//   description?: string;
//   details?: string;
//   validation?: string;
// }
```

## Test-Specific Features

### Reset State

```typescript
beforeEach(() => {
  stmManager.reset(); // Clears all tasks and resets ID counter
});
```

### Predictable IDs

```typescript
// Set the next task ID for predictable testing
stmManager.setNextId(100);
const taskId = await stmManager.createTask('Test', { description: 'Test' });
// taskId will be "100"
```

### Direct Access

```typescript
// Get all tasks as an array (useful for assertions)
const allTasks = stmManager.getAllTasks();
expect(allTasks).toHaveLength(3);

// Direct numeric ID access (bypasses string parsing)
const task = stmManager.getTaskById(42);
```

### Simulating Failures

```typescript
// Simulate initialization failure
stmManager.setInitializationError(new Error('STM service unavailable'));

// Now all operations will fail
await expect(stmManager.createTask('Test', { description: 'Test' }))
  .rejects.toThrow('Failed to initialize STM TaskManager');

// Check initialization status
const isReady = stmManager.isInitialized();
expect(isReady).toBe(false);
```

## Integration with Test Frameworks

### Vitest Example

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemorySTMManager } from '../test/helpers/test-doubles/in-memory-stm-manager';

// Create a shared instance
const sharedSTMManager = new InMemorySTMManager();

// Mock the STMManager module
vi.mock('../src/utils/stm-manager', () => ({
  STMManager: vi.fn(() => sharedSTMManager)
}));

describe('Feature using STM', () => {
  beforeEach(() => {
    sharedSTMManager.reset();
  });

  it('should work with tasks', async () => {
    // Your test code using STM
  });
});
```

### Jest Example

```typescript
import { InMemorySTMManager } from '../test/helpers/test-doubles/in-memory-stm-manager';

// Mock at the top level
jest.mock('../src/utils/stm-manager', () => ({
  STMManager: jest.fn(() => new InMemorySTMManager())
}));
```

## Common Patterns

### Task Lifecycle Testing

```typescript
it('should follow complete task lifecycle', async () => {
  // Create
  const taskId = await stmManager.createTask('Lifecycle Test', {
    description: 'Test task lifecycle transitions'
  });

  // Verify creation
  let task = await stmManager.getTask(taskId);
  expect(task?.status).toBe('pending');
  expect(task?.tags).toContain('autoagent');

  // Start work
  await stmManager.markTaskInProgress(taskId);
  task = await stmManager.getTask(taskId);
  expect(task?.status).toBe('in-progress');
  expect(task?.updated).not.toBe(task?.created);

  // Complete
  await stmManager.markTaskComplete(taskId);
  task = await stmManager.getTask(taskId);
  expect(task?.status).toBe('done');
});
```

### Batch Operations Testing

```typescript
it('should handle multiple tasks', async () => {
  // Create multiple tasks
  const taskIds = await Promise.all([
    stmManager.createTask('Task 1', { description: 'First task', tags: ['frontend'] }),
    stmManager.createTask('Task 2', { description: 'Second task', tags: ['backend'] }),
    stmManager.createTask('Task 3', { description: 'Third task', tags: ['frontend', 'urgent'] })
  ]);

  // Test filtering
  const frontendTasks = await stmManager.listTasks({ tags: ['frontend'] });
  expect(frontendTasks).toHaveLength(2);

  // Test search
  const searchResults = await stmManager.searchTasks('task');
  expect(searchResults).toHaveLength(3);

  // Update statuses
  await stmManager.markTaskInProgress(taskIds[0]);
  await stmManager.markTaskComplete(taskIds[1]);

  // Verify status distribution
  const pending = await stmManager.listTasks({ status: 'pending' });
  const inProgress = await stmManager.listTasks({ status: 'in-progress' });
  const completed = await stmManager.listTasks({ status: 'done' });

  expect(pending).toHaveLength(1);
  expect(inProgress).toHaveLength(1);
  expect(completed).toHaveLength(1);
});
```

### Error Handling

```typescript
it('should handle errors appropriately', async () => {
  // Invalid task ID
  await expect(stmManager.getTask('invalid')).resolves.toBeNull();

  // Non-existent task
  await expect(stmManager.updateTask('999', { status: 'done' }))
    .rejects.toThrow('Task with ID 999 not found');

  // Invalid status
  await expect(stmManager.updateTaskStatus('1', 'invalid-status'))
    .rejects.toThrow('Invalid status: invalid-status');

  // Empty title
  await expect(stmManager.createTask('', { description: 'Test' }))
    .rejects.toThrow('Task title cannot be empty');
});
```

## Differences from Real STM

1. **No File System**: All data is stored in memory
2. **No External Dependencies**: No need for STM CLI to be installed
3. **Instant Operations**: No file I/O delays
4. **Test Helpers**: Additional methods for testing scenarios
5. **Predictable Behavior**: Controlled environment for testing

## Best Practices

1. **Reset Between Tests**: Always call `reset()` in `beforeEach` to ensure test isolation
2. **Use Shared Instances**: For integration tests, share the same instance across components
3. **Predictable IDs**: Use `setNextId()` when you need specific task IDs
4. **Error Simulation**: Use `setInitializationError()` to test error handling
5. **Direct Access**: Use test helper methods for assertions, not for business logic

## Troubleshooting

### Tasks Not Persisting
- Ensure you're using a shared instance across your test components
- Check that you're not creating new instances accidentally

### Unexpected Task IDs
- Call `reset()` in `beforeEach` to reset the ID counter
- Use `setNextId()` for predictable IDs

### Status Validation Errors
- Valid statuses: 'pending', 'in-progress', 'done'
- 'completed' is automatically mapped to 'done'

### Content Formatting
- Task content is formatted as markdown
- Sections are parsed from markdown headers
- Use the standard STM format for consistent parsing