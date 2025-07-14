# Plan for Issue #97: Update config commands for hooks

This document outlines the step-by-step plan to complete `issues/97-update-config-commands-for-hooks.md`.

## Overview
Migrate config commands to use hooks system while maintaining compatibility.

## Implementation Steps

### set-auto-commit Updates
- [ ] Rewrite setAutoCommit function
- [ ] Add logic to manipulate hooks array
- [ ] Create default git-commit hook config
- [ ] Handle hook addition/removal
- [ ] Preserve existing hooks

### set-auto-push Updates  
- [ ] Rewrite setAutoPush function
- [ ] Add logic for git-push hooks
- [ ] Create default git-push hook config
- [ ] Handle hook addition/removal
- [ ] Maintain hook order

### Command Interface
- [ ] Update command descriptions
- [ ] Maintain same CLI interface
- [ ] Add helpful output messages
- [ ] Update help text

### Testing
- [ ] Update config command tests
- [ ] Test hook addition
- [ ] Test hook removal
- [ ] Test with existing hooks

## Potential Challenges
- Avoiding hook duplication
- Preserving hook order
- Handling edge cases

## Additional Context Files
- src/cli/commands/config.ts
- src/core/config-manager.ts
- Default hook configurations from spec