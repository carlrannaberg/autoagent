# Issue 59: Add CLI options for reflection control

## Description
Add command-line interface options to control the reflection feature, allowing users to configure reflection behavior directly from the CLI.

## Requirements

Add command-line interface options to control the reflection feature, allowing users to configure reflection behavior directly from the CLI.

## Success Criteria
- [ ] Add `--reflection-iterations` flag to set max iterations
- [ ] Add `--no-reflection` flag to disable reflection
- [ ] Update CLI command parser to handle new options
- [ ] Ensure CLI options override configuration file settings
- [ ] Add validation for reflection iteration count
- [ ] Update help text with new options
- [ ] Maintain backward compatibility

## Technical Details
- Modify `src/cli/commands/run.ts`
- Use Commander.js option parsing
- Convert CLI flags to configuration
- Merge with existing configuration
- Validate numeric inputs

## Dependencies
- Issue 55: Implement reflection configuration support

## Resources
- Master Plan: `./specs/reflective-improvement-loop.md` (lines 151-155)
