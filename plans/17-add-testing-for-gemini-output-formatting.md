# Plan for Issue 17: Add Testing for Gemini Output Formatting

This document outlines the step-by-step plan to complete `issues/17-add-testing-for-gemini-output-formatting.md`.

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
