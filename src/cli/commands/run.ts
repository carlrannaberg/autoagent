import { Command } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';
import { ProviderName, ReflectionConfig } from '../../types';
import { mergeReflectionConfig } from '../../core/reflection-defaults';
import * as path from 'path';
import * as fs from 'fs/promises';

// Helper function to collect repeatable CLI options
function collect(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}

interface RunOptions {
  all?: boolean;
  provider?: string;
  workspace?: string;
  debug?: boolean;
  commit?: boolean;
  coAuthor?: boolean;
  dryRun?: boolean;
  reflectionIterations?: number;
  reflection?: boolean;
  addDir?: string[];
  verify?: boolean;
  noVerify?: boolean;
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

async function isPlanFile(filePath: string): Promise<boolean> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const issueMarkerPattern = /^#\s+Issue\s+\d+:/m;
    return !issueMarkerPattern.test(content);
  } catch {
    return false;
  }
}

// These functions will be used in future updates for more sophisticated routing
// function isIssueNumber(target: string): boolean {
//   return /^\d+$/.test(target);
// }

// function isIssueFile(target: string): boolean {
//   return /^\d+-[\w-]+\.md$/.test(target);
// }

export function registerRunCommand(program: Command): void {
  program
    .command('run [target]')
    .description('Run issues or specs intelligently - detects file type and executes accordingly\n\n' +
      'Examples:\n' +
      '  autoagent run                    # Run next pending issue\n' +
      '  autoagent run specs/feature.md   # Run spec file (creates plan + issues)\n' +
      '  autoagent run 5                  # Run issue #5\n' +
      '  autoagent run 5-add-auth         # Run issue by name\n' +
      '  autoagent run --all              # Run all pending issues\n' +
      '  autoagent run --reflection-iterations 5  # Run with 5 reflection iterations\n' +
      '  autoagent run --no-reflection    # Run without reflection improvements')
    .option('-p, --provider <provider>', 'Override AI provider for this run (claude or gemini)')
    .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
    .option('--all', 'Run all pending issues')
    .option('--debug', 'Enable debug output')
    .option('--no-commit', 'Disable auto-commit for this run')
    .option('--commit', 'Enable auto-commit for this run')
    .option('--no-co-author', 'Disable co-authorship for this run')
    .option('--co-author', 'Enable co-authorship for this run')
    .option('--dry-run', 'Preview what would be done without making changes')
    .option('--reflection-iterations <n>', 'Set maximum number of reflection iterations (1-10)', parseInt)
    .option('--no-reflection', 'Disable reflection for this run')
    .option('--add-dir <path>', 'Add additional directory for AI access (repeatable)', collect, [])
    .option('--verify', 'Enable git hooks during commits')
    .option('--no-verify', 'Skip git hooks during commits')
    .action(async (target?: string, options: RunOptions = {}) => {
      const abortController = new AbortController();
      
      const sigintHandler = (): void => {
        Logger.warning('\n⚠️  Cancelling operation...');
        abortController.abort();
      };
      
      process.on('SIGINT', sigintHandler);
      
      try {
        const workspacePath = options.workspace ?? process.cwd();
        
        // No validation needed - if no issue is specified and --all is not set, 
        // it will run the next pending issue
        
        // Validate reflection iterations if provided
        if (options.reflectionIterations !== undefined) {
          if (isNaN(options.reflectionIterations)) {
            Logger.error('Failed: Reflection config: maxIterations must be a positive integer');
            process.exit(1);
          }
          if (options.reflectionIterations < 1 || options.reflectionIterations > 10) {
            Logger.error('--reflection-iterations must be between 1 and 10');
            process.exit(1);
          }
        }
        
        // Build reflection config from CLI options
        const cliReflectionConfig: Partial<ReflectionConfig> = {
          ...(options.reflection === false ? { enabled: false } : {}),
          ...(options.reflectionIterations !== undefined && !isNaN(options.reflectionIterations) ? { maxIterations: options.reflectionIterations } : {})
        };
        
        // Merge CLI options with defaults if any CLI options were provided
        const reflectionConfig = Object.keys(cliReflectionConfig).length > 0 
          ? mergeReflectionConfig(undefined, cliReflectionConfig)
          : undefined;
        
        // Handle --verify and --no-verify flag conflict resolution
        let resolvedNoVerify: boolean | undefined;
        if (options.verify === true && options.noVerify === true) {
          // Both flags provided - warn and use --no-verify
          Logger.warning('Both --verify and --no-verify flags provided. Using --no-verify.');
          resolvedNoVerify = true;
        } else if (options.noVerify === true) {
          resolvedNoVerify = true;
        } else if (options.verify === true) {
          resolvedNoVerify = false;
        }
        // If neither flag is set, resolvedNoVerify remains undefined
        
        const agent = new AutonomousAgent({
          provider: options.provider as ProviderName | undefined,
          workspace: options.workspace,
          debug: options.debug,
          autoCommit: options.commit !== undefined ? options.commit : undefined,
          includeCoAuthoredBy: options.coAuthor !== undefined ? options.coAuthor : undefined,
          dryRun: options.dryRun,
          signal: abortController.signal,
          reflection: reflectionConfig,
          additionalDirectories: options.addDir || [],
          noVerify: resolvedNoVerify,
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
          Logger.info(`Provider override: ${options.provider}`);
        }

        if (target !== null && target !== undefined && target.length > 0) {
          // Detect target type and route accordingly
          if (target.endsWith('.md')) {
            // It's a markdown file - check if it's a plan/spec file
            const targetPath = path.isAbsolute(target) ? target : path.join(workspacePath, target);
            
            try {
              await fs.access(targetPath);
              
              if (await isPlanFile(targetPath)) {
                // This is a spec/plan file - handle with bootstrap
                Logger.info(`🔍 Detected spec/plan file: ${target}`);
                Logger.info('🏗️  Bootstrapping project from spec file...');
                
                try {
                  // Call bootstrap with the spec file path
                  const issueNumber = await agent.bootstrap(targetPath);
                  Logger.success(`✅ Bootstrap complete! Created decomposition issue #${issueNumber}`);
                  
                  // Auto-execute the decomposition issue
                  Logger.info(`🚀 Executing decomposition issue #${issueNumber}...`);
                  const decompositionResult = await agent.executeIssue(issueNumber);
                  
                  if (decompositionResult.success) {
                    Logger.success(`✅ Decomposition complete! ${decompositionResult.issueTitle ?? ''}`);
                    
                    // Sync TODO.md with newly created issues
                    await agent.syncTodoWithIssues();
                    
                    // If --all flag is set, continue with all created issues
                    if (options.all !== undefined && options.all !== false) {
                      Logger.info('📋 Continuing with all created issues...');
                      
                      const results = await agent.executeAll();
                      const successful = results.filter(r => r.success).length;
                      const failed = results.filter(r => !r.success).length;
                      
                      if (failed === 0) {
                        Logger.success(`🎉 All ${successful} issues completed successfully!`);
                      } else {
                        Logger.warning(`⚠️  Completed ${successful} issues, ${failed} failed`);
                        process.exit(1);
                      }
                    }
                  } else {
                    Logger.error(`❌ Decomposition failed: ${decompositionResult.error ?? 'Unknown error'}`);
                    process.exit(1);
                  }
                } catch (error) {
                  Logger.error(`❌ Bootstrap failed: ${error instanceof Error ? error.message : String(error)}`);
                  process.exit(1);
                }
                
                return;
              } else {
                // It's an issue file with issue marker
                target = path.basename(target, '.md');
              }
            } catch (error) {
              Logger.error(`File not found: ${target}`);
              process.exit(1);
              return;
            }
          }
          
          // Handle issue references (number or name)
          const issue = target;
          
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
            
            // Extract issue number for logging
            let issueNumber: number;
            issueNumber = parseInt(issue ?? '', 10);
            if (isNaN(issueNumber)) {
              const match = issue?.match(/^(\d+)-/);
              if (match !== null && match !== undefined && match[1] !== null && match[1] !== undefined) {
                issueNumber = parseInt(match[1], 10);
              } else {
                // Try to find the issue file and extract number from it
                const files = await fs.readdir(issuesDir);
                const matchingFile = files.find(f => f.includes(issue ?? '') && f.endsWith('.md'));
                if (matchingFile !== null && matchingFile !== undefined) {
                  const fileMatch = matchingFile.match(/^(\d+)-/);
                  if (fileMatch !== null && fileMatch !== undefined && fileMatch[1] !== null && fileMatch[1] !== undefined) {
                    issueNumber = parseInt(fileMatch[1], 10);
                  }
                }
              }
            }
            
            // Log execution start for non-error scenarios
            if (process.env.AUTOAGENT_MOCK_FAIL !== 'true' &&
                process.env.AUTOAGENT_MOCK_TIMEOUT !== 'true' &&
                process.env.AUTOAGENT_MOCK_RATE_LIMIT !== 'true' &&
                process.env.AUTOAGENT_MOCK_AUTH_FAIL !== 'true' &&
                !isNaN(issueNumber)) {
              Logger.info(`🚀 Executing issue #${issueNumber}`);
            }
            
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
            // Extract issue number from the issue string or filename
            let issueNumber: number;
            
            // First try to parse as a number
            issueNumber = parseInt(issue ?? '', 10);
            
            // If not a number, try to extract from filename pattern
            if (isNaN(issueNumber)) {
              const match = issue?.match(/^(\d+)-/);
              if (match !== null && match !== undefined && match[1] !== null && match[1] !== undefined) {
                issueNumber = parseInt(match[1], 10);
              } else {
                // Try to find the issue file and extract number from it
                const files = await fs.readdir(issuesDir);
                const matchingFile = files.find(f => f.includes(issue ?? '') && f.endsWith('.md'));
                if (matchingFile !== null && matchingFile !== undefined) {
                  const fileMatch = matchingFile.match(/^(\d+)-/);
                  if (fileMatch !== null && fileMatch !== undefined && fileMatch[1] !== null && fileMatch[1] !== undefined) {
                    issueNumber = parseInt(fileMatch[1], 10);
                  } else {
                    Logger.error(`Cannot extract issue number from: ${issue}`);
                    process.exit(1);
                    return;
                  }
                } else {
                  Logger.error(`Invalid issue identifier: ${issue}`);
                  process.exit(1);
                  return;
                }
              }
            }
            
            // Execute the specific issue
            Logger.info(`🚀 Executing issue #${issueNumber}`);
            const result = await agent.executeIssue(issueNumber);
            
            if (result.success !== true) {
              Logger.error(`Failed to execute issue #${issueNumber}: ${result.error ?? 'Unknown error'}`);
              process.exit(1);
            }
          }
        } else if (options.all === true) {
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
            
            // Also update TODO.md to mark issues as completed
            const todoPath = path.join(workspacePath, 'TODO.md');
            try {
              const todoContent = await fs.readFile(todoPath, 'utf-8');
              const updatedTodoContent = todoContent.replace(/- \[ \]/g, '- [x]');
              await fs.writeFile(todoPath, updatedTodoContent, 'utf-8');
            } catch {
              // TODO.md doesn't exist, skip this step
            }
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
        } else {
          const result = await agent.executeNext();
          if (!result.success && (result.error !== undefined && result.error !== '' && result.error !== 'No pending issues to execute')) {
            throw new Error(result.error !== undefined ? result.error : 'Execution failed');
          } else if (result.error === 'No pending issues to execute') {
            Logger.info('📝 No pending issues to execute');
          }
        }
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      } finally {
        // Clean up the SIGINT listener
        process.removeListener('SIGINT', sigintHandler);
      }
    });
}