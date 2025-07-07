import { describe, it, expect, beforeEach, vi } from 'vitest';

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
  checkGitAvailable,
  isGitRepository,
  getGitStatus,
  stageAllChanges,
  createCommit,
  getCurrentCommitHash,
  getUncommittedChanges,
  hasChangesToCommit,
  revertToCommit,
  getChangedFiles,
  validateGitEnvironment
} from '../../../src/utils/git';

describe('Git Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExec.mockReset();
  });

  describe('checkGitAvailable', () => {
    it('should return true when git is available', async () => {
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      
      const result = await checkGitAvailable();
      
      expect(result).toBe(true);
      expect(mockExec).toHaveBeenCalledWith('git --version');
    });

    it('should return false when git is not available', async () => {
      mockExec.mockRejectedValueOnce(new Error('Command not found'));
      
      const result = await checkGitAvailable();
      
      expect(result).toBe(false);
    });
  });

  describe('isGitRepository', () => {
    it('should return true when in a git repository', async () => {
      mockExec.mockResolvedValueOnce({ stdout: '.git', stderr: '' });
      
      const result = await isGitRepository();
      
      expect(result).toBe(true);
      expect(mockExec).toHaveBeenCalledWith('git rev-parse --git-dir');
    });

    it('should return false when not in a git repository', async () => {
      mockExec.mockRejectedValueOnce(new Error('Not a git repository'));
      
      const result = await isGitRepository();
      
      expect(result).toBe(false);
    });
  });

  describe('getGitStatus', () => {
    it('should return complete git status', async () => {
      // Mock isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git', stderr: '' });
      // Mock branch name
      mockExec.mockResolvedValueOnce({ stdout: 'main\n', stderr: '' });
      // Mock diff status
      mockExec.mockResolvedValueOnce({ stdout: ' file.txt | 2 +-\n', stderr: '' });
      // Mock untracked files
      mockExec.mockResolvedValueOnce({ stdout: 'newfile.txt\n', stderr: '' });
      // Mock diff-index (dirty check)
      mockExec.mockRejectedValueOnce(new Error('Changes exist'));
      // Mock rev-list (ahead/behind)
      mockExec.mockResolvedValueOnce({ stdout: '2\t3\n', stderr: '' });

      const status = await getGitStatus();

      expect(status).toEqual({
        isRepo: true,
        isDirty: true,
        hasUncommitted: true,
        hasUntracked: true,
        branch: 'main',
        ahead: 2,
        behind: 3
      });
    });

    it('should handle non-git repository', async () => {
      mockExec.mockRejectedValueOnce(new Error('Not a git repository'));

      const status = await getGitStatus();

      expect(status.isRepo).toBe(false);
    });
  });

  describe('stageAllChanges', () => {
    it('should stage all changes', async () => {
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });

      await stageAllChanges();

      expect(mockExec).toHaveBeenCalledWith('git add -A');
    });
  });

  describe('createCommit', () => {
    it('should create a commit with message', async () => {
      mockExec.mockResolvedValueOnce({ 
        stdout: '[main abc1234] Test commit', 
        stderr: '' 
      });

      const result = await createCommit({ message: 'Test commit' });

      expect(result).toEqual({
        success: true,
        commitHash: 'abc1234'
      });
      expect(mockExec).toHaveBeenCalledWith('git commit -m "Test commit"');
    });

    it('should create a commit with co-author', async () => {
      mockExec.mockResolvedValueOnce({ 
        stdout: '[main def5678] Test commit', 
        stderr: '' 
      });

      const result = await createCommit({
        message: 'Test commit',
        coAuthor: { name: 'Claude', email: 'claude@autoagent' }
      });

      expect(result.success).toBe(true);
      expect(mockExec).toHaveBeenCalledWith(
        'git commit -m "Test commit\n\nCo-authored-by: Claude <claude@autoagent>"'
      );
    });

    it('should create a commit with noVerify option', async () => {
      mockExec.mockResolvedValueOnce({ 
        stdout: '[main 1234567] Test commit\n 1 file changed, 1 insertion(+)', 
        stderr: '' 
      });

      const result = await createCommit({
        message: 'Test commit',
        noVerify: true
      });

      expect(result).toEqual({
        success: true,
        commitHash: '1234567'
      });
      expect(mockExec).toHaveBeenCalledWith('git commit -m "Test commit" --no-verify');
    });

    it('should create a commit with both co-author and noVerify', async () => {
      mockExec.mockResolvedValueOnce({ 
        stdout: '[main abc1234] Test commit', 
        stderr: '' 
      });

      const result = await createCommit({
        message: 'Test commit',
        coAuthor: { name: 'Claude', email: 'claude@autoagent' },
        noVerify: true
      });

      expect(result.success).toBe(true);
      expect(mockExec).toHaveBeenCalledWith(
        'git commit -m "Test commit\n\nCo-authored-by: Claude <claude@autoagent>" --no-verify'
      );
    });

    it('should create a commit with signoff option', async () => {
      mockExec.mockResolvedValueOnce({ 
        stdout: '[main 7654321] Test commit\n 1 file changed, 1 insertion(+)', 
        stderr: '' 
      });

      const result = await createCommit({
        message: 'Test commit',
        signoff: true
      });

      expect(result).toEqual({
        success: true,
        commitHash: '7654321'
      });
      expect(mockExec).toHaveBeenCalledWith('git commit -m "Test commit" --signoff');
    });

    it('should create a commit with all options enabled', async () => {
      mockExec.mockResolvedValueOnce({ 
        stdout: '[main all5678] Test commit', 
        stderr: '' 
      });

      const result = await createCommit({
        message: 'Test commit',
        coAuthor: { name: 'Claude', email: 'claude@autoagent' },
        signoff: true,
        noVerify: true
      });

      expect(result.success).toBe(true);
      expect(mockExec).toHaveBeenCalledWith(
        'git commit -m "Test commit\n\nCo-authored-by: Claude <claude@autoagent>" --signoff --no-verify'
      );
    });

    it('should handle commit failure', async () => {
      mockExec.mockRejectedValueOnce(new Error('Nothing to commit'));

      const result = await createCommit({ message: 'Test commit' });

      expect(result).toEqual({
        success: false,
        error: 'Nothing to commit'
      });
    });

    it('should not include --no-verify flag when noVerify is false', async () => {
      mockExec.mockResolvedValueOnce({ 
        stdout: '[main abc1234] Test commit', 
        stderr: '' 
      });

      const result = await createCommit({
        message: 'Test commit',
        noVerify: false
      });

      expect(result.success).toBe(true);
      expect(mockExec).toHaveBeenCalledWith('git commit -m "Test commit"');
      expect(mockExec).not.toHaveBeenCalledWith(expect.stringContaining('--no-verify'));
    });

    it('should handle commits with messages containing quotes', async () => {
      mockExec.mockResolvedValueOnce({ 
        stdout: '[main abc1234] Test commit with "quotes"', 
        stderr: '' 
      });

      const result = await createCommit({
        message: 'Test commit with "quotes"',
        noVerify: true
      });

      expect(result.success).toBe(true);
      expect(mockExec).toHaveBeenCalledWith('git commit -m "Test commit with \\"quotes\\"" --no-verify');
    });
  });

  describe('getCurrentCommitHash', () => {
    it('should return current commit hash', async () => {
      mockExec.mockResolvedValueOnce({ stdout: 'abc1234567890\n', stderr: '' });

      const hash = await getCurrentCommitHash();

      expect(hash).toBe('abc1234567890');
      expect(mockExec).toHaveBeenCalledWith('git rev-parse HEAD');
    });

    it('should return null when no commits exist', async () => {
      mockExec.mockRejectedValueOnce(new Error('No commits'));

      const hash = await getCurrentCommitHash();

      expect(hash).toBeNull();
    });
  });

  describe('getUncommittedChanges', () => {
    it('should return uncommitted changes as patch', async () => {
      const patch = 'diff --git a/file.txt b/file.txt\nindex 123..456\n';
      mockExec.mockResolvedValueOnce({ stdout: patch, stderr: '' });

      const changes = await getUncommittedChanges();

      expect(changes).toBe(patch);
      expect(mockExec).toHaveBeenCalledWith('git diff HEAD');
    });

    it('should return empty string on error', async () => {
      mockExec.mockRejectedValueOnce(new Error('No diff'));

      const changes = await getUncommittedChanges();

      expect(changes).toBe('');
    });
  });

  describe('hasChangesToCommit', () => {
    it('should return true when there are staged changes', async () => {
      mockExec.mockResolvedValueOnce({ stdout: ' file.txt | 2 +-\n', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });

      const result = await hasChangesToCommit();

      expect(result).toBe(true);
    });

    it('should return true when there are unstaged changes', async () => {
      // git diff --cached --stat (no staged changes)
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });
      // git diff --stat (has unstaged changes)
      mockExec.mockResolvedValueOnce({ stdout: ' file.txt | 3 ++\n', stderr: '' });
      
      const result = await hasChangesToCommit();

      expect(result).toBe(true);
    });

    it('should return true when there are untracked files', async () => {
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: 'newfile.txt\n', stderr: '' });

      const result = await hasChangesToCommit();

      expect(result).toBe(true);
    });

    it('should return false when there are no changes', async () => {
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });

      const result = await hasChangesToCommit();

      expect(result).toBe(false);
    });
  });

  describe('revertToCommit', () => {
    it('should revert to specified commit', async () => {
      mockExec.mockResolvedValueOnce({ stdout: 'HEAD is now at abc1234', stderr: '' });

      const result = await revertToCommit('abc1234');

      expect(result).toBe(true);
      expect(mockExec).toHaveBeenCalledWith('git reset --hard abc1234');
    });

    it('should return false on failure', async () => {
      mockExec.mockRejectedValueOnce(new Error('Invalid commit'));

      const result = await revertToCommit('invalid');

      expect(result).toBe(false);
    });
  });

  describe('getChangedFiles', () => {
    it('should return all changed files', async () => {
      mockExec.mockResolvedValueOnce({ stdout: 'staged.txt\n', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: 'modified.txt\n', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: 'untracked.txt\n', stderr: '' });

      const files = await getChangedFiles();

      expect(files).toEqual(['staged.txt', 'modified.txt', 'untracked.txt']);
    });

    it('should handle duplicates', async () => {
      mockExec.mockResolvedValueOnce({ stdout: 'file.txt\n', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: 'file.txt\n', stderr: '' });
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });

      const files = await getChangedFiles();

      expect(files).toEqual(['file.txt']);
    });

    it('should return empty array on error', async () => {
      mockExec.mockRejectedValueOnce(new Error('Git error'));

      const files = await getChangedFiles();

      expect(files).toEqual([]);
    });
  });

  describe('validateGitEnvironment', () => {
    it('should return valid when all checks pass', async () => {
      // Git is available - checkGitAvailable
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Get git version - getGitVersion
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Is git repository - isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git', stderr: '' });
      // User name configured
      mockExec.mockResolvedValueOnce({ stdout: 'John Doe', stderr: '' });
      // User email configured
      mockExec.mockResolvedValueOnce({ stdout: 'john@example.com', stderr: '' });
      // Remote configured
      mockExec.mockResolvedValueOnce({ stdout: 'origin  https://github.com/user/repo.git (fetch)', stderr: '' });

      const result = await validateGitEnvironment();

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.suggestions).toEqual([]);
    });

    it('should detect when git is not installed', async () => {
      // Git is not available
      mockExec.mockRejectedValueOnce(new Error('Command not found'));

      const result = await validateGitEnvironment();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Git is not installed or not accessible in PATH');
      expect(result.suggestions).toContain('Install Git from https://git-scm.com/downloads');
      expect(result.suggestions).toContain('Ensure git is added to your system PATH');
    });

    it('should detect when not in a git repository', async () => {
      // Git is available - checkGitAvailable
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Get git version - getGitVersion
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Not a git repository - isGitRepository
      mockExec.mockRejectedValueOnce(new Error('Not a git repository'));

      const result = await validateGitEnvironment();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current directory is not a Git repository');
      expect(result.suggestions).toContain('Initialize a new repository with: git init');
      expect(result.suggestions).toContain('Or clone an existing repository with: git clone <url>');
    });

    it('should detect missing user configuration', async () => {
      // Git is available - checkGitAvailable
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Get git version - getGitVersion
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Is git repository - isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git', stderr: '' });
      // User name not configured
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });
      // User email not configured
      mockExec.mockRejectedValueOnce(new Error('No email configured'));
      // Remote configured
      mockExec.mockResolvedValueOnce({ stdout: 'origin  https://github.com/user/repo.git (fetch)', stderr: '' });

      const result = await validateGitEnvironment();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Git user name is not configured');
      expect(result.errors).toContain('Git user email is not configured');
      expect(result.suggestions).toContain('Set your name with: git config --global user.name "Your Name"');
      expect(result.suggestions).toContain('Set your email with: git config --global user.email "your.email@example.com"');
    });

    it('should detect missing remote repository', async () => {
      // Git is available - checkGitAvailable
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Get git version - getGitVersion
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Is git repository - isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git', stderr: '' });
      // User name configured
      mockExec.mockResolvedValueOnce({ stdout: 'John Doe', stderr: '' });
      // User email configured
      mockExec.mockResolvedValueOnce({ stdout: 'john@example.com', stderr: '' });
      // No remote configured
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });

      const result = await validateGitEnvironment();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('No remote repository configured');
      expect(result.suggestions).toContain('Add a remote with: git remote add origin <repository-url>');
      expect(result.suggestions).toContain('View existing remotes with: git remote -v');
    });

    it('should handle errors when checking remotes', async () => {
      // Git is available - checkGitAvailable
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Get git version - getGitVersion
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Is git repository - isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git', stderr: '' });
      // User name configured
      mockExec.mockResolvedValueOnce({ stdout: 'John Doe', stderr: '' });
      // User email configured
      mockExec.mockResolvedValueOnce({ stdout: 'john@example.com', stderr: '' });
      // Error checking remotes
      mockExec.mockRejectedValueOnce(new Error('Remote check failed'));

      const result = await validateGitEnvironment();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Unable to check remote repositories');
      expect(result.suggestions).toContain('Check git configuration with: git remote -v');
    });

    it('should handle multiple validation errors', async () => {
      // Git is available - checkGitAvailable
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Get git version - getGitVersion
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Is git repository - isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git', stderr: '' });
      // User name not configured (empty)
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });
      // User email not configured (empty)
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });
      // No remote configured
      mockExec.mockResolvedValueOnce({ stdout: '', stderr: '' });

      const result = await validateGitEnvironment();

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
      expect(result.errors).toContain('Git user name is not configured');
      expect(result.errors).toContain('Git user email is not configured');
      expect(result.errors).toContain('No remote repository configured');
      expect(result.suggestions).toHaveLength(4);
    });

    it('should handle git config command failures', async () => {
      // Git is available - checkGitAvailable
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Get git version - getGitVersion
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Is git repository - isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git', stderr: '' });
      // User name check fails
      mockExec.mockRejectedValueOnce(new Error('git config failed'));
      // User email configured
      mockExec.mockResolvedValueOnce({ stdout: 'john@example.com', stderr: '' });
      // Remote configured
      mockExec.mockResolvedValueOnce({ stdout: 'origin  https://github.com/user/repo.git (fetch)', stderr: '' });

      const result = await validateGitEnvironment();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Git user name is not configured');
      expect(result.suggestions).toContain('Set your name with: git config --global user.name "Your Name"');
    });

    it('should only check user config when git is available and in repo', async () => {
      // Git is not available - checkGitAvailable
      mockExec.mockRejectedValueOnce(new Error('Command not found'));
      // isGitRepository will also be called
      mockExec.mockRejectedValueOnce(new Error('Not a git repository'));

      const result = await validateGitEnvironment();

      // Should not attempt to check user config or git version when git is not available
      expect(mockExec).toHaveBeenCalledTimes(2);
      // Both errors are added: git not installed AND not a git repository
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0]).toContain('Git is not installed');
      expect(result.errors[1]).toContain('Current directory is not a Git repository');
    });

    it('should skip user config checks when not in repository', async () => {
      // Git is available - checkGitAvailable
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Get git version - getGitVersion
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Not a git repository - isGitRepository
      mockExec.mockRejectedValueOnce(new Error('Not a git repository'));

      const result = await validateGitEnvironment();

      // Should only have made 3 calls (checkGitAvailable, getGitVersion, isGitRepository)
      expect(mockExec).toHaveBeenCalledTimes(3);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('not a Git repository');
    });

    it('should trim whitespace from git config values', async () => {
      // Git is available - checkGitAvailable
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Get git version - getGitVersion
      mockExec.mockResolvedValueOnce({ stdout: 'git version 2.30.0', stderr: '' });
      // Is git repository - isGitRepository
      mockExec.mockResolvedValueOnce({ stdout: '.git', stderr: '' });
      // User name with whitespace
      mockExec.mockResolvedValueOnce({ stdout: '  John Doe  \n', stderr: '' });
      // User email with whitespace
      mockExec.mockResolvedValueOnce({ stdout: '  john@example.com  \n', stderr: '' });
      // Remote with whitespace
      mockExec.mockResolvedValueOnce({ stdout: '  origin  https://github.com/user/repo.git (fetch)  \n', stderr: '' });

      const result = await validateGitEnvironment();

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });
});