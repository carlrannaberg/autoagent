import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    benchmark: {
      include: ['test/performance/benchmarks/**/*.bench.ts'],
      outputJson: 'bench-results.json',
      reporters: ['verbose'],
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