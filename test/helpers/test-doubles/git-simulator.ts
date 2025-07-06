export class GitSimulator {
  private isAvailable: boolean = true;
  private isRepo: boolean = true;
  private hasChanges: boolean = false;
  private uncommittedChanges: string = '';
  private currentCommitHash: string = 'initial-commit';
  private commits: Map<string, { message: string; files: string[] }> = new Map();
  private stagedFiles: string[] = [];
  private userName: string = '';
  private userEmail: string = '';
  private remoteUrl: string = '';
  private remoteName: string = '';
  private commitCalls: Array<{ options: any }> = [];

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

  setUserConfig(name: string, email: string): void {
    this.userName = name;
    this.userEmail = email;
  }

  setRemoteConfig(name: string, url: string): void {
    this.remoteName = name;
    this.remoteUrl = url;
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

  createCommit(options: any): { success: boolean; commitHash?: string; error?: string } {
    // Store the commit call for testing
    this.commitCalls.push({ options });
    
    if (!this.hasChanges) {
      return { success: false, error: 'No changes to commit' };
    }

    const commitHash = `commit-${Date.now()}`;
    this.commits.set(commitHash, {
      message: typeof options.message === 'string' ? options.message : '',
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

  getCommitCalls(): Array<{ options: any }> {
    return [...this.commitCalls];
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