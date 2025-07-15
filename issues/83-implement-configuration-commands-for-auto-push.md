# Issue 83: Implement Configuration Commands for Auto-Push

## Title
Implement Configuration Commands for Auto-Push

## Description
Add new configuration subcommands to manage auto-push settings, including set-auto-push to enable/disable the feature and set-push-remote to configure the target remote repository.

## Requirements
- Add configuration subcommands for managing auto-push settings
- Provide clear user feedback and validation
- Support both global and local configuration

## Tasks
- [ ] Add 'set-auto-push <value>' subcommand to config command
- [ ] Add 'set-push-remote <remote>' subcommand to config command
- [ ] Implement validation for boolean values in set-auto-push
- [ ] Add helpful success and warning messages
- [ ] Update 'show' subcommand to display auto-push settings
- [ ] Support both global and local configuration with -g flag
- [ ] Add error handling for invalid inputs
- [ ] Ensure consistent formatting with existing commands

## Acceptance Criteria
- [ ] set-auto-push accepts 'true' or 'false' values
- [ ] set-push-remote accepts any valid remote name
- [ ] Both commands support --global flag for global config
- [ ] show command displays current auto-push settings
- [ ] Clear success messages confirm the changes
- [ ] Helpful warnings guide users on requirements

## Additional Context
The commands should follow the existing pattern established by other configuration commands like set-auto-commit. Success messages should be informative and include relevant warnings (e.g., reminding users to ensure git remote is configured).

## Related Issues
- Depends on: Issue 80 (ConfigManager methods)
- Part of git auto-push configuration feature implementation
