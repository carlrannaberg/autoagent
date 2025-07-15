# Issue 42: Add tests for embedded template functionality

## Description
Create comprehensive unit and integration tests to verify that the bootstrap command correctly uses embedded templates. This ensures the new embedded template functionality works reliably without external files.

## Requirements
Create comprehensive unit and integration tests to verify that the bootstrap command correctly uses embedded templates and handles various scenarios without requiring external template files.

## Acceptance Criteria
- [ ] Unit tests verify embedded templates are used when no files exist
- [ ] Unit tests ensure no filesystem operations for templates
- [ ] Integration tests confirm bootstrap works without template directory
- [ ] Tests verify correct template content is used in generated issues
- [ ] Error handling tests for missing/undefined templates
- [ ] Tests confirm no regression in bootstrap functionality
- [ ] All tests pass in CI/CD pipeline

## Technical Details
- Create unit tests in `test/core/autonomous-agent.test.ts`
- Create integration tests in `test/cli/bootstrap.test.ts` (or appropriate location)
- Mock filesystem operations to ensure templates aren't read from disk
- Verify prompt content includes embedded template structure
- Test edge cases like undefined templates
- Use Vitest testing framework and conventions

## Dependencies
- Depends on: Issue 40 (Create embedded template module)
- Depends on: Issue 41 (Update bootstrap to use embedded templates)

## Resources
- Master Plan: `specs/embed-bootstrap-templates.md` (lines 245-324)
- Testing framework: Vitest
- Existing test patterns in the codebase

## Notes
Tests should cover both positive cases (successful bootstrap) and negative cases (error scenarios). Focus on ensuring the embedded templates are actually being used rather than filesystem templates.
