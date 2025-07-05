# Issue 75: Add configuration commands

## Requirement
Add configuration commands to set and display the git no-verify setting through the CLI.

## Acceptance Criteria
- [ ] Add `config set-git-no-verify <value>` subcommand
- [ ] Accept "true" or "false" as values (case-insensitive)
- [ ] Support both global and local configuration with `-g` flag
- [ ] Show success message with clear explanation
- [ ] Update `config show` command to display git hooks status
- [ ] Display "enabled" or "disabled (--no-verify)" for clarity

## Technical Details
This issue adds CLI commands for managing the git no-verify configuration setting.

### Command Structure:
```bash
autoagent config set-git-no-verify true    # Local config
autoagent config set-git-no-verify false -g # Global config
autoagent config show                       # Shows all settings
```

### Key Implementation Points:
1. Add new subcommand to config command
2. Parse and validate boolean input
3. Use ConfigManager to save setting
4. Update show command output
5. Provide clear user feedback

## Dependencies
- Issue 72: Add configuration manager support

## Testing Requirements
- Unit tests for command parsing
- Tests for value validation
- Tests for global vs local config
- Tests for show command output
- Integration tests for CLI usage

## Resources
- Master Plan: `./specs/git-commit-no-verify-configuration.md`