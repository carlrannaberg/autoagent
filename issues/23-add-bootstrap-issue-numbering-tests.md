# Issue 23: Add Bootstrap Issue Numbering Tests

## Description
Create comprehensive unit tests for the bootstrap issue numbering fix to ensure correct behavior in all scenarios. These tests will validate that the bootstrap command properly generates sequential issue numbers, handles gaps, and prevents overwriting existing issues.

## Requirements
Create comprehensive unit tests for the bootstrap issue numbering fix to ensure correct behavior in all scenarios.

## Acceptance Criteria
- [ ] Test bootstrap creates issue 1 in empty project
- [ ] Test bootstrap creates next sequential issue with existing issues
- [ ] Test bootstrap handles gaps in issue numbering correctly
- [ ] Test bootstrap does not overwrite existing issues
- [ ] Test error handling when filesystem operations fail
- [ ] Test concurrent bootstrap execution (if applicable)
- [ ] All tests pass and provide good coverage

## Technical Details
Tests should be added to the appropriate test file for `AutonomousAgent.bootstrap` method. Key test scenarios include:

1. **Empty Project Test**: Verify issue Issue #1 is created when no issues exist
2. **Sequential Numbering Test**: Verify next number is used with existing issues
3. **Gap Handling Test**: Verify correct behavior with non-sequential issue numbers
4. **Overwrite Prevention Test**: Verify existing issues are preserved
5. **Edge Cases**: Invalid files in issues directory, filesystem errors

## Test Implementation Notes
- Use proper mocking for FileManager operations
- Create helper functions for test setup (creating test issues)
- Ensure tests are isolated and don't affect each other
- Follow existing test patterns in the codebase

## Resources
- Master Specification: `specs/fix-bootstrap-issue-numbering.md`
- Related Issues: Issue 22 (core fix), Issue 19 (decomposition task)
