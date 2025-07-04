import { describe, bench } from 'vitest';
import { retry, retryWithJitter, isRateLimitError } from '../../../../src/utils/retry';
import { createBenchmark } from './benchmark.utils';

describe('Retry Utility Performance Benchmarks', () => {
  describe('Retry Logic', () => {
    bench('successful operation (no retry)', async () => {
      await retry(
        async () => 'success',
        { retries: 3, minTimeout: 100 }
      );
    });

    bench('operation with 1 retry', async () => {
      let attempt = 0;
      await retry(
        async () => {
          if (++attempt < 2) {
            throw new Error('Temporary failure');
          }
          return 'success';
        },
        { retries: 3, minTimeout: 10 }
      );
    });

    bench('operation with 2 retries', async () => {
      let attempt = 0;
      await retry(
        async () => {
          if (++attempt < 3) {
            throw new Error('Temporary failure');
          }
          return 'success';
        },
        { retries: 3, minTimeout: 10 }
      );
    });

    createBenchmark(
      'retry with jitter (100 operations)',
      async () => {
        const promises = [];
        for (let i = 0; i < 100; i++) {
          promises.push(
            retryWithJitter(
              async () => 'success',
              { retries: 1, minTimeout: 1 }
            )
          );
        }
        await Promise.all(promises);
      },
      { iterations: 10 }
    );
  });

  describe('Error Detection', () => {
    bench('check rate limit error (positive)', () => {
      const error = new Error('Rate limit exceeded');
      isRateLimitError(error);
    });

    bench('check rate limit error (negative)', () => {
      const error = new Error('Network timeout');
      isRateLimitError(error);
    });

    bench('check various error types', () => {
      const errors = [
        new Error('Rate limit exceeded'),
        new Error('429 Too Many Requests'),
        new Error('Network error'),
        new Error('rate_limit_error'),
        new Error('Unknown error'),
        new Error('You are being rate limited'),
        new Error('Server error 500')
      ];
      
      errors.forEach(error => isRateLimitError(error));
    });

    createBenchmark(
      'error checking 1000 times',
      () => {
        const error = new Error('Some error message');
        for (let i = 0; i < 1000; i++) {
          isRateLimitError(error);
        }
      },
      { iterations: 100 }
    );
  });

  describe('Exponential Backoff Calculation', () => {
    bench('calculate backoff delays', () => {
      const baseDelay = 100;
      const delays = [];
      for (let i = 0; i < 10; i++) {
        delays.push(baseDelay * Math.pow(2, i));
      }
      return delays;
    });

    bench('calculate jittered delays', () => {
      const baseDelay = 100;
      const delays = [];
      for (let i = 0; i < 10; i++) {
        const delay = baseDelay * Math.pow(2, i);
        const jitter = delay * 0.1 * Math.random();
        delays.push(delay + jitter);
      }
      return delays;
    });
  });
});