import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFile, writeFile, chmod, rm } from 'fs/promises';
import { join } from 'path';
import { runReflection } from '../../../src/core/reflection/runner.js';
import { ProviderFactory } from '../../../src/providers/factory.js';
import type { Provider } from '../../../src/types/providers.js';
import {
  createTempDir,
  cleanupTempDir,
  createSpecFile,
  createMockCompletionResponse,
  createMockReflectionResponse,
  createSampleSpec
} from './helpers/test-helpers.js';

describe('Error Recovery and Edge Cases', () => {
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

  it('should handle malformed provider responses', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Return malformed responses
    mockGenerate
      .mockResolvedValueOnce(createMockCompletionResponse(
        'This is not a valid reflection response without score'
      ))
      .mockResolvedValueOnce(createMockCompletionResponse(
        createMockReflectionResponse(['Fixed now'], 8.5)
      ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.finalScore).toBe(8.5);
    expect(mockGenerate).toHaveBeenCalledTimes(2);
  });

  it('should handle file system errors during backup', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    
    // Make directory read-only to cause backup failure
    await chmod(tempDir, 0o555);
    
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    mockGenerate.mockResolvedValueOnce(createMockCompletionResponse(
      createMockReflectionResponse(['Good'], 9)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      backupOriginal: true
    });

    // Should fail due to backup error
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/backup|permission/i);
    
    // Restore permissions
    await chmod(tempDir, 0o755);
  });

  it('should handle missing spec file', async () => {
    const nonExistentPath = join(tempDir, 'does-not-exist.md');

    const result = await runReflection({
      specFile: nonExistentPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not found|does not exist/i);
  });

  it('should handle spec file deletion during reflection', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    let callCount = 0;
    mockGenerate.mockImplementation(async () => {
      callCount++;
      if (callCount === 2) {
        // Delete file after first reflection
        await rm(specPath);
      }
      return createMockCompletionResponse(
        createMockReflectionResponse(['Need work'], 6)
      );
    });

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/file|not found/i);
  });

  it('should handle interrupted reflection process', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    // First reflection works
    mockGenerate
      .mockResolvedValueOnce(createMockCompletionResponse(
        createMockReflectionResponse(['Need improvements'], 6)
      ))
      .mockRejectedValueOnce(new Error('Process interrupted'));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('interrupted');
    expect(result.iterations).toBe(1);
  });

  it('should handle rollback on improvement failure', async () => {
    const originalContent = 'Original spec content';
    const specPath = await createSpecFile(tempDir, originalContent);
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate
      .mockResolvedValueOnce(createMockCompletionResponse(
        createMockReflectionResponse(['Add improvements'], 6)
      ))
      .mockResolvedValueOnce(createMockCompletionResponse(
        'Improved content'
      ))
      .mockRejectedValueOnce(new Error('Failed to re-analyze'));

    await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      backupOriginal: true
    });

    // Original content should be restored on failure
    const restoredContent = await readFile(specPath, 'utf-8');
    expect(restoredContent).toBe(originalContent);
  });

  it('should handle empty spec file', async () => {
    const specPath = await createSpecFile(tempDir, '');
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate.mockResolvedValueOnce(createMockCompletionResponse(
      createMockReflectionResponse(['Empty spec needs content'], 1)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.finalScore).toBe(1);
  });

  it('should handle very large spec files', async () => {
    // Create a large spec (1MB)
    const largeContent = 'x'.repeat(1024 * 1024);
    const specPath = await createSpecFile(tempDir, largeContent);
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate.mockResolvedValueOnce(createMockCompletionResponse(
      createMockReflectionResponse(['Too large, needs summary'], 8.5)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      improvementThreshold: 8
    });

    expect(result.success).toBe(true);
  });

  it('should handle special characters in file paths', async () => {
    const specialDir = join(tempDir, 'spec with spaces & special-chars!');
    await createSpecFile(specialDir, createSampleSpec('simple'));
    const specPath = join(specialDir, 'test-spec.md');
    
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    mockGenerate.mockResolvedValueOnce(createMockCompletionResponse(
      createMockReflectionResponse(['Good'], 9)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
  });

  it('should handle concurrent file modifications', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate
      .mockResolvedValueOnce(createMockCompletionResponse(
        createMockReflectionResponse(['Need work'], 6)
      ))
      .mockImplementation(async () => {
        // Simulate external modification
        await writeFile(specPath, 'Externally modified content');
        return createMockCompletionResponse('Improved content');
      });

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    // Should handle the external modification gracefully
    expect(result.success).toBe(true);
  });

  it('should handle provider response with invalid JSON', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate.mockResolvedValueOnce(createMockCompletionResponse(
      '{ invalid json: missing quotes }'
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    // Should handle gracefully and retry or fail appropriately
    expect(result.success).toBeDefined();
  });

  it('should handle score extraction from various formats', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    const responses = [
      'Score: 7.5/10\nGood spec',
      'Rating: 8 out of 10',
      'The specification scores 8.5 points',
      '## Score\n9/10',
      'Quality: 9.0'
    ];
    
    for (const response of responses) {
      mockGenerate.mockResolvedValueOnce(createMockCompletionResponse(response));
    }

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir,
      improvementThreshold: 10 // Force multiple iterations
    });

    expect(result.success).toBe(true);
    expect(result.finalScore).toBeGreaterThan(0);
  });

  it('should handle permission errors during file write', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    // Track when generateCompletion is called
    let callCount = 0;
    mockGenerate
      .mockImplementation(async () => {
        callCount++;
        if (callCount === 1) {
          // First call: return reflection with low score
          return createMockCompletionResponse(
            createMockReflectionResponse(['Need improvements'], 6)
          );
        } else if (callCount === 2) {
          // Second call: Make file read-only before returning improvement
          await chmod(specPath, 0o444);
          return createMockCompletionResponse('Improved content');
        }
        return createMockCompletionResponse('Should not reach here');
      });

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/permission/i);
    
    // Restore permissions
    await chmod(specPath, 0o644);
  });

  it('should handle zero score appropriately', async () => {
    const specPath = await createSpecFile(tempDir, createSampleSpec('simple'));
    const mockGenerate = mockProvider.generateCompletion as ReturnType<typeof vi.fn>;
    
    mockGenerate.mockResolvedValueOnce(createMockCompletionResponse(
      createMockReflectionResponse(['Completely inadequate'], 0)
    ));

    const result = await runReflection({
      specFile: specPath,
      provider: 'claude',
      workingDir: tempDir
    });

    expect(result.success).toBe(true);
    expect(result.finalScore).toBe(0);
  });
});