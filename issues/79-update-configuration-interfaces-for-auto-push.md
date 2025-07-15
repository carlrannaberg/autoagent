# Issue 79: Update Configuration Interfaces for Auto-Push

## Title
Update Configuration Interfaces for Auto-Push

## Description
Update the UserConfig and AgentConfig interfaces to support auto-push functionality, including fields for enabling auto-push, specifying remote name, and optionally specifying target branch.

## Requirements
- Extend configuration interfaces to support auto-push functionality
- Maintain backward compatibility with existing configurations
- Follow the established configuration priority hierarchy

## Tasks
- [ ] Add gitAutoPush boolean field to UserConfig interface
- [ ] Add gitPushRemote string field to UserConfig interface with default 'origin'
- [ ] Add optional gitPushBranch field to UserConfig interface
- [ ] Add optional autoPush boolean field to AgentConfig interface
- [ ] Update ExecutionResult interface if needed for push tracking
- [ ] Add RollbackData fields for tracking push operations
- [ ] Ensure backward compatibility with existing configurations
- [ ] Update type exports as needed

## Acceptance Criteria
- [ ] UserConfig interface includes all necessary auto-push fields
- [ ] AgentConfig interface supports runtime auto-push control
- [ ] All fields have appropriate TypeScript types and JSDoc comments
- [ ] Existing configuration files continue to work without modification
- [ ] Default values are properly defined for new fields

## Additional Context
These interface updates establish the configuration structure for the auto-push feature. The configuration should follow the existing patterns and maintain backward compatibility. The priority hierarchy should be: CLI flags > AgentConfig > UserConfig > defaults.

## Related Issues
- Depends on: Issue 78 (git push utility functions)
- Part of git auto-push configuration feature implementation
