import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { runReflection } from '../../../src/core/reflection/runner.js';
import { ProviderFactory } from '../../../src/providers/factory.js';
import { loadConfig } from '../../../src/utils/config-loader.js';
import type { Provider } from '../../../src/types/providers.js';
import type { Config } from '../../../src/types/config.js';
import {
  createTempDir,
  cleanupTempDir,
  createSpecFile,
  createMockProviderResponse,
  createMockReflectionResponse,
  createSampleSpec
} from './helpers/test-helpers.js';

// Mock config loader
vi.mock('../../../src/utils/config-loader.js');

describe('Configuration Integration with Reflection', () => {
  let tempDir: string;
  let mockProvider: Provider;
  const mockLoadConfig = loadConfig as ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();
    tempDir = await createTempDir();
    
    mockProvider = {
      name: 'claude',
      generateCompletion: vi.fn(),
      isAvailable: vi.fn().mockResolvedValue(true),
      getRateLimits: vi.fn().mockReturnValue({
        requestsPerMinute: 10,
        tokensPerMinute: 100000
      })
    };
    
    vi.spyOn(ProviderFactory, 'getProvider').mockResolvedValue(mockProvider);
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
    vi.restoreAllMocks();
  });

  it('should use reflection config from config file', async () => {
    const config: Config = {
      provider: 'claude',
      reflection: {
        enabled: true,
        maxIterations: 2,
        improvementThreshold: 7.5,
        backupOriginal: false
      }
    };
    
    mockLoadConfig.mockReturnValue(config);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Two iterations based on config
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Need improvement'], 6)
      ))
      .mockResolvedValueOnce(createMockProviderResponse('Improved'))
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Better'], 7)
      ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(2); // Max iterations from config
    expect(mockLoadConfig).toHaveBeenCalled();
  });

  it('should override config with CLI options', async () => {
    const config: Config = {
      provider: 'claude',
      reflection: {
        enabled: true,
        maxIterations: 5,
        improvementThreshold: 9,
        backupOriginal: true
      }
    };
    
    mockLoadConfig.mockReturnValue(config);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse(['Good'], 8.5)
    ));

    // CLI options override config
    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 1,
      improvementThreshold: 8,
      backupOriginal: false
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(1); // CLI override
    expect(result.finalScore).toBe(8.5);
  });

  it('should handle disabled reflection in config', async () => {
    const config: Config = {
      provider: 'claude',
      reflection: {
        enabled: false
      }
    };
    
    mockLoadConfig.mockReturnValue(config);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));

    // When reflection is disabled via config, should not run
    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('disabled');
  });

  it('should merge multiple config sources', async () => {
    // Global config
    const globalConfig: Config = {
      provider: 'gemini',
      reflection: {
        enabled: true,
        maxIterations: 10
      }
    };
    
    // Local config file
    const localConfigPath = join(tempDir, '.autoagent.json');
    await writeFile(localConfigPath, JSON.stringify({
      reflection: {
        improvementThreshold: 8.5,
        backupOriginal: true
      }
    }));
    
    mockLoadConfig.mockImplementation((dir?: string) => {
      if (dir === tempDir) {
        return {
          ...globalConfig,
          reflection: {
            ...globalConfig.reflection,
            improvementThreshold: 8.5,
            backupOriginal: true
          }
        };
      }
      return globalConfig;
    });
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse(['Excellent'], 9)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(mockLoadConfig).toHaveBeenCalledWith(tempDir);
  });

  it('should handle environment variable overrides', async () => {
    // Simulate environment variables
    process.env.AUTOAGENT_REFLECTION_ENABLED = 'true';
    process.env.AUTOAGENT_REFLECTION_MAX_ITERATIONS = '3';
    process.env.AUTOAGENT_REFLECTION_THRESHOLD = '7';
    
    const config: Config = {
      provider: 'claude'
    };
    
    mockLoadConfig.mockReturnValue({
      ...config,
      reflection: {
        enabled: true,
        maxIterations: 3,
        improvementThreshold: 7
      }
    });
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse(['Good'], 7.5)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.finalScore).toBe(7.5);
    
    // Cleanup env vars
    delete process.env.AUTOAGENT_REFLECTION_ENABLED;
    delete process.env.AUTOAGENT_REFLECTION_MAX_ITERATIONS;
    delete process.env.AUTOAGENT_REFLECTION_THRESHOLD;
  });

  it('should validate configuration values', async () => {
    const invalidConfig: Config = {
      provider: 'claude',
      reflection: {
        enabled: true,
        maxIterations: -1, // Invalid
        improvementThreshold: 15 // Invalid (should be 0-10)
      }
    };
    
    mockLoadConfig.mockReturnValue(invalidConfig);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/invalid|configuration/i);
  });

  it('should use default values when config is partial', async () => {
    const partialConfig: Config = {
      provider: 'claude',
      reflection: {
        enabled: true
        // Missing other fields
      }
    };
    
    mockLoadConfig.mockReturnValue(partialConfig);
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Should use defaults (e.g., maxIterations: 5, threshold: 8)
    for (let i = 0; i < 5; i++) {
      mockGenerate
        .mockResolvedValueOnce(createMockProviderResponse(
          createMockReflectionResponse(['Improving'], 7 + i * 0.3)
        ))
        .mockResolvedValueOnce(createMockProviderResponse('Better'));
    }

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBeGreaterThan(1);
  });

  it('should handle config precedence correctly', async () => {
    // Config precedence: CLI > ENV > local config > global config
    
    // Global config
    const globalConfig: Config = {
      provider: 'claude',
      reflection: {
        enabled: true,
        maxIterations: 10,
        improvementThreshold: 9
      }
    };
    
    // Environment variable
    process.env.AUTOAGENT_REFLECTION_MAX_ITERATIONS = '7';
    
    mockLoadConfig.mockReturnValue({
      ...globalConfig,
      reflection: {
        ...globalConfig.reflection!,
        maxIterations: 7 // From env
      }
    });
    
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse(['Done'], 8.5)
    ));

    // CLI option should override everything
    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 1, // CLI override
      improvementThreshold: 8
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(1); // CLI value wins
    
    delete process.env.AUTOAGENT_REFLECTION_MAX_ITERATIONS;
  });
});