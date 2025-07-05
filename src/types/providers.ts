/**
 * Provider interface types
 */

export interface CompletionOptions {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export interface CompletionResponse {
  content: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}

export interface Provider {
  name: string;
  generateCompletion: (prompt: string, options?: CompletionOptions) => Promise<CompletionResponse>;
  isAvailable: () => Promise<boolean>;
  getRateLimits: () => {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
}

export interface ProviderResponse {
  success: boolean;
  content?: string;
  error?: Error;
  retryable?: boolean;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}