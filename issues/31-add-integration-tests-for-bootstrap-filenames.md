# Issue 31: Add integration tests for bootstrap filenames

## Description
Create integration tests to verify that the bootstrap command creates consistent filenames for both issue and plan files. These tests will ensure the end-to-end filename generation process works correctly across different scenarios.

## Requirements
Create integration tests to verify that the bootstrap command creates consistent filenames for both issue and plan files.

## Success Criteria
- [ ] Test bootstrap creates matching issue and plan filenames
- [ ] Test various issue title formats
- [ ] Test filename predictability
- [ ] Test end-to-end CLI bootstrap command
- [ ] Verify no regression in bootstrap functionality
- [ ] All tests pass reliably in CI/CD

## Technical Details
Tests should verify:
- Bootstrap creates files with consistent naming patterns
- Issue file: `{number}-{slug}.md`
- Plan file: `{number}-{slug}-plan.md`
- Files are created in correct directories
- Content is properly formatted

## Resources
- Test file: `test/core/autonomous-agent.test.ts`
- CLI test file: `test/cli/cli.test.ts`
- Testing framework: Vitest

## Test Scenarios
1. Bootstrap with simple title
2. Bootstrap with complex title (special characters)
3. Bootstrap with very long title
4. Verify file pairing and relationships
5. CLI integration test
