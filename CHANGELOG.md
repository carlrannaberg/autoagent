# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Fix TypeScript type errors in provider-learning.test.ts by replacing `vi.Mock` with proper type assertions
- Fix all lint errors across test files (159 errors and 16 warnings resolved)
  - Added proper return types to all functions
  - Fixed nullable value checks with explicit comparisons
  - Removed unused variables or prefixed with underscore
  - Added ESLint configuration to allow console.log in benchmark files
  - Fixed async functions without await statements
  - Replaced `any` types with proper types or `unknown`

### Changed
- Update mock providers in tests to use proper TypeScript types instead of `any`

### Added
- Add git instructions to AGENT.md for updating CHANGELOG.md before commits

## [0.1.3] - 2025-07-01

### Changed
- Provider learning system now uses AI to intelligently update AGENT.md instead of manual metrics tracking
  - Removed execution history, performance metrics, and pattern sections from provider files
  - Provider learning now runs after each task completion to capture insights in real-time
  - AI analyzes git diffs and actual code changes to determine valuable learnings
  - Only updates AGENT.md when there are meaningful insights to add

### Fixed
- Fixed handling of nullable error strings in provider learning to prevent potential runtime errors

### Added
- Added `getExecutionCount()` method to PatternAnalyzer for tracking execution history

## [0.1.2] - 2025-07-01

### Fixed
- Fixed `autoagent run --all` command to properly detect dynamically created tasks
  - The command now reloads the todo list after each issue execution
  - Processes any new tasks that were created during execution
  - Prevents skipping of tasks that are added to TODO.md while the agent is running

## [0.1.1] - 2025-07-01

### Fixed
- Bootstrap command now properly provides issue and plan templates to AI during decomposition
  - AI receives the correct templates to ensure consistent file creation
  - Fixes issue where plans might not follow the expected format

### Changed
- Bootstrap issue titles now reference the specific plan file being implemented
  - Changed from generic "Bootstrap project from master-plan.md" to "Implement plan from {planname}"
  - Makes it clearer which plan file is being decomposed
- Release scripts now show estimated timing information (3-5 minutes) during execution
  - Users are informed that the process takes time while Claude analyzes the codebase
  - Reduces uncertainty about whether the script is running correctly

### Documentation
- Added semantic versioning guidelines to AGENT.md
  - Clear guidance on when to use patch, minor, or major releases
  - Focus on user perspective and intended behavior
  - Examples to help decide between patch fixes and minor features

## [0.1.0] - 2025-07-01

### Added
- Real-time streaming output support for Claude provider
  - Shows progress as Claude processes issues
  - Uses stream-json output format for better visibility
  - Includes formatted headers and footers for execution sessions
- Progress tracking and event system for autonomous agent
  - `onProgress` callback with percentage-based progress updates
  - Event emitters for execution-start, execution-end, error, interrupt, and debug
  - Better user feedback during issue execution
- StreamFormatter utility for consistent output formatting
  - Handles streaming JSON messages from providers
  - Formats tool calls, text content, and execution results
  - Provider-specific formatting support
- Provider base class methods for streaming process execution
  - `spawnProcessWithStreaming` for real-time output capture
  - Support for both standard and streaming JSON formats

### Changed
- CLI enhanced with comprehensive progress feedback
  - Shows execution progress with percentages
  - Displays success/failure status for each issue
  - Summary statistics for batch operations
  - Better error reporting with specific failure reasons
- Claude provider completely rewritten for streaming support
  - Uses stdin for content delivery (prompt via -p flag, content via stdin)
  - Processes streaming JSON output line-by-line
  - Improved error handling and debugging capabilities
  - Added --max-turns flag to prevent hanging
- Bootstrap command improvements
  - Creates both issue AND plan files during initialization
  - More descriptive issue titles that reference the source plan file
  - Better structured plan phases for master plan decomposition

### Fixed
- Fixed stdin content delivery to Claude provider
  - Separated instructions (via -p flag) from content (via stdin)
  - Properly handles large context files without command line length limits
- Improved process spawning reliability
  - Better error handling for failed spawns
  - Proper signal handling for process cancellation
- Enhanced test coverage for streaming functionality
  - Added tests for new streaming methods
  - Updated mocks to handle streaming scenarios

## [0.0.5] - 2025-07-01

### Fixed
- Removed unused top-level path import in autonomous-agent.ts that was causing @typescript-eslint/no-unused-vars lint error
- Bootstrap command now creates both issue AND plan files (previously missing plan file creation)
  - Fixes "Plan for issue #1 not found" error when running bootstrap workflow
  - Plan includes structured phases for master plan decomposition
  - Enables complete bootstrap → run workflow functionality

## [0.0.4] - 2025-06-30

### Fixed
- Added streaming output format to Claude commands in release scripts for better visibility during release preparation

### Changed
- Improved bootstrap issue generation with more descriptive titles and language
  - Bootstrap issue titles now reference the specific plan file being implemented
  - Updated issue content to use clearer terminology ("implement" instead of "bootstrap")

### Documentation
- Added critical release safety guidelines to AGENT.md to prevent accidental tag modifications for published versions

## [0.0.3] - 2025-06-30

### Fixed
- Issue filename generation now properly handles dots and special characters
  - Dots in titles (e.g., "config.json") are converted to hyphens for valid filenames
  - Multiple consecutive hyphens are collapsed to single hyphens
  - Leading and trailing hyphens are removed from filenames

### Changed
- Release preparation script enhanced with better debugging information
  - Shows commit count since last release
  - Displays Claude command being executed
  - Properly handles Claude CLI exit codes

### Documentation
- Expanded bootstrap command documentation in README
  - Added examples for custom plan files
  - Documented provider and workspace options
  - Clarified that bootstrap reads markdown files to create first actionable issue

## [0.0.2] - 2025-06-30

### Fixed
- Provider implementations now use correct CLI commands according to official documentation
  - ClaudeProvider uses `-p` flag with `--add-dir` and `--dangerously-skip-permissions`
  - GeminiProvider uses positional arguments with `--include-all` and `--yolo`
  - Both providers now work autonomously without user interaction
- Provider availability detection for different CLI version outputs
  - Claude CLI detection is now case-insensitive
  - Gemini CLI only checks exit code (doesn't require specific output)
- Release and rollback scripts now properly stream Claude output to console
- All TypeScript strict mode and ESLint errors resolved (240+ errors fixed)
- Test failures after AGENT.md refactoring

### Added
- `npm run typecheck` script to catch TypeScript errors early
- `npm run check` script for concurrent validation (typecheck, lint, test)
- `npm run release:rollback` script to undo unpublished releases
  - Checks npm registry to prevent rolling back published versions
  - Handles tag deletion, version revert, and CHANGELOG updates
- AI CLI Reference section in AGENT.md with accurate command documentation
- `extractFilesChanged` method to base Provider class
- npm-run-all dev dependency for concurrent task execution

### Changed
- Adopted AGENT.md standard for provider instructions
  - CLAUDE.md and GEMINI.md now point to unified AGENT.md
  - Consolidated all provider instructions into single source of truth
- Enhanced AGENT.md with comprehensive sections:
  - Building and Running with actual npm scripts
  - TypeScript/JavaScript coding standards
  - Jest testing conventions
  - Comments policy
- Updated commander dependency from v11.1.0 to v12.1.0
- Completely rewrote provider implementations to use actual CLI interfaces

### Removed
- Non-existent `autonomous`, `--issue`, `--plan`, `--context` commands from providers
- Redundant Execution History section from AGENT.md (tracked in CHANGELOG)
- Provider instruction symlinks from git repository (auto-generated locally)
- NPM token setup guide (no longer needed)
- Incorrect placeholder content and email addresses throughout documentation

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