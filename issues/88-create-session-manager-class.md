# Issue 88: Create SessionManager class

## Description
Implement the SessionManager class that tracks and persists session information for AutoAgent executions.

## Requirements
- Create `src/core/session-manager.ts` with SessionManager class
- Store sessions in `~/.autoagent/sessions/` directory
- Maintain a current session symlink/file
- Support session lifecycle tracking
- List recent sessions with configurable limit

## Acceptance Criteria
- [ ] SessionManager class created with sessions directory initialization
- [ ] saveSession method persists session data as JSON
- [ ] setCurrentSession updates the current session reference
- [ ] getCurrentSession retrieves active session data
- [ ] listSessions returns recent sessions sorted by start time
- [ ] endSession updates session status and end time
- [ ] Directory structure created on first use
- [ ] Cross-platform support (handle Windows without symlinks)
- [ ] Unit tests for all session operations

## Technical Details
The SessionManager should:
- Use `~/.autoagent/sessions/` for storage
- Name session files as `session-{timestamp}-{randomId}.json`
- Maintain `current` file/symlink pointing to active session
- Handle concurrent session access safely
- Clean up old sessions based on retention policy (future enhancement)