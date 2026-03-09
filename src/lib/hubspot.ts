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
