# Issue 17: Add Testing for Gemini Output Formatting

## Requirement
Add comprehensive tests for the new Gemini output formatting functionality to ensure it is working as expected and is robust.

## Acceptance Criteria
- [ ] Unit tests are created for the text line-breaking logic.
- [ ] Unit tests cover various sentence patterns and edge cases (e.g., multiple punctuation, quotes).
- [ ] Integration tests are added to mock Gemini CLI output and verify the formatted output.
- [ ] E2E tests are created to run actual Gemini executions and verify the readability of the output.
- [ ] Achieve minimum 90% code coverage for all new formatting code.
- [ ] All tests must pass with consistent results across 10 consecutive runs.
- [ ] Performance tests verify formatting overhead stays under 5ms per 1KB of text.

## Technical Details
- Tests should be added in the `test/` directory, mirroring the source file structure.
- Unit tests should be located in `test/unit/utils/` for the stream formatter and `test/unit/providers/` for the Gemini provider.
- Integration tests should be in `test/integration/providers/`.
- E2E tests should be in `test/e2e/cli/`.

### Unit Test Requirements:

#### StreamFormatter Tests (`test/unit/utils/stream-formatter.test.ts`):
- Test `formatGeminiOutput()` method with various inputs
- Test buffer management with partial sentences
- Test error handling when regex fails
- Test state management across multiple chunks
- Test performance with large text blocks (1KB, 10KB, 100KB)

#### Edge Cases to Test:
- **Basic sentences**: "Hello world. This is a test."
- **Multiple punctuation**: "What?! Are you serious..."
- **Quoted sentences**: "She said 'Hello.' Then left."
- **Abbreviations**: "Dr. Smith went to Inc. Corp."
- **Numbers**: "Version 1.0 was released. Now we have 2.0."
- **URLs and emails**: "Visit example.com. Email us at test@example.com."
- **Mixed content**: Code blocks, markdown, special characters
- **Buffer edge cases**: Exactly 1000 characters, 1001 characters
- **Empty/null input**: "", null, undefined
- **Single character input**: ".", "a", " "
- **No sentence endings**: "this is a long paragraph without any sentence endings"

#### GeminiProvider Tests (`test/unit/providers/gemini-provider.test.ts`):
- Test formatting integration with streaming output
- Test header/footer display
- Test fallback behavior when formatting fails
- Test environment variable configuration

### Integration Test Requirements:

#### Mock Data Specifications:
```typescript
// Sample mock outputs to test against
const mockOutputs = {
  shortResponse: "This is a short response. It has two sentences.",
  longResponse: "This is a very long response..." // 5KB of text
  technicalResponse: "Run npm install. Then execute node index.js.",
  conversationalResponse: "Hello! How are you? I'm doing well, thanks for asking."
};
```

#### Integration Tests (`test/integration/providers/gemini-provider.test.ts`):
- Mock `spawn` calls to Gemini CLI
- Test full provider workflow with formatting
- Test error scenarios (CLI failures, malformed output)
- Test configuration overrides
- Test backward compatibility with existing functionality

### E2E Test Requirements:

#### Environment Handling:
- Skip E2E tests if Gemini CLI is not available (`gemini --version` fails)
- Add clear test markers for optional E2E tests
- Provide setup instructions for running E2E tests locally

#### E2E Test Cases (`test/e2e/cli/gemini-formatting.test.ts`):
- Test actual Gemini CLI execution with formatting
- Test various prompt types (simple, complex, technical)
- Test configuration flags and environment variables
- Test output quality and readability

### Performance Testing:

#### Performance Test Requirements:
- Measure formatting time for 1KB, 10KB, and 100KB text blocks
- Test memory usage during formatting
- Test streaming performance with simulated network delays
- Benchmark against unformatted output baseline

#### Performance Test Implementation:
```typescript
describe('Performance Tests', () => {
  it('should format 1KB text in under 5ms', async () => {
    const text = generateText(1024);
    const start = performance.now();
    await formatter.formatGeminiOutput(text);
    const end = performance.now();
    expect(end - start).toBeLessThan(5);
  });
});
```

### Test Coverage Requirements:
- **Minimum coverage**: 90% for all new code
- **Branch coverage**: 85% for all conditional logic
- **Function coverage**: 100% for all public methods
- **Line coverage**: 90% for all new lines

### Test Data Management:
- Create `test/fixtures/gemini-outputs/` with sample outputs
- Include various response types and edge cases
- Provide both raw and expected formatted outputs
- Use consistent test data across unit and integration tests

## Dependencies
- Issue #16: Implement Gemini Output Formatting

## Resources
- Master Plan: `specs/gemini-output-formatting.md`
