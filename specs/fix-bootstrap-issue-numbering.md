# Fix Bootstrap Issue Numbering

## Overview

The bootstrap command currently hardcodes the issue number to 1, ignoring existing issues in the workspace. This prevents proper integration with existing projects that already have issues numbered sequentially.

## Background/Problem Statement

### Current Behavior
When running `autoagent bootstrap <plan-file>`, the system:
1. Creates a bootstrap issue with hardcoded issue number `1`
2. Ignores any existing issues in the `issues/` directory
3. Can overwrite existing issue #1 if it exists
4. Breaks sequential issue numbering continuity

### Root Cause
In `src/core/autonomous-agent.ts:821`, the bootstrap method contains:
```typescript
const issueNumber = 1;  // Hardcoded value
```

### Impact
- **Data Loss Risk**: Can overwrite existing issue #1
- **Numbering Conflicts**: Creates gaps or duplicates in issue sequence
- **Workflow Disruption**: Bootstrap can't be used safely in active projects
- **Inconsistent Behavior**: Other issue creation respects existing numbering

## Goals

1. **Dynamic Issue Numbering**: Bootstrap should use the next available issue number
2. **Backward Compatibility**: Maintain existing behavior for empty projects
3. **Data Safety**: Never overwrite existing issues
4. **Consistency**: Align bootstrap behavior with other issue creation methods
5. **Robustness**: Handle edge cases gracefully

## Non-Goals

- Changing the bootstrap workflow or command interface
- Modifying existing issue numbering logic in FileManager
- Altering the bootstrap prompt or AI interaction
- Implementing issue renumbering or reorganization features

## Detailed Design

### Architecture Changes

The fix involves a simple but critical change to the bootstrap method:

**Before:**
```typescript
// Line 821 in src/core/autonomous-agent.ts
const issueNumber = 1;  // Hardcoded
```

**After:**
```typescript
// Use existing FileManager method
const issueNumber = await this.fileManager.getNextIssueNumber();
```

### Implementation Approach

#### 1. Method Integration
- Leverage existing `FileManager.getNextIssueNumber()` method
- This method already handles:
  - Directory scanning for existing issues
  - Number extraction from filenames (`/^\d+-.*\.md$/`)
  - Maximum number calculation
  - Fallback to 1 for empty directories

#### 2. Error Handling
The `getNextIssueNumber()` method already includes robust error handling:
- Handles missing `issues/` directory (returns 1)
- Filters out malformed filenames
- Gracefully handles filesystem errors

#### 3. File Conflict Prevention
By using the correct issue number:
- Bootstrap will never overwrite existing issues
- Maintains sequential numbering integrity
- Preserves existing project state

### Code Structure

```typescript
// In src/core/autonomous-agent.ts, bootstrap method
async bootstrap(masterPlanPath: string): Promise<void> {
  const provider = await this.getProviderForOperation();
  if (!provider) {
    throw new Error('No available providers for bootstrap');
  }

  // ... existing code for reading master plan and templates ...

  // FIXED: Use dynamic issue numbering instead of hardcoded 1
  const issueNumber = await this.fileManager.getNextIssueNumber();
  
  // ... rest of the method remains unchanged ...
}
```

### API Changes

**No API changes required** - this is an internal implementation fix that maintains the same public interface.

## Migration Strategy

### For Users
- **No migration required** - the change is backward compatible
- Existing bootstrap usage patterns remain unchanged
- Command line interface stays identical

### For Existing Projects
- Projects with no issues: Bootstrap creates issue #1 (same as before)
- Projects with existing issues: Bootstrap creates next sequential issue
- No data migration or cleanup required

### Deployment Strategy
1. This can be deployed as a patch release (bug fix)
2. No breaking changes to public APIs
3. No configuration changes required

## Testing Strategy

### Unit Tests
```typescript
describe('AutonomousAgent.bootstrap', () => {
  describe('issue numbering', () => {
    it('should create issue #1 in empty project', async () => {
      // Test with no existing issues
      const agent = new AutonomousAgent({ workspace: emptyWorkspace });
      await agent.bootstrap('master-plan.md');
      
      expect(await fileManager.getIssues()).toHaveLength(1);
      expect((await fileManager.getIssues())[0].number).toBe(1);
    });

    it('should create next sequential issue number', async () => {
      // Setup: Create issues 1, 2, 3
      await createTestIssue(1, 'Existing Issue 1');
      await createTestIssue(2, 'Existing Issue 2');
      await createTestIssue(3, 'Existing Issue 3');
      
      const agent = new AutonomousAgent({ workspace: testWorkspace });
      await agent.bootstrap('master-plan.md');
      
      const issues = await fileManager.getIssues();
      expect(issues).toHaveLength(4);
      expect(issues.find(i => i.title.includes('bootstrap')).number).toBe(4);
    });

    it('should handle gaps in issue numbering', async () => {
      // Setup: Create issues 1, 3, 5 (with gaps)
      await createTestIssue(1, 'Issue 1');
      await createTestIssue(3, 'Issue 3');
      await createTestIssue(5, 'Issue 5');
      
      const agent = new AutonomousAgent({ workspace: testWorkspace });
      await agent.bootstrap('master-plan.md');
      
      const issues = await fileManager.getIssues();
      expect(issues.find(i => i.title.includes('bootstrap')).number).toBe(6);
    });

    it('should not overwrite existing issues', async () => {
      // Setup: Create existing issue #1
      const originalIssue = await createTestIssue(1, 'Original Issue');
      
      const agent = new AutonomousAgent({ workspace: testWorkspace });
      await agent.bootstrap('master-plan.md');
      
      // Verify original issue is preserved
      const issue1 = await fileManager.getIssue(1);
      expect(issue1.title).toBe('Original Issue');
      
      // Verify bootstrap created issue #2
      const issue2 = await fileManager.getIssue(2);
      expect(issue2.title).toContain('bootstrap');
    });
  });
});
```

### Integration Tests
```typescript
describe('Bootstrap Integration', () => {
  it('should integrate with existing workflow', async () => {
    // Create a project with existing issues
    await setupProjectWithIssues([1, 2, 3]);
    
    // Run bootstrap
    await runCommand('autoagent bootstrap master-plan.md');
    
    // Verify no conflicts and proper numbering
    const status = await runCommand('autoagent status');
    expect(status).toContain('Total issues: 4');
    expect(status).toContain('Next issue: #4');
  });
});
```

### Edge Case Tests
```typescript
describe('Bootstrap Edge Cases', () => {
  it('should handle corrupted issue directory', async () => {
    // Create invalid files in issues directory
    await fs.writeFile('issues/invalid-file.txt', 'not an issue');
    await fs.writeFile('issues/malformed-name.md', 'content');
    
    const agent = new AutonomousAgent({ workspace: testWorkspace });
    await agent.bootstrap('master-plan.md');
    
    // Should still work and create issue #1
    expect((await fileManager.getIssues())[0].number).toBe(1);
  });

  it('should handle concurrent bootstrap execution', async () => {
    // Test race condition protection (if any)
    const promises = [
      agent1.bootstrap('plan1.md'),
      agent2.bootstrap('plan2.md')
    ];
    
    await Promise.all(promises);
    
    // Verify no issue number conflicts
    const issues = await fileManager.getIssues();
    const numbers = issues.map(i => i.number);
    expect(new Set(numbers).size).toBe(numbers.length); // No duplicates
  });
});
```

## Performance Considerations

### Current Performance
- Bootstrap already calls `FileManager` methods
- `getNextIssueNumber()` is an O(n) operation where n = number of issue files
- Typical projects have < 100 issues, so impact is negligible

### Impact Analysis
- **Added Cost**: One additional filesystem read (directory listing)
- **Time Complexity**: O(n) where n = existing issues (typically < 100)
- **Memory Impact**: Minimal - only stores list of filenames temporarily
- **Network Impact**: None - purely local filesystem operation

### Optimization Opportunities
- FileManager could cache issue counts if performance becomes an issue
- Directory watching could maintain real-time counts
- These optimizations are not needed for current scale

## Security Considerations

### Positive Security Impact
- **Prevents Accidental Overwrites**: Reduces risk of data loss
- **Maintains Data Integrity**: Preserves existing project state
- **Consistent Behavior**: Reduces unexpected edge cases

### No New Security Risks
- Uses existing, tested `getNextIssueNumber()` method
- No new filesystem operations or permissions required
- No new user input processing or validation

### Edge Case Security
- Malicious filenames in issues directory are already handled by existing regex filtering
- Path traversal attacks not possible - only reads from known issues directory
- No privilege escalation concerns

## Documentation

### Code Documentation
- Add inline comment explaining the change from hardcoded value
- Update method docstring to reflect dynamic numbering behavior

### User Documentation
- Update CLI help text to clarify bootstrap behavior with existing issues
- Add example in README showing bootstrap with existing project
- Document expected behavior in edge cases

### API Documentation
- No changes needed - internal implementation detail
- Existing bootstrap documentation remains accurate

## Implementation Phases

### Phase 1: Core Fix (1 day)
1. **Change Implementation** (30 minutes)
   - Replace hardcoded `issueNumber = 1` with `await this.fileManager.getNextIssueNumber()`
   - Add inline documentation

2. **Unit Test Creation** (3 hours)
   - Test empty project scenario
   - Test existing issues scenario
   - Test edge cases (gaps, invalid files)

3. **Manual Testing** (1 hour)
   - Test with real master-plan.md
   - Verify in both empty and populated projects

### Phase 2: Comprehensive Testing (1 day)
1. **Integration Tests** (2 hours)
   - End-to-end bootstrap workflow
   - CLI integration testing

2. **Edge Case Testing** (2 hours)
   - Malformed files in issues directory
   - Filesystem permission issues
   - Concurrent execution scenarios

3. **Performance Testing** (1 hour)
   - Benchmark with large number of existing issues
   - Verify no performance regression

### Phase 3: Documentation and Release (0.5 days)
1. **Documentation Updates** (1 hour)
   - Code comments
   - CHANGELOG.md entry
   - README examples

2. **Release Preparation** (1 hour)
   - Version bump (patch)
   - Release notes
   - Testing checklist

## Open Questions

### 1. Should bootstrap create a specific issue type marker?
**Question**: Should bootstrap-created issues be distinguishable from manually created ones?

**Options**:
- A: No change - treat bootstrap issues like any other issue
- B: Add metadata or tags to identify bootstrap origin
- C: Use different issue title prefix/suffix

**Recommendation**: Option A - keep it simple and consistent

### 2. What if getNextIssueNumber() fails?
**Question**: How should bootstrap handle filesystem errors from `getNextIssueNumber()`?

**Current Behavior**: Method throws errors up to caller
**Options**:
- A: Let errors bubble up (current behavior)
- B: Fallback to issueNumber = 1 with warning
- C: Retry logic with exponential backoff

**Recommendation**: Option A - consistent error handling with rest of system

### 3. Should we validate issue number availability?
**Question**: Should bootstrap double-check that the calculated issue number is actually available?

**Analysis**: 
- `getNextIssueNumber()` already handles this correctly
- Additional validation would be redundant
- Race conditions are extremely rare in single-user scenarios

**Recommendation**: No additional validation needed

### 4. Backward compatibility testing scope?
**Question**: How extensively should we test the change doesn't break existing workflows?

**Recommendation**: 
- Test bootstrap in empty projects (most common case)
- Test with 1-2 existing issues
- No need to test with hundreds of issues (performance is acceptable)

---

## Summary

This specification addresses a critical bug where the bootstrap command ignores existing issue numbering. The fix is minimal but important for data safety and workflow consistency. The solution leverages existing, well-tested infrastructure and maintains full backward compatibility while preventing potential data loss scenarios.

The implementation is straightforward, low-risk, and provides immediate value to users working with existing projects that need to use the bootstrap functionality.