# Issue 90: Integrate hooks into AutonomousAgent

## Description
Integrate the hooks system into the AutonomousAgent class, adding hook execution at all lifecycle points.

## Requirements
- Update AutonomousAgent constructor to initialize HookManager and SessionManager
- Add hook execution at PreExecutionStart, PostExecutionStart, PreExecutionEnd, and PostExecutionEnd
- Generate unique session IDs with timestamp and random suffix
- Track session state throughout execution
- Handle blocking hooks appropriately

## Acceptance Criteria
- [ ] HookManager initialized in constructor with config
- [ ] SessionManager initialized and session created
- [ ] Session ID generated with proper format
- [ ] Hook points added to executeIssue method
- [ ] Blocking Pre hooks prevent execution
- [ ] Session updated at key points
- [ ] Proper error handling for hook failures
- [ ] Event emissions still work correctly
- [ ] Tests updated for hook integration

## Technical Details
Integration points:
- Constructor: Initialize managers and create session
- executeIssue start: PreExecutionStart and PostExecutionStart hooks
- executeIssue end: PreExecutionEnd and PostExecutionEnd hooks
- Error handling: Update session on failures
- Session tracking: Update current issue and status