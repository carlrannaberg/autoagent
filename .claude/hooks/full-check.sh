#!/bin/bash
# Comprehensive TypeScript and ESLint checking

ERRORS_FOUND=false
ERROR_REPORT=""

# Check if any TypeScript files are being modified
TS_FILES_FOUND=false
for file in $CLAUDE_FILE_PATHS; do
  if [[ $file =~ \.(ts|tsx)$ ]]; then
    TS_FILES_FOUND=true
    break
  fi
done

# Run TypeScript check once for the entire project if TS files are modified
if [ "$TS_FILES_FOUND" = true ]; then
  echo "📘 Checking TypeScript compilation..."
  
  TS_OUTPUT=$(npx tsc --noEmit --skipLibCheck 2>&1)
  if [ $? -ne 0 ]; then
    ERRORS_FOUND=true
    ERROR_REPORT="${ERROR_REPORT}

TypeScript compilation errors:
${TS_OUTPUT}"
  fi
fi

# Check ESLint for all JS/TS files
for file in $CLAUDE_FILE_PATHS; do
  if [[ $file =~ \.(ts|tsx|js|jsx)$ ]]; then
    echo "🔍 Checking ESLint: $file"

    LINT_OUTPUT=$(npx eslint "$file" 2>&1)
    if [ $? -ne 0 ]; then
      ERRORS_FOUND=true
      ERROR_REPORT="${ERROR_REPORT}

ESLint errors in ${file}:
${LINT_OUTPUT}"
    fi
  fi
done

if [ "$ERRORS_FOUND" = true ]; then
  echo "❌ Errors found in your changes:" >&2
  echo "$ERROR_REPORT" >&2
  exit 2
fi

echo "✅ All checks passed!"
