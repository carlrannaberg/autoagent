# Issue 34: Fix Bootstrap TODO Overwrite

## Description
Fix the bootstrap command to append new issues to existing TODO.md content instead of overwriting the entire file. This prevents data loss of existing pending issues when running bootstrap on active projects.

## Requirements
Fix the bootstrap command to append new issues to existing TODO.md content instead of overwriting the entire file, preventing data loss of existing pending issues.

## Success Criteria
- [ ] Bootstrap preserves existing pending issues in TODO.md
- [ ] Bootstrap preserves completed issues section
- [ ] Bootstrap appends new issue to pending section (not overwrites)
- [ ] Bootstrap creates initial TODO structure only if file is empty/missing
- [ ] Bootstrap maintains same format as createIssue
- [ ] No data loss when running bootstrap on active projects

## Technical Details
The current bootstrap implementation (lines 868-878 in autonomous-agent.ts) creates a completely new TODO template and overwrites the existing file. This needs to be replaced with logic that:
1. Uses the shared addIssueToTodo method (from Issue #33)
2. Reads existing TODO content
3. Appends the new bootstrap issue
4. Preserves all existing content

## Dependencies
- **Issue 33**: Extract Common TODO Update Logic (must be completed first)

## Resources
- Problematic code: `src/core/autonomous-agent.ts` lines 868-878
- Master Plan: `specs/fix-bootstrap-todo-overwrite.md`
