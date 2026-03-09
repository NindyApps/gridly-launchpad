# OCTOPILOT — Replit Project

## Overview
OCTOPILOT is a B2B SaaS Revenue Signal Intelligence platform. It monitors public communities (Reddit, Hacker News) in real-time to surface high-intent B2B buying signals and auto-inject them into the sales team's CRM — without ever posting to any platform (Zero-Write Architecture).

## Architecture

- **Framework**: Next.js 14 App Router (migrated from Vite + React Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v3 + shadcn/ui + framer-motion
- **Auth & Database**: Supabase (external — project ID: `pmhybixfrspmmspipfhi`)
- **State**: TanStack React Query v5
- **CRM**: HubSpot (OAuth + task injection via `lib/hubspot.ts`)
- **AI**: OpenAI GPT-4o-mini (signal classification via `lib/openai.ts`)
- **Payments**: Stripe (webhook handler at `api/webhooks/stripe`)
- **Email**: Resend (`RESEND_API_KEY` env var)

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── globals.css
│   ├── providers.tsx             # TanStack Query + Toaster
│   ├── not-found.tsx
│   ├── onboarding/page.tsx       # Post-signup onboarding wizard (protected)
│   ├── (auth)/                   # Public auth pages
│   │   ├── login/page.tsx        # Password + Magic Link
│   │   ├── signup/page.tsx       # Registration
│   │   ├── register/page.tsx     # Legacy alias → signup
│   │   └── accept-invite/page.tsx
│   ├── (app)/                    # Protected app pages (AppSidebar shell)
│   │   ├── layout.tsx            # Auth guard + AppSidebar
│   │   ├── trackers/page.tsx     # Tracker CRUD
│   │   ├── analytics/page.tsx    # Signal analytics
│   │   └── settings/
│   │       ├── crm/page.tsx      # HubSpot OAuth connect
│   │       ├── alerts/page.tsx   # Notification preferences
│   │       ├── team/page.tsx     # Invite + manage members
│   │       └── billing/page.tsx  # Plan management
│   ├── (dashboard)/              # Legacy dashboard (existing signals, pipeline, etc.)
│   │   ├── layout.tsx
│   │   └── dashboard/           # /dashboard and sub-pages
│   └── api/
│       ├── crm/hubspot/
│       │   ├── connect/route.ts  # Generate OAuth URL
│       │   ├── callback/route.ts # Handle OAuth callback
│       │   └── inject/route.ts   # Push signal to HubSpot
│       └── webhooks/
│           └── stripe/route.ts   # Stripe event handler
│
├── components/
│   ├── ui/                       # shadcn/ui auto-generated
│   ├── layout/                   # AppSidebar, TopBar
│   ├── signals/                  # SignalCard, SignalFilters
│   ├── trackers/                 # TrackerCard, TrackerForm
│   ├── auth/                     # LoginForm, SignupForm
│   ├── shared/                   # EmptyState, LoadingSpinner, ConfirmDialog
│   └── [landing page components] # Navbar, HeroSection, HowItWorks, Features,
│                                 # Testimonials, Pricing, FAQ, CTASection, Footer
│
├── hooks/
│   ├── useAuth.ts                # Supabase auth state + profile
│   ├── useSignals.ts             # Signal feed + dismiss + CRM inject mutations
│   ├── useTrackers.ts            # Tracker CRUD operations
│   ├── use-workspaces.ts         # Workspace + active workspace state
│   └── use-toast.ts
│
├── lib/
│   ├── supabase/client.ts        # Browser Supabase client (@supabase/ssr)
│   ├── supabase/server.ts        # Server Supabase client (@supabase/ssr)
│   ├── openai.ts                 # classifySignal() using GPT-4o-mini
│   ├── hubspot.ts                # OAuth, createContact, createTask, injectSignalToCRM
│   ├── auth.ts                   # Legacy useAuth (thin wrapper)
│   └── utils.ts                  # cn(), etc.
│
├── types/
│   ├── app.ts                    # IntentSignal, Workspace, Profile, Tracker, etc.
│   └── database.ts               # Supabase DB type definitions
│
└── middleware.ts                 # Route protection (protects /dashboard, /trackers, /analytics, /settings, /onboarding)
```

## Route Protection (middleware.ts)

- **Protected**: `/dashboard`, `/trackers`, `/analytics`, `/settings/*`, `/onboarding` → redirect to `/login` if no session
- **Auth redirect**: `/login`, `/signup` → redirect to `/dashboard` if session exists
- **Public**: `/`, `/accept-invite`, `/api/*`, `/auth/*`

## Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://pmhybixfrspmmspipfhi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key — needed for API routes>
NEXT_PUBLIC_APP_URL=http://localhost:5000
OPENAI_API_KEY=<needed for classifySignal>
HUBSPOT_CLIENT_ID=<HubSpot app client ID>
HUBSPOT_CLIENT_SECRET=<HubSpot app client secret>
HUBSPOT_REDIRECT_URI=http://localhost:5000/api/crm/hubspot/callback
REDDIT_CLIENT_ID=<Reddit OAuth app>
REDDIT_CLIENT_SECRET=<Reddit OAuth secret>
REDDIT_USER_AGENT=OCTOPILOT/1.0
RESEND_API_KEY=<for email alerts>
RESEND_FROM_EMAIL=noreply@octopilot.io
STRIPE_SECRET_KEY=<Stripe secret>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<Stripe publishable>
STRIPE_WEBHOOK_SECRET=<Stripe webhook signing secret>
ENCRYPTION_KEY=<for encrypting HubSpot tokens at rest>
```

## Supabase Database Schema

Tables expected (match `types/database.ts`):
- `workspaces` — workspace config, plan, HubSpot token
- `profiles` — user profiles with roles (admin/analyst/sdr/viewer)
- `trackers` — keyword/subreddit/competitor monitoring configs
- `intent_signals` — AI-classified buying signals
- `human_feedback_loop` — SDR feedback on signal quality
- `compliance_logs` — audit trail

## Running the App

```bash
npm run dev     # Next.js dev server on port 5000
npm run build   # Production build
npm start       # Production server on port 5000
```

## Key Implementation Notes

- FloatingDots in HeroSection and CTASection use deterministic Math.sin/cos with rounding to avoid SSR/client hydration mismatches
- Dashboard layout uses `useAuth` hook with `useEffect` redirect (client component guard)
- Old Vite files fully removed — pure Next.js 14 App Router
- `"use client"` required on all components using framer-motion, hooks, or event handlers
- HubSpot token is stored in `workspaces.hubspot_token_enc` — should be encrypted in production using `ENCRYPTION_KEY`

## Completion Status

### P01
- [x] TypeScript types (`types/app.ts`, `types/database.ts`)
- [x] Middleware route protection (`src/middleware.ts`)
- [x] All auth routes: login, signup, accept-invite
- [x] App routes: trackers, analytics, settings (crm/alerts/team/billing)
- [x] API routes: HubSpot OAuth connect/callback/inject, Stripe webhook
- [x] Component folders: layout/, signals/, trackers/, auth/, shared/
- [x] Hooks: useAuth, useSignals, useTrackers
- [x] Landing page: all sections including Testimonials, Pricing, FAQ

### P02
- [x] `supabase/schema.sql` — 6 tables + RLS + trigger (run manually in Supabase SQL Editor)
- [x] TypeScript types synced to schema exactly
- [x] `handle_new_user()` trigger: auto-creates workspace + admin profile on signup
- [x] Onboarding updates workspace via UPDATE (not INSERT)
- [x] `CreateTrackerInput` type + `created_by: user.id` in useTrackers

### P03
- [x] `app/auth/callback/route.ts` — OAuth + magic link callback, detects new vs returning users
- [x] Login upgraded: Google OAuth, forgot password (resetPasswordForEmail), show/hide password, inline errors
- [x] Signup upgraded: confirm password, 5-point strength indicator, ToS checkbox, Google OAuth
- [x] Accept-invite upgraded: verifyOtp with type='invite', shows workspace name
- [x] `hooks/useAuth.ts`: now returns user, session, profile, workspace, role, isLoading, signOut
- [x] `lib/auth.ts`: thin re-export of hooks/useAuth.ts for backward compatibility
- [x] Middleware: added `/auth/*` to public routes
- [x] Onboarding rebuilt as 4-step wizard: Welcome → Connect CRM → Create Tracker → Invite Team
- [x] `components/shared/TagInput.tsx`: reusable tag pill input (Enter/comma to add, backspace/×  to remove)
- [x] `api/team/invite/route.ts`: uses Supabase admin.inviteUserByEmail, validates admin role
