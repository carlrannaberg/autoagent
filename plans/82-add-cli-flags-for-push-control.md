# Plan for Issue 82: Add CLI Flags for Push Control

## Phase 1: Update RunOptions Interface
- [ ] Locate RunOptions interface in src/cli/commands/run.ts
- [ ] Add push?: boolean field for --push flag
- [ ] Add noPush?: boolean field for --no-push flag
- [ ] Ensure interface remains properly typed

## Phase 2: Add Command Options
- [ ] Add .option('--push', 'Enable auto-push for this run (implies --commit)')
- [ ] Add .option('--no-push', 'Disable auto-push for this run')
- [ ] Place options logically with other git-related flags
- [ ] Ensure option descriptions are clear and concise

## Phase 3: Handle Flag Logic
- [ ] Check for conflicting --push and --no-push flags
- [ ] Show warning if both flags are provided
- [ ] Default to --no-push if conflict exists
- [ ] Set autoPush variable based on flag values
- [ ] Make --push automatically set autoCommit = true

## Phase 4: Resolve Configuration Priority
- [ ] Implement configuration resolution logic
- [ ] CLI flags override all other settings
- [ ] Handle undefined vs false values correctly
- [ ] Maintain existing autoCommit resolution logic

## Phase 5: Pass to AutonomousAgent
- [ ] Add autoPush to AutonomousAgent constructor call
- [ ] Ensure proper typing for the parameter
- [ ] Maintain backward compatibility
- [ ] Test that setting is properly passed through

## Phase 6: Update Help and Documentation
- [ ] Verify help text appears correctly
- [ ] Add usage examples in description if needed
- [ ] Ensure consistency with other flag descriptions
- [ ] Test help output formatting

## Technical Approach
- Follow existing patterns from --commit/--no-commit
- Use consistent naming conventions
- Maintain clear configuration precedence
- Handle edge cases gracefully

## Potential Challenges
- Managing configuration precedence correctly
- Handling the --push implies --commit logic
- Providing clear user feedback
- Maintaining consistency with existing flags