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
    await cli.setupIsolatedEnvironment();
  });

  afterEach(async (): Promise<void> => {
    await cli.cleanup();
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

export async function initializeProject(workspace: E2EWorkspace, _cli: CliExecutor): Promise<void> {
  await workspace.initGit();
  // Create AGENT.md that would have been created by init
  await workspace.createFile('AGENT.md', '# Agent Instructions\n\nAdd your agent-specific instructions here.\n');
  // Note: issues/ and plans/ directories will be created on-demand by the commands
}

export async function createSampleIssue(workspace: E2EWorkspace, name: string, issueNumber?: number): Promise<void> {
  const number = issueNumber ?? 1;
  const issueContent = `# Issue #${number}: ${name}

## Description
This is a sample issue for testing purposes.

## Requirements
Sample requirements for ${name}.

## Acceptance Criteria
- [ ] Task 1
- [ ] Task 2
`;
  
  // Create issue with proper naming format: N-slug.md
  const slug = generateFileSlug(name);
  const fileName = `${number}-${slug}`;
  await workspace.createIssue(fileName, issueContent);
  
  // Create or update TODO.md to include this issue
  await createOrUpdateTodoMd(workspace, number, name);
}

function generateFileSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '')
    .replace(/\.+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function createOrUpdateTodoMd(workspace: E2EWorkspace, issueNumber: number, issueTitle: string): Promise<void> {
  const slug = generateFileSlug(issueTitle);
  const issueFilename = `${issueNumber}-${slug}.md`;
  const issueEntry = `- [ ] **#${issueNumber}** ${issueTitle} - \`issues/${issueFilename}\``;
  
  try {
    // Try to read existing TODO.md
    const existingContent = await workspace.readFile('TODO.md');
    
    if (existingContent.trim()) {
      // TODO exists, append to pending issues section
      let updatedContent = existingContent;
      
      // Check if Pending Issues section exists
      if (updatedContent.includes('## Pending Issues')) {
        // Find the position after "## Pending Issues" and any existing issues
        const pendingIndex = updatedContent.indexOf('## Pending Issues');
        const nextSectionIndex = updatedContent.indexOf('\n## ', pendingIndex + 1);
        
        if (nextSectionIndex !== -1) {
          // Find the blank line before the next section
          const beforeNextSection = updatedContent.lastIndexOf('\n\n', nextSectionIndex);
          const insertPosition = beforeNextSection !== -1 && beforeNextSection > pendingIndex 
            ? beforeNextSection + 1  // Insert after the last newline, keeping one blank line
            : nextSectionIndex;      // Fallback to before next section
          
          updatedContent = updatedContent.slice(0, insertPosition) + 
                         `${issueEntry}\n` + 
                         updatedContent.slice(insertPosition);
        } else {
          // No next section, append at end
          updatedContent = updatedContent.trimEnd() + `\n${issueEntry}\n`;
        }
      } else {
        // No Pending Issues section, add it before Completed Issues
        if (updatedContent.includes('## Completed Issues')) {
          updatedContent = updatedContent.replace(
            '## Completed Issues',
            `## Pending Issues\n${issueEntry}\n\n## Completed Issues`
          );
        } else {
          // No sections, append at end
          updatedContent += `\n\n## Pending Issues\n${issueEntry}\n\n## Completed Issues\n`;
        }
      }
      
      await workspace.createFile('TODO.md', updatedContent);
    } else {
      // TODO doesn't exist or is empty, create new structure
      const todoContent = `# TODO

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
${issueEntry}

## Completed Issues
`;
      
      await workspace.createFile('TODO.md', todoContent);
    }
  } catch (error) {
    // If TODO doesn't exist, create new one
    const todoContent = `# TODO

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
${issueEntry}

## Completed Issues
`;
    
    await workspace.createFile('TODO.md', todoContent);
  }
}