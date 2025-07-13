# Plan for Issue #34: Fix Bootstrap TODO Overwrite

This document outlines the step-by-step plan to complete `issues/34-fix-bootstrap-todo-overwrite.md`.

## Overview

This plan implements the fix for the bootstrap command's TODO overwrite issue by replacing hardcoded template creation with the shared addIssueToTodo method. This ensures that existing TODO content is preserved when running bootstrap, maintaining task tracking integrity.

## Implementation Steps

### Phase 1: Prerequisites
- [ ] Ensure #33 is completed (addIssueToTodo method exists)
- [ ] Review current bootstrap implementation
- [ ] Understand the TODO overwrite problem

### Phase 2: Core Fix
- [ ] Remove the TODO template creation code (lines 868-878)
- [ ] Replace with call to addIssueToTodo method
- [ ] Ensure bootstrap uses correct issue number
- [ ] Maintain consistent issue title format

### Phase 3: Validation
- [ ] Test bootstrap with empty TODO.md
- [ ] Test bootstrap with existing pending issues
- [ ] Test bootstrap with completed issues
- [ ] Verify no data loss occurs

### Phase 4: Edge Cases
- [ ] Test with malformed TODO.md
- [ ] Test with missing TODO.md file
- [ ] Test with very large TODO.md
- [ ] Ensure graceful handling of all cases

## Technical Approach
Replace the hardcoded TODO template creation with a call to the shared addIssueToTodo method. This ensures bootstrap behaves consistently with createIssue and preserves existing content.

## Potential Challenges
- Ensuring the fix doesn't break empty project bootstrap
- Maintaining backward compatibility
- Handling various TODO.md formats

## Testing Strategy
- Manual testing with various TODO states
- Automated tests will be added in #36
- Regression testing for empty projects