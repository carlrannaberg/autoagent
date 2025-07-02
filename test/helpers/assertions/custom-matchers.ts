import { expect } from 'vitest';
import { Issue, ExecutionResult } from '../../../src/types';
import { StatisticalSummary } from '../../performance/benchmarks/utils/statistics';

interface CustomMatchers<R = unknown> {
  toBeValidIssue(): R;
  toHaveExecutedSuccessfully(): R;
  toMatchStatisticalBaseline(baseline: Partial<StatisticalSummary>, tolerance?: number): R;
  toBeWithinPerformanceThreshold(maxTime: number): R;
  toHaveValidConfiguration(): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toBeValidIssue(received: any): { pass: boolean; message: () => string } {
    const issue = received as Issue;
    const errors: string[] = [];

    // Check required fields
    if (typeof issue.number !== 'number' || issue.number <= 0) {
      errors.push('Issue number must be a positive number');
    }

    if (!issue.title || typeof issue.title !== 'string') {
      errors.push('Issue must have a valid title');
    }

    if (!issue.file || typeof issue.file !== 'string') {
      errors.push('Issue must have a valid file path');
    }

    if (!issue.requirements || typeof issue.requirements !== 'string') {
      errors.push('Issue must have requirements');
    }

    if (!Array.isArray(issue.acceptanceCriteria) || issue.acceptanceCriteria.length === 0) {
      errors.push('Issue must have at least one acceptance criteria');
    }

    // Check file path format
    if (issue.file && !issue.file.match(/^issues\/\d+-.+\.md$/)) {
      errors.push('Issue file must follow pattern: issues/{number}-{title}.md');
    }

    const pass = errors.length === 0;

    return {
      pass,
      message: () => pass
        ? 'Expected issue to be invalid'
        : `Invalid issue:\n${errors.map(e => `  - ${e}`).join('\n')}`
    };
  },

  toHaveExecutedSuccessfully(received: any): { pass: boolean; message: () => string } {
    const result = received as ExecutionResult;
    const checks: string[] = [];
    const failures: string[] = [];

    // Basic success check
    if (result.success) {
      checks.push('✓ Success flag is true');
    } else {
      failures.push('✗ Success flag is false');
    }

    // Issue number check
    if (typeof result.issueNumber === 'number' && result.issueNumber > 0) {
      checks.push('✓ Valid issue number');
    } else {
      failures.push('✗ Invalid issue number');
    }

    // Provider check
    if (result.provider && ['claude', 'gemini', 'mock'].includes(result.provider)) {
      checks.push(`✓ Valid provider: ${result.provider}`);
    } else {
      failures.push(`✗ Invalid provider: ${result.provider}`);
    }

    // Duration check
    if (typeof result.duration === 'number' && result.duration > 0) {
      checks.push(`✓ Execution time: ${result.duration}ms`);
    } else {
      failures.push('✗ Invalid duration');
    }

    // Error check
    if (result.error === null || result.error === undefined || result.error === '') {
      checks.push('✓ No errors');
    } else {
      failures.push(`✗ Error: ${result.error}`);
    }

    const pass = failures.length === 0;

    return {
      pass,
      message: () => pass
        ? 'Expected execution to fail'
        : `Execution did not complete successfully:\n${[...checks, ...failures].join('\n')}`
    };
  },

  toMatchStatisticalBaseline(received: any, baseline: Partial<StatisticalSummary>, tolerance = 0.1): { pass: boolean; message: () => string } {
    const stats = received as StatisticalSummary;
    const deviations: string[] = [];

    // Check mean
    if (baseline.mean !== undefined) {
      const meanDiff = Math.abs(stats.mean - baseline.mean) / baseline.mean;
      if (meanDiff > tolerance) {
        deviations.push(`Mean: ${stats.mean.toFixed(2)} (baseline: ${baseline.mean.toFixed(2)}, ${(meanDiff * 100).toFixed(1)}% deviation)`);
      }
    }

    // Check standard deviation
    if (baseline.standardDeviation !== undefined) {
      const stdDiff = Math.abs(stats.standardDeviation - baseline.standardDeviation) / baseline.standardDeviation;
      if (stdDiff > tolerance * 2) { // More lenient for std dev
        deviations.push(`Std Dev: ${stats.standardDeviation.toFixed(2)} (baseline: ${baseline.standardDeviation.toFixed(2)})`);
      }
    }

    // Check coefficient of variation
    if (baseline.coefficientOfVariation !== undefined) {
      if (stats.coefficientOfVariation > baseline.coefficientOfVariation * (1 + tolerance)) {
        deviations.push(`CV: ${stats.coefficientOfVariation.toFixed(1)}% (baseline: ${baseline.coefficientOfVariation.toFixed(1)}%)`);
      }
    }

    const pass = deviations.length === 0;

    return {
      pass,
      message: () => pass
        ? 'Expected statistics to deviate from baseline'
        : `Statistics deviate from baseline:\n${deviations.map(d => `  - ${d}`).join('\n')}`
    };
  },

  toBeWithinPerformanceThreshold(received: any, maxTime: number): { pass: boolean; message: () => string } {
    const duration = typeof received === 'number' ? received : received.duration;

    if (typeof duration !== 'number') {
      return {
        pass: false,
        message: () => 'Expected a number or object with duration property'
      };
    }

    const pass = duration <= maxTime;
    const percentage = ((duration / maxTime) * 100).toFixed(1);

    return {
      pass,
      message: () => pass
        ? `Expected duration to exceed ${maxTime}ms, but was ${duration}ms`
        : `Performance threshold exceeded: ${duration}ms > ${maxTime}ms (${percentage}% of threshold)`
    };
  },

  toHaveValidConfiguration(received: any): { pass: boolean; message: () => string } {
    const config = received;
    const errors: string[] = [];

    // Check providers
    if (!Array.isArray(config.providers) || config.providers.length === 0) {
      errors.push('Config must have at least one provider');
    }

    // Check numeric values
    const numericFields = [
      { name: 'maxTokens', min: 1, max: 1000000 },
      { name: 'rateLimitCooldown', min: 0, max: 86400000 },
      { name: 'retryAttempts', min: 0, max: 10 },
      { name: 'failoverDelay', min: 0, max: 60000 }
    ];

    numericFields.forEach(field => {
      const value = config[field.name];
      if (typeof value !== 'number' || value < field.min || value > field.max) {
        errors.push(`${field.name} must be between ${field.min} and ${field.max}`);
      }
    });

    // Check log level
    if (!['debug', 'info', 'warn', 'error'].includes(config.logLevel)) {
      errors.push('Invalid log level');
    }

    const pass = errors.length === 0;

    return {
      pass,
      message: () => pass
        ? 'Expected configuration to be invalid'
        : `Invalid configuration:\n${errors.map(e => `  - ${e}`).join('\n')}`
    };
  }
});

// Re-export expect with custom matchers
export { expect };