import * as fs from 'fs/promises';
import * as path from 'path';
import { existsSync } from 'fs';
import { 
  ImprovementChange,
  ChangeType
} from '../types/index.js';
import { FileManager } from '../utils/file-manager.js';
import { Logger } from '../utils/logger.js';

export interface BackupInfo {
  backupDir: string;
  timestamp: string;
  files: Map<string, string>;
}

export interface ApplicationResult {
  success: boolean;
  appliedChanges: ImprovementChange[];
  failedChanges: Array<{ change: ImprovementChange; error: string }>;
  backup?: BackupInfo;
  error?: string;
}

export interface ImprovementApplier {
  applyImprovements(
    changes: ImprovementChange[],
    workspace?: string
  ): Promise<ApplicationResult>;
}

export class DefaultImprovementApplier implements ImprovementApplier {
  private fileManager: FileManager;
  
  constructor(workspace?: string) {
    this.fileManager = new FileManager(workspace);
  }
  
  async applyImprovements(
    changes: ImprovementChange[],
    workspace?: string
  ): Promise<ApplicationResult> {
    const workDir = workspace ?? process.cwd();
    const backup = await this.createBackup(changes, workDir);
    
    const appliedChanges: ImprovementChange[] = [];
    const failedChanges: Array<{ change: ImprovementChange; error: string }> = [];
    
    try {
      for (const change of changes) {
        try {
          await this.applyChange(change, workDir);
          appliedChanges.push(change);
          Logger.info(`✅ Applied ${change.type}: ${change.description}`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          failedChanges.push({ change, error: errorMessage });
          Logger.error(`❌ Failed to apply ${change.type}: ${errorMessage}`);
          
          await this.rollback(backup);
          return {
            success: false,
            appliedChanges: [],
            failedChanges,
            backup,
            error: `Failed to apply change: ${errorMessage}`
          };
        }
      }
      
      return {
        success: true,
        appliedChanges,
        failedChanges,
        backup
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      await this.rollback(backup);
      
      return {
        success: false,
        appliedChanges: [],
        failedChanges,
        backup,
        error: `Critical error during application: ${errorMessage}`
      };
    }
  }
  
  private async createBackup(
    changes: ImprovementChange[],
    workspace: string
  ): Promise<BackupInfo> {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupDir = path.join(workspace, '.autoagent', 'backups', timestamp);
    
    await fs.mkdir(backupDir, { recursive: true });
    
    const files = new Map<string, string>();
    const affectedFiles = this.getAffectedFiles(changes, workspace);
    
    for (const file of affectedFiles) {
      if (existsSync(file)) {
        const content = await fs.readFile(file, 'utf-8');
        const relativePath = path.relative(workspace, file);
        files.set(relativePath, content);
        
        const backupPath = path.join(backupDir, relativePath);
        await fs.mkdir(path.dirname(backupPath), { recursive: true });
        await fs.writeFile(backupPath, content, 'utf-8');
      }
    }
    
    Logger.info(`📦 Created backup in ${backupDir} (${files.size} files)`);
    
    return {
      backupDir,
      timestamp,
      files
    };
  }
  
  private getAffectedFiles(changes: ImprovementChange[], workspace: string): string[] {
    const files = new Set<string>();
    
    for (const change of changes) {
      if (change.type === ChangeType.MODIFY_ISSUE || change.type === ChangeType.ADD_ISSUE) {
        files.add(path.join(workspace, 'issues', change.target));
      } else if (change.type === ChangeType.MODIFY_PLAN || change.type === ChangeType.ADD_PLAN) {
        files.add(path.join(workspace, 'plans', change.target));
      } else if (change.type === ChangeType.ADD_DEPENDENCY) {
        const issueMatch = change.target.match(/^(\d+)-/);
        if (issueMatch?.[1]) {
          const issueFiles = this.findIssueFile(parseInt(issueMatch[1], 10), workspace);
          for (const file of issueFiles) {
            files.add(file);
          }
        }
      }
    }
    
    return Array.from(files);
  }
  
  private findIssueFile(issueNumber: number, workspace: string): string[] {
    // This method is not used anymore, keeping for backward compatibility
    return [];
  }
  
  private async rollback(backup: BackupInfo): Promise<void> {
    Logger.info(`🔄 Rolling back changes using backup from ${backup.timestamp}`);
    
    for (const [relativePath, content] of backup.files) {
      const fullPath = path.join(process.cwd(), relativePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, 'utf-8');
    }
    
    Logger.info('✅ Rollback completed');
  }
  
  private async applyChange(change: ImprovementChange, workspace: string): Promise<void> {
    switch (change.type) {
      case ChangeType.ADD_ISSUE:
        await this.applyAddIssue(change, workspace);
        break;
      case ChangeType.MODIFY_ISSUE:
        await this.applyModifyIssue(change, workspace);
        break;
      case ChangeType.ADD_PLAN:
        await this.applyAddPlan(change, workspace);
        break;
      case ChangeType.MODIFY_PLAN:
        await this.applyModifyPlan(change, workspace);
        break;
      case ChangeType.ADD_DEPENDENCY:
        await this.applyAddDependency(change, workspace);
        break;
      default:
        throw new Error(`Unsupported change type: ${change.type}`);
    }
  }
  
  private async applyAddIssue(change: ImprovementChange, workspace: string): Promise<void> {
    const issuesDir = path.join(workspace, 'issues');
    await fs.mkdir(issuesDir, { recursive: true });
    
    const issueNumber = await this.fileManager.getNextIssueNumber();
    const title = this.extractTitleFromContent(change.content);
    const filename = `${issueNumber}-${this.generateFileSlug(title)}.md`;
    const filepath = path.join(issuesDir, filename);
    
    const formattedContent = this.formatIssueContent(issueNumber, title, change.content);
    await fs.writeFile(filepath, formattedContent, 'utf-8');
    
    await this.updateTodoList(issueNumber, title, filename, workspace);
  }
  
  private async applyModifyIssue(change: ImprovementChange, workspace: string): Promise<void> {
    const filepath = path.join(workspace, 'issues', change.target);
    
    if (!existsSync(filepath)) {
      throw new Error(`Issue file not found: ${filepath}`);
    }
    
    const originalContent = await fs.readFile(filepath, 'utf-8');
    const modifiedContent = this.mergeIssueContent(originalContent, change.content);
    
    await fs.writeFile(filepath, modifiedContent, 'utf-8');
  }
  
  private async applyAddPlan(change: ImprovementChange, workspace: string): Promise<void> {
    const plansDir = path.join(workspace, 'plans');
    await fs.mkdir(plansDir, { recursive: true });
    
    const issueNumber = this.extractIssueNumberFromPlan(change.target);
    const issueTitle = await this.getIssueTitleByNumber(issueNumber, workspace);
    const filename = `${issueNumber}-${this.generateFileSlug(issueTitle)}.md`;
    const filepath = path.join(plansDir, filename);
    
    const formattedContent = this.formatPlanContent(issueNumber, issueTitle, change.content);
    await fs.writeFile(filepath, formattedContent, 'utf-8');
  }
  
  private async applyModifyPlan(change: ImprovementChange, workspace: string): Promise<void> {
    const filepath = path.join(workspace, 'plans', change.target);
    
    if (!existsSync(filepath)) {
      throw new Error(`Plan file not found: ${filepath}`);
    }
    
    const originalContent = await fs.readFile(filepath, 'utf-8');
    const modifiedContent = this.mergePlanContent(originalContent, change.content);
    
    await fs.writeFile(filepath, modifiedContent, 'utf-8');
  }
  
  private async applyAddDependency(change: ImprovementChange, workspace: string): Promise<void> {
    const issueMatch = change.target.match(/^(\d+)-/);
    if (!issueMatch?.[1]) {
      throw new Error(`Invalid dependency target format: ${change.target}`);
    }
    
    const issueNumber = parseInt(issueMatch[1], 10);
    const issueFile = await this.findIssueFileByNumber(issueNumber, workspace);
    
    if (!issueFile) {
      throw new Error(`Issue file not found for number: ${issueNumber}`);
    }
    
    const content = await fs.readFile(issueFile, 'utf-8');
    const updatedContent = this.addDependencyToIssue(content, change.content);
    
    await fs.writeFile(issueFile, updatedContent, 'utf-8');
  }
  
  private extractTitleFromContent(content: string): string {
    const titleMatch = content.match(/^#\s+Issue\s+\d+:\s+(.+)$/m);
    if (titleMatch?.[1]) {
      return titleMatch[1];
    }
    
    const requirementMatch = content.match(/##\s+Requirement\s*\n(.+?)(?:\n|$)/);
    if (requirementMatch?.[1]) {
      return requirementMatch[1].trim().substring(0, 50);
    }
    
    return 'Untitled Issue';
  }
  
  private formatIssueContent(issueNumber: number, title: string, content: string): string {
    if (content.includes(`# Issue ${issueNumber}:`)) {
      return content;
    }
    
    return `# Issue ${issueNumber}: ${title}

${content}`;
  }
  
  private formatPlanContent(issueNumber: number, issueTitle: string, content: string): string {
    if (content.includes(`# Plan for Issue ${issueNumber}:`)) {
      return content;
    }
    
    return `# Plan for Issue ${issueNumber}: ${issueTitle}

This document outlines the step-by-step plan to complete \`issues/${issueNumber}-${this.generateFileSlug(issueTitle)}.md\`.

${content}`;
  }
  
  private mergeIssueContent(original: string, changes: string): string {
    const sections = this.parseMarkdownSections(original);
    const changeSections = this.parseMarkdownSections(changes);
    
    for (const [section, content] of changeSections) {
      if (section === 'header') {
        continue;
      }
      
      if (sections.has(section)) {
        if (section === 'Acceptance Criteria' || section === 'Resources') {
          const existingItems = this.parseListItems(sections.get(section) ?? '');
          const newItems = this.parseListItems(content);
          const mergedItems = [...new Set([...existingItems, ...newItems])];
          sections.set(section, mergedItems.map(item => `- [ ] ${item}`).join('\n'));
        } else {
          sections.set(section, content);
        }
      } else {
        sections.set(section, content);
      }
    }
    
    return this.reconstructMarkdown(sections);
  }
  
  private mergePlanContent(original: string, changes: string): string {
    const sections = this.parseMarkdownSections(original);
    const changeSections = this.parseMarkdownSections(changes);
    
    for (const [section, content] of changeSections) {
      if (section === 'header') {
        continue;
      }
      
      sections.set(section, content);
    }
    
    return this.reconstructMarkdown(sections);
  }
  
  private addDependencyToIssue(content: string, dependency: string): string {
    const sections = this.parseMarkdownSections(content);
    
    if (!sections.has('Dependencies')) {
      sections.set('Dependencies', `- ${dependency}`);
    } else {
      const existing = sections.get('Dependencies') ?? '';
      sections.set('Dependencies', `${existing}\n- ${dependency}`);
    }
    
    return this.reconstructMarkdown(sections);
  }
  
  private parseMarkdownSections(content: string): Map<string, string> {
    const sections = new Map<string, string>();
    const lines = content.split('\n');
    let currentSection = '';
    let sectionContent: string[] = [];
    let headerContent = '';
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        headerContent = line;
        sections.set('header', headerContent);
      } else if (line.startsWith('## ')) {
        if (currentSection) {
          sections.set(currentSection, sectionContent.join('\n').trim());
        }
        currentSection = line.substring(3).trim();
        sectionContent = [];
      } else if (currentSection) {
        sectionContent.push(line);
      }
    }
    
    if (currentSection) {
      sections.set(currentSection, sectionContent.join('\n').trim());
    }
    
    return sections;
  }
  
  private parseListItems(content: string): string[] {
    const items: string[] = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      const match = line.match(/^-\s+(?:\[.\]\s+)?(.+)$/);
      if (match?.[1]) {
        items.push(match[1]);
      }
    }
    
    return items;
  }
  
  private reconstructMarkdown(sections: Map<string, string>): string {
    const output: string[] = [];
    
    if (sections.has('header')) {
      output.push(sections.get('header') ?? '');
      output.push('');
    }
    
    const sectionOrder = [
      'Requirements', 'Requirement',
      'Acceptance Criteria',
      'Technical Details',
      'Dependencies',
      'Resources',
      'Implementation Plan',
      'Technical Approach',
      'Potential Challenges'
    ];
    
    // First add sections in the defined order
    for (const sectionName of sectionOrder) {
      if (sections.has(sectionName)) {
        output.push(`## ${sectionName}`);
        output.push(sections.get(sectionName) ?? '');
        output.push('');
      }
    }
    
    // Then add any additional sections not in the order
    for (const [section, content] of sections) {
      if (!sectionOrder.includes(section) && section !== 'header') {
        output.push(`## ${section}`);
        output.push(content);
        output.push('');
      }
    }
    
    return output.join('\n').trim();
  }
  
  private extractIssueNumberFromPlan(target: string): number {
    const match = target.match(/(?:plan-for-issue-|^)(\d+)/);
    if (match?.[1]) {
      return parseInt(match[1], 10);
    }
    throw new Error(`Could not extract issue number from plan target: ${target}`);
  }
  
  private async getIssueTitleByNumber(issueNumber: number, workspace: string): Promise<string> {
    const issueFile = await this.findIssueFileByNumber(issueNumber, workspace);
    
    if (!issueFile) {
      return `Issue ${issueNumber}`;
    }
    
    const issue = await this.fileManager.readIssue(issueFile);
    return issue?.title ?? `Issue ${issueNumber}`;
  }
  
  private async findIssueFileByNumber(issueNumber: number, workspace: string): Promise<string | null> {
    const issuesDir = path.join(workspace, 'issues');
    
    try {
      const files = await fs.readdir(issuesDir);
      for (const file of files) {
        if (file.startsWith(`${issueNumber}-`) && file.endsWith('.md')) {
          return path.join(issuesDir, file);
        }
      }
    } catch {
      // Directory doesn't exist
    }
    
    return null;
  }
  
  private async updateTodoList(
    issueNumber: number,
    title: string,
    filename: string,
    workspace: string
  ): Promise<void> {
    const todoPath = path.join(workspace, 'TODO.md');
    
    try {
      const todoContent = await fs.readFile(todoPath, 'utf-8');
      const newTodoItem = `- [ ] **[Issue #${issueNumber}]** ${title} - \`issues/${filename}\``;
      
      const lines = todoContent.split('\n');
      const pendingIndex = lines.findIndex(line => line.includes('## Pending Issues'));
      
      if (pendingIndex !== -1) {
        let insertIndex = pendingIndex + 1;
        while (insertIndex < lines.length && lines[insertIndex]?.trim() === '') {
          insertIndex++;
        }
        lines.splice(insertIndex, 0, newTodoItem);
      } else {
        lines.push('', '## Pending Issues', newTodoItem);
      }
      
      await fs.writeFile(todoPath, lines.join('\n'), 'utf-8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        const todoContent = `# To-Do

This file tracks all issues for the autonomous agent. Issues are automatically marked as complete when the agent finishes them.

## Pending Issues
- [ ] **[Issue #${issueNumber}]** ${title} - \`issues/${filename}\`

## Completed Issues`;
        await fs.writeFile(todoPath, todoContent, 'utf-8');
      } else {
        throw error;
      }
    }
  }
  
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

export async function applyImprovements(
  changes: ImprovementChange[],
  workspace?: string
): Promise<ApplicationResult> {
  const applier = new DefaultImprovementApplier(workspace);
  return applier.applyImprovements(changes, workspace);
}