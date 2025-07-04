# Plan for Issue 29: Remove duplicate slug logic from bootstrap

## Implementation Plan

### Phase 1: Analysis
- [ ] Locate duplicate slug generation in bootstrap method
- [ ] Understand current usage and dependencies
- [ ] Verify FileManager can handle all cases

### Phase 2: Implementation
- [ ] Remove inline slug generation code
- [ ] Update bootstrap to rely on FileManager
- [ ] Ensure issueTitle is passed to createPlan
- [ ] Clean up any related variables

### Phase 3: Testing
- [ ] Test bootstrap command functionality
- [ ] Verify filename consistency
- [ ] Check that no functionality is broken

## Technical Approach

### Current Code to Remove
```typescript
// Line 867 - Remove this duplicate logic
const issueFilename = `${issueNumber}-${issueTitle.toLowerCase().replace(/\s+/g, '-')...}.md`;
```

### Updated Approach
- Let FileManager.createIssue handle issue filename generation
- Pass issueTitle to FileManager.createPlan for consistent plan filenames
- Remove any unnecessary filename manipulation

## Potential Challenges
- Ensuring bootstrap still works correctly
- Verifying all edge cases are handled
- Maintaining proper error handling

## Dependencies
- Issues 26-28 must be completed first
- FileManager must support title-based plan naming