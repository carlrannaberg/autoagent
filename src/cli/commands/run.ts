import { Command } from 'commander';
import type { ParseOptionsResult } from 'commander';
import { AutonomousAgent } from '../../core/autonomous-agent';
import { Logger } from '../../utils/logger';
import { ProviderName, ReflectionConfig } from '../../types';
import { mergeReflectionConfig } from '../../core/reflection-defaults';
import * as path from 'path';
import * as fs from 'fs/promises';
import { validateProjectFiles } from '../../core/validators/index.js';
import { AutofixService } from '../../core/validators/autofix-service.js';

// Helper function to collect repeatable CLI options
function collect(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}

interface RunOptions {
  all?: boolean;
  provider?: string;
  workspace?: string;
  debug?: boolean;
  coAuthor?: boolean;
  dryRun?: boolean;
  reflectionIterations?: number;
  reflection?: boolean;
  addDir?: string[];
  verify?: boolean;
  noVerify?: boolean;
  validate?: boolean;
  noValidate?: boolean;
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
    const issueMarkerPattern = /^#\s+Issue\s+#?\d+:/m;
    return !issueMarkerPattern.test(content);
  } catch {
    return false;
  }
}

function isIssueNumber(target: string): boolean {
  return /^\d+$/.test(target);
}

function isIssueRange(target: string): boolean {
  return /^\d+-\d+$/.test(target);
}

function parseIssueRange(target: string): number[] {
  const match = target.match(/^(\d+)-(\d+)$/);
  if (!match || match[1] === undefined || match[2] === undefined) {
    throw new Error(`Invalid range format: ${target}`);
  }
  
  const start = parseInt(match[1], 10);
  const end = parseInt(match[2], 10);
  
  if (start > end) {
    throw new Error(`Invalid range: start (${start}) cannot be greater than end (${end})`);
  }
  
  const issues: number[] = [];
  for (let i = start; i <= end; i++) {
    issues.push(i);
  }
  
  return issues;
}

function isIssueFile(target: string): boolean {
  return /^\d+-.*\.md$/.test(target);
}

export function registerRunCommand(program: Command): void {
  const runCommand = program
    .command('run [target]')
    .description('Run issues or specs intelligently - detects file type and executes accordingly\n\n' +
      'Examples:\n' +
      '  autoagent run                    # Run next pending issue\n' +
      '  autoagent run specs/feature.md   # Run spec file (creates plan + issues)\n' +
      '  autoagent run 5                  # Run issue #5\n' +
      '  autoagent run 5-8                # Run issues #5 through #8\n' +
      '  autoagent run 5-add-auth         # Run issue by name\n' +
      '  autoagent run --all              # Run all pending issues\n' +
      '  autoagent run --reflection-iterations 5  # Run with 5 reflection iterations\n' +
      '  autoagent run --no-reflection    # Run without reflection improvements')
    .option('-p, --provider <provider>', 'Override AI provider for this run (claude or gemini)')
    .option('-w, --workspace <path>', 'Workspace directory')
    .option('--all', 'Run all pending issues')
    .option('--debug', 'Enable debug output')
    .option('--no-co-author', 'Disable co-authorship for this run')
    .option('--co-author', 'Enable co-authorship for this run')
    .option('--dry-run', 'Preview what would be done without making changes')
    .option('--reflection-iterations <n>', 'Set maximum number of reflection iterations (1-10)', parseInt)
    .option('--no-reflection', 'Disable reflection for this run')
    .option('--add-dir <path>', 'Add additional directory for AI access (repeatable)', collect, [])
    .option('--verify', 'Enable git hooks during commits')
    .option('--no-verify', 'Skip git hooks during commits')
    .option('--validate', 'Enable file validation before execution (default)')
    .option('--no-validate', 'Skip file validation before execution');

  // Track which conflicting flags were provided
  let verifyFlagProvided = false;
  let noVerifyFlagProvided = false;

  // Override option parsing to track which flags were actually provided
  const originalParseOptions = runCommand.parseOptions.bind(runCommand);
  runCommand.parseOptions = function(argv: string[]): ParseOptionsResult {
    // Check which flags are present in the argv
    verifyFlagProvided = argv.includes('--verify');
    noVerifyFlagProvided = argv.includes('--no-verify');
    
    return originalParseOptions(argv);
  };

  runCommand.action(async (target?: string, options: RunOptions = {}) => {
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
        
        if (verifyFlagProvided && noVerifyFlagProvided) {
          // Both flags provided - warn and use --no-verify
          Logger.warning('Both --verify and --no-verify flags provided. Using --no-verify.');
          resolvedNoVerify = true;
        } else if (options.noVerify !== undefined) {
          resolvedNoVerify = options.noVerify;
        } else if (options.verify !== undefined) {
          resolvedNoVerify = !options.verify;
        }
        // If neither flag is set, resolvedNoVerify remains undefined
        
        
        const agent = new AutonomousAgent({
          provider: options.provider as ProviderName | undefined,
          workspace: options.workspace,
          debug: options.debug,
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

        // Validate project files before execution (unless --no-validate is set)
        if (options.validate !== false) {
          Logger.info('🔍 Validating project files...');
          const validationResult = await validateProjectFiles(workspacePath);
          
          if (!validationResult.valid) {
          Logger.error('❌ Validation failed. Found the following issues:\n');
          Logger.error(validationResult.error?.formatIssues() ?? 'Unknown validation error');
          
          // Check if there are formatting issues that can be autofixed
          const formattingIssues = validationResult.issues.filter(
            issue => issue.isFormatting === true && issue.canAutofix === true
          );
          
          if (formattingIssues.length > 0) {
            Logger.info('\n🔧 Attempting to auto-fix formatting issues...');
            
            const autofixService = new AutofixService(
              (options.provider as 'claude' | 'gemini') ?? 'claude',
              undefined
            );
            
            const fixResult = await autofixService.fixValidationIssues(validationResult.issues);
            
            if (fixResult.success) {
              Logger.success(`✅ Fixed ${fixResult.fixedIssues.length} formatting issues`);
              
              // Re-validate after fixes
              const revalidationResult = await validateProjectFiles(workspacePath);
              
              if (!revalidationResult.valid) {
                Logger.error('❌ Validation still failed after auto-fix:\n');
                Logger.error(revalidationResult.error?.formatIssues() ?? 'Unknown validation error');
                Logger.info('\n💡 Please fix the remaining issues manually before running.');
                process.exit(1);
                return;
              } else {
                Logger.success('✅ All validation issues resolved!');
              }
            } else {
              Logger.error(`❌ Failed to fix ${fixResult.failedIssues.length} issues`);
              Logger.info('\n💡 Please fix these issues manually before running.');
              process.exit(1);
              return;
            }
          } else {
            Logger.info('\n💡 Please fix these issues manually before running.');
            Logger.info('💡 Add --no-validate flag to skip validation (not recommended).');
            process.exit(1);
            return;
          }
        } else {
          Logger.success('✅ All files are valid');
        }
        }

        // Show provider being used
        if (options.provider !== null && options.provider !== undefined && options.provider.length > 0) {
          Logger.info(`Provider override: ${options.provider}`);
        }

        if (target !== null && target !== undefined && target.length > 0) {
          // Detect target type and route accordingly
          if (isIssueRange(target)) {
            // Handle issue range (e.g., "5-8")
            Logger.info(`🔢 Detected issue range: ${target}`);
            
            let issueNumbers: number[];
            try {
              issueNumbers = parseIssueRange(target);
            } catch (error) {
              Logger.error(error instanceof Error ? error.message : String(error));
              process.exit(1);
              return;
            }
            
            Logger.info(`🚀 Executing issues #${issueNumbers[0]}-${issueNumbers[issueNumbers.length - 1]} (${issueNumbers.length} issues)`);
            
            // Validate that all issues exist
            const issuesDir = path.join(workspacePath, 'issues');
            const missingIssues: number[] = [];
            
            for (const issueNum of issueNumbers) {
              try {
                const files = await fs.readdir(issuesDir);
                const matchingFile = files.find(f => f.match(new RegExp(`^${issueNum}-.*\\.md$`)));
                if (matchingFile === undefined) {
                  missingIssues.push(issueNum);
                }
              } catch (error) {
                Logger.error(`Failed to check issues directory: ${error instanceof Error ? error.message : String(error)}`);
                process.exit(1);
                return;
              }
            }
            
            if (missingIssues.length > 0) {
              Logger.error(`Issues not found: ${missingIssues.map(n => `#${n}`).join(', ')}`);
              process.exit(1);
              return;
            }
            
            // Execute issues in order
            const results = [];
            for (const issueNum of issueNumbers) {
              try {
                Logger.info(`🔄 Executing issue #${issueNum}...`);
                const result = await agent.executeIssue(issueNum);
                results.push(result);
                
                if (result.success) {
                  Logger.success(`✅ Completed issue #${issueNum}${result.issueTitle !== undefined && result.issueTitle !== '' ? `: ${result.issueTitle}` : ''}`);
                } else {
                  Logger.error(`❌ Failed issue #${issueNum}: ${result.error !== undefined && result.error !== '' ? result.error : 'Unknown error'}`);
                }
              } catch (error) {
                Logger.error(`❌ Failed to execute issue #${issueNum}: ${error instanceof Error ? error.message : String(error)}`);
                results.push({ success: false, issueNumber: issueNum, error: error instanceof Error ? error.message : String(error) });
              }
            }
            
            // Summary
            const successful = results.filter(r => r.success).length;
            const failed = results.filter(r => !r.success).length;
            
            if (failed === 0) {
              Logger.success(`🎉 All ${successful} issues completed successfully!`);
            } else {
              Logger.warning(`⚠️  Completed ${successful} issues, ${failed} failed`);
              process.exit(1);
            }
            
            return;
          } else if (target.endsWith('.md')) {
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
                // It's an issue file with issue marker - extract filename without .md
                target = path.basename(target, '.md');
              }
            } catch (error) {
              Logger.error(`File not found: ${target}`);
              process.exit(1);
              return;
            }
          } else if (isIssueNumber(target)) {
            // Single issue number - proceed as before
          } else if (isIssueFile(target)) {
            // Remove .md extension if present
            target = target.replace(/\.md$/, '');
          }
          
          // Handle issue references (number or name)
          const issue = target;
          
          // Check if issue exists and is valid
          const issuesDir = path.join(workspacePath, 'issues');
          let issueFile: string | null = null;
          
          try {
            const files = await fs.readdir(issuesDir);
            let matchingFile: string | undefined;
            
            // First try to find by issue number (e.g., "1" -> "1-title.md")
            if (isIssueNumber(issue)) {
              matchingFile = files.find(f => f.match(new RegExp(`^${issue}-.*\\.md$`)));
            } else {
              // Try to find by slug in status.json
              const statusFile = path.join(workspacePath, '.autoagent', 'status.json');
              try {
                const statusContent = await fs.readFile(statusFile, 'utf-8');
                const statusData = JSON.parse(statusContent) as StatusData;
                const issueData = statusData[issue];
                if (issueData?.issueNumber !== undefined && issueData.issueNumber !== null) {
                  matchingFile = files.find(f => f.match(new RegExp(`^${issueData.issueNumber}-.*\\.md$`)));
                }
              } catch {
                // Status file doesn't exist, fallback to filename search
                matchingFile = files.find(f => f.includes(issue) && f.endsWith('.md'));
              }
            }
            
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
            const statusFile = path.join(workspacePath, '.autoagent', 'status.json');
            
            // Ensure .autoagent directory exists
            await fs.mkdir(path.dirname(statusFile), { recursive: true });
            
            // Extract issue number for logging
            let issueNumber: number;
            issueNumber = parseInt(issue ?? '', 10);
            if (isNaN(issueNumber)) {
              // Try to find by slug in status.json
              try {
                const statusContent = await fs.readFile(statusFile, 'utf-8');
                const statusData = JSON.parse(statusContent) as StatusData;
                const issueData = statusData[issue ?? ''];
                if (issueData?.issueNumber !== undefined && issueData.issueNumber !== null) {
                  issueNumber = issueData.issueNumber;
                }
              } catch {
                // Status file doesn't exist, continue to filename matching
              }
              
              // If still not found, try to extract from filename pattern
              if (isNaN(issueNumber)) {
                const match = issue?.match(/^(\d+)-/);
                if (match !== null && match !== undefined && match[1] !== null && match[1] !== undefined) {
                  issueNumber = parseInt(match[1], 10);
                } else {
                  // Try to find the issue file and extract number from it
                  const files = await fs.readdir(issuesDir);
                  const matchingFile = files.find(f => f.includes(issue ?? '') && f.endsWith('.md'));
                  if (matchingFile !== null && matchingFile !== undefined) {
                    const fileMatch = matchingFile.match(/^(\d+)-.*\.md$/);
                    if (fileMatch !== null && fileMatch !== undefined && fileMatch[1] !== null && fileMatch[1] !== undefined) {
                      issueNumber = parseInt(fileMatch[1], 10);
                    }
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
            
            // Extract the issue key from the found issue file (filename without .md)
            // For mock execution, we need to find the issue file to get the correct key
            let issueKey = issue;
            if (!isNaN(issueNumber)) {
              // Find the actual issue file by number to get the full filename
              try {
                const issuesDir = path.join(workspacePath, 'issues');
                const files = await fs.readdir(issuesDir);
                const matchingFile = files.find(f => f.match(new RegExp(`^${issueNumber}-.*\\.md$`)));
                if (matchingFile !== undefined) {
                  issueKey = path.basename(matchingFile, '.md');
                }
              } catch {
                // Fallback to original issue
                issueKey = issue;
              }
            }
            
            // Ensure the issue exists in status data
            if (!statusData[issueKey]) {
              statusData[issueKey] = { status: 'completed', issueNumber, completedAt: new Date().toISOString() };
            } else {
              const issueData = statusData[issueKey];
              if (issueData) {
                issueData.status = 'completed';
                issueData.completedAt = new Date().toISOString();
              }
            }
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
              issue: issueKey,
              status: 'completed',
              timestamp: new Date().toISOString()
            });
            
            await fs.writeFile(executionsFile, JSON.stringify(executions, null, 2), 'utf-8');
            
            Logger.success(`✅ Mock execution completed for issue: ${issueKey}`);
          } else {
            // Non-mock execution path
            const fs = await import('fs/promises');
            const path = await import('path');
            
            // Extract issue number from the issue string or filename
            let issueNumber: number;
            
            // First try to parse as a number
            issueNumber = parseInt(issue ?? '', 10);
            
            // If not a number, try to extract from status.json or filename pattern
            if (isNaN(issueNumber)) {
              // Try to find by slug in status.json
              const statusFile = path.join(workspacePath, '.autoagent', 'status.json');
              try {
                const statusContent = await fs.readFile(statusFile, 'utf-8');
                const statusData = JSON.parse(statusContent) as StatusData;
                const issueData = statusData[issue ?? ''];
                if (issueData?.issueNumber !== undefined && issueData.issueNumber !== null) {
                  issueNumber = issueData.issueNumber;
                }
              } catch {
                // Status file doesn't exist, continue to filename matching
              }
              
              // If still not found, try to extract from filename pattern
              if (isNaN(issueNumber)) {
                const match = issue?.match(/^(\d+)-/);
                if (match !== null && match !== undefined && match[1] !== null && match[1] !== undefined) {
                  issueNumber = parseInt(match[1], 10);
                } else {
                  // Try to find the issue file and extract number from it
                  const files = await fs.readdir(issuesDir);
                  const matchingFile = files.find(f => f.includes(issue ?? '') && f.endsWith('.md'));
                  if (matchingFile !== null && matchingFile !== undefined) {
                    const fileMatch = matchingFile.match(/^(\d+)-.*\.md$/);
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
            }
            
            // Execute the specific issue
            Logger.info(`🚀 Executing issue #${issueNumber}`);
            const result = await agent.executeIssue(issueNumber);
            
            if (result.success !== true) {
              Logger.error(`Failed to execute issue #${issueNumber}: ${result.error ?? 'Unknown error'}`);
              // Execute Stop hook for failed single issue
              try {
                await agent.executeStopHook('failed');
              } catch (error) {
                // Stop hook blocked or failed
                Logger.error(`Stop hook error: ${error instanceof Error ? error.message : String(error)}`);
              }
              process.exit(1);
            }
            
            // Execute Stop hook for successful single issue
            try {
              await agent.executeStopHook('completed');
            } catch (error) {
              // Stop hook blocked or failed
              Logger.error(`Stop hook error: ${error instanceof Error ? error.message : String(error)}`);
              process.exit(1);
            }
            
            // Execute Stop hook for successful single issue
            try {
              await agent.executeStopHook('completed');
            } catch (error) {
              // Stop hook blocked or failed
              Logger.error(`Stop hook error: ${error instanceof Error ? error.message : String(error)}`);
              process.exit(1);
            }
            
            // Execute Stop hook for successful single issue
            try {
              await agent.executeStopHook('completed');
            } catch (error) {
              // Stop hook blocked or failed
              Logger.error(`Stop hook error: ${error instanceof Error ? error.message : String(error)}`);
              process.exit(1);
            }
            
            // Update status tracking for successful execution
            const statusFile = path.join(workspacePath, '.autoagent', 'status.json');
            
            let statusData: StatusData = {};
            try {
              const statusContent = await fs.readFile(statusFile, 'utf-8');
              statusData = JSON.parse(statusContent) as StatusData;
            } catch {
              // File doesn't exist, continue
            }
            
            // Extract the issue key from the found issue file (filename without .md)
            const issueKey = issueFile ? path.basename(issueFile, '.md') : issue;
            
            // Ensure the issue exists in status data
            if (!statusData[issueKey]) {
              statusData[issueKey] = { status: 'completed', issueNumber };
            } else {
              statusData[issueKey].status = 'completed';
            }
            statusData[issueKey].completedAt = new Date().toISOString();
            
            // Ensure directory exists
            await fs.mkdir(path.dirname(statusFile), { recursive: true });
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
              issue: issueKey,
              status: 'completed',
              timestamp: new Date().toISOString()
            });
            
            await fs.writeFile(executionsFile, JSON.stringify(executions, null, 2), 'utf-8');
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
            const statusFile = path.join(workspacePath, '.autoagent', 'status.json');
            
            // Ensure .autoagent directory exists
            await fs.mkdir(path.dirname(statusFile), { recursive: true });
            
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
        // Check if this is a CommanderError from exitOverride() - if so, re-throw it
        if (error instanceof Error && error.name === 'CommanderError') {
          throw error;
        }
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      } finally {
        // Clean up the SIGINT listener
        process.removeListener('SIGINT', sigintHandler);
      }
    });
}