"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSignals } from '@/hooks/useSignals';
import { useWorkspaces } from '@/hooks/use-workspaces';
import { TrendingUp, Zap, Target, BarChart3, Cloud } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';

// Mintlify colors
const PRIMARY = '#00C96A';
const VIOLET = '#7C3AED';
const PRIMARY_MUTED = 'rgba(0, 201, 106, 0.14)';
const AXIS = '#606060';
const GRID = '#2A2A2A';

function ChartTip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div 
      className="rounded-lg px-3 py-2 text-xs shadow-lg"
      style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#F0F0F0' }}
    >
      <p style={{ color: '#606060' }} className="mb-0.5">{label}</p>
      <p className="font-semibold">{payload[0].value} signals</p>
    </div>
  );
}

const axisProps = {
  tick: { fill: AXIS, fontSize: 12 },
  axisLine: false as const,
  tickLine: false as const,
};

function StatSkeleton() {
  return (
    <Card style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-3 w-20 animate-shimmer" />
          <Skeleton className="h-4 w-4 rounded animate-shimmer" />
        </div>
        <Skeleton className="h-8 w-16 animate-shimmer" />
      </CardContent>
    </Card>
  );
}

function ChartSkeleton({ height = 180 }: { height?: number }) {
  return (
    <div className="space-y-3" style={{ height }}>
      <div className="flex items-end gap-2 h-full">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end h-full">
            <Skeleton
              className="w-full rounded animate-shimmer"
              style={{ height: `${20 + Math.abs(Math.sin(i * 1.5)) * 60}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { activeWorkspace } = useWorkspaces();
  const { signals, isLoading } = useSignals(activeWorkspace?.id ?? null);

  const total = signals.length;
  const highIntent = signals.filter((s) => s.intent_level === 'high').length;
  const injected = signals.filter((s) => s.crm_injected).length;
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
  const sfInjected = signals.filter((s) => s.sf_injected_at && new Date(s.sf_injected_at) >= sevenDaysAgo).length;
  const avgConfidence = total > 0
    ? Math.round((signals.reduce((acc, s) => acc + s.confidence_score, 0) / total) * 100)
    : 0;

  const stats = [
    { label: 'Total Signals', value: total, icon: BarChart3, color: 'text-[#00C96A]' },
    { label: 'High Intent', value: highIntent, icon: TrendingUp, color: 'text-[#F87171]' },
    { label: 'HubSpot Injected', value: injected, icon: Zap, color: 'text-[#4ADE80]' },
    { label: 'Salesforce (7d)', value: sfInjected, icon: Cloud, color: 'text-[#00A1E0]' },
    { label: 'Avg Confidence', value: `${avgConfidence}%`, icon: Target, color: 'text-[#FBBF24]' },
  ];

  const byPlatformData = useMemo(() => {
    const map: Record<string, number> = {};
    signals.forEach((s) => { map[s.platform] = (map[s.platform] || 0) + 1; });
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, [signals]);

  const byCategoryData = useMemo(() => {
    const map: Record<string, number> = {};
    signals.forEach((s) => { map[s.intent_category] = (map[s.intent_category] || 0) + 1; });
    return Object.entries(map)
      .map(([name, count]) => ({ name: name.replace(/_/g, ' '), count }))
      .sort((a, b) => b.count - a.count);
  }, [signals]);

  const timelineData = useMemo(() => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      return { label: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.toDateString(), count: 0 };
    });
    signals.forEach((s) => {
      const slot = days.find((day) => day.date === new Date(s.created_at).toDateString());
      if (slot) slot.count += 1;
    });
    return days;
  }, [signals]);

  const empty = <p className="text-sm py-8 text-center" style={{ color: '#606060' }}>No data yet</p>;

  if (isLoading) {
    return (
      <div className="h-full flex flex-col" style={{ background: '#0A0A0A' }}>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <StatSkeleton key={i} />)}
          </div>
          <Card style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
            <CardHeader>
              <Skeleton className="h-4 w-40 animate-shimmer" />
            </CardHeader>
            <CardContent>
              <ChartSkeleton />
            </CardContent>
          </Card>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
              <CardHeader><Skeleton className="h-4 w-32 animate-shimmer" /></CardHeader>
              <CardContent><ChartSkeleton /></CardContent>
            </Card>
            <Card style={{ background: '#111111', border: '1px solid #2A2A2A' }}>
              <CardHeader><Skeleton className="h-4 w-40 animate-shimmer" /></CardHeader>
              <CardContent><ChartSkeleton /></CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ background: '#0A0A0A' }}>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <Card 
              key={stat.label} 
              className="rounded-[16px]"
              style={{ background: '#111111', border: '1px solid #2A2A2A' }}
              data-testid={`stat-${stat.label.toLowerCase().replace(/ /g, '-')}`}
            >
              <CardContent className="pt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold tracking-[0.08em] uppercase" style={{ color: '#606060' }}>{stat.label}</p>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className={`text-3xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card 
          className="rounded-[16px]"
          style={{ background: '#111111', border: '1px solid #2A2A2A' }}
          data-testid="chart-timeline"
        >
          <CardHeader>
            <CardTitle className="text-sm" style={{ color: '#F0F0F0' }}>Signals — Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            {total === 0 ? empty : (
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={timelineData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" {...axisProps} />
                  <YAxis {...axisProps} allowDecimals={false} />
                  <Tooltip content={<ChartTip />} cursor={{ stroke: GRID }} />
                  <Area type="monotone" dataKey="count" stroke={PRIMARY} strokeWidth={2}
                    fill="url(#grad)" dot={{ fill: PRIMARY, r: 3 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card 
            className="rounded-[16px]"
            style={{ background: '#111111', border: '1px solid #2A2A2A' }}
            data-testid="chart-platform"
          >
            <CardHeader>
              <CardTitle className="text-sm" style={{ color: '#F0F0F0' }}>Signals by Platform</CardTitle>
            </CardHeader>
            <CardContent>
              {byPlatformData.length === 0 ? empty : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={byPlatformData} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                    <CartesianGrid stroke={GRID} strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" {...axisProps} allowDecimals={false} />
                    <YAxis dataKey="name" type="category" {...axisProps} width={62} />
                    <Tooltip content={<ChartTip />} cursor={{ fill: PRIMARY_MUTED }} />
                    <Bar dataKey="count" fill={PRIMARY} radius={[0, 4, 4, 0]} maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card 
            className="rounded-[16px]"
            style={{ background: '#111111', border: '1px solid #2A2A2A' }}
            data-testid="chart-category"
          >
            <CardHeader>
              <CardTitle className="text-sm" style={{ color: '#F0F0F0' }}>Signals by Intent Category</CardTitle>
            </CardHeader>
            <CardContent>
              {byCategoryData.length === 0 ? empty : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={byCategoryData} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                    <CartesianGrid stroke={GRID} strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" {...axisProps} allowDecimals={false} />
                    <YAxis dataKey="name" type="category" {...axisProps} width={90} />
                    <Tooltip content={<ChartTip />} cursor={{ fill: PRIMARY_MUTED }} />
                    <Bar dataKey="count" fill={VIOLET} radius={[0, 4, 4, 0]} maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-center pb-2" style={{ color: '#606060' }}>Showing up to 50 most recent signals</p>
      </div>
    </div>
  );
}
