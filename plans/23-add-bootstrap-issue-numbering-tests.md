# Plan for Issue #23: Add Bootstrap Issue Numbering Tests

This document outlines the step-by-step plan to complete `issues/23-add-bootstrap-issue-numbering-tests.md`.

## Overview

This plan covers the implementation of comprehensive unit tests for the bootstrap issue numbering functionality. The tests will ensure that the bootstrap command correctly determines the next available issue number, handles edge cases properly, and prevents issue overwrites.

## Implementation Steps

### Phase 1: Test File Setup
- [ ] Locate or create test file for AutonomousAgent
- [ ] Import necessary testing utilities and mocks
- [ ] Set up test fixtures and helpers
- [ ] Create helper function for creating test issues

### Phase 2: Core Test Implementation
- [ ] Implement test: "should create #1 in empty project"
- [ ] Implement test: "should create next sequential issue number"
- [ ] Implement test: "should handle gaps in issue numbering"
- [ ] Implement test: "should not overwrite existing issues"

### Phase 3: Edge Case Tests
- [ ] Test corrupted issue directory handling
- [ ] Test filesystem permission errors
- [ ] Test concurrent bootstrap execution
- [ ] Test malformed issue filenames

### Phase 4: Test Validation
- [ ] Run all tests and ensure they pass
- [ ] Check test coverage for bootstrap method
- [ ] Refactor tests for clarity and maintainability
- [ ] Add any missing test scenarios

## Technical Approach
- Use Vitest framework (as per CLAUDE.md)
- Mock FileManager operations appropriately
- Create realistic test scenarios
- Follow existing test patterns in the codebase

## Test Structure Example
```typescript
describe('AutonomousAgent.bootstrap', () => {
  describe('issue numbering', () => {
    beforeEach(() => {
      // Setup test environment
    });

    it('should create #1 in empty project', async () => {
      // Test implementation
    });

    // Additional tests...
  });
});
```

## Potential Challenges
- Properly mocking FileManager operations
- Simulating filesystem errors
- Testing concurrent execution scenarios
- Ensuring test isolation

## Success Metrics
- All tests pass consistently
- Tests cover all acceptance criteria scenarios
- Tests are maintainable and clear
- No flaky tests or race conditions