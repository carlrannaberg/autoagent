# Plan for Issue 53: Update documentation for smart run command

This document outlines the step-by-step plan to complete `issues/53-update-documentation-for-smart-run-command.md`.

## Implementation Plan

### Phase 1: Update README.md
- [ ] Add file types section explaining spec/plan/issue files
- [ ] Update run command section with new capabilities
- [ ] Add examples of running spec files
- [ ] Include migration notes from bootstrap
- [ ] Update quick start guide if needed

### Phase 2: Update CLI Help Text
- [ ] Update run command description
- [ ] Document new [target] argument
- [ ] Add examples to help text
- [ ] Ensure options are clearly explained
- [ ] Remove any bootstrap mentions

### Phase 3: Clean Up Code Comments
- [ ] Search for bootstrap mentions in comments
- [ ] Update or remove outdated comments
- [ ] Add comments explaining smart detection
- [ ] Document the unified execution flow

### Phase 4: Update Example Workflows
- [ ] Create examples for common scenarios
- [ ] Show spec → implementation workflow
- [ ] Document --all flag usage
- [ ] Include CI/CD integration examples
- [ ] Add troubleshooting section

## Technical Approach
- Follow existing documentation style
- Use clear, concise examples
- Focus on user workflows, not implementation
- Ensure consistency across all documentation

## Documentation Strategy
- Lead with the new unified approach
- Explain benefits of smart run command
- Provide clear migration path
- Use real-world examples

## Potential Challenges
- Ensuring all bootstrap references are found
- Making migration path clear but not confusing
- Balancing detail with readability
- Keeping examples up-to-date

## Additional Notes
Good documentation is crucial for user adoption. Focus on making the new workflow feel natural and intuitive. The goal is to make users think "of course it should work this way!"