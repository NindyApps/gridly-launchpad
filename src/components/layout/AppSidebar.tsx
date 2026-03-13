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
  ChevronDown,
  ChevronLeft,
  LogOut,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
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
  free: 'bg-[#1A1A1A] text-[#606060]',
  pro: 'bg-[rgba(0,201,106,0.12)] text-[#00C96A]',
  growth: 'bg-[rgba(124,58,237,0.12)] text-[#7C3AED]',
  enterprise: 'bg-[rgba(251,191,36,0.12)] text-[#FBBF24]',
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
        'flex h-full flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}
      style={{
        background: '#0A0A0A',
        borderRight: '1px solid #2A2A2A',
      }}
      >
        {/* Logo */}
        <div className={cn(
          'flex h-14 items-center shrink-0',
          collapsed ? 'justify-center px-0' : 'gap-2 px-4'
        )}
        style={{ borderBottom: '1px solid #2A2A2A' }}
        >
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg">🐙</span>
              <span className="text-sm font-bold text-[#F0F0F0] tracking-tight">OCTOPILOT</span>
            </div>
          )}
          {collapsed && <span className="text-lg">🐙</span>}
          {onClose && (
            <button onClick={onClose} className="ml-auto text-[#606060] hover:text-[#F0F0F0]">
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
                          'flex w-full items-center justify-center rounded-[6px] p-2 text-sm transition-colors',
                          isActive 
                            ? 'bg-[rgba(0,201,106,0.12)] text-[#00C96A]' 
                            : 'text-[#A0A0A0] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]'
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
                      'flex w-full items-center gap-2.5 rounded-[6px] px-3 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-[#F0F0F0]' : 'text-[#A0A0A0] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]'
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
                              'block rounded-[6px] px-3 py-1.5 text-xs transition-colors',
                              childActive
                                ? 'bg-[rgba(0,201,106,0.12)] text-[#00C96A] font-semibold'
                                : 'text-[#A0A0A0] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]'
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
                  'flex items-center gap-2.5 rounded-[6px] px-3 py-2 text-sm font-medium transition-colors relative',
                  collapsed ? 'justify-center px-0 py-2.5' : '',
                  isActive
                    ? 'bg-[rgba(0,201,106,0.12)] text-[#00C96A]'
                    : 'text-[#A0A0A0] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]'
                )}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <item.icon className={cn('shrink-0', collapsed ? 'h-5 w-5' : 'h-4 w-4', isActive && 'text-[#00C96A]')} />
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
        <div className="p-3 space-y-2 shrink-0" style={{ borderTop: '1px solid #2A2A2A' }}>
          {!collapsed && workspace && (
            <div 
              className="flex items-center justify-between px-2.5 py-2 rounded-[6px]"
              style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
            >
              <span className="text-sm font-medium text-[#F0F0F0] truncate max-w-[120px]">{workspace.name}</span>
              <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', PLAN_COLORS[plan] ?? PLAN_COLORS.free)}>
                {planLabel}
              </span>
            </div>
          )}

          {!collapsed && (
            <div className="flex items-center gap-2.5 px-2.5 py-1.5">
              <div 
                className="h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-semibold"
                style={{ background: '#00C96A', color: '#0A0A0A' }}
              >
                {user?.email?.[0].toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#F0F0F0] truncate">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </p>
                <p className="text-[10px] text-[#606060] truncate">{user?.email}</p>
              </div>
            </div>
          )}

          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center rounded-[6px] p-2.5 text-[#A0A0A0] hover:text-[#F0F0F0] hover:bg-[#1A1A1A] transition-colors"
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
              className="flex w-full items-center gap-2.5 rounded-[6px] px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#F0F0F0] hover:bg-[#1A1A1A] transition-colors"
              data-testid="button-sign-out"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign out
            </button>
          )}

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="flex w-full items-center justify-center rounded-[6px] p-1.5 text-[#606060] hover:text-[#F0F0F0] hover:bg-[#1A1A1A] transition-colors"
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
        <SheetContent 
          side="left" 
          className="p-0 w-60"
          style={{ background: '#0A0A0A', border: 'none', borderRight: '1px solid #2A2A2A' }}
        >
          <SidebarContent collapsed={false} onClose={onMobileClose} />
        </SheetContent>
      </Sheet>
    </>
  );
}
