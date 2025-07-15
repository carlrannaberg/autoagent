# Issue 63: Add git validation method to AutonomousAgent

## Description
Add a validation method to the AutonomousAgent class that checks git repository status before auto-commit operations.

## Requirements

Add a validation method to the AutonomousAgent class that checks git repository status before auto-commit operations.

## Acceptance Criteria
- [ ] Add `validateGitForAutoCommit()` method to AutonomousAgent class
- [ ] Method should skip validation when auto-commit is disabled
- [ ] Method should check git availability using existing utilities
- [ ] Method should check if current directory is a git repository
- [ ] Method should validate git user configuration (name and email)
- [ ] Method should throw clear errors with remediation guidance
- [ ] Add debug logging when validation passes

## Technical Details
The validation method should:
1. Check if auto-commit is enabled in config
2. Verify git is installed and available
3. Verify current directory is a git repository
4. Verify git user.name and user.email are configured
5. Provide helpful error messages with specific remediation steps

## References
- Master Plan: `./specs/git-repository-check-for-autocommit.md`
- Related Files: `src/core/autonomous-agent.ts`, `src/utils/git.ts`
