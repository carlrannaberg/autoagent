import { vi } from 'vitest';
import * as path from 'path';
import * as os from 'os';

process.env.NODE_ENV = 'test';
process.env.AUTOAGENT_TEST_MODE = 'true';
process.env.AUTOAGENT_SILENT = 'true';

const originalProviders = {
  claude: vi.fn(),
  gemini: vi.fn()
};

vi.mock('@/providers/claude', () => ({
  ClaudeProvider: originalProviders.claude
}));

vi.mock('@/providers/gemini', () => ({
  GeminiProvider: originalProviders.gemini
}));

export function mockProvider(name: 'claude' | 'gemini', implementation: any): void {
  originalProviders[name].mockImplementation(implementation);
}

export function resetProviderMocks(): void {
  Object.values(originalProviders).forEach(mock => mock.mockReset());
}

const integrationTempDir = path.join(os.tmpdir(), 'autoagent-integration-tests');

beforeAll(async () => {
  const fs = await import('fs/promises');
  await fs.mkdir(integrationTempDir, { recursive: true });
});

afterAll(async () => {
  const fs = await import('fs/promises');
  try {
    await fs.rm(integrationTempDir, { recursive: true, force: true });
  } catch (error) {
    console.warn('Failed to clean up integration test directory:', error);
  }
});

export { integrationTempDir };