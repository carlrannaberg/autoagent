import { defineConfig } from 'vitest/config';
import baseConfig from './vitest.config';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ['test/e2e/**/*.test.ts'],
    testTimeout: 120000,
    hookTimeout: 120000,
    pool: 'forks', // Better isolation for E2E tests
    poolOptions: {
      forks: {
        singleFork: true // Run E2E tests sequentially
      }
    }
  }
});