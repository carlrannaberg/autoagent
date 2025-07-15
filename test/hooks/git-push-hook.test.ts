import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitPushHook } from '@/hooks/git-push-hook.js';
import { getCurrentBranch, pushToRemote, validateRemoteForPush } from '@/utils/git.js';
import { Hook, HookData } from '@/types/index.js';

vi.mock('@/utils/git.js', () => ({
  getCurrentBranch: vi.fn(),
  pushToRemote: vi.fn(),
  validateRemoteForPush: vi.fn(),
}));

describe('GitPushHook', () => {
  let hook: GitPushHook;
  const mockHookData: HookData = {
    eventName: 'PostExecutionEnd',
    sessionId: 'test-session',
    workspace: '/test/workspace',
    timestamp: Date.now(),
  };

  beforeEach(() => {
    hook = new GitPushHook();
    vi.clearAllMocks();
  });

  it('should push to remote successfully', async () => {
    vi.mocked(getCurrentBranch).mockResolvedValue('main');
    vi.mocked(validateRemoteForPush).mockResolvedValue({
      isValid: true,
      errors: [],
      suggestions: [],
    });
    vi.mocked(pushToRemote).mockResolvedValue({
      success: true,
      remote: 'origin',
      branch: 'main',
    });

    const result = await hook.execute(mockHookData, { type: 'git-push' });

    expect(getCurrentBranch).toHaveBeenCalled();
    expect(validateRemoteForPush).toHaveBeenCalledWith('origin');
    expect(vi.mocked(pushToRemote)).toHaveBeenCalledWith({
      remote: 'origin',
      branch: 'main',
      setUpstream: true,
    });
    expect(result.blocked).toBe(false);
    expect(result.output).toBe('Successfully pushed to origin/main');
  });

  it('should handle authentication failures with clear messaging', async () => {
    vi.mocked(getCurrentBranch).mockResolvedValue('main');
    vi.mocked(validateRemoteForPush).mockResolvedValue({
      isValid: true,
      errors: [],
      suggestions: [],
    });
    vi.mocked(pushToRemote).mockResolvedValue({
      success: false,
      error: 'fatal: Authentication failed for https://github.com/user/repo.git',
      stderr: 'remote: Invalid username or password',
    });

    const result = await hook.execute(mockHookData, { type: 'git-push' });

    expect(result.blocked).toBe(false);
    expect(result.output).toContain('Failed to push to origin/main: Authentication failed');
    expect(result.output).toContain('Please check your git credentials');
    expect(result.output).toContain('Git output:\nremote: Invalid username or password');
  });

  it('should handle non-fast-forward rejections with resolution steps', async () => {
    vi.mocked(getCurrentBranch).mockResolvedValue('feature-branch');
    vi.mocked(validateRemoteForPush).mockResolvedValue({
      isValid: true,
      errors: [],
      suggestions: [],
    });
    vi.mocked(pushToRemote).mockResolvedValue({
      success: false,
      error: '! [rejected] feature-branch -> feature-branch (non-fast-forward)',
      stderr: 'hint: Updates were rejected because the tip of your current branch is behind',
    });

    const result = await hook.execute(mockHookData, { type: 'git-push' });

    expect(result.blocked).toBe(false);
    expect(result.output).toContain('Push rejected. The remote contains work that you do not have locally');
    expect(result.output).toContain('To resolve:');
    expect(result.output).toContain('1. Pull the latest changes: git pull origin feature-branch');
    expect(result.output).toContain('2. Resolve any conflicts');
    expect(result.output).toContain('3. Try pushing again');
  });

  it('should handle network errors', async () => {
    vi.mocked(getCurrentBranch).mockResolvedValue('main');
    vi.mocked(validateRemoteForPush).mockResolvedValue({
      isValid: true,
      errors: [],
      suggestions: [],
    });
    vi.mocked(pushToRemote).mockResolvedValue({
      success: false,
      error: 'fatal: unable to access https://github.com/user/repo.git/: Could not resolve host: github.com',
    });

    const result = await hook.execute(mockHookData, { type: 'git-push' });

    expect(result.blocked).toBe(false);
    expect(result.output).toContain('Failed to push to origin/main: Network error');
    expect(result.output).toContain('Please check your internet connection');
  });

  it('should use configured remote', async () => {
    vi.mocked(getCurrentBranch).mockResolvedValue('feature-branch');
    vi.mocked(validateRemoteForPush).mockResolvedValue({
      isValid: true,
      errors: [],
      suggestions: [],
    });
    vi.mocked(pushToRemote).mockResolvedValue({
      success: true,
      remote: 'upstream',
      branch: 'feature-branch',
    });

    const config: Hook = { type: 'git-push', remote: 'upstream' };
    const result = await hook.execute(mockHookData, config);

    expect(validateRemoteForPush).toHaveBeenCalledWith('upstream');
    expect(vi.mocked(pushToRemote)).toHaveBeenCalledWith({
      remote: 'upstream',
      branch: 'feature-branch',
      setUpstream: true,
    });
    expect(result.output).toBe('Successfully pushed to upstream/feature-branch');
  });

  it('should handle detached HEAD state', async () => {
    vi.mocked(getCurrentBranch).mockResolvedValue(null);

    const result = await hook.execute(mockHookData, { type: 'git-push' });

    expect(vi.mocked(validateRemoteForPush)).not.toHaveBeenCalled();
    expect(vi.mocked(pushToRemote)).not.toHaveBeenCalled();
    expect(result.blocked).toBe(false);
    expect(result.output).toBe('Cannot push: Currently in detached HEAD state. Please checkout a branch first.');
  });

  it('should handle validation failures with suggestions', async () => {
    vi.mocked(getCurrentBranch).mockResolvedValue('main');
    vi.mocked(validateRemoteForPush).mockResolvedValue({
      isValid: false,
      errors: ['Remote \'origin\' does not exist'],
      suggestions: [
        'Add a remote with: git remote add origin <repository-url>',
        'List existing remotes with: git remote -v'
      ],
    });

    const result = await hook.execute(mockHookData, { type: 'git-push' });

    expect(vi.mocked(pushToRemote)).not.toHaveBeenCalled();
    expect(result.blocked).toBe(false);
    expect(result.output).toContain('Failed to push: Remote \'origin\' does not exist');
    expect(result.output).toContain('Suggestions:');
    expect(result.output).toContain('- Add a remote with: git remote add origin <repository-url>');
    expect(result.output).toContain('- List existing remotes with: git remote -v');
  });

  it('should handle validation failures without suggestions', async () => {
    vi.mocked(getCurrentBranch).mockResolvedValue('main');
    vi.mocked(validateRemoteForPush).mockResolvedValue({
      isValid: false,
      errors: ['Not in a git repository'],
      suggestions: [],
    });

    const result = await hook.execute(mockHookData, { type: 'git-push' });

    expect(result.blocked).toBe(false);
    expect(result.output).toBe('Failed to push: Not in a git repository');
    expect(result.output).not.toContain('Suggestions:');
  });
});
