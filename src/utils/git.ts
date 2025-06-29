import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface GitStatus {
  isRepo: boolean;
  isDirty: boolean;
  hasUncommitted: boolean;
  hasUntracked: boolean;
  branch: string;
  ahead: number;
  behind: number;
}

export interface CommitOptions {
  message: string;
  coAuthor?: {
    name: string;
    email: string;
  };
  signoff?: boolean;
}

export interface GitCommitResult {
  success: boolean;
  commitHash?: string;
  error?: string;
}

/**
 * Check if git is available on the system
 */
export async function checkGitAvailable(): Promise<boolean> {
  try {
    await execAsync('git --version');
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if the current directory is a git repository
 */
export async function isGitRepository(): Promise<boolean> {
  try {
    await execAsync('git rev-parse --git-dir');
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the current git status
 */
export async function getGitStatus(): Promise<GitStatus> {
  const status: GitStatus = {
    isRepo: false,
    isDirty: false,
    hasUncommitted: false,
    hasUntracked: false,
    branch: '',
    ahead: 0,
    behind: 0
  };

  try {
    // Check if it's a git repo
    status.isRepo = await isGitRepository();
    if (!status.isRepo) {
      return status;
    }

    // Get current branch
    const { stdout: branch } = await execAsync('git rev-parse --abbrev-ref HEAD');
    status.branch = branch.trim();

    // Check for uncommitted changes
    const { stdout: diffStatus } = await execAsync('git diff --stat');
    status.hasUncommitted = diffStatus.trim().length > 0;

    // Check for untracked files
    const { stdout: untrackedFiles } = await execAsync('git ls-files --others --exclude-standard');
    status.hasUntracked = untrackedFiles.trim().length > 0;

    // Check if working directory is dirty
    try {
      await execAsync('git diff-index --quiet HEAD --');
      status.isDirty = false;
    } catch {
      status.isDirty = true;
    }

    // Get ahead/behind status
    try {
      const { stdout: revList } = await execAsync(`git rev-list --left-right --count HEAD...@{upstream}`);
      const [ahead, behind] = revList.trim().split('\t').map(n => parseInt(n, 10));
      status.ahead = ahead || 0;
      status.behind = behind || 0;
    } catch {
      // No upstream configured
    }

    return status;
  } catch (error) {
    // Silently handle error - not in a git repo or git not available
    return status;
  }
}

/**
 * Stage all changes
 */
export async function stageAllChanges(): Promise<void> {
  await execAsync('git add -A');
}

/**
 * Create a git commit with optional co-authorship
 */
export async function createCommit(options: CommitOptions): Promise<GitCommitResult> {
  try {
    const { message, coAuthor, signoff } = options;
    
    // Build commit message with co-author if provided
    let fullMessage = message;
    if (coAuthor) {
      fullMessage += `\n\nCo-authored-by: ${coAuthor.name} <${coAuthor.email}>`;
    }

    // Build git commit command
    let command = `git commit -m "${fullMessage.replace(/"/g, '\\"')}"`;
    if (signoff) {
      command += ' --signoff';
    }

    const { stdout } = await execAsync(command);
    
    // Extract commit hash from output
    const hashMatch = stdout.match(/\[[\w\s-]+\s+([a-f0-9]+)\]/);
    const commitHash = hashMatch ? hashMatch[1] : undefined;

    return {
      success: true,
      commitHash
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Get the current commit hash
 */
export async function getCurrentCommitHash(): Promise<string | null> {
  try {
    const { stdout } = await execAsync('git rev-parse HEAD');
    return stdout.trim();
  } catch {
    return null;
  }
}

/**
 * Get uncommitted changes as a patch
 */
export async function getUncommittedChanges(): Promise<string> {
  try {
    const { stdout } = await execAsync('git diff HEAD');
    return stdout;
  } catch {
    return '';
  }
}

/**
 * Check if there are any changes to commit
 */
export async function hasChangesToCommit(): Promise<boolean> {
  try {
    // Check for staged changes
    const { stdout: staged } = await execAsync('git diff --cached --stat');
    if (staged.trim()) {
      return true;
    }

    // Check for unstaged changes
    const { stdout: unstaged } = await execAsync('git diff --stat');
    if (unstaged.trim()) {
      return true;
    }

    // Check for untracked files
    const { stdout: untracked } = await execAsync('git ls-files --others --exclude-standard');
    return untracked.trim().length > 0;
  } catch {
    return false;
  }
}

/**
 * Revert to a specific commit
 */
export async function revertToCommit(commitHash: string): Promise<boolean> {
  try {
    await execAsync(`git reset --hard ${commitHash}`);
    return true;
  } catch (error) {
    // Failed to revert to commit
    return false;
  }
}

/**
 * Get the list of changed files
 */
export async function getChangedFiles(): Promise<string[]> {
  try {
    const files: string[] = [];

    // Get staged files
    const { stdout: staged } = await execAsync('git diff --cached --name-only');
    if (staged.trim()) {
      files.push(...staged.trim().split('\n'));
    }

    // Get unstaged files
    const { stdout: unstaged } = await execAsync('git diff --name-only');
    if (unstaged.trim()) {
      files.push(...unstaged.trim().split('\n'));
    }

    // Get untracked files
    const { stdout: untracked } = await execAsync('git ls-files --others --exclude-standard');
    if (untracked.trim()) {
      files.push(...untracked.trim().split('\n'));
    }

    // Remove duplicates
    return [...new Set(files)];
  } catch {
    return [];
  }
}