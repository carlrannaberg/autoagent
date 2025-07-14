# Issue 93: Create GitPushHook built-in hook

## Description
Implement the GitPushHook class as a built-in hook type that handles automatic git push operations.

## Requirements
- Create `src/hooks/git-push-hook.ts` with GitPushHook class
- Always use current branch (no branch override)
- Support configurable remote (default: origin)
- Rely on system git configuration for authentication
- Handle push failures with clear user messaging
- No retry logic on failures

## Acceptance Criteria
- [ ] GitPushHook class implements BuiltinHookHandler interface
- [ ] Detects current branch automatically
- [ ] Uses configured remote or defaults to 'origin'
- [ ] Executes git push with appropriate arguments
- [ ] Returns clear success/failure messages
- [ ] Handles authentication errors gracefully
- [ ] No retry attempts on failure
- [ ] Unit tests for push scenarios

## Technical Details
The GitPushHook should:
- Get current branch from git
- Use simple git push command
- Provide clear error messages on failures
- Not attempt to handle authentication
- Run after GitCommitHook in PostExecutionEnd