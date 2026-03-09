"use client";

import { Zap, Radio, BarChart2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const QUICK_LINKS = [
  {
    href: '/trackers',
    icon: Radio,
    title: 'Trackers',
    description: 'Set up keyword and competitor monitors to detect buying intent across Reddit and Hacker News.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    href: '/analytics',
    icon: BarChart2,
    title: 'Analytics',
    description: 'View signal performance, intent distribution by platform, and CRM injection rates.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    href: '/settings/crm',
    icon: Zap,
    title: 'Connect HubSpot',
    description: 'Integrate your CRM to automatically push high-intent signals as tasks to your sales team.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-white">Welcome to OCTOPILOT</h2>
        <p className="text-sm text-zinc-400">
          Your real-time B2B revenue signal intelligence platform. Full dashboard coming in the next phase.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {QUICK_LINKS.map((item) => (
          <Card
            key={item.href}
            className="border border-white/10 bg-white/5 hover:bg-white/8 transition-colors group"
            data-testid={`card-quick-link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <CardContent className="pt-5 pb-4 space-y-3">
              <div className={`h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.description}</p>
              </div>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 text-xs text-zinc-400 hover:text-white gap-1 group-hover:gap-2 transition-all"
                >
                  Go to {item.title}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Full dashboard coming soon</p>
            <p className="text-xs text-zinc-400">
              Signal feed, pipeline view, CRM injection logs, and compliance audit trail — all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
