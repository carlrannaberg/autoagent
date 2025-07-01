# Agent Instructions

This file gives guidance to agentic coding tools on codebase structure, build/test commands, architecture, etc. It helps AI providers understand how to work effectively with the AutoAgent codebase.


## Execution History
- **2025-07-01**: Successfully completed Issue #7: Add Benchmark Tests
- **2025-07-01**: Successfully completed Issue #6: Create E2E Test Infrastructure
- **2025-07-01**: Successfully completed Issue #5: Create Integration Test Infrastructure
- **2025-07-01**: Successfully completed Issue #4: Migrate Unit Tests from Jest to Vitest
- **2025-07-01**: Successfully completed Issue #3: Create Test Setup and Utilities
- **2025-07-01**: Successfully completed Issue #2: Install and Configure Vitest
- **2025-07-01**: Successfully completed Issue #1: Implement plan from vitest-migration

## Performance Metrics
- **Total Executions**: 7
- **Success Rate**: 100.0% (7 successful, 0 failed)
- **Average Duration**: 487.8 seconds

### File Types Modified
- `.ts`: 59 files
- `.md`: 23 files
- `.json`: 5 files
- `.backup`: 1 file


## Learning Insights

### Strengths
- High success rate in task completion
- Strong experience with .ts, .md, .json files

### Best Practices
- Consider breaking down complex tasks for faster execution
- Provide clear, structured requirements for best results
- Use CLAUDE.md to maintain project context across sessions
- Use provider failover to maintain continuous operation
- Good testing practices detected - maintain this pattern

### Common Issues
- Rate limits may occur with rapid successive executions


## Detected Patterns

### High Confidence Patterns
- **Heavy reliance on claude provider** (100% confidence, 5 occurrences)
- **High frequency of ts file modifications** (89% confidence, 55 occurrences)
- **Strong focus on test file modifications** (80% confidence, 5 occurrences)

### Medium Confidence Patterns
- Consistently successful execution pattern (50% confidence)


## Project Context
AutoAgent is an npm package that enables running autonomous AI agents using Claude or Gemini for task execution. The project aims to convert existing bash scripts into a TypeScript-based solution with both CLI and programmatic APIs. The package supports automatic provider failover, rate limit management, and comprehensive issue/plan tracking.

## Building and Running

Before submitting any changes, validate them by running the full test suite. The following commands ensure your changes meet all quality requirements:

```bash
# Run complete validation (recommended before commits)
npm run check        # Runs typecheck, lint, and tests in sequence

# Individual validation commands
npm test             # Run all tests
npm run build        # Build the project (production)
npm run typecheck    # Check TypeScript types without building
npm run lint         # Check code style
npm run lint:fix     # Fix code style issues

# Additional commands
npm run build:dev    # Build with source maps
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run clean        # Clean build output

# Release commands (uses Claude to prepare releases)
# NOTE: These commands can take 5-10 minutes as Claude analyzes the codebase
npm run release:patch # Prepare a patch release (0.0.1 -> 0.0.2)
npm run release:minor # Prepare a minor release (0.0.1 -> 0.1.0)
npm run release:major # Prepare a major release (0.0.1 -> 1.0.0)
npm run release:rollback v0.0.2 # Rollback a release that wasn't published
```

Always run tests before committing changes to ensure code quality.

## Release Safety Guidelines

**CRITICAL: NEVER modify tags for published releases!**

Before making ANY tag changes, always check if the version is already published:
```bash
# Check if version exists on npm
npm view autoagent-cli@x.x.x

# If published, DO NOT move the tag - create a new version instead
# Only rollback tags for unpublished releases
```

**Release Process Rules:**
1. **Check npm first**: Always verify if a version is published before touching tags
2. **No tag modifications**: Never delete/move tags for published versions 
3. **Forward only**: If you need to include more changes, bump to next version
4. **Rollback safely**: Only use `npm run release:rollback` for unpublished versions

**Tip:** Run `npm run check` before pushing to catch type errors, linting issues, and test failures early. This runs all validations concurrently for faster feedback.

## Semantic Versioning Guidelines

When deciding between patch, minor, or major releases, consider the **user's perspective** and **intended behavior**:

**Patch Release (0.0.x)**:
- Bug fixes that restore intended functionality
- Performance improvements
- Documentation updates
- **Key question**: "Was this supposed to work this way already?"

**Minor Release (0.x.0)**:
- New features that weren't part of the original design
- New configuration options
- New commands or APIs
- **Key question**: "Is this adding something that wasn't planned before?"

**Major Release (x.0.0)**:
- Breaking changes to existing APIs
- Removal of features
- Changes requiring user migration
- **Key question**: "Will existing users need to change their code?"

**Example**: If streaming output was always intended but wasn't working, fixing it is a patch. If it was never planned and we're adding it as an enhancement, it's a minor release.

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

## AI CLI Reference

### Claude CLI Flags

Common flags used when invoking `claude`:
- `-p, --print`: Print response without interactive mode
- `--add-dir <dirs...>`: Add working directories for Claude to access
- `--model <name>`: Set model for current session (e.g., claude-sonnet-4-20250514)
- `--continue`: Load most recent conversation
- `--resume <id>`: Resume specific session
- `--max-turns <n>`: Limit agentic turns in non-interactive mode
- `--output-format <format>`: Specify output format (text, json, stream-json)
- `--verbose`: Enable detailed logging
- `--permission-mode <mode>`: Begin in specified permission mode (e.g., plan)
- `--allowedTools <tools...>`: Specify tools to allow without prompting
- `--disallowedTools <tools...>`: Specify tools to disallow without prompting
- `--dangerously-skip-permissions`: Skip all permission prompts (use with caution)
- `-h, --help`: Show help information

Example usage:
```bash
# Direct prompt
claude -p "Explain this code: $(cat file.js)"

# Add multiple directories and run query
claude --add-dir ../apps ../lib -p "Analyze the codebase structure"

# Continue previous conversation
claude --continue "What about error handling?"

# With specific model and JSON output
claude --model claude-sonnet-4-20250514 --output-format json -p "Generate API docs"

# Allow specific tools without prompting
claude --allowedTools "Bash(git log:*)" "Read" -p "Show recent changes"
```

### Gemini CLI Flags

Common flags used when invoking `gemini` (official Google CLI):
- `<prompt>`: Pass a prompt directly (positional argument)
- `--sandbox, -s`: Enable sandbox mode for this session
- `--sandbox-image <uri>`: Set the sandbox image URI
- `--debug`: Enable debug mode with verbose output
- `--include-all`: Recursively include all files in current directory as context
- `--memory`: Display current memory usage
- `--yolo`: Enable YOLO mode (auto-approve all tool calls, enables sandbox by default)
- `--checkpointing`: Enable checkpointing for session recovery
- `--telemetry`: Enable telemetry
- `--version`: Display version information
- `--help`: Display help information

Example usage:
```bash
# Direct prompt (non-interactive mode)
gemini "Explain quantum computing"

# Enable sandbox mode
gemini --sandbox "Run this Python script safely"

# Debug mode with all files as context
gemini --debug --include-all "Analyze this project structure"

# YOLO mode for automated workflows
gemini --yolo "Fix all linting errors in the project"
```
