# Plan for Issue 51: Delete bootstrap command and clean up references

This document outlines the step-by-step plan to complete `issues/51-delete-bootstrap-command-and-clean-up-references.md`.

## Implementation Plan

### Phase 1: Remove Bootstrap Command
- [ ] Delete `src/cli/commands/bootstrap.ts` file
- [ ] Remove bootstrap command registration from `src/cli/index.ts`
- [ ] Remove bootstrap import statements from CLI index

### Phase 2: Clean Up Source Code
- [ ] Search for bootstrap imports across all source files
- [ ] Remove unused bootstrap-related imports
- [ ] Check for bootstrap-specific types or interfaces
- [ ] Ensure no broken references in core modules

### Phase 3: Update Tests
- [ ] Find all test files mentioning bootstrap command
- [ ] Remove or update bootstrap-specific tests
- [ ] Update CLI integration tests
- [ ] Ensure test coverage remains comprehensive

### Phase 4: Final Verification
- [ ] Run full test suite to catch any issues
- [ ] Grep for "bootstrap" to find remaining references
- [ ] Check that CLI help no longer shows bootstrap
- [ ] Verify build completes without errors

## Technical Approach
- Use systematic search to find all references
- Remove code in order: command → registration → imports → tests
- Run tests frequently to catch breakage early
- Keep Agent.bootstrap() method (used internally by run)

## Testing Strategy
- Run tests after each major deletion
- Verify CLI starts without bootstrap command
- Check help output doesn't mention bootstrap
- Ensure run command still works with spec files

## Potential Challenges
- Hidden references in comments or strings
- Test fixtures that assume bootstrap exists
- Documentation that needs updating
- Ensuring complete removal without breaking functionality

## Additional Notes
This is primarily a deletion task, but must be done carefully to avoid breaking the build or tests. The bootstrap logic itself remains in the Agent class - we're only removing the CLI command interface.