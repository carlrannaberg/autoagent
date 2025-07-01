# E2E Test Documentation

This directory contains end-to-end tests for the AutoAgent CLI. These tests verify the complete workflow from a user's perspective.

## Structure

```
test/e2e/
├── cli/                  # Individual CLI command tests
│   ├── init.test.ts     # Project initialization
│   ├── config.test.ts   # Configuration management
│   ├── create.test.ts   # Issue creation
│   ├── list.test.ts     # Listing functionality
│   ├── status.test.ts   # Status reporting
│   ├── error-handling.test.ts  # Error scenarios
│   └── output-formatting.test.ts # Output validation
├── workflows/           # Complete workflow tests
│   ├── complete-lifecycle.test.ts  # Full issue lifecycle
│   ├── configuration-workflow.test.ts # Config management
│   └── git-integration.test.ts    # Git workflow
├── helpers/            # Test utilities
│   ├── cli-executor.ts # CLI execution helper
│   ├── e2e-workspace.ts # Workspace management
│   ├── output-parser.ts # Output parsing utilities
│   └── setup.ts        # Test setup helpers
└── fixtures/           # Test data and mocks
```

## Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run specific E2E test file
npm test test/e2e/cli/init.test.ts

# Run with coverage
npm run test:e2e:coverage

# Run in watch mode
npm run test:e2e:watch
```

## Writing E2E Tests

### Basic Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';

describe('Feature E2E', () => {
  const { workspace, cli } = setupE2ETest();

  it('should perform expected behavior', async () => {
    // Setup
    await workspace.initGit();
    await cli.execute(['init']);

    // Execute command
    const result = await cli.execute(['command', 'arg']);

    // Assert
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('expected output');
  });
});
```

### Test Helpers

#### CliExecutor
Executes CLI commands and captures output:
```typescript
const result = await cli.execute(['command', 'arg']);
// result.stdout - standard output
// result.stderr - error output
// result.exitCode - process exit code
```

#### E2EWorkspace
Manages temporary test workspaces:
```typescript
await workspace.create();           // Create temp directory
await workspace.initGit();          // Initialize git repo
await workspace.createFile(path, content); // Create file
await workspace.cleanup();          // Clean up (automatic)
```

#### OutputParser
Utilities for parsing CLI output:
```typescript
OutputParser.extractJsonOutput(output);    // Parse JSON
OutputParser.containsError(output);        // Check for errors
OutputParser.extractTableData(output);     // Parse tables
OutputParser.stripAnsi(output);            // Remove colors
```

## Test Scenarios

### CLI Commands
- **init**: Project initialization
- **config**: Configuration get/set/reset
- **create**: Issue creation (interactive and non-interactive)
- **list**: Listing issues, providers, executions
- **status**: Project and issue status
- **run**: Issue execution (mocked)

### Workflows
- **Complete Lifecycle**: init → create → run → status
- **Multi-Issue**: Batch processing multiple issues
- **Configuration**: Global vs local config, env overrides
- **Git Integration**: Branching, commits, history

### Error Handling
- Invalid commands and arguments
- File system errors (permissions, missing files)
- Network/provider errors (timeout, rate limit)
- Malformed input files
- Recovery scenarios

### Output Validation
- Table formatting and alignment
- JSON output structure
- Progress indicators
- Verbose/debug output
- Color support
- Error message formatting

## Mocking

E2E tests use environment variables to enable mock behaviors:

```typescript
cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');  // Use mock provider
cli.setEnv('AUTOAGENT_MOCK_TIMEOUT', 'true');   // Simulate timeout
cli.setEnv('AUTOAGENT_MOCK_RATE_LIMIT', 'true'); // Simulate rate limit
cli.setEnv('AUTOAGENT_MOCK_AUTH_FAIL', 'true'); // Simulate auth failure
cli.setEnv('AUTOAGENT_MOCK_DELAY', '2000');     // Add delay (ms)
```

## Best Practices

1. **Isolation**: Each test creates its own workspace
2. **Cleanup**: Workspaces are automatically cleaned up
3. **Timeouts**: E2E tests have 120s timeout by default
4. **Real Commands**: Tests execute the actual CLI binary
5. **Mock Providers**: AI providers are mocked to ensure deterministic tests
6. **Assertions**: Verify both output and file system state

## Troubleshooting

### Test Failures
- Check test output for actual vs expected values
- Enable verbose mode: `DEBUG=autoagent:* npm run test:e2e`
- Inspect workspace: Comment out cleanup in failing test

### Slow Tests
- E2E tests are naturally slower than unit tests
- Use `.only` to run specific tests during development
- Consider parallelization for CI environments

### Platform Issues
- Tests should work on Windows, macOS, and Linux
- File path handling uses Node's `path` module
- Git commands assume git is installed

## CI Integration

E2E tests run in CI with:
- Clean environment
- No git configuration (tests set up their own)
- Longer timeouts for slower CI machines
- Coverage reporting

## Future Improvements

- [ ] Add performance benchmarks
- [ ] Test real provider integration (with flags)
- [ ] Add screenshot/recording capabilities
- [ ] Test interrupt handling (Ctrl+C)
- [ ] Add cross-platform specific tests