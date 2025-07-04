# Issue 16: Implement Gemini Output Formatting

## Requirement
Implement the basic functionality for formatting the Gemini provider's output to improve readability, as outlined in the `gemini-output-formatting.md` specification.

## Acceptance Criteria
- [ ] Add a utility function to format text with line breaks at sentence boundaries.
- [ ] Update the `StreamFormatter` to include a method for formatting Gemini's text output.
- [ ] Modify the `GeminiProvider` to use the new formatting logic for its streaming output.
- [ ] The `GeminiProvider` output should display a visual header and footer, similar to the Claude provider.
- [ ] The core functionality should be implemented without introducing complex parsing or pattern recognition.
- [ ] Performance overhead should not exceed 5ms per 1KB of text processed.
- [ ] Buffer size should not exceed 1000 characters for partial sentence handling.

## Technical Details
- The implementation should focus on the `GeminiProvider.ts` and `utils/stream-formatter.ts` files.
- The line-breaking logic should be simple and based on sentence-ending punctuation.
- The solution must maintain real-time streaming output without significant buffering.

### Specific Implementation Requirements:

#### Regex Patterns:
- Primary sentence-ending pattern: `/[.!?]+\s+/g`
- Handle quoted sentences: `/[.!?]+["']?\s+/g`
- Preserve multiple punctuation marks (e.g., "..." or "!!")

#### Buffer Management:
- Maximum buffer size: 1000 characters
- When buffer exceeds limit without finding sentence boundary, force flush
- Clear buffer after each sentence boundary detection

#### Error Handling:
- Gracefully handle regex failures by falling back to unformatted output
- Log errors to debug stream without interrupting output
- Maintain output stream continuity even if formatting fails

#### Integration with StreamFormatter:
- Add new method: `formatGeminiOutput(chunk: string): string`
- Method should be stateful to handle partial sentences across chunks
- Preserve existing StreamFormatter methods without modification

## Configuration
- Feature should be enabled by default for Gemini provider
- Add environment variable `AUTOAGENT_DISABLE_GEMINI_FORMATTING` to disable if needed
- No user-facing configuration required in initial implementation

## Dependencies
- None

## Resources
- Master Plan: `specs/gemini-output-formatting.md`
