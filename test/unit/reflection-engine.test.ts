import { describe, it, expect } from 'vitest';
import { reflectOnIssuesAndPlans, shouldSkipReflection, reflectiveDecomposition } from '../../src/core/reflection-engine';
import { TestProviderMock } from '../integration/reflection/helpers/test-provider-mock';

describe('Reflection Engine Unit Tests', () => {
  describe('shouldSkipReflection', () => {
    it('should skip when reflection is disabled', () => {
      const result = {
        specFile: 'test.md',
        specContent: 'Test content',
        issueFiles: ['issue1.md'],
        planFiles: ['plan1.md'],
        issueCount: 1,
        totalWordCount: 1000
      };
      
      const config = {
        enabled: false,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      };
      
      const skipResult = shouldSkipReflection(result, config);
      expect(skipResult.skip).toBe(true);
      expect(skipResult.reason).toBe('Reflection is disabled');
    });

    it('should skip for simple specs when configured', () => {
      const result = {
        specFile: 'test.md',
        specContent: 'Test content',
        issueFiles: ['issue1.md'],
        planFiles: ['plan1.md'],
        issueCount: 1,
        totalWordCount: 400 // Less than 500 words
      };
      
      const config = {
        enabled: true,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      };
      
      const skipResult = shouldSkipReflection(result, config);
      expect(skipResult.skip).toBe(true);
      expect(skipResult.reason).toBe('Skipping reflection for simple spec (< 500 words)');
    });

    it('should not skip for complex specs', () => {
      const result = {
        specFile: 'test.md',
        specContent: 'Test content',
        issueFiles: ['issue1.md'],
        planFiles: ['plan1.md'],
        issueCount: 1,
        totalWordCount: 600 // More than 500 words
      };
      
      const config = {
        enabled: true,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      };
      
      const skipResult = shouldSkipReflection(result, config);
      expect(skipResult.skip).toBe(false);
    });

    it('should skip when no issues generated', () => {
      const result = {
        specFile: 'test.md',
        specContent: 'Test content',
        issueFiles: [],
        planFiles: [],
        issueCount: 0,
        totalWordCount: 1000
      };
      
      const config = {
        enabled: true,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: false
      };
      
      const skipResult = shouldSkipReflection(result, config);
      expect(skipResult.skip).toBe(true);
      expect(skipResult.reason).toBe('No issues were generated');
    });
  });

  describe('reflectOnIssuesAndPlans', () => {
    it('should parse valid reflection response', async () => {
      const providerMock = new TestProviderMock('test');
      
      const mockResponse = JSON.stringify({
        improvementScore: 0.7,
        identifiedGaps: [
          {
            type: 'security',
            description: 'Missing rate limiting',
            relatedIssues: ['1', '2']
          }
        ],
        recommendedChanges: [
          {
            type: 'ADD_ISSUE',
            target: 'rate-limiting.md',
            description: 'Add rate limiting',
            content: 'Rate limiting content',
            rationale: 'Security requirement'
          }
        ],
        reasoning: 'Security improvements needed'
      });
      
      providerMock.setCustomHandler(() => mockResponse);
      
      const analysis = await reflectOnIssuesAndPlans(
        providerMock,
        'Original spec content',
        'Current issues and plans',
        1
      );
      
      expect(analysis.score).toBe(0.7);
      expect(analysis.gaps).toHaveLength(1);
      expect(analysis.gaps[0].type).toBe('security');
      expect(analysis.changes).toHaveLength(1);
      expect(analysis.changes[0].type).toBe('ADD_ISSUE');
      expect(analysis.iterationNumber).toBe(1);
    });

    it('should handle invalid response gracefully', async () => {
      const providerMock = new TestProviderMock('test');
      
      providerMock.setCustomHandler(() => 'Invalid JSON response');
      
      const analysis = await reflectOnIssuesAndPlans(
        providerMock,
        'Original spec content',
        'Current issues and plans',
        1
      );
      
      expect(analysis.score).toBe(0);
      expect(analysis.gaps).toHaveLength(0);
      expect(analysis.changes).toHaveLength(0);
      expect(analysis.reasoning).toBe('Malformed response');
    });
  });

  describe('reflectiveDecomposition', () => {
    it('should perform multiple iterations until threshold', async () => {
      const providerMock = new TestProviderMock('test');
      
      let callCount = 0;
      const responses = [
        { improvementScore: 0.8, recommendedChanges: [{ type: 'ADD_ISSUE', target: 'test1.md', description: 'Test', content: 'Content', rationale: 'Test' }] },
        { improvementScore: 0.5, recommendedChanges: [{ type: 'ADD_ISSUE', target: 'test2.md', description: 'Test', content: 'Content', rationale: 'Test' }] },
        { improvementScore: 0.05, recommendedChanges: [] } // Below threshold
      ];
      
      providerMock.setCustomHandler(() => {
        return JSON.stringify(responses[callCount++]);
      });
      
      const initialResult = {
        specFile: 'test.md',
        specContent: 'Complex specification with many requirements and detailed technical considerations that exceed the word count threshold for reflection',
        issueFiles: ['issue1.md', 'issue2.md'],
        planFiles: ['plan1.md', 'plan2.md'],
        issueCount: 2,
        totalWordCount: 600
      };
      
      const config = {
        workspace: '/tmp',
        reflection: {
          enabled: true,
          maxIterations: 5,
          improvementThreshold: 0.1,
          skipForSimpleSpecs: false
        }
      };
      
      const result = await reflectiveDecomposition(providerMock, initialResult, config);
      
      expect(result.enabled).toBe(true);
      expect(result.performedIterations).toBe(3);
      expect(result.totalImprovements).toBe(2); // First two iterations had changes
      expect(result.finalScore).toBe(0.05);
      expect(result.improvements).toHaveLength(3);
    });

    it('should respect maximum iteration limit', async () => {
      const providerMock = new TestProviderMock('test');
      
      // Always return high score to test max iterations
      providerMock.setCustomHandler(() => {
        return JSON.stringify({
          improvementScore: 0.9,
          recommendedChanges: [{ type: 'ADD_ISSUE', target: 'test.md', description: 'Test', content: 'Content', rationale: 'Test' }],
          reasoning: 'Always needs improvement'
        });
      });
      
      const initialResult = {
        specFile: 'test.md',
        specContent: 'Complex specification with many requirements and detailed technical considerations that exceed the word count threshold for reflection',
        issueFiles: ['issue1.md'],
        planFiles: ['plan1.md'],
        issueCount: 1,
        totalWordCount: 600
      };
      
      const config = {
        workspace: '/tmp',
        reflection: {
          enabled: true,
          maxIterations: 2, // Low limit
          improvementThreshold: 0.1,
          skipForSimpleSpecs: false
        }
      };
      
      const result = await reflectiveDecomposition(providerMock, initialResult, config);
      
      expect(result.enabled).toBe(true);
      expect(result.performedIterations).toBe(2); // Should stop at max
      expect(result.finalScore).toBe(0.9);
    });

    it('should skip reflection for simple specs', async () => {
      const providerMock = new TestProviderMock('test');
      
      const initialResult = {
        specFile: 'test.md',
        specContent: 'Simple short spec',
        issueFiles: ['issue1.md'],
        planFiles: ['plan1.md'],
        issueCount: 1,
        totalWordCount: 50 // Very short
      };
      
      const config = {
        workspace: '/tmp',
        reflection: {
          enabled: true,
          maxIterations: 3,
          improvementThreshold: 0.1,
          skipForSimpleSpecs: true
        }
      };
      
      const result = await reflectiveDecomposition(providerMock, initialResult, config);
      
      expect(result.enabled).toBe(false);
      expect(result.performedIterations).toBe(0);
      expect(result.skippedReason).toContain('simple spec');
    });
  });
});