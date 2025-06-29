#!/usr/bin/env node

/**
 * CLI Usage Examples
 * 
 * This file demonstrates various CLI commands and their programmatic equivalents.
 * You can run these commands directly in your terminal after installing autoagent.
 */

const { spawn } = require('child_process');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

/**
 * Execute a CLI command and display output
 */
async function runCommand(command, description) {
  console.log(`\n📌 ${description}`);
  console.log(`$ ${command}`);
  console.log('─'.repeat(60));
  
  try {
    const { stdout, stderr } = await exec(command);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function demonstrateCLI() {
  console.log('=== AutoAgent CLI Usage Examples ===\n');
  console.log('These examples show common CLI commands.\n');

  // Basic Commands
  console.log('🔹 BASIC COMMANDS');
  console.log('─'.repeat(60));
  
  console.log(`
# Execute the next pending issue
autoagent run

# Execute a specific issue
autoagent run --issue 5

# Execute with a specific provider
autoagent run --provider gemini

# Dry run (preview without making changes)
autoagent run --dry-run

# Execute all pending issues
autoagent run --all
`);

  // Configuration Commands
  console.log('\n🔹 CONFIGURATION COMMANDS');
  console.log('─'.repeat(60));
  
  console.log(`
# Initialize configuration (interactive)
autoagent config init

# Initialize global configuration
autoagent config init --global

# Set default provider
autoagent config set-provider claude

# Configure failover providers
autoagent config set-failover claude gemini

# Enable auto-commit
autoagent config set-auto-commit true

# Show current configuration
autoagent config show

# Clear rate limit records
autoagent config clear-limits
`);

  // Status and Information Commands
  console.log('\n🔹 STATUS AND INFORMATION');
  console.log('─'.repeat(60));
  
  console.log(`
# Show project status
autoagent status

# Check provider availability
autoagent check

# Check specific provider
autoagent check claude
`);

  // Issue Management Commands
  console.log('\n🔹 ISSUE MANAGEMENT');
  console.log('─'.repeat(60));
  
  console.log(`
# Create a new issue interactively
autoagent create

# Create issue with specific title
autoagent create "Add user authentication"

# Bootstrap from master plan
autoagent bootstrap

# Bootstrap and execute immediately
autoagent bootstrap --execute
`);

  // Advanced Usage
  console.log('\n🔹 ADVANCED USAGE');
  console.log('─'.repeat(60));
  
  console.log(`
# Execute with debug output
autoagent run --debug

# Use specific workspace
autoagent run --workspace /path/to/project

# Disable auto-commit for this run
autoagent run --no-auto-commit

# Execute with custom token limit
autoagent run --max-tokens 150000

# Combine multiple options
autoagent run --all --provider claude --dry-run --debug
`);

  // Environment Variables
  console.log('\n🔹 ENVIRONMENT VARIABLES');
  console.log('─'.repeat(60));
  
  console.log(`
# Set log level
AUTOAGENT_LOG_LEVEL=debug autoagent run

# Override configuration file
AUTOAGENT_CONFIG=/custom/config.json autoagent run

# Disable color output
NO_COLOR=1 autoagent status

# Set provider via environment
AUTOAGENT_PROVIDER=gemini autoagent run
`);

  // Practical Examples
  console.log('\n🔹 PRACTICAL WORKFLOW EXAMPLES');
  console.log('─'.repeat(60));
  
  console.log(`
# 1. Initial Project Setup
autoagent config init
autoagent bootstrap
autoagent status

# 2. Daily Development Workflow
autoagent status                    # Check what's pending
autoagent run --dry-run            # Preview changes
autoagent run                      # Execute if preview looks good
git push                           # Push auto-committed changes

# 3. Batch Processing
autoagent config set-auto-commit true
autoagent config set-failover claude gemini
autoagent run --all

# 4. CI/CD Integration
autoagent check || exit 1          # Ensure providers available
autoagent run --all --no-auto-commit
npm test                           # Run tests after changes
git add . && git commit -m "AutoAgent updates"

# 5. Debugging Issues
autoagent run --issue 7 --debug --dry-run
autoagent config show              # Check configuration
autoagent check                    # Verify provider status
`);

  // Interactive Demo
  console.log('\n🔹 INTERACTIVE DEMONSTRATION');
  console.log('─'.repeat(60));
  
  if (process.argv.includes('--demo')) {
    console.log('\nRunning interactive demonstration...\n');
    
    // Show status
    await runCommand('autoagent status', 'Checking project status');
    
    // Show configuration
    await runCommand('autoagent config show', 'Displaying configuration');
    
    // Check providers
    await runCommand('autoagent check', 'Checking provider availability');
  } else {
    console.log('\nRun with --demo flag to see live command execution:');
    console.log('  node cli-usage.js --demo\n');
  }

  // Shell Completion
  console.log('\n🔹 SHELL COMPLETION');
  console.log('─'.repeat(60));
  
  console.log(`
# Generate bash completion
autoagent completion bash > ~/.autoagent-completion.bash
echo 'source ~/.autoagent-completion.bash' >> ~/.bashrc

# Generate zsh completion
autoagent completion zsh > ~/.autoagent-completion.zsh
echo 'source ~/.autoagent-completion.zsh' >> ~/.zshrc

# After sourcing, use Tab to complete commands:
# autoagent co<Tab> → autoagent config
# autoagent config set-<Tab> → shows all set- options
`);

  // Tips and Tricks
  console.log('\n🔹 TIPS AND TRICKS');
  console.log('─'.repeat(60));
  
  console.log(`
1. Use aliases for common commands:
   alias aa='autoagent'
   alias aar='autoagent run'
   alias aas='autoagent status'

2. Create project-specific scripts in package.json:
   "scripts": {
     "agent": "autoagent run",
     "agent:all": "autoagent run --all",
     "agent:status": "autoagent status"
   }

3. Use .autoagent/config.json for project defaults:
   - Set preferred provider
   - Configure auto-commit behavior
   - Add custom instructions

4. Monitor execution with:
   watch -n 1 'autoagent status'

5. Create issues from command line:
   echo "Implement new feature" | autoagent create

6. Chain commands for workflows:
   autoagent run && npm test && git push
`);
}

// Programmatic CLI invocation example
async function programmaticCLI() {
  console.log('\n\n🔹 PROGRAMMATIC CLI INVOCATION');
  console.log('─'.repeat(60));
  console.log('\nYou can also invoke the CLI programmatically:\n');

  const example = `
const { spawn } = require('child_process');

function runAutoAgent(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('autoagent', args, {
      stdio: 'inherit',
      shell: true
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(\`Process exited with code \${code}\`));
      }
    });
  });
}

// Usage
async function main() {
  try {
    // Run next issue
    await runAutoAgent(['run']);
    
    // Run with options
    await runAutoAgent(['run', '--provider', 'claude', '--dry-run']);
    
    // Check status
    await runAutoAgent(['status']);
  } catch (error) {
    console.error('AutoAgent failed:', error);
  }
}
`;

  console.log(example);
}

// Main execution
if (require.main === module) {
  (async () => {
    await demonstrateCLI();
    await programmaticCLI();
  })().catch(console.error);
}

module.exports = { demonstrateCLI, runCommand };