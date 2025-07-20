import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Command } from 'commander';
import { registerCreateCommand } from '@/cli/commands/create';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { Logger } from '@/utils/logger';
import { InMemorySTMManager } from '../../../helpers/test-doubles/in-memory-stm-manager';
import type { TaskContent } from '@/types/stm-types';

// Mock modules
vi.mock('@/core/autonomous-agent');
vi.mock('@/utils/logger');

describe('Create Command', () => {
  let program: Command;
  let mockAgent: {
    initialize: ReturnType<typeof vi.fn>;
    createTask: ReturnType<typeof vi.fn>;
  };
  let mockStmManager: InMemorySTMManager;
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
    
    // Create in-memory STM manager
    mockStmManager = new InMemorySTMManager();
    
    // Mock AutonomousAgent
    mockAgent = {
      initialize: vi.fn().mockResolvedValue(undefined),
      createTask: vi.fn().mockResolvedValue('42')
    };
    vi.mocked(AutonomousAgent).mockImplementation(() => mockAgent);
    
    registerCreateCommand(program);
  });
  
  afterEach(() => {
    processExitSpy.mockRestore();
  });
  
  describe('Basic task creation', () => {
    it('should create a task with required title', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      expect(command).toBeDefined();
      
      await command!.parseAsync(['--title', 'Test Task'], { from: 'user' });
      
      expect(mockAgent.initialize).toHaveBeenCalled();
      expect(mockAgent.createTask).toHaveBeenCalledWith('Test Task', {
        description: 'No description provided',
        technicalDetails: '',
        implementationPlan: '',
        acceptanceCriteria: [],
        testingStrategy: undefined,
        tags: undefined
      });
      expect(Logger.success).toHaveBeenCalledWith('✅ Created task: 42');
      expect(Logger.info).toHaveBeenCalledWith('Title: Test Task');
    });

    it('should require title parameter', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await expect(command!.parseAsync([], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Task title is required');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should require non-empty title', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await expect(command!.parseAsync(['--title', ''], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Task title is required');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('Task creation with all options', () => {
    it('should create a task with all available options', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync([
        '--title', 'Complex Task',
        '--description', 'A comprehensive task description',
        '--acceptance', 'Criteria 1',
        '--acceptance', 'Criteria 2',
        '--details', 'Technical implementation details',
        '--plan', 'Step by step implementation plan',
        '--testing', 'Unit tests and integration tests',
        '--tags', 'feature,backend,api'
      ], { from: 'user' });
      
      expect(mockAgent.createTask).toHaveBeenCalledWith('Complex Task', {
        description: 'A comprehensive task description',
        technicalDetails: 'Technical implementation details',
        implementationPlan: 'Step by step implementation plan',
        acceptanceCriteria: ['Criteria 1', 'Criteria 2'],
        testingStrategy: 'Unit tests and integration tests',
        tags: ['feature', 'backend', 'api']
      });
      
      expect(Logger.success).toHaveBeenCalledWith('✅ Created task: 42');
      expect(Logger.info).toHaveBeenCalledWith('Tags: feature, backend, api');
    });

    it('should handle multiple acceptance criteria', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync([
        '--title', 'Task with Multiple Criteria',
        '-a', 'First criteria',
        '-a', 'Second criteria',
        '-a', 'Third criteria'
      ], { from: 'user' });
      
      expect(mockAgent.createTask).toHaveBeenCalledWith('Task with Multiple Criteria', 
        expect.objectContaining({
          acceptanceCriteria: ['First criteria', 'Second criteria', 'Third criteria']
        })
      );
    });

    it('should parse comma-separated tags correctly', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync([
        '--title', 'Tagged Task',
        '--tags', 'urgent, feature, api'
      ], { from: 'user' });
      
      expect(mockAgent.createTask).toHaveBeenCalledWith('Tagged Task', 
        expect.objectContaining({
          tags: ['urgent', 'feature', 'api']
        })
      );
    });

    it('should handle empty tags gracefully', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync([
        '--title', 'Task Without Tags',
        '--tags', ''
      ], { from: 'user' });
      
      expect(mockAgent.createTask).toHaveBeenCalledWith('Task Without Tags', 
        expect.objectContaining({
          tags: undefined
        })
      );
    });
  });

  describe('Provider and workspace options', () => {
    it('should use specified provider', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync([
        '--title', 'Test Task',
        '--provider', 'gemini'
      ], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith({
        provider: 'gemini',
        workspace: undefined
      });
    });

    it('should use specified workspace', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync([
        '--title', 'Test Task',
        '--workspace', '/custom/workspace'
      ], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith({
        provider: undefined,
        workspace: '/custom/workspace'
      });
    });

    it('should use both provider and workspace', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync([
        '--title', 'Test Task',
        '--provider', 'claude',
        '--workspace', '/my/project'
      ], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith({
        provider: 'claude',
        workspace: '/my/project'
      });
    });
  });

  describe('Error handling', () => {
    it('should handle agent initialization failure', async () => {
      mockAgent.initialize.mockRejectedValueOnce(new Error('Failed to initialize'));
      
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await expect(command!.parseAsync(['--title', 'Test Task'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed: Failed to initialize');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle task creation failure', async () => {
      mockAgent.createTask.mockRejectedValueOnce(new Error('STM error'));
      
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await expect(command!.parseAsync(['--title', 'Test Task'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed: STM error');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle non-Error exceptions', async () => {
      mockAgent.createTask.mockRejectedValueOnce('String error');
      
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await expect(command!.parseAsync(['--title', 'Test Task'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('Failed: String error');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('Output messages', () => {
    it('should show run instructions after successful creation', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync(['--title', 'New Task'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('\nRun with the task ID to execute:');
      expect(Logger.info).toHaveBeenCalledWith('  autoagent run 42');
    });

    it('should not display tags if none provided', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync(['--title', 'Simple Task'], { from: 'user' });
      
      const tagsCalls = vi.mocked(Logger.info).mock.calls
        .filter(call => call[0]?.includes('Tags:'));
      expect(tagsCalls).toHaveLength(0);
    });

    it('should display tags when provided', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync([
        '--title', 'Tagged Task',
        '--tags', 'test,feature'
      ], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('Tags: test, feature');
    });
  });

  describe('Short flag aliases', () => {
    it('should support short flags', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'create');
      
      await command!.parseAsync([
        '-t', 'Short Flag Task',
        '-d', 'Short description',
        '-a', 'Short criteria',
        '-p', 'gemini',
        '-w', '/workspace'
      ], { from: 'user' });
      
      expect(mockAgent.createTask).toHaveBeenCalledWith('Short Flag Task', 
        expect.objectContaining({
          description: 'Short description',
          acceptanceCriteria: ['Short criteria']
        })
      );
      
      expect(AutonomousAgent).toHaveBeenCalledWith({
        provider: 'gemini',
        workspace: '/workspace'
      });
    });
  });
});