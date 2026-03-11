-- ═══════════════════════════════════════════════
-- OCTOPILOT — Supabase Database Schema (P02)
-- Run this in: supabase.com → your project → SQL Editor
-- ═══════════════════════════════════════════════


-- ═══════════════════════════════════════════════
-- TABLES
-- ═══════════════════════════════════════════════

CREATE TABLE workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  plan text NOT NULL DEFAULT 'pro'
    CHECK (plan IN ('pro','growth','enterprise')),
  hubspot_token_enc text,
  hubspot_refresh_token_enc text,
  hubspot_token_expires_at timestamptz,
  slack_webhook_url text,
  alert_confidence_threshold float8 DEFAULT 0.7
    CHECK (alert_confidence_threshold BETWEEN 0.0 AND 1.0),
  seats_limit int4 DEFAULT 3,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'sdr'
    CHECK (role IN ('admin','analyst','sdr','viewer')),
  full_name text,
  avatar_url text,
  notification_prefs jsonb DEFAULT '{"email": true, "in_app": true, "slack": false}',
  onboarding_completed boolean DEFAULT false,
  onboarding_step int4 DEFAULT 0,
  last_seen_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE trackers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES profiles(id),
  name text NOT NULL,
  keywords text[] DEFAULT '{}',
  competitor_names text[] DEFAULT '{}',
  subreddits text[] DEFAULT '{}',
  platforms text[] DEFAULT '{"reddit","hackernews"}',
  is_active boolean DEFAULT true,
  confidence_override float8,
  signal_count_7d int4 DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE intent_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  tracker_id uuid NOT NULL REFERENCES trackers(id) ON DELETE CASCADE,
  platform text NOT NULL
    CHECK (platform IN ('reddit','hackernews','slack','linkedin')),
  post_url text NOT NULL,
  author_handle text,
  post_timestamp timestamptz,
  intent_category text NOT NULL
    CHECK (intent_category IN ('vendor_switch','new_purchase','evaluation','complaint')),
  intent_level text NOT NULL
    CHECK (intent_level IN ('high','medium','low')),
  confidence_score float8 NOT NULL
    CHECK (confidence_score BETWEEN 0.0 AND 1.0),
  pain_domain text,
  ai_summary text NOT NULL,
  suggested_opener text,
  urgency_tag text DEFAULT 'standard'
    CHECK (urgency_tag IN ('urgent','standard','monitor')),
  crm_injected boolean DEFAULT false,
  crm_task_id text,
  dismissed boolean DEFAULT false,
  is_demo boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE human_feedback_loop (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  signal_id uuid NOT NULL REFERENCES intent_signals(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id),
  workspace_id uuid NOT NULL REFERENCES workspaces(id),
  feedback_type text NOT NULL
    CHECK (feedback_type IN ('useful','not_useful','false_positive','already_known')),
  comment text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE compliance_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id),
  actor_id uuid REFERENCES profiles(id),
  event_type text NOT NULL,
  entity_type text,
  entity_id uuid,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);


-- ═══════════════════════════════════════════════
-- INDEXES (critical for query performance)
-- ═══════════════════════════════════════════════

CREATE INDEX idx_intent_signals_workspace
  ON intent_signals(workspace_id, dismissed, created_at DESC);
CREATE INDEX idx_intent_signals_confidence
  ON intent_signals(workspace_id, confidence_score DESC);
CREATE INDEX idx_intent_signals_tracker
  ON intent_signals(tracker_id, created_at DESC);
CREATE INDEX idx_trackers_workspace
  ON trackers(workspace_id, is_active);
CREATE INDEX idx_feedback_signal
  ON human_feedback_loop(signal_id);
CREATE INDEX idx_feedback_workspace
  ON human_feedback_loop(workspace_id, created_at DESC);


-- ═══════════════════════════════════════════════
-- TRIGGERS
-- ═══════════════════════════════════════════════

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER workspaces_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trackers_updated_at
  BEFORE UPDATE ON trackers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create workspace + profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_workspace_id uuid;
  email_domain text;
  workspace_slug text;
BEGIN
  -- Extract domain from email
  email_domain := split_part(NEW.email, '@', 2);
  workspace_slug := regexp_replace(lower(email_domain), '[^a-z0-9]', '-', 'g');

  -- Create workspace
  INSERT INTO workspaces (name, slug)
  VALUES (email_domain, workspace_slug || '-' || substr(NEW.id::text, 1, 4))
  RETURNING id INTO new_workspace_id;

  -- Create profile as admin
  INSERT INTO profiles (id, workspace_id, role, full_name)
  VALUES (
    NEW.id,
    new_workspace_id,
    'admin',
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1))
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ═══════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trackers ENABLE ROW LEVEL SECURITY;
ALTER TABLE intent_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE human_feedback_loop ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_logs ENABLE ROW LEVEL SECURITY;

-- Workspaces: users see only their workspace
CREATE POLICY workspace_select ON workspaces FOR SELECT
  USING (id = (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY workspace_update ON workspaces FOR UPDATE
  USING (id = (SELECT workspace_id FROM profiles WHERE id = auth.uid()
    AND role = 'admin'));

-- Profiles: see all in same workspace
CREATE POLICY profiles_select ON profiles FOR SELECT
  USING (workspace_id = (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY profiles_update ON profiles FOR UPDATE
  USING (id = auth.uid());
CREATE POLICY profiles_insert ON profiles FOR INSERT
  WITH CHECK (true); -- handled by trigger

-- Trackers: workspace-scoped
CREATE POLICY trackers_all ON trackers FOR ALL
  USING (workspace_id = (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Intent signals: workspace-scoped
CREATE POLICY signals_all ON intent_signals FOR ALL
  USING (workspace_id = (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Feedback: workspace-scoped
CREATE POLICY feedback_all ON human_feedback_loop FOR ALL
  USING (workspace_id = (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Compliance logs: workspace-scoped with insert for authenticated users
CREATE POLICY compliance_insert ON compliance_logs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY compliance_select ON compliance_logs FOR SELECT
  USING (workspace_id = (SELECT workspace_id FROM profiles WHERE id = auth.uid()));


-- ═══════════════════════════════════════════════
-- POST-SETUP CHECKLIST (do in Supabase Dashboard)
-- ═══════════════════════════════════════════════
--
-- 1. Enable Realtime on intent_signals:
--    Database → Replication → enable intent_signals table
--
-- 2. Enable Email auth provider:
--    Auth → Providers → Email → enable
--
-- 3. (Optional) Enable Google OAuth:
--    Auth → Providers → Google → add client ID + secret
--
-- 4. Set Site URL:
--    Auth → URL Configuration → Site URL = https://your-app-url
--
-- 5. Add redirect URL:
--    Auth → URL Configuration → Redirect URLs → add https://your-app-url/auth/callback
--
-- 6. Copy SUPABASE_SERVICE_ROLE_KEY from:
--    Settings → API → service_role key
--    Paste into .env.local as SUPABASE_SERVICE_ROLE_KEY=
