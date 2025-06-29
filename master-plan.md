# AutoAgent - Implementation Plan

## Project Overview

**Package Name**: `autoagent` (can be changed to any of these alternatives):
- `aiagent` - Simple and clear
- `agentcli` - Highlights CLI nature
- `taskflow` - Focus on task management
- `aiflow` - AI workflow automation
- `agentkit` - Developer toolkit feel
- `autoflow` - Automation emphasis

**Note**: Update all references if you choose a different name.

**Version**: 1.0.0 (MVP)
**Goal**: Convert bash scripts to TypeScript npm package with CLI and programmatic API
**Timeline**: 5 weeks
**Size Target**: < 15KB gzipped

## Project Structure

```
autoagent/
├── .github/
│   └── workflows/
│       ├── check-version-change.yaml  # PR checks & tests
│       └── release-package.yaml       # Auto-publish to npm
├── src/
│   ├── core/
│   │   ├── agent.ts           # Main AutonomousAgent class
│   │   ├── providers.ts       # Claude/Gemini provider adapters
│   │   ├── files.ts           # Issue/plan file management
│   │   └── config.ts          # Configuration management
│   ├── cli/
│   │   └── index.ts           # CLI interface
│   ├── utils/
│   │   ├── logger.ts          # Colored console output
│   │   └── retry.ts           # Rate limit retry logic
│   └── types/
│       └── index.ts           # TypeScript definitions
├── templates/
│   ├── issue.md               # Default issue template
│   └── plan.md                # Default plan template
├── bin/
│   └── autoagent              # CLI entry point
├── test/
│   ├── agent.test.ts
│   ├── providers.test.ts
│   ├── files.test.ts
│   └── config.test.ts
├── examples/
│   └── basic-usage.js
├── package.json
├── tsconfig.json
├── .nvmrc
├── README.md
└── LICENSE
```

## Implementation Steps

### Step 1: Project Setup

Create GitHub repository and project structure:
```bash
# Create GitHub repository (will prompt for details if needed)
gh repo create autoagent --public --description "Run autonomous AI agents using Claude or Gemini" --clone

# Navigate to the repository
cd autoagent

# Create project structure
mkdir -p .github/workflows src/core src/cli src/utils src/types test templates bin examples
```

Create `.nvmrc`:
```
18.0.0
```

Create `.gitignore`:
```
node_modules/
dist/
*.log
.DS_Store
coverage/
.env
*.tmp
test-workspace/
```

Create `.npmignore`:
```
src/
test/
examples/
.github/
*.ts
*.log
tsconfig.json
.eslintrc.js
.nvmrc
jest.config.js
coverage/
.env
*.tmp
test-workspace/
```

Initialize `package.json` with the configuration from Step 3.

### Step 2: TypeScript Configuration

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

Create `.eslintrc.js`:
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
```

### Step 3: Package.json Configuration

Update `package.json`:
```json
{
  "name": "autoagent",
  "version": "1.0.0",
  "description": "Run autonomous AI agents using Claude or Gemini for task execution",
  "keywords": ["ai", "agents", "claude", "gemini", "automation", "cli"],
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "bin": {
    "autoagent": "./bin/autoagent"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/",
    "prepublishOnly": "npm run build && npm test && npm run lint",
    "example": "npm run build && node examples/basic-usage.js"
  },
  "files": [
    "dist/",
    "bin/",
    "templates/",
    "README.md",
    "LICENSE"
  ],
  "engines": {
    "node": ">=14.0.0"
  },
  "dependencies": {
    "chalk": "^4.1.2",
    "commander": "^11.0.0"
  },
  "devDependencies": {
    "@types/jest": "^29.0.0",
    "@types/node": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "typescript": "^5.0.0"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "roots": ["<rootDir>/src", "<rootDir>/test"],
    "testMatch": ["**/*.test.ts"],
    "collectCoverageFrom": [
      "src/**/*.ts",
      "!src/types/**",
      "!src/index.ts"
    ]
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/[username]/autoagent.git"
  },
  "author": "Your Name",
  "license": "MIT"
}
```

### Step 4: Core Type Definitions

Create `src/types/index.ts`:
```typescript
export interface Issue {
  number: number;
  title: string;
  file: string;
  requirements: string;
  acceptanceCriteria: string[];
  technicalDetails?: string;
  resources?: string[];
}

export interface Plan {
  issueNumber: number;
  file: string;
  phases: Phase[];
  technicalApproach?: string;
  challenges?: string[];
}

export interface Phase {
  name: string;
  tasks: string[];
}

export interface ExecutionResult {
  success: boolean;
  issueNumber: number;
  duration: number;
  output?: string;
  error?: string;
  provider?: 'claude' | 'gemini';
  filesChanged?: string[];  // Track files modified during execution
  rollbackData?: RollbackData;  // Data needed for rollback
}

export interface RollbackData {
  gitCommit?: string;  // Git commit hash before changes
  fileBackups?: Map<string, string>;  // Original file contents
}

export interface ProgressCallback {
  (message: string, percentage?: number): void;
}

export interface AgentConfig {
  provider?: 'claude' | 'gemini';
  workspace?: string;
  autoCommit?: boolean;
  includeCoAuthoredBy?: boolean;
  autoUpdateContext?: boolean;
  debug?: boolean;
  dryRun?: boolean;  // Preview mode without making changes
  signal?: AbortSignal;  // For cancellation support
  onProgress?: ProgressCallback;  // Progress tracking callback
  enableRollback?: boolean;  // Enable rollback capability
}

export interface UserConfig {
  defaultProvider?: 'claude' | 'gemini';
  failoverProviders?: ('claude' | 'gemini')[];
  autoCommit?: boolean;
  includeCoAuthoredBy?: boolean;
  autoUpdateContext?: boolean;
  debug?: boolean;
  retryAttempts?: number;
  rateLimitCooldown?: number;
  customTemplatesPath?: string;
  dryRun?: boolean;  // Default dry-run mode setting
}

export type AgentEvent = 'issue-created' | 'execution-start' | 'execution-end' | 'error';

export interface Status {
  totalIssues: number;
  completedIssues: number;
  pendingIssues: number;
  currentIssue?: Issue;
  availableProviders?: string[];
  rateLimitedProviders?: string[];
}
```

### Step 5: Provider Implementation

**No changes needed** - The providers themselves remain the same. The failover logic is handled in the Agent class.

Create `src/core/providers.ts`:
```typescript
import { spawn } from 'child_process';
import chalk from 'chalk';

export abstract class Provider {
  abstract name: string;
  abstract execute(prompt: string, context: string): Promise<string>;
  abstract checkAvailability(): Promise<boolean>;
}

export class ClaudeProvider extends Provider {
  name = 'claude';

  async checkAvailability(): Promise<boolean> {
    return new Promise((resolve) => {
      const claude = spawn('claude', ['--version'], { shell: true });
      claude.on('error', () => resolve(false));
      claude.on('exit', (code) => resolve(code === 0));
    });
  }

  async execute(prompt: string, context: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const fullPrompt = `${prompt}\n\n${context}`;

      const claude = spawn('claude', [
        '-p', fullPrompt,
        '--dangerously-skip-permissions',
        '--output-format', 'json'
      ]);

      let output = '';
      let error = '';

      claude.stdout.on('data', (data) => {
        output += data.toString();
      });

      claude.stderr.on('data', (data) => {
        error += data.toString();
      });

      claude.on('close', (code) => {
        if (code === 0) {
          // Parse JSON output and check for success
          try {
            const lines = output.trim().split('\n');
            const lastLine = lines[lines.length - 1];
            const result = JSON.parse(lastLine);

            if (result.type === 'result' && result.is_error === false) {
              resolve(output);
            } else {
              reject(new Error('Execution failed'));
            }
          } catch (e) {
            resolve(output); // Return raw output if not JSON
          }
        } else {
          reject(new Error(error || 'Provider execution failed'));
        }
      });
    });
  }
}

export class GeminiProvider extends Provider {
  name = 'gemini';

  async checkAvailability(): Promise<boolean> {
    return new Promise((resolve) => {
      const gemini = spawn('gemini', ['--version'], { shell: true });
      gemini.on('error', () => resolve(false));
      gemini.on('exit', (code) => resolve(code === 0));
    });
  }

  async execute(prompt: string, context: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const fullPrompt = `${prompt}\n\n${context}`;

      const gemini = spawn('gemini', [
        '-p', fullPrompt,
        '-y',
        '-d'
      ]);

      let output = '';
      let error = '';

      gemini.stdout.on('data', (data) => {
        output += data.toString();
      });

      gemini.stderr.on('data', (data) => {
        error += data.toString();
      });

      gemini.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(error || 'Provider execution failed'));
        }
      });
    });
  }
}

export function createProvider(name: 'claude' | 'gemini'): Provider {
  switch (name) {
    case 'claude':
      return new ClaudeProvider();
    case 'gemini':
      return new GeminiProvider();
    default:
      throw new Error(`Unknown provider: ${name}`);
  }
}
```

### Step 6: File Management

Create `src/core/files.ts`:
```typescript
import * as fs from 'fs/promises';
import * as path from 'path';
import { Issue, Plan } from '../types';

export class FileManager {
  constructor(private workspace: string = process.cwd()) {}

  private get issuesDir(): string {
    return path.join(this.workspace, 'issues');
  }

  private get plansDir(): string {
    return path.join(this.workspace, 'plans');
  }

  private get todoFile(): string {
    return path.join(this.workspace, 'todo.md');
  }

  async ensureDirectories(): Promise<void> {
    await fs.mkdir(this.issuesDir, { recursive: true });
    await fs.mkdir(this.plansDir, { recursive: true });
  }

  async createIssue(title: string): Promise<Issue> {
    await this.ensureDirectories();

    // Get next issue number
    const issueNumber = await this.getNextIssueNumber();

    // Create issue content
    const issueContent = `# Issue ${issueNumber}: ${title}

## Requirement
[Main requirement or problem to solve]

## Acceptance Criteria
- [ ] Specific criterion 1
- [ ] Specific criterion 2

## Technical Details
[Technical constraints or notes]

## Resources
[Documentation or references]
`;

    const issueFile = path.join(this.issuesDir, `issue-${issueNumber}.md`);
    await fs.writeFile(issueFile, issueContent);

    // Create corresponding plan
    const planContent = `# Plan for Issue ${issueNumber}: ${title}

## Implementation Plan
### Phase 1: Setup
- [ ] Initial tasks

### Phase 2: Core Implementation
- [ ] Main implementation tasks

### Phase 3: Testing & Validation
- [ ] Testing tasks

## Technical Approach
[Architecture decisions]

## Potential Challenges
[Anticipated issues]
`;

    const planFile = path.join(this.plansDir, `plan-issue-${issueNumber}.md`);
    await fs.writeFile(planFile, planContent);

    // Update todo.md
    await this.addToTodo(issueNumber, title);

    return {
      number: issueNumber,
      title,
      file: issueFile,
      requirements: '[Main requirement or problem to solve]',
      acceptanceCriteria: ['Specific criterion 1', 'Specific criterion 2']
    };
  }

  async getNextIssueNumber(): Promise<number> {
    try {
      const files = await fs.readdir(this.issuesDir);
      const issueNumbers = files
        .filter(f => f.startsWith('issue-') && f.endsWith('.md'))
        .map(f => parseInt(f.match(/issue-(\d+)\.md/)?.[1] || '0'))
        .filter(n => !isNaN(n));

      return issueNumbers.length > 0 ? Math.max(...issueNumbers) + 1 : 1;
    } catch {
      return 1;
    }
  }

  async addToTodo(issueNumber: number, title: string): Promise<void> {
    const todoLine = `- [ ] Issue ${issueNumber}: ${title} (\`issues/issue-${issueNumber}.md\`)\n`;

    try {
      const content = await fs.readFile(this.todoFile, 'utf-8');
      await fs.writeFile(this.todoFile, content + todoLine);
    } catch {
      // Create todo.md if it doesn't exist
      const header = '# Todo List\n\n';
      await fs.writeFile(this.todoFile, header + todoLine);
    }
  }

  async getNextIssue(): Promise<Issue | null> {
    try {
      const content = await fs.readFile(this.todoFile, 'utf-8');
      const lines = content.split('\n');

      for (const line of lines) {
        const match = line.match(/^- \[ \] Issue (\d+): (.+) \(`(.+)`\)$/);
        if (match) {
          const [, number, title, file] = match;
          const issueContent = await fs.readFile(
            path.join(this.workspace, file),
            'utf-8'
          );

          return {
            number: parseInt(number),
            title,
            file: path.join(this.workspace, file),
            requirements: this.extractSection(issueContent, 'Requirement'),
            acceptanceCriteria: this.extractChecklist(issueContent, 'Acceptance Criteria')
          };
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  async markComplete(issueNumber: number): Promise<void> {
    const content = await fs.readFile(this.todoFile, 'utf-8');
    const updated = content.replace(
      new RegExp(`^- \\[ \\] Issue ${issueNumber}:`, 'm'),
      `- [x] Issue ${issueNumber}:`
    );
    await fs.writeFile(this.todoFile, updated);
  }

  async readTodo(): Promise<string> {
    try {
      return await fs.readFile(this.todoFile, 'utf-8');
    } catch {
      return '';
    }
  }

  async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch {
      return '';
    }
  }

  async getStats(): Promise<{ total: number; completed: number; pending: number }> {
    try {
      const content = await fs.readFile(this.todoFile, 'utf-8');
      const lines = content.split('\n');

      let total = 0;
      let completed = 0;

      for (const line of lines) {
        if (line.match(/^- \[x\] Issue \d+:/)) {
          total++;
          completed++;
        } else if (line.match(/^- \[ \] Issue \d+:/)) {
          total++;
        }
      }

      return {
        total,
        completed,
        pending: total - completed
      };
    } catch {
      return { total: 0, completed: 0, pending: 0 };
    }
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content);
  }

  private extractSection(content: string, section: string): string {
    const regex = new RegExp(`## ${section}\\n([^#]+)`, 's');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  }

  private extractChecklist(content: string, section: string): string[] {
    const sectionContent = this.extractSection(content, section);
    return sectionContent
      .split('\n')
      .filter(line => line.match(/^- \[[ x]\]/))
      .map(line => line.replace(/^- \[[ x]\] /, ''));
  }
}
```

### Step 7: Configuration Management

**Replace entirely** with the enhanced ConfigManager. The new implementation includes:
- Rate limit tracking
- Provider failover configuration
- `getAvailableProvider()` method
- `recordRateLimit()` and `clearRateLimit()` methods
- `showConfig()` method

Create `src/core/config.ts`:
```typescript
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { UserConfig } from '../types';
import { createProvider } from './providers';
import { Logger } from '../utils/logger';

export class ConfigManager {
  private static CONFIG_DIR = '.autoagent';
  private static CONFIG_FILE = 'config.json';
  private static RATE_LIMIT_FILE = 'rate-limits.json';

  private globalConfigPath: string;
  private localConfigPath: string;

  constructor(private workspace: string = process.cwd()) {
    this.globalConfigPath = path.join(os.homedir(), ConfigManager.CONFIG_DIR);
    this.localConfigPath = path.join(workspace, ConfigManager.CONFIG_DIR);
  }

  async loadConfig(): Promise<UserConfig> {
    const defaultConfig: UserConfig = {
      defaultProvider: 'claude',
      failoverProviders: ['gemini'],
      autoCommit: true,  // Default to true for automatic commits
      includeCoAuthoredBy: true,  // Default to true for attribution
      autoUpdateContext: true,  // Default to true for context updates
      debug: false,
      retryAttempts: 3,
      rateLimitCooldown: 300000 // 5 minutes
    };

    try {
      // Load global config first
      const globalConfig = await this.loadConfigFile(
        path.join(this.globalConfigPath, ConfigManager.CONFIG_FILE)
      );

      // Load local config and merge with global
      const localConfig = await this.loadConfigFile(
        path.join(this.localConfigPath, ConfigManager.CONFIG_FILE)
      );

      // Local config overrides global config
      return { ...defaultConfig, ...globalConfig, ...localConfig };
    } catch {
      return defaultConfig;
    }
  }

  async saveConfig(config: UserConfig, global: boolean = false): Promise<void> {
    const configDir = global ? this.globalConfigPath : this.localConfigPath;
    const configPath = path.join(configDir, ConfigManager.CONFIG_FILE);

    // Ensure directory exists
    await fs.mkdir(configDir, { recursive: true });

    // Save config
    await fs.writeFile(
      configPath,
      JSON.stringify(config, null, 2)
    );
  }

  async setProvider(provider: 'claude' | 'gemini', global: boolean = false): Promise<void> {
    const config = await this.loadConfig();
    config.defaultProvider = provider;
    await this.saveConfig(config, global);
  }

  async setFailoverProviders(providers: ('claude' | 'gemini')[], global: boolean = false): Promise<void> {
    const config = await this.loadConfig();
    config.failoverProviders = providers;
    await this.saveConfig(config, global);
  }

  async getAvailableProvider(): Promise<'claude' | 'gemini' | null> {
    const config = await this.loadConfig();
    const rateLimits = await this.loadRateLimits();
    const now = Date.now();

    // Check primary provider
    if (config.defaultProvider) {
      const limitTime = rateLimits[config.defaultProvider];
      if (!limitTime || now > limitTime + config.rateLimitCooldown!) {
        const provider = createProvider(config.defaultProvider);
        if (await provider.checkAvailability()) {
          return config.defaultProvider;
        }
      }
    }

    // Check failover providers
    if (config.failoverProviders) {
      for (const providerName of config.failoverProviders) {
        const limitTime = rateLimits[providerName];
        if (!limitTime || now > limitTime + config.rateLimitCooldown!) {
          const provider = createProvider(providerName);
          if (await provider.checkAvailability()) {
            Logger.warning(`Primary provider unavailable, using ${providerName}`);
            return providerName;
          }
        }
      }
    }

    return null;
  }

  async recordRateLimit(provider: 'claude' | 'gemini'): Promise<void> {
    const rateLimits = await this.loadRateLimits();
    rateLimits[provider] = Date.now();

    const rateLimitPath = path.join(this.localConfigPath, ConfigManager.RATE_LIMIT_FILE);
    await fs.mkdir(this.localConfigPath, { recursive: true });
    await fs.writeFile(rateLimitPath, JSON.stringify(rateLimits, null, 2));
  }

  async clearRateLimit(provider: 'claude' | 'gemini'): Promise<void> {
    const rateLimits = await this.loadRateLimits();
    delete rateLimits[provider];

    const rateLimitPath = path.join(this.localConfigPath, ConfigManager.RATE_LIMIT_FILE);
    await fs.writeFile(rateLimitPath, JSON.stringify(rateLimits, null, 2));
  }

  private async loadRateLimits(): Promise<Record<string, number>> {
    try {
      const rateLimitPath = path.join(this.localConfigPath, ConfigManager.RATE_LIMIT_FILE);
      const content = await fs.readFile(rateLimitPath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  private async loadConfigFile(filePath: string): Promise<Partial<UserConfig>> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  async initConfig(global: boolean = false): Promise<void> {
    const configDir = global ? this.globalConfigPath : this.localConfigPath;
    await fs.mkdir(configDir, { recursive: true });

    // Create default config if it doesn't exist
    const configPath = path.join(configDir, ConfigManager.CONFIG_FILE);
    try {
      await fs.access(configPath);
    } catch {
      const defaultConfig: UserConfig = {
        defaultProvider: 'claude',
        failoverProviders: ['gemini'],
        autoCommit: true,  // Default to true for automatic commits
        includeCoAuthoredBy: true,  // Default to true for attribution
        autoUpdateContext: true,  // Default to true for context updates
        debug: false,
        retryAttempts: 3,
        rateLimitCooldown: 300000
      };
      await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
    }

    // Add .gitignore to local config directory
    if (!global) {
      const gitignorePath = path.join(configDir, '.gitignore');
      await fs.writeFile(gitignorePath, '*\n!.gitignore\n');
    }
  }

  async showConfig(global: boolean = false): Promise<void> {
    const config = await this.loadConfig();
    const rateLimits = await this.loadRateLimits();

    console.log('\n📋 Configuration:');
    console.log(`  Default Provider: ${config.defaultProvider}`);
    console.log(`  Failover Providers: ${config.failoverProviders?.join(', ') || 'none'}`);
    console.log(`  Auto Commit: ${config.autoCommit}`);
    console.log(`  Include Co-Author: ${config.includeCoAuthoredBy}`);
    console.log(`  Debug Mode: ${config.debug}`);
    console.log(`  Retry Attempts: ${config.retryAttempts}`);
    console.log(`  Rate Limit Cooldown: ${config.rateLimitCooldown}ms`);

    if (Object.keys(rateLimits).length > 0) {
      console.log('\n⏱️  Rate Limited Providers:');
      const now = Date.now();
      for (const [provider, timestamp] of Object.entries(rateLimits)) {
        const remainingMs = timestamp + config.rateLimitCooldown! - now;
        if (remainingMs > 0) {
          console.log(`  ${provider}: ${Math.ceil(remainingMs / 1000)}s remaining`);
        }
      }
    }
  }
}
```

### Step 7: Utility Modules

Create `src/utils/logger.ts`:
```typescript
import chalk from 'chalk';

export class Logger {
  static info(message: string): void {
    console.log(chalk.blue(`ℹ️  ${message}`));
  }

  static success(message: string): void {
    console.log(chalk.green(`✅ ${message}`));
  }

  static error(message: string): void {
    console.log(chalk.red(`❌ ${message}`));
  }

  static warning(message: string): void {
    console.log(chalk.yellow(`⚠️  ${message}`));
  }

  static debug(message: string, enabled: boolean = false): void {
    if (enabled) {
      console.log(chalk.gray(`🔍 ${message}`));
    }
  }

  static agent(message: string): void {
    console.log(chalk.cyan(`🤖 ${message}`));
  }

  static task(message: string): void {
    console.log(chalk.magenta(`📋 ${message}`));
  }
}
```

Create `src/utils/retry.ts`:
```typescript
import { Logger } from './logger';

export interface RetryOptions {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  factor: number;
}

const defaultOptions: RetryOptions = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 60000,
  factor: 2
};

export class RetryHandler {
  constructor(private options: RetryOptions = defaultOptions) {}

  async execute<T>(
    fn: () => Promise<T>,
    isRetryable: (error: any) => boolean = () => true
  ): Promise<T> {
    let lastError: any;
    let delay = this.options.initialDelay;

    for (let attempt = 1; attempt <= this.options.maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;

        if (!isRetryable(error) || attempt === this.options.maxAttempts) {
          throw error;
        }

        Logger.warning(
          `Attempt ${attempt} failed. Retrying in ${delay}ms...`
        );

        await this.sleep(delay);
        delay = Math.min(delay * this.options.factor, this.options.maxDelay);
      }
    }

    throw lastError;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static isRateLimitError(error: any): boolean {
    const message = error?.message || error?.toString() || '';
    return message.includes('rate limit') ||
           message.includes('usage limit') ||
           message.includes('quota exceeded');
  }
}
```

### Step 8: Main Agent Class

**Update constructor and add new properties:**
- Add ConfigManager and RetryHandler
- Provider will be set dynamically
- Add `initializeProvider()` method for dynamic provider selection
- Add `executeWithFailover()` method for handling provider switching on rate limits
- Update `executeNext()` to call `initializeProvider()` and use `executeWithFailover()`
- Update `getStatus()` to include available and rate-limited providers

Create `src/core/agent.ts`:
```typescript
import { AgentConfig, ExecutionResult, Issue, Status, RollbackData } from '../types';
import { createProvider, Provider } from './providers';
import { FileManager } from './files';
import { ConfigManager } from './config';
import { Logger } from '../utils/logger';
import { RetryHandler } from '../utils/retry';
import * as path from 'path';
import * as fs from 'fs/promises';
import { spawn, execSync } from 'child_process';
import chalk from 'chalk';

export class AutonomousAgent {
  private provider?: Provider;
  private fileManager: FileManager;
  private configManager: ConfigManager;  // NEW
  private config: AgentConfig;
  private retryHandler: RetryHandler;    // NEW

  constructor(config: AgentConfig) {
    this.config = config;
    this.fileManager = new FileManager(config.workspace);
    this.configManager = new ConfigManager(config.workspace);  // NEW
    this.retryHandler = new RetryHandler();  // NEW

    // Provider will be initialized before use
  }

  private async initializeProvider(): Promise<void> {
    // If provider explicitly specified in config, use it
    if (this.config.provider) {
      this.provider = createProvider(this.config.provider);
      return;
    }

    // Otherwise use configuration-based selection
    const providerName = await this.configManager.getAvailableProvider();
    if (!providerName) {
      throw new Error('No available providers. All providers are rate limited or unavailable.');
    }
    this.provider = createProvider(providerName);
  }

  private async executeWithFailover(prompt: string, context: string): Promise<{ result: string; provider: 'claude' | 'gemini' }> {
    const userConfig = await this.configManager.loadConfig();
    let allProviders: ('claude' | 'gemini')[];

    if (this.config.provider) {
      // If provider explicitly specified, try it first, then fallback to configured ones
      allProviders = [this.config.provider];
      const configuredProviders = [userConfig.defaultProvider, ...(userConfig.failoverProviders || [])].filter(Boolean) as ('claude' | 'gemini')[];
      // Add other providers as fallback (excluding the override)
      allProviders.push(...configuredProviders.filter(p => p !== this.config.provider));
    } else {
      // Use normal configuration order
      allProviders = [userConfig.defaultProvider, ...(userConfig.failoverProviders || [])].filter(Boolean) as ('claude' | 'gemini')[];
    }

    for (const providerName of allProviders) {
      // Check for cancellation before each provider attempt
      if (this.config.signal?.aborted) {
        throw new Error('Operation cancelled by user');
      }
      
      try {
        const provider = createProvider(providerName);
        const result = await provider.execute(prompt, context);
        return { result, provider: providerName };
      } catch (error) {
        if (RetryHandler.isRateLimitError(error)) {
          Logger.warning(`Rate limit hit for ${providerName}`);
          await this.configManager.recordRateLimit(providerName);
          continue;
        }
        throw error;
      }
    }

    throw new Error('All providers are rate limited or failed');
  }

  async createIssue(title: string): Promise<Issue> {
    console.log(chalk.blue('📋 Creating new issue...'));
    const issue = await this.fileManager.createIssue(title);
    console.log(chalk.green(`✅ Created Issue ${issue.number}: ${issue.title}`));
    return issue;
  }

  async executeNext(): Promise<ExecutionResult> {
    await this.initializeProvider();

    const issue = await this.fileManager.getNextIssue();

    if (!issue) {
      console.log(chalk.green('🎉 All issues are complete!'));
      return {
        success: true,
        issueNumber: 0,
        duration: 0
      };
    }

    console.log(chalk.cyan(`\n🤖 ${this.config.dryRun ? '[DRY RUN] ' : ''}Executing Issue ${issue.number}: ${issue.title}`));

    const startTime = Date.now();
    let rollbackData: RollbackData | undefined;
    
    // Check for cancellation
    if (this.config.signal?.aborted) {
      throw new Error('Operation cancelled by user');
    }

    try {
      // Capture rollback data if enabled
      if (this.config.enableRollback && !this.config.dryRun) {
        this.reportProgress('Capturing rollback data...', 10);
        rollbackData = await this.captureRollbackData();
      }
      // Build context from todo, issue, and plan files
      this.reportProgress('Loading issue context...', 20);
      const todoContent = await this.fileManager.readTodo();
      const issueContent = await this.fileManager.readFile(issue.file);
      const planFile = issue.file.replace('/issues/', '/plans/').replace('issue-', 'plan-issue-');
      const planContent = await this.fileManager.readFile(planFile);

      const context = `${todoContent}\n\n${issueContent}\n\n${planContent}`;

      const prompt = `You are an autonomous AI agent. ${this.config.dryRun ? 'This is a DRY RUN - describe what you would do without making actual changes. ' : ''}Execute the following issue according to the plan.
Complete all requirements and acceptance criteria. Update todo.md when complete.`;

      this.reportProgress('Executing with AI provider...', 40);
      const { result, provider } = await this.executeWithFailover(prompt, context);  // NEW

      if (this.config.dryRun) {
        console.log(chalk.yellow('\n📋 DRY RUN RESULTS:'));
        console.log(result);
        console.log(chalk.yellow('\n⚠️  No changes were made (dry run mode)'));
      } else {
        await this.fileManager.markComplete(issue.number);
      }

      const duration = Date.now() - startTime;
      console.log(chalk.green(`✅ Completed in ${(duration / 1000).toFixed(1)}s using ${provider}`));

      // Update provider instruction file with execution history and project context (skip in dry-run)
      if (!this.config.dryRun) {
        try {
          await this.updateProviderInstructions(issue, provider, true);
          Logger.debug(`Updated ${provider.toUpperCase()}.md with execution history`, this.config.debug);

          // Analyze and update project context using AI if enabled
          const userConfig = await this.configManager.loadConfig();
          if (userConfig.autoUpdateContext !== false) { // Default to true
            await this.analyzeAndUpdateProjectContext(provider);
            Logger.info(`Updated ${provider.toUpperCase()}.md with latest project context`);
          }
        } catch (updateError) {
          Logger.debug(`Failed to update provider instructions: ${updateError.message}`, this.config.debug);
          // Don't fail the execution if update fails
        }
      }

      // Auto-commit if enabled (check override first, then config) - skip in dry-run
      if (!this.config.dryRun) {
        const userConfig = await this.configManager.loadConfig();
        const shouldCommit = this.config.autoCommit !== undefined ? this.config.autoCommit : userConfig.autoCommit;

        if (shouldCommit) {
          try {
            await this.commitChanges(issue, provider);
            Logger.success('Changes committed automatically');
          } catch (commitError) {
            Logger.warning(`Auto-commit failed: ${commitError.message}`);
          // Don't fail the execution if commit fails
        }
      }

      this.reportProgress('Execution completed successfully', 100);
      
      return {
        success: true,
        issueNumber: issue.number,
        duration,
        output: result,
        provider,  // NEW
        rollbackData  // Include rollback data for potential future use
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(chalk.red(`❌ Failed: ${error.message}`));

      // Update provider instruction file with failure information
      try {
        await this.updateProviderInstructions(issue, this.provider?.name as 'claude' | 'gemini', false, error.message);
        Logger.debug(`Updated provider instructions with failure information`, this.config.debug);
      } catch (updateError) {
        Logger.debug(`Failed to update provider instructions: ${updateError.message}`, this.config.debug);
      }

      // Offer rollback if we have rollback data and execution failed
      if (rollbackData && this.config.enableRollback && !this.config.dryRun) {
        this.reportProgress('Execution failed, rollback available', 0);
      }
      
      return {
        success: false,
        issueNumber: issue.number,
        duration,
        error: error.message,
        rollbackData  // Include rollback data so caller can trigger rollback
      };
    }
  }

  async executeAll(): Promise<ExecutionResult[]> {
    const results: ExecutionResult[] = [];

    while (true) {
      const result = await this.executeNext();
      if (result.issueNumber === 0) break; // No more issues

      results.push(result);

      if (!result.success) {
        console.log(chalk.yellow('⚠️ Stopping due to error'));
        break;
      }
    }

    return results;
  }

  private async analyzeAndUpdateProjectContext(provider: 'claude' | 'gemini'): Promise<void> {
    const fileName = provider === 'claude' ? 'CLAUDE.md' : 'GEMINI.md';
    const filePath = path.join(this.config.workspace || '.', fileName);

    // Read current content
    let content = await this.fileManager.readFile(filePath);

    // Create prompt for AI to analyze project
    const prompt = `You are analyzing a software project to update the project context documentation.
Based on the files and structure in the workspace, update the following sections with accurate, specific information.
Preserve the existing execution history section at the bottom.

IMPORTANT:
- Replace placeholder comments with actual content
- Be specific and detailed
- Keep existing execution history intact
- Use markdown formatting

The sections to update are:
1. Project Context - architecture, purpose, and key components
2. Technology Stack - main technologies, frameworks, and tools
3. Coding Standards - conventions, style guides, best practices observed
4. Directory Structure - project organization
5. Key Dependencies - important libraries and their purposes
6. Environment Setup - environment variables or configuration
7. Testing Requirements - how code should be tested
8. Security Considerations - security requirements or sensitive data handling
9. Performance Guidelines - performance requirements or optimizations
10. Additional Notes - any other important information`;

    // Get workspace files for context
    const issuesContent = await this.getDirectoryOverview('issues');
    const plansContent = await this.getDirectoryOverview('plans');
    const todoContent = await this.fileManager.readTodo();
    const packageJson = await this.getFileIfExists('package.json');
    const readme = await this.getFileIfExists('README.md');

    const context = `Current ${fileName} content:
${content}

Project files overview:
- Issues: ${issuesContent}
- Plans: ${plansContent}
- Todo: ${todoContent}
${packageJson ? `- package.json: ${packageJson}` : ''}
${readme ? `- README.md: ${readme}` : ''}

Workspace structure:
${await this.getWorkspaceStructure()}`;

    // Execute with the current provider
    const aiProvider = createProvider(provider);
    const result = await aiProvider.execute(prompt, context);

    // Write the updated content
    await this.fileManager.writeFile(filePath, result);
  }

  private async getDirectoryOverview(dir: string): Promise<string> {
    try {
      const dirPath = path.join(this.config.workspace || '.', dir);
      const files = await require('fs').promises.readdir(dirPath);
      return files.join(', ');
    } catch {
      return 'Directory not found';
    }
  }

  private async getFileIfExists(fileName: string): Promise<string | null> {
    try {
      const content = await this.fileManager.readFile(path.join(this.config.workspace || '.', fileName));
      return content.substring(0, 500) + (content.length > 500 ? '...' : ''); // First 500 chars
    } catch {
      return null;
    }
  }

  private async getWorkspaceStructure(): Promise<string> {
    const { execSync } = require('child_process');
    try {
      // Use tree command if available, otherwise ls
      const structure = execSync('tree -L 2 -I node_modules --filesfirst', {
        cwd: this.config.workspace || '.',
        encoding: 'utf-8'
      });
      return structure;
    } catch {
      // Fallback to ls if tree is not available
      try {
        const structure = execSync('ls -la', {
          cwd: this.config.workspace || '.',
          encoding: 'utf-8'
        });
        return structure;
      } catch {
        return 'Unable to get directory structure';
      }
    }
  }

  private async updateProviderInstructions(
    issue: Issue,
    provider: 'claude' | 'gemini',
    success: boolean,
    errorMessage?: string
  ): Promise<void> {
    const fileName = provider === 'claude' ? 'CLAUDE.md' : 'GEMINI.md';
    const filePath = path.join(this.config.workspace || '.', fileName);

    // Read existing content or create default
    let content = '';
    try {
      content = await this.fileManager.readFile(filePath);
    } catch {
      // Create default content if file doesn't exist
      content = `# ${provider.charAt(0).toUpperCase() + provider.slice(1)} Instructions

This file contains project-specific instructions for ${provider.charAt(0).toUpperCase() + provider.slice(1)}.
It is automatically updated with execution history and project context to help improve future task performance.

## Project Context
<!-- Describe your project architecture, purpose, and key components -->

## Technology Stack
<!-- List the main technologies, frameworks, and tools used -->

## Coding Standards
<!-- Define coding conventions, style guides, and best practices -->

## Directory Structure
<!-- Explain the project's directory organization -->

## Key Dependencies
<!-- List important libraries and their purposes -->

## Environment Setup
<!-- Describe any environment variables or configuration needed -->

## Testing Requirements
<!-- Specify how code should be tested -->

## Security Considerations
<!-- Any security requirements or sensitive data handling -->

## Performance Guidelines
<!-- Performance requirements or optimization guidelines -->

## Additional Notes
<!-- Any other important information for the agent -->

## Execution History
`;
    }

    // Add execution history entry
    const timestamp = new Date().toISOString();
    const historyEntry = `
### Issue #${issue.number}: ${issue.title}
- **Date**: ${timestamp}
- **Status**: ${success ? '✅ Success' : '❌ Failed'}
- **Duration**: ${success ? 'See execution logs' : 'N/A'}
${!success && errorMessage ? `- **Error**: ${errorMessage}` : ''}
${success ? `- **Key Learnings**: Successfully completed task requirements` : ''}

`;

    // Find the execution history section and append
    if (content.includes('## Execution History')) {
      content = content.replace(
        '## Execution History\n',
        `## Execution History\n${historyEntry}`
      );
    } else {
      // Add execution history section if it doesn't exist
      content += `\n## Execution History\n${historyEntry}`;
    }

    // Write updated content
    await this.fileManager.writeFile(filePath, content);
  }

  private async commitChanges(issue: Issue, provider: 'claude' | 'gemini'): Promise<void> {
    const { execSync } = require('child_process');

    try {
      // Check if we're in a git repository
      execSync('git rev-parse --git-dir', { cwd: this.config.workspace });

      // Add all changes
      execSync('git add -A', { cwd: this.config.workspace });

      // Create commit message
      let commitMessage = `Complete Issue #${issue.number}: ${issue.title}\n\n✅ Automated commit by AutoAgent`;

      // Add co-authorship if enabled
      const userConfig = await this.configManager.loadConfig();
      const includeAttribution = this.config.includeCoAuthoredBy !== undefined
        ? this.config.includeCoAuthoredBy
        : userConfig.includeCoAuthoredBy;

      if (includeAttribution) {
        if (provider === 'claude') {
          commitMessage += `\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>`;
        } else if (provider === 'gemini') {
          commitMessage += `\n\n🤖 Generated with [Gemini Code](https://ai.google.dev/gemini)\n\nCo-Authored-By: Gemini <noreply@google.com>`;
        }
      }

      // Commit changes
      execSync(`git commit -m "${commitMessage}"`, { cwd: this.config.workspace });

      Logger.debug(`Committed changes for issue #${issue.number}`, this.config.debug);
    } catch (error) {
      const errorMessage = error.message || error.toString();
      
      // Handle expected scenarios gracefully
      if (errorMessage.includes('not a git repository') || errorMessage.includes('fatal: not a git repository')) {
        Logger.debug('Not a git repository, skipping commit', this.config.debug);
      } else if (errorMessage.includes('nothing to commit') || errorMessage.includes('working tree clean')) {
        Logger.debug('No changes to commit', this.config.debug);
      } else if (errorMessage.includes('uncommitted changes') || errorMessage.includes('unmerged files')) {
        Logger.warn('Uncommitted changes detected, skipping auto-commit to avoid conflicts');
      } else if (errorMessage.includes('detached HEAD')) {
        Logger.warn('Repository is in detached HEAD state, skipping commit');
      } else {
        // Log the error but don't fail the entire operation
        Logger.error(`Git commit failed: ${errorMessage}`);
        Logger.debug('Continuing despite git error...', this.config.debug);
      }
    }
  }

  async bootstrap(masterPlanPath: string): Promise<Issue> {
    await this.initializeProvider();  // Initialize provider for AI processing

    Logger.info(`Reading master plan from ${masterPlanPath}...`);

    try {
      // Read the master plan file
      const masterPlanContent = await this.fileManager.readFile(masterPlanPath);
      if (!masterPlanContent) {
        throw new Error(`Master plan file not found: ${masterPlanPath}`);
      }

      // Create prompt for AI to generate bootstrap issue
      const prompt = `You are an AI agent tasked with creating a bootstrap issue from a master plan.
Read the following master plan and create the FIRST issue that should be tackled.
The issue should be concrete, actionable, and focused on initial setup or foundation work.

Extract:
1. A clear, concise title for the issue
2. The main requirement or problem to solve
3. 3-5 specific acceptance criteria
4. Any relevant technical details
5. Resources or references needed

Respond in JSON format:
{
  "title": "Issue title",
  "requirement": "Main requirement",
  "acceptanceCriteria": ["criterion 1", "criterion 2", ...],
  "technicalDetails": "Technical notes",
  "resources": ["resource 1", "resource 2", ...]
}`;

      const { result, provider } = await this.executeWithFailover(prompt, masterPlanContent);

      Logger.info(`Bootstrap issue generated using ${provider}`);

      // Parse AI response with error handling
      let issueData;
      try {
        issueData = JSON.parse(result);
      } catch (error) {
        throw new Error(`Failed to parse AI response: ${error.message}. Response: ${result.substring(0, 200)}...`);
      }

      // Create the issue using FileManager (which handles file creation and todo update)
      const issue = await this.fileManager.createIssue(issueData.title);

      // Now update the created issue file with full details
      const issueFile = issue.file;
      const issueContent = `# Issue ${issue.number}: ${issueData.title}

## Requirement
${issueData.requirement}

## Acceptance Criteria
${issueData.acceptanceCriteria.map(c => `- [ ] ${c}`).join('\n')}

## Technical Details
${issueData.technicalDetails || 'N/A'}

## Resources
${issueData.resources?.length ? issueData.resources.map(r => `- ${r}`).join('\n') : 'N/A'}
`;

      // Write the full content back
      await this.fileManager.writeFile(issueFile, issueContent);

      // Also create a more detailed plan file
      const planFile = issueFile.replace('/issues/', '/plans/').replace('issue-', 'plan-issue-');
      const planContent = `# Plan for Issue ${issue.number}: ${issueData.title}

## Implementation Plan

### Phase 1: Setup and Preparation
- [ ] Review master plan and requirements
- [ ] Set up development environment
- [ ] Identify dependencies and prerequisites

### Phase 2: Core Implementation
${issueData.acceptanceCriteria.map(c => `- [ ] Implement: ${c}`).join('\n')}

### Phase 3: Testing and Validation
- [ ] Write unit tests
- [ ] Perform integration testing
- [ ] Update documentation

## Technical Approach
${issueData.technicalDetails || 'To be determined during implementation'}

## Potential Challenges
- Initial setup complexity
- Integration with existing systems
- Dependency management

## Success Criteria
All acceptance criteria are met and tests pass.
`;

      await this.fileManager.writeFile(planFile, planContent);

      return issue;
    } catch (error) {
      throw new Error(`Bootstrap failed: ${error.message}`);
    }
  }

  async getStatus(): Promise<Status> {
    const stats = await this.fileManager.getStats();
    const userConfig = await this.configManager.loadConfig();
    const rateLimits = await this.configManager['loadRateLimits']();  // Access private method
    const now = Date.now();

    const allProviders = ['claude', 'gemini'];
    const availableProviders: string[] = [];
    const rateLimitedProviders: string[] = [];

    for (const provider of allProviders) {
      const limitTime = rateLimits[provider];
      if (limitTime && now < limitTime + userConfig.rateLimitCooldown!) {
        rateLimitedProviders.push(provider);
      } else {
        const p = createProvider(provider as 'claude' | 'gemini');
        if (await p.checkAvailability()) {
          availableProviders.push(provider);
        }
      }
    }

    return {
      totalIssues: stats.total,
      completedIssues: stats.completed,
      pendingIssues: stats.pending,
      currentIssue: await this.fileManager.getNextIssue(),
      availableProviders,     // NEW
      rateLimitedProviders   // NEW
    };
  }

  private async captureRollbackData(): Promise<RollbackData> {
    const rollbackData: RollbackData = {
      fileBackups: new Map()
    };

    // Capture git commit if in a git repo
    try {
      const gitCommit = execSync('git rev-parse HEAD', { 
        cwd: this.config.workspace,
        encoding: 'utf-8'
      }).trim();
      rollbackData.gitCommit = gitCommit;
    } catch {
      // Not a git repo or no commits yet
    }

    return rollbackData;
  }

  async rollback(rollbackData: RollbackData): Promise<void> {
    if (!rollbackData) {
      throw new Error('No rollback data available');
    }

    this.reportProgress('Starting rollback...', 0);

    try {
      // If we have a git commit, try git-based rollback first
      if (rollbackData.gitCommit) {
        try {
          execSync(`git reset --hard ${rollbackData.gitCommit}`, {
            cwd: this.config.workspace
          });
          this.reportProgress('Rollback completed via git', 100);
          Logger.success('Successfully rolled back to previous git state');
          return;
        } catch (error) {
          Logger.warn('Git rollback failed, falling back to file restoration');
        }
      }

      // Fall back to file-based rollback
      if (rollbackData.fileBackups && rollbackData.fileBackups.size > 0) {
        let processed = 0;
        const total = rollbackData.fileBackups.size;

        for (const [filePath, content] of rollbackData.fileBackups) {
          await fs.writeFile(filePath, content);
          processed++;
          this.reportProgress(`Restored ${path.basename(filePath)}`, (processed / total) * 100);
        }

        Logger.success('Successfully rolled back file changes');
      } else {
        throw new Error('No file backups available for rollback');
      }
    } catch (error) {
      Logger.error(`Rollback failed: ${error.message}`);
      throw error;
    }
  }

  private reportProgress(message: string, percentage?: number): void {
    if (this.config.onProgress) {
      this.config.onProgress(message, percentage);
    } else {
      // Default progress reporting to console
      if (percentage !== undefined) {
        console.log(chalk.blue(`[${percentage.toFixed(0)}%] ${message}`));
      } else {
        console.log(chalk.blue(`➤ ${message}`));
      }
    }
  }

  private async trackFileChanges(action: () => Promise<void>): Promise<string[]> {
    // Simple implementation - in production, use file watching
    const filesBefore = new Set(await this.getWorkspaceFiles());
    await action();
    const filesAfter = new Set(await this.getWorkspaceFiles());
    
    const changed: string[] = [];
    for (const file of filesAfter) {
      if (!filesBefore.has(file)) {
        changed.push(file);
      }
    }
    
    return changed;
  }

  private async getWorkspaceFiles(): Promise<string[]> {
    // Simplified - in production, implement proper file traversal
    const files: string[] = [];
    try {
      const entries = await fs.readdir(this.config.workspace || '.', { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && !entry.name.startsWith('.')) {
          files.push(path.join(this.config.workspace || '.', entry.name));
        }
      }
    } catch {
      // Ignore errors
    }
    return files;
  }
}
```

### Step 9: CLI Implementation

**Add the config command group:**
- Initialize, set provider, set failover, show, and clear-limits commands
- Remove `-p, --provider` from `create` command (uses config default)
- Update `check` command to show all providers if none specified
- Update `status` to show provider availability

Create `src/cli/index.ts`:
```typescript
#!/usr/bin/env node

import { Command } from 'commander';
import { AutonomousAgent } from '../core/agent';
import { createProvider } from '../core/providers';
import { ConfigManager } from '../core/config';
import { Logger } from '../utils/logger';
import chalk from 'chalk';

const program = new Command();

program
  .name('autoagent')
  .description('Run autonomous AI agents for task execution')
  .version('1.0.0');

// Config command group
const config = program
  .command('config')
  .description('Manage configuration');

config
  .command('init')
  .description('Initialize configuration')
  .option('-g, --global', 'Initialize global configuration')
  .action(async (options) => {
    try {
      const configManager = new ConfigManager();
      await configManager.initConfig(options.global);
      Logger.success(`Configuration initialized ${options.global ? 'globally' : 'locally'}`);
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

config
  .command('set-provider <provider>')
  .description('Set default AI provider (claude or gemini)')
  .option('-g, --global', 'Set globally')
  .action(async (provider, options) => {
    try {
      const configManager = new ConfigManager();
      await configManager.setProvider(provider, options.global);
      Logger.success(`Default provider set to ${provider}`);
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

config
  .command('set-failover <providers...>')
  .description('Set failover providers in order of preference')
  .option('-g, --global', 'Set globally')
  .action(async (providers, options) => {
    try {
      const configManager = new ConfigManager();
      await configManager.setFailoverProviders(providers, options.global);
      Logger.success(`Failover providers set to: ${providers.join(', ')}`);
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

config
  .command('set-auto-commit <enabled>')
  .description('Enable or disable automatic git commits (true/false)')
  .option('-g, --global', 'Set globally')
  .action(async (enabled, options) => {
    try {
      const configManager = new ConfigManager();
      const config = await configManager.loadConfig();
      config.autoCommit = enabled === 'true';
      await configManager.saveConfig(config, options.global);
      Logger.success(`Auto-commit ${config.autoCommit ? 'enabled' : 'disabled'}`);
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

config
  .command('set-co-authored-by <enabled>')
  .description('Include AI co-authorship in commits (true/false)')
  .option('-g, --global', 'Set globally')
  .action(async (enabled, options) => {
    try {
      const configManager = new ConfigManager();
      const config = await configManager.loadConfig();
      config.includeCoAuthoredBy = enabled === 'true';
      await configManager.saveConfig(config, options.global);
      Logger.success(`Co-authorship ${config.includeCoAuthoredBy ? 'enabled' : 'disabled'}`);
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

config
  .command('show')
  .description('Show current configuration')
  .action(async () => {
    try {
      const configManager = new ConfigManager();
      await configManager.showConfig();
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

config
  .command('clear-limits')
  .description('Clear rate limit records')
  .option('-p, --provider <provider>', 'Clear specific provider')
  .action(async (options) => {
    try {
      const configManager = new ConfigManager();
      if (options.provider) {
        await configManager.clearRateLimit(options.provider);
        Logger.success(`Rate limit cleared for ${options.provider}`);
      } else {
        // Clear all rate limits
        await configManager.clearRateLimit('claude');
        await configManager.clearRateLimit('gemini');
        Logger.success('All rate limits cleared');
      }
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('run')
  .description('Run the next issue or all issues')
  .option('-p, --provider <provider>', 'Override AI provider for this run (claude or gemini)')
  .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
  .option('--all', 'Run all pending issues')
  .option('--debug', 'Enable debug output')
  .option('--no-commit', 'Disable auto-commit for this run')
  .option('--commit', 'Enable auto-commit for this run')
  .option('--no-co-author', 'Disable co-authorship for this run')
  .option('--co-author', 'Enable co-authorship for this run')
  .option('--dry-run', 'Preview what would be done without making changes')
  .action(async (options) => {
    try {
      // Create AbortController for cancellation support
      const abortController = new AbortController();
      
      // Handle SIGINT (Ctrl+C) for graceful cancellation
      process.on('SIGINT', () => {
        console.log(chalk.yellow('\n⚠️  Cancelling operation...'));
        abortController.abort();
      });
      
      const agent = new AutonomousAgent({
        provider: options.provider,  // Optional override
        workspace: options.workspace,
        debug: options.debug,
        autoCommit: options.commit !== undefined ? options.commit : undefined,  // Override if specified
        includeCoAuthoredBy: options.coAuthor !== undefined ? options.coAuthor : undefined,  // Override if specified
        dryRun: options.dryRun,
        signal: abortController.signal
      });

      if (options.all) {
        await agent.executeAll();
      } else {
        await agent.executeNext();
      }
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('create <title>')
  .description('Create a new issue')
  .option('-p, --provider <provider>', 'Override AI provider for this operation (claude or gemini)')
  .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
  .action(async (title, options) => {
    try {
      const agent = new AutonomousAgent({
        provider: options.provider,  // Optional override
        workspace: options.workspace
      });

      await agent.createIssue(title);
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Show current status')
  .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
  .action(async (options) => {
    try {
      const agent = new AutonomousAgent({
        provider: 'claude', // Provider doesn't matter for status
        workspace: options.workspace
      });

      const status = await agent.getStatus();

      Logger.info('\n📊 Status Report\n');
      console.log(`Total Issues:     ${status.totalIssues}`);
      console.log(`Completed:        ${status.completedIssues}`);
      console.log(`Pending:          ${status.pendingIssues}`);

      if (status.currentIssue) {
        console.log(`\nNext Issue:       #${status.currentIssue.number}: ${status.currentIssue.title}`);
      }

      // Show provider availability
      if (status.availableProviders?.length) {
        console.log(`\n✅ Available Providers: ${status.availableProviders.join(', ')}`);
      }
      if (status.rateLimitedProviders?.length) {
        console.log(`⏱️  Rate Limited: ${status.rateLimitedProviders.join(', ')}`);
      }
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('bootstrap [plan-file]')
  .description('Create initial issue from master plan')
  .option('-p, --provider <provider>', 'Override AI provider for this operation (claude or gemini)')
  .option('-w, --workspace <path>', 'Workspace directory', process.cwd())
  .action(async (planFile, options) => {
    try {
      const agent = new AutonomousAgent({
        provider: options.provider,  // Optional override
        workspace: options.workspace
      });

      // Default to master-plan.md if not specified
      const masterPlanPath = planFile || 'master-plan.md';

      await agent.bootstrap(masterPlanPath);
      Logger.success('Bootstrap issue created successfully');

      // Show status after bootstrap
      const status = await agent.getStatus();
      Logger.info(`\nTotal issues: ${status.totalIssues}`);
      if (status.currentIssue) {
        Logger.info(`Next issue: #${status.currentIssue.number}: ${status.currentIssue.title}`);
      }
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('check')
  .description('Check provider availability')
  .option('-p, --provider <provider>', 'AI provider to check')
  .action(async (options) => {
    try {
      if (options.provider) {
        // Check specific provider
        const provider = createProvider(options.provider);
        const available = await provider.checkAvailability();

        if (available) {
          Logger.success(`${provider.name} is available`);
        } else {
          Logger.error(`${provider.name} is not available`);
          Logger.warning(`Install from: https://${provider.name}.ai/code`);
        }
      } else {
        // Check all providers
        const providers = ['claude', 'gemini'];
        Logger.info('\n🔍 Checking all providers...\n');

        for (const providerName of providers) {
          const provider = createProvider(providerName as 'claude' | 'gemini');
          const available = await provider.checkAvailability();

          if (available) {
            Logger.success(`${provider.name} is available`);
          } else {
            Logger.error(`${provider.name} is not available`);
          }
        }
      }
    } catch (error) {
      Logger.error(`Failed: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();
```

### Step 10: Binary Entry Point

Create `bin/autoagent`:
```javascript
#!/usr/bin/env node
require('../dist/cli/index.js');
```

Make it executable:
```bash
chmod +x bin/autoagent
```

### Step 11: Main Export

**Add ConfigManager export:**

Create `src/index.ts`:
```typescript
export { AutonomousAgent } from './core/agent';
export { ConfigManager } from './core/config';  // NEW
export * from './types';
```

### Step 12: Templates

Create `templates/issue.md`:
```markdown
# Issue {{number}}: {{title}}

## Requirement
[Main requirement or problem to solve]

## Acceptance Criteria
- [ ] Specific criterion 1
- [ ] Specific criterion 2
- [ ] Specific criterion 3

## Technical Details
[Any technical constraints, dependencies, or implementation notes]

## Resources
- [Relevant documentation]
- [API references]
- [Example code]
```

Create `templates/plan.md`:
```markdown
# Plan for Issue {{number}}: {{title}}

## Implementation Plan

### Phase 1: Setup and Preparation
- [ ] Set up development environment
- [ ] Install necessary dependencies
- [ ] Review requirements and acceptance criteria

### Phase 2: Core Implementation
- [ ] Implement main functionality
- [ ] Add error handling
- [ ] Write unit tests

### Phase 3: Testing and Validation
- [ ] Run all tests
- [ ] Manual testing
- [ ] Update documentation

## Technical Approach
[Describe the technical approach, architecture decisions, and implementation strategy]

## Potential Challenges
- [Challenge 1 and mitigation strategy]
- [Challenge 2 and mitigation strategy]

## Success Criteria
- All acceptance criteria are met
- Tests are passing
- Code is documented
```

### Step 13: Example Usage

**Update to show configuration:**

Create `examples/basic-usage.js`:
```javascript
const { AutonomousAgent, ConfigManager } = require('../dist');

async function main() {
  // Configure providers
  const configManager = new ConfigManager('./my-project');
  await configManager.setProvider('claude');
  await configManager.setFailoverProviders(['gemini']);

  // Create agent (no need to specify provider)
  const agent = new AutonomousAgent({
    workspace: './my-project'
  });

  // Create some issues
  await agent.createIssue('Set up Express.js server');
  await agent.createIssue('Add user authentication');
  await agent.createIssue('Create REST API endpoints');

  // Check status
  const status = await agent.getStatus();
  console.log(`Created ${status.totalIssues} issues`);

  // Execute next issue
  const result = await agent.executeNext();
  console.log(`Executed with ${result.provider}: ${result.success ? 'success' : 'failed'}`);

  // Execute all remaining issues
  const results = await agent.executeAll();
  console.log(`Completed ${results.length} issues`);
}

main().catch(console.error);
```

### Step 14: Basic Tests

Create `test/agent.test.ts`:
```typescript
import { AutonomousAgent } from '../src/core/agent';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('AutonomousAgent', () => {
  const testWorkspace = path.join(__dirname, 'test-workspace');

  beforeEach(async () => {
    await fs.mkdir(testWorkspace, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(testWorkspace, { recursive: true, force: true });
  });

  test('creates an issue', async () => {
    const agent = new AutonomousAgent({
      provider: 'claude',
      workspace: testWorkspace
    });

    const issue = await agent.createIssue('Test issue');

    expect(issue.number).toBe(1);
    expect(issue.title).toBe('Test issue');

    // Check files were created
    const issueFile = path.join(testWorkspace, 'issues', 'issue-1.md');
    const planFile = path.join(testWorkspace, 'plans', 'plan-issue-1.md');
    const todoFile = path.join(testWorkspace, 'todo.md');

    expect(await fs.access(issueFile)).toBeUndefined();
    expect(await fs.access(planFile)).toBeUndefined();
    expect(await fs.access(todoFile)).toBeUndefined();
  });
});
```

### Step 15: README.md

Create a comprehensive README:
```markdown
# AutoAgent

Run autonomous AI agents using Claude or Gemini for task execution. Convert your development workflow into autonomous agent-driven processes.

## Features

- 🤖 Support for Claude and Gemini AI providers
- 📋 Issue and plan management system
- 🔄 Single task or continuous execution modes
- 🎨 Beautiful colored terminal output
- 📦 Works as CLI tool or Node.js library

## Installation

```bash
# Global CLI installation
npm install -g autoagent

# Local project installation
npm install autoagent
```

## Prerequisites

- Node.js >= 14.0.0
- [Claude CLI](https://claude.ai/code) or [Gemini CLI](https://ai.google.dev/gemini) installed

## Configuration

AutoAgent uses a smart configuration system with automatic provider failover:

```bash
# Initialize configuration
autoagent config init

# Set your preferred provider
autoagent config set-provider claude

# Configure fallback provider
autoagent config set-failover gemini

# Enable/disable automatic git commits
autoagent config set-auto-commit true
autoagent config set-auto-commit false

# Enable/disable AI co-authorship in commits
autoagent config set-co-authored-by true
autoagent config set-co-authored-by false
```

### Provider Failover

If your primary provider hits rate limits, AutoAgent automatically switches to configured failover providers:

```bash
# Automatic failover in action:
# 1. Tries Claude (rate limited)
# 2. Automatically switches to Gemini
# 3. Continues execution seamlessly
autoagent run
```

See [Configuration Guide](./docs/CONFIG.md) for advanced options.

## CLI Usage

```bash
# Bootstrap initial issue from master plan
autoagent bootstrap
autoagent bootstrap custom-plan.md

# Check provider availability
autoagent check --provider claude

# Create a new issue
autoagent create "Implement user authentication"

# Run the next issue
autoagent run

# Run all pending issues
autoagent run --all

# Check status
autoagent status

# Override provider for a single run (doesn't change config)
autoagent run --provider gemini

# Run with auto-commit disabled for this run only
autoagent run --no-commit

# Run with auto-commit enabled for this run only
autoagent run --commit

# Run with co-authorship disabled for this run only
autoagent run --no-co-author

# Override provider when creating an issue
autoagent create "Build feature X" --provider claude
```

## Programmatic Usage

```javascript
const { AutonomousAgent } = require('autoagent');

const agent = new AutonomousAgent({
  provider: 'claude',
  workspace: './my-project'
});

// Bootstrap from master plan
await agent.bootstrap('master-plan.md');

// Create and execute issues
await agent.createIssue('Build REST API');
await agent.executeNext();
```

## Project Structure

Your project will have this structure:
```
my-project/
├── issues/          # Issue definitions
├── plans/           # Implementation plans
├── todo.md          # Issue tracking
├── CLAUDE.md        # Claude-specific instructions (auto-updated)
├── GEMINI.md        # Gemini-specific instructions (auto-updated)
└── .autoagent/      # Configuration files
```

## Development

This project uses automated CI/CD:

- **Pull Requests**: Must pass all tests and include version bump
- **Releases**: Automatically published to npm when merged to master

To contribute:
```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and test
npm test

# Bump version before PR
npm version patch

# Create PR
```

## License

MIT
```

Create `LICENSE` file:
```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Step 16: Build and Test Commands

```bash
# Build the project
npm run build

# Run tests
npm test

# Test CLI locally
npm link
autonomous-ai check

# Test programmatic usage
node examples/basic-usage.js
```

### Step 17: Publishing Preparation

1. Create `.npmignore`:
```
src/
test/
examples/
.github/
*.ts
*.log
tsconfig.json
.eslintrc.js
.nvmrc
jest.config.js
```

2. **NPM Setup** (one-time setup on npmjs.org):
   - Create account at https://www.npmjs.com if you don't have one
   - Log in to npm in your terminal: `npm login`
   - Go to https://www.npmjs.com/settings/[your-username]/tokens
   - Click "Generate New Token" → "Classic Token"
   - Select "Automation" type
   - Copy the token
   - Add it to GitHub repository secrets:
     - Go to your repo Settings → Secrets and variables → Actions
     - Click "New repository secret"
     - Name: `NPM_TOKEN`
     - Value: paste your npm token

3. **First-time package setup**:
   ```bash
   # Ensure package name is available
   npm view autonomous-ai-agents
   # If it shows "404 Not Found", the name is available

   # Set initial version
   npm version 1.0.0

   # Commit everything
   git add .
   git commit -m "Initial implementation"

   # Push to GitHub (this triggers the workflow)
   git push origin master
   ```

4. **Future releases** (after initial setup):
   ```bash
   # Create feature branch
   git checkout -b feature/add-new-feature

   # Make your changes...

   # Bump version BEFORE creating PR
   npm version patch  # or minor/major

   # Commit and push
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/add-new-feature

   # Create PR on GitHub
   # When PR is merged → package automatically publishes!
   ```

### Step 17: GitHub Workflows

Create `.github/workflows/check-version-change.yaml`:
```yaml
name: Check version change and Run tests

on:
  push:
    branches-ignore:
      - master

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Read .nvmrc
        run: echo "NVMRC=$(cat .nvmrc)" >> $GITHUB_ENV
        id: nvm

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: ${{ env.NVMRC }}

      - name: Install all dependencies
        run: npm ci --include=dev

      - name: Build TypeScript
        run: npm run build

      - name: Run tests
        run: npm test

      - name: Run linter
        run: npm run lint

  check-version:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
        with:
          fetch-depth: 2

      - name: Read .nvmrc
        run: echo "NVMRC=$(cat .nvmrc)" >> $GITHUB_ENV
        id: nvm

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: ${{ env.NVMRC }}

      - name: Install production dependencies only
        run: npm ci

      - name: Check version change
        run: |
          # Get the version in the current commit
          current_version=$(node -p "require('./package.json').version")

          # Checkout the master branch
          git fetch origin master
          git checkout master

          # Get the version in the master branch
          master_version=$(node -p "require('./package.json').version")

          # Check if the current version is greater than the master version
          if [[ $(printf "%s\n%s" "$master_version" "$current_version" | sort -V | tail -n 1) != "$master_version" ]]; then
            echo "Version has increased from $master_version in master to $current_version."
          else
            echo "Version has not increased from master!"
            exit 1
          fi
```

Create `.github/workflows/release-package.yaml`:
```yaml
name: Create Release and Publish to NPM

on:
  push:
    branches:
      - master

jobs:
  build:
    name: Create Release and Publish to NPM
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Read .nvmrc
        run: echo "NVMRC=$(cat .nvmrc)" >> $GITHUB_ENV
        id: nvm

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: ${{ env.NVMRC }}
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Build TypeScript
        run: npm run build

      - name: Run tests
        run: npm test

      - name: Get version
        run: echo "VERSION=$(node -p "require('./package.json').version")" >> $GITHUB_ENV

      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ env.VERSION }}
          release_name: Release v${{ env.VERSION }}
          draft: false
          prerelease: false

      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Step 18: New Files to Add

Create these additional files not in the original plan:

1. **`docs/CONFIG.md`** - Full configuration documentation
```markdown
# Configuration Guide

AutoAgent provides flexible configuration management with support for global and local settings.

## Configuration Files

Configuration is stored in JSON files:
- **Global**: `~/.autoagent/config.json` - Applies to all projects
- **Local**: `./.autoagent/config.json` - Project-specific settings (overrides global)

## Configuration Options

```json
{
  "defaultProvider": "claude",
  "failoverProviders": ["gemini"],
  "autoCommit": false,
  "includeCoAuthoredBy": true,
  "debug": false,
  "retryAttempts": 3,
  "rateLimitCooldown": 300000
}
```

### Options Explained

- **defaultProvider**: Primary AI provider to use (`claude` or `gemini`)
- **failoverProviders**: Array of backup providers in order of preference
- **autoCommit**: Automatically commit changes after task completion
- **includeCoAuthoredBy**: Include AI provider attribution in commit messages
- **debug**: Enable verbose debug logging
- **retryAttempts**: Number of retry attempts for failed operations
- **rateLimitCooldown**: Milliseconds to wait before retrying a rate-limited provider

## CLI Commands

### Initialize Configuration
```bash
# Initialize local config
autoagent config init

# Initialize global config
autoagent config init --global
```

### Set Provider
```bash
# Set local default provider
autoagent config set-provider claude

# Set global default provider
autoagent config set-provider gemini --global
```

### Configure Failover
```bash
# Set failover providers (order matters)
autoagent config set-failover gemini

# Multiple failover providers
autoagent config set-failover claude gemini
```

### View Configuration
```bash
# Show current configuration
autoagent config show
```

### Clear Rate Limits
```bash
# Clear all rate limit records
autoagent config clear-limits

# Clear specific provider
autoagent config clear-limits --provider claude
```

## Rate Limiting

AutoAgent automatically tracks rate limits for each provider:
- When a provider hits rate limits, it's marked as unavailable
- The cooldown period is configurable (default: 5 minutes)
- Rate limit status is shown in `autoagent config show`

## Provider Failover

When executing tasks, AutoAgent:
1. Tries the default provider first (or CLI override if specified)
2. If rate limited or unavailable, tries failover providers in order
3. Shows which provider was used in the output
4. Automatically clears rate limits after cooldown period

### CLI Provider Override

You can override the provider for a single command without changing your configuration:

```bash
# Use Gemini for this run only
autoagent run --provider gemini

# Create issue with Claude regardless of config
autoagent create "New feature" --provider claude
```

When using `--provider`:
- The specified provider is tried first
- If it fails, AutoAgent falls back to your configured providers
- Your configuration remains unchanged

### Commit Attribution

When `includeCoAuthoredBy` is enabled, commits include attribution to the AI provider:

**For Claude:**
```
Complete Issue #1: Add user authentication

✅ Automated commit by AutoAgent

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**For Gemini:**
```
Complete Issue #1: Add user authentication

✅ Automated commit by AutoAgent

🤖 Generated with [Gemini Code](https://ai.google.dev/gemini)

Co-Authored-By: Gemini <noreply@google.com>
```

This attribution:
- Credits the AI provider that performed the work
- Follows Git co-authorship conventions
- Can be disabled globally or per-run

### Provider Instruction Files

AutoAgent automatically maintains `CLAUDE.md` and `GEMINI.md` files with:
- Project-specific instructions for each AI provider
- Execution history tracking successes and failures
- Timestamps and error messages for debugging
- Learning insights for improved performance

Example entry in CLAUDE.md:
```markdown
### Issue #1: Add user authentication
- **Date**: 2024-01-15T10:30:00.000Z
- **Status**: ✅ Success
- **Duration**: See execution logs
- **Key Learnings**: Successfully completed task requirements
```

These files help:
- Track provider performance over time
- Debug provider-specific issues
- Provide context for future executions
- Build provider-specific knowledge base

## Environment Variables

You can also configure AutoAgent using environment variables:

```bash
export AUTOAGENT_PROVIDER=claude
export AUTOAGENT_DEBUG=true
export AUTOAGENT_WORKSPACE=/path/to/project
```

## Best Practices

1. **Use local config for project-specific settings**
2. **Set global defaults for your preferred provider**
3. **Configure at least one failover provider**
4. **Monitor rate limits with `config show`**
5. **Adjust cooldown period based on provider limits**
```

2. **`examples/config-and-failover.js`** - Configuration examples
```javascript
const { AutonomousAgent, ConfigManager } = require('autoagent');

async function configExample() {
  const configManager = new ConfigManager('./my-project');

  // Initialize configuration
  await configManager.initConfig();

  // Set Claude as primary with Gemini failover
  await configManager.setProvider('claude');
  await configManager.setFailoverProviders(['gemini']);

  // Show current configuration
  await configManager.showConfig();

  // Create agent - no provider needed!
  const agent = new AutonomousAgent({
    workspace: './my-project'
  });

  // Execute will automatically handle failover
  const result = await agent.executeNext();
  console.log(`Task completed using ${result.provider}`);

  // Check provider availability
  const status = await agent.getStatus();
  console.log('Available providers:', status.availableProviders);
  console.log('Rate limited:', status.rateLimitedProviders);
}

async function rateLimitHandling() {
  const agent = new AutonomousAgent({
    workspace: './my-project'
  });

  // This will automatically failover if primary is rate limited
  try {
    const results = await agent.executeAll();

    // See which providers were used
    results.forEach((result, i) => {
      console.log(`Issue ${i + 1}: ${result.provider} - ${result.success ? 'success' : 'failed'}`);
    });
  } catch (error) {
    if (error.message.includes('All providers are rate limited')) {
      console.log('All providers exhausted. Try again later or add more providers.');

      // Check cooldown status
      const configManager = new ConfigManager('./my-project');
      await configManager.showConfig();
    }
  }
}

async function globalVsLocal() {
  const configManager = new ConfigManager();

  // Set global defaults
  await configManager.setProvider('claude', true);
  await configManager.setFailoverProviders(['gemini'], true);

  // Override for specific project
  const projectConfig = new ConfigManager('./special-project');
  await projectConfig.setProvider('gemini');  // This project prefers Gemini

  console.log('Global config:');
  await configManager.showConfig();

  console.log('\nProject config:');
  await projectConfig.showConfig();
}

// Run examples
async function main() {
  console.log('=== Configuration Example ===');
  await configExample();

  console.log('\n=== Rate Limit Handling ===');
  await rateLimitHandling();

  console.log('\n=== Global vs Local Config ===');
  await globalVsLocal();
}

main().catch(console.error);
```

3. **`CONFIGURATION.md`** - Quick reference guide
```markdown
# AutoAgent Configuration Quick Reference

## Quick Start

```bash
# Initialize and configure
autoagent config init
autoagent config set-provider claude
autoagent config set-failover gemini

# Start using - no provider needed!
autoagent create "Build feature X"
autoagent run
```

## Key Commands

| Command | Description |
|---------|-------------|
| `config init` | Initialize configuration |
| `config set-provider <name>` | Set default provider |
| `config set-failover <names...>` | Set backup providers |
| `config set-auto-commit <true/false>` | Enable/disable auto git commits |
| `config set-co-authored-by <true/false>` | Enable/disable AI attribution |
| `config show` | View current settings |
| `config clear-limits` | Reset rate limits |

## Configuration Priority

1. CLI flags (when available)
2. Local config (`./.autoagent/config.json`)
3. Global config (`~/.autoagent/config.json`)
4. Default values

## Automatic Failover

```
Primary (Claude) → Rate Limited → Failover (Gemini) → Success!
                                ↓ Also Limited
                                → Error: All providers exhausted
```

## Tips

- Always configure failover providers
- Use `config show` to check rate limit status
- Local config overrides global settings
- Rate limits auto-clear after cooldown period
```

4. **`test/config.test.ts`** - Configuration tests
```typescript
import { ConfigManager } from '../src/core/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

describe('ConfigManager', () => {
  const testWorkspace = path.join(__dirname, 'test-workspace');
  let configManager: ConfigManager;

  beforeEach(async () => {
    await fs.mkdir(testWorkspace, { recursive: true });
    configManager = new ConfigManager(testWorkspace);
  });

  afterEach(async () => {
    await fs.rm(testWorkspace, { recursive: true, force: true });
  });

  describe('loadConfig', () => {
    it('returns default config when no config exists', async () => {
      const config = await configManager.loadConfig();

      expect(config.defaultProvider).toBe('claude');
      expect(config.failoverProviders).toEqual(['gemini']);
      expect(config.rateLimitCooldown).toBe(300000);
    });

    it('loads and merges local config', async () => {
      const localConfig = {
        defaultProvider: 'gemini',
        debug: true
      };

      const configPath = path.join(testWorkspace, '.autoagent', 'config.json');
      await fs.mkdir(path.dirname(configPath), { recursive: true });
      await fs.writeFile(configPath, JSON.stringify(localConfig));

      const config = await configManager.loadConfig();

      expect(config.defaultProvider).toBe('gemini');
      expect(config.debug).toBe(true);
      expect(config.failoverProviders).toEqual(['gemini']); // From defaults
    });
  });

  describe('provider management', () => {
    it('sets and retrieves provider', async () => {
      await configManager.setProvider('gemini');
      const config = await configManager.loadConfig();

      expect(config.defaultProvider).toBe('gemini');
    });

    it('sets failover providers', async () => {
      await configManager.setFailoverProviders(['claude', 'gemini']);
      const config = await configManager.loadConfig();

      expect(config.failoverProviders).toEqual(['claude', 'gemini']);
    });
  });

  describe('rate limit tracking', () => {
    it('records and checks rate limits', async () => {
      await configManager.recordRateLimit('claude');

      // Should be rate limited
      const provider = await configManager.getAvailableProvider();
      expect(provider).not.toBe('claude');
    });

    it('clears rate limits', async () => {
      await configManager.recordRateLimit('claude');
      await configManager.clearRateLimit('claude');

      const provider = await configManager.getAvailableProvider();
      expect(provider).toBe('claude');
    });

    it('respects cooldown period', async () => {
      // Set short cooldown for testing
      const config = await configManager.loadConfig();
      config.rateLimitCooldown = 100; // 100ms
      await configManager.saveConfig(config);

      await configManager.recordRateLimit('claude');

      // Should be rate limited immediately
      let provider = await configManager.getAvailableProvider();
      expect(provider).not.toBe('claude');

      // Wait for cooldown
      await new Promise(resolve => setTimeout(resolve, 150));

      // Should be available again
      provider = await configManager.getAvailableProvider();
      expect(provider).toBe('claude');
    });
  });

  describe('getAvailableProvider', () => {
    it('returns primary provider when available', async () => {
      const provider = await configManager.getAvailableProvider();
      expect(provider).toBe('claude');
    });

    it('falls back to secondary provider when primary is rate limited', async () => {
      await configManager.recordRateLimit('claude');

      const provider = await configManager.getAvailableProvider();
      expect(provider).toBe('gemini');
    });

    it('returns null when all providers are rate limited', async () => {
      await configManager.recordRateLimit('claude');
      await configManager.recordRateLimit('gemini');

      const provider = await configManager.getAvailableProvider();
      expect(provider).toBeNull();
    });
  });
});
```

## Success Checklist

- [ ] TypeScript compiles without errors
- [ ] All tests pass
- [ ] CLI commands work correctly
- [ ] Backward compatible with bash scripts
- [ ] Under 15KB gzipped
- [ ] GitHub workflows created
- [ ] Documentation complete

## Implementation Notes for Claude Code

1. Start with core functionality (agent.ts, providers.ts, files.ts)
2. Implement one provider at a time (Claude first)
3. Add CLI after core is working
4. Test each component in isolation
5. Focus on simplicity over features for v1

This implementation provides a solid foundation that can be extended in future versions while maintaining the simplicity goal of Version 1.

## Summary of Key Changes

1. **Type Definitions**: Add failover and rate limit fields, co-authorship configuration
2. **Config Management**: Replace with enhanced version
3. **Agent Class**: Add failover execution logic with support for CLI overrides, bootstrap method, configurable auto-commit, and provider instruction updates
4. **CLI**: Add config command group, bootstrap command, auto-commit settings, co-authorship settings, and preserve `--provider` flag for ad-hoc overrides
5. **FileManager**: Add writeFile method to support bootstrap functionality and provider instruction updates
6. **Auto-commit**: Configurable git commit with AI co-authorship attribution
7. **Provider Instructions**: Automatic updates to CLAUDE.md/GEMINI.md with execution history
8. **Examples**: Show configuration usage and bootstrap
9. **Tests**: Add comprehensive config tests
10. **Documentation**: Add configuration guides and provider instruction documentation

The core file management, providers, and project structure remain unchanged. The main additions are around configuration management, intelligent provider selection, bootstrap functionality, automated git commits with attribution, and provider-specific learning tracking.