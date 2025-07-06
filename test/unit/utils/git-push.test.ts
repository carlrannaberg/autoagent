import { describe, it, expect, vi, beforeEach } from 'vitest';

// Use vi.hoisted to hoist the mock creation
const { mockExec } = vi.hoisted(() => ({
  mockExec: vi.fn()
}));

// Mock child_process module before imports
vi.mock('child_process');

// Mock util module to return our mock exec when promisified
vi.mock('util', () => ({
  promisify: (): typeof mockExec => mockExec
}));

import {
  getCurrentBranch,
  hasUpstreamBranch,
  checkGitRemote,
  pushToRemote,
  validateRemoteForPush,
  type PushOptions
} from '../../../src/utils/git.js';

describe('Git Push Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExec.mockReset();
  });

  describe('getCurrentBranch', () => {
    it('should return current branch name', async () => {
      mockExec.mockResolvedValueOnce({
        stdout: 'main\n',
        stderr: ''
      });

      const branch = await getCurrentBranch();
      expect(branch).toBe('main');
      expect(mockExec).toHaveBeenCalledWith('git rev-parse --abbrev-ref HEAD');
    });

    it('should return null for detached HEAD', async () => {
      mockExec.mockResolvedValueOnce({
        stdout: 'HEAD\n',
        stderr: ''
      });

      const branch = await getCurrentBranch();
      expect(branch).toBeNull();
    });

    it('should return null on error', async () => {
      mockExec.mockRejectedValueOnce(new Error('Command failed'));

      const branch = await getCurrentBranch();
      expect(branch).toBeNull();
    });
  });

  describe('hasUpstreamBranch', () => {
    it('should return true when upstream exists', async () => {
      mockExec.mockResolvedValueOnce({
        stdout: 'origin/main\n',
        stderr: ''
      });

      const result = await hasUpstreamBranch();
      expect(result).toBe(true);
      expect(mockExec).toHaveBeenCalledWith('git rev-parse --abbrev-ref --symbolic-full-name @{upstream}');
    });

    it('should return false when no upstream', async () => {
      mockExec.mockRejectedValueOnce(new Error('no upstream configured'));

      const result = await hasUpstreamBranch();
      expect(result).toBe(false);
    });
  });

  describe('checkGitRemote', () => {
    it('should return exists and accessible for valid remote', async () => {
      mockExec
        .mockResolvedValueOnce({ stdout: 'origin\nupstream\n', stderr: '' })
        .mockResolvedValueOnce({ stdout: 'HEAD\n', stderr: '' });

      const result = await checkGitRemote('origin');
      expect(result).toEqual({
        exists: true,
        accessible: true
      });
    });

    it('should return not exists for missing remote', async () => {
      mockExec.mockResolvedValueOnce({ stdout: 'upstream\n', stderr: '' });

      const result = await checkGitRemote('origin');
      expect(result).toEqual({
        exists: false,
        accessible: false,
        error: "Remote 'origin' does not exist"
      });
    });

    it('should handle authentication errors', async () => {
      mockExec
        .mockResolvedValueOnce({ stdout: 'origin\n', stderr: '' })
        .mockRejectedValueOnce(new Error('Authentication failed'));

      const result = await checkGitRemote('origin');
      expect(result).toEqual({
        exists: true,
        accessible: false,
        error: 'Authentication failed. Please check your credentials'
      });
    });

    it('should handle network errors', async () => {
      mockExec
        .mockResolvedValueOnce({ stdout: 'origin\n', stderr: '' })
        .mockRejectedValueOnce(new Error('Could not resolve host'));

      const result = await checkGitRemote('origin');
      expect(result).toEqual({
        exists: true,
        accessible: false,
        error: 'Network error. Please check your internet connection'
      });
    });
  });

  describe('pushToRemote', () => {
    it('should push successfully with default options', async () => {
      mockExec
        .mockResolvedValueOnce({ stdout: 'main\n', stderr: '' })
        .mockResolvedValueOnce({ stdout: 'Everything up-to-date\n', stderr: '' });

      const result = await pushToRemote();
      expect(result).toEqual({
        success: true,
        remote: 'origin',
        branch: 'main',
        stderr: undefined
      });
      expect(mockExec).toHaveBeenCalledWith('git push origin main');
    });

    it('should handle detached HEAD state', async () => {
      mockExec.mockResolvedValueOnce({ stdout: 'HEAD\n', stderr: '' });

      const result = await pushToRemote();
      expect(result).toEqual({
        success: false,
        error: 'Cannot push from detached HEAD state. Please checkout a branch first'
      });
    });

    it('should push with force option', async () => {
      mockExec
        .mockResolvedValueOnce({ stdout: 'feature\n', stderr: '' })
        .mockResolvedValueOnce({ stdout: 'Success\n', stderr: '' });

      const options: PushOptions = { force: true };
      const result = await pushToRemote(options);
      expect(result.success).toBe(true);
      expect(mockExec).toHaveBeenCalledWith('git push --force-with-lease origin feature');
    });

    it('should push with set-upstream option', async () => {
      mockExec
        .mockResolvedValueOnce({ stdout: 'feature\n', stderr: '' })
        .mockResolvedValueOnce({ stdout: 'Success\n', stderr: '' });

      const options: PushOptions = { setUpstream: true };
      const result = await pushToRemote(options);
      expect(result.success).toBe(true);
      expect(mockExec).toHaveBeenCalledWith('git push --set-upstream origin feature');
    });

    it('should handle push errors', async () => {
      mockExec
        .mockResolvedValueOnce({ stdout: 'main\n', stderr: '' })
        .mockRejectedValueOnce(Object.assign(new Error('Push failed'), { stderr: 'Permission denied' }));

      const result = await pushToRemote();
      expect(result).toEqual({
        success: false,
        error: 'Push failed',
        stderr: 'Permission denied'
      });
    });
  });

  describe('validateRemoteForPush', () => {
    it('should validate successfully for valid setup', async () => {
      // Mock isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git\n', stderr: '' });
      // Mock getCurrentBranch
      mockExec.mockResolvedValueOnce({ stdout: 'main\n', stderr: '' });
      // Mock checkGitRemote - list remotes
      mockExec.mockResolvedValueOnce({ stdout: 'origin\n', stderr: '' });
      // Mock checkGitRemote - ls-remote
      mockExec.mockResolvedValueOnce({ stdout: 'HEAD\n', stderr: '' });
      // Mock hasUpstreamBranch
      mockExec.mockResolvedValueOnce({ stdout: 'origin/main\n', stderr: '' });

      const result = await validateRemoteForPush();
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation when not in git repository', async () => {
      mockExec.mockRejectedValueOnce(new Error('Not a git repository'));

      const result = await validateRemoteForPush();
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Not in a git repository');
      expect(result.suggestions).toContain('Initialize a repository with: git init');
    });

    it('should fail validation in detached HEAD state', async () => {
      // Mock isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git\n', stderr: '' });
      // Mock getCurrentBranch returning HEAD
      mockExec.mockResolvedValueOnce({ stdout: 'HEAD\n', stderr: '' });

      const result = await validateRemoteForPush();
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Currently in detached HEAD state');
      expect(result.suggestions).toContain('Checkout a branch with: git checkout -b <branch-name>');
    });

    it('should provide suggestions for missing upstream', async () => {
      // Mock isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git\n', stderr: '' });
      // Mock getCurrentBranch
      mockExec.mockResolvedValueOnce({ stdout: 'feature\n', stderr: '' });
      // Mock checkGitRemote - list remotes
      mockExec.mockResolvedValueOnce({ stdout: 'origin\n', stderr: '' });
      // Mock checkGitRemote - ls-remote
      mockExec.mockResolvedValueOnce({ stdout: 'HEAD\n', stderr: '' });
      // Mock hasUpstreamBranch - no upstream
      mockExec.mockRejectedValueOnce(new Error('no upstream'));

      const result = await validateRemoteForPush();
      expect(result.isValid).toBe(true);
      expect(result.suggestions).toContain('Set upstream tracking with: git push --set-upstream origin feature');
    });
  });
});