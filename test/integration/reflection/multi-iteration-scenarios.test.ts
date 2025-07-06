import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFile } from 'fs/promises';
import { runReflection } from '../../../src/core/reflection/runner.js';
import { ProviderFactory } from '../../../src/providers/factory.js';
import type { Provider } from '../../../src/types/providers.js';
import {
  createTempDir,
  cleanupTempDir,
  createSpecFile,
  createMockProviderResponse,
  createMockReflectionResponse,
  createMockImprovementResponse,
  createSampleSpec
} from './helpers/test-helpers.js';

describe('Multi-Iteration Reflection Scenarios', () => {
  let tempDir: string;
  let mockProvider: Provider;

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

  it('should track improvements across multiple iterations', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;

    // Configure multiple iterations with gradual improvement
    const iterations = [
      { score: 5, improvements: ['Add error handling', 'Define data models'] },
      { score: 6.5, improvements: ['Add security requirements', 'Specify API versioning'] },
      { score: 7.8, improvements: ['Add monitoring requirements', 'Define SLAs'] },
      { score: 9.1, improvements: ['Minor: Add example responses'] }
    ];

    // Mock responses for each iteration
    iterations.forEach((iter, _index) => {
      // Reflection response
      mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(iter.improvements, iter.score)
      ));
      
      // Improvement response (except for last iteration which meets threshold)
      if (iter.score < 9) {
        mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
          createMockImprovementResponse('Previous content', iter.improvements)
        ));
      }
    });

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 10,
      improvementThreshold: 9
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(4);
    expect(result.finalScore).toBe(9.1);
    expect(result.improvements).toHaveLength(4);
    
    // Verify all improvements are tracked
    result.improvements.forEach((improvement, index) => {
      expect(improvement.iteration).toBe(index + 1);
      expect(improvement.score).toBe(iterations[index].score);
    });
  });

  it('should handle max iterations limit correctly', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;

    // Always return low scores to force max iterations
    for (let i = 0; i < 3; i++) {
      mockGenerate
        .mockResolvedValueOnce(createMockProviderResponse(
          createMockReflectionResponse(['Need more work'], 6 + i * 0.5)
        ))
        .mockResolvedValueOnce(createMockProviderResponse(
          'Improved content'
        ));
    }

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 3,
      improvementThreshold: 9
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(3);
    expect(result.finalScore).toBe(7);
    expect(mockGenerate).toHaveBeenCalledTimes(6); // 3 iterations * 2 calls each
  });

  it('should accumulate improvements correctly across iterations', async () => {
    const originalContent = 'Original specification';
    const specPath = await createSpecFile(tempDir, originalContent);
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;

    // First iteration
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Add section A', 'Add section B'], 6)
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        originalContent + '\n\n## Section A\nContent A\n\n## Section B\nContent B'
      ));

    // Second iteration
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Enhance section A', 'Add section C'], 7.5)
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        originalContent + '\n\n## Section A\nEnhanced content A\n\n## Section B\nContent B\n\n## Section C\nContent C'
      ));

    // Third iteration
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Final polish'], 9.2)
      ));

    await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 5,
      improvementThreshold: 9
    });

    const finalContent = await readFile(specPath, 'utf-8');
    expect(finalContent).toContain('Enhanced content A');
    expect(finalContent).toContain('Content B');
    expect(finalContent).toContain('Content C');
  });

  it('should handle zero improvements in an iteration', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;

    // First iteration - some improvements
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Add documentation'], 7)
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        'Content with documentation'
      ));

    // Second iteration - no specific improvements but score increases
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        `## Analysis
The specification is now well-structured and complete.

## Score
9.5/10

Excellent specification that covers all requirements.`
      ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 5,
      improvementThreshold: 9
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(2);
    expect(result.finalScore).toBe(9.5);
  });

  it('should preserve improvements from each iteration', async () => {
    const specPath = await createSpecFile(tempDir, 'Initial content');
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;

    const iterationContents = [
      'Initial content\n\n## Iteration 1 additions',
      'Initial content\n\n## Iteration 1 additions\n\n## Iteration 2 additions',
      'Initial content\n\n## Iteration 1 additions\n\n## Iteration 2 additions\n\n## Final version'
    ];

    // Three iterations
    for (let i = 0; i < 3; i++) {
      mockGenerate
        .mockResolvedValueOnce(createMockProviderResponse(
          createMockReflectionResponse([`Improvement ${i + 1}`], 6 + i)
        ))
        .mockResolvedValueOnce(createMockProviderResponse(
          iterationContents[i]
        ));
    }

    // Final check
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse(['Complete'], 9.5)
    ));

    await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 10,
      improvementThreshold: 9
    });

    const finalContent = await readFile(specPath, 'utf-8');
    expect(finalContent).toBe(iterationContents[2]);
  });

  it('should handle rapid score improvement', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;

    // First iteration - major jump in score
    mockGenerate
      .mockResolvedValueOnce(createMockProviderResponse(
        createMockReflectionResponse(['Add comprehensive details'], 5)
      ))
      .mockResolvedValueOnce(createMockProviderResponse(
        'Significantly improved content'
      ));

    // Second iteration - already excellent
    mockGenerate.mockResolvedValueOnce(createMockProviderResponse(
      createMockReflectionResponse(['Specification is now excellent'], 9.8)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 10,
      improvementThreshold: 9
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(2);
    expect(result.finalScore).toBe(9.8);
    expect(mockGenerate).toHaveBeenCalledTimes(3);
  });

  it('should handle plateauing scores', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;

    // Multiple iterations with similar scores
    for (let i = 0; i < 5; i++) {
      mockGenerate
        .mockResolvedValueOnce(createMockProviderResponse(
          createMockReflectionResponse(['Minor improvement'], 7.2 + (i * 0.1))
        ))
        .mockResolvedValueOnce(createMockProviderResponse(
          `Content with iteration ${i + 1} improvements`
        ));
    }

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      maxIterations: 5,
      improvementThreshold: 9
    });

    expect(result.success).toBe(true);
    expect(result.iterations).toBe(5);
    expect(result.finalScore).toBeCloseTo(7.6, 1);
    
    // Verify steady but slow improvement
    result.improvements.forEach((imp, index) => {
      expect(imp.score).toBeCloseTo(7.2 + (index * 0.1), 1);
    });
  });
});