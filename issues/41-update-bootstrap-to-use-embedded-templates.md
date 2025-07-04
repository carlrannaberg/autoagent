# Issue 41: Update bootstrap to use embedded templates

## Requirement
Modify the bootstrap method in `src/core/autonomous-agent.ts` to use the embedded template constants instead of reading template files from the filesystem. This will make bootstrap work out-of-the-box without requiring external template files.

## Acceptance Criteria
- [ ] Import template constants from the new template module
- [ ] Replace filesystem reads (lines 787-789) with template constants
- [ ] Remove dependency on template directory existence
- [ ] Maintain existing bootstrap functionality
- [ ] Handle template validation appropriately
- [ ] Update error handling for missing templates
- [ ] Bootstrap works without any template files present

## Technical Details
- Import `DEFAULT_ISSUE_TEMPLATE` and `DEFAULT_PLAN_TEMPLATE` from `../templates/default-templates`
- Remove the three lines that read from filesystem (templateDir, issueTemplate, planTemplate)
- Directly assign constants to issueTemplate and planTemplate variables
- Consider adding validation to ensure templates are not undefined/empty
- Update any error messages to reflect new embedded template approach

## Dependencies
- Depends on: Issue #40 (Create embedded template module)

## Resources
- Master Plan: `specs/embed-bootstrap-templates.md` (lines 177-189)
- Current implementation: `src/core/autonomous-agent.ts` (lines 787-789)

## Notes
This change maintains backward compatibility and requires no API changes. The bootstrap command interface remains the same.