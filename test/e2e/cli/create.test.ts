import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('autoagent create', () => {
  const context = setupE2ETest();

  it('should create a new task with detailed specification', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();

    const result = await context.cli.execute([
      'create',
      '--title',
      'Test Issue',
      '--description',
      'Implement a new feature',
      '--acceptance',
      'Task 1 is completed',
      '--acceptance',
      'Task 2 is completed',
      '--details',
      'Simple feature implementation'
    ]);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    // Verify task was created by listing tasks
    const listResult = await context.cli.execute(['list', 'tasks']);
    expect(listResult.exitCode).toBe(0);
    expect(listResult.stdout).toContain('Test Issue');
    expect(listResult.stdout).toContain('pending');
    
    // Verify STM directory structure exists
    const stmFiles = await context.workspace.listFiles('.autoagent');
    expect(stmFiles).toContain('stm-tasks');
  });

  it('should create task with command line arguments', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();

    const result = await context.cli.execute([
      'create',
      '--title',
      'CLI Test Issue',
      '--description',
      'Test task creation from CLI'
    ]);

    expect(result.exitCode).toBe(0);
    expect(OutputParser.containsSuccess(result.stdout)).toBe(true);

    // Verify task was created using list command
    const listResult = await context.cli.execute(['list', 'tasks']);
    expect(listResult.exitCode).toBe(0);
    expect(listResult.stdout).toContain('CLI Test Issue');
    expect(listResult.stdout).toContain('pending');
  });

  it('should validate task title requirement', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();

    const result = await context.cli.execute(['create']);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('required');
  });

  it('should generate unique task IDs', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();

    await context.cli.execute([
      'create',
      '--title',
      'Duplicate Task',
      '--description',
      'First task with this title'
    ]);

    const result = await context.cli.execute([
      'create',
      '--title',
      'Duplicate Task',
      '--description',
      'Second task with same title'
    ]);

    expect(result.exitCode).toBe(0);

    // Verify both tasks exist with unique IDs
    const listResult = await context.cli.execute(['list', 'tasks']);
    expect(listResult.exitCode).toBe(0);
    expect(listResult.stdout).toContain('Found 2 task');
    
    // Both tasks should be listed, likely with IDs 1 and 2
    expect(listResult.stdout).toContain('Duplicate Task');
  });

  it('should support complex task creation with all fields', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();

    const result = await context.cli.execute([
      'create',
      '--title',
      'Bug Report Task',
      '--description',
      'Fix critical bug in authentication system',
      '--acceptance',
      'Bug is fixed and tests pass',
      '--acceptance',
      'No regression in existing functionality',
      '--details',
      'Users cannot log in due to session token expiration handling',
      '--plan',
      'Phase 1: Investigate issue, Phase 2: Implement fix, Phase 3: Test',
      '--testing',
      'Unit tests for token handling, integration tests for login flow'
    ]);

    expect(result.exitCode).toBe(0);

    // Verify comprehensive task content via list command
    const listResult = await context.cli.execute(['list', 'tasks']);
    expect(listResult.exitCode).toBe(0);
    expect(listResult.stdout).toContain('Bug Report Task');
  });

  it('should create tasks in STM directory structure', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();

    await context.cli.execute([
      'create',
      '--title',
      'Directory Structure Test',
      '--description',
      'Test task for verifying STM structure'
    ]);

    // Verify .autoagent/stm-tasks directory exists
    const autoagentFiles = await context.workspace.listFiles('.autoagent');
    expect(autoagentFiles).toContain('stm-tasks');
    
    // Verify task exists in STM
    const listResult = await context.cli.execute(['list', 'tasks']);
    expect(listResult.exitCode).toBe(0);
    expect(listResult.stdout).toContain('Directory Structure Test');
  });
});