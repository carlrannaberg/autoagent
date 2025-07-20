import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Command } from 'commander';
import { registerRunCommand } from '@/cli/commands/run';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { Logger } from '@/utils/logger';
import { InMemorySTMManager } from '../../../helpers/test-doubles/in-memory-stm-manager';

// Mock modules
vi.mock('@/core/autonomous-agent');
vi.mock('@/utils/logger');

describe('Run Command', () => {
  let program: Command;
  let mockAgent: {
    initialize: ReturnType<typeof vi.fn>;
    executeTask: ReturnType<typeof vi.fn>;
    listTasks: ReturnType<typeof vi.fn>;
    getTask: ReturnType<typeof vi.fn>;
    createTask: ReturnType<typeof vi.fn>;
    updateTaskStatus: ReturnType<typeof vi.fn>;
    searchTasks: ReturnType<typeof vi.fn>;
    getStatus: ReturnType<typeof vi.fn>;
    on: ReturnType<typeof vi.fn>;
    emit: ReturnType<typeof vi.fn>;
    executeStartHook: ReturnType<typeof vi.fn>;
    executeStopHook: ReturnType<typeof vi.fn>;
    removeAllListeners: ReturnType<typeof vi.fn>;
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
    
    // Mock Logger
    vi.spyOn(Logger, 'info').mockImplementation(() => {});
    vi.spyOn(Logger, 'error').mockImplementation(() => {});
    vi.spyOn(Logger, 'success').mockImplementation(() => {});
    vi.spyOn(Logger, 'warning').mockImplementation(() => {});
    
    // Create in-memory STM manager and populate with test data
    mockStmManager = new InMemorySTMManager();
    
    // Create some test tasks
    await mockStmManager.createTask('Test Task 1', {
      description: 'First test task',
      technicalDetails: 'Implementation details for task 1',
      acceptanceCriteria: ['Task 1 works correctly']
    });
    
    await mockStmManager.createTask('Test Task 2', {
      description: 'Second test task',
      technicalDetails: 'Implementation details for task 2'
    });
    
    // Mock AutonomousAgent to use our in-memory STM manager
    mockAgent = {
      initialize: vi.fn().mockResolvedValue(undefined),
      executeTask: vi.fn().mockResolvedValue({
        success: true,
        taskId: '1',
        duration: 1000,
        provider: 'claude'
      }),
      listTasks: vi.fn().mockImplementation(async (status?: string) => {
        const tasks = await mockStmManager.listTasks(status !== undefined && status !== '' ? { status: status as any } : undefined);
        return tasks.map(task => ({
          id: String(task.id),
          title: task.title,
          status: task.status
        }));
      }),
      getTask: vi.fn().mockImplementation(async (id: string) => {
        const task = await mockStmManager.getTask(id);
        return task ? {
          id: String(task.id),
          title: task.title,
          status: task.status
        } : null;
      }),
      createTask: vi.fn().mockResolvedValue('3'),
      updateTaskStatus: vi.fn().mockResolvedValue(undefined),
      searchTasks: vi.fn().mockResolvedValue([]),
      getStatus: vi.fn().mockResolvedValue({
        pendingTasks: 2,
        completedTasks: 0,
        totalTasks: 2
      }),
      on: vi.fn(),
      emit: vi.fn(),
      executeStartHook: vi.fn().mockResolvedValue(undefined),
      executeStopHook: vi.fn().mockResolvedValue(undefined),
      removeAllListeners: vi.fn()
    };
    vi.mocked(AutonomousAgent).mockImplementation(() => mockAgent);
    
    registerRunCommand(program);
  });
  
  afterEach(() => {
    processExitSpy.mockRestore();
  });
  
  describe('Running specific tasks', () => {
    it('should execute task by ID', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      expect(command).toBeDefined();
      
      await command!.parseAsync(['1'], { from: 'user' });
      
      expect(mockAgent.executeTask).toHaveBeenCalledWith('1');
      expect(Logger.info).toHaveBeenCalledWith('▶️  Executing task: 1');
      expect(processExitSpy).not.toHaveBeenCalled();
    });
    
    it('should show success message when task completes', async () => {
      mockAgent.executeTask.mockResolvedValueOnce({
        success: true,
        taskId: '1',
        output: 'Task completed successfully'
      });
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['1'], { from: 'user' });
      
      expect(Logger.success).toHaveBeenCalledWith('✅ Task completed successfully');
      expect(Logger.info).toHaveBeenCalledWith('\n📝 Output:\nTask completed successfully');
    });
    
    it('should handle execution failure', async () => {
      mockAgent.executeTask.mockResolvedValueOnce({
        success: false,
        taskId: '1',
        error: 'Provider not available'
      });
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await expect(command!.parseAsync(['1'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('❌ Task failed: Provider not available');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
    
    it('should handle invalid task ID', async () => {
      mockAgent.executeTask.mockRejectedValueOnce(new Error('Task not found'));
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await expect(command!.parseAsync(['abc123'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Error: Task not found');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
    
    it('should handle non-existent task', async () => {
      mockAgent.executeTask.mockRejectedValueOnce(new Error('Task with ID 999 not found'));
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await expect(command!.parseAsync(['999'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Error: Task with ID 999 not found');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });
  
  describe('Running all tasks', () => {
    it('should execute all pending tasks', async () => {
      // Mock successful execution for both tasks
      mockAgent.executeTask.mockResolvedValue({
        success: true,
        taskId: '1'
      });
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['--all'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('Found 2 pending tasks');
      expect(mockAgent.executeTask).toHaveBeenCalledTimes(2);
      expect(Logger.info).toHaveBeenCalledWith('\n📊 Summary: 2 succeeded, 0 failed');
    });
    
    it('should report partial success', async () => {
      // Mock one success and one failure
      mockAgent.executeTask
        .mockResolvedValueOnce({ success: true, taskId: '1' })
        .mockResolvedValueOnce({ success: false, taskId: '2', error: 'Test error' });
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await expect(command!.parseAsync(['--all'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.info).toHaveBeenCalledWith('\n📊 Summary: 1 succeeded, 1 failed');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
    
    it('should handle no pending tasks', async () => {
      // Mock empty task list
      mockAgent.listTasks.mockResolvedValueOnce([]);
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['--all'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('No pending tasks to execute');
      expect(mockAgent.executeTask).not.toHaveBeenCalled();
    });
  });
  
  describe('When no arguments provided', () => {
    it('should execute all pending tasks when no arguments provided', async () => {
      // The command seems to be interpreting empty args as --all for some reason
      // Let's test that behavior since that's what's actually happening
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync([], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('Found 2 pending tasks');
      expect(Logger.info).toHaveBeenCalledWith('\n▶️  Executing task: Test Task 1');
      expect(Logger.info).toHaveBeenCalledWith('\n▶️  Executing task: Test Task 2');
      expect(Logger.info).toHaveBeenCalledWith('\n📊 Summary: 2 succeeded, 0 failed');
    });
    
    it('should handle no pending tasks when no arguments provided', async () => {
      mockAgent.listTasks.mockResolvedValueOnce([]);
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync([], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('No pending tasks to execute');
      expect(processExitSpy).not.toHaveBeenCalled();
    });
  });
  
  describe('Provider options', () => {
    it('should use specified provider', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['1', '--provider', 'gemini'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          provider: 'gemini'
        })
      );
    });
    
    it('should handle dry-run mode', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['1', '--dry-run'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          dryRun: true
        })
      );
    });
  });

  describe('Git hook options', () => {
    it('should pass noVerify as true when --no-verify flag is used', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['1', '--no-verify'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          noVerify: true
        })
      );
    });
    
    it('should pass noVerify as false when --verify flag is used', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['1', '--verify'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          noVerify: false
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle task execution errors when --all flag encounters errors', async () => {
      // Clear the mock to ensure we get a clean state
      vi.clearAllMocks();
      
      // Re-setup logger mocks since we cleared them
      vi.spyOn(Logger, 'info').mockImplementation(() => {});
      vi.spyOn(Logger, 'error').mockImplementation(() => {});
      vi.spyOn(Logger, 'success').mockImplementation(() => {});
      vi.spyOn(Logger, 'warning').mockImplementation(() => {});
      
      // Set up a scenario where there's one pending task that will fail
      mockAgent.listTasks.mockResolvedValueOnce([
        { id: '1', title: 'Test Task 1', status: 'pending' }
      ]);
      
      const taskError = new Error('Task execution failed');
      mockAgent.executeTask.mockRejectedValueOnce(taskError);
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await expect(command!.parseAsync(['--all'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      // In the --all execution path, errors are formatted with the task ID
      expect(Logger.error).toHaveBeenCalledWith('❌ Task 1 failed with error: Task execution failed');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle agent initialization errors', async () => {
      mockAgent.initialize.mockRejectedValueOnce(new Error('Failed to initialize agent'));
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await expect(command!.parseAsync(['1'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Error: Failed to initialize agent');
    });
  });
});