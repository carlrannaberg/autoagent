# Plan for Issue 74: Add CLI flags for run command

This document outlines the step-by-step plan to complete `issues/74-add-cli-flags-for-run-command.md`.

## Implementation Plan

### Phase 1: Update RunOptions Interface
- [ ] Locate RunOptions interface in run command
- [ ] Add `verify?: boolean` field
- [ ] Add `noVerify?: boolean` field
- [ ] Ensure TypeScript types are correct

### Phase 2: Add Command Options
- [ ] Add `.option('--verify', 'Enable git hooks during commits')`
- [ ] Add `.option('--no-verify', 'Skip git hooks during commits')`
- [ ] Update option descriptions for clarity
- [ ] Maintain proper option ordering

### Phase 3: Implement Conflict Resolution
- [ ] Check if both flags are provided
- [ ] Log warning message if conflict exists
- [ ] Implement precedence (--no-verify wins)
- [ ] Convert to single noVerify value

### Phase 4: Pass to AutonomousAgent
- [ ] Update agent instantiation
- [ ] Pass resolved noVerify value
- [ ] Maintain existing options
- [ ] Ensure undefined when no flags

### Phase 5: Update Help Documentation
- [ ] Review generated help text
- [ ] Ensure descriptions are clear
- [ ] Add examples if needed
- [ ] Test help output

### Phase 6: Write Tests
- [ ] Test single flag scenarios
- [ ] Test conflicting flags
- [ ] Test no flags (undefined)
- [ ] Test agent receives correct value
- [ ] Test CLI integration

## Technical Approach
Commander.js patterns for option handling and conflict resolution.

## Potential Challenges
- Commander.js negation handling
- Flag conflict resolution
- Help text clarity

## Resources
- Master Plan: `./specs/git-commit-no-verify-configuration.md`
- Issue 73: Agent implementation