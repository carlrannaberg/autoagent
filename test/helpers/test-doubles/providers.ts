import { vi } from 'vitest';
import type { MockedFunction } from 'vitest';
import type { ProviderInterface as AIProvider } from '../../src/providers/types.js';

export interface MockProviderOptions {
  name: string;
  behavior?: 'success' | 'failure' | 'rate-limit' | 'timeout' | 'custom';
  responses?: string[];
  failAfter?: number;
  rateLimitAfter?: number;
  timeoutAfter?: number;
  customImplementation?: (prompt: string, options: any) => Promise<string>;
}

export function createMockProvider(options: MockProviderOptions): AIProvider {
  let callCount = 0;
  
  const execute: MockedFunction<AIProvider['execute']> = vi.fn(async (prompt: string, opts?: any) => {
    callCount++;
    
    switch (options.behavior) {
      case 'failure':
        if (options.failAfter !== undefined && callCount >= options.failAfter) {
          throw new Error(`Provider ${options.name} failed`);
        }
        break;
        
      case 'rate-limit':
        if (options.rateLimitAfter !== undefined && callCount >= options.rateLimitAfter) {
          throw new Error('Rate limit exceeded');
        }
        break;
        
      case 'timeout':
        if (options.timeoutAfter !== undefined && callCount >= options.timeoutAfter) {
          await new Promise(resolve => setTimeout(resolve, 30000));
          throw new Error('Request timeout');
        }
        break;
        
      case 'custom':
        if (options.customImplementation) {
          return options.customImplementation(prompt, opts);
        }
        break;
    }
    
    if (options.responses && options.responses.length > 0) {
      const responseIndex = Math.min(callCount - 1, options.responses.length - 1);
      return options.responses[responseIndex];
    }
    
    return `Mock response from ${options.name} for: ${prompt}`;
  });
  
  const checkAvailability: MockedFunction<AIProvider['checkAvailability']> = vi.fn(() => {
    return options.behavior !== 'failure';
  });
  
  return {
    name: options.name,
    execute,
    checkAvailability
  };
}

export function createProviderScenarios(): Record<string, AIProvider> & { withPredefinedResponses: (responses: string[]) => AIProvider } {
  return {
    alwaysSuccessful: createMockProvider({
      name: 'always-successful',
      behavior: 'success'
    }),
    
    alwaysFailing: createMockProvider({
      name: 'always-failing',
      behavior: 'failure',
      failAfter: 1
    }),
    
    rateLimited: createMockProvider({
      name: 'rate-limited',
      behavior: 'rate-limit',
      rateLimitAfter: 3
    }),
    
    slowToRespond: createMockProvider({
      name: 'slow-provider',
      behavior: 'timeout',
      timeoutAfter: 2
    }),
    
    intermittentFailure: createMockProvider({
      name: 'intermittent',
      behavior: 'custom',
      customImplementation: (prompt: string) => {
        const shouldFail = Math.random() < 0.3;
        if (shouldFail) {
          throw new Error('Intermittent failure');
        }
        return `Intermittent success for: ${prompt}`;
      }
    }),
    
    withPredefinedResponses: (responses: string[]): AIProvider => createMockProvider({
      name: 'predefined',
      behavior: 'success',
      responses
    })
  };
}

export function mockProviderModule(providers: Record<string, AIProvider>): void {
  vi.doMock('../../src/providers/index.js', () => ({
    getProvider: vi.fn((name: string) => providers[name]),
    listProviders: vi.fn(() => Object.keys(providers))
  }));
}