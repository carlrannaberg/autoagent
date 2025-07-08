import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs/promises';
import { AutonomousAgent } from '../../../../src/core/autonomous-agent.js';
import { registerRunCommand } from '../../../../src/cli/commands/run.js';
import { Command } from 'commander';

// Mock dependencies
vi.mock('fs/promises');
vi.mock('../../../../src/core/autonomous-agent.js');
vi.mock('../../../../src/utils/logger.js', () => ({
  Logger: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    debug: vi.fn()
  }
}));

interface MockAgent {
  initialize: ReturnType<typeof vi.fn>;
  executeIssue: ReturnType<typeof vi.fn>;
  on: ReturnType<typeof vi.fn>;
}

describe('Run Command Range Functionality', () => {
  let program: Command;
  let mockAgent: MockAgent;

  beforeEach(() => {
    vi.clearAllMocks();
    program = new Command();
    registerRunCommand(program);
    
    mockAgent = {
      initialize: vi.fn().mockResolvedValue(undefined),
      executeIssue: vi.fn().mockResolvedValue({ success: true, issueNumber: 1, issueTitle: 'Test Issue' }),
      on: vi.fn()
    };
    
    vi.mocked(AutonomousAgent).mockImplementation(() => mockAgent);
    
    // Mock fs operations
    vi.mocked(fs.readdir).mockResolvedValue(['1-first-issue.md', '2-second-issue.md', '3-third-issue.md']);
    vi.mocked(fs.access).mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Range parsing', () => {
    it('should parse simple range correctly', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      try {
        await program.parseAsync(['node', 'test', 'run', '1-3'], { from: 'user' });
        
        expect(mockAgent.executeIssue).toHaveBeenCalledTimes(3);
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(1);
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(2);
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(3);
      } finally {
        process.exit = originalExit;
      }
    });

    it('should handle single-issue range', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      try {
        await program.parseAsync(['node', 'test', 'run', '2-2'], { from: 'user' });
        
        expect(mockAgent.executeIssue).toHaveBeenCalledTimes(1);
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(2);
      } finally {
        process.exit = originalExit;
      }
    });

    it('should reject invalid range where start > end', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      try {
        await program.parseAsync(['node', 'test', 'run', '5-3'], { from: 'user' });
        
        expect(exitSpy).toHaveBeenCalledWith(1);
        expect(mockAgent.executeIssue).not.toHaveBeenCalled();
      } finally {
        process.exit = originalExit;
      }
    });

    it('should reject invalid range format', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      try {
        await program.parseAsync(['node', 'test', 'run', '1-2-3'], { from: 'user' });
        
        expect(exitSpy).toHaveBeenCalledWith(1);
        expect(mockAgent.executeIssue).not.toHaveBeenCalled();
      } finally {
        process.exit = originalExit;
      }
    });
  });

  describe('Issue validation', () => {
    it('should validate all issues exist before execution', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      // Mock missing issue #4
      vi.mocked(fs.readdir).mockResolvedValue(['1-first-issue.md', '2-second-issue.md', '3-third-issue.md'] as never);

      try {
        await program.parseAsync(['node', 'test', 'run', '2-4'], { from: 'user' });
        
        expect(exitSpy).toHaveBeenCalledWith(1);
        expect(mockAgent.executeIssue).not.toHaveBeenCalled();
      } finally {
        process.exit = originalExit;
      }
    });

    it('should proceed when all issues exist', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      vi.mocked(fs.readdir).mockResolvedValue(['1-first-issue.md', '2-second-issue.md', '3-third-issue.md'] as never);

      try {
        await program.parseAsync(['node', 'test', 'run', '1-2'], { from: 'user' });
        
        expect(mockAgent.executeIssue).toHaveBeenCalledTimes(2);
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(1);
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(2);
        expect(exitSpy).not.toHaveBeenCalled();
      } finally {
        process.exit = originalExit;
      }
    });
  });

  describe('Execution handling', () => {
    it('should handle mixed success and failure results', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      mockAgent.executeIssue
        .mockResolvedValueOnce({ success: true, issueNumber: 1, issueTitle: 'Success' })
        .mockResolvedValueOnce({ success: false, issueNumber: 2, error: 'Failed' })
        .mockResolvedValueOnce({ success: true, issueNumber: 3, issueTitle: 'Success' });

      try {
        await program.parseAsync(['node', 'test', 'run', '1-3'], { from: 'user' });
        
        expect(exitSpy).toHaveBeenCalledWith(1);
        expect(mockAgent.executeIssue).toHaveBeenCalledTimes(3);
      } finally {
        process.exit = originalExit;
      }
    });

    it('should handle execution errors gracefully', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      mockAgent.executeIssue
        .mockResolvedValueOnce({ success: true, issueNumber: 1 })
        .mockRejectedValueOnce(new Error('Execution failed'))
        .mockResolvedValueOnce({ success: true, issueNumber: 3 });

      try {
        await program.parseAsync(['node', 'test', 'run', '1-3'], { from: 'user' });
        
        expect(exitSpy).toHaveBeenCalledWith(1);
        expect(mockAgent.executeIssue).toHaveBeenCalledTimes(3);
      } finally {
        process.exit = originalExit;
      }
    });

    it('should exit successfully when all issues complete successfully', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      mockAgent.executeIssue.mockResolvedValue({ success: true, issueNumber: 1, issueTitle: 'Success' });

      try {
        await program.parseAsync(['node', 'test', 'run', '1-2'], { from: 'user' });
        
        expect(mockAgent.executeIssue).toHaveBeenCalledTimes(2);
        expect(exitSpy).not.toHaveBeenCalled();
      } finally {
        process.exit = originalExit;
      }
    });
  });

  describe('Input detection', () => {
    it('should detect range format vs single number', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      try {
        // Single number should not be treated as range
        await program.parseAsync(['node', 'test', 'run', '5'], { from: 'user' });
        
        expect(mockAgent.executeIssue).toHaveBeenCalledTimes(1);
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(5);
      } finally {
        process.exit = originalExit;
      }
    });

    it('should detect range format vs issue filename', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      vi.mocked(fs.readdir).mockResolvedValue(['1-first-issue.md', '5-add-auth.md'] as never);

      try {
        // Issue filename should not be treated as range
        await program.parseAsync(['node', 'test', 'run', '5-add-auth'], { from: 'user' });
        
        expect(mockAgent.executeIssue).toHaveBeenCalledTimes(1);
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(5);
      } finally {
        process.exit = originalExit;
      }
    });
  });

  describe('Range boundaries', () => {
    it('should handle large ranges', async () => {
      const originalExit = process.exit;
      const exitSpy = vi.fn();
      process.exit = exitSpy as never;

      // Mock 10 issues
      const issues = Array.from({ length: 10 }, (_, i) => `${i + 1}-issue-${i + 1}.md`);
      vi.mocked(fs.readdir).mockResolvedValue(issues as never);

      mockAgent.executeIssue.mockResolvedValue({ success: true, issueNumber: 1 });

      try {
        await program.parseAsync(['node', 'test', 'run', '1-10'], { from: 'user' });
        
        expect(mockAgent.executeIssue).toHaveBeenCalledTimes(10);
        for (let i = 1; i <= 10; i++) {
          expect(mockAgent.executeIssue).toHaveBeenCalledWith(i);
        }
      } finally {
        process.exit = originalExit;
      }
    });
  });
});