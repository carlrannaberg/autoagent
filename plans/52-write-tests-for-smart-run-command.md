# Plan for Issue #52: Write tests for smart run command

This document outlines the step-by-step plan to complete `issues/52-write-tests-for-smart-run-command.md`.

## Overview

This plan creates comprehensive test coverage for the smart run command, including unit tests for detection logic, integration tests for command routing, and end-to-end tests for complete workflows. The tests ensure reliability and protect against regressions.

## Implementation Steps

### Phase 1: Unit Tests for Detection Functions
- [ ] Create test file for input detection functions
- [ ] Test isPlanFile() with various file contents
- [ ] Test isIssueNumber() with valid/invalid inputs
- [ ] Test isIssueFile() with different filename patterns
- [ ] Test edge cases (empty files, permissions, etc.)

### Phase 2: Integration Tests for Command Routing
- [ ] Test spec file detection and bootstrap execution
- [ ] Test issue number routing to executeIssue
- [ ] Test issue name routing to executeIssue
- [ ] Test no input routing to executeNext
- [ ] Test option combinations (--all, --dry-run, etc.)

### Phase 3: E2E Tests for Complete Workflows
- [ ] Test spec → bootstrap → execute → complete
- [ ] Test spec with --all flag executing multiple issues
- [ ] Test interruption and resume scenarios
- [ ] Test provider failover during execution
- [ ] Test commit behavior with spec files

### Phase 4: Error Handling Tests
- [ ] Test invalid file paths
- [ ] Test malformed spec files
- [ ] Test bootstrap failures
- [ ] Test execution failures with --all
- [ ] Test missing provider credentials

## Technical Approach
- Use Vitest framework following project conventions
- Mock file system operations for unit tests
- Use test workspace for integration/E2E tests
- Follow existing test patterns in the codebase

## Testing Strategy
- Comprehensive unit test coverage for detection logic
- Integration tests using real Agent instances
- E2E tests simulating actual user workflows
- Focus on edge cases and error conditions

## Potential Challenges
- Mocking complex file operations
- Testing async bootstrap/execution flows
- Ensuring tests are deterministic
- Balancing test speed with coverage

## Additional Notes
These tests are critical for ensuring the smart run command works reliably. They should cover all documented examples from the spec and protect against regressions.