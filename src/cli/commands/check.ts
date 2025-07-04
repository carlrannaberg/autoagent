import { Command } from 'commander';
import { createProvider } from '../../providers';
import { Logger } from '../../utils/logger';
import { ProviderName } from '../../types';

export function registerCheckCommand(program: Command): void {
  program
    .command('check')
    .description('Check provider availability')
    .option('-p, --provider <provider>', 'AI provider to check')
    .action(async (options: { provider?: string }) => {
      try {
        if (options.provider !== undefined && options.provider !== '') {
          const provider = createProvider(options.provider as ProviderName);
          const available = await provider.checkAvailability();

          Logger.info(`\n🔍 Checking ${provider.name} CLI...\n`);
          
          if (available) {
            Logger.success(`${provider.name} CLI is installed`);
          } else {
            Logger.error(`${provider.name} CLI is not installed`);
            Logger.newline();
            Logger.info(`💡 To install ${provider.name} CLI:`);
            if (provider.name === 'claude') {
              Logger.info('   Visit: https://claude.ai/code');
            } else {
              Logger.info('   Visit: https://ai.google.dev/gemini-api/docs/quickstart');
            }
          }
        } else {
          const providers = ['claude', 'gemini'];
          Logger.info('\n🔍 Checking provider CLI tools...\n');

          let anyAvailable = false;
          for (const providerName of providers) {
            const provider = createProvider(providerName as 'claude' | 'gemini');
            const available = await provider.checkAvailability();

            if (available) {
              Logger.success(`${provider.name} CLI is installed`);
              anyAvailable = true;
            } else {
              Logger.error(`${provider.name} CLI is not installed`);
            }
          }

          if (!anyAvailable) {
            Logger.newline();
            Logger.info('💡 To install provider CLIs:');
            Logger.info('   Claude: https://claude.ai/code');
            Logger.info('   Gemini: https://ai.google.dev/gemini-api/docs/quickstart');
          }
        }
      } catch (error) {
        Logger.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    });
}