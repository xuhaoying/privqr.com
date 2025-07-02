'use client';

import { useEffect, useState } from 'react';
import { UsageTracker } from '@/lib/utils/usage';
import { GenerationStats } from '@/types/qr';

export function QuotaInfo() {
  const [stats, setStats] = useState<GenerationStats | null>(null);

  useEffect(() => {
    const tracker = UsageTracker.getInstance();
    setStats(tracker.getStats());

    // Update stats when they change
    const interval = setInterval(() => {
      setStats(tracker.getStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  const remaining = stats.dailyLimit - stats.dailyCount;
  const percentage = (stats.dailyCount / stats.dailyLimit) * 100;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🎯</span>
          <span className="text-sm text-amber-800">
            Daily quota: <strong>{stats.dailyCount}/{stats.dailyLimit}</strong> used
          </span>
        </div>
        <button className="text-sm text-brand-600 hover:text-brand-800 font-medium">
          Upgrade for unlimited
        </button>
      </div>
      <div className="mt-2">
        <div className="w-full bg-amber-100 rounded-full h-2">
          <div
            className="bg-amber-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
      {remaining <= 10 && remaining > 0 && (
        <p className="text-xs text-amber-700 mt-2">
          Only {remaining} generations remaining today
        </p>
      )}
      {remaining === 0 && (
        <p className="text-xs text-red-700 mt-2">
          Daily limit reached. Upgrade or try again tomorrow.
        </p>
      )}
    </div>
  );
}