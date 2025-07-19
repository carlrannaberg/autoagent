# Specification: Migrate from Homegrown Issues/Plans to STM (Simple Task Master)

**Status**: Draft  
**Authors**: Claude, 2025-07-19  
**Type**: Feature  

## Overview

This specification outlines a clean-cut replacement of AutoAgent's homegrown issues/plans management system with STM (Simple Task Master), a lightweight CLI tool already initialized in the project. The goal is to dramatically reduce code complexity by completely removing custom file management logic and directly using STM's proven capabilities.

## Background/Problem Statement

AutoAgent currently maintains a custom file-based system for managing project decomposition and task execution:

- **Complex File Management**: ~1000+ lines of code in FileManager handling issue/plan CRUD operations
- **Manual Synchronization**: TODO.md must be kept in sync with individual issue files
- **Fixed Structure**: Rigid directory structure (issues/, plans/) with specific naming conventions
- **Validation Overhead**: Multiple validators ensuring consistent markdown formats
- **Limited Extensibility**: Adding new metadata requires code changes across multiple files

STM is already initialized in the project (as of commit aa57ad6) and provides a battle-tested alternative that could eliminate most of this custom code while providing better features.

## Goals

- **Eliminate custom file management code** (~80% reduction in FileManager complexity)
- **Simplify conceptual model** by unifying issues and plans into single tasks
- **Leverage STM's proven task management** capabilities (create, update, list, search)
- **Clean migration** with one-time conversion script (no dual-mode operation)
- **Preserve all critical AutoAgent functionality** (spec decomposition, AI execution, reflection)
- **Improve developer experience** with standard CLI commands
- **Enable better task metadata** and dependency tracking

## Non-Goals

- **Complete removal of file-based storage** (specs remain in specs/ directory)
- **Changing the AI provider integration** (Claude/Gemini handling remains unchanged)
- **Modifying the execution engine** (AutonomousAgent core logic stays the same)
- **Breaking existing projects** (migration tools will be provided)
- **Changing git commit patterns** (auto-commit functionality unchanged)

## Technical Dependencies

- **STM (Simple Task Master)**: v0.1.1+ (npm dependency)
  - Full programmatic API via `TaskManager` class
  - YAML+Markdown storage with JSON output by default
  - Supports unknown/custom fields in frontmatter
  - Built-in workspace discovery and atomic operations
  - Creates `.simple-task-master/` directory in projects
- **Node.js**: 22.0.0+ (existing requirement)
- **TypeScript**: For direct STM integration and migration script

## Current AutoAgent Setup

When AutoAgent operates in a user project:
- **No explicit init command** - directories created on demand
- **Current structure**:
  - `issues/` - Individual issue markdown files
  - `plans/` - Corresponding plan files
  - `TODO.md` - Central task tracking
  - `.autoagent.json` - Config file (if local config)
  - `.autoagent/rate-limits.json` - Rate limit tracking

**After migration**:
- `.simple-task-master/` - STM's directory (created by `stm init`)
  - `config.json` - STM configuration
  - `tasks/` - All tasks stored here (gitignored)
- All issues/plans directories can be removed/archived

## Detailed Design

### Architecture Changes

The migration will be a clean cut - completely replacing the old system:

```
Current Architecture:                 Target Architecture:
┌─────────────────┐                  ┌─────────────────┐
│  CLI Commands   │                  │  CLI Commands   │
└────────┬────────┘                  └────────┬────────┘
         │                                      │
┌────────▼────────┐                  ┌────────▼────────┐
│  FileManager    │                  │  TaskManager    │
│  (1000+ lines)  │      ──────>     │  (STM Adapter)  │
└────────┬────────┘                  └────────┬────────┘
         │                                      │
┌────────▼────────┐                  ┌────────▼────────┐
│ issues/ plans/  │                  │    STM CLI      │
│   TODO.md       │                  │ .simple-task-   │
└─────────────────┘                  │    master/      │
                                     └─────────────────┘
```

### Implementation Approach

#### Direct STM Integration

Replace entire FileManager with direct STM API usage (`src/utils/stm-manager.ts`):

```typescript
import { TaskManager, type Task, type TaskCreateInput } from 'simple-task-master';

interface TaskContent {
  description: string;
  technicalDetails: string;
  implementationPlan: string;
  acceptanceCriteria: string[];
  testingStrategy?: string;
  verificationSteps?: string;
  tags?: string[];
}

export class STMManager {
  private taskManager: TaskManager | null = null;

  private async ensureInitialized(): Promise<void> {
    if (!this.taskManager) {
      this.taskManager = await TaskManager.create();
    }
  }

  
  async getTask(id: string): Promise<Task | null> {
    await this.ensureInitialized();
    try {
      return await this.taskManager!.get(parseInt(id));
    } catch (error) {
      if (error.message?.includes('not found')) {
        return null;
      }
      throw new Error(`Failed to get STM task ${id}: ${error.message}`);
    }
  }
  
  async listTasks(filters?: { status?: string; tags?: string[] }): Promise<Task[]> {
    await this.ensureInitialized();
    try {
      return await this.taskManager!.list(filters);
    } catch (error) {
      throw new Error(`Failed to list STM tasks: ${error.message}`);
    }
  }
  
  async updateTaskStatus(id: string, status: 'pending' | 'in-progress' | 'done'): Promise<void> {
    await this.ensureInitialized();
    try {
      await this.taskManager!.update(parseInt(id), { status });
    } catch (error) {
      throw new Error(`Failed to update STM task ${id} status: ${error.message}`);
    }
  }
  
  async searchTasks(pattern: string): Promise<Task[]> {
    await this.ensureInitialized();
    try {
      return await this.taskManager!.search(pattern);
    } catch (error) {
      throw new Error(`Failed to search STM tasks with pattern "${pattern}": ${error.message}`);
    }
  }
  
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

  private formatDescription(content: TaskContent): string {
    // Why & what: problem context, solution overview, and acceptance criteria
    return `${content.description}

## Acceptance Criteria
${content.acceptanceCriteria.map(ac => `- [ ] ${ac}`).join('\n')}`;
  }

  private formatDetails(content: TaskContent): string {
    // How: implementation approach, technical design, and architecture notes
    return `${content.technicalDetails}

## Implementation Plan
${content.implementationPlan}`;
  }

  private formatValidation(content: TaskContent): string {
    // Validation: testing strategy, verification steps, and quality checks
    return `${content.testingStrategy || 'Standard testing approach'}

## Verification Steps
${content.verificationSteps || 'Manual verification required'}`;
  }
}
```

#### Phase 2: Data Model Mapping

Map AutoAgent's issue+plan pairs to unified STM tasks:

```yaml
# Combined Issue+Plan as Single STM Task
id: "42"
title: "Implement user authentication"
status: pending
tags: 
  - priority:high
  - spec:auth-system
dependencies: []
description: |
  ## Why & What
  Users need secure authentication to access protected resources. 
  Implement OAuth2 authentication supporting Google and GitHub providers.
  
  ## Problem Context
  - Current system has no authentication
  - Users need secure access to API endpoints
  - Must support multiple identity providers
  
  ## Solution Overview
  Add OAuth2 authentication using passport.js with support for Google and GitHub
  
  ## Acceptance Criteria
  - [ ] Users can log in with Google
  - [ ] Users can log in with GitHub
  - [ ] Sessions persist across restarts
  - [ ] Protected endpoints require authentication
details: |
  ## How - Implementation Approach
  
  ### Technical Design
  - Use passport.js for OAuth handling
  - JWT tokens for session management
  - Redis for session storage
  - Express middleware for route protection
  
  ### Architecture Notes
  - OAuth flow: User → App → Provider → Callback → JWT
  - Sessions stored in Redis with 24h TTL
  - Refresh tokens for extended sessions
  
  ### Implementation Steps
  1. Install and configure passport with OAuth strategies
  2. Set up Google and GitHub OAuth apps
  3. Implement callback handlers and JWT generation
  4. Add authentication middleware to protected routes
  5. Create login/logout endpoints
validation: |
  ## Testing Strategy
  - Unit tests for auth middleware and JWT handling
  - Integration tests for OAuth flow with mock providers
  - E2E tests for complete login/logout cycle
  
  ## Verification Steps
  1. Manual test Google login flow
  2. Manual test GitHub login flow
  3. Verify session persistence across server restarts
  4. Test token expiration and refresh
  
  ## Quality Checks
  - [ ] No secrets in code (use env vars)
  - [ ] Proper error handling for failed auth
  - [ ] Rate limiting on auth endpoints
  - [ ] Security headers properly set
```

The STM sections align perfectly with task decomposition:
- **Description**: Why & what - problem context, solution overview, and acceptance criteria
- **Details**: How - implementation approach, technical design, and architecture notes
- **Validation**: Validation - testing strategy, verification steps, and quality checks

#### Complete Replacement Strategy

1. **Remove FileManager entirely** - Replace with STMManager (~100 lines vs 1000+)

2. **Update Commands to use STM directly**:
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

3. **Manual Migration Approach**:
   Since existing projects using the old system will be minimal, the migration is simply:
   ```bash
   # Remove old directories
   rm -rf issues/ plans/ TODO.md
   
   # STM will create its own structure when first used
   # No migration script needed - clean slate approach
   ```

### Code Structure and File Organization

```
src/
├── utils/
│   └── stm-manager.ts        # Direct STM API wrapper (~100 lines)
└── REMOVED:
    ├── utils/file-manager.ts # Completely removed (1000+ lines)
    ├── validation/           # Issue/Plan validators removed
    └── templates/            # Embedded templates removed

package.json changes:
├── dependencies/
│   └── simple-task-master: "^0.1.1"  # Added STM as dependency
```

### API Changes

No breaking changes to public APIs. Internal changes:

1. **New Interfaces**:
   ```typescript
   interface TaskManager {
     // CRUD operations for tasks (merged issue+plan content)
   }
   
   interface STMTask {
     id: string;
     title: string;
     status: 'pending' | 'in-progress' | 'done';
     tags: string[];
     dependencies: string[];
     [section: string]: any; // Extensible sections
   }
   ```

2. **No Migration Utilities Needed**:
   Clean slate approach - remove old files and STM handles the rest

### Data Model Changes

No changes to external data models. Internal storage migrates from:
- `issues/{number}-{slug}.md` + `plans/{number}-{slug}.md` → Single STM task with merged content
- `TODO.md` → Derived from STM task status

Each issue+plan pair becomes one STM task with:
- **Description**: Issue overview
- **Details**: Requirements + Technical details + Implementation plan
- **Validation**: Acceptance criteria

### Integration with STM Library

STM integration via direct API usage:
```typescript
import { TaskManager } from 'simple-task-master';

const taskManager = await TaskManager.create();

// Create task
const task = await taskManager.create({
  title: "Implement feature",
  description: "Feature description...",
  tags: ['autoagent'],
  status: 'pending'
});

// Update task status
await taskManager.update(task.id, { status: 'in-progress' });

// List tasks
const tasks = await taskManager.list({ status: 'pending' });

// Export for backup
const allTasks = await taskManager.list();
const backup = JSON.stringify(allTasks, null, 2);
```

## User Experience

### After Migration

Seamless experience with additional benefits:

```bash
# AutoAgent commands work as before
autoagent run spec.md
autoagent create issue "New feature"

# Plus direct STM access for power users
stm list --tag type:issue
stm grep "authentication"
stm show issue-42
```

### Migration Process

```bash
# Simple manual migration for existing projects
# 1. Remove old structure (backup first if needed)
rm -rf issues/ plans/ TODO.md

# 2. Initialize STM (if not already done)
stm init

# 3. AutoAgent will now use STM for all task management
autoagent run spec.md  # Creates STM tasks automatically
```

## Testing Strategy

### Unit Tests

1. **STM Adapter Tests** (`test/adapters/stm-adapter.test.ts`):
   ```typescript
   describe('STMAdapter', () => {
     it('should create tasks with merged issue+plan content', async () => {
       const adapter = new STMAdapter();
       const id = await adapter.createTask('Test Task', {
         description: 'Test description',
         requirements: ['Req 1'],
         acceptanceCriteria: ['AC 1'],
         technicalDetails: 'Technical approach',
         implementationPlan: 'Step 1: Setup\nStep 2: Implement'
       });
       
       const task = await adapter.getTask(id);
       expect(task.details).toContain('Requirements');
       expect(task.details).toContain('Implementation Plan');
       expect(task.validation).toContain('AC 1');
     });
   });
   ```

2. **Integration Tests** (`test/integration/stm-integration.test.ts`):
   - Test STMManager creation and initialization
   - Test task creation with all content sections
   - Test error handling for STM failures
   - Test workspace discovery and setup

### Integration Tests

1. **End-to-End Workflow**:
   - Create spec → decompose to STM tasks → execute → verify
   - Test full AutoAgent workflow with STM backend
   - Verify task execution and status updates

2. **CLI Integration**:
   ```typescript
   it('should create and manage tasks via STM', async () => {
     // Create issue using STM
     await runCLI(['create', 'issue', 'Test Feature']);
     
     // List should show STM tasks
     const output = await runCLI(['list']);
     expect(output).toContain('Test Feature');
     
     // Verify STM workspace was created
     expect(fs.existsSync('.simple-task-master')).toBe(true);
   });
   ```

### Mocking Strategies

1. **Mock STM TaskManager API**:
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

2. **Test Documentation**:
   Each test includes purpose comments explaining validation logic:
   ```typescript
   it('should preserve task content during migration', async () => {
     // Purpose: Ensure issue+plan content maps correctly to STM sections
     // to maintain all task information without data loss
   });
   
   it('should handle STM initialization failures gracefully', async () => {
     // Purpose: Verify error handling when STM workspace is unavailable
     // This can fail to reveal issues with workspace discovery
   });
   ```

## Performance Considerations

### Improvements

- **Faster task operations**: Direct API calls (~1-5ms) vs file I/O operations (~10-50ms)
- **Better search**: STM's built-in search with regex support
- **Reduced memory**: No need to load all files into memory for operations
- **Atomic operations**: Built-in locking prevents race conditions

### Potential Concerns

- **STM initialization overhead**: TaskManager.create() during first operation
  - Mitigation: Lazy initialization with caching in STMManager
- **File system overhead**: STM creates individual files per task
  - Mitigation: Similar to current system, no regression expected

### Benchmarks

Compare operations between legacy and STM:
- Create 100 issues: Measure time and memory
- List 1000 tasks: Compare performance
- Search across tasks: Regex performance

## Security Considerations

### Maintained Security

- **No credentials in tasks**: STM stores only text data
- **Git integration**: Sensitive task data remains gitignored
- **File permissions**: STM respects system file permissions

### New Considerations

- **Input validation**: Sanitize task content before passing to STM API
  ```typescript
  private validateTaskContent(content: TaskContent): void {
    if (!content.description?.trim()) {
      throw new Error('Task description is required');
    }
    if (!Array.isArray(content.acceptanceCriteria) || content.acceptanceCriteria.length === 0) {
      throw new Error('At least one acceptance criterion is required');
    }
  }
  ```
- **Path traversal**: Validate all file paths remain within project workspace
- **Export security**: Ensure exported data doesn't leak sensitive info

## Documentation

### To Be Created

1. **Migration Guide** (`docs/MIGRATION_TO_STM.md`):
   - Step-by-step migration instructions
   - Troubleshooting common issues
   - Rollback procedures

2. **STM Integration Guide** (`docs/STM_INTEGRATION.md`):
   - How AutoAgent uses STM
   - Custom task schemas
   - Advanced STM usage

### To Be Updated

1. **README.md**:
   - Add STM as a prerequisite
   - Update examples to show new workflow
   - Add migration notice

2. **AGENT.md**:
   - Update file structure section
   - Add STM command reference (already partial)
   - Update bootstrap process description

3. **CHANGELOG.md**:
   - Document migration as major feature
   - List breaking changes (if any)
   - Credit STM project

## Implementation Phases

### Phase 1: Build STM Manager (1-2 days)

**Goal**: Create direct STM wrapper and test it thoroughly

1. **Implement STMManager** (Day 1):
   - Create `src/utils/stm-manager.ts` (~100 lines)
   - Basic CRUD operations using STM CLI
   - Error handling and output parsing
   - Test with actual STM commands

2. **Unit Testing** (Day 1-2):
   - Mock exec calls for STM commands
   - Test all manager methods
   - Verify error handling

**Deliverables**:
- Complete STMManager implementation
- Comprehensive test coverage
- Verified STM CLI integration

### Phase 2: Migration & Replacement (2-3 days)

**Goal**: Replace FileManager with STMManager completely

1. **Replace FileManager Usage** (Day 1):
   - Update all commands to use STMManager
   - Remove FileManager and validators
   - Update AutonomousAgent integration
   - Remove TODO.md synchronization

2. **Update Tests** (Day 1-2):
   - Replace FileManager tests with STMManager tests
   - Update integration tests
   - Remove obsolete validation tests

3. **Documentation Updates** (Day 2):
   - Update migration instructions (simple delete approach)
   - Update code examples throughout codebase

**Deliverables**:
- Complete feature parity with STM
- All FileManager usage replaced
- Documentation updated

### Phase 3: Cleanup & Documentation (1-2 days)

**Goal**: Complete the migration and clean up

1. **Code Cleanup** (Day 1):
   - Remove all legacy code
   - Clean up imports and dependencies
   - Update package.json scripts

2. **Documentation Updates** (Day 1-2):
   - Update README.md with STM requirements
   - Update AGENT.md and CLAUDE.md
   - Add simple migration instructions
   - Update all code examples

3. **Final Validation** (Day 2):
   - Run full test suite
   - Test fresh install experience
   - Verify all commands work with STM

**Deliverables**:
- Clean codebase without legacy code
- Updated documentation
- Simple migration instructions for existing users

## Open Questions

1. **STM Schema Validation**:
   - Implement unknown field support in STM v0.1.2
   - Timeline for STM update before AutoAgent migration?

2. **Task ID References**:
   - Use STM's auto-generated IDs for new tasks
   - No need to preserve old issue numbers (clean slate approach)

3. **Version Strategy**:
   - Release as major version (clean breaking change)
   - Simple migration: delete old files, STM handles the rest

## References

### Related Issues and PRs
- Issue #22: "Simplify file management complexity"
- PR #38: "Add STM to project" (commit aa57ad6)

### External Documentation
- [STM GitHub Repository](https://github.com/K-Mistele/stm)
- [STM npm Package](https://www.npmjs.com/package/stm-cli)

### Design Patterns
- Adapter Pattern for storage backends
- Strategy Pattern for task management
- Repository Pattern for data access

### Architecture Decisions
- ADR-001: "Use external CLI tools for non-core functionality"
- ADR-005: "Prefer composition over inheritance"
- ADR-007: "Maintain backward compatibility in minor versions"

## Success Metrics

1. **Code Reduction**: >70% reduction in FileManager complexity
2. **Test Coverage**: Maintain >80% coverage through migration
3. **Performance**: No regression in common operations
4. **User Satisfaction**: Positive feedback on simplified workflow
5. **Migration Success**: >95% of projects migrate without issues

## Risk Mitigation

1. **STM Availability**: 
   - Risk: STM CLI not installed
   - Mitigation: Clear error messages with installation instructions

2. **Data Loss**:
   - Risk: Migration corruption
   - Mitigation: Mandatory backups, dry-run mode, validation checks

3. **Performance Regression**:
   - Risk: STM operations slower
   - Mitigation: Benchmarking, caching, batch operations

4. **User Resistance**:
   - Risk: Users prefer current system
   - Mitigation: Long transition period, clear benefits documentation