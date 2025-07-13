# Issue 40: Create embedded template module

## Description
Create a new TypeScript module that contains the default issue and plan templates as embedded string constants. This eliminates the need for external template files by packaging templates directly with autoagent.

## Requirements
Create a new TypeScript module that contains the default issue and plan templates as embedded string constants. These templates will be packaged with autoagent to eliminate the need for external template files.

## Success Criteria
- [ ] Create `src/templates/default-templates.ts` module
- [ ] Define `DEFAULT_ISSUE_TEMPLATE` as a string constant containing the issue template
- [ ] Define `DEFAULT_PLAN_TEMPLATE` as a string constant containing the plan template
- [ ] Templates match the existing format from the specification
- [ ] Module exports both constants with proper TypeScript types
- [ ] Templates include all required placeholder markers ([NUMBER], [TITLE], etc.)
- [ ] Code follows project TypeScript/ESLint standards

## Technical Details
- Use TypeScript template literals for multi-line strings
- Templates should be ~2KB each as specified
- Export constants should have explicit string type annotations
- Include comprehensive JSDoc comments for each template

## Resources
- Master Plan: `specs/embed-bootstrap-templates.md` (lines 64-159)
- Existing templates: `templates/issue.md` and `templates/plan.md` (if they exist)

## Notes
This is the foundation for eliminating external template dependencies. The templates will be used by the bootstrap command in subsequent issues.
