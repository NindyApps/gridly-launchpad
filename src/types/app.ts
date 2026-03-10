export type IntentLevel = 'high' | 'medium' | 'low';
export type IntentCategory = 'vendor_switch' | 'new_purchase' | 'evaluation' | 'complaint';
export type UrgencyTag = 'urgent' | 'standard' | 'monitor';
export type UserRole = 'admin' | 'analyst' | 'sdr' | 'viewer';
export type FeedbackType = 'useful' | 'not_useful' | 'false_positive' | 'already_known';
export type Platform = 'reddit' | 'hackernews' | 'slack' | 'linkedin';
export type WorkspacePlan = 'pro' | 'growth' | 'enterprise';

export interface IntentSignal {
  id: string;
  workspace_id: string;
  tracker_id: string;
  platform: Platform;
  post_url: string;
  author_handle: string | null;
  post_timestamp: string | null;
  intent_category: IntentCategory;
  intent_level: IntentLevel;
  confidence_score: number;
  pain_domain: string | null;
  ai_summary: string;
  suggested_opener: string | null;
  urgency_tag: UrgencyTag;
  crm_injected: boolean;
  crm_task_id: string | null;
  dismissed: boolean;
  sf_injected_at: string | null;
  sf_record_id: string | null;
  sf_record_url: string | null;
  created_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: WorkspacePlan;
  hubspot_token_enc: string | null;
  hubspot_refresh_token_enc: string | null;
  hubspot_token_expires_at: string | null;
  slack_webhook_url: string | null;
  alert_confidence_threshold: number;
  seats_limit: number;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  sf_access_token_enc: string | null;
  sf_refresh_token_enc: string | null;
  sf_instance_url: string | null;
  sf_token_expires_at: string | null;
  sf_connected_at: string | null;
  sf_inject_object: 'Task' | 'Lead' | 'Contact' | 'Opportunity' | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  workspace_id: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  notification_prefs: Record<string, boolean>;
  onboarding_completed: boolean;
  onboarding_step: number;
  last_seen_at: string | null;
  created_at: string;
}

export interface Tracker {
  id: string;
  workspace_id: string;
  created_by: string;
  name: string;
  keywords: string[];
  competitor_names: string[];
  subreddits: string[];
  platforms: string[];
  is_active: boolean;
  confidence_override: number | null;
  signal_count_7d: number;
  created_at: string;
  updated_at: string;
}

export interface HumanFeedback {
  id: string;
  signal_id: string;
  user_id: string;
  workspace_id: string;
  feedback_type: FeedbackType;
  comment: string | null;
  created_at: string;
}

export interface ComplianceLog {
  id: string;
  workspace_id: string | null;
  actor_id: string | null;
  event_type: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export type SignalSort = 'confidence_desc' | 'newest' | 'oldest';

export interface SignalFeedFilters {
  intent_level?: IntentLevel | 'all';
  intent_category?: IntentCategory | 'all';
  platform?: Platform | 'all';
  tracker_id?: string | 'all';
  dismissed?: boolean;
  crm_injected?: boolean;
  urgent_only?: boolean;
  sort?: SignalSort;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
}
