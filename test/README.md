# AutoAgent Test Structure

This directory contains all tests for the AutoAgent project, organized by test type and purpose.

## Directory Structure

```
test/
├── unit/                    # Unit tests for individual components
│   ├── core/               # Core module unit tests
│   ├── providers/          # Provider unit tests  
│   ├── utils/              # Utility function unit tests
│   └── cli/                # CLI command unit tests
│
├── integration/            # Integration tests (components working together)
│   ├── providers/          # Provider integration tests
│   ├── workflows/          # Workflow integration tests
│   └── error-recovery/     # Error handling integration tests
│
├── e2e/                    # End-to-end tests (full system tests)
│   ├── cli/                # CLI E2E tests
│   ├── workflows/          # Complete workflow E2E tests
│   └── scenarios/          # Real-world scenario tests
│
├── contract/               # Contract tests for external dependencies
│   ├── claude-api/         # Claude API contract tests
│   ├── gemini-api/         # Gemini API contract tests
│   └── git/                # Git integration contract tests
│
├── performance/            # Performance and benchmark tests
│   ├── benchmarks/         # Performance benchmarks
│   ├── load/               # Load testing
│   └── memory/             # Memory profiling tests
│
├── fixtures/               # Shared test fixtures and data
│   ├── issues/             # Sample issue files
│   ├── plans/              # Sample plan files
│   └── configs/            # Test configurations
│
├── helpers/                # Test utilities and helpers
│   ├── test-doubles/       # In-memory implementations
│   ├── builders/           # Test data builders
│   ├── assertions/         # Custom assertions
│   └── setup/              # Test setup utilities
│
└── smoke/                  # Smoke tests for quick validation
    ├── cli-basics.test.ts  # Basic CLI functionality
    └── provider-check.test.ts # Provider availability
```

## Test Types

### Unit Tests (`unit/`)
- Test individual components in isolation
- Use test doubles for dependencies
- Fast execution (< 10ms per test)
- No external dependencies
- High code coverage focus

### Integration Tests (`integration/`)
- Test multiple components working together
- Use real implementations where possible
- May use test containers for databases
- Medium execution time (< 100ms per test)
- Focus on component interactions

### End-to-End Tests (`e2e/`)
- Test complete user scenarios
- Use real CLI and file system
- May interact with actual providers (in test mode)
- Slower execution (seconds per test)
- Focus on user workflows

### Contract Tests (`contract/`)
- Verify external API contracts
- Can run against mocks or real services
- Ensure compatibility with provider APIs
- Document expected behaviors

### Performance Tests (`performance/`)
- Benchmark critical operations
- Monitor performance regressions
- Memory profiling and leak detection
- Statistical analysis of results

### Smoke Tests (`smoke/`)
- Quick validation of basic functionality
- Run before more extensive test suites
- Catch obvious breaks early
- < 1 minute total execution time

## Running Tests

### By Type
```bash
# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Contract tests
npm run test:contract

# Performance tests
npm run test:perf

# Smoke tests
npm run test:smoke
```

### By Coverage
```bash
# Run all tests with coverage
npm run test:coverage

# Unit tests with coverage
npm run test:unit:coverage
```

### Watch Mode
```bash
# Watch all tests
npm run test:watch

# Watch unit tests only
npm run test:unit:watch
```

## Test Guidelines

### Naming Conventions
- Unit tests: `<component>.test.ts`
- Integration tests: `<feature>.integration.test.ts`
- E2E tests: `<scenario>.e2e.test.ts`
- Contract tests: `<service>.contract.test.ts`
- Performance tests: `<operation>.bench.ts`

### Test Structure
```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should handle normal case', () => {
      // Arrange
      // Act
      // Assert
    });

    it('should handle edge case', () => {
      // Test edge cases
    });

    it('should handle error case', () => {
      // Test error scenarios
    });
  });
});
```

### Best Practices
1. **Isolation**: Each test should be independent
2. **Clarity**: Test names should clearly describe what is being tested
3. **Focus**: One assertion per test when possible
4. **Speed**: Optimize for fast feedback
5. **Deterministic**: Tests should not be flaky
6. **Documentation**: Tests serve as living documentation

## Test Utilities

### Test Doubles
Located in `helpers/test-doubles/`:
- `InMemoryConfigManager`: In-memory configuration management
- `InMemorySTMManager`: In-memory Simple Task Master (STM) implementation
- `TestProvider`: Controllable provider for testing
- `GitSimulator`: Simulated git operations
- `filesystem.ts`: File system mocking utilities
- `process.ts`: Process environment mocking

### Builders
Located in `helpers/builders/`:
- `TaskBuilder`: Build test STM task objects
- `ConfigBuilder`: Build test configurations
- `ExecutionResultBuilder`: Build execution results
- `TaskContentBuilder`: Build task content with acceptance criteria

### Custom Assertions
Located in `helpers/assertions/`:
- `toBeValidTask()`: Validate STM task structure
- `toHaveExecutedSuccessfully()`: Check execution results
- `toMatchStatisticalBaseline()`: Performance assertions
- `toHaveTaskStatus()`: Check task status transitions

## Migration Guide

### Migrating from FileManager to STM

AutoAgent has migrated from a file-based issue/plan system to using Simple Task Master (STM). Here's how to update your tests:

#### 1. Replace FileManager with InMemorySTMManager

**Before:**
```typescript
import { InMemoryFileManager } from '../../helpers/test-doubles/in-memory-file-manager';

const fileManager = new InMemoryFileManager();
fileManager.addIssue(1, { title: 'Test Issue' });
```

**After:**
```typescript
import { InMemorySTMManager } from '../../helpers/test-doubles/in-memory-stm-manager';

const stmManager = new InMemorySTMManager();
await stmManager.createTask('Test Issue', {
  description: 'Issue description',
  technicalDetails: 'Technical implementation details'
});
```

#### 2. Update Test Patterns

**Creating Tasks:**
```typescript
// Create a task with full content
const taskId = await stmManager.createTask('Implement Feature X', {
  description: 'Add new feature to support X',
  technicalDetails: 'Use pattern Y for implementation',
  implementationPlan: '1. Step one\n2. Step two',
  acceptanceCriteria: [
    'Feature works as expected',
    'Tests pass',
    'Documentation updated'
  ],
  testingStrategy: 'Unit and integration tests',
  verificationSteps: 'Run npm test',
  tags: ['feature', 'high-priority']
});
```

**Querying Tasks:**
```typescript
// Get a specific task
const task = await stmManager.getTask(taskId);

// List all tasks
const allTasks = await stmManager.listTasks();

// Filter tasks by status
const pendingTasks = await stmManager.listTasks({ status: 'pending' });

// Search tasks
const matchingTasks = await stmManager.searchTasks('feature', {
  status: 'in-progress',
  tags: ['high-priority']
});
```

**Updating Task Status:**
```typescript
// Mark as in progress
await stmManager.markTaskInProgress(taskId);

// Mark as complete
await stmManager.markTaskComplete(taskId);

// Custom status update
await stmManager.updateTaskStatus(taskId, 'done');
```

#### 3. Test Double Features

The `InMemorySTMManager` provides additional methods for testing:

```typescript
// Reset all tasks
stmManager.reset();

// Get all tasks (for assertions)
const allTasks = stmManager.getAllTasks();

// Set next task ID (for predictable testing)
stmManager.setNextId(100);

// Simulate initialization failure
stmManager.setInitializationError(new Error('STM not available'));

// Check initialization status
const isReady = stmManager.isInitialized();
```

### Migration Examples

#### Example 1: Simple Task Creation Test

**Before (FileManager):**
```typescript
const fileManager = new InMemoryFileManager();
fileManager.addIssue(1, {
  title: 'Fix login bug',
  description: 'Users cannot login',
  status: 'pending'
});
const issue = fileManager.getIssue(1);
expect(issue.title).toBe('Fix login bug');
```

**After (STM):**
```typescript
const stmManager = new InMemorySTMManager();
const taskId = await stmManager.createTask('Fix login bug', {
  description: 'Users cannot login'
});
const task = await stmManager.getTask(taskId);
expect(task?.title).toBe('Fix login bug');
expect(task?.status).toBe('pending');
```

#### Example 2: Status Update Test

**Before (FileManager):**
```typescript
fileManager.updateIssueStatus(1, 'in_progress');
const issue = fileManager.getIssue(1);
expect(issue.status).toBe('in_progress');
```

**After (STM):**
```typescript
await stmManager.markTaskInProgress(taskId);
const task = await stmManager.getTask(taskId);
expect(task?.status).toBe('in-progress');
```

#### Example 3: Filtering Tasks

**Before (FileManager):**
```typescript
const pendingIssues = fileManager.getIssuesByStatus('pending');
expect(pendingIssues.length).toBe(2);
```

**After (STM):**
```typescript
const pendingTasks = await stmManager.listTasks({ status: 'pending' });
expect(pendingTasks).toHaveLength(2);
```

### Migrating Test Structure

If you're migrating tests from the old structure:

1. **Replace issue/plan references**: Convert to STM task terminology
2. **Update mocking patterns**: Use InMemorySTMManager instead of file-based mocks
3. **Fix imports**: Update paths for new test double location
4. **Review task lifecycle**: Ensure tests follow STM status transitions
5. **Update assertions**: Check for STM task properties instead of file properties

## STM Testing Best Practices

### 1. Shared STM Instance

Create a shared STM manager instance when testing components that interact:

```typescript
// Create a shared instance
const sharedSTMManager = new InMemorySTMManager();

// Mock the STMManager constructor
vi.mock('../../../src/utils/stm-manager', () => ({
  STMManager: vi.fn(() => sharedSTMManager)
}));
```

### 2. Task Content Patterns

**Minimal Task:**
```typescript
await stmManager.createTask('Quick Fix', {
  description: 'Fix the bug in module X'
});
```

**Detailed Task:**
```typescript
await stmManager.createTask('Complex Feature', {
  description: 'Implement new authentication system',
  technicalDetails: `
    - Use JWT tokens
    - Implement refresh token rotation
    - Add rate limiting
  `,
  implementationPlan: `
    1. Create auth middleware
    2. Implement token generation
    3. Add validation endpoints
    4. Write tests
  `,
  acceptanceCriteria: [
    'Users can log in',
    'Tokens expire after 1 hour',
    'Refresh tokens work correctly',
    'Rate limiting prevents brute force'
  ],
  testingStrategy: 'Unit tests for auth logic, integration tests for endpoints',
  verificationSteps: 'Run auth test suite: npm run test:auth',
  tags: ['security', 'backend', 'high-priority']
});
```

### 3. Common Testing Scenarios

**Testing Task Creation:**
```typescript
it('should create task with acceptance criteria', async () => {
  const taskId = await stmManager.createTask('New Feature', {
    description: 'Add user preferences',
    acceptanceCriteria: [
      'Users can save preferences',
      'Preferences persist across sessions'
    ]
  });
  
  const task = await stmManager.getTask(taskId);
  expect(task).toBeDefined();
  expect(task?.title).toBe('New Feature');
  expect(task?.content).toContain('Users can save preferences');
});
```

**Testing Status Transitions:**
```typescript
it('should track task lifecycle', async () => {
  const taskId = await stmManager.createTask('Task Lifecycle Test', {
    description: 'Test task'
  });
  
  // Initial status
  let task = await stmManager.getTask(taskId);
  expect(task?.status).toBe('pending');
  
  // Start work
  await stmManager.markTaskInProgress(taskId);
  task = await stmManager.getTask(taskId);
  expect(task?.status).toBe('in-progress');
  
  // Complete
  await stmManager.markTaskComplete(taskId);
  task = await stmManager.getTask(taskId);
  expect(task?.status).toBe('done');
});
```

**Testing Search and Filters:**
```typescript
it('should filter tasks by criteria', async () => {
  // Create test data
  await stmManager.createTask('Frontend Task', {
    description: 'UI work',
    tags: ['frontend', 'ui']
  });
  
  await stmManager.createTask('Backend Task', {
    description: 'API work',
    tags: ['backend', 'api']
  });
  
  // Test tag filtering
  const frontendTasks = await stmManager.listTasks({
    tags: ['frontend']
  });
  expect(frontendTasks).toHaveLength(1);
  expect(frontendTasks[0].title).toBe('Frontend Task');
  
  // Test search
  const apiTasks = await stmManager.searchTasks('API');
  expect(apiTasks).toHaveLength(1);
  expect(apiTasks[0].title).toBe('Backend Task');
});
```

### 4. Error Handling

```typescript
it('should handle invalid task ID', async () => {
  await expect(stmManager.getTask('invalid')).resolves.toBeNull();
  
  await expect(stmManager.updateTask('999', { status: 'done' }))
    .rejects.toThrow('Task with ID 999 not found');
});

it('should handle initialization errors', async () => {
  stmManager.setInitializationError(new Error('STM unavailable'));
  
  await expect(stmManager.createTask('Test', { description: 'Test' }))
    .rejects.toThrow('Failed to initialize STM TaskManager');
});
```

### 5. Troubleshooting

#### Preventing STM Task Pollution

**CRITICAL**: Always use `InMemorySTMManager` for unit tests, never the real `STMManager` class. The real STMManager would interfere with the project's actual STM tasks used for development.

**DO NOT** delete STM tasks manually - the project uses STM for its own task management!

#### Safe Test Task Cleanup for Integration Tests

When integration tests need to use real STMManager:

```typescript
import { cleanupTestTasks, addTestTags } from '../helpers/stm-test-cleanup';
import { STMManager } from '../../src/utils/stm-manager';

describe('Integration Test with Real STM', () => {
  afterAll(() => {
    // Clean up any test tasks created during this test suite
    cleanupTestTasks();
  });

  it('should create a task with test tags', async () => {
    const stmManager = new STMManager();
    await stmManager.createTask('Test Task', {
      description: 'Test description',
      tags: addTestTags(['feature', 'test']) // Always add test tags!
    });
  });
});
```

**Manual Test Task Identification** (for debugging only):

```bash
# List only test tasks (safe to identify)
stm list --tags autoagent-test-only

# Count test tasks
stm list --tags autoagent-test-only | wc -l

# If you absolutely must clean up test tasks manually (use with extreme caution):
stm list --tags autoagent-test-only -f json | jq -r '.[].id' | xargs -I {} stm delete {}
```

**Task files in project root** (always safe to remove):
```bash
# Check for task files accidentally created in project root
ls [0-9]*-*.md 2>/dev/null | wc -l

# Remove any task files from project root only
rm -f [0-9]*-*.md
```

**Prevention is the best approach**:
- Tests MUST use `InMemorySTMManager` exclusively
- Tests MUST NOT import or instantiate real `STMManager`
- E2E tests MUST use isolated temporary directories
- All test tasks are tagged with `autoagent-test-only` for identification

#### Test Cleanup Best Practices

**Tests must clean up after themselves**:

1. **InMemorySTMManager** - Automatically cleans up (in-memory only)
   ```typescript
   beforeEach(() => {
     stmManager = new InMemorySTMManager();
   });
   
   afterEach(() => {
     stmManager.reset(); // Clear all in-memory tasks
   });
   ```

2. **E2E Tests** - Use temporary directories that auto-cleanup
   ```typescript
   const context = setupE2ETest(); // Creates temp directory
   // Test runs in isolated directory
   // Automatically cleaned up in afterEach
   ```

3. **Never use real STMManager** in tests - it would:
   - Interfere with project's actual STM tasks
   - Create persistent tasks that can't be safely cleaned
   - Break test isolation

#### Test Isolation Rules

1. **Unit Tests**: Always use `InMemorySTMManager` - never import real `STMManager`
2. **E2E Tests**: Use isolated workspace directories with `initializeSTM()`
3. **Integration Tests**: Mock STM dependencies completely
4. **Examples**: Should not create persistent tasks

#### Common Problems

**Common Issues:**

1. **Tasks not persisting between tests**
   - Solution: Use a shared STM instance or explicitly pass the instance

2. **Unexpected task IDs**
   - Solution: Call `stmManager.reset()` in `beforeEach`
   - Or use `setNextId()` for predictable IDs

3. **Missing task content**
   - Solution: STM formats content as markdown; check the `content` field

4. **Status validation errors**
   - Solution: Use valid STM statuses: 'pending', 'in-progress', 'done'
   - Note: 'completed' is mapped to 'done'

## Continuous Integration

Tests are organized for efficient CI execution:

1. **PR Tests**: Smoke + Unit + Integration (fast feedback)
2. **Merge Tests**: All tests including E2E
3. **Nightly**: Full test suite including performance
4. **Release**: All tests with extended scenarios

This structure provides clear separation of concerns, faster test execution, and better maintainability.