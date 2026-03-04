
-- Drop existing policies
DROP POLICY IF EXISTS "Members can view their workspaces" ON workspaces;
DROP POLICY IF EXISTS "Owners can update their workspaces" ON workspaces;
DROP POLICY IF EXISTS "Members can view workspace members" ON workspace_members;
DROP POLICY IF EXISTS "Owners/admins can manage members" ON workspace_members;
DROP POLICY IF EXISTS "Owners/admins can update members" ON workspace_members;
DROP POLICY IF EXISTS "Owners/admins can delete members" ON workspace_members;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Members can view workspace audit logs" ON audit_logs;
DROP POLICY IF EXISTS "Authenticated users can insert audit logs" ON audit_logs;

-- Helper: get current user's workspace_ids
CREATE OR REPLACE FUNCTION get_user_workspace_ids(uid UUID)
RETURNS UUID[] AS $$
  SELECT COALESCE(ARRAY_AGG(workspace_id), '{}')
  FROM workspace_members
  WHERE user_id = uid AND accepted_at IS NOT NULL;
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

-- Helper: check role
CREATE OR REPLACE FUNCTION has_workspace_role(
  ws_id UUID, uid UUID, min_role TEXT
) RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = ws_id
      AND user_id = uid
      AND accepted_at IS NOT NULL
      AND CASE min_role
        WHEN 'viewer'  THEN role IN ('viewer','member','analyst','admin','owner')
        WHEN 'member'  THEN role IN ('member','analyst','admin','owner')
        WHEN 'analyst' THEN role IN ('analyst','admin','owner')
        WHEN 'admin'   THEN role IN ('admin','owner')
        WHEN 'owner'   THEN role = 'owner'
        ELSE FALSE
      END
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

-- Workspaces
CREATE POLICY "workspace_select" ON workspaces
  FOR SELECT USING (id = ANY(get_user_workspace_ids(auth.uid())));

CREATE POLICY "workspace_update" ON workspaces
  FOR UPDATE USING (has_workspace_role(id, auth.uid(), 'owner'));

-- Workspace members
CREATE POLICY "members_select" ON workspace_members
  FOR SELECT USING (workspace_id = ANY(get_user_workspace_ids(auth.uid())));

CREATE POLICY "members_insert" ON workspace_members
  FOR INSERT WITH CHECK (has_workspace_role(workspace_id, auth.uid(), 'admin'));

CREATE POLICY "members_delete" ON workspace_members
  FOR DELETE USING (has_workspace_role(workspace_id, auth.uid(), 'admin'));

-- User profiles
CREATE POLICY "profile_select" ON user_profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "profile_insert" ON user_profiles
  FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "profile_update" ON user_profiles
  FOR UPDATE USING (id = auth.uid());

-- Audit logs: read-only for admin+
CREATE POLICY "audit_select" ON audit_logs
  FOR SELECT USING (
    workspace_id = ANY(get_user_workspace_ids(auth.uid()))
    AND has_workspace_role(workspace_id, auth.uid(), 'admin')
  );
