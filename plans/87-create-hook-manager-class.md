# Plan for Issue #87: Create HookManager class

This document outlines the step-by-step plan to complete `issues/87-create-hook-manager-class.md`.

## Overview
Implement the core HookManager class that orchestrates hook execution throughout the AutoAgent lifecycle.

## Implementation Steps

### Core Implementation
- [ ] Create `src/core/hook-manager.ts` file
- [ ] Define HookManager class with constructor
- [ ] Implement executeHooks method with sequential execution
- [ ] Add interpolateCommand method for template variables
- [ ] Implement runCommand method with timeout support
- [ ] Add JSON stdin communication
- [ ] Handle blocking vs non-blocking logic

### Error Handling
- [ ] Implement timeout enforcement
- [ ] Handle process termination
- [ ] Parse and handle exit codes
- [ ] Display stdout/stderr appropriately

### Testing
- [ ] Create `test/core/hook-manager.test.ts`
- [ ] Test sequential execution
- [ ] Test timeout handling
- [ ] Test template interpolation
- [ ] Test blocking behavior
- [ ] Test JSON input/output

## Potential Challenges
- Cross-platform command execution
- Proper process cleanup on timeout
- Template interpolation edge cases

## Additional Context Files
- src/types/hooks.ts (for type definitions)
- src/utils/exec.ts (for command execution utilities)