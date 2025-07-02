export class InMemoryProviderLearning {
  private learnings: Map<string, any> = new Map();

  updateProviderLearnings(provider: string, learning: any): void {
    const existingLearnings = this.learnings.get(provider) ?? [];
    this.learnings.set(provider, [...existingLearnings, learning]);
  }

  getLearnings(provider: string): any[] {
    return this.learnings.get(provider) ?? [];
  }

  clearLearnings(): void {
    this.learnings.clear();
  }
}