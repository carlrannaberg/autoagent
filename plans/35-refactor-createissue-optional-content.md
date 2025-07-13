# Plan for Issue #35: Refactor createIssue to Support Optional Custom Content

This document outlines the step-by-step plan to complete `issues/35-refactor-createissue-optional-content.md`.

## Overview

This plan refactors the createIssue method to accept optional custom content, enabling bootstrap to use the method directly instead of duplicating issue creation logic. This elegant solution maintains backward compatibility while eliminating code duplication and ensuring consistent TODO handling.

## Implementation Steps

### Phase 1: Method Signature Update
- [ ] Update createIssue method signature to add customContent parameter
- [ ] Ensure parameter is optional for backward compatibility
- [ ] Update method documentation

### Phase 2: Implementation Logic
- [ ] Add conditional logic for custom content path
- [ ] When customContent provided: use it with issue number fix
- [ ] When customContent not provided: use existing generation logic
- [ ] Ensure issue number is correctly replaced in custom content

### Phase 3: Bootstrap Integration
- [ ] Update bootstrap to use createIssue method
- [ ] Pass pre-generated issue content as customContent
- [ ] Use returned issue number for plan creation
- [ ] Remove duplicate issue creation code from bootstrap

### Phase 4: Testing and Validation
- [ ] Test createIssue with custom content
- [ ] Test createIssue without custom content (existing behavior)
- [ ] Test bootstrap using new createIssue approach
- [ ] Verify TODO preservation works correctly

## Technical Approach
This is the preferred solution from the master plan. By allowing createIssue to accept custom content, we can eliminate the duplicate issue creation logic in bootstrap while maintaining all the benefits of the existing TODO handling.

## Potential Challenges
- Ensuring the issue number replacement in custom content is robust
- Maintaining exact backward compatibility
- Handling edge cases in content format

## Testing Strategy
- Unit tests for enhanced createIssue method
- Integration tests for bootstrap workflow
- Regression tests for existing createIssue usage