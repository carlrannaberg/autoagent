import * as fs from 'fs/promises';
import { readFileSync } from 'fs';
import * as path from 'path';
import { platform } from 'os';
import { randomBytes } from 'crypto';
import { Session } from '../types/session.js';

/**
 * Manages session tracking and persistence for AutoAgent executions.
 */
export class SessionManager {
  private sessionsDir: string;
  private currentSessionFile: string;
  
  constructor(baseDir?: string) {
    const homeDir = process.env.HOME ?? process.env.USERPROFILE ?? '';
    const rootDir = baseDir ?? path.join(homeDir, '.autoagent');
    this.sessionsDir = path.join(rootDir, 'sessions');
    this.currentSessionFile = path.join(this.sessionsDir, 'current');
  }
  
  /**
   * Initialize the sessions directory structure
   */
  async initializeDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.sessionsDir, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to initialize sessions directory: ${String(error)}`);
    }
  }
  
  /**
   * Save a session to disk
   */
  async saveSession(session: Session): Promise<void> {
    await this.initializeDirectory();
    
    const filename = this.getSessionFilename(session);
    const filepath = path.join(this.sessionsDir, filename);
    
    try {
      await fs.writeFile(filepath, JSON.stringify(session, null, 2), 'utf8');
    } catch (error) {
      throw new Error(`Failed to save session: ${String(error)}`);
    }
  }
  
  /**
   * Set the current active session
   */
  async setCurrentSession(sessionId: string): Promise<void> {
    await this.initializeDirectory();
    
    const sessionFiles = await this.findSessionFile(sessionId);
    if (!sessionFiles.length) {
      throw new Error(`Session ${sessionId} not found`);
    }
    
    const sessionFile = sessionFiles[0];
    if (sessionFile === undefined || sessionFile === null || sessionFile === '') {
      throw new Error(`Session ${sessionId} file not found`);
    }
    
    const isWindows = platform() === 'win32';
    
    try {
      // Remove existing current file/symlink if it exists
      try {
        await fs.unlink(this.currentSessionFile);
      } catch {
        // Ignore if doesn't exist
      }
      
      if (isWindows) {
        // On Windows, copy the session file to current
        const sessionPath = path.join(this.sessionsDir, sessionFile);
        await fs.copyFile(sessionPath, this.currentSessionFile);
      } else {
        // On Unix-like systems, create a symlink
        await fs.symlink(sessionFile, this.currentSessionFile);
      }
    } catch (error) {
      throw new Error(`Failed to set current session: ${String(error)}`);
    }
  }
  
  /**
   * Get the current active session
   */
  async getCurrentSession(): Promise<Session | null> {
    try {
      const data = await fs.readFile(this.currentSessionFile, 'utf8');
      return JSON.parse(data) as Session;
    } catch {
      return null;
    }
  }
  
  /**
   * List sessions with optional limit
   */
  async listSessions(limit?: number): Promise<Session[]> {
    try {
      const files = await fs.readdir(this.sessionsDir);
      const sessionFiles = files.filter(f => f.startsWith('session-') && f.endsWith('.json'));
      
      const sessions: Session[] = [];
      for (const file of sessionFiles) {
        try {
          const filepath = path.join(this.sessionsDir, file);
          const data = await fs.readFile(filepath, 'utf8');
          sessions.push(JSON.parse(data) as Session);
        } catch {
          // Skip invalid session files
        }
      }
      
      // Sort by start time (newest first)
      sessions.sort((a, b) => b.startTime - a.startTime);
      
      // Apply limit if specified
      if (limit !== undefined && limit > 0) {
        return sessions.slice(0, limit);
      }
      
      return sessions;
    } catch {
      return [];
    }
  }
  
  /**
   * End a session and update its status
   */
  async endSession(sessionId: string, status: 'completed' | 'failed', error?: string): Promise<void> {
    const sessionFiles = await this.findSessionFile(sessionId);
    if (!sessionFiles.length) {
      throw new Error(`Session ${sessionId} not found`);
    }
    
    const sessionFile = sessionFiles[0];
    if (sessionFile === undefined || sessionFile === null || sessionFile === '') {
      throw new Error(`Session ${sessionId} file not found`);
    }
    
    const filepath = path.join(this.sessionsDir, sessionFile);
    
    try {
      const data = await fs.readFile(filepath, 'utf8');
      const session = JSON.parse(data) as Session;
      
      session.endTime = Date.now();
      session.status = status;
      if (error !== undefined) {
        session.error = error;
      }
      
      await fs.writeFile(filepath, JSON.stringify(session, null, 2), 'utf8');
    } catch (error) {
      throw new Error(`Failed to end session: ${String(error)}`);
    }
  }
  
  /**
   * Generate a session filename
   */
  private getSessionFilename(session: Session): string {
    const timestamp = session.startTime;
    const randomId = randomBytes(4).toString('hex');
    return `session-${timestamp}-${randomId}.json`;
  }
  
  /**
   * Find session file by ID
   */
  private async findSessionFile(sessionId: string): Promise<string[]> {
    try {
      const files = await fs.readdir(this.sessionsDir);
      return files.filter(f => {
        if (!f.startsWith('session-') || !f.endsWith('.json')) {
          return false;
        }
        // Check if file contains the session ID
        try {
          const filepath = path.join(this.sessionsDir, f);
          const data = readFileSync(filepath, 'utf8');
          const session = JSON.parse(data) as Session;
          return session.id === sessionId;
        } catch {
          return false;
        }
      });
    } catch {
      return [];
    }
  }
  
  /**
   * Create a new session
   */
  createSession(workspace: string, issueNumber?: number, provider?: string): Session {
    const id = `${Date.now()}-${randomBytes(8).toString('hex')}`;
    return {
      id,
      startTime: Date.now(),
      endTime: null,
      status: 'active',
      workspace,
      issueNumber,
      provider,
    };
  }
}