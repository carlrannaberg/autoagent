# AutoAgent Hooks System Design

This document proposes a Claude Code-style hooks system for AutoAgent, allowing users to configure shell commands that execute at specific lifecycle events.

## Overview

AutoAgent has lifecycle events (conceptual points where significant things happen). The hooks system allows users to intercept these events with Pre/Post hooks that can:
- **Pre hooks**: Run before the event, can block it from proceeding
- **Post hooks**: Run after the event, react to what happened

## Configuration Structure

The hooks configuration would be added to AutoAgent's existing `.autoagent/config.json` file:

```json
{
  "providers": ["claude", "gemini"],
  "failoverDelay": 5000,
  "retryAttempts": 3,
  "maxTokens": 100000,
  "rateLimitCooldown": 3600000,
  "gitAutoCommit": false,
  "logLevel": "info",
  "hooks": {
    "PreExecutionStart": [
      {
        "type": "command",
        "command": "echo 'About to start issue {{issueNumber}}: {{issueTitle}}' >> ~/.autoagent/execution.log"
      }
    ],
    "PostExecutionStart": [
      {
        "type": "command",
        "command": "bash .autoagent/hooks/track-execution-start.sh"
      }
    ],
    "PreExecutionEnd": [
      {
        "type": "command",
        "command": "bash .autoagent/hooks/validate-execution.sh",
        "blocking": true,
        "timeout": 60000
      }
    ],
    "PostExecutionEnd": [
      {
        "type": "command",
        "command": "bash .autoagent/hooks/notify-completion.sh"
      },
      {
        "type": "git-commit",
        "message": "Complete issue #{{issueNumber}}: {{issueTitle}}"
      }
    ]
  }
}
```

## Lifecycle Events and Their Hooks

For each lifecycle event, we have Pre and Post hooks:

### Execution Lifecycle

#### `PreExecutionStart` / `PostExecutionStart`
- **When**: Before/after issue execution begins
- **Input**:
  ```json
  {
    "eventName": "PreExecutionStart",
    "sessionId": "uuid",
    "workspace": "/path/to/workspace",
    "issueNumber": 1,
    "issueTitle": "Implement user authentication",
    "issueFile": "issues/1-implement-user-authentication.md",
    "planFile": "plans/1-implement-user-authentication.md"
  }
  ```
- **Pre can block**: Yes (prevents execution from starting)

#### `PreExecutionEnd` / `PostExecutionEnd`
- **When**: Before/after issue execution completes
- **Input**:
  ```json
  {
    "eventName": "PreExecutionEnd",
    "sessionId": "uuid",
    "workspace": "/path/to/workspace",
    "issueNumber": 1,
    "issueTitle": "Implement user authentication",
    "success": true,
    "duration": 45000,
    "provider": "claude",
    "filesModified": ["src/auth.ts", "tests/auth.test.ts"],
    "output": "Created authentication module..."
  }
  ```
- **Pre can block**: Yes (prevents marking as complete)



### Session Lifecycle

#### `Stop`
- **When**: When all marked issues have been executed and session is about to end
- **Input**:
  ```json
  {
    "eventName": "Stop",
    "sessionId": "uuid",
    "reason": "completed|interrupted|error",
    "issuesCompleted": 5,
    "issuesTotal": 5,
    "duration": 300000
  }
  ```
- **Can block**: Yes (prevents session from ending, forces continuation)

## Built-in Hook Types

Besides custom commands, AutoAgent provides built-in hook types for common operations:

### `git-commit`
- **Type**: `"git-commit"`
- **Purpose**: Create a git commit with staged changes
- **Configuration**:
  ```json
  {
    "type": "git-commit",
    "message": "Complete issue #{{issueNumber}}: {{issueTitle}}",
    "noVerify": false
  }
  ```
- **Available in**: `PostExecutionEnd`

### `git-push`
- **Type**: `"git-push"`
- **Purpose**: Push commits to remote repository
- **Configuration**:
  ```json
  {
    "type": "git-push",
    "remote": "origin",
    "branch": "current"
  }
  ```
- **Available in**: `PostExecutionEnd` (after git-commit)

These built-in hooks respect the same blocking/non-blocking semantics as command hooks.

## Convenience Commands

AutoAgent provides convenience commands that manage hook configurations:

### `autoagent config set-auto-commit <true|false>`
- **true**: Adds a `git-commit` hook to `PostExecutionEnd`
- **false**: Removes the `git-commit` hook from `PostExecutionEnd`

Example:
```bash
# Enable auto-commit
$ autoagent config set-auto-commit true
✓ Added git-commit hook to PostExecutionEnd

# Resulting configuration:
{
  "hooks": {
    "PostExecutionEnd": [
      {
        "type": "git-commit",
        "message": "Complete issue #{{issueNumber}}: {{issueTitle}}"
      }
    ]
  }
}

# Disable auto-commit
$ autoagent config set-auto-commit false
✓ Removed git-commit hook from PostExecutionEnd
```

### `autoagent config set-auto-push <true|false>`
- **true**: Adds a `git-push` hook to `PostExecutionEnd` (after git-commit)
- **false**: Removes the `git-push` hook from `PostExecutionEnd`

These commands provide backward compatibility and easier configuration for common use cases while using the hooks system underneath.

## Hook Execution Order

Hooks are executed **sequentially** in the order they are defined in the configuration. Each hook must complete before the next one starts. This ensures predictable execution and allows hooks to depend on the results of previous hooks.

```json
"PostExecutionEnd": [
  { "type": "command", "command": "npm test" },      // Runs first
  { "type": "git-commit", "message": "..." },          // Runs second
  { "type": "git-push", "remote": "origin" }          // Runs third
]
```

## Hook Input/Output Protocol

### Input (via stdin)
All hooks receive JSON input with:
- Common fields: `eventName`, `sessionId`, `workspace`, `timestamp`
- Event-specific data

### Output (via stdout/stderr)
- **Exit code 0**: Success, continue normally
- **Exit code 2**: Blocking error (for Pre hooks only)
  - `stderr` is shown to user as reason for blocking
- **Other exit codes**: Non-blocking error
  - Error is logged but execution continues
  - Both stdout and stderr are shown to the user

**Important**: Hook stdout is **always** displayed to the user, regardless of success or failure. This allows hooks to provide feedback, progress updates, or informational messages.

### Advanced JSON Output
Hooks can return JSON in stdout:
```json
{
  "decision": "block|approve",
  "reason": "Failed linting: 5 errors found",
  "feedback": "Run 'npm run lint:fix' to auto-fix"
}
```

## Session Management

AutoAgent will implement a session tracking system to provide context across executions and enable features like session resumption.

### Session Storage

Sessions are stored in `~/.autoagent/sessions/` with the following structure:

```
~/.autoagent/
├── sessions/
│   ├── session-1704067200000-abc123.json
│   ├── session-1704067300000-def456.json
│   └── current -> session-1704067300000-def456.json (symlink)
└── config.json
```

### Session Data Structure

```typescript
interface Session {
  id: string;                    // e.g., "session-1704067200000-abc123"
  startTime: string;             // ISO timestamp
  endTime?: string;              // ISO timestamp when session ends
  workspace: string;             // Absolute path to workspace
  command: string;               // Command that started the session
  args: string[];                // Command arguments
  issuesPlanned: number[];       // Issue numbers in this session
  issuesCompleted: number[];     // Successfully completed issues
  issuesFailed: number[];        // Failed issues
  currentIssue?: number;         // Currently executing issue
  status: 'active' | 'completed' | 'interrupted' | 'failed';
  provider: string;              // Primary provider used
  metadata?: {                   // Optional session metadata
    gitBranch?: string;
    gitCommit?: string;
    totalDuration?: number;      // Total time in milliseconds
  };
}
```

### Session Lifecycle

1. **Session Creation**: When AutoAgent starts, it creates a new session
2. **Session ID Format**: `session-${timestamp}-${randomId}`
   - Timestamp for sorting/debugging
   - Random ID (6 chars) to prevent collisions
3. **Current Session**: Symlink points to active session file
4. **Session Updates**: Updated after each issue execution
5. **Session Completion**: Marked complete when all issues done or interrupted

### Implementation in AutonomousAgent

```typescript
export class AutonomousAgent {
  private sessionId: string;
  private session: Session;
  private sessionManager: SessionManager;
  
  constructor(config: AgentConfig) {
    // Generate session ID
    this.sessionId = `session-${Date.now()}-${this.generateRandomId()}`;
    
    // Initialize session
    this.session = {
      id: this.sessionId,
      startTime: new Date().toISOString(),
      workspace: config.workspace,
      command: process.argv[1] || 'autoagent',
      args: process.argv.slice(2),
      issuesPlanned: [],
      issuesCompleted: [],
      issuesFailed: [],
      status: 'active',
      provider: config.primaryProvider,
      metadata: {
        gitBranch: await this.getGitBranch(),
        gitCommit: await this.getGitCommit()
      }
    };
    
    // Save initial session
    this.sessionManager = new SessionManager();
    await this.sessionManager.saveSession(this.session);
    await this.sessionManager.setCurrentSession(this.sessionId);
  }
  
  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
```

### Session Manager

```typescript
export class SessionManager {
  private sessionsDir: string;
  
  constructor() {
    this.sessionsDir = path.join(os.homedir(), '.autoagent', 'sessions');
  }
  
  async saveSession(session: Session): Promise<void> {
    await fs.mkdir(this.sessionsDir, { recursive: true });
    const sessionFile = path.join(this.sessionsDir, `${session.id}.json`);
    await fs.writeFile(sessionFile, JSON.stringify(session, null, 2));
  }
  
  async setCurrentSession(sessionId: string): Promise<void> {
    const currentLink = path.join(this.sessionsDir, 'current');
    const sessionFile = path.join(this.sessionsDir, `${sessionId}.json`);
    
    // Remove existing symlink if exists
    try {
      await fs.unlink(currentLink);
    } catch {}
    
    // Create new symlink
    await fs.symlink(sessionFile, currentLink);
  }
  
  async getCurrentSession(): Promise<Session | null> {
    try {
      const currentLink = path.join(this.sessionsDir, 'current');
      const content = await fs.readFile(currentLink, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }
  
  async listSessions(limit: number = 10): Promise<Session[]> {
    try {
      const files = await fs.readdir(this.sessionsDir);
      const sessionFiles = files
        .filter(f => f.endsWith('.json') && f !== 'current')
        .sort((a, b) => b.localeCompare(a)) // Newest first
        .slice(0, limit);
      
      const sessions: Session[] = [];
      for (const file of sessionFiles) {
        const content = await fs.readFile(path.join(this.sessionsDir, file), 'utf-8');
        sessions.push(JSON.parse(content));
      }
      
      return sessions;
    } catch {
      return [];
    }
  }
}
```

### Benefits of Session Tracking

1. **Resume Capability**: Future feature to resume interrupted sessions
2. **Audit Trail**: Complete history of what was executed when
3. **Debugging**: Correlate issues and executions to specific runs
4. **Analytics**: Track performance, success rates, common failures
5. **Hook Context**: Provide rich context to hook scripts

## Implementation

### Hook Execution Points

```typescript
export class AutonomousAgent {
  private hookManager: HookManager;
  
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
    
    // Emit the actual event
    this.emit('execution-start', issueNumber);
    
    // Post-execution-start hook
    await this.hookManager.executeHooks('PostExecutionStart', {
      issueNumber,
      issueTitle: issue.title
    });
    
    // ... execution logic ...
    
    // Before marking complete
    const preEndHookResult = await this.hookManager.executeHooks('PreExecutionEnd', {
      issueNumber,
      issueTitle: issue.title,
      success: result.success,
      filesModified: result.filesModified,
      output: result.output
    });
    
    if (preEndHookResult.blocked) {
      result.success = false;
      result.error = preEndHookResult.reason;
    }
    
    // Emit the actual event
    this.emit('execution-end', result);
    
    // Post-execution-end hook
    await this.hookManager.executeHooks('PostExecutionEnd', result);
    
    return result;
  }
}
```

### Hook Manager

```typescript
export class HookManager {
  private config: HookConfig;
  
  async executeHooks(
    hookPoint: string,
    data: any
  ): Promise<HookResult> {
    const hooks = this.config.hooks[hookPoint] || [];
    
    for (const hook of hooks) {
      // Replace template variables
      const command = this.interpolateCommand(hook.command, data);
      
      const input = JSON.stringify({
        eventName: hookPoint,
        sessionId: this.sessionId,
        workspace: this.workspace,
        timestamp: Date.now(),
        ...data
      });
      
      try {
        const result = await this.runCommand(command, input, hook.timeout);
        
        // Exit code 2 blocks for Pre hooks
        if (result.exitCode === 2 && hookPoint.startsWith('Pre')) {
          return {
            blocked: true,
            reason: result.stderr || 'Blocked by hook'
          };
        }
        
        // Handle JSON output
        if (result.stdout) {
          try {
            const jsonOutput = JSON.parse(result.stdout);
            if (jsonOutput.decision === 'block') {
              return {
                blocked: true,
                reason: jsonOutput.reason
              };
            }
          } catch {
            // Not JSON, continue
          }
        }
      } catch (error) {
        // Log but don't fail on hook errors (unless blocking)
        console.error(`Hook error: ${error}`);
      }
    }
    
    return { blocked: false };
  }
  
  private interpolateCommand(command: string, data: any): string {
    // Template variables are interpolated in the command string
    // The actual data is passed via JSON on stdin
    return command.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  }
}
```

## Template Variables

Template variables (e.g., `{{issueNumber}}`, `{{issueTitle}}`) are interpolated in hook commands before execution. The complete event data is passed to the hook via JSON on stdin, allowing hooks to access all available information, not just what's in the command string.

```bash
# Command with template variables
"command": "echo 'Starting issue {{issueNumber}}' >> log.txt"

# Hook receives full data via stdin:
# {
#   "eventName": "PreExecutionStart",
#   "issueNumber": 42,
#   "issueTitle": "Fix authentication",
#   "workspace": "/path/to/project",
#   ...
# }
```

## Example Hook Scripts

### `.autoagent/hooks/validate-execution.sh`
```bash
#!/bin/bash
# Validates execution output before marking complete

INPUT=$(cat)
SUCCESS=$(echo "$INPUT" | jq -r '.success')
FILES_MODIFIED=$(echo "$INPUT" | jq -r '.filesModified[]?')

# Only validate successful executions
if [ "$SUCCESS" != "true" ]; then
  exit 0
fi

# Check if tests were added/modified
if ! echo "$FILES_MODIFIED" | grep -q "\.test\." && ! echo "$FILES_MODIFIED" | grep -q "\.spec\."; then
  echo "ERROR: No test files were modified" >&2
  echo "Please add tests for the implemented functionality" >&2
  exit 2  # Block completion
fi

# Run linting
if ! npm run lint --silent; then
  echo "ERROR: Linting failed" >&2
  exit 2  # Block completion
fi

exit 0
```

### `.autoagent/hooks/check-incomplete-todos.sh`
```bash
#!/bin/bash
# Stop hook - check for incomplete todos

INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | jq -r '.sessionId')

# Check if there are incomplete todos
INCOMPLETE=$(grep -c "\[ \]" TODO.md || true)

if [ "$INCOMPLETE" -gt 0 ]; then
  # Return JSON to block stopping
  cat <<EOF
{
  "decision": "block",
  "reason": "There are $INCOMPLETE incomplete todos remaining. Please complete them or mark this as intentional."
}
EOF
  exit 0
fi

echo "All todos completed, safe to stop"
exit 0
```

## Hook Registry

Common hook patterns for AutoAgent:

| Hook Point | Common Use Cases |
|------------|------------------|
| `PreExecutionStart` | Check prerequisites, validate environment |
| `PostExecutionStart` | Start timers, send notifications |
| `PreExecutionEnd` | Validate output, run tests |
| `PostExecutionEnd` | Commit changes, update tracking |
| `PreGitCommit` | Lint, format, run tests |
| `PostGitCommit` | Push to remote, update issue tracker |
| `Stop` | Check incomplete work, save state |

## Security Considerations

1. **Sandboxing**: Consider running hooks in restricted environment
2. **Timeout**: Enforce maximum execution time
   - Default: 60 seconds (60000ms)
   - Configurable per hook via `timeout` field
   - Timeout kills the hook process and treats it as a non-blocking error
3. **Input Validation**: Sanitize all JSON data
4. **Path Restrictions**: Limit file access
5. **Command Validation**: No arbitrary code execution in templates

## Benefits

1. **Control**: Block unsafe operations before they happen
2. **Automation**: Auto-format, lint, test without manual steps
3. **Integration**: Connect with CI/CD, issue trackers, monitoring
4. **Flexibility**: Users customize behavior without forking
5. **Deterministic**: Rules as code, not LLM instructions

This hook system transforms AutoAgent into an extensible platform while maintaining security and simplicity.

## Implementation Plan

Since this is a single-user project, we can make clean breaking changes without migration concerns. Here are the key implementation steps:

### 1. Add Hook Infrastructure
- Create `HookManager` class to handle hook execution
- Implement JSON stdin/stdout communication with hook scripts
- Add timeout and error handling for hook execution
- Support both command hooks and built-in hook types

### 2. Restructure Event Emission
Transform current event emissions to include pre/post hooks:

```typescript
// Current implementation
this.emit('execution-start', issueNumber);

// New implementation with hooks
await this.hookManager.executeHooks('PreExecutionStart', {
  issueNumber,
  issueTitle: issue.title,
  issueFile,
  planFile
});
this.emit('execution-start', issueNumber);
await this.hookManager.executeHooks('PostExecutionStart', data);
```

### 3. Extract Git Operations
- Move `performGitCommitAndPush()` logic into built-in hook handlers
- Create `GitCommitHook` and `GitPushHook` classes
- Remove hardcoded git logic from `AutonomousAgent`
- Git operations become configurable hooks in `PostExecutionEnd`

### 4. Add Session Tracking (Detailed above)
- Create SessionManager class for session persistence
- Store sessions in ~/.autoagent/sessions/
- Track session lifecycle and issue progress
- Provide session context to all hooks

### 5. Update Config System
Breaking changes to configuration:
- Remove `AgentConfig.autoCommit` field
- Remove `UserConfig.gitAutoCommit` and `gitAutoPush` boolean flags
- Add `hooks` object to `UserConfig`
- Update ConfigManager to handle hooks configuration

### 6. Rewrite Config Commands
Transform convenience commands to manage hooks:
```typescript
// set-auto-commit true
// - Adds git-commit hook to PostExecutionEnd
// - Removes gitAutoCommit boolean handling

// set-auto-commit false  
// - Removes git-commit hook from PostExecutionEnd
```

### 7. Update CLI Flags
The `--commit` and `--push` flags will be completely removed since git operations are now handled through the hooks system. Users should use the config commands (`set-auto-commit`, `set-auto-push`) to manage these behaviors.

### 8. Testing Strategy
- Unit tests for HookManager
- Integration tests for hook execution flow
- Test blocking/non-blocking behavior
- Test timeout handling
- Test template variable interpolation

This implementation plan allows for a clean, breaking change that simplifies the codebase while adding powerful extensibility through hooks.