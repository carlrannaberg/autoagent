# Plan for Issue #33: Extract Common TODO Update Logic

This document outlines the step-by-step plan to complete `issues/33-extract-common-todo-update-logic.md`.

## Overview

This plan extracts common TODO update logic into a shared method to eliminate code duplication between createIssue and bootstrap methods. The refactoring will ensure consistent behavior when updating todo.md files and simplify maintenance.

## Implementation Steps

### Phase 1: Analysis and Design
- [ ] Analyze current createIssue TODO update logic
- [ ] Analyze current bootstrap TODO overwrite logic
- [ ] Design the shared addIssueToTodo method signature
- [ ] Plan edge case handling strategy

### Phase 2: Implementation
- [ ] Create addIssueToTodo private method in AutonomousAgent
- [ ] Implement core TODO update logic
- [ ] Add edge case handling (empty file, missing sections)
- [ ] Add filename generation using consistent logic

### Phase 3: Refactoring
- [ ] Update createIssue to use addIssueToTodo
- [ ] Update bootstrap to use addIssueToTodo
- [ ] Remove duplicate TODO update code
- [ ] Ensure consistent behavior between methods

### Phase 4: Testing
- [ ] Test addIssueToTodo with various TODO states
- [ ] Verify createIssue still works correctly
- [ ] Verify bootstrap now preserves existing content
- [ ] Test edge cases

## Technical Approach
Extract the TODO update pattern from createIssue (lines 718-723) into a reusable method. The method should handle:
- Reading existing TODO content
- Generating consistent filenames
- Appending new issues to the pending section
- Creating initial structure if needed

## Potential Challenges
- Handling malformed TODO files gracefully
- Ensuring backward compatibility
- Maintaining consistent formatting

## Testing Strategy
- Unit tests for the new addIssueToTodo method
- Integration tests for createIssue and bootstrap
- Edge case tests for malformed TODO files