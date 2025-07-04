# Fix Bootstrap Filename Consistency Between Issues and Plans

## Overview

The bootstrap command creates inconsistent filenames between `/issues/*.md` and `/plans/*.md` files. Issue files use a title-based slug format while plan files use a simplified numeric format, breaking the expected pairing convention and making file relationships unclear.

## Background/Problem Statement

### Current Behavior

When running `autoagent bootstrap <plan-file>`, the system creates:

**Issue File** (line 867 in `src/core/autonomous-agent.ts`):
```typescript
const issueFilename = `${issueNumber}-${issueTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9.-]/g, '').replace(/\.+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')}.md`;
```
**Example**: `1-implement-plan-from-master-plan.md`

**Plan File** (line 159 in `src/utils/file-manager.ts`):
```typescript
const filename = `${issueNumber}-plan.md`;
```
**Example**: `1-plan.md`

### Root Cause Analysis

Two different filename generation strategies are used:

1. **Issue Creation**: Uses a **complex slug generation** that transforms the issue title into a URL-friendly format
2. **Plan Creation**: Uses a **simple numeric format** with static `-plan.md` suffix

### Impact

- **File Association Difficulty**: Hard to visually pair issues with their plans
- **Inconsistent Naming**: Different conventions across directories
- **User Confusion**: Non-intuitive plan file naming
- **Tool Compatibility**: Breaks assumptions about filename patterns
- **Workflow Disruption**: Manual effort required to match files

### Evidence

In bootstrap method (`src/core/autonomous-agent.ts:867`):
```typescript
// Creates: 1-implement-plan-from-master-plan.md
const issueFilename = `${issueNumber}-${issueTitle.toLowerCase()...}`;

// Later calls FileManager.createPlan which creates: 1-plan.md
await this.fileManager.createPlan(issueNumber, { ... }, issueTitle);
```

The `createPlan` method ignores the `issueTitle` parameter for filename generation and uses hardcoded `-plan.md`.

## Goals

1. **Consistent Naming**: Both issue and plan files should use the same slug generation algorithm
2. **Clear Association**: Plan filenames should clearly correspond to their issue files
3. **Backward Compatibility**: Maintain existing behavior for non-bootstrap workflows
4. **Predictable Patterns**: Users should be able to predict plan filenames from issue filenames
5. **Maintainable Code**: Centralize filename generation logic to prevent future inconsistencies

## Non-Goals

- Changing the overall directory structure (`issues/` and `plans/`)
- Modifying existing issue or plan file content formats
- Implementing automatic file renaming for existing projects
- Changing the CLI interface or command structure
- Affecting non-bootstrap issue/plan creation workflows

## Detailed Design

### Architecture Changes

The fix involves updating the `createPlan` method in `FileManager` to use the same slug generation algorithm as `createIssue` when an issue title is provided.

### Implementation Approach

#### 1. Centralize Slug Generation

Create a shared utility function for filename slug generation:

```typescript
// In src/utils/file-manager.ts
private generateFileSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '')
    .replace(/\.+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

#### 2. Update createPlan Method

Modify `createPlan` to optionally use title-based naming:

**Before:**
```typescript
async createPlan(issueNumber: number, plan: Plan, issueTitle: string): Promise<string> {
  const filename = `${issueNumber}-plan.md`;  // Always uses -plan.md
  // ...
}
```

**After:**
```typescript
async createPlan(issueNumber: number, plan: Plan, issueTitle?: string): Promise<string> {
  const filename = issueTitle 
    ? `${issueNumber}-${this.generateFileSlug(issueTitle)}-plan.md`
    : `${issueNumber}-plan.md`;  // Fallback for backward compatibility
  // ...
}
```

#### 3. Update Issue Creation

Refactor `createIssue` to use the centralized slug generation:

```typescript
async createIssue(issueOrNumber: Issue | number, title?: string, content?: string): Promise<string> {
  if (typeof issueOrNumber === 'number') {
    const filename = `${issueOrNumber}-${this.generateFileSlug(title ?? '')}.md`;
    // ...
  } else {
    const issue = issueOrNumber;
    const filename = `${issue.number}-${this.generateFileSlug(issue.title)}.md`;
    // ...
  }
}
```

#### 4. Update Bootstrap Logic

Remove the duplicate filename generation from the bootstrap method:

**Before:**
```typescript
// Line 867 - Duplicate slug generation
const issueFilename = `${issueNumber}-${issueTitle.toLowerCase().replace(/\s+/g, '-')...}.md`;
```

**After:**
```typescript
// FileManager handles slug generation consistently
// No duplicate logic needed
```

### Code Structure

```typescript
// src/utils/file-manager.ts

export class FileManager {
  private generateFileSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')           // Spaces to hyphens
      .replace(/[^a-z0-9.-]/g, '')    // Remove special chars except . and -
      .replace(/\.+/g, '-')           // Multiple dots to single hyphen
      .replace(/-+/g, '-')            // Multiple hyphens to single hyphen
      .replace(/^-+|-+$/g, '');       // Remove leading/trailing hyphens
  }

  async createIssue(issueNumber: number, title: string, content: string): Promise<string> {
    const filename = `${issueNumber}-${this.generateFileSlug(title)}.md`;
    // ... rest of implementation
  }

  async createPlan(issueNumber: number, plan: Plan, issueTitle?: string): Promise<string> {
    const filename = issueTitle 
      ? `${issueNumber}-${this.generateFileSlug(issueTitle)}-plan.md`
      : `${issueNumber}-plan.md`;
    // ... rest of implementation
  }
}
```

### Expected Outcomes

**Before Bootstrap:**
- Issue: `1-implement-plan-from-master-plan.md`
- Plan: `1-plan.md` ❌ **Inconsistent**

**After Bootstrap:**
- Issue: `1-implement-plan-from-master-plan.md`
- Plan: `1-implement-plan-from-master-plan-plan.md` ✅ **Consistent**

### API Changes

**FileManager.createPlan method signature:**
```typescript
// Before
async createPlan(issueNumber: number, plan: Plan, issueTitle: string): Promise<string>

// After (backward compatible)
async createPlan(issueNumber: number, plan: Plan, issueTitle?: string): Promise<string>
```

The change is **backward compatible** - existing code that doesn't pass `issueTitle` will continue to work with the fallback `-plan.md` naming.

## Migration Strategy

### For Users

**No migration required** - this is purely a forward-looking improvement:

- Existing projects continue to work unchanged
- New bootstrap operations will use consistent naming
- No breaking changes to CLI or workflows

### For Existing Code

**Backward compatibility maintained:**

- `createPlan` calls without `issueTitle` use old naming (`{number}-plan.md`)
- `createPlan` calls with `issueTitle` use new naming (`{number}-{slug}-plan.md`)
- All existing functionality continues to work

### Deployment Strategy

1. This can be deployed as a **patch release** (bug fix)
2. No configuration changes required
3. No data migration needed
4. Immediate improvement for new bootstrap operations

## Testing Strategy

### Unit Tests

```typescript
describe('FileManager.generateFileSlug', () => {
  it('should generate consistent slugs for various inputs', () => {
    const fileManager = new FileManager();
    
    expect(fileManager.generateFileSlug('Implement Plan from Master Plan'))
      .toBe('implement-plan-from-master-plan');
    
    expect(fileManager.generateFileSlug('Fix Bootstrap Issue #123'))
      .toBe('fix-bootstrap-issue-123');
    
    expect(fileManager.generateFileSlug('Add User Authentication'))
      .toBe('add-user-authentication');
  });

  it('should handle edge cases in slug generation', () => {
    const fileManager = new FileManager();
    
    expect(fileManager.generateFileSlug('Multiple...Dots')).toBe('multiple-dots');
    expect(fileManager.generateFileSlug('  Leading & Trailing  ')).toBe('leading-trailing');
    expect(fileManager.generateFileSlug('Special@#$%Characters!')).toBe('specialcharacters');
    expect(fileManager.generateFileSlug('---Hyphens---')).toBe('hyphens');
  });
});

describe('FileManager.createPlan filename consistency', () => {
  it('should create consistent filenames when issueTitle provided', async () => {
    const fileManager = new FileManager(testWorkspace);
    const plan = createTestPlan();
    
    await fileManager.createPlan(1, plan, 'Implement User Authentication');
    
    const expectedFilename = '1-implement-user-authentication-plan.md';
    expect(await fs.exists(path.join(testWorkspace, 'plans', expectedFilename)))
      .toBe(true);
  });

  it('should fallback to old naming when issueTitle not provided', async () => {
    const fileManager = new FileManager(testWorkspace);
    const plan = createTestPlan();
    
    await fileManager.createPlan(1, plan); // No issueTitle
    
    const expectedFilename = '1-plan.md';
    expect(await fs.exists(path.join(testWorkspace, 'plans', expectedFilename)))
      .toBe(true);
  });

  it('should maintain backward compatibility', async () => {
    const fileManager = new FileManager(testWorkspace);
    const plan = createTestPlan();
    
    // Old signature still works
    await fileManager.createPlan(1, plan, undefined);
    expect(await fs.exists(path.join(testWorkspace, 'plans', '1-plan.md')))
      .toBe(true);
  });
});
```

### Integration Tests

```typescript
describe('Bootstrap filename consistency', () => {
  it('should create matching issue and plan filenames', async () => {
    const agent = new AutonomousAgent({ workspace: testWorkspace });
    
    await agent.bootstrap('test-plan.md');
    
    const issuesFiles = await fs.readdir(path.join(testWorkspace, 'issues'));
    const plansFiles = await fs.readdir(path.join(testWorkspace, 'plans'));
    
    expect(issuesFiles).toHaveLength(1);
    expect(plansFiles).toHaveLength(1);
    
    const issueFile = issuesFiles[0];
    const planFile = plansFiles[0];
    
    // Extract base slug from issue filename
    const issueSlug = issueFile.replace(/\.md$/, '');
    const expectedPlanFile = `${issueSlug}-plan.md`;
    
    expect(planFile).toBe(expectedPlanFile);
  });

  it('should create predictable filenames from issue titles', async () => {
    const agent = new AutonomousAgent({ workspace: testWorkspace });
    
    // Mock the provider to return a specific title
    mockProvider.execute.mockResolvedValue({
      success: true,
      output: 'Mock execution result'
    });
    
    await agent.bootstrap('master-plan.md');
    
    const issuesFiles = await fs.readdir(path.join(testWorkspace, 'issues'));
    const plansFiles = await fs.readdir(path.join(testWorkspace, 'plans'));
    
    // Should follow pattern: {number}-{slug}.md and {number}-{slug}-plan.md
    expect(issuesFiles[0]).toMatch(/^\d+-[\w-]+\.md$/);
    expect(plansFiles[0]).toMatch(/^\d+-[\w-]+-plan\.md$/);
    
    // Plan should match issue with -plan suffix
    const issueBase = issuesFiles[0].replace(/\.md$/, '');
    expect(plansFiles[0]).toBe(`${issueBase}-plan.md`);
  });
});
```

### End-to-End Tests

```typescript
describe('Bootstrap E2E filename consistency', () => {
  it('should create matching filenames through CLI', async () => {
    await execCLI(['bootstrap', 'test-master-plan.md'], { cwd: testWorkspace });
    
    const files = await Promise.all([
      fs.readdir(path.join(testWorkspace, 'issues')),
      fs.readdir(path.join(testWorkspace, 'plans'))
    ]);
    
    const [issueFiles, planFiles] = files;
    
    expect(issueFiles).toHaveLength(1);
    expect(planFiles).toHaveLength(1);
    
    // Verify consistent naming pattern
    const issueFile = issueFiles[0];
    const planFile = planFiles[0];
    
    expect(planFile).toBe(issueFile.replace('.md', '-plan.md'));
  });
});
```

## Performance Considerations

### Current Performance
- Bootstrap creates 2 files (issue + plan)
- Each file creation involves slug generation
- Current code duplicates slug generation logic

### Impact Analysis
- **Positive Impact**: Eliminates duplicate slug generation in bootstrap
- **Processing Time**: Negligible change (same algorithm, run once instead of twice)
- **Memory Usage**: Slightly reduced (no duplicate string processing)
- **File I/O**: No change (same number of files created)

### Optimization Benefits
- **Code Efficiency**: Single slug generation instead of duplicate logic
- **Consistency**: Reduces computational overhead from inconsistent processing
- **Maintainability**: Centralized logic is easier to optimize

## Security Considerations

### Positive Security Impact
- **Input Sanitization**: Centralized slug generation ensures consistent sanitization
- **Path Safety**: Single implementation reduces risk of path traversal vulnerabilities
- **Validation**: Unified filename validation logic

### No New Security Risks
- Uses same sanitization algorithm as existing code
- No new input processing or validation logic
- No changes to file permissions or access patterns

### Enhanced Security
- **Reduced Attack Surface**: Centralized validation is easier to audit
- **Consistent Sanitization**: All filenames processed through same security logic
- **Input Validation**: Single point of control for filename sanitization

## Documentation

### Code Documentation
```typescript
/**
 * Generates a URL-friendly slug from a title for use in filenames.
 * Converts spaces to hyphens, removes special characters, and normalizes formatting.
 * 
 * @param title - The title to convert to a slug
 * @returns A sanitized slug suitable for filenames
 * 
 * @example
 * generateFileSlug('Implement User Authentication') // 'implement-user-authentication'
 * generateFileSlug('Fix Bug #123') // 'fix-bug-123'
 */
private generateFileSlug(title: string): string
```

### User Documentation
Update CLI help and README to clarify filename patterns:

```markdown
## File Naming Conventions

AutoAgent creates consistent filename patterns for issues and plans:

- **Issue files**: `{number}-{title-slug}.md`
- **Plan files**: `{number}-{title-slug}-plan.md`

### Examples
- Issue: `1-implement-user-authentication.md`
- Plan: `1-implement-user-authentication-plan.md`

This ensures clear file relationships and predictable naming patterns.
```

### API Documentation
No changes to public APIs - internal implementation improvement only.

## Implementation Phases

### Phase 1: Core Implementation (4 hours)

1. **Add generateFileSlug method** (30 minutes)
   - Create private method in FileManager
   - Extract existing slug logic
   - Add comprehensive comments

2. **Refactor createIssue method** (1 hour)
   - Replace inline slug generation with method call
   - Ensure both overloads use consistent logic
   - Test with existing issue creation

3. **Update createPlan method** (1 hour)
   - Modify to accept optional issueTitle
   - Implement conditional filename generation
   - Maintain backward compatibility

4. **Remove duplicate logic from bootstrap** (30 minutes)
   - Remove inline filename generation
   - Rely on FileManager for consistency
   - Clean up redundant code

5. **Manual testing** (1 hour)
   - Test bootstrap with various titles
   - Verify filename consistency
   - Check backward compatibility

### Phase 2: Testing and Documentation (3 hours)

1. **Unit tests** (1.5 hours)
   - Test generateFileSlug with edge cases
   - Test createPlan with and without issueTitle
   - Test createIssue consistency

2. **Integration tests** (1 hour)
   - Test full bootstrap workflow
   - Verify file pairing
   - Test CLI integration

3. **Documentation updates** (30 minutes)
   - Update code comments
   - Add README examples
   - Update CHANGELOG.md

### Phase 3: Quality Assurance (1 hour)

1. **Code review preparation** (20 minutes)
   - Self-review changes
   - Verify test coverage
   - Check for edge cases

2. **Final testing** (20 minutes)
   - Test with real master plans
   - Verify various title formats
   - Check special characters handling

3. **Release preparation** (20 minutes)
   - Version bump (patch)
   - Release notes
   - Final cleanup

## Open Questions

### 1. Should we include "-plan" suffix in the slug?

**Current Proposal**: `1-implement-user-auth-plan.md`

**Alternative**: `1-implement-user-auth.plan.md`

**Recommendation**: Keep `-plan.md` suffix as it's more conventional and readable

### 2. How should we handle very long issue titles?

**Question**: Should we truncate slugs to prevent extremely long filenames?

**Options**:
- A: No truncation - let filesystem handle limits
- B: Truncate to 50 characters with ellipsis
- C: Truncate to 100 characters (filesystem safe)

**Recommendation**: Option A - no truncation. Modern filesystems handle long names well, and truncation could cause confusion.

### 3. Should we validate filename uniqueness?

**Question**: What if two issues have titles that generate the same slug?

**Analysis**: 
- Issue numbers prevent conflicts (`1-title.md` vs `2-title.md`)
- Slug collisions only matter within same issue number
- Existing code doesn't handle this edge case

**Recommendation**: No additional validation needed - issue numbers provide uniqueness

### 4. Should we provide a migration tool for existing projects?

**Question**: Should we offer a utility to rename existing plan files for consistency?

**Options**:
- A: No migration tool - forward compatibility only
- B: Optional migration command
- C: Automatic migration on bootstrap

**Recommendation**: Option A - this is primarily for new bootstrap operations, and migration could be risky for existing workflows

### 5. How should we handle special bootstrap-generated plans vs regular plans?

**Question**: Should bootstrap plans be distinguishable from manually created plans?

**Analysis**:
- Bootstrap creates one initial plan that decomposes the master plan
- Regular issue execution might create different plans
- Current proposal treats all plans equally

**Recommendation**: Keep all plans equal - consistent naming is more important than distinguishing origin

---

## Summary

This specification addresses a filename consistency issue in the bootstrap command where issue files use title-based slugs but plan files use simple numeric names. The solution centralizes slug generation logic, ensuring both file types follow the same naming convention while maintaining full backward compatibility.

The fix is minimal, safe, and provides immediate value through:
- **Predictable file relationships** between issues and plans
- **Cleaner codebase** with centralized filename generation
- **Better user experience** with consistent naming patterns
- **Future-proof architecture** that prevents similar inconsistencies

The implementation requires no migration, introduces no breaking changes, and can be deployed as a patch release with immediate benefit to users creating new bootstrap workflows.