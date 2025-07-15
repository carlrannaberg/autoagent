# Issue 36: Add Bootstrap TODO Preservation Tests

## Description
Add comprehensive unit tests to verify that the bootstrap command correctly preserves existing TODO.md content and appends new issues without data loss. These tests will ensure the fix works properly and prevent regression.

## Requirements
Add comprehensive unit tests to verify that the bootstrap command correctly preserves existing TODO.md content and appends new issues without data loss.

## Acceptance Criteria
- [ ] Test bootstrap with empty TODO.md creates initial structure
- [ ] Test bootstrap with existing pending issues preserves them
- [ ] Test bootstrap with completed issues preserves them
- [ ] Test bootstrap appends at correct position in pending section
- [ ] Test bootstrap handles malformed TODO files gracefully
- [ ] Test bootstrap handles missing TODO.md file
- [ ] Test TODO format consistency between bootstrap and createIssue
- [ ] All tests pass with the fixed implementation

## Technical Details
Create comprehensive test coverage for the bootstrap TODO handling functionality. Tests should cover:
- Normal cases (existing content preservation)
- Edge cases (empty, missing, malformed files)
- Format consistency with createIssue
- Regression tests for empty project bootstrap

## Dependencies
- **Issue 34**: Fix Bootstrap TODO Overwrite (implementation to test)

## Resources
- Test examples in master plan: `specs/fix-bootstrap-todo-overwrite.md`
- Existing test structure in `test/` directory
