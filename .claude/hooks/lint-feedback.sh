#!/bin/bash
# Detailed lint feedback with error reporting

# Read JSON input from stdin
JSON_INPUT=$(cat)

# Extract file path from JSON using jq (or fallback to grep/sed if jq not available)
if command -v jq &> /dev/null; then
  FILE_PATH=$(echo "$JSON_INPUT" | jq -r '.tool_input.file_path // empty')
else
  # Fallback: extract file_path using sed
  FILE_PATH=$(echo "$JSON_INPUT" | sed -n 's/.*"file_path":"\([^"]*\)".*/\1/p' | head -1)
fi

# Exit if no file path found
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check JavaScript/TypeScript files
if [[ ! $FILE_PATH =~ \.(ts|tsx|js|jsx)$ ]]; then
  exit 0
fi

echo "🔍 Checking lint errors for: $FILE_PATH..." >&2

# Try to auto-fix with ESLint first
echo "🔧 Running ESLint auto-fix..." >&2
npx eslint "$FILE_PATH" --fix 2>&1

# Now check if there are any remaining errors
LINT_OUTPUT=$(npx eslint "$FILE_PATH" 2>&1)
LINT_EXIT_CODE=$?

if [ $LINT_EXIT_CODE -ne 0 ]; then
  # Write to stderr so Claude sees it (exit code 2)
  echo "" >&2
  echo "❌ ESLint errors that couldn't be auto-fixed in ${FILE_PATH}:" >&2
  echo "$LINT_OUTPUT" >&2
  echo "" >&2
  echo "Please fix the above ESLint errors manually." >&2
  exit 2  # This ensures Claude sees the errors
else
  # Success message goes to stdout (user sees in transcript)
  echo "✅ File passed ESLint checks (auto-fixed if needed)!" >&2
  exit 0
fi