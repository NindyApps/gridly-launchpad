# OCTOPILOT — Project Rules & Architecture

## What This Product Does
OCTOPILOT is a B2B Revenue Signal Intelligence SaaS. It monitors Reddit and Hacker News for public posts where users express buying intent (e.g., asking for CRM recommendations, complaining about competitors, evaluating tools). AI (OpenAI) classifies these signals by intent level and confidence score, then injects verified opportunities directly into HubSpot CRM as contacts and tasks.

**Zero-Write Constraint:** The platform NEVER posts, replies, or DMs to any external platform. It is a read-only intelligence tool.

---

## Tech Stack

| Layer | Tech | Version |
|-------|------|---------|
| Framework | Next.js App Router | 14.2.35 |
| Language | TypeScript | 5.8.3 (strict) |
| Styling | Tailwind CSS | 3.4.17 |
| UI Components | shadcn/ui (Radix UI) | all @radix-ui/* |
| Animation | motion (motion/react) | 12.x |
| Icons | lucide-react | 0.462.0 |
| Auth + DB | Supabase (@supabase/ssr) | 0.9.0 |
| State / Fetching | TanStack Query v5 | 5.83.0 |
| CRM | HubSpot REST API | via lib/hubspot.ts |
| AI | OpenAI SDK | 6.27.0 |
| Email | Resend | 6.9.3 |
| Billing | Stripe | 20.4.1 |
| Charts | Recharts | 2.15.4 |

---

## Folder Structure

```
src/
├── app/
│   ├── (app)/              ← Protected app shell (sidebar + topbar)
│   │   ├── dashboard/      ← Main signal feed page
│   │   ├── trackers/       ← Tracker CRUD
│   │   ├── analytics/      ← Analytics & charts
│   │   ├── settings/
│   │   │   ├── crm/        ← HubSpot OAuth connect
│   │   │   ├── alerts/     ← Notification prefs
│   │   │   ├── team/       ← Invite & manage members
│   │   │   └── billing/    ← Stripe plans
│   │   └── layout.tsx      ← Auth guard + AppSidebar + TopBar
│   ├── (auth)/             ← Public auth pages (no sidebar)
│   │   ├── login/
│   │   ├── signup/
│   │   └── accept-invite/
│   ├── api/
│   │   ├── crm/hubspot/    ← connect + callback + inject routes
│   │   ├── feedback/       ← Signal feedback POST
│   │   ├── team/invite/    ← Send Supabase invite
│   │   ├── webhooks/stripe/← Stripe subscription events
│   │   └── dev/seed/       ← Seed test signals (dev only)
│   ├── auth/callback/      ← OAuth code exchange
│   └── onboarding/         ← 4-step onboarding wizard
├── components/
│   ├── ui/                 ← shadcn/ui primitives (DO NOT MODIFY)
│   │   ├── container.tsx   ← max-w-[1200px] wrapper
│   │   └── section.tsx     ← py-20 md:py-28 section wrapper
│   ├── layout/             ← App shell (sidebar, topbar, breadcrumb)
│   ├── signals/            ← SignalCard, SignalFeed, SignalFilters
│   ├── trackers/           ← TrackerCard, TrackerForm
│   ├── auth/               ← LoginForm, SignupForm
│   └── shared/             ← EmptyState, LoadingSpinner, TagInput,
│                               FeatureCard, CTAButton, ConfirmDialog
├── sections/               ← Landing page only components
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── CTASection.tsx
│   ├── Footer.tsx
│   ├── Testimonials.tsx
│   ├── StatsMarquee.tsx
│   ├── SeeItInAction.tsx
│   └── DashboardPreview.tsx
├── hooks/
│   ├── useAuth.ts          ← user, profile, workspace, signOut, isLoading
│   ├── useSignals.ts       ← signals list, useFeedback, useDismissSignal, useInjectToCRM
│   ├── useTrackers.ts      ← trackers CRUD
│   └── use-workspaces.ts   ← activeWorkspace
├── lib/
│   ├── supabase/client.ts  ← browser Supabase client
│   ├── supabase/server.ts  ← server Supabase client (for API routes)
│   ├── hubspot.ts          ← HubSpot REST API helpers
│   ├── openai.ts           ← OpenAI client init
│   ├── seed-signals.ts     ← 8 test signals (dev utility)
│   └── utils.ts            ← cn() utility
├── types/
│   ├── app.ts              ← IntentSignal, Workspace, Profile, Tracker types
│   └── database.ts         ← DB-level types
└── middleware.ts            ← Session check, route protection
```

---

## Design System Rules

### Color Tokens (ALWAYS use CSS variables — NEVER hardcode hex colors)

| Token | Value | Usage |
|-------|-------|-------|
| `bg-background` | #0B0D0F | Page backgrounds, sidebar, topbar |
| `bg-surface` / `bg-card` | #11151A | Card backgrounds, panels, dropdowns |
| `bg-primary` | #7C3AED (violet) | CTA buttons, active states, badges |
| `text-foreground` | #F8FAFC | Primary text |
| `text-muted-foreground` | #94A3B8 | Secondary/helper text |
| `border-border` | rgba(255,255,255,0.08) | All borders and dividers |

### Typography
- **Display/Headings:** `font-display` → Space Grotesk
- **Body:** `font-sans` → Inter
- **Font scale:** text-xs (10px) → text-sm (14px) → text-base (16px) → text-xl → text-2xl → text-3xl

### Spacing
- Section padding: `py-20 md:py-28` (use `<Section>` component)
- Card padding: `p-4` (compact) or `p-6` (default)
- Container width: max 1200px (use `<Container>` component)
- Grid gaps: `gap-3` (compact) or `gap-4` (default) or `gap-6` (spacious)

### Border Radius
- `rounded-xs` — small pills, tiny chips
- `rounded-md` — inputs, small cards
- `rounded-lg` — standard cards (default `--radius`)
- `rounded-xl` — feature cards
- `rounded-2xl` — large hero cards
- `rounded-full` — pills, avatars, buttons

---

## Coding Rules for Future AI Changes

### DO:
- Use `bg-background`, `bg-card`, `bg-surface`, `border-border`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `text-primary` etc. from CSS variables
- Import `Container` from `@/components/ui/container` for page-level width constraints
- Import `Section` from `@/components/ui/section` for landing page sections
- Import `FeatureCard` from `@/components/shared/FeatureCard` for feature display cards
- Import `CTAButton` from `@/components/shared/CTAButton` for primary CTA buttons
- Keep landing page components in `src/sections/`
- Keep app UI components in `src/components/`
- Use `data-testid` on all interactive and meaningful display elements
- Use TanStack Query v5 object form: `useQuery({ queryKey: [...], ... })`
- Use `apiRequest` from `@/lib/queryClient` for mutations
- Always show loading states (`isPending`, `isLoading`) on async operations
- Check auth in API routes using `createClient()` from `@/lib/supabase/server`

### DON'T:
- NEVER hardcode hex colors like `bg-[#0F172A]` or `bg-zinc-950` — use CSS vars
- NEVER import landing components from `@/components/X` — use `@/sections/X`
- NEVER import React explicitly — Vite/Next.js JSX transform handles it
- NEVER modify `src/components/ui/` files (shadcn primitives)
- NEVER add server-side logic to files with `"use client"` directive
- NEVER use `process.env` on the frontend — use `NEXT_PUBLIC_` prefixed vars
- NEVER create new schema files — all DB changes go via `supabase/schema.sql`
- NEVER post/reply/DM on any external platform (Zero-Write Architecture)

---

## Database Schema

**Supabase project:** `pmhybixfrspmmspipfhi`
**Schema file:** `supabase/schema.sql` — MUST be run manually in Supabase SQL Editor

### Tables
1. `workspaces` — tenant root, stores HubSpot tokens (encrypted), Stripe IDs
2. `profiles` — user profiles (1:1 with auth.users), role, onboarding state
3. `trackers` — monitoring configs (keywords, subreddits, platforms)
4. `intent_signals` — detected buying signals with AI scores
5. `human_feedback_loop` — user feedback on signal quality
6. `compliance_logs` — audit trail for all significant actions

### Auth Flow
1. User signs up → Supabase `handle_new_user()` trigger auto-creates workspace + admin profile
2. Session managed via `@supabase/ssr` cookies
3. Middleware protects: `/dashboard/*`, `/trackers/*`, `/analytics/*`, `/settings/*`, `/onboarding/*`
4. OAuth (Google) redirect URL: `{APP_URL}/auth/callback`

---

## Environment Variables

All are in `.env.local`. All are filled in Replit Secrets.

```
NEXT_PUBLIC_SUPABASE_URL         ← Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY    ← Supabase anon key
SUPABASE_SERVICE_ROLE_KEY        ← Service role (server-only, never expose)
NEXT_PUBLIC_APP_URL              ← App URL for OAuth redirects
OPENAI_API_KEY                   ← GPT-4o-mini for signal classification
HUBSPOT_CLIENT_ID                ← HubSpot OAuth app client ID
HUBSPOT_CLIENT_SECRET            ← HubSpot OAuth app client secret
HUBSPOT_REDIRECT_URI             ← {APP_URL}/api/crm/hubspot/callback
REDDIT_CLIENT_ID                 ← Reddit API app ID
REDDIT_CLIENT_SECRET             ← Reddit API app secret
REDDIT_USER_AGENT                ← e.g. "OCTOPILOT/1.0 by youruser"
RESEND_API_KEY                   ← Resend for email alerts
RESEND_FROM_EMAIL                ← e.g. "alerts@octopilot.io"
STRIPE_SECRET_KEY                ← Stripe server-side key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ← Stripe client-side key
STRIPE_WEBHOOK_SECRET            ← Stripe webhook signing secret
ENCRYPTION_KEY                   ← 32-char key for encrypting HubSpot tokens
```

---

## Stack Notes

### Tailwind CSS — staying on v3 (v4 migration deferred)
The project uses Tailwind CSS v3.4.17. Upgrading to v4 requires:
- Rewriting `tailwind.config.ts` entirely into CSS `@theme` directives inside `globals.css`
- Changing `@tailwind base/components/utilities` → `@import "tailwindcss"` in globals.css
- Removing `postcss.config.js` content and replacing with `@tailwindcss/postcss`
- Updating `components.json` `tailwind.config` from `"tailwind.config.ts"` to `""` (empty)
This is a dedicated breaking-change session. Do NOT attempt it as part of any other feature work.

### Animation — motion package (replaces framer-motion)
The project uses `motion` (v12+), the official successor to `framer-motion`. Import from `'motion/react'`.
All animation components must have `"use client"` at the top (Next.js App Router requirement).
Do NOT install or import `framer-motion` — it has been removed.

### components.json — new-york style
`style: "new-york"` is set for future CLI installs. Existing components were generated with "default" style and are NOT retroactively changed. Only net-new components added via `shadcn add` will use new-york styling.

---

## Build Status (as of March 2026)

### Completed (functional)
- ✅ Landing page (Navbar, Hero, HowItWorks, Features, Pricing, FAQ, CTA, Footer)
- ✅ Auth system (email+password, Google OAuth, invite flow)
- ✅ App shell (sidebar, topbar, breadcrumb, mobile drawer)
- ✅ Dashboard page (stats cards, signal feed, filters)
- ✅ Signal cards (intent badges, confidence, opener, feedback, dismiss, inject)
- ✅ Tracker CRUD (create, edit via sheet, toggle, delete)
- ✅ Analytics page — Recharts AreaChart (7-day timeline) + BarCharts (platform + category)
- ✅ Settings pages (CRM, Alerts, Team invite, Billing UI)
- ✅ HubSpot OAuth flow (connect + callback + token storage)
- ✅ HubSpot connection status read from DB (`hubspot_token_enc` check) + disconnect button
- ✅ Alert settings — persist to DB (`workspaces.alert_confidence_threshold`, `workspaces.slack_webhook_url`, `profiles.notification_prefs`)
- ✅ Team settings — members list from DB via `/api/team/members` (admin auth, service role)
- ✅ Team invite — calls real `/api/team/invite` endpoint (Supabase auth invite)
- ✅ Signal feedback API (`/api/feedback`)
- ✅ Stripe webhook handler
- ✅ Dev seed route (`/api/dev/seed`)

### Partially Done
- 🔄 Billing — usage and plan not read from Stripe/DB (hardcoded placeholder values)
- 🔄 HubSpot token refresh — tokens stored/used but refresh logic not implemented

### Not Started (next priorities)
- ❌ Signal Ingestion Engine (P06) — Reddit crawler + HN crawler + OpenAI classify + scheduler
- ❌ Email alerts via Resend when new high-confidence signals arrive
- ❌ Stripe checkout session + customer portal flow
- ❌ HubSpot token auto-refresh on expiry

### CRITICAL MANUAL STEP REQUIRED
**Run `supabase/schema.sql` in Supabase SQL Editor before ANY feature can work.**
Also: Enable Realtime for `intent_signals` table in Supabase Dashboard → Database → Replication.

---

## Running the Project

```bash
npm run dev    # starts Next.js on port 5000
```

The "Start application" workflow runs this automatically.
