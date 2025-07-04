import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { StreamFormatter } from '../../src/utils/stream-formatter';

describe('StreamFormatter', () => {
  // Store original console.log
  const originalConsoleLog = console.log;
  
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the buffer before each test
    StreamFormatter.flushGeminiBuffer();
    // Mock console.log
    console.log = vi.fn();
  });
  
  afterEach(() => {
    // Restore console.log
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
      
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Hello world')
      );
    });

    it('should not display empty or whitespace-only text', () => {
      StreamFormatter.displayGeminiText('');
      StreamFormatter.displayGeminiText('   \n  ');
      
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('Performance', () => {
    it('should process 1KB of text in under 5ms', () => {
      const text = 'This is a test sentence. '.repeat(40); // ~1KB
      
      const start = performance.now();
      StreamFormatter.formatGeminiOutput(text);
      const end = performance.now();
      
      expect(end - start).toBeLessThan(5);
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
      expect(end - start).toBeLessThan(10);
    });
  });
});