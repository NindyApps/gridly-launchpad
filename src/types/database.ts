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
          slack_webhook_url: string | null;
          alert_confidence_threshold: number;
          seats_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['workspaces']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['workspaces']['Insert']>;
      };
      profiles: {
        Row: {
          id: string;
          workspace_id: string;
          role: 'admin' | 'analyst' | 'sdr' | 'viewer';
          full_name: string | null;
          avatar_url: string | null;
          notification_prefs: Json;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      trackers: {
        Row: {
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
        };
        Insert: Omit<Database['public']['Tables']['trackers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['trackers']['Insert']>;
      };
      intent_signals: {
        Row: {
          id: string;
          workspace_id: string;
          tracker_id: string;
          platform: 'reddit' | 'hackernews' | 'slack';
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
        Insert: Omit<Database['public']['Tables']['intent_signals']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['intent_signals']['Insert']>;
      };
      human_feedback_loop: {
        Row: {
          id: string;
          signal_id: string;
          user_id: string;
          feedback_type: 'useful' | 'not_useful' | 'false_positive' | 'already_known';
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['human_feedback_loop']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['human_feedback_loop']['Insert']>;
      };
      compliance_logs: {
        Row: {
          id: string;
          workspace_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          metadata: Json;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['compliance_logs']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
    };
    Functions: {};
    Enums: {};
  };
}
