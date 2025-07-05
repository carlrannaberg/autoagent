# Issue 65: Enhance git utilities with comprehensive validation

## Requirement
Enhance the git utility module with a comprehensive validation function that provides detailed validation results with errors and suggestions.

## Acceptance Criteria
- [ ] Add GitValidationResult interface with isValid, errors, and suggestions fields
- [ ] Add validateGitEnvironment() function that performs comprehensive checks
- [ ] Function should check git availability
- [ ] Function should check repository status
- [ ] Function should check user configuration
- [ ] Function should return structured results with specific errors and suggestions
- [ ] Export new types and functions for use by other modules

## Technical Details
The enhancement should:
1. Create a structured result type for validation
2. Provide detailed error messages for each check
3. Include actionable suggestions for fixing issues
4. Be reusable across the codebase
5. Follow existing patterns in git.ts

## References
- Master Plan: `./specs/git-repository-check-for-autocommit.md`
- Related Files: `src/utils/git.ts`