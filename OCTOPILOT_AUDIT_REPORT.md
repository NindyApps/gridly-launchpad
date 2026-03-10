# LAPORAN AUDIT OCTOPILOT — FORMAT RDP & MVP
**Tanggal Audit:** 10 Maret 2026  
**Auditor:** Replit Agent (Full Codebase Scan)  
**Commit Terakhir:** b6b98011467e9dc71b4140f57bcba0b3edbb8a25

---

## BAGIAN 1 — IDENTITAS PRODUK

### 1.1 Nama Produk & Deskripsi Satu Kalimat

**OCTOPILOT** — Platform B2B Revenue Signal Intelligence yang memantau komunitas publik (Reddit, Hacker News) secara real-time, mengklasifikasikan sinyal buying intent menggunakan AI (OpenAI GPT-4o-mini), dan menginjeksikan peluang terverifikasi ke HubSpot CRM secara otomatis dengan prinsip Zero-Write Architecture.

---

### 1.2 Tech Stack Aktual

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| **Frontend Framework** | Next.js App Router | 14.2.35 |
| **Language** | TypeScript | 5.8.3 (strict mode dikonfigurasi via tsconfig) |
| **CSS/Styling** | Tailwind CSS | 3.4.17 |
| **UI Component Library** | shadcn/ui (Radix UI primitives) | Semua paket @radix-ui/* terinstall |
| **Animation** | framer-motion | 12.34.5 |
| **Router** | Next.js App Router (bawaan) | — |
| **State Management** | TanStack Query v5 + useState lokal | v5.83.0 |
| **Database Client** | @supabase/ssr + @supabase/supabase-js | 0.9.0 / 2.98.0 |
| **Auth** | Supabase Auth (email+password + Google OAuth) | — |
| **Backend** | Next.js API Routes (bukan Express, bukan Edge Functions) | — |
| **AI Client** | openai SDK | 6.27.0 |
| **CRM** | HubSpot REST API (via lib/hubspot.ts) | — |
| **Email** | Resend | 6.9.3 |
| **Billing** | Stripe | 20.4.1 |
| **Charts** | Recharts | 2.15.4 |
| **Build Tool** | Next.js (Webpack/Turbopack) | — |
| **Deploy Target** | Replit (port 5000) / Vercel-compatible | — |

> **CATATAN PENTING:** Stack BUKAN Vite + React seperti di prompt P01/P03/P05 awal. Stack aktual adalah Next.js 14 App Router penuh, yang lebih advanced dari spesifikasi awal.

---

### 1.3 Struktur Folder Aktual

```
OCTOPILOT/
├── src/
│   ├── app/
│   │   ├── (app)/                          [EXISTS — layout group utama]
│   │   │   ├── layout.tsx                  [EXISTS — 37 baris, auth guard client-side]
│   │   │   ├── dashboard/page.tsx          [EXISTS — 93 baris, FUNCTIONAL]
│   │   │   ├── trackers/page.tsx           [EXISTS — 122 baris, FUNCTIONAL]
│   │   │   ├── analytics/page.tsx          [EXISTS — 108 baris, FUNCTIONAL]
│   │   │   └── settings/
│   │   │       ├── crm/page.tsx            [EXISTS — 91 baris, PARTIAL]
│   │   │       ├── billing/page.tsx        [EXISTS — 108 baris, PARTIAL/MOCK]
│   │   │       ├── team/page.tsx           [EXISTS — 116 baris, PARTIAL/MOCK]
│   │   │       └── alerts/page.tsx         [EXISTS — 95 baris, PARTIAL]
│   │   ├── (auth)/                         [EXISTS — layout group auth]
│   │   │   ├── layout.tsx                  [EXISTS]
│   │   │   ├── login/page.tsx              [EXISTS — 226 baris, FUNCTIONAL]
│   │   │   ├── signup/page.tsx             [EXISTS — 278 baris, FUNCTIONAL]
│   │   │   ├── register/page.tsx           [EXISTS — 213 baris, DUPLIKAT signup]
│   │   │   ├── onboarding/page.tsx         [EXISTS — 199 baris, CONFLICT dengan /onboarding]
│   │   │   └── accept-invite/page.tsx      [EXISTS — 202 baris, FUNCTIONAL]
│   │   ├── (dashboard)/                    [EXISTS — layout group LAMA, harus dihapus]
│   │   │   ├── layout.tsx                  [EXISTS — 43 baris, duplikat]
│   │   │   └── dashboard/
│   │   │       ├── signals/page.tsx        [EXISTS — SKELETON/placeholder]
│   │   │       ├── crm/page.tsx            [EXISTS — SKELETON/placeholder]
│   │   │       ├── compliance/page.tsx     [EXISTS — SKELETON/placeholder]
│   │   │       ├── pipeline/page.tsx       [EXISTS — SKELETON/placeholder]
│   │   │       ├── settings/page.tsx       [EXISTS — SKELETON/placeholder]
│   │   │       └── workflows/page.tsx      [EXISTS — SKELETON/placeholder]
│   │   ├── api/
│   │   │   ├── crm/hubspot/
│   │   │   │   ├── inject/route.ts         [EXISTS — 59 baris, FUNCTIONAL]
│   │   │   │   ├── connect/route.ts        [EXISTS — 14 baris, FUNCTIONAL]
│   │   │   │   └── callback/route.ts       [EXISTS — 55 baris, FUNCTIONAL]
│   │   │   ├── feedback/route.ts           [EXISTS — 70 baris, FUNCTIONAL]
│   │   │   ├── team/invite/route.ts        [EXISTS — 59 baris, FUNCTIONAL]
│   │   │   ├── webhooks/stripe/route.ts    [EXISTS — 53 baris, FUNCTIONAL]
│   │   │   ├── dev/seed/route.ts           [EXISTS — 53 baris, FUNCTIONAL (dev only)]
│   │   │   └── [MISSING] ingestion/*       [MISSING — tidak ada route crawler/AI classify]
│   │   ├── auth/callback/route.ts          [EXISTS — 47 baris, FUNCTIONAL]
│   │   ├── onboarding/page.tsx             [EXISTS — 412 baris, CONFLICT dengan (auth)/onboarding]
│   │   ├── page.tsx                        [EXISTS — 37 baris, landing page]
│   │   ├── layout.tsx                      [EXISTS — root layout]
│   │   ├── globals.css                     [EXISTS]
│   │   ├── providers.tsx                   [EXISTS]
│   │   └── not-found.tsx                   [EXISTS]
│   ├── components/
│   │   ├── ui/                             [EXISTS — 40+ shadcn components, LENGKAP]
│   │   ├── layout/
│   │   │   ├── AppSidebar.tsx              [EXISTS — 302 baris, FUNCTIONAL]
│   │   │   ├── TopBar.tsx                  [EXISTS — 194 baris, FUNCTIONAL]
│   │   │   └── Breadcrumb.tsx              [EXISTS — FUNCTIONAL]
│   │   ├── signals/
│   │   │   ├── SignalCard.tsx              [EXISTS — 267 baris, FUNCTIONAL]
│   │   │   ├── SignalFeed.tsx              [EXISTS — 239 baris, FUNCTIONAL]
│   │   │   └── SignalFilters.tsx           [EXISTS — 179 baris, FUNCTIONAL]
│   │   ├── trackers/
│   │   │   ├── TrackerCard.tsx             [EXISTS — 88 baris, FUNCTIONAL]
│   │   │   └── TrackerForm.tsx             [EXISTS — 178 baris, FUNCTIONAL]
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx               [EXISTS — 96 baris]
│   │   │   └── SignupForm.tsx              [EXISTS — 124 baris]
│   │   ├── shared/
│   │   │   ├── TagInput.tsx                [EXISTS — FUNCTIONAL]
│   │   │   ├── EmptyState.tsx              [EXISTS]
│   │   │   ├── LoadingSpinner.tsx          [EXISTS]
│   │   │   └── ConfirmDialog.tsx           [EXISTS]
│   │   └── [landing page components]       [EXISTS — HeroSection, Features, Pricing, dll]
│   ├── hooks/
│   │   ├── useAuth.ts                      [EXISTS — 83 baris, FUNCTIONAL]
│   │   ├── useSignals.ts                   [EXISTS — 91 baris, FUNCTIONAL]
│   │   ├── useTrackers.ts                  [EXISTS — 97 baris, FUNCTIONAL]
│   │   ├── use-workspaces.ts               [EXISTS — 43 baris, FUNCTIONAL]
│   │   └── use-toast.ts                    [EXISTS]
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                   [EXISTS — browser client]
│   │   │   └── server.ts                   [EXISTS — server client]
│   │   ├── auth.ts                         [EXISTS — 3 baris, re-export useAuth]
│   │   ├── hubspot.ts                      [EXISTS — 171 baris, FUNCTIONAL]
│   │   ├── openai.ts                       [EXISTS — 56 baris, client init only]
│   │   ├── seed-signals.ts                 [EXISTS — 132 baris, FUNCTIONAL]
│   │   └── utils.ts                        [EXISTS — cn() utility]
│   ├── types/
│   │   ├── app.ts                          [EXISTS — 115 baris, COMPLETE types]
│   │   └── database.ts                     [EXISTS — 189 baris, DB types]
│   ├── integrations/supabase/
│   │   ├── client.ts                       [EXISTS — duplikat dari lib/supabase/client.ts]
│   │   └── types.ts                        [EXISTS — 331 baris, auto-generated types]
│   └── middleware.ts                       [EXISTS — 66 baris, FUNCTIONAL]
├── supabase/
│   ├── schema.sql                          [EXISTS — 246 baris, BELUM DIJALANKAN di Supabase]
│   ├── migrations/
│   │   └── 20260304073340_*.sql            [EXISTS — schema BERBEDA, workspace_members]
│   └── functions/
│       └── create-workspace/index.ts       [EXISTS — Deno Edge Function, OUTDATED schema]
├── next.config.mjs                         [EXISTS]
├── tailwind.config.ts                      [EXISTS — 92 baris]
├── components.json                         [EXISTS — shadcn config]
├── package.json                            [EXISTS]
├── .env.local                              [EXISTS — SEMUA key sudah diisi]
└── replit.md                               [EXISTS — dokumentasi project]
```

---

## BAGIAN 2 — RDP (REQUIREMENTS & DESIGN PLAN)

### 2.1 Tujuan Produk

```
MASALAH YANG DISELESAIKAN:
  Tim SDR dan sales B2B kehilangan peluang karena tidak memantau
  komunitas online (Reddit, Hacker News) di mana calon buyer
  secara aktif mencari solusi atau mengeluh tentang kompetitor.

SOLUSI YANG DIBANGUN:
  OCTOPILOT mengotomatisasi pemantauan komunitas, mendeteksi sinyal
  buying intent dengan AI, dan menginjeksikan prospek langsung ke
  HubSpot CRM — tanpa tim sales perlu membuka Reddit secara manual.

TARGET PENGGUNA:
  SDR (Sales Development Representative) di perusahaan B2B SaaS,
  berdasarkan copy landing page: "Find B2B buyers the moment they say
  they need you" dan fitur seperti 'Inject to HubSpot', team roles
  (admin/analyst/sdr/viewer).

VALUE PROPOSITION:
  Zero-Write Architecture — platform TIDAK pernah posting/reply ke
  platform manapun. Revenue signal intelligence murni monitoring +
  CRM injection, dengan AI confidence scoring 0.0–1.0.
```

---

### 2.2 Arsitektur Sistem

```
[BROWSER / CLIENT]
  Next.js 14 App Router (React 18 Client Components)
  TanStack Query v5 → cache + mutations
  Supabase JS client → realtime subscriptions
        |
        | HTTPS / Supabase Realtime WebSocket
        |
[NEXT.JS API ROUTES — /src/app/api/]
  /api/crm/hubspot/connect    → generate OAuth URL
  /api/crm/hubspot/callback   → exchange code → encrypt token → save
  /api/crm/hubspot/inject     → buat contact + task di HubSpot
  /api/feedback               → simpan feedback + dismiss signal
  /api/team/invite            → kirim invite via Supabase Admin
  /api/webhooks/stripe        → handle subscription events
  /api/dev/seed               → seed 8 sample signals (dev only)
        |
        | Supabase SSR Client (cookies-based session)
        |
[SUPABASE]
  Auth: email+password, Google OAuth, Magic Link invite
  Database: PostgreSQL (6 tabel) + RLS
  Realtime: intent_signals table (INSERT subscription)
  Storage: [tidak digunakan]
        |
[EXTERNAL SERVICES]
  HubSpot REST API   → contacts.create, engagements.create
  OpenAI API         → [terkonfigurasi, BELUM digunakan untuk ingestion]
  Stripe             → subscription management (webhook handler ada)
  Resend             → email invite (via team/invite route)
  Reddit API         → [credentials ada di .env, BELUM ada crawler]
  Hacker News        → [BELUM ada crawler — HN API bersifat publik]

[BACKGROUND JOBS / SCHEDULER]
  TIDAK ADA — tidak ada cron job, tidak ada queue, tidak ada scheduler.
  Ingestion engine belum diimplementasikan sama sekali.
```

---

### 2.3 Database Design

**PERINGATAN KRITIS:** Ada DUA schema berbeda di project ini yang SALING BERTENTANGAN:

1. `supabase/schema.sql` → menggunakan tabel `profiles` (yang dipakai seluruh frontend)
2. `supabase/migrations/20260304073340_*.sql` → menggunakan tabel `workspace_members` (schema berbeda)
3. Edge Function `create-workspace/index.ts` → menggunakan `workspace_members` (ikut schema migration, TIDAK kompatibel dengan frontend)

**Schema yang benar untuk dijalankan adalah `supabase/schema.sql`.**

---

**TABEL 1: workspaces**
```
KOLOM: id (uuid PK), name, slug (unique), plan (pro/growth/enterprise),
       hubspot_token_enc, hubspot_refresh_token_enc, hubspot_token_expires_at,
       slack_webhook_url, alert_confidence_threshold (float8, default 0.7),
       seats_limit (int4, default 3), stripe_customer_id, stripe_subscription_id,
       created_at, updated_at
RELASI: root tenant, tidak ada FK ke tabel lain
RLS: ws_select (SELECT by workspace_id match), ws_update (UPDATE for admin only)
STATUS: Schema ada di supabase/schema.sql — BELUM DIJALANKAN
```

**TABEL 2: profiles**
```
KOLOM: id (uuid PK, FK → auth.users), workspace_id (FK → workspaces),
       role (admin/analyst/sdr/viewer), full_name, avatar_url,
       notification_prefs (jsonb), onboarding_completed (bool),
       onboarding_step (int4), last_seen_at, created_at
RELASI: profiles.id → auth.users.id (CASCADE DELETE)
        profiles.workspace_id → workspaces.id (CASCADE DELETE)
RLS: prof_select (workspace members), prof_update (self only), prof_insert (true)
STATUS: Schema ada di supabase/schema.sql — BELUM DIJALANKAN
```

**TABEL 3: trackers**
```
KOLOM: id (uuid PK), workspace_id (FK), created_by (FK → profiles),
       name, keywords (text[]), competitor_names (text[]), subreddits (text[]),
       platforms (text[]), is_active (bool), confidence_override (float8),
       signal_count_7d (int4), created_at, updated_at
RELASI: trackers.workspace_id → workspaces.id
        trackers.created_by → profiles.id
RLS: track_all (ALL operations, workspace match)
STATUS: Schema ada di supabase/schema.sql — BELUM DIJALANKAN
```

**TABEL 4: intent_signals**
```
KOLOM: id (uuid PK), workspace_id (FK), tracker_id (FK → trackers),
       platform (reddit/hackernews/slack), post_url, author_handle,
       post_timestamp, intent_category (vendor_switch/new_purchase/evaluation/complaint),
       intent_level (high/medium/low), confidence_score (float8),
       pain_domain, ai_summary, suggested_opener, urgency_tag (urgent/standard/monitor),
       crm_injected (bool), crm_task_id, dismissed (bool), created_at
RELASI: intent_signals.workspace_id → workspaces.id
        intent_signals.tracker_id → trackers.id
RLS: sig_all (ALL operations, workspace match)
STATUS: Schema ada di supabase/schema.sql — BELUM DIJALANKAN
```

**TABEL 5: human_feedback_loop**
```
KOLOM: id (uuid PK), signal_id (FK → intent_signals), user_id (FK → profiles),
       workspace_id (FK → workspaces), feedback_type
       (useful/not_useful/false_positive/already_known), comment, created_at
RLS: fb_all (ALL operations, workspace match)
STATUS: Schema ada di supabase/schema.sql — BELUM DIJALANKAN
```

**TABEL 6: compliance_logs**
```
KOLOM: id (uuid PK), workspace_id (FK), actor_id (FK → profiles),
       event_type, entity_type, entity_id (uuid), metadata (jsonb), created_at
RLS: log_insert (authenticated only), log_select (workspace match)
STATUS: Schema ada di supabase/schema.sql — BELUM DIJALANKAN
```

---

### 2.4 Authentication Design

```
AUTH PROVIDER: Supabase Auth

METODE LOGIN:
  - Email + Password (signInWithPassword)
  - Google OAuth (signInWithOAuth, provider: 'google')
  - Magic Link / Invite (verifyOtp, type: 'invite') untuk accept-invite

SESSION MANAGEMENT:
  - @supabase/ssr dengan cookie-based session
  - lib/supabase/server.ts → createServerClient() untuk API routes
  - lib/supabase/client.ts → createBrowserClient() untuk komponen
  - Session direfresh otomatis oleh middleware

PROTECTED ROUTES (middleware.ts):
  - Server-side check di setiap request
  - Protected: /dashboard/*, /trackers/*, /analytics/*, /settings/*, /onboarding/*
  - Public: /, /login, /signup, /accept-invite, /api/*, /auth/*
  - Unauthenticated → redirect ke /login
  - Authenticated di auth page → redirect ke /dashboard
  - CATATAN: Pengecekan onboarding_completed TIDAK ada di middleware —
    hanya ada di client-side (app)/layout.tsx

ROLES: admin, analyst, sdr, viewer
  - Defined di types/app.ts sebagai UserRole
  - Role check ada di API routes (hanya admin bisa update workspace)
  - Frontend tidak enforce role-based UI perbedaan (semua role lihat semua menu)
```

---

### 2.5 Fitur yang Dirancang vs Diimplementasi

| FITUR | STATUS | BUKTI | CATATAN |
|-------|--------|-------|---------|
| Landing Page | COMPLETE | src/app/page.tsx + 10 komponen | Hero, Features, Pricing, FAQ, CTA semua ada |
| Login (email+pw) | COMPLETE | (auth)/login/page.tsx | Form lengkap, error handling, redirect |
| Login (Google OAuth) | COMPLETE | (auth)/login/page.tsx | signInWithOAuth terkonfigurasi |
| Forgot Password | COMPLETE | (auth)/login/page.tsx | resetPasswordForEmail + toast |
| Signup | COMPLETE | (auth)/signup/page.tsx | Password strength bar, ToS checkbox |
| Accept Invite | COMPLETE | (auth)/accept-invite/page.tsx | verifyOtp + updateUser |
| Auth Callback | COMPLETE | app/auth/callback/route.ts | Handle code exchange |
| Onboarding Wizard | PARTIAL | app/onboarding/page.tsx (412 baris) | CONFLICT: ada 2 file onboarding |
| Auto-create Workspace | COMPLETE (schema) | supabase/schema.sql trigger | handle_new_user() — tapi schema belum dijalankan |
| App Shell (Sidebar) | COMPLETE | layout/AppSidebar.tsx | Collapsible, mobile drawer |
| App Shell (TopBar) | COMPLETE | layout/TopBar.tsx | Search, notifications, user menu |
| Dashboard Stats Row | COMPLETE | (app)/dashboard/page.tsx | 4 stat cards, computed from signals |
| Signal Feed | COMPLETE | SignalFeed.tsx | Realtime, filters, empty states, skeleton |
| Signal Card | COMPLETE | SignalCard.tsx | Border intent, badges, opener, feedback, dismiss |
| Signal Filters | COMPLETE | SignalFilters.tsx | Pills, dropdowns, sort, result count |
| Signal Feedback API | COMPLETE | api/feedback/route.ts | INSERT + auto-dismiss + compliance log |
| Signal Dismiss | COMPLETE | useSignals.ts useDismissSignal() | framer-motion slide-out |
| Tracker CRUD | COMPLETE | (app)/trackers/page.tsx | Create, toggle active, delete |
| TrackerCard | COMPLETE | trackers/TrackerCard.tsx | Keywords, subreddits, signal count |
| TrackerForm | COMPLETE | trackers/TrackerForm.tsx | TagInput untuk keywords + subreddits |
| Analytics Page | PARTIAL | (app)/analytics/page.tsx | Stats cards + by platform/category — NO charts/recharts |
| HubSpot OAuth Flow | PARTIAL | api/crm/hubspot/* | Connect + callback routes ada, tapi hubspotConnected hardcoded false |
| HubSpot Inject | PARTIAL | api/crm/hubspot/inject + lib/hubspot.ts | Logika inject ada, tapi belum teruji end-to-end |
| Settings > CRM | PARTIAL | settings/crm/page.tsx | UI ada, hubspotConnected = false hardcoded |
| Settings > Alerts | PARTIAL | settings/alerts/page.tsx | UI ada, save handler pakai setTimeout mock |
| Settings > Team | PARTIAL | settings/team/page.tsx | Invite form ada (API real), member list MOCK |
| Settings > Billing | PARTIAL | settings/billing/page.tsx | UI ada, data hardcoded (bukan dari Stripe/DB) |
| Stripe Webhook | PARTIAL | api/webhooks/stripe/route.ts | Handler ada, tapi belum ada Stripe product IDs |
| Team Invite Email | PARTIAL | api/team/invite/route.ts | Supabase invite ada, Resend email tidak |
| Signal Ingestion Engine | NOT STARTED | — | TIDAK ADA crawler Reddit/HN, TIDAK ADA cron job |
| AI Classification | NOT STARTED | lib/openai.ts | Client ada, tapi tidak ada classify() function |
| Email Alert System | NOT STARTED | — | Resend terinstall tapi tidak dipakai |
| Seed Data | COMPLETE | lib/seed-signals.ts + api/dev/seed | 8 sample signals, dev-only |
| Realtime Signal Updates | COMPLETE | SignalFeed.tsx | Supabase Realtime INSERT subscription |
| Compliance Logs | PARTIAL | compliance_logs table + feedback route | Ditulis via feedback, belum ada UI viewer |

---

## BAGIAN 3 — MVP ASSESSMENT

### 3.1 Definisi MVP untuk Produk Ini

**Core loop yang HARUS jalan untuk MVP:**
1. SDR signup → workspace auto-created → onboarding selesai
2. Buat tracker (keywords + subreddits)
3. Sistem crawl Reddit/HN → AI classify → simpan ke intent_signals
4. SDR buka dashboard → lihat signal cards dengan confidence score
5. SDR klik "Inject to HubSpot" → contact + task muncul di HubSpot
6. SDR beri feedback (Useful/Not Useful) → sistem belajar

**Bisakah seorang SDR masuk, melihat sinyal, dan inject ke CRM?**

> **PARTIAL — DENGAN CATATAN BESAR**

- ✅ SDR bisa signup, login, dan onboarding
- ✅ SDR bisa buat tracker
- ✅ SDR bisa lihat signal cards (dengan seed data via /api/dev/seed)
- ✅ SDR bisa klik "Inject to HubSpot" — logika ada
- ❌ Signal TIDAK muncul secara organik (tidak ada crawler/ingestion engine)
- ❌ HubSpot inject belum teruji end-to-end (token belum pernah tersimpan)
- ❌ Database schema BELUM DIJALANKAN di Supabase — sehingga TIDAK ADA yang bekerja di production

**Kesimpulan:** Demo bisa dilakukan HANYA dengan seed data manual. Produk belum bisa dipakai oleh real customer karena tidak ada sinyal yang masuk secara otomatis.

---

### 3.2 Status Setiap Modul (Progress Report)

```
─────────────────────────────────────
MODUL: Landing Page
PROGRESS: 100%
FILE YANG ADA: src/app/page.tsx, HeroSection.tsx, Features.tsx, HowItWorks.tsx,
               Pricing.tsx, FAQ.tsx, CTASection.tsx, Testimonials.tsx,
               StatsMarquee.tsx, SeeItInAction.tsx, Navbar.tsx, Footer.tsx
APA YANG SUDAH JALAN:
  - Hero section dengan copy "Find B2B buyers the moment they say they need you"
  - Features section (Reddit monitoring, HN detection, HubSpot injection, AI scoring)
  - Pricing tiers (Pro $299, Growth $599, Enterprise $1200)
  - FAQ, Testimonials, CTA sections
  - DashboardPreview komponen (visual mockup)
APA YANG BELUM:
  - Stripe checkout dari tombol pricing
  - Waitlist/signup form dari CTA (mengarah ke /signup yang sudah ada)
BLOCKER: Tidak ada
─────────────────────────────────────

─────────────────────────────────────
MODUL: Autentikasi (Login/Signup/Session)
PROGRESS: 90%
FILE YANG ADA: (auth)/login/page.tsx, (auth)/signup/page.tsx,
               (auth)/register/page.tsx (duplikat), (auth)/accept-invite/page.tsx,
               auth/callback/route.ts, hooks/useAuth.ts, middleware.ts
APA YANG SUDAH JALAN:
  - Login email+password dengan error handling
  - Login Google OAuth
  - Forgot password via resetPasswordForEmail
  - Signup dengan password strength bar
  - Accept invite via verifyOtp
  - Auth callback untuk OAuth code exchange
  - Session management via @supabase/ssr cookies
  - Middleware redirect unauthenticated → /login
APA YANG BELUM:
  - Google OAuth belum dikonfigurasi di Supabase Dashboard (perlu redirect URL)
  - register/page.tsx adalah duplikat signup (tidak perlu ada)
  - Onboarding_completed check di middleware (saat ini hanya di client-side)
BLOCKER: Supabase schema BELUM DIJALANKAN (handle_new_user trigger tidak ada)
─────────────────────────────────────

─────────────────────────────────────
MODUL: Onboarding Flow
PROGRESS: 70%
FILE YANG ADA: app/onboarding/page.tsx (412 baris), (auth)/onboarding/page.tsx (199 baris)
APA YANG SUDAH JALAN:
  - 4-step wizard: Welcome → Connect HubSpot → Create Tracker → Invite Team
  - Progress bar shadcn
  - Create tracker form dengan TagInput
  - Mark onboarding_completed = true
  - Navigate ke /dashboard setelah selesai
APA YANG BELUM:
  - DUA file onboarding yang conflict — hanya satu yang seharusnya ada
  - HubSpot connect di step 1 adalah placeholder
  - Team invite di step 3 adalah placeholder
BLOCKER: Konflik dua onboarding page, Supabase schema belum dijalankan
─────────────────────────────────────

─────────────────────────────────────
MODUL: App Shell (Sidebar + Layout + Navigation)
PROGRESS: 95%
FILE YANG ADA: layout/AppSidebar.tsx (302 baris), layout/TopBar.tsx (194 baris),
               layout/Breadcrumb.tsx, (app)/layout.tsx (37 baris)
APA YANG SUDAH JALAN:
  - Collapsible sidebar 64px (icon only) ↔ 240px (expanded)
  - localStorage persist untuk state collapsed
  - Workspace name + plan badge
  - Indigo left-border active state per nav item
  - Mobile Sheet drawer untuk layar kecil
  - TopBar dengan search, help modal, notification bell, user dropdown
  - Breadcrumb route-aware
  - Client-side auth guard di (app)/layout.tsx
APA YANG BELUM:
  - Notification bell menampilkan data real (saat ini hanya badge angka mock)
  - (dashboard) layout group lama masih ada (konflik route)
BLOCKER: Tidak ada blocker signifikan
─────────────────────────────────────

─────────────────────────────────────
MODUL: Dashboard & Signal Feed
PROGRESS: 85%
FILE YANG ADA: (app)/dashboard/page.tsx, components/signals/SignalFeed.tsx,
               components/signals/SignalFilters.tsx
APA YANG SUDAH JALAN:
  - 4 stat cards (Signals Today, High Intent, Injected Today, Acceptance Rate)
  - Sticky filter bar dengan intent pills, category/tracker/platform/sort dropdowns
  - Signal feed dengan realtime Supabase subscription
  - New signals banner "N new signals — click to refresh"
  - 3 empty states berbeda
  - Skeleton loading 3 cards
  - Client-side filtering + sorting
APA YANG BELUM:
  - Data aktual (sinyal muncul hanya setelah ingestion engine jalan)
  - Stats cards menghitung dari data lokal, bukan query terpisah yang dioptimasi
BLOCKER: Supabase schema + ingestion engine
─────────────────────────────────────

─────────────────────────────────────
MODUL: Signal Card Component
PROGRESS: 95%
FILE YANG ADA: components/signals/SignalCard.tsx (267 baris)
APA YANG SUDAH JALAN:
  - 4px colored left border (red/amber/slate by intent_level)
  - Platform badges (Reddit r/subredditname, HN orange Y)
  - Confidence pill (green/amber/slate + nilai numerik)
  - URGENT badge (hanya jika urgency_tag === 'urgent')
  - Collapsible suggested opener dengan copy ke clipboard
  - Useful / Not Useful feedback buttons
  - Dismiss dengan framer-motion slide-out animation
  - Inject to HubSpot button dengan loading state
  - "Injected ✓" state setelah berhasil inject
APA YANG BELUM:
  - HubSpot inject belum teruji end-to-end
BLOCKER: HubSpot token (perlu connect dulu)
─────────────────────────────────────

─────────────────────────────────────
MODUL: Tracker Management (CRUD)
PROGRESS: 85%
FILE YANG ADA: (app)/trackers/page.tsx (122 baris), trackers/TrackerCard.tsx,
               trackers/TrackerForm.tsx, hooks/useTrackers.ts
APA YANG SUDAH JALAN:
  - Lihat semua trackers workspace
  - Buat tracker baru (nama, keywords, subreddits, platforms)
  - Toggle is_active per tracker
  - Hapus tracker dengan konfirmasi dialog
  - TagInput untuk keywords dan subreddits
  - Signal count display per tracker
APA YANG BELUM:
  - Edit tracker yang sudah ada (form ada tapi update mutation belum)
  - Tracker detail page (/trackers/:id)
  - Lihat signals per tracker (filter feed by tracker)
BLOCKER: Supabase schema belum dijalankan
─────────────────────────────────────

─────────────────────────────────────
MODUL: HubSpot CRM Integration
PROGRESS: 50%
FILE YANG ADA: lib/hubspot.ts (171 baris), api/crm/hubspot/inject/route.ts,
               api/crm/hubspot/connect/route.ts, api/crm/hubspot/callback/route.ts,
               settings/crm/page.tsx
APA YANG SUDAH JALAN:
  - OAuth URL generation (GET /api/crm/hubspot/connect)
  - Token exchange + enkripsi + simpan ke DB (callback route)
  - lib/hubspot.ts: getContact, createContact, createTask, injectSignalToCRM
  - Inject route: query signal → get workspace token → decrypt → create contact + task
  - Settings > CRM page: tombol "Connect HubSpot" yang memanggil connect route
APA YANG BELUM:
  - hubspotConnected di CRM page hardcoded false (tidak baca dari DB)
  - Token refresh logic belum ada (token akan expired setelah 6 jam)
  - Disconnect HubSpot belum diimplementasikan
  - Belum teruji end-to-end (butuh HubSpot account + valid credentials)
BLOCKER: HUBSPOT_CLIENT_ID/SECRET perlu dikonfigurasi + Supabase schema dijalankan
─────────────────────────────────────

─────────────────────────────────────
MODUL: AI Signal Ingestion Engine
PROGRESS: 0%
FILE YANG ADA: lib/openai.ts (56 baris — hanya inisialisasi client)
APA YANG SUDAH JALAN:
  - OpenAI client terinisialisasi (bisa digunakan)
  - Reddit credentials ada di .env.local
APA YANG BELUM:
  - Reddit API crawler (belum ada route/function crawl subreddit)
  - Hacker News crawler (belum ada — HN API publik, tidak perlu auth)
  - AI classification function (intent_level, confidence_score, ai_summary, dll)
  - Scheduler/cron job untuk menjalankan crawling secara berkala
  - De-duplication (mencegah signal duplikat dari URL yang sama)
  - Rate limiting per workspace (signal_quota)
BLOCKER: Ini adalah blocker terbesar untuk go-live
─────────────────────────────────────

─────────────────────────────────────
MODUL: Alert & Email System
PROGRESS: 5%
FILE YANG ADA: api/team/invite/route.ts (menggunakan Supabase invite, bukan Resend)
APA YANG SUDAH JALAN:
  - Resend package terinstall
  - RESEND_API_KEY ada di .env.local
  - Settings > Alerts page: UI toggle email/slack, confidence threshold slider
APA YANG BELUM:
  - Email alert saat signal baru muncul
  - Slack webhook notification
  - Alert handler yang dipanggil setelah ingestion
  - Alert settings belum disimpan ke DB (save pakai setTimeout mock)
BLOCKER: Ingestion engine harus ada dulu
─────────────────────────────────────

─────────────────────────────────────
MODUL: Analytics & Charts
PROGRESS: 40%
FILE YANG ADA: (app)/analytics/page.tsx (108 baris)
APA YANG SUDAH JALAN:
  - 4 stat cards (Total Signals, High Intent, Pushed to CRM, Avg Confidence)
  - Signals by Platform: bar chart sederhana dengan progress bars HTML
  - Signals by Category: bar chart sederhana dengan progress bars HTML
APA YANG BELUM:
  - Recharts terinstall tapi TIDAK DIPAKAI di analytics page
  - Tidak ada chart time-series (signals over time)
  - Tidak ada conversion funnel (viewed → injected → responded)
  - Tidak ada filter by date range
  - Tidak ada export/download data
BLOCKER: Data dari ingestion engine
─────────────────────────────────────

─────────────────────────────────────
MODUL: Billing (Stripe)
PROGRESS: 25%
FILE YANG ADA: api/webhooks/stripe/route.ts (53 baris), settings/billing/page.tsx
APA YANG SUDAH JALAN:
  - Stripe package terinstall
  - STRIPE_SECRET_KEY dan STRIPE_WEBHOOK_SECRET ada di .env.local
  - Webhook handler: checkout.session.completed → update workspace.plan
  - Billing page: plan cards Pro/Growth/Enterprise dengan pricing
  - Usage progress bars (hardcoded, tidak dari DB)
APA YANG BELUM:
  - STRIPE_PLAN_IDs tidak dikonfigurasi (PLAN_MAP di webhook handler kosong string)
  - Tidak ada checkout flow (tombol upgrade tidak melakukan apa-apa)
  - Tidak ada portal billing Stripe (untuk manage subscription)
  - Current plan tidak dibaca dari DB
  - Signal usage quota tidak ditegakkan
BLOCKER: Butuh Stripe products/prices dikonfigurasi
─────────────────────────────────────

─────────────────────────────────────
MODUL: Team Management
PROGRESS: 50%
FILE YANG ADA: settings/team/page.tsx (116 baris), api/team/invite/route.ts
APA YANG SUDAH JALAN:
  - Invite form: email + role selector
  - API route: Supabase admin.auth.inviteUserByEmail() → kirim magic link
  - Accept invite page: verifyOtp + setPassword
  - Role definitions: admin/analyst/sdr/viewer
APA YANG BELUM:
  - Member list adalah HARDCODED MOCK DATA (bukan dari DB)
  - Tidak ada remove/deactivate member
  - Tidak ada seats limit enforcement
  - Email invite tidak menggunakan Resend (pakai Supabase default email)
BLOCKER: Supabase schema belum dijalankan
─────────────────────────────────────

─────────────────────────────────────
MODUL: Supabase Edge Functions
PROGRESS: 10%
FILE YANG ADA: supabase/functions/create-workspace/index.ts
APA YANG SUDAH JALAN:
  - 1 Edge Function ada: create-workspace (Deno)
APA YANG BELUM:
  - create-workspace menggunakan tabel workspace_members yang TIDAK ADA di schema aktual
  - Tidak ada Edge Function untuk ingestion (scan-reddit, classify-signal, dll)
  - Tidak ada Edge Function untuk HubSpot (saat ini pakai API routes)
  - Edge Function belum di-deploy
BLOCKER: Schema mismatch — tidak bisa digunakan
─────────────────────────────────────

─────────────────────────────────────
MODUL: Database Schema & RLS
PROGRESS: 60%
FILE YANG ADA: supabase/schema.sql (246 baris), supabase/migrations/20260304073340_*.sql
APA YANG SUDAH JALAN:
  - Schema SQL lengkap tersedia di supabase/schema.sql
  - 6 tabel dengan kolom yang tepat
  - RLS policies untuk semua tabel
  - Trigger handle_new_user() untuk auto-create workspace + profile
  - Indexes untuk query performance
APA YANG BELUM:
  - Schema BELUM DIJALANKAN di Supabase (CRITICAL BLOCKER)
  - Ada dua schema yang konflik (schema.sql vs migration file)
  - Realtime belum diaktifkan untuk intent_signals
BLOCKER: USER HARUS JALANKAN supabase/schema.sql di Supabase SQL Editor
─────────────────────────────────────
```

---

### 3.3 Tabel Ringkasan Progress

| MODUL | PROGRESS | STATUS | PRIORITAS |
|-------|----------|--------|-----------|
| Landing Page | 100% | ✅ Done | P2 |
| Autentikasi | 90% | ✅ Done | P0 |
| Onboarding Flow | 70% | 🔄 In Progress | P0 |
| App Shell (Layout) | 95% | ✅ Done | P1 |
| Dashboard & Signal Feed | 85% | ✅ Done | P0 |
| Signal Card Component | 95% | ✅ Done | P0 |
| Tracker Management | 85% | ✅ Done | P0 |
| HubSpot CRM Integration | 50% | 🔄 In Progress | P0 |
| AI Signal Ingestion Engine | 0% | ❌ Not Started | P0 |
| Alert & Email System | 5% | ❌ Not Started | P1 |
| Analytics & Charts | 40% | 🔄 In Progress | P2 |
| Billing (Stripe) | 25% | 🔄 In Progress | P1 |
| Team Management | 50% | 🔄 In Progress | P1 |
| Supabase Edge Functions | 10% | ❌ Not Started | P1 |
| Database Schema & RLS | 60% | 🔄 In Progress | P0 |

**OVERALL PROJECT COMPLETION: ~57%**

---

## BAGIAN 4 — ANALISIS REAL (JUJUR)

### 4.1 Apa yang Benar-Benar Jalan Sekarang

(Jika Supabase schema sudah dijalankan)

- ✅ **Landing Page** — HeroSection, Features, Pricing, FAQ, CTA, Testimonials semua render (`src/app/page.tsx`)
- ✅ **Signup dengan email** — form validasi, password strength, ToS (`(auth)/signup/page.tsx`)
- ✅ **Login dengan email** — form, error handling, redirect (`(auth)/login/page.tsx`)
- ✅ **Forgot password** — resetPasswordForEmail + toast feedback
- ✅ **Auth middleware** — unauthenticated redirect ke /login (`src/middleware.ts`)
- ✅ **App Shell** — sidebar collapsible, topbar, breadcrumb render (`layout/AppSidebar.tsx`, `layout/TopBar.tsx`)
- ✅ **Dashboard UI** — stats row + filter bar + signal feed render (`(app)/dashboard/page.tsx`)
- ✅ **Signal Card UI** — semua elemen visual render dengan benar (`signals/SignalCard.tsx`)
- ✅ **Tracker CRUD** — create/toggle/delete tracker (`(app)/trackers/page.tsx`)
- ✅ **Seed Signals (dev)** — `POST /api/dev/seed` mengisi 8 sinyal sample
- ✅ **Signal Feedback API** — `POST /api/feedback` menyimpan ke DB (`api/feedback/route.ts`)
- ✅ **Settings > CRM UI** — tombol Connect HubSpot trigger OAuth URL generation

---

### 4.2 Apa yang Ada Tapi Tidak Jalan

- ⚠️ **Seluruh aplikasi** — database schema belum dijalankan, sehingga semua query Supabase akan error
- ⚠️ **Google OAuth** — perlu konfigurasi redirect URL di Supabase Dashboard
- ⚠️ **Onboarding flow** — dua file konflik, `/onboarding` (app group) vs `(auth)/onboarding`
- ⚠️ **HubSpot inject** — logika ada, tapi `hubspotConnected = false` hardcoded di CRM settings, token belum pernah tersimpan
- ⚠️ **HubSpot token refresh** — token HubSpot expire setelah 6 jam, tidak ada refresh logic
- ⚠️ **Settings > Alerts save** — handler menggunakan `setTimeout()` mock, tidak menyimpan ke DB
- ⚠️ **Settings > Team member list** — menampilkan `MOCK_MEMBERS` hardcoded, bukan data dari DB
- ⚠️ **Settings > Billing** — data usage (127/500 signals, 1/5 seats) hardcoded, bukan dari DB/Stripe
- ⚠️ **Stripe billing** — `PLAN_MAP` di webhook memiliki key kosong string (`''`), upgrade flow tidak ada
- ⚠️ **Analytics charts** — recharts terinstall tapi tidak digunakan, progress bars HTML biasa
- ⚠️ **Edge Function create-workspace** — menggunakan `workspace_members` table yang tidak ada di schema aktual
- ⚠️ **`(dashboard)` layout group** — masih ada 6 halaman skeleton dari versi lama, bisa menyebabkan konflik routing

---

### 4.3 Apa yang Sama Sekali Belum Ada

- ❌ **Reddit Crawler** — tidak ada kode untuk crawl subreddit, tidak ada route, tidak ada scheduler
- ❌ **Hacker News Crawler** — tidak ada kode untuk crawl HN (bahkan HN API bersifat publik, tidak perlu OAuth)
- ❌ **AI Classification Pipeline** — `lib/openai.ts` ada OpenAI client, tapi tidak ada fungsi classify signal
- ❌ **Cron Job / Scheduler** — tidak ada background job, tidak ada queue, tidak ada webhook scheduler
- ❌ **Email Alert System** — Resend terinstall + API key ada, tapi tidak ada satu pun email yang dikirim
- ❌ **Slack Alert** — UI toggle ada di settings, tapi tidak ada kode Slack webhook sender
- ❌ **Signal Deduplication** — tidak ada mekanisme mencegah signal duplikat dari URL yang sama
- ❌ **Signal Quota Enforcement** — workspace memiliki `seats_limit` dan `signal_quota` di schema tapi tidak ditegakkan
- ❌ **Tracker Detail Page** — `/trackers/:id` route tidak ada
- ❌ **Edit Tracker** — TrackerForm ada tapi tidak ada update mutation
- ❌ **Recharts visualisasi** — package ada tapi tidak dipakai di halaman manapun
- ❌ **Disconnect HubSpot** — tombol ada di UI tapi tidak ada handler/route
- ❌ **Stripe Checkout flow** — tidak ada checkout session creation, tidak ada portal billing

---

### 4.4 Critical Issues (Blocker untuk Launch)

```
[CRITICAL] — Supabase schema BELUM DIJALANKAN
  → User harus jalankan supabase/schema.sql di Supabase SQL Editor
  → Tanpa ini, 100% fitur yang butuh DB tidak bisa berjalan

[CRITICAL] — Tidak ada Signal Ingestion Engine
  → Produk tidak bisa menghasilkan sinyal otomatis
  → Butuh: Reddit crawler + HN crawler + AI classify + scheduler
  → Ini adalah core value proposition yang belum ada

[HIGH] — Konflik dua onboarding page
  → app/onboarding/page.tsx (412 baris) vs (auth)/onboarding/page.tsx (199 baris)
  → Middleware dan layout group mana yang aktif?
  → Perlu diselesaikan sebelum user flow bisa berjalan

[HIGH] — (dashboard) layout group lama masih ada
  → 6 halaman skeleton di (dashboard)/dashboard/* bisa konflik dengan (app)/*
  → Route /dashboard/signals, /dashboard/crm, dll masih accessible

[HIGH] — HubSpot `hubspotConnected` hardcoded false
  → Meski token tersimpan di DB setelah OAuth, UI tidak membacanya
  → Inject button muncul tapi status CRM tidak akurat

[HIGH] — Member list di Team settings adalah MOCK data
  → Tidak ada query ke profiles table
  → Users yang sudah invite tidak terlihat di UI

[MEDIUM] — Stripe PLAN_MAP tidak dikonfigurasi
  → `'': 'pro'` di webhook handler akan gagal matching semua events
  → Upgrade plan tidak akan berfungsi

[MEDIUM] — Google OAuth redirect URL belum dikonfigurasi di Supabase Dashboard
  → Login dengan Google akan redirect ke URL yang salah

[MEDIUM] — HubSpot token refresh tidak ada
  → Token expire setelah 6 jam, inject akan gagal setelah itu

[MEDIUM] — Alert settings tidak disimpan ke DB
  → User mengubah confidence threshold tapi tidak ada yang tersimpan
```

---

### 4.5 Security Issues yang Ditemukan

```
[OK] — Tidak ada hardcoded API key di kode sumber
  → Semua secrets menggunakan process.env.* atau import.meta.env.*
  → .env.local ada dan terisi (tidak di-commit ke git)

[OK] — API routes menggunakan Supabase SSR session check
  → inject/route.ts, feedback/route.ts, dll semua check auth dulu

[PERHATIAN] — lib/seed-signals.ts menggunakan service role key via environment
  → Baris: createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  → NEXT_PUBLIC_ prefix pada SUPABASE_URL tidak masalah (URL bukan secret)
  → SERVICE_ROLE_KEY harus TIDAK pernah di-expose ke client — di sini digunakan server-side (OK)

[PERHATIAN] — api/dev/seed/route.ts cek NODE_ENV
  → if (process.env.NODE_ENV === 'production') return 403
  → Proteksi ini memadai, tapi route ini tetap bisa diakses di staging/preview

[PERHATIAN] — supabase/functions/create-workspace CORS terlalu permissive
  → "Access-Control-Allow-Origin": "*"
  → Edge Function ini harus diproteksi dengan Supabase auth header

[PERHATIAN] — Middleware tidak check onboarding_completed
  → User yang belum onboarding bisa akses /dashboard langsung
  → Hanya (app)/layout.tsx yang check onboarding (client-side, bisa di-bypass)

[OK] — RLS policies dikonfigurasi di semua 6 tabel
  → workspace isolation benar — user hanya bisa lihat data workspace sendiri

[OK] — Input validation ada di API routes
  → feedback/route.ts: cek signal_id dan feedback_type sebelum INSERT
  → team/invite/route.ts: cek email, role, workspace_id

[RENDAH] — Tidak ada rate limiting di API routes
  → /api/team/invite bisa di-spam untuk kirim banyak email invite
  → /api/crm/hubspot/inject bisa dipanggil berkali-kali untuk signal yang sama
```

---

## BAGIAN 5 — USER FLOW ANALYSIS

### 5.1 Flow yang Sudah Bisa Dijalankan

**PRASYARAT: Supabase schema.sql harus dijalankan dulu.**

```
FLOW 1 — Onboarding User Baru:
  Buka URL (https://[replit-domain]) →
  Landing page render dengan semua section → 
  Klik "Get Started" → /signup →
  Isi full name, email, password, centang ToS →
  Submit → Supabase signUp() → trigger handle_new_user() →
  Auto-create workspace + profile (admin role) →
  Navigate ke /onboarding →
  [AMBIGUOUS: /onboarding (412 baris) atau (auth)/onboarding (199 baris)?] →
  Step 0: Welcome → Step 1: Skip HubSpot → Step 2: Buat tracker →
  Step 3: Invite team (atau skip) → Mark onboarding_completed = true →
  Navigate ke /dashboard →
  [Flow selesai ✅]

FLOW 2 — Daily SDR Workflow:
  Buka URL → /login (redirect oleh middleware) →
  Login dengan email+password →
  Redirect ke /dashboard →
  Lihat stat cards (0 signals jika belum ada data) →
  [BLOCKED: Sinyal tidak muncul otomatis — tidak ada ingestion engine] →
  POST /api/dev/seed (hanya bisa lewat API call manual) →
  Signal cards muncul dengan 8 sample signals →
  Klik signal → Lihat suggested opener →
  Klik "Copy" → Salin opener ke clipboard [✅] →
  Klik "Useful" → feedback tersimpan ke DB [✅] →
  Klik "Dismiss" → card slide-out dengan animasi [✅] →
  Filter signals dengan intent pills / dropdowns [✅] →
  [Flow partial — hanya dengan seed data]

FLOW 3 — Signal to CRM:
  Di signal card → Klik "Inject to HubSpot" →
  [BLOCKED: hubspotConnected hardcoded false di CRM settings] →
  API route /api/crm/hubspot/inject dipanggil →
  Cek workspace.hubspot_token_enc (null karena belum pernah connect) →
  Return error toast "Connect HubSpot first" →
  Settings > CRM → Klik "Connect HubSpot" →
  Redirect ke /api/crm/hubspot/connect →
  Generate HubSpot OAuth URL →
  Redirect ke HubSpot authorization page →
  [BUTUH HUBSPOT_CLIENT_ID yang valid dan dikonfigurasi] →
  Setelah authorize → callback ke /api/crm/hubspot/callback →
  Token di-exchange, dienkripsi, disimpan ke workspaces.hubspot_token_enc →
  Redirect ke /settings/crm →
  [Tapi: UI masih tampilkan "Not Connected" karena hardcoded]
```

---

### 5.2 Flow yang Belum Bisa Dijalankan

```
FLOW — Signal Ingestion Otomatis:
  HARUSNYA: Cron job setiap X menit →
  Crawl subreddit dari tracker.subreddits →
  Filter posts yang match tracker.keywords →
  Send ke OpenAI untuk klasifikasi →
  INSERT ke intent_signals →
  Realtime subscription trigger banner di frontend
  
  BREAK POINT: Tidak ada cron job, tidak ada crawler, tidak ada classify function.
  SEMUA langkah di flow ini 0% implemented.

FLOW — Stripe Upgrade:
  User di /settings/billing klik "Upgrade to Growth" →
  BREAK POINT: Tombol tidak punya handler yang fungsional.
  Tidak ada Stripe Checkout Session creation.

FLOW — Email Alert:
  Signal baru muncul di DB dengan confidence_score > threshold →
  BREAK POINT: Tidak ada trigger/handler yang mengirim email.
  Resend terinstall tapi tidak pernah dipanggil.

FLOW — Recharts Analytics:
  User di /analytics lihat time-series chart →
  BREAK POINT: Recharts tidak dipakai, tidak ada chart komponen.
```

---

## BAGIAN 6 — REKOMENDASI LANGKAH SELANJUTNYA

### 6.1 Untuk Mencapai Demo-Ready (bisa demo ke 1 customer)

```
PRIORITAS 1 — Jalankan Supabase schema.sql di SQL Editor — estimasi 15 MENIT (manual)
  → Ini membuka semua fitur yang sudah ada
  → Tanpa ini, tidak ada yang bisa dites

PRIORITAS 2 — Bersihkan konflik kode yang ada — estimasi 1 sesi Agent
  → Hapus (dashboard)/ layout group lama (6 halaman skeleton)
  → Hapus (auth)/register/page.tsx (duplikat signup)
  → Resolve konflik dua onboarding pages (pilih satu, hapus satunya)
  → Fix: hubspotConnected baca dari DB, bukan hardcoded

PRIORITAS 3 — Bangun AI Signal Ingestion Engine — estimasi 3-4 sesi Agent
  → Reddit crawler (fetch posts from subreddits via Reddit API)
  → Hacker News crawler (fetch top stories + comments via public HN API)
  → OpenAI classify function (intent_level, confidence, ai_summary, suggested_opener)
  → Cron/scheduler (Next.js route handler + external cron, atau Supabase Edge Function + pg_cron)

PRIORITAS 4 — Fix Team Management member list — estimasi 1 sesi Agent
  → Query profiles table berdasarkan workspace_id
  → Ganti MOCK_MEMBERS dengan data real
  → Tambah remove member functionality

PRIORITAS 5 — Aktivasi Realtime di Supabase Dashboard — estimasi 5 MENIT (manual)
  → Database → Replication → centang intent_signals
```

### 6.2 Untuk Mencapai MVP Launch (bisa onboard paying customer)

```
+ Stripe checkout flow (create checkout session, customer portal)
+ HubSpot token refresh logic
+ Email alerts via Resend ketika signal confidence > threshold
+ Slack webhook alerts
+ Signal quota enforcement per workspace
+ Recharts visualisasi di Analytics page (time-series, conversion funnel)
+ Edit tracker functionality
+ Tracker detail page (/trackers/:id)
+ Rate limiting di API routes
+ Onboarding_completed check di middleware (server-side)
+ Stripe product IDs dikonfigurasi di PLAN_MAP
```

### 6.3 Quick Wins (bisa selesai dalam 1 sesi Agent)

1. **Hapus dead code** — (dashboard) group lama, register page duplikat, konflik onboarding
2. **Fix CRM settings** — baca hubspot_token_enc dari DB untuk tampilkan status "Connected"
3. **Fix Team member list** — query profiles table, hapus MOCK_MEMBERS
4. **Fix Alerts save** — simpan threshold dan prefs ke workspaces table
5. **Tambah Recharts** — time-series chart signals per hari di analytics page

---

## BAGIAN 7 — RINGKASAN EKSEKUTIF

### Kondisi Project Saat Ini

OCTOPILOT berada dalam kondisi **frontend hampir lengkap, backend core (ingestion) belum ada sama sekali**. Seluruh lapisan UI telah dibangun dengan kualitas baik: landing page profesional, auth system lengkap, app shell yang polished, dashboard dengan realtime feed, signal cards yang interaktif, dan settings pages untuk semua modul utama. Namun, **database schema belum pernah dijalankan**, dan **ingestion engine — core value proposition produk ini — adalah 0% implemented**. Saat ini produk bisa menampilkan sinyal hanya dengan seed data manual, bukan sinyal organik dari Reddit/Hacker News.

### Angka Penting

| Metrik | Nilai |
|--------|-------|
| Total files di project (TS/TSX) | ~95 files |
| Files berisi kode nyata (non-placeholder) | ~70 files |
| Files placeholder/skeleton/mock | ~10 files |
| Perkiraan % project selesai | **57%** |
| Fitur fully functional (end-to-end) | **5 dari ~20** |
| Critical blockers sebelum demo | **3 blockers** |

**5 Fitur Fully Functional:** Landing page, Auth (email), App Shell, Signal Card UI, Tracker CRUD

**3 Critical Blockers:** (1) Supabase schema belum dijalankan, (2) Tidak ada ingestion engine, (3) Konflik route/onboarding

### Bisa Demo ke Customer Sekarang?

> **TIDAK** — Tapi **bisa dalam 2-3 hari** dengan prioritas yang benar.

**Alasan TIDAK sekarang:** Database tidak jalan, tidak ada sinyal organik, konflik kode. Demo ke customer dengan seed data dan "ini simulasinya" akan merusak kredibilitas.

**Alasan bisa dalam 2-3 hari:** Frontend sudah 85% selesai, struktur backend solid, semua API routes sudah ada tinggal disambungkan.

### Estimasi Waktu ke Launch

| Milestone | Estimasi |
|-----------|----------|
| Demo-ready (dengan seed data + fix blocker) | 2-3 hari dengan Replit Agent |
| MVP launch (ingestion engine + billing) | 10-15 hari total |

### 3 Hal Paling Mendesak yang Harus Dilakukan Sekarang

1. **Jalankan `supabase/schema.sql` di Supabase SQL Editor** (manual, 15 menit) — ini membuka semua fitur yang sudah dibangun
2. **Bangun Signal Ingestion Engine** — Reddit + HN crawler + OpenAI classify + scheduler (sesi Agent P06)
3. **Bersihkan konflik kode** — hapus (dashboard) group lama, resolve dua onboarding page, fix hubspotConnected hardcode (sesi Agent — 1 sesi cukup)

---

## TEMUAN TAMBAHAN

### Temuan 1: Dua Schema SQL yang Konflik
`supabase/schema.sql` menggunakan tabel `profiles` (1-to-1 dengan auth.users), sementara `supabase/migrations/20260304073340_*.sql` menggunakan `workspace_members` (many-to-many). Edge Function `create-workspace` mengikuti schema migration yang salah. **Gunakan schema.sql dan abaikan migration file tersebut.**

### Temuan 2: Duplikat Supabase Client
Ada DUA implementasi Supabase client:
- `src/lib/supabase/client.ts` (yang dipakai di hampir semua komponen)
- `src/integrations/supabase/client.ts` (legacy dari Lovable.dev export)

Ini aman tapi bisa membingungkan. Sebaiknya konsolidasi ke satu path.

### Temuan 3: Semua Environment Variables Sudah Terisi
Berdasarkan scan `.env.local`, SEMUA 16 environment variables sudah terisi (SUPABASE_URL, ANON_KEY, SERVICE_ROLE_KEY, OPENAI_API_KEY, HUBSPOT_CLIENT_ID, HUBSPOT_CLIENT_SECRET, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, STRIPE_SECRET_KEY, RESEND_API_KEY, ENCRYPTION_KEY, dll). Ini adalah kabar baik — secara teknis ingestion engine bisa langsung dibangun tanpa menunggu credential.

### Temuan 4: Framer Motion Sudah Terinstall dan Digunakan
`framer-motion@12.34.5` sudah dipakai di SignalCard.tsx untuk dismiss animation. Ini bisa digunakan untuk micro-animations lain (onboarding transitions, skeleton → content, dll).

### Temuan 5: Recharts Terinstall Tapi Tidak Digunakan
`recharts@2.15.4` terinstall tapi tidak ada satu pun import di codebase. Analytics page menggunakan progress bars HTML biasa. Ini adalah quick win yang bisa meningkatkan nilai visual produk secara signifikan.
