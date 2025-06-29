#!/bin/bash

# Integration tests for the complete workflow
source "$(dirname "$0")/test-framework.sh"

SCRIPT_DIR="$(dirname "$0")/../scripts"
CREATE_ISSUE_SCRIPT="$SCRIPT_DIR/create-issue.sh"
COMPLETE_ISSUE_SCRIPT="$SCRIPT_DIR/complete-issue.sh"
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

# Mock Claude CLI for integration testing
create_mock_claude() {
    cat > claude << 'EOF'
#!/bin/bash
# Mock Claude CLI that simulates successful task completion

if [[ "$*" == *"--help"* ]]; then
    echo "Mock Claude CLI for integration testing"
    exit 0
fi

# Check if this is a streaming request (--output-format stream-json)
if [[ "$*" == *"stream-json"* ]]; then
    echo '{"type":"text","text":"🤖 Starting task execution..."}'
    echo '{"type":"text","text":"📝 Analyzing issue and plan..."}'
    echo '{"type":"text","text":"⚡ Implementing solution..."}'
    echo '{"type":"text","text":"✅ Task completed successfully!"}'
    echo '{"type":"result","subtype":"success","is_error":false}'
    exit 0
fi

echo "Task completed successfully via Claude AI"
exit 0
EOF
    chmod +x claude
    export PATH="$PWD:$PATH"
}

test_complete_workflow_single_issue() {
    echo "Test: Complete workflow - Create, Run, Complete single issue"
    
    # Step 1: Create an issue
    bash "$CREATE_ISSUE_SCRIPT" "Fix login bug"
    
    # Verify issue creation
    assert_file_exists "issues/1-fix-login-bug.md" "Issue file should be created"
    assert_file_exists "plans/1-fix-login-bug.md" "Plan file should be created"
    assert_file_exists "todo.md" "Todo file should be created"
    
    # Check todo content
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** Fix login bug - \`issues/1-fix-login-bug.md\`" "Todo should contain unchecked issue"
    
    # Step 2: Set up mock Claude and run agent
    create_mock_claude
    bash "$RUN_AGENT_SCRIPT"
    
    # Verify issue completion
    todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** Fix login bug - \`issues/1-fix-login-bug.md\`" "Issue should be marked complete after agent run"
    
    # Step 3: Verify manual completion also works
    bash "$CREATE_ISSUE_SCRIPT" "Add new feature"
    bash "$COMPLETE_ISSUE_SCRIPT" 2
    
    todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #2]** Add new feature - \`issues/2-add-new-feature.md\`" "Manually completed issue should be marked"
}

test_complete_workflow_multiple_issues() {
    echo "Test: Complete workflow - Multiple issues in sequence"
    
    # Create multiple issues
    bash "$CREATE_ISSUE_SCRIPT" "Issue One"
    bash "$CREATE_ISSUE_SCRIPT" "Issue Two"
    bash "$CREATE_ISSUE_SCRIPT" "Issue Three"
    
    # Verify all issues created
    assert_file_exists "issues/1-issue-one.md" "Issue 1 should exist"
    assert_file_exists "issues/2-issue-two.md" "Issue 2 should exist"
    assert_file_exists "issues/3-issue-three.md" "Issue 3 should exist"
    
    # Check initial todo state
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" "Issue 1 should be unchecked"
    assert_contains "$todo_content" "- [ ] **[Issue #2]** Issue Two - \`issues/2-issue-two.md\`" "Issue 2 should be unchecked"
    assert_contains "$todo_content" "- [ ] **[Issue #3]** Issue Three - \`issues/3-issue-three.md\`" "Issue 3 should be unchecked"
    
    # Set up mock Claude
    create_mock_claude
    
    # Run agent in auto mode to process all issues
    bash "$RUN_AGENT_SCRIPT" --auto
    
    # Verify all issues completed
    todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" "Issue 1 should be complete"
    assert_contains "$todo_content" "- [x] **[Issue #2]** Issue Two - \`issues/2-issue-two.md\`" "Issue 2 should be complete"
    assert_contains "$todo_content" "- [x] **[Issue #3]** Issue Three - \`issues/3-issue-three.md\`" "Issue 3 should be complete"
}

test_mixed_workflow_states() {
    echo "Test: Mixed workflow with partial completion states"
    
    # Create issues
    bash "$CREATE_ISSUE_SCRIPT" "First Issue"
    bash "$CREATE_ISSUE_SCRIPT" "Second Issue"
    bash "$CREATE_ISSUE_SCRIPT" "Third Issue"
    
    # Manually complete the second issue
    bash "$COMPLETE_ISSUE_SCRIPT" 2
    
    # Verify mixed state
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** First Issue - \`issues/1-first-issue.md\`" "Issue 1 should be unchecked"
    assert_contains "$todo_content" "- [x] **[Issue #2]** Second Issue - \`issues/2-second-issue.md\`" "Issue 2 should be manually completed"
    assert_contains "$todo_content" "- [ ] **[Issue #3]** Third Issue - \`issues/3-third-issue.md\`" "Issue 3 should be unchecked"
    
    # Run agent - should process first unchecked issue (Issue 1)
    create_mock_claude
    bash "$RUN_AGENT_SCRIPT"
    
    # Verify correct issue was processed
    todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** First Issue - \`issues/1-first-issue.md\`" "Issue 1 should now be complete"
    assert_contains "$todo_content" "- [x] **[Issue #2]** Second Issue - \`issues/2-second-issue.md\`" "Issue 2 should remain complete"
    assert_contains "$todo_content" "- [ ] **[Issue #3]** Third Issue - \`issues/3-third-issue.md\`" "Issue 3 should remain unchecked"
    
    # Run agent again - should process Issue 3
    bash "$RUN_AGENT_SCRIPT"
    
    todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #3]** Third Issue - \`issues/3-third-issue.md\`" "Issue 3 should now be complete"
}

test_workflow_with_existing_todo() {
    echo "Test: Workflow with pre-existing todo.md"
    
    # Create initial todo with some content
    cat > todo.md << 'EOF'
# My Project Todo List

This is my project's todo list with some custom formatting.

## Completed Tasks
- [x] Set up project structure
- [x] Configure development environment

## Pending Tasks
EOF

    # Add issues through create-issue script
    bash "$CREATE_ISSUE_SCRIPT" "Implement authentication"
    bash "$CREATE_ISSUE_SCRIPT" "Add user dashboard"
    
    # Verify existing content preserved
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "# My Project Todo List" "Should preserve custom header"
    assert_contains "$todo_content" "- [x] Set up project structure" "Should preserve existing completed tasks"
    assert_contains "$todo_content" "## Pending Tasks" "Should preserve section headers"
    assert_contains "$todo_content" "- [ ] **[Issue #1]** Implement authentication - \`issues/1-implement-authentication.md\`" "Should add new issue"
    assert_contains "$todo_content" "- [ ] **[Issue #2]** Add user dashboard - \`issues/2-add-user-dashboard.md\`" "Should add second issue"
    
    # Process issues with agent
    create_mock_claude
    bash "$RUN_AGENT_SCRIPT" --auto
    
    # Verify completion while preserving format
    todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "# My Project Todo List" "Should still preserve custom header"
    assert_contains "$todo_content" "- [x] **[Issue #1]** Implement authentication - \`issues/1-implement-authentication.md\`" "Issue 1 should be complete"
    assert_contains "$todo_content" "- [x] **[Issue #2]** Add user dashboard - \`issues/2-add-user-dashboard.md\`" "Issue 2 should be complete"
}

test_error_recovery_workflow() {
    echo "Test: Error recovery in workflow"
    
    # Create issue with missing plan (simulate error condition)
    bash "$CREATE_ISSUE_SCRIPT" "Test Issue"
    
    # Remove plan file to simulate error
    rm -f "plans/1-test-issue.md"
    
    # Agent should fail gracefully
    create_mock_claude
    assert_exit_code 1 "bash '$RUN_AGENT_SCRIPT'" "Agent should fail when plan file missing"
    
    # Verify issue remains unchecked after failure
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** Test Issue - \`issues/1-test-issue.md\`" "Issue should remain unchecked after failure"
    
    # Fix the issue by recreating plan
    echo "# Plan: Test Issue" > "plans/1-test-issue.md"
    
    # Agent should now succeed
    bash "$RUN_AGENT_SCRIPT"
    
    todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** Test Issue - \`issues/1-test-issue.md\`" "Issue should be complete after fix"
}

test_sequential_id_assignment() {
    echo "Test: Sequential ID assignment across workflow"
    
    # Create issues in sequence
    bash "$CREATE_ISSUE_SCRIPT" "First"
    bash "$CREATE_ISSUE_SCRIPT" "Second"
    
    # Complete first issue
    create_mock_claude
    bash "$RUN_AGENT_SCRIPT"
    
    # Create more issues - should continue sequence
    bash "$CREATE_ISSUE_SCRIPT" "Third"
    bash "$CREATE_ISSUE_SCRIPT" "Fourth"
    
    # Verify correct ID assignment
    assert_file_exists "issues/1-first.md" "First issue should have ID 1"
    assert_file_exists "issues/2-second.md" "Second issue should have ID 2"
    assert_file_exists "issues/3-third.md" "Third issue should have ID 3"
    assert_file_exists "issues/4-fourth.md" "Fourth issue should have ID 4"
    
    # Verify todo has all issues
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** First - \`issues/1-first.md\`" "First should be complete"
    assert_contains "$todo_content" "- [ ] **[Issue #2]** Second - \`issues/2-second.md\`" "Second should be unchecked"
    assert_contains "$todo_content" "- [ ] **[Issue #3]** Third - \`issues/3-third.md\`" "Third should be unchecked"
    assert_contains "$todo_content" "- [ ] **[Issue #4]** Fourth - \`issues/4-fourth.md\`" "Fourth should be unchecked"
}

test_file_template_consistency() {
    echo "Test: File template consistency across workflow"
    
    # Create issue and verify templates
    bash "$CREATE_ISSUE_SCRIPT" "Feature Request: Add Dark Mode"
    
    # Check issue template
    local issue_content=$(cat "issues/1-feature-request-add-dark-mode.md")
    assert_contains "$issue_content" "# Feature Request: Add Dark Mode" "Issue should have correct title"
    assert_contains "$issue_content" "## Description" "Issue should have description section"
    assert_contains "$issue_content" "## Acceptance Criteria" "Issue should have acceptance criteria"
    assert_contains "$issue_content" "## Additional Notes" "Issue should have notes section"
    
    # Check plan template
    local plan_content=$(cat "plans/1-feature-request-add-dark-mode.md")
    assert_contains "$plan_content" "# Plan: Feature Request: Add Dark Mode" "Plan should have correct title"
    assert_contains "$plan_content" "**Issue:** [1-feature-request-add-dark-mode.md](../issues/1-feature-request-add-dark-mode.md)" "Plan should reference issue"
    assert_contains "$plan_content" "## Objective" "Plan should have objective section"
    assert_contains "$plan_content" "## Implementation Steps" "Plan should have implementation steps"
    assert_contains "$plan_content" "## Success Criteria" "Plan should have success criteria"
}

# Run all integration tests
echo "=== Integration Tests ==="

run_test test_complete_workflow_single_issue "Complete workflow - Create, Run, Complete single issue"
run_test test_complete_workflow_multiple_issues "Complete workflow - Multiple issues in sequence"
run_test test_mixed_workflow_states "Mixed workflow with partial completion states"
run_test test_workflow_with_existing_todo "Workflow with pre-existing todo.md"
run_test test_error_recovery_workflow "Error recovery in workflow"
run_test test_sequential_id_assignment "Sequential ID assignment across workflow"
run_test test_file_template_consistency "File template consistency across workflow"