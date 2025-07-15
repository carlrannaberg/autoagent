# Plan for Issue #99: Write hook system unit tests

## Overview
Create comprehensive unit tests for all hook system components including HookManager, SessionManager, and built-in hooks.

## Prerequisites
- Hook system implementation completed (issues #87-98)
- Testing framework (Vitest) configured

## Implementation Steps

### Phase 1: HookManager Tests
1. Create test/core/hook-manager.test.ts
2. Test hook execution lifecycle:
   - Sequential execution of multiple hooks
   - Blocking behavior for Pre hooks
   - Non-blocking behavior for Post hooks
   - Timeout handling and enforcement
3. Test command execution:
   - Template variable interpolation
   - JSON input via stdin
   - Output capture (stdout/stderr)
   - Exit code handling
4. Test built-in hook integration:
   - GitCommitHook delegation
   - GitPushHook delegation
   - Config passing to built-in hooks
5. Test error scenarios:
   - Command not found
   - Hook timeout
   - Invalid JSON output
   - Process crashes

### Phase 2: SessionManager Tests  
1. Create test/core/session-manager.test.ts
2. Test session lifecycle:
   - Session creation with unique IDs
   - Session loading from disk
   - Current session tracking
3. Test session operations:
   - Update session state
   - List recent sessions
   - End session with status
   - Handle concurrent sessions
4. Test persistence:
   - Directory creation
   - File permissions
   - JSON serialization
   - Symlink management

### Phase 3: GitCommitHook Tests
1. Create test/hooks/git-commit-hook.test.ts
2. Test commit creation:
   - Check for changes before commit
   - Stage all changes
   - Create commit with message
   - Handle no-verify flag
3. Test message interpolation:
   - Replace template variables
   - Handle missing variables
   - Escape special characters
4. Test error handling:
   - No changes to commit
   - Git not available
   - Commit hook failures

### Phase 4: GitPushHook Tests
1. Create test/hooks/git-push-hook.test.ts
2. Test push operations:
   - Push to remote/branch
   - Use current branch by default
   - Handle authentication failures
   - Network error handling
3. Test configuration:
   - Custom remote names
   - Branch specifications
   - Error messaging

### Phase 5: Integration Coverage
1. Mock all external dependencies:
   - child_process.exec
   - fs operations
   - Date/time functions
2. Ensure test isolation:
   - Clear mocks between tests
   - Reset environment
   - Clean up test files
3. Coverage targets:
   - >90% line coverage
   - All critical paths tested
   - Edge cases covered

## Testing Approach
- Use Vitest framework consistently
- Mock all file system and git operations
- Test both success and failure paths
- Verify proper error propagation
- Ensure deterministic test execution

## Success Criteria
- All test files created and passing
- >90% code coverage for hook components
- No flaky tests
- Clear test descriptions
- Comprehensive edge case coverage

## Notes
- Focus on unit tests only (integration tests in separate issue)
- Mock all external dependencies
- Follow existing test patterns in codebase
- Ensure tests are maintainable and clear