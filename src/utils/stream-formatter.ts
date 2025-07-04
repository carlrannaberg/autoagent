/**
 * Stream formatter for Claude and Gemini output
 * Matches the formatting from autonomous-agents-template
 */

// ANSI color codes
const colors = {
  RED: '\x1b[0;31m',
  GREEN: '\x1b[0;32m',
  YELLOW: '\x1b[1;33m',
  BLUE: '\x1b[0;34m',
  PURPLE: '\x1b[0;35m',
  CYAN: '\x1b[0;36m',
  WHITE: '\x1b[1;37m',
  GRAY: '\x1b[0;90m',
  NC: '\x1b[0m' // No Color
};

export class StreamFormatter {
  private static buffer = '';
  
  private static formatHeader(provider: string): void {
    const header = provider === 'claude' ? '🤖 CLAUDE AGENT' : '🤖 GEMINI AGENT';
    // eslint-disable-next-line no-console
    console.log(`${colors.CYAN}┌─────────────────────────────────────────────────────────────┐${colors.NC}`);
    // eslint-disable-next-line no-console
    console.log(`${colors.CYAN}│                     ${header}                        │${colors.NC}`);
    // eslint-disable-next-line no-console
    console.log(`${colors.CYAN}└─────────────────────────────────────────────────────────────┘${colors.NC}`);
    // eslint-disable-next-line no-console
    console.log('');
  }

  static formatClaudeMessage(message: Record<string, unknown>): void {
    try {
      const type = message.type as string;

      switch (type) {
        case 'system': {
          if (message.subtype === 'init') {
            // eslint-disable-next-line no-console
            console.log(`${colors.GRAY}🔧 System initialized${colors.NC}`);
            if (typeof message.model === 'string') {
              // eslint-disable-next-line no-console
              console.log(`   Model: ${message.model}`);
            }
            const tools = message.tools as unknown[];
            if (Array.isArray(tools) && tools.length > 0) {
              // eslint-disable-next-line no-console
              console.log(`   Tools available: ${tools.length}`);
            }
            // eslint-disable-next-line no-console
            console.log('');
          }
          break;
        }

        case 'assistant': {
          const msg = message.message as Record<string, unknown>;
          if (msg !== null && typeof msg === 'object' && Array.isArray(msg.content)) {
            for (const content of msg.content) {
              if (typeof content === 'object' && content !== null) {
                const contentObj = content as Record<string, unknown>;
                if (contentObj.type === 'tool_use' && typeof contentObj.name === 'string') {
                  // eslint-disable-next-line no-console
                  console.log(`${colors.BLUE}🔧 Using tool: ${colors.WHITE}${contentObj.name}${colors.NC}`);
                } else if (contentObj.type === 'text' && typeof contentObj.text === 'string') {
                  // eslint-disable-next-line no-console
                  console.log(`${colors.WHITE}💭 Agent: ${colors.NC}${contentObj.text}`);
                  // eslint-disable-next-line no-console
                  console.log('');
                }
              }
            }
          }
          break;
        }

        case 'user': {
          const msg = message.message as Record<string, unknown>;
          if (msg !== null && typeof msg === 'object' && Array.isArray(msg.content)) {
            for (const content of msg.content) {
              if (typeof content === 'object' && content !== null) {
                const contentObj = content as Record<string, unknown>;
                if (contentObj.type === 'tool_result' && typeof contentObj.content === 'string') {
                  const result = contentObj.content;
                  if (result.length > 300) {
                    // eslint-disable-next-line no-console
                    console.log(`${colors.GREEN}✅ Tool result: ${colors.GRAY}${result.substring(0, 300)}...${colors.NC}`);
                  } else {
                    // eslint-disable-next-line no-console
                    console.log(`${colors.GREEN}✅ Tool result: ${colors.GRAY}${result}${colors.NC}`);
                  }
                  // eslint-disable-next-line no-console
                  console.log('');
                }
              }
            }
          }
          break;
        }

        case 'result': {
          if (message.is_error === false) {
            // eslint-disable-next-line no-console
            console.log(`${colors.GREEN}✅ Task completed successfully!${colors.NC}`);
          } else if (message.is_error === true) {
            // eslint-disable-next-line no-console
            console.log(`${colors.RED}❌ Task failed${colors.NC}`);
          }
          // eslint-disable-next-line no-console
          console.log('');
          break;
        }

        default: {
          // For any other types, show minimal info
          if (type !== '' && type !== 'empty') {
            // eslint-disable-next-line no-console
            console.log(`${colors.GRAY}📄 ${type}${colors.NC}`);
          }
          break;
        }
      }
    } catch (error) {
      // Not JSON or error in formatting
    }
  }

  static formatGeminiMessage(message: Record<string, unknown>): void {
    try {
      const type = message.type as string;

      switch (type) {
        case 'tool_code': {
          const toolCode = (message.content as string) || '';
          // eslint-disable-next-line no-console
          console.log(`${colors.BLUE}🔧 Using tool:${colors.NC}\n${colors.WHITE}${toolCode}${colors.NC}`);
          // eslint-disable-next-line no-console
          console.log('');
          break;
        }

        case 'model_output': {
          const textContent = (message.content as string) || '';
          // eslint-disable-next-line no-console
          console.log(`${colors.WHITE}💭 Agent: ${colors.NC}${textContent}`);
          // eslint-disable-next-line no-console
          console.log('');
          break;
        }

        case 'tool_result': {
          const content = (message.content as string) || '';
          if (content.length > 300) {
            // eslint-disable-next-line no-console
            console.log(`${colors.GREEN}✅ Tool result: ${colors.GRAY}${content.substring(0, 300)}...${colors.NC}`);
          } else {
            // eslint-disable-next-line no-console
            console.log(`${colors.GREEN}✅ Tool result: ${colors.GRAY}${content}${colors.NC}`);
          }
          // eslint-disable-next-line no-console
          console.log('');
          break;
        }

        case 'result': {
          const status = (message.status as string) || 'error';
          if (status === 'success') {
            // eslint-disable-next-line no-console
            console.log(`${colors.GREEN}✅ Task completed successfully!${colors.NC}`);
          } else {
            // eslint-disable-next-line no-console
            console.log(`${colors.RED}❌ Task failed${colors.NC}`);
          }
          // eslint-disable-next-line no-console
          console.log('');
          break;
        }

        default: {
          if (type !== '' && type !== 'empty') {
            // eslint-disable-next-line no-console
            console.log(`${colors.GRAY}📄 ${type}${colors.NC}`);
          }
          break;
        }
      }
    } catch (error) {
      // Not JSON or error in formatting
    }
  }

  static showHeader(provider: 'claude' | 'gemini'): void {
    this.formatHeader(provider);
  }

  static showFooter(): void {
    // eslint-disable-next-line no-console
    console.log(`${colors.CYAN}└─────────────────────────────────────────────────────────────┘${colors.NC}`);
  }

  /**
   * Format Gemini output with line breaks at sentence boundaries.
   * This method is stateful and handles partial sentences across chunks.
   * @param chunk - The text chunk to format
   * @returns The formatted text with remaining buffer
   */
  static formatGeminiOutput(chunk: string): string {
    try {
      // Add chunk to buffer
      this.buffer += chunk;
      
      // Regex pattern to match sentence endings, including quoted sentences
      // Matches: period/exclamation/question mark, optionally followed by quotes,
      // followed by either whitespace or end of string
      const sentencePattern = /[.!?]+["']?(?:\s+|$)/g;
      
      // Find all sentence boundaries
      const matches = [...this.buffer.matchAll(sentencePattern)];
      
      if (matches.length === 0) {
        // No complete sentences found
        // If buffer is too large, force flush to prevent memory issues
        if (this.buffer.length > 1000) {
          const output = this.buffer;
          this.buffer = '';
          return output;
        }
        return '';
      }
      
      // Process complete sentences
      let lastIndex = 0;
      let output = '';
      
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        if (!match || match.index === undefined) continue;
        
        const endIndex = match.index + match[0].length;
        
        // Check if this is the last match and there's more text after it
        const isLastMatch = i === matches.length - 1;
        const hasMoreText = endIndex < this.buffer.length;
        
        if (isLastMatch && hasMoreText) {
          // Don't process the last sentence if there's more text after it
          // (it might be incomplete)
          break;
        }
        
        const sentence = this.buffer.substring(lastIndex, endIndex).trim();
        if (sentence) {
          output += sentence + '\n\n';
        }
        lastIndex = endIndex;
      }
      
      // Keep remaining text in buffer
      this.buffer = this.buffer.substring(lastIndex);
      
      return output;
    } catch (error) {
      // On error, return the buffered content plus new chunk, then clear buffer
      const output = this.buffer;
      this.buffer = '';
      return output;
    }
  }

  /**
   * Flush any remaining buffer content.
   * Call this when the stream ends.
   */
  static flushGeminiBuffer(): string {
    const output = this.buffer.trim();
    this.buffer = '';
    return output ? output + '\n' : '';
  }

  /**
   * Format and display Gemini text output.
   * @param text - The text to format and display
   */
  static displayGeminiText(text: string): void {
    if (text.trim()) {
      // eslint-disable-next-line no-console
      console.log(`${colors.WHITE}${text.trim()}${colors.NC}`);
    }
  }
}