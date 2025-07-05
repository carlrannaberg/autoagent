import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FileManager } from '../../../src/utils/file-manager';
import * as fs from 'fs/promises';

// Mock fs/promises
vi.mock('fs/promises');

describe('FileManager getTodoStats', () => {
  let fileManager: FileManager;

  beforeEach(() => {
    vi.clearAllMocks();
    fileManager = new FileManager('/test/workspace');
  });

  it('should count total from issues dir and completed/pending from TODO.md', async () => {
    // Mock issues directory with 10 total issues
    (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue([
      '1-first-issue.md',
      '2-second-issue.md',
      '3-third-issue.md',
      '4-fourth-issue.md',
      '5-fifth-issue.md',
      '6-sixth-issue.md',
      '7-seventh-issue.md',
      '8-eighth-issue.md',
      '9-ninth-issue.md',
      '10-tenth-issue.md',
      'README.txt' // non-issue file
    ]);

    // Mock TODO content with only 5 issues tracked (3 pending, 2 completed)
    const mockTodoContent = `# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **[Issue #1]** First pending issue - \`issues/1-first-pending.md\`
- [ ] **[Issue #2]** Second pending issue - \`issues/2-second-pending.md\`
- [ ] **[Issue #3]** Third pending issue - \`issues/3-third-pending.md\`

## Completed Issues
- [x] **[Issue #4]** First completed issue - \`issues/4-first-completed.md\`
- [x] **[Issue #5]** Second completed issue - \`issues/5-second-completed.md\`
`;

    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue(mockTodoContent);

    const stats = await fileManager.getTodoStats();

    expect(stats.total).toBe(10); // Total from issues directory
    expect(stats.completed).toBe(2); // From TODO.md
    expect(stats.pending).toBe(3); // From TODO.md
  });

  it('should handle empty TODO.md', async () => {
    // Mock issues directory with 5 issues
    (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue([
      '1-issue.md',
      '2-issue.md',
      '3-issue.md',
      '4-issue.md',
      '5-issue.md'
    ]);
    
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('');

    const stats = await fileManager.getTodoStats();

    expect(stats.total).toBe(5); // Total from issues directory
    expect(stats.completed).toBe(0); // No todos in TODO.md
    expect(stats.pending).toBe(0); // No todos in TODO.md
  });

  it('should handle TODO.md with only completed issues', async () => {
    // Mock issues directory
    (fs.readdir as ReturnType<typeof vi.fn>).mockResolvedValue([
      '1-completed.md',
      '2-completed.md',
      '3-completed.md'
    ]);
    
    const mockTodoContent = `# To-Do

## Completed Issues
- [x] **[Issue #1]** Completed issue 1 - \`issues/1-completed.md\`
- [x] **[Issue #2]** Completed issue 2 - \`issues/2-completed.md\`
- [x] **[Issue #3]** Completed issue 3 - \`issues/3-completed.md\`
`;

    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue(mockTodoContent);

    const stats = await fileManager.getTodoStats();

    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(3);
    expect(stats.pending).toBe(0);
  });

  it('should handle when issues directory does not exist', async () => {
    // Mock issues directory not existing
    (fs.readdir as ReturnType<typeof vi.fn>).mockRejectedValue(
      Object.assign(new Error('ENOENT'), { code: 'ENOENT' })
    );
    
    const mockTodoContent = `# To-Do

## Pending Issues
- [ ] **[Issue #1]** Some issue - \`issues/1-issue.md\`
`;
    
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue(mockTodoContent);

    const stats = await fileManager.getTodoStats();

    expect(stats.total).toBe(0); // No issues directory
    expect(stats.completed).toBe(0);
    expect(stats.pending).toBe(1);
  });
});