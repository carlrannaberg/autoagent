# Issue 4: Create provider abstraction and implementations

## Requirement
Implement the provider system that abstracts AI provider interactions, including base Provider class and specific implementations for Claude and Gemini providers.

## Acceptance Criteria
- [ ] Abstract Provider base class is implemented
- [ ] ClaudeProvider class is fully implemented
- [ ] GeminiProvider class is fully implemented
- [ ] Provider factory function works correctly
- [ ] Availability checking works for both providers
- [ ] Execution methods handle JSON output properly
- [ ] Error handling is comprehensive

## Technical Details
- Use child_process spawn for CLI execution
- Handle JSON output parsing for Claude
- Support both providers' CLI flags
- Implement proper error propagation
- Use chalk for colored output where appropriate

## Resources
- Master Plan: `master-plan.md` (Step 5)
- Claude CLI documentation
- Gemini CLI documentation
- Node.js child_process documentation