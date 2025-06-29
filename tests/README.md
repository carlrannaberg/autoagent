# Test Suite for Autonomous Agents Scripts

This directory contains comprehensive tests for all the shell scripts in the autonomous agents template.

## Overview

The test suite validates the functionality of:
- `create-issue.sh` - Issue and plan creation
- `complete-issue.sh` - Manual issue completion
- `run-agent.sh` - Claude AI agent execution
- Integration workflows - End-to-end testing

## Quick Start

Run all tests:
```bash
./tests/run-tests.sh
```

Run specific test suite:
```bash
./tests/run-tests.sh --test create-issue
./tests/run-tests.sh --test complete-issue
./tests/run-tests.sh --test run-agent
./tests/run-tests.sh --test integration
```

Skip integration tests (faster):
```bash
./tests/run-tests.sh --no-integration
```

## Test Files

### Core Test Framework
- `test-framework.sh` - Simple bash testing framework with assertion functions
- `run-tests.sh` - Main test runner with options and reporting

### Unit Tests
- `test-create-issue.sh` - Tests for issue creation script
- `test-complete-issue.sh` - Tests for issue completion script  
- `test-run-agent.sh` - Tests for agent execution script

### Integration Tests
- `test-integration.sh` - End-to-end workflow testing

## Test Framework Features

The custom test framework provides:

### Assertions
- `assert_equals expected actual [message]` - Compare two values
- `assert_file_exists file [message]` - Check file existence
- `assert_file_not_exists file [message]` - Check file non-existence
- `assert_contains haystack needle [message]` - String contains check
- `assert_exit_code expected_code command [message]` - Exit code validation

### Environment Management
- `init_test()` - Set up isolated test environment
- `cleanup_test()` - Clean up test files
- `after_each(callback)` - Register cleanup function to run after each test
- `after_all(callback)` - Register cleanup function to run after all tests
- `run_test(function, name)` - Run individual test with automatic cleanup
- Automatic temporary directory creation

### Output
- Colored test results (✓ PASS, ✗ FAIL)
- Test counters and summary
- Detailed failure reporting

## Test Coverage

### create-issue.sh Tests
- ✅ First issue creation (ID assignment)
- ✅ Sequential issue numbering
- ✅ Title slugification with special characters
- ✅ Directory creation (issues/, plans/)
- ✅ File template generation
- ✅ Todo.md integration
- ✅ Existing todo.md preservation
- ✅ Missing argument handling
- ✅ ID generation with gaps in existing issues

### complete-issue.sh Tests
- ✅ Mark unchecked issues as complete
- ✅ Handle already completed issues
- ✅ Specific issue number targeting
- ✅ Non-existent issue handling
- ✅ Missing todo.md file handling
- ✅ Invalid argument validation
- ✅ Complex issue title handling
- ✅ Whitespace and formatting preservation
- ✅ Cross-platform sed compatibility

### run-agent.sh Tests
- ✅ Missing todo.md handling
- ✅ No unchecked issues scenario
- ✅ First unchecked issue detection
- ✅ Missing issue/plan file handling
- ✅ Claude CLI integration (mocked)
- ✅ Success/failure detection
- ✅ Auto mode multiple issue processing
- ✅ Auto mode failure handling
- ✅ Claude CLI availability checking

### Integration Tests
- ✅ Complete workflow (create → run → complete)
- ✅ Multiple issue processing
- ✅ Mixed completion states
- ✅ Pre-existing todo.md integration
- ✅ Error recovery scenarios
- ✅ Sequential ID assignment consistency
- ✅ File template consistency
- ✅ Cross-script data integrity

## Running Individual Tests

Each test file can be run independently:

```bash
# Run specific test file
bash tests/test-create-issue.sh

# Run with test framework
source tests/test-framework.sh
run_test_suite tests/test-create-issue.sh "Create Issue Tests"
```

## Test Environment

Tests run in isolated temporary directories to avoid:
- Conflicts with existing project files
- Test data pollution
- Race conditions between tests

Each test suite:
1. Creates a fresh temporary directory
2. Copies necessary script files
3. Runs tests in isolation with automatic cleanup between tests
4. Cleans up automatically

### Test Isolation

Each individual test gets a clean environment:
- **Before each test**: Fresh working directory with no artifacts
- **After each test**: Automatic cleanup of issues/, plans/, todo.md, mock files
- **PATH restoration**: Original PATH restored after each test

Example cleanup setup:
```bash
# Setup cleanup for after each test
cleanup_test_artifacts() {
    rm -rf issues plans todo.md
    rm -f claude .claude_call_count
    export PATH="$ORIGINAL_PATH"
}

# Register cleanup
after_each cleanup_test_artifacts
```

## Mocking

The test suite includes sophisticated mocking for external dependencies:

### Claude CLI Mocking
- Simulates successful/failed agent execution
- Mimics streaming JSON output format
- Configurable success/failure scenarios
- Call counting for multi-call scenarios

### Environment Mocking
- PATH manipulation for dependency testing
- File system state simulation
- Cross-platform compatibility testing

## Continuous Integration

The test suite is designed for CI/CD integration:

```bash
# CI-friendly run (exit codes, no colors)
./tests/run-tests.sh --no-integration

# Exit codes:
# 0 = All tests passed
# 1 = Some tests failed
```

## Contributing

When adding new functionality:

1. **Add unit tests** for individual script features
2. **Update integration tests** for workflow changes
3. **Test error scenarios** and edge cases
4. **Maintain test isolation** - no shared state between tests
5. **Use descriptive test names** and assertions

### Test Naming Convention
- Test functions: `test_descriptive_scenario_name()`
- Test files: `test-script-name.sh`
- Assertion messages: Clear, specific descriptions

### Adding New Tests

1. Create test function in appropriate file:
```bash
test_new_feature() {
    # Setup
    # ... test setup code
    
    # Execute
    # ... run the functionality
    
    # Assert
    assert_equals "expected" "actual" "Clear assertion message"
}
```

2. Add test execution with `run_test`:
```bash
run_test test_new_feature "Description of what is being tested"
```

3. Cleanup is automatically handled by the `after_each` callback
4. Update this README with new test coverage

### Test Cleanup Best Practices

- **Use `after_each` for cleanup**: Register cleanup functions that run after every test
- **Clean all artifacts**: Remove issues/, plans/, todo.md, and any mock files
- **Restore environment**: Reset PATH and other environment variables
- **Avoid test pollution**: Each test should start with a completely clean state

## Performance

The test suite is optimized for speed:
- Parallel test execution where possible
- Minimal external dependencies
- Efficient temporary directory usage
- Fast assertion implementations

Typical run times:
- Unit tests: ~5-10 seconds
- Integration tests: ~15-30 seconds
- Full suite: ~30-45 seconds

## Troubleshooting

### Common Issues

**Tests fail with "command not found"**
- Ensure scripts have execute permissions
- Check PATH includes script directory

**Temporary directory issues**
- Ensure `/tmp` is writable
- Check disk space availability

**Cross-platform issues**
- Test on both macOS and Linux
- Check sed command compatibility
- Verify PATH handling differences

### Debug Mode

Run with verbose output:
```bash
bash -x tests/test-create-issue.sh
```

Or add debug prints in test functions:
```bash
echo "Debug: Current state = $variable"
```

## Security

The test suite follows security best practices:
- No hardcoded secrets or credentials
- Isolated test environments
- Safe temporary file handling
- Input validation testing