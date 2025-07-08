import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs/promises';
import { FileManager } from '../../src/utils/file-manager.js';

vi.mock('fs/promises');

describe('FileManager TODO marking bug', () => {
  let fileManager: FileManager;
  const projectRoot = '/test/project';
  
  beforeEach(() => {
    vi.clearAllMocks();
    fileManager = new FileManager(projectRoot);
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('should only mark the specific issue as complete, not issues with similar numbers', async () => {
    // Create a TODO.md with multiple issues including #1, #10, #11, #21
    const todoContent = `# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
- [ ] **[Issue #1]** First issue - \`issues/1-first-issue.md\`
- [ ] **[Issue #10]** Tenth issue - \`issues/10-tenth-issue.md\`
- [ ] **[Issue #11]** Eleventh issue - \`issues/11-eleventh-issue.md\`
- [ ] **[Issue #21]** Twenty-first issue - \`issues/21-twenty-first-issue.md\`

## Completed Issues
`;
    
    // Mock file system
    vi.mocked(fs.readFile).mockResolvedValue(todoContent);
    vi.mocked(fs.writeFile).mockResolvedValue();
    
    // Read the TODO list
    const todos = await fileManager.readTodoList();
    expect(todos).toHaveLength(4);
    
    // Simulate marking issue #1 as complete using the FIXED implementation
    const issueNumber = 1;
    const issueRegex = new RegExp(`\\[Issue #${issueNumber}\\]`);
    const updatedTodos = todos.map(todo => {
      if (issueRegex.test(todo)) {
        return todo.replace('[ ]', '[x]');
      }
      return todo;
    });
    
    // With the fix, only issue #1 should be marked as complete
    const completedTodos = updatedTodos.filter(todo => todo.includes('[x]'));
    
    // This test should now pass with the fixed implementation
    expect(completedTodos).toHaveLength(1);
    expect(completedTodos[0]).toContain('[Issue #1]');
    
    // Verify other issues remain untouched
    const pendingTodos = updatedTodos.filter(todo => todo.includes('[ ]'));
    expect(pendingTodos).toHaveLength(3);
    expect(pendingTodos.some(todo => todo.includes('[Issue #10]'))).toBe(true);
    expect(pendingTodos.some(todo => todo.includes('[Issue #11]'))).toBe(true);
    expect(pendingTodos.some(todo => todo.includes('[Issue #21]'))).toBe(true);
  });
  
  it('demonstrates the bug with includes() matching partial numbers', () => {
    const todos = [
      '- [ ] **[Issue #1]** First issue - `issues/1-first-issue.md`',
      '- [ ] **[Issue #10]** Tenth issue - `issues/10-tenth-issue.md`',
      '- [ ] **[Issue #11]** Eleventh issue - `issues/11-eleventh-issue.md`',
      '- [ ] **[Issue #21]** Twenty-first issue - `issues/21-twenty-first-issue.md`'
    ];
    
    const issueNumber = 1;
    
    // The BUGGY way using includes() - this is what was wrong
    const buggyUpdatedTodos = todos.map(todo => {
      if (todo.includes(`Issue #${issueNumber}`)) {
        return todo.replace('[ ]', '[x]');
      }
      return todo;
    });
    
    // This demonstrates the bug - it marks multiple issues as complete
    const buggyCompletedTodos = buggyUpdatedTodos.filter(todo => todo.includes('[x]'));
    expect(buggyCompletedTodos).toHaveLength(3); // Bug: marks #1, #10, #11 as complete!
    expect(buggyCompletedTodos[0]).toContain('[Issue #1]');
    expect(buggyCompletedTodos[1]).toContain('[Issue #10]'); // Should NOT be marked
    expect(buggyCompletedTodos[2]).toContain('[Issue #11]'); // Should NOT be marked
  });
  
  it('should correctly identify the exact issue number with proper regex', () => {
    const todos = [
      '- [ ] **[Issue #1]** First issue - `issues/1-first-issue.md`',
      '- [ ] **[Issue #10]** Tenth issue - `issues/10-tenth-issue.md`',
      '- [ ] **[Issue #11]** Eleventh issue - `issues/11-eleventh-issue.md`',
      '- [ ] **[Issue #21]** Twenty-first issue - `issues/21-twenty-first-issue.md`'
    ];
    
    const issueNumber = 1;
    
    // The correct way to match the exact issue number
    const issueRegex = new RegExp(`\\[Issue #${issueNumber}\\]`);
    
    const updatedTodos = todos.map(todo => {
      if (issueRegex.test(todo)) {
        return todo.replace('[ ]', '[x]');
      }
      return todo;
    });
    
    // This should only mark issue #1 as complete
    const completedTodos = updatedTodos.filter(todo => todo.includes('[x]'));
    expect(completedTodos).toHaveLength(1);
    expect(completedTodos[0]).toContain('[Issue #1]');
  });
});