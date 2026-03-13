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
  highlight,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div 
      className="rounded-[16px] p-5 transition-all"
      style={{ 
        background: '#111111', 
        border: '1px solid #2A2A2A',
        boxShadow: highlight ? '0 0 0 1px rgba(0, 201, 106, 0.15) inset' : 'none'
      }}
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold tracking-[0.08em] uppercase" style={{ color: '#606060' }}>{label}</p>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <p className={`text-[32px] font-bold font-mono ${color}`}>{value}</p>
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
    ? '#F87171'
    : nearLimit
    ? '#FBBF24'
    : '#00C96A';

  const textColor = atLimit
    ? 'text-[#F87171]'
    : nearLimit
    ? 'text-[#FBBF24]'
    : 'text-[#606060]';

  return (
    <div
      className="rounded-[16px] p-5 col-span-2 lg:col-span-1"
      style={{ background: '#111111', border: '1px solid #2A2A2A' }}
      data-testid="stat-daily-usage"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold tracking-[0.08em] uppercase" style={{ color: '#606060' }}>Daily Usage</p>
        <Activity className={`h-4 w-4 ${textColor}`} />
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <span className={cn('text-[32px] font-bold font-mono', textColor)}>{today}</span>
        {!isUnlimited && (
          <span className="text-xs" style={{ color: '#606060' }}>/ {limit.toLocaleString()}</span>
        )}
        {isUnlimited && (
          <span className="text-xs" style={{ color: '#606060' }}>signals</span>
        )}
      </div>

      {!isUnlimited && (
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#1A1A1A' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: barColor }}
          />
        </div>
      )}

      {atLimit && (
        <p className="text-[10px] mt-1 font-medium" style={{ color: '#F87171' }}>Daily limit reached</p>
      )}
      {nearLimit && (
        <p className="text-[10px] mt-1" style={{ color: '#FBBF24' }}>{pct}% of daily limit</p>
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
    <div className="h-full flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Stats row */}
      <div className="px-4 pt-4 pb-2 grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Signals Today" value={stats.today} icon={BarChart3} color="text-[#00C96A]" />
        <StatCard label="High Intent" value={stats.highIntent} icon={TrendingUp} color="text-[#F87171]" highlight />
        <StatCard label="Injected Today" value={stats.injectedToday} icon={Zap} color="text-[#4ADE80]" />
        <StatCard label="Acceptance Rate" value={`${stats.acceptanceRate}%`} icon={Target} color="text-[#FBBF24]" />
        <DailyUsageStat today={stats.today} limit={dailyLimit} />
      </div>

      {/* Manual trigger for dev / pre-first-real-signal */}
      {showTriggerButton && (
        <div className="px-4 pb-2 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hover:border-[#00C96A] hover:text-[#00C96A]"
            style={{ border: '1px solid #2A2A2A', color: '#606060', background: 'transparent' }}
            onClick={handleTriggerScan}
            disabled={triggering}
            data-testid="button-trigger-scan"
          >
            <Radio className="h-3.5 w-3.5 mr-1.5" />
            {triggering ? 'Triggering...' : 'Trigger Signal Scan'}
          </Button>
          <span className="text-xs" style={{ color: '#606060' }}>Manually trigger signal collection for testing</span>
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
