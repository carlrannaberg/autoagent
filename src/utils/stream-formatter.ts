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
  
  // Compile regex patterns once for performance
  private static readonly SENTENCE_PATTERN = /[.!?]+["']?(?:\s+|$)/g;
  
  // Common abbreviations that shouldn't end sentences
  private static readonly ABBREVIATIONS = new Set([
    // Titles
    'Dr', 'Mr', 'Mrs', 'Ms', 'Prof', 'Rev', 'Hon', 'Capt', 'Lt', 'Sgt',
    // Business
    'Inc', 'Corp', 'Ltd', 'LLC', 'Co', 'Assoc', 'Dept', 'Mgmt',
    // Academic
    'Ph.D', 'M.A', 'B.A', 'B.S', 'M.S', 'etc', 'vs', 'i.e', 'e.g',
    // Geographic
    'St', 'Ave', 'Blvd', 'Rd', 'U.S.A', 'U.K', 'N.Y', 'L.A',
    // Time/Date
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'a.m', 'p.m',
    // Technical
    'API', 'URL', 'HTTP', 'HTTPS', 'TCP', 'UDP', 'SQL', 'JSON', 'XML', 'HTML', 'CSS', 'JS'
  ]);
  
  // Pattern to check if a period is part of an abbreviation or number
  private static readonly URL_PATTERN = /https?:\/\/[^\s]*[^\s.,!?;:]/;
  private static readonly EMAIL_PATTERN = /\S+@\S+\.\S*[^\s.,!?;:]/;
  private static readonly FILE_PATH_PATTERN = /(?:\.\/|\/|[A-Za-z]:\\)[^\s]*[^\s.,!?;:]/;
  
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
   * Check if a potential sentence ending is actually an abbreviation
   * @param textBefore - Text before the period
   * @param textAfter - Text after the period (for context)
   * @returns True if this is an abbreviation
   */
  private static isAbbreviation(textBefore: string, textAfter: string): boolean {
    const words = textBefore.trim().split(/\s+/);
    const lastWord = words[words.length - 1];
    if (lastWord === undefined || lastWord === null || lastWord.length === 0) {
      return false;
    }
    
    // Remove the period to check against abbreviations
    const wordWithoutPeriod = lastWord.replace(/\.$/, '');
    const isInAbbreviationList = this.ABBREVIATIONS.has(wordWithoutPeriod);
    
    // If it's not in our abbreviation list, it's not an abbreviation
    if (!isInAbbreviationList) {
      return false;
    }
    
    // If the text after the period starts with a capital letter (after optional whitespace),
    // it's likely a new sentence, not an abbreviation
    const afterTrimmed = textAfter.trim();
    if (afterTrimmed.length > 0 && /^[A-Z]/.test(afterTrimmed)) {
      // Special case: titles like "Dr.", "Mr.", "Mrs.", etc. followed by proper nouns
      // should still be considered abbreviations
      if (['Dr', 'Mr', 'Mrs', 'Ms', 'Prof', 'Rev', 'Hon', 'Capt', 'Lt', 'Sgt'].includes(wordWithoutPeriod)) {
        // Check if it's followed by a single capitalized word (likely a name)
        const afterWords = afterTrimmed.split(/\s+/);
        const firstWord = afterWords[0];
        if (afterWords.length > 0 && firstWord !== undefined && /^[A-Z][a-z]/.test(firstWord)) {
          return true; // This is likely a title + name, keep as abbreviation
        }
      }
      
      return false;
    }
    
    return true;
  }
  
  /**
   * Check if a period is part of a special pattern (number, URL, email, etc.)
   * @param fullText - The full text to check
   * @param periodIndex - Index of the period in the text
   * @returns True if the period is part of a special pattern
   */
  private static isSpecialPattern(fullText: string, periodIndex: number): boolean {
    // Check for decimal numbers (e.g., 3.14)
    const beforePeriod = fullText.substring(Math.max(0, periodIndex - 10), periodIndex);
    const afterPeriod = fullText.substring(periodIndex + 1, periodIndex + 10);
    if (/\d$/.test(beforePeriod) && /^\d/.test(afterPeriod)) {
      return true;
    }
    
    // Check if period is within a URL, email, or file path
    // Look for these patterns around the period position
    const contextStart = Math.max(0, periodIndex - 50);
    const contextEnd = Math.min(fullText.length, periodIndex + 50);
    const context = fullText.substring(contextStart, contextEnd);
    const relativeIndex = periodIndex - contextStart;
    
    // Check each pattern to see if the period falls within it
    for (const pattern of [this.URL_PATTERN, this.EMAIL_PATTERN, this.FILE_PATH_PATTERN]) {
      const matches = [...context.matchAll(new RegExp(pattern, 'g'))];
      for (const match of matches) {
        if (match.index !== undefined && 
            match.index <= relativeIndex && 
            match.index + match[0].length > relativeIndex) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  /**
   * Format Gemini output with line breaks at sentence boundaries.
   * This method is stateful and handles partial sentences across chunks.
   * @param chunk - The text chunk to format
   * @returns The formatted text with remaining buffer
   */
  static formatGeminiOutput(chunk: string): string {
    try {
      // Skip formatting if disabled
      if (process.env.AUTOAGENT_DISABLE_GEMINI_FORMATTING === 'true') {
        return chunk;
      }
      
      // Add chunk to buffer
      this.buffer += chunk;
      
      // Custom buffer size from environment
      const bufferSize = parseInt(process.env.AUTOAGENT_GEMINI_BUFFER_SIZE ?? '1000', 10);
      
      // Find all potential sentence boundaries
      const matches = [...this.buffer.matchAll(this.SENTENCE_PATTERN)];
      
      if (matches.length === 0) {
        // No complete sentences found
        // If buffer is too large, force flush to prevent memory issues
        if (this.buffer.length > bufferSize) {
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
        if (!match || match.index === undefined) {
          continue;
        }
        
        const endIndex = match.index + match[0].length;
        
        // Check if this is the last match and there's more text after it
        const isLastMatch = i === matches.length - 1;
        const hasMoreText = endIndex < this.buffer.length;
        
        if (isLastMatch && hasMoreText) {
          // Don't process the last sentence if there's more text after it
          // (it might be incomplete)
          break;
        }
        
        // Check if this is a real sentence ending
        const sentenceCandidate = this.buffer.substring(lastIndex, endIndex);
        const textBeforePeriod = this.buffer.substring(lastIndex, match.index);
        const textAfterPeriod = this.buffer.substring(endIndex);
        
        // Skip if this is an abbreviation
        if (match[0].startsWith('.') && this.isAbbreviation(textBeforePeriod, textAfterPeriod)) {
          continue;
        }
        
        // Skip if this period is part of a number, URL, email, or file path
        if (match[0].startsWith('.') && this.isSpecialPattern(this.buffer, match.index)) {
          continue;
        }
        
        // This is a real sentence ending
        const sentence = sentenceCandidate.trim();
        if (sentence) {
          output += sentence + '\n\n';
        }
        lastIndex = endIndex;
      }
      
      // Keep remaining text in buffer
      this.buffer = this.buffer.substring(lastIndex);
      
      // Debug logging
      if (process.env.AUTOAGENT_DEBUG_FORMATTING === 'true') {
        console.error('[DEBUG] Buffer size:', this.buffer.length);
        console.error('[DEBUG] Output size:', output.length);
      }
      
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