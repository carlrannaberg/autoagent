export class GitSimulator {
  private isAvailable: boolean = true;
  private isRepo: boolean = true;
  private hasChanges: boolean = false;
  private uncommittedChanges: string = '';
  private currentCommitHash: string = 'initial-commit';
  private commits: Map<string, { message: string; files: string[] }> = new Map();
  private stagedFiles: string[] = [];

  setGitAvailable(available: boolean): void {
    this.isAvailable = available;
  }

  setIsRepository(isRepo: boolean): void {
    this.isRepo = isRepo;
  }

  setHasChanges(hasChanges: boolean): void {
    this.hasChanges = hasChanges;
  }

  setUncommittedChanges(changes: string): void {
    this.uncommittedChanges = changes;
    this.hasChanges = changes.length > 0;
  }

  checkGitAvailable(): boolean {
    return this.isAvailable;
  }

  isGitRepository(): boolean {
    return this.isRepo;
  }

  hasChangesToCommit(): boolean {
    return this.hasChanges;
  }

  stageAllChanges(): void {
    if (this.uncommittedChanges) {
      this.stagedFiles = this.uncommittedChanges.split('\n').filter(f => f.trim());
    }
  }

  createCommit(message: string): { success: boolean; commitHash?: string; error?: string } {
    if (!this.hasChanges) {
      return { success: false, error: 'No changes to commit' };
    }

    const commitHash = `commit-${Date.now()}`;
    this.commits.set(commitHash, {
      message,
      files: [...this.stagedFiles]
    });
    
    this.currentCommitHash = commitHash;
    this.hasChanges = false;
    this.uncommittedChanges = '';
    this.stagedFiles = [];

    return { success: true, commitHash };
  }

  getCurrentCommitHash(): string {
    return this.currentCommitHash;
  }

  getUncommittedChanges(): string {
    return this.uncommittedChanges;
  }

  revertToCommit(commitHash: string): boolean {
    if (this.commits.has(commitHash)) {
      this.currentCommitHash = commitHash;
      this.hasChanges = false;
      this.uncommittedChanges = '';
      return true;
    }
    return false;
  }

  // Helper methods for testing
  getCommit(hash: string): { message: string; files: string[] } | undefined {
    return this.commits.get(hash);
  }

  getAllCommits(): Map<string, { message: string; files: string[] }> {
    return new Map(this.commits);
  }
}