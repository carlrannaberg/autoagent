# Gemini Instructions

This file contains project-specific instructions for Gemini. Customize this file to provide context about your project, coding standards, and any special requirements that Gemini should follow when working on tasks.

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
- **2025-06-30**: Project bootstrapped using Claude - master-plan.md decomposed into issues
- **2025-06-30**: Claude completed project setup and initial configuration (Issue #2)
  - Created complete directory structure and all configuration files
  - Set up TypeScript, ESLint, and Jest configurations
  - Installed all dependencies and verified build process
- **2025-06-30**: Claude completed type definitions and interfaces (Issue #3)
  - Created comprehensive type definitions in src/types/index.ts
  - Implemented all core interfaces required by the master plan
  - Added complete JSDoc documentation for all types
  - All types compile successfully with TypeScript strict mode
- **2025-06-30**: Claude completed provider abstraction and implementations (Issue #4)
  - Created abstract Provider base class with common interface
  - Implemented ClaudeProvider with checkAvailability and execute methods
  - Implemented GeminiProvider with checkAvailability and execute methods
  - Created provider factory function (createProvider)
  - Added helper functions for provider availability checking
  - Implemented proper error handling and process spawning
  - Support for JSON output parsing (Claude) and standard output (Gemini)
  - All provider code compiles and passes linting with only minor warnings
- **2025-06-30**: Claude completed file management system (Issue #5)
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