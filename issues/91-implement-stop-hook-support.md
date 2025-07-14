# Issue 91: Implement Stop hook support

## Description
Add support for the Stop hook that runs when AutoAgent is about to terminate, allowing validation of incomplete work.

## Requirements
- Add Stop hook point to HookPoint type
- Implement Stop hook execution in run command
- Handle blocking behavior for Stop hooks
- Provide session summary data to Stop hooks
- Display hook output before termination

## Acceptance Criteria
- [ ] Stop hook point added to type definitions
- [ ] Stop hook executed before process termination
- [ ] Blocking Stop hooks prevent exit with clear messaging
- [ ] Session data provided including incomplete issues
- [ ] Stdout from Stop hooks displayed to user
- [ ] Graceful handling of Stop hook failures
- [ ] Tests for Stop hook behavior

## Technical Details
The Stop hook should:
- Run after all issue processing completes
- Receive session summary with completed/failed issues
- Block termination if exit code is 0 with blocking decision
- Allow users to check for incomplete TODOs or other criteria
- Work with both normal completion and interruption