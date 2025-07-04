# Issue 28: Refactor createIssue to use centralized slug

## Requirement
Refactor the `createIssue` method in FileManager to use the centralized `generateFileSlug` method instead of inline slug generation logic.

## Acceptance Criteria
- [ ] Replace inline slug generation with generateFileSlug method call
- [ ] Handle both method overloads correctly
- [ ] Maintain exact same slug generation behavior
- [ ] No changes to method signatures
- [ ] All existing tests continue to pass
- [ ] Code is cleaner and more maintainable

## Technical Details
The createIssue method has two overloads:
1. `createIssue(issue: Issue): Promise<string>`
2. `createIssue(issueNumber: number, title: string, content: string): Promise<string>`

Both should use the centralized generateFileSlug method.

## Resources
- Current implementation: `src/utils/file-manager.ts`
- Depends on: Issue 26 (generateFileSlug method)

## Benefits
- Eliminates code duplication
- Single source of truth for slug generation
- Easier to maintain and update