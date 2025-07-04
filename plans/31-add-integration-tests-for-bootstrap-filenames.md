# Plan for Issue 31: Add integration tests for bootstrap filenames

## Implementation Plan

### Phase 1: Core Integration Tests
- [ ] Test bootstrap method directly
- [ ] Verify issue and plan file creation
- [ ] Check filename consistency
- [ ] Test with various title formats

### Phase 2: CLI Integration Tests
- [ ] Test bootstrap command via CLI
- [ ] Verify file creation through command line
- [ ] Test error handling
- [ ] Check output messages

### Phase 3: Edge Cases
- [ ] Test with special characters in titles
- [ ] Test with very long titles
- [ ] Test error scenarios
- [ ] Test file system edge cases

## Technical Approach

### Integration Test Example
```typescript
describe('Bootstrap filename consistency', () => {
  it('should create matching issue and plan filenames', async () => {
    const agent = new AutonomousAgent({ workspace: testWorkspace });
    
    await agent.bootstrap('test-plan.md');
    
    const issuesFiles = await fs.readdir(path.join(testWorkspace, 'issues'));
    const plansFiles = await fs.readdir(path.join(testWorkspace, 'plans'));
    
    const issueFile = issuesFiles[0];
    const planFile = plansFiles[0];
    
    // Plan should match issue with -plan suffix
    expect(planFile).toBe(issueFile.replace('.md', '-plan.md'));
  });
});
```

### CLI Test Example
```typescript
describe('Bootstrap E2E filename consistency', () => {
  it('should create matching filenames through CLI', async () => {
    await execCLI(['bootstrap', 'test-master-plan.md']);
    // Verify files created with consistent names
  });
});
```

## Potential Challenges
- Setting up test workspace properly
- Mocking AI provider responses
- Cleaning up test files
- Handling async file operations

## Dependencies
- Issues 26-29 must be implemented
- Unit tests (Issue 30) should pass first