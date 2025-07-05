import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { InMemoryConfigManager } from '../../helpers/test-doubles/in-memory-config-manager';
import { InMemoryFileManager } from '../../helpers/test-doubles/in-memory-file-manager';
import { InMemoryProviderLearning } from '../../helpers/test-doubles/in-memory-provider-learning';
import { TestProvider } from '../../helpers/test-doubles/test-provider';
import * as gitUtils from '@/utils/git';
import * as fs from 'fs/promises';
import * as path from 'path';

// Mock provider functions
const { createProvider, getFirstAvailableProvider } = vi.hoisted(() => {
  return {
    createProvider: vi.fn(),
    getFirstAvailableProvider: vi.fn()
  };
});

// Mock file system
const mockFiles = new Map<string, string[]>();
const mockFileContents = new Map<string, string>();

vi.mock('fs/promises');
vi.mock('path');

// Shared instances for test doubles
let sharedFileManager: InMemoryFileManager;

// Replace implementations with test doubles
vi.mock('@/core/config-manager', () => ({
  ConfigManager: vi.fn(() => new InMemoryConfigManager())
}));

vi.mock('@/utils/file-manager', () => ({
  FileManager: vi.fn(() => sharedFileManager)
}));

vi.mock('@/core/provider-learning', () => ({
  ProviderLearning: vi.fn(() => new InMemoryProviderLearning())
}));

vi.mock('@/providers', () => ({
  createProvider,
  getFirstAvailableProvider
}));

describe('Bootstrap TODO Preservation', () => {
  let agent: AutonomousAgent;
  let fileManager: InMemoryFileManager;
  let testProvider: TestProvider;
  const workspace = '/test/workspace';
  
  const setupMasterPlan = (filename: string = 'master-plan.md', content: string = '# Master Plan\n\nTest plan content'): void => {
    mockFileContents.set(`/test/workspace/${filename}`, content);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFiles.clear();
    mockFileContents.clear();
    
    // Setup path mocks
    vi.mocked(path.isAbsolute).mockReturnValue(false);
    vi.mocked(path.join).mockImplementation((...args) => args.join('/'));
    vi.mocked(path.dirname).mockImplementation((p) => p.split('/').slice(0, -1).join('/'));
    vi.mocked(path.basename).mockImplementation((p, ext) => {
      const base = p.split('/').pop() ?? '';
      return (ext !== undefined && ext !== '') ? base.replace(ext, '') : base;
    });
    vi.mocked(path.extname).mockImplementation((p) => {
      const match = p.match(/\.[^.]+$/);
      return match ? match[0] : '';
    });
    
    // Setup fs mocks
    vi.mocked(fs.readFile).mockImplementation((path: string) => {
      const content = mockFileContents.get(path);
      if (content === undefined) {
        throw new Error(`ENOENT: no such file or directory, open '${path}'`);
      }
      return Promise.resolve(Buffer.from(content));
    });
    
    vi.mocked(fs.readdir).mockImplementation((dir: string) => {
      const files = mockFiles.get(dir);
      if (!files) {
        return Promise.resolve([] as any);
      }
      return Promise.resolve(files as any);
    });
    
    // Setup test doubles
    fileManager = new InMemoryFileManager(workspace);
    sharedFileManager = fileManager; // Ensure agent uses the same instance
    testProvider = new TestProvider({ name: 'claude' });
    
    // Setup provider mocks
    createProvider.mockReturnValue(testProvider);
    getFirstAvailableProvider.mockResolvedValue(testProvider);
    
    // Mock git utilities
    vi.spyOn(gitUtils, 'checkGitAvailable').mockResolvedValue(false);
    vi.spyOn(gitUtils, 'isGitRepository').mockResolvedValue(false);
    
    // Create agent
    agent = new AutonomousAgent({
      provider: 'claude',
      workspace
    });
    
    // Setup template files
    mockFileContents.set(`${workspace}/templates/issue.md`, `# Issue {{number}}: {{title}}

## Requirement
{{requirement}}

## Acceptance Criteria
{{criteria}}`);
    
    mockFileContents.set(`${workspace}/templates/plan.md`, `# Plan for Issue {{number}}: {{title}}

## Implementation Plan
{{plan}}`);
    
    // Mock the master plan file
    mockFileContents.set(`${workspace}/master-plan.md`, `# Master Plan

## Goals
- Build a test feature
- Add documentation

## Implementation
1. Create core functionality
2. Add tests`);
  });
  
  afterEach(() => {
    process.removeAllListeners('SIGINT');
    process.removeAllListeners('SIGTERM');
  });
  
  describe('Empty TODO.md scenarios', () => {
    it('should create initial TODO structure when TODO.md is empty', async () => {
      // Set up file manager with empty TODO
      fileManager.updateTodo('');
      
      // Mock the master plan file
      mockFileContents.set('/test/workspace/master-plan.md', '# Master Plan\n\nTest plan content');
      
      // Setup provider response for bootstrap
      testProvider.setResponse('master-plan', '## Generated Issues\n\nIssue files created successfully');
      
      // Run bootstrap
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      // Check that TODO was updated with proper structure
      const todoContent = fileManager.readTodo();
      expect(todoContent).toContain('# To-Do');
      expect(todoContent).toContain('## Pending Issues');
      expect(todoContent).toContain('## Completed Issues');
      expect(todoContent).toContain('- [ ] **[Issue #1]** Implement plan from master-plan');
    });
    
    it('should create TODO.md when it does not exist', async () => {
      // No TODO exists initially
      expect(fileManager.hasTodo()).toBe(false);
      
      // Setup provider response
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      // Mock the master plan file
      setupMasterPlan();
      
      // Run bootstrap
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      // Verify TODO was created
      expect(fileManager.hasTodo()).toBe(true);
      const todoContent = fileManager.readTodo();
      expect(todoContent).toContain('# To-Do');
      expect(todoContent).toContain('- [ ] **[Issue #1]** Implement plan from master-plan');
    });
  });
  
  describe('Existing TODO preservation', () => {
    it('should preserve existing pending issues when bootstrapping', async () => {
      // Set up existing TODO with pending issues
      const existingTodo = `# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **[Issue #1]** Fix authentication bug - \`issues/1-fix-authentication-bug.md\`
- [ ] **[Issue #2]** Add user profile page - \`issues/2-add-user-profile-page.md\`

## Completed Issues
`;
      
      fileManager.updateTodo(existingTodo);
      
      // Set up existing issue files
      fileManager.createIssue(1, 'Fix authentication bug', '# Issue 1: Fix authentication bug\n\nContent');
      fileManager.createIssue(2, 'Add user profile page', '# Issue 2: Add user profile page\n\nContent');
      
      // Setup provider response
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      // Run bootstrap
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      // Check that existing issues are preserved
      const todoContent = fileManager.readTodo();
      expect(todoContent).toContain('- [ ] **[Issue #1]** Fix authentication bug');
      expect(todoContent).toContain('- [ ] **[Issue #2]** Add user profile page');
      expect(todoContent).toContain('- [ ] **[Issue #3]** Implement plan from master-plan');
      
      // Verify correct order (new issue should be after existing ones)
      const lines = todoContent.split('\n');
      const issue1Index = lines.findIndex(line => line.includes('[Issue #1]'));
      const issue2Index = lines.findIndex(line => line.includes('[Issue #2]'));
      const issue3Index = lines.findIndex(line => line.includes('[Issue #3]'));
      
      expect(issue1Index).toBeLessThan(issue3Index);
      expect(issue2Index).toBeLessThan(issue3Index);
    });
    
    it('should preserve completed issues section', async () => {
      const existingTodo = `# To-Do

## Pending Issues
- [ ] **[Issue #2]** Current task - \`issues/2-current-task.md\`

## Completed Issues
- [x] **[Issue #1]** Setup project - \`issues/1-setup-project.md\`
`;
      
      fileManager.updateTodo(existingTodo);
      fileManager.createIssue(2, 'Current task', '# Issue 2: Current task');
      
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      const todoContent = fileManager.readTodo();
      expect(todoContent).toContain('## Completed Issues');
      expect(todoContent).toContain('- [x] **[Issue #1]** Setup project');
      expect(todoContent).toContain('- [ ] **[Issue #3]** Implement plan from master-plan');
    });
    
    it('should append new issue at correct position in pending section', async () => {
      const existingTodo = `# To-Do

Project tracking file.

## Pending Issues
- [ ] **[Issue #1]** First task - \`issues/1-first-task.md\`
- [ ] **[Issue #3]** Third task - \`issues/3-third-task.md\`
- [ ] **[Issue #4]** Fourth task - \`issues/4-fourth-task.md\`

## Completed Issues
- [x] **[Issue #2]** Completed task - \`issues/2-completed-task.md\`
`;
      
      fileManager.updateTodo(existingTodo);
      
      // Set up existing issues
      fileManager.createIssue(1, 'First task', 'Content');
      fileManager.createIssue(3, 'Third task', 'Content');
      fileManager.createIssue(4, 'Fourth task', 'Content');
      
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      const todoContent = fileManager.readTodo();
      
      // Verify new issue #5 is added
      expect(todoContent).toContain('- [ ] **[Issue #5]** Implement plan from master-plan');
      
      // Verify all existing issues are preserved
      expect(todoContent).toContain('[Issue #1]');
      expect(todoContent).toContain('[Issue #3]');
      expect(todoContent).toContain('[Issue #4]');
      expect(todoContent).toContain('[Issue #2]');
    });
  });
  
  describe('Edge cases and error handling', () => {
    it('should handle malformed TODO structure gracefully', async () => {
      const malformedTodo = `This is not a proper TODO format
Some random text
- [ ] Maybe an issue?
More random content`;
      
      fileManager.updateTodo(malformedTodo);
      
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      const todoContent = fileManager.readTodo();
      
      // Should add proper sections
      expect(todoContent).toContain('## Pending Issues');
      expect(todoContent).toContain('## Completed Issues');
      expect(todoContent).toContain('- [ ] **[Issue #1]** Implement plan from master-plan');
    });
    
    it('should handle TODO with missing sections', async () => {
      const todoMissingCompleted = `# To-Do

## Pending Issues
- [ ] **[Issue #1]** Existing task - \`issues/1-existing-task.md\`
`;
      
      fileManager.updateTodo(todoMissingCompleted);
      fileManager.createIssue(1, 'Existing task', 'Content');
      
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      const todoContent = fileManager.readTodo();
      
      // Should add missing Completed Issues section
      expect(todoContent).toContain('## Completed Issues');
      expect(todoContent).toContain('- [ ] **[Issue #1]** Existing task');
      expect(todoContent).toContain('- [ ] **[Issue #2]** Implement plan from master-plan');
    });
    
    it('should handle TODO with only completed section', async () => {
      const todoOnlyCompleted = `# To-Do

## Completed Issues
- [x] **[Issue #1]** Done task - \`issues/1-done-task.md\`
`;
      
      fileManager.updateTodo(todoOnlyCompleted);
      
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      const todoContent = fileManager.readTodo();
      
      // Should add Pending Issues section before Completed
      expect(todoContent).toContain('## Pending Issues');
      expect(todoContent).toContain('- [ ] **[Issue #2]** Implement plan from master-plan');
      
      // Verify section order
      const pendingIndex = todoContent.indexOf('## Pending Issues');
      const completedIndex = todoContent.indexOf('## Completed Issues');
      expect(pendingIndex).toBeLessThan(completedIndex);
    });
    
    it('should handle TODO with extra whitespace and formatting', async () => {
      const todoWithWhitespace = `# To-Do


## Pending Issues

- [ ] **[Issue #1]** Task one - \`issues/1-task-one.md\`


- [ ] **[Issue #2]** Task two - \`issues/2-task-two.md\`


## Completed Issues

`;
      
      fileManager.updateTodo(todoWithWhitespace);
      fileManager.createIssue(1, 'Task one', 'Content');
      fileManager.createIssue(2, 'Task two', 'Content');
      
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      const todoContent = fileManager.readTodo();
      
      // Should preserve existing tasks and add new one
      expect(todoContent).toContain('[Issue #1]');
      expect(todoContent).toContain('[Issue #2]');
      expect(todoContent).toContain('[Issue #3]');
    });
  });
  
  describe('TODO format consistency', () => {
    it('should maintain consistent format with createIssue method', async () => {
      // First create an issue using createIssue
      await agent.createIssue('Test issue from createIssue');
      
      // Then bootstrap
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      const todoContent = fileManager.readTodo();
      const lines = todoContent.split('\n').filter(line => line.includes('- [ ] **[Issue #'));
      
      // Both issues should have the same format
      expect(lines).toHaveLength(2);
      expect(lines[0]).toMatch(/^- \[ \] \*\*\[Issue #\d+\]\*\* .+ - `issues\/\d+-[\w-]+\.md`$/);
      expect(lines[1]).toMatch(/^- \[ \] \*\*\[Issue #\d+\]\*\* .+ - `issues\/\d+-[\w-]+\.md`$/);
    });
    
    it('should generate correct filename slugs', async () => {
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan('my-awesome-plan.md');
      await agent.bootstrap('my-awesome-plan.md');
      
      const todoContent = fileManager.readTodo();
      
      // Should create slug from title
      expect(todoContent).toContain('`issues/1-implement-plan-from-my-awesome-plan.md`');
    });
  });
  
  describe('Multiple bootstrap operations', () => {
    it('should handle multiple bootstrap calls preserving all issues', async () => {
      // First bootstrap
      testProvider.responses = new Map([
        ['bootstrap', 'First bootstrap']
      ]);
      
      setupMasterPlan('phase1.md');
      await agent.bootstrap('phase1.md');
      
      // Second bootstrap
      testProvider.responses = new Map([
        ['bootstrap', 'Second bootstrap']
      ]);
      
      setupMasterPlan('phase2.md');
      await agent.bootstrap('phase2.md');
      
      // Third bootstrap
      testProvider.responses = new Map([
        ['bootstrap', 'Third bootstrap']
      ]);
      
      setupMasterPlan('phase3.md');
      await agent.bootstrap('phase3.md');
      
      const todoContent = fileManager.readTodo();
      
      // All three bootstrap issues should be present
      expect(todoContent).toContain('[Issue #1]');
      expect(todoContent).toContain('[Issue #2]');
      expect(todoContent).toContain('[Issue #3]');
      expect(todoContent).toContain('implement-plan-from-phase1');
      expect(todoContent).toContain('implement-plan-from-phase2');
      expect(todoContent).toContain('implement-plan-from-phase3');
    });
  });
  
  describe('Regression tests', () => {
    it('should work correctly for empty project bootstrap (regression test)', async () => {
      // Ensure no TODO exists
      expect(fileManager.hasTodo()).toBe(false);
      
      // Ensure no issues exist
      // const issues = await fileManager.getIssues();
      // expect(issues).toHaveLength(0);
      
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed for empty project']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      // Should create TODO with first issue
      const todoContent = fileManager.readTodo();
      expect(todoContent).toContain('# To-Do');
      expect(todoContent).toContain('- [ ] **[Issue #1]** Implement plan from master-plan');
      
      // Should have created the issue
      // const createdIssues = await fileManager.getIssues();
      // expect(createdIssues).toHaveLength(1);
      // expect(createdIssues[0].number).toBe(1);
    });
    
    it('should correctly determine next issue number', async () => {
      // Create non-sequential issues
      fileManager.createIssue(1, 'First', 'Content');
      fileManager.createIssue(3, 'Third', 'Content'); 
      fileManager.createIssue(7, 'Seventh', 'Content');
      
      const todoContent = `# To-Do

## Pending Issues
- [ ] **[Issue #1]** First - \`issues/1-first.md\`
- [ ] **[Issue #3]** Third - \`issues/3-third.md\`
- [ ] **[Issue #7]** Seventh - \`issues/7-seventh.md\`

## Completed Issues
`;
      
      fileManager.updateTodo(todoContent);
      
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      const newTodoContent = fileManager.readTodo();
      
      // Should create issue #8 (next after highest existing)
      expect(newTodoContent).toContain('- [ ] **[Issue #8]** Implement plan from master-plan');
    });
  });
  
  describe('Integration with file manager', () => {
    it('should properly integrate with FileManager TODO operations', async () => {
      // Use FileManager methods directly to set up state
      fileManager.updateTodo(`# To-Do

## Pending Issues
- [ ] **[Issue #1]** Existing task - \`issues/1-existing-task.md\`

## Completed Issues
`);
      
      fileManager.createIssue(1, 'Existing task', '# Issue 1: Existing task');
      
      // Verify FileManager state
      const stats = fileManager.getTodoStats();
      expect(stats.totalIssues).toBe(1);
      expect(stats.pendingIssues).toBe(1);
      expect(stats.completedIssues).toBe(0);
      
      testProvider.responses = new Map([
        ['bootstrap', 'Bootstrap completed']
      ]);
      
      setupMasterPlan();
      await agent.bootstrap('master-plan.md');
      
      // Check updated stats
      const newStats = fileManager.getTodoStats();
      expect(newStats.totalIssues).toBe(2);
      expect(newStats.pendingIssues).toBe(2);
      expect(newStats.completedIssues).toBe(0);
    });
  });
});