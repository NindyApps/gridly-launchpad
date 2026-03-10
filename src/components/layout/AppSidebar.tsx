"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Target,
  BarChart2,
  Settings,
  Zap,
  ChevronDown,
  ChevronLeft,
  LogOut,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/trackers', label: 'Trackers', icon: Target },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  {
    label: 'Settings',
    icon: Settings,
    children: [
      { href: '/settings/crm', label: 'CRM Integrations' },
      { href: '/settings/alerts', label: 'Alerts' },
      { href: '/settings/team', label: 'Team' },
      { href: '/settings/billing', label: 'Billing' },
    ],
  },
] as const;

const PLAN_COLORS: Record<string, string> = {
  free: 'bg-muted text-muted-foreground',
  pro: 'bg-primary/20 text-primary',
  growth: 'bg-violet-600/20 text-violet-300',
  enterprise: 'bg-amber-600/20 text-amber-300',
};

function SidebarContent({
  collapsed,
  onToggleCollapse,
  onClose,
}: {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, workspace, signOut } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(() =>
    NAV_ITEMS.find((i) => 'children' in i)
      ?.children?.some((c) => pathname.startsWith(c.href)) ?? false
  );

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const plan = workspace?.plan ?? 'free';
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn(
        'flex h-full flex-col border-r border-border bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}>
        {/* Logo */}
        <div className={cn(
          'flex h-14 items-center border-b border-border shrink-0',
          collapsed ? 'justify-center px-0' : 'gap-2 px-4'
        )}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-bold text-foreground tracking-tight">OCTOPILOT</span>
              <span className="text-[10px] text-muted-foreground border border-border rounded px-1">v1.0</span>
            </div>
          )}
          {onClose && (
            <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            if ('children' in item) {
              const isActive = item.children.some((c) => pathname.startsWith(c.href));
              const isOpen = settingsOpen || isActive;

              if (collapsed) {
                return (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          'flex w-full items-center justify-center rounded-lg p-2 text-sm transition-colors',
                          isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                        onClick={() => setSettingsOpen(!settingsOpen)}
                        data-testid="nav-settings"
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <div key={item.label}>
                  <button
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                    onClick={() => setSettingsOpen(!isOpen)}
                    data-testid="nav-settings"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen && (
                    <div className="ml-9 mt-0.5 space-y-0.5">
                      {item.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block rounded-md px-3 py-1.5 text-xs transition-colors',
                              childActive
                                ? 'bg-primary/15 text-primary border-l-2 border-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            )}
                            data-testid={`nav-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            const linkEl = (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors relative',
                  collapsed ? 'justify-center px-0 py-2.5' : '',
                  isActive
                    ? 'bg-primary/15 text-primary border-l-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <item.icon className={cn('shrink-0', collapsed ? 'h-5 w-5' : 'h-4 w-4')} />
                {!collapsed && item.label}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.href}>{linkEl}</div>;
          })}
        </nav>

        {/* Bottom: workspace + user + signout */}
        <div className="border-t border-border p-2 space-y-1 shrink-0">
          {!collapsed && workspace && (
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-xs text-foreground/80 truncate max-w-[120px]">{workspace.name}</span>
              <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium', PLAN_COLORS[plan] ?? PLAN_COLORS.free)}>
                {planLabel}
              </span>
            </div>
          )}

          {!collapsed && (
            <div className="flex items-center gap-2.5 px-3 py-1.5">
              <div className="h-6 w-6 shrink-0 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-semibold">
                {user?.email?.[0].toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          )}

          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center rounded-lg p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  data-testid="button-sign-out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Sign out</TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              data-testid="button-sign-out"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign out
            </button>
          )}

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="flex w-full items-center justify-center rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              data-testid="button-collapse-sidebar"
            >
              <ChevronLeft className={cn('h-4 w-4 transition-transform duration-300', collapsed && 'rotate-180')} />
            </button>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

interface AppSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AppSidebar({ mobileOpen, onMobileClose }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored === 'true') setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidebar-collapsed', String(next));
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen shrink-0">
        <SidebarContent collapsed={collapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="p-0 w-60 border-r border-border bg-background">
          <SidebarContent collapsed={false} onClose={onMobileClose} />
        </SheetContent>
      </Sheet>
    </>
  );
}
