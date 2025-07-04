# Issue 37: Add Bootstrap TODO Integration Tests

## Requirement
Add integration tests that verify the complete bootstrap workflow, including TODO preservation, issue creation, plan generation, and CLI integration.

## Acceptance Criteria
- [ ] Test full bootstrap workflow with existing project state
- [ ] Test CLI command execution and output
- [ ] Test that existing issues are preserved in workflow
- [ ] Test that new bootstrap issue is correctly added
- [ ] Test that plan file is created with correct reference
- [ ] Test error handling and edge cases
- [ ] Verify no regression in empty project bootstrap

## Technical Details
Integration tests should cover the end-to-end bootstrap process:
1. Set up a project with existing issues
2. Run bootstrap command via CLI
3. Verify all files are created correctly
4. Verify TODO.md preserves existing content
5. Verify command output and success status

## Dependencies
- Issue #34: Fix Bootstrap TODO Overwrite (implementation to test)
- Issue #36: Unit tests should pass first

## Resources
- Integration test examples from master plan
- Existing CLI test patterns in test directory