# Agent Instructions

This file gives guidance to agentic coding tools on codebase structure, build/test commands, architecture, etc. It helps AI providers understand how to work effectively with the AutoAgent codebase.

## Project Context
AutoAgent is an npm package that enables running autonomous AI agents using Claude or Gemini for task execution. The project aims to convert existing bash scripts into a TypeScript-based solution with both CLI and programmatic APIs. The package supports automatic provider failover, rate limit management, and comprehensive issue/plan tracking.

## Building and Running

Before submitting any changes, validate them by running the full test suite with `npm test` and running validations with `npm run check`.
The following commands ensure your changes meet all quality requirements:

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
# IMPORTANT: These commands prepare the release but do NOT create tags
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
5. **No manual tag creation**: NEVER create git tags manually - tags are automatically created by GitHub workflows after successful release preparation

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
- **Testing**: Vitest
- **CLI Framework**: Commander.js
- **Dependencies**: chalk (colors), commander (CLI)
- **Package Manager**: npm

## Git Repository

The main branch for this project is called "master"

**Important Git Operations:**
- **NEVER create git tags manually** - Tags are automatically created by GitHub workflows
- After running `npm run release:*` commands, simply push to master
- The GitHub release workflow will create the appropriate tag
- Only use `git tag` for listing/viewing tags, not for creating them

### Updating CHANGELOG.md

**Before making any commits**, ensure that CHANGELOG.md is updated to reflect your changes:

1. **Add your changes to the "Unreleased" section** at the top of CHANGELOG.md
2. **Categorize your changes** appropriately:
   - `Added` - for new features
   - `Changed` - for changes in existing functionality
   - `Deprecated` - for soon-to-be removed features
   - `Removed` - for now removed features
   - `Fixed` - for any bug fixes
   - `Security` - in case of vulnerabilities

3. **Format your entries** clearly and concisely:
   - Start each entry with a dash `-`
   - Use present tense ("Add feature" not "Added feature")
   - Include PR/issue numbers if applicable
   - Keep entries user-focused (what it means for users, not implementation details)

Example entry:
```markdown
## [Unreleased]

### Fixed
- Fix TypeScript type errors in provider-learning.test.ts
- Fix lint errors across all test files (166 errors resolved)

### Changed
- Update mock provider to use proper TypeScript types instead of `any`
```

This ensures that:
- All changes are documented for users
- The changelog is ready for the next release
- Contributors can easily see what has changed
- Release notes can be generated automatically

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

### Avoiding `any` Types and Type Assertions; Preferring `unknown`

TypeScript's power lies in its ability to provide static type checking, catching potential errors before your code runs. To fully leverage this, it's crucial to avoid the `any` type and be judicious with type assertions.

- **The Dangers of `any`**: Using any effectively opts out of TypeScript's type checking for that particular variable or expression. While it might seem convenient in the short term, it introduces significant risks:
  - **Loss of Type Safety**: You lose all the benefits of type checking, making it easy to introduce runtime errors that TypeScript would otherwise have caught.
  - **Reduced Readability and Maintainability**: Code with `any` types is harder to understand and maintain, as the expected type of data is no longer explicitly defined.
  - **Masking Underlying Issues**: Often, the need for any indicates a deeper problem in the design of your code or the way you're interacting with external libraries. It's a sign that you might need to refine your types or refactor your code.

- **Preferring `unknown` over `any`**: When you absolutely cannot determine the type of a value at compile time, and you're tempted to reach for any, consider using unknown instead. unknown is a type-safe counterpart to any. While a variable of type unknown can hold any value, you must perform type narrowing (e.g., using typeof or instanceof checks, or a type assertion) before you can perform any operations on it. This forces you to handle the unknown type explicitly, preventing accidental runtime errors.

  ```
  function processValue(value: unknown) {
     if (typeof value === 'string') {
        // value is now safely a string
        console.log(value.toUpperCase());
     } else if (typeof value === 'number') {
        // value is now safely a number
        console.log(value * 2);
     }
     // Without narrowing, you cannot access properties or methods on 'value'
     // console.log(value.someProperty); // Error: Object is of type 'unknown'.
  }
  ```

- **Type Assertions (`as Type`) - Use with Caution**: Type assertions tell the TypeScript compiler, "Trust me, I know what I'm doing; this is definitely of this type." While there are legitimate use cases (e.g., when dealing with external libraries that don't have perfect type definitions, or when you have more information than the compiler), they should be used sparingly and with extreme caution.
  - **Bypassing Type Checking**: Like `any`, type assertions bypass TypeScript's safety checks. If your assertion is incorrect, you introduce a runtime error that TypeScript would not have warned you about.
  - **Code Smell in Testing**: A common scenario where `any` or type assertions might be tempting is when trying to test "private" implementation details (e.g., spying on or stubbing an unexported function within a module). This is a strong indication of a "code smell" in your testing strategy and potentially your code structure. Instead of trying to force access to private internals, consider whether those internal details should be refactored into a separate module with a well-defined public API. This makes them inherently testable without compromising encapsulation.

### Embracing JavaScript's Array Operators

To further enhance code cleanliness and promote safe functional programming practices, leverage JavaScript's rich set of array operators as much as possible. Methods like `.map()`, `.filter()`, `.reduce()`, `.slice()`, `.sort()`, and others are incredibly powerful for transforming and manipulating data collections in an immutable and declarative way.

Using these operators:

- Promotes Immutability: Most array operators return new arrays, leaving the original array untouched. This functional approach helps prevent unintended side effects and makes your code more predictable.
- Improves Readability: Chaining array operators often leads to more concise and expressive code than traditional for loops or imperative logic. The intent of the operation is clear at a glance.
- Facilitates Functional Programming: These operators are cornerstones of functional programming, encouraging the creation of pure functions that take inputs and produce outputs without causing side effects. This paradigm is highly beneficial for writing robust and testable code that pairs well with React.

By consistently applying these principles, we can maintain a codebase that is not only efficient and performant but also a joy to work with, both now and in the future.

## Directory Structure
```
autoagent/
├── src/            # TypeScript source files
│   ├── core/       # Core business logic
│   ├── cli/        # CLI implementation
│   ├── providers/  # AI provider implementations
│   ├── utils/      # Utility functions
│   └── types/      # TypeScript type definitions
├── test/           # Test files
├── templates/      # Issue and plan templates
├── bin/            # CLI entry point
├── dist/           # Compiled JavaScript (gitignored)
└── examples/       # Usage examples
```

## Key Dependencies
- **chalk**: Terminal color output
- **commander**: CLI framework
- Development dependencies include TypeScript, Vitest, ESLint

## Environment Setup
- Node.js version specified in `.nvmrc` (22.0.0)
- TypeScript configuration in `tsconfig.json`
- Vitest configuration in `vitest.config.ts`
- ESLint configuration in `.eslintrc.js`

## Writing Tests

This project uses **Vitest** as its testing framework. When writing tests, follow these conventions:

### Test Structure and Framework

- **Framework**: All tests use Vitest (`describe`, `it`, `expect`, `vi`)
- **File Location**: Test files (`*.test.ts`) are located in the `test/` directory, mirroring the `src/` structure
- **Configuration**: Vitest configuration is in `vitest.config.ts`
- **Setup/Teardown**: Use `beforeEach` and `afterEach`. Call `vi.clearAllMocks()` in `beforeEach`

### Mocking (Vitest)

- **ES Modules**: Mock with `vi.mock('module-name', async (importOriginal) => { ... })`. Use `importOriginal` for selective mocking.
  - _Example_: `vi.mock('os', async (importOriginal) => { const actual = await importOriginal(); return { ...actual, homedir: vi.fn() }; });`
- **Mock Functions**: Create with `vi.fn()`. Use `mockResolvedValue()`, `mockRejectedValue()`, or `mockImplementation()`
- **Spying**: Use `vi.spyOn(object, 'methodName')`. Restore spies with `mockRestore()` in `afterEach`.
- **Hoisting**: Use `const myMock = vi.hoisted(() => vi.fn());` if a mock function needs to be defined before its use in a `vi.mock` factory.
- **File System**: Mock `fs` and `fs/promises` operations to avoid actual file I/O
- **Child Process**: Mock `spawn` and `exec` for testing command execution
- **Mocking Order**: For critical dependencies (e.g., `os`, `fs`) that affect module-level constants, place `vi.mock` at the _very top_ of the test file, before other imports.


### Mocking (`vi` from Vitest)

- **ES Modules**: Mock with `vi.mock('module-name', async (importOriginal) => { ... })`. Use `importOriginal` for selective mocking.
  - _Example_: `vi.mock('os', async (importOriginal) => { const actual = await importOriginal(); return { ...actual, homedir: vi.fn() }; });`
- **Mocking Order**: For critical dependencies (e.g., `os`, `fs`) that affect module-level constants, place `vi.mock` at the _very top_ of the test file, before other imports.
- **Hoisting**: Use `const myMock = vi.hoisted(() => vi.fn());` if a mock function needs to be defined before its use in a `vi.mock` factory.
  - **Mock Functions**: Create with `vi.fn()`. Define behavior with `mockImplementation()`, `mockResolvedValue()`, or `mockRejectedValue()`.
- **Spying**: Use `vi.spyOn(object, 'methodName')`. Restore spies with `mockRestore()` in `afterEach`.

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
