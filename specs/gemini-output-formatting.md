# Gemini Provider Output Formatting Improvements

## Overview

This specification outlines improvements to the Gemini provider output formatting to make it more readable and visually consistent with Claude Code's output style. The goal is to add proper line breaks and visual structure to Gemini's text stream output.

## Background/Problem Statement

Currently, the Gemini provider output appears as a continuous stream of concatenated text without proper line breaks or visual structure. This makes it difficult to:
- Read and follow the agent's progress
- See where one thought ends and another begins
- Track the overall execution flow
- Debug issues when they occur

Example of current output:
```
Okay, I will start by analyzing the master plan.I've analyzed the master plan. I'll now create the issues and corresponding plans based on the "Required Actions". I'll start with the first issue: "Fix Vitest benchmark reporter configuration".Now I'll create the second issue...
```

In contrast, Claude's output has clear visual structure with headers, spacing, and formatting.

## Goals

1. **Add proper line breaks** to separate sentences and thoughts
2. **Apply visual header/footer** similar to Claude's output
3. **Maintain real-time streaming** without buffering delays
4. **Keep implementation simple** - no complex parsing or pattern matching
5. **Preserve all output** while improving readability

## Non-Goals

1. **Pattern recognition** - We won't try to identify different types of content
2. **Complex parsing** - No attempt to parse JSON or identify tool usage
3. **Content modification** - We only format, not change the actual output
4. **Changing Gemini CLI behavior** - We work with the existing text output
5. **Creating custom event types** - Just simple text formatting

## Detailed Design

### Architecture Changes

The main changes will be in how the `GeminiProvider` processes streaming output:

1. **Text Processing**: Add line breaks at sentence boundaries
2. **Visual Formatting**: Add header/footer like Claude
3. **Stream Handling**: Process text chunks and format in real-time
4. **Simple Implementation**: No complex parsing, just text formatting

### Implementation Approach

#### 1. Text Line Breaking

Add a simple utility to break text at natural boundaries:

```typescript
function formatTextWithLineBreaks(text: string): string {
  // Split on sentence endings followed by capital letters
  return text
    .replace(/\.([A-Z])/g, '.\n$1')
    .replace(/\!([A-Z])/g, '!\n$1')
    .replace(/\?([A-Z])/g, '?\n$1')
    .replace(/\."\s*([A-Z])/g, '."\n$1')
    .trim();
}
```

#### 2. Enhanced Stream Formatter

Update the `StreamFormatter` to format Gemini text output:

```typescript
static formatGeminiText(text: string): void {
  // Add line breaks at sentence boundaries
  const formatted = formatTextWithLineBreaks(text);
  
  // Print with consistent styling
  console.log(`${colors.WHITE}${formatted}${colors.NC}`);
  console.log(''); // Add spacing between chunks
}
```

#### 3. Provider Integration

Update `GeminiProvider` to use the text formatting:

```typescript
protected async spawnProcessWithStreamingAndStdin(
  command: string,
  args: string[],
  stdin: string,
  signal?: AbortSignal
): Promise<{ stdout: string; stderr: string; code: number | null }> {
  // Show header like Claude
  StreamFormatter.showHeader('gemini');
  
  let buffer = '';
  
  child.stdout?.on('data', (data: Buffer) => {
    const chunk = data.toString();
    stdout += chunk;
    
    // Buffer text to handle partial sentences
    buffer += chunk;
    
    // Process complete sentences
    const sentences = buffer.split(/(?<=[.!?])\s+(?=[A-Z])/);
    
    // Keep last potentially incomplete sentence in buffer
    if (sentences.length > 1) {
      buffer = sentences.pop() || '';
      
      // Format and display complete sentences
      for (const sentence of sentences) {
        if (sentence.trim()) {
          StreamFormatter.formatGeminiText(sentence);
        }
      }
    }
  });
  
  child.on('close', () => {
    // Process any remaining buffer content
    if (buffer.trim()) {
      StreamFormatter.formatGeminiText(buffer);
    }
    StreamFormatter.showFooter();
  });
}
```

### Code Structure

Modified files only:
- `src/providers/GeminiProvider.ts` - Add text formatting to streaming
- `src/utils/stream-formatter.ts` - Add `formatGeminiText` method
- `src/providers/Provider.ts` - Update streaming method if needed

### API Changes

No public API changes. The improvements are internal to the provider implementation.

## Migration Strategy

Since this is an improvement to output formatting without changing the interface:

1. **Backward Compatible**: Existing code continues to work
2. **Progressive Enhancement**: Can be rolled out without breaking changes
3. **No Configuration Needed**: Simple formatting is always beneficial

## Testing Strategy

1. **Unit Tests**:
   - Test text line break logic with various sentence patterns
   - Test buffer handling for partial sentences
   - Test edge cases (multiple punctuation, quotes, etc.)

2. **Integration Tests**:
   - Mock Gemini CLI output with realistic text
   - Verify formatted output has proper line breaks
   - Test streaming behavior

3. **E2E Tests**:
   - Run actual Gemini executions
   - Verify output is more readable

Example test case:
```typescript
it('should add line breaks between sentences', async () => {
  const mockOutput = 'First sentence.Second sentence!Third sentence?';
  const formatted = formatTextWithLineBreaks(mockOutput);
  
  expect(formatted).toBe('First sentence.\nSecond sentence!\nThird sentence?');
});

it('should handle streaming text with partial sentences', async () => {
  const chunks = ['Hello world.This is', ' a test.Another sentence.'];
  // Test that buffering handles partial sentences correctly
});
```

## Performance Considerations

1. **Minimal Overhead**: Simple text processing is very fast
2. **No Buffering Delays**: Process text as it streams
3. **Memory Efficient**: Small buffer for sentence completion
4. **Stream Performance**: Maintain real-time output

## Security Considerations

1. **No Parsing Risks**: Just text formatting, no complex parsing
2. **Buffer Limits**: Small buffer size for partial sentences
3. **Safe Operations**: Only string manipulation, no execution
4. **Output Safety**: Preserve original content, only add formatting

## Documentation

Update the following documentation:
1. **README.md**: Note about improved Gemini output readability
2. **Provider documentation**: Mention formatted output
3. **CHANGELOG.md**: Add entry for this improvement

## Implementation Phases

### Phase 1: Basic Implementation (Priority: High)
- Add line break logic to `StreamFormatter`
- Update `GeminiProvider` streaming method
- Add header/footer formatting

### Phase 2: Testing (Priority: High)
- Unit tests for text formatting
- Integration tests with mock output
- E2E verification

### Phase 3: Polish (Priority: Medium)
- Handle edge cases (abbreviations, numbers, etc.)
- Optimize sentence detection regex
- Documentation updates

## Open Questions

1. **Sentence Detection**: Should we handle abbreviations like "Dr." or "Inc."?
2. **Output Styling**: Should we add any color to the text output?
3. **Line Length**: Should we wrap very long lines?
4. **Spacing**: How much space between formatted chunks?

## Example Implementation

Here's a simplified example of how the formatted output would look:

**Before**:
```
Okay, I will start by analyzing the master plan.I've analyzed the master plan. I'll now create the issues and corresponding plans based on the "Required Actions". I'll start with the first issue: "Fix Vitest benchmark reporter configuration".Now I'll create the second issue: "Migrate ESLint configuration to v9 format".I have created all the issues and plans. Now I will update the TODO.md file.I have created all the necessary issues and plans, and updated the TODO.md file. I will now mark the original issue as complete.
```

**After**:
```
┌─────────────────────────────────────────────────────────────┐
│                     🤖 GEMINI AGENT                        │
└─────────────────────────────────────────────────────────────┘

Okay, I will start by analyzing the master plan.

I've analyzed the master plan.

I'll now create the issues and corresponding plans based on the "Required Actions".

I'll start with the first issue: "Fix Vitest benchmark reporter configuration".

Now I'll create the second issue: "Migrate ESLint configuration to v9 format".

I have created all the issues and plans.

Now I will update the TODO.md file.

I have created all the necessary issues and plans, and updated the TODO.md file.

I will now mark the original issue as complete.

└─────────────────────────────────────────────────────────────┘
```

This simple formatting with proper line breaks makes the output much more readable, allowing users to easily follow the agent's progress without the cognitive load of parsing concatenated text.