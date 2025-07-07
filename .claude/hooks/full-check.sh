#!/bin/bash
# Comprehensive TypeScript and ESLint checking

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

# Exit if file doesn't exist (might be a new file)
if [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

ERRORS_FOUND=false
ERROR_REPORT=""

# Check if it's a TypeScript file
if [[ $FILE_PATH =~ \.(ts|tsx)$ ]]; then
  echo "📘 Checking TypeScript compilation for $FILE_PATH..." >&2
  
  TS_OUTPUT=$(npx tsc --noEmit 2>&1)
  if [ $? -ne 0 ]; then
    ERRORS_FOUND=true
    ERROR_REPORT="${ERROR_REPORT}

TypeScript compilation errors:
${TS_OUTPUT}"
  fi
fi

# Check ESLint for JS/TS files
if [[ $FILE_PATH =~ \.(ts|tsx|js|jsx)$ ]]; then
  echo "🔍 Checking ESLint: $FILE_PATH" >&2

  # Try auto-fix first
  npx eslint "$FILE_PATH" --fix 2>&1
  
  # Check if any errors remain
  LINT_OUTPUT=$(npx eslint "$FILE_PATH" 2>&1)
  if [ $? -ne 0 ]; then
    ERRORS_FOUND=true
    ERROR_REPORT="${ERROR_REPORT}

ESLint errors that couldn't be auto-fixed in ${FILE_PATH}:
${LINT_OUTPUT}"
  fi
fi

if [ "$ERRORS_FOUND" = true ]; then
  echo "❌ Errors found in your changes:" >&2
  echo "$ERROR_REPORT" >&2
  exit 2
fi

echo "✅ All checks passed!" >&2