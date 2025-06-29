# Issue 6: Build configuration management with rate limiting

## Requirement
Implement the ConfigManager class that handles user configuration, rate limit tracking, and provider failover settings with support for both global and local configuration files.

## Acceptance Criteria
- [ ] ConfigManager loads configurations from multiple sources
- [ ] Global config (~/.autoagent/config.json) is supported
- [ ] Local config (./.autoagent/config.json) is supported
- [ ] Rate limit tracking works with separate JSON file
- [ ] Provider rate limit status is tracked accurately
- [ ] Configuration merging follows correct precedence
- [ ] Default values are properly applied
- [ ] Rate limit cooldown periods are enforced

## Technical Details
- Use JSON files for configuration storage
- Implement configuration precedence (local > global > defaults)
- Track rate limits per provider with timestamps
- Support all configuration options from UserConfig interface
- Handle missing configuration files gracefully

## Resources
- Master Plan: `master-plan.md` (Step 7)
- Configuration type definitions
- Node.js os.homedir() for global config path
- JSON file handling best practices