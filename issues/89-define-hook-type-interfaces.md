# Issue 89: Define hook type interfaces

## Description
Create TypeScript interfaces and types for the hooks system, including hook configuration, data structures, and session types.

## Requirements
- Create `src/types/hooks.ts` with all hook-related types
- Create `src/types/session.ts` with session interface
- Define HookPoint type for lifecycle events
- Define Hook interface with type-specific configurations
- Define HookData and HookResult interfaces

## Acceptance Criteria
- [ ] HookPoint type includes all lifecycle events (PreExecutionStart, PostExecutionStart, etc.)
- [ ] Hook interface supports command, git-commit, and git-push types
- [ ] Hook interface includes timeout and blocking configuration
- [ ] HookData interface defined with required and optional fields
- [ ] HookResult interface includes blocked status and output
- [ ] Session interface includes all tracking fields
- [ ] Type exports properly configured
- [ ] JSDoc comments for all interfaces

## Technical Details
Key types to define:
- HookPoint: Union type of all hook event names
- HookConfig: Mapping of HookPoint to Hook arrays
- Hook: Interface with type discriminator and type-specific fields
- HookData: Event data passed to hooks
- HookResult: Response from hook execution
- Session: Complete session tracking information