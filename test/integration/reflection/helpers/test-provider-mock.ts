import { vi } from 'vitest';
import type { Provider } from '../../../../src/providers/Provider';
import type { ExecutionResult } from '../../../../src/types/index';

export class TestProviderMock implements Provider {
  name: string;
  checkAvailability: () => Promise<boolean>;
  execute: (issueFile: string, planFile: string, contextFiles?: string[], signal?: AbortSignal, additionalDirectories?: string[]) => Promise<ExecutionResult>;
  chat: (prompt: string) => Promise<string>;
  
  private customHandler?: (prompt: string) => Promise<string> | string;
  private responseQueue: string[] = [];
  private responseIndex: number = 0;
  
  constructor(name: string = 'test-provider') {
    this.name = name;
    this.checkAvailability = vi.fn().mockResolvedValue(true);
    this.execute = vi.fn().mockImplementation((issueFile: string, _planFile: string, _contextFiles?: string[], _signal?: AbortSignal, _additionalDirectories?: string[]) => ({
      success: true,
      output: `Executed: ${issueFile}`
    }));
    this.chat = vi.fn().mockImplementation(async (prompt: string) => {
      if (this.customHandler) {
        const result = this.customHandler(prompt);
        return typeof result === 'string' ? result : await result;
      }
      if (this.responseQueue.length > 0 && this.responseIndex < this.responseQueue.length) {
        return this.responseQueue[this.responseIndex++];
      }
      return 'Default response';
    });
  }
  
  setCustomHandler(handler: (prompt: string) => Promise<string> | string): void {
    this.customHandler = handler;
  }
  
  setCustomResponse(keyword: string, response: string): void {
    vi.mocked(this.execute).mockImplementation((issueFile: string, _planFile: string, _contextFiles?: string[], _signal?: AbortSignal, _additionalDirectories?: string[]) => {
      if (issueFile.includes(keyword)) {
        return { success: true, output: response };
      }
      return { success: true, output: `Executed: ${issueFile}` };
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
    return responses[keyword] ?? 'Default response';
  }
}