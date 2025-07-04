import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import { FileManager } from '@/utils/file-manager';
import { Issue, Plan } from '@/types';

vi.mock('fs/promises');

describe('FileManager', () => {
  let fileManager: FileManager;
  const mockWorkspace = '/test/workspace';
  
  beforeEach(() => {
    vi.clearAllMocks();
    fileManager = new FileManager(mockWorkspace);
  });
  
  describe('ensureDirectories', () => {
    it('should create issues and plans directories', async () => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue([]);
      
      // Call private method through a public method
      await fileManager.getNextIssueNumber();
      
      expect(fs.mkdir).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'issues'),
        { recursive: true }
      );
      expect(fs.mkdir).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'plans'),
        { recursive: true }
      );
    });
  });
  
  describe('getNextIssueNumber', () => {
    it('should return 1 for empty directory', async () => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.readdir as ReturnType<typeof vi.fn>).mockRejectedValue({ code: 'ENOENT' });
      
      const result = await fileManager.getNextIssueNumber();
      
      expect(result).toBe(1);
    });
    
    it('should return next number based on existing issues', async () => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue([
        '1-first-issue.md',
        '2-second-issue.md',
        '5-fifth-issue.md',
        'not-an-issue.txt'
      ]);
      
      const result = await fileManager.getNextIssueNumber();
      
      expect(result).toBe(6);
    });
  });
  
  describe('createIssue', () => {
    it('should create issue file with correct content', async () => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      const issue: Issue = {
        number: 1,
        title: 'Test Issue',
        file: '',
        requirements: 'Test requirement',
        acceptanceCriteria: ['Criteria 1', 'Criteria 2'],
        technicalDetails: 'Technical details',
        resources: ['Resource 1', 'Resource 2']
      };
      
      const filepath = await fileManager.createIssue(issue);
      
      expect(filepath).toBe(path.join(mockWorkspace, 'issues', '1-test-issue.md'));
      expect(fs.writeFile).toHaveBeenCalledWith(
        filepath,
        expect.stringContaining('# Issue 1: Test Issue'),
        'utf-8'
      );
    });

    it('should handle special characters and dots in titles correctly', async () => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      // Test various problematic titles
      const testCases = [
        { 
          title: 'Implement plan from vitest-migration',
          expected: '1-implement-plan-from-vitest-migration.md'
        },
        {
          title: 'Fix issue with config.json parsing',
          expected: '2-fix-issue-with-config-json-parsing.md'
        },
        {
          title: 'Add test.spec.ts files',
          expected: '3-add-test-spec-ts-files.md'
        },
        {
          title: 'Handle .env file loading',
          expected: '4-handle-env-file-loading.md'
        },
        {
          title: 'Special chars: !@#$%^&*()',
          expected: '5-special-chars.md'
        }
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        if (testCase) {
          const issueNumber = i + 1;
          
          const filepath = await fileManager.createIssue(issueNumber, testCase.title, 'test content');
          
          expect(filepath).toBe(path.join(mockWorkspace, 'issues', testCase.expected));
        }
      }
    });

    it('should create issue with CLI signature (number, title, content)', async () => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      const filepath = await fileManager.createIssue(1, 'Test CLI Issue', 'Content here');
      
      expect(filepath).toBe(path.join(mockWorkspace, 'issues', '1-test-cli-issue.md'));
      expect(fs.writeFile).toHaveBeenCalledWith(
        filepath,
        'Content here',
        'utf-8'
      );
    });
  });
  
  describe('readIssue', () => {
    it('should parse issue file correctly', async () => {
      const issueContent = `# Issue 1: Test Issue

## Requirements
Test requirement

## Acceptance Criteria
- [x] Criteria 1
- [ ] Criteria 2

## Technical Details
Technical details

## Resources
- Resource 1
- Resource 2`;
      
      (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue(issueContent);
      
      const result = await fileManager.readIssue('/test/issue.md');
      
      expect(result).toEqual({
        number: 1,
        title: 'Test Issue',
        file: '/test/issue.md',
        requirements: 'Test requirement',
        acceptanceCriteria: ['Criteria 1', 'Criteria 2'],
        technicalDetails: 'Technical details',
        resources: ['Resource 1', 'Resource 2']
      });
    });
    
    it('should return null for non-existent file', async () => {
      (fs.readFile as ReturnType<typeof vi.fn>).mockRejectedValue({ code: 'ENOENT' });
      
      const result = await fileManager.readIssue('/test/nonexistent.md');
      
      expect(result).toBeNull();
    });
  });
  
  describe('createPlan', () => {
    it('should create plan file with title-based naming when issueTitle is provided', async () => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      const plan: Plan = {
        issueNumber: 1,
        file: '',
        phases: [
          {
            name: 'Phase 1',
            tasks: ['Task 1', 'Task 2']
          }
        ],
        technicalApproach: 'Technical approach',
        challenges: ['Challenge 1']
      };
      
      const filepath = await fileManager.createPlan(1, plan, 'Test Issue');
      
      expect(filepath).toBe(path.join(mockWorkspace, 'plans', '1-test-issue-plan.md'));
      expect(fs.writeFile).toHaveBeenCalledWith(
        filepath,
        expect.stringContaining('# Plan for Issue 1: Test Issue'),
        'utf-8'
      );
    });

    it('should create plan file with numeric naming when issueTitle is not provided', async () => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      const plan: Plan = {
        issueNumber: 2,
        file: '',
        phases: [
          {
            name: 'Phase 1',
            tasks: ['Task 1']
          }
        ]
      };
      
      const filepath = await fileManager.createPlan(2, plan);
      
      expect(filepath).toBe(path.join(mockWorkspace, 'plans', '2-plan.md'));
      expect(fs.writeFile).toHaveBeenCalledWith(
        filepath,
        expect.stringContaining('# Plan for Issue 2'),
        'utf-8'
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        filepath,
        expect.not.stringContaining('# Plan for Issue 2:'),
        'utf-8'
      );
    });

    it('should match issue filename format when title is provided', async () => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      const plan: Plan = {
        issueNumber: 1,
        file: '',
        phases: [
          {
            name: 'Implementation',
            tasks: ['Implement feature']
          }
        ]
      };
      
      // Create plan with title that should match issue filename format
      const filepath = await fileManager.createPlan(1, plan, 'Implement User Authentication');
      
      // Expected format: 1-implement-user-authentication-plan.md
      // This should match the issue file: 1-implement-user-authentication.md
      expect(filepath).toBe(path.join(mockWorkspace, 'plans', '1-implement-user-authentication-plan.md'));
      expect(fs.writeFile).toHaveBeenCalledWith(
        filepath,
        expect.stringContaining('# Plan for Issue 1: Implement User Authentication'),
        'utf-8'
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        filepath,
        expect.stringContaining('issues/1-implement-user-authentication.md'),
        'utf-8'
      );
    });
  });
  
  describe('readTodoList', () => {
    it('should parse todo list correctly', async () => {
      const todoContent = `# To-Do

## Pending Issues
- [ ] Issue 1
- [ ] Issue 2

## Completed Issues
- [x] Issue 3`;
      
      (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue(todoContent);
      
      const result = await fileManager.readTodoList();
      
      expect(result).toEqual([
        '- [ ] Issue 1',
        '- [ ] Issue 2',
        '- [x] Issue 3'
      ]);
    });
    
    it('should return empty array for non-existent file', async () => {
      (fs.readFile as ReturnType<typeof vi.fn>).mockRejectedValue({ code: 'ENOENT' });
      
      const result = await fileManager.readTodoList();
      
      expect(result).toEqual([]);
    });
  });
  
  describe('updateTodoList', () => {
    it('should write todo list with correct format', async () => {
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      const todos = [
        '- [ ] Issue 1',
        '- [x] Issue 2'
      ];
      
      await fileManager.updateTodoList(todos);
      
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'TODO.md'),
        expect.stringContaining('## Pending Issues\n- [ ] Issue 1'),
        'utf-8'
      );
    });
  });
  
  describe('readProviderInstructions', () => {
    it('should read provider instructions file', async () => {
      (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('Claude instructions');
      
      const result = await fileManager.readProviderInstructions('CLAUDE');
      
      expect(result).toBe('Claude instructions');
      expect(fs.readFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'AGENT.md'),
        'utf-8'
      );
    });
    
    it('should return empty string for non-existent file', async () => {
      (fs.readFile as ReturnType<typeof vi.fn>).mockRejectedValue({ code: 'ENOENT' });
      
      const result = await fileManager.readProviderInstructions('GEMINI');
      
      expect(result).toBe('');
    });
  });
  
  describe('createProviderInstructionsIfMissing', () => {
    it('should create missing instruction files', async () => {
      (fs.access as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Not found'));
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.symlink as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      await fileManager.createProviderInstructionsIfMissing();
      
      // Should create AGENT.md and try to create symlinks for CLAUDE.md and GEMINI.md
      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'AGENT.md'),
        expect.stringContaining('# Agent Instructions'),
        'utf-8'
      );
      
      // Should attempt to create symlinks
      expect(fs.symlink).toHaveBeenCalledTimes(2);
      expect(fs.symlink).toHaveBeenCalledWith('AGENT.md', path.join(mockWorkspace, 'CLAUDE.md'));
      expect(fs.symlink).toHaveBeenCalledWith('AGENT.md', path.join(mockWorkspace, 'GEMINI.md'));
    });
    
    it('should not create existing files', async () => {
      (fs.access as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      await fileManager.createProviderInstructionsIfMissing();
      
      expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it('should create stub files when symlinks fail', async () => {
      (fs.access as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Not found'));
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.symlink as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Symlinks not supported'));
      
      await fileManager.createProviderInstructionsIfMissing();
      
      // Should create AGENT.md plus stub files for CLAUDE.md and GEMINI.md
      expect(fs.writeFile).toHaveBeenCalledTimes(3);
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'AGENT.md'),
        expect.stringContaining('# Agent Instructions'),
        'utf-8'
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'CLAUDE.md'),
        expect.stringContaining('# Claude Instructions'),
        'utf-8'
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'GEMINI.md'),
        expect.stringContaining('# Gemini Instructions'),
        'utf-8'
      );
    });
  });

  describe('readFile', () => {
    it('should read file with relative path', async () => {
      (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('file content');
      
      const content = await fileManager.readFile('test.md');
      
      expect(fs.readFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'test.md'),
        'utf-8'
      );
      expect(content).toBe('file content');
    });

    it('should read file with absolute path', async () => {
      (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('file content');
      
      const absolutePath = '/absolute/path/test.md';
      const content = await fileManager.readFile(absolutePath);
      
      expect(fs.readFile).toHaveBeenCalledWith(absolutePath, 'utf-8');
      expect(content).toBe('file content');
    });
  });

  describe('writeFile', () => {
    it('should write file with relative path', async () => {
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      await fileManager.writeFile('test.md', 'content');
      
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'test.md'),
        'content',
        'utf-8'
      );
    });

    it('should write file with absolute path', async () => {
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      
      const absolutePath = '/absolute/path/test.md';
      await fileManager.writeFile(absolutePath, 'content');
      
      expect(fs.writeFile).toHaveBeenCalledWith(absolutePath, 'content', 'utf-8');
    });
  });

  describe('generateFileSlug (via createIssue)', () => {
    beforeEach(() => {
      (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      (fs.writeFile as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    });

    it('should handle common cases correctly', async () => {
      const testCases = [
        { title: 'Implement User Authentication', expected: '1-implement-user-authentication.md' },
        { title: 'Fix Bug #123', expected: '2-fix-bug-123.md' },
        { title: 'Add New Feature', expected: '3-add-new-feature.md' },
        { title: 'Update Documentation', expected: '4-update-documentation.md' },
        { title: 'Refactor Code Base', expected: '5-refactor-code-base.md' }
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        if (testCase) {
          const filepath = await fileManager.createIssue(i + 1, testCase.title, 'content');
          expect(filepath).toBe(path.join(mockWorkspace, 'issues', testCase.expected));
        }
      }
    });

    it('should handle edge cases with special characters', async () => {
      const testCases = [
        { title: 'Fix Bug!!! @#$%^&*()', expected: '1-fix-bug.md' },
        { title: 'Feature...Test', expected: '2-feature-test.md' },
        { title: 'Multiple   Spaces   Between', expected: '3-multiple-spaces-between.md' },
        { title: '---Leading-And-Trailing-Hyphens---', expected: '4-leading-and-trailing-hyphens.md' },
        { title: '...Multiple...Dots...', expected: '5-multiple-dots.md' }
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        if (testCase) {
          const filepath = await fileManager.createIssue(i + 1, testCase.title, 'content');
          expect(filepath).toBe(path.join(mockWorkspace, 'issues', testCase.expected));
        }
      }
    });

    it('should handle edge cases with dots and hyphens', async () => {
      const testCases = [
        { title: 'file.config.json', expected: '1-file-config-json.md' },
        { title: 'feature-with-hyphens', expected: '2-feature-with-hyphens.md' },
        { title: 'test...multiple...dots', expected: '3-test-multiple-dots.md' },
        { title: 'mixed---hyphens---test', expected: '4-mixed-hyphens-test.md' },
        { title: '.startWithDot', expected: '5-startwithdot.md' }
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        if (testCase) {
          const filepath = await fileManager.createIssue(i + 1, testCase.title, 'content');
          expect(filepath).toBe(path.join(mockWorkspace, 'issues', testCase.expected));
        }
      }
    });

    it('should handle empty and whitespace-only strings', async () => {
      const testCases = [
        { title: '', expected: '1-.md' },
        { title: '   ', expected: '2-.md' },
        { title: '\t\n', expected: '3-.md' }
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        if (testCase) {
          const filepath = await fileManager.createIssue(i + 1, testCase.title, 'content');
          expect(filepath).toBe(path.join(mockWorkspace, 'issues', testCase.expected));
        }
      }
    });

    it('should handle unicode and non-ASCII characters', async () => {
      const testCases = [
        { title: 'Café Implementation', expected: '1-caf-implementation.md' },
        { title: 'Unicode 你好 Test', expected: '2-unicode-test.md' },
        { title: 'Emoji 😀 Feature', expected: '3-emoji-feature.md' },
        { title: 'Résumé Parser', expected: '4-rsum-parser.md' }
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        if (testCase) {
          const filepath = await fileManager.createIssue(i + 1, testCase.title, 'content');
          expect(filepath).toBe(path.join(mockWorkspace, 'issues', testCase.expected));
        }
      }
    });

    it('should handle very long titles', async () => {
      const longTitle = 'This is a very long title that goes on and on and on with many words to test how the slug generation handles extremely long inputs that might need to be processed';
      const expectedSlug = '1-this-is-a-very-long-title-that-goes-on-and-on-and-on-with-many-words-to-test-how-the-slug-generation-handles-extremely-long-inputs-that-might-need-to-be-processed.md';
      
      const filepath = await fileManager.createIssue(1, longTitle, 'content');
      expect(filepath).toBe(path.join(mockWorkspace, 'issues', expectedSlug));
    });

    it('should match examples from the issue', async () => {
      // These are the specific examples from the issue requirements
      const testCases = [
        { title: 'Implement User Authentication', expected: '1-implement-user-authentication.md' },
        { title: 'Fix Bug #123', expected: '2-fix-bug-123.md' }
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        if (testCase) {
          const filepath = await fileManager.createIssue(i + 1, testCase.title, 'content');
          expect(filepath).toBe(path.join(mockWorkspace, 'issues', testCase.expected));
        }
      }
    });
  });
});