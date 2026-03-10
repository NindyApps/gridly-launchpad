"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { createClient } from '@/lib/supabase/client';
import { Zap, CheckCircle2, ExternalLink, Loader2 } from 'lucide-react';

export default function CRMSettingsPage() {
  const { workspace, isLoading } = useAuth();
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  const hubspotConnected = !!workspace?.hubspot_token_enc;

  const handleConnect = async () => {
    setConnecting(true);
    const res = await fetch('/api/crm/hubspot/connect');
    const { url } = await res.json();
    window.location.href = url;
  };

  const handleDisconnect = async () => {
    if (!workspace?.id) return;
    setDisconnecting(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('workspaces')
      .update({ hubspot_token_enc: null, hubspot_refresh_token_enc: null, hubspot_token_expires_at: null })
      .eq('id', workspace.id);
    setDisconnecting(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'HubSpot disconnected', description: 'Your HubSpot connection has been removed.' });
      window.location.reload();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
        <Card className="border border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <span className="text-lg">🔶</span>
                </div>
                <div>
                  <CardTitle className="text-foreground text-base">HubSpot</CardTitle>
                  <CardDescription className="text-muted-foreground">Auto-create contacts and tasks from signals</CardDescription>
                </div>
              </div>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : hubspotConnected ? (
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" />Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="border-border text-muted-foreground">Not connected</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {hubspotConnected ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  HubSpot is connected. High-intent signals will automatically create contacts and tasks in your CRM.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-rose-500/20 text-rose-400 hover:bg-rose-500/10"
                  onClick={handleDisconnect}
                  disabled={disconnecting}
                  data-testid="button-disconnect-hubspot"
                >
                  {disconnecting ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : null}
                  Disconnect HubSpot
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Connect HubSpot to automatically push high-intent buying signals as tasks to your sales team.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Auto-create contacts from signal authors</li>
                  <li>Create tasks with AI-generated openers</li>
                  <li>Zero-write — we never post on your behalf</li>
                </ul>
                <Button
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                  onClick={handleConnect}
                  disabled={connecting || isLoading}
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

        <Card className="border border-border bg-card opacity-60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="text-lg">☁️</span>
                </div>
                <div>
                  <CardTitle className="text-foreground text-base">Salesforce</CardTitle>
                  <CardDescription className="text-muted-foreground">Coming soon</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="border-border text-muted-foreground">Soon</Badge>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
