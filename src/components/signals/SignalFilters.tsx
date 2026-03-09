"use client";

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { SignalFeedFilters, IntentLevel, Tracker } from '@/types/app';
import { SlidersHorizontal, X } from 'lucide-react';

const INTENT_LEVELS: { value: IntentLevel | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const INTENT_PILL_COLORS: Record<string, string> = {
  all: 'bg-white/10 text-zinc-300 border-white/20',
  high: 'bg-red-500/20 text-red-300 border-red-500/30',
  medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  low: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

const DEFAULT_FILTERS: SignalFeedFilters = {};

function isActive(filters: SignalFeedFilters) {
  return (
    (filters.intent_level && filters.intent_level !== 'all') ||
    (filters.intent_category && filters.intent_category !== 'all') ||
    (filters.platform && filters.platform !== 'all') ||
    (filters.tracker_id && filters.tracker_id !== 'all') ||
    filters.urgent_only ||
    (filters.sort && filters.sort !== 'confidence_desc')
  );
}

interface SignalFiltersProps {
  filters: SignalFeedFilters;
  onChange: (filters: SignalFeedFilters) => void;
  trackers?: Tracker[];
  resultCount?: number;
}

export function SignalFilters({ filters, onChange, trackers = [], resultCount }: SignalFiltersProps) {
  const set = <K extends keyof SignalFeedFilters>(key: K, value: SignalFeedFilters[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const clearAll = () => onChange(DEFAULT_FILTERS);
  const active = isActive(filters);

  return (
    <div
      className="sticky top-0 z-10 border-b border-white/5 bg-zinc-950/95 backdrop-blur-sm px-4 py-2.5"
      data-testid="signal-filters"
    >
      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-500 shrink-0" />

        {/* Intent level pills */}
        <div className="flex gap-1" role="group" aria-label="Intent level filter">
          {INTENT_LEVELS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => set('intent_level', value)}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all',
                (filters.intent_level ?? 'all') === value
                  ? INTENT_PILL_COLORS[value]
                  : 'border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20'
              )}
              data-testid={`filter-intent-${value}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category */}
        <Select
          value={filters.intent_category ?? 'all'}
          onValueChange={(v) => set('intent_category', v as SignalFeedFilters['intent_category'])}
        >
          <SelectTrigger className="h-7 w-38 text-xs border-white/10 bg-white/5 text-zinc-300" data-testid="filter-category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="vendor_switch">Vendor Switch</SelectItem>
            <SelectItem value="new_purchase">New Purchase</SelectItem>
            <SelectItem value="evaluation">Evaluation</SelectItem>
            <SelectItem value="complaint">Complaint</SelectItem>
          </SelectContent>
        </Select>

        {/* Tracker */}
        <Select
          value={filters.tracker_id ?? 'all'}
          onValueChange={(v) => set('tracker_id', v)}
        >
          <SelectTrigger className="h-7 w-36 text-xs border-white/10 bg-white/5 text-zinc-300" data-testid="filter-tracker">
            <SelectValue placeholder="Tracker" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trackers</SelectItem>
            {trackers.map((t) => (
              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Platform */}
        <Select
          value={filters.platform ?? 'all'}
          onValueChange={(v) => set('platform', v as SignalFeedFilters['platform'])}
        >
          <SelectTrigger className="h-7 w-36 text-xs border-white/10 bg-white/5 text-zinc-300" data-testid="filter-platform">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="reddit">Reddit</SelectItem>
            <SelectItem value="hackernews">Hacker News</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={filters.sort ?? 'confidence_desc'}
          onValueChange={(v) => set('sort', v as SignalFeedFilters['sort'])}
        >
          <SelectTrigger className="h-7 w-36 text-xs border-white/10 bg-white/5 text-zinc-300" data-testid="filter-sort">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="confidence_desc">Confidence ↓</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        {/* Urgent only toggle */}
        <div className="flex items-center gap-1.5">
          <Switch
            id="urgent-only"
            checked={!!filters.urgent_only}
            onCheckedChange={(v) => set('urgent_only', v)}
            className="scale-75"
            data-testid="filter-urgent-only"
          />
          <Label htmlFor="urgent-only" className="text-xs text-zinc-400 cursor-pointer whitespace-nowrap">
            Urgent only
          </Label>
        </div>

        {/* Result count + clear */}
        <div className="ml-auto flex items-center gap-2">
          {resultCount !== undefined && (
            <span className="text-xs text-zinc-500" data-testid="filter-result-count">
              {resultCount} signal{resultCount !== 1 ? 's' : ''}
            </span>
          )}
          {active && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-zinc-400 hover:text-white gap-1"
              onClick={clearAll}
              data-testid="filter-clear"
            >
              <X className="h-3 w-3" /> Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
