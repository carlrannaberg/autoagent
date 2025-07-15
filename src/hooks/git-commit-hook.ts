import { BuiltinHookHandler, Hook, HookData, HookResult } from '../types/index.js';
import { hasChangesToCommit, stageAllChanges, createCommit } from '../utils/git.js';

export class GitCommitHook implements BuiltinHookHandler {
  async execute(data: HookData, config: Hook): Promise<HookResult> {
    const hasChanges = await hasChangesToCommit();
    if (!hasChanges) {
      return {
        blocked: false,
        output: 'No changes to commit.',
      };
    }

    await stageAllChanges();

    const message = this.interpolateMessage(config.message ?? 'feat: Auto-commit by AutoAgent', data);

    const commitResult = await createCommit({
      message,
      noVerify: config.noVerify ?? false,
    });

    if (commitResult.success) {
      return {
        blocked: false,
        output: `Commit created: ${commitResult.commitHash}`,
      };
    } else {
      return {
        blocked: false, // Commit failures should not block
        output: `Failed to create commit: ${commitResult.error}`,
      };
    }
  }

  private interpolateMessage(template: string, data: HookData): string {
    return template
      .replace(/{{issueNumber}}/g, String(data.issueNumber ?? ''))
      .replace(/{{issueTitle}}/g, String(data.issueTitle ?? ''));
  }
}