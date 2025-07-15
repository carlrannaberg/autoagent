import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import { platform } from 'os';
import { SessionManager } from '../../src/core/session-manager.js';
import { Session } from '../../src/types/session.js';

// Mock the modules
vi.mock('fs/promises');
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}));
vi.mock('os', async (importOriginal) => {
  const actual = await importOriginal<typeof import('os')>();
  return {
    ...actual,
    platform: vi.fn(),
  };
});

describe('SessionManager', () => {
  let sessionManager: SessionManager;
  const mockHomeDir = '/home/user';
  const mockSessionsDir = path.join(mockHomeDir, '.autoagent', 'sessions');
  
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.HOME = mockHomeDir;
    sessionManager = new SessionManager();
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('initializeDirectory', () => {
    it('should create sessions directory', async () => {
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      
      await sessionManager.initializeDirectory();
      
      expect(fs.mkdir).toHaveBeenCalledWith(mockSessionsDir, { recursive: true });
    });
    
    it('should throw error if directory creation fails', async () => {
      vi.mocked(fs.mkdir).mockRejectedValue(new Error('Permission denied'));
      
      await expect(sessionManager.initializeDirectory()).rejects.toThrow('Failed to initialize sessions directory');
    });
  });
  
  describe('saveSession', () => {
    const mockSession: Session = {
      id: 'test-session-123',
      startTime: 1234567890,
      endTime: null,
      status: 'active',
      workspace: '/test/workspace',
      issueNumber: 42,
      provider: 'claude',
    };
    
    it('should save session to disk', async () => {
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue();
      
      await sessionManager.saveSession(mockSession);
      
      expect(fs.mkdir).toHaveBeenCalledWith(mockSessionsDir, { recursive: true });
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('session-1234567890-'),
        JSON.stringify(mockSession, null, 2),
        'utf8'
      );
    });
    
    it('should throw error if save fails', async () => {
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockRejectedValue(new Error('Disk full'));
      
      await expect(sessionManager.saveSession(mockSession)).rejects.toThrow('Failed to save session');
    });
  });
  
  describe('setCurrentSession', () => {
    const mockSessionId = 'test-session-123';
    const mockSessionFile = 'session-1234567890-abc123.json';
    const mockSession: Session = {
      id: mockSessionId,
      startTime: 1234567890,
      endTime: null,
      status: 'active',
      workspace: '/test/workspace',
    };
    
    beforeEach(async () => {
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.readdir).mockResolvedValue([mockSessionFile, 'other.txt'] as any);
      const mockFsSync = await import('fs');
      vi.mocked(mockFsSync.readFileSync).mockReturnValue(JSON.stringify(mockSession));
      vi.mocked(fs.unlink).mockResolvedValue();
    });
    
    it('should create symlink on Unix systems', async () => {
      vi.mocked(platform).mockReturnValue('linux');
      vi.mocked(fs.symlink).mockResolvedValue();
      
      await sessionManager.setCurrentSession(mockSessionId);
      
      expect(fs.symlink).toHaveBeenCalledWith(
        mockSessionFile,
        path.join(mockSessionsDir, 'current')
      );
    });
    
    it('should copy file on Windows', async () => {
      vi.mocked(platform).mockReturnValue('win32');
      vi.mocked(fs.copyFile).mockResolvedValue();
      
      await sessionManager.setCurrentSession(mockSessionId);
      
      expect(fs.copyFile).toHaveBeenCalledWith(
        path.join(mockSessionsDir, mockSessionFile),
        path.join(mockSessionsDir, 'current')
      );
    });
    
    it('should throw error if session not found', async () => {
      vi.mocked(fs.readdir).mockResolvedValue([]);
      
      await expect(sessionManager.setCurrentSession('invalid-id')).rejects.toThrow('Session invalid-id not found');
    });
    
    it('should remove existing current file before creating new one', async () => {
      vi.mocked(platform).mockReturnValue('linux');
      vi.mocked(fs.symlink).mockResolvedValue();
      
      await sessionManager.setCurrentSession(mockSessionId);
      
      expect(fs.unlink).toHaveBeenCalledWith(path.join(mockSessionsDir, 'current'));
      expect(fs.unlink).toHaveBeenCalledBefore(fs.symlink as any);
    });
  });
  
  describe('getCurrentSession', () => {
    const mockSession: Session = {
      id: 'test-session-123',
      startTime: 1234567890,
      endTime: null,
      status: 'active',
      workspace: '/test/workspace',
    };
    
    it('should return current session', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockSession));
      
      const session = await sessionManager.getCurrentSession();
      
      expect(session).toEqual(mockSession);
      expect(fs.readFile).toHaveBeenCalledWith(
        path.join(mockSessionsDir, 'current'),
        'utf8'
      );
    });
    
    it('should return null if no current session', async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error('File not found'));
      
      const session = await sessionManager.getCurrentSession();
      
      expect(session).toBeNull();
    });
  });
  
  describe('listSessions', () => {
    const mockSessions: Session[] = [
      {
        id: 'session-1',
        startTime: 3000,
        endTime: null,
        status: 'active',
        workspace: '/workspace1',
      },
      {
        id: 'session-2',
        startTime: 2000,
        endTime: 2500,
        status: 'completed',
        workspace: '/workspace2',
      },
      {
        id: 'session-3',
        startTime: 1000,
        endTime: 1500,
        status: 'failed',
        workspace: '/workspace3',
        error: 'Test error',
      },
    ];
    
    beforeEach(() => {
      vi.mocked(fs.readdir).mockResolvedValue([
        'session-3000-abc.json',
        'session-2000-def.json',
        'session-1000-ghi.json',
        'current',
        'other.txt',
      ] as any);
      
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce(JSON.stringify(mockSessions[0]))
        .mockResolvedValueOnce(JSON.stringify(mockSessions[1]))
        .mockResolvedValueOnce(JSON.stringify(mockSessions[2]));
    });
    
    it('should list all sessions sorted by start time', async () => {
      const sessions = await sessionManager.listSessions();
      
      expect(sessions).toHaveLength(3);
      expect(sessions[0].id).toBe('session-1'); // Newest first
      expect(sessions[1].id).toBe('session-2');
      expect(sessions[2].id).toBe('session-3');
    });
    
    it('should apply limit when specified', async () => {
      const sessions = await sessionManager.listSessions(2);
      
      expect(sessions).toHaveLength(2);
      expect(sessions[0].id).toBe('session-1');
      expect(sessions[1].id).toBe('session-2');
    });
    
    it('should skip invalid session files', async () => {
      vi.mocked(fs.readFile)
        .mockResolvedValueOnce(JSON.stringify(mockSessions[0]))
        .mockResolvedValueOnce(JSON.stringify(mockSessions[1]))
        .mockRejectedValueOnce(new Error('Invalid JSON'))
        .mockResolvedValueOnce(JSON.stringify(mockSessions[2]));
      
      const sessions = await sessionManager.listSessions();
      
      expect(sessions).toHaveLength(3); // Should still include the one that was read successfully
      expect(sessions[0].id).toBe('session-1');
      expect(sessions[1].id).toBe('session-2');
      expect(sessions[2].id).toBe('session-3');
    });
    
    it('should return empty array if directory does not exist', async () => {
      vi.mocked(fs.readdir).mockRejectedValue(new Error('Directory not found'));
      
      const sessions = await sessionManager.listSessions();
      
      expect(sessions).toEqual([]);
    });
  });
  
  describe('endSession', () => {
    const mockSessionId = 'test-session-123';
    const mockSessionFile = 'session-1234567890-abc123.json';
    const mockSession: Session = {
      id: mockSessionId,
      startTime: 1234567890,
      endTime: null,
      status: 'active',
      workspace: '/test/workspace',
    };
    
    beforeEach(async () => {
      vi.mocked(fs.readdir).mockResolvedValue([mockSessionFile] as any);
      const mockFsSync = await import('fs');
      vi.mocked(mockFsSync.readFileSync).mockReturnValue(JSON.stringify(mockSession));
      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockSession));
      vi.mocked(fs.writeFile).mockResolvedValue();
    });
    
    it('should update session status to completed', async () => {
      await sessionManager.endSession(mockSessionId, 'completed');
      
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(mockSessionsDir, mockSessionFile),
        expect.stringContaining('"status": "completed"'),
        'utf8'
      );
      
      const writtenData = JSON.parse((fs.writeFile as any).mock.calls[0][1]);
      expect(writtenData.status).toBe('completed');
      expect(writtenData.endTime).toBeGreaterThan(0);
    });
    
    it('should update session status to failed with error', async () => {
      await sessionManager.endSession(mockSessionId, 'failed', 'Test error message');
      
      const writtenData = JSON.parse((fs.writeFile as any).mock.calls[0][1]);
      expect(writtenData.status).toBe('failed');
      expect(writtenData.error).toBe('Test error message');
      expect(writtenData.endTime).toBeGreaterThan(0);
    });
    
    it('should throw error if session not found', async () => {
      vi.mocked(fs.readdir).mockResolvedValue([]);
      
      await expect(sessionManager.endSession('invalid-id', 'completed')).rejects.toThrow('Session invalid-id not found');
    });
    
    it('should throw error if update fails', async () => {
      vi.mocked(fs.writeFile).mockRejectedValue(new Error('Write failed'));
      
      await expect(sessionManager.endSession(mockSessionId, 'completed')).rejects.toThrow('Failed to end session');
    });
  });
  
  describe('createSession', () => {
    it('should create a new session with all properties', () => {
      const workspace = '/test/workspace';
      const issueNumber = 42;
      const provider = 'claude';
      
      const session = sessionManager.createSession(workspace, issueNumber, provider);
      
      expect(session.id).toMatch(/^\d+-[a-f0-9]{16}$/);
      expect(session.startTime).toBeGreaterThan(0);
      expect(session.endTime).toBeNull();
      expect(session.status).toBe('active');
      expect(session.workspace).toBe(workspace);
      expect(session.issueNumber).toBe(issueNumber);
      expect(session.provider).toBe(provider);
    });
    
    it('should create session with minimal properties', () => {
      const workspace = '/test/workspace';
      
      const session = sessionManager.createSession(workspace);
      
      expect(session.workspace).toBe(workspace);
      expect(session.issueNumber).toBeUndefined();
      expect(session.provider).toBeUndefined();
    });
  });
  
  describe('with custom base directory', () => {
    it('should use custom base directory', async () => {
      const customDir = '/custom/base';
      const customSessionManager = new SessionManager(customDir);
      
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      
      await customSessionManager.initializeDirectory();
      
      expect(fs.mkdir).toHaveBeenCalledWith(
        path.join(customDir, 'sessions'),
        { recursive: true }
      );
    });
  });
  
  describe('concurrent session access', () => {
    it('should handle concurrent session saves', async () => {
      vi.mocked(fs.mkdir).mockResolvedValue(undefined);
      vi.mocked(fs.writeFile).mockResolvedValue();
      
      const session1 = sessionManager.createSession('/workspace1');
      const session2 = sessionManager.createSession('/workspace2');
      
      await Promise.all([
        sessionManager.saveSession(session1),
        sessionManager.saveSession(session2),
      ]);
      
      expect(fs.writeFile).toHaveBeenCalledTimes(2);
    });
  });
});