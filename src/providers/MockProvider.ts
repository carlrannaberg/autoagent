import { Provider } from './Provider';
import { ExecutionResult } from '../types';
import { ChatOptions } from './types';

/**
 * Mock provider for testing purposes.
 * Provides deterministic responses without requiring external AI services.
 */
export class MockProvider extends Provider {
  get name(): string {
    return 'mock';
  }

  checkAvailability(): Promise<boolean> {
    // Mock provider is available when explicitly enabled
    return Promise.resolve(process.env.AUTOAGENT_MOCK_PROVIDER === 'true');
  }

  async execute(
    issueFile: string,
    planFile: string,
    contextFiles?: string[],
    signal?: AbortSignal
  ): Promise<ExecutionResult> {
    // Suppress unused parameter warnings
    void signal;
    void contextFiles;
    void planFile;
    
    const startTime = Date.now();
    
    // Check if this is a direct prompt (bootstrap command) or a file path
    const isDirectPrompt = !issueFile.includes('.md') || issueFile.includes('You are an expert');
    
    // Extract issue number from file path or use 1 for direct prompts  
    const issueMatch = isDirectPrompt ? null : issueFile.match(/(\d+)-/);
    const issueNumber = (issueMatch?.[1] !== undefined) ? parseInt(issueMatch[1], 10) : 1;
    
    // Check for mock error conditions
    if (process.env.AUTOAGENT_MOCK_FAIL === 'true') {
      return {
        success: false,
        issueNumber,
        duration: Date.now() - startTime,
        output: 'Mock execution failed as requested',
        error: 'Mock execution failed',
        filesChanged: []
      };
    }

    if (process.env.AUTOAGENT_MOCK_TIMEOUT === 'true') {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 100);
      });
    }

    if (process.env.AUTOAGENT_MOCK_RATE_LIMIT === 'true') {
      return {
        success: false,
        issueNumber,
        duration: Date.now() - startTime,
        output: 'Rate limit exceeded',
        error: 'Rate limit exceeded. Please try again later.',
        filesChanged: []
      };
    }

    if (process.env.AUTOAGENT_MOCK_AUTH_FAIL === 'true') {
      return {
        success: false,
        issueNumber,
        duration: Date.now() - startTime,
        output: 'Authentication failed',
        error: 'Authentication failed. Please check your credentials.',
        filesChanged: []
      };
    }

    // Add artificial delay if configured
    const delayStr = process.env.AUTOAGENT_MOCK_DELAY;
    const delay = delayStr !== undefined ? parseInt(delayStr, 10) : 0;
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Return successful mock response
    // For most E2E tests, return simple "Success" to match expectations
    const mockOutput = 'Success';
    const filesChanged: string[] = [];
    
    return {
      success: true,
      issueNumber,
      duration: Date.now() - startTime,
      output: mockOutput,
      filesChanged
    };
  }

  /**
   * Send a chat message and get a mock response.
   * Used for testing reflection and other interactive AI operations.
   * @param prompt - The prompt to send
   * @param options - Optional configuration for the chat request
   * @returns Promise resolving to mock response
   */
  chat(prompt: string, options?: ChatOptions): Promise<string> {
    // Suppress unused parameter warnings
    void options;

    // Check for mock error conditions
    if (process.env.AUTOAGENT_MOCK_CHAT_FAIL === 'true') {
      throw new Error('Mock chat failed as requested');
    }

    // Check if we should return specific reflection analysis
    if (prompt.includes('You are reviewing a project decomposition')) {
      // Return a valid reflection analysis response
      return Promise.resolve(JSON.stringify({
        improvementScore: 0.2,
        identifiedGaps: [
          {
            type: 'detail',
            description: 'Mock gap for testing',
            relatedIssues: ['issue-1']
          }
        ],
        recommendedChanges: [
          {
            type: 'ADD_ISSUE',
            target: 'new-issue',
            description: 'Mock change for testing',
            content: 'Mock content',
            rationale: 'Mock rationale'
          }
        ],
        reasoning: 'Mock reflection analysis for testing'
      }));
    }

    // Default mock response
    return Promise.resolve('Mock response to: ' + prompt.substring(0, 50) + '...');
  }
}