# Issue 78: Create Git Push Utility Functions and Types

## Title
Create Git Push Utility Functions and Types

## Description
Implement the foundational git push utilities needed for the auto-push feature, including functions to check remotes, get current branch, check upstream tracking, and push to remote repositories.

## Requirements
- Create comprehensive git push utility functions to support the auto-push feature
- Implement type-safe interfaces for push operations and results
- Ensure proper error handling and validation for all git operations

## Tasks
- [ ] Add PushOptions and GitPushResult interfaces to src/utils/git.ts
- [ ] Implement checkGitRemote() function to verify remote accessibility
- [ ] Implement getCurrentBranch() function to get current branch name
- [ ] Implement hasUpstreamBranch() function to check upstream tracking
- [ ] Implement pushToRemote() function for push operations
- [ ] Implement validateRemoteForPush() function for comprehensive validation
- [ ] Add proper error handling and helpful error messages
- [ ] Export all new functions and interfaces

## Acceptance Criteria
- [ ] All utility functions are implemented with proper TypeScript types
- [ ] Functions handle errors gracefully and return appropriate results
- [ ] Remote validation provides clear error messages and suggestions
- [ ] Push operation supports upstream setting when needed
- [ ] All functions are properly exported for use in other modules

## Additional Context
These utilities form the foundation for the auto-push feature. They should:
- Use the existing execAsync function for git commands
- Provide clear, actionable error messages
- Support both scenarios where upstream exists and doesn't exist
- Be designed for easy testing with mockable dependencies

## Related Issues
- Part of git auto-push configuration feature implementation
