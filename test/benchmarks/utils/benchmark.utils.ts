import { bench } from 'vitest';

export interface BenchmarkOptions {
  iterations?: number;
  time?: number;
  warmup?: number;
}

export interface MemoryUsage {
  heapUsed: number;
  heapTotal: number;
  external: number;
  rss: number;
}

export function createBenchmark(
  name: string,
  fn: () => void | Promise<void>,
  options: BenchmarkOptions = {}
): void {
  const defaultOptions = {
    iterations: 100,
    time: 2000,
    warmup: 10,
    ...options
  };

  bench(name, fn, defaultOptions);
}

export function measureMemory(): MemoryUsage {
  if (global.gc) {
    global.gc();
  }
  
  const usage = process.memoryUsage();
  return {
    heapUsed: usage.heapUsed,
    heapTotal: usage.heapTotal,
    external: usage.external,
    rss: usage.rss
  };
}

export function formatMemory(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  return `${mb.toFixed(2)} MB`;
}

export async function withMemoryTracking<T>(
  name: string,
  fn: () => T | Promise<T>
): Promise<{ result: T; memoryDelta: MemoryUsage }> {
  const startMemory = measureMemory();
  const result = await fn();
  const endMemory = measureMemory();
  
  const memoryDelta = {
    heapUsed: endMemory.heapUsed - startMemory.heapUsed,
    heapTotal: endMemory.heapTotal - startMemory.heapTotal,
    external: endMemory.external - startMemory.external,
    rss: endMemory.rss - startMemory.rss
  };

  return { result, memoryDelta };
}

export class BenchmarkTimer {
  private startTime: bigint;
  private marks: Map<string, bigint> = new Map();

  constructor() {
    this.startTime = process.hrtime.bigint();
  }

  mark(name: string): void {
    this.marks.set(name, process.hrtime.bigint());
  }

  getMark(name: string): number {
    const mark = this.marks.get(name);
    if (mark === undefined) {
      throw new Error(`Mark "${name}" not found`);
    }
    return Number(mark - this.startTime) / 1_000_000;
  }

  getElapsed(): number {
    return Number(process.hrtime.bigint() - this.startTime) / 1_000_000;
  }

  reset(): void {
    this.startTime = process.hrtime.bigint();
    this.marks.clear();
  }
}