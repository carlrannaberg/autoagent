import { describe, bench, beforeAll } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import { createBenchmark } from './benchmark.utils';
import { createTempDir } from '../../../setup';

describe('File Operations Benchmarks', () => {
  let tempDir: string;
  let testFiles: string[];

  beforeAll(async () => {
    tempDir = createTempDir();
    testFiles = [];
    
    // Create test files of various sizes
    for (let i = 0; i < 10; i++) {
      const fileName = path.join(tempDir, `test-${i}.md`);
      const content = `# Test File ${i}\n\n` + 'x'.repeat(1000 * (i + 1));
      await fs.writeFile(fileName, content);
      testFiles.push(fileName);
    }
  });

  describe('File Reading', () => {
    bench('read small file (1KB)', async () => {
      await fs.readFile(testFiles[0], 'utf-8');
    });

    bench('read medium file (5KB)', async () => {
      await fs.readFile(testFiles[4], 'utf-8');
    });

    bench('read large file (10KB)', async () => {
      await fs.readFile(testFiles[9], 'utf-8');
    });

    createBenchmark(
      'read multiple files concurrently',
      async () => {
        await Promise.all(
          testFiles.slice(0, 5).map(file => fs.readFile(file, 'utf-8'))
        );
      },
      { iterations: 50 }
    );
  });

  describe('File Writing', () => {
    bench('write small file', async () => {
      const content = 'x'.repeat(1000);
      await fs.writeFile(path.join(tempDir, 'write-test.tmp'), content);
    });

    bench('append to file', async () => {
      const content = 'x'.repeat(100);
      await fs.appendFile(path.join(tempDir, 'append-test.tmp'), content);
    });

    bench('write JSON file', async () => {
      const data = {
        issues: Array.from({ length: 10 }, (_, i) => ({
          id: i,
          title: `Issue ${i}`,
          content: 'x'.repeat(100)
        }))
      };
      await fs.writeFile(
        path.join(tempDir, 'json-test.tmp'),
        JSON.stringify(data, null, 2)
      );
    });
  });

  describe('Directory Operations', () => {
    bench('list directory contents', async () => {
      await fs.readdir(tempDir);
    });

    bench('stat multiple files', async () => {
      await Promise.all(
        testFiles.map(file => fs.stat(file))
      );
    });

    bench('check file existence', async () => {
      for (const file of testFiles) {
        await fs.access(file).catch(() => false);
      }
    });
  });
});