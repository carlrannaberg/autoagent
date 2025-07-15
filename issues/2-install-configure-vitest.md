# Issue 2: Install and Configure Vitest

## Description
This issue covers the initial setup of Vitest as the testing framework for AutoAgent, replacing Jest. It includes installing necessary dependencies and creating appropriate configuration files for different test types.

## Requirements
Install Vitest and create the necessary configuration files to replace Jest as the testing framework.

## Acceptance Criteria
- [ ] All Jest dependencies (@jest/*, jest, ts-jest) are removed from package.json
- [ ] Vitest and related packages (vitest, @vitest/ui, @vitest/coverage-v8) are installed
- [ ] Three separate Vitest config files are created and properly configured
- [ ] Package.json test scripts are updated to use Vitest commands
- [ ] Running `npm test` successfully executes at least one test with Vitest

## Success Criteria
- [ ] Remove all Jest-related packages from package.json
- [ ] Install Vitest and required dependencies
- [ ] Create vitest.config.ts with proper configuration
- [ ] Create vitest.config.integration.ts for integration tests
- [ ] Create vitest.config.e2e.ts for E2E tests
- [ ] Update package.json scripts to use Vitest commands
- [ ] Verify basic test execution works

## Technical Details
- Follow the Gemini CLI testing patterns
- Use v8 for coverage provider
- Configure proper path aliases
- Set up appropriate timeouts and threading options
- Ensure coverage thresholds match existing Jest configuration

## Dependencies
None - this is the first step in the migration

## Resources
- Master Plan: ./specs/vitest-migration.md (Steps 1-3)
- Reference: Vitest configuration examples in the master plan
