# Issue 2: Install and Configure Vitest

## Requirement
Install Vitest and create the necessary configuration files to replace Jest as the testing framework.

## Acceptance Criteria
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