# Plan for Issue #26: Centralize slug generation in FileManager

## Overview

This plan implements a centralized slug generation method in the FileManager class to ensure consistent filename generation across the application. This centralization will eliminate duplicate slug generation logic and ensure all files follow the same naming conventions.

## Implementation Steps

### Phase 1: Core Implementation
- [ ] Add generateFileSlug method to FileManager class
- [ ] Implement slug transformation logic
- [ ] Add comprehensive JSDoc documentation

### Phase 2: Testing
- [ ] Write unit tests for common cases
- [ ] Write unit tests for edge cases
- [ ] Verify all transformations work correctly

## Technical Approach

### Method Implementation
```typescript
private generateFileSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '')
    .replace(/\.+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

### Test Cases
- Normal titles with spaces
- Titles with special characters
- Titles with multiple dots/hyphens
- Empty strings
- Leading/trailing spaces

## Potential Challenges
- Ensuring correct order of transformations
- Handling Unicode characters
- Maintaining backwards compatibility

## Dependencies
None - this is a standalone utility method