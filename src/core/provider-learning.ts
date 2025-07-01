import { ExecutionResult, ProviderName } from '../types';
import { FileManager } from '../utils/file-manager';
import { PatternAnalyzer } from './pattern-analyzer';
import { createProvider } from '../providers';

export class ProviderLearning {
  private patternAnalyzers: Map<ProviderName, PatternAnalyzer> = new Map();

  constructor(_fileManager: FileManager, _workspace: string = process.cwd()) {
    // Parameters kept for API compatibility but not used internally
    
    // Initialize pattern analyzers for each provider
    const providers: ProviderName[] = ['claude', 'gemini'];
    providers.forEach(provider => {
      this.patternAnalyzers.set(provider, new PatternAnalyzer());
    });
  }

  /**
   * Update provider instruction file with execution results and learnings
   */
  async updateProviderLearnings(result: ExecutionResult): Promise<void> {
    if (!result.provider) {
      return;
    }

    const providerLower = result.provider.toLowerCase() as ProviderName;
    
    // Add to pattern analyzer
    const analyzer = this.patternAnalyzers.get(providerLower);
    if (analyzer) {
      analyzer.addExecution(result);
      
      // Update AGENT.md after each task completion to capture learnings
      await this.updateAgentFileWithProvider(result.provider, analyzer, result);
    }
  }



  /**
   * Update AGENT.md using the AI provider to intelligently incorporate learnings
   */
  private async updateAgentFileWithProvider(
    providerName: string,
    analyzer: PatternAnalyzer,
    recentResult: ExecutionResult
  ): Promise<void> {
    try {
      // Get patterns and recommendations
      const patterns = analyzer.getPatterns();
      const recommendations = analyzer.getRecommendations();
      
      // Always give the AI a chance to learn from the task, even if no patterns detected yet
      // The AI will decide if there are valuable learnings to add
      
      // Create the prompt for the AI to update AGENT.md
      const taskInfo = recentResult.issueTitle !== undefined && recentResult.issueTitle !== '' ? 
        `Just completed: Issue #${recentResult.issueNumber} - ${recentResult.issueTitle} (${recentResult.success ? 'successful' : 'failed'})` :
        `Just completed: Issue #${recentResult.issueNumber} (${recentResult.success ? 'successful' : 'failed'})`;
      
      // Add information about what changed
      const changesInfo = recentResult.filesModified && recentResult.filesModified.length > 0 ?
        `\nFiles modified: ${recentResult.filesModified.join(', ')}` : '';
      
      const durationInfo = recentResult.duration ? 
        `\nDuration: ${(recentResult.duration / 1000).toFixed(1)} seconds` : '';
      
      const errorInfo = !recentResult.success && recentResult.error ? 
        `\nError: ${recentResult.error}` : '';
      
      const prompt = `${taskInfo}${changesInfo}${durationInfo}${errorInfo}

${patterns.length > 0 ? `Detected patterns:\n${patterns.map(p => `- ${p.description} (${Math.round(p.confidence * 100)}% confidence, ${p.occurrences} occurrences)`).join('\n')}\n\n` : ''}${recommendations.length > 0 ? `Recommendations:\n${recommendations.map(r => `- ${r}`).join('\n')}\n\n` : ''}Based on this task execution, please review AGENT.md and make updates ONLY if there are valuable learnings to add.

Guidelines:
- Review the git diff (use 'git diff' command) to understand what changed during this task
- If the task was trivial or no significant learnings emerged, DO NOT make any changes
- DO NOT add execution history, performance metrics, or pattern sections
- Only update if there are insights that would help future AI agents
- Weave insights naturally into existing sections
- Don't duplicate existing content
- Use the Edit tool to make targeted updates to relevant sections`;
      
      // Create a provider instance to execute the update
      const provider = createProvider(providerName.toLowerCase() as ProviderName);
      
      // Check if provider is available
      const isAvailable = await provider.checkAvailability();
      if (!isAvailable) {
        if (process.env.DEBUG === 'true') {
          console.warn(`Provider ${providerName} not available for AGENT.md update`);
        }
        return;
      }
      
      // Add AGENT.md to the context files
      const contextFiles = ['AGENT.md'];
      
      // If issue file exists, add it for context
      if (recentResult.issueNumber) {
        contextFiles.push(`issues/${recentResult.issueNumber}-*.md`);
        contextFiles.push(`plans/${recentResult.issueNumber}-*.md`);
      }
      
      // Execute the update request - the provider will use its editing tools
      await provider.execute(prompt, '', contextFiles, undefined);
      
    } catch (error) {
      // Silently fail - we don't want to interrupt the main flow
      if (process.env.DEBUG === 'true') {
        console.error('Failed to update AGENT.md:', error instanceof Error ? error.message : String(error));
      }
    }
  }

  /**
   * Clear cached patterns for a provider
   */
  clearCache(provider?: ProviderName): void {
    if (provider) {
      const analyzer = this.patternAnalyzers.get(provider);
      if (analyzer) {
        analyzer.clear();
      }
    } else {
      this.patternAnalyzers.forEach(analyzer => analyzer.clear());
    }
  }
}