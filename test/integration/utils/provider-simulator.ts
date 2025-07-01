import type { AIProvider } from '@/types/ai-provider';
import type { ExecutionResult } from '@/types/execution';

export interface ProviderSimulatorOptions {
  name: string;
  rateLimitThreshold?: number;
  errorRate?: number;
  responseDelay?: number;
  customResponses?: Map<string, string | Error>;
}

export class ProviderSimulator implements AIProvider {
  name: string;
  private callCount: number = 0;
  private rateLimitThreshold: number;
  private errorRate: number;
  private responseDelay: number;
  private customResponses: Map<string, string | Error>;
  private isRateLimited: boolean = false;
  
  public executionHistory: Array<{
    prompt: string;
    response: string | Error;
    timestamp: Date;
    duration: number;
  }> = [];

  constructor(options: ProviderSimulatorOptions) {
    this.name = options.name;
    this.rateLimitThreshold = options.rateLimitThreshold || Infinity;
    this.errorRate = options.errorRate || 0;
    this.responseDelay = options.responseDelay || 100;
    this.customResponses = options.customResponses || new Map();
  }

  async execute(prompt: string, options: any = {}): Promise<string> {
    const startTime = Date.now();
    this.callCount++;

    if (this.isRateLimited || this.callCount > this.rateLimitThreshold) {
      this.isRateLimited = true;
      const error = new Error(`${this.name}: Rate limit exceeded`);
      this.executionHistory.push({
        prompt,
        response: error,
        timestamp: new Date(),
        duration: Date.now() - startTime
      });
      throw error;
    }

    if (this.responseDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.responseDelay));
    }

    if (Math.random() < this.errorRate) {
      const error = new Error(`${this.name}: Random failure occurred`);
      this.executionHistory.push({
        prompt,
        response: error,
        timestamp: new Date(),
        duration: Date.now() - startTime
      });
      throw error;
    }

    const customResponse = this.customResponses.get(prompt);
    if (customResponse instanceof Error) {
      this.executionHistory.push({
        prompt,
        response: customResponse,
        timestamp: new Date(),
        duration: Date.now() - startTime
      });
      throw customResponse;
    }

    const response = customResponse || this.generateDefaultResponse(prompt);
    this.executionHistory.push({
      prompt,
      response,
      timestamp: new Date(),
      duration: Date.now() - startTime
    });

    return response;
  }

  private generateDefaultResponse(prompt: string): string {
    if (prompt.includes('implement')) {
      return `# Implementation by ${this.name}\n\nI'll implement the requested feature.\n\n\`\`\`typescript\n// Implementation code here\n\`\`\``;
    }
    if (prompt.includes('fix')) {
      return `# Fix by ${this.name}\n\nI've identified and fixed the issue.\n\n\`\`\`typescript\n// Fixed code here\n\`\`\``;
    }
    if (prompt.includes('test')) {
      return `# Test Implementation by ${this.name}\n\nHere are the tests:\n\n\`\`\`typescript\n// Test code here\n\`\`\``;
    }
    return `Response from ${this.name}: Processed "${prompt.slice(0, 50)}..."`;
  }

  resetRateLimit(): void {
    this.isRateLimited = false;
    this.callCount = 0;
  }

  setCustomResponse(prompt: string, response: string | Error): void {
    this.customResponses.set(prompt, response);
  }

  getMetrics(): {
    totalCalls: number;
    successfulCalls: number;
    failedCalls: number;
    averageResponseTime: number;
    isRateLimited: boolean;
  } {
    const successful = this.executionHistory.filter(h => !(h.response instanceof Error));
    const failed = this.executionHistory.filter(h => h.response instanceof Error);
    const totalDuration = this.executionHistory.reduce((sum, h) => sum + h.duration, 0);

    return {
      totalCalls: this.callCount,
      successfulCalls: successful.length,
      failedCalls: failed.length,
      averageResponseTime: this.executionHistory.length > 0 
        ? totalDuration / this.executionHistory.length 
        : 0,
      isRateLimited: this.isRateLimited
    };
  }

  reset(): void {
    this.callCount = 0;
    this.isRateLimited = false;
    this.executionHistory = [];
  }
}

export class ProviderFailoverSimulator {
  private providers: ProviderSimulator[];
  private currentProviderIndex: number = 0;

  constructor(providers: ProviderSimulator[]) {
    this.providers = providers;
  }

  async executeWithFailover(prompt: string, options: any = {}): Promise<{
    result: string;
    provider: string;
    attempts: Array<{ provider: string; error?: Error }>;
  }> {
    const attempts: Array<{ provider: string; error?: Error }> = [];

    for (let i = 0; i < this.providers.length; i++) {
      const providerIndex = (this.currentProviderIndex + i) % this.providers.length;
      const provider = this.providers[providerIndex];

      try {
        const result = await provider.execute(prompt, options);
        attempts.push({ provider: provider.name });
        return {
          result,
          provider: provider.name,
          attempts
        };
      } catch (error) {
        attempts.push({ 
          provider: provider.name, 
          error: error as Error 
        });
        
        if (i === this.providers.length - 1) {
          throw new Error(`All providers failed. Last error: ${error}`);
        }
      }
    }

    throw new Error('No providers available');
  }

  getProviderMetrics(): Map<string, ReturnType<ProviderSimulator['getMetrics']>> {
    const metrics = new Map();
    for (const provider of this.providers) {
      metrics.set(provider.name, provider.getMetrics());
    }
    return metrics;
  }

  reset(): void {
    this.currentProviderIndex = 0;
    this.providers.forEach(p => p.reset());
  }
}