import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { runReflection } from '../../../src/core/reflection/runner.js';
import { ProviderFactory } from '../../../src/providers/factory.js';
import type { Provider } from '../../../src/types/providers.js';
import {
  createTempDir,
  cleanupTempDir,
  createSpecFile,
  createIssueFiles,
  readIssueFile,
  createMockProviderResponse,
  createMockReflectionResponse,
  createMockImprovementResponse,
  createSampleSpec,
  createSampleIssue
} from './helpers/test-helpers.js';

describe('Full Reflection Cycle Integration', () => {
  let tempDir: string;
  let mockProvider: Provider;

  beforeEach(async () => {
    vi.clearAllMocks();
    tempDir = await createTempDir();
    
    // Create mock provider
    mockProvider = {
      name: 'claude',
      generateCompletion: vi.fn(),
      isAvailable: vi.fn().mockResolvedValue(true),
      getRateLimits: vi.fn().mockReturnValue({
        requestsPerMinute: 10,
        tokensPerMinute: 100000
      })
    };
    
    // Mock provider factory
    vi.spyOn(ProviderFactory, 'getProvider').mockResolvedValue(mockProvider);
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
    vi.restoreAllMocks();
  });

  it('should complete a full reflection cycle with a simple spec', async () => {
    // Create test files
    const specContent = createSampleSpec('simple');
    const specPath = await createSpecFile(tempDir, specContent);
    await createIssueFiles(tempDir, [
      { number: 1, content: createSampleIssue(1, 'Implement authentication service') },
      { number: 2, content: createSampleIssue(2, 'Add user session management') }
    ]);

    // Mock provider responses
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    // First reflection response - suggests improvements
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse([
        'Add more specific error handling scenarios',
        'Include performance requirements',
        'Specify token expiration times'
      ], 7)
    ));
    
    // Improvement application response
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockImprovementResponse(specContent, [
        'Added error handling for invalid credentials',
        'Added performance requirement of < 200ms response time',
        'Specified JWT token expiration of 24 hours'
      ])
    ));
    
    // Second reflection response - high score
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse([
        'Minor: Consider adding rate limiting details'
      ], 9)
    ));

    // Run reflection
    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 3,
      improvementThreshold: 8,
      backupOriginal: true
    });

    // Verify results
    expect(result.success).toBe(true);
    expect(result.iterations).toBe(2);
    expect(result.finalScore).toBe(9);
    expect(result.improvements).toHaveLength(2);
    
    // Verify spec file was updated
    const updatedContent = await readFile(specPath, 'utf-8');
    expect(updatedContent).toContain('error handling for invalid credentials');
    expect(updatedContent).toContain('200ms response time');
    expect(updatedContent).toContain('24 hours');
    
    // Verify backup was created
    const backupPath = specPath + '.backup';
    const backupContent = await readFile(backupPath, 'utf-8');
    expect(backupContent).toBe(specContent);
    
    // Verify provider was called correctly
    expect(mockGenerate).toHaveBeenCalledTimes(3);
  });

  it('should handle complex specifications with multiple iterations', async () => {
    // Create complex spec
    const specContent = createSampleSpec('complex');
    const specPath = await createSpecFile(tempDir, specContent);
    await createIssueFiles(tempDir, [
      { number: 1, content: createSampleIssue(1, 'Implement event ingestion') },
      { number: 2, content: createSampleIssue(2, 'Add stream processing') },
      { number: 3, content: createSampleIssue(3, 'Create monitoring dashboard') }
    ]);

    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    // First iteration - low score
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse([
        'Missing disaster recovery procedures',
        'No data retention policies specified',
        'Lack of performance testing strategy',
        'Missing cost estimation'
      ], 6)
    ));
    
    // First improvement
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockImprovementResponse(specContent, [
        'Added disaster recovery with RTO < 1 hour',
        'Added 90-day data retention policy',
        'Added load testing requirements',
        'Added estimated monthly cost of $5000'
      ])
    ));
    
    // Second iteration - medium score
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse([
        'Missing integration test requirements',
        'No specification for alerting thresholds'
      ], 7.5)
    ));
    
    // Second improvement
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockImprovementResponse(specContent, [
        'Added integration test coverage requirement of 80%',
        'Added specific alerting thresholds for latency and error rates'
      ])
    ));
    
    // Third iteration - high score
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse([
        'Comprehensive specification with all major aspects covered'
      ], 9.5)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 5,
      improvementThreshold: 9
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(3);
    expect(result.finalScore).toBe(9.5);
    expect(result.improvements).toHaveLength(3);
    
    // Verify all improvements were applied
    const finalContent = await readFile(specPath, 'utf-8');
    expect(finalContent).toContain('disaster recovery');
    expect(finalContent).toContain('data retention');
    expect(finalContent).toContain('integration test coverage');
    expect(finalContent).toContain('alerting thresholds');
  });

  it('should stop early when improvement threshold is met', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    // First reflection - already high score
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse([
        'Specification is already comprehensive and well-structured'
      ], 9.2)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 5,
      improvementThreshold: 9
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(1);
    expect(result.finalScore).toBe(9.2);
    expect(result.improvements).toHaveLength(1);
    expect(mockGenerate).toHaveBeenCalledTimes(1);
  });

  it('should handle file operations correctly', async () => {
    const specContent = 'Original content';
    const specPath = await createSpecFile(tempDir, specContent);
    
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Need improvements'], 5)
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        'Improved content with additions'
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Good now'], 8.5)
      ));

    await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      backupOriginal: true
    });

    // Verify backup exists with original content
    const backupContent = await readFile(specPath + '.backup', 'utf-8');
    expect(backupContent).toBe(specContent);
    
    // Verify spec was updated
    const updatedContent = await readFile(specPath, 'utf-8');
    expect(updatedContent).toBe('Improved content with additions');
  });

  it('should work with specifications in different directories', async () => {
    // Create spec in a subdirectory
    const specsDir = join(tempDir, 'specs', 'features');
    await createSpecFile(specsDir, createSampleSpec('simple'));
    const specPath = join(specsDir, 'test-spec.md');
    
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['All good'], 8.5)
      ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.finalScore).toBe(8.5);
  });
});