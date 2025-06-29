# Issue 9: Add utility functions for logging and retry

## Requirement
Create utility modules for colored console output logging and retry logic with exponential backoff for handling rate limits and transient failures.

## Acceptance Criteria
- [ ] Logger utility provides colored output methods
- [ ] Different log levels are supported (info, success, error, warning)
- [ ] Retry utility implements exponential backoff
- [ ] Retry logic handles rate limit responses
- [ ] Maximum retry attempts are configurable
- [ ] Both utilities are properly exported
- [ ] Error messages are user-friendly

## Technical Details
- Use chalk for colored console output
- Implement exponential backoff algorithm
- Support async function retries
- Handle specific error types for rate limits
- Provide clean, formatted output

## Resources
- Master Plan: `master-plan.md` (Step 10)
- Chalk color documentation
- Exponential backoff best practices
- Rate limit error patterns