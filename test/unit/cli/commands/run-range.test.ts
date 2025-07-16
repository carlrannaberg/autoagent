import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs/promises';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { registerRunCommand } from '@/cli/commands/run';
import { Command } from 'commander';
import { Logger } from '@/utils/logger';
import { FileManager } from '@/utils/file-manager';
import { validateProjectFiles } from '@/core/validators/index.js';

// Mock dependencies
vi.mock('fs/promises');
vi.mock('@/core/autonomous-agent');
vi.mock('@/utils/logger');
vi.mock('@/utils/file-manager');
vi.mock('@/core/validators/index.js', () => ({
  validateProjectFiles: vi.fn()
}));
vi.mock('@/core/validators/autofix-service.js');

interface MockAgent {
  initialize: ReturnType<typeof vi.fn>;
  executeIssue: ReturnType<typeof vi.fn>;
  on: ReturnType<typeof vi.fn>;
  executeStartHook: ReturnType<typeof vi.fn>;
  executeStopHook: ReturnType<typeof vi.fn>;
  removeAllListeners: ReturnType<typeof vi.fn>;
}

describe('Run Command Range Functionality', () => {
  let program: Command;
  let runCommand: Command;
  let mockAgent: MockAgent;
  let processExitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    program = new Command();
    program.exitOverride(); // Prevent process.exit in tests
    
    // Mock process.exit
    processExitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit called');
    }) as never);
    
    // Mock Logger
    vi.spyOn(Logger, 'info').mockImplementation(() => {});
    vi.spyOn(Logger, 'error').mockImplementation(() => {});
    vi.spyOn(Logger, 'success').mockImplementation(() => {});
    vi.spyOn(Logger, 'warning').mockImplementation(() => {});
    
    // Mock FileManager
    const mockFileManager = {
      readIssue: vi.fn().mockResolvedValue({
        number: 1,
        title: 'Test Issue',
        requirements: 'Test requirements',
        acceptanceCriteria: ['Test criteria']
      })
    };
    vi.mocked(FileManager).mockImplementation(() => mockFileManager);
    
    // Mock validation functions
    vi.mocked(validateProjectFiles).mockResolvedValue({
      valid: true,
      issues: []
    });
    
    registerRunCommand(program);
    runCommand = program.commands.find(cmd => cmd.name() === 'run')!;
    
    mockAgent = {
      initialize: vi.fn().mockResolvedValue(undefined),
      executeIssue: vi.fn().mockResolvedValue({ success: true, issueNumber: 1, issueTitle: 'Test Issue' }),
      on: vi.fn(),
      executeStartHook: vi.fn().mockResolvedValue(undefined),
      executeStopHook: vi.fn().mockResolvedValue(undefined),
      removeAllListeners: vi.fn()
    };
    
    vi.mocked(AutonomousAgent).mockImplementation(() => mockAgent as AutonomousAgent);
    
    // Mock fs operations
    vi.mocked(fs.readdir).mockResolvedValue(['1-first-issue.md', '2-second-issue.md', '3-third-issue.md']);
    vi.mocked(fs.access).mockResolvedValue(undefined);
  });

  afterEach(() => {
    processExitSpy.mockRestore();
    vi.restoreAllMocks();
  });

  describe('Range parsing', () => {
    it('should parse simple range correctly', async () => {
      await runCommand.parseAsync(['1-3'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledTimes(3);
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(1);
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(2);
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(3);
    });

    it('should handle single-issue range', async () => {
      await runCommand.parseAsync(['2-2'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledTimes(1);
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(2);
    });

    it('should reject invalid range where start > end', async () => {
      await expect(runCommand.parseAsync(['5-3'], { from: 'user' })).rejects.toThrow('process.exit called');
      
      expect(mockAgent.executeIssue).not.toHaveBeenCalled();
    });

    it('should reject invalid range format', async () => {
      await expect(runCommand.parseAsync(['1-2-3'], { from: 'user' })).rejects.toThrow('process.exit called');
      
      expect(mockAgent.executeIssue).not.toHaveBeenCalled();
    });
  });

  describe('Issue validation', () => {
    it('should validate all issues exist before execution', async () => {
      // Mock missing issue #4
      vi.mocked(fs.readdir).mockResolvedValue(['1-first-issue.md', '2-second-issue.md', '3-third-issue.md']);

      await expect(runCommand.parseAsync(['2-4'], { from: 'user' })).rejects.toThrow('process.exit called');
      
      expect(mockAgent.executeIssue).not.toHaveBeenCalled();
    });

    it('should proceed when all issues exist', async () => {
      vi.mocked(fs.readdir).mockResolvedValue(['1-first-issue.md', '2-second-issue.md', '3-third-issue.md']);

      await runCommand.parseAsync(['1-2'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledTimes(2);
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(1);
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(2);
    });
  });

  describe('Execution handling', () => {
    it('should handle mixed success and failure results', async () => {
      mockAgent.executeIssue
        .mockResolvedValueOnce({ success: true, issueNumber: 1, issueTitle: 'Success' })
        .mockResolvedValueOnce({ success: false, issueNumber: 2, error: 'Failed' })
        .mockResolvedValueOnce({ success: true, issueNumber: 3, issueTitle: 'Success' });

      await expect(runCommand.parseAsync(['1-3'], { from: 'user' })).rejects.toThrow('process.exit called');
      
      expect(mockAgent.executeIssue).toHaveBeenCalledTimes(3);
    });

    it('should handle execution errors gracefully', async () => {
      mockAgent.executeIssue
        .mockResolvedValueOnce({ success: true, issueNumber: 1 })
        .mockRejectedValueOnce(new Error('Execution failed'))
        .mockResolvedValueOnce({ success: true, issueNumber: 3 });

      await expect(runCommand.parseAsync(['1-3'], { from: 'user' })).rejects.toThrow('process.exit called');
      
      expect(mockAgent.executeIssue).toHaveBeenCalledTimes(3);
    });

    it('should exit successfully when all issues complete successfully', async () => {
      mockAgent.executeIssue.mockResolvedValue({ success: true, issueNumber: 1, issueTitle: 'Success' });

      await runCommand.parseAsync(['1-2'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledTimes(2);
    });
  });

  describe('Input detection', () => {
    it('should detect range format vs single number', async () => {
      // Add issue #5 to the mocked file list
      vi.mocked(fs.readdir).mockResolvedValue(['1-first-issue.md', '2-second-issue.md', '3-third-issue.md', '5-test-issue.md']);
      
      // Single number should not be treated as range
      await runCommand.parseAsync(['5'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledTimes(1);
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(5);
    });

    it('should detect range format vs issue filename', async () => {
      vi.mocked(fs.readdir).mockResolvedValue(['1-first-issue.md', '5-add-auth.md']);

      // Issue filename should not be treated as range
      await runCommand.parseAsync(['5-add-auth'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledTimes(1);
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(5);
    });
  });

  describe('Range boundaries', () => {
    it('should handle large ranges', async () => {
      // Mock 10 issues
      const issues = Array.from({ length: 10 }, (_, i) => `${i + 1}-issue-${i + 1}.md`);
      vi.mocked(fs.readdir).mockResolvedValue(issues);

      mockAgent.executeIssue.mockResolvedValue({ success: true, issueNumber: 1 });

      await runCommand.parseAsync(['1-10'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledTimes(10);
      for (let i = 1; i <= 10; i++) {
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(i);
      }
    });
  });
});