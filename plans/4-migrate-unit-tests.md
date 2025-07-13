# Plan for Issue #4: Migrate Unit Tests from Jest to Vitest

This document outlines the step-by-step plan to complete `issues/4-migrate-unit-tests.md`.

## Overview

This plan migrates all unit tests from Jest to Vitest, updating test syntax, mocking patterns, and configuration. The migration improves test performance and aligns with modern JavaScript tooling while maintaining test coverage and reliability.

## Implementation Steps

### Phase 1: Test Inventory
- [ ] List all test files in test/ directory
- [ ] Categorize tests by type (unit, integration, e2e)
- [ ] Identify tests using complex mocking
- [ ] Create migration checklist

### Phase 2: Core Module Tests
- [ ] Migrate test/core/*.test.ts files
- [ ] Update autonomous-agent tests
- [ ] Migrate config-manager tests
- [ ] Convert issue-parser tests
- [ ] Update plan-parser tests

### Phase 3: Provider Tests
- [ ] Migrate test/providers/*.test.ts files
- [ ] Update claude provider tests
- [ ] Migrate gemini provider tests
- [ ] Convert provider factory tests

### Phase 4: Utility Tests
- [ ] Migrate test/utils/*.test.ts files
- [ ] Update file utility tests
- [ ] Convert git utility tests
- [ ] Migrate formatting tests

### Phase 5: CLI Tests
- [ ] Migrate test/cli/*.test.ts files
- [ ] Update command tests
- [ ] Convert CLI utility tests

### Phase 6: Validation
- [ ] Run all migrated tests
- [ ] Fix any failing tests
- [ ] Check coverage metrics
- [ ] Update any outdated assertions

## Technical Approach
- Use search/replace for common patterns
- Manually review complex mocks
- Test each file after migration
- Use new mock utilities where beneficial

## Migration Patterns
```typescript
// Jest to Vitest conversions:
jest.mock() → vi.mock()
jest.fn() → vi.fn()
jest.spyOn() → vi.spyOn()
jest.clearAllMocks() → vi.clearAllMocks()
mockResolvedValue() → mockResolvedValue() (same)
```

## Potential Challenges
- Complex mock implementations
- Timer-based tests
- Snapshot compatibility
- Type inference differences

## Success Metrics
- All tests migrated and passing
- Coverage maintained or improved
- No TypeScript errors
- Tests run faster than with Jest