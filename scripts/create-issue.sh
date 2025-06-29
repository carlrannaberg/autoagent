#!/bin/bash
set -e

# Parse command line arguments
OPEN_EDITOR=false
while [[ $# -gt 0 ]]; do
  case $1 in
    --editor)
      OPEN_EDITOR=true
      shift
      ;;
    *)
      break
      ;;
  esac
done

# Create directories if they don't exist
mkdir -p issues plans

# Find the next issue number
LAST_ID=0
for f in issues/[0-9]*-*.md; do
  # Check if any files match
  [ -e "$f" ] || continue

  # Extract number from filename
  CURRENT_ID=$(basename "$f" | cut -d'-' -f1)

  if [[ -n "$CURRENT_ID" && "$CURRENT_ID" -gt "$LAST_ID" ]]; then
    LAST_ID=$CURRENT_ID
  fi
done
NEXT_ID=$((LAST_ID + 1))

# Get the issue title from the first argument
if [ -z "$1" ]; then
  echo "Usage: $0 [--editor] \"<issue-title>\""
  echo "  --editor: Open the created issue file in \$EDITOR"
  exit 1
fi

TITLE="$1"
TITLE_SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr -s '[:punct:][:space:]' '-' | sed 's/[^a-z0-9-]*//g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')
ISSUE_FILE="issues/${NEXT_ID}-${TITLE_SLUG}.md"
PLAN_FILE="plans/${NEXT_ID}-${TITLE_SLUG}.md"

# Create issue file
cat > "$ISSUE_FILE" << EOL
# Issue ${NEXT_ID}: $TITLE

## Requirement
[Describe the main requirement or problem to solve]

## Acceptance Criteria
- [ ] [Specific criterion 1]
- [ ] [Specific criterion 2]
- [ ] [Specific criterion 3]

## Technical Details
[Any technical constraints, dependencies, or implementation notes]

## Resources
[Links to documentation, examples, or related issues]
EOL

# Create plan file
cat > "$PLAN_FILE" << EOL
# Plan for Issue ${NEXT_ID}: $TITLE

This document outlines the step-by-step plan to complete \`${ISSUE_FILE}\`.

## Implementation Plan

### Phase 1: Setup
- [ ] [Initial setup task]
- [ ] [Environment preparation]

### Phase 2: Core Implementation
- [ ] [Main implementation task 1]
- [ ] [Main implementation task 2]

### Phase 3: Testing & Validation
- [ ] [Write tests]
- [ ] [Validate acceptance criteria]

### Phase 4: Documentation
- [ ] [Update documentation]
- [ ] [Add examples if needed]

## Technical Approach
[Describe the technical approach and architecture decisions]

## Potential Challenges
[List any anticipated challenges and mitigation strategies]

## Success Metrics
[How to measure successful completion]
EOL

# Create todo.md if it doesn't exist
if [ ! -f "todo.md" ]; then
  cat > "todo.md" << EOL
# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
EOL
fi

# Add to todo.md
echo "- [ ] **[Issue #${NEXT_ID}]** $TITLE - \`${ISSUE_FILE}\`" >> todo.md

echo "✅ Created:"
echo "  - ${ISSUE_FILE}"
echo "  - ${PLAN_FILE}"
echo "📝 Updated: todo.md"

# Open issue file in editor if requested
if [ "$OPEN_EDITOR" = true ] && [ -n "$EDITOR" ]; then
  $EDITOR "$ISSUE_FILE"
fi