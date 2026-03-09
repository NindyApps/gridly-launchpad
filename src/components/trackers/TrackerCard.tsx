"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import type { Tracker } from '@/types/app';
import { Trash2, Edit, Hash, Globe } from 'lucide-react';

interface TrackerCardProps {
  tracker: Tracker;
  onEdit?: (tracker: Tracker) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string, active: boolean) => void;
}

export function TrackerCard({ tracker, onEdit, onDelete, onToggle }: TrackerCardProps) {
  return (
    <Card
      className="border border-white/10 bg-white/5 backdrop-blur-sm"
      data-testid={`tracker-card-${tracker.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-white">{tracker.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Switch
              checked={tracker.is_active}
              onCheckedChange={(checked) => onToggle?.(tracker.id, checked)}
              data-testid={`toggle-tracker-${tracker.id}`}
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-zinc-400 hover:text-white"
              onClick={() => onEdit?.(tracker)}
              data-testid={`edit-tracker-${tracker.id}`}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-zinc-400 hover:text-red-400"
              onClick={() => onDelete?.(tracker.id)}
              data-testid={`delete-tracker-${tracker.id}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tracker.keywords.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Hash className="h-3 w-3" /> Keywords</p>
            <div className="flex flex-wrap gap-1">
              {tracker.keywords.map((kw) => (
                <Badge key={kw} variant="outline" className="text-xs border-white/10 text-zinc-300">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {tracker.subreddits.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Globe className="h-3 w-3" /> Subreddits</p>
            <div className="flex flex-wrap gap-1">
              {tracker.subreddits.map((sub) => (
                <Badge key={sub} variant="outline" className="text-xs border-white/10 text-zinc-300">
                  r/{sub}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-1 pt-1">
          {tracker.platforms.map((p) => (
            <Badge key={p} className="text-xs capitalize bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              {p}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
