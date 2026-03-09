"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Radio,
  BarChart3,
  Settings,
  Zap,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/trackers', label: 'Trackers', icon: Radio },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  {
    label: 'Settings',
    icon: Settings,
    children: [
      { href: '/settings/crm', label: 'CRM Integration' },
      { href: '/settings/alerts', label: 'Alerts' },
      { href: '/settings/team', label: 'Team' },
      { href: '/settings/billing', label: 'Billing' },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-white/10 bg-zinc-950">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-bold text-white tracking-tight">OCTOPILOT</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV.map((item) => {
          if ('children' in item) {
            const isOpen = item.children.some((c) => pathname.startsWith(c.href));
            return (
              <div key={item.label}>
                <div className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm',
                  isOpen ? 'text-white' : 'text-zinc-400'
                )}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                  <ChevronRight className={cn('ml-auto h-3 w-3 transition-transform', isOpen && 'rotate-90')} />
                </div>
                {isOpen && (
                  <div className="ml-9 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block rounded-md px-3 py-1.5 text-xs transition-colors',
                          pathname === child.href
                            ? 'bg-indigo-600/20 text-indigo-300'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        )}
                        data-testid={`nav-${child.label.toLowerCase().replace(' ', '-')}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2.5 mb-2 px-2">
          <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white font-medium">
            {user?.email?.[0].toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          data-testid="button-sign-out"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
