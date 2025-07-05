import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { runReflection } from '../../../src/core/reflection/runner.js';
import { ProviderFactory } from '../../../src/providers/factory.js';
import type { Provider } from '../../../src/types/providers.js';
import {
  createTempDir,
  cleanupTempDir,
  createSpecFile,
  createMockProviderResponse,
  createMockProviderError,
  createMockReflectionResponse,
  createMockImprovementResponse,
  createSampleSpec
} from './helpers/test-helpers.js';

describe('Provider Integration with Reflection', () => {
  let tempDir: string;
  let mockClaude: Provider;
  let mockGemini: Provider;

  beforeEach(async () => {
    vi.clearAllMocks();
    tempDir = await createTempDir();
    
    // Create mock providers
    mockClaude = {
      name: 'claude',
      generateCompletion: vi.fn(),
      isAvailable: vi.fn().mockResolvedValue(true),
      getRateLimits: vi.fn().mockReturnValue({
        requestsPerMinute: 10,
        tokensPerMinute: 100000
      })
    };
    
    mockGemini = {
      name: 'gemini',
      generateCompletion: vi.fn(),
      isAvailable: vi.fn().mockResolvedValue(true),
      getRateLimits: vi.fn().mockReturnValue({
        requestsPerMinute: 5,
        tokensPerMinute: 50000
      })
    };
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
    vi.restoreAllMocks();
  });

  it('should work with Claude provider', async () => {
    vi.spyOn(ProviderFactory, 'getProvider').mockResolvedValue(mockClaude);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockClaude.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Add error handling'], 7)
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        'Improved content with error handling'
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['All good'], 9.2)
      ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.provider).toBe('claude');
    expect(mockGenerate).toHaveBeenCalled();
    expect(ProviderFactory.getProvider).toHaveBeenCalledWith('claude');
  });

  it('should work with Gemini provider', async () => {
    vi.spyOn(ProviderFactory, 'getProvider').mockResolvedValue(mockGemini);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockGemini.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Add performance metrics'], 8.5)
      ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'gemini',
      workingDir: tempDir,
      improvementThreshold: 8
    });

    expect(result.success).toBe(true);
    expect(result.provider).toBe('gemini');
    expect(mockGenerate).toHaveBeenCalled();
    expect(ProviderFactory.getProvider).toHaveBeenCalledWith('gemini');
  });

  it('should handle provider failover during reflection', async () => {
    // First call returns Claude, subsequent calls return Gemini
    const getProviderSpy = vi.spyOn(ProviderFactory, 'getProvider')
      .mockResolvedValueOnce(mockClaude)
      .mockResolvedValue(mockGemini);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockClaudeGenerate = mockClaude.generateCompletion as ReturnType<typeof vi.fn>;
    const mockGeminiGenerate = mockGemini.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Claude fails with rate limit
    mockClaudeGenerate.mockResolvedValueOnce(createMockProviderError('Rate limit exceeded'));
    
    // Gemini succeeds
    mockGeminiGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Add security section'], 7.5)
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        'Content with security section'
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Secure now'], 9.1)
      ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.provider).toBe('gemini'); // Should have failed over
    expect(mockClaudeGenerate).toHaveBeenCalledOnce();
    expect(mockGeminiGenerate).toHaveBeenCalledTimes(3);
  });

  it('should handle provider-specific response formats', async () => {
    vi.spyOn(ProviderFactory, 'getProvider').mockResolvedValue(mockClaude);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('complex'));
    const mockGenerate = mockClaude.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Simulate different response formats from provider
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        `Analysis:
        The specification needs improvements in several areas.
        
        Improvements needed:
        1. Add disaster recovery procedures
        2. Include monitoring specifications
        
        Score: 6.5/10`
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockImprovementResponse(createSampleSpec('complex'), [
          'Added DR procedures with RTO/RPO',
          'Added monitoring with Prometheus'
        ])
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        `The specification is now comprehensive.
        
        Score: 9/10
        
        Only minor formatting improvements could be made.`
      ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.finalScore).toBe(9);
  });

  it('should respect provider rate limits', async () => {
    vi.spyOn(ProviderFactory, 'getProvider').mockResolvedValue(mockClaude);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockClaude.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Track call timestamps
    const callTimes: number[] = [];
    mockGenerate.mockImplementation(async () => {
      callTimes.push(Date.now());
      return createMockProviderResponse(
        createMockReflectionResponse(['Some improvement'], 8.5)
      );
    });

    await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    // Verify rate limits were checked
    expect(mockClaude.getRateLimits).toHaveBeenCalled();
  });

  it('should handle provider timeout gracefully', async () => {
    const getProviderSpy = vi.spyOn(ProviderFactory, 'getProvider')
      .mockResolvedValueOnce(mockClaude)
      .mockResolvedValue(mockGemini);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockClaudeGenerate = mockClaude.generateCompletion as ReturnType<typeof vi.fn>;
    const mockGeminiGenerate = mockGemini.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Claude times out (simulated with rejection)
    mockClaudeGenerate.mockRejectedValueOnce(new Error('Request timeout'));
    
    // Gemini works
    mockGeminiGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse(['Good spec'], 9.3)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.provider).toBe('gemini');
  });

  it('should handle provider switching mid-reflection', async () => {
    // Simulate provider becoming unavailable mid-process
    let claudeCallCount = 0;
    mockClaude.isAvailable = vi.fn().mockImplementation(async () => {
      return claudeCallCount++ < 2; // Available for first 2 calls only
    });
    
    const getProviderSpy = vi.spyOn(ProviderFactory, 'getProvider')
      .mockImplementation(async (preferred) => {
        if (preferred === 'claude' && await mockClaude.isAvailable()) {
          return mockClaude;
        }
        return mockGemini;
      });
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockClaudeGenerate = mockClaude.generateCompletion as ReturnType<typeof vi.fn>;
    const mockGeminiGenerate = mockGemini.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Claude handles first reflection
    mockClaudeGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Need improvements'], 6)
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        'Improved content'
      ));
    
    // Gemini handles second reflection
    mockGeminiGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse(['All good now'], 9.5)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(mockClaudeGenerate).toHaveBeenCalledTimes(2);
    expect(mockGeminiGenerate).toHaveBeenCalledTimes(1);
  });

  it('should handle different provider token limits', async () => {
    // Mock a provider with very low token limit
    const mockLimitedProvider: Provider = {
      name: 'limited',
      generateCompletion: vi.fn(),
      isAvailable: vi.fn().mockResolvedValue(true),
      getRateLimits: vi.fn().mockReturnValue({
        requestsPerMinute: 2,
        tokensPerMinute: 1000 // Very low
      })
    };
    
    vi.spyOn(ProviderFactory, 'getProvider').mockResolvedValue(mockLimitedProvider);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('complex'));
    const mockGenerate = mockLimitedProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Should still work despite low limits
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse(['Needs work'], 8.5)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'limited',
      workingDir: tempDir,
      improvementThreshold: 8
    });

    expect(result.success).toBe(true);
    expect(mockLimitedProvider.getRateLimits).toHaveBeenCalled();
  });
});