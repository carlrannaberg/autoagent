# Issue 32: Update documentation for filename conventions

## Description
Update project documentation to reflect the new consistent filename conventions for issues and plans created by the bootstrap command. This ensures users understand how files are named and can predict file paths.

## Requirements
Update project documentation to reflect the new consistent filename conventions for issues and plans created by the bootstrap command.

## Acceptance Criteria
- [ ] Update README.md with filename convention details
- [ ] Add JSDoc comments to generateFileSlug method
- [ ] Update CLI help text if needed
- [ ] Document the naming pattern clearly
- [ ] Provide examples of issue/plan filename pairs
- [ ] Update CHANGELOG.md with the improvement

## Technical Details
Documentation should explain:
- Issue files: `{number}-{title-slug}.md`
- Plan files: `{number}-{title-slug}-plan.md`
- How slugs are generated from titles
- Examples of the transformation

## Resources
- Files to update:
  - `README.md`
  - `CHANGELOG.md`
  - `src/utils/file-manager.ts` (JSDoc)
  - CLI help text if applicable

## Example Documentation
```markdown
## File Naming Conventions

AutoAgent creates consistent filename patterns for issues and plans:

- **Issue files**: `{number}-{title-slug}.md`
- **Plan files**: `{number}-{title-slug}-plan.md`

### Examples
- Issue: `1-implement-user-authentication.md`
- Plan: `1-implement-user-authentication-plan.md`
```
