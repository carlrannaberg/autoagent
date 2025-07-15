import { BuiltinHookHandler, Hook, HookData, HookResult } from '../types/index.js';
import { getCurrentBranch, pushToRemote, validateRemoteForPush } from '../utils/git.js';

export class GitPushHook implements BuiltinHookHandler {
  async execute(_data: HookData, config: Hook): Promise<HookResult> {
    // Get current branch
    const currentBranch = await getCurrentBranch();
    if (!currentBranch) {
      return {
        blocked: false,
        output: 'Cannot push: Currently in detached HEAD state. Please checkout a branch first.',
      };
    }

    // Get remote from config or use default
    const remote = config.remote ?? 'origin';

    // Validate remote before attempting push
    const validation = await validateRemoteForPush(remote);
    if (!validation.isValid) {
      const errorMessage = validation.errors.join('. ');
      const suggestionsMessage = validation.suggestions.length > 0 
        ? '\n\nSuggestions:\n' + validation.suggestions.map(s => `  - ${s}`).join('\n')
        : '';
      
      return {
        blocked: false,
        output: `Failed to push: ${errorMessage}${suggestionsMessage}`,
      };
    }

    // Attempt to push
    const pushResult = await pushToRemote({
      remote,
      branch: currentBranch,
      setUpstream: true  // Automatically set upstream if needed
    });

    if (pushResult.success) {
      return {
        blocked: false,
        output: `Successfully pushed to ${pushResult.remote}/${pushResult.branch}`,
      };
    } else {
      // Handle push failure with clear messaging
      let errorMessage = `Failed to push to ${remote}/${currentBranch}`;
      
      if (pushResult.error) {
        // Check for common error scenarios
        if (pushResult.error.includes('Authentication failed') || 
            pushResult.error.includes('Permission denied') ||
            pushResult.error.includes('Could not read from remote repository')) {
          errorMessage += ': Authentication failed. Please check your git credentials.';
        } else if (pushResult.error.includes('rejected') || 
                   pushResult.error.includes('non-fast-forward')) {
          errorMessage += ': Push rejected. The remote contains work that you do not have locally.';
          errorMessage += '\n\nTo resolve:\n';
          errorMessage += `  1. Pull the latest changes: git pull ${remote} ${currentBranch}\n`;
          errorMessage += '  2. Resolve any conflicts\n';
          errorMessage += '  3. Try pushing again';
        } else if (pushResult.error.includes('Could not resolve host') ||
                   pushResult.error.includes('unable to access') ||
                   pushResult.error.includes('Network is unreachable')) {
          errorMessage += ': Network error. Please check your internet connection.';
        } else {
          errorMessage += `: ${pushResult.error}`;
        }
      }

      // Include stderr if available for additional context
      if (pushResult.stderr) {
        errorMessage += `\n\nGit output:\n${pushResult.stderr}`;
      }

      return {
        blocked: false,
        output: errorMessage,
      };
    }
  }
}
