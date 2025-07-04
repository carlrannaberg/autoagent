# Post-Vitest Migration Issues Specification

## Overview
Following the merge of PR #11 (Vitest migration) to master, several CI/CD pipeline issues have emerged that need to be addressed.

## Current State
- **PR #11**: Successfully merged to master
- **Version**: v0.2.0
- **Last Successful Build**: Before Vitest migration
- **Current Build Status**: Failing

## Critical Issues

### 1. Performance Benchmarks Failing
**Severity**: High  
**Affected Workflow**: Test and Lint → Performance Benchmarks job  
**Error**: Vitest benchmark runner cannot find 'json' reporter

```
Error: Failed to load custom Reporter from json
Error: Cannot find package 'json'
```

**Root Cause**: The npm script uses `--reporter=json` but Vitest doesn't have a built-in JSON reporter for benchmarks.

**Command**: `npm run bench` → `vitest bench --config vitest.bench.config.ts --reporter=json --outputFile=bench-results.json`

**Impact**: 
- Performance benchmarks cannot run
- CI/CD pipeline fails on every push to master
- Cannot store benchmark results for performance tracking

### 2. ESLint Configuration Incompatibility
**Severity**: High  
**Affected**: Dependabot PR #10 and any future ESLint operations  
**Error**: ESLint 9.30.1 requires new configuration format

```
ESLint couldn't find an eslint.config.(js|mjs|cjs) file.
From ESLint v9.0.0, the default configuration file is now eslint.config.js.
```

**Root Cause**: Dependabot updated ESLint to v9.30.1, which no longer supports `.eslintrc.js` format.

**Current Config**: `.eslintrc.js` (old format)  
**Required Config**: `eslint.config.js` (new flat config format)

**Impact**:
- Cannot run `npm run lint`
- Dependabot PRs fail version check and linting
- Development workflow blocked for contributors

### 3. Missing Test Artifacts
**Severity**: Medium  
**Affected Workflows**: All test jobs  
**Warning**: "No files were found with the provided path: coverage/ test-results/"

**Impact**:
- Cannot upload test results to GitHub
- Cannot upload coverage reports to Codecov
- Reduced visibility into test execution details

## Required Actions

### Immediate (P0)
1. Fix Vitest benchmark reporter configuration
   - Remove `--reporter=json` or implement custom JSON reporter
   - Update benchmark workflow to handle new output format

2. Migrate ESLint configuration to v9 format
   - Convert `.eslintrc.js` to `eslint.config.js`
   - Update all ESLint-related configurations
   - Test with ESLint 9.30.1

### Short-term (P1)
3. Fix test artifact generation
   - Ensure Vitest generates coverage reports in expected location
   - Update artifact upload paths in GitHub workflows
   - Verify Codecov integration

4. Update Dependabot configuration
   - Consider pinning ESLint to v8.x until migration is ready
   - Or configure version update rules

## Testing Requirements
- All GitHub workflow jobs must pass
- `npm run check` must complete successfully
- Dependabot PRs should pass automated checks
- Performance benchmarks should generate storable results

## Success Criteria
- ✅ Master branch builds are green
- ✅ Performance benchmarks run and store results
- ✅ ESLint runs with no configuration errors
- ✅ Test artifacts are properly uploaded
- ✅ Dependabot PRs can be merged without manual intervention

## Monitoring Workflow Status with GitHub CLI

### Prerequisites
Ensure you have the GitHub CLI (`gh`) installed and authenticated:
```bash
gh auth status
```

### Useful Commands for Checking Workflow Results

#### 1. List All Workflows
```bash
gh workflow list --repo carlrannaberg/autoagent
```

#### 2. Check Recent Test Workflow Runs
```bash
# List recent runs of "Test and Lint" workflow
gh run list --workflow="Test and Lint" --repo carlrannaberg/autoagent --limit 10

# Check only master branch runs
gh run list --workflow="Test and Lint" --branch=master --repo carlrannaberg/autoagent --limit 5
```

#### 3. View Specific Run Details
```bash
# View run summary (replace RUN_ID with actual ID)
gh run view RUN_ID --repo carlrannaberg/autoagent

# View failed logs
gh run view RUN_ID --log-failed --repo carlrannaberg/autoagent

# View specific job logs
gh run view RUN_ID --log --job=JOB_ID --repo carlrannaberg/autoagent
```

#### 4. Check Pull Request Status
```bash
# View PR details
gh pr view 10 --repo carlrannaberg/autoagent

# Check PR checks status
gh pr checks 10 --repo carlrannaberg/autoagent
```

#### 5. Monitor Workflow in Real-Time
```bash
# Watch a running workflow
gh run watch RUN_ID --repo carlrannaberg/autoagent
```

#### 6. Filter by Status
```bash
# Show only failed runs
gh run list --workflow="Test and Lint" --status=failure --repo carlrannaberg/autoagent

# Show completed runs
gh run list --workflow="Test and Lint" --status=completed --repo carlrannaberg/autoagent
```

### Example Troubleshooting Session
```bash
# 1. Check latest master branch status
gh run list --branch=master --limit 1 --repo carlrannaberg/autoagent

# 2. If failed, get the run ID and check details
gh run view 16068665223 --repo carlrannaberg/autoagent

# 3. View specific failure logs
gh run view 16068665223 --log-failed --repo carlrannaberg/autoagent

# 4. Check specific job failure (e.g., Performance Benchmarks)
gh run view 16068665223 --log-failed --repo carlrannaberg/autoagent | grep -A 20 "Run benchmarks"
```

### Quick Diagnosis Commands
```bash
# Check all failing workflows at once
gh run list --status=failure --limit=5 --repo carlrannaberg/autoagent

# Get summary of latest master build
gh run list --branch=master --limit=1 --repo carlrannaberg/autoagent --json status,conclusion,name,headBranch,updatedAt

# Check specific workflow file
gh workflow view "Test and Lint" --repo carlrannaberg/autoagent
```