# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

_No unreleased changes yet._

## [0.0.2] - 2025-06-30

### Fixed
- Add verbose flag back to release scripts
- Stream Claude output in rollback script
- Stream Claude output in release script
- Add --dangerously-skip-permissions to release scripts
- Add required flags for autonomous operation
- Provider implementations now use correct CLI commands
- Provider availability check for different CLI version outputs
- Update tests for AGENT.md refactoring
- Update Dependabot configuration and CODEOWNERS

### Added
- Release rollback script for undoing releases that weren't published
- Automated release preparation script

### Changed
- Add directory access and verbose mode to release script
- Enhance release script with better git log analysis
- Adopt AGENT.md standard for provider instructions
- Consolidate provider instructions into common file
- Update dependencies and fix Dependabot configuration

### Removed
- NPM token setup guide
- Unnecessary markdown file
- Provider symlinks from git repository

### Documentation
- Replace all yourusername placeholders with carlrannaberg
- Fix placeholder content in README and remove execution history from AGENT.md
- Enhance AGENT.md with comprehensive guidelines
- Update CLAUDE.md and GEMINI.md
- Add PROVIDER_INSTRUCTIONS_README.md

## [0.0.1] - 2025-06-30

### 🎉 Initial Beta Release

This is the first beta release of AutoAgent, a powerful npm package that enables running autonomous AI agents using Claude or Gemini for task execution.

### Features

- **Multiple AI Provider Support**: Seamlessly work with Claude (via Anthropic Claude Code) or Gemini (via Google AI Studio)
- **Automatic Provider Failover**: Intelligent switching between providers when rate limits are encountered
- **Rate Limit Management**: Built-in tracking and cooldown periods to respect API limits
- **Issue and Plan Tracking**: Structured approach to breaking down complex tasks
- **Git Integration**: Optional auto-commit functionality with AI co-authorship attribution
- **Provider Learning System**: Tracks execution history and patterns to improve over time
- **CLI Interface**: Rich command-line interface for all operations
- **Programmatic API**: Full TypeScript API for integration into other projects
- **Progress Tracking**: Real-time progress updates and cancellation support
- **Configuration Management**: Flexible global and local configuration options
- **Comprehensive Documentation**: Detailed guides for setup, usage, and troubleshooting

### CLI Commands

- `autoagent run` - Execute issues with various options
- `autoagent create` - Create new issues with AI assistance
- `autoagent status` - Check project and provider status
- `autoagent config` - Manage configuration settings
- `autoagent check` - Verify provider availability
- `autoagent bootstrap` - Initialize project from master plan

### Technical Details

- Written in TypeScript with strict mode enabled
- Minimal dependencies (chalk and commander only)
- Comprehensive test coverage
- Cross-platform compatibility (Windows, macOS, Linux)
- Node.js 22.0.0+ support

### Package Information

- **npm Package**: `autoagent-cli`
- **Package Size**: ~30KB (gzipped)
- **License**: MIT
- **Repository**: https://github.com/autoagent/autoagent

### Contributors

Special thanks to all AutoAgent Contributors who made this release possible.

---

For more information, see the [README](README.md) and [documentation](docs/).