# Plan for Issue #42: Add tests for embedded template functionality

This document outlines the step-by-step plan to complete `issues/42-add-tests-for-embedded-template-functionality.md`.

## Overview

This plan adds comprehensive unit and integration tests for the embedded template functionality, ensuring bootstrap works correctly without external template files. Tests verify that embedded templates are used, no filesystem reads occur, and the feature maintains backward compatibility.

## Implementation Steps

### Phase 1: Unit Test Setup
- [ ] Create or update test file for autonomous-agent bootstrap tests
- [ ] Import necessary testing utilities and mocks
- [ ] Set up test workspace without template files
- [ ] Configure mocks for provider and filesystem

### Phase 2: Core Unit Tests
- [ ] Test: Bootstrap uses embedded templates when no files exist
- [ ] Test: No filesystem reads attempted for templates
- [ ] Test: Captured prompt contains embedded template markers
- [ ] Test: Bootstrap succeeds without templates directory
- [ ] Test: Template validation works correctly

### Phase 3: Integration Tests
- [ ] Create integration test for full bootstrap workflow
- [ ] Test: CLI bootstrap command without template files
- [ ] Test: Generated issues use correct template format
- [ ] Test: Generated plans use correct template format
- [ ] Test: No ENOENT errors in output

### Phase 4: Error Handling Tests
- [ ] Test: Graceful handling of undefined templates
- [ ] Test: Clear error messages for template issues
- [ ] Test: No regression in existing error scenarios
- [ ] Test: Edge cases and boundary conditions

## Technical Approach
- Use Vitest mocking capabilities for filesystem
- Mock provider to capture prompts sent to AI
- Create temporary test workspaces
- Verify template content in generated files
- Use beforeEach/afterEach for test isolation

## Potential Challenges
- Mocking filesystem operations comprehensively
- Capturing provider prompts for verification
- Ensuring tests work across different environments
- Testing without affecting actual filesystem

## Success Metrics
- All new tests pass consistently
- No flaky tests introduced
- Code coverage maintained or improved
- Tests run quickly (< 5 seconds total)