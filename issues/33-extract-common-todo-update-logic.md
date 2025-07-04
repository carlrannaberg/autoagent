# Issue 33: Extract Common TODO Update Logic

## Requirement
Extract the TODO update logic from createIssue into a shared method that can be used by both createIssue and bootstrap to ensure consistent behavior when updating TODO.md.

## Acceptance Criteria
- [ ] Create a new private method `addIssueToTodo` in AutonomousAgent
- [ ] Method handles adding issues to existing TODO content
- [ ] Method creates initial TODO structure if file is empty/missing
- [ ] Method handles edge cases (malformed files, missing sections)
- [ ] Both createIssue and bootstrap use this shared method
- [ ] No duplication of TODO update logic

## Technical Details
The current createIssue method correctly appends to TODO.md by reading existing content and replacing the "## Pending Issues" line. This logic should be extracted into a reusable method that both createIssue and bootstrap can use.

The method should:
1. Read existing TODO content
2. Generate the issue filename using consistent slug generation
3. Create the issue entry line
4. Handle various TODO states (empty, missing sections, etc.)
5. Update the TODO content appropriately

## Resources
- Current createIssue implementation: `src/core/autonomous-agent.ts` lines 718-723
- Master Plan: `specs/fix-bootstrap-todo-overwrite.md`