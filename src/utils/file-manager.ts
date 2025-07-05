import * as fs from 'fs/promises';
import * as path from 'path';
import { Issue, Plan, Phase } from '../types';

export class FileManager {
  private workspace: string;

  constructor(workspace: string | undefined = process.cwd()) {
    this.workspace = workspace ?? process.cwd();
  }

  private get issuesDir(): string {
    return path.join(this.workspace, 'issues');
  }

  private get plansDir(): string {
    return path.join(this.workspace, 'plans');
  }

  private get todoPath(): string {
    return path.join(this.workspace, 'TODO.md');
  }

  async ensureDirectories(): Promise<void> {
    await fs.mkdir(this.issuesDir, { recursive: true });
    await fs.mkdir(this.plansDir, { recursive: true });
  }

  async getNextIssueNumber(): Promise<number> {
    await this.ensureDirectories();
    
    try {
      const files = await fs.readdir(this.issuesDir);
      const issueNumbers = files
        .filter(f => f.match(/^\d+-.*\.md$/))
        .map(f => {
          const num = f.split('-')[0];
          return num !== undefined ? parseInt(num, 10) : NaN;
        })
        .filter(n => !isNaN(n));
      
      return issueNumbers.length > 0 ? Math.max(...issueNumbers) + 1 : 1;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return 1;
      }
      throw error;
    }
  }

  async createIssue(issue: Issue): Promise<string>;
  async createIssue(issueNumber: number, title: string, content: string): Promise<string>;
  async createIssue(issueOrNumber: Issue | number, title?: string, content?: string): Promise<string> {
    await this.ensureDirectories();
    
    if (typeof issueOrNumber === 'number') {
      // New signature for CLI usage
      const filename = `${issueOrNumber}-${this.generateFileSlug(title ?? '')}.md`;
      const filepath = path.join(this.issuesDir, filename);
      await fs.writeFile(filepath, content ?? '', 'utf-8');
      return filepath;
    } else {
      // Original signature
      const issue = issueOrNumber;
      const filename = `${issue.number}-${this.generateFileSlug(issue.title)}.md`;
      const filepath = path.join(this.issuesDir, filename);
      
      const issueContent = `# Issue ${issue.number}: ${issue.title}

## Requirements
${issue.requirements}

## Acceptance Criteria
${issue.acceptanceCriteria.map(ac => `- [ ] ${ac}`).join('\n')}

## Technical Details
${issue.technicalDetails ?? 'No additional technical details.'}

## Resources
${(issue.resources !== undefined && issue.resources.length > 0) ? issue.resources.map(r => `- ${r}`).join('\n') : 'No resources specified.'}`;
      
      await fs.writeFile(filepath, issueContent, 'utf-8');
      return filepath;
    }
  }

  async readIssue(filepath: string): Promise<Issue | null> {
    try {
      const content = await fs.readFile(filepath, 'utf-8');
      
      // Check for empty file
      if (content.trim() === '') {
        throw new Error('Invalid issue format: Empty file');
      }
      
      const lines = content.split('\n');
      
      // Parse issue number and title from header
      const headerMatch = lines[0]?.match(/^#\s+Issue\s+(\d+):\s+(.+)$/);
      if (!headerMatch) {
        throw new Error('Invalid issue format: Missing or malformed header');
      }
      
      const number = parseInt(headerMatch[1] ?? '0', 10);
      const title = headerMatch[2] ?? '';
      
      // Find sections
      const sections: { [key: string]: string[] } = {};
      let currentSection = '';
      
      for (const line of lines.slice(1)) {
        if (line.startsWith('## ')) {
          currentSection = line.substring(3).trim();
          sections[currentSection] = [];
        } else if (currentSection !== '' && line.trim() !== '') {
          if (!sections[currentSection]) {
            sections[currentSection] = [];
          }
          const section = sections[currentSection];
          if (section) {
            section.push(line);
          }
        }
      }
      
      // Parse acceptance criteria
      const acceptanceCriteria = sections['Acceptance Criteria']
        ?.filter(line => line.match(/^-\s+\[.\]\s+/))
        .map(line => line.replace(/^-\s+\[.\]\s+/, '')) || [];
      
      // Parse resources
      const resources = sections['Resources']
        ?.filter(line => line.startsWith('- '))
        .map(line => line.substring(2))
        .filter(r => r !== 'No resources specified.');
      
      const technicalDetails = sections['Technical Details']?.join('\n').trim();
      
      return {
        number,
        title,
        file: filepath,
        requirements: sections['Requirements']?.join('\n').trim() ?? '',
        acceptanceCriteria,
        technicalDetails: technicalDetails !== undefined && technicalDetails !== 'No additional technical details.' ? technicalDetails : undefined,
        resources: resources !== undefined && resources.length > 0 ? resources : undefined
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async createPlan(issueNumber: number, plan: Plan, issueTitle?: string): Promise<string> {
    await this.ensureDirectories();
    
    const filename = (issueTitle !== undefined && issueTitle !== '') 
      ? `${issueNumber}-${this.generateFileSlug(issueTitle)}.md`
      : `${issueNumber}-plan.md`;
    const filepath = path.join(this.plansDir, filename);
    
    const phasesContent = plan.phases.map(phase => `
### ${phase.name}
${phase.tasks.map(task => `- [ ] ${task}`).join('\n')}`).join('\n');
    
    const content = (issueTitle !== undefined && issueTitle !== '') 
      ? `# Plan for Issue ${issueNumber}: ${issueTitle}

This document outlines the step-by-step plan to complete \`issues/${issueNumber}-${this.generateFileSlug(issueTitle)}.md\`.`
      : `# Plan for Issue ${issueNumber}

This document outlines the step-by-step plan to complete the issue.`;

    const fullContent = `${content}

## Implementation Plan
${phasesContent}

## Technical Approach
${plan.technicalApproach ?? 'Technical approach to be determined.'}

## Potential Challenges
${(plan.challenges !== undefined && plan.challenges.length > 0) ? plan.challenges.map(c => `- ${c}`).join('\n') : '- No specific challenges identified.'}`;
    
    await fs.writeFile(filepath, fullContent, 'utf-8');
    return filepath;
  }

  async readPlan(filepath: string): Promise<Plan | null> {
    try {
      const content = await fs.readFile(filepath, 'utf-8');
      const lines = content.split('\n');
      
      // Parse issue number
      const headerMatch = lines[0]?.match(/^#\s+Plan\s+for\s+Issue\s+(\d+):\s+(.+)$/);
      if (!headerMatch) {
        return null;
      }
      
      const issueNumber = parseInt(headerMatch[1] ?? '0', 10);
      
      // Parse phases
      const phases: Phase[] = [];
      let currentPhase: Phase | null = null;
      let inPlanSection = false;
      const technicalApproach: string[] = [];
      const challenges: string[] = [];
      let currentSection = '';
      
      for (const line of lines) {
        if (line === '## Implementation Plan') {
          inPlanSection = true;
          continue;
        } else if (line.startsWith('## ')) {
          inPlanSection = false;
          currentSection = line.substring(3).trim();
          continue;
        }
        
        if (inPlanSection && line.startsWith('### ')) {
          if (currentPhase) {
            phases.push(currentPhase);
          }
          currentPhase = {
            name: line.substring(4).trim(),
            tasks: []
          };
        } else if (currentPhase && line.match(/^-\s+\[.\]\s+/)) {
          const task = line.replace(/^-\s+\[.\]\s+/, '');
          currentPhase.tasks.push(task);
        } else if (currentSection === 'Technical Approach' && line.trim()) {
          technicalApproach.push(line);
        } else if (currentSection === 'Potential Challenges' && line.startsWith('- ')) {
          const challenge = line.substring(2);
          if (challenge !== 'No specific challenges identified.') {
            challenges.push(challenge);
          }
        }
      }
      
      if (currentPhase) {
        phases.push(currentPhase);
      }
      
      const technicalApproachText = technicalApproach.join('\n').trim();
      
      return {
        issueNumber,
        file: filepath,
        phases,
        technicalApproach: technicalApproachText !== '' && technicalApproachText !== 'Technical approach to be determined.' ? technicalApproachText : undefined,
        challenges: challenges.length > 0 ? challenges : undefined
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async readTodoList(): Promise<string[]> {
    try {
      const content = await fs.readFile(this.todoPath, 'utf-8');
      const lines = content.split('\n');
      const todos: string[] = [];
      
      for (const line of lines) {
        if (line.match(/^-\s+\[.\]\s+/)) {
          todos.push(line);
        }
      }
      
      return todos;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async updateTodoList(todos: string[]): Promise<void> {
    const content = `# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
${todos.filter(t => !t.includes('[x]')).join('\n')}

## Completed Issues
${todos.filter(t => t.includes('[x]')).join('\n')}`;
    
    await fs.writeFile(this.todoPath, content, 'utf-8');
  }

  async readProviderInstructions(_provider: 'CLAUDE' | 'GEMINI'): Promise<string> {
    // Always read from AGENT.md now - provider parameter kept for backward compatibility
    const filepath = path.join(this.workspace, 'AGENT.md');
    
    try {
      return await fs.readFile(filepath, 'utf-8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return '';
      }
      throw error;
    }
  }

  async readFile(filepath: string): Promise<string> {
    const fullPath = path.isAbsolute(filepath) ? filepath : path.join(this.workspace, filepath);
    return await fs.readFile(fullPath, 'utf-8');
  }

  async writeFile(filepath: string, content: string): Promise<void> {
    const fullPath = path.isAbsolute(filepath) ? filepath : path.join(this.workspace, filepath);
    await fs.writeFile(fullPath, content, 'utf-8');
  }

  async updateProviderInstructions(provider: 'CLAUDE' | 'GEMINI', content: string): Promise<void> {
    const filename = `${provider}.md`;
    const filepath = path.join(this.workspace, filename);
    
    await fs.writeFile(filepath, content, 'utf-8');
  }

  async createProviderInstructionsIfMissing(): Promise<void> {
    const agentPath = path.join(this.workspace, 'AGENT.md');
    const claudePath = path.join(this.workspace, 'CLAUDE.md');
    const geminiPath = path.join(this.workspace, 'GEMINI.md');
    
    // Create AGENT.md if it doesn't exist
    try {
      await fs.access(agentPath);
    } catch {
      const agentTemplate = `# Agent Instructions

This file gives guidance to agentic coding tools on codebase structure, build/test commands, architecture, etc.

## Project Context
[Describe your project here]

## Technology Stack
[List your technology stack]

## Coding Standards
[List your coding standards]

## Build and Test Commands
[List your build and test commands]

## Additional Notes
[Any other important information]
`;
      await fs.writeFile(agentPath, agentTemplate, 'utf-8');
    }
    
    // Create symlinks or stub files for backward compatibility
    const providers: Array<[string, string]> = [[claudePath, 'Claude'], [geminiPath, 'Gemini']];
    for (const [providerPath, providerName] of providers) {
      try {
        await fs.access(providerPath);
      } catch {
        // Try to create symlink first
        try {
          await fs.symlink('AGENT.md', providerPath);
        } catch {
          // If symlink fails (e.g., on Windows or permission issues), create a stub file
          const stubContent = `# ${providerName} Instructions

This file is for backward compatibility. All agent instructions are in AGENT.md.

Please see AGENT.md for the actual instructions.
`;
          await fs.writeFile(providerPath, stubContent, 'utf-8');
        }
      }
    }
  }

  async readTodo(): Promise<string> {
    try {
      return await fs.readFile(this.todoPath, 'utf-8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return '';
      }
      throw error;
    }
  }

  async updateTodo(content: string): Promise<void> {
    await fs.writeFile(this.todoPath, content, 'utf-8');
  }

  async getTodoStats(): Promise<{ total: number; completed: number; pending: number }> {
    // Count total issues from the issues directory
    const issuesDir = path.join(this.workspace, 'issues');
    let total = 0;
    
    try {
      const files = await fs.readdir(issuesDir);
      const issueFiles = files.filter(f => f.endsWith('.md'));
      total = issueFiles.length;
    } catch {
      // Issues directory doesn't exist
      total = 0;
    }
    
    // Read TODO.md for completion status
    const todos = await this.readTodoList();
    
    // Count completed issues (those with [x])
    const completed = todos.filter(t => t.includes('[x]')).length;
    
    // Count pending issues (those with [ ])
    const pending = todos.filter(t => !t.includes('[x]')).length;
    
    return { total, completed, pending };
  }

  async getNextIssue(): Promise<Issue | undefined> {
    const todos = await this.readTodoList();
    const pendingTodos = todos.filter(t => !t.includes('[x]'));
    
    if (pendingTodos.length === 0) {
      return undefined;
    }

    // Parse the first pending todo to get issue details
    const firstTodo = pendingTodos[0];
    if (firstTodo === undefined || firstTodo === '') {
      return undefined;
    }
    
    const match = firstTodo.match(/\*\*\[Issue #(\d+)\]\*\* (.+?) - `(.+?)`/);
    
    if (!match) {
      return undefined;
    }

    const [, numberStr, title, file] = match;
    if (numberStr === undefined || numberStr === '' || title === undefined || title === '' || file === undefined || file === '') {
      return undefined;
    }
    
    const issueNumber = parseInt(numberStr, 10);
    
    // Read the issue file to get full details
    const issuePath = path.join(this.workspace, file);
    const issueContent = await fs.readFile(issuePath, 'utf-8');
    
    return {
      number: issueNumber,
      title,
      file,
      requirements: this.extractSection(issueContent, 'Requirement'),
      acceptanceCriteria: this.extractChecklist(issueContent, 'Acceptance Criteria')
    };
  }

  private extractSection(content: string, sectionName: string): string {
    const lines = content.split('\n');
    let inSection = false;
    const sectionContent: string[] = [];
    
    for (const line of lines) {
      if (line.startsWith('## ') && line.substring(3).trim() === sectionName) {
        inSection = true;
        continue;
      }
      
      if (inSection && line.startsWith('## ')) {
        break;
      }
      
      if (inSection && line.trim() !== '') {
        sectionContent.push(line);
      }
    }
    
    return sectionContent.join('\n').trim();
  }

  private extractChecklist(content: string, sectionName: string): string[] {
    const sectionContent = this.extractSection(content, sectionName);
    const lines = sectionContent.split('\n');
    const checklist: string[] = [];
    
    for (const line of lines) {
      const match = line.match(/^-\s*\[[x ]\]\s*(.+)$/);
      if (match !== null && match[1] !== undefined && match[1] !== '') {
        checklist.push(match[1]);
      }
    }
    
    return checklist;
  }

  /**
   * Generates a URL-friendly slug from a title for use in filenames.
   * Converts spaces to hyphens, removes special characters, and normalizes formatting.
   * 
   * This method converts a title string into a standardized filename slug by:
   * 1. Converting to lowercase
   * 2. Replacing spaces with hyphens
   * 3. Removing special characters (except dots and hyphens)
   * 4. Replacing multiple dots with single hyphen
   * 5. Replacing multiple hyphens with single hyphen
   * 6. Removing leading/trailing hyphens
   * 
   * @param title - The title to convert to a slug
   * @returns A sanitized slug suitable for filenames
   * 
   * @example
   * ```typescript
   * generateFileSlug('Implement User Authentication') // 'implement-user-authentication'
   * generateFileSlug('Fix Bug #123') // 'fix-bug-123'
   * generateFileSlug('Add @mentions & #hashtags') // 'add-mentions-hashtags'
   * generateFileSlug('Feature...Test!!!') // 'feature-test'
   * generateFileSlug('  Trim  Spaces  ') // 'trim-spaces'
   * ```
   */
  private generateFileSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9.-]/g, '')
      .replace(/\.+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}