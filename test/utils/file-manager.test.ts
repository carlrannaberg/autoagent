import * as fs from 'fs/promises';
import * as path from 'path';
import { FileManager } from '../../src/utils/file-manager';
import { Issue, Plan } from '../../src/types';

jest.mock('fs/promises');

describe('FileManager', () => {
  let fileManager: FileManager;
  const mockWorkspace = '/test/workspace';
  
  beforeEach(() => {
    jest.clearAllMocks();
    fileManager = new FileManager(mockWorkspace);
  });
  
  describe('ensureDirectories', () => {
    it('should create issues and plans directories', async () => {
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);
      (fs.readdir as jest.Mock).mockResolvedValue([]);
      
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
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);
      (fs.readdir as jest.Mock).mockRejectedValue({ code: 'ENOENT' });
      
      const result = await fileManager.getNextIssueNumber();
      
      expect(result).toBe(1);
    });
    
    it('should return next number based on existing issues', async () => {
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);
      (fs.readdir as jest.Mock).mockResolvedValue([
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
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      
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
      
      (fs.readFile as jest.Mock).mockResolvedValue(issueContent);
      
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
      (fs.readFile as jest.Mock).mockRejectedValue({ code: 'ENOENT' });
      
      const result = await fileManager.readIssue('/test/nonexistent.md');
      
      expect(result).toBeNull();
    });
  });
  
  describe('createPlan', () => {
    it('should create plan file with correct content', async () => {
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      
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
      
      expect(filepath).toBe(path.join(mockWorkspace, 'plans', '1-plan.md'));
      expect(fs.writeFile).toHaveBeenCalledWith(
        filepath,
        expect.stringContaining('# Plan for Issue 1: Test Issue'),
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
      
      (fs.readFile as jest.Mock).mockResolvedValue(todoContent);
      
      const result = await fileManager.readTodoList();
      
      expect(result).toEqual([
        '- [ ] Issue 1',
        '- [ ] Issue 2',
        '- [x] Issue 3'
      ]);
    });
    
    it('should return empty array for non-existent file', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue({ code: 'ENOENT' });
      
      const result = await fileManager.readTodoList();
      
      expect(result).toEqual([]);
    });
  });
  
  describe('updateTodoList', () => {
    it('should write todo list with correct format', async () => {
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      
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
      (fs.readFile as jest.Mock).mockResolvedValue('Claude instructions');
      
      const result = await fileManager.readProviderInstructions('CLAUDE');
      
      expect(result).toBe('Claude instructions');
      expect(fs.readFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'CLAUDE.md'),
        'utf-8'
      );
    });
    
    it('should return empty string for non-existent file', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue({ code: 'ENOENT' });
      
      const result = await fileManager.readProviderInstructions('GEMINI');
      
      expect(result).toBe('');
    });
  });
  
  describe('createProviderInstructionsIfMissing', () => {
    it('should create missing instruction files', async () => {
      (fs.access as jest.Mock).mockRejectedValue(new Error('Not found'));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      (fs.symlink as jest.Mock).mockResolvedValue(undefined);
      
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
      (fs.access as jest.Mock).mockResolvedValue(undefined);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      
      await fileManager.createProviderInstructionsIfMissing();
      
      expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it('should create stub files when symlinks fail', async () => {
      (fs.access as jest.Mock).mockRejectedValue(new Error('Not found'));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      (fs.symlink as jest.Mock).mockRejectedValue(new Error('Symlinks not supported'));
      
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
      (fs.readFile as jest.Mock).mockResolvedValue('file content');
      
      const content = await fileManager.readFile('test.md');
      
      expect(fs.readFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'test.md'),
        'utf-8'
      );
      expect(content).toBe('file content');
    });

    it('should read file with absolute path', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('file content');
      
      const absolutePath = '/absolute/path/test.md';
      const content = await fileManager.readFile(absolutePath);
      
      expect(fs.readFile).toHaveBeenCalledWith(absolutePath, 'utf-8');
      expect(content).toBe('file content');
    });
  });

  describe('writeFile', () => {
    it('should write file with relative path', async () => {
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      
      await fileManager.writeFile('test.md', 'content');
      
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'test.md'),
        'content',
        'utf-8'
      );
    });

    it('should write file with absolute path', async () => {
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      
      const absolutePath = '/absolute/path/test.md';
      await fileManager.writeFile(absolutePath, 'content');
      
      expect(fs.writeFile).toHaveBeenCalledWith(absolutePath, 'content', 'utf-8');
    });
  });
});