# Claude Instructions

This file contains project-specific instructions for Claude Code. Customize this file to provide context about your project, coding standards, and any special requirements that Claude should follow when working on tasks.

## Project Context
AutoAgent is an npm package that enables running autonomous AI agents using Claude or Gemini for task execution. The project aims to convert existing bash scripts into a TypeScript-based solution with both CLI and programmatic APIs. The package supports automatic provider failover, rate limit management, and comprehensive issue/plan tracking.

## Technology Stack
- **Language**: TypeScript (targeting ES2020)
- **Runtime**: Node.js >= 14.0.0 (development on 18.0.0)
- **Build**: TypeScript compiler (tsc)
- **Testing**: Jest with ts-jest
- **CLI Framework**: Commander.js
- **Dependencies**: chalk (colors), commander (CLI)
- **Package Manager**: npm

## Coding Standards
- Use TypeScript strict mode
- Follow ESLint configuration
- Prefer async/await over callbacks
- Use meaningful variable and function names
- Keep functions focused and single-purpose
- Implement comprehensive error handling
- Add TypeScript types for all parameters and returns

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
- **chalk@4.1.2**: Terminal color output
- **commander@11.0.0**: CLI framework
- Development dependencies include TypeScript, Jest, ESLint

## Environment Setup
- Node.js version specified in `.nvmrc` (18.0.0)
- TypeScript configuration in `tsconfig.json`
- Jest configuration in `package.json`
- ESLint configuration in `.eslintrc.js`

## Testing Requirements
- Write unit tests for all components
- Aim for >80% code coverage
- Mock external dependencies (file system, child_process)
- Test both success and error scenarios
- Use async/await for testing async code

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
  - Installed all required dependencies (chalk@4.1.2, commander@11.0.0)
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
