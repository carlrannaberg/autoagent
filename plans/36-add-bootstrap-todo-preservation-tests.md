# Plan for Issue #36: Add Bootstrap TODO Preservation Tests

This document outlines the step-by-step plan to complete `issues/36-add-bootstrap-todo-preservation-tests.md`.

## Overview

This plan implements comprehensive tests to verify that the bootstrap command properly preserves existing TODO content when adding new issues. The tests will ensure that the fix for TODO overwriting works correctly in all scenarios.

## Implementation Steps

### Phase 1: Test Setup
- [ ] Create test file for bootstrap TODO handling
- [ ] Set up test workspace utilities
- [ ] Create helper methods for TODO assertions

### Phase 2: Core Functionality Tests
- [ ] Test: Bootstrap with empty TODO.md creates structure
- [ ] Test: Bootstrap preserves existing pending issues
- [ ] Test: Bootstrap preserves completed issues section
- [ ] Test: Bootstrap maintains correct issue numbering

### Phase 3: Edge Case Tests
- [ ] Test: Bootstrap with missing TODO.md file
- [ ] Test: Bootstrap with malformed TODO structure
- [ ] Test: Bootstrap with TODO missing sections
- [ ] Test: Bootstrap with empty file

### Phase 4: Integration Tests
- [ ] Test: TODO format consistency with createIssue
- [ ] Test: Full bootstrap workflow preservation
- [ ] Test: Regression - empty project bootstrap still works
- [ ] Test: Multiple bootstrap calls preserve all issues

## Technical Approach
Implement comprehensive test coverage using Vitest framework. Tests should verify both the preservation of existing content and the correct addition of new issues.

## Potential Challenges
- Creating realistic test scenarios
- Mocking file system operations correctly
- Testing various TODO.md formats

## Testing Strategy
- Unit tests for isolated bootstrap TODO behavior
- Integration tests for full workflow
- Edge case coverage for robustness