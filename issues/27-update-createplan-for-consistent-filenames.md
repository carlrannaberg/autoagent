# Issue 27: Update createPlan for consistent filenames

## Requirement
Modify the `createPlan` method in FileManager to optionally use title-based naming for plan files, ensuring consistency with issue filenames.

## Acceptance Criteria
- [ ] Update createPlan method signature to make issueTitle optional
- [ ] Implement conditional filename generation based on issueTitle presence
- [ ] Use generateFileSlug method for title-based naming
- [ ] Maintain backward compatibility (fallback to numeric naming)
- [ ] Plan files match issue files with "-plan" suffix
- [ ] No breaking changes to existing functionality

## Technical Details
Current implementation always uses `{number}-plan.md`. New implementation should:
- When issueTitle provided: `{number}-{slug}-plan.md`
- When issueTitle not provided: `{number}-plan.md` (backward compatibility)

## Resources
- Current implementation: `src/utils/file-manager.ts:159`
- Depends on: Issue 26 (generateFileSlug method)

## Example
Issue: `1-implement-user-authentication.md`
Plan: `1-implement-user-authentication-plan.md`