# Issue 82: Add CLI Flags for Push Control

## Title
Add CLI Flags for Push Control

## Description
Add --push and --no-push flags to the run command to allow users to control auto-push behavior on a per-execution basis, overriding global configuration settings.

## Tasks
- [ ] Add push?: boolean and noPush?: boolean to RunOptions interface
- [ ] Add --push flag to enable auto-push for current run
- [ ] Add --no-push flag to disable auto-push for current run
- [ ] Handle conflicting flags (both --push and --no-push)
- [ ] Make --push imply --commit (push requires commit)
- [ ] Pass autoPush setting to AutonomousAgent constructor
- [ ] Update command help text with new options
- [ ] Add examples to command description

## Acceptance Criteria
- [ ] --push flag enables auto-push and auto-commit for the run
- [ ] --no-push flag disables auto-push for the run
- [ ] Conflicting flags are handled with clear warning
- [ ] CLI flags override configuration file settings
- [ ] Help text clearly explains the new options
- [ ] Flag behavior is consistent with existing patterns

## Additional Context
The CLI flags should follow the existing patterns for --commit/--no-commit flags. The priority order should be: CLI flags > AgentConfig > UserConfig > defaults. When --push is used, it should automatically enable --commit since push requires a commit.

## Related Issues
- Depends on: Issue 81 (AutonomousAgent updates)
- Part of git auto-push configuration feature implementation