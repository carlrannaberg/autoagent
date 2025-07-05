import { describe, it, expect, beforeEach, vi } from 'vitest';
import { existsSync } from 'fs';
import {
  validateChange,
  scoreChange,
  categorizeChanges,
  detectDependencies,
  resolveConflicts,
  prioritizeChanges,
  analyzeImprovements,
  getAnalysisQualityScore
} from '../../src/utils/improvement-analyzer.js';
import { ChangeType, type ImprovementChange, type ImprovementAnalysis } from '../../src/types/index.js';

vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs')>();
  return {
    ...actual,
    existsSync: vi.fn()
  };
});

const mockExistsSync = existsSync as unknown as ReturnType<typeof vi.fn>;

describe('improvement-analyzer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExistsSync.mockReturnValue(false);
  });

  describe('validateChange', () => {
    it('should validate a valid add issue change', () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '123-test-issue.md',
        description: 'Add new issue for testing',
        content: 'This is the issue content with sufficient length',
        rationale: 'This issue is needed for testing purposes'
      };

      const result = validateChange(change);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const change = {
        type: ChangeType.ADD_ISSUE,
        target: '',
        description: '',
        content: '',
        rationale: ''
      } as ImprovementChange;

      const result = validateChange(change);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Change target is required');
      expect(result.errors).toContain('Change description is required');
      expect(result.errors).toContain('Change content is required');
      expect(result.warnings).toContain('Change rationale is missing - this helps understand why the change is needed');
    });

    it('should validate target exists for modifications', () => {
      const change: ImprovementChange = {
        type: ChangeType.MODIFY_ISSUE,
        target: '123-existing-issue.md',
        description: 'Modify existing issue',
        content: 'Modified content here',
        rationale: 'Improvement needed'
      };

      mockExistsSync.mockReturnValue(false);
      let result = validateChange(change);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Target file does not exist: issues/123-existing-issue.md');

      mockExistsSync.mockReturnValue(true);
      result = validateChange(change);
      expect(result.isValid).toBe(true);
    });

    it('should validate filename formats', () => {
      const invalidIssue: ImprovementChange = {
        type: ChangeType.MODIFY_ISSUE,
        target: 'invalid-format.md',
        description: 'Test',
        content: 'Test content',
        rationale: 'Test'
      };

      let result = validateChange(invalidIssue);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid issue filename format: invalid-format.md');

      const invalidPlan: ImprovementChange = {
        type: ChangeType.MODIFY_PLAN,
        target: 'invalid-plan.md',
        description: 'Test',
        content: 'Test content',
        rationale: 'Test'
      };

      result = validateChange(invalidPlan);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid plan filename format: invalid-plan.md');
    });

    it('should validate content length', () => {
      const shortContent: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '123-test.md',
        description: 'Test',
        content: 'Short',
        rationale: 'Test'
      };

      let result = validateChange(shortContent);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Change content is too short (minimum 10 characters)');

      const largeContent: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '123-test.md',
        description: 'Test',
        content: 'x'.repeat(51000),
        rationale: 'Test'
      };

      result = validateChange(largeContent);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Change content is very large (>50KB) - consider splitting into smaller changes');
    });

    it('should prevent adding files that already exist', () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '123-existing.md',
        description: 'Add new issue',
        content: 'Content here',
        rationale: 'Test'
      };

      mockExistsSync.mockReturnValue(true);
      const result = validateChange(change);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File already exists: issues/123-existing.md');
    });
  });

  describe('scoreChange', () => {
    it('should score add changes higher than modifications', () => {
      const addChange: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '123-new.md',
        description: 'Add new',
        content: 'Content here',
        rationale: 'Adding new functionality'
      };

      const modifyChange: ImprovementChange = {
        type: ChangeType.MODIFY_ISSUE,
        target: '123-existing.md',
        description: 'Modify existing',
        content: 'Modified content',
        rationale: 'Improving existing functionality'
      };

      const addScore = scoreChange(addChange);
      const modifyScore = scoreChange(modifyChange);

      expect(addScore.impact).toBeGreaterThan(modifyScore.impact);
      expect(addScore.complexity).toBeLessThan(modifyScore.complexity);
    });

    it('should boost impact for critical keywords', () => {
      const normalChange: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '123-test.md',
        description: 'Add feature',
        content: 'Content',
        rationale: 'This would be nice to have'
      };

      const criticalChange: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '124-test.md',
        description: 'Add critical feature',
        content: 'Content',
        rationale: 'This is critical for the system to work properly'
      };

      const normalScore = scoreChange(normalChange);
      const criticalScore = scoreChange(criticalChange);

      expect(criticalScore.impact).toBeGreaterThan(normalScore.impact);
    });

    it('should score based on content complexity', () => {
      const simpleChange: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '123-simple.md',
        description: 'Simple change',
        content: 'Line 1\nLine 2\nLine 3',
        rationale: 'Simple improvement'
      };

      const complexChange: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '124-complex.md',
        description: 'Complex change',
        content: Array(250).fill('Line').join('\n'),
        rationale: 'Complex improvement'
      };

      const simpleScore = scoreChange(simpleChange);
      const complexScore = scoreChange(complexChange);

      expect(simpleScore.complexity).toBeLessThan(complexScore.complexity);
      expect(simpleScore.confidence).toBeGreaterThan(complexScore.confidence);
    });

    it('should calculate composite score correctly', () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '123-test.md',
        description: 'Test change',
        content: 'Content with moderate complexity\n'.repeat(10),
        rationale: 'This is a well-documented change that explains the reasoning in detail'
      };

      const score = scoreChange(change);

      expect(score.composite).toBeGreaterThan(0);
      expect(score.composite).toBeLessThanOrEqual(1);
      expect(score.composite).toBeCloseTo(
        (score.impact * 0.5) + ((1 - score.complexity) * 0.3) + (score.confidence * 0.2),
        2
      );
    });
  });

  describe('categorizeChanges', () => {
    it('should categorize changes by type and target prefix', () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.ADD_ISSUE,
          target: '123-feature-a.md',
          description: 'Add feature A',
          content: 'Content A',
          rationale: 'Need A'
        },
        {
          type: ChangeType.ADD_ISSUE,
          target: '124-feature-b.md',
          description: 'Add feature B',
          content: 'Content B',
          rationale: 'Need B'
        },
        {
          type: ChangeType.MODIFY_ISSUE,
          target: '123-feature-a.md',
          description: 'Modify feature A',
          content: 'Modified A',
          rationale: 'Improve A'
        },
        {
          type: ChangeType.ADD_PLAN,
          target: 'plan-for-issue-123.md',
          description: 'Add plan',
          content: 'Plan content',
          rationale: 'Need plan'
        }
      ];

      const categories = categorizeChanges(changes);

      expect(categories.size).toBe(4);
      expect(categories.get(`${ChangeType.ADD_ISSUE}:123`)).toHaveLength(1);
      expect(categories.get(`${ChangeType.ADD_ISSUE}:124`)).toHaveLength(1);
      expect(categories.get(`${ChangeType.MODIFY_ISSUE}:123`)).toHaveLength(1);
      expect(categories.get(`${ChangeType.ADD_PLAN}:plan`)).toHaveLength(1);
    });
  });

  describe('detectDependencies', () => {
    it('should detect plan dependencies on issues', () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.ADD_ISSUE,
          target: '123-feature.md',
          description: 'Add issue',
          content: 'Issue content',
          rationale: 'Need issue'
        },
        {
          type: ChangeType.ADD_PLAN,
          target: 'plan-for-issue-123.md',
          description: 'Add plan',
          content: 'Plan content',
          rationale: 'Need plan'
        }
      ];

      const dependencies = detectDependencies(changes);

      expect(dependencies).toHaveLength(1);
      expect(dependencies[0].type).toBe('requires');
      expect(dependencies[0].from.type).toBe(ChangeType.ADD_PLAN);
      expect(dependencies[0].to.type).toBe(ChangeType.ADD_ISSUE);
    });

    it('should detect conflicts for same file modifications', () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.MODIFY_ISSUE,
          target: '123-feature.md',
          description: 'Modify 1',
          content: 'Content 1',
          rationale: 'Reason 1'
        },
        {
          type: ChangeType.MODIFY_ISSUE,
          target: '123-feature.md',
          description: 'Modify 2',
          content: 'Content 2',
          rationale: 'Reason 2'
        }
      ];

      const dependencies = detectDependencies(changes);

      expect(dependencies).toHaveLength(1);
      expect(dependencies[0].type).toBe('conflicts');
      expect(dependencies[0].reason).toContain('Multiple modifications to the same file');
    });

    it('should detect dependency references', () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.ADD_DEPENDENCY,
          target: '123-feature.md',
          description: 'Add dependency on 124-other.md',
          content: 'Depends on: 124-other.md',
          rationale: 'Dependency needed'
        },
        {
          type: ChangeType.ADD_ISSUE,
          target: '124-other.md',
          description: 'Add other issue',
          content: 'Other content',
          rationale: 'Other needed'
        }
      ];

      const dependencies = detectDependencies(changes);

      expect(dependencies).toHaveLength(1);
      expect(dependencies[0].type).toBe('requires');
      expect(dependencies[0].from.type).toBe(ChangeType.ADD_DEPENDENCY);
    });
  });

  describe('resolveConflicts', () => {
    it('should resolve conflicts by selecting highest scoring change', () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.MODIFY_ISSUE,
          target: '123-feature.md',
          description: 'Basic modification',
          content: 'Short content',
          rationale: 'Minor improvement'
        },
        {
          type: ChangeType.MODIFY_ISSUE,
          target: '123-feature.md',
          description: 'Critical modification',
          content: 'Detailed content with comprehensive changes',
          rationale: 'This is a critical improvement that must be applied for system stability'
        }
      ];

      const dependencies = detectDependencies(changes);
      const { resolved, conflicts } = resolveConflicts(changes, dependencies);

      expect(resolved).toHaveLength(1);
      expect(resolved[0].description).toBe('Critical modification');
      expect(conflicts).toHaveLength(1);
      expect(conflicts[0].reason).toContain('selected higher scoring change');
    });

    it('should not affect non-conflicting changes', () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.ADD_ISSUE,
          target: '123-feature.md',
          description: 'Add issue 123',
          content: 'Content 123',
          rationale: 'Need 123'
        },
        {
          type: ChangeType.ADD_ISSUE,
          target: '124-feature.md',
          description: 'Add issue 124',
          content: 'Content 124',
          rationale: 'Need 124'
        }
      ];

      const dependencies = detectDependencies(changes);
      const { resolved, conflicts } = resolveConflicts(changes, dependencies);

      expect(resolved).toHaveLength(2);
      expect(conflicts).toHaveLength(0);
    });
  });

  describe('prioritizeChanges', () => {
    it('should order changes based on dependencies', () => {
      const issue: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: '123-feature.md',
        description: 'Add issue',
        content: 'Issue content',
        rationale: 'Need issue'
      };

      const plan: ImprovementChange = {
        type: ChangeType.ADD_PLAN,
        target: 'plan-for-issue-123.md',
        description: 'Add plan',
        content: 'Plan content',
        rationale: 'Need plan'
      };

      const changes = [plan, issue]; // Plan listed first
      const dependencies = detectDependencies(changes);
      const prioritized = prioritizeChanges(changes, dependencies);

      expect(prioritized).toHaveLength(2);
      expect(prioritized[0].target).toBe('123-feature.md'); // Issue should come first
      expect(prioritized[1].target).toBe('plan-for-issue-123.md'); // Plan depends on issue
      expect(prioritized[0].priority).toBeLessThan(prioritized[1].priority);
    });

    it('should assign priorities based on composite score', () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.ADD_ISSUE,
          target: '123-low-priority.md',
          description: 'Low priority',
          content: 'Simple content',
          rationale: 'Nice to have'
        },
        {
          type: ChangeType.ADD_ISSUE,
          target: '124-high-priority.md',
          description: 'High priority',
          content: 'Critical content with detailed implementation',
          rationale: 'This is critical for system operation and must be implemented immediately'
        }
      ];

      const prioritized = prioritizeChanges(changes, []);

      const highPriority = prioritized.find(c => c.target === '124-high-priority.md');
      const lowPriority = prioritized.find(c => c.target === '123-low-priority.md');

      expect(highPriority!.score.composite).toBeGreaterThan(lowPriority!.score.composite);
    });
  });

  describe('analyzeImprovements', () => {
    it('should perform complete analysis of improvements', () => {
      const analysis: ImprovementAnalysis = {
        score: 0.8 as any,
        gaps: [],
        changes: [
          {
            type: ChangeType.ADD_ISSUE,
            target: '123-feature.md',
            description: 'Add feature issue',
            content: 'Feature implementation details',
            rationale: 'This feature is critical for user experience'
          },
          {
            type: ChangeType.ADD_PLAN,
            target: 'plan-for-issue-123.md',
            description: 'Add implementation plan',
            content: 'Step by step plan',
            rationale: 'Planning needed for complex feature'
          },
          {
            type: ChangeType.MODIFY_ISSUE,
            target: '100-existing.md',
            description: 'Update existing issue',
            content: 'Updated content',
            rationale: 'Clarification needed'
          }
        ],
        reasoning: 'These improvements will enhance the system',
        iterationNumber: 1,
        timestamp: new Date().toISOString()
      };

      mockExistsSync.mockImplementation((path: string) => {
        return path.includes('100-existing.md');
      });

      const result = analyzeImprovements(analysis);

      expect(result.validChanges).toHaveLength(3);
      expect(result.invalidChanges).toHaveLength(0);
      expect(result.dependencies.length).toBeGreaterThan(0);
      expect(result.executionOrder).toHaveLength(3);
      
      // Issue should come before its plan
      const issueIndex = result.executionOrder.findIndex(c => c.type === ChangeType.ADD_ISSUE);
      const planIndex = result.executionOrder.findIndex(c => c.type === ChangeType.ADD_PLAN);
      expect(issueIndex).toBeLessThan(planIndex);
    });

    it('should handle invalid changes', () => {
      const analysis: ImprovementAnalysis = {
        score: 0.5 as any,
        gaps: [],
        changes: [
          {
            type: ChangeType.ADD_ISSUE,
            target: '', // Invalid: empty target
            description: '',
            content: '',
            rationale: ''
          }
        ],
        reasoning: 'Test',
        iterationNumber: 1,
        timestamp: new Date().toISOString()
      };

      const result = analyzeImprovements(analysis);

      expect(result.validChanges).toHaveLength(0);
      expect(result.invalidChanges).toHaveLength(1);
      expect(result.invalidChanges[0].errors.length).toBeGreaterThan(0);
    });
  });

  describe('getAnalysisQualityScore', () => {
    it('should return 0 for empty changes', () => {
      const analysis: ImprovementAnalysis = {
        score: 0.8 as any,
        gaps: [],
        changes: [],
        reasoning: 'No changes needed',
        iterationNumber: 1,
        timestamp: new Date().toISOString()
      };

      const score = getAnalysisQualityScore(analysis);
      expect(score).toBe(0.0);
    });

    it('should combine analysis score with change scores', () => {
      const analysis: ImprovementAnalysis = {
        score: 0.8 as any,
        gaps: [],
        changes: [
          {
            type: ChangeType.ADD_ISSUE,
            target: '123-test.md',
            description: 'Test change',
            content: 'Good content with details',
            rationale: 'Well reasoned change with comprehensive explanation'
          }
        ],
        reasoning: 'Good improvements',
        iterationNumber: 1,
        timestamp: new Date().toISOString()
      };

      const score = getAnalysisQualityScore(analysis);
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThanOrEqual(1);
      expect(score).toBeGreaterThan(0.5); // Should be reasonably high for good change
    });

    it('should clamp scores to valid range', () => {
      const analysis: ImprovementAnalysis = {
        score: 2.0 as any, // Invalid high score
        gaps: [],
        changes: [
          {
            type: ChangeType.ADD_ISSUE,
            target: '123-test.md',
            description: 'Test',
            content: 'Content here',
            rationale: 'Reason'
          }
        ],
        reasoning: 'Test',
        iterationNumber: 1,
        timestamp: new Date().toISOString()
      };

      const score = getAnalysisQualityScore(analysis);
      expect(score).toBeLessThanOrEqual(1.0);
      expect(score).toBeGreaterThanOrEqual(0.0);
    });
  });
});