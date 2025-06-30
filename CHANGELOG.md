# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Provider availability check now works correctly with different CLI version outputs
  - Claude CLI detection is now case-insensitive
  - Gemini CLI detection only checks exit code
- Resolved all ESLint strict-boolean-expressions errors (240+ errors fixed)
- Fixed TypeScript compilation errors from strict type checking
- Fixed failing tests and improved test coverage
- Fixed provider implementations to use correct CLI commands according to official documentation
  - Claude now uses `-p` flag and `--add-dir` for directory access
  - Gemini now uses positional arguments and `--include-all` flag

### Changed
- Adopted AGENT.md standard for provider instructions
  - CLAUDE.md and GEMINI.md are now symlinks/stubs pointing to AGENT.md
  - Consolidated all provider instructions into a single source of truth
- Enhanced AGENT.md with comprehensive guidelines:
  - Added Building and Running section with actual npm scripts
  - Added detailed TypeScript/JavaScript coding standards
  - Added comprehensive Jest testing conventions
  - Added comments policy
  - Added AI CLI Reference section with accurate command documentation
- Updated commander dependency to v12.1.0
- Completely rewrote provider implementations to use actual CLI interfaces

### Added
- Added `npm run typecheck` script to catch TypeScript errors early
- Added `npm run check` script that runs typecheck, lint, and tests concurrently
- Added npm-run-all dev dependency for concurrent task execution
- Added extractFilesChanged method to base Provider class

### Removed
- Removed redundant Execution History section from AGENT.md (tracked in CHANGELOG.md)
- Removed provider instruction symlinks from git repository (auto-generated locally)
- Removed NPM token setup guide (no longer needed)
- Removed non-existent `autonomous`, `--issue`, `--plan`, `--context` commands from providers

### Documentation
- Fixed all placeholder content (yourusername → carlrannaberg)
- Updated all GitHub URLs to use correct username
- Removed non-existent support email and documentation website references
- Enhanced documentation accuracy throughout
- Fixed documentation references to non-existent auth commands
- Updated troubleshooting examples to use correct CLI flags

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