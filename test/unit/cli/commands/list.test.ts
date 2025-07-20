import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Command } from 'commander';
import { registerListCommand } from '@/cli/commands/list';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { Logger } from '@/utils/logger';
import { getAvailableProviders } from '@/providers';
import { InMemorySTMManager } from '../../../helpers/test-doubles/in-memory-stm-manager';

// Mock modules
vi.mock('@/core/autonomous-agent');
vi.mock('@/utils/logger');
vi.mock('@/providers');

describe('List Command', () => {
  let program: Command;
  let mockAgent: {
    initialize: ReturnType<typeof vi.fn>;
    listTasks: ReturnType<typeof vi.fn>;
  };
  let mockStmManager: InMemorySTMManager;
  let processExitSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  
  beforeEach(async () => {
    vi.clearAllMocks();
    
    program = new Command();
    program.exitOverride(); // Prevent process.exit in tests
    
    // Mock process.exit
    processExitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit called');
    }) as never);
    
    // Mock console.log for JSON output
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Mock Logger
    vi.spyOn(Logger, 'info').mockImplementation(() => {});
    vi.spyOn(Logger, 'error').mockImplementation(() => {});
    vi.spyOn(Logger, 'success').mockImplementation(() => {});
    vi.spyOn(Logger, 'warning').mockImplementation(() => {});
    
    // Create in-memory STM manager with test data
    mockStmManager = new InMemorySTMManager();
    
    // Create test tasks with different statuses
    await mockStmManager.createTask('Pending Task 1', {
      description: 'First pending task',
      technicalDetails: 'Details for task 1'
    });
    
    await mockStmManager.createTask('Pending Task 2', {
      description: 'Second pending task'
    });
    
    await mockStmManager.createTask('In Progress Task', {
      description: 'Task currently being worked on'
    });
    
    // Update task status to in-progress and completed
    await mockStmManager.updateTask('3', { status: 'in-progress' });
    
    await mockStmManager.createTask('Completed Task', {
      description: 'Task that has been completed'
    });
    await mockStmManager.updateTask('4', { status: 'done' });
    
    // Mock AutonomousAgent
    mockAgent = {
      initialize: vi.fn().mockResolvedValue(undefined),
      listTasks: vi.fn().mockImplementation(async (status?: string) => {
        const tasks = await mockStmManager.listTasks(status ? { status: status as any } : undefined);
        return tasks.map(task => ({
          id: String(task.id),
          title: task.title,
          status: task.status
        }));
      })
    };
    vi.mocked(AutonomousAgent).mockImplementation(() => mockAgent);
    
    // Mock getAvailableProviders
    vi.mocked(getAvailableProviders).mockResolvedValue(['claude', 'gemini']);
    
    registerListCommand(program);
  });
  
  afterEach(() => {
    processExitSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
  
  describe('List tasks', () => {
    it('should list all tasks when no status filter is provided', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      expect(command).toBeDefined();
      
      await command!.parseAsync(['tasks'], { from: 'user' });
      
      expect(mockAgent.initialize).toHaveBeenCalled();
      expect(mockAgent.listTasks).toHaveBeenCalledWith(undefined);
      expect(Logger.info).toHaveBeenCalledWith('Found 4 task(s):\n');
      expect(Logger.info).toHaveBeenCalledWith('  ⏳ 1: Pending Task 1 (pending)');
      expect(Logger.info).toHaveBeenCalledWith('  ⏳ 2: Pending Task 2 (pending)');
      expect(Logger.info).toHaveBeenCalledWith('  🔄 3: In Progress Task (in-progress)');
      expect(Logger.info).toHaveBeenCalledWith('  ✅ 4: Completed Task (done)');
    });

    it('should filter tasks by status', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks', '--status', 'pending'], { from: 'user' });
      
      expect(mockAgent.listTasks).toHaveBeenCalledWith('pending');
      expect(Logger.info).toHaveBeenCalledWith('Found 2 task(s):\n');
      expect(Logger.info).toHaveBeenCalledWith('  ⏳ 1: Pending Task 1 (pending)');
      expect(Logger.info).toHaveBeenCalledWith('  ⏳ 2: Pending Task 2 (pending)');
    });

    it('should handle completed status filter with done status mapping', async () => {
      // Mock the listTasks to return a completed task when filtering by 'completed'
      mockAgent.listTasks.mockImplementation(async (status?: string) => {
        if (status === 'completed') {
          // Return the completed task from our mock STM manager
          const allTasks = await mockStmManager.listTasks();
          const completedTasks = allTasks.filter(task => task.status === 'done');
          return completedTasks.map(task => ({
            id: String(task.id),
            title: task.title,
            status: task.status
          }));
        }
        const tasks = await mockStmManager.listTasks(status ? { status: status as any } : undefined);
        return tasks.map(task => ({
          id: String(task.id),
          title: task.title,
          status: task.status
        }));
      });
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks', '--status', 'completed'], { from: 'user' });
      
      expect(mockAgent.listTasks).toHaveBeenCalledWith('completed');
      expect(Logger.info).toHaveBeenCalledWith('Found 1 task(s):\n');
      expect(Logger.info).toHaveBeenCalledWith('  ✅ 4: Completed Task (done)');
    });

    it('should handle in-progress status filter', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks', '--status', 'in-progress'], { from: 'user' });
      
      expect(mockAgent.listTasks).toHaveBeenCalledWith('in-progress');
      expect(Logger.info).toHaveBeenCalledWith('Found 1 task(s):\n');
      expect(Logger.info).toHaveBeenCalledWith('  🔄 3: In Progress Task (in-progress)');
    });

    it('should handle no tasks found', async () => {
      // Mock empty result
      mockAgent.listTasks.mockResolvedValueOnce([]);
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('No tasks found');
    });

    it('should handle no tasks found with status filter', async () => {
      // Mock empty result
      mockAgent.listTasks.mockResolvedValueOnce([]);
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks', '--status', 'in-progress'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('No tasks found with status: in-progress');
    });

    it('should output JSON format when requested', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks', '--json'], { from: 'user' });
      
      expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify([
        { id: '1', title: 'Pending Task 1', status: 'pending' },
        { id: '2', title: 'Pending Task 2', status: 'pending' },
        { id: '3', title: 'In Progress Task', status: 'in-progress' },
        { id: '4', title: 'Completed Task', status: 'done' }
      ], null, 2));
    });

    it('should output empty JSON array when no tasks found', async () => {
      mockAgent.listTasks.mockResolvedValueOnce([]);
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks', '--json'], { from: 'user' });
      
      expect(consoleLogSpy).toHaveBeenCalledWith('[]');
    });

    it('should validate status parameter', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await expect(command!.parseAsync(['tasks', '--status', 'invalid'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Invalid status: invalid. Valid statuses are: pending, in-progress, done, completed');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should use specified workspace', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks', '--workspace', '/custom/workspace'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith({
        workspace: '/custom/workspace'
      });
    });

    it('should handle status icons correctly', async () => {
      // Test with both completed and done statuses
      mockAgent.listTasks.mockResolvedValueOnce([
        { id: '1', title: 'Task 1', status: 'completed' },
        { id: '2', title: 'Task 2', status: 'done' },
        { id: '3', title: 'Task 3', status: 'in_progress' },
        { id: '4', title: 'Task 4', status: 'in-progress' },
        { id: '5', title: 'Task 5', status: 'pending' }
      ]);
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('  ✅ 1: Task 1 (completed)');
      expect(Logger.info).toHaveBeenCalledWith('  ✅ 2: Task 2 (done)');
      expect(Logger.info).toHaveBeenCalledWith('  🔄 3: Task 3 (in_progress)');
      expect(Logger.info).toHaveBeenCalledWith('  🔄 4: Task 4 (in-progress)');
      expect(Logger.info).toHaveBeenCalledWith('  ⏳ 5: Task 5 (pending)');
    });
  });

  describe('List providers', () => {
    it('should list available providers', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['providers'], { from: 'user' });
      
      expect(getAvailableProviders).toHaveBeenCalled();
      expect(Logger.info).toHaveBeenCalledWith('AI Providers:\n');
      expect(Logger.info).toHaveBeenCalledWith('  claude: ✅ Available');
      expect(Logger.info).toHaveBeenCalledWith('  gemini: ✅ Available');
    });

    it('should show unavailable providers', async () => {
      vi.mocked(getAvailableProviders).mockResolvedValueOnce(['claude']);
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['providers'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('  claude: ✅ Available');
      expect(Logger.info).toHaveBeenCalledWith('  gemini: ❌ Not installed');
    });

    it('should output providers in JSON format', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['providers', '--json'], { from: 'user' });
      
      expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify([
        { name: 'claude', available: true },
        { name: 'gemini', available: true }
      ], null, 2));
    });

    it('should handle partial provider availability in JSON', async () => {
      vi.mocked(getAvailableProviders).mockResolvedValueOnce(['gemini']);
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['providers', '--json'], { from: 'user' });
      
      expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify([
        { name: 'claude', available: false },
        { name: 'gemini', available: true }
      ], null, 2));
    });
  });

  describe('Error handling', () => {
    it('should handle unknown list type', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await expect(command!.parseAsync(['unknown'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith("Unknown list type: unknown. Use 'tasks' or 'providers'.");
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle agent initialization failure', async () => {
      mockAgent.initialize.mockRejectedValueOnce(new Error('Init failed'));
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await expect(command!.parseAsync(['tasks'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed: Init failed');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle task listing failure', async () => {
      mockAgent.listTasks.mockRejectedValueOnce(new Error('STM error'));
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await expect(command!.parseAsync(['tasks'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed: STM error');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle provider listing failure', async () => {
      vi.mocked(getAvailableProviders).mockRejectedValueOnce(new Error('Provider error'));
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await expect(command!.parseAsync(['providers'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed: Provider error');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle non-Error exceptions', async () => {
      mockAgent.listTasks.mockRejectedValueOnce('String error');
      
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await expect(command!.parseAsync(['tasks'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed: String error');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('Short flags', () => {
    it('should support short flag for status', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks', '-s', 'pending'], { from: 'user' });
      
      expect(mockAgent.listTasks).toHaveBeenCalledWith('pending');
    });

    it('should support short flag for workspace', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'list');
      
      await command!.parseAsync(['tasks', '-w', '/workspace'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith({
        workspace: '/workspace'
      });
    });
  });
});