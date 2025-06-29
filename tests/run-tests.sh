#!/bin/bash

# Test runner for autonomous agents scripts
# This script runs all test suites and provides a summary

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEST_FRAMEWORK="$SCRIPT_DIR/test-framework.sh"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test suite tracking
TOTAL_SUITES=0
PASSED_SUITES=0
FAILED_SUITES=0

# Test results tracking
TOTAL_TESTS=0
TOTAL_PASSED=0
TOTAL_FAILED=0

echo -e "${BLUE}🧪 Autonomous Agents Test Suite${NC}"
echo "========================================"
echo

# Function to run a test suite
run_test_suite() {
    local test_file="$1"
    local suite_name="$2"
    
    echo -e "${YELLOW}Running: $suite_name${NC}"
    echo "----------------------------------------"
    
    TOTAL_SUITES=$((TOTAL_SUITES + 1))
    
    # Capture test output and results
    if bash "$test_file"; then
        PASSED_SUITES=$((PASSED_SUITES + 1))
        echo -e "${GREEN}✓ $suite_name PASSED${NC}"
    else
        FAILED_SUITES=$((FAILED_SUITES + 1))
        echo -e "${RED}✗ $suite_name FAILED${NC}"
    fi
    
    echo
    echo
}

# Check if test framework exists
if [[ ! -f "$TEST_FRAMEWORK" ]]; then
    echo -e "${RED}Error: Test framework not found at $TEST_FRAMEWORK${NC}"
    exit 1
fi

# Parse command line arguments
RUN_INTEGRATION=true
VERBOSE=false
SPECIFIC_TEST=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --no-integration)
            RUN_INTEGRATION=false
            shift
            ;;
        --verbose|-v)
            VERBOSE=true
            shift
            ;;
        --test)
            SPECIFIC_TEST="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --no-integration     Skip integration tests"
            echo "  --verbose, -v        Verbose output"
            echo "  --test NAME          Run specific test suite"
            echo "  --help, -h           Show this help"
            echo ""
            echo "Available test suites:"
            echo "  create-issue         Test create-issue.sh script"
            echo "  create-bootstrap     Test create-bootstrap.sh script"
            echo "  complete-issue       Test complete-issue.sh script"
            echo "  run-agent           Test run-agent.sh script"
            echo "  integration         Test complete workflow"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Define test suites (using functions for compatibility)
get_test_suite_path() {
    case "$1" in
        "create-issue")
            echo "$SCRIPT_DIR/test-create-issue.sh"
            ;;
        "create-bootstrap")
            echo "$SCRIPT_DIR/test-create-bootstrap.sh"
            ;;
        "complete-issue")
            echo "$SCRIPT_DIR/test-complete-issue.sh"
            ;;
        "run-agent")
            echo "$SCRIPT_DIR/test-run-agent.sh"
            ;;
        "integration")
            echo "$SCRIPT_DIR/test-integration.sh"
            ;;
        *)
            echo ""
            ;;
    esac
}

get_available_test_suites() {
    echo "create-issue create-bootstrap complete-issue run-agent integration"
}

# Run specific test if requested
if [[ -n "$SPECIFIC_TEST" ]]; then
    TEST_PATH=$(get_test_suite_path "$SPECIFIC_TEST")
    if [[ -z "$TEST_PATH" ]]; then
        echo -e "${RED}Error: Unknown test suite '$SPECIFIC_TEST'${NC}"
        echo "Available test suites: $(get_available_test_suites)"
        exit 1
    fi
    
    echo -e "${BLUE}Running specific test suite: $SPECIFIC_TEST${NC}"
    echo
    
    run_test_suite "$TEST_PATH" "$SPECIFIC_TEST"
else
    # Run all test suites
    echo -e "${BLUE}Running all test suites...${NC}"
    echo
    
    # Unit tests
    run_test_suite "$(get_test_suite_path 'create-issue')" "Create Issue Script Tests"
    run_test_suite "$(get_test_suite_path 'create-bootstrap')" "Create Bootstrap Script Tests"
    run_test_suite "$(get_test_suite_path 'complete-issue')" "Complete Issue Script Tests"
    run_test_suite "$(get_test_suite_path 'run-agent')" "Run Agent Script Tests"
    
    # Integration tests (optional)
    if [[ "$RUN_INTEGRATION" == "true" ]]; then
        run_test_suite "$(get_test_suite_path 'integration')" "Integration Tests"
    fi
fi

# Print final summary
echo "========================================"
echo -e "${BLUE}📊 Test Summary${NC}"
echo "========================================"
echo -e "Test Suites Run:    ${YELLOW}$TOTAL_SUITES${NC}"
echo -e "Suites Passed:      ${GREEN}$PASSED_SUITES${NC}"
echo -e "Suites Failed:      ${RED}$FAILED_SUITES${NC}"
echo "========================================"

# Exit with appropriate code
if [[ $FAILED_SUITES -eq 0 ]]; then
    echo -e "${GREEN}🎉 All test suites passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some test suites failed.${NC}"
    exit 1
fi
