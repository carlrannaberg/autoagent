# Issue 16: Implement Gemini Output Formatting

## Requirement
Implement the basic functionality for formatting the Gemini provider's output to improve readability, as outlined in the `gemini-output-formatting.md` specification.

## Acceptance Criteria
- [ ] Add a utility function to format text with line breaks at sentence boundaries.
- [ ] Update the `StreamFormatter` to include a method for formatting Gemini's text output.
- [ ] Modify the `GeminiProvider` to use the new formatting logic for its streaming output.
- [ ] The `GeminiProvider` output should display a visual header and footer, similar to the Claude provider.
- [ ] The core functionality should be implemented without introducing complex parsing or pattern recognition.

## Technical Details
- The implementation should focus on the `GeminiProvider.ts` and `utils/stream-formatter.ts` files.
- The line-breaking logic should be simple and based on sentence-ending punctuation.
- The solution must maintain real-time streaming output without significant buffering.

## Dependencies
- None

## Resources
- Master Plan: `specs/gemini-output-formatting.md`
