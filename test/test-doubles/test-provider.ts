import { EventEmitter } from 'events';
import { ExecutionResult } from '../../src/types';

export interface TestProviderConfig {
  name: string;
  responseDelay?: number;
  failAfter?: number;
  failureMessage?: string;
  responses?: Map<string, string>;
  defaultResponse?: string;
  isAvailable?: boolean;
}

export class TestProvider extends EventEmitter {
  public name: string;
  private responseDelay: number;
  public failAfter: number;
  private failureMessage: string;
  private executionCount: number = 0;
  public responses: Map<string, string>;
  public defaultResponse: string;
  private isAvailable: boolean;

  constructor(config: TestProviderConfig) {
    super();
    this.name = config.name;
    this.responseDelay = config.responseDelay || 0;
    this.failAfter = config.failAfter || -1;
    this.failureMessage = config.failureMessage || 'Test provider failure';
    this.responses = config.responses || new Map();
    this.defaultResponse = config.defaultResponse || `Response from ${this.name}`;
    this.isAvailable = config.isAvailable !== false;
  }

  async generatePrompt(task: string, context?: string): Promise<string> {
    return `${task}${context ? `\n\nContext:\n${context}` : ''}`;
  }

  // For the standard Provider interface (with file paths)
  async execute(
    issueFile: string,
    planFile: string,
    contextFiles?: string[],
    signal?: AbortSignal
  ): Promise<ExecutionResult> {
    this.executionCount++;
    
    if (this.failAfter >= 0 && this.executionCount > this.failAfter) {
      throw new Error(this.failureMessage);
    }

    if (this.responseDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.responseDelay));
    }

    // Find a matching response or use default
    let response = this.defaultResponse;
    for (const [key, value] of this.responses) {
      if (issueFile.includes(key) || planFile.includes(key)) {
        response = value;
        break;
      }
    }

    return {
      success: true,
      result: response,
      output: response,
      provider: this.name,
      issueNumber: parseInt(issueFile.match(/(\d+)/)?.[1] || '1'),
      tokensUsed: response.length,
      duration: this.responseDelay,
      filesModified: []
    };
  }

  async checkRateLimit(): Promise<{ isLimited: boolean; resetTime?: number }> {
    return { isLimited: false };
  }

  async checkAvailability(): Promise<boolean> {
    return this.isAvailable;
  }

  setResponse(task: string, response: string): void {
    this.responses.set(task, response);
  }

  setAvailability(available: boolean): void {
    this.isAvailable = available;
  }

  reset(): void {
    this.executionCount = 0;
  }

  getExecutionCount(): number {
    return this.executionCount;
  }
}