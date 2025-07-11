import { AIProvider } from '../../../src/types/providers';

export class MockProvider implements AIProvider {
  name = 'mock';
  
  async executeTask(task: string, _options: unknown = {}): Promise<string> {
    // Check for mock behaviors via environment variables
    if (process.env.AUTOAGENT_MOCK_TIMEOUT === 'true') {
      await new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 100));
    }

    if (process.env.AUTOAGENT_MOCK_RATE_LIMIT === 'true') {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    if (process.env.AUTOAGENT_MOCK_AUTH_FAIL === 'true') {
      throw new Error('Authentication failed. Please check your credentials.');
    }

    if (process.env.AUTOAGENT_MOCK_FAIL === 'true') {
      throw new Error('Mock execution failed');
    }

    const delayStr = process.env.AUTOAGENT_MOCK_DELAY;
    const delay = delayStr !== undefined ? parseInt(delayStr, 10) : 0;
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Return mock successful response
    return `Mock execution completed successfully for task: ${task.substring(0, 50)}...`;
  }

  checkAvailability(): Promise<boolean> {
    return process.env.AUTOAGENT_MOCK_PROVIDER === 'true';
  }
}