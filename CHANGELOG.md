# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Fix release script hanging in interactive mode by using `npm run test:ci` instead of `npm test`
- Add explicit build step before running tests in release script to ensure proper compilation
- Add dry-run check for AI updates to prevent script hanging in dry-run mode
- Ensure `--yes` flag properly enables non-interactive mode throughout the script
- Add `--allowedTools` flag to Claude CLI invocation to prevent interactive tool permission prompts

## [0.7.1] - 2025-01-16

### Fixed
- Fix premature task completion when tool failures occur
  - Tasks now require successful tool execution before being marked complete
  - Added comprehensive validation that analyzes both tool success and task objectives
  - Prevents false positives where tasks appear complete despite errors
  - Improves reliability of autonomous execution with proper error detection

### Added
- Enhanced task completion validation system with multi-layer checks
  - New `--strict-completion` flag to enforce rigorous completion criteria
  - `--completion-confidence <threshold>` flag to set minimum confidence level (0-100, default 70)
  - `--ignore-tool-failures` flag for backward compatibility when needed
  - `--max-retry-attempts <count>` flag to control retry behavior (default 1)
  - Clear user feedback showing why tasks were incomplete with actionable recommendations
  - Automatic retry attempts for tasks that fail validation
- Tool failure detection system for improved task completion validation
  - New `ToolFailureDetector` class in `src/utils/validation.ts`
  - Pattern-based detection for common tool failures (errors, warnings, info)
  - Support for categorizing failures by type (file_not_found, permission_denied, build_error, etc.)
  - Severity classification for failures (error, warning, info)
  - Multi-line error context extraction for better error reporting
  - Helper functions for failure analysis: `hasCriticalFailures`, `groupFailuresByType`, `formatFailuresForDisplay`
- Task objective validation for intelligent completion analysis
  - New `TaskObjectiveValidator` class implementing `TaskCompletionValidator` interface
  - Analyzes original task requirements against execution output
- CLI flags for completion validation control
  - `--strict-completion`: Require strict task completion validation
  - `--completion-confidence <threshold>`: Set minimum confidence for completion (0-100), default 70
  - `--ignore-tool-failures`: Mark tasks complete even with tool failures  
  - `--max-retry-attempts <count>`: Set maximum retry attempts for failed tasks, default 1
- Configuration system support for completion validation
  - New config keys: `strictCompletion`, `completionConfidence`, `ignoreToolFailures`, `maxRetryAttempts`
  - Environment variable support: `AUTOAGENT_STRICT_COMPLETION`, `AUTOAGENT_COMPLETION_CONFIDENCE`, `AUTOAGENT_IGNORE_TOOL_FAILURES`, `AUTOAGENT_MAX_RETRY_ATTEMPTS`
  - Full config command support for getting/setting all completion validation options
  - Extracts task keywords, action verbs, and target files/functions
  - Calculates confidence scores (0-100) for task completion
  - Generates actionable recommendations when tasks are incomplete
  - Integrates with ToolFailureDetector for comprehensive failure analysis
- Task status reporter for user-friendly execution feedback
  - New `TaskStatusReporter` class in `src/utils/status-reporter.ts`
  - Clear status messages for full success, partial completion, and failures
  - Detailed tool failure reporting with severity indicators
  - Recommendations display from task validation results
  - Formatted detailed reports for verbose output with execution metrics
  - Dynamic status determination based on completion confidence levels

## [0.7.0] - 2025-07-16

### Added
- Comprehensive hook system for extensible automation
  - New `HookManager` class for managing and executing hooks at different lifecycle points
  - Built-in `GitCommitHook` for automatic git commits with configurable options
  - Built-in `GitPushHook` for automatic git push operations
  - Support for custom hooks via configuration
  - Hook execution points: PreExecutionStart, PostExecutionStop, PostIssueSuccess, PostIssueFailure
  - Configurable timeout and retry behavior for hooks
  - Clear error messages and resolution steps for common git issues
- New configuration options for hooks in `autoagent.config.json`
  - `hooks` field with support for multiple hooks per execution point
  - Built-in hooks: `git-commit` and `git-push` with customizable settings
  - Support for custom shell command hooks
- CLI commands for hook management
  - `autoagent config set-auto-commit` to enable/disable git commit hook
  - `autoagent config set-auto-push` to enable/disable git push hook
  - `autoagent config set-push-remote` to configure git push remote

### Changed
- Extracted git operations from `AutonomousAgent` into dedicated utility modules
  - Git operations now in `src/utils/git.ts` for better modularity
  - Cleaner separation of concerns between agent logic and git operations
- Improved error handling for git operations with more descriptive messages
- Enhanced test coverage with proper mocking patterns for async functions

### Fixed
- TypeScript compilation errors related to null safety and type checking
- ESLint violations for strict boolean expressions and unused variables
- Test failures due to incorrect mocking patterns
- Proper handling of nullable values throughout the codebase
- Commander.js error handling in CLI run commands

### Removed
- Legacy git configuration fields from user config
- Direct git operation flags from CLI commands (replaced with hook system)

## [0.6.4] - 2025-07-11

### Fixed
- Enforce "Issue #N" format in validators - bare "#N" references are now errors, not warnings

## [0.6.3] - 2025-07-10

### Added
- Add validation system for issues, plans, and TODO.md before run execution
  - Validates file format, required sections, and consistent issue references
  - Automatically fixes formatting issues using AI providers (--no-validate to skip)
  - Distinguishes between formatting issues (auto-fixable) and content issues
  - Supports validation for TODO.md checkbox states and issue references
  - Clear error reporting with file names, line numbers, and fix suggestions

### Fixed
- Fix issue creation generating "Acceptance Criteria" instead of "Success Criteria" section
- Fix E2E tests using incorrect file naming convention (issue-N.md instead of N-title-slug.md)

## [0.6.2] - 2025-07-09

### Added
- Add support for issue number ranges in run command
  - Run multiple sequential issues with range syntax (e.g., `autoagent run 5-8`)
  - Automatic validation that all issues in range exist before execution
  - Sequential execution with individual success/failure tracking
  - Comprehensive error handling for invalid ranges and missing issues
  - Complete test coverage for range parsing, validation, and execution

## [0.6.1] - 2025-07-08

### Fixed
- Fix TODO.md marking bug that marked multiple issues as complete
  - When marking issue #1 as complete, it would incorrectly mark #10, #11, #21, etc. as complete
  - Fixed by using exact regex pattern `\\[Issue #${issueNumber}\\]` instead of simple string matching
  - Ensures only the specific issue number is marked as complete

### Changed
- Enhance Claude Code hooks with improved validation and error handling
  - Update full-check.sh hook to be more comprehensive with better error messages
  - Check for forbidden "any" types and block commits with clear remediation instructions
  - Improve TypeScript checking with support for `--changedFiles` flag in TS >= 5.4
  - Add mandatory fix instructions for TypeScript and lint errors
  - Update run-related-tests.sh hook with better test failure handling
  - Add comprehensive test patterns for finding related test files
  - Update settings.json hook paths to use relative paths instead of environment variables

### Removed
- Remove temporary documentation files (ISSUE_66_SUMMARY.md, RELEASE_NOTES_v0.6.0.md, test-fix-summary.md)
  - These were development artifacts that should not be in the final release
  - Cleanup keeps the repository focused on essential files

## [0.6.0] - 2025-07-07

### Added
- Add comprehensive git validation functionality
  - GitValidationResult interface for structured validation results
  - validateGitEnvironment() function for thorough git environment checks
  - Validation includes git availability, repository status, and user configuration
  - Provides detailed error messages and actionable suggestions for remediation
- Add comprehensive git documentation
  - Git Requirements section in README with setup instructions
  - Enhanced troubleshooting section with specific git error solutions
  - Platform-specific installation commands for all major operating systems
  - Debug mode instructions for git validation issues
- Add noVerify option to git commit functionality
  - New optional noVerify parameter in CommitOptions interface
  - Skip pre-commit and commit-msg hooks when noVerify is true
  - Useful for bypassing git hooks during automated commits
- Add git commit no-verify configuration support
  - New gitCommitNoVerify configuration field with default value of false
  - setGitCommitNoVerify() method to update configuration
  - getGitCommitNoVerify() method to retrieve current setting
  - Configuration persists to config file and loads correctly on restart
- Add automatic git push functionality for fully automated workflows
  - New configuration commands: `config set-auto-push`, `config set-push-remote`, `config set-push-branch`
  - New CLI flags: `--push` to force push, `--no-push` to skip push
  - Auto-push is disabled by default for security reasons
  - Validates remote accessibility and permissions before pushing
  - Push failures are handled gracefully without failing the overall execution
  - Comprehensive troubleshooting documentation for common push issues
- Add git hooks control flags for run command
  - Add `--verify` flag to force enable git hooks during commits
  - Add `--no-verify` flag to skip git hooks during commits
  - Handle conflicting flags gracefully (warn user, use --no-verify)

### Changed
- Add early git validation in executeIssue method for auto-commit operations
  - Git validation now occurs before AI provider operations to save resources
  - Validation errors fail fast with clear remediation guidance
- Improve git validation error messages for better user experience
  - Use array.join('\n') for consistent multi-line formatting
  - Add alternative option to disable auto-commit in all error messages
  - Include git version info in successful validation debug messages
  - No impact on users with auto-commit disabled
- Update AGENT.md with improved test mocking guidance
  - Add advanced test mocking patterns section with promisified exec examples
  - Document common test pitfalls and solutions
  - Include NPM registry checking for release version detection
- Improve release scripts to check NPM registry
  - prepare-release.sh now checks NPM for published version as source of truth
  - Warns when git tags don't match NPM published versions
  - Uses NPM version as reference for determining changes since last release

### Fixed
- Fix all test failures (64 failures resolved, 100% pass rate achieved)
  - Fix git utility test mocking to handle promisified exec properly
  - Update test mocks to use vi.hoisted() for proper initialization order
  - Fix CLI command flag handling for --no-verify and --no-push options
  - Fix type imports and missing properties in test helpers
- Fix Claude Code hooks to work correctly
  - Update hooks to parse JSON from stdin instead of using environment variables
  - Add ESLint auto-fix capability to validation hooks
  - Update run-related-tests hook to use Vitest instead of Jest
  - Fix hook paths in settings.json to use ${CLAUDE_WORKSPACE} variable

## [0.5.4] - 2025-07-06

### Added
- Add standardized error types for AI provider operations
  - ProviderError interfaces for structured error handling
  - Factory functions for creating usage limit, rate limit, execution, and availability errors
  - Type guards for error classification and handling
  - Utility functions for error formatting and time remaining calculations
- Add pattern matching utilities for performance optimization
  - Compiled regex patterns for usage limit and rate limit detection
  - PatternMatcher class with methods for extracting timestamps and retry-after values
  - Error classification patterns for network, auth, and not found errors
  - Utility methods for determining retryable errors and version commands
- Add comprehensive test infrastructure for provider mocking
  - MockProcessConfig interface for configuring test scenarios
  - Helper functions for creating mock processes with configurable behavior
  - Specialized mocks for usage limit errors and version checks
  - Provider scenario definitions for common testing patterns

### Fixed
- Fix Claude provider usage limit detection and failover
  - Extract usage limit messages from stdout when exit code is 1
  - Properly handle usage limit messages that might not be in JSON format
  - Ensure automatic failover to alternative providers when Claude hits usage limits
- Fix autonomous agent failover logic for rate and usage limit errors
  - Check for rate limit or usage limit errors before retry attempts
  - Trigger provider failover when usage limits are detected
  - Update rate limit status and switch to alternative providers automatically

### Changed
- Enhanced integration test helpers to support issue number extraction
  - createTestIssue now returns both issue path and issue number
  - Improved test issue content format with proper numbering
  - Better support for testing scenarios with specific issue numbers

## [0.5.3] - 2025-07-06

### Fixed
- Fix reflection runner to properly handle multi-iteration scenarios
  - Ensure iteration tracking counts correctly
  - Respect max iteration limits
  - Accumulate improvements across iterations
  - Handle zero improvements in an iteration
  - Preserve improvements from each iteration
  - Support early termination on rapid score improvement
  - Handle plateauing scores correctly

### Added
- Add comprehensive integration tests for reflection system
  - Bootstrap with reflection integration tests
  - Full reflection cycle tests (spec → bootstrap → reflection → improvement → application)
  - Multi-iteration scenario tests
  - Provider integration tests for Claude and Gemini
  - Configuration integration tests
  - Error recovery and edge case tests
  - Test helpers and mock providers for reflection testing
  - Sample specification files for testing different complexity levels

## [0.5.2] - 2025-07-05

### Added
- Multi-layered rate limiting system with real-time detection
- Automatic Gemini model fallback (Pro → Flash) when rate limits are hit
- Model selection visibility showing which Gemini model is being used
- Persistent rate limit memory across sessions with cooldown periods
- Early termination of rate-limited requests to prevent waiting

### Fixed
- Fix Gemini rate limit fallback not working due to early provider rejection
- Fix Gemini Pro → Flash model fallback when Flash is selected from start
- Fix provider switching to Claude when all Gemini models are exhausted
- Fix Gemini text output appearing as bold white formatting
- Fix TODO.md not being updated after decomposition creates new issues
- Fix addIssueToTodo overwriting existing pending issues instead of appending
- Fix status command to show total issues from issues directory and completed/pending from TODO.md
- Fix failing unit tests in run command (missing mocks, reflection validation, memory leaks)
- Fix failing E2E test by adding missing plan files and proper project initialization
- Fix E2E tests to work with new TODO.md-based status tracking
- Rate limit detection now happens immediately instead of after long delays
- Gemini provider gracefully handles quota exceeded errors
- Better error messages with time estimates for rate limit recovery

## [0.5.1] - 2025-07-05

### Documentation
- Update README.md with comprehensive reflection engine documentation
  - Add detailed reflection engine section with configuration examples
  - Update CLI usage examples to show reflection-related flags (`--reflection-iterations`, `--no-reflection`)
  - Update programmatic API examples to show modern constructor pattern
  - Add environment variable documentation for testing scenarios
  - Improve configuration examples with reflection settings

## [0.5.0] - 2025-07-05

### Added
- Add reflection engine core types and interfaces for iterative decomposition improvement
  - ReflectionConfig interface for configuring reflection behavior
  - ImprovementScore type for scoring decomposition quality (0.0-1.0)
  - ChangeType enum for tracking improvement actions
  - ImprovementChange, ImprovementAnalysis, ReflectionResult, and ReflectionState interfaces
  - Integration with AgentConfig to support optional reflection configuration
- Add reflection configuration support with defaults and validation
  - Default reflection configuration values (enabled: true, maxIterations: 3, threshold: 0.1)
  - Configuration validation logic with proper range checks
  - Merge functionality for file and CLI configuration overrides
  - Automatic inclusion of reflection defaults in AgentConfig initialization
- Add improvement analyzer utility for validating and prioritizing reflection suggestions
  - Comprehensive validation logic for improvement changes
  - Scoring algorithms based on impact, complexity, and confidence
  - Change categorization and dependency detection
  - Conflict resolution for overlapping modifications
  - Topological sorting for safe execution order
- Integrate reflection engine with bootstrap process
  - Bootstrap now supports iterative improvement of decomposed issues
  - Reflection is automatically triggered when enabled in configuration
  - Progress tracking for reflection iterations during bootstrap
  - Graceful error handling maintains backward compatibility
- Add CLI options for reflection control
  - Add `--reflection-iterations <n>` flag to set maximum iterations (1-10)
  - Add `--no-reflection` flag to disable reflection for the current run
  - CLI options override configuration file settings
  - Input validation ensures iteration count is within acceptable range

### Fixed
- Fix TypeScript type mismatch between ProviderInterface and Provider base class implementations
  - Align execute method signature to use issueFile, planFile, contextFiles, and signal parameters
  - Add missing signal property to ChatOptions interface
- Fix improvement analyzer TypeScript strict mode violations
  - Properly handle undefined checks and nullable values
  - Add explicit return type annotations where required

## [0.4.0] - 2025-07-05

### Fixed
- Fix bootstrap command using hardcoded issue number 1 instead of next available
- Fix bootstrap command overwriting existing TODO items instead of preserving them
- Centralize slug generation in FileManager to ensure consistent filename generation
- Fix Claude provider to properly detect "Claude AI usage limit reached" errors for failover
  - Now checks both stdout JSON messages and stderr for usage limit errors
  - Ensures proper failover to alternative providers when Claude hits usage limits
- Fix mock provider integration in bootstrap workflow
  - Mock provider is now prioritized when AUTOAGENT_MOCK_PROVIDER=true environment variable is set
  - Ensures E2E tests can properly mock bootstrap operations without timing out
  - Provider selection logic now checks for mock provider first in both getProviderForOperation and getFirstAvailableProvider
- Fix E2E test failures in run-spec-file.test.ts
  - Fixed workspace path access using getPath() method instead of accessing path property directly
  - Fixed test expectations to match actual bootstrap output messages
  - Fixed edge case test content to avoid false positive issue detection in markdown code blocks

### Changed
- Update createPlan method to support optional title-based naming for consistency with issue filenames
- Bootstrap command now uses embedded templates instead of reading from filesystem
  - Templates are bundled with the package for zero-configuration setup
  - No external template files required - bootstrap works out-of-the-box
  - Templates automatically update when you update AutoAgent
- Run command now accepts [target] parameter instead of [issue] for more flexible input types

### Added
- Add comprehensive documentation for filename conventions in README.md
- Enhanced JSDoc documentation for generateFileSlug method with additional examples
- Add input type detection to run command to support spec files, issue numbers, and issue names
  - Detects spec/plan files (markdown files without issue markers)
  - Detects numeric issue references
  - Detects issue file names with format `number-slug.md`
  - Routes different input types to appropriate execution paths
- Add comprehensive test coverage for smart run command functionality
  - Unit tests for isPlanFile() detection with various edge cases
  - Integration tests for spec file execution flow
  - E2E tests for complete spec → bootstrap → execute workflows
  - Tests for spec file with --all flag continuation
  - Error handling tests for bootstrap and decomposition failures

### Removed
- Remove bootstrap command in favor of unified run command
  - Bootstrap functionality is now integrated into the run command
  - Spec files are detected automatically and processed as bootstrap targets
  - Maintains backward compatibility while simplifying the CLI interface

## [0.3.3] - 2025-07-04

### Fixed
- Provider selection now correctly uses user's configured providers instead of hardcoded defaults
- Added comprehensive logging for provider selection process to aid debugging
- Fixed issue where configuration appeared to reset after npm updates

### Changed
- Improved release script timeout handling for better cross-platform compatibility
- Updated CLI output message from "Using provider:" to "Provider override:" for clarity

## [0.3.2] - 2025-07-04

### Added
- Enhanced `run` command with flexible issue execution
  - Execute specific issues by number (e.g., `autoagent run 39`)
  - Execute issues by filename prefix (e.g., `autoagent run 39-implement-plan`)
  - Execute issues by partial name match (e.g., `autoagent run embed-bootstrap`)
  - Better error handling for non-existent or invalid issues
- Comprehensive test coverage for run command functionality
  - End-to-end tests for various issue matching scenarios
  - Edge case handling for multiple matching files
  - Mock provider support for testing

### Fixed
- Release script compatibility with macOS systems
  - Handle missing `timeout` command on macOS (fallback to `gtimeout` or no timeout)
  - Improved cross-platform compatibility for release preparation

## [0.3.1] - 2025-07-04

### Added
- Enhanced Gemini output formatting with automatic sentence boundary detection
  - Smart detection of sentence endings with proper handling of abbreviations and edge cases
  - Configurable via environment variables (AUTOAGENT_DISABLE_GEMINI_FORMATTING, AUTOAGENT_GEMINI_BUFFER_SIZE)
  - Performance optimized with <1ms overhead per 1KB of text
- Comprehensive test suite for stream formatter functionality
- Benchmark results transformation script for GitHub Actions integration
- New performance benchmarks for file manager, pattern analyzer, git operations, and retry utilities

### Fixed
- Improved stream formatter sentence boundary detection for edge cases
- Resolved linting issues across the codebase

### Changed
- Moved `.autoagent.json` to gitignore (configuration now handled through `.autoagent/config.json`)
- Updated benchmark workflow to use custom transformer for better GitHub Pages integration
- Reorganized and optimized performance benchmarks
- Updated vitest configuration to properly handle benchmark files

### Removed
- Removed obsolete benchmark files (execution.bench.ts, parsing.bench.ts, memory.bench.ts, provider.bench.ts)

## [0.3.0] - 2025-07-04

### Changed
- **BREAKING**: Remove `init` command and `.autoagent.json` marker file - projects now use lazy initialization, directories are created on-demand when needed
- Update semantic versioning guidelines in AGENT.md to clarify pre-1.0 versioning rules (breaking changes in minor releases, features in patch releases)

### Removed
- **BREAKING**: Remove `autoagent init` command - no longer needed as project structure is created automatically
- **BREAKING**: Remove `.autoagent.json` project marker file - configuration is now handled entirely through `.autoagent/config.json`
- Remove project initialization checks from all CLI commands - commands now work without explicit initialization

### Added
- Add Claude command file for generating technical specification documents (`.claude/commands/spec.md`)
- Add Claude local settings configuration for permission management (`.claude/settings.local.json`)
- Add comprehensive specification for Gemini output formatting improvements (`specs/gemini-output-formatting.md`)
- Add issue and plan files for implementing Gemini output formatting (#15)

### Fixed
- Fix e2e tests to work without explicit project initialization
- Update test helpers to remove init command dependencies
- Fix error handling tests to expect graceful handling of missing configuration

## [0.2.0] - 2025-07-03

### Added
- **New CLI Commands**:
  - `autoagent list` - Query issues, providers, and execution history with filtering and JSON output
  - `autoagent check` - Verify provider availability
  - `autoagent bootstrap` - Create initial issue from master plan
- **Mock Provider** - Test provider for CI/CD pipelines and development
- **Enhanced Benchmarking**:
  - Statistical analysis with confidence intervals and effect size
  - Outlier detection and trend analysis
  - CI runner for benchmark regression detection
  - Memory usage benchmarks
- **Comprehensive Test Infrastructure**:
  - Migrated from Jest to Vitest
  - Test doubles replacing mocks for better isolation
  - E2E test suite with CLI output parsing
  - Integration tests for multi-provider scenarios
  - Performance benchmarks with statistical analysis
- **GitHub Actions Workflows**:
  - Benchmark workflow for performance tracking
  - PR validation workflow
  - Scheduled checks workflow

### Fixed
- **JSON Output in List Command** - Fixed to use console.log for proper CLI integration
- **getTodoStats Accuracy** - Now counts issues from directory first, then merges with status.json
- **Test Isolation** - Fixed flaky tests by improving test doubles and setup
- **TypeScript Strict Mode** - Fixed all type errors and enabled strict mode
- **ESLint Compliance** - Fixed 159 errors and 16 warnings across the codebase

### Changed
- **Test Framework Migration** - Completely migrated from Jest to Vitest
- **Test Organization** - Reorganized tests into unit/integration/e2e/performance categories
- **Mock System** - Replaced vi.mock with proper test doubles for better maintainability
- **Provider Learning** - Updated to use test doubles instead of mocks
- **Coverage Thresholds** - Temporarily adjusted to 50% for lines/statements during migration (CLI commands need direct testing)

## [0.1.4] - 2025-07-01

### Fixed
- Fixed Gemini provider command-line integration to use correct flags
  - Changed from positional arguments to `--all_files` flag for directory access
  - Now passes prompts via stdin instead of command arguments for reliability with long prompts
- Fixed streaming output handling for Gemini provider
  - Gemini outputs plain text instead of JSON, requiring different parsing logic
  - Provider now correctly displays Gemini's output without JSON parsing errors
- Added missing error event handler in process spawning to catch spawn failures

### Added
- Comprehensive test scripts for multi-provider testing support
  - `test-autoagent.sh` provides full end-to-end testing of all AutoAgent features
  - `test-single-gemini.sh` for isolated Gemini provider testing
  - Tests cover issue creation, plan generation, execution, and provider failover

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