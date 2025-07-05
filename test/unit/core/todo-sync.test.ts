import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AutonomousAgent } from '../../../src/core/autonomous-agent';
import * as fs from 'fs/promises';

// Mock fs/promises
vi.mock('fs/promises');

// Mock child_process
vi.mock('child_process', () => ({
  spawn: vi.fn(),
  exec: vi.fn()
}));

// Mock git utils
vi.mock('../../../src/utils/git', () => ({
  checkGitAvailable: vi.fn().mockResolvedValue(false),
  isGitRepository: vi.fn().mockResolvedValue(false),
  hasChangesToCommit: vi.fn().mockResolvedValue(false),
  stageAllChanges: vi.fn(),
  createCommit: vi.fn(),
  getCurrentCommitHash: vi.fn(),
  getUncommittedChanges: vi.fn(),
  revertToCommit: vi.fn()
}));

describe('TODO Sync after Decomposition', () => {
  let agent: AutonomousAgent;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock fs methods to return default values
    (fs.mkdir as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    (fs.access as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    
    agent = new AutonomousAgent({
      workspace: '/test/workspace'
    });
  });

  it('should add missing issues to TODO.md after decomposition', async () => {
    // Mock existing TODO content (only has issue #47)
    const existingTodo = `# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues

## Completed Issues
- [x] **[Issue #47]** Implement plan from spec - \`issues/47-implement-plan-from-spec.md\`
`;

    // Keep track of TODO.md writes
    let currentTodoContent = existingTodo;
    
    // Mock file system - issues directory has new issues 48-50
    (fs.readFile as ReturnType<typeof vi.fn>).mockImplementation((filePath: string) => {
      if (filePath.endsWith('TODO.md')) {
        return Promise.resolve(currentTodoContent);
      }
      // Mock issue file content
      const match = filePath.match(/(\d+)-/);
      if (match !== null && match[1] !== undefined && match[1] !== '') {
        const issueNum = match[1];
        return Promise.resolve(`# Issue ${issueNum}: Test Issue ${issueNum}\n\nContent...`);
      }
      return Promise.reject(new Error('File not found'));
    });
    
    // Track TODO.md writes
    (fs.writeFile as ReturnType<typeof vi.fn>).mockImplementation((filePath: string, content: string) => {
      if (filePath.endsWith('TODO.md')) {
        currentTodoContent = content;
      }
      return Promise.resolve();
    });

    (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue([
      '47-implement-plan-from-spec.md',
      '48-core-parser-engine.md',
      '49-json-schema-definition.md',
      '50-field-extraction.md'
    ]);

    // Call syncTodoWithIssues
    await agent.syncTodoWithIssues();

    // Verify writeFile was called 3 times (once for each missing issue)
    expect(fs.writeFile).toHaveBeenCalledTimes(3);
    
    // Check the final TODO content includes all new issues
    const writeFileMock = fs.writeFile as ReturnType<typeof vi.fn>;
    const lastWriteCall = writeFileMock.mock.calls[2];
    const finalTodoContent = lastWriteCall[1];
    
    expect(finalTodoContent).toContain('- [ ] **[Issue #48]** Test Issue 48');
    expect(finalTodoContent).toContain('- [ ] **[Issue #49]** Test Issue 49');
    expect(finalTodoContent).toContain('- [ ] **[Issue #50]** Test Issue 50');
  });

  it('should handle empty TODO.md gracefully', async () => {
    // Mock empty TODO
    (fs.readFile as ReturnType<typeof vi.fn>).mockImplementation((filePath: string) => {
      if (filePath.endsWith('TODO.md')) {
        return Promise.resolve('');
      }
      return Promise.resolve('# Issue 1: Test Issue\n\nContent...');
    });

    (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue(['1-test-issue.md']);

    await agent.syncTodoWithIssues();

    // Should create TODO structure and add the issue
    expect(fs.writeFile).toHaveBeenCalled();
    const writeFileMock = fs.writeFile as ReturnType<typeof vi.fn>;
    const writeCall = writeFileMock.mock.calls[0];
    const todoContent = writeCall[1];
    
    expect(todoContent).toContain('# To-Do');
    expect(todoContent).toContain('## Pending Issues');
    expect(todoContent).toContain('- [ ] **[Issue #1]** Test Issue');
  });

  it('should skip issues already in TODO', async () => {
    // Mock TODO that already has issues 1 and 2
    const existingTodo = `# To-Do

## Pending Issues
- [ ] **[Issue #1]** First Issue - \`issues/1-first-issue.md\`
- [ ] **[Issue #2]** Second Issue - \`issues/2-second-issue.md\`

## Completed Issues
`;

    (fs.readFile as ReturnType<typeof vi.fn>).mockImplementation((filePath: string) => {
      if (filePath.endsWith('TODO.md')) {
        return Promise.resolve(existingTodo);
      }
      return Promise.resolve('# Issue 3: Third Issue\n\nContent...');
    });

    // Directory has issues 1, 2, and 3
    (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue([
      '1-first-issue.md',
      '2-second-issue.md',
      '3-third-issue.md'
    ]);

    await agent.syncTodoWithIssues();

    // Should only add issue #3
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    const writeFileMock = fs.writeFile as ReturnType<typeof vi.fn>;
    const writeCall = writeFileMock.mock.calls[0];
    const todoContent = writeCall[1];
    
    expect(todoContent).toContain('- [ ] **[Issue #3]** Third Issue');
    // Should still have the original issues
    expect(todoContent).toContain('- [ ] **[Issue #1]** First Issue');
    expect(todoContent).toContain('- [ ] **[Issue #2]** Second Issue');
  });

  it('should handle file read errors gracefully', async () => {
    (fs.readFile as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('File read error'));
    (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue(['1-test.md']);

    // Should not throw - errors are logged but not propagated
    await expect(agent.syncTodoWithIssues()).resolves.toBeUndefined();
  });

  it('should extract title correctly from various issue formats', async () => {
    (fs.readFile as ReturnType<typeof vi.fn>).mockImplementation((filePath: string) => {
      if (filePath.endsWith('TODO.md')) {
        return Promise.resolve('# To-Do\n\n## Pending Issues\n');
      }
      if (filePath.includes('1-')) {
        return Promise.resolve('# Issue 1: Complex Title: With Colons\n\nContent...');
      }
      if (filePath.includes('2-')) {
        return Promise.resolve('# Issue 2:Title Without Space\n\nContent...');
      }
      if (filePath.includes('3-')) {
        return Promise.resolve('No proper header\n\nJust content...');
      }
      return Promise.reject(new Error('File not found'));
    });

    (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue([
      '1-complex-title.md',
      '2-no-space.md',
      '3-no-header.md'
    ]);

    await agent.syncTodoWithIssues();

    const writeFileMock = fs.writeFile as ReturnType<typeof vi.fn>;
    const calls = writeFileMock.mock.calls;
    
    // Check extracted titles
    expect(calls[0][1]).toContain('Complex Title: With Colons');
    expect(calls[1][1]).toContain('Title Without Space');
    expect(calls[2][1]).toContain('3-no-header'); // Falls back to filename
  });
});