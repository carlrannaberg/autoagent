import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitCommitHook } from '../../../src/hooks/git-commit-hook.js';
import { hasChangesToCommit, stageAllChanges, createCommit } from '../../../src/utils/git.js';

vi.mock('../../../src/utils/git.js', () => ({
  hasChangesToCommit: vi.fn(),
  stageAllChanges: vi.fn(),
  createCommit: vi.fn()
}));

describe('GitCommitHook', () => {
  let hook: GitCommitHook;

  beforeEach(() => {
    hook = new GitCommitHook();
    vi.clearAllMocks();
  });

  it('should not commit if there are no changes', async () => {
    vi.mocked(hasChangesToCommit).mockResolvedValue(false);

    const result = await hook.execute({}, {});

    expect(result.output).toBe('No changes to commit.');
    expect(stageAllChanges).not.toHaveBeenCalled();
    expect(createCommit).not.toHaveBeenCalled();
  });

  it('should stage changes and create a commit', async () => {
    vi.mocked(hasChangesToCommit).mockResolvedValue(true);
    vi.mocked(createCommit).mockResolvedValue({ success: true, commitHash: '12345' });

    const result = await hook.execute(
      { issueNumber: 42, issueTitle: 'Test Issue' },
      { message: 'feat: {{issueTitle}}' }
    );

    expect(stageAllChanges).toHaveBeenCalled();
    expect(createCommit).toHaveBeenCalledWith({
      message: 'feat: Test Issue',
      noVerify: false,
    });
    expect(result.output).toBe('Commit created: 12345');
  });

  it('should handle commit failures gracefully', async () => {
    vi.mocked(hasChangesToCommit).mockResolvedValue(true);
    vi.mocked(createCommit).mockResolvedValue({ success: false, error: 'Commit failed' });

    const result = await hook.execute({}, {});

    expect(result.output).toBe('Failed to create commit: Commit failed');
  });

  it('should use noVerify option when configured', async () => {
    vi.mocked(hasChangesToCommit).mockResolvedValue(true);
    vi.mocked(createCommit).mockResolvedValue({ success: true, commitHash: 'abcdef' });

    await hook.execute({}, { noVerify: true });

    expect(createCommit).toHaveBeenCalledWith(expect.objectContaining({ noVerify: true }));
  });
});
