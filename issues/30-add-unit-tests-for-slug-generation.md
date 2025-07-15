# Issue 30: Add unit tests for slug generation

## Description
Create comprehensive unit tests for the `generateFileSlug` method and related functionality to ensure correct slug generation across various input scenarios. This will validate that all edge cases are handled properly and the method produces consistent, predictable results.

## Requirements
Create comprehensive unit tests for the `generateFileSlug` method and related functionality to ensure correct slug generation across various input scenarios.

## Acceptance Criteria
- [ ] Test normal slug generation cases
- [ ] Test edge cases (special characters, spaces, dots, hyphens)
- [ ] Test empty and null inputs
- [ ] Test very long titles
- [ ] Test Unicode and international characters
- [ ] Achieve 100% code coverage for generateFileSlug
- [ ] All tests pass reliably

## Technical Details
Tests should cover:
- Basic title to slug conversion
- Multiple spaces and special characters
- Leading/trailing spaces and hyphens
- Multiple dots and hyphens
- Empty strings and edge cases
- Filename consistency between issues and plans

## Resources
- Test file location: `test/utils/file-manager.test.ts`
- Method to test: `FileManager.generateFileSlug`
- Testing framework: Vitest

## Test Examples
```typescript
expect(fileManager.generateFileSlug('Implement User Authentication'))
  .toBe('implement-user-authentication');

expect(fileManager.generateFileSlug('Fix Bug Issue 26'))
  .toBe('fix-bug-26');

expect(fileManager.generateFileSlug('Multiple...Dots'))
  .toBe('multiple-dots');
```
