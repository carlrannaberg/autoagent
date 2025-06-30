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

