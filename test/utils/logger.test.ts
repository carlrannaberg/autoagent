import { Logger } from '../../src/utils/logger';

// Mock chalk to remove colors in tests
jest.mock('chalk', () => ({
  green: jest.fn((text) => `[GREEN]${text}[/GREEN]`),
  red: jest.fn((text) => `[RED]${text}[/RED]`),
  yellow: jest.fn((text) => `[YELLOW]${text}[/YELLOW]`),
  blue: jest.fn((text) => `[BLUE]${text}[/BLUE]`),
  gray: jest.fn((text) => `[GRAY]${text}[/GRAY]`),
  cyan: jest.fn((text) => `[CYAN]${text}[/CYAN]`),
  bold: {
    green: jest.fn((text) => `[BOLD-GREEN]${text}[/BOLD-GREEN]`),
    red: jest.fn((text) => `[BOLD-RED]${text}[/BOLD-RED]`),
    yellow: jest.fn((text) => `[BOLD-YELLOW]${text}[/BOLD-YELLOW]`),
    blue: jest.fn((text) => `[BOLD-BLUE]${text}[/BOLD-BLUE]`),
  }
}));

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let processStdoutWriteSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    processStdoutWriteSpy = jest.spyOn(process.stdout, 'write').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    processStdoutWriteSpy.mockRestore();
  });

  describe('log levels', () => {
    it('should log info messages', () => {
      Logger.info('Info message');
      expect(consoleLogSpy).toHaveBeenCalledWith('[BLUE]Info message[/BLUE]');
    });

    it('should log success messages', () => {
      Logger.success('Success message');
      expect(consoleLogSpy).toHaveBeenCalledWith('[GREEN]✓ Success message[/GREEN]');
    });

    it('should log error messages', () => {
      Logger.error('Error message');
      expect(consoleErrorSpy).toHaveBeenCalledWith('[RED]✗ Error message[/RED]');
    });

    it('should log warning messages', () => {
      Logger.warning('Warning message');
      expect(consoleLogSpy).toHaveBeenCalledWith('[YELLOW]⚠ Warning message[/YELLOW]');
    });

    it('should log debug messages when enabled', () => {
      Logger.setDebugEnabled(true);
      Logger.debug('Debug message');
      expect(consoleLogSpy).toHaveBeenCalledWith('[GRAY][DEBUG] Debug message[/GRAY]');
      Logger.setDebugEnabled(false);
    });

    it('should not log debug messages when disabled', () => {
      Logger.setDebugEnabled(false);
      Logger.debug('Debug message');
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log debug messages with option override', () => {
      Logger.setDebugEnabled(false);
      Logger.debug('Debug message', { debugEnabled: true });
      expect(consoleLogSpy).toHaveBeenCalledWith('[GRAY][DEBUG] Debug message[/GRAY]');
    });
  });

  describe('error handling', () => {
    it('should handle Error objects', () => {
      const error = new Error('Test error');
      Logger.error(error);
      expect(consoleErrorSpy).toHaveBeenCalledWith('[RED]✗ Test error[/RED]');
    });

    it('should show stack trace in debug mode', () => {
      const error = new Error('Test error');
      error.stack = 'Error: Test error\n    at test.js:10';
      Logger.setDebugEnabled(true);
      Logger.error(error);
      expect(consoleErrorSpy).toHaveBeenCalledWith('[RED]✗ Test error[/RED]');
      expect(consoleErrorSpy).toHaveBeenCalledWith('[GRAY]Error: Test error\n    at test.js:10[/GRAY]');
      Logger.setDebugEnabled(false);
    });
  });

  describe('formatting options', () => {
    it('should support message prefix', () => {
      Logger.info('Message', { prefix: 'TEST' });
      expect(consoleLogSpy).toHaveBeenCalledWith('[BLUE][TEST] Message[/BLUE]');
    });

    it('should support timestamps', () => {
      const mockDate = new Date('2023-01-01T12:00:00Z');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

      Logger.info('Message', { timestamp: true });
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[BLUE][2023-01-01T12:00:00.000Z] Message[/BLUE]'));

      jest.restoreAllMocks();
    });
  });

  describe('progress bar', () => {
    it('should display progress bar', () => {
      Logger.progress('Loading', 50, 100);
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('50% - Loading'));
    });

    it('should handle 0% progress', () => {
      Logger.progress('Starting', 0, 100);
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('0% - Starting'));
    });

    it('should handle 100% progress', () => {
      Logger.progress('Complete', 100, 100);
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('100% - Complete'));
    });

    it('should calculate percentage correctly', () => {
      Logger.progress('Half', 1, 2);
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('50% - Half'));
    });
  });

  describe('utility methods', () => {
    it('should clear screen', () => {
      Logger.clear();
      expect(processStdoutWriteSpy).toHaveBeenCalledWith('\x1Bc');
    });

    it('should add newline', () => {
      Logger.newline();
      expect(consoleLogSpy).toHaveBeenCalledWith();
    });
  });

  describe('global options', () => {
    it('should apply default options', () => {
      Logger.setDefaultOptions({ prefix: 'APP' });
      Logger.info('Message');
      expect(consoleLogSpy).toHaveBeenCalledWith('[BLUE][APP] Message[/BLUE]');
      // Reset
      Logger.setDefaultOptions({});
    });
  });
});