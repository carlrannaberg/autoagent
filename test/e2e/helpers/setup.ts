import { E2EWorkspace } from './e2e-workspace';
import { CliExecutor } from './cli-executor';
import { beforeEach, afterEach } from 'vitest';

export interface E2ETestContext {
  workspace: E2EWorkspace;
  cli: CliExecutor;
}

export function setupE2ETest(): E2ETestContext {
  const context: E2ETestContext = {
    workspace: new E2EWorkspace(),
    cli: null as any,
  };

  beforeEach(async () => {
    const workspacePath = await context.workspace.create();
    context.cli = new CliExecutor(workspacePath);
  });

  afterEach(async () => {
    await context.workspace.cleanup();
  });

  return context;
}

export async function createSampleIssue(workspace: E2EWorkspace, issueName = 'test-issue'): Promise<void> {
  const issueContent = `# Issue: Test Issue

## Requirement
This is a test issue for E2E testing.

## Acceptance Criteria
- [ ] Test task 1
- [ ] Test task 2

## Technical Details
- Simple test issue`;

  await workspace.createIssue(issueName, issueContent);
}

export async function createSamplePlan(workspace: E2EWorkspace, issueName = 'test-issue'): Promise<void> {
  const planContent = `# Plan for Test Issue

## Implementation Plan

### Phase 1: Setup
- [ ] Create test file
- [ ] Add basic implementation

### Phase 2: Testing
- [ ] Add tests
- [ ] Verify functionality`;

  await workspace.createPlan(issueName, planContent);
}

export async function initializeProject(workspace: E2EWorkspace, cli: CliExecutor): Promise<void> {
  await workspace.initGit();
  await cli.execute(['config', 'init']);
}