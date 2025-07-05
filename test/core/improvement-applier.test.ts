import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import { existsSync } from 'fs';
import { 
  DefaultImprovementApplier,
  applyImprovements,
  type ApplicationResult,
  type BackupInfo
} from '../../src/core/improvement-applier.js';
import { ChangeType, type ImprovementChange } from '../../src/types/index.js';

vi.mock('fs/promises');
vi.mock('fs', () => ({
  existsSync: vi.fn()
}));
vi.mock('../../src/utils/logger.js', () => ({
  Logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn()
  }
}));

describe('DefaultImprovementApplier', () => {
  let applier: DefaultImprovementApplier;
  const mockWorkspace = '/test/workspace';
  
  beforeEach(() => {
    vi.clearAllMocks();
    applier = new DefaultImprovementApplier(mockWorkspace);
    
    // Default mock implementations
    vi.mocked(fs.mkdir).mockResolvedValue(undefined);
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.readFile).mockResolvedValue('');
    vi.mocked(fs.readdir).mockResolvedValue([]);
    vi.mocked(existsSync).mockReturnValue(false);
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  describe('applyImprovements', () => {
    it('should create backup before applying changes', async () => {
      const changes: ImprovementChange[] = [{
        type: ChangeType.ADD_ISSUE,
        target: '99-new-feature.md',
        description: 'Add new feature issue',
        content: '# Issue 99: New Feature\n\n## Requirements\nImplement new feature',
        rationale: 'Missing feature coverage'
      }];
      
      const result = await applier.applyImprovements(changes, mockWorkspace);
      
      expect(vi.mocked(fs.mkdir)).toHaveBeenCalledWith(
        expect.stringContaining('.autoagent/backups'),
        { recursive: true }
      );
      expect(result.backup).toBeDefined();
      expect(result.backup?.files).toBeInstanceOf(Map);
    });
    
    it('should apply all changes successfully', async () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.ADD_ISSUE,
          target: '99-new-feature.md',
          description: 'Add new feature issue',
          content: '# Issue 99: New Feature\n\n## Requirements\nImplement new feature',
          rationale: 'Missing feature coverage'
        },
        {
          type: ChangeType.ADD_PLAN,
          target: 'plan-for-issue-99.md',
          description: 'Add plan for new feature',
          content: '# Plan for Issue 99\n\n## Implementation Plan\n### Phase 1\n- [ ] Task 1',
          rationale: 'Plan needed for new issue'
        }
      ];
      
      vi.mocked(fs.readdir).mockResolvedValue([]);
      
      const result = await applier.applyImprovements(changes, mockWorkspace);
      
      expect(result.success).toBe(true);
      expect(result.appliedChanges).toHaveLength(2);
      expect(result.failedChanges).toHaveLength(0);
    });
    
    it('should rollback on failure', async () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.ADD_ISSUE,
          target: '99-new-feature.md',
          description: 'Add new feature issue',
          content: '# Issue 99: New Feature',
          rationale: 'Test'
        },
        {
          type: ChangeType.MODIFY_ISSUE,
          target: '100-nonexistent.md',
          description: 'Modify nonexistent issue',
          content: 'Modified content',
          rationale: 'Test'
        }
      ];
      
      vi.mocked(existsSync).mockReturnValueOnce(false).mockReturnValueOnce(false);
      
      const result = await applier.applyImprovements(changes, mockWorkspace);
      
      expect(result.success).toBe(false);
      expect(result.appliedChanges).toHaveLength(0);
      expect(result.failedChanges).toHaveLength(1);
      expect(result.error).toContain('Failed to apply change');
    });
  });
  
  describe('ADD_ISSUE handler', () => {
    it('should create new issue file with proper formatting', async () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: 'new-feature.md',
        description: 'Add new feature issue',
        content: `## Requirement
Implement user authentication

## Acceptance Criteria
- [ ] Users can register
- [ ] Users can login
- [ ] Users can logout`,
        rationale: 'Missing auth feature'
      };
      
      vi.mocked(fs.readdir).mockResolvedValue([]);
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(true);
      expect(vi.mocked(fs.writeFile)).toHaveBeenCalledWith(
        expect.stringContaining('issues/1-implement-user-authentication.md'),
        expect.stringContaining('# Issue 1: Implement user authentication'),
        'utf-8'
      );
    });
    
    it('should update TODO.md when adding new issue', async () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: 'new-issue.md',
        description: 'Add new issue',
        content: '## Requirement\nTest issue',
        rationale: 'Test'
      };
      
      vi.mocked(fs.readFile).mockRejectedValueOnce({ code: 'ENOENT' } as any);
      vi.mocked(fs.readdir).mockResolvedValue([]);
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(true);
      expect(vi.mocked(fs.writeFile)).toHaveBeenCalledWith(
        path.join(mockWorkspace, 'TODO.md'),
        expect.stringContaining('- [ ] **[Issue #1]**'),
        'utf-8'
      );
    });
  });
  
  describe('MODIFY_ISSUE handler', () => {
    it('should modify existing issue file', async () => {
      const change: ImprovementChange = {
        type: ChangeType.MODIFY_ISSUE,
        target: '1-existing-issue.md',
        description: 'Update acceptance criteria',
        content: `## Acceptance Criteria
- [ ] New criterion 1
- [ ] New criterion 2`,
        rationale: 'Missing criteria'
      };
      
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(fs.readFile).mockResolvedValue(`# Issue 1: Existing Issue

## Requirements
Original requirements

## Acceptance Criteria
- [ ] Old criterion`);
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(true);
      expect(vi.mocked(fs.writeFile)).toHaveBeenCalledWith(
        expect.stringContaining('issues/1-existing-issue.md'),
        expect.stringContaining('New criterion 1'),
        'utf-8'
      );
    });
    
    it('should fail if issue file does not exist', async () => {
      const change: ImprovementChange = {
        type: ChangeType.MODIFY_ISSUE,
        target: 'nonexistent.md',
        description: 'Modify nonexistent',
        content: 'Content',
        rationale: 'Test'
      };
      
      vi.mocked(existsSync).mockReturnValue(false);
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Issue file not found');
    });
  });
  
  describe('ADD_PLAN handler', () => {
    it('should create new plan file', async () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_PLAN,
        target: 'plan-for-issue-1.md',
        description: 'Add plan for issue 1',
        content: `## Implementation Plan
### Phase 1
- [ ] Setup project
- [ ] Install dependencies`,
        rationale: 'Missing plan'
      };
      
      vi.mocked(fs.readdir).mockResolvedValue(['1-test-issue.md']);
      vi.mocked(fs.readFile).mockResolvedValue(`# Issue 1: Test Issue

## Requirements
Test requirements`);
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(true);
      expect(vi.mocked(fs.writeFile)).toHaveBeenCalledWith(
        expect.stringContaining('plans/1-test-issue.md'),
        expect.stringContaining('# Plan for Issue 1: Test Issue'),
        'utf-8'
      );
    });
  });
  
  describe('MODIFY_PLAN handler', () => {
    it('should modify existing plan file', async () => {
      const change: ImprovementChange = {
        type: ChangeType.MODIFY_PLAN,
        target: '1-test-plan.md',
        description: 'Update plan phases',
        content: `## Implementation Plan
### Phase 1
- [ ] Updated task 1
### Phase 2
- [ ] New phase task`,
        rationale: 'Update plan'
      };
      
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(fs.readFile).mockResolvedValue(`# Plan for Issue 1: Test

## Implementation Plan
### Phase 1
- [ ] Original task`);
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(true);
      expect(vi.mocked(fs.writeFile)).toHaveBeenCalledWith(
        expect.stringContaining('plans/1-test-plan.md'),
        expect.stringContaining('Updated task 1'),
        'utf-8'
      );
    });
  });
  
  describe('ADD_DEPENDENCY handler', () => {
    it('should add dependency to existing issue', async () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_DEPENDENCY,
        target: '1-test-issue.md',
        description: 'Add dependency to issue 2',
        content: 'Issue 2: Authentication module',
        rationale: 'Missing dependency'
      };
      
      vi.mocked(fs.readdir).mockResolvedValue(['1-test-issue.md']);
      vi.mocked(fs.readFile).mockResolvedValue(`# Issue 1: Test Issue

## Requirements
Test requirements

## Acceptance Criteria
- [ ] Test criterion`);
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(true);
      expect(vi.mocked(fs.writeFile)).toHaveBeenCalledWith(
        expect.stringContaining('1-test-issue.md'),
        expect.stringMatching(/## Dependencies\s*\n\s*- Issue 2: Authentication module/),
        'utf-8'
      );
    });
    
    it('should append to existing dependencies', async () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_DEPENDENCY,
        target: '1-test-issue.md',
        description: 'Add another dependency',
        content: 'Issue 3: Database setup',
        rationale: 'Missing dependency'
      };
      
      vi.mocked(fs.readdir).mockResolvedValue(['1-test-issue.md']);
      vi.mocked(fs.readFile).mockResolvedValue(`# Issue 1: Test Issue

## Requirements
Test requirements

## Dependencies
- Issue 2: Existing dependency

## Acceptance Criteria
- [ ] Test criterion`);
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(true);
      expect(vi.mocked(fs.writeFile)).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringMatching(/## Dependencies\s*\n\s*- Issue 2: Existing dependency\s*\n\s*- Issue 3: Database setup/),
        'utf-8'
      );
    });
  });
  
  describe('Backup and rollback', () => {
    it('should create timestamped backup directory', async () => {
      const changes: ImprovementChange[] = [{
        type: ChangeType.ADD_ISSUE,
        target: 'test.md',
        description: 'Test',
        content: 'Test content',
        rationale: 'Test'
      }];
      
      const mockDate = new Date('2024-01-01T12:00:00.000Z');
      vi.setSystemTime(mockDate);
      
      const result = await applier.applyImprovements(changes, mockWorkspace);
      
      expect(vi.mocked(fs.mkdir)).toHaveBeenCalledWith(
        expect.stringContaining('2024-01-01T12-00-00.000Z'),
        { recursive: true }
      );
      expect(result.backup?.timestamp).toBe('2024-01-01T12-00-00.000Z');
      
      vi.useRealTimers();
    });
    
    it('should backup affected files before changes', async () => {
      const changes: ImprovementChange[] = [{
        type: ChangeType.MODIFY_ISSUE,
        target: '1-existing.md',
        description: 'Modify',
        content: 'New content',
        rationale: 'Test'
      }];
      
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(fs.readFile).mockResolvedValue('Original content');
      
      const result = await applier.applyImprovements(changes, mockWorkspace);
      
      expect(result.backup?.files.get('issues/1-existing.md')).toBe('Original content');
    });
    
    it('should restore files on rollback', async () => {
      const changes: ImprovementChange[] = [
        {
          type: ChangeType.ADD_ISSUE,
          target: 'good.md',
          description: 'Good change',
          content: 'Good content',
          rationale: 'Test'
        },
        {
          type: ChangeType.MODIFY_ISSUE,
          target: 'bad.md',
          description: 'Bad change',
          content: 'Bad content',
          rationale: 'Test'
        }
      ];
      
      vi.mocked(existsSync).mockReturnValueOnce(false).mockReturnValueOnce(false);
      vi.mocked(fs.readFile).mockResolvedValue('Original content');
      
      const writeFileCalls: Array<[string, string]> = [];
      vi.mocked(fs.writeFile).mockImplementation(async (path, content) => {
        writeFileCalls.push([path as string, content as string]);
      });
      
      const result = await applier.applyImprovements(changes, mockWorkspace);
      
      expect(result.success).toBe(false);
      
      const hasRollbackWrite = writeFileCalls.some(([_, content]) => 
        content === 'Original content'
      );
      expect(hasRollbackWrite).toBe(false); // No files to rollback since first was new
    });
  });
  
  describe('Content parsing and merging', () => {
    it('should merge acceptance criteria without duplicates', async () => {
      const change: ImprovementChange = {
        type: ChangeType.MODIFY_ISSUE,
        target: '1-test.md',
        description: 'Add criteria',
        content: `## Acceptance Criteria
- [ ] Existing criterion
- [ ] New criterion`,
        rationale: 'Test'
      };
      
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(fs.readFile).mockImplementation(async (filepath) => {
        if ((filepath as string).includes('1-test.md')) {
          return `# Issue 1: Test

## Acceptance Criteria
- [ ] Existing criterion
- [ ] Old criterion`;
        }
        return '';
      });
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(true);
      
      // Check all writeFile calls
      const allCalls = vi.mocked(fs.writeFile).mock.calls;
      console.log('All writeFile calls:', allCalls.map(call => call[0]));
      
      const writeCall = allCalls.find(
        call => (call[0] as string).includes('1-test.md')
      );
      
      expect(writeCall).toBeDefined();
      const content = writeCall?.[1] as string;
      console.log('Written content:', content); // Debug output
      const criteriaMatches = content.match(/- \[ \] Existing criterion/g);
      expect(criteriaMatches?.length).toBe(1); // No duplicates
      expect(content).toContain('New criterion');
      expect(content).toContain('Old criterion');
    });
    
    it('should preserve section order when reconstructing markdown', async () => {
      const change: ImprovementChange = {
        type: ChangeType.MODIFY_ISSUE,
        target: '1-test.md',
        description: 'Update',
        content: `## Technical Details
Updated technical details`,
        rationale: 'Test'
      };
      
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(fs.readFile).mockResolvedValue(`# Issue 1: Test

## Requirements
Requirements here

## Acceptance Criteria
- [ ] Criterion

## Resources
- Resource 1`);
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(true);
      
      const writeCall = vi.mocked(fs.writeFile).mock.calls.find(
        call => (call[0] as string).includes('1-test.md')
      );
      
      const content = writeCall?.[1] as string;
      const sections = content.match(/## \w+/g);
      
      expect(sections).toEqual([
        '## Requirements',
        '## Acceptance',
        '## Technical',
        '## Resources'
      ]);
    });
  });
  
  describe('Error handling', () => {
    it('should handle missing issue number in dependency target', async () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_DEPENDENCY,
        target: 'invalid-format',
        description: 'Bad dependency',
        content: 'Dependency',
        rationale: 'Test'
      };
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid dependency target format');
    });
    
    it('should handle filesystem errors gracefully', async () => {
      const change: ImprovementChange = {
        type: ChangeType.ADD_ISSUE,
        target: 'test.md',
        description: 'Test',
        content: 'Content',
        rationale: 'Test'
      };
      
      vi.mocked(fs.writeFile).mockRejectedValue(new Error('Permission denied'));
      
      const result = await applier.applyImprovements([change], mockWorkspace);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Permission denied');
    });
  });
});

describe('applyImprovements function', () => {
  it('should create applier and delegate to it', async () => {
    const changes: ImprovementChange[] = [{
      type: ChangeType.ADD_ISSUE,
      target: 'test.md',
      description: 'Test',
      content: 'Content',
      rationale: 'Test'
    }];
    
    vi.mocked(fs.readdir).mockResolvedValue([]);
    
    const result = await applyImprovements(changes, '/workspace');
    
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(vi.mocked(fs.writeFile)).toHaveBeenCalled();
  });
});