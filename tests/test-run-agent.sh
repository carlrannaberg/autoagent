#!/bin/bash

# Tests for run-agent.sh script
source "$(dirname "$0")/test-framework.sh"

SCRIPT_DIR="$(dirname "$0")/../scripts"
RUN_AGENT_SCRIPT="$SCRIPT_DIR/run-agent.sh"

# Setup cleanup for after each test
cleanup_test_artifacts() {
    # Remove test artifacts that might interfere with other tests
    rm -rf issues plans todo.md
    # Remove any mock claude files
    rm -f claude .claude_call_count
    # Reset PATH in case it was modified
    export PATH="$ORIGINAL_PATH"
}

# Register cleanup
after_each cleanup_test_artifacts

# Store original PATH
ORIGINAL_PATH="$PATH"

# Mock Claude CLI for testing
create_mock_claude() {
    local success=${1:-true}
    
    cat > claude << EOF
#!/bin/bash
# Mock Claude CLI for testing

if [[ "\$*" == *"--help"* ]]; then
    echo "Mock Claude CLI"
    exit 0
fi

# Check if this is a streaming request (--output-format stream-json)
if [[ "\$*" == *"stream-json"* ]]; then
    if [[ "$success" == "true" ]]; then
        echo '{"type":"text","text":"Starting task execution..."}'
        echo '{"type":"text","text":"Task completed successfully."}'
        echo '{"type":"text","text":"All tests passed."}'
        echo '{"type":"result","subtype":"success","is_error":false}'
        exit 0
    else
        echo '{"type":"text","text":"Starting task execution..."}'
        echo '{"type":"text","text":"Task failed with error"}'
        echo '{"type":"result","subtype":"error","is_error":true}'
        exit 1
    fi
fi

# Regular non-streaming request
if [[ "$success" == "true" ]]; then
    echo "Task completed successfully."
    exit 0
else
    echo "Task failed with error"
    exit 1
fi
EOF
    chmod +x claude
    
    # Add to PATH for the test
    export PATH="$PWD:$PATH"
}

test_missing_todo_file() {
    
    # Ensure todo.md doesn't exist
    rm -f todo.md
    
    # Should exit with error
    assert_exit_code 1 "bash '$RUN_AGENT_SCRIPT'" "Should exit with error when todo.md missing"
}

test_no_unchecked_issues() {
    
    # Create todo.md with only completed issues
    cat > todo.md << 'EOF'
# Todo List

- [x] **[Issue #1]** Completed Issue - `issues/1-completed.md`
- [x] **[Issue #2]** Another Completed - `issues/2-completed.md`
EOF

    # Should exit indicating no work to do
    assert_exit_code 1 "bash '$RUN_AGENT_SCRIPT'" "Should exit with code 1 when no unchecked issues (return 1 means no more work)"
}

test_find_first_unchecked_issue() {
    
    # Create todo.md with mixed completed/unchecked issues
    cat > todo.md << 'EOF'
# Todo List

- [x] **[Issue #1]** Completed Issue - `issues/1-completed.md`
- [ ] **[Issue #2]** First Unchecked - `issues/2-first-unchecked.md`
- [ ] **[Issue #3]** Second Unchecked - `issues/3-second-unchecked.md`
EOF

    # Create issue and plan files
    mkdir -p issues plans
    echo "# First Unchecked Issue" > "issues/2-first-unchecked.md"
    echo "# Plan for First Unchecked" > "plans/2-first-unchecked.md"
    
    # Mock successful Claude execution
    create_mock_claude true
    
    # Run agent - should process first unchecked issue
    bash "$RUN_AGENT_SCRIPT"
    
    # Check that first unchecked issue is now marked complete
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #2]** First Unchecked - \`issues/2-first-unchecked.md\`" "First unchecked issue should be marked complete"
    assert_contains "$todo_content" "- [ ] **[Issue #3]** Second Unchecked - \`issues/3-second-unchecked.md\`" "Second unchecked issue should remain unchecked"
}

test_missing_issue_file() {
    
    # Create todo.md referencing non-existent issue
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #999]** Missing Issue - `issues/999-missing.md`
EOF

    # Should exit with error
    assert_exit_code 1 "bash '$RUN_AGENT_SCRIPT'" "Should exit with error when issue file missing"
}

test_missing_plan_file() {
    
    # Create todo.md and issue file but no plan
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #1]** Test Issue - `issues/1-test.md`
EOF

    mkdir -p issues
    echo "# Test Issue" > "issues/1-test.md"
    # Note: No plan file created
    
    # Should exit with error
    assert_exit_code 1 "bash '$RUN_AGENT_SCRIPT'" "Should exit with error when plan file missing"
}

test_claude_execution_success() {
    
    # Setup files
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #1]** Test Issue - `issues/1-test.md`
EOF

    mkdir -p issues plans
    echo "# Test Issue" > "issues/1-test.md"
    echo "# Test Plan" > "plans/1-test.md"
    
    # Mock successful Claude
    create_mock_claude true
    
    # Run agent
    bash "$RUN_AGENT_SCRIPT"
    
    # Check issue is marked complete
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** Test Issue - \`issues/1-test.md\`" "Issue should be marked complete after successful execution"
}

test_claude_execution_failure() {
    
    # Setup files
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #1]** Test Issue - `issues/1-test.md`
EOF

    mkdir -p issues plans
    echo "# Test Issue" > "issues/1-test.md"
    echo "# Test Plan" > "plans/1-test.md"
    
    # Mock failed Claude
    create_mock_claude false
    
    # Run agent - should fail
    assert_exit_code 1 "bash '$RUN_AGENT_SCRIPT'" "Should exit with error when Claude execution fails"
    
    # Check issue remains unchecked
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** Test Issue - \`issues/1-test.md\`" "Issue should remain unchecked after failed execution"
}

test_auto_mode_multiple_issues() {
    
    # Create todo.md with multiple unchecked issues
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #1]** Issue One - `issues/1-issue-one.md`
- [ ] **[Issue #2]** Issue Two - `issues/2-issue-two.md`
- [ ] **[Issue #3]** Issue Three - `issues/3-issue-three.md`
EOF

    # Create issue and plan files
    mkdir -p issues plans
    for i in {1..3}; do
        echo "# Issue $i" > "issues/$i-issue-$(echo $i | sed 's/1/one/; s/2/two/; s/3/three/').md"
        echo "# Plan $i" > "plans/$i-issue-$(echo $i | sed 's/1/one/; s/2/two/; s/3/three/').md"
    done
    
    # Mock successful Claude
    create_mock_claude true
    
    # Run in auto mode
    bash "$RUN_AGENT_SCRIPT" --auto
    
    # All issues should be marked complete
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" "Issue 1 should be complete"
    assert_contains "$todo_content" "- [x] **[Issue #2]** Issue Two - \`issues/2-issue-two.md\`" "Issue 2 should be complete"
    assert_contains "$todo_content" "- [x] **[Issue #3]** Issue Three - \`issues/3-issue-three.md\`" "Issue 3 should be complete"
}

test_auto_mode_stops_on_failure() {
    
    # Create todo.md with multiple issues
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #1]** Issue One - `issues/1-issue-one.md`
- [ ] **[Issue #2]** Issue Two - `issues/2-issue-two.md`
EOF

    # Create files
    mkdir -p issues plans
    echo "# Issue One" > "issues/1-issue-one.md"
    echo "# Plan One" > "plans/1-issue-one.md"
    echo "# Issue Two" > "issues/2-issue-two.md"
    echo "# Plan Two" > "plans/2-issue-two.md"
    
    # Mock Claude that succeeds first time, fails second
    cat > claude << 'EOF'
#!/bin/bash
# Mock Claude that tracks calls
if [[ ! -f ".claude_call_count" ]]; then
    echo "1" > .claude_call_count
    echo '{"type": "result", "is_error": false}'
    exit 0
else
    echo "Second call - failure"
    exit 1
fi
EOF
    chmod +x claude
    export PATH="$PWD:$PATH"
    
    # Run in auto mode
    bash "$RUN_AGENT_SCRIPT" --auto
    
    # First issue should be complete, second should remain unchecked
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" "Issue 1 should be complete"
    assert_contains "$todo_content" "- [ ] **[Issue #2]** Issue Two - \`issues/2-issue-two.md\`" "Issue 2 should remain unchecked after failure"
}

test_claude_not_installed() {
    
    # Setup basic files
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #1]** Test Issue - `issues/1-test.md`
EOF

    mkdir -p issues plans
    echo "# Test Issue" > "issues/1-test.md"
    echo "# Test Plan" > "plans/1-test.md"
    
    # Ensure claude is not in PATH
    export PATH="/usr/bin:/bin"
    
    # Should exit with error
    assert_exit_code 1 "bash '$RUN_AGENT_SCRIPT'" "Should exit with error when Claude CLI not found"
}

# Run all tests
echo "=== Testing run-agent.sh ==="

run_test test_missing_todo_file "Missing todo.md file"
run_test test_no_unchecked_issues "No unchecked issues in todo.md"
run_test test_find_first_unchecked_issue "Find first unchecked issue"
run_test test_missing_issue_file "Missing issue file"
run_test test_missing_plan_file "Missing plan file"
run_test test_claude_execution_success "Successful Claude execution"
run_test test_claude_execution_failure "Failed Claude execution"
run_test test_auto_mode_multiple_issues "Auto mode processes multiple issues"
run_test test_auto_mode_stops_on_failure "Auto mode stops on failure"
run_test test_claude_not_installed "Claude CLI not installed"