import { EventEmitter } from 'events';
import { ExecutionResult, ProviderName } from '../../../src/types';

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
    this.responseDelay = config.responseDelay ?? 0;
    this.failAfter = config.failAfter ?? -1;
    this.failureMessage = config.failureMessage ?? 'Test provider failure';
    this.responses = config.responses ?? new Map();
    this.defaultResponse = config.defaultResponse ?? `Response from ${this.name}`;
    this.isAvailable = config.isAvailable !== false;
  }

  generatePrompt(task: string, context?: string): string {
    return `${task}${context !== null && context !== undefined && context !== '' ? `\n\nContext:\n${context}` : ''}`;
  }

  // For the standard Provider interface (with file paths)
  async execute(
    issueFile: string,
    planFile: string,
    _contextFiles?: string[],
    _signal?: AbortSignal,
    _additionalDirectories?: string[]
  ): Promise<ExecutionResult> {
    // Increment execution count first
    this.executionCount++;
    
    // Check if we should fail
    if (this.failAfter >= 0 && this.executionCount > this.failAfter) {
      return {
        success: false,
        error: this.failureMessage,
        output: '',
        provider: this.name as ProviderName,
        issueNumber: 0,
        duration: 0,
        filesModified: []
      };
    }
    
    // Handle prompt-based calls (bootstrap/createIssue)
    if (typeof issueFile === 'string' && !issueFile.includes('.md') && planFile === '') {
      // This is a prompt-based call
      let response = this.defaultResponse;
      
      // Look for matching response based on prompt content
      for (const [key, value] of Array.from(this.responses.entries())) {
        if (issueFile.includes(key)) {
          response = value;
          break;
        }
      }
      
      return {
        success: true,
        issueNumber: 1,
        duration: 0,
        output: response || 'Success',
        filesChanged: [],
        provider: this.name as any
      };
    }

    if (this.responseDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.responseDelay));
    }

    // Find a matching response or use default
    let response = this.defaultResponse;
    for (const [key, value] of Array.from(this.responses.entries())) {
      if (issueFile.includes(key) || planFile.includes(key)) {
        response = value;
        break;
      }
    }

    return {
      success: true,
      output: response,
      provider: this.name as ProviderName,
      issueNumber: parseInt(issueFile.match(/(\d+)/)?.[1] ?? '1'),
      duration: this.responseDelay,
      filesModified: []
    };
  }

  checkRateLimit(): { isLimited: boolean; resetTime?: number } {
    return { isLimited: false };
  }

  checkAvailability(): boolean {
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