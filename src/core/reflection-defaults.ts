import { ReflectionConfig } from '../types';

/**
 * Default configuration values for the reflection engine.
 * These values can be overridden through AgentConfig or command-line options.
 */
export const DEFAULT_REFLECTION_CONFIG: ReflectionConfig = {
  enabled: true,
  maxIterations: 3,
  improvementThreshold: 0.1,
  skipForSimpleSpecs: true
};

/**
 * Validates reflection configuration values.
 * Ensures all values are within acceptable ranges.
 * 
 * @param config - The reflection configuration to validate
 * @returns The validated configuration
 * @throws Error if configuration is invalid
 */
export function validateReflectionConfig(config: Partial<ReflectionConfig>): ReflectionConfig {
  const mergedConfig = { ...DEFAULT_REFLECTION_CONFIG, ...config };

  // Validate enabled (boolean)
  if (typeof mergedConfig.enabled !== 'boolean') {
    throw new Error('Reflection config: enabled must be a boolean');
  }

  // Validate maxIterations (positive integer)
  if (!Number.isInteger(mergedConfig.maxIterations) || mergedConfig.maxIterations < 1) {
    throw new Error('Reflection config: maxIterations must be a positive integer');
  }
  if (mergedConfig.maxIterations > 10) {
    throw new Error('Reflection config: maxIterations must not exceed 10');
  }

  // Validate improvementThreshold (between 0 and 1)
  if (typeof mergedConfig.improvementThreshold !== 'number' || 
      mergedConfig.improvementThreshold < 0 || 
      mergedConfig.improvementThreshold > 1) {
    throw new Error('Reflection config: improvementThreshold must be a number between 0 and 1');
  }

  // Validate skipForSimpleSpecs (boolean)
  if (typeof mergedConfig.skipForSimpleSpecs !== 'boolean') {
    throw new Error('Reflection config: skipForSimpleSpecs must be a boolean');
  }

  return mergedConfig;
}

/**
 * Merges reflection configuration with defaults.
 * CLI values take precedence over file configuration.
 * 
 * @param fileConfig - Configuration from file
 * @param cliConfig - Configuration from CLI options
 * @returns Merged and validated configuration
 */
export function mergeReflectionConfig(
  fileConfig?: Partial<ReflectionConfig>,
  cliConfig?: Partial<ReflectionConfig>
): ReflectionConfig {
  // Filter out undefined values to ensure defaults are preserved
  const cleanFileConfig = fileConfig ? Object.fromEntries(
    Object.entries(fileConfig).filter(([_, value]) => value !== undefined)
  ) : {};
  
  const cleanCliConfig = cliConfig ? Object.fromEntries(
    Object.entries(cliConfig).filter(([_, value]) => value !== undefined)
  ) : {};

  // Merge in order of precedence: defaults < file < CLI
  const mergedConfig = {
    ...DEFAULT_REFLECTION_CONFIG,
    ...cleanFileConfig,
    ...cleanCliConfig
  };

  return validateReflectionConfig(mergedConfig);
}