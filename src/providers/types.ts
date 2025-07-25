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
  /** Abort signal for cancellation */
  signal?: AbortSignal;
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
   * @param prompt The task prompt/context to execute
   * @param workspace Working directory for the task
   * @param additionalDirectories Optional array of additional directories to give AI access to
   * @param signal Optional abort signal for cancellation
   * @returns Promise resolving to the task output string
   */
  execute(
    prompt: string,
    workspace: string,
    additionalDirectories?: string[],
    signal?: AbortSignal
  ): Promise<string>;
  
  /**
   * Send a chat message to the provider and get a response.
   * Used for reflection and other conversational interactions.
   * @param message The message to send
   * @param options Chat options
   * @returns Promise resolving to the provider's response
   */
  chat(message: string, options?: ChatOptions): Promise<string>;
}