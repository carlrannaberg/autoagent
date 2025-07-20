/**
 * Helper utilities for STM test cleanup
 * 
 * When tests need to use real STMManager (e.g., integration tests),
 * they should:
 * 1. Always add 'autoagent-test-only' tag to tasks
 * 2. Use the cleanup function in afterAll
 */

import { execSync } from 'child_process';

/**
 * Adds test-specific tags to ensure safe cleanup
 */
export function addTestTags(tags: string[] = []): string[] {
  return ['autoagent-test-only', ...tags];
}

/**
 * Cleans up test tasks created during integration tests
 * ONLY deletes tasks with 'autoagent-test-only' tag
 */
export function cleanupTestTasks(): void {
  try {
    // Get all test tasks
    const output = execSync('stm list --tags autoagent-test-only -f json', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'] // Ignore stderr
    });
    
    if (!output.trim()) {
      return; // No tasks to clean up
    }
    
    const tasks = JSON.parse(output);
    if (!Array.isArray(tasks) || tasks.length === 0) {
      return;
    }
    
    // Delete each test task
    for (const task of tasks) {
      if (task.id) {
        try {
          execSync(`stm delete ${task.id}`, { stdio: 'ignore' });
        } catch (err) {
          // Ignore errors for individual task deletion
          console.warn(`Failed to delete test task ${task.id}`);
        }
      }
    }
  } catch (err) {
    // If STM is not available or list fails, just skip cleanup
    console.warn('STM test cleanup skipped:', err instanceof Error ? err.message : err);
  }
}

/**
 * Example usage in a test file:
 * 
 * import { cleanupTestTasks, addTestTags } from '../helpers/stm-test-cleanup';
 * 
 * describe('Integration Test with Real STM', () => {
 *   afterAll(() => {
 *     cleanupTestTasks();
 *   });
 * 
 *   it('should create a task', async () => {
 *     const stmManager = new STMManager();
 *     await stmManager.createTask('Test Task', {
 *       description: 'Test description',
 *       tags: addTestTags(['feature', 'test'])
 *     });
 *   });
 * });
 */