#!/bin/bash
set -e

# Quick test of single issue with gemini
export DEBUG=true

cd /Users/carl/Development/agents/autoagent
npm run build

echo "Testing single issue with Gemini..."
./test/test-autoagent.sh single_issue gemini