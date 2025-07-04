# Fix Bootstrap TODO.md Overwrite Issue

## Overview

The bootstrap command currently overwrites the entire TODO.md file instead of appending new issues to the existing pending section. This causes loss of existing TODO items when bootstrapping in projects that already have pending issues.

## Background/Problem Statement

### Current Behavior

When running `autoagent bootstrap <plan-file>`, the system:
1. Creates a new bootstrap issue 
2. **Completely overwrites** the TODO.md file with a new template
3. Loses all existing pending issues from TODO.md
4. Breaks the expected workflow for projects with existing issues

### Root Cause

In `src/core/autonomous-agent.ts` lines 868-878, the bootstrap method creates a completely new TODO.md template:

```typescript
// Lines 868-878 - PROBLEMATIC CODE
const todoContent = `# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
- [ ] **[Issue #${issueNumber}]** ${issueTitle} - \`issues/${issueFilename}\`

## Completed Issues
`;

await this.fileManager.updateTodo(todoContent);
```

### Correct Pattern

The `createIssue` method (lines 718-723) demonstrates the correct approach:

```typescript
// Lines 718-723 - CORRECT PATTERN
const todoContent = await this.fileManager.readTodo();
const updatedTodo = todoContent.replace(
  '## Pending Issues',
  `## Pending Issues\n- [ ] **[Issue #${nextNumber}]** ${title} - \`issues/${filename}\``
);
await this.fileManager.updateTodo(updatedTodo);
```

### Impact

- **Data Loss**: Existing pending issues are completely lost
- **Workflow Disruption**: Users lose track of work in progress
- **Inconsistent Behavior**: Bootstrap behaves differently from regular issue creation
- **Trust Issues**: Users avoid bootstrap in active projects due to data loss risk

## Goals

1. **Preserve Existing Data**: Bootstrap should never lose existing TODO items
2. **Consistent Behavior**: Align bootstrap TODO handling with `createIssue` method
3. **Append-Only Operation**: Add new bootstrap issue to existing pending items
4. **Backward Compatibility**: Work correctly for both empty and populated TODO files
5. **Robustness**: Handle edge cases gracefully (missing sections, malformed files)

## Non-Goals

- Changing the bootstrap prompt or AI interaction
- Modifying the TODO.md file format or structure
- Implementing TODO reorganization or cleanup features
- Altering the bootstrap workflow beyond TODO handling

## Detailed Design

### Architecture Changes

The fix involves replacing the complete TODO.md overwrite with an append operation that follows the same pattern as `createIssue`.

### Implementation Approach

#### 1. Use Existing createIssue Method (Preferred Solution)

The cleanest approach is to refactor bootstrap to use the existing `createIssue` method, which already handles TODO updates correctly:

**Before:**
```typescript
// Lines 852 + 868-878 - Duplicates issue creation logic
await this.fileManager.createIssue(issueNumber, issueTitle, issueContent);
// ... create plan ...
// Overwrites entire TODO file
const todoContent = `# To-Do...`;
await this.fileManager.updateTodo(todoContent);
```

**After:**
```typescript
// Use existing createIssue method that handles TODO properly
const issueNumber = await this.createIssue(issueTitle, issueContent);
// ... create plan using the returned issue number ...
```

This approach:
- **Eliminates code duplication** between bootstrap and createIssue
- **Automatically preserves existing TODO items** (createIssue does this correctly)  
- **Maintains consistent behavior** across all issue creation paths
- **Reduces maintenance burden** - one method to maintain instead of two

#### 2. Refactor createIssue to Support Custom Content

The current `createIssue` method generates content using AI providers. For bootstrap, we need to pass pre-generated content:

```typescript
// Update createIssue method signature to accept custom content
async createIssue(
  title: string, 
  description?: string, 
  acceptanceCriteria?: string[], 
  details?: string,
  customContent?: string  // New parameter for bootstrap
): Promise<number>
```

#### 3. Alternative: Extract Common TODO Logic (If createIssue Refactor Too Complex)

If modifying createIssue proves complex, extract the TODO update logic:

```typescript
private async addIssueToTodo(issueNumber: number, title: string): Promise<void> {
  const todoContent = await this.fileManager.readTodo();
  const filename = this.generateIssueFilename(issueNumber, title);
  const newIssueEntry = `- [ ] **[Issue #${issueNumber}]** ${title} - \`issues/${filename}\``;
  
  let updatedTodo: string;
  
  if (!todoContent.trim()) {
    // Create initial TODO structure
    updatedTodo = this.createInitialTodoStructure(newIssueEntry);
  } else if (todoContent.includes('## Pending Issues')) {
    // Append to existing structure
    updatedTodo = todoContent.replace(
      '## Pending Issues',
      `## Pending Issues\n${newIssueEntry}`
    );
  } else {
    // Fallback: add structure if missing
    updatedTodo = `${todoContent}\n\n## Pending Issues\n${newIssueEntry}`;
  }
  
  await this.fileManager.updateTodo(updatedTodo);
}

private generateIssueFilename(issueNumber: number, title: string): string {
  return `${issueNumber}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9.-]/g, '').replace(/\.+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')}.md`;
}

private createInitialTodoStructure(firstIssueEntry: string): string {
  return `# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
${firstIssueEntry}

## Completed Issues
`;
}
```

### Code Structure

#### Preferred Approach: Use createIssue Method

```typescript
// In src/core/autonomous-agent.ts

async bootstrap(masterPlanPath: string): Promise<void> {
  // ... existing bootstrap logic for reading master plan and templates ...
  
  const planBasename = path.basename(masterPlanPath, path.extname(masterPlanPath));
  const issueTitle = `Implement plan from ${planBasename}`;
  
  // Build issue content (same as current implementation)
  const issueContent = `# Issue will be auto-numbered by createIssue
  
## Requirement
Decompose the plan into individual actionable issues and create corresponding plan files for each issue.

## Acceptance Criteria
- [ ] All issues are created and numbered in the issues/ directory
- [ ] Each issue has a corresponding plan file in the plans/ directory
// ... rest of content ...

## Generated Issues

${result.output ?? 'Success'}`;

  // FIXED: Use createIssue which handles TODO properly
  const issueNumber = await this.createIssue(
    issueTitle,
    undefined, // description
    undefined, // acceptanceCriteria  
    undefined, // details
    issueContent // customContent
  );
  
  // Create corresponding plan file using the returned issue number
  await this.fileManager.createPlan(issueNumber, planData, issueTitle);
  
  // No manual TODO update needed - createIssue handles it!
}

// Update createIssue to accept custom content
async createIssue(
  title: string, 
  description?: string, 
  acceptanceCriteria?: string[], 
  details?: string,
  customContent?: string // For bootstrap usage
): Promise<number> {
  const nextNumber = await this.fileManager.getNextIssueNumber();
  
  let issueContent: string;
  
  if (customContent) {
    // Bootstrap case: use provided content, just fix the issue number
    issueContent = customContent.replace(
      /^# Issue.*$/m, 
      `# Issue ${nextNumber}: ${title}`
    );
  } else {
    // Regular case: generate content (existing logic)
    if (description !== undefined || acceptanceCriteria !== undefined || details !== undefined) {
      issueContent = `# Issue ${nextNumber}: ${title}
      
## Description
${description ?? 'To be defined'}
// ... rest of existing logic ...`;
    } else {
      // Use provider to generate content (existing logic)
      // ...
    }
  }
  
  await this.fileManager.createIssue(nextNumber, title, issueContent);
  
  // Update TODO (existing logic - already preserves content)
  const todoContent = await this.fileManager.readTodo();
  const updatedTodo = todoContent.replace(
    '## Pending Issues',
    `## Pending Issues\n- [ ] **[Issue #${nextNumber}]** ${title} - \`issues/${nextNumber}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md\``
  );
  await this.fileManager.updateTodo(updatedTodo);
  
  return nextNumber;
}
```

#### Alternative Approach: Extract TODO Logic

```typescript
async bootstrap(masterPlanPath: string): Promise<void> {
  // ... existing bootstrap logic ...
  
  // Use FileManager directly (current approach)
  const issueNumber = await this.fileManager.getNextIssueNumber();
  await this.fileManager.createIssue(issueNumber, issueTitle, issueContent);
  await this.fileManager.createPlan(issueNumber, planData, issueTitle);
  
  // FIXED: Use shared TODO logic instead of overwriting
  await this.addIssueToTodo(issueNumber, issueTitle);
}

async createIssue(title: string, ...): Promise<number> {
  // ... existing issue creation logic ...
  
  await this.fileManager.createIssue(nextNumber, title, issueContent);
  
  // REFACTORED: Use shared TODO update logic  
  await this.addIssueToTodo(nextNumber, title);
  
  return nextNumber;
}
```

### API Changes

#### Preferred Approach (createIssue Enhancement)
- **Internal API Change**: Add optional `customContent` parameter to `createIssue` method
- **Backward Compatible**: Existing calls continue to work (optional parameter)
- **Public API**: No changes to CLI or external interfaces

```typescript
// Before
async createIssue(title: string, description?: string, acceptanceCriteria?: string[], details?: string): Promise<number>

// After (backward compatible)
async createIssue(title: string, description?: string, acceptanceCriteria?: string[], details?: string, customContent?: string): Promise<number>
```

#### Alternative Approach (Extract TODO Logic)
- **No API changes** - purely internal implementation improvement

## Migration Strategy

### For Users

- **No migration required** - the change is backward compatible
- Existing bootstrap usage patterns remain unchanged
- Command line interface stays identical
- Users will immediately benefit from preserved TODO items

### For Existing Projects

- Projects with empty TODO.md: Bootstrap creates initial structure (same as before)
- Projects with existing TODO.md: Bootstrap appends to existing content (new behavior)
- No data migration or cleanup required
- Immediate improvement for existing workflows

### Deployment Strategy

1. This can be deployed as a **patch release** (bug fix)
2. No breaking changes to public APIs
3. No configuration changes required
4. Immediate benefit to users

## Testing Strategy

### Unit Tests

```typescript
describe('Bootstrap TODO handling', () => {
  let workspace: TestWorkspace;
  let agent: AutonomousAgent;

  beforeEach(async () => {
    workspace = await TestWorkspace.create();
    await workspace.setupStandardStructure();
    agent = new AutonomousAgent({ workspace: workspace.path });
  });

  afterEach(async () => {
    await workspace.cleanup();
  });

  describe('with empty TODO.md', () => {
    it('should create initial TODO structure', async () => {
      // Remove TODO.md
      await workspace.removeFile('TODO.md');
      
      await agent.bootstrap('master-plan.md');
      
      const todoContent = await workspace.readFile('TODO.md');
      expect(todoContent).toContain('# To-Do');
      expect(todoContent).toContain('## Pending Issues');
      expect(todoContent).toContain('## Completed Issues');
      expect(todoContent).toContainTodoItem(1, false);
    });
  });

  describe('with existing TODO items', () => {
    it('should preserve existing pending issues', async () => {
      // Setup existing TODO with pending issues
      const existingTodo = `# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **[Issue #1]** Existing Issue 1 - \`issues/1-existing-issue-1.md\`
- [ ] **[Issue #2]** Existing Issue 2 - \`issues/2-existing-issue-2.md\`

## Completed Issues
- [x] **[Issue #0]** Setup Project - \`issues/0-setup-project.md\`
`;
      await workspace.writeFile('TODO.md', existingTodo);
      
      await agent.bootstrap('master-plan.md');
      
      const todoContent = await workspace.readFile('TODO.md');
      
      // Should preserve existing items
      expect(todoContent).toContain('Existing Issue 1');
      expect(todoContent).toContain('Existing Issue 2');
      expect(todoContent).toContain('Setup Project');
      
      // Should add new bootstrap issue (issue #3 since 1,2 exist)
      expect(todoContent).toContainTodoItem(3, false);
      expect(todoContent).toMatch(/Issue #3.*bootstrap/i);
    });

    it('should preserve completed issues', async () => {
      const existingTodo = `# To-Do

## Pending Issues

## Completed Issues
- [x] **[Issue #1]** Completed Task - \`issues/1-completed-task.md\`
- [x] **[Issue #2]** Another Completed Task - \`issues/2-another-completed-task.md\`
`;
      await workspace.writeFile('TODO.md', existingTodo);
      
      await agent.bootstrap('master-plan.md');
      
      const todoContent = await workspace.readFile('TODO.md');
      
      // Should preserve completed items
      expect(todoContent).toContain('Completed Task');
      expect(todoContent).toContain('Another Completed Task');
      
      // Should add new bootstrap issue (issue #3)
      expect(todoContent).toContainTodoItem(3, false);
    });
  });

  describe('edge cases', () => {
    it('should handle TODO without proper sections', async () => {
      const malformedTodo = `# My Custom TODO

Some custom content here.
`;
      await workspace.writeFile('TODO.md', malformedTodo);
      
      await agent.bootstrap('master-plan.md');
      
      const todoContent = await workspace.readFile('TODO.md');
      
      // Should preserve original content
      expect(todoContent).toContain('My Custom TODO');
      expect(todoContent).toContain('Some custom content here.');
      
      // Should add pending issues section
      expect(todoContent).toContain('## Pending Issues');
      expect(todoContent).toContainTodoItem(1, false);
    });

    it('should handle completely empty file', async () => {
      await workspace.writeFile('TODO.md', '');
      
      await agent.bootstrap('master-plan.md');
      
      const todoContent = await workspace.readFile('TODO.md');
      expect(todoContent).toContain('# To-Do');
      expect(todoContent).toContainTodoItem(1, false);
    });

    it('should handle missing TODO.md file', async () => {
      await workspace.removeFile('TODO.md');
      
      await agent.bootstrap('master-plan.md');
      
      const todoContent = await workspace.readFile('TODO.md');
      expect(todoContent).toContain('# To-Do');
      expect(todoContent).toContainTodoItem(1, false);
    });
  });
});

describe('TODO update consistency', () => {
  it('should use same format for bootstrap and createIssue', async () => {
    const workspace = await TestWorkspace.create();
    await workspace.setupStandardStructure();
    const agent = new AutonomousAgent({ workspace: workspace.path });

    // Create issue through createIssue
    await agent.createIssue('Manual Issue');
    const todoAfterCreate = await workspace.readFile('TODO.md');

    // Create issue through bootstrap  
    await agent.bootstrap('master-plan.md');
    const todoAfterBootstrap = await workspace.readFile('TODO.md');

    // Both should use same format
    const manualIssueMatch = todoAfterBootstrap.match(/- \[ \] \*\*\[Issue #1\]\*\* Manual Issue - `issues\/.*\.md`/);
    const bootstrapIssueMatch = todoAfterBootstrap.match(/- \[ \] \*\*\[Issue #2\]\*\* .* - `issues\/.*\.md`/);

    expect(manualIssueMatch).toBeTruthy();
    expect(bootstrapIssueMatch).toBeTruthy();

    await workspace.cleanup();
  });
});
```

### Integration Tests

```typescript
describe('Bootstrap Integration', () => {
  it('should work with full workflow', async () => {
    const workspace = await TestWorkspace.create();
    await workspace.setupStandardStructure();
    
    // Setup existing project state
    await workspace.createIssue(1, 'Existing Issue');
    
    // Run bootstrap
    const { stdout } = await workspace.exec('autoagent bootstrap master-plan.md');
    expect(stdout).toContain('Bootstrap completed');
    
    // Verify no data loss
    const todoContent = await workspace.readFile('TODO.md');
    expect(todoContent).toContain('Existing Issue');
    expect(todoContent).toMatch(/Issue #2.*bootstrap/i);
    
    await workspace.cleanup();
  });
});
```

### Regression Tests

```typescript
describe('Bootstrap Regression Tests', () => {
  it('should not break empty project bootstrap', async () => {
    // Test that we didn't break the original use case
    const workspace = await TestWorkspace.create();
    await workspace.setupStandardStructure();
    
    // Remove TODO.md to simulate empty project
    await workspace.removeFile('TODO.md');
    
    const agent = new AutonomousAgent({ workspace: workspace.path });
    await agent.bootstrap('master-plan.md');
    
    const todoContent = await workspace.readFile('TODO.md');
    expect(todoContent).toContain('# To-Do');
    expect(todoContent).toContainTodoItem(1, false);
    
    await workspace.cleanup();
  });
});
```

## Performance Considerations

### Current Performance
- Bootstrap reads master plan file and creates 2 files (issue + plan)
- Currently overwrites TODO.md with template string
- O(1) operation - no existing content processing

### Impact Analysis
- **Added Cost**: One additional file read operation (`readTodo()`)
- **Processing Cost**: String manipulation for TODO content (typically < 10KB)
- **Time Complexity**: O(n) where n = size of existing TODO content
- **Memory Impact**: Minimal - holds TODO content temporarily in memory

### Optimization Opportunities
- TODO content is typically small (< 10KB even for large projects)
- String replacement operations are fast in modern JavaScript
- No optimization needed for current scale

### Performance Comparison
```
Before: Create template string (O(1)) + Write file (O(1)) = O(1)
After:  Read existing file (O(n)) + String replacement (O(n)) + Write file (O(n)) = O(n)

Where n = TODO file size (typically < 10KB)
```

The performance impact is negligible for real-world usage.

## Security Considerations

### Positive Security Impact
- **Prevents Data Loss**: Reduces accidental loss of TODO items
- **Maintains Data Integrity**: Preserves user work and project state
- **Consistent Behavior**: Reduces unexpected outcomes that could mask issues

### No New Security Risks
- Uses existing `readTodo()` and `updateTodo()` methods
- No new file system operations beyond existing pattern
- No new user input processing or validation
- Same file permissions and access patterns

### Edge Case Security
- Malformed TODO files are handled gracefully with fallback logic
- No risk of code injection - only text content manipulation
- File path validation remains unchanged (existing security model)

## Documentation

### Code Documentation
```typescript
/**
 * Appends a new issue to the TODO.md file, preserving existing content.
 * Creates initial TODO structure if file is empty or missing.
 * 
 * @param issueNumber - The issue number to add
 * @param title - The issue title
 * @private
 */
private async addIssueToTodo(issueNumber: number, title: string): Promise<void>
```

### User Documentation
Update the bootstrap documentation to clarify the behavior:

```markdown
## Bootstrap Command

The `autoagent bootstrap` command decomposes a master plan into individual issues.

### Behavior with Existing Projects

- **Preserves existing TODO items**: Bootstrap appends new issues without losing existing work
- **Maintains issue numbering**: Uses next available issue number in sequence
- **Safe for active projects**: Can be used without risk of data loss

### Examples

```bash
# Empty project - creates initial TODO structure
autoagent bootstrap master-plan.md

# Project with existing issues - appends to TODO
autoagent bootstrap additional-features.md
```
```

### API Documentation
No changes needed - internal implementation improvement only.

## Implementation Phases

### Phase 1: Core Fix (4 hours)

1. **Extract Common Logic** (1 hour)
   - Create `addIssueToTodo()` helper method
   - Handle empty/missing TODO file cases
   - Add proper error handling

2. **Update Bootstrap Method** (1 hour)
   - Replace TODO overwrite with append operation
   - Test with various TODO states (empty, existing content)

3. **Refactor createIssue Method** (1 hour)
   - Use shared `addIssueToTodo()` method
   - Ensure consistent behavior

4. **Manual Testing** (1 hour)
   - Test bootstrap in empty project
   - Test bootstrap with existing TODO items
   - Verify no regression in createIssue behavior

### Phase 2: Comprehensive Testing (6 hours)

1. **Unit Tests** (3 hours)
   - Test empty TODO scenarios
   - Test existing content preservation
   - Test edge cases (malformed files, missing sections)
   - Test TODO format consistency

2. **Integration Tests** (2 hours)
   - End-to-end bootstrap workflow
   - CLI integration testing
   - Regression testing for empty projects

3. **Edge Case Testing** (1 hour)
   - Large TODO files
   - Unicode content
   - Filesystem permission issues

### Phase 3: Documentation and Release (2 hours)

1. **Documentation Updates** (1 hour)
   - Code comments
   - CHANGELOG.md entry
   - User documentation examples

2. **Release Preparation** (1 hour)
   - Version bump (patch)
   - Release notes
   - Testing checklist review

## Open Questions

### 1. Should we validate TODO format before appending?

**Question**: Should bootstrap validate that the existing TODO.md follows the expected format?

**Options**:
- A: Always append, use fallback for unexpected formats
- B: Validate format and warn user about issues
- C: Fail bootstrap if TODO format is unexpected

**Recommendation**: Option A - be permissive and robust with fallback logic

### 2. How should we handle extremely large TODO files?

**Question**: Should we implement any size limits or performance warnings?

**Analysis**: 
- TODO files are typically small (< 10KB)
- Even 1000 issues would be ~100KB (manageable)
- String operations are fast in Node.js

**Recommendation**: No size limits needed - handle gracefully

### 3. Should we maintain insertion order in pending issues?

**Question**: Should new bootstrap issues be added at the top or bottom of pending issues?

**Current Behavior**: `createIssue` adds at top (after "## Pending Issues" line)

**Recommendation**: Maintain consistency - add at top like `createIssue`

### 4. Should we add a backup/recovery mechanism?

**Question**: Should bootstrap create a backup of TODO.md before modifying it?

**Analysis**:
- Git provides version control for most users
- File operations are atomic in this context
- Added complexity may not be worth it

**Recommendation**: No backup needed - rely on Git for recovery

---

## Summary

This specification addresses a critical data loss bug where the bootstrap command overwrites existing TODO.md content instead of appending to it. The fix aligns bootstrap behavior with the existing `createIssue` pattern, ensuring data preservation and consistent workflow behavior.

The solution is:
- **Low Risk**: Uses existing patterns and methods
- **High Value**: Prevents data loss and enables safe bootstrap usage
- **Backward Compatible**: Maintains same behavior for empty projects
- **Well Tested**: Comprehensive test coverage for all scenarios

The implementation preserves user work while maintaining the expected bootstrap functionality, making it safe to use in active projects with existing TODO items.