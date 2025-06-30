# AutoAgent Troubleshooting Guide

This guide helps you resolve common issues when using AutoAgent. If you can't find a solution here, please [open an issue](https://github.com/carlrannaberg/autoagent/issues) on GitHub.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Provider Issues](#provider-issues)
- [Execution Errors](#execution-errors)
- [Configuration Problems](#configuration-problems)
- [Git Integration Issues](#git-integration-issues)
- [File System Errors](#file-system-errors)
- [Rate Limiting](#rate-limiting)
- [TypeScript/Build Issues](#typescriptbuild-issues)
- [Common Error Messages](#common-error-messages)
- [Debugging Tips](#debugging-tips)
- [FAQ](#faq)

## Installation Issues

### npm install fails

**Problem:** Installation fails with permission errors or network issues.

**Solutions:**

1. **Permission errors on global install:**
   ```bash
   # Use npm with sudo (not recommended)
   sudo npm install -g autoagent-cli
   
   # Better: Change npm's default directory
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   npm install -g autoagent-cli
   ```

2. **Network/proxy issues:**
   ```bash
   # Set npm registry
   npm config set registry https://registry.npmjs.org/
   
   # If behind proxy
   npm config set proxy http://proxy.company.com:8080
   npm config set https-proxy http://proxy.company.com:8080
   ```

3. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install autoagent-cli
   ```

### Command not found after installation

**Problem:** `autoagent: command not found` after global installation.

**Solutions:**

1. **Check npm bin directory:**
   ```bash
   npm bin -g
   # Add this path to your PATH environment variable
   ```

2. **Reinstall globally:**
   ```bash
   npm uninstall -g autoagent-cli
   npm install -g autoagent-cli
   ```

3. **Use npx instead:**
   ```bash
   npx autoagent --help
   ```

## Provider Issues

### Claude/Gemini CLI not found

**Problem:** "claude: command not found" or "gemini: command not found"

**Solutions:**

1. **Install the CLI tools:**
   - Claude: Visit [claude.ai/code](https://claude.ai/code)
   - Gemini: Visit [ai.google.dev/docs/gemini_cli](https://ai.google.dev/docs/gemini_cli)

2. **Check PATH:**
   ```bash
   which claude
   which gemini
   
   # If not found, add to PATH
   export PATH="/path/to/claude/bin:$PATH"
   ```

3. **Verify installation:**
   ```bash
   claude --version
   gemini --version
   ```

### Provider not authenticated

**Problem:** Provider returns authentication errors.

**Solutions:**

1. **Re-authenticate Claude:**
   ```bash
   claude auth login
   ```

2. **Re-authenticate Gemini:**
   ```bash
   gemini auth login
   ```

3. **Check credentials:**
   ```bash
   # Claude
   cat ~/.claude/config.json
   
   # Gemini
   cat ~/.gemini/config.json
   ```

### Provider timeout errors

**Problem:** Execution times out before completion.

**Solutions:**

1. **Increase timeout in config:**
   ```json
   {
     "providers": {
       "claude": {
         "timeout": 600000
       }
     }
   }
   ```

2. **Break down large issues:**
   - Split complex issues into smaller tasks
   - Reduce the scope of each issue

3. **Use retry mechanism:**
   ```bash
   autoagent run --retry-attempts 5
   ```

## Execution Errors

### Issue file not found

**Problem:** AutoAgent can't find the issue file.

**Solutions:**

1. **Check file path:**
   ```bash
   ls issues/
   autoagent run issues/1-setup.md
   ```

2. **Verify working directory:**
   ```bash
   pwd
   autoagent run --workspace /path/to/project
   ```

3. **Check todo.md:**
   ```bash
   cat todo.md
   # Ensure issue paths are correct
   ```

### JSON parsing errors

**Problem:** "Failed to parse Claude response" errors.

**Solutions:**

1. **Enable debug mode:**
   ```bash
   autoagent run --debug
   ```

2. **Check provider output format:**
   - Claude should return JSON
   - Gemini returns plain text

3. **Update provider CLI:**
   ```bash
   claude --version
   # Update if outdated
   ```

### Execution hangs or freezes

**Problem:** Agent appears stuck during execution.

**Solutions:**

1. **Cancel and retry:**
   ```bash
   # Press Ctrl+C to cancel
   # Then retry
   autoagent run
   ```

2. **Check system resources:**
   ```bash
   # Check CPU and memory
   top
   
   # Check disk space
   df -h
   ```

3. **Use timeout:**
   ```javascript
   const controller = new AbortController();
   setTimeout(() => controller.abort(), 300000); // 5 minutes
   
   await agent.executeNext({ signal: controller.signal });
   ```

## Configuration Problems

### Configuration not loading

**Problem:** Changes to config files aren't being applied.

**Solutions:**

1. **Check file locations:**
   ```bash
   # Global config
   ls -la ~/.autoagent/config.json
   
   # Local config
   ls -la ./.autoagent/config.json
   ```

2. **Validate JSON syntax:**
   ```bash
   # Check for syntax errors
   cat .autoagent/config.json | jq .
   ```

3. **View merged configuration:**
   ```bash
   autoagent config show --merged
   ```

### Invalid configuration values

**Problem:** "Invalid configuration" errors.

**Solutions:**

1. **Reset to defaults:**
   ```bash
   autoagent config reset
   ```

2. **Fix common issues:**
   ```json
   {
     "defaultProvider": "claude",  // Must be "claude" or "gemini"
     "retryAttempts": 3,          // Must be a number
     "gitAutoCommit": true        // Must be boolean
   }
   ```

3. **Use CLI to set values:**
   ```bash
   autoagent config set-provider claude
   autoagent config set-auto-commit true
   ```

## Git Integration Issues

### Git repository not initialized

**Problem:** Git commands fail with "not a git repository" error.

**Solutions:**

1. **Initialize git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Disable git features:**
   ```bash
   autoagent config set-auto-commit false
   ```

### Auto-commit not working

**Problem:** Changes aren't being committed automatically.

**Solutions:**

1. **Check git status:**
   ```bash
   git status
   # Ensure there are changes to commit
   ```

2. **Verify configuration:**
   ```bash
   autoagent config show | grep gitAutoCommit
   ```

3. **Check git config:**
   ```bash
   git config user.name
   git config user.email
   
   # Set if missing
   git config user.name "Your Name"
   git config user.email "your@email.com"
   ```

### Merge conflicts after rollback

**Problem:** Git conflicts after attempting rollback.

**Solutions:**

1. **Reset to clean state:**
   ```bash
   git reset --hard HEAD
   git clean -fd
   ```

2. **Manual conflict resolution:**
   ```bash
   # Edit conflicted files
   git add .
   git commit -m "Resolved conflicts"
   ```

## File System Errors

### Permission denied errors

**Problem:** Can't read or write files.

**Solutions:**

1. **Check file permissions:**
   ```bash
   ls -la issues/
   ls -la plans/
   
   # Fix permissions
   chmod -R 755 issues/ plans/
   ```

2. **Check ownership:**
   ```bash
   # Change ownership if needed
   sudo chown -R $(whoami) .
   ```

### Directory not found

**Problem:** Issues or plans directories don't exist.

**Solutions:**

1. **Create directories:**
   ```bash
   mkdir -p issues plans
   ```

2. **Run bootstrap:**
   ```bash
   autoagent bootstrap
   ```

## Rate Limiting

### Rate limit exceeded

**Problem:** "Rate limit exceeded" errors from providers.

**Solutions:**

1. **Wait for cooldown:**
   ```bash
   # Check rate limit status
   autoagent config show
   
   # Wait for reset time shown
   ```

2. **Clear rate limits:**
   ```bash
   autoagent config clear-limits
   ```

3. **Use failover:**
   ```bash
   autoagent config set-failover gemini,claude
   ```

4. **Increase cooldown period:**
   ```json
   {
     "rateLimitCooldown": 7200000  // 2 hours
   }
   ```

### Provider keeps getting rate limited

**Problem:** Hitting rate limits frequently.

**Solutions:**

1. **Reduce token usage:**
   ```json
   {
     "maxTokens": 50000
   }
   ```

2. **Add delays between executions:**
   ```javascript
   for (const issue of issues) {
     await agent.executeIssue(issue);
     await new Promise(resolve => setTimeout(resolve, 30000)); // 30s delay
   }
   ```

## TypeScript/Build Issues

### TypeScript compilation errors

**Problem:** Build fails with TypeScript errors.

**Solutions:**

1. **Clean and rebuild:**
   ```bash
   rm -rf dist/
   npm run build
   ```

2. **Update dependencies:**
   ```bash
   npm update
   npm install
   ```

3. **Check TypeScript version:**
   ```bash
   npm list typescript
   # Should be 5.0+
   ```

### Module not found errors

**Problem:** Cannot find module 'autoagent-cli' errors.

**Solutions:**

1. **Reinstall:**
   ```bash
   npm uninstall autoagent-cli
   npm install autoagent-cli
   ```

2. **Check node_modules:**
   ```bash
   ls node_modules/autoagent-cli
   ```

3. **Clear module cache:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Common Error Messages

### "ENOENT: no such file or directory"

**Cause:** File or directory doesn't exist.

**Fix:**
```bash
# Create missing directories
mkdir -p issues plans .autoagent

# Or specify correct path
autoagent run --workspace /correct/path
```

### "EACCES: permission denied"

**Cause:** Insufficient permissions.

**Fix:**
```bash
# Fix permissions
chmod -R 755 .
# Or run with proper user
```

### "SyntaxError: Unexpected token"

**Cause:** Invalid JSON in config or response.

**Fix:**
```bash
# Validate config
cat .autoagent/config.json | jq .

# Reset if corrupted
rm .autoagent/config.json
autoagent config init
```

### "AbortError: The operation was aborted"

**Cause:** Execution was cancelled.

**Fix:**
- Normal when using Ctrl+C
- Check for timeout settings
- Increase timeout if needed

## Debugging Tips

### Enable debug logging

```bash
# Via CLI
autoagent run --debug

# Via environment variable
export AUTOAGENT_DEBUG=true
autoagent run

# In code
const logger = new Logger({ logLevel: 'debug' });
```

### Inspect provider output

```bash
# Run provider directly
claude --json < issues/1-setup.md

# Save output for inspection
claude --json < issues/1-setup.md > output.json
```

### Check file contents

```bash
# View issue content
cat issues/1-setup.md

# Check plan content
cat plans/1-setup.md

# Verify todo list
cat todo.md
```

### Monitor file changes

```bash
# Watch for file changes
watch -n 1 'ls -la issues/ plans/'

# Monitor git changes
watch -n 1 'git status --short'
```

## FAQ

### Q: Can I use AutoAgent without git?

**A:** Yes, disable git features:
```bash
autoagent config set-auto-commit false
```

### Q: How do I use a specific provider version?

**A:** Set custom arguments in config:
```json
{
  "providers": {
    "claude": {
      "customArgs": ["--model", "claude-3-opus"]
    }
  }
}
```

### Q: Can I run multiple agents in parallel?

**A:** Not recommended due to file conflicts. Use batch processing instead:
```javascript
await agent.executeAll({ concurrency: 1 });
```

### Q: How do I migrate from the bash version?

**A:** Your existing issues and plans work as-is. Just install and run:
```bash
npm install -g autoagent-cli
autoagent run
```

### Q: What's the difference between global and local config?

**A:** 
- Global: User preferences (`~/.autoagent/config.json`)
- Local: Project settings (`./.autoagent/config.json`)
- Local overrides global

### Q: How do I contribute to AutoAgent?

**A:** See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

---

Still having issues? Please:

1. Check our [GitHub Issues](https://github.com/carlrannaberg/autoagent/issues)
2. Open a [GitHub Discussion](https://github.com/carlrannaberg/autoagent/discussions)

When reporting issues, include:
- AutoAgent version: `autoagent --version`
- Node.js version: `node --version`
- Operating system
- Error messages
- Debug output: `autoagent run --debug`