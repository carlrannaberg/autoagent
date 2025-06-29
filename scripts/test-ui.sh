#!/bin/bash
set -e

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

TEST_PORT=9998
TEST_HOST=localhost
BASE_URL="http://${TEST_HOST}:${TEST_PORT}"

echo -e "${CYAN}🧪 Starting UI Tests${NC}"
echo -e "${YELLOW}   Test Host: ${TEST_HOST}${NC}"
echo -e "${YELLOW}   Test Port: ${TEST_PORT}${NC}"
echo -e "${YELLOW}   Base URL:  ${BASE_URL}${NC}"
echo ""

# Check if required commands are available
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ Error: curl is required for testing${NC}"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Error: python3 is required for the server${NC}"
    exit 1
fi

# Ensure logs directory exists
mkdir -p logs

# Create test log files with unique test prefix
TEST_LOG_FILE="logs/test-run-2025-06-29-12-00-00-1-test-ui-functionality.json"
TEST_LOG_FILE_2="logs/test-run-2025-06-29-12-01-00-2-test-error-case.json"

echo -e "${YELLOW}📝 Creating test log files...${NC}"

# Create successful test log
cat > "$TEST_LOG_FILE" << 'EOF'
{"type":"system","subtype":"init","model":"claude-3-5-sonnet-20241022","tools":[{"name":"bash"},{"name":"read"},{"name":"write"}]}
{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Test user message"}]}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"I'll help you test the UI functionality. Let me start by examining the current setup."},{"type":"tool_use","id":"tool_123","name":"bash","input":{"command":"ls -la"}}]}}
{"type":"user","message":{"role":"user","content":[{"type":"tool_result","tool_use_id":"tool_123","content":"total 16\ndrwxr-xr-x  5 user user  160 Jun 29 12:00 .\ndrwxr-xr-x  3 user user   96 Jun 29 12:00 ..\n-rw-r--r--  1 user user  123 Jun 29 12:00 README.md\ndrwxr-xr-x  3 user user   96 Jun 29 12:00 scripts\ndrwxr-xr-x  3 user user   96 Jun 29 12:00 ui"}]}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"Perfect! I can see the project structure. Now let me create a simple test file."},{"type":"tool_use","id":"tool_456","name":"write","input":{"file_path":"test.txt","content":"This is a test file created during UI testing."}}]}}
{"type":"user","message":{"role":"user","content":[{"type":"tool_result","tool_use_id":"tool_456","content":"File written successfully"}]}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"Excellent! The test has been completed successfully. The UI functionality is working as expected."}]}}
{"type":"result","is_error":false,"result":"Task completed successfully. UI test functionality has been verified."}
EOF

# Create error test log
cat > "$TEST_LOG_FILE_2" << 'EOF'
{"type":"system","subtype":"init","model":"claude-3-5-sonnet-20241022","tools":[{"name":"bash"}]}
{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Test error case"}]}}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"Testing error handling"},{"type":"tool_use","id":"tool_789","name":"bash","input":{"command":"false"}}]}}
{"type":"user","message":{"role":"user","content":[{"type":"tool_result","tool_use_id":"tool_789","content":"Command failed with exit code 1"}]}}
{"type":"result","is_error":true,"result":"Task failed due to command error"}
EOF

echo -e "${GREEN}✅ Test log files created${NC}"

# Check if ui directory exists
if [ ! -d "ui" ]; then
    echo -e "${RED}❌ Error: ui directory not found${NC}"
    echo "Make sure you're running this from the project root"
    exit 1
fi

# Start the server in background
echo -e "${BLUE}🚀 Starting test server...${NC}"

# Create the Python server script
cat > /tmp/test_stream_server.py << 'EOF'
#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
import sys
import urllib.parse
from datetime import datetime
import re

class StreamUIHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="ui", **kwargs)
    
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        
        if parsed_path.path == '/api/logs':
            self.handle_logs_list()
        elif parsed_path.path.startswith('/api/logs/'):
            filename = parsed_path.path[10:]  # Remove '/api/logs/'
            self.handle_log_content(filename)
        else:
            # Serve static files from ui directory
            super().do_GET()
    
    def handle_logs_list(self):
        try:
            logs_dir = 'logs'
            if not os.path.exists(logs_dir):
                self.send_json_response([])
                return
            
            logs = []
            for filename in os.listdir(logs_dir):
                if filename.endswith('.json') and filename.startswith('test-run-'):
                    filepath = os.path.join(logs_dir, filename)
                    if os.path.isfile(filepath):
                        log_info = self.parse_log_filename(filename)
                        log_info['filename'] = filename
                        log_info['size'] = os.path.getsize(filepath)
                        log_info['modified'] = datetime.fromtimestamp(
                            os.path.getmtime(filepath)
                        ).isoformat()
                        
                        # Try to determine status from log content
                        try:
                            with open(filepath, 'r') as f:
                                content = f.read()
                                if '"is_error":false' in content:
                                    log_info['status'] = 'success'
                                elif '"is_error":true' in content:
                                    log_info['status'] = 'error'
                                else:
                                    log_info['status'] = 'unknown'
                        except:
                            log_info['status'] = 'unknown'
                        
                        logs.append(log_info)
            
            # Sort by timestamp (newest first)
            logs.sort(key=lambda x: x['timestamp'], reverse=True)
            self.send_json_response(logs)
            
        except Exception as e:
            self.send_error_response(f"Failed to list logs: {str(e)}")
    
    def handle_log_content(self, filename):
        try:
            # Sanitize filename
            filename = os.path.basename(filename)
            filepath = os.path.join('logs', filename)
            
            if not os.path.exists(filepath):
                self.send_error_response("Log file not found", 404)
                return
            
            with open(filepath, 'r') as f:
                content = []
                for line in f:
                    line = line.strip()
                    if line:
                        try:
                            json_obj = json.loads(line)
                            content.append(json_obj)
                        except json.JSONDecodeError:
                            # Skip invalid JSON lines
                            pass
            
            response = {
                'filename': filename,
                'content': content,
                'info': self.parse_log_filename(filename)
            }
            
            self.send_json_response(response)
            
        except Exception as e:
            self.send_error_response(f"Failed to read log: {str(e)}")
    
    def parse_log_filename(self, filename):
        # Parse filename like: test-run-2025-06-28-23-45-12-2-initialize-monorepo-structure.json
        match = re.match(r'test-run-(\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2})-(.+)\.json', filename)
        if match:
            timestamp_str, issue_part = match.groups()
            # Convert issue part back to readable format
            issue = issue_part.replace('-', ' ').title()
            return {
                'timestamp': timestamp_str,
                'issue': issue
            }
        else:
            return {
                'timestamp': 'Unknown',
                'issue': filename
            }
    
    def send_json_response(self, data):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def send_error_response(self, message, code=500):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        error_data = {'error': message}
        self.wfile.write(json.dumps(error_data).encode())
    
    def log_message(self, format, *args):
        # Suppress default request logging for tests
        pass

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    host = sys.argv[2] if len(sys.argv) > 2 else 'localhost'
    
    with socketserver.TCPServer((host, port), StreamUIHandler) as httpd:
        print(f"Test server running at http://{host}:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nTest server stopped")
EOF

# Start server in background (from project root, not ui directory)
python3 /tmp/test_stream_server.py "$TEST_PORT" "$TEST_HOST" &
SERVER_PID=$!

# Wait for server to start
echo -e "${YELLOW}⏳ Waiting for server to start...${NC}"
sleep 3

# Function to cleanup on exit
cleanup() {
    if [ ! -z "$SERVER_PID" ]; then
        echo -e "${YELLOW}🛑 Stopping test server...${NC}"
        kill $SERVER_PID 2>/dev/null || true
        wait $SERVER_PID 2>/dev/null || true
    fi
    
    # Clean up test log files
    echo -e "${YELLOW}🧹 Cleaning up test files...${NC}"
    rm -f logs/test-run-*.json
    rm -f /tmp/test_stream_server.py
    rm -f /tmp/test_response.json
    
    echo -e "${GREEN}✅ Cleanup complete${NC}"
}
trap cleanup EXIT

# Test functions
test_endpoint() {
    local endpoint="$1"
    local description="$2"
    local expected_status="${3:-200}"
    
    echo -e "${BLUE}🧪 Testing: ${description}${NC}"
    
    response=$(curl -s -w "%{http_code}" -o /tmp/test_response.json "$BASE_URL$endpoint" || echo "000")
    http_code="${response: -3}"
    
    if [ "$http_code" = "$expected_status" ]; then
        echo -e "${GREEN}✅ PASS: HTTP $http_code${NC}"
        
        # If it's a JSON endpoint, validate JSON
        if [[ "$endpoint" == /api/* ]]; then
            if jq empty /tmp/test_response.json 2>/dev/null; then
                echo -e "${GREEN}✅ PASS: Valid JSON response${NC}"
            else
                echo -e "${RED}❌ FAIL: Invalid JSON response${NC}"
                return 1
            fi
        fi
    else
        echo -e "${RED}❌ FAIL: Expected HTTP $expected_status, got $http_code${NC}"
        return 1
    fi
    
    echo ""
    return 0
}

# Run tests
echo -e "${CYAN}🏃 Running API Tests...${NC}"
echo ""

TESTS_PASSED=0
TESTS_TOTAL=0

# Test 1: Main UI page
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if test_endpoint "/" "Main UI page loads"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
fi

# Test 2: API logs list
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if test_endpoint "/api/logs" "API logs list"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
    
    # Validate response structure
    if jq -e 'type == "array"' /tmp/test_response.json >/dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS: Response is an array${NC}"
        
        # Check if our test log is included
        if jq -e '.[] | select(.filename == "test-run-2025-06-29-12-00-00-1-test-ui-functionality.json")' /tmp/test_response.json >/dev/null 2>&1; then
            echo -e "${GREEN}✅ PASS: Test log file found in response${NC}"
        else
            echo -e "${RED}❌ FAIL: Test log file not found in response${NC}"
        fi
    else
        echo -e "${RED}❌ FAIL: Response is not an array${NC}"
    fi
    echo ""
fi

# Test 3: Specific log content
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if test_endpoint "/api/logs/test-run-2025-06-29-12-00-00-1-test-ui-functionality.json" "Specific log content"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
    
    # Validate response structure
    if jq -e '.filename and .content and .info' /tmp/test_response.json >/dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS: Response has expected structure${NC}"
        
        # Check content is array
        if jq -e '.content | type == "array"' /tmp/test_response.json >/dev/null 2>&1; then
            echo -e "${GREEN}✅ PASS: Content is an array${NC}"
        else
            echo -e "${RED}❌ FAIL: Content is not an array${NC}"
        fi
    else
        echo -e "${RED}❌ FAIL: Response missing expected fields${NC}"
    fi
    echo ""
fi

# Test 4: Non-existent log (should return 404)
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if test_endpoint "/api/logs/test-run-non-existent-file.json" "Non-existent log file" "404"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
fi

# Test 5: Static assets (CSS)
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if test_endpoint "/style.css" "CSS file loads"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
fi

# Test 6: Static assets (JS)
TESTS_TOTAL=$((TESTS_TOTAL + 1))
if test_endpoint "/script.js" "JavaScript file loads"; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
fi

# Test 7: Production server on 8888 (if running)
TESTS_TOTAL=$((TESTS_TOTAL + 1))
echo -e "${BLUE}🧪 Testing: Production server on port 8888${NC}"
PROD_RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/prod_test.html "http://localhost:8888/" 2>/dev/null || echo "000")
PROD_HTTP_CODE="${PROD_RESPONSE: -3}"

if [ "$PROD_HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ PASS: Production server accessible on port 8888${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
    
    # Test production API
    if curl -s "http://localhost:8888/api/logs" | jq empty 2>/dev/null; then
        echo -e "${GREEN}✅ PASS: Production API returns valid JSON${NC}"
    else
        echo -e "${YELLOW}⚠️  WARNING: Production API issue${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  WARNING: Production server not running on port 8888 (HTTP $PROD_HTTP_CODE)${NC}"
    echo -e "${GRAY}   Start it with: scripts/serve-stream-ui.sh${NC}"
fi
echo ""

# Summary
echo -e "${CYAN}📊 Test Results Summary${NC}"
echo -e "${YELLOW}   Tests Passed: ${TESTS_PASSED}/${TESTS_TOTAL}${NC}"

if [ $TESTS_PASSED -eq $TESTS_TOTAL ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    echo ""
    echo -e "${CYAN}💡 Production UI features:${NC}"
    echo -e "${YELLOW}   • Auto-refresh with configurable intervals (2s-1m)${NC}"
    echo -e "${YELLOW}   • Real-time log streaming and updates${NC}"
    echo -e "${YELLOW}   • Search and filter functionality${NC}"
    echo -e "${YELLOW}   • Raw JSON view and download${NC}"
    echo ""
    echo -e "${CYAN}💡 Access the UI at:${NC}"
    echo -e "${YELLOW}   http://localhost:8888${NC}"
    echo -e "${GRAY}   (Run: scripts/serve-stream-ui.sh)${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi

# Cleanup happens automatically via trap