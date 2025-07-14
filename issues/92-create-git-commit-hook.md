# Issue 92: Create GitCommitHook built-in hook

## Description
Implement the GitCommitHook class as a built-in hook type that handles automatic git commits with configurable messages.

## Requirements
- Create `src/hooks/git-commit-hook.ts` with GitCommitHook class
- Check for changes before attempting commit
- Stage all changes with `git add -A`
- Support message template interpolation
- Handle --no-verify flag configuration
- Skip commit if no changes exist

## Acceptance Criteria
- [ ] GitCommitHook class implements BuiltinHookHandler interface
- [ ] Checks for changes using git status
- [ ] Stages all changes before commit
- [ ] Interpolates message templates ({{issueNumber}}, {{issueTitle}})
- [ ] Supports noVerify configuration option
- [ ] Returns appropriate output messages
- [ ] Handles git command failures gracefully
- [ ] Unit tests for all scenarios

## Technical Details
The GitCommitHook should:
- Use existing git utilities where possible
- Run as part of PostExecutionEnd hooks
- Support custom commit messages with variables
- Provide clear feedback when no changes exist
- Handle git configuration issues