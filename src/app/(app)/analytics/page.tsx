"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const VIO = '#7C3AED';
const VIO_MUTED = 'rgba(124,58,237,0.14)';
const AXIS = '#64748B';
const GRID = 'rgba(255,255,255,0.06)';

function ChartTip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-muted-foreground mb-0.5">{label}</p>
      <p className="font-semibold text-foreground">{payload[0].value} signals</p>
    </div>
  );
}

const axisProps = {
  tick: { fill: AXIS, fontSize: 11 },
  axisLine: false as const,
  tickLine: false as const,
};

export default function AnalyticsPage() {
  const { activeWorkspace } = useWorkspaces();
  const { signals } = useSignals(activeWorkspace?.id ?? null);

  const total = signals.length;
  const highIntent = signals.filter((s) => s.intent_level === 'high').length;
  const injected = signals.filter((s) => s.crm_injected).length;
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
  const sfInjected = signals.filter((s) => s.sf_injected_at && new Date(s.sf_injected_at) >= sevenDaysAgo).length;
  const avgConfidence = total > 0
    ? Math.round((signals.reduce((acc, s) => acc + s.confidence_score, 0) / total) * 100)
    : 0;

  const stats = [
    { label: 'Total Signals', value: total, icon: BarChart3, color: 'text-primary' },
    { label: 'High Intent', value: highIntent, icon: TrendingUp, color: 'text-rose-400' },
    { label: 'HubSpot Injected', value: injected, icon: Zap, color: 'text-emerald-400' },
    { label: 'Salesforce (7d)', value: sfInjected, icon: Cloud, color: 'text-blue-400' },
    { label: 'Avg Confidence', value: `${avgConfidence}%`, icon: Target, color: 'text-amber-400' },
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

  const empty = <p className="text-sm text-muted-foreground py-8 text-center">No data yet</p>;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-border bg-card" data-testid={`stat-${stat.label.toLowerCase().replace(/ /g, '-')}`}>
              <CardContent className="pt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-border bg-card" data-testid="chart-timeline">
          <CardHeader>
            <CardTitle className="text-sm text-foreground">Signals — Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            {total === 0 ? empty : (
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={timelineData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={VIO} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={VIO} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis dataKey="label" {...axisProps} />
                  <YAxis {...axisProps} allowDecimals={false} />
                  <Tooltip content={<ChartTip />} cursor={{ stroke: GRID }} />
                  <Area type="monotone" dataKey="count" stroke={VIO} strokeWidth={2}
                    fill="url(#grad)" dot={{ fill: VIO, r: 3 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border border-border bg-card" data-testid="chart-platform">
            <CardHeader>
              <CardTitle className="text-sm text-foreground">Signals by Platform</CardTitle>
            </CardHeader>
            <CardContent>
              {byPlatformData.length === 0 ? empty : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={byPlatformData} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                    <CartesianGrid stroke={GRID} horizontal={false} />
                    <XAxis type="number" {...axisProps} allowDecimals={false} />
                    <YAxis dataKey="name" type="category" {...axisProps} width={62} />
                    <Tooltip content={<ChartTip />} cursor={{ fill: VIO_MUTED }} />
                    <Bar dataKey="count" fill={VIO} radius={[0, 4, 4, 0]} maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="border border-border bg-card" data-testid="chart-category">
            <CardHeader>
              <CardTitle className="text-sm text-foreground">Signals by Intent Category</CardTitle>
            </CardHeader>
            <CardContent>
              {byCategoryData.length === 0 ? empty : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={byCategoryData} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                    <CartesianGrid stroke={GRID} horizontal={false} />
                    <XAxis type="number" {...axisProps} allowDecimals={false} />
                    <YAxis dataKey="name" type="category" {...axisProps} width={90} />
                    <Tooltip content={<ChartTip />} cursor={{ fill: VIO_MUTED }} />
                    <Bar dataKey="count" fill={VIO} radius={[0, 4, 4, 0]} maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
