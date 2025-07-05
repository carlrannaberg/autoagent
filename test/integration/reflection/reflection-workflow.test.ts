import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reflectiveDecomposition } from '../../../src/core/reflection-engine.js';
import { Provider } from '../../../src/providers/Provider.js';
import { AgentConfig, ChangeType } from '../../../src/types/index.js';

describe('Reflection Engine Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockProvider = (name: string = 'test-provider'): Provider => ({
    name,
    checkAvailability: vi.fn().mockResolvedValue(true),
    execute: vi.fn(),
    chat: vi.fn()
  } as unknown as Provider);

  const createDecompositionResult = (overrides = {}) => ({
    specFile: 'test-spec.md',
    specContent: 'Test specification content with detailed requirements',
    issueFiles: ['1-feature.md', '2-bug-fix.md', '3-enhancement.md'],
    planFiles: ['plan-for-issue-1.md', 'plan-for-issue-2.md'],
    issueCount: 3,
    totalWordCount: 750,
    ...overrides
  });

  const createConfig = (reflectionOverrides = {}): AgentConfig => ({
    providers: [{ name: 'test', apiKey: 'test-key' }],
    reflection: {
      enabled: true,
      maxIterations: 3,
      improvementThreshold: 0.1,
      skipForSimpleSpecs: true,
      ...reflectionOverrides
    }
  } as AgentConfig);

  describe('Complete reflection workflow', () => {
    it('should perform multiple reflection iterations with improvements', async () => {
      const provider = createMockProvider();
      const result = createDecompositionResult();
      const config = createConfig();

      // Simulate gradual improvement across iterations
      const iterations = [
        {
          improvementScore: 0.8,
          identifiedGaps: [
            {
              type: 'dependency',
              description: 'Missing dependency between feature and bug fix',
              relatedIssues: ['1', '2']
            },
            {
              type: 'scope',
              description: 'Security considerations not addressed',
              relatedIssues: ['3']
            }
          ],
          recommendedChanges: [
            {
              type: 'ADD_DEPENDENCY',
              target: '1-feature.md',
              description: 'Add dependency on bug fix',
              content: 'Dependencies: Issue 2',
              rationale: 'Feature requires bug to be fixed first'
            },
            {
              type: 'ADD_ISSUE',
              target: '4-security-review.md',
              description: 'Add security review issue',
              content: '# Security Review\n\n## Requirements\nPerform security audit',
              rationale: 'Critical security aspects missing'
            }
          ],
          reasoning: 'Major gaps identified in dependencies and security'
        },
        {
          improvementScore: 0.4,
          identifiedGaps: [
            {
              type: 'detail',
              description: 'Acceptance criteria lack specificity',
              relatedIssues: ['1', '3']
            }
          ],
          recommendedChanges: [
            {
              type: 'MODIFY_ISSUE',
              target: '1-feature.md',
              description: 'Add detailed acceptance criteria',
              content: '## Acceptance Criteria\n- [ ] Unit tests pass\n- [ ] Integration verified',
              rationale: 'More specific criteria needed for validation'
            }
          ],
          reasoning: 'Minor improvements needed for clarity'
        },
        {
          improvementScore: 0.05,
          identifiedGaps: [],
          recommendedChanges: [],
          reasoning: 'Decomposition is now comprehensive and well-structured'
        }
      ];

      let callCount = 0;
      vi.mocked(provider.chat).mockImplementation(() => {
        return Promise.resolve(JSON.stringify(iterations[callCount++]));
      });

      const reflectionResult = await reflectiveDecomposition(provider, result, config);

      expect(reflectionResult.enabled).toBe(true);
      expect(reflectionResult.performedIterations).toBe(3);
      expect(reflectionResult.totalImprovements).toBe(3); // 2 + 1 + 0
      expect(reflectionResult.finalScore).toBe(0.05);
      expect(reflectionResult.improvements).toHaveLength(3);

      // Verify each iteration
      expect(reflectionResult.improvements![0].score).toBe(0.8);
      expect(reflectionResult.improvements![0].changes).toHaveLength(2);
      expect(reflectionResult.improvements![1].score).toBe(0.4);
      expect(reflectionResult.improvements![1].changes).toHaveLength(1);
      expect(reflectionResult.improvements![2].score).toBe(0.05);
      expect(reflectionResult.improvements![2].changes).toHaveLength(0);
    });

    it('should handle provider switching during reflection', async () => {
      const primaryProvider = createMockProvider('primary');
      const result = createDecompositionResult();
      const config = createConfig();

      // Simulate provider failure on second iteration
      let callCount = 0;
      vi.mocked(primaryProvider.chat).mockImplementation(() => {
        callCount++;
        if (callCount === 2) {
          return Promise.reject(new Error('Rate limit exceeded'));
        }
        return Promise.resolve(JSON.stringify({
          improvementScore: callCount === 1 ? 0.6 : 0.08,
          recommendedChanges: []
        }));
      });

      const reflectionResult = await reflectiveDecomposition(primaryProvider, result, config);

      expect(reflectionResult.performedIterations).toBe(1); // Should stop after error
      expect(reflectionResult.improvements).toHaveLength(1); // Only successful iteration
    });

    it('should respect configuration limits', async () => {
      const provider = createMockProvider();
      const result = createDecompositionResult();
      const config = createConfig({ maxIterations: 2 });

      // Always return high improvement score
      vi.mocked(provider.chat).mockResolvedValue(JSON.stringify({
        improvementScore: 0.9,
        recommendedChanges: [{
          type: 'ADD_ISSUE',
          target: 'new-issue.md',
          description: 'Add issue',
          content: 'Content',
          rationale: 'Needed'
        }]
      }));

      const reflectionResult = await reflectiveDecomposition(provider, result, config);

      expect(reflectionResult.performedIterations).toBe(2); // Limited by config
      expect(provider.chat).toHaveBeenCalledTimes(2);
    });

    it('should skip reflection for simple specs when configured', async () => {
      const provider = createMockProvider();
      const simpleResult = createDecompositionResult({
        totalWordCount: 300 // Below threshold
      });
      const config = createConfig({ skipForSimpleSpecs: true });

      const reflectionResult = await reflectiveDecomposition(provider, simpleResult, config);

      expect(reflectionResult.enabled).toBe(false);
      expect(reflectionResult.skippedReason).toContain('simple spec');
      expect(provider.chat).not.toHaveBeenCalled();
    });

    it('should handle complex improvement scenarios', async () => {
      const provider = createMockProvider();
      const result = createDecompositionResult();
      const config = createConfig();

      const complexResponse = {
        improvementScore: 0.7,
        identifiedGaps: [
          {
            type: 'architecture',
            description: 'Missing architectural decisions',
            relatedIssues: ['1', '2', '3']
          },
          {
            type: 'testing',
            description: 'Insufficient test coverage planning',
            relatedIssues: ['1', '2']
          },
          {
            type: 'performance',
            description: 'No performance requirements specified',
            relatedIssues: ['3']
          }
        ],
        recommendedChanges: [
          {
            type: 'ADD_PLAN',
            target: 'plan-for-issue-3.md',
            description: 'Add comprehensive plan for enhancement',
            content: '# Enhancement Plan\n\n## Architecture\n...\n## Performance\n...',
            rationale: 'Enhancement needs detailed planning'
          },
          {
            type: 'MODIFY_ISSUE',
            target: '1-feature.md',
            description: 'Add architectural context',
            content: '## Architecture\nThis feature follows microservice pattern...',
            rationale: 'Architecture decisions must be documented'
          },
          {
            type: 'MODIFY_ISSUE',
            target: '2-bug-fix.md',
            description: 'Add test scenarios',
            content: '## Test Scenarios\n1. Regression test\n2. Edge cases',
            rationale: 'Testing strategy required'
          }
        ],
        reasoning: 'Significant architectural and testing gaps need addressing'
      };

      vi.mocked(provider.chat).mockResolvedValueOnce(JSON.stringify(complexResponse))
        .mockResolvedValueOnce(JSON.stringify({
          improvementScore: 0.09,
          recommendedChanges: [],
          reasoning: 'All major gaps addressed'
        }));

      const reflectionResult = await reflectiveDecomposition(provider, result, config);

      expect(reflectionResult.performedIterations).toBe(2);
      expect(reflectionResult.totalImprovements).toBe(3);
      expect(reflectionResult.improvements![0].gaps).toHaveLength(3);
      expect(reflectionResult.improvements![0].changes).toHaveLength(3);
      
      // Verify change types distribution
      const changeTypes = reflectionResult.improvements![0].changes.map(c => c.type);
      expect(changeTypes).toContain(ChangeType.ADD_PLAN);
      expect(changeTypes).toContain(ChangeType.MODIFY_ISSUE);
    });

    it('should handle edge case with exactly threshold score', async () => {
      const provider = createMockProvider();
      const result = createDecompositionResult();
      const config = createConfig({ improvementThreshold: 0.1 });

      vi.mocked(provider.chat).mockResolvedValue(JSON.stringify({
        improvementScore: 0.1, // Exactly at threshold
        recommendedChanges: []
      }));

      const reflectionResult = await reflectiveDecomposition(provider, result, config);

      expect(reflectionResult.performedIterations).toBe(1);
      expect(reflectionResult.finalScore).toBe(0.1);
      // Should continue since score is not less than threshold
    });

    it('should accumulate improvements across iterations', async () => {
      const provider = createMockProvider();
      const result = createDecompositionResult();
      const config = createConfig();

      const responses = [
        {
          improvementScore: 0.6,
          recommendedChanges: [
            { type: 'ADD_ISSUE', target: '4-new.md', description: 'Add', content: 'Content', rationale: 'Reason' },
            { type: 'MODIFY_ISSUE', target: '1-feature.md', description: 'Mod', content: 'Content', rationale: 'Reason' }
          ]
        },
        {
          improvementScore: 0.3,
          recommendedChanges: [
            { type: 'ADD_DEPENDENCY', target: '2-bug-fix.md', description: 'Dep', content: 'Deps', rationale: 'Reason' }
          ]
        },
        {
          improvementScore: 0.05,
          recommendedChanges: []
        }
      ];

      let callCount = 0;
      vi.mocked(provider.chat).mockImplementation(() => {
        return Promise.resolve(JSON.stringify(responses[callCount++]));
      });

      const reflectionResult = await reflectiveDecomposition(provider, result, config);

      expect(reflectionResult.totalImprovements).toBe(3); // 2 + 1 + 0
      expect(reflectionResult.improvements).toHaveLength(3);
      
      // Verify improvements are properly accumulated
      expect(reflectionResult.improvements![0].changes).toHaveLength(2);
      expect(reflectionResult.improvements![1].changes).toHaveLength(1);
      expect(reflectionResult.improvements![2].changes).toHaveLength(0);
    });

    it('should handle malformed provider responses gracefully', async () => {
      const provider = createMockProvider();
      const result = createDecompositionResult();
      const config = createConfig();

      const responses = [
        'Not JSON at all',
        '{ invalid json',
        JSON.stringify({ improvementScore: 0.05 }) // Valid to end iteration
      ];

      let callCount = 0;
      vi.mocked(provider.chat).mockImplementation(() => {
        return Promise.resolve(responses[callCount++]);
      });

      const reflectionResult = await reflectiveDecomposition(provider, result, config);

      // Should stop after first valid response below threshold
      expect(reflectionResult.performedIterations).toBe(3);
      expect(reflectionResult.improvements).toHaveLength(3);
      
      // First two should have fallback values
      expect(reflectionResult.improvements![0].score).toBe(0);
      expect(reflectionResult.improvements![0].reasoning).toBe('Reflection analysis failed');
      expect(reflectionResult.improvements![1].score).toBe(0);
      expect(reflectionResult.improvements![2].score).toBe(0.05);
    });
  });

  describe('Reflection state management', () => {
    it('should properly track state across iterations', async () => {
      const provider = createMockProvider();
      const result = createDecompositionResult();
      const config = createConfig();

      const mockChat = vi.mocked(provider.chat);
      
      // Track the prompts sent to the provider
      const capturedPrompts: string[] = [];
      mockChat.mockImplementation((prompt) => {
        capturedPrompts.push(prompt);
        return Promise.resolve(JSON.stringify({
          improvementScore: 0.05,
          recommendedChanges: []
        }));
      });

      await reflectiveDecomposition(provider, result, config);

      expect(capturedPrompts).toHaveLength(1);
      expect(capturedPrompts[0]).toContain('Original Specification');
      expect(capturedPrompts[0]).toContain('Test specification content');
      expect(capturedPrompts[0]).toContain('Current Issues and Plans');
      expect(capturedPrompts[0]).toContain('Reflection Instructions (Iteration 1)');
    });
  });

  describe('Performance considerations', () => {
    it('should handle very large decomposition results efficiently', async () => {
      const provider = createMockProvider();
      const largeResult = createDecompositionResult({
        issueFiles: Array(100).fill(0).map((_, i) => `${i}-issue.md`),
        planFiles: Array(100).fill(0).map((_, i) => `plan-for-issue-${i}.md`),
        issueCount: 100,
        totalWordCount: 10000
      });
      const config = createConfig({ skipForSimpleSpecs: false });

      vi.mocked(provider.chat).mockResolvedValue(JSON.stringify({
        improvementScore: 0.05,
        recommendedChanges: []
      }));

      const startTime = Date.now();
      const reflectionResult = await reflectiveDecomposition(provider, largeResult, config);
      const duration = Date.now() - startTime;

      expect(reflectionResult.enabled).toBe(true);
      expect(duration).toBeLessThan(1000); // Should complete quickly
    });
  });
});