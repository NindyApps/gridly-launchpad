import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { IntentSignal } from '@/types/app';

const SF_AUTH_URL = 'https://login.salesforce.com/services/oauth2/authorize';
const SF_TOKEN_URL = 'https://login.salesforce.com/services/oauth2/token';
const SF_API_VERSION = 'v59.0';

export interface SalesforceTokenResponse {
  access_token: string;
  refresh_token: string;
  instance_url: string;
  token_type: string;
  issued_at: string;
  expires_in?: number;
}

export function getSalesforceAuthUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SALESFORCE_CLIENT_ID ?? '',
    redirect_uri: process.env.SALESFORCE_REDIRECT_URI ?? '',
    scope: 'api refresh_token offline_access',
    state,
  });
  return `${SF_AUTH_URL}?${params.toString()}`;
}

export async function exchangeSalesforceCode(code: string): Promise<SalesforceTokenResponse> {
  const res = await fetch(SF_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.SALESFORCE_CLIENT_ID!,
      client_secret: process.env.SALESFORCE_CLIENT_SECRET!,
      redirect_uri: process.env.SALESFORCE_REDIRECT_URI!,
      code,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Salesforce OAuth error: ${err}`);
  }

  return res.json();
}

export async function refreshSalesforceToken(
  workspaceId: string,
  supabaseAdmin: ReturnType<typeof createClient<Database>>
): Promise<void> {
  const { data: workspace } = await supabaseAdmin
    .from('workspaces')
    .select('sf_refresh_token_enc')
    .eq('id', workspaceId)
    .single();

  if (!workspace?.sf_refresh_token_enc) {
    throw new Error('No Salesforce refresh token found for workspace');
  }

  const res = await fetch(SF_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.SALESFORCE_CLIENT_ID!,
      client_secret: process.env.SALESFORCE_CLIENT_SECRET!,
      refresh_token: workspace.sf_refresh_token_enc,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Salesforce token refresh failed: ${err}`);
  }

  const tokens: SalesforceTokenResponse = await res.json();
  const expiresAt = new Date(
    parseInt(tokens.issued_at) + (tokens.expires_in ?? 7200) * 1000
  ).toISOString();

  await supabaseAdmin
    .from('workspaces')
    .update({
      sf_access_token_enc: tokens.access_token,
      sf_token_expires_at: expiresAt,
    } as never)
    .eq('id', workspaceId);
}

export async function getValidSalesforceToken(
  workspaceId: string,
  supabaseAdmin: ReturnType<typeof createClient<Database>>
): Promise<{ accessToken: string; instanceUrl: string }> {
  const { data: workspace } = await supabaseAdmin
    .from('workspaces')
    .select('sf_access_token_enc, sf_token_expires_at, sf_instance_url')
    .eq('id', workspaceId)
    .single();

  if (!workspace || !workspace.sf_access_token_enc) {
    throw new Error('Salesforce is not connected for this workspace. Please connect Salesforce in Settings → CRM.');
  }

  const expiresAt = workspace.sf_token_expires_at ? new Date(workspace.sf_token_expires_at) : null;
  const fiveMinFromNow = new Date(Date.now() + 5 * 60 * 1000);

  if (!expiresAt || expiresAt < fiveMinFromNow) {
    await refreshSalesforceToken(workspaceId, supabaseAdmin);
    const { data: refreshed } = await supabaseAdmin
      .from('workspaces')
      .select('sf_access_token_enc, sf_instance_url')
      .eq('id', workspaceId)
      .single();
    return {
      accessToken: refreshed!.sf_access_token_enc!,
      instanceUrl: (refreshed as unknown as { sf_instance_url: string }).sf_instance_url,
    };
  }

  return {
    accessToken: workspace.sf_access_token_enc,
    instanceUrl: (workspace as unknown as { sf_instance_url: string }).sf_instance_url,
  };
}

export async function revokeSalesforceToken(
  workspaceId: string,
  supabaseAdmin: ReturnType<typeof createClient<Database>>
): Promise<void> {
  try {
    const { data: workspace } = await supabaseAdmin
      .from('workspaces')
      .select('sf_access_token_enc, sf_instance_url')
      .eq('id', workspaceId)
      .single();

    if (workspace?.sf_access_token_enc && workspace.sf_instance_url) {
      const instanceUrl = (workspace as unknown as { sf_instance_url: string }).sf_instance_url;
      await fetch(`${instanceUrl}/services/oauth2/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ token: workspace.sf_access_token_enc }),
      });
    }
  } catch (err) {
    console.error('[OCTOPILOT] Salesforce revoke failed (continuing with DB clear):', err);
  }

  await supabaseAdmin
    .from('workspaces')
    .update({
      sf_access_token_enc: null,
      sf_refresh_token_enc: null,
      sf_token_expires_at: null,
      sf_connected_at: null,
    } as never)
    .eq('id', workspaceId);
}

function buildDescription(signal: IntentSignal): string {
  const title = signal.ai_summary.substring(0, 120);
  return [
    `Platform: ${signal.platform}`,
    `Confidence: ${Math.round(signal.confidence_score * 100)}%`,
    `Intent: ${signal.intent_level}`,
    ``,
    `AI Summary: ${signal.ai_summary}`,
    signal.suggested_opener ? `\nSuggested Opener: ${signal.suggested_opener}` : '',
    ``,
    `Original Post: ${signal.post_url}`,
  ].join('\n');
}

async function injectAsTask(accessToken: string, instanceUrl: string, signal: IntentSignal): Promise<string> {
  const title = signal.ai_summary.substring(0, 120);
  const res = await fetch(`${instanceUrl}/services/data/${SF_API_VERSION}/sobjects/Task/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Subject: `[OCTOPILOT] ${title}`,
      Description: buildDescription(signal),
      Status: 'Not Started',
      Priority: signal.intent_level === 'high' ? 'High' : 'Normal',
      ActivityDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Salesforce Task create error: ${err}`);
  }

  const data = await res.json();
  return data.id;
}

async function injectAsLead(accessToken: string, instanceUrl: string, signal: IntentSignal): Promise<string> {
  const res = await fetch(`${instanceUrl}/services/data/${SF_API_VERSION}/sobjects/Lead/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      LastName: signal.author_handle ?? 'Unknown (Reddit/HN)',
      Company: 'Unknown — via OCTOPILOT Signal',
      LeadSource: 'Web',
      Description: buildDescription(signal),
      Rating: signal.intent_level === 'high' ? 'Hot' : 'Warm',
      Website: signal.post_url,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Salesforce Lead create error: ${err}`);
  }

  const data = await res.json();
  return data.id;
}

async function injectAsContact(accessToken: string, instanceUrl: string, signal: IntentSignal): Promise<string> {
  const res = await fetch(`${instanceUrl}/services/data/${SF_API_VERSION}/sobjects/Contact/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      LastName: signal.author_handle ?? 'Unknown (Reddit/HN)',
      Description: buildDescription(signal),
      LeadSource: 'Web',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Salesforce Contact create error: ${err}`);
  }

  const data = await res.json();
  return data.id;
}

async function injectAsOpportunity(accessToken: string, instanceUrl: string, signal: IntentSignal): Promise<string> {
  const title = signal.ai_summary.substring(0, 120);
  const res = await fetch(`${instanceUrl}/services/data/${SF_API_VERSION}/sobjects/Opportunity/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Name: `[OCTOPILOT] ${title}`,
      StageName: 'Prospecting',
      CloseDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      Description: buildDescription(signal),
      LeadSource: 'Web',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Salesforce Opportunity create error: ${err}`);
  }

  const data = await res.json();
  return data.id;
}

export async function injectSignalToSalesforce(
  workspaceId: string,
  signal: IntentSignal,
  supabaseAdmin: ReturnType<typeof createClient<Database>>,
  objectType?: 'Task' | 'Lead' | 'Contact' | 'Opportunity'
): Promise<{ recordId: string; objectType: string; recordUrl: string }> {
  const { accessToken, instanceUrl } = await getValidSalesforceToken(workspaceId, supabaseAdmin);

  let resolvedType = objectType;
  if (!resolvedType) {
    const { data: ws } = await supabaseAdmin
      .from('workspaces')
      .select('sf_inject_object')
      .eq('id', workspaceId)
      .single();
    resolvedType = ((ws as unknown as { sf_inject_object: string })?.sf_inject_object as 'Task' | 'Lead' | 'Contact' | 'Opportunity') ?? 'Task';
  }

  let recordId: string;
  switch (resolvedType) {
    case 'Lead':
      recordId = await injectAsLead(accessToken, instanceUrl, signal);
      break;
    case 'Contact':
      recordId = await injectAsContact(accessToken, instanceUrl, signal);
      break;
    case 'Opportunity':
      recordId = await injectAsOpportunity(accessToken, instanceUrl, signal);
      break;
    default:
      recordId = await injectAsTask(accessToken, instanceUrl, signal);
  }

  const recordUrl = `${instanceUrl}/lightning/r/${resolvedType}/${recordId}/view`;
  return { recordId, objectType: resolvedType, recordUrl };
}
