#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Testing autoagent run functionality${NC}"
echo ""

# Save current directory
ORIGINAL_DIR=$(pwd)
TEST_DIR=$(mktemp -d)

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🧹 Cleaning up test directory...${NC}"
    cd "$ORIGINAL_DIR"
    rm -rf "$TEST_DIR"
    echo -e "${GREEN}✅ Cleanup complete${NC}"
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Change to test directory
cd "$TEST_DIR"
echo -e "${BLUE}📁 Created test directory: $TEST_DIR${NC}\n"

# Create minimal package.json for the test project
echo -e "${BLUE}Creating test project package.json...${NC}"
cat > "package.json" << 'EOF'
{
  "name": "test-autoagent-project",
  "version": "1.0.0",
  "description": "Test project for autoagent",
  "scripts": {
    "test": "echo 'No tests'"
  }
}
EOF

# Create minimal directory structure
echo -e "${BLUE}Creating directory structure...${NC}"
mkdir -p issues plans logs

# Create a test issue
echo -e "${BLUE}Creating test issue...${NC}"
cat > "issues/1-test-task.md" << 'EOF'
# Issue 1: Test Task

## Requirement
Create a simple test file to verify the agent is working

## Acceptance Criteria
- [ ] Create a file named test-output.txt
- [ ] File should contain "Hello from autoagent!"
- [ ] File should include the current date

## Technical Details
This is a minimal test to verify the agent can read issues and execute tasks
EOF

# Create corresponding plan
echo -e "${BLUE}Creating test plan...${NC}"
cat > "plans/1-test-task.md" << 'EOF'
# Plan for Issue 1: Test Task

This document outlines the step-by-step plan to complete `issues/1-test-task.md`.

## Implementation Plan

### Phase 1: Create the test file
- [ ] Create test-output.txt in the current directory
- [ ] Add "Hello from autoagent!" to the file
- [ ] Add the current date to the file

## Technical Approach
Use the Write tool to create the file with the required content

## Success Metrics
The file test-output.txt exists with the specified content
EOF

# Create todo.md
echo -e "${BLUE}Creating todo.md...${NC}"
cat > "todo.md" << 'EOF'
# To-Do

This file tracks all issues for the autonomous agent.

## Pending Issues
- [ ] **[Issue #1]** Test Task - `issues/1-test-task.md`
EOF

# Create minimal CLAUDE.md
echo -e "${BLUE}Creating CLAUDE.md...${NC}"
cat > "CLAUDE.md" << 'EOF'
# Claude Instructions

This is a test environment for autoagent. Complete the task described in the issue.
When you create test-output.txt, make sure to include both required elements.
EOF

# Show created structure
echo -e "\n${GREEN}✅ Test environment created:${NC}"
find . -type f -name "*.md" -o -name "*.txt" | sort

# Build autoagent if needed
echo -e "\n${BLUE}🔨 Building autoagent...${NC}"
cd "$ORIGINAL_DIR/.."
npm run build

# Test 1: Run autoagent on single issue
echo -e "\n${BLUE}📋 Test 1: Running autoagent on single issue...${NC}"
cd "$TEST_DIR"
"$ORIGINAL_DIR/../bin/autoagent" run

# Check if test file was created
echo -e "\n${BLUE}🔍 Checking results...${NC}"
if [ -f "test-output.txt" ]; then
    echo -e "${GREEN}✅ Test file created successfully:${NC}"
    cat test-output.txt
    
    # Check if todo was marked complete
    if grep -q "\[x\]" todo.md; then
        echo -e "\n${GREEN}✅ Todo marked as complete${NC}"
    else
        echo -e "\n${RED}❌ Todo not marked as complete${NC}"
    fi
else
    echo -e "${RED}❌ Test file not created${NC}"
fi

# Create second test issue for --all test
echo -e "\n${BLUE}Creating second test issue...${NC}"
cat > "issues/2-second-task.md" << 'EOF'
# Issue 2: Second Task

## Requirement
Create another test file

## Acceptance Criteria
- [ ] Create a file named second-test.txt
- [ ] File should contain "Second test complete"
EOF

cat > "plans/2-second-task.md" << 'EOF'
# Plan for Issue 2: Second Task

## Implementation Plan
- [ ] Create second-test.txt with required content
EOF

# Add to todo.md
echo "- [ ] **[Issue #2]** Second Task - \`issues/2-second-task.md\`" >> todo.md

# Test 2: Run autoagent with --all flag
echo -e "\n${BLUE}📋 Test 2: Running autoagent with --all flag...${NC}"
"$ORIGINAL_DIR/../bin/autoagent" run --all

# Check results
echo -e "\n${BLUE}🔍 Final results:${NC}"
echo -e "${YELLOW}Files created:${NC}"
ls -la *.txt 2>/dev/null || echo "No .txt files found"

echo -e "\n${YELLOW}Todo status:${NC}"
cat todo.md | grep -E "\[[ x]\]"

echo -e "\n${YELLOW}Logs created:${NC}"
ls -la logs/ 2>/dev/null || echo "No logs found"

echo -e "\n${GREEN}✅ Test script completed${NC}"