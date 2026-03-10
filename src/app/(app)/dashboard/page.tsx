"use client";

import { useState, useMemo, useCallback } from 'react';
import { isToday } from 'date-fns';
import { TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';
import { SignalFeed } from '@/components/signals/SignalFeed';
import { SignalFilters } from '@/components/signals/SignalFilters';
import { useSignals } from '@/hooks/useSignals';
import { useTrackers } from '@/hooks/useTrackers';
import { useWorkspaces } from '@/hooks/use-workspaces';
import type { SignalFeedFilters } from '@/types/app';

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs text-zinc-400">{label}</p>
        <Icon className={`h-3.5 w-3.5 ${color}`} />
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { activeWorkspace } = useWorkspaces();
  const workspaceId = activeWorkspace?.id ?? null;
  const { signals } = useSignals(workspaceId);
  const { trackers } = useTrackers(workspaceId);

  const [filters, setFilters] = useState<SignalFeedFilters>({});
  const [resultCount, setResultCount] = useState(0);

  const stats = useMemo(() => {
    const today = signals.filter((s) => isToday(new Date(s.created_at)));
    const highIntent = signals.filter((s) => s.intent_level === 'high').length;
    const injectedToday = today.filter((s) => s.crm_injected || !!s.sf_injected_at).length;
    const totalFeedback = signals.filter((s) => s.dismissed).length;
    const acceptanceRate = totalFeedback > 0
      ? Math.round(((signals.length / (signals.length + totalFeedback)) * 100))
      : 100;

    return {
      today: today.length,
      highIntent,
      injectedToday,
      acceptanceRate,
    };
  }, [signals]);

  const handleResultCount = useCallback((count: number) => {
    setResultCount(count);
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Stats row */}
      <div className="px-4 pt-4 pb-2 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Signals Today" value={stats.today} icon={BarChart3} color="text-indigo-400" />
        <StatCard label="High Intent" value={stats.highIntent} icon={TrendingUp} color="text-red-400" />
        <StatCard label="Injected Today" value={stats.injectedToday} icon={Zap} color="text-green-400" />
        <StatCard label="Acceptance Rate" value={`${stats.acceptanceRate}%`} icon={Target} color="text-amber-400" />
      </div>

      {/* Sticky filter bar */}
      <SignalFilters
        filters={filters}
        onChange={setFilters}
        trackers={trackers}
        resultCount={resultCount}
      />

      {/* Signal feed */}
      <div className="flex-1 overflow-y-auto">
        <SignalFeed
          workspaceId={workspaceId}
          filters={filters}
          onResultCount={handleResultCount}
        />
      </div>
    </div>
  );
}
