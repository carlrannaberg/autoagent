#!/bin/bash

# Tests for complete-issue.sh script
source "$(dirname "$0")/test-framework.sh"

SCRIPT_DIR="$(dirname "$0")/../scripts"
COMPLETE_ISSUE_SCRIPT="$SCRIPT_DIR/complete-issue.sh"

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

test_complete_existing_issue() {
    
    # Create todo.md with some issues
    cat > todo.md << 'EOF'
# Todo List

- [x] Completed Issue
- [ ] **[Issue #1]** Issue One - `issues/1-issue-one.md`
- [ ] **[Issue #2]** Issue Two - `issues/2-issue-two.md`
- [x] Another completed issue
EOF

    # Complete issue 1
    bash "$COMPLETE_ISSUE_SCRIPT" 1
    
    # Check that issue 1 is now marked as complete
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" "Issue 1 should be marked complete"
    assert_contains "$todo_content" "- [ ] **[Issue #2]** Issue Two - \`issues/2-issue-two.md\`" "Issue 2 should remain unchecked"
    assert_contains "$todo_content" "- [x] Completed Issue" "Existing completed issues should remain"
}

test_complete_specific_issue_number() {
    
    # Create todo.md with various issue numbers
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #3]** Issue Three - `issues/3-issue-three.md`
- [ ] **[Issue #10]** Issue Ten - `issues/10-issue-ten.md`
- [ ] **[Issue #123]** Issue Large - `issues/123-issue-large.md`
EOF

    # Complete issue 10
    bash "$COMPLETE_ISSUE_SCRIPT" 10
    
    # Check that only issue 10 is marked complete
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #3]** Issue Three - \`issues/3-issue-three.md\`" "Issue 3 should remain unchecked"
    assert_contains "$todo_content" "- [x] **[Issue #10]** Issue Ten - \`issues/10-issue-ten.md\`" "Issue 10 should be marked complete"
    assert_contains "$todo_content" "- [ ] **[Issue #123]** Issue Large - \`issues/123-issue-large.md\`" "Issue 123 should remain unchecked"
}

test_already_completed_issue() {
    
    # Create todo.md with already completed issue
    cat > todo.md << 'EOF'
# Todo List

- [x] **[Issue #1]** Issue One - `issues/1-issue-one.md`
- [ ] **[Issue #2]** Issue Two - `issues/2-issue-two.md`
EOF

    # Try to complete already completed issue
    bash "$COMPLETE_ISSUE_SCRIPT" 1
    
    # Should still be marked as complete (no change)
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [x] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" "Issue 1 should remain marked complete"
    assert_contains "$todo_content" "- [ ] **[Issue #2]** Issue Two - \`issues/2-issue-two.md\`" "Issue 2 should remain unchecked"
}

test_nonexistent_issue() {
    
    # Create todo.md with limited issues
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #1]** Issue One - `issues/1-issue-one.md`
- [ ] **[Issue #2]** Issue Two - `issues/2-issue-two.md`
EOF

    # Try to complete non-existent issue 5
    bash "$COMPLETE_ISSUE_SCRIPT" 5
    
    # File should remain unchanged
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" "Issue 1 should remain unchecked"
    assert_contains "$todo_content" "- [ ] **[Issue #2]** Issue Two - \`issues/2-issue-two.md\`" "Issue 2 should remain unchecked"
}

test_missing_todo_file() {
    
    # Ensure todo.md doesn't exist
    rm -f todo.md
    
    # Try to complete issue - should handle gracefully
    assert_exit_code 1 "bash '$COMPLETE_ISSUE_SCRIPT' 1" "Should exit with error code when todo.md missing"
}

test_missing_argument() {
    
    # Create todo.md
    echo "- [ ] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" > todo.md
    
    # Run without argument
    assert_exit_code 1 "bash '$COMPLETE_ISSUE_SCRIPT'" "Should exit with error when no issue number provided"
}

test_invalid_issue_number() {
    
    # Create todo.md
    echo "- [ ] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" > todo.md
    
    # Test various invalid formats - these won't fail but will just not match anything
    bash "$COMPLETE_ISSUE_SCRIPT" abc
    bash "$COMPLETE_ISSUE_SCRIPT" -5
    
    # Check that file remains unchanged
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** Issue One - \`issues/1-issue-one.md\`" "Issue should remain unchecked with invalid input"
}

test_complex_issue_titles() {
    
    # Create todo.md with complex issue titles
    cat > todo.md << 'EOF'
# Todo List

- [ ] **[Issue #1]** Fix bug with special chars! - `issues/1-fix-bug-special.md`
- [ ] **[Issue #2]** Add new feature (urgent) - `issues/2-add-feature.md`
- [ ] **[Issue #3]** Handle edge case [important] - `issues/3-handle-edge.md`
EOF

    # Complete issue 2
    bash "$COMPLETE_ISSUE_SCRIPT" 2
    
    # Check that correct issue is marked complete despite special characters
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** Fix bug with special chars! - \`issues/1-fix-bug-special.md\`" "Issue 1 should remain unchecked"
    assert_contains "$todo_content" "- [x] **[Issue #2]** Add new feature (urgent) - \`issues/2-add-feature.md\`" "Issue 2 should be marked complete"
    assert_contains "$todo_content" "- [ ] **[Issue #3]** Handle edge case [important] - \`issues/3-handle-edge.md\`" "Issue 3 should remain unchecked"
}

test_whitespace_preservation() {
    
    # Create todo.md with specific formatting
    cat > todo.md << 'EOF'
# Todo List

Some description here.

- [x] Already completed task
- [ ] **[Issue #1]** Test Issue - `issues/1-test.md`
  - Sub-task 1
  - Sub-task 2
- [ ] **[Issue #2]** Another Test - `issues/2-test.md`

Another section here.
EOF

    # Complete issue 1
    bash "$COMPLETE_ISSUE_SCRIPT" 1
    
    # Check that formatting is preserved
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "Some description here." "Should preserve description text"
    assert_contains "$todo_content" "- [x] **[Issue #1]** Test Issue - \`issues/1-test.md\`" "Should mark issue 1 complete"
    assert_contains "$todo_content" "  - Sub-task 1" "Should preserve sub-task indentation"
    assert_contains "$todo_content" "Another section here." "Should preserve footer text"
}

# Run all tests
echo "=== Testing complete-issue.sh ==="

run_test test_complete_existing_issue "Complete existing unchecked issue"
run_test test_complete_specific_issue_number "Complete specific issue number"
run_test test_already_completed_issue "Mark already completed issue"
run_test test_nonexistent_issue "Try to complete non-existent issue"
run_test test_missing_todo_file "Missing todo.md file"
run_test test_missing_argument "Missing issue number argument"
run_test test_invalid_issue_number "Invalid issue number formats"
run_test test_complex_issue_titles "Issues with complex titles and characters"
run_test test_whitespace_preservation "Preserve whitespace and formatting"