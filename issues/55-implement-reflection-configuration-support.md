# Issue 55: Implement reflection configuration support

## Description
Add reflection configuration support to the existing AgentConfig interface and implement configuration loading/validation logic. This allows users to customize reflection behavior.

## Requirements
Add reflection configuration support to the existing AgentConfig interface and implement configuration loading/validation logic.

## Success Criteria
- [ ] Extend `AgentConfig` interface to include optional `reflection` property
- [ ] Add default reflection configuration values
- [ ] Implement configuration validation logic
- [ ] Update configuration loading to handle reflection settings
- [ ] Ensure backward compatibility with existing configurations
- [ ] Add configuration merging for CLI overrides

## Technical Details
- Modify `src/types/index.ts` to update `AgentConfig`
- Create default configuration constants
- Implement validation in configuration loader
- Handle both file-based and CLI-based configuration

## Dependencies
- Issue 54: Create reflection engine core types and interfaces

## Resources
- Master Plan: `./specs/reflective-improvement-loop.md` (lines 143-149)
