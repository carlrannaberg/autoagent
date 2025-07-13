# Issue 24: Add Bootstrap Integration Tests

## Description
Create integration tests to verify the bootstrap command works correctly in real-world scenarios with the issue numbering fix. These tests will ensure the complete workflow functions properly from CLI invocation through file creation.

## Requirements
Create integration tests to verify the bootstrap command works correctly in real-world scenarios with the issue numbering fix.

## Success Criteria
- [ ] Test end-to-end bootstrap workflow with existing issues
- [ ] Test CLI integration for bootstrap command
- [ ] Test bootstrap with various master plan configurations
- [ ] Test integration with status command showing correct issue count
- [ ] Test bootstrap maintains project consistency
- [ ] All integration tests pass reliably

## Technical Details
Integration tests should verify the complete bootstrap workflow:

1. **CLI Integration**: Test `autoagent bootstrap <plan>` command
2. **Workflow Integration**: Verify bootstrap integrates with existing project state
3. **Status Command**: Verify `autoagent status` shows correct issue counts
4. **File System State**: Verify correct files are created in correct locations

## Test Scenarios
- Bootstrap in project with 0, 1, and multiple existing issues
- Bootstrap with different master plan formats
- Bootstrap followed by other commands (status, list, etc.)
- Multiple bootstrap operations in sequence

## Resources
- Master Specification: `specs/fix-bootstrap-issue-numbering.md`
- Related Issues: Issue 22 (core fix), Issue 23 (unit tests), Issue 19 (decomposition task)
