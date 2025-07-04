# AutoAgent Test Structure

This directory contains all tests for the AutoAgent project, organized by test type and purpose.

## Directory Structure

```
test/
├── unit/                    # Unit tests for individual components
│   ├── core/               # Core module unit tests
│   ├── providers/          # Provider unit tests  
│   ├── utils/              # Utility function unit tests
│   └── cli/                # CLI command unit tests
│
├── integration/            # Integration tests (components working together)
│   ├── providers/          # Provider integration tests
│   ├── workflows/          # Workflow integration tests
│   └── error-recovery/     # Error handling integration tests
│
├── e2e/                    # End-to-end tests (full system tests)
│   ├── cli/                # CLI E2E tests
│   ├── workflows/          # Complete workflow E2E tests
│   └── scenarios/          # Real-world scenario tests
│
├── contract/               # Contract tests for external dependencies
│   ├── claude-api/         # Claude API contract tests
│   ├── gemini-api/         # Gemini API contract tests
│   └── git/                # Git integration contract tests
│
├── performance/            # Performance and benchmark tests
│   ├── benchmarks/         # Performance benchmarks
│   ├── load/               # Load testing
│   └── memory/             # Memory profiling tests
│
├── fixtures/               # Shared test fixtures and data
│   ├── issues/             # Sample issue files
│   ├── plans/              # Sample plan files
│   └── configs/            # Test configurations
│
├── helpers/                # Test utilities and helpers
│   ├── test-doubles/       # In-memory implementations
│   ├── builders/           # Test data builders
│   ├── assertions/         # Custom assertions
│   └── setup/              # Test setup utilities
│
└── smoke/                  # Smoke tests for quick validation
    ├── cli-basics.test.ts  # Basic CLI functionality
    └── provider-check.test.ts # Provider availability
```

## Test Types

### Unit Tests (`unit/`)
- Test individual components in isolation
- Use test doubles for dependencies
- Fast execution (< 10ms per test)
- No external dependencies
- High code coverage focus

### Integration Tests (`integration/`)
- Test multiple components working together
- Use real implementations where possible
- May use test containers for databases
- Medium execution time (< 100ms per test)
- Focus on component interactions

### End-to-End Tests (`e2e/`)
- Test complete user scenarios
- Use real CLI and file system
- May interact with actual providers (in test mode)
- Slower execution (seconds per test)
- Focus on user workflows

### Contract Tests (`contract/`)
- Verify external API contracts
- Can run against mocks or real services
- Ensure compatibility with provider APIs
- Document expected behaviors

### Performance Tests (`performance/`)
- Benchmark critical operations
- Monitor performance regressions
- Memory profiling and leak detection
- Statistical analysis of results

### Smoke Tests (`smoke/`)
- Quick validation of basic functionality
- Run before more extensive test suites
- Catch obvious breaks early
- < 1 minute total execution time

## Running Tests

### By Type
```bash
# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Contract tests
npm run test:contract

# Performance tests
npm run test:perf

# Smoke tests
npm run test:smoke
```

### By Coverage
```bash
# Run all tests with coverage
npm run test:coverage

# Unit tests with coverage
npm run test:unit:coverage
```

### Watch Mode
```bash
# Watch all tests
npm run test:watch

# Watch unit tests only
npm run test:unit:watch
```

## Test Guidelines

### Naming Conventions
- Unit tests: `<component>.test.ts`
- Integration tests: `<feature>.integration.test.ts`
- E2E tests: `<scenario>.e2e.test.ts`
- Contract tests: `<service>.contract.test.ts`
- Performance tests: `<operation>.bench.ts`

### Test Structure
```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should handle normal case', () => {
      // Arrange
      // Act
      // Assert
    });

    it('should handle edge case', () => {
      // Test edge cases
    });

    it('should handle error case', () => {
      // Test error scenarios
    });
  });
});
```

### Best Practices
1. **Isolation**: Each test should be independent
2. **Clarity**: Test names should clearly describe what is being tested
3. **Focus**: One assertion per test when possible
4. **Speed**: Optimize for fast feedback
5. **Deterministic**: Tests should not be flaky
6. **Documentation**: Tests serve as living documentation

## Test Utilities

### Test Doubles
Located in `helpers/test-doubles/`:
- `InMemoryConfigManager`: In-memory configuration management
- `InMemoryFileManager`: In-memory file system operations
- `TestProvider`: Controllable provider for testing
- `GitSimulator`: Simulated git operations

### Builders
Located in `helpers/builders/`:
- `IssueBuilder`: Build test issue objects
- `ConfigBuilder`: Build test configurations
- `ExecutionResultBuilder`: Build execution results

### Custom Assertions
Located in `helpers/assertions/`:
- `toBeValidIssue()`: Validate issue structure
- `toHaveExecutedSuccessfully()`: Check execution results
- `toMatchStatisticalBaseline()`: Performance assertions

## Migration Guide

If you're migrating tests from the old structure:

1. **Identify test type**: Determine if it's unit, integration, or E2E
2. **Move to appropriate directory**: Place in the correct subdirectory
3. **Update imports**: Fix import paths for the new location
4. **Review dependencies**: Ensure proper test doubles are used
5. **Update test scripts**: Ensure test is included in appropriate npm script

## Continuous Integration

Tests are organized for efficient CI execution:

1. **PR Tests**: Smoke + Unit + Integration (fast feedback)
2. **Merge Tests**: All tests including E2E
3. **Nightly**: Full test suite including performance
4. **Release**: All tests with extended scenarios

This structure provides clear separation of concerns, faster test execution, and better maintainability.