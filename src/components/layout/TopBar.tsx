"use client";

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, HelpCircle, Menu, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/trackers': 'Trackers',
  '/analytics': 'Analytics',
  '/settings/crm': 'CRM Integrations',
  '/settings/alerts': 'Alerts',
  '/settings/team': 'Team',
  '/settings/billing': 'Billing',
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  for (const [key, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(key)) return title;
  }
  return 'OCTOPILOT';
}

interface TopBarProps {
  title?: string;
  subtitle?: string;
  onMenuClick: () => void;
}

export function TopBar({ title, subtitle, onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [helpOpen, setHelpOpen] = useState(false);
  const [notifCount] = useState(3);

  const pageTitle = title ?? getPageTitle(pathname);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() ?? 'U';

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-4 gap-3">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-hamburger"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-foreground truncate">{pageTitle}</h1>
            {subtitle && <p className="text-[10px] text-muted-foreground truncate">{subtitle}</p>}
          </div>
        </div>

        {/* Center: search */}
        <div className="relative hidden sm:block flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search signals, trackers..."
            className="pl-8 h-8 text-xs border-border bg-surface text-foreground placeholder:text-muted-foreground w-full"
            data-testid="input-search"
          />
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Help */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => setHelpOpen(true)}
            data-testid="button-help"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            data-testid="button-notifications"
          >
            <Bell className="h-4 w-4" />
            {notifCount > 0 && (
              <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-destructive flex items-center justify-center text-[9px] text-destructive-foreground font-bold leading-none">
                {notifCount > 9 ? '9+' : notifCount}
              </span>
            )}
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-semibold hover:bg-primary/90 transition-colors ml-1"
                data-testid="button-user-menu"
              >
                {initials}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 border border-border bg-card text-foreground"
            >
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                className="gap-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 cursor-pointer"
                onClick={() => router.push('/settings/team')}
                data-testid="menu-profile-settings"
              >
                <User className="h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                onClick={handleSignOut}
                data-testid="menu-sign-out"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Help modal */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="border border-border bg-card text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Help & Resources
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {[
              { title: 'Getting started guide', desc: 'Learn how to set up trackers and connect your CRM.' },
              { title: 'HubSpot integration', desc: 'Step-by-step guide to connect and configure HubSpot.' },
              { title: 'Understanding intent signals', desc: 'How AI classifies buying intent from social posts.' },
              { title: 'Contact support', desc: 'Reach our team at support@octopilot.io' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-surface px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
