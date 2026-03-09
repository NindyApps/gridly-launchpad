"use client";

import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950/80 backdrop-blur-sm px-6">
      <div>
        <h1 className="text-base font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <Input
            placeholder="Search..."
            className="pl-8 h-8 w-56 text-xs border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
            data-testid="input-search"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 w-8 p-0 text-zinc-400 hover:text-white"
          data-testid="button-notifications"
        >
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
