export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          plan: 'pro' | 'growth' | 'enterprise';
          hubspot_token_enc: string | null;
          hubspot_refresh_token_enc: string | null;
          hubspot_token_expires_at: string | null;
          slack_webhook_url: string | null;
          alert_confidence_threshold: number;
          seats_limit: number;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          plan?: 'pro' | 'growth' | 'enterprise';
          hubspot_token_enc?: string | null;
          hubspot_refresh_token_enc?: string | null;
          hubspot_token_expires_at?: string | null;
          slack_webhook_url?: string | null;
          alert_confidence_threshold?: number;
          seats_limit?: number;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          plan?: 'pro' | 'growth' | 'enterprise';
          hubspot_token_enc?: string | null;
          hubspot_refresh_token_enc?: string | null;
          hubspot_token_expires_at?: string | null;
          slack_webhook_url?: string | null;
          alert_confidence_threshold?: number;
          seats_limit?: number;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          workspace_id: string;
          role: 'admin' | 'analyst' | 'sdr' | 'viewer';
          full_name: string | null;
          avatar_url: string | null;
          notification_prefs: Json;
          onboarding_completed: boolean;
          onboarding_step: number;
          last_seen_at: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          workspace_id: string;
          role?: 'admin' | 'analyst' | 'sdr' | 'viewer';
          full_name?: string | null;
          avatar_url?: string | null;
          notification_prefs?: Json;
          onboarding_completed?: boolean;
          onboarding_step?: number;
          last_seen_at?: string | null;
        };
        Update: {
          role?: 'admin' | 'analyst' | 'sdr' | 'viewer';
          full_name?: string | null;
          avatar_url?: string | null;
          notification_prefs?: Json;
          onboarding_completed?: boolean;
          onboarding_step?: number;
          last_seen_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_workspace_id_fkey';
            columns: ['workspace_id'];
            isOneToOne: false;
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          }
        ];
      };
      trackers: {
        Row: {
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
        };
        Insert: {
          id?: string;
          workspace_id: string;
          created_by: string;
          name: string;
          keywords?: string[];
          competitor_names?: string[];
          subreddits?: string[];
          platforms?: string[];
          is_active?: boolean;
          confidence_override?: number | null;
        };
        Update: {
          name?: string;
          keywords?: string[];
          competitor_names?: string[];
          subreddits?: string[];
          platforms?: string[];
          is_active?: boolean;
          confidence_override?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'trackers_workspace_id_fkey';
            columns: ['workspace_id'];
            isOneToOne: false;
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'trackers_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      intent_signals: {
        Row: {
          id: string;
          workspace_id: string;
          tracker_id: string;
          platform: 'reddit' | 'hackernews' | 'slack' | 'linkedin';
          post_url: string;
          author_handle: string | null;
          post_timestamp: string | null;
          intent_category: 'vendor_switch' | 'new_purchase' | 'evaluation' | 'complaint';
          intent_level: 'high' | 'medium' | 'low';
          confidence_score: number;
          pain_domain: string | null;
          ai_summary: string;
          suggested_opener: string | null;
          urgency_tag: 'urgent' | 'standard' | 'monitor';
          crm_injected: boolean;
          crm_task_id: string | null;
          dismissed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          tracker_id: string;
          platform: 'reddit' | 'hackernews' | 'slack' | 'linkedin';
          post_url: string;
          author_handle?: string | null;
          post_timestamp?: string | null;
          intent_category: 'vendor_switch' | 'new_purchase' | 'evaluation' | 'complaint';
          intent_level: 'high' | 'medium' | 'low';
          confidence_score: number;
          pain_domain?: string | null;
          ai_summary: string;
          suggested_opener?: string | null;
          urgency_tag?: 'urgent' | 'standard' | 'monitor';
          crm_injected?: boolean;
          crm_task_id?: string | null;
          dismissed?: boolean;
        };
        Update: {
          platform?: 'reddit' | 'hackernews' | 'slack' | 'linkedin';
          post_url?: string;
          author_handle?: string | null;
          post_timestamp?: string | null;
          intent_category?: 'vendor_switch' | 'new_purchase' | 'evaluation' | 'complaint';
          intent_level?: 'high' | 'medium' | 'low';
          confidence_score?: number;
          pain_domain?: string | null;
          ai_summary?: string;
          suggested_opener?: string | null;
          urgency_tag?: 'urgent' | 'standard' | 'monitor';
          crm_injected?: boolean;
          crm_task_id?: string | null;
          dismissed?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'intent_signals_workspace_id_fkey';
            columns: ['workspace_id'];
            isOneToOne: false;
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'intent_signals_tracker_id_fkey';
            columns: ['tracker_id'];
            isOneToOne: false;
            referencedRelation: 'trackers';
            referencedColumns: ['id'];
          }
        ];
      };
      human_feedback_loop: {
        Row: {
          id: string;
          signal_id: string;
          user_id: string;
          workspace_id: string;
          feedback_type: 'useful' | 'not_useful' | 'false_positive' | 'already_known';
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          signal_id: string;
          user_id: string;
          workspace_id: string;
          feedback_type: 'useful' | 'not_useful' | 'false_positive' | 'already_known';
          comment?: string | null;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      compliance_logs: {
        Row: {
          id: string;
          workspace_id: string | null;
          actor_id: string | null;
          event_type: string;
          entity_type: string | null;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id?: string | null;
          actor_id?: string | null;
          event_type: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
