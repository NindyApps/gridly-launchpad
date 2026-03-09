# OCTOPILOT — Replit Project

## Overview
OCTOPILOT is an AI-powered social listening and lead generation platform. It is a pure frontend SPA built with React + Vite + TypeScript, using Supabase for authentication and database, and styled with Tailwind CSS + shadcn/ui.

## Architecture

- **Frontend**: React 18 + TypeScript + Vite (port 5000)
- **Auth & Database**: Supabase (external — project ID: `pmhybixfrspmmspipfhi`)
- **UI**: shadcn/ui components, Tailwind CSS, Radix UI primitives
- **State**: TanStack React Query
- **Routing**: React Router DOM v6

## Key Files

- `src/App.tsx` — root component with routes
- `src/integrations/supabase/client.ts` — Supabase client setup
- `src/lib/auth.ts` — `useAuth` hook (Supabase auth state)
- `src/hooks/use-workspaces.ts` — workspace data hook
- `src/layouts/DashboardLayout.tsx` — protected dashboard shell
- `src/pages/` — all page components (Login, Register, Onboarding, Dashboard, Signals, Pipeline, CRM, Workflows, Compliance, Settings)
- `supabase/` — DB migrations and Edge Functions (deployed to Supabase, not Replit)

## Environment Variables

Set in `.env` (VITE_ prefix required for Vite client access):
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon/public key

## Running the App

```bash
npm run dev   # starts Vite dev server on port 5000
npm run build # production build
```

## Supabase Notes

- Uses Row Level Security (RLS) on all tables
- `create-workspace` Edge Function runs server-side on Supabase (service role key never exposed to client)
- DB schema defined in `supabase/migrations/`

## Migration Notes (Lovable → Replit)

- Removed `lovable-tagger` devDependency and plugin from `vite.config.ts`
- Updated Vite server to bind `0.0.0.0` on port `5000` with `allowedHosts: true` for Replit proxy compatibility
- No backend server needed — all data operations go through Supabase client SDK with RLS
