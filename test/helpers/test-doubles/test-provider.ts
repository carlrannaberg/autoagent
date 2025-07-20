import { EventEmitter } from 'events';

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

  // For the standard Provider interface
  async execute(
    prompt: string,
    _workspace: string,
    _additionalDirectories?: string[],
    _signal?: AbortSignal
  ): Promise<string> {
    // Increment execution count first
    this.executionCount++;
    
    // Check if we should fail
    if (this.failAfter >= 0 && this.executionCount > this.failAfter) {
      throw new Error(this.failureMessage);
    }
    
    // Look for matching response based on prompt content
    let response = this.defaultResponse;
    for (const [key, value] of Array.from(this.responses.entries())) {
      if (prompt.includes(key)) {
        response = value;
        break;
      }
    }

    if (this.responseDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.responseDelay));
    }

    return response;
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

  getName(): string {
    return this.name;
  }
}