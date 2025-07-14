# Issue 87: Create HookManager class

## Description
Implement the HookManager class that handles execution of hooks at various lifecycle points.

## Requirements
- Create `src/core/hook-manager.ts` with HookManager class
- Implement hook execution logic with timeout support
- Support command interpolation for template variables
- Handle both blocking and non-blocking hooks
- Parse JSON output from hooks when provided
- Pass hook data via stdin as JSON

## Acceptance Criteria
- [ ] HookManager class created with constructor accepting config, sessionId, and workspace
- [ ] executeHooks method implements sequential hook execution
- [ ] Command interpolation supports all template variables ({{issueNumber}}, {{issueTitle}}, etc.)
- [ ] Timeout enforcement with configurable limits (default 60s)
- [ ] JSON input provided to hooks via stdin
- [ ] Exit code 2 treated as blocking for Pre hooks
- [ ] Stdout always displayed to users
- [ ] Error handling for failed hooks
- [ ] Unit tests covering all hook execution scenarios

## Technical Details
The HookManager should handle:
- Sequential execution of hooks at each hook point
- Template variable interpolation before execution
- JSON serialization of hook data for stdin
- Timeout management with process killing
- Parsing optional JSON output from hooks
- Different handling for Pre vs Post hooks (blocking behavior)