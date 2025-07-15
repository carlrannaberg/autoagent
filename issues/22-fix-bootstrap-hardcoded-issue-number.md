# Issue 22: Fix Bootstrap Hardcoded Issue Number

## Description
This issue addresses a bug in the bootstrap command where issue number 1 is hardcoded, potentially overwriting existing issues. The fix involves using the FileManager's dynamic issue numbering capability.

## Requirements
Fix the bootstrap command to use dynamic issue numbering instead of hardcoded issue number 1.

## Acceptance Criteria
- [ ] Replace hardcoded `issueNumber = 1` with `await this.fileManager.getNextIssueNumber()`
- [ ] Bootstrap creates issue 1 in empty projects
- [ ] Bootstrap creates next sequential issue in projects with existing issues
- [ ] No existing issues are overwritten
- [ ] Code change is minimal and focused
- [ ] Inline documentation explains the change

## Technical Details
The fix involves changing line 821 in `src/core/autonomous-agent.ts` from:
```typescript
const issueNumber = 1;  // Hardcoded
```
to:
```typescript
const issueNumber = await this.fileManager.getNextIssueNumber();
```

This leverages the existing `FileManager.getNextIssueNumber()` method which already handles:
- Directory scanning for existing issues
- Number extraction from filenames
- Maximum number calculation
- Fallback to 1 for empty directories

## Resources
- Master Specification: `specs/fix-bootstrap-issue-numbering.md`
- Related Issue: Issue 19 (decomposition task)
