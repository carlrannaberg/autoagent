import { Logger } from '../utils/logger.js';
import { Provider } from '../providers/Provider.js';
import { 
  ReflectionConfig, 
  ReflectionResult, 
  ReflectionState,
  ImprovementAnalysis,
  ImprovementChange,
  ChangeType,
  AgentConfig,
  IdentifiedGap
} from '../types/index.js';
import { DEFAULT_REFLECTION_CONFIG, mergeReflectionConfig } from './reflection-defaults.js';

export interface DecompositionResult {
  specFile: string;
  specContent: string;
  issueFiles: string[];
  planFiles: string[];
  issueCount: number;
  totalWordCount: number;
}

export function shouldSkipReflection(
  result: DecompositionResult, 
  config: ReflectionConfig
): { skip: boolean; reason?: string } {
  if (!config.enabled) {
    return { skip: true, reason: 'Reflection is disabled' };
  }

  if (config.skipForSimpleSpecs && result.totalWordCount < 500) {
    return { skip: true, reason: 'Skipping reflection for simple spec (< 500 words)' };
  }

  if (result.issueCount === 0) {
    return { skip: true, reason: 'No issues were generated' };
  }

  return { skip: false };
}

function buildReflectionPrompt(
  specContent: string,
  currentIssuesAndPlans: string,
  iterationNumber: number
): string {
  return `You are reviewing a project decomposition. Analyze the generated issues and plans for gaps, improvements, and missing details.

## Original Specification
${specContent}

## Current Issues and Plans
${currentIssuesAndPlans}

## Reflection Instructions (Iteration ${iterationNumber})
Now think deeply about the issues and plans and see if there are still some gaps in there.

Consider:
1. **Missing Dependencies**: Are there unstated dependencies between issues?
2. **Scope Gaps**: Does the decomposition cover all aspects of the original spec?
3. **Detail Level**: Do issues have sufficient acceptance criteria and technical details?
4. **Task Granularity**: Are issues appropriately sized and scoped?
5. **Implementation Order**: Is the sequence of work logical and efficient?
6. **Edge Cases**: Are important edge cases and error scenarios covered?
7. **Testing Strategy**: Is testing adequately addressed in the plans?

## Required Output Format
Provide a structured improvement analysis in valid JSON format:

{
  "improvementScore": <number between 0.0 and 1.0>,
  "identifiedGaps": [
    {
      "type": "string",
      "description": "string",
      "relatedIssues": ["string"]
    }
  ],
  "recommendedChanges": [
    {
      "type": "ADD_ISSUE" | "MODIFY_ISSUE" | "ADD_PLAN" | "MODIFY_PLAN" | "ADD_DEPENDENCY",
      "target": "string",
      "description": "string",
      "content": "string",
      "rationale": "string"
    }
  ],
  "reasoning": "string"
}

Where:
- improvementScore: Rate how much improvement is needed (0.0 = perfect, 1.0 = major gaps)
- identifiedGaps: List specific gaps or missing elements
- recommendedChanges: Specific changes to make
- reasoning: Overall rationale for the most important changes

Ensure your response is valid JSON that can be parsed.`;
}

function parseReflectionResponse(response: string): ImprovementAnalysis {
  try {
    const cleanedResponse = response.trim();
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No JSON object found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]) as {
      improvementScore?: number;
      identifiedGaps?: IdentifiedGap[];
      recommendedChanges?: Array<{
        type: string;
        target?: string;
        description?: string;
        content?: string;
        rationale?: string;
      }>;
      reasoning?: string;
    };
    
    const changes: ImprovementChange[] = (parsed.recommendedChanges ?? []).map((change) => ({
      type: change.type as ChangeType,
      target: change.target ?? '',
      description: change.description ?? '',
      content: change.content ?? '',
      rationale: change.rationale ?? ''
    }));

    const analysis: ImprovementAnalysis = {
      score: Math.max(0, Math.min(1, parsed.improvementScore ?? 0)),
      gaps: parsed.identifiedGaps ?? [],
      changes,
      reasoning: parsed.reasoning ?? '',
      iterationNumber: 0,
      timestamp: new Date().toISOString()
    };

    return analysis;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Logger.error(`Failed to parse reflection response: ${errorMessage}`);
    throw new Error(`Invalid reflection response format: ${errorMessage}`);
  }
}

export async function reflectOnIssuesAndPlans(
  provider: Provider,
  specContent: string,
  currentIssuesAndPlans: string,
  iterationNumber: number
): Promise<ImprovementAnalysis> {
  try {
    Logger.info(`🔍 Performing reflection analysis (iteration ${iterationNumber})`);
    
    const prompt = buildReflectionPrompt(specContent, currentIssuesAndPlans, iterationNumber);
    
    const response = await provider.chat(prompt);
    const analysis = parseReflectionResponse(response);
    
    analysis.iterationNumber = iterationNumber;
    
    Logger.info(`📊 Reflection score: ${analysis.score.toFixed(2)} (${analysis.changes.length} changes recommended)`);
    
    return analysis;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Logger.error(`Reflection analysis failed: ${errorMessage}`);
    
    return {
      score: 0,
      gaps: [],
      changes: [],
      reasoning: 'Reflection analysis failed',
      iterationNumber,
      timestamp: new Date().toISOString()
    };
  }
}

export async function reflectiveDecomposition(
  provider: Provider,
  initialResult: DecompositionResult,
  config: AgentConfig
): Promise<ReflectionResult> {
  const reflectionConfig = mergeReflectionConfig(DEFAULT_REFLECTION_CONFIG, config.reflection);
  
  const skipCheck = shouldSkipReflection(initialResult, reflectionConfig);
  if (skipCheck.skip) {
    Logger.info(`⏩ ${skipCheck.reason}`);
    return {
      enabled: false,
      performedIterations: 0,
      totalImprovements: 0,
      finalScore: 0,
      skippedReason: skipCheck.reason
    };
  }

  const state: ReflectionState = {
    currentIteration: 0,
    improvements: [],
    currentScore: 1.0,
    isComplete: false,
    currentIssues: initialResult.issueFiles,
    currentPlans: initialResult.planFiles
  };

  Logger.info(`🔄 Starting reflective improvement (max ${reflectionConfig.maxIterations} iterations)`);

  for (let iteration = 1; iteration <= reflectionConfig.maxIterations; iteration++) {
    state.currentIteration = iteration;
    
    Logger.info(`🔍 Reflection iteration ${iteration}/${reflectionConfig.maxIterations}`);
    
    try {
      const currentContent = getCurrentIssuesAndPlansContent(state.currentIssues, state.currentPlans);
      
      const analysis = await reflectOnIssuesAndPlans(
        provider,
        initialResult.specContent,
        currentContent,
        iteration
      );
      
      // Only add to improvements if it's a valid analysis (not a failure)
      if (analysis.reasoning !== 'Reflection analysis failed') {
        state.improvements.push(analysis);
      }
      state.currentScore = analysis.score;
      
      if (analysis.score <= reflectionConfig.improvementThreshold) {
        Logger.info(`✅ Reflection complete - minimal improvements found (score: ${analysis.score.toFixed(2)})`);
        state.isComplete = true;
        break;
      }
      
      if (analysis.changes.length > 0) {
        Logger.info(`📈 ${analysis.changes.length} improvements identified`);
        
        for (const change of analysis.changes) {
          Logger.info(`  - ${change.type}: ${change.description}`);
        }
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Logger.error(`Reflection iteration ${iteration} failed: ${errorMessage}`);
      state.isComplete = true;
      break;
    }
  }

  const totalImprovements = state.improvements.reduce((sum, imp) => sum + imp.changes.length, 0);
  
  return {
    enabled: true,
    performedIterations: state.currentIteration,
    totalImprovements,
    finalScore: state.currentScore,
    improvements: state.improvements
  };
}

function getCurrentIssuesAndPlansContent(
  issueFiles: string[], 
  planFiles: string[]
): string {
  let content = '### Issues:\n\n';
  
  for (const file of issueFiles) {
    content += `File: ${file}\n`;
    content += '---\n\n';
  }
  
  content += '\n### Plans:\n\n';
  
  for (const file of planFiles) {
    content += `File: ${file}\n`;
    content += '---\n\n';
  }
  
  return content;
}