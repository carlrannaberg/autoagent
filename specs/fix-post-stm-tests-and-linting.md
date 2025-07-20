# Post-STM Migration Test and Linting Fixes

**Status**: Draft  
**Authors**: Claude Assistant  
**Date**: 2025-01-20  

## Overview

This specification outlines the comprehensive update of test suite and resolution of linting issues following the migration from file-based issues/plans to Simple Task Master (STM). The migration replaced ~1000 lines of FileManager code with a lightweight STMManager wrapper, but left many tests and linting issues that need to be addressed.

## Background/Problem Statement

The recent STM migration successfully transformed the core architecture but introduced several immediate challenges:

1. **Test Suite Failures**: All tests referencing FileManager, validators, or the old issue/plan system are now broken
2. **ESLint Violations**: 42+ strict mode violations in source files blocking the build
3. **E2E Test Incompatibility**: End-to-end tests expect file-based issues/plans that no longer exist
4. **Missing Test Infrastructure**: No test doubles exist for STMManager, making testing difficult
5. **Example Code Outdated**: Example files still reference deprecated FileManager APIs

These issues prevent the release process and CI/CD pipeline from functioning correctly.

## Goals

- ✅ Fix all ESLint violations in source code to unblock builds
- ✅ Create comprehensive test doubles for STM integration
- ✅ Update all unit tests to work with STM instead of FileManager
- ✅ Rewrite E2E tests to align with new STM-based workflow
- ✅ Update or remove outdated example code
- ✅ Achieve 100% test pass rate and clean linting
- ✅ Maintain existing test coverage levels (>80%)

## Non-Goals

- ❌ Adding new features or functionality
- ❌ Changing the STM integration architecture
- ❌ Modifying STMManager's core implementation
- ❌ Updating documentation beyond test-related changes
- ❌ Performance optimizations beyond fixing immediate issues

## Technical Dependencies

- **Vitest**: 3.2.4 (existing test framework)
- **TypeScript**: 5.4.2 with strict mode enabled
- **ESLint**: 8.57.0 with TypeScript plugin
- **simple-task-master**: 0.1.1 (already integrated)
- **Commander.js**: 12.1.0 (for CLI testing)

## Detailed Design

### 1. ESLint Fixes Strategy

#### Strict Boolean Expressions
Fix conditional checks to handle nullish cases explicitly:

```typescript
// Before
if (options.debug) { ... }
if (taskId) { ... }

// After
if (options.debug === true) { ... }
if (taskId !== undefined && taskId !== '') { ... }
```

#### Type Safety Improvements
Replace unsafe any types and assertions:

```typescript
// Before
private async buildTaskContext(task: any): Promise<string> { ... }

// After
import { Task } from 'simple-task-master';
private async buildTaskContext(task: Task): Promise<string> { ... }
```

#### Function Return Types
Add explicit return types where missing:

```typescript
// Before
async getTask(taskId: string) { ... }

// After
async getTask(taskId: string): Promise<Task | null> { ... }
```

### 2. Test Double Architecture

Create `InMemorySTMManager` test double:

```typescript
export class InMemorySTMManager implements STMManager {
  private tasks: Map<string, Task> = new Map();
  private nextId: number = 1;

  async createTask(title: string, content: TaskContent): Promise<string> {
    const id = this.nextId.toString();
    const task: Task = {
      id: this.nextId++,
      title,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.tasks.set(id, task);
    return id;
  }

  async getTask(taskId: string): Promise<Task | null> {
    return this.tasks.get(taskId) || null;
  }

  async listTasks(filters?: TaskListFilters): Promise<Task[]> {
    const tasks = Array.from(this.tasks.values());
    if (!filters) return tasks;
    
    return tasks.filter(task => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.tags && !filters.tags.every(tag => task.tags?.includes(tag))) return false;
      return true;
    });
  }

  async updateTaskStatus(taskId: string, status: string): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task) throw new Error(`Task not found: ${taskId}`);
    
    task.status = status as 'pending' | 'in-progress' | 'done';
    task.updated_at = new Date().toISOString();
  }

  // Additional methods for testing
  reset(): void {
    this.tasks.clear();
    this.nextId = 1;
  }

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }
}
```

### 3. Unit Test Migration Pattern

Transform FileManager tests to STM tests:

```typescript
// Before
describe('AutonomousAgent with FileManager', () => {
  let fileManager: InMemoryFileManager;
  
  beforeEach(() => {
    fileManager = new InMemoryFileManager('/test');
  });

  it('should create an issue', async () => {
    const issueNumber = fileManager.createIssue({ title: 'Test' });
    expect(issueNumber).toBe(1);
  });
});

// After
describe('AutonomousAgent with STM', () => {
  let stmManager: InMemorySTMManager;
  
  beforeEach(() => {
    stmManager = new InMemorySTMManager();
  });

  it('should create a task', async () => {
    const taskId = await stmManager.createTask('Test', {
      description: 'Test task',
      technicalDetails: '',
      implementationPlan: '',
      acceptanceCriteria: []
    });
    expect(taskId).toBe('1');
  });
});
```

### 4. E2E Test Transformation

Update E2E tests for STM workflow:

```typescript
// Before
it('should bootstrap project with issues and plans', async () => {
  const result = await runCLI(['bootstrap', '--spec', 'test.md']);
  const issues = await fs.readdir(path.join(testDir, 'issues'));
  expect(issues.length).toBe(3);
});

// After
it('should bootstrap project with STM tasks', async () => {
  const result = await runCLI(['bootstrap', '--spec', 'test.md']);
  const stmDir = path.join(testDir, '.autoagent', 'stm-tasks');
  
  // STM creates its own structure, verify through API
  const listResult = await runCLI(['list']);
  expect(listResult.stdout).toContain('3 tasks found');
});
```

### 5. Mock Strategy Updates

Update provider mocks to work with new interfaces:

```typescript
// Mock STMManager instead of FileManager
vi.mock('@/utils/stm-manager', () => ({
  STMManager: vi.fn(() => new InMemorySTMManager())
}));

// Update provider mocks for string return type
const mockProvider = {
  execute: vi.fn().mockResolvedValue('Task completed successfully'),
  checkAvailability: vi.fn().mockResolvedValue(true),
  getName: vi.fn().mockReturnValue('mock')
};
```

## User Experience

Users will experience:
- **Restored CI/CD Pipeline**: Tests pass again, allowing releases
- **Clean Build Output**: No linting errors blocking development
- **Reliable Testing**: Test suite accurately reflects STM behavior
- **Better Examples**: Updated example code showing STM usage

No changes to end-user CLI functionality.

## Testing Strategy

### Unit Tests
- **Test Double Validation**: Ensure InMemorySTMManager correctly mimics STMManager
- **Mock Verification**: Validate all mocks align with actual interfaces
- **Coverage Maintenance**: Keep coverage above 80% threshold

Each test should include:
```typescript
it('should handle task not found gracefully', async () => {
  // Purpose: Verify proper error handling when STM task doesn't exist
  // This ensures the agent doesn't crash on invalid task IDs
  const agent = new AutonomousAgent();
  await expect(agent.executeTask('invalid-id')).rejects.toThrow('Task not found');
});
```

### Integration Tests
- Test STMManager with actual STM library (using temp directories)
- Verify proper file system interactions
- Test error scenarios (corrupted data, missing files)

### E2E Tests
- Full CLI workflow: create → list → run → status
- Multi-task execution scenarios
- Provider failover with STM tasks
- Error handling and recovery

### Edge Case Testing
- Empty task lists
- Malformed task IDs
- Concurrent task updates
- STM initialization failures
- File system permission issues

## Performance Considerations

- **Test Execution Speed**: InMemorySTMManager should be faster than file-based tests
- **Memory Usage**: Keep test double data structures lightweight
- **Parallel Test Execution**: Ensure test isolation for parallel runs
- **CI/CD Pipeline**: Optimize test order for fail-fast behavior

## Security Considerations

- **Test Data Isolation**: Ensure tests don't leak sensitive data
- **Temporary File Cleanup**: Remove all test artifacts after runs
- **Mock Data Sanitization**: Don't include real API keys in test mocks
- **File System Boundaries**: Tests should only write to designated temp directories

## Documentation

Updates required:
1. **Test README**: Document new test double usage
2. **Contributing Guide**: Update testing guidelines for STM
3. **Example Updates**: Rewrite examples to show STM patterns
4. **API Documentation**: Update for changed interfaces

## Implementation Phases

### Phase 1: Critical Fixes (Immediate)
1. Fix all ESLint errors in source files
2. Create InMemorySTMManager test double
3. Update AutonomousAgent tests to use STM
4. Fix broken imports and type references

### Phase 2: Test Suite Migration (1-2 days)
1. Update all unit tests referencing FileManager
2. Migrate E2E tests to STM workflow
3. Update test helpers and utilities
4. Fix or remove broken example code

### Phase 3: Polish and Verification (1 day)
1. Achieve 100% test pass rate
2. Verify test coverage maintained
3. Update documentation
4. Run full CI/CD pipeline validation

## Open Questions

1. **Test Data Format**: Should we create fixtures for common STM task scenarios?
2. **Performance Tests**: Do performance tests need updating for STM?
3. **Contract Tests**: Should we add contract tests between STMManager and STM library?
4. **Example Maintenance**: Should examples be moved to a separate repository?

## References

- [Vitest Documentation](https://vitest.dev/)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [ESLint TypeScript Rules](https://typescript-eslint.io/rules/)
- [Simple Task Master API](https://github.com/STM/docs)
- Original STM Migration Spec: `/specs/feat-migrate-to-stm.md`
- STM Migration Tasks: `/specs/feat-migrate-to-stm-tasks.md`

## Validation Checklist

- [x] **Problem Statement**: Specific issues identified with counts and examples
- [x] **Technical Requirements**: All dependencies are already in package.json
- [x] **Implementation Plan**: Phased approach with clear priorities
- [x] **Testing Strategy**: Comprehensive with meaningful test examples
- [x] **Quality Score**: 9/10 - Detailed, actionable, and implementable