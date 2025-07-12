# AutoAgent Hooks System Implementation Specification

## Title
Implementation of Claude Code-style Hooks System for AutoAgent

## Overview
This specification details the implementation of a comprehensive hooks system for AutoAgent that allows users to intercept lifecycle events with custom shell commands. The system is inspired by Claude Code's hooks implementation and provides Pre/Post hook patterns for key lifecycle events during issue execution.

## Background/Problem Statement
Currently, AutoAgent lacks extensibility points for users to inject custom behavior during execution. Users cannot:
- Validate execution results before marking issues as complete
- Add custom git commit logic or formatting
- Block execution based on custom criteria
- Integrate with external systems (CI/CD, issue trackers, monitoring)
- Enforce project-specific quality gates

This limitation forces users to fork the project or manually intervene during execution, reducing automation potential.

## Goals
1. **Extensibility**: Allow users to customize AutoAgent behavior without modifying source code
2. **Control**: Enable blocking operations before critical actions (Pre hooks)
3. **Automation**: Support automated workflows through Post hooks
4. **Integration**: Facilitate integration with external tools and services
5. **Simplicity**: Maintain a simple, intuitive configuration interface
6. **Compatibility**: Preserve backward compatibility while migrating existing features

## Non-Goals
1. **Plugin System**: This is not a full plugin system with code loading
2. **Async Hooks**: All hooks execute synchronously and sequentially
3. **Hook Dependencies**: No complex dependency management between hooks
4. **Dynamic Loading**: Hooks are configured statically, not loaded at runtime
5. **Remote Hooks**: No support for network-based hook execution

## Detailed Design

### Architecture Changes

#### 1. New Components

```typescript
// src/core/hook-manager.ts
export class HookManager {
  private config: HookConfig;
  private sessionId: string;
  private workspace: string;
  
  constructor(config: HookConfig, sessionId: string, workspace: string);
  async executeHooks(hookPoint: HookPoint, data: HookData): Promise<HookResult>;
  private interpolateCommand(command: string, data: any): string;
  private runCommand(command: string, input: string, timeout?: number): Promise<CommandResult>;
  private executeBuiltinHook(hook: BuiltinHook, data: HookData): Promise<HookResult>;
}

// src/core/session-manager.ts
export class SessionManager {
  private sessionsDir: string;
  
  constructor();
  async saveSession(session: Session): Promise<void>;
  async setCurrentSession(sessionId: string): Promise<void>;
  async getCurrentSession(): Promise<Session | null>;
  async listSessions(limit?: number): Promise<Session[]>;
  async endSession(sessionId: string, status: SessionStatus): Promise<void>;
}

// src/hooks/git-commit-hook.ts
export class GitCommitHook implements BuiltinHookHandler {
  async execute(data: HookData, config: GitCommitConfig): Promise<HookResult>;
}

// src/hooks/git-push-hook.ts
export class GitPushHook implements BuiltinHookHandler {
  async execute(data: HookData, config: GitPushConfig): Promise<HookResult>;
}
```

#### 2. Type Definitions

```typescript
// src/types/hooks.ts
export type HookPoint = 
  | 'PreExecutionStart' 
  | 'PostExecutionStart'
  | 'PreExecutionEnd' 
  | 'PostExecutionEnd'
  | 'Stop';

export interface HookConfig {
  [key: HookPoint]: Hook[];
}

export interface Hook {
  type: 'command' | 'git-commit' | 'git-push';
  command?: string;
  timeout?: number;
  blocking?: boolean;
  // Type-specific config (no 'enabled' field - hooks presence = enabled)
  message?: string;      // git-commit
  noVerify?: boolean;    // git-commit
  remote?: string;       // git-push
  branch?: string;       // git-push
}

export interface HookData {
  eventName: string;
  sessionId: string;
  workspace: string;
  timestamp: number;
  [key: string]: any;  // Event-specific data
}

export interface HookResult {
  blocked: boolean;
  reason?: string;
  output?: string;
}

// src/types/session.ts
export interface Session {
  id: string;
  startTime: string;
  endTime?: string;
  workspace: string;
  command: string;
  args: string[];
  issuesPlanned: number[];
  issuesCompleted: number[];
  issuesFailed: number[];
  currentIssue?: number;
  status: 'active' | 'completed' | 'interrupted' | 'failed';
  provider: string;
  metadata?: {
    gitBranch?: string;
    gitCommit?: string;
    totalDuration?: number;
  };
}
```

#### 3. Integration Points

```typescript
// src/core/autonomous-agent.ts
export class AutonomousAgent {
  private hookManager: HookManager;
  private sessionManager: SessionManager;
  private session: Session;
  
  constructor(config: AgentConfig) {
    // Initialize session
    this.sessionId = `session-${Date.now()}-${this.generateRandomId()}`;
    this.session = this.createSession();
    
    // Initialize managers
    this.sessionManager = new SessionManager();
    this.hookManager = new HookManager(
      config.hooks || {},
      this.sessionId,
      config.workspace
    );
    
    // Save initial session
    await this.sessionManager.saveSession(this.session);
  }
  
  private generateRandomId(): string {
    // Generate 6-character random ID
    return Math.random().toString(36).substring(2, 8);
  }
  
  async executeIssue(issueNumber: number): Promise<ExecutionResult> {
    // Update session
    this.session.currentIssue = issueNumber;
    await this.sessionManager.saveSession(this.session);
    
    // Pre-execution hook
    const preHookResult = await this.hookManager.executeHooks('PreExecutionStart', {
      issueNumber,
      issueTitle: issue.title,
      issueFile,
      planFile
    });
    
    if (preHookResult.blocked) {
      throw new Error(`Execution blocked: ${preHookResult.reason}`);
    }
    
    // Emit event
    this.emit('execution-start', issueNumber);
    
    // Post-execution-start hook
    await this.hookManager.executeHooks('PostExecutionStart', data);
    
    // ... execution logic ...
    
    // Pre-end hook
    const preEndHookResult = await this.hookManager.executeHooks('PreExecutionEnd', {
      issueNumber,
      success: result.success,
      filesModified: result.filesModified,
      output: result.output
    });
    
    if (preEndHookResult.blocked) {
      result.success = false;
      result.error = preEndHookResult.reason;
    }
    
    // Emit event
    this.emit('execution-end', result);
    
    // Post-end hook (includes git operations)
    await this.hookManager.executeHooks('PostExecutionEnd', result);
    
    return result;
  }
}
```

### Hook Execution Protocol

#### Input Format (JSON via stdin)
```json
{
  "eventName": "PreExecutionStart",
  "sessionId": "session-1704067200000-abc123",
  "workspace": "/path/to/project",
  "timestamp": 1704067200000,
  "issueNumber": 42,
  "issueTitle": "Implement authentication",
  "issueFile": "issues/42-implement-authentication.md",
  "planFile": "plans/42-implement-authentication.md"
}
```

#### Output Format
1. **Exit Codes**:
   - `0`: Success, continue execution
   - `2`: Blocking error (Pre hooks only)
   - Other: Non-blocking error, log and continue

2. **JSON Output** (optional):
```json
{
  "decision": "block",
  "reason": "Linting failed with 5 errors",
  "feedback": "Run 'npm run lint:fix' to auto-fix"
}
```

3. **Output Display Behavior**:
   - **Stdout**: ALWAYS displayed to users, regardless of success/failure
   - **Exit code 2**: stderr shown as blocking reason
   - **Other exit codes**: Both stdout and stderr shown to user

### Configuration Structure

```json
{
  "providers": ["claude", "gemini"],
  "hooks": {
    "PreExecutionStart": [
      {
        "type": "command",
        "command": "bash .autoagent/hooks/pre-execution.sh",
        "timeout": 30000
      }
    ],
    "PostExecutionEnd": [
      {
        "type": "command",
        "command": "npm test",
        "blocking": false
      },
      {
        "type": "git-commit",
        "message": "Complete issue #{{issueNumber}}: {{issueTitle}}",
        "noVerify": false
      },
      {
        "type": "git-push",
        "remote": "origin",
        "branch": "current"
      }
    ],
    "Stop": [
      {
        "type": "command",
        "command": "bash .autoagent/hooks/check-todos.sh",
        "blocking": true
      }
    ]
  }
}
```

## Migration Strategy

### Breaking Changes
Since this is a single-user project, we can make clean breaking changes:

1. **Remove Boolean Flags**:
   - `AgentConfig.autoCommit` → Removed
   - `UserConfig.gitAutoCommit` → Removed  
   - `UserConfig.gitAutoPush` → Removed

2. **Extract Git Logic**:
   - `AutonomousAgent.performGitCommitAndPush()` → Moved to hooks
   - Git operations become configurable hooks

3. **Update CLI Flags**:
   - Remove `--commit` and `--push` flags entirely
   - Config commands now manage hooks instead of booleans

### Backward Compatibility Commands

```typescript
// src/cli/commands/config.ts
export function setAutoCommit(value: boolean) {
  if (value) {
    // Add git-commit hook
    config.hooks.PostExecutionEnd = config.hooks.PostExecutionEnd || [];
    config.hooks.PostExecutionEnd.push({
      type: 'git-commit',
      message: 'Complete issue #{{issueNumber}}: {{issueTitle}}'
    });
  } else {
    // Remove git-commit hooks
    config.hooks.PostExecutionEnd = config.hooks.PostExecutionEnd?.filter(
      h => h.type !== 'git-commit'
    );
  }
}
```

## Testing Strategy

### Unit Tests

```typescript
// test/core/hook-manager.test.ts
describe('HookManager', () => {
  it('should execute command hooks sequentially');
  it('should handle blocking Pre hooks');
  it('should continue on non-blocking errors');
  it('should enforce timeout limits');
  it('should interpolate template variables');
  it('should parse JSON output');
});

// test/core/session-manager.test.ts
describe('SessionManager', () => {
  it('should create and save sessions');
  it('should maintain current session symlink');
  it('should list recent sessions');
  it('should handle concurrent sessions');
});
```

### Integration Tests

```typescript
// test/integration/hooks-execution.test.ts
describe('Hooks Integration', () => {
  it('should block execution with Pre hook');
  it('should execute git operations via hooks');
  it('should handle hook failures gracefully');
  it('should pass correct data to hooks');
});
```

### E2E Tests

```typescript
// test/e2e/hooks-workflow.test.ts
describe('Hooks E2E Workflow', () => {
  it('should execute full lifecycle with validation hooks');
  it('should prevent session end with Stop hook');
  it('should integrate with external tools');
});
```

## Performance Considerations

1. **Sequential Execution**: Hooks run sequentially, not in parallel
   - Predictable execution order
   - Allows hooks to depend on previous hook results
   - May increase total execution time
   - Example:
     ```json
     "PostExecutionEnd": [
       { "type": "command", "command": "npm test" },      // Runs first
       { "type": "git-commit", "message": "..." },          // Runs second
       { "type": "git-push", "remote": "origin" }          // Runs third
     ]
     ```

2. **Timeout Management**: Default 60s timeout per hook
   - Prevents hanging on misbehaving hooks
   - Configurable per hook via `timeout` field
   - Timeout kills the hook process and treats it as a non-blocking error
   - Both stdout and stderr shown even on timeout

3. **Session Storage**: Minimal disk I/O
   - Sessions stored as JSON files
   - Only updated at key points
   - Old sessions can be cleaned up periodically

4. **Process Spawning**: Each hook spawns a new process
   - Overhead of process creation
   - Isolated execution environment
   - Resource limits inherited from parent

## Security Considerations

1. **Command Injection**: Template interpolation is limited
   - Only specific variables replaced ({{issueNumber}}, {{issueTitle}}, etc.)
   - Template interpolation happens BEFORE command execution
   - The actual data is passed via JSON on stdin
   - No arbitrary code execution in templates
   - Values should be escaped in shell commands

2. **File Access**: Hooks run with user permissions
   - Can access any files the user can
   - Working directory is project workspace
   - No additional sandboxing

3. **Timeout Protection**: Prevents resource exhaustion
   - Maximum execution time enforced
   - Processes killed after timeout
   - No resource limits beyond timeout

4. **Input Validation**: JSON data is sanitized
   - All data serialized to JSON
   - No direct command construction from user input
   - Hook scripts responsible for their own validation

## Documentation

### User Documentation
1. **Hooks Guide**: How to write and configure hooks
2. **Hook Examples**: Common hook patterns and use cases
3. **Migration Guide**: Moving from old flags to hooks
4. **API Reference**: Hook data structures and events

### Developer Documentation
1. **Architecture**: How hooks integrate with core
2. **Adding Hook Points**: How to add new lifecycle events
3. **Built-in Hooks**: How to create new built-in hook types
4. **Testing Hooks**: How to test hook implementations

## Implementation Phases

### Phase 1: Core Infrastructure (Week 1)
1. Create `HookManager` class
2. Create `SessionManager` class  
3. Define TypeScript interfaces
4. Add JSON communication protocol
5. Implement timeout handling

### Phase 2: Hook Integration (Week 1)
1. Add hook points to `AutonomousAgent`
2. Update event emission flow
3. Implement template interpolation
4. Add blocking/non-blocking logic
5. Handle hook errors gracefully

### Phase 3: Built-in Hooks (Week 2)

#### Git Integration Details

**Git Commit Hook**:
```typescript
class GitCommitHook {
  async execute(data: HookData, config: GitCommitConfig): Promise<HookResult> {
    // 1. Check for changes
    const hasChanges = await this.hasChangesToCommit();
    if (!hasChanges) {
      console.warn('No changes to commit');
      return { blocked: false, output: 'No changes to commit' };
    }
    
    // 2. Stage all changes
    await exec('git add -A');
    
    // 3. Create commit
    const message = this.interpolateMessage(config.message, data);
    const args = config.noVerify ? ['--no-verify'] : [];
    await exec(`git commit ${args.join(' ')} -m "${message}"`);
    
    return { blocked: false, output: 'Commit created' };
  }
}
```

**Git Push Hook**:
- Uses current branch always (no override)
- Relies on system git configuration for auth
- Fails and notifies user on push failures (no retry)
- Remote defaults to 'origin', branch to 'current'

1. Extract git operations from `AutonomousAgent`
2. Create `GitCommitHook` class
3. Create `GitPushHook` class
4. Update configuration handling
5. Test git hook implementations

### Phase 4: Session Management (Week 2)
1. Implement session storage in `~/.autoagent/sessions/`
2. Add session lifecycle tracking
3. Create current session symlink
4. Add session metadata collection
5. Test session persistence

### Phase 5: Config Migration (Week 3)
1. Remove old boolean config fields
2. Update `ConfigManager` to handle hooks
3. Rewrite `set-auto-commit` command
4. Rewrite `set-auto-push` command
5. Update CLI: Remove `--commit` and `--push` flags completely (no deprecation)

### Phase 6: Testing & Documentation (Week 3)
1. Write comprehensive unit tests
2. Add integration test suite
3. Create E2E test scenarios
4. Write user documentation
5. Update README and examples

### Phase 7: Polish & Release (Week 4)
1. Performance optimization
2. Error message improvements
3. Add more built-in hook types if needed
4. Create example hook scripts
5. Release as minor version

## Open Questions

1. **Hook Discovery**: Should we auto-discover hooks in `.autoagent/hooks/`?
   - **Decision**: No, explicit configuration only for security

2. **Hook Packaging**: Should we support npm packages as hooks?
   - **Decision**: No, shell commands only in this version

3. **Hook Composition**: Should hooks be able to call other hooks?
   - **Decision**: No, keep it simple with sequential execution

4. **Windows Support**: How to handle symlinks on Windows?
   - **Decision**: Use file copy instead of symlink for current session

5. **Hook Output**: Should we capture and display all stdout?
   - **Decision**: Yes, ALWAYS show stdout for user feedback

6. **Default Hooks**: Should we ship with default hook configurations?
   - **Decision**: No, start with empty hooks configuration

7. **Hook Validation**: Should we validate hook commands exist?
   - **Decision**: No, fail at runtime like shell scripts

8. **Backward Compatibility**: Keep old flags with deprecation warnings?
   - **Decision**: Remove completely since single-user project


## Success Metrics

1. **Functionality**: All existing git features work via hooks
2. **Performance**: No significant slowdown in execution
3. **Reliability**: Hooks don't cause crashes or hangs
4. **Usability**: Configuration is intuitive and well-documented
5. **Extensibility**: Users can implement complex workflows

## Key Benefits

1. **Control**: Block unsafe operations before they happen
2. **Automation**: Auto-format, lint, test without manual steps
3. **Integration**: Connect with CI/CD, issue trackers, monitoring
4. **Flexibility**: Users customize behavior without forking
5. **Deterministic**: Rules as code, not LLM instructions

## Hook Registry

Common hook patterns for AutoAgent:

| Hook Point | Common Use Cases |
|------------|------------------|
| `PreExecutionStart` | Check prerequisites, validate environment |
| `PostExecutionStart` | Start timers, send notifications |
| `PreExecutionEnd` | Validate output, run tests |
| `PostExecutionEnd` | Commit changes, update tracking |
| `Stop` | Check incomplete work, save state |

Note: No provider lifecycle hooks are supported - hooks are focused on execution lifecycle only.

## Example Hook Implementations

### Validation Hook
```bash
#!/bin/bash
# .autoagent/hooks/validate-execution.sh

INPUT=$(cat)
SUCCESS=$(echo "$INPUT" | jq -r '.success')

if [ "$SUCCESS" != "true" ]; then
  exit 0  # Don't validate failed executions
fi

# Check if tests were added/modified
FILES_MODIFIED=$(echo "$INPUT" | jq -r '.filesModified[]?')
if ! echo "$FILES_MODIFIED" | grep -q "\\.test\\." && ! echo "$FILES_MODIFIED" | grep -q "\\.spec\\."; then
  echo "ERROR: No test files were modified" >&2
  echo "Please add tests for the implemented functionality" >&2
  exit 2  # Block completion
fi

# Run tests
if ! npm test --silent; then
  echo "ERROR: Tests failed" >&2
  exit 2  # Block completion
fi

# Check for TODO comments
if grep -r "TODO:" src/; then
  echo "WARNING: Found TODO comments in code" >&2
  # Non-blocking warning
fi

exit 0
```

### Stop Hook
```bash
#!/bin/bash
# .autoagent/hooks/check-incomplete.sh

INPUT=$(cat)

# Check for incomplete tasks
if grep -q "\[ \]" TODO.md; then
  cat <<EOF
{
  "decision": "block",
  "reason": "Incomplete tasks remain in TODO.md",
  "feedback": "Complete all tasks or remove them before stopping"
}
EOF
  exit 0
fi

echo "All tasks completed"
exit 0
```

This specification provides a complete roadmap for implementing the AutoAgent hooks system with all technical details needed for implementation.