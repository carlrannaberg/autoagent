# Issue 24: Add Bootstrap Integration Tests

## Requirement
Create integration tests to verify the bootstrap command works correctly in real-world scenarios with the issue numbering fix.

## Acceptance Criteria
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
- Related Issues: #22 (core fix), #23 (unit tests), #19 (decomposition task)