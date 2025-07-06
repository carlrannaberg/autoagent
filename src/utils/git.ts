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
  /**
   * Skip pre-commit and commit-msg hooks
   */
  noVerify?: boolean;
}

export interface GitCommitResult {
  success: boolean;
  commitHash?: string;
  error?: string;
}

export interface GitValidationResult {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
  gitVersion?: string;
}

export interface GitValidationOptions {
  onDebug?: (message: string) => void;
}

export interface PushOptions {
  remote?: string;
  branch?: string;
  force?: boolean;
  setUpstream?: boolean;
}

export interface GitPushResult {
  success: boolean;
  remote?: string;
  branch?: string;
  error?: string;
  stderr?: string;
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
 * Get git version if available
 */
export async function getGitVersion(): Promise<string | null> {
  try {
    const { stdout } = await execAsync('git --version');
    return stdout.trim();
  } catch {
    return null;
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
    status.hasUncommitted = diffStatus.trim() !== '';

    // Check for untracked files
    const { stdout: untrackedFiles } = await execAsync('git ls-files --others --exclude-standard');
    status.hasUntracked = untrackedFiles.trim() !== '';

    // Check if working directory is dirty
    try {
      await execAsync('git diff-index --quiet HEAD --');
      status.isDirty = false;
    } catch {
      status.isDirty = true;
    }

    // Get ahead/behind status
    try {
      const { stdout: revList } = await execAsync('git rev-list --left-right --count HEAD...@{upstream}');
      const [ahead, behind] = revList.trim().split('\t').map(n => parseInt(n, 10));
      status.ahead = ahead ?? 0;
      status.behind = behind ?? 0;
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
    const { message, coAuthor, signoff, noVerify } = options;
    
    // Build commit message with co-author if provided
    let fullMessage = message;
    if (coAuthor) {
      fullMessage += `\n\nCo-authored-by: ${coAuthor.name} <${coAuthor.email}>`;
    }

    // Build git commit command
    let command = `git commit -m "${fullMessage.replace(/"/g, '\\"')}"`;
    if (signoff === true) {
      command += ' --signoff';
    }
    if (noVerify === true) {
      command += ' --no-verify';
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
    if (staged.trim() !== '') {
      return true;
    }

    // Check for unstaged changes
    const { stdout: unstaged } = await execAsync('git diff --stat');
    if (unstaged.trim() !== '') {
      return true;
    }

    // Check for untracked files
    const { stdout: untracked } = await execAsync('git ls-files --others --exclude-standard');
    return untracked.trim() !== '';
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
    if (staged.trim() !== '') {
      files.push(...staged.trim().split('\n'));
    }

    // Get unstaged files
    const { stdout: unstaged } = await execAsync('git diff --name-only');
    if (unstaged.trim() !== '') {
      files.push(...unstaged.trim().split('\n'));
    }

    // Get untracked files
    const { stdout: untracked } = await execAsync('git ls-files --others --exclude-standard');
    if (untracked.trim() !== '') {
      files.push(...untracked.trim().split('\n'));
    }

    // Remove duplicates
    return Array.from(new Set(files));
  } catch {
    return [];
  }
}

/**
 * Validate git environment with comprehensive checks
 */
export async function validateGitEnvironment(options: GitValidationOptions = {}): Promise<GitValidationResult> {
  const errors: string[] = [];
  const suggestions: string[] = [];
  const debug = options.onDebug || ((): void => {});
  let gitVersion: string | undefined;

  debug('🔍 Starting git validation...');

  // Check git availability
  debug('📋 Checking git availability...');
  const gitAvailable = await checkGitAvailable();
  if (!gitAvailable) {
    debug('❌ Git is not available');
    errors.push('Git is not installed or not accessible in PATH');
    suggestions.push('Install Git from https://git-scm.com/downloads');
    suggestions.push('Ensure git is added to your system PATH');
  } else {
    // Get git version for debug info
    const version = await getGitVersion();
    gitVersion = version ?? undefined;
    debug(`✅ Git is available: ${version ?? 'unknown version'}`);
  }

  // Check repository status
  debug('📁 Checking repository status...');
  const isRepo = await isGitRepository();
  if (!isRepo) {
    debug('❌ Not a git repository');
    errors.push('Current directory is not a Git repository');
    suggestions.push('Initialize a new repository with: git init');
    suggestions.push('Or clone an existing repository with: git clone <url>');
  } else {
    debug('✅ Valid git repository detected');
  }

  // Check user configuration if git is available and we're in a repo
  if (gitAvailable && isRepo) {
    debug('👤 Checking user configuration...');
    
    try {
      // Check user name
      const { stdout: userName } = await execAsync('git config user.name');
      if (!userName.trim()) {
        debug('❌ Git user name is not configured');
        errors.push('Git user name is not configured');
        suggestions.push('Set your name with: git config --global user.name "Your Name"');
      } else {
        debug(`✅ Git user name: ${userName.trim()}`);
      }
    } catch {
      debug('❌ Failed to check git user name');
      errors.push('Git user name is not configured');
      suggestions.push('Set your name with: git config --global user.name "Your Name"');
    }

    try {
      // Check user email
      const { stdout: userEmail } = await execAsync('git config user.email');
      if (!userEmail.trim()) {
        debug('❌ Git user email is not configured');
        errors.push('Git user email is not configured');
        suggestions.push('Set your email with: git config --global user.email "your.email@example.com"');
      } else {
        debug(`✅ Git user email: ${userEmail.trim()}`);
      }
    } catch {
      debug('❌ Failed to check git user email');
      errors.push('Git user email is not configured');
      suggestions.push('Set your email with: git config --global user.email "your.email@example.com"');
    }

    // Check for remote repository
    debug('🌐 Checking remote repository...');
    try {
      const { stdout: remotes } = await execAsync('git remote -v');
      if (!remotes.trim()) {
        debug('⚠️  No remote repository configured (warning)');
        errors.push('No remote repository configured');
        suggestions.push('Add a remote with: git remote add origin <repository-url>');
        suggestions.push('View existing remotes with: git remote -v');
      } else {
        debug(`✅ Remote repository configured:\n${remotes.trim()}`);
      }
    } catch {
      debug('❌ Unable to check remote repositories');
      errors.push('Unable to check remote repositories');
      suggestions.push('Check git configuration with: git remote -v');
    }
  }

  const isValid = errors.length === 0;
  if (isValid) {
    debug('✅ Git validation completed successfully');
  } else {
    debug(`❌ Git validation failed with ${errors.length} error(s)`);
    errors.forEach((error, index) => {
      debug(`   ${index + 1}. ${error}`);
    });
  }

  return {
    isValid,
    errors,
    suggestions,
    gitVersion
  };
}

/**
 * Get the current branch name
 */
export async function getCurrentBranch(): Promise<string | null> {
  try {
    const { stdout } = await execAsync('git rev-parse --abbrev-ref HEAD');
    const branch = stdout.trim();
    
    // Handle detached HEAD state
    if (branch === 'HEAD') {
      return null;
    }
    
    return branch;
  } catch {
    return null;
  }
}

/**
 * Check if the current branch has an upstream tracking branch
 */
export async function hasUpstreamBranch(): Promise<boolean> {
  try {
    await execAsync('git rev-parse --abbrev-ref --symbolic-full-name @{upstream}');
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a git remote exists and is accessible
 */
export async function checkGitRemote(remote: string = 'origin'): Promise<{ exists: boolean; accessible: boolean; error?: string }> {
  try {
    // Check if remote exists
    const { stdout: remotes } = await execAsync('git remote');
    const remotesList = remotes.trim().split('\n').filter(r => r);
    
    if (!remotesList.includes(remote)) {
      return {
        exists: false,
        accessible: false,
        error: `Remote '${remote}' does not exist`
      };
    }
    
    // Check if remote is accessible
    try {
      await execAsync(`git ls-remote --exit-code ${remote} HEAD`, { timeout: 30000 });
      return {
        exists: true,
        accessible: true
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Check for common authentication errors
      if (errorMessage.includes('Authentication failed') || 
          errorMessage.includes('Permission denied') ||
          errorMessage.includes('Could not read from remote repository')) {
        return {
          exists: true,
          accessible: false,
          error: 'Authentication failed. Please check your credentials'
        };
      }
      
      // Check for network errors
      if (errorMessage.includes('Could not resolve host') ||
          errorMessage.includes('unable to access') ||
          errorMessage.includes('Network is unreachable')) {
        return {
          exists: true,
          accessible: false,
          error: 'Network error. Please check your internet connection'
        };
      }
      
      return {
        exists: true,
        accessible: false,
        error: `Remote is not accessible: ${errorMessage}`
      };
    }
  } catch (error) {
    return {
      exists: false,
      accessible: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Push changes to a remote repository
 */
export async function pushToRemote(options: PushOptions = {}): Promise<GitPushResult> {
  try {
    const { remote = 'origin', branch, force = false, setUpstream = false } = options;
    
    // Get current branch if not specified
    const targetBranch = branch ?? await getCurrentBranch();
    if (targetBranch === null) {
      return {
        success: false,
        error: 'Cannot push from detached HEAD state. Please checkout a branch first'
      };
    }
    
    // Build push command
    let command = 'git push';
    
    if (force) {
      command += ' --force-with-lease';
    }
    
    if (setUpstream) {
      command += ' --set-upstream';
    }
    
    command += ` ${remote} ${targetBranch}`;
    
    const { stderr } = await execAsync(command);
    
    return {
      success: true,
      remote,
      branch: targetBranch,
      stderr: stderr || undefined
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    let errorStderr: string | undefined;
    
    if (error !== null && typeof error === 'object' && 'stderr' in error && typeof error.stderr === 'string') {
      errorStderr = error.stderr;
    }
    
    return {
      success: false,
      error: errorMessage,
      stderr: errorStderr
    };
  }
}

/**
 * Validate remote repository for push operations
 */
export async function validateRemoteForPush(remote: string = 'origin'): Promise<GitValidationResult> {
  const errors: string[] = [];
  const suggestions: string[] = [];
  
  // Check if in git repository
  const isRepo = await isGitRepository();
  if (!isRepo) {
    errors.push('Not in a git repository');
    suggestions.push('Initialize a repository with: git init');
    suggestions.push('Or clone an existing repository with: git clone <url>');
    return { isValid: false, errors, suggestions };
  }
  
  // Check current branch
  const currentBranch = await getCurrentBranch();
  if (currentBranch === null) {
    errors.push('Currently in detached HEAD state');
    suggestions.push('Checkout a branch with: git checkout -b <branch-name>');
    suggestions.push('Or checkout an existing branch with: git checkout <branch-name>');
    return { isValid: false, errors, suggestions };
  }
  
  // Check remote
  const remoteStatus = await checkGitRemote(remote);
  
  if (!remoteStatus.exists) {
    errors.push(`Remote '${remote}' does not exist`);
    suggestions.push(`Add a remote with: git remote add ${remote} <repository-url>`);
    suggestions.push('List existing remotes with: git remote -v');
  } else if (!remoteStatus.accessible) {
    const errorMessage = remoteStatus.error ?? 'Unknown error';
    errors.push(`Remote '${remote}' is not accessible: ${errorMessage}`);
    
    if (remoteStatus.error !== undefined && remoteStatus.error.includes('Authentication')) {
      suggestions.push('Check your git credentials are configured correctly');
      suggestions.push('For HTTPS: Update credentials in your credential manager');
      suggestions.push('For SSH: Ensure your SSH key is added to the remote repository');
    } else if (remoteStatus.error !== undefined && remoteStatus.error.includes('Network')) {
      suggestions.push('Check your internet connection');
      suggestions.push('Verify the remote URL is correct with: git remote -v');
    } else {
      suggestions.push('Verify the remote URL with: git remote -v');
      suggestions.push(`Test remote connectivity with: git ls-remote ${remote}`);
    }
  }
  
  // Check upstream tracking
  const hasUpstream = await hasUpstreamBranch();
  if (!hasUpstream && remoteStatus.exists && remoteStatus.accessible) {
    suggestions.push(`Set upstream tracking with: git push --set-upstream ${remote} ${currentBranch}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    suggestions
  };
}