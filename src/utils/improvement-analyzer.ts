import { existsSync } from 'fs';
import { join } from 'path';
import { 
  ChangeType,
  type ImprovementChange, 
  type ImprovementScore,
  type ImprovementAnalysis
} from '../types/index.js';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ChangeScore {
  impact: number;
  complexity: number;
  confidence: number;
  composite: number;
}

export interface ChangeDependency {
  from: ImprovementChange;
  to: ImprovementChange;
  type: 'requires' | 'conflicts' | 'enhances';
  reason: string;
}

export interface PrioritizedChange extends ImprovementChange {
  score: ChangeScore;
  dependencies: string[];
  conflicts: string[];
  priority: number;
}

export interface AnalyzerResult {
  validChanges: PrioritizedChange[];
  invalidChanges: Array<{ change: ImprovementChange; errors: string[] }>;
  dependencies: ChangeDependency[];
  conflicts: Array<{ change1: ImprovementChange; change2: ImprovementChange; reason: string }>;
  executionOrder: PrioritizedChange[];
}

/**
 * Validates a single improvement change
 */
export function validateChange(
  change: ImprovementChange,
  issuesDir: string = './issues',
  plansDir: string = './plans'
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate required fields
  if (change.type === undefined) {
    errors.push('Change type is required');
  }
  if (!change.target) {
    errors.push('Change target is required');
  }
  if (!change.description) {
    errors.push('Change description is required');
  }
  if (!change.content) {
    errors.push('Change content is required');
  }
  if (!change.rationale) {
    warnings.push('Change rationale is missing - this helps understand why the change is needed');
  }

  // Validate target exists for modifications
  if (change.type === ChangeType.MODIFY_ISSUE || change.type === ChangeType.MODIFY_PLAN) {
    const isIssue = change.type === ChangeType.MODIFY_ISSUE;
    const dir = isIssue ? issuesDir : plansDir;
    const expectedPattern = isIssue ? /^\d+-.*\.md$/ : /^plan-for-issue-\d+\.md$/;
    
    if (!expectedPattern.test(change.target)) {
      errors.push(`Invalid ${isIssue ? 'issue' : 'plan'} filename format: ${change.target}`);
    } else {
      const targetPath = join(dir, change.target);
      if (!existsSync(targetPath)) {
        errors.push(`Target file does not exist: ${targetPath}`);
      }
    }
  }

  // Validate new files don't already exist
  if (change.type === ChangeType.ADD_ISSUE || change.type === ChangeType.ADD_PLAN) {
    const isIssue = change.type === ChangeType.ADD_ISSUE;
    const dir = isIssue ? issuesDir : plansDir;
    const targetPath = join(dir, change.target);
    
    if (existsSync(targetPath)) {
      errors.push(`File already exists: ${targetPath}`);
    }
  }

  // Validate content requirements
  if (change.content.trim().length < 10) {
    errors.push('Change content is too short (minimum 10 characters)');
  }

  if (change.content.length > 50000) {
    warnings.push('Change content is very large (>50KB) - consider splitting into smaller changes');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Scores an improvement change based on multiple factors
 */
export function scoreChange(change: ImprovementChange): ChangeScore {
  // Impact scoring (0-1)
  let impact = 0.5;
  
  // Adding new issues/plans has higher impact than modifications
  if (change.type === ChangeType.ADD_ISSUE || change.type === ChangeType.ADD_PLAN) {
    impact = 0.8;
  } else if (change.type === ChangeType.ADD_DEPENDENCY) {
    impact = 0.6;
  }
  
  // Boost impact if rationale indicates critical improvements
  const criticalKeywords = ['critical', 'essential', 'required', 'must', 'breaking'];
  const hasCriticalKeyword = criticalKeywords.some(keyword => 
    change.rationale.toLowerCase().includes(keyword)
  );
  if (hasCriticalKeyword) {
    impact = Math.min(1.0, impact + 0.2);
  }

  // Complexity scoring (0-1, inverted so lower is better)
  let complexity = 0.3;
  
  // Estimate based on content size
  const contentLines = change.content.split('\n').length;
  if (contentLines > 100) {
    complexity = 0.7;
  } else if (contentLines > 50) {
    complexity = 0.5;
  }
  
  // Modifications are generally more complex than additions
  if (change.type === ChangeType.MODIFY_ISSUE || change.type === ChangeType.MODIFY_PLAN) {
    complexity = Math.min(1.0, complexity + 0.2);
  }

  // Confidence scoring (0-1)
  let confidence = 0.7;
  
  // Higher confidence for well-documented changes
  if (change.rationale.length > 100) {
    confidence = 0.8;
  }
  if (change.rationale.length > 200) {
    confidence = 0.9;
  }
  
  // Lower confidence for very large changes
  if (contentLines > 200) {
    confidence = Math.max(0.3, confidence - 0.3);
  }

  // Composite score calculation
  // Prioritize high impact, low complexity, high confidence
  const composite = (impact * 0.5) + ((1 - complexity) * 0.3) + (confidence * 0.2);

  return {
    impact,
    complexity,
    confidence,
    composite
  };
}

/**
 * Categorizes changes by type and target
 */
export function categorizeChanges(changes: ImprovementChange[]): Map<string, ImprovementChange[]> {
  const categories = new Map<string, ImprovementChange[]>();

  for (const change of changes) {
    const category = `${change.type}:${change.target.split('-')[0]}`;
    
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    const categoryArray = categories.get(category);
    if (categoryArray !== undefined) {
      categoryArray.push(change);
    }
  }

  return categories;
}

/**
 * Detects dependencies between changes
 */
export function detectDependencies(changes: ImprovementChange[]): ChangeDependency[] {
  const dependencies: ChangeDependency[] = [];

  for (let i = 0; i < changes.length; i++) {
    for (let j = i + 1; j < changes.length; j++) {
      const change1 = changes[i];
      const change2 = changes[j];

      // Check for explicit dependencies
      if (change1 && change2 && change1.type === ChangeType.ADD_DEPENDENCY) {
        const mentionsTarget = change1.content.includes(change2.target) || 
                              change1.description.includes(change2.target);
        if (mentionsTarget) {
          dependencies.push({
            from: change1,
            to: change2,
            type: 'requires',
            reason: 'Dependency change references target'
          });
        }
      }

      // Plans depend on their corresponding issues
      if (change1 && change2) {
        // Check both orderings since we're iterating with j > i
        if (change1.type === ChangeType.ADD_PLAN && change2.type === ChangeType.ADD_ISSUE) {
          const issueNum = change2.target.match(/^(\d+)-/)?.[1];
          if (issueNum !== undefined && change1.target.includes(`issue-${issueNum}`)) {
            dependencies.push({
              from: change1,
              to: change2,
              type: 'requires',
              reason: 'Plan requires corresponding issue'
            });
          }
        } else if (change2.type === ChangeType.ADD_PLAN && change1.type === ChangeType.ADD_ISSUE) {
          const issueNum = change1.target.match(/^(\d+)-/)?.[1];
          if (issueNum !== undefined && change2.target.includes(`issue-${issueNum}`)) {
            dependencies.push({
              from: change2,
              to: change1,
              type: 'requires',
              reason: 'Plan requires corresponding issue'
            });
          }
        }
      }

      // Modifications to the same file conflict
      if (change1 && change2 && change1.target === change2.target && 
          (change1.type === ChangeType.MODIFY_ISSUE || change1.type === ChangeType.MODIFY_PLAN) &&
          (change2.type === ChangeType.MODIFY_ISSUE || change2.type === ChangeType.MODIFY_PLAN)) {
        dependencies.push({
          from: change1,
          to: change2,
          type: 'conflicts',
          reason: 'Multiple modifications to the same file'
        });
      }
    }
  }

  return dependencies;
}

/**
 * Resolves conflicts between changes
 */
export function resolveConflicts(
  changes: ImprovementChange[],
  dependencies: ChangeDependency[]
): { resolved: ImprovementChange[]; conflicts: Array<{ change1: ImprovementChange; change2: ImprovementChange; reason: string }> } {
  const conflicts = dependencies.filter(dep => dep.type === 'conflicts');
  const conflictMap = new Map<string, ImprovementChange[]>();
  
  // Group conflicting changes by target
  for (const conflict of conflicts) {
    const key = conflict.from.target;
    if (!conflictMap.has(key)) {
      conflictMap.set(key, []);
    }
    const conflictList = conflictMap.get(key);
    if (conflictList) {
      conflictList.push(conflict.from, conflict.to);
    }
  }

  const resolved: ImprovementChange[] = [];
  const unresolvedConflicts: Array<{ change1: ImprovementChange; change2: ImprovementChange; reason: string }> = [];
  const processedChanges = new Set<ImprovementChange>();

  for (const change of changes) {
    if (processedChanges.has(change)) {continue;}

    const conflictGroup = conflictMap.get(change.target);
    if (!conflictGroup || conflictGroup.length === 0) {
      resolved.push(change);
      processedChanges.add(change);
    } else {
      // For conflicts, pick the one with the best score
      const uniqueConflicts = Array.from(new Set(conflictGroup));
      const scored = uniqueConflicts.map(c => ({ change: c, score: scoreChange(c) }));
      scored.sort((a, b) => b.score.composite - a.score.composite);
      
      if (scored.length > 0 && scored[0] !== undefined) {
        resolved.push(scored[0].change);
        processedChanges.add(scored[0].change);
        
        // Record unresolved conflicts
        for (let i = 1; i < scored.length; i++) {
          const currentItem = scored[i];
          if (currentItem !== undefined && !processedChanges.has(currentItem.change)) {
            unresolvedConflicts.push({
              change1: scored[0].change,
              change2: currentItem.change,
              reason: 'Conflicting modifications to the same file - selected higher scoring change'
            });
            processedChanges.add(currentItem.change);
          }
        }
      }
    }
  }

  return { resolved, conflicts: unresolvedConflicts };
}

/**
 * Prioritizes changes for execution order
 */
export function prioritizeChanges(
  changes: ImprovementChange[],
  dependencies: ChangeDependency[]
): PrioritizedChange[] {
  // Score all changes
  const scoredChanges = changes.map(change => ({
    ...change,
    score: scoreChange(change),
    dependencies: [] as string[],
    conflicts: [] as string[],
    priority: 0
  }));

  // Build dependency and conflict lists
  for (const dep of dependencies) {
    const fromChange = scoredChanges.find(c => 
      c.type === dep.from.type && 
      c.target === dep.from.target &&
      c.description === dep.from.description
    );
    
    if (fromChange) {
      if (dep.type === 'requires') {
        fromChange.dependencies.push(dep.to.target);
      } else if (dep.type === 'conflicts') {
        fromChange.conflicts.push(dep.to.target);
      }
    }
  }

  // Topological sort considering dependencies
  const visited = new Set<PrioritizedChange>();
  const result: PrioritizedChange[] = [];
  let currentPriority = 1;

  function visit(change: PrioritizedChange): void {
    if (visited.has(change)) {return;}
    visited.add(change);

    // Visit dependencies first
    for (const depTarget of change.dependencies) {
      const dep = scoredChanges.find(c => c.target === depTarget);
      if (dep && !visited.has(dep)) {
        visit(dep);
      }
    }

    change.priority = currentPriority++;
    result.push(change);
  }

  // Sort by composite score descending
  scoredChanges.sort((a, b) => b.score.composite - a.score.composite);

  // Visit all changes
  for (const change of scoredChanges) {
    visit(change);
  }

  return result;
}

/**
 * Main analyzer function that orchestrates all analysis steps
 */
export function analyzeImprovements(
  analysis: ImprovementAnalysis,
  issuesDir: string = './issues',
  plansDir: string = './plans'
): AnalyzerResult {
  const validChanges: ImprovementChange[] = [];
  const invalidChanges: Array<{ change: ImprovementChange; errors: string[] }> = [];

  // Validate all changes
  for (const change of analysis.changes) {
    const validation = validateChange(change, issuesDir, plansDir);
    if (validation.isValid) {
      validChanges.push(change);
    } else {
      invalidChanges.push({ change, errors: validation.errors });
    }
  }

  // Detect dependencies
  const dependencies = detectDependencies(validChanges);

  // Resolve conflicts
  const { resolved, conflicts } = resolveConflicts(validChanges, dependencies);

  // Prioritize changes
  const executionOrder = prioritizeChanges(resolved, dependencies);

  return {
    validChanges: executionOrder,
    invalidChanges,
    dependencies: dependencies.filter(d => d.type !== 'conflicts'),
    conflicts,
    executionOrder
  };
}

/**
 * Gets a quality score for an improvement analysis
 */
export function getAnalysisQualityScore(analysis: ImprovementAnalysis): ImprovementScore {
  if (analysis.changes.length === 0) {
    return 0.0;
  }

  const scores = analysis.changes.map(scoreChange);
  const avgComposite = scores.reduce((sum, s) => sum + s.composite, 0) / scores.length;
  
  // Factor in the analysis score itself
  const combinedScore = (analysis.score + avgComposite) / 2;
  
  // Ensure score is in valid range
  return Math.max(0.0, Math.min(1.0, combinedScore));
}