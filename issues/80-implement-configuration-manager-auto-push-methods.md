# Issue 80: Implement Configuration Manager Auto-Push Methods

## Title
Implement Configuration Manager Auto-Push Methods

## Description
Add methods to the ConfigManager class for managing auto-push settings, including getters and setters for gitAutoPush and gitPushRemote configuration values.

## Requirements
- Extend ConfigManager class with methods to manage auto-push settings
- Ensure backward compatibility and proper default values
- Follow existing patterns for configuration management

## Tasks
- [ ] Update getDefaultConfig() to include default values for auto-push fields
- [ ] Implement setGitAutoPush() method to set auto-push enabled/disabled
- [ ] Implement getGitAutoPush() method to retrieve auto-push setting
- [ ] Implement setGitPushRemote() method to set remote name
- [ ] Implement getGitPushRemote() method to retrieve remote name
- [ ] Add setGitPushBranch() and getGitPushBranch() methods for branch config
- [ ] Ensure proper validation of configuration values
- [ ] Handle configuration persistence correctly

## Acceptance Criteria
- [ ] Default configuration includes gitAutoPush: false and gitPushRemote: 'origin'
- [ ] All getter methods return appropriate default values when not set
- [ ] Setter methods properly persist configuration changes
- [ ] Methods follow existing ConfigManager patterns
- [ ] Configuration changes are immediately reflected in getConfig()

## Additional Context
The ConfigManager should maintain backward compatibility and handle missing configuration fields gracefully. Default values should be sensible and safe (auto-push disabled by default).

## Related Issues
- Depends on: Issue 79 (configuration interfaces)
- Part of git auto-push configuration feature implementation
