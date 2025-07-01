import { vi } from 'vitest';
import { Volume, createFsFromVolume } from 'memfs';
import type { IFs } from 'memfs';
import * as path from 'node:path';

export interface MockFileSystemOptions {
  initialFiles?: Record<string, string>;
  workingDirectory?: string;
}

export function createMockFileSystem(options: MockFileSystemOptions = {}) {
  const volume = new Volume();
  const fs = createFsFromVolume(volume) as unknown as IFs;
  
  if (options.workingDirectory) {
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
    reset: () => {
      volume.reset();
      if (options.workingDirectory) {
        fs.mkdirSync(options.workingDirectory, { recursive: true });
      }
    }
  };
}

export function mockFsModule(mockFs: IFs) {
  vi.doMock('node:fs', () => mockFs);
  vi.doMock('fs', () => mockFs);
  
  const promisesApi = {
    readFile: vi.fn(async (path: string, encoding?: BufferEncoding) => {
      return mockFs.readFileSync(path, encoding || 'utf-8');
    }),
    writeFile: vi.fn(async (path: string, data: string | Buffer, encoding?: BufferEncoding) => {
      mockFs.writeFileSync(path, data, encoding || 'utf-8');
    }),
    mkdir: vi.fn(async (path: string, options?: any) => {
      mockFs.mkdirSync(path, options);
    }),
    readdir: vi.fn(async (path: string, options?: any) => {
      return mockFs.readdirSync(path, options);
    }),
    stat: vi.fn(async (path: string) => {
      return mockFs.statSync(path);
    }),
    access: vi.fn(async (path: string, mode?: number) => {
      mockFs.accessSync(path, mode);
    }),
    rm: vi.fn(async (path: string, options?: any) => {
      if (options?.recursive) {
        mockFs.rmSync(path, options);
      } else {
        mockFs.unlinkSync(path);
      }
    }),
    unlink: vi.fn(async (path: string) => {
      mockFs.unlinkSync(path);
    })
  };
  
  vi.doMock('node:fs/promises', () => promisesApi);
  vi.doMock('fs/promises', () => promisesApi);
  
  return { fs: mockFs, promises: promisesApi };
}

export function createTestFiles() {
  return {
    simpleIssue: {
      'issues/1-test-issue.md': `# Issue 1: Test Issue

## Requirement
This is a test requirement.

## Acceptance Criteria
- [ ] First criterion
- [ ] Second criterion

## Technical Details
Test technical details.`
    },
    
    projectWithIssues: {
      '.gitignore': 'node_modules/\ndist/',
      'package.json': JSON.stringify({
        name: 'test-project',
        version: '1.0.0',
        type: 'module'
      }, null, 2),
      'issues/1-first-issue.md': `# Issue 1: First Issue

## Requirement
First requirement.

## Acceptance Criteria
- [ ] First criterion`,
      'issues/2-second-issue.md': `# Issue 2: Second Issue

## Requirement
Second requirement.

## Acceptance Criteria
- [ ] Second criterion

## Dependencies
- Issue #1`
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