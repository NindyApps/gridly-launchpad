"use client";

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, HelpCircle, Menu, User, LogOut } from 'lucide-react';
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
      <header 
        className="flex h-14 shrink-0 items-center justify-between px-4 gap-3 sticky top-0 z-40"
        style={{ 
          background: 'rgba(10, 10, 10, 0.8)', 
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #2A2A2A'
        }}
      >
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="md:hidden transition-colors"
            style={{ color: '#606060' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#F0F0F0'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#606060'}
            data-testid="button-hamburger"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-[15px] font-semibold truncate" style={{ color: '#F0F0F0' }}>{pageTitle}</h1>
            {subtitle && <p className="text-[10px] truncate" style={{ color: '#606060' }}>{subtitle}</p>}
          </div>
        </div>

        {/* Center: search */}
        <div className="relative hidden sm:block flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: '#606060' }} />
          <Input
            placeholder="Search signals, trackers..."
            className="pl-8 h-8 text-xs w-full"
            style={{ 
              background: '#1A1A1A', 
              border: '1px solid #2A2A2A',
              color: '#F0F0F0'
            }}
            data-testid="input-search"
          />
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Help */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-[#1A1A1A]"
            style={{ color: '#606060' }}
            onClick={() => setHelpOpen(true)}
            data-testid="button-help"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative h-8 w-8 p-0 hover:bg-[#1A1A1A]"
            style={{ color: '#606060' }}
            data-testid="button-notifications"
          >
            <Bell className="h-4 w-4" />
            {notifCount > 0 && (
              <span 
                className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full flex items-center justify-center text-[9px] font-bold leading-none"
                style={{ background: '#00C96A', color: '#0A0A0A' }}
              >
                {notifCount > 9 ? '9+' : notifCount}
              </span>
            )}
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ml-1 transition-all"
                style={{ 
                  background: '#00C96A', 
                  color: '#0A0A0A',
                  border: '2px solid #2A2A2A'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00C96A'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2A2A2A'}
                data-testid="button-user-menu"
              >
                {initials}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52"
              style={{ background: '#111111', border: '1px solid #2A2A2A' }}
            >
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-medium truncate" style={{ color: '#F0F0F0' }}>
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs truncate" style={{ color: '#606060' }}>{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator style={{ background: '#2A2A2A' }} />
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                style={{ color: '#A0A0A0' }}
                onClick={() => router.push('/settings/team')}
                data-testid="menu-profile-settings"
              >
                <User className="h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator style={{ background: '#2A2A2A' }} />
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                style={{ color: '#F87171' }}
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
        <DialogContent 
          className="max-w-md"
          style={{ background: '#111111', border: '1px solid #2A2A2A' }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2" style={{ color: '#F0F0F0' }}>
              <HelpCircle className="h-5 w-5" style={{ color: '#00C96A' }} />
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
                className="rounded-[10px] px-4 py-3 cursor-pointer transition-colors"
                style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#2A2A2A'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#1A1A1A'}
              >
                <p className="text-sm font-medium" style={{ color: '#F0F0F0' }}>{item.title}</p>
                <p className="text-xs mt-0.5" style={{ color: '#606060' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
