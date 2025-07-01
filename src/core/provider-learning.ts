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
      
      // Update AGENT.md after every 5 executions or when significant patterns emerge
      const executionCount = analyzer.getExecutionCount();
      const patterns = analyzer.getPatterns();
      
      if (executionCount % 5 === 0 || patterns.filter(p => p.confidence >= 0.8).length >= 3) {
        await this.updateAgentFileWithProvider(result.provider, analyzer);
      }
    }
  }



  /**
   * Update AGENT.md using the AI provider to intelligently incorporate learnings
   */
  private async updateAgentFileWithProvider(
    providerName: string,
    analyzer: PatternAnalyzer
  ): Promise<void> {
    try {
      // Get patterns and recommendations
      const patterns = analyzer.getPatterns();
      const recommendations = analyzer.getRecommendations();
      
      // Only proceed if we have meaningful insights
      if (patterns.length === 0 && recommendations.length === 0) {
        return;
      }
      
      // Create the prompt for the AI to update AGENT.md
      const prompt = `Based on recent task executions, I've detected the following patterns and insights:

Detected patterns:
${patterns.map(p => `- ${p.description} (${Math.round(p.confidence * 100)}% confidence, ${p.occurrences} occurrences)`).join('\n')}

Recommendations:
${recommendations.map(r => `- ${r}`).join('\n')}

Please update the AGENT.md file to incorporate these learnings. Guidelines:
- DO NOT add execution history, performance metrics, or pattern sections
- Weave insights naturally into existing sections (coding standards, best practices, additional notes, etc.)
- Keep updates concise and actionable
- Only add information helpful for future AI agents
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