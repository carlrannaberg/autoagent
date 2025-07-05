import { describe, it, expect } from 'vitest';
import { 
  DEFAULT_REFLECTION_CONFIG, 
  validateReflectionConfig, 
  mergeReflectionConfig 
} from '../../../src/core/reflection-defaults';
import { ReflectionConfig } from '../../../src/types';

describe('reflection-defaults', () => {
  describe('DEFAULT_REFLECTION_CONFIG', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_REFLECTION_CONFIG).toEqual({
        enabled: true,
        maxIterations: 3,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      });
    });
  });

  describe('validateReflectionConfig', () => {
    it('should return defaults when given empty config', () => {
      const result = validateReflectionConfig({});
      expect(result).toEqual(DEFAULT_REFLECTION_CONFIG);
    });

    it('should accept valid configuration', () => {
      const config: ReflectionConfig = {
        enabled: false,
        maxIterations: 5,
        improvementThreshold: 0.2,
        skipForSimpleSpecs: false
      };
      const result = validateReflectionConfig(config);
      expect(result).toEqual(config);
    });

    it('should throw error for non-boolean enabled', () => {
      expect(() => validateReflectionConfig({ enabled: 'true' as unknown as boolean }))
        .toThrow('Reflection config: enabled must be a boolean');
    });

    it('should throw error for non-integer maxIterations', () => {
      expect(() => validateReflectionConfig({ maxIterations: 3.5 }))
        .toThrow('Reflection config: maxIterations must be a positive integer');
    });

    it('should throw error for zero maxIterations', () => {
      expect(() => validateReflectionConfig({ maxIterations: 0 }))
        .toThrow('Reflection config: maxIterations must be a positive integer');
    });

    it('should throw error for negative maxIterations', () => {
      expect(() => validateReflectionConfig({ maxIterations: -1 }))
        .toThrow('Reflection config: maxIterations must be a positive integer');
    });

    it('should throw error for maxIterations exceeding 10', () => {
      expect(() => validateReflectionConfig({ maxIterations: 11 }))
        .toThrow('Reflection config: maxIterations must not exceed 10');
    });

    it('should throw error for invalid improvementThreshold type', () => {
      expect(() => validateReflectionConfig({ improvementThreshold: '0.1' as unknown as number }))
        .toThrow('Reflection config: improvementThreshold must be a number between 0 and 1');
    });

    it('should throw error for negative improvementThreshold', () => {
      expect(() => validateReflectionConfig({ improvementThreshold: -0.1 }))
        .toThrow('Reflection config: improvementThreshold must be a number between 0 and 1');
    });

    it('should throw error for improvementThreshold greater than 1', () => {
      expect(() => validateReflectionConfig({ improvementThreshold: 1.1 }))
        .toThrow('Reflection config: improvementThreshold must be a number between 0 and 1');
    });

    it('should accept improvementThreshold of 0', () => {
      const result = validateReflectionConfig({ improvementThreshold: 0 });
      expect(result.improvementThreshold).toBe(0);
    });

    it('should accept improvementThreshold of 1', () => {
      const result = validateReflectionConfig({ improvementThreshold: 1 });
      expect(result.improvementThreshold).toBe(1);
    });

    it('should throw error for non-boolean skipForSimpleSpecs', () => {
      expect(() => validateReflectionConfig({ skipForSimpleSpecs: 'true' as unknown as boolean }))
        .toThrow('Reflection config: skipForSimpleSpecs must be a boolean');
    });
  });

  describe('mergeReflectionConfig', () => {
    it('should return defaults when no configs provided', () => {
      const result = mergeReflectionConfig();
      expect(result).toEqual(DEFAULT_REFLECTION_CONFIG);
    });

    it('should merge file config with defaults', () => {
      const fileConfig: Partial<ReflectionConfig> = {
        enabled: false,
        maxIterations: 5
      };
      const result = mergeReflectionConfig(fileConfig);
      expect(result).toEqual({
        enabled: false,
        maxIterations: 5,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      });
    });

    it('should merge CLI config over file config', () => {
      const fileConfig: Partial<ReflectionConfig> = {
        enabled: false,
        maxIterations: 5
      };
      const cliConfig: Partial<ReflectionConfig> = {
        enabled: true,
        improvementThreshold: 0.3
      };
      const result = mergeReflectionConfig(fileConfig, cliConfig);
      expect(result).toEqual({
        enabled: true,
        maxIterations: 5,
        improvementThreshold: 0.3,
        skipForSimpleSpecs: true
      });
    });

    it('should validate merged configuration', () => {
      const fileConfig: Partial<ReflectionConfig> = {
        maxIterations: 15 // Invalid value
      };
      expect(() => mergeReflectionConfig(fileConfig))
        .toThrow('Reflection config: maxIterations must not exceed 10');
    });

    it('should handle undefined values correctly', () => {
      const fileConfig: Partial<ReflectionConfig> = {
        enabled: undefined,
        maxIterations: 4
      };
      const result = mergeReflectionConfig(fileConfig);
      expect(result).toEqual({
        enabled: true, // Should use default
        maxIterations: 4,
        improvementThreshold: 0.1,
        skipForSimpleSpecs: true
      });
    });
  });
});