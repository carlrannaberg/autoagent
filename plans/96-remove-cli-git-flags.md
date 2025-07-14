# Plan for Issue #96: Remove CLI git flags

This document outlines the step-by-step plan to complete `issues/96-remove-cli-git-flags.md`.

## Overview
Remove legacy git flags from CLI commands.

## Implementation Steps

### Run Command Updates
- [ ] Remove --commit option definition
- [ ] Remove --push option definition
- [ ] Remove --no-commit variant
- [ ] Remove --no-push variant
- [ ] Update help text

### Logic Removal
- [ ] Remove flag processing logic
- [ ] Remove flag conflict checks
- [ ] Update option handling
- [ ] Clean up imports

### Test Updates
- [ ] Update run command tests
- [ ] Remove flag-related test cases
- [ ] Update integration tests
- [ ] Fix test compilation

### Documentation
- [ ] Update command examples
- [ ] Remove flag references
- [ ] Update README if needed

## Potential Challenges
- Finding all test references
- Ensuring no breaking changes
- Updating documentation

## Additional Context Files
- src/cli/commands/run.ts
- test/cli/commands/run.test.ts
- README.md