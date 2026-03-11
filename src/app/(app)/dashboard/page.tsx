"use client";

import { useState, useMemo, useCallback } from 'react';
import { isToday } from 'date-fns';
import { TrendingUp, Zap, Target, BarChart3, Radio, Activity } from 'lucide-react';
import { SignalFeed } from '@/components/signals/SignalFeed';
import { SignalFilters } from '@/components/signals/SignalFilters';
import { Button } from '@/components/ui/button';
import { useSignals } from '@/hooks/useSignals';
import { useTrackers } from '@/hooks/useTrackers';
import { useWorkspaces } from '@/hooks/use-workspaces';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { SignalFeedFilters } from '@/types/app';
import { DAILY_LIMITS } from '@/lib/constants/plans';

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

function DailyUsageStat({
  today,
  limit,
}: {
  today: number;
  limit: number;
}) {
  const pct = limit >= 99999 ? 0 : Math.min(100, Math.round((today / limit) * 100));
  const isUnlimited = limit >= 99999;
  const atLimit = !isUnlimited && today >= limit;
  const nearLimit = !isUnlimited && !atLimit && pct > 80;

  const barColor = atLimit
    ? 'bg-red-500'
    : nearLimit
    ? 'bg-amber-500'
    : 'bg-indigo-500';

  const textColor = atLimit
    ? 'text-red-400'
    : nearLimit
    ? 'text-amber-400'
    : 'text-zinc-400';

  return (
    <div
      className="rounded-xl border border-white/10 bg-white/5 p-4 col-span-2 lg:col-span-1"
      data-testid="stat-daily-usage"
    >
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs text-zinc-400">Daily Usage</p>
        <Activity className={`h-3.5 w-3.5 ${textColor}`} />
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <span className={cn('text-2xl font-bold', textColor)}>{today}</span>
        {!isUnlimited && (
          <span className="text-xs text-zinc-500">/ {limit.toLocaleString()}</span>
        )}
        {isUnlimited && (
          <span className="text-xs text-zinc-500">signals</span>
        )}
      </div>

      {!isUnlimited && (
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', barColor)}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      {atLimit && (
        <p className="text-[10px] text-red-400 mt-1 font-medium">Daily limit reached</p>
      )}
      {nearLimit && (
        <p className="text-[10px] text-amber-400 mt-1">{pct}% of daily limit</p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { activeWorkspace } = useWorkspaces();
  const workspaceId = activeWorkspace?.id ?? null;
  const { signals } = useSignals(workspaceId);
  const { trackers } = useTrackers(workspaceId);
  const { toast } = useToast();
  const supabase = createClient();

  const [filters, setFilters] = useState<SignalFeedFilters>({});
  const [resultCount, setResultCount] = useState(0);
  const [triggering, setTriggering] = useState(false);

  const plan = (activeWorkspace as { plan?: string } | null)?.plan ?? 'pro';
  const dailyLimit = DAILY_LIMITS[plan] ?? 500;

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

  const hasRealSignals = signals.some((s) => !s.is_demo);
  const showTriggerButton = process.env.NODE_ENV === 'development' || !hasRealSignals;

  const handleTriggerScan = async () => {
    setTriggering(true);
    try {
      await supabase.functions.invoke('ingest-signals');
      toast({ title: 'Signal scan triggered', description: 'Check back in a few minutes for new signals.' });
    } catch {
      toast({ title: 'Trigger failed', description: 'Could not invoke the signal scan.', variant: 'destructive' });
    } finally {
      setTriggering(false);
    }
  };

  const handleResultCount = useCallback((count: number) => {
    setResultCount(count);
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Stats row */}
      <div className="px-4 pt-4 pb-2 grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Signals Today" value={stats.today} icon={BarChart3} color="text-indigo-400" />
        <StatCard label="High Intent" value={stats.highIntent} icon={TrendingUp} color="text-red-400" />
        <StatCard label="Injected Today" value={stats.injectedToday} icon={Zap} color="text-green-400" />
        <StatCard label="Acceptance Rate" value={`${stats.acceptanceRate}%`} icon={Target} color="text-amber-400" />
        <DailyUsageStat today={stats.today} limit={dailyLimit} />
      </div>

      {/* Manual trigger for dev / pre-first-real-signal */}
      {showTriggerButton && (
        <div className="px-4 pb-2 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-border text-zinc-400 hover:text-white"
            onClick={handleTriggerScan}
            disabled={triggering}
            data-testid="button-trigger-scan"
          >
            <Radio className="h-3.5 w-3.5 mr-1.5" />
            {triggering ? 'Triggering...' : 'Trigger Signal Scan'}
          </Button>
          <span className="text-xs text-zinc-600">Manually trigger signal collection for testing</span>
        </div>
      )}

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
