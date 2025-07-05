import { ExecutionResult } from '../types/index.js';

/**
 * Options for chat requests to providers.
 */
export interface ChatOptions {
  /** Maximum tokens to generate */
  maxTokens?: number;
  /** Temperature for generation */
  temperature?: number;
  /** System prompt to use */
  systemPrompt?: string;
}

/**
 * Interface that all providers must implement.
 */
export interface ProviderInterface {
  /** Name of the provider */
  readonly name: string;
  
  /** 
   * Check if the provider is available and configured correctly.
   * @returns Promise resolving to true if available, false otherwise
   */
  checkAvailability(): Promise<boolean>;
  
  /**
   * Execute a task with the provider.
   * @param prompt The task prompt
   * @param options Additional options for execution
   * @returns Promise resolving to the execution result
   */
  execute(prompt: string, options?: Record<string, unknown>): Promise<ExecutionResult>;
  
  /**
   * Send a chat message to the provider and get a response.
   * Used for reflection and other conversational interactions.
   * @param message The message to send
   * @param options Chat options
   * @returns Promise resolving to the provider's response
   */
  chat(message: string, options?: ChatOptions): Promise<string>;
}