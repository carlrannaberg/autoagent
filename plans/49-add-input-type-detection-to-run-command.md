# Plan for Issue #49: Add input type detection to run command

This document outlines the step-by-step plan to complete `issues/49-add-input-type-detection-to-run-command.md`.

## Overview

This plan adds intelligent input type detection to the run command, enabling it to automatically determine whether the input is a spec file, issue number, or issue file. This foundational change enables the smart run command functionality.

## Implementation Steps

### Phase 1: Update Run Command Interface
- [ ] Change run command parameter from `[issue]` to `[target]`
- [ ] Update command description to reflect new capabilities
- [ ] Preserve all existing options and behavior

### Phase 2: Implement Detection Functions
- [ ] Create `isPlanFile()` function to detect spec/plan files
- [ ] Create `isIssueNumber()` function to detect numeric references
- [ ] Create `isIssueFile()` function to detect issue file names
- [ ] Add proper TypeScript types for detection results

### Phase 3: Add Routing Logic
- [ ] Implement target type detection in run command action
- [ ] Route plan files to bootstrap flow (prepare for #50)
- [ ] Route issue references to existing execute logic
- [ ] Maintain default behavior for no input

### Phase 4: Error Handling
- [ ] Handle invalid file paths gracefully
- [ ] Provide clear error messages for ambiguous inputs
- [ ] Ensure file read errors don't crash the command

## Technical Approach
- Modify `src/cli/commands/run.ts` to add detection logic
- Use regex patterns for reliable type detection
- Maintain backward compatibility with existing usage
- Prepare hooks for spec file handling (#50)

## Testing Strategy
- Unit tests for each detection function
- Integration tests for command routing
- Verify existing behavior is preserved

## Potential Challenges
- Ambiguous inputs (e.g., "1.md" could be issue or spec)
- File access permissions
- Performance of file content checking

## Additional Notes
This is the foundation for the smart run command. The detection logic must be robust and well-tested as all subsequent features depend on it.