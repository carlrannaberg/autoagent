# Integration Tests

This directory contains comprehensive integration tests for the AutoAgent system. These tests verify that different components work together correctly and test real-world scenarios.

## Overview

Integration tests are designed to:
- Test provider failover and recovery mechanisms
- Verify complete workflow execution
- Ensure error recovery and resilience
- Measure and optimize performance
- Test multi-provider scenarios

## Directory Structure

```
test/integration/
├── providers/           # Provider-specific integration tests
│   ├── provider-failover.test.ts
│   └── multi-provider.test.ts
├── workflows/          # End-to-end workflow tests
│   ├── issue-lifecycle.test.ts
│   └── batch-execution.test.ts
├── error-recovery/     # Error handling and recovery tests
│   └── recovery-scenarios.test.ts
├── performance/        # Performance benchmarks
│   └── performance-benchmarks.test.ts
├── utils/             # Integration test utilities
│   ├── integration-helpers.ts
│   ├── provider-simulator.ts
│   ├── git-simulator.ts
│   └── setup.ts
└── README.md          # This file
```

## Running Integration Tests

```bash
# Run all integration tests
npm run test:integration

# Run specific integration test suite
npm run test:integration -- provider-failover

# Run with coverage
npm run test:integration -- --coverage

# Run in watch mode for development
npm run test:integration -- --watch
```

## Test Categories

### 1. Provider Failover Tests (`providers/`)

Tests the system's ability to switch between providers when failures occur.

**Key scenarios:**
- Rate limit failover
- Network failure recovery
- Provider-specific error handling
- Multi-provider load balancing
- Provider performance optimization

### 2. Workflow Integration Tests (`workflows/`)

Tests complete issue execution workflows from start to finish.

**Key scenarios:**
- Single issue execution
- Batch issue processing
- Dependency resolution
- Git integration
- Configuration management
- TODO list synchronization

### 3. Error Recovery Tests (`error-recovery/`)

Tests the system's resilience to various failure modes.

**Key scenarios:**
- Network failures (DNS, timeouts, connection errors)
- File system errors (permissions, disk space, locks)
- Git operation failures (conflicts, detached HEAD)
- State corruption recovery
- Timeout handling

### 4. Performance Tests (`performance/`)

Benchmarks and performance optimization tests.

**Key scenarios:**
- Concurrent vs sequential execution
- Provider switching overhead
- Large batch processing
- Memory usage patterns
- Cache effectiveness

## Test Utilities

### IntegrationTestContext

Provides a consistent test environment with:
- Isolated workspace
- Mock providers
- Log capture
- Cleanup utilities

### ProviderSimulator

Simulates AI provider behavior with configurable:
- Response delays
- Failure rates
- Rate limiting
- Custom responses

### GitSimulator

Simulates git operations for testing:
- Repository initialization
- Commit creation
- Branch management
- Merge conflicts
- Status checks

## Writing New Integration Tests

### 1. Basic Test Structure

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createIntegrationContext, cleanupIntegrationContext } from '../utils/integration-helpers';
import type { IntegrationTestContext } from '../utils/integration-helpers';

describe('My Integration Test', () => {
  let context: IntegrationTestContext;

  beforeEach(async () => {
    context = await createIntegrationContext();
  });

  afterEach(async () => {
    await cleanupIntegrationContext(context);
  });

  it('should test something', async () => {
    // Your test here
  });
});
```

### 2. Using Provider Simulators

```typescript
const provider = new ProviderSimulator({
  name: 'claude',
  responseDelay: 100,
  errorRate: 0.1,
  rateLimitThreshold: 10
});

// Set custom response
provider.setCustomResponse('specific prompt', 'custom response');

// Simulate rate limiting
provider.simulateRateLimit();

// Get metrics
const metrics = provider.getMetrics();
```

### 3. Testing Workflows

```typescript
// Create test issue
const issue = {
  id: 'test-issue',
  title: 'Test Issue',
  requirement: 'Test requirement',
  acceptanceCriteria: ['Criteria 1', 'Criteria 2']
};

await createTestIssue(context.workspace, issue);

// Execute workflow
const result = await agent.executeIssue(issue.id);
expect(result.status).toBe('completed');
```

## Best Practices

1. **Test Isolation**: Each test should create its own workspace and clean up after itself
2. **Realistic Scenarios**: Use realistic delays and failure rates
3. **Deterministic Tests**: Avoid random failures by controlling timing and responses
4. **Performance Awareness**: Integration tests can be slow; use timeouts appropriately
5. **Clear Assertions**: Test both success and failure paths

## Configuration

Integration tests use a separate Vitest configuration with:
- Extended timeouts (60 seconds)
- Sequential execution
- Isolated test environments

See `vitest.config.integration.ts` for details.

## Troubleshooting

### Test Timeouts

If tests are timing out:
1. Check if the test is waiting for a condition that never occurs
2. Increase timeout in test configuration
3. Add logging to identify where the test is hanging

### Flaky Tests

If tests pass/fail inconsistently:
1. Check for race conditions
2. Ensure proper cleanup between tests
3. Use `waitForCondition` helper for async operations
4. Mock time-dependent operations

### Resource Leaks

If tests slow down over time:
1. Ensure all resources are cleaned up in `afterEach`
2. Check for unclosed file handles or processes
3. Monitor memory usage during test runs

## Contributing

When adding new integration tests:
1. Place tests in the appropriate category directory
2. Update this README with new test scenarios
3. Ensure tests are deterministic and isolated
4. Add appropriate test utilities if needed
5. Document any special setup requirements