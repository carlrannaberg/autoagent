class ClaudeStreamViewer {
    constructor() {
        this.logs = [];
        this.filteredLogs = [];
        this.currentLog = null;
        this.showRawJson = false;
        this.autoRefresh = true;
        this.refreshInterval = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadLogs();
        this.startAutoRefresh();
    }

    initializeElements() {
        this.logsContainer = document.getElementById('logs-container');
        this.logViewer = document.getElementById('log-viewer');
        this.streamContent = document.getElementById('stream-content');
        this.searchInput = document.getElementById('search');
        this.refreshButton = document.getElementById('refresh');
        this.autoRefreshToggle = document.getElementById('auto-refresh');
        this.refreshIntervalSelect = document.getElementById('refresh-interval');
        this.closeViewerButton = document.getElementById('close-viewer');
        this.toggleRawButton = document.getElementById('toggle-raw');
        this.downloadButton = document.getElementById('download-log');
    }

    attachEventListeners() {
        this.searchInput.addEventListener('input', () => this.filterLogs());
        this.refreshButton.addEventListener('click', () => this.loadLogs());
        this.autoRefreshToggle.addEventListener('change', () => this.toggleAutoRefresh());
        this.refreshIntervalSelect.addEventListener('change', () => this.updateRefreshInterval());
        this.closeViewerButton.addEventListener('click', () => this.showLogsList());
        this.toggleRawButton.addEventListener('click', () => this.toggleRawJson());
        this.downloadButton.addEventListener('click', () => this.downloadCurrentLog());
    }

    async loadLogs() {
        try {
            this.showLoading();
            const response = await fetch('/api/logs');
            if (!response.ok) throw new Error('Failed to fetch logs');
            
            this.logs = await response.json();
            this.filteredLogs = [...this.logs];
            this.renderLogsList();
        } catch (error) {
            this.showError('Failed to load logs. Make sure the server is running.');
        }
    }

    startAutoRefresh() {
        if (this.autoRefresh && !this.refreshInterval) {
            const interval = parseInt(this.refreshIntervalSelect.value) || 5000;
            this.refreshInterval = setInterval(() => {
                this.loadLogs();
            }, interval);
        }
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    toggleAutoRefresh() {
        this.autoRefresh = this.autoRefreshToggle.checked;
        if (this.autoRefresh) {
            this.startAutoRefresh();
        } else {
            this.stopAutoRefresh();
        }
    }

    updateRefreshInterval() {
        if (this.autoRefresh) {
            this.stopAutoRefresh();
            this.startAutoRefresh();
        }
    }

    filterLogs() {
        const query = this.searchInput.value.toLowerCase();
        this.filteredLogs = this.logs.filter(log => 
            log.filename.toLowerCase().includes(query) ||
            log.issue.toLowerCase().includes(query) ||
            log.timestamp.toLowerCase().includes(query)
        );
        this.renderLogsList();
    }

    renderLogsList() {
        if (this.filteredLogs.length === 0) {
            this.logsContainer.innerHTML = '<p class="loading">No logs found</p>';
            return;
        }

        const html = this.filteredLogs.map(log => `
            <div class="log-item" onclick="viewer.viewLog('${log.filename}')">
                <h3>${log.issue}</h3>
                <div class="meta">
                    <span>${log.timestamp}</span>
                    <span class="status ${log.status}">${log.status.toUpperCase()}</span>
                </div>
            </div>
        `).join('');

        this.logsContainer.innerHTML = html;
    }

    async viewLog(filename) {
        try {
            this.showLoading();
            const response = await fetch(`/api/logs/${filename}`);
            if (!response.ok) throw new Error('Failed to fetch log content');
            
            this.currentLog = await response.json();
            this.showLogViewer();
            this.renderLogContent();
        } catch (error) {
            this.showError('Failed to load log content');
        }
    }

    renderLogContent() {
        if (this.showRawJson) {
            this.streamContent.innerHTML = `
                <div class="raw-json">${JSON.stringify(this.currentLog.content, null, 2)}</div>
            `;
        } else {
            const messages = this.currentLog.content.map(item => this.formatStreamMessage(item)).join('');
            this.streamContent.innerHTML = `<div class="stream-messages">${messages}</div>`;
        }
    }

    formatStreamMessage(item) {
        const type = item.type || 'unknown';
        let content = '';
        let messageType = type;
        let timestamp = '';
        
        // Extract timestamp if available
        if (item.timestamp) {
            timestamp = new Date(item.timestamp).toLocaleTimeString();
        }

        switch (type) {
            case 'message_start':
                messageType = 'message_start';
                content = `<strong>🎬 Message Started</strong><br>Role: ${item.message?.role || 'unknown'}<br>Model: ${item.message?.model || 'unknown'}`;
                break;
                
            case 'content_block_start':
                messageType = 'content_block';
                if (item.content_block?.type === 'tool_use') {
                    content = `<strong>🔧 Tool Call: ${item.content_block.name}</strong><br><pre class="tool-input">${JSON.stringify(item.content_block.input, null, 2)}</pre>`;
                } else {
                    content = `<strong>📝 Content Block</strong><br>Type: ${item.content_block?.type || 'text'}`;
                }
                break;
                
            case 'content_block_delta':
                messageType = 'content_delta';
                if (item.delta?.type === 'text_delta') {
                    content = `<span class="text-content">${this.escapeHtml(item.delta.text)}</span>`;
                } else {
                    content = `<em>Content delta: ${item.delta?.type || 'unknown'}</em>`;
                }
                break;
                
            case 'assistant':
                if (item.message && item.message.content) {
                    const textContent = item.message.content
                        .filter(c => c.type === 'text')
                        .map(c => c.text)
                        .join(' ');
                    content = this.escapeHtml(textContent);
                    
                    const toolUses = item.message.content.filter(c => c.type === 'tool_use');
                    if (toolUses.length > 0) {
                        content += toolUses.map(tool => `<br><div class="tool-call"><strong>🔧 ${tool.name}</strong><pre>${JSON.stringify(tool.input, null, 2)}</pre></div>`).join('');
                    }
                }
                break;
                
            case 'user':
                if (item.message && item.message.content) {
                    const textContent = item.message.content
                        .filter(c => c.type === 'text')
                        .map(c => c.text)
                        .join(' ');
                    if (textContent) {
                        content = this.escapeHtml(textContent);
                    }
                    
                    const toolResults = item.message.content.filter(c => c.type === 'tool_result');
                    if (toolResults.length > 0) {
                        content += toolResults.map(result => 
                            `<div class="tool-result"><strong>🔧 Tool Result (${result.tool_use_id}):</strong><br><pre>${this.escapeHtml(String(result.content).substring(0, 500))}${String(result.content).length > 500 ? '...' : ''}</pre></div>`
                        ).join('');
                        messageType = 'tool_result';
                    }
                }
                break;
                
            case 'result':
                content = `<strong>🏁 Execution Result:</strong> ${item.is_error ? '❌ Error' : '✅ Success'}`;
                messageType = item.is_error ? 'error' : 'success';
                break;
                
            case 'system':
                content = `<strong>⚙️ System:</strong> ${item.subtype || 'Unknown'}`;
                if (item.model) content += `<br>Model: ${item.model}`;
                if (item.tools && item.tools.length > 0) content += `<br>Tools: ${item.tools.length}`;
                break;
                
            default:
                content = `<pre class="raw-json">${this.escapeHtml(JSON.stringify(item, null, 2))}</pre>`;
        }

        return `
            <div class="stream-message ${type}" data-type="${messageType}">
                <div class="message-header">
                    <span class="message-type">${messageType}</span>
                    ${timestamp ? `<span class="message-time">${timestamp}</span>` : ''}
                </div>
                <div class="message-content">${content}</div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    toggleRawJson() {
        this.showRawJson = !this.showRawJson;
        this.toggleRawButton.textContent = this.showRawJson ? 'Show Formatted' : 'Show Raw JSON';
        this.renderLogContent();
    }

    downloadCurrentLog() {
        if (!this.currentLog) return;
        
        const dataStr = JSON.stringify(this.currentLog.content, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = this.currentLog.filename;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    showLogsList() {
        document.querySelector('.logs-list').style.display = 'block';
        this.logViewer.style.display = 'none';
    }

    showLogViewer() {
        document.querySelector('.logs-list').style.display = 'none';
        this.logViewer.style.display = 'block';
    }

    showLoading() {
        this.logsContainer.innerHTML = '<p class="loading">Loading...</p>';
    }

    showError(message) {
        this.logsContainer.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Initialize the viewer when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.viewer = new ClaudeStreamViewer();
});