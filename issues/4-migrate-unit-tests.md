# Issue 4: Migrate Unit Tests from Jest to Vitest

## Description
Migrate all existing unit tests from Jest syntax to Vitest syntax, updating imports, mocks, and assertions. This ensures the test suite is fully compatible with Vitest and takes advantage of its performance improvements.

## Requirements
Migrate all existing unit tests from Jest syntax to Vitest syntax, updating imports, mocks, and assertions.

## Acceptance Criteria
- [ ] All test files import from 'vitest' instead of '@jest/globals' or 'jest'
- [ ] All jest.mock() calls are replaced with vi.mock() equivalents
- [ ] All mock functions use vi.fn() instead of jest.fn()
- [ ] Test suite runs successfully with `npm test` command
- [ ] Code coverage remains at or above previous levels (>80%)

## Success Criteria
- [ ] Identify all test files that need migration
- [ ] Update imports from jest to vitest
- [ ] Convert jest.mock() to vi.mock()
- [ ] Update all jest.fn() to vi.fn()
- [ ] Fix mock type definitions
- [ ] Ensure all tests pass after migration
- [ ] Maintain or improve code coverage

## Technical Details
- Batch migration by directory for easier tracking
- Update mock syntax while preserving behavior
- Fix any TypeScript issues that arise
- Use new test utilities where applicable

## Dependencies
- **Issue 2**: Vitest must be installed
- **Issue 3**: Test utilities must be created

## Resources
- Master Plan: ./specs/vitest-migration.md (Step 5)
- Existing test files in test/ directory
