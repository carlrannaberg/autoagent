import { describe, it, expect } from 'vitest';
import { setupE2ETest } from '../helpers/setup';
import { OutputParser } from '../helpers/output-parser';

describe('autoagent list', () => {
  const context = setupE2ETest();

  it('should list all tasks', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();
    
    // Create tasks using CLI
    await context.cli.execute([
      'create',
      '--title',
      'task-1',
      '--description',
      'First test task'
    ]);
    
    await context.cli.execute([
      'create',
      '--title',
      'task-2',
      '--description',
      'Second test task'
    ]);
    
    await context.cli.execute([
      'create',
      '--title',
      'task-3',
      '--description',
      'Third test task'
    ]);

    const result = await context.cli.execute(['list', 'tasks']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('task-1');
    expect(result.stdout).toContain('task-2');
    expect(result.stdout).toContain('task-3');
    expect(result.stdout).toContain('pending');
  });

  it('should filter tasks by status', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();
    
    // Create a pending task
    await context.cli.execute([
      'create',
      '--title',
      'pending-task',
      '--description',
      'A pending task'
    ]);

    // Create a completed task by executing it with mock provider
    await context.cli.execute([
      'create',
      '--title',
      'completed-task',
      '--description',
      'A task to be completed'
    ]);
    
    // Execute the second task to mark it complete
    context.cli.setEnv('AUTOAGENT_MOCK_PROVIDER', 'true');
    await context.cli.execute(['run', '2']);

    const result = await context.cli.execute(['list', 'tasks', '--status', 'done']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('completed-task');
    expect(result.stdout).not.toContain('pending-task');
  });

  it('should list providers', async () => {
    await context.workspace.initGit();

    const result = await context.cli.execute(['list', 'providers']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('claude');
    expect(result.stdout).toContain('gemini');
  });

  it('should show empty list gracefully', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();

    const result = await context.cli.execute(['list', 'tasks']);

    // Debug output to see what the actual error is
    if (result.exitCode !== 0) {
      console.log('Exit Code:', result.exitCode);
      console.log('Stdout:', result.stdout);
      console.log('Stderr:', result.stderr);
    }

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('No tasks found');
  });

  it('should support JSON output format', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();
    
    await context.cli.execute([
      'create',
      '--title',
      'json-test',
      '--description',
      'Task for JSON output testing'
    ]);

    const result = await context.cli.execute(['list', 'tasks', '--json']);

    expect(result.exitCode).toBe(0);
    const data = OutputParser.extractJsonOutput(result.stdout);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0]).toHaveProperty('id', '1');
    expect(data[0]).toHaveProperty('title', 'json-test');
    expect(data[0]).toHaveProperty('status', 'pending');
  });

  it('should verify STM tasks directory is created', async () => {
    await context.workspace.initGit();
    await context.workspace.initializeSTM();
    
    // Create a task which should initialize STM
    await context.cli.execute([
      'create',
      '--title',
      'directory-test',
      '--description',
      'Task for testing STM directory creation'
    ]);

    // Verify the STM tasks directory exists
    const files = await context.workspace.listFiles('.autoagent');
    expect(files).toContain('stm-tasks');
  });
});