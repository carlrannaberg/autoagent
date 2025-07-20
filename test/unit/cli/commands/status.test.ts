import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Command } from 'commander';
import { registerStatusCommand } from '@/cli/commands/status';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { Logger } from '@/utils/logger';
import { InMemorySTMManager } from '../../../helpers/test-doubles/in-memory-stm-manager';
import * as fs from 'fs/promises';
import * as path from 'path';

// Mock modules
vi.mock('@/core/autonomous-agent');
vi.mock('@/utils/logger');
vi.mock('fs/promises');
vi.mock('path');

describe('Status Command', () => {
  let program: Command;
  let mockAgent: {
    getStatus: ReturnType<typeof vi.fn>;
  };
  let mockStmManager: InMemorySTMManager;
  let processExitSpy: ReturnType<typeof vi.spyOn>;
  
  beforeEach(async () => {
    vi.clearAllMocks();
    
    program = new Command();
    program.exitOverride(); // Prevent process.exit in tests
    
    // Mock process.exit
    processExitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit called');
    }) as never);
    
    // Mock process.cwd()
    vi.spyOn(process, 'cwd').mockReturnValue('/test/workspace');
    
    // Mock Logger
    vi.spyOn(Logger, 'info').mockImplementation(() => {});
    vi.spyOn(Logger, 'error').mockImplementation(() => {});
    vi.spyOn(Logger, 'success').mockImplementation(() => {});
    vi.spyOn(Logger, 'warning').mockImplementation(() => {});
    
    // Create in-memory STM manager with test data
    mockStmManager = new InMemorySTMManager();
    
    // Create test tasks with different statuses
    await mockStmManager.createTask('Pending Task 1', {
      description: 'First pending task'
    });
    
    await mockStmManager.createTask('Pending Task 2', {
      description: 'Second pending task'
    });
    
    await mockStmManager.createTask('In Progress Task', {
      description: 'Task currently being worked on'
    });
    await mockStmManager.updateTask('3', { status: 'in-progress' });
    
    await mockStmManager.createTask('Completed Task', {
      description: 'Task that has been completed'
    });
    await mockStmManager.updateTask('4', { status: 'done' });
    
    // Mock AutonomousAgent
    mockAgent = {
      getStatus: vi.fn().mockResolvedValue({
        totalTasks: 4,
        completedTasks: 1,
        pendingTasks: 2,
        currentTaskId: '3',
        availableProviders: ['claude', 'gemini'],
        rateLimitedProviders: []
      })
    };
    vi.mocked(AutonomousAgent).mockImplementation(() => mockAgent);
    
    // Mock path.join
    vi.mocked(path.join).mockImplementation((...segments) => segments.join('/'));
    
    registerStatusCommand(program);
  });
  
  afterEach(() => {
    processExitSpy.mockRestore();
  });
  
  describe('General status', () => {
    it('should show project status overview', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'status');
      expect(command).toBeDefined();
      
      await command!.parseAsync([], { from: 'user' });
      
      expect(mockAgent.getStatus).toHaveBeenCalled();
      expect(Logger.info).toHaveBeenCalledWith('\n📊 Project Status\n');
      expect(Logger.info).toHaveBeenCalledWith('Total Tasks:      4');
      expect(Logger.info).toHaveBeenCalledWith('Completed:        1');
      expect(Logger.info).toHaveBeenCalledWith('Pending:          2');
    });

    it('should show current task when available', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync([], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('\nCurrent Task:     3');
    });

    it('should not show current task when none is active', async () => {
      mockAgent.getStatus.mockResolvedValueOnce({
        totalTasks: 4,
        completedTasks: 1,
        pendingTasks: 3,
        currentTaskId: null,
        availableProviders: ['claude'],
        rateLimitedProviders: []
      });
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync([], { from: 'user' });
      
      const currentTaskCalls = vi.mocked(Logger.info).mock.calls
        .filter(call => call[0]?.includes('Current Task:'));
      expect(currentTaskCalls).toHaveLength(0);
    });

    it('should show available providers', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync([], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('\n✅ Available Providers: claude, gemini');
    });

    it('should show rate limited providers', async () => {
      mockAgent.getStatus.mockResolvedValueOnce({
        totalTasks: 4,
        completedTasks: 1,
        pendingTasks: 2,
        currentTaskId: '3',
        availableProviders: ['claude'],
        rateLimitedProviders: ['gemini']
      });
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync([], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('\n✅ Available Providers: claude');
      expect(Logger.info).toHaveBeenCalledWith('⏱️  Rate Limited: gemini');
    });

    it('should not show provider sections when empty', async () => {
      mockAgent.getStatus.mockResolvedValueOnce({
        totalTasks: 4,
        completedTasks: 1,
        pendingTasks: 2,
        currentTaskId: null,
        availableProviders: [],
        rateLimitedProviders: []
      });
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync([], { from: 'user' });
      
      const providerCalls = vi.mocked(Logger.info).mock.calls
        .filter(call => call[0]?.includes('Available Providers') || call[0]?.includes('Rate Limited'));
      expect(providerCalls).toHaveLength(0);
    });

    it('should use specified workspace', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync(['--workspace', '/custom/workspace'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith({
        provider: 'claude',
        workspace: '/custom/workspace'
      });
    });
  });

  describe('Execution history', () => {
    it('should show execution history when --history flag is used', async () => {
      const mockExecutions = [
        {
          id: 'exec-1',
          issue: 'task-1',
          status: 'completed',
          timestamp: '2024-01-01T10:00:00Z'
        },
        {
          id: 'exec-2',
          issue: 'task-2',
          status: 'failed',
          timestamp: '2024-01-01T11:00:00Z'
        },
        {
          id: 'exec-3',
          issue: 'task-3',
          status: 'running',
          timestamp: '2024-01-01T12:00:00Z'
        }
      ];

      vi.mocked(fs.readFile).mockResolvedValueOnce(JSON.stringify(mockExecutions));
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync(['--history'], { from: 'user' });
      
      expect(fs.readFile).toHaveBeenCalledWith('/test/workspace/.autoagent/executions.json', 'utf-8');
      expect(Logger.info).toHaveBeenCalledWith('Recent Executions:\n');
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('✅ task-1 (completed)'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('❌ task-2 (failed)'));
      expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('🔄 task-3 (running)'));
    });

    it('should handle missing execution history file', async () => {
      vi.mocked(fs.readFile).mockRejectedValueOnce(new Error('File not found'));
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync(['--history'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('No execution history found');
    });

    it('should handle malformed execution history', async () => {
      vi.mocked(fs.readFile).mockResolvedValueOnce('invalid json');
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync(['--history'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('No execution history found');
    });
  });

  describe('Specific issue status (legacy)', () => {
    beforeEach(() => {
      // Mock file system operations for legacy issue status functionality
      vi.mocked(fs.readdir).mockResolvedValue(['1-test-issue.md', '2-another-issue.md'] as any);
      vi.mocked(fs.readFile).mockImplementation((filePath: string) => {
        if (filePath.includes('status.json')) {
          return Promise.resolve(JSON.stringify({
            'test-issue': {
              status: 'running',
              startedAt: '2024-01-01T10:00:00Z',
              issueNumber: 1
            }
          }));
        }
        return Promise.reject(new Error('File not found'));
      });
    });

    it('should show specific issue status by number', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync(['1'], { from: 'user' });
      
      expect(fs.readdir).toHaveBeenCalledWith('/test/workspace/issues');
      expect(Logger.info).toHaveBeenCalledWith('1');
      expect(Logger.info).toHaveBeenCalledWith('Status: pending'); // Default when not found in status.json
    });

    it('should show specific issue status by name', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync(['test-issue'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('test-issue');
      expect(Logger.info).toHaveBeenCalledWith('Status: running');
    });

    it('should show runtime duration for running issues', async () => {
      // Mock current time to control duration calculation
      const mockDate = new Date('2024-01-01T10:30:00Z');
      vi.spyOn(Date, 'now').mockReturnValue(mockDate.getTime());
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync(['test-issue'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('30 minutes ago');
    });

    it('should handle issue not found', async () => {
      vi.mocked(fs.readdir).mockResolvedValueOnce([]);
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await expect(command!.parseAsync(['nonexistent'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Issue not found');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle missing issues directory', async () => {
      vi.mocked(fs.readdir).mockRejectedValueOnce(new Error('Directory not found'));
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await expect(command!.parseAsync(['1'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Issue not found');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('Error handling', () => {
    it('should handle agent getStatus failure', async () => {
      mockAgent.getStatus.mockRejectedValueOnce(new Error('STM error'));
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await expect(command!.parseAsync([], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed: STM error');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle non-Error exceptions', async () => {
      mockAgent.getStatus.mockRejectedValueOnce('String error');
      
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await expect(command!.parseAsync([], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed: String error');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('Short flags', () => {
    it('should support short flag for workspace', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'status');
      
      await command!.parseAsync(['-w', '/workspace'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith({
        provider: 'claude',
        workspace: '/workspace'
      });
    });
  });
});