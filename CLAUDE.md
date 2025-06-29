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
