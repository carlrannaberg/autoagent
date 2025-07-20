# Task Breakdown: Post-STM Migration Test and Linting Fixes

Generated: 2025-01-20  
Source: /specs/fix-post-stm-tests-and-linting.md

## Overview

This task breakdown addresses critical post-migration issues: 42+ ESLint violations blocking builds, broken test suite referencing removed FileManager, missing STM test infrastructure, and outdated E2E tests. The work is organized into three phases focusing on immediate build fixes, comprehensive test migration, and final verification.

## Phase 1: Critical Fixes (Foundation)

### Task 1.1: Fix ESLint Strict Boolean Expression Errors
**Description**: Fix all strict boolean expression errors in source files to unblock builds
**Size**: Medium
**Priority**: High
**Dependencies**: None
**Can run parallel with**: Task 1.2

**Technical Requirements**:
- Fix conditional checks in create.ts, list.ts, run.ts, autonomous-agent.ts
- Handle nullish cases explicitly as per TypeScript strict mode
- Update approximately 20 boolean expression errors

**Implementation Steps**:
1. Fix options.debug checks: Change `if (options.debug)` to `if (options.debug === true)`
2. Fix string checks: Change `if (taskId)` to `if (taskId !== undefined && taskId !== '')`
3. Fix number checks: Handle zero/NaN cases for completionConfidence and maxRetryAttempts
4. Run `npm run lint` after each file to verify fixes

**Code Examples from Spec**:
```typescript
// Fix in run.ts
if (options.debug === true) { // was: if (options.debug)
  Logger.setDebugEnabled(true);
}

// Fix in autonomous-agent.ts
if (taskId !== undefined && taskId !== '') { // was: if (taskId)
  // process taskId
}
```

**Acceptance Criteria**:
- [ ] All strict boolean expression errors resolved
- [ ] `npm run lint` passes for all source files
- [ ] No new type errors introduced
- [ ] Code behavior unchanged (only syntax updates)

### Task 1.2: Fix Missing Return Types and Type Safety Issues
**Description**: Add explicit return types and fix any type usage in source files
**Size**: Small
**Priority**: High
**Dependencies**: None
**Can run parallel with**: Task 1.1

**Technical Requirements**:
- Add return type to getTask method in autonomous-agent.ts
- Replace `any` type in buildTaskContext with proper Task type
- Import Task type from simple-task-master

**Implementation Steps**:
1. Add return type: `async getTask(taskId: string): Promise<Task | null>`
2. Import Task type: `import { Task } from 'simple-task-master'`
3. Update buildTaskContext: `private async buildTaskContext(task: Task): Promise<string>`
4. Verify no type errors with `npm run typecheck`

**Acceptance Criteria**:
- [ ] All functions have explicit return types
- [ ] No `any` types remain in source code
- [ ] Type imports are correct and working
- [ ] TypeScript compilation succeeds

### Task 1.3: Create InMemorySTMManager Test Double
**Description**: Build comprehensive test double for STMManager to enable unit testing
**Size**: Large
**Priority**: High
**Dependencies**: Task 1.2 (for proper types)
**Can run parallel with**: None

**Technical Requirements**:
- Implement all STMManager methods with in-memory storage
- Support task creation, retrieval, listing, and status updates
- Include test-specific helper methods (reset, getAllTasks)
- Match STM's actual API behavior (numeric IDs, status values)

**Implementation from Spec**:
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

  // Test helpers
  reset(): void {
    this.tasks.clear();
    this.nextId = 1;
  }

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }
}
```

**Acceptance Criteria**:
- [ ] Test double implements all STMManager public methods
- [ ] In-memory storage correctly simulates STM behavior
- [ ] Helper methods facilitate test setup and verification
- [ ] Unit tests for test double itself pass
- [ ] Can be used as drop-in replacement in tests

### Task 1.4: Update Test Mocks and Imports
**Description**: Fix all test file imports and mocks to reference STM instead of FileManager
**Size**: Medium
**Priority**: High
**Dependencies**: Task 1.3
**Can run parallel with**: None

**Technical Requirements**:
- Replace FileManager mocks with STMManager mocks
- Update import paths from removed modules
- Fix provider mock return types (string instead of ExecutionResult)

**Implementation Steps**:
1. Replace all `vi.mock('@/utils/file-manager')` with `vi.mock('@/utils/stm-manager')`
2. Update mock implementations to return InMemorySTMManager
3. Fix provider mocks to return strings: `execute: vi.fn().mockResolvedValue('Success')`
4. Remove imports from deleted modules (validators, FileManager, etc.)

**Mock Update Pattern**:
```typescript
// Replace this:
vi.mock('@/utils/file-manager', () => ({
  FileManager: vi.fn(() => new InMemoryFileManager())
}));

// With this:
vi.mock('@/utils/stm-manager', () => ({
  STMManager: vi.fn(() => new InMemorySTMManager())
}));
```

**Acceptance Criteria**:
- [ ] All test files import correctly
- [ ] Mocks reference existing modules only
- [ ] Provider mocks match new interface
- [ ] No import errors when running tests

## Phase 2: Test Suite Migration

### Task 2.1: Migrate AutonomousAgent Unit Tests
**Description**: Update all AutonomousAgent tests to work with STM instead of FileManager
**Size**: Large
**Priority**: High
**Dependencies**: Task 1.3, Task 1.4
**Can run parallel with**: Task 2.2, 2.3

**Technical Requirements**:
- Replace issue/plan creation with task creation
- Update test assertions for STM behavior
- Ensure all agent methods are tested with STM

**Test Migration Pattern**:
```typescript
// Before
it('should create an issue', async () => {
  const issueNumber = fileManager.createIssue({ title: 'Test' });
  expect(issueNumber).toBe(1);
});

// After
it('should create a task', async () => {
  const taskId = await stmManager.createTask('Test', {
    description: 'Test task',
    technicalDetails: '',
    implementationPlan: '',
    acceptanceCriteria: []
  });
  expect(taskId).toBe('1');
});
```

**Acceptance Criteria**:
- [ ] All AutonomousAgent tests pass
- [ ] Test coverage maintained at >80%
- [ ] Tests verify STM integration correctly
- [ ] Error scenarios properly tested

### Task 2.2: Update Provider Tests for New Interface
**Description**: Migrate provider tests to expect string returns instead of ExecutionResult
**Size**: Medium
**Priority**: High
**Dependencies**: Task 1.4
**Can run parallel with**: Task 2.1, 2.3

**Technical Requirements**:
- Update ClaudeProvider tests
- Update GeminiProvider tests
- Update MockProvider implementation
- Fix provider interface expectations

**Implementation Steps**:
1. Change provider execute return type expectations from ExecutionResult to string
2. Update test assertions to check string output
3. Remove ExecutionResult property checks
4. Ensure error handling still works correctly

**Acceptance Criteria**:
- [ ] All provider tests pass
- [ ] String return type properly tested
- [ ] Error scenarios return error strings
- [ ] Provider availability checks unchanged

### Task 2.3: Migrate CLI Command Tests
**Description**: Update tests for create, list, run, and status commands to use STM
**Size**: Medium
**Priority**: High
**Dependencies**: Task 1.4
**Can run parallel with**: Task 2.1, 2.2

**Technical Requirements**:
- Update create command tests for task creation
- Fix list command tests for STM task listing
- Update run command tests for task execution
- Migrate status command tests

**Acceptance Criteria**:
- [ ] All CLI command tests pass
- [ ] Commands correctly interact with STM
- [ ] Error handling properly tested
- [ ] CLI output matches new format

### Task 2.4: Rewrite E2E Tests for STM Workflow
**Description**: Transform end-to-end tests from file-based to STM-based verification
**Size**: Large
**Priority**: Medium
**Dependencies**: Task 2.1, 2.2, 2.3
**Can run parallel with**: Task 2.5

**Technical Requirements**:
- Remove file system checks for issues/plans directories
- Use CLI commands to verify task creation
- Update bootstrap command expectations
- Fix workflow tests for STM

**E2E Test Pattern from Spec**:
```typescript
// After
it('should bootstrap project with STM tasks', async () => {
  const result = await runCLI(['bootstrap', '--spec', 'test.md']);
  const stmDir = path.join(testDir, '.autoagent', 'stm-tasks');
  
  // STM creates its own structure, verify through API
  const listResult = await runCLI(['list']);
  expect(listResult.stdout).toContain('3 tasks found');
});
```

**Acceptance Criteria**:
- [ ] E2E tests reflect actual STM workflow
- [ ] Bootstrap tests work with STM
- [ ] Multi-task execution tests pass
- [ ] Error scenarios properly handled

### Task 2.5: Update Test Helpers and Utilities
**Description**: Migrate test helper functions and utilities to support STM
**Size**: Small
**Priority**: Medium
**Dependencies**: Task 1.3
**Can run parallel with**: Task 2.4

**Technical Requirements**:
- Update test setup helpers
- Fix test data generators for tasks
- Remove references to issues/plans
- Create STM-specific test utilities

**Acceptance Criteria**:
- [ ] All test helpers work with STM
- [ ] No references to removed code
- [ ] Utilities properly typed
- [ ] Reusable across test suites

### Task 2.6: Fix or Remove Outdated Examples
**Description**: Update example files to use STM instead of FileManager
**Size**: Small
**Priority**: Low
**Dependencies**: None
**Can run parallel with**: Any task

**Technical Requirements**:
- Fix plan-creation.ts example
- Update task-status-reporter-example.ts
- Remove FileManager usage
- Add new STM usage examples

**Acceptance Criteria**:
- [ ] Examples use STM correctly
- [ ] No references to removed APIs
- [ ] Examples run without errors
- [ ] Demonstrate best practices

## Phase 3: Polish and Verification

### Task 3.1: Achieve 100% Test Pass Rate
**Description**: Fix any remaining test failures and ensure all tests pass
**Size**: Medium
**Priority**: High
**Dependencies**: All Phase 2 tasks
**Can run parallel with**: None

**Technical Requirements**:
- Run full test suite with `npm test`
- Fix any remaining failures
- Ensure consistent pass rate
- No flaky tests

**Acceptance Criteria**:
- [ ] `npm test` passes with 0 failures
- [ ] No skipped tests without justification
- [ ] Tests run reliably in CI
- [ ] No test timeouts

### Task 3.2: Verify Test Coverage Maintained
**Description**: Ensure test coverage remains above 80% threshold
**Size**: Small
**Priority**: Medium
**Dependencies**: Task 3.1
**Can run parallel with**: Task 3.3

**Technical Requirements**:
- Run `npm run test:coverage`
- Identify any coverage gaps
- Add tests for uncovered code
- Maintain quality standards

**Acceptance Criteria**:
- [ ] Overall coverage >80%
- [ ] Critical paths fully covered
- [ ] New code has tests
- [ ] Coverage report generated

### Task 3.3: Update Test Documentation
**Description**: Document new test patterns and STM test double usage
**Size**: Small
**Priority**: Low
**Dependencies**: Task 3.1
**Can run parallel with**: Task 3.2

**Technical Requirements**:
- Update test README
- Document InMemorySTMManager usage
- Add STM testing guidelines
- Include example patterns

**Acceptance Criteria**:
- [ ] README reflects current testing approach
- [ ] STM test double documented
- [ ] Migration guide for contributors
- [ ] Examples included

### Task 3.4: Full CI/CD Pipeline Validation
**Description**: Verify entire build and release pipeline works with fixes
**Size**: Small
**Priority**: High
**Dependencies**: Task 3.1, 3.2
**Can run parallel with**: None

**Technical Requirements**:
- Run `npm run check` successfully
- Verify GitHub Actions would pass
- Test release script functionality
- Ensure no blocking issues

**Acceptance Criteria**:
- [ ] All quality checks pass
- [ ] Build completes without errors
- [ ] Linting shows no violations
- [ ] Ready for release

## Summary

**Total Tasks**: 14
**Phase 1 (Critical)**: 4 tasks - Focus on unblocking builds
**Phase 2 (Migration)**: 6 tasks - Comprehensive test updates
**Phase 3 (Polish)**: 4 tasks - Final verification and documentation

**Execution Strategy**:
1. Start with Phase 1 tasks 1.1 and 1.2 in parallel (ESLint fixes)
2. Complete Task 1.3 (InMemorySTMManager) as foundation
3. Execute Phase 2 tasks in parallel where possible
4. Sequential execution for Phase 3 verification

**Estimated Timeline**:
- Phase 1: 1 day (critical for unblocking)
- Phase 2: 2-3 days (bulk of migration work)
- Phase 3: 1 day (verification and polish)

**Risk Mitigation**:
- InMemorySTMManager is critical path - prioritize completion
- Run tests frequently during migration to catch issues early
- Keep existing tests as reference during migration