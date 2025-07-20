# Contributing to AutoAgent

Thank you for your interest in contributing to AutoAgent! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members
- Be constructive in discussions and feedback

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Set up the development environment** (see below)
4. **Create a branch** for your changes
5. **Make your changes** following our guidelines
6. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js >= 22.0.0
- npm >= 6.0.0
- Git
- Claude CLI or Gemini CLI (for testing)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/carlrannaberg/autoagent.git
   cd autoagent
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up git hooks:**
   ```bash
   npm run setup-hooks
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

6. **Link for local testing:**
   ```bash
   npm link
   # Now you can use 'autoagent' command locally
   ```

### Development Commands

```bash
# Build TypeScript
npm run build

# Watch mode for development
npm run build:watch

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Run all checks (lint, type-check, test)
npm run check-all
```

## How to Contribute

### Types of Contributions

#### 1. Bug Reports
- Use the bug report template
- Include reproduction steps
- Provide system information
- Include error messages and logs

#### 2. Feature Requests
- Use the feature request template
- Explain the use case
- Provide examples
- Consider implementation details

#### 3. Code Contributions
- Bug fixes
- New features
- Performance improvements
- Refactoring

#### 4. Documentation
- Fix typos and errors
- Improve clarity
- Add examples
- Translate documentation

#### 5. Tests
- Add missing tests
- Improve test coverage
- Fix failing tests

### First-Time Contributors

Look for issues labeled:
- `good first issue` - Simple issues perfect for beginners
- `help wanted` - Issues where we need community help
- `documentation` - Documentation improvements

## Pull Request Process

### Before Submitting

1. **Update your fork:**
   ```bash
   git remote add upstream https://github.com/original/autoagent.git
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes:**
   - Write clean, documented code
   - Add/update tests
   - Update documentation
   - Follow coding standards

4. **Test your changes:**
   ```bash
   npm run check-all
   ```

### Submitting a Pull Request

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Test changes
   - `chore:` Build process or auxiliary tool changes

2. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request:**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template
   - Submit for review

### PR Requirements

- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] PR description explains changes
- [ ] Related issues are linked

### Review Process

1. Automated checks run (tests, linting, type checking)
2. Code review by maintainers
3. Address feedback and push updates
4. PR is merged once approved

## Coding Standards

### TypeScript Guidelines

```typescript
// Use explicit types
function processIssue(issue: Issue): ExecutionResult {
  // Implementation
}

// Use interfaces for object types
interface ConfigOptions {
  provider: string;
  timeout?: number;
}

// Use enums for constants
enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug'
}

// Document public APIs
/**
 * Execute a single issue
 * @param issuePath - Path to the issue file
 * @param options - Execution options
 * @returns Execution result
 */
async function executeIssue(
  issuePath: string,
  options?: ExecutionOptions
): Promise<ExecutionResult> {
  // Implementation
}
```

### Style Guidelines

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays
- Use `async/await` over callbacks
- Prefer `const` over `let`
- Use meaningful variable names
- Keep functions small and focused

### File Organization

```
src/
├── core/           # Core business logic
├── providers/      # AI provider implementations
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── cli/            # CLI implementation

test/
├── core/           # Core tests
├── providers/      # Provider tests
├── utils/          # Utility tests
└── fixtures/       # Test fixtures
```

## Testing Guidelines

### Writing Tests

```typescript
import { describe, it, expect, jest } from '@jest/globals';
import { AutonomousAgent } from '../src/core/autonomous-agent';

describe('AutonomousAgent', () => {
  let agent: AutonomousAgent;

  beforeEach(() => {
    // Setup
    agent = new AutonomousAgent(mockConfig, mockFiles);
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllMocks();
  });

  describe('executeNext', () => {
    it('should execute the next pending issue', async () => {
      // Arrange
      const mockIssue = createMockIssue();

      // Act
      const result = await agent.executeNext();

      // Assert
      expect(result.success).toBe(true);
      expect(result.issueNumber).toBe(mockIssue.number);
    });

    it('should handle errors gracefully', async () => {
      // Test error scenarios
    });
  });
});
```

### Test Coverage

- Aim for >80% code coverage
- Test happy paths and error cases
- Test edge cases
- Mock external dependencies

### STM Testing Patterns

#### Creating Test Tasks

```typescript
// Minimal task
const taskId = await stmManager.createTask('Fix Bug', {
  description: 'Fix the issue in module X'
});

// Detailed task with all fields
const taskId = await stmManager.createTask('New Feature', {
  description: 'Add user authentication',
  technicalDetails: 'Use JWT tokens with refresh rotation',
  implementationPlan: '1. Create auth middleware\n2. Add endpoints',
  acceptanceCriteria: [
    'Users can log in',
    'Sessions persist',
    'Logout works'
  ],
  testingStrategy: 'Unit and integration tests',
  verificationSteps: 'Run: npm run test:auth',
  tags: ['security', 'backend']
});
```

#### Testing Task Lifecycle

```typescript
it('should manage task status transitions', async () => {
  const taskId = await stmManager.createTask('Task', {
    description: 'Test task lifecycle'
  });
  
  // Check initial status
  let task = await stmManager.getTask(taskId);
  expect(task?.status).toBe('pending');
  
  // Start work
  await stmManager.markTaskInProgress(taskId);
  task = await stmManager.getTask(taskId);
  expect(task?.status).toBe('in-progress');
  
  // Complete
  await stmManager.markTaskComplete(taskId);
  task = await stmManager.getTask(taskId);
  expect(task?.status).toBe('done');
});
```

#### Mocking STM in Tests

```typescript
// Option 1: Shared instance (recommended for integration tests)
const sharedSTMManager = new InMemorySTMManager();
vi.mock('../src/utils/stm-manager', () => ({
  STMManager: vi.fn(() => sharedSTMManager)
}));

// Option 2: Isolated instance (for unit tests)
beforeEach(() => {
  const isolatedSTM = new InMemorySTMManager();
  vi.mocked(STMManager).mockImplementation(() => isolatedSTM);
});

// Option 3: Direct injection (for testing STM itself)
const agent = new AutonomousAgent(config, stmManager);
```

### STM Test Helpers

The `InMemorySTMManager` provides these test-specific methods:

```typescript
// Reset all data
stmManager.reset();

// Get all tasks for assertions
const allTasks = stmManager.getAllTasks();

// Set predictable task IDs
stmManager.setNextId(100);

// Simulate STM failures
stmManager.setInitializationError(new Error('STM down'));

// Direct task access (bypasses string parsing)
const task = stmManager.getTaskById(42);
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test test/unit/core/autonomous-agent.test.ts

# Run in watch mode
npm run test:watch

# Run only STM-related tests
npm test -- stm
```

## Documentation

### Code Documentation

- Document all public APIs
- Use JSDoc comments
- Include examples in comments
- Keep comments up-to-date

```typescript
/**
 * Creates a new issue with AI assistance
 *
 * @param description - Brief description of the issue
 * @param options - Optional configuration
 * @returns Object containing issue and plan paths
 *
 * @example
 * ```typescript
 * const { issuePath, planPath } = await agent.createIssue(
 *   'Add user authentication',
 *   { provider: 'claude' }
 * );
 * ```
 */
async function createIssue(
  description: string,
  options?: CreateIssueOptions
): Promise<CreateIssueResult> {
  // Implementation
}
```

### Documentation Updates

When adding features or making changes:

1. Update README.md if needed
2. Update API documentation
3. Add/update examples
4. Update configuration docs
5. Add to troubleshooting guide if relevant

## Issue Guidelines

### Creating Issues

Use issue templates for:
- Bug reports
- Feature requests
- Documentation improvements

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested
- `wontfix` - This will not be worked on
- `duplicate` - This issue already exists

### Working on Issues

1. Comment on the issue to claim it
2. Ask questions if requirements are unclear
3. Provide updates on progress
4. Link your PR to the issue

## Community

### Getting Help

- Read the documentation
- Check existing issues
- Ask in discussions
- Join our Discord server

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and discussions
- **Discord** - Real-time chat and support
- **Email** - contribute@autoagent.dev

### Recognition

Contributors are recognized in:
- Contributors list in README
- Release notes
- Special badges in Discord

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Checklist

1. Update version in package.json
2. Update CHANGELOG.md
3. Run all tests
4. Build distribution
5. Create release tag
6. Publish to npm
7. Create GitHub release

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

Thank you for contributing to AutoAgent! Your efforts help make this project better for everyone.

Questions? Feel free to ask in [GitHub Discussions](https://github.com/carlrannaberg/autoagent/discussions).