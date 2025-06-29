import { Provider } from './Provider';
import { ClaudeProvider } from './ClaudeProvider';
import { GeminiProvider } from './GeminiProvider';

export { Provider, ClaudeProvider, GeminiProvider };

/**
 * Create a provider instance based on the provider type.
 * @param providerType - Type of provider to create ('claude' or 'gemini')
 * @returns Provider instance
 * @throws Error if provider type is invalid
 */
export function createProvider(providerType: 'claude' | 'gemini'): Provider {
  switch (providerType) {
    case 'claude':
      return new ClaudeProvider();
    case 'gemini':
      return new GeminiProvider();
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
    new GeminiProvider()
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
  preferredProviders?: ('claude' | 'gemini')[]
): Promise<Provider | null> {
  const checkOrder = preferredProviders || ['claude', 'gemini'];

  for (const providerType of checkOrder) {
    const provider = createProvider(providerType);
    if (await provider.checkAvailability()) {
      return provider;
    }
  }

  return null;
}