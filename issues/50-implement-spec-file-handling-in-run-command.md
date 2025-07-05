# Issue 50: Implement spec file handling in run command

## Requirement
Add capability to the run command to handle spec/plan files by performing bootstrap and optional execution flow.

## Acceptance Criteria
- [ ] Run command detects spec files and calls bootstrap logic
- [ ] Bootstrap creates decomposition issue (#1) from spec file
- [ ] After bootstrap, automatically executes the decomposition issue
- [ ] `--all` flag continues with all created issues after decomposition
- [ ] `--dry-run` flag previews actions without execution
- [ ] Progress messages clearly indicate bootstrap + execution flow

## Technical Details
When a spec file is detected:
1. Call the existing bootstrap logic (from Agent.bootstrap())
2. Execute the created decomposition issue
3. If `--all` flag is set and decomposition succeeds, continue with executeAll()
4. Provide clear feedback about each stage of the process

The implementation should reuse existing Agent methods rather than duplicating logic.

## Dependencies
- Issue 49: Input type detection must be implemented first

## Resources
- Master Spec: `./specs/smart-run-command.md`
- Example flow in spec lines 62-76