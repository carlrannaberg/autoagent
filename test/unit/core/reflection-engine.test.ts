import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  shouldSkipReflection, 
  reflectOnIssuesAndPlans, 
  reflectiveDecomposition 
} from '../../../src/core/reflection-engine.js';
import { Provider } from '../../../src/providers/Provider.js';
import { Logger } from '../../../src/utils/logger.js';
import { ChangeType } from '../../../src/types/index.js';

vi.mock('../../../src/utils/logger.js');
vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    readFileSync: vi.fn().mockReturnValue('Mock file content')
  };
});

describe('reflection-engine', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('shouldSkipReflection', () => {
    const mockResult = {
      specFile: 'test-spec.md',
      specContent: 'Test spec content',
      issueFiles: ['issue-1.md', 'issue-2.md'],
      planFiles: ['plan-1.md'],
      issueCount: 2,
      totalWordCount: 600
    };

    it('should skip when reflection is disabled', () => {
      const config = {
        enabled: false,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      };

      const result = shouldSkipReflection(mockResult, config);
      expect(result.skip).toBe(true);
      expect(result.reason).toBe('Reflection is disabled');
    });

    it('should skip for simple specs when configured', () => {
      const config = {
        enabled: true,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      };

      const simpleResult = { ...mockResult, totalWordCount: 400 };
      const result = shouldSkipReflection(simpleResult, config);
      expect(result.skip).toBe(true);
      expect(result.reason).toBe('Skipping reflection for simple spec (< 500 words)');
    });

    it('should not skip for complex specs', () => {
      const config = {
        enabled: true,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      };

      const result = shouldSkipReflection(mockResult, config);
      expect(result.skip).toBe(false);
      expect(result.reason).toBeUndefined();
    });

    it('should skip when no issues were generated', () => {
      const config = {
        enabled: true,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: false
      };

      const noIssuesResult = { ...mockResult, issueCount: 0 };
      const result = shouldSkipReflection(noIssuesResult, config);
      expect(result.skip).toBe(true);
      expect(result.reason).toBe('No issues were generated');
    });
  });

  describe('reflectOnIssuesAndPlans', () => {
    const mockProvider = {
      name: 'test-provider',
      checkAvailability: vi.fn().mockResolvedValue(true),
      execute: vi.fn(),
      chat: vi.fn()
    } as unknown as Provider;

    it('should analyze issues and plans successfully', async () => {
      const mockResponse = JSON.stringify({
        improvementScore: 0.7,
        identifiedGaps: [
          {
            type: 'dependency',
            description: 'Missing dependency between issue 1 and 2',
            relatedIssues: ['1', '2']
          }
        ],
        recommendedChanges: [
          {
            type: 'MODIFY_ISSUE',
            target: 'issue-1',
            description: 'Add dependency reference',
            content: 'Dependencies: Issue 2',
            rationale: 'Ensures proper execution order'
          }
        ],
        reasoning: 'Dependencies need to be made explicit'
      });

      vi.mocked(mockProvider.chat).mockResolvedValue(mockResponse);

      const analysis = await reflectOnIssuesAndPlans(
        mockProvider,
        'Test spec',
        'Current issues and plans',
        1
      );

      expect(analysis.score).toBe(0.7);
      expect(analysis.gaps).toHaveLength(1);
      expect(analysis.changes).toHaveLength(1);
      expect(analysis.changes[0].type).toBe(ChangeType.MODIFY_ISSUE);
      expect(analysis.iterationNumber).toBe(1);
    });

    it('should handle invalid response gracefully', async () => {
      vi.mocked(mockProvider.chat).mockResolvedValue('Invalid JSON response');

      const analysis = await reflectOnIssuesAndPlans(
        mockProvider,
        'Test spec',
        'Current issues and plans',
        1
      );

      expect(analysis.score).toBe(0);
      expect(analysis.gaps).toEqual([]);
      expect(analysis.changes).toEqual([]);
      expect(analysis.reasoning).toBe('Reflection analysis failed');
    });

    it('should handle provider errors', async () => {
      vi.mocked(mockProvider.chat).mockRejectedValue(new Error('Provider error'));

      const analysis = await reflectOnIssuesAndPlans(
        mockProvider,
        'Test spec',
        'Current issues and plans',
        1
      );

      expect(analysis.score).toBe(0);
      expect(analysis.reasoning).toBe('Reflection analysis failed');
      expect(Logger.error).toHaveBeenCalledWith('Reflection analysis failed: Provider error');
    });
  });

  describe('reflectiveDecomposition', () => {
    const mockProvider = {
      name: 'test-provider',
      checkAvailability: vi.fn().mockResolvedValue(true),
      execute: vi.fn(),
      chat: vi.fn()
    } as unknown as Provider;

    const mockResult = {
      specFile: 'test-spec.md',
      specContent: 'Test spec content',
      issueFiles: ['issue-1.md', 'issue-2.md'],
      planFiles: ['plan-1.md'],
      issueCount: 2,
      totalWordCount: 600
    };

    const mockConfig = {
      providers: [{
        name: 'test',
        apiKey: 'test-key'
      }],
      reflection: {
        enabled: true,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      }
    };

    it('should perform iterative reflection', async () => {
      const responses = [
        { improvementScore: 0.6, recommendedChanges: [{ type: 'ADD_ISSUE' }] },
        { improvementScore: 0.3, recommendedChanges: [{ type: 'MODIFY_ISSUE' }] },
        { improvementScore: 0.05, recommendedChanges: [] }
      ];

      let callCount = 0;
      vi.mocked(mockProvider.chat).mockImplementation(() => {
        return Promise.resolve(JSON.stringify(responses[callCount++]));
      });

      const result = await reflectiveDecomposition(mockProvider, mockResult, mockConfig);

      expect(result.enabled).toBe(true);
      expect(result.performedIterations).toBe(3);
      expect(result.totalImprovements).toBe(2);
      expect(result.finalScore).toBe(0.05);
      expect(result.improvements).toHaveLength(3);
    });

    it('should terminate early when improvement threshold is met', async () => {
      vi.mocked(mockProvider.chat).mockResolvedValue(JSON.stringify({
        improvementScore: 0.05,
        recommendedChanges: []
      }));

      const result = await reflectiveDecomposition(mockProvider, mockResult, mockConfig);

      expect(result.performedIterations).toBe(1);
      expect(result.finalScore).toBe(0.05);
      expect(mockProvider.chat).toHaveBeenCalledTimes(1);
    });

    it('should handle reflection failures gracefully', async () => {
      vi.mocked(mockProvider.chat).mockRejectedValue(new Error('Provider error'));

      const result = await reflectiveDecomposition(mockProvider, mockResult, mockConfig);

      expect(result.enabled).toBe(true);
      expect(result.performedIterations).toBe(1);
      expect(result.totalImprovements).toBe(0);
    });

    it('should skip reflection when disabled', async () => {
      const disabledConfig = {
        ...mockConfig,
        reflection: {
          ...mockConfig.reflection,
          enabled: false
        }
      };

      const result = await reflectiveDecomposition(mockProvider, mockResult, disabledConfig);

      expect(result.enabled).toBe(false);
      expect(result.performedIterations).toBe(0);
      expect(result.skippedReason).toBe('Reflection is disabled');
      expect(mockProvider.chat).not.toHaveBeenCalled();
    });
  });

  describe('Prompt building and response parsing', () => {
    const mockProvider = {
      name: 'test-provider',
      checkAvailability: vi.fn().mockResolvedValue(true),
      execute: vi.fn(),
      chat: vi.fn()
    } as unknown as Provider;

    it('should handle responses with missing fields gracefully', async () => {
      const incompleteResponse = JSON.stringify({
        improvementScore: 0.5
        // Missing other fields
      });

      vi.mocked(mockProvider.chat).mockResolvedValue(incompleteResponse);

      const analysis = await reflectOnIssuesAndPlans(
        mockProvider,
        'Test spec',
        'Current issues and plans',
        1
      );

      expect(analysis.score).toBe(0.5);
      expect(analysis.gaps).toEqual([]);
      expect(analysis.changes).toEqual([]);
      expect(analysis.reasoning).toBe('');
    });

    it('should handle response wrapped in markdown code blocks', async () => {
      const wrappedResponse = '```json\n' + JSON.stringify({
        improvementScore: 0.6,
        recommendedChanges: []
      }) + '\n```';

      vi.mocked(mockProvider.chat).mockResolvedValue(wrappedResponse);

      const analysis = await reflectOnIssuesAndPlans(
        mockProvider,
        'Test spec',
        'Current issues and plans',
        1
      );

      expect(analysis.score).toBe(0.6);
    });

    it('should clamp improvement scores to valid range', async () => {
      const outOfRangeResponse = JSON.stringify({
        improvementScore: 1.5, // Out of range
        recommendedChanges: []
      });

      vi.mocked(mockProvider.chat).mockResolvedValue(outOfRangeResponse);

      const analysis = await reflectOnIssuesAndPlans(
        mockProvider,
        'Test spec',
        'Current issues and plans',
        1
      );

      expect(analysis.score).toBe(1.0); // Should be clamped to max
    });

    it('should handle negative improvement scores', async () => {
      const negativeScoreResponse = JSON.stringify({
        improvementScore: -0.5,
        recommendedChanges: []
      });

      vi.mocked(mockProvider.chat).mockResolvedValue(negativeScoreResponse);

      const analysis = await reflectOnIssuesAndPlans(
        mockProvider,
        'Test spec',
        'Current issues and plans',
        1
      );

      expect(analysis.score).toBe(0.0); // Should be clamped to min
    });

    it('should handle all change types correctly', async () => {
      const allTypesResponse = JSON.stringify({
        improvementScore: 0.7,
        recommendedChanges: [
          {
            type: 'ADD_ISSUE',
            target: '10-new-issue.md',
            description: 'Add new issue',
            content: 'New issue content',
            rationale: 'Missing coverage'
          },
          {
            type: 'MODIFY_PLAN',
            target: 'plan-for-issue-5.md',
            description: 'Update plan',
            content: 'Updated plan content',
            rationale: 'Needs clarification'
          },
          {
            type: 'ADD_DEPENDENCY',
            target: '3-existing-issue.md',
            description: 'Add dependency',
            content: 'Dependencies: Issue 4',
            rationale: 'Proper ordering'
          }
        ]
      });

      vi.mocked(mockProvider.chat).mockResolvedValue(allTypesResponse);

      const analysis = await reflectOnIssuesAndPlans(
        mockProvider,
        'Test spec',
        'Current issues and plans',
        1
      );

      expect(analysis.changes).toHaveLength(3);
      expect(analysis.changes[0].type).toBe(ChangeType.ADD_ISSUE);
      expect(analysis.changes[1].type).toBe(ChangeType.MODIFY_PLAN);
      expect(analysis.changes[2].type).toBe(ChangeType.ADD_DEPENDENCY);
    });
  });

  describe('Edge cases and error scenarios', () => {
    const mockProvider = {
      name: 'test-provider',
      checkAvailability: vi.fn().mockResolvedValue(true),
      execute: vi.fn(),
      chat: vi.fn()
    } as unknown as Provider;

    const mockResult = {
      specFile: 'test-spec.md',
      specContent: 'Test spec content',
      issueFiles: ['issue-1.md'],
      planFiles: [],
      issueCount: 1,
      totalWordCount: 100
    };

    const mockConfig = {
      providers: [{
        name: 'test',
        apiKey: 'test-key'
      }],
      reflection: {
        enabled: true,
        maxIterations: 5,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      }
    };

    it('should handle empty spec content', async () => {
      const emptySpecResult = { ...mockResult, specContent: '', totalWordCount: 600 };

      vi.mocked(mockProvider.chat).mockResolvedValue(JSON.stringify({
        improvementScore: 0.0,
        recommendedChanges: []
      }));

      const result = await reflectiveDecomposition(mockProvider, emptySpecResult, mockConfig);

      expect(result.enabled).toBe(true);
      expect(result.performedIterations).toBe(1);
    });

    it('should handle very large number of issues', async () => {
      const manyIssuesResult = {
        ...mockResult,
        issueFiles: Array(100).fill(0).map((_, i) => `issue-${i}.md`),
        issueCount: 100,
        totalWordCount: 600
      };

      vi.mocked(mockProvider.chat).mockResolvedValue(JSON.stringify({
        improvementScore: 0.0,
        recommendedChanges: []
      }));

      const result = await reflectiveDecomposition(mockProvider, manyIssuesResult, mockConfig);

      expect(result.enabled).toBe(true);
      expect(mockProvider.chat).toHaveBeenCalled();
    });

    it('should handle provider timeout gracefully', async () => {
      const timeoutResult = { ...mockResult, totalWordCount: 600 };
      vi.mocked(mockProvider.chat).mockRejectedValue(new Error('Request timeout'));

      const result = await reflectiveDecomposition(mockProvider, timeoutResult, mockConfig);

      expect(result.enabled).toBe(true);
      expect(result.performedIterations).toBe(1);
      expect(result.totalImprovements).toBe(0);
      expect(Logger.error).toHaveBeenCalledWith(expect.stringContaining('Request timeout'));
    });

    it('should handle config with zero improvement threshold', async () => {
      const zeroThresholdConfig = {
        ...mockConfig,
        reflection: {
          ...mockConfig.reflection,
          improvementThreshold: 0
        }
      };

      const thresholdResult = { ...mockResult, totalWordCount: 600 };

      vi.mocked(mockProvider.chat).mockResolvedValue(JSON.stringify({
        improvementScore: 0.0,
        recommendedChanges: []
      }));

      const result = await reflectiveDecomposition(mockProvider, thresholdResult, zeroThresholdConfig);

      // With threshold 0, any score including 0 terminates the loop
      expect(result.performedIterations).toBe(1);
      expect(result.finalScore).toBe(0);
    });

    it('should continue iterations even with errors in between', async () => {
      const errorResult = { ...mockResult, totalWordCount: 600 };
      const responses = [
        Promise.resolve(JSON.stringify({ improvementScore: 0.6, recommendedChanges: [] })),
        Promise.reject(new Error('Network error'))
      ];

      let callCount = 0;
      vi.mocked(mockProvider.chat).mockImplementation(() => {
        const response = responses[callCount];
        callCount++;
        return response as Promise<string>;
      });

      const result = await reflectiveDecomposition(mockProvider, errorResult, mockConfig);

      // Should stop after error
      expect(result.performedIterations).toBe(2);
      expect(result.improvements).toHaveLength(1); // Only successful improvement
    });
  });

  describe('getCurrentIssuesAndPlansContent internal function behavior', () => {
    const mockProvider = {
      name: 'test-provider',
      checkAvailability: vi.fn().mockResolvedValue(true),
      execute: vi.fn(),
      chat: vi.fn()
    } as unknown as Provider;

    it('should format content correctly in prompt', async () => {
      const mockResult = {
        specFile: 'test-spec.md',
        specContent: 'Test specification',
        issueFiles: ['1-first-issue.md', '2-second-issue.md'],
        planFiles: ['plan-for-issue-1.md'],
        issueCount: 2,
        totalWordCount: 600
      };

      const mockResponse = JSON.stringify({
        improvementScore: 0.05,
        recommendedChanges: []
      });

      vi.mocked(mockProvider.chat).mockResolvedValue(mockResponse);

      await reflectOnIssuesAndPlans(
        mockProvider,
        mockResult.specContent,
        'Mock formatted content',
        1
      );

      expect(mockProvider.chat).toHaveBeenCalledWith(
        expect.stringContaining('Test specification')
      );
      expect(mockProvider.chat).toHaveBeenCalledWith(
        expect.stringContaining('Mock formatted content')
      );
      expect(mockProvider.chat).toHaveBeenCalledWith(
        expect.stringContaining('Reflection Instructions (Iteration 1)')
      );
    });
  });
});