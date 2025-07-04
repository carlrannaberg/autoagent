import { beforeEach, afterEach } from 'vitest';
import { E2EWorkspace } from '../../helpers/setup/e2e-workspace';
import { CliExecutor } from '../../helpers/setup/cli-executor';

export interface E2EContext {
  workspace: E2EWorkspace;
  cli: CliExecutor;
}

export function setupE2ETest(): E2EContext {
  const workspace = new E2EWorkspace();
  let cli: CliExecutor;

  beforeEach(async (): Promise<void> => {
    const workspacePath = await workspace.create();
    cli = new CliExecutor(workspacePath);
  });

  afterEach(async (): Promise<void> => {
    await workspace.cleanup();
  });

  return {
    get workspace(): E2EWorkspace {
      return workspace;
    },
    get cli(): CliExecutor {
      return cli;
    }
  };
}

export async function initializeProject(workspace: E2EWorkspace, cli: CliExecutor): Promise<void> {
  await workspace.initGit();
  const result = await cli.execute(['init']);
  if (result.exitCode !== 0) {
    throw new Error(`Failed to initialize project: ${result.stderr}`);
  }
}

export async function createSampleIssue(workspace: E2EWorkspace, name: string, issueNumber?: number): Promise<void> {
  const number = issueNumber ?? 1;
  const issueContent = `# Issue ${number}: ${name}

## Description
This is a sample issue for testing purposes.

## Acceptance Criteria
- [ ] Task 1
- [ ] Task 2

## Technical Details
Sample technical details for ${name}.
`;
  
  // Create issue with proper naming format: {number}-{name}.md
  const fileName = `${number}-${name}`;
  await workspace.createIssue(fileName, issueContent);
}