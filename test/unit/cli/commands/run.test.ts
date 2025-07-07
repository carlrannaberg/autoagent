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
      bootstrap: vi.fn().mockResolvedValue(42),
      syncTodoWithIssues: vi.fn().mockResolvedValue(undefined),
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

  describe('Reflection options', () => {
    it('should disable reflection with --no-reflection flag', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--no-reflection'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          reflection: expect.objectContaining({ enabled: false })
        })
      );
    });
    
    it('should set reflection iterations with --reflection-iterations flag', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--reflection-iterations', '5'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          reflection: expect.objectContaining({ maxIterations: 5 })
        })
      );
    });
    
    it('should combine reflection options', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--reflection-iterations', '7'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          reflection: expect.objectContaining({ maxIterations: 7 })
        })
      );
    });
    
    it('should validate reflection iterations range', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      // Test value too low
      await expect(command!.parseAsync(['39', '--reflection-iterations', '0'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('--reflection-iterations must be between 1 and 10');
      expect(processExitSpy).toHaveBeenCalledWith(1);
      
      // Clear mocks for next test
      vi.clearAllMocks();
      
      // Test value too high
      await expect(command!.parseAsync(['39', '--reflection-iterations', '11'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('--reflection-iterations must be between 1 and 10');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
    
    it('should handle invalid reflection iterations input', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      // NaN will be returned by parseInt for non-numeric input
      await expect(command!.parseAsync(['39', '--reflection-iterations', 'abc'], { from: 'user' }))
        .rejects.toThrow('process.exit called');
      
      // Since parseInt returns NaN, the validation will fail
      expect(Logger.error).toHaveBeenCalledWith('Failed: Reflection config: maxIterations must be a positive integer');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });
    
    it('should use default reflection config when no reflection options are set', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          reflection: undefined // No reflection config passed, defaults are applied in constructor
        })
      );
    });
  });

  describe('Input Type Detection', () => {
    describe('isPlanFile() detection', () => {
      it('should detect spec/plan files when .md file has no issue marker', async () => {
        vi.mocked(fs.access).mockResolvedValue(undefined);
        vi.mocked(fs.readFile).mockResolvedValue('# Specification\n\nThis is a spec file without issue marker.');
        
        await program.parseAsync(['node', 'test', 'run', 'spec.md']);
        
        expect(Logger.info).toHaveBeenCalledWith('🔍 Detected spec/plan file: spec.md');
        expect(Logger.info).toHaveBeenCalledWith('🏗️  Bootstrapping project from spec file...');
        expect(mockAgent.bootstrap).toHaveBeenCalledWith(expect.stringContaining('spec.md'));
        expect(Logger.success).toHaveBeenCalledWith('✅ Bootstrap complete! Created decomposition issue #42');
        expect(Logger.info).toHaveBeenCalledWith('🚀 Executing decomposition issue #42...');
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(42);
        expect(Logger.success).toHaveBeenCalledWith('✅ Decomposition complete! ');
      });

      it('should handle issue files when .md file has issue marker', async () => {
        vi.mocked(fs.access).mockResolvedValue(undefined);
        vi.mocked(fs.readFile).mockResolvedValue('# Issue 42: Test Issue\n\nThis is an issue file.');
        vi.mocked(fs.readdir).mockResolvedValue(['42-test-issue.md'] as any);
        
        mockAgent.executeIssue.mockResolvedValue({ success: true });
        
        await program.parseAsync(['node', 'test', 'run', '42-test-issue.md']);
        
        expect(mockAgent.executeIssue).toHaveBeenCalledWith(42);
      });

      it('should detect spec files with different issue marker formats', async () => {
        const testCases = [
          { marker: '# Issue 1: Title', isIssue: true }, // Standard format
          { marker: '#Issue 1: Title', isIssue: false }, // No space after # - not detected as issue
          { marker: '# Issue  1: Title', isIssue: true }, // Extra spaces
          { marker: '# Issue 1 : Title', isIssue: false }, // Space before colon - not detected as issue
          { marker: '# ISSUE 1: Title', isIssue: false }, // Capital letters - not detected
          { marker: '# issue 1: Title', isIssue: false }, // Lowercase - not detected
        ];

        for (const testCase of testCases) {
          // Reset all mocks before each iteration
          vi.clearAllMocks();
          mockAgent.bootstrap.mockResolvedValue(42);
          mockAgent.executeIssue.mockResolvedValue({ success: true });
          
          vi.mocked(fs.access).mockResolvedValue(undefined);
          vi.mocked(fs.readFile).mockResolvedValue(`${testCase.marker}\n\nContent`);
          vi.mocked(fs.readdir).mockResolvedValue(['1-test.md'] as any);
          
          const command = program.commands.find(cmd => cmd.name() === 'run');
          await command!.parseAsync(['test.md'], { from: 'user' });
          
          if (testCase.isIssue) {
            // Should be treated as issue file, not spec file
            expect(mockAgent.bootstrap).not.toHaveBeenCalled();
            expect(mockAgent.executeIssue).toHaveBeenCalledWith(1); // extracted from filename
          } else {
            // Should be treated as spec file
            expect(mockAgent.bootstrap).toHaveBeenCalled();
            expect(mockAgent.executeIssue).toHaveBeenCalledWith(42); // decomposition issue
          }
        }
      });

      it('should treat empty files as spec files', async () => {
        vi.mocked(fs.access).mockResolvedValue(undefined);
        vi.mocked(fs.readFile).mockResolvedValue('');
        
        await program.parseAsync(['node', 'test', 'run', 'empty.md']);
        
        expect(Logger.info).toHaveBeenCalledWith('🔍 Detected spec/plan file: empty.md');
        expect(mockAgent.bootstrap).toHaveBeenCalledWith(expect.stringContaining('empty.md'));
      });

      it('should handle file read errors gracefully', async () => {
        vi.mocked(fs.access).mockResolvedValue(undefined);
        vi.mocked(fs.readFile).mockRejectedValue(new Error('Permission denied'));
        
        // When readFile fails, isPlanFile returns false, so it tries to process as issue
        vi.mocked(fs.readdir).mockResolvedValue(['test.md'] as any);
        
        await expect(program.parseAsync(['node', 'test', 'run', 'test.md'])).rejects.toThrow('process.exit called');
        
        // The error message changed in the implementation
        expect(Logger.error).toHaveBeenCalledWith('Cannot extract issue number from: test');
      });

      it('should handle files with only whitespace and newlines as spec files', async () => {
        vi.mocked(fs.access).mockResolvedValue(undefined);
        vi.mocked(fs.readFile).mockResolvedValue('\n\n  \n\t\n');
        
        await program.parseAsync(['node', 'test', 'run', 'whitespace.md']);
        
        expect(Logger.info).toHaveBeenCalledWith('🔍 Detected spec/plan file: whitespace.md');
        expect(mockAgent.bootstrap).toHaveBeenCalledWith(expect.stringContaining('whitespace.md'));
      });
    });

    describe('Routing logic', () => {
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
        
        await program.parseAsync(['node', 'test', 'run', absolutePath]);
        
        expect(fs.readFile).toHaveBeenCalledWith(absolutePath, 'utf-8');
        expect(Logger.info).toHaveBeenCalledWith(`🔍 Detected spec/plan file: ${absolutePath}`);
        expect(mockAgent.bootstrap).toHaveBeenCalledWith(absolutePath);
      });

      it('should handle relative paths for spec files', async () => {
        vi.mocked(fs.access).mockResolvedValue(undefined);
        vi.mocked(fs.readFile).mockResolvedValue('# My Spec\n\nNo issue marker.');
        
        await program.parseAsync(['node', 'test', 'run', '../specs/myspec.md']);
        
        expect(Logger.info).toHaveBeenCalledWith('🔍 Detected spec/plan file: ../specs/myspec.md');
        expect(mockAgent.bootstrap).toHaveBeenCalledWith(expect.stringContaining('specs/myspec.md'));
      });
    });
  });

  describe('Spec File Execution Flow', () => {
    it('should execute complete spec → bootstrap → execute flow', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Product Spec\n\nBuild a new feature.');
      
      mockAgent.bootstrap.mockResolvedValue(100);
      mockAgent.executeIssue.mockResolvedValue({
        success: true,
        issueNumber: 100,
        issueTitle: 'Decompose product spec'
      });
      
      await program.parseAsync(['node', 'test', 'run', 'product-spec.md']);
      
      // Verify the flow
      expect(Logger.info).toHaveBeenCalledWith('🔍 Detected spec/plan file: product-spec.md');
      expect(Logger.info).toHaveBeenCalledWith('🏗️  Bootstrapping project from spec file...');
      expect(mockAgent.bootstrap).toHaveBeenCalledWith(expect.stringContaining('product-spec.md'));
      expect(Logger.success).toHaveBeenCalledWith('✅ Bootstrap complete! Created decomposition issue #100');
      expect(Logger.info).toHaveBeenCalledWith('🚀 Executing decomposition issue #100...');
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(100);
      expect(Logger.success).toHaveBeenCalledWith('✅ Decomposition complete! Decompose product spec');
    });

    it('should handle spec file with --all flag', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Feature Spec\n\nImplement multiple features.');
      
      mockAgent.bootstrap.mockResolvedValue(50);
      mockAgent.executeIssue.mockResolvedValue({
        success: true,
        issueNumber: 50,
        issueTitle: 'Decompose feature spec'
      });
      mockAgent.executeAll.mockResolvedValue([
        { success: true, issueNumber: 51 },
        { success: true, issueNumber: 52 },
        { success: true, issueNumber: 53 }
      ]);
      
      await program.parseAsync(['node', 'test', 'run', 'feature-spec.md', '--all']);
      
      // Verify bootstrap and decomposition
      expect(mockAgent.bootstrap).toHaveBeenCalledWith(expect.stringContaining('feature-spec.md'));
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(50);
      
      // Verify --all continues after decomposition
      expect(Logger.info).toHaveBeenCalledWith('📋 Continuing with all created issues...');
      expect(mockAgent.executeAll).toHaveBeenCalled();
      expect(Logger.success).toHaveBeenCalledWith('🎉 All 3 issues completed successfully!');
    });

    it('should handle bootstrap failure', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Bad Spec\n\nInvalid specification.');
      
      mockAgent.bootstrap.mockRejectedValue(new Error('Bootstrap failed: Invalid spec format'));
      
      await expect(program.parseAsync(['node', 'test', 'run', 'bad-spec.md'])).rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('❌ Bootstrap failed: Bootstrap failed: Invalid spec format');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle decomposition failure', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Spec\n\nTest spec.');
      
      mockAgent.bootstrap.mockResolvedValue(60);
      mockAgent.executeIssue.mockResolvedValue({
        success: false,
        issueNumber: 60,
        error: 'Provider unavailable'
      });
      
      await expect(program.parseAsync(['node', 'test', 'run', 'test-spec.md'])).rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('❌ Decomposition failed: Provider unavailable');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle partial failure with --all flag', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Spec\n\nTest spec.');
      
      mockAgent.bootstrap.mockResolvedValue(70);
      mockAgent.executeIssue.mockResolvedValue({
        success: true,
        issueNumber: 70
      });
      mockAgent.executeAll.mockResolvedValue([
        { success: true, issueNumber: 71 },
        { success: false, issueNumber: 72, error: 'Failed' },
        { success: true, issueNumber: 73 }
      ]);
      
      await expect(program.parseAsync(['node', 'test', 'run', 'test-spec.md', '--all'])).rejects.toThrow('process.exit called');
      
      expect(Logger.warning).toHaveBeenCalledWith('⚠️  Completed 2 issues, 1 failed');
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle malformed spec files', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('Not a valid markdown file\x00\x01\x02');
      
      mockAgent.bootstrap.mockRejectedValue(new Error('Invalid markdown format'));
      
      await expect(program.parseAsync(['node', 'test', 'run', 'malformed.md'])).rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('❌ Bootstrap failed: Invalid markdown format');
    });

    it('should handle spec files in different locations', async () => {
      const testPaths = [
        './spec.md',
        'specs/feature.md',
        '../parent/spec.md',
        'deep/nested/path/to/spec.md'
      ];
      
      for (const testPath of testPaths) {
        vi.clearAllMocks();
        vi.mocked(fs.access).mockResolvedValue(undefined);
        vi.mocked(fs.readFile).mockResolvedValue('# Spec\n\nContent');
        mockAgent.bootstrap.mockResolvedValue(80);
        mockAgent.executeIssue.mockResolvedValue({ success: true });
        
        const command = program.commands.find(cmd => cmd.name() === 'run');
        await command!.parseAsync([testPath], { from: 'user' });
        
        // For relative paths, expect them to be resolved relative to workspace
        if (testPath.startsWith('../')) {
          // Parent path gets resolved to absolute path
          expect(mockAgent.bootstrap).toHaveBeenCalled();
          const callArg = mockAgent.bootstrap.mock.calls[0][0];
          expect(callArg).toContain('parent/spec.md');
        } else {
          expect(mockAgent.bootstrap).toHaveBeenCalledWith(expect.stringContaining(testPath.replace('./', '')));
        }
      }
    });
  });

  describe('Git hook flags', () => {
    it('should pass noVerify as true when --no-verify flag is used', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--no-verify'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          noVerify: true
        })
      );
    });
    
    it('should pass noVerify as false when --verify flag is used', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--verify'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          noVerify: false
        })
      );
    });
    
    it('should not pass noVerify when neither flag is used', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          noVerify: undefined
        })
      );
    });
    
    it('should handle conflicting --verify and --no-verify flags', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--verify', '--no-verify'], { from: 'user' });
      
      expect(Logger.warning).toHaveBeenCalledWith('Both --verify and --no-verify flags provided. Using --no-verify.');
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          noVerify: true
        })
      );
    });
    
    it('should work with other flags like --all and --no-verify', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['--all', '--no-verify'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          noVerify: true
        })
      );
      expect(mockAgent.executeAll).toHaveBeenCalled();
    });
    
    it('should work with other flags like --provider and --verify', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--provider', 'gemini', '--verify'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          provider: 'gemini',
          noVerify: false
        })
      );
    });
  });

  describe('Git push flags', () => {
    it('should pass autoPush as true when --push flag is used', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--push'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: true,
          autoCommit: true // --push implies --commit
        })
      );
    });
    
    it('should pass autoPush as false when --no-push flag is used', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--no-push'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: false
        })
      );
    });
    
    it('should not pass autoPush when neither flag is used', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: undefined
        })
      );
    });
    
    it('should handle conflicting --push and --no-push flags', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--push', '--no-push'], { from: 'user' });
      
      expect(Logger.warning).toHaveBeenCalledWith('Both --push and --no-push flags provided. Using --no-push.');
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: false
        })
      );
    });
    
    it('should set autoCommit to true when --push is used even without --commit', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--push'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: true,
          autoCommit: true
        })
      );
    });
    
    it('should keep autoCommit true when --push is used with --no-commit', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--push', '--no-commit'], { from: 'user' });
      
      expect(Logger.info).toHaveBeenCalledWith('Note: --push implies --commit. Auto-commit has been enabled.');
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: true,
          autoCommit: true
        })
      );
    });
    
    it('should work with other flags like --all and --push', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['--all', '--push'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: true,
          autoCommit: true
        })
      );
      expect(mockAgent.executeAll).toHaveBeenCalled();
    });
    
    it('should work with --push and --verify flags together', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['39', '--push', '--verify'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: true,
          autoCommit: true,
          noVerify: false
        })
      );
    });
    
    it('should work with specific issue number and --no-push', async () => {
      const command = program.commands.find(cmd => cmd.name() === 'run');
      
      await command!.parseAsync(['42', '--no-push'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: false
        })
      );
      expect(mockAgent.executeIssue).toHaveBeenCalledWith(42);
    });
    
    it('should handle bootstrap with --push flag', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Test Spec\n\nTest content');
      mockAgent.bootstrap.mockResolvedValue(1);
      
      const command = program.commands.find(cmd => cmd.name() === 'run');
      await command!.parseAsync(['spec.md', '--push'], { from: 'user' });
      
      expect(AutonomousAgent).toHaveBeenCalledWith(
        expect.objectContaining({
          autoPush: true,
          autoCommit: true
        })
      );
      expect(mockAgent.bootstrap).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle permission errors when accessing spec files', async () => {
      const error = new Error('EACCES: permission denied');
      (error as any).code = 'EACCES';
      vi.mocked(fs.access).mockRejectedValue(error);
      
      await expect(program.parseAsync(['node', 'test', 'run', 'protected.md'])).rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('File not found: protected.md');
    });

    it('should handle interrupt during bootstrap', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Spec\n\nContent');
      
      const abortError = new Error('Operation aborted');
      (abortError as any).name = 'AbortError';
      mockAgent.bootstrap.mockRejectedValue(abortError);
      
      await expect(program.parseAsync(['node', 'test', 'run', 'spec.md'])).rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('❌ Bootstrap failed: Operation aborted');
    });

    it('should handle interrupt during decomposition', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Spec\n\nContent');
      
      mockAgent.bootstrap.mockResolvedValue(90);
      
      const abortError = new Error('Operation aborted');
      (abortError as any).name = 'AbortError';
      mockAgent.executeIssue.mockRejectedValue(abortError);
      
      await expect(program.parseAsync(['node', 'test', 'run', 'spec.md'])).rejects.toThrow();
    });

    it('should handle network errors during bootstrap', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);
      vi.mocked(fs.readFile).mockResolvedValue('# Spec\n\nContent');
      
      const networkError = new Error('Network request failed');
      (networkError as any).code = 'ENOTFOUND';
      mockAgent.bootstrap.mockRejectedValue(networkError);
      
      await expect(program.parseAsync(['node', 'test', 'run', 'spec.md'])).rejects.toThrow('process.exit called');
      
      expect(Logger.error).toHaveBeenCalledWith('❌ Bootstrap failed: Network request failed');
    });
  });
});