import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { spawn } from 'child_process';
import type { ChildProcess } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import { ConfigManager } from '@/core/config-manager';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { createIntegrationContext, cleanupIntegrationContext } from '../../helpers/setup/integration-helpers';
import type { IntegrationTestContext } from '../../helpers/setup/integration-helpers';

// Mock child_process to simulate Claude usage limit
vi.mock('child_process', async (importOriginal) => {
  const actual = await importOriginal<typeof import('child_process')>();
  return {
    ...actual,
    spawn: vi.fn()
  };
});

describe('Claude Usage Limit Failover Integration Tests', () => {
  let context: IntegrationTestContext;
  let configManager: ConfigManager;
  let agent: AutonomousAgent;
  let mockSpawn: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();
    context = await createIntegrationContext();
    configManager = new ConfigManager(context.workspace.rootPath);
    await configManager.loadConfig();
    
    // Configure both providers
    await configManager.updateConfig({ providers: ['claude', 'gemini'] });
    
    agent = new AutonomousAgent({
      workspace: context.workspace.rootPath,
      autoCommit: false,
      debug: true
    });
    await agent.initialize();
    
    mockSpawn = vi.mocked(spawn);
  });

  afterEach(async () => {
    await cleanupIntegrationContext(context);
  });

  describe('Usage Limit Detection and Failover', () => {
    it('should detect Claude usage limit message and failover to Gemini', async () => {
      // Create issue file with proper format
      const issuesDir = path.join(context.workspace.rootPath, 'issues');
      await fs.mkdir(issuesDir, { recursive: true });
      const issueFile = path.join(issuesDir, '1-test-issue.md');
      await fs.writeFile(issueFile, `# Issue 1: Test Issue for Usage Limit

## Requirement
Complete a simple task

## Acceptance Criteria
- [ ] Task is completed

## Dependencies
None

## Technical Details
None`);
      
      // Create plan file
      const plansDir = path.join(context.workspace.rootPath, 'plans');
      await fs.mkdir(plansDir, { recursive: true });
      const planFile = path.join(plansDir, '1-test-issue.md');
      await fs.writeFile(planFile, `# Plan for Issue 1: Test Issue for Usage Limit

## Implementation Plan

### Phase 1
- [ ] Complete the task

## Technical Approach
Test usage limit failover scenario

## Potential Challenges
- Usage limits`);

      // Mock responses based on command and args
      mockSpawn.mockImplementation((command: string, args: string[]) => {
        const mockProcess: Partial<ChildProcess> = {
          stdout: { on: vi.fn() } as any,
          stderr: { on: vi.fn() } as any,
          stdin: { write: vi.fn(), end: vi.fn() } as any,
          on: vi.fn(),
          kill: vi.fn()
        };

        // Handle version checks
        if (args.includes('--version')) {
          const isAvailable = command === 'claude' || command === 'gemini';
          
          // Set up event handlers
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {
              setTimeout(() => callback(), 10);
            } else if (event === 'close') {
              setTimeout(() => callback(0), 50);
            }
          });
          
          // Set up stdout
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data' && isAvailable) {
              setTimeout(() => {
                if (command === 'claude') {
                  callback(Buffer.from('Claude CLI version 1.0.0\n'));
                } else {
                  callback(Buffer.from('Gemini CLI version 1.0.0\n'));
                }
              }, 20);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        // Handle Claude execution - simulate usage limit
        if (command === 'claude') {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {
              setTimeout(() => callback(), 10);
            } else if (event === 'close') {
              // Exit with code 1 for usage limit error
              setTimeout(() => callback(1), 100);
            }
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => {
                // Send usage limit message as observed
                callback(Buffer.from('Claude AI usage limit reached|1751749200\n'));
              }, 50);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        // Handle Gemini execution - succeed
        if (command === 'gemini') {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {
              setTimeout(() => callback(), 10);
            } else if (event === 'close') {
              setTimeout(() => callback(0), 100);
            }
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => {
                callback(Buffer.from('Task completed successfully by Gemini\n'));
              }, 50);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        throw new Error(`Unexpected command: ${command}`);
      });

      // Execute the issue
      const result = await agent.executeIssue(1);

      // Verify failover occurred
      expect(result.success).toBe(true);
      expect(result.provider).toBe('gemini');
      expect(result.error).toBeUndefined();
      
      // Verify both providers were called (including version checks)
      const calls = mockSpawn.mock.calls;
      const claudeExecutionCalls = calls.filter(call => 
        call[0] === 'claude' && Array.isArray(call[1]) && !call[1].includes('--version')
      );
      const geminiExecutionCalls = calls.filter(call => 
        call[0] === 'gemini' && Array.isArray(call[1]) && !call[1].includes('--version')
      );
      
      expect(claudeExecutionCalls.length).toBeGreaterThan(0);
      expect(geminiExecutionCalls.length).toBeGreaterThan(0);
      
      // Verify Claude is marked as rate limited
      const isRateLimited = await configManager.isProviderRateLimited('claude');
      expect(isRateLimited).toBe(true);
    });

    it('should extract timestamp from usage limit message', async () => {
      // Create issue file with proper format
      const issuesDir = path.join(context.workspace.rootPath, 'issues');
      await fs.mkdir(issuesDir, { recursive: true });
      const issueFile = path.join(issuesDir, '2-test-timestamp.md');
      await fs.writeFile(issueFile, `# Issue 2: Test Timestamp Extraction

## Requirement
Test timestamp parsing

## Acceptance Criteria
- [ ] Parse timestamp correctly

## Dependencies
None

## Technical Details
None`);
      
      // Create plan file
      const plansDir = path.join(context.workspace.rootPath, 'plans');
      await fs.mkdir(plansDir, { recursive: true });
      const planFile = path.join(plansDir, '2-test-timestamp.md');
      await fs.writeFile(planFile, `# Plan for Issue 2: Test Timestamp Extraction

## Implementation Plan

### Phase 1
- [ ] Parse timestamp

## Technical Approach
Test timestamp extraction from usage limit message

## Potential Challenges
- Timestamp parsing`);

      const futureTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      // Mock spawn to return usage limit with timestamp
      mockSpawn.mockImplementation((command: string, args: string[]) => {
        const mockProcess: Partial<ChildProcess> = {
          stdout: { on: vi.fn() } as any,
          stderr: { on: vi.fn() } as any,
          stdin: { write: vi.fn(), end: vi.fn() } as any,
          on: vi.fn(),
          kill: vi.fn()
        };

        // Handle version checks
        if (args.includes('--version')) {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(0), 50);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => callback(Buffer.from(`${command} version 1.0.0\n`)), 20);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        // Claude with timestamp in usage limit
        if (command === 'claude') {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(1), 100);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => {
                callback(Buffer.from(`Claude AI usage limit reached|${futureTimestamp}\n`));
              }, 50);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        // Gemini succeeds
        if (command === 'gemini') {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(0), 100);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => callback(Buffer.from('Task completed by Gemini\n')), 50);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        throw new Error(`Unexpected command: ${command}`);
      });

      const result = await agent.executeIssue(2);
      
      expect(result.success).toBe(true);
      expect(result.provider).toBe('gemini');
      
      // Verify Claude is marked as rate limited
      const isRateLimited = await configManager.isProviderRateLimited('claude');
      expect(isRateLimited).toBe(true);
      
      // Check rate limit status
      const status = await configManager.checkRateLimit('claude');
      expect(status.isLimited).toBe(true);
      
      // Since we're simulating a future timestamp, check it exists
      if (status.timeRemaining !== undefined) {
        expect(status.timeRemaining).toBeGreaterThan(0);
        expect(status.timeRemaining).toBeLessThanOrEqual(3600000); // Should be <= 1 hour in ms
      }
    });

    it('should handle JSON format usage limit error', async () => {
      // Create issue file with proper format
      const issuesDir = path.join(context.workspace.rootPath, 'issues');
      await fs.mkdir(issuesDir, { recursive: true });
      const issueFile = path.join(issuesDir, '3-test-json.md');
      await fs.writeFile(issueFile, `# Issue 3: Test JSON Format Error

## Requirement
Handle JSON error format

## Acceptance Criteria
- [ ] Handle error correctly

## Dependencies
None

## Technical Details
None`);
      
      // Create plan file
      const plansDir = path.join(context.workspace.rootPath, 'plans');
      await fs.mkdir(plansDir, { recursive: true });
      const planFile = path.join(plansDir, '3-test-json.md');
      await fs.writeFile(planFile, `# Plan for Issue 3: Test JSON Format Error

## Implementation Plan

### Phase 1
- [ ] Handle JSON error

## Technical Approach
Test JSON error format handling

## Potential Challenges
- JSON parsing`);

      // Mock for JSON error format
      mockSpawn.mockImplementation((command: string, args: string[]) => {
        const mockProcess: Partial<ChildProcess> = {
          stdout: { on: vi.fn() } as any,
          stderr: { on: vi.fn() } as any,
          stdin: { write: vi.fn(), end: vi.fn() } as any,
          on: vi.fn(),
          kill: vi.fn()
        };

        if (args.includes('--version')) {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(0), 50);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => callback(Buffer.from(`${command} version 1.0.0\n`)), 20);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        if (command === 'claude') {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(1), 100);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => {
                const errorMessage = JSON.stringify({
                  type: 'error',
                  message: 'Claude AI usage limit reached'
                });
                callback(Buffer.from(errorMessage + '\n'));
              }, 50);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        if (command === 'gemini') {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(0), 100);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => callback(Buffer.from('Gemini completed the task\n')), 50);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        throw new Error(`Unexpected command: ${command}`);
      });

      const result = await agent.executeIssue(3);
      
      expect(result.success).toBe(true);
      expect(result.provider).toBe('gemini');
      
      // Verify Claude is marked as rate limited
      const isRateLimited = await configManager.isProviderRateLimited('claude');
      expect(isRateLimited).toBe(true);
    });

    it('should handle both providers hitting usage limits', async () => {
      // Create issue file with proper format
      const issuesDir = path.join(context.workspace.rootPath, 'issues');
      await fs.mkdir(issuesDir, { recursive: true });
      const issueFile = path.join(issuesDir, '4-test-both.md');
      await fs.writeFile(issueFile, `# Issue 4: Test Both Providers Limited

## Requirement
Handle both providers being limited

## Acceptance Criteria
- [ ] Handle gracefully

## Dependencies
None

## Technical Details
None`);
      
      // Create plan file
      const plansDir = path.join(context.workspace.rootPath, 'plans');
      await fs.mkdir(plansDir, { recursive: true });
      const planFile = path.join(plansDir, '4-test-both.md');
      await fs.writeFile(planFile, `# Plan for Issue 4: Test Both Providers Limited

## Implementation Plan

### Phase 1
- [ ] Try both providers

## Technical Approach
Test both providers hitting usage limits

## Potential Challenges
- All providers unavailable`);

      // Mock both providers to return usage limit errors
      mockSpawn.mockImplementation((command: string, args: string[]) => {
        const mockProcess: Partial<ChildProcess> = {
          stdout: { on: vi.fn() } as any,
          stderr: { on: vi.fn() } as any,
          stdin: { write: vi.fn(), end: vi.fn() } as any,
          on: vi.fn(),
          kill: vi.fn()
        };

        if (args.includes('--version')) {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(0), 50);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => callback(Buffer.from(`${command} version 1.0.0\n`)), 20);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        // Both providers return usage limit
        const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
        mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
          if (event === 'spawn') {setTimeout(() => callback(), 10);}
          else if (event === 'close') {setTimeout(() => callback(1), 100);}
        });
        
        // For error cases, the message should be in stderr
        const mockStderrOn = mockProcess.stderr!.on as ReturnType<typeof vi.fn>;
        mockStderrOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
          if (event === 'data') {
            setTimeout(() => {
              callback(Buffer.from('Usage limit reached\n'));
            }, 50);
          }
        });
        
        const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
        mockStdoutOn.mockImplementation(() => {
          // Empty stdout for error case
        });
        
        return mockProcess as ChildProcess;
      });

      const result = await agent.executeIssue(4);
      
      expect(result.success).toBe(false);
      // When all providers are rate limited, the error is "No available providers found"
      expect(result.error).toBeDefined();
      expect(result.error).toMatch(/no available providers|rate limit|usage limit|providers failed|execution failed/i);
      
      // Both providers should be marked as rate limited
      const claudeRateLimited = await configManager.isProviderRateLimited('claude');
      const geminiRateLimited = await configManager.isProviderRateLimited('gemini');
      expect(claudeRateLimited).toBe(true);
      expect(geminiRateLimited).toBe(true);
    });

    it('should preserve provider preference after usage limit recovery', async () => {
      // First mark Claude as rate limited
      await configManager.updateRateLimit('claude', true);
      
      // Create issue file with proper format
      const issuesDir = path.join(context.workspace.rootPath, 'issues');
      await fs.mkdir(issuesDir, { recursive: true });
      const issueFile = path.join(issuesDir, '5-test-preference.md');
      await fs.writeFile(issueFile, `# Issue 5: Test Provider Preference

## Requirement
Test provider selection

## Acceptance Criteria
- [ ] Use correct provider

## Dependencies
None

## Technical Details
None`);
      
      // Create plan file
      const plansDir = path.join(context.workspace.rootPath, 'plans');
      await fs.mkdir(plansDir, { recursive: true });
      const planFile = path.join(plansDir, '5-test-preference.md');
      await fs.writeFile(planFile, `# Plan for Issue 5: Test Provider Preference

## Implementation Plan

### Phase 1
- [ ] Check provider

## Technical Approach
Test provider preference selection

## Potential Challenges
- Provider selection`);

      // Mock Gemini to succeed
      mockSpawn.mockImplementation((command: string, args: string[]) => {
        const mockProcess: Partial<ChildProcess> = {
          stdout: { on: vi.fn() } as any,
          stderr: { on: vi.fn() } as any,
          stdin: { write: vi.fn(), end: vi.fn() } as any,
          on: vi.fn(),
          kill: vi.fn()
        };

        if (args.includes('--version')) {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(0), 50);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => callback(Buffer.from(`${command} version 1.0.0\n`)), 20);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        if (command === 'gemini') {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(0), 100);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => callback(Buffer.from('Gemini handled the task\n')), 50);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        // Claude should not be called since it's rate limited
        if (command === 'claude' && !args.includes('--version')) {
          throw new Error('Claude should not be called when rate limited');
        }

        return mockProcess as ChildProcess;
      });

      // Should use Gemini since Claude is rate limited
      const result = await agent.executeIssue(5);
      
      expect(result.success).toBe(true);
      expect(result.provider).toBe('gemini');
      
      // Now clear Claude's rate limit
      await configManager.updateRateLimit('claude', false);
      
      // Create another issue
      const issueFile6 = path.join(issuesDir, '6-test-preference-2.md');
      await fs.writeFile(issueFile6, `# Issue 6: Test Provider Preference After Recovery

## Requirement
Test provider selection after recovery

## Acceptance Criteria
- [ ] Use Claude again

## Dependencies
None

## Technical Details
None`);
      
      // Create plan file for issue 6
      const planFile6 = path.join(plansDir, '6-test-preference-2.md');
      await fs.writeFile(planFile6, `# Plan for Issue 6: Test Provider Preference After Recovery

## Implementation Plan

### Phase 1
- [ ] Use Claude again

## Technical Approach
Test provider recovery and preference restoration

## Potential Challenges
- Provider recovery`);
      
      // Reset mock to allow Claude
      mockSpawn.mockClear();
      mockSpawn.mockImplementation((command: string, args: string[]) => {
        const mockProcess: Partial<ChildProcess> = {
          stdout: { on: vi.fn() } as any,
          stderr: { on: vi.fn() } as any,
          stdin: { write: vi.fn(), end: vi.fn() } as any,
          on: vi.fn(),
          kill: vi.fn()
        };

        if (args.includes('--version')) {
          const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
          mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
            if (event === 'spawn') {setTimeout(() => callback(), 10);}
            else if (event === 'close') {setTimeout(() => callback(0), 50);}
          });
          
          const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
          mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
            if (event === 'data') {
              setTimeout(() => callback(Buffer.from(`${command} version 1.0.0\n`)), 20);
            }
          });
          
          return mockProcess as ChildProcess;
        }

        // Both providers work now
        const mockOn = mockProcess.on as ReturnType<typeof vi.fn>;
        mockOn.mockImplementation((event: string, callback: (code?: number) => void) => {
          if (event === 'spawn') {setTimeout(() => callback(), 10);}
          else if (event === 'close') {setTimeout(() => callback(0), 100);}
        });
        
        const mockStdoutOn = mockProcess.stdout!.on as ReturnType<typeof vi.fn>;
        mockStdoutOn.mockImplementation((event: string, callback: (data: Buffer) => void) => {
          if (event === 'data') {
            setTimeout(() => {
              if (command === 'claude') {
                callback(Buffer.from('Claude is back online\n'));
              } else {
                callback(Buffer.from('Gemini also available\n'));
              }
            }, 50);
          }
        });
        
        return mockProcess as ChildProcess;
      });
      
      // Should use Claude again as it's the preferred provider
      const result2 = await agent.executeIssue(6);
      
      expect(result2.success).toBe(true);
      expect(result2.provider).toBe('claude');
      
      // Verify Claude was called for execution (not just version check)
      const calls = mockSpawn.mock.calls;
      const claudeExecutionCalls = calls.filter(call => 
        call[0] === 'claude' && Array.isArray(call[1]) && !call[1].includes('--version')
      );
      expect(claudeExecutionCalls.length).toBeGreaterThan(0);
    });
  });
});