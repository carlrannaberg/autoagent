# Issue 64: Integrate git validation into executeIssue method

## Description
Integrate the git validation method into the executeIssue method to perform early validation before AI execution begins.

## Requirements

Integrate the git validation method into the executeIssue method to perform early validation before AI execution begins.

## Success Criteria
- [ ] Call `validateGitForAutoCommit()` early in executeIssue method
- [ ] Validation should occur after setting isExecuting flag but before AI operations
- [ ] Validation errors should be caught and handled appropriately
- [ ] Error handling should set proper exit codes and error messages
- [ ] Validation should not affect users with auto-commit disabled
- [ ] Progress reporting should show validation step

## Technical Details
The integration should:
1. Call validation after initializing abort controller
2. Handle validation errors in the try-catch block
3. Ensure validation happens before expensive operations
4. Maintain existing error handling patterns
5. Report validation progress in debug mode

## References
- Master Plan: `./specs/git-repository-check-for-autocommit.md`
- Related Files: `src/core/autonomous-agent.ts`
- Depends on: Issue 63
