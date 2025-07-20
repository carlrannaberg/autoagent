# Task Breakdown: Migrate from Homegrown Issues/Plans to STM (Simple Task Master)

Generated: 2025-07-19
Source: specs/feat-migrate-to-stm.md

## Overview

This task breakdown implements a clean-cut replacement of AutoAgent's homegrown issues/plans management system with STM (Simple Task Master). The migration will eliminate ~1000 lines of custom file management code and replace it with a lightweight ~100-line STM wrapper that leverages STM's proven task management capabilities.

## Phase 1: Foundation (1-2 days)

### Task 1.1: Add STM as npm dependency
**Description**: Add STM to package.json and verify programmatic API access
**Size**: Small
**Priority**: High
**Dependencies**: None
**Can run parallel with**: Task 1.2

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Add `simple-task-master: "^0.1.1"` to dependencies in package.json
- Verify TaskManager class can be imported from 'simple-task-master'
- Ensure TypeScript types are available
- Test basic TaskManager.create() functionality

**Implementation Steps**:
1. Update package.json with STM dependency
2. Run npm install to verify installation
3. Create basic test file to verify import works
4. Test TaskManager.create() returns valid instance

**Acceptance Criteria**:
- [ ] STM dependency added to package.json
- [ ] npm install succeeds without errors
- [ ] TaskManager can be imported successfully
- [ ] Basic TaskManager.create() test passes
- [ ] TypeScript compilation works with STM types

### Task 1.2: Create TaskContent interface definition
**Description**: Define TypeScript interfaces for task content structure
**Size**: Small
**Priority**: High
**Dependencies**: None
**Can run parallel with**: Task 1.1

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
```typescript
interface TaskContent {
  description: string;
  technicalDetails: string;
  implementationPlan: string;
  acceptanceCriteria: string[];
  testingStrategy?: string;
  verificationSteps?: string;
  tags?: string[];
}
```

**Implementation Steps**:
1. Create `src/types/stm-types.ts` file
2. Define TaskContent interface with all required fields
3. Export interface for use across project
4. Add JSDoc comments for each field

**Acceptance Criteria**:
- [ ] TaskContent interface defined with all required fields
- [ ] Interface exported from types module
- [ ] JSDoc documentation added for clarity
- [ ] TypeScript compilation succeeds
- [ ] Interface matches spec requirements exactly

### Task 1.3: Implement STMManager class foundation
**Description**: Create STMManager class with basic structure and initialization
**Size**: Medium
**Priority**: High
**Dependencies**: Task 1.1, Task 1.2
**Can run parallel with**: None

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Create `src/utils/stm-manager.ts` with STMManager class
- Implement lazy initialization pattern with ensureInitialized()
- Add proper error handling for TaskManager.create() failures
- Include comprehensive TypeScript typing

**Implementation Steps**:
1. Create STMManager class with private taskManager property
2. Implement ensureInitialized() method with error handling
3. Add proper imports for TaskManager and types
4. Implement basic error handling patterns

**Acceptance Criteria**:
- [ ] STMManager class created in src/utils/stm-manager.ts
- [ ] Lazy initialization implemented correctly
- [ ] Proper error handling for STM failures
- [ ] TypeScript types correctly defined
- [ ] ensureInitialized() handles edge cases

## Phase 2: Core STM Integration (2-3 days)

### Task 2.1: Implement task creation with content formatting
**Description**: Implement createTask method with STM section formatting
**Size**: Large
**Priority**: High
**Dependencies**: Task 1.3
**Can run parallel with**: None

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Implement createTask() method that accepts title and TaskContent
- Format content into STM's description/details/validation sections
- Use STM's actual section definitions: "Why & what", "How", "Validation"
- Handle errors and return task ID as string

**Implementation example from spec**:
```typescript
async createTask(title: string, content: TaskContent): Promise<string> {
  await this.ensureInitialized();
  
  try {
    const input: TaskCreateInput = {
      title,
      description: this.formatDescription(content),
      details: this.formatDetails(content), 
      validation: this.formatValidation(content),
      tags: ['autoagent', ...(content.tags || [])],
      status: 'pending'
    };
    
    const task = await this.taskManager!.create(input);
    return task.id.toString();
  } catch (error) {
    throw new Error(`Failed to create STM task "${title}": ${error.message}`);
  }
}
```

**Content formatting methods to implement**:
- formatDescription(): Maps description + acceptance criteria
- formatDetails(): Maps technical details + implementation plan  
- formatValidation(): Maps testing strategy + verification steps

**Acceptance Criteria**:
- [ ] createTask method implemented with proper error handling
- [ ] Content formatted according to STM section definitions
- [ ] All three formatting methods (description/details/validation) work correctly
- [ ] Task creation returns valid STM task ID
- [ ] Error messages are descriptive and helpful
- [ ] Tags include 'autoagent' prefix for filtering

### Task 2.2: Implement task retrieval and listing methods
**Description**: Implement getTask and listTasks methods with error handling
**Size**: Medium
**Priority**: High
**Dependencies**: Task 1.3
**Can run parallel with**: Task 2.1

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Implement getTask(id: string) that returns Task or null
- Implement listTasks(filters) with optional status/tag filtering
- Handle "not found" errors gracefully (return null for getTask)
- Provide detailed error messages for other failures

**Implementation Steps**:
1. Implement getTask() with proper error handling
2. Implement listTasks() with optional filters parameter
3. Handle STM API errors appropriately
4. Add comprehensive error messages

**Acceptance Criteria**:
- [ ] getTask returns Task object for valid IDs
- [ ] getTask returns null for non-existent tasks (not error)
- [ ] listTasks works with and without filters
- [ ] Error handling distinguishes between "not found" and other errors
- [ ] All methods handle STM API failures gracefully

### Task 2.3: Implement task status updates and search
**Description**: Implement updateTaskStatus and searchTasks methods
**Size**: Medium
**Priority**: Medium
**Dependencies**: Task 1.3
**Can run parallel with**: Task 2.1, Task 2.2

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Implement updateTaskStatus() for pending/in-progress/done transitions
- Implement searchTasks() using STM's built-in search
- Handle STM API errors with descriptive messages
- Support STM's regex search capabilities

**Implementation Steps**:
1. Implement updateTaskStatus() with status validation
2. Implement searchTasks() using STM's search API
3. Add proper error handling for all operations
4. Test with actual STM search patterns

**Acceptance Criteria**:
- [ ] updateTaskStatus changes task status correctly
- [ ] searchTasks returns relevant results using STM search
- [ ] Both methods handle STM failures gracefully
- [ ] Status transitions work for all valid states
- [ ] Search supports regex patterns as documented in STM

### Task 2.4: Create comprehensive unit tests for STMManager
**Description**: Create unit tests with STM API mocking and error scenarios
**Size**: Large
**Priority**: High
**Dependencies**: Task 2.1, Task 2.2, Task 2.3
**Can run parallel with**: None

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Mock STM TaskManager API using Vitest
- Test all STMManager methods including error cases
- Verify content formatting works correctly
- Test error handling for various STM failure modes

**Mocking strategy from spec**:
```typescript
vi.mock('simple-task-master', () => ({
  TaskManager: {
    create: vi.fn().mockResolvedValue({
      create: vi.fn().mockResolvedValue({ id: 1, title: 'Test Task' }),
      get: vi.fn().mockResolvedValue({ id: 1, title: 'Test Task', status: 'pending' }),
      list: vi.fn().mockResolvedValue([]),
      update: vi.fn().mockResolvedValue(undefined),
      search: vi.fn().mockResolvedValue([])
    })
  }
}));
```

**Test categories to implement**:
- Happy path tests for all methods
- Error handling tests for STM failures
- Content formatting validation tests
- Edge case tests (empty data, invalid IDs, etc.)

**Acceptance Criteria**:
- [ ] All STMManager methods have unit tests
- [ ] STM TaskManager API properly mocked
- [ ] Error scenarios tested and handled correctly
- [ ] Content formatting tests verify correct STM section mapping
- [ ] Test coverage >90% for STMManager class
- [ ] All tests include purpose comments explaining validation logic

## Phase 3: FileManager Replacement (2-3 days)

### Task 3.1: Update AutonomousAgent to use STMManager
**Description**: Replace FileManager usage in AutonomousAgent with STMManager
**Size**: Large
**Priority**: High
**Dependencies**: Task 2.4
**Can run parallel with**: None

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Replace FileManager import with STMManager in AutonomousAgent
- Update issue creation calls to use STMManager.createTask()
- Remove TODO.md synchronization logic
- Update task status tracking to use STM

**Implementation Steps**:
1. Identify all FileManager usage in AutonomousAgent
2. Replace with equivalent STMManager method calls
3. Remove TODO.md related code
4. Update task tracking to use STM status

**Acceptance Criteria**:
- [ ] AutonomousAgent imports STMManager instead of FileManager
- [ ] All task creation uses STMManager.createTask()
- [ ] TODO.md synchronization code removed
- [ ] Task status updates use STM status tracking
- [ ] No references to FileManager remain in AutonomousAgent

### Task 3.2: Update CLI commands to use STMManager
**Description**: Update create and other CLI commands to use STMManager
**Size**: Medium
**Priority**: High
**Dependencies**: Task 2.4
**Can run parallel with**: Task 3.1

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Update src/cli/commands/create.ts to use STMManager
- Update any other commands that interact with tasks
- Remove FileManager imports from CLI layer
- Ensure CLI output remains consistent

**Implementation example from spec**:
```typescript
// src/cli/commands/create.ts
const stm = new STMManager();
const taskId = await stm.createTask(title, {
  description,
  requirements,
  acceptanceCriteria,
  technicalDetails,
  implementationPlan
});
```

**Acceptance Criteria**:
- [ ] create command uses STMManager instead of FileManager
- [ ] All CLI commands updated to use STM
- [ ] No FileManager imports remain in CLI layer
- [ ] CLI output format remains consistent for users
- [ ] Command functionality preserved exactly

### Task 3.3: Remove FileManager and validation code
**Description**: Delete FileManager, validators, and related legacy code
**Size**: Medium
**Priority**: Medium
**Dependencies**: Task 3.1, Task 3.2
**Can run parallel with**: None

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Delete src/utils/file-manager.ts (~1000 lines)
- Remove validation/ directory with Issue/Plan validators
- Remove embedded templates code
- Clean up imports throughout codebase

**Files to remove**:
- src/utils/file-manager.ts
- src/validation/ (entire directory)
- src/templates/ (if exists)
- Any other FileManager-related utilities

**Acceptance Criteria**:
- [ ] file-manager.ts deleted completely
- [ ] All validation code removed
- [ ] Template code removed
- [ ] No imports reference deleted files
- [ ] TypeScript compilation succeeds after deletion

### Task 3.4: Update existing tests to use STMManager
**Description**: Replace FileManager tests with STMManager equivalents
**Size**: Large
**Priority**: High
**Dependencies**: Task 3.3
**Can run parallel with**: None

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Replace FileManager tests with STMManager tests
- Update integration tests to use STM
- Remove obsolete validation tests
- Ensure test coverage remains >80%

**Test categories to update**:
- Unit tests that used FileManager directly
- Integration tests for task creation/management
- CLI tests that verify task operations
- Remove Issue/Plan validator tests

**Acceptance Criteria**:
- [ ] All FileManager tests replaced with STMManager equivalents
- [ ] Integration tests use STM backend
- [ ] Obsolete validation tests removed
- [ ] Test coverage maintained >80%
- [ ] All tests pass with STM backend

## Phase 4: Documentation and Cleanup (1-2 days)

### Task 4.1: Update README.md with STM requirements
**Description**: Update README.md to document STM dependency and usage
**Size**: Small
**Priority**: Medium
**Dependencies**: Task 3.4
**Can run parallel with**: Task 4.2

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Add STM as a prerequisite in installation section
- Update examples to show new workflow
- Add migration instructions for existing users
- Update any FileManager references

**Content to add**:
- STM installation requirements
- Simple migration instructions (delete old files)
- Updated workflow examples
- STM benefits and features

**Acceptance Criteria**:
- [ ] STM listed in prerequisites section
- [ ] Migration instructions added for existing users
- [ ] Examples updated to reflect STM usage
- [ ] All FileManager references removed
- [ ] Installation section includes STM setup

### Task 4.2: Update AGENT.md and internal documentation
**Description**: Update AGENT.md and other internal docs to reflect STM usage
**Size**: Medium
**Priority**: Medium
**Dependencies**: Task 3.4
**Can run parallel with**: Task 4.1

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Update file structure section in AGENT.md
- Update task management workflow documentation
- Remove references to issues/ and plans/ directories
- Document new STM-based structure

**Sections to update**:
- Project structure (remove issues/plans, add .simple-task-master)
- Task management workflow
- CLI command documentation
- Bootstrap process description

**Acceptance Criteria**:
- [ ] AGENT.md reflects new STM-based structure
- [ ] File structure section updated correctly
- [ ] Task management workflow documented
- [ ] All references to old system removed
- [ ] STM integration properly documented

### Task 4.3: Add migration guide documentation
**Description**: Create comprehensive migration guide for existing users
**Size**: Medium
**Priority**: Low
**Dependencies**: Task 4.1, Task 4.2
**Can run parallel with**: None

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Create docs/MIGRATION_TO_STM.md with step-by-step instructions
- Include troubleshooting section
- Document rollback procedures if needed
- Provide before/after examples

**Migration guide sections**:
1. Prerequisites (STM installation)
2. Simple migration steps (delete files, run commands)
3. Verification steps
4. Troubleshooting common issues
5. Benefits of new system

**Acceptance Criteria**:
- [ ] MIGRATION_TO_STM.md created with complete instructions
- [ ] Step-by-step migration process documented
- [ ] Troubleshooting section included
- [ ] Before/after examples provided
- [ ] Guide tested with actual migration

### Task 4.4: Final validation and testing
**Description**: Run full test suite and validate entire migration
**Size**: Medium
**Priority**: High
**Dependencies**: Task 4.3
**Can run parallel with**: None

**Source**: specs/feat-migrate-to-stm.md

**Technical Requirements**:
- Run complete test suite and ensure all tests pass
- Test fresh installation experience
- Verify all AutoAgent commands work with STM
- Test migration process from scratch

**Validation steps**:
1. npm test (all tests must pass)
2. npm run check (typecheck, lint, build)
3. Fresh project test with STM
4. Verify CLI commands work correctly
5. Test spec decomposition with STM

**Acceptance Criteria**:
- [ ] Full test suite passes (npm test)
- [ ] All quality checks pass (npm run check)
- [ ] Fresh install works correctly
- [ ] All CLI commands function with STM
- [ ] Spec decomposition creates STM tasks correctly
- [ ] No regression in functionality

## Summary

**Total Tasks**: 16 tasks across 4 phases
**Estimated Duration**: 5-6 days
**Critical Path**: Phase 1 → Phase 2 → Phase 3 → Phase 4
**Parallel Opportunities**: Tasks within Phase 1 and early Phase 2 can run in parallel

**Key Milestones**:
- Phase 1 Complete: STM foundation ready
- Phase 2 Complete: Full STMManager implementation  
- Phase 3 Complete: Legacy code removed
- Phase 4 Complete: Production-ready release

**Risk Mitigation**:
- Comprehensive testing at each phase
- Backup/rollback procedures documented
- Gradual replacement (not big-bang approach)
- User migration guide provided