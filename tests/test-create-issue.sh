#!/bin/bash

# Tests for create-issue.sh script
source "$(dirname "$0")/test-framework.sh"

SCRIPT_DIR="$(dirname "$0")/../scripts"
CREATE_ISSUE_SCRIPT="$SCRIPT_DIR/create-issue.sh"

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

test_create_first_issue() {
    
    # Run create-issue script
    bash "$CREATE_ISSUE_SCRIPT" "Test Issue Title"

    # Check if files were created
    assert_file_exists "issues/1-test-issue-title.md" "Issue file should be created"
    assert_file_exists "plans/1-test-issue-title.md" "Plan file should be created"
    assert_file_exists "todo.md" "Todo file should be created"
    
    # Check issue file content
    local issue_content=$(cat "issues/1-test-issue-title.md")
    assert_contains "$issue_content" "# Issue 1: Test Issue Title" "Issue should contain title"
    assert_contains "$issue_content" "## Requirement" "Issue should have requirement section"
    assert_contains "$issue_content" "## Acceptance Criteria" "Issue should have acceptance criteria"
    
    # Check plan file content
    local plan_content=$(cat "plans/1-test-issue-title.md")
    assert_contains "$plan_content" "# Plan for Issue 1: Test Issue Title" "Plan should contain title"
    assert_contains "$plan_content" "issues/1-test-issue-title.md" "Plan should reference issue file"
    
    # Check todo file content
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** Test Issue Title - \`issues/1-test-issue-title.md\`" "Todo should contain issue entry"
}

test_create_sequential_issues() {
    
    # Create first issue
    bash "$CREATE_ISSUE_SCRIPT" "First Issue"
    
    # Create second issue
    bash "$CREATE_ISSUE_SCRIPT" "Second Issue"
    
    # Check files exist with correct IDs
    assert_file_exists "issues/1-first-issue.md" "First issue file should exist"
    assert_file_exists "issues/2-second-issue.md" "Second issue file should exist"
    assert_file_exists "plans/1-first-issue.md" "First plan file should exist"
    assert_file_exists "plans/2-second-issue.md" "Second plan file should exist"
    
    # Check todo file has both entries
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "- [ ] **[Issue #1]** First Issue - \`issues/1-first-issue.md\`" "Todo should contain first issue"
    assert_contains "$todo_content" "- [ ] **[Issue #2]** Second Issue - \`issues/2-second-issue.md\`" "Todo should contain second issue"
}

test_title_slugification() {
    
    # Test various title formats
    bash "$CREATE_ISSUE_SCRIPT" "Test Title With Spaces"
    assert_file_exists "issues/1-test-title-with-spaces.md" "Should handle spaces"
    
    bash "$CREATE_ISSUE_SCRIPT" "Test-Title-With-Dashes"
    assert_file_exists "issues/2-test-title-with-dashes.md" "Should handle dashes"
    
    bash "$CREATE_ISSUE_SCRIPT" "Test_Title_With_Underscores"
    assert_file_exists "issues/3-test-title-with-underscores.md" "Should handle underscores"
    
    bash "$CREATE_ISSUE_SCRIPT" "Test Title: With Special! Characters?"
    assert_file_exists "issues/4-test-title-with-special-characters.md" "Should handle special characters"
}

test_existing_todo_file() {
    
    # Create existing todo file with content
    echo "# My Todo List" > todo.md
    echo "" >> todo.md
    echo "- [x] Completed task" >> todo.md
    echo "" >> todo.md
    
    # Create new issue
    bash "$CREATE_ISSUE_SCRIPT" "New Issue"
    
    # Check that existing content is preserved
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "# My Todo List" "Should preserve existing header"
    assert_contains "$todo_content" "- [x] Completed task" "Should preserve existing tasks"
    assert_contains "$todo_content" "- [ ] **[Issue #1]** New Issue - \`issues/1-new-issue.md\`" "Should add new issue"
}

test_directories_creation() {
    
    # Ensure directories don't exist
    rm -rf issues plans
    
    # Create issue
    bash "$CREATE_ISSUE_SCRIPT" "Test Issue"
    
    # Check directories were created
    assert_file_exists "issues" "Issues directory should be created"
    assert_file_exists "plans" "Plans directory should be created"
}

test_missing_title_argument() {
    
    # Run without title - should fail
    assert_exit_code 1 "bash '$CREATE_ISSUE_SCRIPT'" "Should exit with code 1 when no title provided"
}

test_with_existing_numbered_issues() {
    
    # Create some existing issues manually
    mkdir -p issues plans
    echo "# Issue 3" > "issues/3-existing-issue.md"
    echo "# Issue 7" > "issues/7-another-issue.md"
    echo "# Issue 1" > "issues/1-first-issue.md"
    
    # Create new issue - should get ID 8
    bash "$CREATE_ISSUE_SCRIPT" "New Issue"
    
    assert_file_exists "issues/8-new-issue.md" "Should use next available ID (8)"
    assert_file_exists "plans/8-new-issue.md" "Should create plan with correct ID"
}

test_plan_file_naming_convention() {
    
    # Create multiple issues to test naming convention consistency
    bash "$CREATE_ISSUE_SCRIPT" "First Test Issue"
    bash "$CREATE_ISSUE_SCRIPT" "Second Test Issue"
    bash "$CREATE_ISSUE_SCRIPT" "Complex Title: With Special Characters!"
    
    # Verify ALL plan files use correct naming (no plan_ prefix)
    assert_file_exists "plans/1-first-test-issue.md" "Plan file should exist without plan_ prefix"
    assert_file_exists "plans/2-second-test-issue.md" "Plan file should exist without plan_ prefix"
    assert_file_exists "plans/3-complex-title-with-special-characters.md" "Plan file should exist without plan_ prefix"
    
    # Verify no plan files exist WITH the prefix (this is the critical test)
    assert_file_not_exists "plans/plan_1-first-test-issue.md" "Plan file should NOT exist with plan_ prefix"
    assert_file_not_exists "plans/plan_2-second-test-issue.md" "Plan file should NOT exist with plan_ prefix"
    assert_file_not_exists "plans/plan_3-complex-title-with-special-characters.md" "Plan file should NOT exist with plan_ prefix"
    
    # Verify plan files contain correct cross-references to issue files
    local plan_content=$(cat "plans/1-first-test-issue.md")
    assert_contains "$plan_content" "issues/1-first-test-issue.md" "Plan should reference issue file with correct naming"
}

# Run all tests
echo "=== Testing create-issue.sh ==="

run_test test_create_first_issue "Create first issue (ID = 1)"
run_test test_create_sequential_issues "Create sequential issues"
run_test test_title_slugification "Title slugification"
run_test test_existing_todo_file "Existing todo.md file"
run_test test_directories_creation "Directory creation"
run_test test_missing_title_argument "Missing title argument"
run_test test_with_existing_numbered_issues "ID generation with existing issues"
run_test test_plan_file_naming_convention "Plan file naming convention (no plan_ prefix)"