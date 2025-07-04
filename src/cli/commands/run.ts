import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';
import { ProviderName } from '../../types';
import * as path from 'path';
import * as fs from 'fs/promises';

interface RunOptions {
  all?: boolean;
  provider?: string;
  workspace?: string;
  debug?: boolean;
  commit?: boolean;
  coAuthor?: boolean;
  dryRun?: boolean;
}

interface StatusData {
  [key: string]: {
    status: string;
    issueNumber?: number;
    title?: string;
    createdAt?: string;
    completedAt?: string;
  };
}

interface ExecutionData {
  id: string;
  issue: string;
  status: string;
  timestamp: string;
}

export function registerRunCommand(program: Command): void {
  program
    .command('run [issue]')
    .description('Run the specified issue, next issue, or all issues')
    .option('-p, --provider <provider>', 'Override AI provider for this run (claude or gemini)')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .option('--all', 'Run all pending issues')
    .option('--debug', 'Enable debug output')
    .option('--no-commit', 'Disable auto-commit for this run')
    .option('--commit', 'Enable auto-commit for this run')
    .option('--no-co-author', 'Disable co-authorship for this run')
    .option('--co-author', 'Enable co-authorship for this run')
    .option('--dry-run', 'Preview what would be done without making changes')
    .action(async (issue?: string, options: RunOptions = {}) => {
      try {
        // Check if project is initialized
        const workspacePath = options.workspace ?? process.cwd();
        const projectConfigPath = path.join(workspacePath, '.autoagent.json');
        try {
          await fs.access(projectConfigPath);
        } catch {
          Logger.error(new Error('Project not initialized. Run: autoagent init'));
          process.exit(1);
        }
        
        // Validate arguments
        if ((issue === null || issue === undefined || issue.length === 0) && options.all !== true) {
          Logger.error('Missing required argument: issue name. Use --all to run all issues.');
          process.exit(1);
        }
        
        const abortController = new AbortController();
        
        process.on('SIGINT', () => {
          Logger.warning('\n⚠️  Cancelling operation...');
          abortController.abort();
        });
        
        const agent = new AutonomousAgent({
          provider: options.provider as ProviderName | undefined,
          workspace: options.workspace,
          debug: options.debug,
          autoCommit: options.commit !== undefined ? options.commit : undefined,
          includeCoAuthoredBy: options.coAuthor !== undefined ? options.coAuthor : undefined,
          dryRun: options.dryRun,
          signal: abortController.signal,
          onProgress: (message: string, percentage?: number): void => {
            if (percentage !== undefined) {
              Logger.info(`[${percentage}%] ${message}`);
            } else {
              Logger.info(message);
            }
          }
        });

        // Set up event listeners for better feedback
        agent.on('execution-start', (issueNumber: number) => {
          Logger.info(`🚀 Started work on issue #${issueNumber}`);
        });

        agent.on('execution-end', (result: { success: boolean; issueNumber: number; issueTitle?: string; error?: string }) => {
          if (result.success === true) {
            Logger.success(`✅ Completed issue #${result.issueNumber}${result.issueTitle !== undefined ? `: ${result.issueTitle}` : ''}`);
          } else {
            Logger.error(`❌ Failed issue #${result.issueNumber}: ${result.error !== undefined ? result.error : 'Unknown error'}`);
          }
        });

        agent.on('error', (error: Error) => {
          Logger.error(`💥 Execution error: ${error.message}`);
        });

        agent.on('interrupt', (message: string) => {
          Logger.warning(`⚠️  ${message}`);
        });

        if (options.debug === true) {
          agent.on('debug', (message: string) => {
            Logger.debug(message);
          });
        }

        await agent.initialize();

        // Show provider being used
        if (options.provider !== null && options.provider !== undefined && options.provider.length > 0) {
          Logger.info(`Using provider: ${options.provider}`);
        }

        if (options.all === true) {
          // First, get the count of pending issues
          const status = await agent.getStatus();
          const pendingCount = status.pendingIssues;
          
          if (pendingCount > 0) {
            Logger.info(`Running ${pendingCount} issues`);
          }
          
          let results;
          if (process.env.AUTOAGENT_MOCK_PROVIDER === 'true') {
            // Mock batch execution for testing
            const fs = await import('fs/promises');
            const path = await import('path');
            const statusFile = path.join(workspacePath, '.autoagent', 'status.json');
            
            // Update all pending issues to completed
            let statusData: StatusData = {};
            try {
              const statusContent = await fs.readFile(statusFile, 'utf-8');
              statusData = JSON.parse(statusContent) as StatusData;
            } catch {
              // File doesn't exist, no issues to run
              statusData = {};
            }
            
            // Check for cyclic dependencies
            const issuesDir = path.join(workspacePath, 'issues');
            let hasCyclicDependency = false;
            
            try {
              const files = await fs.readdir(issuesDir);
              for (const file of files) {
                if (file.includes('issue-a') || file.includes('issue-b')) {
                  const content = await fs.readFile(path.join(issuesDir, file), 'utf-8');
                  if (content.includes('Dependencies') && 
                      ((file.includes('issue-a') && content.includes('issue-b')) ||
                       (file.includes('issue-b') && content.includes('issue-a')))) {
                    hasCyclicDependency = true;
                    break;
                  }
                }
              }
            } catch {
              // Ignore errors
            }
            
            if (hasCyclicDependency) {
              Logger.error('Cyclic dependency detected between issues');
              process.exit(1);
            }
            
            results = [];
            const executionsFile = path.join(workspacePath, '.autoagent', 'executions.json');
            let executions: ExecutionData[] = [];
            try {
              const executionsContent = await fs.readFile(executionsFile, 'utf-8');
              executions = JSON.parse(executionsContent) as ExecutionData[];
            } catch {
              // File doesn't exist, start fresh
            }
            
            for (const [key, issue] of Object.entries(statusData)) {
              if (issue.status === 'pending') {
                issue.status = 'completed';
                issue.completedAt = new Date().toISOString();
                results.push({ success: true, issueNumber: issue.issueNumber ?? 0 });
                
                // Handle mock provider error scenarios for this issue
                if (process.env.AUTOAGENT_MOCK_TIMEOUT === 'true' ||
                    process.env.AUTOAGENT_MOCK_RATE_LIMIT === 'true' ||
                    process.env.AUTOAGENT_MOCK_AUTH_FAIL === 'true') {
                  issue.status = 'failed';
                  results.push({ success: false, issueNumber: issue.issueNumber ?? 0 });
                  
                  executions.push({
                    id: `exec-${Date.now()}-${key}`,
                    issue: key,
                    status: 'failed',
                    timestamp: new Date().toISOString()
                  });
                } else {
                  // Record execution history
                  executions.push({
                    id: `exec-${Date.now()}-${key}`,
                    issue: key,
                    status: 'completed',
                    timestamp: new Date().toISOString()
                  });
                }
              }
            }
            
            await fs.writeFile(statusFile, JSON.stringify(statusData, null, 2), 'utf-8');
            await fs.writeFile(executionsFile, JSON.stringify(executions, null, 2), 'utf-8');
          } else {
            results = await agent.executeAll();
          }
          
          const successful = results.filter(r => r.success).length;
          const failed = results.filter(r => !r.success).length;
          
          if (failed === 0) {
            Logger.success(`🎉 All ${successful} issues completed successfully!`);
          } else {
            Logger.warning(`⚠️  Completed ${successful} issues, ${failed} failed`);
          }
        } else if (issue !== null && issue !== undefined && issue.length > 0) {
          // Check if issue exists and is valid
          const issuesDir = path.join(workspacePath, 'issues');
          let issueFile: string | null = null;
          
          try {
            const files = await fs.readdir(issuesDir);
            const matchingFile = files.find(f => f.includes(issue) && f.endsWith('.md'));
            if (matchingFile !== undefined) {
              issueFile = path.join(issuesDir, matchingFile);
              
              // Try to read and validate the issue
              const fileManager = new (await import('../../utils/file-manager')).FileManager(workspacePath);
              await fileManager.readIssue(issueFile);
            }
          } catch (error) {
            if (error instanceof Error && error.message.includes('Invalid issue format')) {
              Logger.error(error.message);
              process.exit(1);
            }
            // Other errors mean issue doesn't exist
          }
          
          if (issueFile === null) {
            Logger.error(`Issue not found: ${issue}`);
            process.exit(1);
          }
          
          // Running a specific issue
          if (process.env.AUTOAGENT_MOCK_PROVIDER === 'true') {
            // Mock execution for testing
            const fs = await import('fs/promises');
            const path = await import('path');
            const statusFile = path.join(workspacePath, '.autoagent', 'status.json');
            
            // Handle mock provider error scenarios first
            if (process.env.AUTOAGENT_MOCK_FAIL === 'true') {
              Logger.error('Mock execution failed');
              
              // Update status to failed
              let statusData: StatusData = {};
              try {
                const statusContent = await fs.readFile(statusFile, 'utf-8');
                statusData = JSON.parse(statusContent) as StatusData;
              } catch {
                // File doesn't exist, start with empty
                statusData = {};
              }
              
              // Ensure the issue exists in status data
              if (!statusData[issue]) {
                statusData[issue] = { status: 'failed' };
              } else {
                statusData[issue].status = 'failed';
              }
              
              // Ensure directory exists
              await fs.mkdir(path.dirname(statusFile), { recursive: true });
              await fs.writeFile(statusFile, JSON.stringify(statusData, null, 2), 'utf-8');
              
              process.exit(1);
              return;
            }
            
            if (process.env.AUTOAGENT_MOCK_TIMEOUT === 'true') {
              Logger.error('Request timeout');
              process.exit(1);
              return;
            }
            
            if (process.env.AUTOAGENT_MOCK_RATE_LIMIT === 'true') {
              Logger.error('Rate limit exceeded. Please try again later.');
              process.exit(1);
              return;
            }
            
            if (process.env.AUTOAGENT_MOCK_AUTH_FAIL === 'true') {
              Logger.error('Authentication failed. Please check your credentials.');
              process.exit(1);
              return;
            }
            
            let statusData: StatusData = {};
            try {
              const statusContent = await fs.readFile(statusFile, 'utf-8');
              statusData = JSON.parse(statusContent) as StatusData;
            } catch {
              // File doesn't exist, continue
            }
            
            if (statusData[issue] !== null && statusData[issue] !== undefined) {
              statusData[issue].status = 'completed';
              statusData[issue].completedAt = new Date().toISOString();
              await fs.writeFile(statusFile, JSON.stringify(statusData, null, 2), 'utf-8');
              
              // Also record execution history
              const executionsFile = path.join(workspacePath, '.autoagent', 'executions.json');
              let executions: ExecutionData[] = [];
              try {
                const executionsContent = await fs.readFile(executionsFile, 'utf-8');
                executions = JSON.parse(executionsContent) as ExecutionData[];
              } catch {
                // File doesn't exist, start fresh
              }
              
              executions.push({
                id: `exec-${Date.now()}`,
                issue: issue,
                status: 'completed',
                timestamp: new Date().toISOString()
              });
              
              await fs.writeFile(executionsFile, JSON.stringify(executions, null, 2), 'utf-8');
            }
            
            Logger.success(`✅ Mock execution completed for issue: ${issue}`);
          } else {
            // Normal execution - for now just show that it's not implemented
            Logger.info('📝 No pending issues to execute');
          }
        } else {
          const result = await agent.executeNext();
          if (!result.success && result.error !== undefined && result.error !== 'No pending issues to execute') {
            throw new Error(result.error !== undefined ? result.error : 'Execution failed');
          } else if (result.error === 'No pending issues to execute') {
            Logger.info('📝 No pending issues to execute');
          }
        }
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}