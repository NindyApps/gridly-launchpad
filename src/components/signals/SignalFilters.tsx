"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SignalFeedFilters } from '@/types/app';

interface SignalFiltersProps {
  filters: SignalFeedFilters;
  onChange: (filters: SignalFeedFilters) => void;
}

export function SignalFilters({ filters, onChange }: SignalFiltersProps) {
  const update = (key: keyof SignalFeedFilters, value: string) => {
    onChange({ ...filters, [key]: value === 'all' ? 'all' : value });
  };

  return (
    <div className="flex flex-wrap gap-2" data-testid="signal-filters">
      <Select value={filters.intent_level || 'all'} onValueChange={(v) => update('intent_level', v)}>
        <SelectTrigger className="h-8 w-36 text-xs" data-testid="filter-intent-level">
          <SelectValue placeholder="Intent Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.intent_category || 'all'} onValueChange={(v) => update('intent_category', v)}>
        <SelectTrigger className="h-8 w-40 text-xs" data-testid="filter-intent-category">
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

      <Select value={filters.platform || 'all'} onValueChange={(v) => update('platform', v)}>
        <SelectTrigger className="h-8 w-36 text-xs" data-testid="filter-platform">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          <SelectItem value="reddit">Reddit</SelectItem>
          <SelectItem value="hackernews">Hacker News</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
