"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  trackers: 'Trackers',
  analytics: 'Analytics',
  settings: 'Settings',
  crm: 'CRM Integrations',
  alerts: 'Alerts',
  team: 'Team',
  billing: 'Billing',
};

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = [
    { label: 'OCTOPILOT', href: '/dashboard' },
    ...segments.map((seg, i) => ({
      label: SEGMENT_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  return (
    <nav className="flex items-center gap-1 px-4 py-2 text-xs text-zinc-500 border-b border-white/5">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3 shrink-0" />}
            {isLast ? (
              <span className="text-zinc-300" data-testid={`breadcrumb-${crumb.label.toLowerCase()}`}>
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-white transition-colors"
                data-testid={`breadcrumb-link-${crumb.label.toLowerCase()}`}
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
