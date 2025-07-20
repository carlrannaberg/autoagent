import { vi } from 'vitest';
import { Volume, createFsFromVolume } from 'memfs';
import type { IFs } from 'memfs';
import * as path from 'node:path';

export interface MockFileSystemOptions {
  initialFiles?: Record<string, string>;
  workingDirectory?: string;
}

export function createMockFileSystem(options: MockFileSystemOptions = {}): {
  fs: IFs;
  volume: Volume;
  reset: () => void;
} {
  const volume = new Volume();
  const fs = createFsFromVolume(volume) as unknown as IFs;
  
  if (options.workingDirectory !== undefined) {
    fs.mkdirSync(options.workingDirectory, { recursive: true });
  }
  
  if (options.initialFiles) {
    for (const [filePath, content] of Object.entries(options.initialFiles)) {
      const dir = path.dirname(filePath);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
  
  return {
    fs,
    volume,
    reset: (): void => {
      volume.reset();
      if (options.workingDirectory !== undefined) {
        fs.mkdirSync(options.workingDirectory, { recursive: true });
      }
    }
  };
}

interface FsPromisesApi {
  readFile: ReturnType<typeof vi.fn>;
  writeFile: ReturnType<typeof vi.fn>;
  mkdir: ReturnType<typeof vi.fn>;
  readdir: ReturnType<typeof vi.fn>;
  stat: ReturnType<typeof vi.fn>;
  access: ReturnType<typeof vi.fn>;
  rm: ReturnType<typeof vi.fn>;
  unlink: ReturnType<typeof vi.fn>;
}

export function mockFsModule(mockFs: IFs): { fs: IFs; promises: FsPromisesApi } {
  vi.doMock('node:fs', () => mockFs);
  vi.doMock('fs', () => mockFs);
  
  const promisesApi = {
    readFile: vi.fn((path: string, encoding?: BufferEncoding) => {
      return mockFs.readFileSync(path, encoding || 'utf-8');
    }),
    writeFile: vi.fn((path: string, data: string | Buffer, encoding?: BufferEncoding) => {
      mockFs.writeFileSync(path, data, encoding || 'utf-8');
    }),
    mkdir: vi.fn((path: string, options?: { recursive?: boolean; mode?: number }) => {
      mockFs.mkdirSync(path, options);
    }),
    readdir: vi.fn((path: string, options?: { withFileTypes?: boolean; encoding?: BufferEncoding }) => {
      return mockFs.readdirSync(path, options);
    }),
    stat: vi.fn((path: string) => {
      return mockFs.statSync(path);
    }),
    access: vi.fn((path: string, mode?: number) => {
      mockFs.accessSync(path, mode);
    }),
    rm: vi.fn((path: string, options?: { recursive?: boolean; force?: boolean }) => {
      if (options?.recursive === true) {
        mockFs.rmSync(path, options);
      } else {
        mockFs.unlinkSync(path);
      }
    }),
    unlink: vi.fn((path: string) => {
      mockFs.unlinkSync(path);
    })
  };
  
  vi.doMock('node:fs/promises', () => promisesApi);
  vi.doMock('fs/promises', () => promisesApi);
  
  return { fs: mockFs, promises: promisesApi };
}

export function createTestFiles(): Record<string, Record<string, string>> {
  return {
    simpleProject: {
      '.gitignore': 'node_modules/\ndist/',
      'package.json': JSON.stringify({
        name: 'test-project',
        version: '1.0.0',
        type: 'module'
      }, null, 2),
      'src/index.ts': 'console.log("Hello, world!");',
      'README.md': '# Test Project\n\nA simple test project.'
    },
    
    projectWithSTM: {
      '.gitignore': 'node_modules/\ndist/',
      'package.json': JSON.stringify({
        name: 'test-project-stm',
        version: '1.0.0',
        type: 'module'
      }, null, 2),
      '.stm/config.json': JSON.stringify({
        schema: 1,
        taskIdCounter: 2
      }, null, 2),
      '.stm/tasks/1.md': `schema: 1
id: 1
title: "First Task: Setup Project"
status: pending
created: "2024-01-01T00:00:00.000Z"
updated: "2024-01-01T00:00:00.000Z"
tags: ["autoagent", "setup"]
dependencies: []

---

## Why & what

Setup project structure and basic configuration.

### Acceptance Criteria

- [ ] Project structure is created
- [ ] Package.json is configured
- [ ] Basic dependencies are installed

## How

Create the basic project structure with TypeScript configuration.

### Implementation Plan

1. Initialize package.json
2. Setup TypeScript configuration
3. Install basic dependencies
4. Create source directory structure

## Validation

### Testing Strategy

Basic validation with npm test and typecheck.

### Verification Steps

1. Verify package.json is valid
2. Check TypeScript compilation
3. Run basic tests`,
      '.stm/tasks/2.md': `schema: 1
id: 2
title: "Second Task: Add Features"
status: in-progress
created: "2024-01-01T01:00:00.000Z"
updated: "2024-01-01T02:00:00.000Z"
tags: ["autoagent", "feature"]
dependencies: [1]

---

## Why & what

Add core application features and functionality.

### Acceptance Criteria

- [ ] Core features implemented
- [ ] Tests are passing
- [ ] Documentation updated

## How

Implement features using modern TypeScript patterns.

### Implementation Plan

1. Design feature architecture
2. Implement core functionality
3. Add comprehensive tests
4. Update documentation

## Validation

### Testing Strategy

Unit tests, integration tests, and manual testing.

### Verification Steps

1. All tests pass
2. Manual feature testing
3. Documentation review`
    },
    
    autoagentProject: {
      '.autoagent/config.json': JSON.stringify({
        provider: 'claude',
        fallbackProvider: 'gemini'
      }, null, 2),
      '.autoagent/history.json': JSON.stringify({
        executions: []
      }, null, 2),
      'CLAUDE.md': '# Project Instructions\n\nTest instructions.',
      'README.md': '# Test Project\n\nTest readme.'
    }
  };
}