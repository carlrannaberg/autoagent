# Issue 74: Add CLI flags for run command

## Requirement
Add `--verify` and `--no-verify` CLI flags to the run command to control git hook behavior at runtime.

## Acceptance Criteria
- [ ] Add `--verify` flag to force git hooks enabled
- [ ] Add `--no-verify` flag to skip git hooks
- [ ] Handle conflicting flags gracefully (warn user, use --no-verify)
- [ ] Pass resolved `noVerify` setting to AutonomousAgent
- [ ] Update command help text with new options
- [ ] Maintain backward compatibility (no flags = use config)

## Technical Details
This issue adds CLI flags to allow users to override the git no-verify configuration on a per-execution basis.

### Flag Behavior:
- `--verify`: Force hooks enabled (noVerify = false)
- `--no-verify`: Skip hooks (noVerify = true)
- No flags: Use configuration default
- Both flags: Warn and use --no-verify

### Key Implementation Points:
1. Update RunOptions interface
2. Add option definitions to command
3. Implement conflict resolution
4. Pass settings to agent
5. Update help documentation

## Dependencies
- Issue 73: Update autonomous agent git commit logic

## Testing Requirements
- Unit tests for flag parsing
- Tests for conflict resolution
- Tests for agent configuration
- Integration tests for CLI execution
- Verify help text updates

## Resources
- Master Plan: `./specs/git-commit-no-verify-configuration.md`