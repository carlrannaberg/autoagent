import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import {
  checkGitRemote,
  getCurrentBranch,
  hasUpstreamBranch,
  pushToRemote,
  validateRemoteForPush,
} from '../../src/utils/git.js';
import { exec } from 'child_process';
import type { ExecException } from 'child_process';

// Mock the child_process module
vi.mock('child_process', () => ({
  exec: vi.fn(),
}));

const mockExec = exec as Mock<typeof exec>;

describe('Git Push Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('checkGitRemote', () => {
    it('should return exists and accessible when remote exists and is reachable', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd === 'git remote') {
          callback(null, 'origin\nupstream\n', '');
        } else if (cmd.includes('git ls-remote')) {
          callback(null, 'refs/heads/main', '');
        }
        return {} as any;
      });

      const result = await checkGitRemote('origin');
      expect(result).toEqual({
        exists: true,
        accessible: true,
      });
    });

    it('should return not exists when remote does not exist', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd === 'git remote') {
          callback(null, 'origin\n', '');
        }
        return {} as any;
      });

      const result = await checkGitRemote('upstream');
      expect(result).toEqual({
        exists: false,
        accessible: false,
        error: "Remote 'upstream' does not exist",
      });
    });

    it('should return exists but not accessible on authentication error', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd === 'git remote') {
          callback(null, 'origin\n', '');
        } else if (cmd.includes('git ls-remote')) {
          const error = new Error('Authentication failed');
          callback(error, '', 'Authentication failed');
        }
        return {} as any;
      });

      const result = await checkGitRemote('origin');
      expect(result).toEqual({
        exists: true,
        accessible: false,
        error: 'Authentication failed. Please check your credentials',
      });
    });

    it('should return exists but not accessible on network error', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd === 'git remote') {
          callback(null, 'origin\n', '');
        } else if (cmd.includes('git ls-remote')) {
          const error = new Error('Could not resolve host');
          callback(error, '', 'Could not resolve host');
        }
        return {} as any;
      });

      const result = await checkGitRemote('origin');
      expect(result).toEqual({
        exists: true,
        accessible: false,
        error: 'Network error. Please check your internet connection',
      });
    });

    it('should handle general remote access errors', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd === 'git remote') {
          callback(null, 'origin\n', '');
        } else if (cmd.includes('git ls-remote')) {
          const error = new Error('Some other error');
          callback(error, '', 'Some other error');
        }
        return {} as any;
      });

      const result = await checkGitRemote('origin');
      expect(result).toEqual({
        exists: true,
        accessible: false,
        error: 'Remote is not accessible: Some other error',
      });
    });
  });

  describe('getCurrentBranch', () => {
    it('should return the current branch name', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        callback(null, 'feature-branch\n', '');
        return {} as any;
      });

      const result = await getCurrentBranch();
      expect(result).toBe('feature-branch');
    });

    it('should return null for detached head state', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        callback(null, 'HEAD\n', '');
        return {} as any;
      });

      const result = await getCurrentBranch();
      expect(result).toBe(null);
    });

    it('should return null when git command fails', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        callback(new Error('fatal: not a git repository'), '', '');
        return {} as any;
      });

      const result = await getCurrentBranch();
      expect(result).toBe(null);
    });

    it('should handle empty output', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        callback(null, '', '');
        return {} as any;
      });

      const result = await getCurrentBranch();
      expect(result).toBe('');
    });
  });

  describe('hasUpstreamBranch', () => {
    it('should return true when upstream branch exists', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        callback(null, 'origin/main\n', '');
        return {} as any;
      });

      const result = await hasUpstreamBranch();
      expect(result).toBe(true);
    });

    it('should return false when upstream branch does not exist', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        callback(new Error('fatal: no upstream configured'), '', '');
        return {} as any;
      });

      const result = await hasUpstreamBranch();
      expect(result).toBe(false);
    });

    it('should return false for any git command error', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        callback(new Error('Some other error'), '', '');
        return {} as any;
      });

      const result = await hasUpstreamBranch();
      expect(result).toBe(false);
    });
  });

  describe('pushToRemote', () => {
    beforeEach(() => {
      // Default mock for getCurrentBranch
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('rev-parse --abbrev-ref HEAD')) {
          callback(null, 'main\n', '');
        } else if (cmd.includes('git push')) {
          callback(null, '', 'Everything up-to-date');
        }
        return {} as any;
      });
    });

    it('should push to remote with default options', async () => {
      const result = await pushToRemote();
      expect(result).toEqual({
        success: true,
        remote: 'origin',
        branch: 'main',
        stderr: 'Everything up-to-date',
      });
    });

    it('should push with specified remote and branch', async () => {
      const result = await pushToRemote({ remote: 'upstream', branch: 'feature' });
      expect(result).toEqual({
        success: true,
        remote: 'upstream',
        branch: 'feature',
        stderr: 'Everything up-to-date',
      });
    });

    it('should push with set-upstream option when specified', async () => {
      let capturedCommand = '';
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('rev-parse --abbrev-ref HEAD')) {
          callback(null, 'main\n', '');
        } else if (cmd.includes('git push')) {
          capturedCommand = cmd;
          callback(null, '', 'Branch main set up to track remote branch main from origin');
        }
        return {} as any;
      });

      const result = await pushToRemote({ setUpstream: true });
      expect(capturedCommand).toContain('--set-upstream');
      expect(result.success).toBe(true);
    });

    it('should push with force option when specified', async () => {
      let capturedCommand = '';
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('rev-parse --abbrev-ref HEAD')) {
          callback(null, 'main\n', '');
        } else if (cmd.includes('git push')) {
          capturedCommand = cmd;
          callback(null, '', 'Everything up-to-date');
        }
        return {} as any;
      });

      const result = await pushToRemote({ force: true });
      expect(capturedCommand).toContain('--force-with-lease');
      expect(result.success).toBe(true);
    });

    it('should handle detached HEAD state', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('rev-parse --abbrev-ref HEAD')) {
          callback(null, 'HEAD\n', '');
        }
        return {} as any;
      });

      const result = await pushToRemote();
      expect(result).toEqual({
        success: false,
        error: 'Cannot push from detached HEAD state. Please checkout a branch first',
      });
    });

    it('should handle push errors', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('rev-parse --abbrev-ref HEAD')) {
          callback(null, 'main\n', '');
        } else if (cmd.includes('git push')) {
          const error: any = new Error('fatal: unable to access');
          error.stderr = 'fatal: unable to access repository';
          callback(error, '', error.stderr);
        }
        return {} as any;
      });

      const result = await pushToRemote();
      expect(result).toEqual({
        success: false,
        error: 'fatal: unable to access',
        stderr: 'fatal: unable to access repository',
      });
    });
  });

  describe('validateRemoteForPush', () => {
    it('should validate successfully when all conditions are met', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('git rev-parse --git-dir')) {
          callback(null, '.git', '');
        } else if (cmd.includes('git rev-parse --abbrev-ref HEAD')) {
          callback(null, 'main\n', '');
        } else if (cmd === 'git remote') {
          callback(null, 'origin\n', '');
        } else if (cmd.includes('git ls-remote')) {
          callback(null, 'refs/heads/main', '');
        } else if (cmd.includes('@{upstream}')) {
          callback(null, 'origin/main', '');
        }
        return {} as any;
      });

      const result = await validateRemoteForPush('origin');
      expect(result).toEqual({
        isValid: true,
        errors: [],
        suggestions: [],
      });
    });

    it('should return error when not in git repository', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('git rev-parse --git-dir')) {
          callback(new Error('not a git repository'), '', '');
        }
        return {} as any;
      });

      const result = await validateRemoteForPush('origin');
      expect(result).toEqual({
        isValid: false,
        errors: ['Not in a git repository'],
        suggestions: [
          'Initialize a repository with: git init',
          'Or clone an existing repository with: git clone <url>',
        ],
      });
    });

    it('should return error when in detached HEAD state', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('git rev-parse --git-dir')) {
          callback(null, '.git', '');
        } else if (cmd.includes('git rev-parse --abbrev-ref HEAD')) {
          callback(null, 'HEAD\n', '');
        }
        return {} as any;
      });

      const result = await validateRemoteForPush('origin');
      expect(result).toEqual({
        isValid: false,
        errors: ['Currently in detached HEAD state'],
        suggestions: [
          'Checkout a branch with: git checkout -b <branch-name>',
          'Or checkout an existing branch with: git checkout <branch-name>',
        ],
      });
    });

    it('should return error when remote does not exist', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('git rev-parse --git-dir')) {
          callback(null, '.git', '');
        } else if (cmd.includes('git rev-parse --abbrev-ref HEAD')) {
          callback(null, 'main\n', '');
        } else if (cmd === 'git remote') {
          callback(null, 'origin\n', '');
        }
        return {} as any;
      });

      const result = await validateRemoteForPush('upstream');
      expect(result).toEqual({
        isValid: false,
        errors: ["Remote 'upstream' does not exist"],
        suggestions: [
          'Add a remote with: git remote add upstream <repository-url>',
          'List existing remotes with: git remote -v',
        ],
      });
    });

    it('should return error when remote is not accessible', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('git rev-parse --git-dir')) {
          callback(null, '.git', '');
        } else if (cmd.includes('git rev-parse --abbrev-ref HEAD')) {
          callback(null, 'main\n', '');
        } else if (cmd === 'git remote') {
          callback(null, 'origin\n', '');
        } else if (cmd.includes('git ls-remote')) {
          const error = new Error('Authentication failed');
          callback(error, '', 'Authentication failed');
        }
        return {} as any;
      });

      const result = await validateRemoteForPush('origin');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain("Remote 'origin' is not accessible");
      expect(result.suggestions).toContain('Check your git credentials are configured correctly');
    });

    it('should suggest setting upstream when no upstream exists', async () => {
      mockExec.mockImplementation((cmd: string, callback: any) => {
        if (cmd.includes('git rev-parse --git-dir')) {
          callback(null, '.git', '');
        } else if (cmd.includes('git rev-parse --abbrev-ref HEAD')) {
          callback(null, 'feature-branch\n', '');
        } else if (cmd === 'git remote') {
          callback(null, 'origin\n', '');
        } else if (cmd.includes('git ls-remote')) {
          callback(null, 'refs/heads/main', '');
        } else if (cmd.includes('@{upstream}')) {
          callback(new Error('no upstream configured'), '', '');
        }
        return {} as any;
      });

      const result = await validateRemoteForPush('origin');
      expect(result.isValid).toBe(true);
      expect(result.suggestions).toContain('Set upstream tracking with: git push --set-upstream origin feature-branch');
    });
  });
});