# Issue 26: Centralize slug generation in FileManager

## Requirement
Create a centralized `generateFileSlug` method in FileManager to handle consistent filename slug generation across the codebase.

## Acceptance Criteria
- [ ] Add private `generateFileSlug` method to FileManager class
- [ ] Method converts titles to URL-friendly slugs
- [ ] Handles edge cases (special characters, multiple spaces, dots, hyphens)
- [ ] Returns consistent, predictable slugs
- [ ] Method is fully documented with JSDoc
- [ ] All slug transformations are applied in correct order

## Technical Details
The method should implement the following transformations:
1. Convert to lowercase
2. Replace spaces with hyphens
3. Remove special characters (except dots and hyphens)
4. Replace multiple dots with single hyphen
5. Replace multiple hyphens with single hyphen
6. Remove leading/trailing hyphens

## Resources
- Current slug logic: `src/core/autonomous-agent.ts:867`
- Target location: `src/utils/file-manager.ts`

## Example
Input: "Implement User Authentication"
Output: "implement-user-authentication"

Input: "Fix Bug #123"
Output: "fix-bug-123"