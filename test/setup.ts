import { afterEach, vi } from 'vitest';

// Global test setup
beforeAll(() => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.AUTOAGENT_SILENT = 'true';
});

// Cleanup after each test
afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});