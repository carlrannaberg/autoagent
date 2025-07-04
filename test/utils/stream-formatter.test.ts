import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { StreamFormatter } from '../../src/utils/stream-formatter';

describe('StreamFormatter', () => {
  // Store original console.log
  // eslint-disable-next-line no-console
  const originalConsoleLog = console.log;
  
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the buffer before each test
    StreamFormatter.flushGeminiBuffer();
    // Mock console.log
    // eslint-disable-next-line no-console
    console.log = vi.fn();
  });
  
  afterEach(() => {
    // Restore console.log
    // eslint-disable-next-line no-console
    console.log = originalConsoleLog;
  });

  describe('formatGeminiOutput', () => {
    it('should add line breaks between sentences', () => {
      const chunk = 'First sentence. Second sentence! Third sentence?';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      expect(formatted).toBe('First sentence.\n\nSecond sentence!\n\nThird sentence?\n\n');
    });

    it('should handle quoted sentences', () => {
      const chunk = 'He said "Hello." She replied "Hi!" They wondered "What?"';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      expect(formatted).toBe('He said "Hello."\n\nShe replied "Hi!"\n\nThey wondered "What?"\n\n');
    });

    it('should buffer partial sentences across chunks', () => {
      const chunk1 = 'This is the beginning';
      const chunk2 = ' of a sentence. And here is another.';
      
      // First chunk should not produce output (no complete sentence)
      const formatted1 = StreamFormatter.formatGeminiOutput(chunk1);
      expect(formatted1).toBe('');
      
      // Second chunk should produce both sentences
      const formatted2 = StreamFormatter.formatGeminiOutput(chunk2);
      expect(formatted2).toBe('This is the beginning of a sentence.\n\nAnd here is another.\n\n');
    });

    it('should handle multiple punctuation marks', () => {
      const chunk = 'Really??? Yes!!! Wait...';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      expect(formatted).toBe('Really???\n\nYes!!!\n\nWait...\n\n');
    });

    it('should force flush buffer when it exceeds 1000 characters', () => {
      // Create a string that's over 1000 characters without sentence endings
      const longChunk = 'A'.repeat(1001);
      const formatted = StreamFormatter.formatGeminiOutput(longChunk);
      
      expect(formatted).toBe(longChunk);
      expect(formatted.length).toBe(1001);
    });

    it('should handle empty chunks', () => {
      const formatted = StreamFormatter.formatGeminiOutput('');
      expect(formatted).toBe('');
    });

    it('should handle chunks with only whitespace', () => {
      const formatted = StreamFormatter.formatGeminiOutput('   \n  \t  ');
      expect(formatted).toBe('');
    });

    it('should preserve sentence structure with complex punctuation', () => {
      const chunk = 'Dr. Smith arrived at 3:30 p.m. He was late!';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      // Note: This will split at "Dr." which is a limitation of the simple regex
      // This is acceptable for the basic implementation
      expect(formatted).toContain('He was late!\n\n');
    });

    it('should handle error gracefully and return buffered text', () => {
      // First add some content to buffer
      StreamFormatter.formatGeminiOutput('Initial content');
      
      // Override matchAll to throw an error
      const originalMatchAll = String.prototype.matchAll;
      String.prototype.matchAll = vi.fn().mockImplementation(() => {
        throw new Error('Test error');
      });
      
      const chunk = ' more content.';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      // When error occurs, it returns the entire buffer content (including the new chunk)
      expect(formatted).toBe('Initial content more content.');
      
      // Restore original method
      String.prototype.matchAll = originalMatchAll;
    });
  });

  describe('flushGeminiBuffer', () => {
    it('should return remaining buffer content', () => {
      // Ensure buffer is clean
      StreamFormatter.flushGeminiBuffer();
      
      // Add content to buffer without complete sentence (no punctuation at end)
      const result = StreamFormatter.formatGeminiOutput('This is incomplete');
      
      // Since there's no sentence ending and buffer is < 1000 chars, should buffer it
      expect(result).toBe('');
      
      // Flush should return the incomplete content
      const flushed = StreamFormatter.flushGeminiBuffer();
      expect(flushed).toBe('This is incomplete\n');
    });

    it('should clear buffer after flushing', () => {
      // Add content to buffer
      StreamFormatter.formatGeminiOutput('Some content');
      
      // Flush
      StreamFormatter.flushGeminiBuffer();
      
      // Second flush should return empty
      const secondFlush = StreamFormatter.flushGeminiBuffer();
      expect(secondFlush).toBe('');
    });

    it('should handle empty buffer', () => {
      const flushed = StreamFormatter.flushGeminiBuffer();
      expect(flushed).toBe('');
    });
  });

  describe('displayGeminiText', () => {
    it('should display non-empty text with color codes', () => {
      StreamFormatter.displayGeminiText('Hello world\n\n');
      
      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Hello world')
      );
    });

    it('should not display empty or whitespace-only text', () => {
      StreamFormatter.displayGeminiText('');
      StreamFormatter.displayGeminiText('   \n  ');
      
      // eslint-disable-next-line no-console
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      StreamFormatter.flushGeminiBuffer();
    });

    it('should handle abbreviations correctly', () => {
      const chunk = 'Dr. Smith met Ms. Johnson at 3 p.m. They discussed the Inc. merger.';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      // Should correctly split into two sentences while preserving abbreviations
      const sentences = formatted.split('\n\n').filter(s => s);
      expect(sentences).toHaveLength(2);
      expect(sentences[0]).toBe('Dr. Smith met Ms. Johnson at 3 p.m.');
      expect(sentences[1]).toBe('They discussed the Inc. merger.');
    });

    it('should handle decimal numbers', () => {
      const chunk = 'The value is 3.14. The temperature is 98.6 degrees. Version 2.0 is ready.';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      const sentences = formatted.split('\n\n').filter(s => s);
      expect(sentences).toHaveLength(3);
      expect(sentences[0]).toBe('The value is 3.14.');
      expect(sentences[1]).toBe('The temperature is 98.6 degrees.');
      expect(sentences[2]).toBe('Version 2.0 is ready.');
    });

    it('should handle URLs correctly', () => {
      const chunk = 'Visit https://example.com. Check the docs at https://docs.example.com/api. Done!';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      const sentences = formatted.split('\n\n').filter(s => s);
      expect(sentences).toHaveLength(3);
      expect(sentences[0]).toContain('https://example.com.');
      expect(sentences[1]).toContain('https://docs.example.com/api.');
    });

    it('should handle email addresses', () => {
      const chunk = 'Contact support@example.com. Send feedback to feedback@test.io. Thanks!';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      const sentences = formatted.split('\n\n').filter(s => s);
      expect(sentences).toHaveLength(3);
      expect(sentences[0]).toContain('support@example.com.');
    });

    it('should handle file paths', () => {
      const chunk = 'Edit ./config.json. Check /usr/local/bin. Run C:\\Program Files\\app.exe. Done.';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      const sentences = formatted.split('\n\n').filter(s => s);
      expect(sentences).toHaveLength(4);
      expect(sentences[0]).toBe('Edit ./config.json.');
    });

    it('should handle mixed content with various abbreviations', () => {
      const chunk = 'Prof. Brown from the U.S.A. arrived at 9 a.m. on Jan. 15th. He works for Tech Corp. and has a Ph.D. in CS.';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      // Should correctly split into two sentences while preserving abbreviations
      const sentences = formatted.split('\n\n').filter(s => s);
      expect(sentences).toHaveLength(2);
      expect(sentences[0]).toBe('Prof. Brown from the U.S.A. arrived at 9 a.m. on Jan. 15th.');
      expect(sentences[1]).toBe('He works for Tech Corp. and has a Ph.D. in CS.');
    });

    it('should handle code snippets with dots', () => {
      const chunk = 'Run npm install. Execute console.log("test"). Call object.method(). Done!';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      const sentences = formatted.split('\n\n').filter(s => s);
      expect(sentences).toHaveLength(4);
      expect(sentences[0]).toBe('Run npm install.');
      expect(sentences[1]).toBe('Execute console.log("test").');
    });

    it('should respect environment variable to disable formatting', () => {
      process.env.AUTOAGENT_DISABLE_GEMINI_FORMATTING = 'true';
      
      const chunk = 'First sentence. Second sentence. Third sentence.';
      const formatted = StreamFormatter.formatGeminiOutput(chunk);
      
      // Should return unchanged
      expect(formatted).toBe(chunk);
      
      delete process.env.AUTOAGENT_DISABLE_GEMINI_FORMATTING;
    });

    it('should respect custom buffer size from environment', () => {
      process.env.AUTOAGENT_GEMINI_BUFFER_SIZE = '100';
      
      // Create a string that's over 100 characters without sentence endings
      const longChunk = 'A'.repeat(101);
      const formatted = StreamFormatter.formatGeminiOutput(longChunk);
      
      expect(formatted).toBe(longChunk);
      expect(formatted.length).toBe(101);
      
      delete process.env.AUTOAGENT_GEMINI_BUFFER_SIZE;
    });
  });

  describe('Performance', () => {
    it('should process 1KB of text in under 1ms', () => {
      const text = 'This is a test sentence. '.repeat(40); // ~1KB
      
      // Warm up the formatter
      StreamFormatter.formatGeminiOutput('Warmup.');
      StreamFormatter.flushGeminiBuffer();
      
      // Measure performance
      const iterations = 100;
      const start = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        StreamFormatter.formatGeminiOutput(text);
        StreamFormatter.flushGeminiBuffer();
      }
      
      const end = performance.now();
      const avgTime = (end - start) / iterations;
      
      expect(avgTime).toBeLessThan(1);
    });

    it('should handle rapid chunk processing', () => {
      const chunks = [
        'First chunk. ',
        'Second chunk! ',
        'Third chunk? ',
        'Fourth chunk. ',
        'Fifth chunk! '
      ];
      
      const start = performance.now();
      chunks.forEach(chunk => StreamFormatter.formatGeminiOutput(chunk));
      const end = performance.now();
      
      // Should process all chunks quickly
      expect(end - start).toBeLessThan(5);
    });

    it('should efficiently handle text with many abbreviations', () => {
      const text = 'Dr. Smith from Inc. Corp. met Mr. Jones Ph.D. at 3 p.m. on Jan. 1st. '.repeat(20);
      
      const start = performance.now();
      StreamFormatter.formatGeminiOutput(text);
      const end = performance.now();
      
      expect(end - start).toBeLessThan(5);
    });
  });

  describe('Accuracy', () => {
    it('should have >95% accuracy for sentence boundary detection', () => {
      const testCases = [
        { input: 'Hello world. How are you?', expected: 2 },
        { input: 'Dr. Smith arrived. He was late.', expected: 2 },
        { input: 'The price is $10.50. Not bad!', expected: 2 },
        { input: 'Visit https://example.com. Thanks.', expected: 2 },
        { input: 'Email me at test@example.com. I\'ll reply.', expected: 2 },
        { input: 'Edit ./config.json. Save it.', expected: 2 },
        { input: 'She said "Hello." He replied "Hi!"', expected: 2 },
        { input: 'API calls use HTTP. SQL queries run fast.', expected: 2 },
        { input: 'Meeting at 3:30 p.m. today. Don\'t be late!', expected: 2 },
        { input: 'Version 1.0 released. Update now!', expected: 2 }
      ];
      
      let correct = 0;
      
      for (const testCase of testCases) {
        StreamFormatter.flushGeminiBuffer();
        const formatted = StreamFormatter.formatGeminiOutput(testCase.input);
        const sentences = formatted.split('\n\n').filter(s => s.trim());
        
        if (sentences.length === testCase.expected) {
          correct++;
        }
      }
      
      const accuracy = (correct / testCases.length) * 100;
      expect(accuracy).toBeGreaterThanOrEqual(95);
    });
  });
});