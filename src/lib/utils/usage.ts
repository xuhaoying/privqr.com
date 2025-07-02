import { GenerationStats } from '@/types/qr';

const STORAGE_KEY = 'qr_toolkit_usage';
const DAILY_LIMIT = 50;
const BATCH_LIMIT = 20;

export class UsageTracker {
  private static instance: UsageTracker;

  private constructor() {}

  static getInstance(): UsageTracker {
    if (!UsageTracker.instance) {
      UsageTracker.instance = new UsageTracker();
    }
    return UsageTracker.instance;
  }

  getStats(): GenerationStats {
    const stored = this.getStoredStats();
    const now = new Date();
    
    // Reset if it's a new day
    if (this.isNewDay(stored.lastReset, now)) {
      return this.resetStats();
    }
    
    return stored;
  }

  incrementDaily(count: number = 1): GenerationStats {
    const stats = this.getStats();
    stats.dailyCount += count;
    this.saveStats(stats);
    return stats;
  }

  incrementBatch(count: number): GenerationStats {
    const stats = this.getStats();
    stats.batchCount += count;
    stats.dailyCount += count;
    this.saveStats(stats);
    return stats;
  }

  canGenerate(count: number = 1): boolean {
    const stats = this.getStats();
    return stats.dailyCount + count <= stats.dailyLimit;
  }

  canBatch(count: number): boolean {
    const stats = this.getStats();
    return count <= stats.batchLimit && this.canGenerate(count);
  }

  getRemainingDaily(): number {
    const stats = this.getStats();
    return Math.max(0, stats.dailyLimit - stats.dailyCount);
  }

  private getStoredStats(): GenerationStats {
    if (typeof window === 'undefined') {
      return this.getDefaultStats();
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return this.getDefaultStats();
    }

    try {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        lastReset: new Date(parsed.lastReset),
      };
    } catch {
      return this.getDefaultStats();
    }
  }

  private saveStats(stats: GenerationStats): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }

  private resetStats(): GenerationStats {
    const stats: GenerationStats = {
      dailyCount: 0,
      dailyLimit: DAILY_LIMIT,
      batchCount: 0,
      batchLimit: BATCH_LIMIT,
      lastReset: new Date(),
    };
    this.saveStats(stats);
    return stats;
  }

  private getDefaultStats(): GenerationStats {
    return {
      dailyCount: 0,
      dailyLimit: DAILY_LIMIT,
      batchCount: 0,
      batchLimit: BATCH_LIMIT,
      lastReset: new Date(),
    };
  }

  private isNewDay(lastReset: Date, now: Date): boolean {
    return (
      lastReset.getDate() !== now.getDate() ||
      lastReset.getMonth() !== now.getMonth() ||
      lastReset.getFullYear() !== now.getFullYear()
    );
  }

  // For testing/admin purposes
  resetAllStats(): void {
    this.resetStats();
  }

  setCustomLimits(dailyLimit: number, batchLimit: number): void {
    const stats = this.getStats();
    stats.dailyLimit = dailyLimit;
    stats.batchLimit = batchLimit;
    this.saveStats(stats);
  }
}