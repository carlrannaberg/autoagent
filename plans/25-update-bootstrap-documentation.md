# Plan for Issue #25: Update Bootstrap Documentation

This document outlines the step-by-step plan to complete `issues/25-update-bootstrap-documentation.md`.

## Overview

This plan covers updating all relevant documentation to reflect the bootstrap command's new dynamic issue numbering behavior. The documentation updates will include code comments, user-facing documentation in README.md, changelog entries, and CLI help text to ensure users understand how bootstrap determines issue numbers.

## Implementation Steps

### Phase 1: Code Documentation
- [ ] Add inline comment at fix location explaining dynamic numbering
- [ ] Update bootstrap method JSDoc/docstring
- [ ] Ensure comments are clear and concise
- [ ] Follow project comment style guidelines

### Phase 2: User Documentation
- [ ] Update README.md bootstrap section
- [ ] Add example: bootstrap in empty project
- [ ] Add example: bootstrap with existing issues
- [ ] Clarify issue numbering behavior

### Phase 3: Release Documentation
- [ ] Add CHANGELOG.md entry under "Fixed"
- [ ] Write clear, user-focused description
- [ ] Include issue reference (#22)
- [ ] Follow changelog format conventions

### Phase 4: CLI Documentation
- [ ] Check if CLI help text needs updates
- [ ] Update command description if needed
- [ ] Ensure help text matches actual behavior
- [ ] Test help output displays correctly

## Documentation Examples

### CHANGELOG.md Entry
```markdown
### Fixed
- Fix bootstrap command to respect existing issue numbers instead of always using #1
```

### README.md Example
```markdown
## Bootstrap Command

The `bootstrap` command creates an initial issue from a master plan:

```bash
# In empty project - creates #1
autoagent bootstrap master-plan.md

# With existing issues - creates next sequential issue
autoagent bootstrap feature-plan.md  # Creates #4 if issues 1-3 exist
```
```

## Potential Challenges
- Keeping documentation concise yet clear
- Ensuring examples are accurate
- Maintaining consistency across documentation
- Following project documentation standards

## Success Metrics
- Documentation accurately reflects new behavior
- Examples are clear and helpful
- No conflicting information across docs
- Users understand bootstrap behavior