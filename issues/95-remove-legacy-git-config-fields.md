# Issue 95: Remove legacy git config fields

## Description
Remove the legacy boolean git configuration fields as part of the migration to the hooks system.

## Requirements
- Remove autoCommit from AgentConfig interface
- Remove gitAutoCommit from UserConfig interface
- Remove gitAutoPush from UserConfig interface
- Update all references to these fields
- Clean up any related logic

## Acceptance Criteria
- [ ] AgentConfig.autoCommit field removed
- [ ] UserConfig.gitAutoCommit field removed
- [ ] UserConfig.gitAutoPush field removed
- [ ] All TypeScript compilation errors resolved
- [ ] No references to old fields in codebase
- [ ] Tests updated to remove old field usage
- [ ] Configuration loading still works

## Technical Details
This is a breaking change that requires:
- Updating type definitions
- Removing field references in code
- Updating tests that use these fields
- Ensuring configuration migration works
- No backward compatibility needed (single-user project)