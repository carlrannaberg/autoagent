#!/bin/bash
set -e

# Default plan filename
DEFAULT_PLAN="master-plan.md"

# Parse command line arguments
PLAN_FILE=""
OPEN_EDITOR=false
while [[ $# -gt 0 ]]; do
  case $1 in
    --plan)
      PLAN_FILE="$2"
      shift 2
      ;;
    --editor)
      OPEN_EDITOR=true
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [--plan <plan-file>] [--editor]"
      echo ""
      echo "Create a bootstrap issue that decomposes a master plan into individual tasks."
      echo ""
      echo "Options:"
      echo "  --plan <file>    Path to the plan markdown file (default: master-plan.md)"
      echo "  --editor         Open the created bootstrap issue in \$EDITOR"
      echo "  -h, --help       Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Use default plan file if not specified
if [ -z "$PLAN_FILE" ]; then
  PLAN_FILE="$DEFAULT_PLAN"
fi

# Check if plan file exists
if [ ! -f "$PLAN_FILE" ]; then
  echo "Error: Plan file '$PLAN_FILE' not found"
  echo ""
  echo "Please create your plan file first with the project specifications."
  echo "Default location: $DEFAULT_PLAN"
  exit 1
fi

# Create the bootstrap issue
TITLE="Bootstrap project from $(basename "$PLAN_FILE")"
./scripts/create-issue.sh "$TITLE"

# Find the created issue file
LAST_ISSUE=$(ls -t issues/*.md | head -n 1)

# Replace the content with bootstrap-specific instructions
cat > "$LAST_ISSUE" << EOL
# Bootstrap: Decompose $(basename "$PLAN_FILE") into Individual Tasks

## Requirement
Read and analyze the master plan document at \`$PLAN_FILE\` and decompose it into individual, actionable issues that can be executed autonomously.

## Acceptance Criteria
- [ ] Read and fully understand the master plan document
- [ ] Create individual issues for each major component or feature
- [ ] Each issue follows the standard format with clear requirements and acceptance criteria
- [ ] Create corresponding implementation plans for each issue
- [ ] Update todo.md with all new issues in the correct order
- [ ] Ensure dependencies between issues are clearly documented
- [ ] All issues are self-contained and can be executed autonomously

## Technical Details
- Use the standard issue format found in \`examples/example-issue.md\`
- Use the standard plan format found in \`examples/example-plan.md\`
- Issue numbers should continue from the current highest number
- File naming should follow the pattern: \`[number]-[descriptive-slug].md\`
- Each issue should be atomic and focused on a single feature or component

## Resources
- Master Plan: \`$PLAN_FILE\`
- Issue Template: \`examples/example-issue.md\`
- Plan Template: \`examples/example-plan.md\`
- Project Instructions: \`CLAUDE.md\`

## Bootstrap Instructions
This is a special bootstrap issue. When executed, you should:

1. Read the master plan document carefully
2. Identify all major components, features, and tasks
3. Create a logical sequence of implementation steps
4. For each step, create:
   - An issue file in \`issues/\` with clear requirements
   - A plan file in \`plans/\` with implementation details
5. Update \`todo.md\` with all new issues
6. Ensure the resulting issues can be executed autonomously in sequence

Remember: The goal is to transform a high-level plan into concrete, executable tasks that the autonomous agent can complete one by one.
EOL

echo "✅ Created bootstrap issue: $LAST_ISSUE"
echo "📄 Referencing plan file: $PLAN_FILE"

# Open in editor if requested
if [ "$OPEN_EDITOR" = true ] && [ -n "$EDITOR" ]; then
  $EDITOR "$LAST_ISSUE"
fi

echo ""
echo "Next steps:"
echo "1. Review the bootstrap issue: $LAST_ISSUE"
echo "2. Run: ./scripts/run-agent.sh"
echo "3. The agent will decompose your plan into individual tasks"