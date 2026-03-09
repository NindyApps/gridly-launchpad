# OCTOPILOT — Replit Project

## Overview
OCTOPILOT is a B2B SaaS Revenue Signal Intelligence platform. It monitors public communities (Reddit, Hacker News) in real-time, classifies buying intent signals using AI, and injects verified opportunities directly into the sales team's CRM — without ever posting to any platform (Zero-Write Architecture).

## Architecture

- **Framework**: Next.js 14 App Router (migrated from Vite + React Router)
- **Language**: TypeScript
- **Auth & Database**: Supabase (external — project ID: `pmhybixfrspmmspipfhi`)
- **UI**: shadcn/ui components, Tailwind CSS, Radix UI, framer-motion
- **State**: TanStack React Query v5
- **Routing**: Next.js App Router (file-based)

## Directory Structure

```
src/app/                          # Next.js App Router
  layout.tsx                      # Root layout (providers, global CSS)
  page.tsx                        # Landing page (/)
  not-found.tsx                   # 404 page
  providers.tsx                   # TanStack Query + Toaster providers
  globals.css                     # Global styles + Tailwind + CSS vars
  (auth)/                         # Auth route group (no dashboard chrome)
    login/page.tsx
    register/page.tsx
    onboarding/page.tsx
  (dashboard)/                    # Dashboard route group (protected)
    layout.tsx                    # Auth guard + sidebar/topbar shell
    dashboard/page.tsx            # /dashboard
    dashboard/signals/page.tsx    # /dashboard/signals
    dashboard/pipeline/page.tsx   # /dashboard/pipeline
    dashboard/crm/page.tsx        # /dashboard/crm
    dashboard/workflows/page.tsx  # /dashboard/workflows
    dashboard/compliance/page.tsx # /dashboard/compliance
    dashboard/settings/page.tsx   # /dashboard/settings

src/components/                   # Shared components
  Navbar.tsx                      # Landing page navbar (Next.js Link)
  NavLink.tsx                     # Active-aware link (usePathname)
  DashboardSidebar.tsx            # Collapsible sidebar
  DashboardTopbar.tsx             # Topbar with workspace switcher + user menu
  HeroSection.tsx, Features.tsx,  # Landing page sections
  ...etc

src/lib/
  auth.ts                         # useAuth hook (Supabase auth state)
  supabase/client.ts              # Browser Supabase client (@supabase/ssr)
  supabase/server.ts              # Server Supabase client (@supabase/ssr)

src/hooks/
  use-workspaces.ts               # Workspace data + active workspace state

src/integrations/supabase/
  types.ts                        # Generated DB types
  client.ts                       # Re-exports from lib/supabase/client
```

## Environment Variables

Stored in `.env.local` (never committed):
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key

## Running the App

```bash
npm run dev     # Next.js dev server on port 5000
npm run build   # Production build
npm start       # Production server on port 5000
```

## Supabase Setup

- Uses Row Level Security (RLS) on all tables
- `create-workspace` Edge Function creates workspace + owner membership (service role)
- DB schema in `supabase/migrations/`
- Tables: `workspaces`, `workspace_members`, `user_profiles`, `audit_logs`

## Public Assets

Static images are in `/public/` and referenced as `/image-name.png`.

## Migration History

- Originally built in Lovable.dev (Vite + React Router)
- Migrated to Next.js 14 App Router on Replit
- Supabase remains as auth/database backend (no change)
- All routing replaced from react-router-dom → next/navigation + next/link
- Asset imports replaced with public folder paths
