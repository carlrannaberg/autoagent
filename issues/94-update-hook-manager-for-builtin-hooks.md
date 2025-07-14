# Issue 94: Update HookManager for built-in hooks

## Description
Extend the HookManager to support built-in hook types (git-commit, git-push) in addition to command hooks.

## Requirements
- Add executeBuiltinHook method to HookManager
- Detect hook type and route to appropriate handler
- Instantiate and execute built-in hook classes
- Pass configuration from hook definition to built-in handlers
- Maintain consistent error handling and output

## Acceptance Criteria
- [ ] HookManager distinguishes between command and built-in hooks
- [ ] Built-in hooks instantiated dynamically based on type
- [ ] Configuration passed correctly to built-in handlers
- [ ] Output from built-in hooks displayed to users
- [ ] Error handling consistent with command hooks
- [ ] Sequential execution maintained
- [ ] Tests for built-in hook execution

## Technical Details
Updates needed:
- Type checking in executeHooks method
- Dynamic import/instantiation of built-in hooks
- Consistent HookResult handling
- Configuration extraction for each hook type
- Maintain backward compatibility with command hooks