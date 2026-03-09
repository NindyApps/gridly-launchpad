"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSignals } from '@/hooks/useSignals';
import { useWorkspaces } from '@/hooks/use-workspaces';
import { TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  const { activeWorkspace } = useWorkspaces();
  const { signals } = useSignals(activeWorkspace?.id ?? null);

  const total = signals.length;
  const highIntent = signals.filter((s) => s.intent_level === 'high').length;
  const injected = signals.filter((s) => s.crm_injected).length;
  const avgConfidence = total > 0
    ? Math.round((signals.reduce((acc, s) => acc + s.confidence_score, 0) / total) * 100)
    : 0;

  const byPlatform = signals.reduce<Record<string, number>>((acc, s) => {
    acc[s.platform] = (acc[s.platform] || 0) + 1;
    return acc;
  }, {});

  const byCategory = signals.reduce<Record<string, number>>((acc, s) => {
    acc[s.intent_category] = (acc[s.intent_category] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: 'Total Signals', value: total, icon: BarChart3, color: 'text-indigo-400' },
    { label: 'High Intent', value: highIntent, icon: TrendingUp, color: 'text-red-400' },
    { label: 'Pushed to CRM', value: injected, icon: Zap, color: 'text-green-400' },
    { label: 'Avg Confidence', value: `${avgConfidence}%`, icon: Target, color: 'text-yellow-400' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-white/10 bg-white/5" data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
              <CardContent className="pt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-zinc-400">{stat.label}</p>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-sm text-white">Signals by Platform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(byPlatform).length === 0 && (
                <p className="text-sm text-zinc-500">No data yet</p>
              )}
              {Object.entries(byPlatform).map(([platform, count]) => (
                <div key={platform} className="flex items-center justify-between">
                  <span className="text-sm capitalize text-zinc-300">{platform}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 bg-indigo-600/30 rounded-full overflow-hidden w-24">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${(count / total) * 100}%` }}
                      />
                    </div>
                    <Badge variant="outline" className="text-xs border-white/10 text-zinc-300">{count}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-sm text-white">Signals by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(byCategory).length === 0 && (
                <p className="text-sm text-zinc-500">No data yet</p>
              )}
              {Object.entries(byCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm capitalize text-zinc-300">{category.replace('_', ' ')}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 bg-indigo-600/30 rounded-full overflow-hidden w-24">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${(count / total) * 100}%` }}
                      />
                    </div>
                    <Badge variant="outline" className="text-xs border-white/10 text-zinc-300">{count}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
