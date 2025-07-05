# Issue 49: Add input type detection to run command

## Requirement
Enhance the run command to detect different input types (spec files, issue numbers, issue names) and route to appropriate execution paths.

## Acceptance Criteria
- [ ] Run command accepts optional `[target]` parameter instead of `[issue]`
- [ ] Function `isPlanFile()` detects spec/plan files by checking for absence of issue markers
- [ ] Function `isIssueNumber()` detects numeric issue references
- [ ] Function `isIssueFile()` detects issue file names with format `number-slug.md`
- [ ] Input detection logic routes to correct execution path
- [ ] Existing run behavior is preserved when no target is provided

## Technical Details
The run command needs to intelligently determine what type of input it receives:
- Spec/plan files: `.md` files without "# Issue N:" markers
- Issue numbers: Numeric strings like "1", "23"
- Issue names: Strings matching issue file patterns
- No input: Execute next pending issue (existing behavior)

Add these detection functions to the run command implementation in `src/cli/commands/run.ts`.

## Dependencies
None - this is the foundation for subsequent smart run features.

## Resources
- Master Spec: `./specs/smart-run-command.md`