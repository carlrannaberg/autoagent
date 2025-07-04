# Plan for Issue 13: Fix Test Artifacts Generation and Upload

This document outlines the step-by-step plan to fix test artifact generation and ensure proper upload to GitHub and Codecov.

## Implementation Plan

### Phase 1: Investigation
- [ ] Review current Vitest configuration
- [ ] Check coverage reporter settings
- [ ] Examine GitHub workflow artifact upload paths
- [ ] Verify expected vs actual output directories

### Phase 2: Configure Coverage Generation
- [ ] Update `vitest.config.ts` to ensure coverage is generated
- [ ] Configure coverage output directory to match workflow expectations
- [ ] Set appropriate coverage reporters (lcov, json, html)
- [ ] Ensure coverage runs by default or update npm scripts

### Phase 3: Configure Test Results
- [ ] Determine if Vitest generates test-results by default
- [ ] Configure test result output if needed
- [ ] Set up appropriate reporters for CI environment
- [ ] Ensure results are in format expected by GitHub

### Phase 4: Update GitHub Workflow
- [ ] Verify artifact upload paths match actual output
- [ ] Update paths if directories have changed
- [ ] Ensure artifacts are uploaded even on test failure
- [ ] Configure Codecov action with correct coverage path

### Phase 5: Testing and Validation
- [ ] Run tests locally and verify artifact creation
- [ ] Push changes and monitor CI/CD execution
- [ ] Verify artifacts are successfully uploaded
- [ ] Check Codecov receives coverage data
- [ ] Ensure no regression in test execution

## Technical Approach
### Vitest Configuration Updates
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'lcov', 'html'],
      reportsDirectory: './coverage'
    },
    reporters: ['default', 'json'],
    outputFile: './test-results/results.json'
  }
});
```

### GitHub Workflow Updates
```yaml
- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: test-results
    path: |
      coverage/
      test-results/
```

## Potential Challenges
- Different output paths between local and CI environments
- Vitest version differences affecting output formats
- Ensuring artifacts are created even when tests fail
- Codecov compatibility with Vitest coverage format

## Verification Steps
- [ ] `coverage/` directory exists after test run
- [ ] Coverage contains lcov.info for Codecov
- [ ] Test results are generated in expected format
- [ ] GitHub Actions finds and uploads artifacts
- [ ] Codecov comment appears on PRs

## Success Metrics
- No warnings about missing artifacts in CI logs
- Coverage reports visible in GitHub Actions
- Codecov successfully processes coverage data
- Test results accessible for debugging failures