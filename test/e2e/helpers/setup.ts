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

export async function createSampleIssue(workspace: E2EWorkspace, issueName = 'test-issue', issueNumber = 1): Promise<void> {
  // Create issue with proper naming convention: {number}-{slug}.md
  const issueSlug = issueName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const filename = `${issueNumber}-${issueSlug}.md`;
  
  const issueContent = `# Issue ${issueNumber}: ${issueName}

## Requirements
This is a test issue for E2E testing.

## Acceptance Criteria
- [ ] Test task 1
- [ ] Test task 2

## Technical Details
Simple test issue`;

  await workspace.createFile(`issues/${filename}`, issueContent);
  
  // Also create/update status tracking
  const statusKey = filename.replace('.md', ''); // Use filename without .md as status key
  const statusData = {
    [statusKey]: {
      status: 'pending',
      issueNumber,
      createdAt: new Date().toISOString()
    }
  };
  
  // Try to read existing status data and merge
  try {
    const existingStatus = await workspace.readFile('.autoagent/status.json');
    const existing = JSON.parse(existingStatus);
    Object.assign(existing, statusData);
    await workspace.createFile('.autoagent/status.json', JSON.stringify(existing, null, 2));
  } catch {
    // File doesn't exist, create new
    await workspace.createFile('.autoagent/status.json', JSON.stringify(statusData, null, 2));
  }
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
  // Set mock provider for E2E tests
  cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
  await cli.execute(['init']);
}