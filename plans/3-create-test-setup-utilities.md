# Plan for Issue #3: Create Test Setup and Utilities

This document outlines the step-by-step plan to complete `issues/3-create-test-setup-utilities.md`.

## Overview

This plan establishes a comprehensive test infrastructure for the Vitest migration, including custom matchers, mock utilities, test factories, and workspace management. The implementation will provide all necessary tools for writing clean, maintainable tests throughout the codebase.

## Implementation Steps

### Phase 1: Create Core Setup File
- [ ] Create test/setup.ts
- [ ] Configure global test environment
- [ ] Set up afterEach cleanup hooks
- [ ] Configure console mocking for tests

### Phase 2: Implement Custom Matchers
- [ ] Port toBeSuccessfulExecution matcher
- [ ] Port toHaveProviderHistory matcher
- [ ] Create toBeValidIssue matcher
- [ ] Create toContainTodoItem matcher
- [ ] Add TypeScript declarations for matchers

### Phase 3: Create Mock System
- [ ] Create test/mocks/index.ts as main export
- [ ] Implement test/mocks/providers.ts with createMockProvider
- [ ] Create provider behavior scenarios
- [ ] Implement test/mocks/filesystem.ts with memfs
- [ ] Create test/mocks/process.ts for spawn/exec mocking

### Phase 4: Create Test Utilities
- [ ] Implement TestWorkspace class
- [ ] Add workspace setup methods
- [ ] Create issue/plan creation helpers
- [ ] Add git initialization support
- [ ] Implement cleanup methods

### Phase 5: Create Test Factories
- [ ] Create factories for Issue objects
- [ ] Create factories for ExecutionResult objects
- [ ] Add factory for Configuration objects
- [ ] Export all factories from setup.ts

## Technical Approach
- Use Vitest's expect.extend for custom matchers
- Leverage memfs for in-memory filesystem
- Create flexible mock behaviors for different scenarios
- Ensure all utilities are fully typed

## Potential Challenges
- TypeScript typing for custom matchers
- Memfs compatibility with Node.js fs promises
- Mock behavior complexity

## Success Metrics
- All custom matchers working with proper TypeScript support
- Mock system provides flexible provider behaviors
- TestWorkspace simplifies test setup/teardown
- All utilities properly exported and typed