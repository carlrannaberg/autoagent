# Issue 7: Implement autonomous agent with failover logic

## Requirement
Create the main AutonomousAgent class that orchestrates issue execution with automatic provider failover, progress tracking, and comprehensive error handling.

## Acceptance Criteria
- [ ] AutonomousAgent class implements all core functionality
- [ ] Single issue execution works with executeIssue method
- [ ] Batch execution works with executeAll method
- [ ] Provider failover automatically switches on rate limits
- [ ] Progress callbacks report status accurately
- [ ] Dry-run mode previews without making changes
- [ ] Cancellation support via AbortSignal works
- [ ] Git integration for auto-commits functions properly
- [ ] Provider instruction files are updated after execution

## Technical Details
- Integrate with FileManager, ConfigManager, and Providers
- Implement retry logic with exponential backoff
- Support progress tracking with percentage updates
- Handle SIGINT for graceful cancellation
- Use EventEmitter pattern for internal events

## Resources
- Master Plan: `master-plan.md` (Step 8)
- All previously implemented components
- Node.js EventEmitter documentation
- Git command-line integration patterns