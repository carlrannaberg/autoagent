#!/bin/bash
set -e

# ANSI color codes for better formatting
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

# Function to format and display JSON stream from Claude
format_claude_output() {
    local temp_file="$1"

    echo -e "${CYAN}┌─────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│                     🤖 CLAUDE AGENT                        │${NC}"
    echo -e "${CYAN}└─────────────────────────────────────────────────────────────┘${NC}"
    echo ""

    while IFS= read -r line; do
        # Store all lines for success detection
        echo "$line" >> "$temp_file"

        # Skip empty lines
        [ -z "$line" ] && continue

        # Parse and format the JSON line for better readability
        if echo "$line" | jq -e . >/dev/null 2>&1; then
            TYPE=$(echo "$line" | jq -r '.type // empty' 2>/dev/null)

            case "$TYPE" in
                "system")
                    SUBTYPE=$(echo "$line" | jq -r '.subtype // empty' 2>/dev/null)
                    if [ "$SUBTYPE" = "init" ]; then
                        echo -e "${GRAY}🔧 System initialized${NC}"
                        MODEL=$(echo "$line" | jq -r '.model // empty' 2>/dev/null)
                        TOOLS=$(echo "$line" | jq -r '.tools | length // 0' 2>/dev/null)
                        if [ "$MODEL" != "empty" ] && [ "$MODEL" != "" ]; then
                            echo -e "   Model: $MODEL"
                        fi
                        if [ "$TOOLS" != "0" ]; then
                            echo -e "   Tools available: $TOOLS"
                        fi
                        echo ""
                    fi
                    ;;
                "assistant")
                    # Extract message content
                    HAS_CONTENT=$(echo "$line" | jq -e '.message.content[]?' >/dev/null 2>&1 && echo "true" || echo "false")
                    if [ "$HAS_CONTENT" = "true" ]; then
                        # Check for tool use
                        TOOL_USES=$(echo "$line" | jq -r '.message.content[] | select(.type == "tool_use") | .name' 2>/dev/null)
                        if [ -n "$TOOL_USES" ]; then
                            echo "$TOOL_USES" | while read -r tool; do
                                [ -n "$tool" ] && echo -e "${BLUE}🔧 Using tool: ${WHITE}$tool${NC}"
                            done
                        fi

                        # Check for text content
                        TEXT_CONTENT=$(echo "$line" | jq -r '.message.content[] | select(.type == "text") | .text' 2>/dev/null)
                        if [ -n "$TEXT_CONTENT" ]; then
                            echo -e "${WHITE}💭 Agent: ${NC}$TEXT_CONTENT"
                            echo ""
                        fi
                    fi
                    ;;
                "user")
                    # Extract tool results
                    TOOL_RESULT=$(echo "$line" | jq -r '.message.content[]? | select(.type == "tool_result") | .content' 2>/dev/null)
                    if [ -n "$TOOL_RESULT" ]; then
                        # Truncate very long tool results for readability
                        if [ ${#TOOL_RESULT} -gt 300 ]; then
                            RESULT_PREVIEW=$(echo "$TOOL_RESULT" | head -c 300)
                            echo -e "${GREEN}✅ Tool result: ${GRAY}${RESULT_PREVIEW}...${NC}"
                        else
                            echo -e "${GREEN}✅ Tool result: ${GRAY}$TOOL_RESULT${NC}"
                        fi
                        echo ""
                    fi
                    ;;
                "result")
                    IS_ERROR=$(echo "$line" | jq -r '.is_error // empty' 2>/dev/null)
                    if [ "$IS_ERROR" = "false" ]; then
                        echo -e "${GREEN}✅ Task completed successfully!${NC}"
                    elif [ "$IS_ERROR" = "true" ]; then
                        echo -e "${RED}❌ Task failed${NC}"
                    fi
                    echo ""
                    ;;
                *)
                    # For any other types, show minimal info
                    if [ "$TYPE" != "empty" ] && [ -n "$TYPE" ]; then
                        echo -e "${GRAY}📄 $TYPE${NC}"
                    fi
                    ;;
            esac
        else
            # If it's not JSON, might be other output
            if [ -n "$line" ] && [[ ! "$line" =~ ^[[:space:]]*$ ]]; then
                echo -e "${GRAY}📝 $line${NC}"
            fi
        fi
    done
}

# Function to format and display JSON stream from Gemini
format_gemini_output() {
    local temp_file="$1"

    echo -e "${CYAN}┌─────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│                     🤖 GEMINI AGENT                        │${NC}"
    echo -e "${CYAN}└─────────────────────────────────────────────────────────────┘${NC}"
    echo ""

    while IFS= read -r line; do
        echo "$line" >> "$temp_file"
        [ -z "$line" ] && continue

        if echo "$line" | jq -e . >/dev/null 2>&1; then
            TYPE=$(echo "$line" | jq -r '.type // empty' 2>/dev/null)
            case "$TYPE" in
                "tool_code")
                    TOOL_CODE=$(echo "$line" | jq -r '.content // ""')
                    echo -e "${BLUE}🔧 Using tool:${NC}\n${WHITE}$TOOL_CODE${NC}"
                    echo ""
                    ;;
                "model_output")
                    TEXT_CONTENT=$(echo "$line" | jq -r '.content // ""')
                    echo -e "${WHITE}💭 Agent: ${NC}$TEXT_CONTENT"
                    echo ""
                    ;;
                "tool_result")
                     CONTENT=$(echo "$line" | jq -r '.content // ""')
                     if [ ${#CONTENT} -gt 300 ]; then
                         PREVIEW=$(echo "$CONTENT" | head -c 300)
                         echo -e "${GREEN}✅ Tool result: ${GRAY}${PREVIEW}...${NC}"
                     else
                         echo -e "${GREEN}✅ Tool result: ${GRAY}$CONTENT${NC}"
                     fi
                     echo ""
                    ;;
                "result")
                    STATUS=$(echo "$line" | jq -r '.status // "error"' 2>/dev/null)
                    if [ "$STATUS" = "success" ]; then
                        echo -e "${GREEN}✅ Task completed successfully!${NC}"
                    else
                        echo -e "${RED}❌ Task failed${NC}"
                    fi
                    echo ""
                    ;;
                *)
                    if [ "$TYPE" != "empty" ] && [ -n "$TYPE" ]; then
                        echo -e "${GRAY}📄 $TYPE${NC}"
                    fi
                    ;;
            esac
        else
            if [ -n "$line" ] && [[ ! "$line" =~ ^[[:space:]]*$ ]]; then
                echo -e "${GRAY}📝 $line${NC}"
            fi
        fi
    done
}

# Function to handle rate limit errors and calculate wait time
handle_rate_limit() {
    local result="$1"
    local provider="$2"

    # Extract rate limit information based on provider
    if [ "$provider" = "claude" ]; then
        # Claude format: "Claude AI usage limit reached|1751151600"
        if echo "$result" | grep -q "usage limit reached"; then
            local timestamp=$(echo "$result" | grep -oE '\|[0-9]+' | tr -d '|')
            if [ -n "$timestamp" ]; then
                local current_time=$(date +%s)
                local wait_seconds=$((timestamp - current_time))
                if [ $wait_seconds -gt 0 ]; then
                    echo $wait_seconds
                    return 0
                fi
            fi
        fi
    elif [ "$provider" = "gemini" ]; then
        # Check for Gemini rate limit patterns
        if echo "$result" | grep -q "quota|rate limit|too many requests"; then
            # Default wait time for Gemini (can be adjusted based on actual error format)
            echo 60
            return 0
        fi
    fi

    # No rate limit detected
    echo 0
    return 1
}

# Function to run the agent on the next available issue
run_next_issue() {
    # Check if todo.md exists
    if [ ! -f "todo.md" ]; then
        echo -e "${RED}Error: todo.md not found. Create one with 'scripts/create-issue.sh'${NC}"
        exit 1
    fi

    # Find the first unchecked issue in todo.md
    CURRENT_ISSUE_LINE=$(grep -m 1 '\[ \]' todo.md)

    if [ -z "$CURRENT_ISSUE_LINE" ]; then
        echo -e "${GREEN}🎉 All issues in todo.md are complete!${NC}"
        return 1 # No issues left
    fi

    # Extract the issue file path from the issue line
    ISSUE_FILE=$(echo "$CURRENT_ISSUE_LINE" | grep -o '`issues/.*\.md`' | tr -d '`')
    PLAN_FILE="plans/$(basename "$ISSUE_FILE" .md).md"

    if [ ! -f "$ISSUE_FILE" ] || [ ! -f "$PLAN_FILE" ]; then
        echo -e "${RED}Error: Issue or plan file not found:${NC}"
        echo -e "  Issue: $ISSUE_FILE"
        echo -e "  Plan: $PLAN_FILE"
        exit 1
    fi

    echo -e "${PURPLE}┌─────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${PURPLE}│              🤖 AUTONOMOUS AGENT - NEW ISSUE               │${NC}"
    echo -e "${PURPLE}└─────────────────────────────────────────────────────────────┘${NC}"
    echo -e "${WHITE}Found next issue. Launching agent for:${NC}"
    echo -e "${CYAN}  📋 Issue:  ${YELLOW}${ISSUE_FILE}${NC}"
    echo -e "${CYAN}  📝 Plan:   ${YELLOW}${PLAN_FILE}${NC}"
    echo -e "${CYAN}  📄 Log:    ${YELLOW}${LOG_FILE}${NC}"
    echo ""

    # Read the instructions
    INSTRUCTIONS=""
    if [ "$PROVIDER" = "gemini" ] && [ -f "GEMINI.md" ]; then
        INSTRUCTIONS=$(cat GEMINI.md)
    elif [ -f "CLAUDE.md" ]; then
        INSTRUCTIONS=$(cat CLAUDE.md)
    fi

    INITIAL_PROMPT="You are an autonomous AI agent. The following text contains your task context (TODO list, issue specification, and implementation plan). Your goal is to execute the plan to resolve the issue. Complete all requirements specified. The task is complete when you have fulfilled all acceptance criteria. As your final step, you must update the CLAUDE.md and GEMINI.md files with any new information about the project, such as new dependencies, scripts, or changes to the project structure. ${INSTRUCTIONS}"

    # Create temporary file for output and permanent log file
    OUTPUT_LOG=$(mktemp)
    TIMESTAMP=$(date +%Y-%m-%d-%H-%M-%S)
    ISSUE_NAME=$(basename "$ISSUE_FILE" .md)
    LOG_FILE="logs/run-${TIMESTAMP}-${ISSUE_NAME}-${PROVIDER}.json"

    # Ensure logs directory exists
    mkdir -p logs

    AGENT_SUCCESS=false
    MAX_RETRIES=3
    RETRY_COUNT=0

    # Run the agent with todo, issue, and plan as context
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        set -o pipefail

        if [ "$PROVIDER" = "gemini" ]; then
            if ! command -v gemini &> /dev/null; then
                echo -e "${RED}Error: 'gemini' command not found. Make sure it's installed and in your PATH.${NC}"
                exit 1
            fi

            if ( cat todo.md "$ISSUE_FILE" "$PLAN_FILE" | gemini -p "$INITIAL_PROMPT" -y -d | tee "$LOG_FILE" | format_gemini_output "$OUTPUT_LOG" ); then
                LAST_LINE=$(tail -n 1 "$OUTPUT_LOG")
                if echo "$LAST_LINE" | grep -q '"type":"result"' && echo "$LAST_LINE" | grep -q '"status":"success"'; then
                    AGENT_SUCCESS=true
                    break
                fi
            fi
        else # Default to claude
            if ! command -v claude &> /dev/null; then
                echo -e "${RED}Error: 'claude' command not found. Install it from: https://claude.ai/code${NC}"
                exit 1
            fi

            if ( cat todo.md "$ISSUE_FILE" "$PLAN_FILE" | claude -p "$INITIAL_PROMPT" --dangerously-skip-permissions --output-format stream-json --verbose | tee "$LOG_FILE" | format_claude_output "$OUTPUT_LOG" ); then
                # Check the last line for success signal
                LAST_LINE=$(tail -n 1 "$OUTPUT_LOG")
                if echo "$LAST_LINE" | grep -q '"type":"result"' && echo "$LAST_LINE" | grep -q '"is_error":false'; then
                    AGENT_SUCCESS=true
                    break
                fi
            fi
        fi

        set +o pipefail

        # Check if we hit a rate limit
        LAST_LINE=$(tail -n 1 "$LOG_FILE")
        if echo "$LAST_LINE" | grep -q '"result"'; then
            RESULT_MESSAGE=$(echo "$LAST_LINE" | jq -r '.result // ""' 2>/dev/null)
            WAIT_TIME=$(handle_rate_limit "$RESULT_MESSAGE" "$PROVIDER")

            if [ $WAIT_TIME -gt 0 ]; then
                RETRY_COUNT=$((RETRY_COUNT + 1))

                if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
                    echo -e "${YELLOW}⏳ Rate limit detected. Waiting ${WAIT_TIME} seconds before retry ${RETRY_COUNT}/${MAX_RETRIES}...${NC}"

                    # Show countdown
                    local remaining=$WAIT_TIME
                    while [ $remaining -gt 0 ]; do
                        printf "\r${YELLOW}⏳ Waiting: %02d:%02d remaining...${NC}" $((remaining/60)) $((remaining%60))
                        sleep 1
                        remaining=$((remaining - 1))
                    done
                    printf "\r${GREEN}✓ Wait complete. Retrying...${NC}\n"

                    # Create new log file for retry
                    TIMESTAMP=$(date +%Y-%m-%d-%H-%M-%S)
                    LOG_FILE="logs/run-${TIMESTAMP}-${ISSUE_NAME}-${PROVIDER}-retry${RETRY_COUNT}.json"
                    continue
                else
                    echo -e "${RED}❌ Rate limit hit after ${MAX_RETRIES} retries. Please try again later.${NC}"
                    break
                fi
            else
                # Not a rate limit error, don't retry
                break
            fi
        else
            # No result line found or other error, don't retry
            break
        fi
    done

    rm -f "$OUTPUT_LOG"

    echo -e "${CYAN}└─────────────────────────────────────────────────────────────┘${NC}"

    if $AGENT_SUCCESS; then
        echo -e "${GREEN}✅ Agent completed the issue successfully.${NC}"

        echo -e "${BLUE}➡️ Marking issue as complete in todo.md...${NC}"
        # Mark issue as complete - use a simpler approach with awk
        awk -v line="$CURRENT_ISSUE_LINE" '
        {
            if ($0 == line) {
                gsub(/- \[ \]/, "- [x]", $0)
            }
            print
        }' todo.md > todo.md.tmp && mv todo.md.tmp todo.md

        # Optional: auto-commit if in a git repo
        if [ -d ".git" ] && [ "${AUTO_COMMIT:-true}" = "true" ]; then
            echo -e "${BLUE}📦 Committing changes...${NC}"
            COMMIT_MSG="feat: Complete issue from ${ISSUE_FILE}"
            git add .
            git commit -m "$COMMIT_MSG" || echo -e "${YELLOW}⚠️ No changes to commit${NC}"
        fi

        return 0 # Issue successful
    else
        echo -e "${RED}⚠️ Agent exited with an error. Stopping.${NC}"
        return 1 # Agent failed
    fi
}

# Parse command line arguments
AUTO_MODE=false
PROVIDER="claude" # Default provider

while [[ $# -gt 0 ]]; do
    case $1 in
        --auto)
            AUTO_MODE=true
            shift
            ;;
        -p|--provider)
            PROVIDER="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: $0 [--auto] [-p|--provider <name>]"
            echo ""
            echo "Run an AI agent on issues from todo.md"
            echo ""
            echo "Options:"
            echo "  --auto              Run all issues automatically without stopping"
            echo "  -p, --provider      Specify the AI provider ('claude' or 'gemini'). Defaults to 'claude'."
            echo "  --help              Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Main execution
if [ "$AUTO_MODE" = true ]; then
    # Auto mode: run all issues
    while run_next_issue; do
        echo -e "${GREEN}🚀 Moving to the next issue...${NC}"
        sleep 1
    done
else
    # Single issue mode
    run_next_issue
fi
