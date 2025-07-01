# Issue 3: Create Test Setup and Utilities

## Requirement
Create the test setup file and migrate/create test utilities that will be used across all test suites.

## Acceptance Criteria
- [ ] Create test/setup.ts with Vitest configuration
- [ ] Implement custom matchers for AutoAgent
- [ ] Create mock system for providers
- [ ] Create mock filesystem utilities
- [ ] Create TestWorkspace utility class
- [ ] Set up global test utilities and factories
- [ ] Ensure all utilities are properly typed

## Technical Details
- Port custom Jest matchers to Vitest format
- Use memfs for filesystem mocking
- Implement provider behavior scenarios
- Create factories for common test data
- Set up proper TypeScript types for custom matchers

## Dependencies
- Issue #2: Vitest must be installed and configured

## Resources
- Master Plan: ./specs/vitest-migration.md (Steps 4-6)
- Current Jest utilities in test/ directory