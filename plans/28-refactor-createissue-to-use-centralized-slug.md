# Plan for Issue 28: Refactor createIssue to use centralized slug

## Implementation Plan

### Phase 1: Refactor First Overload
- [ ] Update createIssue(issue: Issue) to use generateFileSlug
- [ ] Replace inline slug logic with method call
- [ ] Verify behavior remains identical

### Phase 2: Refactor Second Overload
- [ ] Update createIssue(number, title, content) to use generateFileSlug
- [ ] Replace inline slug logic with method call
- [ ] Ensure proper parameter handling

### Phase 3: Testing
- [ ] Run existing unit tests
- [ ] Verify slug generation consistency
- [ ] Test both method overloads

## Technical Approach

### Updated Implementation
```typescript
async createIssue(issueOrNumber: Issue | number, title?: string, content?: string): Promise<string> {
  if (typeof issueOrNumber === 'number') {
    const filename = `${issueOrNumber}-${this.generateFileSlug(title ?? '')}.md`;
    // ... rest of implementation
  } else {
    const issue = issueOrNumber;
    const filename = `${issue.number}-${this.generateFileSlug(issue.title)}.md`;
    // ... rest of implementation
  }
}
```

## Potential Challenges
- Ensuring exact same behavior as before
- Handling edge cases in both overloads
- Maintaining type safety

## Dependencies
- Issue 26: generateFileSlug method must be implemented first