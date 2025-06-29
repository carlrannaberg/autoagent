#!/bin/bash

# Simple HTTP server for Claude Stream UI
# Serves the UI and provides API endpoints for log files

set -e

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

PORT=${PORT:-8888}
HOST=${HOST:-localhost}

echo -e "${CYAN}🚀 Starting Claude Stream UI Server${NC}"
echo -e "${YELLOW}   Host: ${HOST}${NC}"
echo -e "${YELLOW}   Port: ${PORT}${NC}"
echo -e "${YELLOW}   UI:   http://${HOST}:${PORT}${NC}"
echo ""

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: python3 is required but not found${NC}"
    echo "Please install Python 3 to use the stream UI server"
    exit 1
fi

# Check if logs directory exists
if [ ! -d "logs" ]; then
    echo -e "${YELLOW}Warning: logs directory not found${NC}"
    echo "Creating logs directory..."
    mkdir -p logs
fi

# Check if ui directory exists
if [ ! -d "ui" ]; then
    echo -e "${RED}Error: ui directory not found${NC}"
    echo "Make sure you're running this from the project root"
    exit 1
fi

# Create a simple Python HTTP server with API endpoints
cat > /tmp/stream_server.py << 'EOF'
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
                if filename.endswith('.json') and filename.startswith('run-'):
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
        # Parse filename like: run-2025-06-28-23-45-12-2-initialize-monorepo-structure.json
        match = re.match(r'run-(\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2})-(.+)\.json', filename)
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
        # Suppress default request logging
        pass

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    host = sys.argv[2] if len(sys.argv) > 2 else 'localhost'
    
    with socketserver.TCPServer((host, port), StreamUIHandler) as httpd:
        print(f"✅ Server running at http://{host}:{port}")
        print("Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
EOF

# Run the Python server (from project root, not ui directory)
echo -e "${GREEN}✅ Starting server...${NC}"
python3 /tmp/stream_server.py "$PORT" "$HOST"