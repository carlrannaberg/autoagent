#!/bin/bash

# Tests for create-bootstrap.sh script
# Note: In practice, users should use "npm run bootstrap" instead of calling the script directly
source "$(dirname "$0")/test-framework.sh"

SCRIPT_DIR="$(dirname "$0")/../scripts"
CREATE_BOOTSTRAP_SCRIPT="$SCRIPT_DIR/create-bootstrap.sh"
CREATE_ISSUE_SCRIPT="$SCRIPT_DIR/create-issue.sh"

# Setup cleanup for after each test
cleanup_test_artifacts() {
    # Remove test artifacts that might interfere with other tests
    rm -rf issues plans todo.md
    rm -f master-plan.md custom-plan.md test-plan.md
    # Remove any mock claude files
    rm -f claude .claude_call_count
    # Reset PATH in case it was modified
    export PATH="$ORIGINAL_PATH"
}

# Register cleanup
after_each cleanup_test_artifacts

# Store original PATH
ORIGINAL_PATH="$PATH"

# Helper function to create a sample plan file
create_sample_plan() {
    local plan_file="${1:-master-plan.md}"
    cat > "$plan_file" << 'EOF'
# Master Plan

## Project Overview
This is a test project for validation.

## Features
- Feature 1: User authentication
- Feature 2: Data processing
- Feature 3: Reporting

## Technical Requirements
- Use modern JavaScript
- Include comprehensive tests
- Document all functions
EOF
}

test_create_bootstrap_default_plan() {
    # Copy scripts to test directory
    cp -r "$SCRIPT_DIR" ./scripts
    
    # Create default master plan
    create_sample_plan "master-plan.md"
    
    # Run create-bootstrap script
    bash "$CREATE_BOOTSTRAP_SCRIPT"
    
    # Check if bootstrap issue was created
    assert_file_exists "issues/1-bootstrap-project-from-master-plan-md.md" "Bootstrap issue should be created"
    assert_file_exists "plans/plan_1-bootstrap-project-from-master-plan-md.md" "Bootstrap plan should be created"
    assert_file_exists "todo.md" "Todo file should be created"
    
    # Check bootstrap issue content
    local issue_content=$(cat "issues/1-bootstrap-project-from-master-plan-md.md")
    assert_contains "$issue_content" "Bootstrap: Decompose master-plan.md into Individual Tasks" "Issue should have bootstrap title"
    assert_contains "$issue_content" "master-plan.md" "Issue should reference master plan"
    assert_contains "$issue_content" "decompose it into individual, actionable issues" "Issue should describe decomposition task"
    assert_contains "$issue_content" "## Bootstrap Instructions" "Issue should have bootstrap instructions"
}

test_create_bootstrap_custom_plan() {
    # Copy scripts to test directory
    cp -r "$SCRIPT_DIR" ./scripts
    
    # Create custom plan
    create_sample_plan "custom-plan.md"
    
    # Run create-bootstrap script with custom plan
    bash "$CREATE_BOOTSTRAP_SCRIPT" --plan custom-plan.md
    
    # Check if bootstrap issue was created
    assert_file_exists "issues/1-bootstrap-project-from-custom-plan-md.md" "Bootstrap issue should be created"
    
    # Check bootstrap issue content references custom plan
    local issue_content=$(cat "issues/1-bootstrap-project-from-custom-plan-md.md")
    assert_contains "$issue_content" "Bootstrap: Decompose custom-plan.md into Individual Tasks" "Issue should reference custom plan"
    assert_contains "$issue_content" "custom-plan.md" "Issue should contain custom plan path"
}

test_create_bootstrap_missing_plan() {
    # Copy scripts to test directory
    cp -r "$SCRIPT_DIR" ./scripts
    
    # Try to run without creating plan file
    assert_exit_code "1" "bash '$CREATE_BOOTSTRAP_SCRIPT' 2>&1" "Should exit with error when plan file is missing"
    
    # Check error message by running again
    local output=$(bash "$CREATE_BOOTSTRAP_SCRIPT" 2>&1)
    assert_contains "$output" "Error: Plan file 'master-plan.md' not found" "Should show error message"
    assert_file_not_exists "issues/1-bootstrap-project-from-master-plan-md.md" "No issue should be created"
}

test_create_bootstrap_help() {
    # Test help flag
    local output=$(bash "$CREATE_BOOTSTRAP_SCRIPT" --help 2>&1)
    local exit_code=$?
    
    assert_equals "0" "$exit_code" "Help should exit successfully"
    assert_contains "$output" "Usage:" "Should show usage"
    assert_contains "$output" "--plan" "Should document --plan option"
    assert_contains "$output" "--editor" "Should document --editor option"
    assert_contains "$output" "default: master-plan.md" "Should mention default plan file"
}

test_create_bootstrap_multiple_issues() {
    # Copy scripts to test directory
    cp -r "$SCRIPT_DIR" ./scripts
    
    # Create a plan
    create_sample_plan "master-plan.md"
    
    # Create a regular issue first
    bash "$CREATE_ISSUE_SCRIPT" "Regular Issue"
    
    # Then create bootstrap issue
    bash "$CREATE_BOOTSTRAP_SCRIPT"
    
    # Check that bootstrap issue has correct number
    assert_file_exists "issues/2-bootstrap-project-from-master-plan-md.md" "Bootstrap issue should be #2"
    
    # Check todo contains both issues
    local todo_content=$(cat "todo.md")
    assert_contains "$todo_content" "[Issue #1]" "Todo should contain first issue"
    assert_contains "$todo_content" "[Issue #2]" "Todo should contain bootstrap issue"
}

test_create_bootstrap_with_path() {
    # Copy scripts to test directory
    cp -r "$SCRIPT_DIR" ./scripts
    
    # Create subdirectory with plan
    mkdir -p docs
    create_sample_plan "docs/project-spec.md"
    
    # Run with path to plan
    bash "$CREATE_BOOTSTRAP_SCRIPT" --plan docs/project-spec.md
    
    # Check issue was created with correct reference
    local issue_content=$(cat "issues/1-bootstrap-project-from-project-spec-md.md")
    assert_contains "$issue_content" "docs/project-spec.md" "Issue should contain full path to plan"
    assert_contains "$issue_content" "Bootstrap: Decompose project-spec.md" "Title should use basename only"
}

# Run all tests
run_test test_create_bootstrap_default_plan "Create bootstrap with default master-plan.md"
run_test test_create_bootstrap_custom_plan "Create bootstrap with custom plan file"
run_test test_create_bootstrap_missing_plan "Handle missing plan file error"
run_test test_create_bootstrap_help "Show help information"
run_test test_create_bootstrap_multiple_issues "Create bootstrap after other issues"
run_test test_create_bootstrap_with_path "Create bootstrap with plan in subdirectory"