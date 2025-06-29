# Issue 11: Add provider learning system

## Requirement
Implement the system that automatically creates and updates CLAUDE.md and GEMINI.md files with execution history, project context, and provider-specific learnings.

## Acceptance Criteria
- [ ] CLAUDE.md is created/updated after Claude executions
- [ ] GEMINI.md is created/updated after Gemini executions
- [ ] Execution history is tracked with timestamps
- [ ] Success/failure rates are calculated
- [ ] Project context is analyzed and documented
- [ ] Common patterns are identified
- [ ] File format is consistent and useful
- [ ] Updates append to existing content appropriately

## Technical Details
- Track execution results per provider
- Analyze file changes and patterns
- Calculate success metrics
- Format Markdown files clearly
- Include helpful context for future runs

## Resources
- Master Plan: Provider learning specifications
- FileManager for file operations
- Markdown formatting guidelines
- Execution history tracking patterns