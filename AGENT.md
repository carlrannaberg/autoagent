# Agent Instructions

This file gives guidance to agentic coding tools on codebase structure, build/test commands, architecture, etc. It helps AI providers understand how to work effectively with the AutoAgent codebase.

## Project Context
AutoAgent is an npm package that enables running autonomous AI agents using Claude or Gemini for task execution. The project aims to convert existing bash scripts into a TypeScript-based solution with both CLI and programmatic APIs. The package supports automatic provider failover, rate limit management, and comprehensive issue/plan tracking.

## Building and Running

Before submitting any changes, validate them by running the full test suite. The following commands ensure your changes meet all quality requirements:

```bash
# Run the complete validation suite
npm test             # Run all tests
npm run build        # Build the project (production)
npm run lint         # Check code style
npm run lint:fix     # Fix code style issues

# Additional commands
npm run build:dev    # Build with source maps
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run clean        # Clean build output
```

Always run tests before committing changes to ensure code quality.

## Technology Stack
- **Language**: TypeScript (targeting ES2020)
- **Runtime**: Node.js >= 22.0.0
- **Build**: TypeScript compiler (tsc)
- **Testing**: Jest with ts-jest
- **CLI Framework**: Commander.js
- **Dependencies**: chalk (colors), commander (CLI)
- **Package Manager**: npm

## Git Repository

The main branch for this project is called "master"

## Coding Standards

### TypeScript/JavaScript Guidelines

- **Prefer plain objects over classes**: Use interfaces and types instead of classes where possible. This improves tree-shaking, reduces boilerplate, and works better with functional patterns.
- **Use ES modules**: Leverage `import`/`export` for clear public APIs. Anything not exported is private to the module.
- **Avoid `any` types**: Use `unknown` when the type is truly unknown, then narrow it with type guards. Type assertions (`as Type`) should be rare and well-justified.
- **Embrace immutability**: Use array methods like `.map()`, `.filter()`, `.reduce()` that return new arrays. Avoid mutating objects directly.
- **TypeScript strict mode**: Always enabled. Fix all type errors properly.
- **Follow ESLint rules**: The configuration enforces our coding standards. Don't disable rules without good reason.
- **Async/await over callbacks**: Use modern async patterns for cleaner, more maintainable code.
- **Meaningful names**: Variables and functions should clearly indicate their purpose.
- **Single responsibility**: Keep functions focused on one task. If a function does multiple things, split it up.
- **Comprehensive error handling**: Always handle errors appropriately. Use try-catch for async operations.

## Directory Structure
```
autoagent/
├── src/            # TypeScript source files
│   ├── core/       # Core business logic
│   ├── cli/        # CLI implementation
│   ├── providers/  # AI provider implementations
│   ├── utils/      # Utility functions
│   └── types/      # TypeScript type definitions
├── test/           # Jest test files
├── templates/      # Issue and plan templates
├── bin/            # CLI entry point
├── dist/           # Compiled JavaScript (gitignored)
└── examples/       # Usage examples
```

## Key Dependencies
- **chalk**: Terminal color output
- **commander**: CLI framework
- Development dependencies include TypeScript, Jest, ESLint

## Environment Setup
- Node.js version specified in `.nvmrc` (22.0.0)
- TypeScript configuration in `tsconfig.json`
- Jest configuration in `package.json`
- ESLint configuration in `.eslintrc.js`

## Writing Tests

This project uses **Jest** as its testing framework. When writing tests, follow these conventions:

### Test Structure and Framework

- **Framework**: All tests use Jest (`describe`, `it`, `expect`, `jest`)
- **File Location**: Test files (`*.test.ts`) are located in the `test/` directory, mirroring the `src/` structure
- **Configuration**: Jest configuration is in `package.json`
- **Setup/Teardown**: Use `beforeEach` and `afterEach`. Call `jest.clearAllMocks()` in `beforeEach`

### Mocking (Jest)

- **ES Modules**: Mock with `jest.mock('module-name')` at the top of test files
- **Mock Functions**: Create with `jest.fn()`. Use `mockResolvedValue()`, `mockRejectedValue()`, or `mockImplementation()`
- **Spying**: Use `jest.spyOn(object, 'methodName')`. Clean up in `afterEach`
- **File System**: Mock `fs` and `fs/promises` operations to avoid actual file I/O
- **Child Process**: Mock `spawn` and `exec` for testing command execution

### Commonly Mocked Modules

- **Node.js built-ins**: `fs`, `fs/promises`, `path`, `child_process` (`spawn`, `exec`)
- **Internal modules**: Mock other project modules when testing in isolation

### Asynchronous Testing

- Use `async/await` for all async tests
- Test promise rejections with `await expect(promise).rejects.toThrow()`
- Handle async operations properly to avoid unhandled promise rejections

### Testing Guidelines

- Write unit tests for all new components
- Aim for >80% code coverage
- Test both success and error scenarios
- Mock all external dependencies (file system, child processes, network)
- Keep tests focused and independent
- Use descriptive test names that explain what is being tested

## Security Considerations
- No credentials stored in code
- Rely on external CLI tools for authentication
- Validate all file paths
- Handle git operations safely
- No sensitive data in logs

## Performance Guidelines
- Target package size < 15KB gzipped
- Minimal runtime dependencies
- Efficient file operations
- Implement caching where appropriate
- Use streams for large outputs

## Additional Notes
- The project follows a modular architecture with clear separation of concerns
- Provider implementations should be easily extensible
- Configuration system supports both global and local settings
- Rate limit management is critical for provider reliability
- Git integration is optional but recommended
- The package should work cross-platform (Windows, macOS, Linux)

## Comments Policy

Only write high-value comments when necessary. Avoid redundant comments that simply restate what the code does. Good comments explain:
- **Why** something is done a certain way (not what)
- Complex algorithms or business logic
- Workarounds or temporary solutions
- Important warnings or gotchas

## Execution History
- **2025-06-30**: Successfully decomposed master-plan.md into 16 individual issues and plans
- Created comprehensive todo list for tracking implementation progress
- Established clear project structure and requirements for TypeScript npm package
- Set up issue tracking system with proper dependencies and priorities
- **2025-06-30**: Completed project setup and initial configuration (Issue #2)
  - Created complete directory structure (src/, test/, templates/, bin/, dist/)
  - Set up TypeScript with strict ES2020 configuration
  - Configured ESLint with TypeScript support and strict rules
  - Configured Jest with ts-jest for unit testing
  - Installed all required dependencies (chalk, commander)
  - Created .nvmrc, .gitignore, .npmignore, and .eslintignore files
  - Set up package.json with proper npm scripts and configuration
  - Created basic placeholder files to verify build process
  - Project builds successfully with `npm run build`
  - Linting works correctly with `npm run lint`
- **2025-06-30**: Completed type definitions and interfaces (Issue #3)
  - Created comprehensive type definitions in src/types/index.ts
  - Implemented all core interfaces: Issue, Plan, Phase, ExecutionResult
  - Added configuration types: AgentConfig, UserConfig
  - Created RollbackData interface for rollback support
  - Defined ProgressCallback type for progress tracking
  - Added AgentEvent type union and Status interface
  - Included JSDoc comments for all interfaces
  - All types compile successfully with TypeScript strict mode
- **2025-06-30**: Completed provider abstraction and implementations (Issue #4)
  - Created abstract Provider base class with common interface
  - Implemented ClaudeProvider with checkAvailability and execute methods
  - Implemented GeminiProvider with checkAvailability and execute methods
  - Created provider factory function (createProvider)
  - Added helper functions for provider availability checking
  - Implemented proper error handling and process spawning
  - Support for JSON output parsing (Claude) and standard output (Gemini)
  - All provider code compiles and passes linting with only minor warnings
- **2025-06-30**: Completed file management system (Issue #5)
  - Created FileManager class in src/utils/file-manager.ts
  - Implemented issue file operations (create, read, next number calculation)
  - Implemented plan file operations (create, read with phase parsing)
  - Added todo list management (read, update, check completion)
  - Added provider instruction file operations (read, update, create templates)
  - Automatic directory creation for issues/ and plans/ folders
  - Comprehensive Markdown parsing with section extraction
  - Added unit tests with 100% code coverage for FileManager
  - Fixed all TypeScript strict mode errors and ESLint warnings
  - Created tsconfig.eslint.json to include test files in linting
- **2025-06-30**: Completed configuration management with rate limiting (Issue #6)
  - Created ConfigManager class in src/core/config-manager.ts
  - Implemented multi-source configuration loading (global and local)
  - Configuration precedence: defaults < global < local
  - Global config stored at ~/.autoagent/config.json
  - Local config stored at ./.autoagent/config.json
  - Implemented rate limit tracking with separate JSON file storage
  - Added provider availability checking based on rate limit status
  - Support for cooldown periods (default 1 hour)
  - Configuration updates can be scoped to global or local
  - Added comprehensive unit tests with 94.28% code coverage
  - Fixed all TypeScript strict mode and ESLint errors
  - Configuration includes: providers, failoverDelay, retryAttempts, maxTokens, rateLimitCooldown, gitAutoCommit, gitCommitInterval, logLevel, customInstructions
- **2025-06-30**: Completed autonomous agent with failover logic (Issue #7)
  - Created AutonomousAgent class in src/core/autonomous-agent.ts
  - Extends EventEmitter for internal event handling and communication
  - Implemented single issue execution (executeIssue method)
  - Implemented batch execution (executeAll method) for processing all pending issues
  - Added automatic provider failover on rate limit detection
  - Implemented retry logic with configurable attempts and exponential backoff
  - Added progress tracking with percentage-based callbacks
  - Supports dry-run mode for previewing changes without execution
  - Integrated git auto-commit functionality after successful execution
  - Updates provider instruction files (CLAUDE.md/GEMINI.md) with execution history
  - Added graceful cancellation support via AbortSignal and SIGINT handling
  - Comprehensive error handling with detailed error messages
  - Added unit tests with full coverage for all public methods
  - Integrates seamlessly with FileManager, ConfigManager, and Provider classes
- **2025-06-30**: Completed CLI interface and commands (Issue #8)
  - Created bin/autoagent CLI entry point with proper shebang and executable permissions
  - Implemented src/cli/index.ts with full Commander.js integration
  - Created comprehensive CLI with all required commands:
    - `run`: Execute issues with options for provider override, workspace, debug, dry-run, and auto-commit control
    - `create`: Generate new issues with AI assistance
    - `status`: Display current project status including provider availability
    - `config`: Command group for configuration management
      - `config init`: Initialize configuration (global or local)
      - `config set-provider`: Set default AI provider
      - `config set-failover`: Configure failover provider order
      - `config set-auto-commit`: Enable/disable automatic git commits
      - `config set-co-authored-by`: Control co-authorship attribution
      - `config show`: Display current configuration and rate limit status
      - `config clear-limits`: Clear rate limit records
    - `check`: Verify provider availability
    - `bootstrap`: Create initial issue from master plan
  - Added Logger utility (src/utils/logger.ts) for colored console output
  - Implemented proper error handling with exit codes
  - Support for graceful cancellation via SIGINT
  - Added missing methods to AutonomousAgent: createIssue, getStatus, bootstrap, executeNext
  - Enhanced FileManager with additional methods: readTodo, updateTodo, getTodoStats, getNextIssue
  - Extended ConfigManager with CLI-specific methods: initConfig, setProvider, setFailoverProviders, clearRateLimit, showConfig
  - Fixed TypeScript strict mode compilation errors
  - Updated UserConfig interface to include includeCoAuthoredBy property
  - Package.json already configured with bin entry for global installation
- **2025-06-30**: Completed utility functions for logging and retry (Issue #9)
  - Enhanced Logger class in src/utils/logger.ts with additional features:
    - Added LogLevel type and LoggerOptions interface for configuration
    - Support for message prefixing and timestamps
    - Enhanced debug logging with configurable enable/disable
    - Error method now accepts Error objects and shows stack traces in debug mode
    - Added progress bar display method with percentage tracking
    - Clear screen and newline utility methods
    - All log methods now support optional formatting options
  - Created comprehensive retry utility in src/utils/retry.ts:
    - Implements exponential backoff algorithm for handling transient failures
    - RateLimitError class for specific rate limit handling
    - RetryError class for retry failure information
    - Configurable retry options: maxAttempts, initialDelay, maxDelay, backoffMultiplier
    - Intelligent error detection for rate limits (checks error messages and types)
    - Support for custom retry logic via shouldRetry callback
    - retryWithJitter function to prevent thundering herd problem
    - createRetryableFunction wrapper for easy function decoration
    - Helper functions: isRateLimitError, extractRetryAfter
    - Automatic retry-after header extraction from error messages
  - Exported all utilities from src/utils/index.ts for easy importing
  - Both utilities compile successfully with TypeScript strict mode
  - Ready for integration with existing provider and agent code
- **2025-06-30**: Completed git integration and auto-commit (Issue #10)
  - Created comprehensive git utilities in src/utils/git.ts:
    - Check git availability and repository status
    - Get detailed git status including branch, ahead/behind, uncommitted changes
    - Stage all changes and create commits with co-authorship
    - Capture current commit hash and uncommitted changes for rollback
    - Check for changes to commit and get list of changed files
    - Revert to specific commits for rollback support
  - Integrated git functionality into AutonomousAgent:
    - Auto-commit after successful issue execution when enabled
    - Proper co-authorship attribution (e.g., "Co-authored-by: [Provider] <[provider]@autoagent-cli>")
    - Git status checking before operations
    - Capture pre-execution state for rollback support
    - Store commit hash in ExecutionResult for potential rollback
  - Added rollback capability:
    - capturePreExecutionState method saves git commit and uncommitted changes
    - rollback method can revert to previous commit or apply saved patches
    - RollbackData interface includes gitCommit and fileBackups
  - Git operations are gracefully handled:
    - Check for git availability before attempting operations
    - Handle various git states (clean, dirty, no commits, etc.)
    - Git errors don't fail the execution, just skip git operations
  - Added unit tests for all git utilities with comprehensive coverage
  - Configuration options control git behavior:
    - autoCommit: Enable/disable automatic commits
    - includeCoAuthoredBy: Control co-authorship attribution
    - enableRollback: Enable rollback data capture
- **2025-06-29**: Completed provider learning system (Issue #11)
  - Created ProviderLearning class in src/core/provider-learning.ts:
    - Automatically tracks execution history and updates CLAUDE.md/GEMINI.md files
    - Calculates performance metrics (success rate, average duration, file types modified)
    - Generates insights based on execution patterns
    - Maintains separate learning data for each provider
  - Created PatternAnalyzer class in src/core/pattern-analyzer.ts:
    - Detects execution patterns (success rates, failure types, file changes, duration)
    - Provides confidence levels for detected patterns
    - Generates actionable recommendations based on patterns
    - Tracks provider-specific performance characteristics
  - Enhanced ExecutionResult type with additional fields:
    - issueTitle: For better display in execution history
    - filesModified: List of files changed during execution
  - Integrated learning system with AutonomousAgent:
    - Automatically captures file changes after successful executions
    - Updates provider instruction files with comprehensive learnings
    - Pattern detection runs continuously across executions
  - Provider instruction files now include:
    - Execution History: Timestamped list of all executions
    - Performance Metrics: Success rates, duration statistics, file type analysis
    - Learning Insights: Strengths, areas for improvement, best practices
    - Detected Patterns: High and medium confidence patterns with occurrence counts
  - Added comprehensive unit tests:
    - ProviderLearning tests with persistent mock file updates
    - PatternAnalyzer tests covering all pattern types
    - All tests passing with good coverage
  - Learning system helps providers improve over time by:
    - Tracking what works well and what doesn't
    - Identifying common failure patterns
    - Providing context-aware recommendations
    - Building project-specific knowledge base
- **2025-06-30**: Completed templates and examples (Issue #12)
  - Created comprehensive templates in templates/ directory:
    - issue.md: Complete issue template with all sections and usage instructions
    - plan.md: Detailed plan template with phases and technical approach
  - Created extensive examples in examples/ directory:
    - basic-usage.js: Simple example for getting started
    - provider-failover.js: Demonstrates automatic failover between providers
    - batch-execution.js: Shows batch processing with progress and cancellation
    - configuration.js: Comprehensive configuration examples and validation
    - custom-integration.js: Advanced examples for extending AutoAgent
    - cli-usage.js: Complete CLI command reference with practical examples
  - All examples include:
    - Clear comments explaining functionality
    - Error handling demonstrations
    - Expected output examples
    - Real-world use cases
  - Updated README.md to reference and explain all examples
  - Added examples/README.md for easier navigation
  - Updated package.json to include templates and examples in npm package
  - All examples pass syntax validation
- **2025-06-30**: Completed comprehensive unit tests for all components (Issue #13)
  - Created extensive test suite using Jest and ts-jest
  - Fixed failing git tests by properly mocking child_process and util.promisify
  - Enhanced AutonomousAgent tests with comprehensive coverage for:
    - Issue execution with provider failover
    - Git integration and auto-commit functionality
    - Progress event handling and cancellation
    - Rollback functionality
    - Bootstrap and createIssue methods
  - Created complete provider tests for ClaudeProvider and GeminiProvider:
    - Availability checking with proper mock setup
    - Execution flow with JSON and plain text output
    - Error handling and signal abort scenarios
    - Provider factory functions and helper methods
  - Added comprehensive utility tests:
    - Logger tests with 100% coverage including all log levels and progress bars
    - Retry tests with exponential backoff, jitter, and rate limit handling
    - Git utilities already had extensive tests (95.69% coverage)
  - Created CLI integration tests with mocked dependencies
  - Achieved overall test coverage of 64.62% with key components having high coverage:
    - Logger: 100%
    - ClaudeProvider: 96.55%
    - Git utilities: 95.69%
    - Retry utilities: 94.02%
    - PatternAnalyzer: 90.43%
    - GeminiProvider: 88.88%
    - ProviderLearning: 82.05%
  - All tests pass reliably with proper async handling and mock cleanup
  - Test infrastructure includes proper TypeScript support and ESLint configuration
- **2025-06-30**: Completed comprehensive documentation (Issue #14)
  - Created main README.md with complete installation, usage, and configuration sections
  - Added badges for npm version, license, Node.js version, and TypeScript support
  - Created docs/CONFIG.md with detailed configuration guide:
    - Configuration file locations and precedence
    - All configuration options with descriptions
    - Provider-specific settings and rate limiting
    - CLI configuration commands
    - Best practices and troubleshooting
  - Created docs/API.md with full programmatic usage documentation:
    - Complete API reference for all classes and methods
    - TypeScript examples and type definitions
    - Event handling and error management
    - Advanced usage patterns
  - Created docs/TROUBLESHOOTING.md with common issues and solutions:
    - Installation problems
    - Provider authentication and timeout issues
    - Configuration and git integration problems
    - Rate limiting and TypeScript build issues
    - Debugging tips and FAQ
  - Created CONTRIBUTING.md with contribution guidelines:
    - Code of conduct and development setup
    - Pull request process and coding standards
    - Testing guidelines and documentation requirements
    - Community resources and recognition
  - Documentation structure follows best practices:
    - Clear table of contents in each document
    - Code examples with syntax highlighting
    - Cross-references between documents
    - Troubleshooting for common scenarios
- **2025-06-30**: Completed CI/CD and GitHub Actions setup (Issue #15)
  - Created comprehensive GitHub Actions workflows in .github/workflows/:
    - test.yaml: Runs tests, linting, and security checks on PRs and pushes
    - release.yaml: Automates npm package publishing with version tag creation
    - dependency-review.yaml: Reviews dependency changes for security and licensing
    - version-bump.yaml: Automates version bumping with PR creation
    - scheduled-checks.yaml: Weekly maintenance checks for dependencies and documentation
    - code-quality.yaml: Comprehensive code quality checks including complexity analysis
  - Implemented multi-Node.js version testing (22.x)
  - Added automatic version change detection in PRs
  - Configured secure npm publishing with NPM_TOKEN secret
  - Set up Dependabot for automated dependency updates
  - Created CODEOWNERS file for automatic review assignment
  - Added security vulnerability scanning with npm audit
  - Implemented build size validation to ensure < 15KB gzipped requirement
  - Created comprehensive workflow documentation in .github/workflows/README.md
  - Added setup guide for NPM_TOKEN configuration
  - Integrated CI/CD badges into main README.md
  - All workflows follow GitHub Actions best practices and security guidelines
- **2025-06-30**: Completed npm package publication preparation (Issue #16)
  - Updated package.json with all required metadata fields
  - Set version to 0.0.1 for initial beta release
  - Updated LICENSE file with correct year and attribution
  - Created production build configuration (tsconfig.prod.json) without source maps
  - Optimized package size by excluding unnecessary files (reduced from 62KB to 30KB)
  - Configured package files field to include only essential distribution files
  - All tests pass with 64.62% overall coverage
  - Created comprehensive CHANGELOG.md with release notes
  - Added .npmrc for clean publishing configuration
  - Validated package structure with npm pack
  - Package is ready for publication to npm registry
- **2025-06-30**: Package preparation and release updates
  - Renamed package from "autoagent" to "autoagent-cli" due to npm naming conflict
  - Maintained "autoagent" as the CLI command for local use
  - Updated Node.js requirement to version 22 across all files
  - Cleaned up legacy bash script implementation (removed 57 files, 8,568 deletions)
  - Downgraded version to 0.0.1 for initial beta release
  - Fixed all ESLint strict-boolean-expressions errors (240 errors resolved)
  - Updated commander dependency to latest version
  - Fixed Dependabot configuration and CODEOWNERS
  - Clarified check command vs config show output for better UX