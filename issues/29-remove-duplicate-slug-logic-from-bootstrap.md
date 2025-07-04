# Issue 29: Remove duplicate slug logic from bootstrap

## Requirement
Remove the duplicate filename slug generation logic from the bootstrap method in AutonomousAgent, relying instead on FileManager's consistent implementation.

## Acceptance Criteria
- [ ] Remove inline slug generation from bootstrap method
- [ ] FileManager handles all filename generation
- [ ] Bootstrap continues to work correctly
- [ ] No duplicate slug generation code remains
- [ ] Code is cleaner and more maintainable
- [ ] Issue and plan files maintain consistent naming

## Technical Details
Current bootstrap method (line 867 in `src/core/autonomous-agent.ts`) duplicates the slug generation logic. This should be removed since FileManager now handles it consistently.

## Resources
- Current implementation: `src/core/autonomous-agent.ts:867`
- Depends on: Issues 26, 27, 28 (FileManager updates)

## Benefits
- Eliminates code duplication
- Single source of truth for filename generation
- Reduces maintenance burden
- Prevents future inconsistencies