import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AutonomousAgent } from '@/core/autonomous-agent';
import { ConfigManager } from '@/core/config-manager';
import { ProviderSimulator, ProviderFailoverSimulator } from '../utils/provider-simulator';
import { createIntegrationContext, cleanupIntegrationContext, createTestIssue } from '../utils/integration-helpers';
import type { IntegrationTestContext } from '../utils/integration-helpers';
import type { Issue } from '@/types/issue';

describe('Provider Failover Integration Tests', () => {
  let context: IntegrationTestContext;
  // let agent: AutonomousAgent;
  let configManager: ConfigManager;
  let claudeSimulator: ProviderSimulator;
  let geminiSimulator: ProviderSimulator;
  let failoverSimulator: ProviderFailoverSimulator;

  beforeEach(async () => {
    context = await createIntegrationContext();
    
    claudeSimulator = new ProviderSimulator({
      name: 'claude',
      responseDelay: 100
    });
    
    geminiSimulator = new ProviderSimulator({
      name: 'gemini',
      responseDelay: 150
    });
    
    failoverSimulator = new ProviderFailoverSimulator([claudeSimulator, geminiSimulator]);
    
    configManager = new ConfigManager(context.workspace.rootPath);
    await configManager.init();
    
    agent = new AutonomousAgent(configManager, context.workspace.rootPath);
  });

  afterEach(async () => {
    await cleanupIntegrationContext(context);
  });

  describe('Rate Limit Failover', () => {
    it('should failover from Claude to Gemini when rate limited', async () => {
      claudeSimulator = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 2
      });
      
      geminiSimulator = new ProviderSimulator({
        name: 'gemini'
      });
      
      failoverSimulator = new ProviderFailoverSimulator([claudeSimulator, geminiSimulator]);

      const prompts = [
        'First request',
        'Second request',
        'Third request - should trigger rate limit',
        'Fourth request - should use Gemini'
      ];

      const results = [];
      for (const prompt of prompts) {
        const result = await failoverSimulator.executeWithFailover(prompt);
        results.push(result);
      }

      expect(results[0].provider).toBe('claude');
      expect(results[1].provider).toBe('claude');
      expect(results[2].provider).toBe('gemini');
      expect(results[3].provider).toBe('gemini');

      const metrics = failoverSimulator.getProviderMetrics();
      expect(metrics.get('claude')!.isRateLimited).toBe(true);
      expect(metrics.get('gemini')!.isRateLimited).toBe(false);
    });

    it('should handle both providers being rate limited', async () => {
      claudeSimulator = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 1
      });
      
      geminiSimulator = new ProviderSimulator({
        name: 'gemini',
        rateLimitThreshold: 1
      });
      
      failoverSimulator = new ProviderFailoverSimulator([claudeSimulator, geminiSimulator]);

      await failoverSimulator.executeWithFailover('First request');
      await failoverSimulator.executeWithFailover('Second request');

      await expect(
        failoverSimulator.executeWithFailover('Third request')
      ).rejects.toThrow('All providers failed');

      const metrics = failoverSimulator.getProviderMetrics();
      expect(metrics.get('claude')!.isRateLimited).toBe(true);
      expect(metrics.get('gemini')!.isRateLimited).toBe(true);
    });

    it('should track failover attempts correctly', async () => {
      claudeSimulator = new ProviderSimulator({
        name: 'claude',
        errorRate: 1.0
      });
      
      geminiSimulator = new ProviderSimulator({
        name: 'gemini'
      });
      
      failoverSimulator = new ProviderFailoverSimulator([claudeSimulator, geminiSimulator]);

      const result = await failoverSimulator.executeWithFailover('Test prompt');
      
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
      claudeSimulator = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 1
      });
      
      geminiSimulator = new ProviderSimulator({
        name: 'gemini'
      });
      
      failoverSimulator = new ProviderFailoverSimulator([claudeSimulator, geminiSimulator]);

      await failoverSimulator.executeWithFailover('First request');
      
      const secondResult = await failoverSimulator.executeWithFailover('Second request');
      expect(secondResult.provider).toBe('gemini');

      claudeSimulator.resetRateLimit();

      const thirdResult = await failoverSimulator.executeWithFailover('Third request');
      expect(thirdResult.provider).toBe('gemini');

      failoverSimulator.reset();
      const fourthResult = await failoverSimulator.executeWithFailover('Fourth request');
      expect(fourthResult.provider).toBe('claude');
    });

    it('should handle intermittent failures with retry', async () => {
      let callCount = 0;
      claudeSimulator = new ProviderSimulator({
        name: 'claude'
      });
      
      claudeSimulator.execute = function(_prompt: string) {
        callCount++;
        if (callCount <= 2) {
          throw new Error('Temporary network error');
        }
        return `Success on attempt ${callCount}`;
      } as any;

      const result = await (async (): Promise<string> => {
        for (let i = 0; i < 3; i++) {
          try {
            return await claudeSimulator.execute('Test prompt');
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

      let stepCount = 0;
      claudeSimulator.setCustomResponse('Step 1: Create file', 'File created successfully');
      claudeSimulator.execute = function(this: ProviderSimulator, _prompt: string): string {
        stepCount++;
        if (stepCount === 2) {
          throw new Error('Provider failure');
        }
        return this.generateDefaultResponse(_prompt);
      }.bind(claudeSimulator) as any;

      geminiSimulator.setCustomResponse('Step 2: Update file', 'File updated successfully');
      geminiSimulator.setCustomResponse('Step 3: Add tests', 'Tests added successfully');

      failoverSimulator = new ProviderFailoverSimulator([claudeSimulator, geminiSimulator]);

      const results = [];
      for (const criteria of issue.acceptanceCriteria) {
        try {
          const result = await failoverSimulator.executeWithFailover(criteria);
          results.push(result);
        } catch (error) {
          const result = await failoverSimulator.executeWithFailover(criteria);
          results.push(result);
        }
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

      claudeSimulator = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 3
      });

      claudeSimulator.execute = async function(this: ProviderSimulator, _prompt: string): Promise<string> {
        const result = await ProviderSimulator.prototype.execute.call(this, _prompt);
        if (_prompt.includes('step')) {
          executionState.completedSteps.push(_prompt);
          executionState.currentStep = _prompt;
        }
        return result;
      } as any;

      geminiSimulator = new ProviderSimulator({
        name: 'gemini'
      });

      geminiSimulator.execute = async function(prompt: string) {
        const result = await ProviderSimulator.prototype.execute.call(this, prompt);
        if (prompt.includes('step')) {
          executionState.completedSteps.push(prompt);
          executionState.currentStep = prompt;
        }
        return result;
      } as any;

      failoverSimulator = new ProviderFailoverSimulator([claudeSimulator, geminiSimulator]);

      for (let i = 1; i <= 5; i++) {
        await failoverSimulator.executeWithFailover(`Execute step ${i}`);
      }

      expect(executionState.completedSteps).toHaveLength(5);
      expect(executionState.completedSteps[0]).toContain('step 1');
      expect(executionState.completedSteps[1]).toContain('step 2');
      expect(executionState.completedSteps[2]).toContain('step 3');
      expect(executionState.completedSteps[3]).toContain('step 4');
      expect(executionState.completedSteps[4]).toContain('step 5');

      const metrics = failoverSimulator.getProviderMetrics();
      expect(metrics.get('claude')!.successfulCalls).toBe(3);
      expect(metrics.get('gemini')!.successfulCalls).toBe(2);
    });
  });

  describe('Provider-Specific Error Handling', () => {
    it('should handle different error types appropriately', async () => {
      const errorTypes = [
        { error: new Error('Rate limit exceeded'), shouldFailover: true },
        { error: new Error('Invalid API key'), shouldFailover: false },
        { error: new Error('Network timeout'), shouldFailover: true },
        { error: new Error('Model not available'), shouldFailover: true }
      ];

      for (const { error, shouldFailover } of errorTypes) {
        claudeSimulator = new ProviderSimulator({ name: 'claude' });
        claudeSimulator.setCustomResponse('test', error);

        geminiSimulator = new ProviderSimulator({ name: 'gemini' });
        
        failoverSimulator = new ProviderFailoverSimulator([claudeSimulator, geminiSimulator]);

        if (shouldFailover) {
          const result = await failoverSimulator.executeWithFailover('test');
          expect(result.provider).toBe('gemini');
        } else {
          await expect(
            failoverSimulator.executeWithFailover('test')
          ).rejects.toThrow(error.message);
        }

        failoverSimulator.reset();
      }
    });

    it('should respect provider-specific retry policies', async () => {
      // const retryDelays = { claude: 1000, gemini: 2000 };
      
      claudeSimulator = new ProviderSimulator({
        name: 'claude',
        rateLimitThreshold: 1
      });

      geminiSimulator = new ProviderSimulator({
        name: 'gemini'
      });

      const startTime = Date.now();
      
      await failoverSimulator.executeWithFailover('First request');
      await failoverSimulator.executeWithFailover('Second request');

      const duration = Date.now() - startTime;
      
      expect(duration).toBeGreaterThanOrEqual(claudeSimulator['responseDelay'] * 2);
    });
  });
});