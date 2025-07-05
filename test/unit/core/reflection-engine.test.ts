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
});