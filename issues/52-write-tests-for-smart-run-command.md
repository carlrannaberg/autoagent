# Issue 52: Write tests for smart run command

## Requirement
Create comprehensive test coverage for the enhanced run command functionality, including input detection, spec file handling, and backward compatibility.

## Acceptance Criteria
- [ ] Unit tests for isPlanFile(), isIssueNumber(), isIssueFile() functions
- [ ] Integration tests for spec file execution flow
- [ ] Tests for --all flag with spec files
- [ ] Tests for backward compatibility (issue numbers/names)
- [ ] Error handling tests (invalid files, missing specs)
- [ ] E2E tests for complete workflows
- [ ] All tests pass with good coverage

## Technical Details
Test categories needed:
1. **Unit tests** - Input detection functions
2. **Integration tests** - Command routing and execution flows
3. **E2E tests** - Full workflows from spec to completion
4. **Error tests** - Invalid inputs and failure scenarios

Tests should cover:
- Spec file → bootstrap → execute flow
- Spec file with --all flag
- Traditional issue number/name execution
- No input (execute next)
- Edge cases and error conditions

## Dependencies
- Issues 49-51: Smart run implementation must be complete

## Resources
- Test examples in spec lines 172-203
- Existing test patterns in `test/` directory