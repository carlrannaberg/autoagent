# Plan for Issue 27: Update createPlan for consistent filenames

## Implementation Plan

### Phase 1: Method Signature Update
- [ ] Change createPlan method signature to make issueTitle optional
- [ ] Update TypeScript types accordingly
- [ ] Ensure backward compatibility

### Phase 2: Implementation
- [ ] Add conditional logic for filename generation
- [ ] Use generateFileSlug when issueTitle is provided
- [ ] Maintain fallback to numeric naming
- [ ] Update file creation logic

### Phase 3: Testing
- [ ] Test with issueTitle provided
- [ ] Test without issueTitle (backward compatibility)
- [ ] Test filename consistency with issues

## Technical Approach

### Updated Method
```typescript
async createPlan(issueNumber: number, plan: Plan, issueTitle?: string): Promise<string> {
  const filename = issueTitle 
    ? `${issueNumber}-${this.generateFileSlug(issueTitle)}-plan.md`
    : `${issueNumber}-plan.md`;
  // ... rest of implementation
}
```

## Potential Challenges
- Ensuring all callers are compatible with new signature
- Testing backward compatibility thoroughly
- Handling edge cases in title formatting

## Dependencies
- Issue 26: generateFileSlug method must be implemented first