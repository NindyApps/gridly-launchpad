ALTER TABLE intent_signals
  ADD COLUMN IF NOT EXISTS sf_injected_at  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS sf_record_id    TEXT,
  ADD COLUMN IF NOT EXISTS sf_record_url   TEXT;
