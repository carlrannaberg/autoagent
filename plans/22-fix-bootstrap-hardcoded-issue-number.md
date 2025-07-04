# Plan for Issue 22: Fix Bootstrap Hardcoded Issue Number

This document outlines the step-by-step plan to complete `issues/22-fix-bootstrap-hardcoded-issue-number.md`.

## Implementation Plan

### Phase 1: Code Change
- [ ] Locate the bootstrap method in `src/core/autonomous-agent.ts`
- [ ] Find line 821 with hardcoded `issueNumber = 1`
- [ ] Replace with `await this.fileManager.getNextIssueNumber()`
- [ ] Add inline comment explaining the change
- [ ] Verify the method is already async (no signature change needed)

### Phase 2: Validation
- [ ] Build the project to ensure no TypeScript errors
- [ ] Run existing tests to ensure no regression
- [ ] Manually test bootstrap in empty project
- [ ] Manually test bootstrap with existing issues

### Phase 3: Documentation
- [ ] Update method docstring if needed
- [ ] Add changelog entry
- [ ] Document the fix in code comments

## Technical Approach
This is a minimal, surgical fix that leverages existing infrastructure. The `FileManager.getNextIssueNumber()` method already provides all the functionality we need.

## Potential Challenges
- Ensuring the bootstrap method is async (it should already be)
- Verifying no side effects from the change
- Testing concurrent execution edge cases

## Success Metrics
- Bootstrap works correctly in both empty and populated projects
- No existing issues are overwritten
- All existing tests continue to pass
- The change is minimal and focused