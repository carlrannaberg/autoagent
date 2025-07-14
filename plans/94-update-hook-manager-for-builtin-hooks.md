# Plan for Issue #94: Update HookManager for built-in hooks

This document outlines the step-by-step plan to complete `issues/94-update-hook-manager-for-builtin-hooks.md`.

## Overview
Extend HookManager to support both command and built-in hook types.

## Implementation Steps

### Type Detection
- [ ] Update executeHooks to check hook type
- [ ] Route command hooks to runCommand
- [ ] Route built-in hooks to executeBuiltinHook
- [ ] Maintain sequential execution order

### Built-in Hook Execution
- [ ] Create executeBuiltinHook method
- [ ] Import built-in hook classes dynamically
- [ ] Instantiate hook handlers
- [ ] Pass hook data and configuration
- [ ] Handle HookResult consistently

### Configuration Handling
- [ ] Extract type-specific config fields
- [ ] Pass config to built-in handlers
- [ ] Validate configuration
- [ ] Handle missing handlers

### Testing
- [ ] Update hook-manager tests
- [ ] Test mixed hook types
- [ ] Test configuration passing
- [ ] Test error handling

## Potential Challenges
- Dynamic imports in TypeScript
- Type safety for configuration
- Consistent error handling

## Additional Context Files
- src/hooks/git-commit-hook.ts
- src/hooks/git-push-hook.ts
- src/types/hooks.ts