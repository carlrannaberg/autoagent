# Issue 97: Update config commands for hooks

## Description
Update the set-auto-commit and set-auto-push commands to work with the hooks system instead of boolean flags.

## Requirements
- Rewrite set-auto-commit to add/remove git-commit hooks
- Rewrite set-auto-push to add/remove git-push hooks
- Maintain backward-compatible command interface
- Update help text to explain hook behavior
- Handle existing hook configurations properly

## Acceptance Criteria
- [ ] set-auto-commit true adds git-commit hook to PostExecutionEnd
- [ ] set-auto-commit false removes git-commit hooks
- [ ] set-auto-push true adds git-push hook to PostExecutionEnd
- [ ] set-auto-push false removes git-push hooks
- [ ] Commands work with existing hook arrays
- [ ] Help text explains new behavior
- [ ] Tests updated for new implementation

## Technical Details
Implementation approach:
- Check for existing hooks array
- Add hooks without duplicating
- Remove only matching hook types
- Preserve other hooks in the array
- Use standard commit message template