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
MODE=${1:-"all"}  # all or specific test name
PROVIDER=${2:-"both"}  # claude, gemini, or both

echo -e "${BLUE}🧪 AutoAgent Test Suite${NC}"
echo -e "${CYAN}Mode: $MODE${NC}"
echo -e "${CYAN}Provider: $PROVIDER${NC}"
echo ""

# Save current directory and determine project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
ORIGINAL_DIR=$(pwd)
TEST_DIR=$(mktemp -d)
AUTOAGENT_BIN="$PROJECT_ROOT/bin/autoagent"

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
    local provider=$3
    
    if [ "$MODE" != "all" ] && [ "$MODE" != "$test_name" ]; then
        return
    fi
    
    TESTS_RUN=$((TESTS_RUN + 1))
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}Running test: $test_name (provider: $provider)${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    # Create fresh test directory for each test
    rm -rf "$TEST_DIR"
    mkdir -p "$TEST_DIR"
    cd "$TEST_DIR"
    
    # Export provider for the test
    export TEST_PROVIDER=$provider
    
    if $test_func; then
        echo -e "${GREEN}✅ Test passed: $test_name (provider: $provider)${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ Test failed: $test_name (provider: $provider)${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Helper function to run a test with specified providers
run_test_with_providers() {
    local test_name=$1
    local test_func=$2
    
    if [ "$PROVIDER" = "both" ]; then
        if [ "$CLAUDE_AVAILABLE" = true ]; then
            run_test "$test_name" "$test_func" "claude"
        fi
        if [ "$GEMINI_AVAILABLE" = true ]; then
            run_test "$test_name" "$test_func" "gemini"
        fi
    elif [ "$PROVIDER" = "claude" ] || [ "$PROVIDER" = "gemini" ]; then
        run_test "$test_name" "$test_func" "$PROVIDER"
    else
        echo -e "${RED}Invalid provider: $PROVIDER${NC}"
        echo "Valid providers: claude, gemini, both"
        exit 1
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

    # Create GEMINI.md (same instructions for consistency)
    cat > "GEMINI.md" << 'EOF'
# Gemini Instructions
This is a test environment. When completing tasks:
- For "Test Task": Create test-output.txt with "Hello from autoagent!" and the current date
- For "Second Task": Create second-test.txt with "Second test complete"
EOF

    # Create AGENT.md as fallback
    cp CLAUDE.md AGENT.md

    # Initialize directories
    mkdir -p issues plans logs
    
    # Initialize the project (init command not implemented yet)
    # "$AUTOAGENT_BIN" init || return 1
}

# Build autoagent once at the start
echo -e "${BLUE}🔨 Building autoagent...${NC}"
cd "$PROJECT_ROOT"
npm run build
cd "$ORIGINAL_DIR"  # Return to original directory

# Check provider availability
echo -e "\n${BLUE}🔍 Checking provider availability...${NC}"
CLAUDE_AVAILABLE=false
GEMINI_AVAILABLE=false

if command -v claude &> /dev/null; then
    CLAUDE_AVAILABLE=true
    echo -e "${GREEN}✓ Claude CLI is available${NC}"
else
    echo -e "${YELLOW}⚠ Claude CLI not found${NC}"
fi

if command -v gemini &> /dev/null; then
    GEMINI_AVAILABLE=true
    echo -e "${GREEN}✓ Gemini CLI is available${NC}"
else
    echo -e "${YELLOW}⚠ Gemini CLI not found${NC}"
fi

# Adjust provider based on availability
if [ "$PROVIDER" = "both" ]; then
    if [ "$CLAUDE_AVAILABLE" = false ] && [ "$GEMINI_AVAILABLE" = false ]; then
        echo -e "${RED}❌ No providers available. Please install claude or gemini CLI.${NC}"
        exit 1
    elif [ "$CLAUDE_AVAILABLE" = false ]; then
        echo -e "${YELLOW}Only Gemini available, switching to gemini-only mode${NC}"
        PROVIDER="gemini"
    elif [ "$GEMINI_AVAILABLE" = false ]; then
        echo -e "${YELLOW}Only Claude available, switching to claude-only mode${NC}"
        PROVIDER="claude"
    fi
elif [ "$PROVIDER" = "claude" ] && [ "$CLAUDE_AVAILABLE" = false ]; then
    echo -e "${RED}❌ Claude CLI not available${NC}"
    exit 1
elif [ "$PROVIDER" = "gemini" ] && [ "$GEMINI_AVAILABLE" = false ]; then
    echo -e "${RED}❌ Gemini CLI not available${NC}"
    exit 1
fi

# Test 1: Single issue execution
test_single_issue() {
    setup_test_project
    
    # Create test issue and plan
    cat > "issues/1-test-task.md" << 'EOF'
# Issue 1: Test Task

## Requirements
Create a simple test file to verify the agent is working

## Acceptance Criteria
- [ ] Create a file named test-output.txt
- [ ] File should contain "Hello from autoagent!"
- [ ] File should include the current date
EOF

    cat > "plans/1-test-task.md" << 'EOF'
# Plan for Issue 1: Test Task

## Implementation Plan
- [ ] Create test-output.txt with "Hello from autoagent!" and current date
EOF

    # Create TODO.md
    cat > "TODO.md" << 'EOF'
# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **[Issue #1]** Test Task - `issues/1-test-task.md`
EOF
    
    # Run the issue with specified provider
    "$AUTOAGENT_BIN" run --all --provider "$TEST_PROVIDER" || return 1
    
    # Verify results
    [ -f "test-output.txt" ] || return 1
    grep -q "Hello from autoagent!" test-output.txt || return 1
    grep -q "\[x\].*Test Task" TODO.md || return 1
    
    return 0
}

# Test 2: Multiple issues with --all
test_multiple_issues_all() {
    setup_test_project
    
    # Create two test issues
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
- [ ] Create test-output.txt
EOF

    cat > "issues/2-second-task.md" << 'EOF'
# Issue 2: Second Task

## Requirements
Create another test file

## Acceptance Criteria
- [ ] Create second-test.txt with "Second test complete"
EOF

    cat > "plans/2-second-task.md" << 'EOF'
# Plan for Issue 2: Second Task

## Implementation Plan
- [ ] Create second-test.txt
EOF

    # Create TODO.md with both issues
    cat > "TODO.md" << 'EOF'
# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **[Issue #1]** Test Task - `issues/1-test-task.md`
- [ ] **[Issue #2]** Second Task - `issues/2-second-task.md`
EOF
    
    # Run all issues with specified provider
    "$AUTOAGENT_BIN" run --all --provider "$TEST_PROVIDER" || return 1
    
    # Verify both files created
    [ -f "test-output.txt" ] || return 1
    [ -f "second-test.txt" ] || return 1
    
    # Verify both marked complete
    grep -q "\[x\].*Test Task" TODO.md || return 1
    grep -q "\[x\].*Second Task" TODO.md || return 1
    
    return 0
}

# Test 3: Incremental issue addition
test_incremental_issues() {
    setup_test_project
    
    # Create first issue
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
- [ ] Create test-output.txt
EOF

    cat > "TODO.md" << 'EOF'
# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **[Issue #1]** Test Task - `issues/1-test-task.md`
EOF
    
    # Run first issue with specified provider
    "$AUTOAGENT_BIN" run --all --provider "$TEST_PROVIDER" || return 1
    [ -f "test-output.txt" ] || return 1
    
    # Now add second issue properly
    cat > "issues/2-second-task.md" << 'EOF'
# Issue 2: Second Task

## Requirements
Create another test file

## Acceptance Criteria
- [ ] Create second-test.txt with "Second test complete"
EOF

    cat > "plans/2-second-task.md" << 'EOF'
# Plan for Issue 2: Second Task

## Implementation Plan
- [ ] Create second-test.txt
EOF

    # Update TODO.md properly (maintaining the structure)
    EXISTING_TODOS=$(grep -E "^-\s+\[.\]\s+" TODO.md || true)
    cat > TODO.md << EOF
# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
$(echo "$EXISTING_TODOS" | grep -v "\[x\]" || true)
- [ ] **[Issue #2]** Second Task - \`issues/2-second-task.md\`

## Completed Issues
$(echo "$EXISTING_TODOS" | grep "\[x\]" || true)
EOF
    
    # Run with --all should pick up the new issue
    "$AUTOAGENT_BIN" run --all --provider "$TEST_PROVIDER" || return 1
    
    # Verify second file created
    [ -f "second-test.txt" ] || return 1
    
    return 0
}

# Test 4: Status command
test_status_command() {
    setup_test_project
    
    # Create two issues
    cat > "issues/1-test-task.md" << 'EOF'
# Issue 1: Test Task
## Requirements
Test file creation
EOF

    cat > "issues/2-second-task.md" << 'EOF'
# Issue 2: Second Task
## Requirements
Another test file
EOF

    cat > "TODO.md" << 'EOF'
# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **[Issue #1]** Test Task - `issues/1-test-task.md`
- [ ] **[Issue #2]** Second Task - `issues/2-second-task.md`
EOF
    
    # Check initial status
    STATUS=$("$AUTOAGENT_BIN" status 2>&1)
    echo "$STATUS" | grep -q "Total Issues:.*2" || return 1
    echo "$STATUS" | grep -q "Pending:.*2" || return 1
    echo "$STATUS" | grep -q "Completed:.*0" || return 1
    
    return 0
}

# Run tests based on mode
case "$MODE" in
    "all")
        run_test_with_providers "single_issue" test_single_issue
        run_test_with_providers "multiple_issues_all" test_multiple_issues_all
        run_test_with_providers "incremental_issues" test_incremental_issues
        # Status command doesn't need provider testing
        run_test "status_command" test_status_command "claude"
        ;;
    *)
        # Run specific test
        case "$MODE" in
            "single_issue") run_test_with_providers "$MODE" test_single_issue ;;
            "multiple_issues_all") run_test_with_providers "$MODE" test_multiple_issues_all ;;
            "incremental_issues") run_test_with_providers "$MODE" test_incremental_issues ;;
            "status_command") run_test "$MODE" test_status_command "claude" ;;
            *)
                echo -e "${RED}Unknown test: $MODE${NC}"
                echo "Available tests:"
                echo "  - single_issue"
                echo "  - multiple_issues_all"
                echo "  - incremental_issues"
                echo "  - status_command"
                echo ""
                echo "Usage: $0 [test_name] [provider]"
                echo "  test_name: all (default) or specific test name"
                echo "  provider: both (default), claude, or gemini"
                exit 1
                ;;
        esac
        ;;
esac