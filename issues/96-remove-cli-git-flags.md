# Issue 96: Remove CLI git flags

## Description
Remove the --commit and --push CLI flags from the run command as part of the hooks migration.

## Requirements
- Remove --commit flag from run command
- Remove --push flag from run command  
- Remove --no-commit flag variant
- Remove --no-push flag variant
- Update command help text
- Remove any flag processing logic

## Acceptance Criteria
- [ ] Git-related flags removed from run command options
- [ ] Flag parsing logic removed
- [ ] Help text updated to remove flag documentation
- [ ] Tests updated to not use old flags
- [ ] No references to removed flags in code
- [ ] CLI still functions correctly

## Technical Details
Changes needed:
- Update run command option definitions
- Remove flag processing in command handler
- Update any flag conflict checking
- Clean up related imports
- Update integration tests