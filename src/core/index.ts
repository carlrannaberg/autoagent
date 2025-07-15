export { ConfigManager } from './config-manager';
export { AutonomousAgent } from './autonomous-agent';
export { ProviderLearning } from './provider-learning';
export { 
  DEFAULT_REFLECTION_CONFIG, 
  validateReflectionConfig, 
  mergeReflectionConfig 
} from './reflection-defaults';
export { 
  DefaultImprovementApplier, 
  applyImprovements,
  type ImprovementApplier,
  type ApplicationResult,
  type BackupInfo
} from './improvement-applier';
export { HookManager } from './hook-manager';