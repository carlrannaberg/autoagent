import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Command } from 'commander';
import { registerRunCommand } from '@/cli/commands/run';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { Logger } from '@/utils/logger';
import { FileManager } from '@/utils/file-manager';
import * as fs from 'fs/promises';

// Mock modules
vi.mock('@/core/autonomous-agent');
vi.mock('@/utils/logger');
vi.mock('@/utils/file-manager');
vi.mock('fs/promises');

describe('Run Command', () => {
  let program: Command;
  let mockAgent: any;
  let mockFileManager: any;
  let processExitSpy: any;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    program = new Command();
    program.exitOverride(); // Prevent process.exit in tests
    
    // Mock process.exit
    processExitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit called');
    }) as any);
    
    // Mock Logger
    vi.spyOn(Logger, 'info').mockImplementation(() => {});
    vi.spyOn(Logger, 'error').mockImplementation(() => {});
    vi.spyOn(Logger, 'success').mockImplementation(() => {});
    vi.spyOn(Logger, 'warning').mockImplementation(() => {});
    
    // Mock FileManager
    mockFileManager = {
      readIssue: vi.fn().mockResolvedValue({
        number: 39,
        title: 'Test Issue',
        requirements: 'Test requirements',
        acceptanceCriteria: ['Test criteria']
      })
    };
    vi.mocked(FileManager).mockImplementation(() => mockFileManager);
    
    // Mock AutonomousAgent
    mockAgent = {
      initialize: vi.fn().mockResolvedValue(undefined),
      executeIssue: vi.fn().mockResolvedValue({
        success: true,
        issueNumber: 39,
        duration: 1000,
        provider: 'claude'
      }),
      executeAll: vi.fn().mockResolvedValue([
        { success: true, issueNumber: 1 },
        { success: true, issueNumber: 2 }
      ]),
      executeNext: vi.fn().mockResolvedValue({
        success: true,
        issueNumber: 1,
        duration: 1000
      }),
      getStatus: vi.fn().mockResolvedValue({
        pendingIssues: 2
      }),
      on: vi.fn(),
      emit: vi.fn()
    };
    vi.mocked(AutonomousAgent).mockImplementation(() => mockAgent);
    
    // Mock fs.readdir
    vi.mocked(fs.readdir).mockResolvedValue([
      '39-implement-plan-from-embed-bootstrap-templates.md',
      '40-another-issue.md'
    ] as any);
    
    registerRunCommand(program);
  });
  
  afterEach(() => {
    processExitSpy.mockRestore();
  });
  
  describe('Running specific issues', () => {
    it('should execute issue by number', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      expect(command).toBeDefined();
      
      await command!.parseAsync(['39'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(39);
      expect(Logger.info).toHaveBeenCalledWith('🚀 Executing issue #39');
      expect(processExitSpy).not.toHaveBeenCalled();
    });
    
    it('should execute issue by filename prefix', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39-implement-plan'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(39);
      expect(Logger.info).toHaveBeenCalledWith('🚀 Executing issue #39');
    });
    
    it('should execute issue by partial name match', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['embed-bootstrap'], { from: 'user' });
      
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(39);
      expect(Logger.info).toHaveBeenCalledWith('🚀 Executing issue #39');
    });
    
    it('should handle execution failure', async () => {
      mockAgent.executeIssue.mockResolvedValueOnce({
        success: false,
        issueNumber: 39,
        error: 'Provider not available'
      });
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await expect(command!.parseAsync(['39'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed to execute issue #39: Provider not available');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
    
    it('should handle invalid issue number', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await expect(command!.parseAsync(['abc123'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Issue not found: abc123');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
    
    it('should handle non-existent issue', async () => {
      vi.mocked(fs.readdir).mockResolvedValueOnce([] as any);
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await expect(command!.parseAsync(['999'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Issue not found: 999');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });
  
  describe('Running all issues', () => {
    it('should execute all pending issues', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['--all'], { from: 'user' });
      
      expect(mockAgent.executeAll).toHaveBeenCalled();
      expect(Logger.success).toHaveBeenCalledWith('🎉 All 2 issues completed successfully!');
    });
    
    it('should report partial success', async () => {
      mockAgent.executeAll.mockResolvedValueOnce([
        { success: true, issueNumber: 1 },
        { success: false, issueNumber: 2, error: 'Failed' }
      ]);
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['--all'], { from: 'user' });
      
      expect(Logger.warning).toHaveBeenCalledWith('⚠️  Completed 1 issues, 1 failed');
    });
  });
  
  describe('Running next issue', () => {
    it('should execute next pending issue when no argument provided', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync([], { from: 'user' });
      
      expect(mockAgent.executeNext).toHaveBeenCalled();
    });
    
    it('should handle no pending issues', async () => {
      mockAgent.executeNext.mockResolvedValueOnce({
        success: false,
        issueNumber: 0,
        error: 'No pending issues to execute'
      });
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync([], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('📝 No pending issues to execute');
      expect(processExitSpy).not.toHaveBeenCalled();
    });
  });
  
  describe('Provider options', () => {
    it('should use specified provider', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--provider', 'gemini'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          provider: 'gemini'
        })
      );
    });
    
    it('should handle dry-run mode', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--dry-run'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          dryRun: true
        })
      );
    });
  });

  describe('Input Type Detection', () => {
    it('should detect spec/plan files when .md file has no issue marker', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Specification\n\nThis is a spec file without issue marker.');
      
      await expect(program.parseAsync(['node', 'test', 'run', 'spec.md'])).rejects.toThrow('process.exit called');
      
      expect(Logger.info).toHaveBeenCalledWith('🔍 Detected spec/plan file: spec.md');
      expect(Logger.warning).toHaveBeenCalledWith('Spec file execution will be implemented in the next update');
      expect(processExitSpy).toHaveBeenCalledWith(0);
    });

    it('should handle issue files when .md file has issue marker', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Issue 42: Test Issue\n\nThis is an issue file.');
      vi.mocked(fs.readdir).mockResolvedValue(['42-test-issue.md'] as any);
      
      mockAgent.executeIssue.mockResolvedValue({ success: true });
      
      await program.parseAsync(['node', 'test', 'run', '42-test-issue.md']);
      
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(42);
    });

    it('should handle numeric issue references', async () => {
      vi.mocked(fs.readdir).mockResolvedValue(['42-test-issue.md'] as any);
      mockAgent.executeIssue.mockResolvedValue({ success: true });
      
      await program.parseAsync(['node', 'test', 'run', '42']);
      
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(42);
    });

    it('should handle issue file names without .md extension', async () => {
      vi.mocked(fs.readdir).mockResolvedValue(['42-test-issue.md'] as any);
      mockAgent.executeIssue.mockResolvedValue({ success: true });
      
      await program.parseAsync(['node', 'test', 'run', '42-test-issue']);
      
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(42);
    });

    it('should error when spec/plan file does not exist', async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error('File not found'));
      
      await expect(program.parseAsync(['node', 'test', 'run', 'nonexistent.md'])).rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('File not found: nonexistent.md');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle absolute paths for spec files', async () => {
      const absolutePath = '/absolute/path/to/spec.md';
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Specification\n\nNo issue marker here.');
      
      await expect(program.parseAsync(['node', 'test', 'run', absolutePath])).rejects.toThrow('process.exit called');
      
      expect(fs.readFile).toHaveBeenCalledWith(absolutePath, 'utf-8');
      expect(Logger.info).toHaveBeenCalledWith(`🔍 Detected spec/plan file: ${absolutePath}`);
    });
  });
});