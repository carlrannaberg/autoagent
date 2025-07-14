# Issue 99: Write hook system unit tests

## Description
Create comprehensive unit tests for all hook system components including HookManager, SessionManager, and built-in hooks.

## Requirements
- Test HookManager hook execution and timeout handling
- Test SessionManager CRUD operations
- Test GitCommitHook with various scenarios
- Test GitPushHook functionality
- Achieve >90% code coverage for hook components

## Acceptance Criteria
- [ ] HookManager tests cover all execution paths
- [ ] SessionManager tests verify persistence
- [ ] Built-in hook tests cover success and failure
- [ ] Timeout handling properly tested
- [ ] Template interpolation tested
- [ ] Blocking behavior verified
- [ ] Error scenarios covered
- [ ] Code coverage meets target

## Technical Details
Test files needed:
- test/core/hook-manager.test.ts
- test/core/session-manager.test.ts  
- test/hooks/git-commit-hook.test.ts
- test/hooks/git-push-hook.test.ts
- Mock all external dependencies
- Test edge cases and error conditions