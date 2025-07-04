import { describe, it, expect, beforeEach } from 'vitest';
import { PatternAnalyzer } from '@/core/pattern-analyzer';

describe('PatternAnalyzer', () => {
  let analyzer: PatternAnalyzer;

  beforeEach(() => {
    analyzer = new PatternAnalyzer();
  });

  describe('pattern detection', () => {
    it('should detect high success rate pattern', () => {
      // Add 10 successful executions
      for (let i = 1; i <= 10; i++) {
        analyzer.addExecution({
          success: true,
          issueNumber: i,
          duration: 30000
        });
      }

      const patterns = analyzer.getPatterns();
      const successPattern = patterns.find(p => p.name === 'high-success-rate');
      
      expect(successPattern).toBeDefined();
      expect(successPattern?.confidence).toBe(1);
      expect(successPattern?.occurrences).toBe(10);
    });

    it('should detect high failure rate pattern', () => {
      // Add executions with 60% failure rate
      for (let i = 1; i <= 10; i++) {
        analyzer.addExecution({
          success: i > 6, // 6 failures, 4 successes
          issueNumber: i,
          duration: 30000,
          error: i <= 6 ? 'Test error' : undefined
        });
      }

      const patterns = analyzer.getPatterns();
      const failurePattern = patterns.find(p => p.name === 'high-failure-rate');
      
      expect(failurePattern).toBeDefined();
      expect(failurePattern?.occurrences).toBe(6);
    });

    it('should detect rate limit errors', () => {
      // Add multiple rate limit errors
      for (let i = 1; i <= 5; i++) {
        analyzer.addExecution({
          success: false,
          issueNumber: i,
          duration: 10000,
          error: 'Rate limit exceeded'
        });
      }

      const patterns = analyzer.getPatterns();
      const rateLimitPattern = patterns.find(p => p.name === 'frequent-rate-limit');
      
      expect(rateLimitPattern).toBeDefined();
      expect(rateLimitPattern?.occurrences).toBe(5);
    });

    it('should detect file type patterns', () => {
      // Add executions modifying TypeScript files
      for (let i = 1; i <= 5; i++) {
        analyzer.addExecution({
          success: true,
          issueNumber: i,
          duration: 30000,
          filesModified: [
            `src/file${i}.ts`,
            `src/component${i}.tsx`,
            `test/file${i}.spec.ts`
          ]
        });
      }

      const patterns = analyzer.getPatterns();
      const tsPattern = patterns.find(p => p.name === 'frequent-ts-changes');
      
      expect(tsPattern).toBeDefined();
      expect(tsPattern?.confidence).toBeGreaterThan(0.3);
    });

    it('should detect fast execution pattern', () => {
      // Add consistently fast executions
      for (let i = 1; i <= 10; i++) {
        analyzer.addExecution({
          success: true,
          issueNumber: i,
          duration: 20000 + (i * 100) // 20-21 seconds
        });
      }

      const patterns = analyzer.getPatterns();
      const fastPattern = patterns.find(p => p.name === 'fast-execution');
      
      expect(fastPattern).toBeDefined();
    });

    it('should detect provider-specific patterns', () => {
      // Add executions heavily using Claude
      for (let i = 1; i <= 10; i++) {
        analyzer.addExecution({
          success: i > 2, // 80% success rate
          issueNumber: i,
          duration: 30000,
          provider: 'claude'
        });
      }

      // Add a few Gemini executions
      analyzer.addExecution({
        success: true,
        issueNumber: 11,
        duration: 40000,
        provider: 'gemini'
      });

      const patterns = analyzer.getPatterns();
      const claudeDominant = patterns.find(p => p.name === 'claude-dominant');
      
      expect(claudeDominant).toBeDefined();
      expect(claudeDominant?.confidence).toBeGreaterThan(0.8);
    });
  });

  describe('recommendations', () => {
    it('should provide recommendations for high failure rate', () => {
      // Create high failure rate scenario
      for (let i = 1; i <= 10; i++) {
        analyzer.addExecution({
          success: i > 6, // 60% failure rate
          issueNumber: i,
          duration: 30000,
          error: i <= 6 ? 'Test error' : undefined
        });
      }

      const recommendations = analyzer.getRecommendations();
      
      expect(recommendations).toContain('Consider reviewing error logs and adjusting AGENT.md instructions');
    });

    it('should provide recommendations for rate limits', () => {
      // Create rate limit scenario
      for (let i = 1; i <= 5; i++) {
        analyzer.addExecution({
          success: false,
          issueNumber: i,
          duration: 5000,
          error: 'Rate limit exceeded'
        });
      }

      const recommendations = analyzer.getRecommendations();
      
      expect(recommendations).toContain('Implement better rate limit handling or increase delay between requests');
    });

    it('should acknowledge good testing practices', () => {
      // Create test-focused scenario
      for (let i = 1; i <= 5; i++) {
        analyzer.addExecution({
          success: true,
          issueNumber: i,
          duration: 30000,
          filesModified: [
            `src/file${i}.ts`,
            `test/file${i}.test.ts`,
            `test/integration${i}.spec.ts`
          ]
        });
      }

      const recommendations = analyzer.getRecommendations();
      
      expect(recommendations).toContain('Good testing practices detected - maintain this pattern');
    });
  });

  describe('clear', () => {
    it('should clear all history and patterns', () => {
      // Add some data
      analyzer.addExecution({
        success: true,
        issueNumber: 1,
        duration: 30000
      });

      expect(analyzer.getPatterns().length).toBeGreaterThan(0);

      // Clear
      analyzer.clear();

      expect(analyzer.getPatterns().length).toBe(0);
    });
  });
});