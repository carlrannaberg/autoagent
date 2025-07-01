#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Test modes
MODE=${1:-"all"}  # all, cli, direct, or specific test name

echo -e "${BLUE}🧪 AutoAgent Test Suite${NC}"
echo -e "${CYAN}Mode: $MODE${NC}"
echo ""

# Save current directory
ORIGINAL_DIR=$(pwd)
TEST_DIR=$(mktemp -d)
AUTOAGENT_BIN="$ORIGINAL_DIR/../bin/autoagent"

# Track test results
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🧹 Cleaning up test directory...${NC}"
    cd "$ORIGINAL_DIR"
    rm -rf "$TEST_DIR"
    echo -e "${GREEN}✅ Cleanup complete${NC}"
    
    # Show test summary
    echo -e "\n${BLUE}📊 Test Summary:${NC}"
    echo -e "Tests run: $TESTS_RUN"
    echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
    if [ $TESTS_FAILED -gt 0 ]; then
        echo -e "${RED}Failed: $TESTS_FAILED${NC}"
        exit 1
    fi
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Helper function to run a test
run_test() {
    local test_name=$1
    local test_func=$2
    
    if [ "$MODE" != "all" ] && [ "$MODE" != "$test_name" ]; then
        return
    fi
    
    TESTS_RUN=$((TESTS_RUN + 1))
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}Running test: $test_name${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    # Create fresh test directory for each test
    rm -rf "$TEST_DIR"
    mkdir -p "$TEST_DIR"
    cd "$TEST_DIR"
    
    if $test_func; then
        echo -e "${GREEN}✅ Test passed: $test_name${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ Test failed: $test_name${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Common setup function
setup_test_project() {
    # Create minimal package.json
    cat > "package.json" << 'EOF'
{
  "name": "test-autoagent-project",
  "version": "1.0.0",
  "description": "Test project for autoagent"
}
EOF

    # Create CLAUDE.md
    cat > "CLAUDE.md" << 'EOF'
# Claude Instructions
This is a test environment. When completing tasks:
- For "Test Task": Create test-output.txt with "Hello from autoagent!" and the current date
- For "Second Task": Create second-test.txt with "Second test complete"
EOF
}

# Build autoagent once at the start
echo -e "${BLUE}🔨 Building autoagent...${NC}"
cd "$ORIGINAL_DIR/.."
npm run build

# Test 1: CLI workflow - single issue
test_cli_single_issue() {
    setup_test_project
    
    # Initialize config
    "$AUTOAGENT_BIN" config init || return 1
    
    # Create issue using CLI
    "$AUTOAGENT_BIN" create "Test Task" || return 1
    
    # Run the issue
    "$AUTOAGENT_BIN" run || return 1
    
    # Verify results
    [ -f "test-output.txt" ] || return 1
    grep -q "Hello from autoagent!" test-output.txt || return 1
    grep -q "\[x\].*Test Task" TODO.md || return 1
    
    return 0
}

# Test 2: CLI workflow - multiple issues with --all
test_cli_multiple_issues() {
    setup_test_project
    
    # Initialize config
    "$AUTOAGENT_BIN" config init || return 1
    
    # Create two issues
    "$AUTOAGENT_BIN" create "Test Task" || return 1
    "$AUTOAGENT_BIN" create "Second Task" || return 1
    
    # Check status shows 2 pending
    STATUS=$("$AUTOAGENT_BIN" status 2>&1)
    echo "$STATUS" | grep -q "Pending:.*2" || return 1
    
    # Run all issues
    "$AUTOAGENT_BIN" run --all || return 1
    
    # Verify both files created
    [ -f "test-output.txt" ] || return 1
    [ -f "second-test.txt" ] || return 1
    
    # Verify both marked complete
    grep -q "\[x\].*Test Task" TODO.md || return 1
    grep -q "\[x\].*Second Task" TODO.md || return 1
    
    return 0
}

# Test 3: Direct file creation (edge case)
test_direct_file_workflow() {
    setup_test_project
    
    # Create directories
    mkdir -p issues plans logs
    
    # Create issue and plan files directly
    cat > "issues/1-test-task.md" << 'EOF'
# Issue 1: Test Task
## Requirements
Create a test file
## Acceptance Criteria
- [ ] Create test-output.txt with "Hello from autoagent!"
EOF

    cat > "plans/1-test-task.md" << 'EOF'
# Plan for Issue 1: Test Task
## Implementation Plan
- [ ] Create test-output.txt with required content
EOF

    # Create TODO.md
    cat > "TODO.md" << 'EOF'
# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **[Issue #1]** Test Task - `issues/1-test-task.md`
EOF

    # Run
    "$AUTOAGENT_BIN" run || return 1
    
    # Verify
    [ -f "test-output.txt" ] || return 1
    grep -q "\[x\]" TODO.md || return 1
    
    return 0
}

# Test 4: Adding issue after first completion
test_incremental_issues() {
    setup_test_project
    
    # Initialize and create first issue
    "$AUTOAGENT_BIN" config init || return 1
    "$AUTOAGENT_BIN" create "Test Task" || return 1
    
    # Run first issue
    "$AUTOAGENT_BIN" run || return 1
    [ -f "test-output.txt" ] || return 1
    
    # Add second issue after first is complete
    "$AUTOAGENT_BIN" create "Second Task" || return 1
    
    # Run with --all should pick up the new issue
    "$AUTOAGENT_BIN" run --all || return 1
    
    # Verify second file created
    [ -f "second-test.txt" ] || return 1
    
    return 0
}

# Test 5: Status command
test_status_command() {
    setup_test_project
    
    "$AUTOAGENT_BIN" config init || return 1
    "$AUTOAGENT_BIN" create "Test Task" || return 1
    "$AUTOAGENT_BIN" create "Second Task" || return 1
    
    # Check initial status
    STATUS=$("$AUTOAGENT_BIN" status 2>&1)
    echo "$STATUS" | grep -q "Total Issues:.*2" || return 1
    echo "$STATUS" | grep -q "Pending:.*2" || return 1
    echo "$STATUS" | grep -q "Completed:.*0" || return 1
    
    # Run one issue
    "$AUTOAGENT_BIN" run || return 1
    
    # Check status after one completion
    STATUS=$("$AUTOAGENT_BIN" status 2>&1)
    echo "$STATUS" | grep -q "Pending:.*1" || return 1
    echo "$STATUS" | grep -q "Completed:.*1" || return 1
    
    return 0
}

# Run tests based on mode
case "$MODE" in
    "all"|"cli")
        run_test "cli_single_issue" test_cli_single_issue
        run_test "cli_multiple_issues" test_cli_multiple_issues
        run_test "incremental_issues" test_incremental_issues
        run_test "status_command" test_status_command
        ;;&
    "all"|"direct")
        run_test "direct_file_workflow" test_direct_file_workflow
        ;;
    *)
        # Run specific test
        case "$MODE" in
            "cli_single_issue") run_test "$MODE" test_cli_single_issue ;;
            "cli_multiple_issues") run_test "$MODE" test_cli_multiple_issues ;;
            "direct_file_workflow") run_test "$MODE" test_direct_file_workflow ;;
            "incremental_issues") run_test "$MODE" test_incremental_issues ;;
            "status_command") run_test "$MODE" test_status_command ;;
            *)
                echo -e "${RED}Unknown test: $MODE${NC}"
                echo "Available tests:"
                echo "  - cli_single_issue"
                echo "  - cli_multiple_issues"
                echo "  - direct_file_workflow"
                echo "  - incremental_issues"
                echo "  - status_command"
                echo ""
                echo "Or use modes: all, cli, direct"
                exit 1
                ;;
        esac
        ;;
esac