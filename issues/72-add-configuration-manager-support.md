# Issue 72: Add configuration manager support

## Description
Update the ConfigManager class to support getting and setting the git commit no-verify configuration option.

## Requirements

Update the ConfigManager class to support getting and setting the git commit no-verify configuration option.

## Success Criteria
- [ ] Add `gitCommitNoVerify` to default configuration with `false` value
- [ ] Implement `setGitCommitNoVerify(noVerify: boolean)` method
- [ ] Implement `getGitCommitNoVerify()` method returning boolean
- [ ] Configuration persists correctly to config file
- [ ] Default value is `false` when not set (hooks enabled)
- [ ] Configuration loads correctly on restart

## Technical Details
This issue adds configuration management support for the git no-verify setting, allowing users to set a global default behavior.

### Key Implementation Points:
1. Update default configuration object
2. Add getter and setter methods
3. Ensure type safety with TypeScript
4. Handle missing configuration gracefully
5. Maintain backward compatibility

## Dependencies
- Issue 70: Update git commit interfaces and types (must be completed first)

## Testing Requirements
- Unit tests for getter and setter methods
- Tests for default value behavior
- Tests for configuration persistence
- Tests for configuration loading

## Resources
- Master Plan: `./specs/git-commit-no-verify-configuration.md`
