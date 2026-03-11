import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { encrypt, decrypt } from '@/lib/encryption';

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

export interface HubSpotContact {
  id?: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email?: string;
    company?: string;
    website?: string;
    hs_lead_status?: string;
    notes_last_activity?: string;
    [key: string]: string | undefined;
  };
}

export interface HubSpotTask {
  engagement: {
    active: boolean;
    type: 'TASK';
  };
  associations: {
    contactIds: number[];
    companyIds: number[];
    dealIds: number[];
    ownerIds: number[];
    ticketIds: number[];
  };
  metadata: {
    body: string;
    subject: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'DEFERRED' | 'WAITING';
    taskType: 'TODO' | 'EMAIL' | 'CALL';
    reminders: number[];
  };
}

export async function getHubSpotOAuthUrl(
  clientId: string,
  redirectUri: string,
  scopes: string[] = ['crm.objects.contacts.write', 'crm.objects.deals.write', 'crm.schemas.contacts.read']
): Promise<string> {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
    response_type: 'code',
  });
  return `https://app.hubspot.com/oauth/authorize?${params.toString()}`;
}

export async function exchangeHubSpotCode(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<{ access_token: string; refresh_token: string; expires_in: number }> {
  const response = await fetch(`${HUBSPOT_API_BASE}/oauth/v1/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HubSpot OAuth error: ${error}`);
  }

  return response.json();
}

export async function refreshHubSpotToken(
  workspaceId: string,
  supabaseAdmin: ReturnType<typeof createClient<Database>>
): Promise<string> {
  const { data: workspace } = await supabaseAdmin
    .from('workspaces')
    .select('hubspot_refresh_token_enc')
    .eq('id', workspaceId)
    .single();

  if (!workspace?.hubspot_refresh_token_enc) {
    throw new Error('No HubSpot refresh token found for workspace');
  }

  let refreshToken: string;
  try {
    refreshToken = await decrypt(workspace.hubspot_refresh_token_enc);
  } catch {
    throw new Error('reconnect_required');
  }

  const response = await fetch(`${HUBSPOT_API_BASE}/oauth/v1/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.HUBSPOT_CLIENT_ID!,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
      redirect_uri: process.env.HUBSPOT_REDIRECT_URI!,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HubSpot token refresh failed: ${error}`);
  }

  const tokens: { access_token: string; refresh_token: string; expires_in: number } = await response.json();
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

  const [encryptedAccess, encryptedRefresh] = await Promise.all([
    encrypt(tokens.access_token),
    encrypt(tokens.refresh_token),
  ]);

  await supabaseAdmin
    .from('workspaces')
    .update({
      hubspot_token_enc: encryptedAccess,
      hubspot_refresh_token_enc: encryptedRefresh,
      hubspot_token_expires_at: expiresAt,
    })
    .eq('id', workspaceId);

  console.log(`[OCTOPILOT] HubSpot token refreshed for workspace ${workspaceId}`);
  return tokens.access_token;
}

export async function getValidHubSpotToken(
  workspaceId: string,
  supabaseAdmin: ReturnType<typeof createClient<Database>>
): Promise<string> {
  const { data: workspace } = await supabaseAdmin
    .from('workspaces')
    .select('hubspot_token_enc, hubspot_refresh_token_enc, hubspot_token_expires_at')
    .eq('id', workspaceId)
    .single();

  if (!workspace?.hubspot_token_enc) {
    throw new Error('HubSpot not connected for this workspace');
  }

  if (workspace.hubspot_token_expires_at) {
    const expiresAt = new Date(workspace.hubspot_token_expires_at).getTime();
    const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
    if (expiresAt < fiveMinutesFromNow) {
      return refreshHubSpotToken(workspaceId, supabaseAdmin);
    }
  }

  try {
    return await decrypt(workspace.hubspot_token_enc);
  } catch {
    throw new Error('reconnect_required');
  }
}

export async function createHubSpotContact(
  accessToken: string,
  contact: HubSpotContact
): Promise<HubSpotContact> {
  const response = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties: contact.properties }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HubSpot create contact error: ${error}`);
  }

  return response.json();
}

export async function createHubSpotTask(
  accessToken: string,
  contactId: string,
  taskBody: string,
  subject: string
): Promise<{ id: string }> {
  const response = await fetch(`${HUBSPOT_API_BASE}/engagements/v1/engagements`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      engagement: { active: true, type: 'TASK' },
      associations: {
        contactIds: [parseInt(contactId)],
        companyIds: [],
        dealIds: [],
        ownerIds: [],
        ticketIds: [],
      },
      metadata: {
        body: taskBody,
        subject,
        status: 'NOT_STARTED',
        taskType: 'TODO',
        reminders: [],
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HubSpot create task error: ${error}`);
  }

  const data = await response.json();
  return { id: String(data.engagement.id) };
}

export async function injectSignalToCRM(
  accessToken: string,
  signal: {
    author_handle: string | null;
    platform: string;
    post_url: string;
    ai_summary: string;
    suggested_opener: string | null;
    intent_level: string;
  }
): Promise<{ task_id: string; contact_id?: string }> {
  const taskBody = `
🔍 OCTOPILOT Revenue Signal

Platform: ${signal.platform}
Intent Level: ${signal.intent_level.toUpperCase()}
Source: ${signal.post_url}

Summary: ${signal.ai_summary}

Suggested Opener:
${signal.suggested_opener || 'No opener generated.'}
  `.trim();

  const task = await createHubSpotTask(
    accessToken,
    '0',
    taskBody,
    `[OCTOPILOT] ${signal.platform} signal — ${signal.intent_level} intent`
  );

  return { task_id: task.id };
}
