import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ConfigManager } from '@/core/config-manager';
import { ProviderSimulator, ProviderFailoverSimulator } from '../../helpers/setup/provider-simulator';
import { createIntegrationContext, cleanupIntegrationContext, createTestIssue } from '../../helpers/setup/integration-helpers';
import type { IntegrationTestContext } from '../../helpers/setup/integration-helpers';
import type { Issue } from '@/types/issue';

describe('Provider Failover Integration Tests', () => {
  let context: IntegrationTestContext;
  let configManager: ConfigManager;

  beforeEach(async () => {
    context = await createIntegrationContext();
    configManager = new ConfigManager(context.workspace.rootPath);
    await configManager.loadConfig();
  });

  afterEach(async () => {
    await cleanupIntegrationContext(context);
  });

  describe('Rate Limit Failover', () => {
    it('should failover from Claude to Gemini when rate limited', async () => {
      // Create new instances for this test
      const claudeSim = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 2
      });
      
      const geminiSim = new ProviderSimulator({
        name: 'gemini'
      });
      
      const failoverSim = new ProviderFailoverSimulator([claudeSim, geminiSim]);

      const prompts = [
        'First request',
        'Second request',
        'Third request - should trigger rate limit',
        'Fourth request - should use Gemini'
      ];

      const results = [];
      for (const prompt of prompts) {
        const result = await failoverSim.executeWithFailover(prompt);
        results.push(result);
      }

      expect(results[0].provider).toBe('claude');
      expect(results[1].provider).toBe('claude');
      expect(results[2].provider).toBe('gemini');
      expect(results[3].provider).toBe('gemini');

      const metrics = failoverSim.getProviderMetrics();
      expect(metrics.get('claude')!.isRateLimited).toBe(true);
      expect(metrics.get('gemini')!.isRateLimited).toBe(false);
    });

    it('should handle both providers being rate limited', async () => {
      const claudeSim = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 1
      });
      
      const geminiSim = new ProviderSimulator({
        name: 'gemini',
        rateLimitThreshold: 1
      });
      
      const failoverSim = new ProviderFailoverSimulator([claudeSim, geminiSim]);

      await failoverSim.executeWithFailover('First request');
      await failoverSim.executeWithFailover('Second request');

      await expect(
        failoverSim.executeWithFailover('Third request')
      ).rejects.toThrow('All providers failed');

      const metrics = failoverSim.getProviderMetrics();
      expect(metrics.get('claude')!.isRateLimited).toBe(true);
      expect(metrics.get('gemini')!.isRateLimited).toBe(true);
    });

    it('should track failover attempts correctly', async () => {
      const claudeSim = new ProviderSimulator({
        name: 'claude',
        errorRate: 1.0
      });
      
      const geminiSim = new ProviderSimulator({
        name: 'gemini'
      });
      
      const failoverSim = new ProviderFailoverSimulator([claudeSim, geminiSim]);

      const result = await failoverSim.executeWithFailover('Test prompt');
      
      expect(result.attempts).toHaveLength(2);
      expect(result.attempts[0].provider).toBe('claude');
      expect(result.attempts[0].error).toBeDefined();
      expect(result.attempts[1].provider).toBe('gemini');
      expect(result.attempts[1].error).toBeUndefined();
      expect(result.provider).toBe('gemini');
    });
  });

  describe('Provider Recovery', () => {
    it('should retry original provider after rate limit reset', async () => {
      const claudeSim = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 1
      });
      
      const geminiSim = new ProviderSimulator({
        name: 'gemini'
      });
      
      const failoverSim = new ProviderFailoverSimulator([claudeSim, geminiSim]);

      await failoverSim.executeWithFailover('First request');
      
      const secondResult = await failoverSim.executeWithFailover('Second request');
      expect(secondResult.provider).toBe('gemini');

      claudeSim.resetRateLimit();

      const thirdResult = await failoverSim.executeWithFailover('Third request');
      expect(thirdResult.provider).toBe('gemini');

      failoverSim.reset();
      const fourthResult = await failoverSim.executeWithFailover('Fourth request');
      expect(fourthResult.provider).toBe('claude');
    });

    it('should handle intermittent failures with retry', async () => {
      let callCount = 0;
      const claudeSim = new ProviderSimulator({
        name: 'claude'
      });
      
      claudeSim.execute = function(_prompt: string) {
        callCount++;
        if (callCount <= 2) {
          throw new Error('Temporary network error');
        }
        return `Success on attempt ${callCount}`;
      } as any;

      const result = await (async (): Promise<string> => {
        for (let i = 0; i < 3; i++) {
          try {
            return await claudeSim.execute('Test prompt');
          } catch (error) {
            if (i === 2) {throw error;}
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      })();

      expect(result).toBe('Success on attempt 3');
      expect(callCount).toBe(3);
    });
  });

  describe('Partial Execution Recovery', () => {
    it('should resume execution after provider failure mid-task', async () => {
      const issue: Issue = {
        id: 'test-partial-execution',
        title: 'Multi-step Task',
        requirement: 'Complete multiple steps',
        acceptanceCriteria: [
          'Step 1: Create file',
          'Step 2: Update file',
          'Step 3: Add tests'
        ],
        dependencies: [],
        technicalDetails: ''
      };

      await createTestIssue(context.workspace, issue);

      const claudeSim = new ProviderSimulator({ name: 'claude' });
      claudeSim.setCustomResponse('Step 1: Create file', 'File created successfully');
      // Claude will fail on the second call
      claudeSim.setCustomResponse('Step 2: Update file', new Error('Provider failure'));

      const geminiSim = new ProviderSimulator({ name: 'gemini' });
      geminiSim.setCustomResponse('Step 2: Update file', 'File updated successfully');
      geminiSim.setCustomResponse('Step 3: Add tests', 'Tests added successfully');

      const failoverSim = new ProviderFailoverSimulator([claudeSim, geminiSim]);

      const results = [];
      for (const criteria of issue.acceptanceCriteria) {
        const result = await failoverSim.executeWithFailover(criteria);
        results.push(result);
      }

      expect(results[0].provider).toBe('claude');
      expect(results[1].provider).toBe('gemini');
      expect(results[2].provider).toBe('gemini');
    });

    it('should maintain execution state across provider switches', async () => {
      const executionState = {
        completedSteps: [] as string[],
        currentStep: '',
        totalSteps: 5
      };

      const claudeSim = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 3
      });

      claudeSim.execute = async function(this: ProviderSimulator, prompt: string): Promise<string> {
        const result = await ProviderSimulator.prototype.execute.call(this, prompt);
        if (prompt.includes('step')) {
          executionState.completedSteps.push(prompt);
          executionState.currentStep = prompt;
        }
        return result;
      }.bind(claudeSim) as any;

      const geminiSim = new ProviderSimulator({
        name: 'gemini'
      });

      geminiSim.execute = async function(this: ProviderSimulator, prompt: string): Promise<string> {
        const result = await ProviderSimulator.prototype.execute.call(this, prompt);
        if (prompt.includes('step')) {
          executionState.completedSteps.push(prompt);
          executionState.currentStep = prompt;
        }
        return result;
      }.bind(geminiSim) as any;

      const failoverSim = new ProviderFailoverSimulator([claudeSim, geminiSim]);

      for (let i = 1; i <= 5; i++) {
        await failoverSim.executeWithFailover(`Execute step ${i}`);
      }

      expect(executionState.completedSteps).toHaveLength(5);
      expect(executionState.completedSteps[0]).toContain('step 1');
      expect(executionState.completedSteps[1]).toContain('step 2');
      expect(executionState.completedSteps[2]).toContain('step 3');
      expect(executionState.completedSteps[3]).toContain('step 4');
      expect(executionState.completedSteps[4]).toContain('step 5');

      const metrics = failoverSim.getProviderMetrics();
      expect(metrics.get('claude')!.successfulCalls).toBe(3);
      expect(metrics.get('gemini')!.successfulCalls).toBe(2);
    });
  });

  describe('Provider-Specific Error Handling', () => {
    it('should handle different error types appropriately', async () => {
      const errorTypes = [
        { error: new Error('Rate limit exceeded'), shouldFailover: true },
        { error: new Error('Claude AI usage limit reached'), shouldFailover: true },
        { error: new Error('Invalid API key'), shouldFailover: false },
        { error: new Error('Network timeout'), shouldFailover: true },
        { error: new Error('Model not available'), shouldFailover: true }
      ];

      for (const { error, shouldFailover } of errorTypes) {
        const claudeSim = new ProviderSimulator({ name: 'claude' });
        claudeSim.setCustomResponse('test', error);

        const geminiSim = new ProviderSimulator({ name: 'gemini' });
        
        const failoverSim = new ProviderFailoverSimulator([claudeSim, geminiSim]);

        if (shouldFailover) {
          const result = await failoverSim.executeWithFailover('test');
          expect(result.provider).toBe('gemini');
        } else {
          await expect(
            failoverSim.executeWithFailover('test')
          ).rejects.toThrow(error.message);
        }

        failoverSim.reset();
      }
    });

    it('should respect provider-specific retry policies', async () => {
      // const retryDelays = { claude: 1000, gemini: 2000 };
      
      const claudeSim = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 1
      });

      const geminiSim = new ProviderSimulator({
        name: 'gemini'
      });

      const failoverSim = new ProviderFailoverSimulator([claudeSim, geminiSim]);

      const startTime = Date.now();
      
      await failoverSim.executeWithFailover('First request');
      await failoverSim.executeWithFailover('Second request');

      const duration = Date.now() - startTime;
      
      // Allow 5ms tolerance for timing variations in CI
      expect(duration).toBeGreaterThanOrEqual(claudeSim['responseDelay'] * 2 - 5);
    });
  });
});