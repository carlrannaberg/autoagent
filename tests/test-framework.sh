#!/bin/bash

# Simple test framework for shell scripts
# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Test setup and teardown
TEST_DIR=""
ORIGINAL_DIR=""
AFTER_EACH_CALLBACKS=()
AFTER_ALL_CALLBACKS=()

# Register cleanup callbacks
after_each() {
    AFTER_EACH_CALLBACKS+=("$1")
}

after_all() {
    AFTER_ALL_CALLBACKS+=("$1")
}

# Initialize test environment
init_test() {
    ORIGINAL_DIR=$(pwd)
    TEST_DIR=$(mktemp -d)
    cd "$TEST_DIR"
    echo "Test environment: $TEST_DIR"
}

# Run after each callbacks
run_after_each() {
    for callback in "${AFTER_EACH_CALLBACKS[@]}"; do
        eval "$callback" || echo "Warning: after_each callback failed: $callback"
    done
}

# Run after all callbacks
run_after_all() {
    for callback in "${AFTER_ALL_CALLBACKS[@]}"; do
        eval "$callback" || echo "Warning: after_all callback failed: $callback"
    done
}

# Cleanup test environment
cleanup_test() {
    run_after_all
    cd "$ORIGINAL_DIR"
    if [[ -n "$TEST_DIR" && -d "$TEST_DIR" ]]; then
        rm -rf "$TEST_DIR"
    fi
}

# Assert functions
assert_equals() {
    local expected="$1"
    local actual="$2"
    local message="${3:-}"
    
    TESTS_RUN=$((TESTS_RUN + 1))
    
    if [[ "$expected" == "$actual" ]]; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo -e "${GREEN}✓${NC} PASS: $message"
        return 0
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "${RED}✗${NC} FAIL: $message"
        echo -e "  Expected: '$expected'"
        echo -e "  Actual:   '$actual'"
        return 1
    fi
}

assert_file_exists() {
    local file="$1"
    local message="${2:-File $file should exist}"
    
    TESTS_RUN=$((TESTS_RUN + 1))
    
    if [[ -f "$file" ]]; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo -e "${GREEN}✓${NC} PASS: $message"
        return 0
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "${RED}✗${NC} FAIL: $message"
        return 1
    fi
}

assert_file_not_exists() {
    local file="$1"
    local message="${2:-File $file should not exist}"
    
    TESTS_RUN=$((TESTS_RUN + 1))
    
    if [[ ! -f "$file" ]]; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo -e "${GREEN}✓${NC} PASS: $message"
        return 0
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "${RED}✗${NC} FAIL: $message"
        return 1
    fi
}

assert_contains() {
    local haystack="$1"
    local needle="$2"
    local message="${3:-String should contain '$needle'}"
    
    TESTS_RUN=$((TESTS_RUN + 1))
    
    if [[ "$haystack" == *"$needle"* ]]; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo -e "${GREEN}✓${NC} PASS: $message"
        return 0
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "${RED}✗${NC} FAIL: $message"
        echo -e "  Haystack: '$haystack'"
        echo -e "  Needle:   '$needle'"
        return 1
    fi
}

assert_exit_code() {
    local expected_code="$1"
    local command="$2"
    local message="${3:-Command should exit with code $expected_code}"
    
    TESTS_RUN=$((TESTS_RUN + 1))
    
    eval "$command"
    local actual_code=$?
    
    if [[ $actual_code -eq $expected_code ]]; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo -e "${GREEN}✓${NC} PASS: $message"
        return 0
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "${RED}✗${NC} FAIL: $message"
        echo -e "  Expected exit code: $expected_code"
        echo -e "  Actual exit code:   $actual_code"
        return 1
    fi
}

# Print test results
print_results() {
    echo
    echo "==============================================="
    echo -e "Tests run: ${YELLOW}$TESTS_RUN${NC}"
    echo -e "Passed:    ${GREEN}$TESTS_PASSED${NC}"
    echo -e "Failed:    ${RED}$TESTS_FAILED${NC}"
    echo "==============================================="
    
    if [[ $TESTS_FAILED -eq 0 ]]; then
        echo -e "${GREEN}All tests passed!${NC}"
        return 0
    else
        echo -e "${RED}Some tests failed.${NC}"
        return 1
    fi
}

# Run individual test with cleanup
run_test() {
    local test_function="$1"
    local test_name="${2:-$test_function}"
    
    echo "Running: $test_name"
    
    # Run the test function
    if $test_function; then
        echo "✓ $test_name completed"
    else
        echo "✗ $test_name failed"
    fi
    
    # Run after_each callbacks
    run_after_each
    echo
}

# Test runner function
run_test_suite() {
    local test_file="$1"
    echo -e "${YELLOW}Running test suite: $test_file${NC}"
    echo "==============================================="
    
    init_test
    source "$test_file"
    cleanup_test
    
    print_results
}