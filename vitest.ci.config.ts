import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      reporters: ['default', 'json', 'junit'],
      outputFile: {
        json: './test-results/vitest-results.json',
        junit: './test-results/junit.xml'
      },
      coverage: {
        reporter: ['text', 'json', 'lcov', 'html'],
        reportsDirectory: './coverage'
      },
      // Disable watch mode in CI
      watch: false,
      // Run tests sequentially in CI to avoid flakiness
      pool: 'forks',
      poolOptions: {
        forks: {
          singleFork: true
        }
      }
    }
  })
);