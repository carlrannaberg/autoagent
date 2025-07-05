import { Provider } from './Provider';
import { ClaudeProvider } from './ClaudeProvider';
import { GeminiProvider } from './GeminiProvider';
import { MockProvider } from './MockProvider';
import { ProviderInterface, ChatOptions } from './types';

export { Provider, ClaudeProvider, GeminiProvider, MockProvider, ProviderInterface, ChatOptions };

/**
 * Create a provider instance based on the provider type.
 * @param providerType - Type of provider to create ('claude', 'gemini', or 'mock')
 * @returns Provider instance
 * @throws Error if provider type is invalid
 */
export function createProvider(providerType: 'claude' | 'gemini' | 'mock'): Provider {
  switch (providerType) {
    case 'claude':
      return new ClaudeProvider();
    case 'gemini':
      return new GeminiProvider();
    case 'mock':
      return new MockProvider();
    default:
      throw new Error(`Invalid provider type: ${providerType as string}`);
  }
}

/**
 * Get all available providers on the system.
 * @returns Promise resolving to array of available provider names
 */
export async function getAvailableProviders(): Promise<string[]> {
  const providers: Provider[] = [
    new ClaudeProvider(),
    new GeminiProvider(),
    new MockProvider()
  ];

  const availabilityChecks = await Promise.all(
    providers.map(async (provider) => ({
      name: provider.name,
      available: await provider.checkAvailability()
    }))
  );

  return availabilityChecks
    .filter(({ available }) => available)
    .map(({ name }) => name);
}

/**
 * Get the first available provider.
 * @param preferredProviders - Optional array of preferred provider names in order
 * @returns Promise resolving to the first available provider or null
 */
export async function getFirstAvailableProvider(
  preferredProviders?: ('claude' | 'gemini' | 'mock')[]
): Promise<Provider | null> {
  // Check mock provider first if enabled
  if (process.env.AUTOAGENT_MOCK_PROVIDER === 'true') {
    try {
      const mockProvider = createProvider('mock');
      if (await mockProvider.checkAvailability()) {
        return mockProvider;
      }
    } catch (error) {
      // Continue to other providers
    }
  }
  
  const checkOrder = preferredProviders || ['claude', 'gemini', 'mock'];

  for (const providerType of checkOrder) {
    try {
      const provider = createProvider(providerType);
      if (await provider.checkAvailability()) {
        return provider;
      }
    } catch (error) {
      // Continue to next provider if creation or check fails
      continue;
    }
  }

  return null;
}