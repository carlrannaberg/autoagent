# Issue 73: Update autonomous agent git commit logic

## Description
Update the AutonomousAgent class to use the git no-verify configuration when performing automatic commits.

## Requirements

Update the AutonomousAgent class to use the git no-verify configuration when performing automatic commits.

## Acceptance Criteria
- [ ] Update `performGitCommit` method to check configuration settings
- [ ] Apply runtime `noVerify` override from AgentConfig if provided
- [ ] Fall back to user configuration `gitCommitNoVerify` setting
- [ ] Pass `noVerify` option to `createCommit` function
- [ ] Add debug logging when no-verify is enabled
- [ ] Maintain existing error handling and rollback logic

## Technical Details
This issue integrates the git no-verify functionality into the autonomous agent's commit process, respecting both configuration and runtime settings.

### Configuration Hierarchy:
1. Runtime `AgentConfig.noVerify` (highest priority)
2. User configuration `gitCommitNoVerify`
3. Default value `false` (lowest priority)

### Key Implementation Points:
1. Load configuration settings
2. Apply proper precedence rules
3. Pass settings to git utility
4. Add appropriate logging
5. Maintain existing functionality

## Dependencies
- Issue 71: Implement git utility function updates
- Issue 72: Add configuration manager support

## Testing Requirements
- Unit tests for configuration precedence
- Tests for runtime override behavior
- Tests for configuration fallback
- Integration tests for full commit flow
- Verify debug logging output

## Resources
- Master Plan: `./specs/git-commit-no-verify-configuration.md`
