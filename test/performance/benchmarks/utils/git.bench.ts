import { describe, bench, beforeAll } from 'vitest';
import * as gitUtils from '../../../../src/utils/git';
import { createBenchmark } from './benchmark.utils';
import { createTempDir } from '../../../setup';
import * as fs from 'fs/promises';
import * as path from 'path';
import { spawn } from 'child_process';
import { promisify } from 'util';

const exec = promisify(spawn);

describe('Git Utilities Performance Benchmarks', () => {
  let tempDir: string;
  let hasGit = false;

  beforeAll(async () => {
    tempDir = await createTempDir();
    
    // Check if git is available
    try {
      await new Promise((resolve, reject) => {
        const proc = spawn('git', ['--version']);
        proc.on('close', (code) => {
          if (code === 0) resolve(true);
          else reject(new Error('Git not available'));
        });
        proc.on('error', reject);
      });
      hasGit = true;
      
      // Initialize git repo in temp dir
      process.chdir(tempDir);
      await new Promise((resolve, reject) => {
        const proc = spawn('git', ['init']);
        proc.on('close', (code) => {
          if (code === 0) resolve(true);
          else reject(new Error('Git init failed'));
        });
      });
      
      // Create some test files
      for (let i = 1; i <= 10; i++) {
        await fs.writeFile(
          path.join(tempDir, `file${i}.txt`),
          `Content of file ${i}\n`.repeat(10)
        );
      }
      
      // Initial commit
      await new Promise((resolve, reject) => {
        const proc = spawn('git', ['add', '.']);
        proc.on('close', () => resolve(true));
      });
      
      await new Promise((resolve, reject) => {
        const proc = spawn('git', ['commit', '-m', 'Initial commit']);
        proc.on('close', () => resolve(true));
      });
      
      // Make some changes
      await fs.writeFile(path.join(tempDir, 'file1.txt'), 'Modified content\n');
      await fs.writeFile(path.join(tempDir, 'newfile.txt'), 'New file content\n');
      
    } catch (error) {
      console.log('Git not available, skipping git benchmarks');
    }
  });

  describe('Git Status Operations', () => {
    bench.skipIf(!hasGit)('get git status', async () => {
      await gitUtils.getGitStatus(tempDir);
    });

    bench.skipIf(!hasGit)('check for changes', async () => {
      await gitUtils.hasChangesToCommit(tempDir);
    });

    bench.skipIf(!hasGit)('get changed files', async () => {
      await gitUtils.getChangedFiles(tempDir);
    });

    if (hasGit) {
      createBenchmark(
        'git status 100 times',
        async () => {
          for (let i = 0; i < 100; i++) {
            await gitUtils.getGitStatus(tempDir);
          }
        },
        { iterations: 10 }
      );
    }
  });

  describe('Git Analysis', () => {
    bench.skipIf(!hasGit)('analyze staged files', async () => {
      const status = await gitUtils.getGitStatus(tempDir);
      return status.staged.length;
    });

    bench.skipIf(!hasGit)('analyze modified files', async () => {
      const status = await gitUtils.getGitStatus(tempDir);
      return status.modified.length;
    });

    bench.skipIf(!hasGit)('analyze untracked files', async () => {
      const status = await gitUtils.getGitStatus(tempDir);
      return status.untracked.length;
    });

    bench.skipIf(!hasGit)('full status analysis', async () => {
      const status = await gitUtils.getGitStatus(tempDir);
      const hasChanges = await gitUtils.hasChangesToCommit(tempDir);
      const changedFiles = await gitUtils.getChangedFiles(tempDir);
      
      return {
        totalFiles: changedFiles.length,
        hasChanges,
        breakdown: {
          staged: status.staged.length,
          modified: status.modified.length,
          untracked: status.untracked.length
        }
      };
    });
  });

  describe('Path Operations', () => {
    bench('normalize file paths', () => {
      const paths = [
        './src/index.ts',
        '../lib/utils.js',
        'test/../../src/main.ts',
        '/absolute/path/file.txt',
        'relative\\windows\\path.js'
      ];
      
      return paths.map(p => path.normalize(p));
    });

    bench('extract file names', () => {
      const paths = [
        'src/utils/helper.ts',
        'test/unit/core.test.ts',
        'lib/providers/claude.js',
        'docs/api/README.md'
      ];
      
      return paths.map(p => path.basename(p));
    });
  });
});