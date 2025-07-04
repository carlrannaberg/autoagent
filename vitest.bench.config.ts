import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    benchmark: {
      include: ['test/benchmarks/**/*.bench.ts'],
      outputJson: 'test/benchmarks/results.json',
      reporters: ['verbose', 'json'],
    },
    environment: 'node',
    globals: true,
    clearMocks: true,
    setupFiles: ['./test/setup.ts'],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});