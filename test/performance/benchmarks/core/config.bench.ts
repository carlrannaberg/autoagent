import { describe, bench, beforeAll } from 'vitest';
import { loadConfig, mergeConfigs, validateConfig } from '~/utils/config';
import { createBenchmark } from '../utils/benchmark.utils';
import { createTempDir, createMockConfig } from '../../test-helpers';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('Configuration Performance Benchmarks', () => {
  let tempDir: string;
  let configPath: string;
  let largeConfig: any;

  beforeAll(async () => {
    tempDir = await createTempDir();
    configPath = path.join(tempDir, '.autoagent.json');
    
    largeConfig = {
      providers: {
        primary: 'claude',
        fallback: 'gemini',
        retryLimit: 5,
        retryDelay: 2000
      },
      execution: {
        timeout: 600000,
        maxConcurrent: 3,
        dryRun: false
      },
      git: {
        enabled: true,
        autoPush: false,
        remote: 'origin',
        branch: 'main'
      },
      logging: {
        level: 'info',
        format: 'json',
        file: 'autoagent.log'
      },
      cache: {
        enabled: true,
        ttl: 3600,
        maxSize: 100
      },
      customData: Array.from({ length: 100 }, (_, i) => ({
        id: i,
        value: `data-${i}`,
        nested: {
          prop1: `prop1-${i}`,
          prop2: `prop2-${i}`,
          prop3: `prop3-${i}`
        }
      }))
    };
    
    await fs.writeFile(configPath, JSON.stringify(largeConfig, null, 2));
  });

  describe('Config Loading', () => {
    bench('load config from file', async () => {
      await loadConfig(tempDir);
    });

    bench('load config with defaults', async () => {
      await loadConfig('/non/existent/path');
    });

    createBenchmark(
      'load large config',
      async () => {
        await loadConfig(tempDir);
      },
      { iterations: 100 }
    );
  });

  describe('Config Merging', () => {
    bench('merge two configs', () => {
      const config1 = createMockConfig();
      const config2 = createMockConfig({ providers: { primary: 'gemini' } });
      mergeConfigs(config1, config2);
    });

    bench('merge multiple configs', () => {
      const configs = Array.from({ length: 10 }, () => createMockConfig());
      configs.reduce((acc, config) => mergeConfigs(acc, config));
    });

    bench('deep merge nested configs', () => {
      const config1 = {
        level1: {
          level2: {
            level3: {
              value: 'original'
            }
          }
        }
      };
      const config2 = {
        level1: {
          level2: {
            level3: {
              value: 'updated',
              newProp: 'added'
            }
          }
        }
      };
      mergeConfigs(config1, config2);
    });
  });

  describe('Config Validation', () => {
    bench('validate valid config', () => {
      const config = createMockConfig();
      validateConfig(config);
    });

    bench('validate complex config', () => {
      validateConfig(largeConfig);
    });

    createBenchmark(
      'validate config 1000 times',
      () => {
        const config = createMockConfig();
        for (let i = 0; i < 1000; i++) {
          validateConfig(config);
        }
      },
      { iterations: 10 }
    );
  });

  describe('Config Serialization', () => {
    bench('stringify config', () => {
      JSON.stringify(largeConfig);
    });

    bench('parse config string', () => {
      const configStr = JSON.stringify(largeConfig);
      JSON.parse(configStr);
    });

    bench('pretty print config', () => {
      JSON.stringify(largeConfig, null, 2);
    });
  });
});