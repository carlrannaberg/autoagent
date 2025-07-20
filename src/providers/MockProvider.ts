import { Provider } from './Provider';
import { ChatOptions } from './types';

/**
 * Mock provider for testing purposes.
 * Provides deterministic responses without requiring external AI services.
 */
export class MockProvider extends Provider {
  /**
   * Get the name of this provider.
   */
  get name(): string {
    return 'mock';
  }

  /**
   * Mock provider is available when explicitly enabled.
   * @returns Promise resolving to true if enabled
   */
  async checkAvailability(): Promise<boolean> {
    return process.env.AUTOAGENT_MOCK_PROVIDER === 'true';
  }

  /**
   * Execute a task with mock implementation.
   * @param prompt - The task prompt/context to execute
   * @param workspace - Working directory for the task
   * @param additionalDirectories - Optional array of additional directories to give AI access to
   * @param signal - Optional abort signal for cancellation
   * @returns Promise resolving to mock output
   */
  async execute(
    prompt: string,
    workspace: string,
    additionalDirectories?: string[],
    signal?: AbortSignal
  ): Promise<string> {
    // Suppress unused parameter warnings
    void signal;
    void additionalDirectories;
    void workspace;

    // Simulate some processing delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check for test scenarios based on environment variables
    if (process.env.AUTOAGENT_MOCK_FAIL === 'true') {
      throw new Error('Mock execution failed');
    }

    if (process.env.AUTOAGENT_MOCK_TIMEOUT === 'true') {
      await new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Mock timeout')), 1000);
      });
    }

    if (process.env.AUTOAGENT_MOCK_RATE_LIMIT === 'true') {
      throw new Error('Rate limit exceeded');
    }

    if (process.env.AUTOAGENT_MOCK_AUTH_FAIL === 'true') {
      throw new Error('Authentication failed');
    }

    // Return mock success output
    return `Mock execution completed successfully for task: ${prompt.substring(0, 50)}...`;
  }

  /**
   * Send a chat message and get a mock response.
   * @param prompt - The message to send
   * @param options - Optional chat configuration
   * @returns Promise resolving to mock response
   */
  async chat(prompt: string, options?: ChatOptions): Promise<string> {
    // Suppress unused parameter warning
    void options;

    // Simulate some processing delay
    await new Promise(resolve => setTimeout(resolve, 50));

    // Return a simple mock response
    return `Mock response to: ${prompt}`;
  }
}