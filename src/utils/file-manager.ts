import * as fs from 'fs/promises';
import * as path from 'path';
import { Issue, Plan, Phase } from '../types';

export class FileManager {
  private workspace: string;

  constructor(workspace: string = process.cwd()) {
    this.workspace = workspace;
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

  private async ensureDirectories(): Promise<void> {
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

  async createIssue(issue: Issue): Promise<string> {
    await this.ensureDirectories();
    
    const filename = `${issue.number}-${issue.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
    const filepath = path.join(this.issuesDir, filename);
    
    const content = `# Issue ${issue.number}: ${issue.title}

## Requirements
${issue.requirements}

## Acceptance Criteria
${issue.acceptanceCriteria.map(ac => `- [ ] ${ac}`).join('\n')}

## Technical Details
${issue.technicalDetails !== undefined ? issue.technicalDetails : 'No additional technical details.'}

## Resources
${issue.resources !== undefined && issue.resources.length > 0 ? issue.resources.map(r => `- ${r}`).join('\n') : 'No resources specified.'}`;
    
    await fs.writeFile(filepath, content, 'utf-8');
    return filepath;
  }

  async readIssue(filepath: string): Promise<Issue | null> {
    try {
      const content = await fs.readFile(filepath, 'utf-8');
      const lines = content.split('\n');
      
      // Parse issue number and title from header
      const headerMatch = lines[0]?.match(/^#\s+Issue\s+(\d+):\s+(.+)$/);
      if (!headerMatch) {
        return null;
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
        } else if (currentSection && line.trim()) {
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

  async createPlan(issueNumber: number, plan: Plan, issueTitle: string): Promise<string> {
    await this.ensureDirectories();
    
    const filename = `${issueNumber}-plan.md`;
    const filepath = path.join(this.plansDir, filename);
    
    const phasesContent = plan.phases.map(phase => `
### ${phase.name}
${phase.tasks.map(task => `- [ ] ${task}`).join('\n')}`).join('\n');
    
    const content = `# Plan for Issue ${issueNumber}: ${issueTitle}

This document outlines the step-by-step plan to complete \`issues/${issueNumber}-${issueTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md\`.

## Implementation Plan
${phasesContent}

## Technical Approach
${plan.technicalApproach !== undefined ? plan.technicalApproach : 'Technical approach to be determined.'}

## Potential Challenges
${plan.challenges !== undefined && plan.challenges.length > 0 ? plan.challenges.map(c => `- ${c}`).join('\n') : '- No specific challenges identified.'}`;
    
    await fs.writeFile(filepath, content, 'utf-8');
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

  async readProviderInstructions(provider: 'CLAUDE' | 'GEMINI'): Promise<string> {
    const filename = `${provider}.md`;
    const filepath = path.join(this.workspace, filename);
    
    try {
      return await fs.readFile(filepath, 'utf-8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return '';
      }
      throw error;
    }
  }

  async updateProviderInstructions(provider: 'CLAUDE' | 'GEMINI', content: string): Promise<void> {
    const filename = `${provider}.md`;
    const filepath = path.join(this.workspace, filename);
    
    await fs.writeFile(filepath, content, 'utf-8');
  }

  async createProviderInstructionsIfMissing(): Promise<void> {
    const claudePath = path.join(this.workspace, 'CLAUDE.md');
    const geminiPath = path.join(this.workspace, 'GEMINI.md');
    
    try {
      await fs.access(claudePath);
    } catch {
      const claudeTemplate = `# Claude Instructions

This file contains project-specific instructions for Claude. Customize this file to provide context about your project, coding standards, and any special requirements that Claude should follow when working on tasks.

## Project Context
[Describe your project here]

## Coding Standards
[List your coding standards]

## Additional Notes
[Any other important information]
`;
      await fs.writeFile(claudePath, claudeTemplate, 'utf-8');
    }
    
    try {
      await fs.access(geminiPath);
    } catch {
      const geminiTemplate = `# Gemini Instructions

This file contains project-specific instructions for Gemini. Customize this file to provide context about your project, coding standards, and any special requirements that Gemini should follow when working on tasks.

## Project Context
[Describe your project here]

## Coding Standards
[List your coding standards]

## Additional Notes
[Any other important information]
`;
      await fs.writeFile(geminiPath, geminiTemplate, 'utf-8');
    }
  }
}