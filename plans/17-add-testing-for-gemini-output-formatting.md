# Plan for Issue #17: Add Testing for Gemini Output Formatting

This document outlines the step-by-step plan to complete `issues/17-add-testing-for-gemini-output-formatting.md`.

## Overview

This plan focuses on creating comprehensive test coverage for the Gemini output formatting feature. The testing strategy includes unit tests for the core formatting logic, integration tests for the streaming behavior, and end-to-end tests to validate the complete user experience. The goal is to ensure the formatting improvements are robust and handle various edge cases correctly.

## Implementation Steps

1. **Create unit tests for formatting function** - Test `formatTextWithLineBreaks` with various input scenarios
2. **Test sentence boundary detection** - Verify correct handling of periods, questions, exclamations
3. **Test edge cases** - Handle abbreviations, decimals, URLs, and multiple punctuation marks
4. **Test stream buffering** - Ensure partial sentences are correctly preserved across chunks
5. **Create integration tests** - Mock Gemini CLI output and verify formatted streaming behavior
6. **Implement E2E tests** - Run actual Gemini commands and validate output readability
7. **Test performance** - Ensure formatting doesn't significantly impact streaming speed
8. **Document test scenarios** - Create clear documentation of all test cases and their purposes

## Implementation Plan

### Phase 1: Unit Tests
- [ ] Write unit tests for the `formatTextWithLineBreaks` utility function.
- [ ] Test the stream buffer handling for partial sentences in `GeminiProvider`.
- [ ] Test edge cases like abbreviations, numbers, and multiple punctuation marks.

### Phase 2: Integration and E2E Tests
- [ ] Create integration tests that mock the Gemini CLI output and verify the formatted stream.
- [ ] Develop E2E tests that run actual Gemini executions and assert on the improved readability of the output.

## Technical Approach
- Use `vitest` for all tests.
- For integration tests, create mock data that simulates the Gemini CLI's streaming text output.
- For E2E tests, use a simple prompt that will generate a multi-sentence response from Gemini.

## Potential Challenges
- Mocking the streaming behavior of the Gemini CLI accurately.
- Creating reliable assertions for the E2E tests that are not brittle.
