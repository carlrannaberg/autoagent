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

  it('should correctly count completed and pending issues from TODO.md', async () => {
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

    expect(stats.total).toBe(5);
    expect(stats.completed).toBe(2);
    expect(stats.pending).toBe(3);
  });

  it('should handle empty TODO.md', async () => {
    (fs.readFile as ReturnType<typeof vi.fn>).mockResolvedValue('');

    const stats = await fileManager.getTodoStats();

    expect(stats.total).toBe(0);
    expect(stats.completed).toBe(0);
    expect(stats.pending).toBe(0);
  });

  it('should handle TODO.md with only completed issues', async () => {
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

  it('should handle TODO.md when file does not exist', async () => {
    (fs.readFile as ReturnType<typeof vi.fn>).mockRejectedValue(
      Object.assign(new Error('ENOENT'), { code: 'ENOENT' })
    );

    const stats = await fileManager.getTodoStats();

    expect(stats.total).toBe(0);
    expect(stats.completed).toBe(0);
    expect(stats.pending).toBe(0);
  });
});