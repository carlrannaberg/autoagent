# Plan for Issue #41: Update bootstrap to use embedded templates

This document outlines the step-by-step plan to complete `issues/41-update-bootstrap-to-use-embedded-templates.md`.

## Overview

This plan updates the bootstrap command to use embedded template constants instead of reading from filesystem. This eliminates file dependencies, improves reliability, and simplifies error handling by removing filesystem operations.

## Implementation Steps

### Phase 1: Code Analysis and Import Setup
- [ ] Locate bootstrap method in `src/core/autonomous-agent.ts`
- [ ] Add import statement for template constants
- [ ] Verify import path is correct relative to autonomous-agent.ts
- [ ] Check for any existing template-related imports to remove

### Phase 2: Replace Filesystem Operations
- [ ] Identify lines 787-789 that read template files
- [ ] Remove templateDir variable and path.join operation
- [ ] Remove filesystem read operations for issueTemplate
- [ ] Remove filesystem read operations for planTemplate
- [ ] Assign embedded constants to template variables

### Phase 3: Error Handling Updates
- [ ] Add validation to ensure templates are defined
- [ ] Update error messages if templates are missing
- [ ] Remove try-catch blocks specific to file reading
- [ ] Add appropriate error for undefined templates

### Phase 4: Testing and Verification
- [ ] Run TypeScript compilation to check for errors
- [ ] Test bootstrap command without template files
- [ ] Verify bootstrap creates issues and plans correctly
- [ ] Ensure no regression in existing functionality

## Technical Approach
- Direct constant assignment instead of async file reads
- Simplified error handling without filesystem concerns
- Maintain same variable names for minimal code changes
- Keep existing bootstrap logic intact

## Potential Challenges
- Ensuring import path is correct across different build configurations
- Handling edge case where templates might be undefined
- Maintaining async function signature despite removing await calls
- Verifying no side effects from removing filesystem operations

## Success Metrics
- Bootstrap works without templates directory
- No filesystem errors (ENOENT) when running bootstrap
- Existing bootstrap functionality preserved
- Code passes TypeScript and ESLint checks