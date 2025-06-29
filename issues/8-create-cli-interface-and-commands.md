# Issue 8: Create CLI interface and commands

## Requirement
Implement the command-line interface using Commander.js with all specified commands including run, create, status, config, and bootstrap functionality.

## Acceptance Criteria
- [ ] CLI entry point (bin/autoagent) is created
- [ ] Main CLI file (src/cli/index.ts) implements all commands
- [ ] 'run' command executes issues with all options
- [ ] 'create' command generates new issues
- [ ] 'status' command shows current state
- [ ] 'config' command manages settings
- [ ] 'bootstrap' command decomposes master plans
- [ ] '--version' flag shows package version
- [ ] Help text is clear and comprehensive

## Technical Details
- Use Commander.js for CLI framework
- Support all flags from master plan
- Handle errors gracefully with proper exit codes
- Use chalk for colored output
- Make CLI executable with proper shebang

## Resources
- Master Plan: `master-plan.md` (Step 9)
- Commander.js documentation
- Chalk documentation for colors
- Node.js process and exit code handling