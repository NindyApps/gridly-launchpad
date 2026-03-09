"use client";

import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, CheckCircle2, ExternalLink } from 'lucide-react';

export default function CRMSettingsPage() {
  const [connecting, setConnecting] = useState(false);
  const hubspotConnected = false;

  const handleConnectHubSpot = async () => {
    setConnecting(true);
    const res = await fetch('/api/crm/hubspot/connect');
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="h-full flex flex-col">
      <TopBar title="CRM Integration" subtitle="Connect your CRM to auto-inject buying signals" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
        <Card className="border border-white/10 bg-white/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <span className="text-lg">🔶</span>
                </div>
                <div>
                  <CardTitle className="text-white text-base">HubSpot</CardTitle>
                  <CardDescription className="text-zinc-400">Auto-create contacts and tasks from signals</CardDescription>
                </div>
              </div>
              {hubspotConnected
                ? <Badge className="bg-green-500/10 text-green-400 border-green-500/20"><CheckCircle2 className="h-3 w-3 mr-1" />Connected</Badge>
                : <Badge variant="outline" className="border-white/10 text-zinc-400">Not connected</Badge>
              }
            </div>
          </CardHeader>
          <CardContent>
            {hubspotConnected ? (
              <div className="space-y-3">
                <p className="text-sm text-zinc-300">HubSpot is connected. Signals with high intent will automatically create tasks in your CRM.</p>
                <Button variant="outline" size="sm" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                  Disconnect HubSpot
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-zinc-400">Connect HubSpot to automatically push high-intent buying signals as tasks to your sales team.</p>
                <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
                  <li>Auto-create contacts from signal authors</li>
                  <li>Create tasks with AI-generated openers</li>
                  <li>Zero-write — we never post on your behalf</li>
                </ul>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
                  onClick={handleConnectHubSpot}
                  disabled={connecting}
                  data-testid="button-connect-hubspot"
                >
                  <Zap className="h-4 w-4" />
                  {connecting ? 'Connecting...' : 'Connect HubSpot'}
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/5 opacity-60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="text-lg">☁️</span>
                </div>
                <div>
                  <CardTitle className="text-white text-base">Salesforce</CardTitle>
                  <CardDescription className="text-zinc-400">Coming soon</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="border-white/10 text-zinc-500">Soon</Badge>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
