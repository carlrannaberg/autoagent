import { vi } from 'vitest';
import type { Provider } from '../../../../src/providers/Provider';
import type { ExecutionResult } from '../../../../src/types/index';

export class TestProviderMock implements Provider {
  name: string;
  checkAvailability: () => Promise<boolean>;
  execute: (prompt: string, contextFile?: string) => Promise<ExecutionResult>;
  chat: (prompt: string) => Promise<string>;
  
  private customHandler?: (prompt: string) => Promise<string>;
  private responseQueue: string[] = [];
  private responseIndex: number = 0;
  
  constructor(name: string = 'test-provider') {
    this.name = name;
    this.checkAvailability = vi.fn().mockResolvedValue(true);
    this.execute = vi.fn().mockImplementation(async (prompt: string) => ({
      success: true,
      output: `Executed: ${prompt}`
    }));
    this.chat = vi.fn().mockImplementation(async (prompt: string) => {
      if (this.customHandler) {
        return this.customHandler(prompt);
      }
      if (this.responseQueue.length > 0 && this.responseIndex < this.responseQueue.length) {
        return this.responseQueue[this.responseIndex++];
      }
      return 'Default response';
    });
  }
  
  setCustomHandler(handler: (prompt: string) => Promise<string>): void {
    this.customHandler = handler;
  }
  
  setCustomResponse(keyword: string, response: string): void {
    vi.mocked(this.execute).mockImplementation(async (prompt: string) => {
      if (prompt.includes(keyword)) {
        return { success: true, output: response };
      }
      return { success: true, output: `Executed: ${prompt}` };
    });
  }
  
  queueResponses(responses: string[]): void {
    this.responseQueue = responses;
    this.responseIndex = 0;
  }
  
  getResponse(keyword: string): string {
    // Default responses for common keywords
    const responses: Record<string, string> = {
      'decompose': 'Decomposition complete',
      'reflect': JSON.stringify({
        improvementScore: 0.05,
        recommendedChanges: []
      })
    };
    return responses[keyword] || 'Default response';
  }
}