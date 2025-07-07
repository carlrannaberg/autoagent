# Test Fix Summary - Key Learnings from AutoAgent Test Suite

## Overview
This document summarizes the critical test fixing experience from resolving 64 test failures across the AutoAgent codebase. These learnings should be incorporated into AGENT.md to help future developers avoid similar issues.

## 1. Promisified exec Mocking Pattern

### Problem
Tests were using callback-style mocks for `exec`, but the actual git utility functions use `execAsync = promisify(exec)` which expects promise-style results.

**Error Pattern**: "Cannot read properties of undefined (reading 'trim')"

### Root Cause
Node.js's `promisify` function has special handling for `child_process.exec`:
- On success: Returns `{stdout: string, stderr: string}`
- On failure: Throws error with `stdout` and `stderr` properties attached

### Solution
Implement custom promisify handler in the mock:

```typescript
vi.mock('child_process', () => {
  const mockExec = vi.fn();
  
  // Add custom promisify support to handle exec's special behavior
  (mockExec as any)[Symbol.for('nodejs.util.promisify.custom')] = 
    (command: string, options?: ExecOptions): Promise<{ stdout: string; stderr: string }> => {
      return new Promise((resolve, reject) => {
        const callback = (error: any, stdout: string, stderr: string): void => {
          if (error !== null && error !== undefined) {
            // On error, attach stdout and stderr to the error object
            error.stdout = stdout;
            error.stderr = stderr;
            reject(error);
          } else {
            // On success, return object with stdout and stderr
            resolve({ stdout, stderr });
          }
        };
        
        if (options) {
          mockExec(command, options, callback);
        } else {
          mockExec(command, callback);
        }
      });
    };
  
  return { exec: mockExec };
});
```

## 2. Dynamic Import Mocking Issues

### Problem
Code using dynamic imports (`await import('../utils/git')`) bypassed module-level mocks, causing tests to fail.

### Solution
Mock at the module level with proper implementations:

```typescript
vi.mock('../../../src/utils/git', () => ({
  getCurrentBranch: vi.fn().mockImplementation(async () => {
    const { exec } = await import('child_process');
    const execMock = exec as any;
    // Implementation that uses the mocked exec
    return 'main';
  }),
  pushToRemote: vi.fn().mockImplementation(async (options) => {
    // Mock implementation
    return { success: true, remote: 'origin', branch: 'main' };
  }),
  // ... other functions
}));
```

## 3. Mock Hoisting for Initialization Order

### Problem
"Cannot access 'execMock' before initialization" errors when mocks were defined after vi.mock calls.

### Solution
Use `vi.hoisted()` for mocks that need to be defined before use:

```typescript
const execMock = vi.hoisted(() => vi.fn());

vi.mock('child_process', () => ({
  exec: execMock
}));

// Now execMock can be used in beforeEach
beforeEach(() => {
  execMock.mockImplementation((cmd: string, callback: any) => {
    // Mock implementation
  });
});
```

## 4. Git Command Mock Coverage

### Problem
Tests timed out because git commands used during initialization weren't mocked.

### Required Git Commands to Mock
Always mock these commands for git-related tests:
- `git --version`
- `git rev-parse --git-dir`
- `git status`
- `git config user.name`
- `git config user.email`
- `git rev-parse --abbrev-ref HEAD`
- `git remote`

### Solution
```typescript
execMock.mockImplementation((cmd: string, callback: any) => {
  // Default behavior for common git commands
  if (cmd === 'git --version') {
    callback(null, 'git version 2.39.0\n', '');
  } else if (cmd === 'git rev-parse --git-dir') {
    callback(null, '.git\n', '');
  } else if (cmd === 'git status') {
    callback(null, 'On branch master\nnothing to commit, working tree clean\n', '');
  } else if (cmd === 'git config user.name') {
    callback(null, 'Test User\n', '');
  } else if (cmd === 'git config user.email') {
    callback(null, 'test@example.com\n', '');
  } else {
    // Default success for other commands
    callback(null, '', '');
  }
});
```

## 5. Type Import and Interface Issues

### Problems Found
1. Incorrect type imports: `Config` vs `UserConfig`
2. Missing required properties in test objects
3. Iterator spread operator issues

### Solutions
```typescript
// Correct import
import { UserConfig, ProviderName, ExecutionResult } from '../../../src/types';

// Ensure all required properties
const result: ExecutionResult = {
  success: true,
  issueNumber: 1,
  duration: 100,  // Don't forget required properties!
  output: 'Test output'
};

// Use Array.from() for iterators
const items = Array.from(fileManager.getAllIssues());  // Not [...fileManager.getAllIssues()]
```

## 6. CLI Command Flag Handling

### Problem
Commander.js wasn't properly handling conflicting flags like `--verify`/`--no-verify`.

### Solution
Track actual flag presence during parsing:

```typescript
class RunCommand extends Command {
  private trackedFlags = {
    noVerify: false,
    verify: false,
    noPush: false,
    push: false
  };

  constructor() {
    super('run');
    // Override parseOptions to track flags
    const originalParseOptions = this.parseOptions.bind(this);
    this.parseOptions = function(argv: string[]) {
      const result = originalParseOptions(argv);
      // Track which flags were actually provided
      this.trackedFlags.noVerify = argv.includes('--no-verify');
      this.trackedFlags.verify = argv.includes('--verify');
      return result;
    };
  }
}
```

## 7. Test Validation Best Practices

### Key Principles
1. **Zero tolerance for failing tests** - Every test failure is critical
2. **Match actual async patterns** - If code uses promisify, mock accordingly
3. **Mock at the right level** - Module-level for dynamic imports
4. **Comprehensive git mocking** - Mock all git commands used during init
5. **Type safety** - Fix all TypeScript errors, they indicate real issues

### Common Pitfalls to Avoid
1. Don't assume callback mocks work for promisified functions
2. Don't forget initialization-time git commands
3. Don't skip required properties in test objects
4. Don't ignore TypeScript compiler errors
5. Don't rely on parsed values alone for conflicting CLI flags

## Recommended AGENT.md Updates

### Add New Section: "Advanced Test Mocking Patterns"

1. **Promisified exec Mocking** - Include the complete pattern with Symbol.for
2. **Dynamic Import Handling** - Show module-level mock examples
3. **Mock Hoisting** - Explain when and how to use vi.hoisted()
4. **Git Command Coverage** - List all commands that must be mocked
5. **CLI Flag Tracking** - Show parseOptions override pattern

### Update Existing Sections

1. **Mocking (Vitest)** - Add promisify pattern as primary example
2. **Testing Guidelines** - Emphasize zero tolerance for test failures
3. **Common Pitfalls** - Add the pitfalls discovered during this fix

## Summary Statistics

- **Total Failures Fixed**: 64
- **Files Modified**: 15+ test files
- **Key Patterns Fixed**: 
  - Git mocking: 50+ tests
  - Type imports: 10+ files
  - CLI flags: 7 tests
- **Time Saved**: Test execution reduced from timeouts to milliseconds

These patterns represent hard-won knowledge from debugging complex test failures. Incorporating them into AGENT.md will save future developers significant time and frustration.