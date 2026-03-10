ALTER TABLE workspaces
  ADD COLUMN IF NOT EXISTS sf_access_token_enc       TEXT,
  ADD COLUMN IF NOT EXISTS sf_refresh_token_enc      TEXT,
  ADD COLUMN IF NOT EXISTS sf_instance_url           TEXT,
  ADD COLUMN IF NOT EXISTS sf_token_expires_at       TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS sf_connected_at           TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS sf_inject_object          TEXT
    DEFAULT 'Task'
    CHECK (sf_inject_object IN ('Task', 'Lead', 'Contact', 'Opportunity'));
