import { createClient } from '@supabase/supabase-js';

export async function seedDemoSignals(workspaceId: string, trackerId: string) {
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const signals = [
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'reddit',
      post_url: 'https://reddit.com/r/salesforce/comments/abc123/switching_from_salesforce',
      author_handle: 'u/frustrated_sales_mgr',
      intent_category: 'vendor_switch',
      intent_level: 'high',
      confidence_score: 0.91,
      pain_domain: 'CRM Pricing',
      ai_summary: 'Sales manager frustrated with Salesforce pricing, actively evaluating alternatives',
      suggested_opener: "Saw your post about Salesforce costs — we help teams like yours cut CRM spend by 40%",
      urgency_tag: 'urgent',
      is_demo: true,
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'hackernews',
      post_url: 'https://news.ycombinator.com/item?id=12345678',
      author_handle: 'eng_lead_2024',
      intent_category: 'new_purchase',
      intent_level: 'high',
      confidence_score: 0.87,
      pain_domain: 'Project Tracking',
      ai_summary: 'Engineering lead looking for project tracking tool for growing team',
      suggested_opener: null,
      urgency_tag: 'standard',
      is_demo: true,
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'reddit',
      post_url: 'https://reddit.com/r/startups/comments/def456/comparing_crm_options',
      author_handle: 'u/startup_founder_sr',
      intent_category: 'evaluation',
      intent_level: 'medium',
      confidence_score: 0.72,
      pain_domain: 'CRM Selection',
      ai_summary: 'Startup founder comparing three CRM options, asking for recommendations',
      suggested_opener: "Happy to give you a quick comparison — what matters most to your team?",
      urgency_tag: 'standard',
      is_demo: true,
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'reddit',
      post_url: 'https://reddit.com/r/saas/comments/ghi789/onboarding_tool_issues',
      author_handle: 'u/team_lead_ops',
      intent_category: 'complaint',
      intent_level: 'medium',
      confidence_score: 0.65,
      pain_domain: 'Onboarding Tools',
      ai_summary: 'Team lead unhappy with current onboarding tool, mentions switching soon',
      suggested_opener: null,
      urgency_tag: 'standard',
      is_demo: true,
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'hackernews',
      post_url: 'https://news.ycombinator.com/item?id=87654321',
      author_handle: 'devbuilder99',
      intent_category: 'evaluation',
      intent_level: 'low',
      confidence_score: 0.51,
      pain_domain: 'Headless CMS',
      ai_summary: 'Developer curious about headless CMS options for new project',
      suggested_opener: null,
      urgency_tag: 'monitor',
      is_demo: true,
    },
  ];

  const { data, error } = await adminClient
    .from('intent_signals')
    .insert(signals)
    .select('id');

  if (error) throw error;
  return data;
}
