# Issue 66: Add user-friendly error messages for git validation

## Description
Enhance error messages throughout the git validation system to provide clear, actionable guidance for users.

## Requirements

Enhance error messages throughout the git validation system to provide clear, actionable guidance for users.

## Acceptance Criteria
- [ ] Update validateGitForAutoCommit() to use multi-line error messages
- [ ] Include specific remediation steps in each error
- [ ] Add command examples for fixing issues
- [ ] Include alternative options (e.g., disable auto-commit)
- [ ] Ensure consistent formatting across all error messages
- [ ] Add progress reporting for successful validation in debug mode

## Technical Details
Error messages should:
1. Clearly state the problem
2. Provide specific commands to fix the issue
3. Offer alternatives when appropriate
4. Use consistent formatting with line breaks
5. Be helpful without being verbose

## References
- Master Plan: `./specs/git-repository-check-for-autocommit.md`
- Related Files: `src/core/autonomous-agent.ts`, `src/utils/git.ts`
- Depends on: Issues 63, 65
