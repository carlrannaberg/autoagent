import { describe, it, expect } from 'vitest';
import { ClaudeProvider } from '../../src/providers/ClaudeProvider';
import { GeminiProvider } from '../../src/providers/GeminiProvider';
import { MockProvider } from '../../src/providers/MockProvider';

describe('Provider Availability Smoke Tests', () => {
  it('should load Claude provider', () => {
    const provider = new ClaudeProvider();
    expect(provider).toBeDefined();
    expect(provider.name).toBe('claude');
  });

  it('should load Gemini provider', () => {
    const provider = new GeminiProvider();
    expect(provider).toBeDefined();
    expect(provider.name).toBe('gemini');
  });

  it('should load Mock provider', () => {
    const provider = new MockProvider();
    expect(provider).toBeDefined();
    expect(provider.name).toBe('mock');
  });

  it('should check Claude availability without crashing', async () => {
    const provider = new ClaudeProvider();
    
    // This should not throw even if Claude is not installed
    const available = await provider.checkAvailability();
    expect(typeof available).toBe('boolean');
  });

  it('should check Gemini availability without crashing', async () => {
    const provider = new GeminiProvider();
    
    // This should not throw even if Gemini is not installed
    const available = await provider.checkAvailability();
    expect(typeof available).toBe('boolean');
  });

  it('should always have Mock provider available', async () => {
    // Mock provider requires environment variable to be available
    process.env.AUTOAGENT_MOCK_PROVIDER = 'true';
    
    const provider = new MockProvider();
    const available = await provider.checkAvailability();
    expect(available).toBe(true);
    
    // Clean up
    delete process.env.AUTOAGENT_MOCK_PROVIDER;
  });
});

describe('Provider Factory Smoke Tests', () => {
  it('should create providers via factory', async () => {
    const { createProvider } = await import('../../src/providers');
    
    const claude = createProvider('claude');
    expect(claude.name).toBe('claude');
    
    const gemini = createProvider('gemini');
    expect(gemini.name).toBe('gemini');
    
    const mock = createProvider('mock');
    expect(mock.name).toBe('mock');
  });

  it('should get available providers without crashing', async () => {
    // Enable mock provider for this test
    process.env.AUTOAGENT_MOCK_PROVIDER = 'true';
    
    const { getAvailableProviders } = await import('../../src/providers');
    
    const providers = await getAvailableProviders();
    expect(Array.isArray(providers)).toBe(true);
    
    // At least mock provider should be available
    expect(providers.length).toBeGreaterThan(0);
    expect(providers).toContain('mock');
    
    // Clean up
    delete process.env.AUTOAGENT_MOCK_PROVIDER;
  });

  it('should get first available provider', async () => {
    // Enable mock provider for test
    process.env.AUTOAGENT_MOCK_PROVIDER = 'true';
    
    const { getFirstAvailableProvider } = await import('../../src/providers');
    
    const provider = await getFirstAvailableProvider();
    expect(provider).not.toBeNull();
    
    // Should at least return mock provider
    if (provider) {
      expect(['claude', 'gemini', 'mock']).toContain(provider.name);
    }
    
    // Clean up
    delete process.env.AUTOAGENT_MOCK_PROVIDER;
  });
});