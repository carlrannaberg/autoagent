import { describe, it, expect } from 'vitest';
import { 
  createIssue, 
  createExecutionResult, 
  createConfiguration, 
  createTodoItem,
  TestWorkspace,
  createMockProvider,
  createMockFileSystem,
  createMockSpawn
} from './setup.js';

describe('Test Setup Utilities', () => {
  describe('Custom Matchers', () => {
    it('should validate successful execution', () => {
      const result = createExecutionResult({ success: true });
      expect(result).toBeSuccessfulExecution();
    });

    it('should validate failed execution', () => {
      const result = createExecutionResult({ 
        success: false, 
        error: new Error('Test error') 
      });
      expect(() => expect(result).toBeSuccessfulExecution()).toThrow();
    });

    it('should validate provider history', () => {
      const result = createExecutionResult({ 
        providerHistory: ['claude', 'gemini'] 
      });
      expect(result).toHaveProviderHistory(['claude', 'gemini']);
    });

    it('should validate issue structure', () => {
      const issue = createIssue();
      expect(issue).toBeValidIssue();
    });

    it('should find todo items', () => {
      const todos = [
        createTodoItem({ id: '1', content: 'First task' }),
        createTodoItem({ id: '2', content: 'Second task' })
      ];
      expect(todos).toContainTodoItem({ content: 'First task' });
    });
  });

  describe('Mock Providers', () => {
    it('should create successful mock provider', async () => {
      const provider = createMockProvider({
        name: 'test-provider',
        behavior: 'success',
        responses: ['Test response']
      });

      const result = await provider.execute('Test prompt');
      expect(result).toBe('Test response');
      expect(provider.execute).toHaveBeenCalledWith('Test prompt');
    });

    it('should create failing mock provider', async () => {
      const provider = createMockProvider({
        name: 'test-provider',
        behavior: 'failure',
        failAfter: 1
      });

      await expect(provider.execute('Test prompt')).rejects.toThrow('Provider test-provider failed');
    });
  });

  describe('Mock FileSystem', () => {
    it('should create mock filesystem with initial files', () => {
      const { fs } = createMockFileSystem({
        initialFiles: {
          '/test/file.txt': 'Hello World'
        }
      });

      const content = fs.readFileSync('/test/file.txt', 'utf-8');
      expect(content).toBe('Hello World');
    });
  });

  describe('Mock Process', () => {
    it('should create mock spawn with scenarios', async () => {
      const spawn = createMockSpawn({
        'npm test': { stdout: 'Tests passed!', exitCode: 0 }
      });

      const proc = spawn('npm', ['test']);
      
      await new Promise<void>((resolve) => {
        let output = '';
        proc.stdout?.on('data', (data: Buffer) => {
          output += data.toString();
        });
        proc.on('close', (code: number) => {
          expect(code).toBe(0);
          expect(output).toBe('Tests passed!');
          resolve();
        });
      });
    });
  });

  describe('TestWorkspace', () => {
    it('should create and setup workspace', async () => {
      const workspace = new TestWorkspace({ prefix: 'test-setup' });
      
      await workspace.setup({
        files: {
          'README.md': '# Test Project',
          'package.json': JSON.stringify({ name: 'test' }, null, 2)
        }
      });

      expect(await workspace.fileExists('README.md')).toBe(true);
      expect(await workspace.fileExists('package.json')).toBe(true);

      const readme = await workspace.readFile('README.md');
      expect(readme).toBe('# Test Project');

      await workspace.cleanup();
    });

    it('should create issues in workspace', async () => {
      const workspace = new TestWorkspace();
      await workspace.setup();

      const issue = createIssue({
        title: 'Test Issue',
        requirements: 'Test requirement'
      });

      await workspace.createIssue(1, issue);
      
      expect(await workspace.fileExists('issues/1-test-issue.md')).toBe(true);
      
      const content = await workspace.readFile('issues/1-test-issue.md');
      expect(content).toContain('# Issue 1: Test Issue');
      expect(content).toContain('Test requirement');

      await workspace.cleanup();
    });
  });

  describe('Test Factories', () => {
    it('should create valid test data', () => {
      const issue = createIssue();
      const result = createExecutionResult();
      const config = createConfiguration();
      const todo = createTodoItem();

      expect(issue.title).toBe('Test Issue');
      expect(result.success).toBe(true);
      expect(config.provider).toBe('claude');
      expect(todo.status).toBe('pending');
    });
  });
});