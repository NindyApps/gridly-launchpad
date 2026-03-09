export type IntentLevel = 'high' | 'medium' | 'low';
export type IntentCategory = 'vendor_switch' | 'new_purchase' | 'evaluation' | 'complaint';
export type UrgencyTag = 'urgent' | 'standard' | 'monitor';
export type UserRole = 'admin' | 'analyst' | 'sdr' | 'viewer';
export type FeedbackType = 'useful' | 'not_useful' | 'false_positive' | 'already_known';
export type Platform = 'reddit' | 'hackernews' | 'slack';

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
  created_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: 'pro' | 'growth' | 'enterprise';
  hubspot_token_enc: string | null;
  slack_webhook_url: string | null;
  alert_confidence_threshold: number;
  seats_limit: number;
  created_at: string;
}

export interface Profile {
  id: string;
  workspace_id: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  notification_prefs: Record<string, boolean>;
  created_at: string;
}

export interface Tracker {
  id: string;
  workspace_id: string;
  name: string;
  keywords: string[];
  competitor_names: string[];
  subreddits: string[];
  platforms: string[];
  is_active: boolean;
  confidence_override: number | null;
  created_at: string;
}

export interface SignalFeedFilters {
  intent_level?: IntentLevel | 'all';
  intent_category?: IntentCategory | 'all';
  platform?: Platform | 'all';
  tracker_id?: string | 'all';
  dismissed?: boolean;
  crm_injected?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
}
