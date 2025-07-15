# Issue 53: Update documentation for smart run command

## Description
Update all documentation to reflect the new smart run command functionality and remove references to the deprecated bootstrap command. This ensures users understand the simplified workflow.

## Requirements
Update all documentation to reflect the new smart run command functionality and remove references to the deprecated bootstrap command.

## Acceptance Criteria
- [ ] README.md updated with new run command examples
- [ ] README shows spec file terminology and usage
- [ ] CLI help text updated for run command
- [ ] All bootstrap command references removed
- [ ] Migration guide added for existing users
- [ ] File type descriptions (spec/plan/issue) documented
- [ ] Example workflows updated

## Technical Details
Documentation updates needed:
1. **README.md** - Primary user documentation
2. **CLI help** - Built-in command help text
3. **Comments** - Any code comments mentioning bootstrap
4. **Examples** - Update example workflows

Key messaging:
- Emphasize unified "run" interface
- Show spec → implementation workflow
- Explain file type differences
- Provide migration path from bootstrap

## Dependencies
- Issues 49-52: Implementation and tests must be complete

## Resources
- Documentation examples in spec lines 223-288
- Current README.md for structure/style
