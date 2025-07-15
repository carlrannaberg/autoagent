# Issue 35: Refactor createIssue to Support Optional Custom Content

## Description
Enhance the createIssue method to accept optional custom content, allowing bootstrap to use createIssue directly instead of duplicating issue creation logic. This eliminates code duplication and ensures consistent issue creation behavior.

## Requirements
Enhance the createIssue method to accept optional custom content, allowing bootstrap to use createIssue directly instead of duplicating issue creation logic.

## Acceptance Criteria
- [ ] Add optional customContent parameter to createIssue method
- [ ] When customContent is provided, use it instead of generating content
- [ ] Fix issue number in custom content to match assigned number
- [ ] Bootstrap can use createIssue with pre-generated content
- [ ] Return the assigned issue number for plan creation

## Technical Details
This refactoring allows bootstrap to leverage the existing createIssue method, which already handles TODO updates correctly. The approach:
1. Add optional customContent parameter to createIssue signature
2. When provided, use custom content with corrected issue number
3. When not provided, use existing content generation logic
4. Bootstrap calls createIssue with its pre-generated content

## Benefits
- Eliminates code duplication between bootstrap and createIssue
- Ensures consistent issue creation behavior
- Automatically fixes the TODO preservation issue
- Simplifies maintenance

## Resources
- Current createIssue method in autonomous-agent.ts
- Bootstrap method that needs to use createIssue
- Master Plan: `specs/fix-bootstrap-todo-overwrite.md`
