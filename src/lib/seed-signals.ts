import { createClient } from '@supabase/supabase-js';

export async function seedSignals(workspaceId: string, trackerId: string) {
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
      author_handle: 'u/frustrated_ops_lead',
      intent_category: 'vendor_switch',
      intent_level: 'high',
      confidence_score: 0.91,
      pain_domain: 'CRM Pricing',
      ai_summary: "Ops lead is actively evaluating alternatives to Salesforce after a 40% price hike. They have a 12-person sales team and need something that integrates with HubSpot. Mentioned budget of $800/mo and Q1 decision timeline.",
      suggested_opener: "Hi [Name], I saw your post about moving away from Salesforce — we help teams like yours migrate in under a week with zero data loss. Worth a quick 15-min call this week?",
      urgency_tag: 'urgent',
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'reddit',
      post_url: 'https://reddit.com/r/hubspot/comments/def456/moving_off_hubspot_alternatives',
      author_handle: 'u/saas_startup_cto',
      intent_category: 'vendor_switch',
      intent_level: 'high',
      confidence_score: 0.88,
      pain_domain: 'CRM Migration',
      ai_summary: "SaaS startup CTO posting about migrating their 20-seat HubSpot setup due to complexity and cost. They're building an outbound sales team and need better pipeline visibility. Decision expected in 2 weeks.",
      suggested_opener: "Hey, saw your thread on HubSpot migration — we've helped 15+ SaaS teams make this exact switch. I can share a comparison doc if that's useful?",
      urgency_tag: 'urgent',
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'hackernews',
      post_url: 'https://news.ycombinator.com/item?id=12345678',
      author_handle: 'techfounder2024',
      intent_category: 'new_purchase',
      intent_level: 'high',
      confidence_score: 0.87,
      pain_domain: 'Sales Tooling',
      ai_summary: "Founder asking HN for CRM recommendations for a 5-person B2B startup closing its first enterprise deals. Currently using spreadsheets, needs pipeline tracking, contact history, and email sequences. Budget flexible.",
      suggested_opener: "Saw your HN post — we work with a lot of early-stage B2B founders moving off spreadsheets. Happy to do a live demo around your specific workflow?",
      urgency_tag: 'standard',
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'hackernews',
      post_url: 'https://news.ycombinator.com/item?id=87654321',
      author_handle: 'vp_sales_hiring',
      intent_category: 'new_purchase',
      intent_level: 'high',
      confidence_score: 0.83,
      pain_domain: 'Sales CRM',
      ai_summary: "VP of Sales at Series B company discussing CRM selection for a new 15-person sales team they're building. Needs Slack integration, strong reporting, and Salesforce import. Evaluating 3 vendors currently.",
      suggested_opener: "Hi — noticed your CRM eval on HN. We're especially strong on Slack integration and can import from Salesforce in under an hour. Want to compare against your shortlist?",
      urgency_tag: 'standard',
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'reddit',
      post_url: 'https://reddit.com/r/sales/comments/ghi789/crm_evaluation_help',
      author_handle: 'u/rampingup_sdr',
      intent_category: 'evaluation',
      intent_level: 'medium',
      confidence_score: 0.69,
      pain_domain: 'SDR Workflow',
      ai_summary: "SDR team lead comparing CRMs for a 30-person company. Key requirements: email sequencing, LinkedIn integration, and call recording. Currently trialing two competitors. No hard deadline mentioned.",
      suggested_opener: "Saw your evaluation thread — we have built-in email sequencing and LinkedIn sync that most SDR teams love. I can walk you through it in 20 mins?",
      urgency_tag: 'standard',
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'reddit',
      post_url: 'https://reddit.com/r/entrepreneur/comments/jkl012/best_crm_for_smb',
      author_handle: 'u/growingagency',
      intent_category: 'evaluation',
      intent_level: 'medium',
      confidence_score: 0.65,
      pain_domain: 'Agency CRM',
      ai_summary: "Agency owner evaluating CRMs for a 10-person digital marketing team. Wants client portal, deal tracking, and invoicing. Currently using a mix of Monday.com and email. Budget around $200/mo.",
      suggested_opener: "Hey, your post about CRM for agencies caught my eye — we have a template specifically for digital agencies. Want me to send it over?",
      urgency_tag: 'monitor',
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'reddit',
      post_url: 'https://reddit.com/r/smallbusiness/comments/mno345/crm_too_expensive',
      author_handle: 'u/bootstrapped_founder',
      intent_category: 'complaint',
      intent_level: 'low',
      confidence_score: 0.45,
      pain_domain: 'CRM Cost',
      ai_summary: "Small business owner venting about CRM pricing generally. No active evaluation happening but expresses frustration with per-seat pricing models. Team of 3 people.",
      suggested_opener: null,
      urgency_tag: 'monitor',
    },
    {
      workspace_id: workspaceId,
      tracker_id: trackerId,
      platform: 'reddit',
      post_url: 'https://reddit.com/r/startups/comments/pqr678/crm_integration_nightmare',
      author_handle: 'u/integration_woes',
      intent_category: 'complaint',
      intent_level: 'low',
      confidence_score: 0.41,
      pain_domain: 'Integration Pain',
      ai_summary: "Developer complaining about poor API documentation from their current CRM vendor. Not actively looking to switch — more of a rant. May become a signal if they escalate to vendor switch language.",
      suggested_opener: null,
      urgency_tag: 'monitor',
    },
  ];

  const { data, error } = await adminClient
    .from('intent_signals')
    .insert(signals)
    .select('id');

  if (error) throw error;
  return data;
}
