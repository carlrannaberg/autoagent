# Plan for Issue #30: Add unit tests for slug generation

## Overview

This plan implements comprehensive unit tests for the centralized slug generation functionality in FileManager. The tests will ensure that filename generation is consistent, handles edge cases properly, and maintains backward compatibility.

## Implementation Steps

### Phase 1: Basic Tests
- [ ] Test simple title to slug conversion
- [ ] Test titles with spaces
- [ ] Test titles with numbers
- [ ] Test case conversion

### Phase 2: Edge Case Tests
- [ ] Test special characters removal
- [ ] Test multiple consecutive spaces
- [ ] Test multiple dots and hyphens
- [ ] Test leading/trailing spaces
- [ ] Test empty strings
- [ ] Test very long titles

### Phase 3: Integration Tests
- [ ] Test createPlan with issueTitle
- [ ] Test createPlan without issueTitle
- [ ] Test createIssue slug generation
- [ ] Test filename consistency

## Technical Approach

### Test Structure
```typescript
describe('FileManager.generateFileSlug', () => {
  // Basic cases
  // Edge cases
  // Error cases
});

describe('FileManager.createPlan filename consistency', () => {
  // With issueTitle
  // Without issueTitle
  // Backward compatibility
});
```

### Test Categories
1. **Normal Cases**: Standard titles with words and spaces
2. **Special Characters**: Symbols, punctuation, Unicode
3. **Edge Cases**: Empty, very long, unusual patterns
4. **Integration**: Full filename generation flow

## Potential Challenges
- Testing private methods (may need to make it protected for testing)
- Handling filesystem mocking for integration tests
- Ensuring comprehensive coverage

## Dependencies
- Issues 26-28 must be implemented first