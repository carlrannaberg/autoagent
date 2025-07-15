# Issue 51: Delete bootstrap command and clean up references

## Description
Remove the bootstrap command entirely from the CLI and clean up all references throughout the codebase. This completes the transition to the smart run command that handles spec files automatically.

## Requirements
Remove the bootstrap command entirely from the CLI and clean up all references throughout the codebase.

## Acceptance Criteria
- [ ] Delete `src/cli/commands/bootstrap.ts` file
- [ ] Remove bootstrap command registration from CLI index
- [ ] Remove bootstrap imports from all files
- [ ] Clean up bootstrap references in tests
- [ ] Remove bootstrap from command help and documentation
- [ ] Ensure no broken imports or references remain

## Technical Details
This is a cleanup task to remove the now-redundant bootstrap command:
1. Delete the bootstrap command file
2. Remove its registration in `src/cli/index.ts`
3. Search for and remove all bootstrap-related imports
4. Update any tests that reference bootstrap
5. Clean up types/interfaces if bootstrap-specific

Use grep/search to ensure no bootstrap references remain in:
- Source code
- Tests
- Documentation
- Comments

## Dependencies
- Issue 50: Spec file handling must be implemented first (bootstrap logic moved to run)

## Resources
- Files to modify: `src/cli/index.ts`, various test files
- File to delete: `src/cli/commands/bootstrap.ts`
