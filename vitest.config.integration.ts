import { defineConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ['test/integration/**/*.test.ts'],
    // Longer timeouts for integration tests
    testTimeout: 60000,
    hookTimeout: 60000,
    // Run integration tests sequentially
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
        maxForks: 1,
        minForks: 1
      }
    }
  }
});