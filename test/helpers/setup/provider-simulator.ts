import type { AIProvider } from '@/types/ai-provider';
// import type { ExecutionResult } from '@/types/execution';

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
  private randomSeed: number;
  
  public executionHistory: Array<{
    prompt: string;
    response: string | Error;
    timestamp: Date;
    duration: number;
  }> = [];

  constructor(options: ProviderSimulatorOptions) {
    this.name = options.name;
    this.rateLimitThreshold = options.rateLimitThreshold ?? Infinity;
    this.errorRate = options.errorRate ?? 0;
    this.responseDelay = options.responseDelay ?? 100;
    this.customResponses = options.customResponses ?? new Map();
    // Use a deterministic seed based on the provider name for reproducible results
    this.randomSeed = this.hashCode(options.name);
  }

  async execute(prompt: string, _options: any = {}): Promise<string> {
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

    // Use deterministic error pattern instead of pure randomness
    // This ensures the actual error rate matches the configured rate more precisely
    if (this.errorRate > 0 && this.shouldSimulateError()) {
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

    const response = customResponse ?? this.generateDefaultResponse(prompt);
    this.executionHistory.push({
      prompt,
      response,
      timestamp: new Date(),
      duration: Date.now() - startTime
    });

    return response;
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private seededRandom(): number {
    // Simple seeded random number generator (Linear Congruential Generator)
    this.randomSeed = (this.randomSeed * 9301 + 49297) % 233280;
    return this.randomSeed / 233280;
  }

  private shouldSimulateError(): boolean {
    // Use seeded random for deterministic but still "random" behavior
    return this.seededRandom() < this.errorRate;
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
    // Reset the random seed to ensure consistent behavior across test runs
    this.randomSeed = this.hashCode(this.name);
  }
}

export class ProviderFailoverSimulator {
  private providers: ProviderSimulator[];
  private currentProviderIndex: number = 0;
  private lastSuccessfulProviderIndex: number = 0;

  constructor(providers: ProviderSimulator[]) {
    this.providers = providers;
  }

  private isRetryableError(error: Error): boolean {
    const errorMessage = error.message.toLowerCase();
    // Non-retryable errors
    if (errorMessage.includes('invalid api key')) {
      return false;
    }
    // Retryable errors
    if (errorMessage.includes('rate limit') ||
        errorMessage.includes('usage limit') ||
        errorMessage.includes('network timeout') ||
        errorMessage.includes('model not available') ||
        errorMessage.includes('random failure')) {
      return true;
    }
    // Default to retryable for unknown errors
    return true;
  }

  async executeWithFailover(prompt: string, options: any = {}): Promise<{
    result: string;
    provider: string;
    attempts: Array<{ provider: string; error?: Error }>;
  }> {
    const attempts: Array<{ provider: string; error?: Error }> = [];

    // Start with the last successful provider, but try all providers in order if it fails
    const providerIndices = Array.from({ length: this.providers.length }, (_, i) => 
      (this.lastSuccessfulProviderIndex + i) % this.providers.length
    );

    for (const providerIndex of providerIndices) {
      const provider = this.providers[providerIndex];

      try {
        const result = await provider.execute(prompt, options);
        attempts.push({ provider: provider.name });
        this.lastSuccessfulProviderIndex = providerIndex;
        return {
          result,
          provider: provider.name,
          attempts
        };
      } catch (error) {
        const err = error as Error;
        attempts.push({ 
          provider: provider.name, 
          error: err 
        });
        
        // If it's a non-retryable error, throw immediately
        if (!this.isRetryableError(err)) {
          throw err;
        }
        
        // Continue to next provider
      }
    }

    throw new Error('All providers failed');
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
    this.lastSuccessfulProviderIndex = 0;
    this.providers.forEach(p => p.reset());
  }
}