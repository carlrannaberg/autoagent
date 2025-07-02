import { bench } from 'vitest';
import { calculateStatistics, StatisticalSummary } from './statistics';

export interface BenchmarkOptions {
  iterations?: number;
  time?: number;
  warmup?: number;
  collectSamples?: boolean;
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
  private samples: number[] = [];

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
    const elapsed = Number(process.hrtime.bigint() - this.startTime) / 1_000_000;
    this.samples.push(elapsed);
    return elapsed;
  }

  getStatistics(): StatisticalSummary | null {
    if (this.samples.length === 0) {
      return null;
    }
    return calculateStatistics(this.samples);
  }

  getSamples(): number[] {
    return [...this.samples];
  }

  reset(): void {
    this.startTime = process.hrtime.bigint();
    this.marks.clear();
    this.samples = [];
  }
}

export interface EnhancedBenchmarkResult {
  name: string;
  iterations: number;
  totalTime: number;
  averageTime: number;
  throughput: number;
  statistics: StatisticalSummary;
  memoryUsage?: MemoryUsage;
}

export class EnhancedBenchmark {
  private timer: BenchmarkTimer;
  private samples: number[] = [];
  private memorySnapshots: MemoryUsage[] = [];

  constructor(private name: string) {
    this.timer = new BenchmarkTimer();
  }

  async run(
    fn: () => void | Promise<void>,
    options: BenchmarkOptions = {}
  ): Promise<EnhancedBenchmarkResult> {
    const { iterations = 100, warmup = 10, collectSamples = true } = options;
    
    // Warmup phase
    for (let i = 0; i < warmup; i++) {
      await fn();
    }

    // Measurement phase
    this.timer.reset();
    const startTime = process.hrtime.bigint();
    
    for (let i = 0; i < iterations; i++) {
      if (collectSamples) {
        const iterStart = process.hrtime.bigint();
        const memStart = measureMemory();
        
        await fn();
        
        const iterEnd = process.hrtime.bigint();
        const memEnd = measureMemory();
        
        const iterTime = Number(iterEnd - iterStart) / 1_000_000;
        this.samples.push(iterTime);
        
        this.memorySnapshots.push({
          heapUsed: memEnd.heapUsed - memStart.heapUsed,
          heapTotal: memEnd.heapTotal - memStart.heapTotal,
          external: memEnd.external - memStart.external,
          rss: memEnd.rss - memStart.rss
        });
      } else {
        await fn();
      }
    }
    
    const endTime = process.hrtime.bigint();
    const totalTime = Number(endTime - startTime) / 1_000_000;
    const averageTime = totalTime / iterations;
    const throughput = 1000 / averageTime; // ops per second

    // Calculate statistics
    const sampleData = this.samples.length > 0 ? this.samples : [averageTime];
    const statistics = calculateStatistics(sampleData);

    // Average memory usage
    let memoryUsage: MemoryUsage | undefined;
    if (this.memorySnapshots.length > 0) {
      memoryUsage = {
        heapUsed: this.memorySnapshots.reduce((sum, m) => sum + m.heapUsed, 0) / this.memorySnapshots.length,
        heapTotal: this.memorySnapshots.reduce((sum, m) => sum + m.heapTotal, 0) / this.memorySnapshots.length,
        external: this.memorySnapshots.reduce((sum, m) => sum + m.external, 0) / this.memorySnapshots.length,
        rss: this.memorySnapshots.reduce((sum, m) => sum + m.rss, 0) / this.memorySnapshots.length
      };
    }

    return {
      name: this.name,
      iterations,
      totalTime,
      averageTime,
      throughput,
      statistics,
      memoryUsage
    };
  }
}