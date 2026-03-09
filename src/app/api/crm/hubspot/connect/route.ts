import { NextResponse } from 'next/server';
import { getHubSpotOAuthUrl } from '@/lib/hubspot';

export async function GET() {
  const clientId = process.env.HUBSPOT_CLIENT_ID;
  const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: 'HubSpot credentials not configured' }, { status: 500 });
  }

  const url = await getHubSpotOAuthUrl(clientId, redirectUri);
  return NextResponse.json({ url });
}
