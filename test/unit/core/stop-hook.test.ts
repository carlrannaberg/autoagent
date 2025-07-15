import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AutonomousAgent } from '../../../src/core/autonomous-agent';
import { HookManager } from '../../../src/core/hook-manager';
import { SessionManager } from '../../../src/core/session-manager';

describe('Stop Hook', () => {
  let agent: AutonomousAgent;
  let hookManager: HookManager;

  beforeEach(() => {
    agent = new AutonomousAgent({ workspace: '/test' });
    const sessionManager = new SessionManager();
    const session = sessionManager.createSession('/test');
    hookManager = new HookManager({}, session.id, '/test');
    (agent as any).hookManager = hookManager;
    (agent as any).currentSession = session;
  });

  it('should execute the stop hook on successful completion', async () => {
    const executeHooksSpy = vi.spyOn(hookManager, 'executeHooks').mockResolvedValue({ blocked: false });
    await agent.executeStopHook('completed');
    expect(executeHooksSpy).toHaveBeenCalledWith('Stop', expect.any(Object));
  });

  it('should block termination if the stop hook blocks', async () => {
    const executeHooksSpy = vi.spyOn(hookManager, 'executeHooks').mockResolvedValue({ blocked: true, reason: 'Incomplete tasks' });
    await expect(agent.executeStopHook('completed')).rejects.toThrow('Stop hook blocked termination: Incomplete tasks');
    expect(executeHooksSpy).toHaveBeenCalledWith('Stop', expect.any(Object));
  });
});
