
-- ============================================================
-- WORKSPACES (TENANT ROOT)
-- ============================================================
CREATE TABLE workspaces (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  plan            TEXT NOT NULL DEFAULT 'starter'
                    CHECK (plan IN ('starter','growth','enterprise')),
  status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active','suspended','churned')),
  signal_quota    INTEGER NOT NULL DEFAULT 500,
  signals_used    INTEGER NOT NULL DEFAULT 0,
  crm_enabled     BOOLEAN NOT NULL DEFAULT FALSE,
  ai_budget_usd   NUMERIC(10,4) NOT NULL DEFAULT 10.0000,
  ai_spent_usd    NUMERIC(10,4) NOT NULL DEFAULT 0.0000,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- WORKSPACE MEMBERS
-- ============================================================
CREATE TABLE workspace_members (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id    UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role            TEXT NOT NULL DEFAULT 'member'
                    CHECK (role IN ('owner','admin','analyst','member','viewer')),
  invited_by      UUID REFERENCES auth.users(id),
  accepted_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

-- ============================================================
-- USER PROFILES
-- ============================================================
CREATE TABLE user_profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name    TEXT,
  avatar_url      TEXT,
  timezone        TEXT DEFAULT 'UTC',
  notification_prefs JSONB DEFAULT '{"email":true,"in_app":true}',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOG (IMMUTABLE)
-- ============================================================
CREATE TABLE audit_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action          TEXT NOT NULL,
  entity_type     TEXT,
  entity_id       TEXT,
  old_value       JSONB,
  new_value       JSONB,
  ip_address      INET,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TRIGGERS: updated_at auto-maintenance
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER workspaces_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- Helper function to check workspace membership
CREATE OR REPLACE FUNCTION public.get_user_workspace_role(_user_id uuid, _workspace_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM workspace_members
  WHERE user_id = _user_id AND workspace_id = _workspace_id
$$;

-- WORKSPACES RLS
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their workspaces"
  ON workspaces FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = workspaces.id
    AND workspace_members.user_id = auth.uid()
  ));

CREATE POLICY "Owners can update their workspaces"
  ON workspaces FOR UPDATE
  USING (public.get_user_workspace_role(auth.uid(), id) IN ('owner','admin'));

-- WORKSPACE MEMBERS RLS
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view workspace members"
  ON workspace_members FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM workspace_members wm
    WHERE wm.workspace_id = workspace_members.workspace_id
    AND wm.user_id = auth.uid()
  ));

CREATE POLICY "Owners/admins can manage members"
  ON workspace_members FOR INSERT
  WITH CHECK (public.get_user_workspace_role(auth.uid(), workspace_id) IN ('owner','admin'));

CREATE POLICY "Owners/admins can update members"
  ON workspace_members FOR UPDATE
  USING (public.get_user_workspace_role(auth.uid(), workspace_id) IN ('owner','admin'));

CREATE POLICY "Owners/admins can delete members"
  ON workspace_members FOR DELETE
  USING (public.get_user_workspace_role(auth.uid(), workspace_id) IN ('owner','admin'));

-- USER PROFILES RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- AUDIT LOGS RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view workspace audit logs"
  ON audit_logs FOR SELECT
  USING (
    workspace_id IS NULL
    OR EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = audit_logs.workspace_id
      AND workspace_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Deny UPDATE/DELETE on audit_logs (no policies = denied by default with RLS enabled)
