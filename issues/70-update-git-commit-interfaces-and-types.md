# Issue 70: Update git commit interfaces and types

## Requirement
Update the TypeScript interfaces and types to support the `--no-verify` flag configuration for git commits.

## Acceptance Criteria
- [ ] Update `CommitOptions` interface in `src/utils/git.ts` to include `noVerify?: boolean` field
- [ ] Update `UserConfig` interface in `src/types/index.ts` to include `gitCommitNoVerify: boolean` field  
- [ ] Update `AgentConfig` interface in `src/types/index.ts` to include `noVerify?: boolean` field
- [ ] All interfaces are properly documented with JSDoc comments
- [ ] Type exports are correctly maintained
- [ ] No breaking changes to existing interface consumers

## Technical Details
This issue focuses on updating the type definitions and interfaces to support configuring the git `--no-verify` flag behavior. These interfaces will be used by other components in subsequent issues.

### Key Changes:
1. **CommitOptions interface** - Add optional `noVerify` field to control git hook execution
2. **UserConfig interface** - Add `gitCommitNoVerify` field for persistent configuration
3. **AgentConfig interface** - Add `noVerify` field for runtime override

## Dependencies
None - this is the foundational change for git no-verify support.

## Testing Requirements
- Unit tests verify interface compatibility
- Type checking passes without errors
- No regression in existing functionality

## Resources
- Master Plan: `./specs/git-commit-no-verify-configuration.md`