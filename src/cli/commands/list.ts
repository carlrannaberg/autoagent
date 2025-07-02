import { Command } from 'commander';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Logger } from '../../utils/logger';
import { getAvailableProviders } from '../../providers';

interface IssueStatus {
  status: 'pending' | 'in_progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
}

interface Execution {
  id: string;
  issue: string;
  status: string;
  timestamp: string;
}

export function registerListCommand(program: Command): void {
  program
    .command('list <type>')
    .description('List issues, providers, or executions')
    .option('-s, --status <status>', 'Filter by status (for issues)')
    .option('--json', 'Output in JSON format')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .action(async (type: string, options: { status?: string; json?: boolean; workspace?: string }) => {
      try {
        const workspace = options.workspace ?? process.cwd();

        switch (type) {
          case 'issues':
            await listIssues(workspace, options);
            break;
          case 'providers':
            await listProviders(options.json);
            break;
          case 'executions':
            await listExecutions(workspace, options.json);
            break;
          default:
            Logger.error(`Unknown list type: ${type}. Use 'issues', 'providers', or 'executions'.`);
            process.exit(1);
        }
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}

async function listIssues(workspace: string, options: { status?: string; json?: boolean }): Promise<void> {
  // Validate status parameter first
  if (options.status !== undefined && options.status !== null) {
    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (!validStatuses.includes(options.status)) {
      Logger.error(`Invalid status: ${options.status}. Valid statuses are: ${validStatuses.join(', ')}`);
      process.exit(1);
    }
  }

  // Check if project is initialized
  const projectConfigPath = path.join(workspace, '.autoagent.json');
  try {
    await fs.access(projectConfigPath);
  } catch {
    Logger.error('Project not initialized. Run "autoagent init" first.');
    process.exit(1);
  }

  const issuesDir = path.join(workspace, 'issues');
  const statusFile = path.join(workspace, '.autoagent', 'status.json');

  // Load status data if it exists
  let statusData: Record<string, IssueStatus> = {};
  try {
    const statusContent = await fs.readFile(statusFile, 'utf-8');
    statusData = JSON.parse(statusContent) as Record<string, IssueStatus>;
  } catch {
    // Status file might not exist, which is fine
  }

  // Read all issue files
  let issueFiles: string[] = [];
  try {
    const files = await fs.readdir(issuesDir);
    issueFiles = files.filter(f => f.endsWith('.md'));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // Directory doesn't exist, but we might still have issues in status.json
      issueFiles = [];
    } else {
      throw error;
    }
  }

  // Parse issues from files
  const issuesFromFiles = await Promise.all(issueFiles.map(async file => {
    const name = file.replace('.md', '');
    const status = statusData[name]?.status ?? 'pending';
    
    // Try to read the issue to validate format
    try {
      const fileManager = new (await import('../../utils/file-manager')).FileManager(workspace);
      const issueFile = path.join(issuesDir, file);
      await fileManager.readIssue(issueFile);
      return { name, status, file, valid: true };
    } catch (error) {
      // Invalid format
      return { name, status: 'Invalid format', file, valid: false };
    }
  }));

  // Also include issues that only exist in status.json
  const issuesFromStatus = Object.entries(statusData)
    .filter(([name]) => !issuesFromFiles.some(issue => issue.name === name))
    .map(([name, data]) => ({
      name,
      status: data.status,
      file: null
    }));

  const issues = [...issuesFromFiles, ...issuesFromStatus];

  if (issues.length === 0) {
    if (options.json === true) {
      Logger.info('[]');
    } else {
      Logger.info('No issues found');
    }
    return;
  }

  // Filter by status if requested
  let filteredIssues = issues;
  if (options.status !== undefined && options.status !== null) {
    filteredIssues = issues.filter(issue => issue.status === options.status);
  }

  // Output results
  if (options.json === true) {
    const jsonOutput = filteredIssues.map(issue => ({
      name: issue.name,
      status: issue.status
    }));
    Logger.info(JSON.stringify(jsonOutput, null, 2));
  } else {
    if (filteredIssues.length === 0) {
      Logger.info(`No issues found with status: ${options.status}`);
    } else {
      Logger.info(`Found ${filteredIssues.length} issue(s):\n`);
      filteredIssues.forEach(issue => {
        const statusIcon = issue.status === 'completed' ? '✅' : 
                          issue.status === 'in_progress' ? '🔄' : '⏳';
        Logger.info(`  ${statusIcon} ${issue.name} (${issue.status})`);
      });
    }
  }
}

async function listProviders(json?: boolean): Promise<void> {
  const availableProviders = await getAvailableProviders();
  const allProviders = ['claude', 'gemini'];

  if (json === true) {
    const providersInfo = allProviders.map(name => ({
      name,
      available: availableProviders.includes(name)
    }));
    Logger.info(JSON.stringify(providersInfo, null, 2));
  } else {
    Logger.info('AI Providers:\n');
    allProviders.forEach(name => {
      const available = availableProviders.includes(name);
      const status = available ? '✅ Available' : '❌ Not installed';
      Logger.info(`  ${name}: ${status}`);
    });
  }
}

async function listExecutions(workspace: string, json?: boolean): Promise<void> {
  const executionsFile = path.join(workspace, '.autoagent', 'executions.json');

  try {
    const content = await fs.readFile(executionsFile, 'utf-8');
    const executions: Execution[] = JSON.parse(content) as Execution[];

    if (json === true) {
      Logger.info(JSON.stringify(executions, null, 2));
    } else {
      if (executions.length === 0) {
        Logger.info('No executions found');
      } else {
        Logger.info(`Found ${executions.length} execution(s):\n`);
        executions.forEach(exec => {
          const statusIcon = exec.status === 'completed' ? '✅' : 
                            exec.status === 'failed' ? '❌' : '🔄';
          Logger.info(`  ${statusIcon} ${exec.id} - ${exec.issue} (${exec.status})`);
          Logger.info(`     ${new Date(exec.timestamp).toLocaleString()}`);
        });
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      if (json === true) {
        Logger.info('[]');
      } else {
        Logger.info('No executions found');
      }
    } else {
      throw error;
    }
  }
}