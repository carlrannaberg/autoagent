import { Provider } from './Provider.js';
import { createProvider, getFirstAvailableProvider } from './index.js';

/**
 * Factory class for creating and managing providers
 */
export class ProviderFactory {
  /**
   * Get a provider instance, with fallback to available providers if needed
   * @param preferredProvider - The preferred provider name
   * @returns Promise resolving to a provider instance
   */
  static async getProvider(preferredProvider: string): Promise<Provider> {
    try {
      // Try to create the preferred provider
      const provider = createProvider(preferredProvider as 'claude' | 'gemini' | 'mock');
      
      // Check if it's available
      if (await provider.checkAvailability()) {
        return provider;
      }
      
      // If not available, try to get any available provider
      const fallbackProvider = await getFirstAvailableProvider();
      if (fallbackProvider) {
        return fallbackProvider;
      }
      
      throw new Error(`Provider ${preferredProvider} is not available and no fallback providers found`);
    } catch (error) {
      // If creating the provider fails, try to get any available provider
      const fallbackProvider = await getFirstAvailableProvider();
      if (fallbackProvider) {
        return fallbackProvider;
      }
      
      throw new Error(`Failed to create provider ${preferredProvider}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}