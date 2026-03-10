"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { createClient } from '@/lib/supabase/client';
import { Zap, CheckCircle2, ExternalLink, Loader2, Cloud } from 'lucide-react';
import { format } from 'date-fns';

export default function CRMSettingsPage() {
  return (
    <Suspense>
      <CRMContent />
    </Suspense>
  );
}

function CRMContent() {
  const { workspace, isLoading } = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [sfConnecting, setSfConnecting] = useState(false);
  const [sfDisconnecting, setSfDisconnecting] = useState(false);
  const [sfInjectObject, setSfInjectObject] = useState<string>('Task');
  const [savingInjectObject, setSavingInjectObject] = useState(false);

  const hubspotConnected = !!workspace?.hubspot_token_enc;
  const sfConnected = !!workspace?.sf_access_token_enc;

  useEffect(() => {
    if (workspace?.sf_inject_object) {
      setSfInjectObject(workspace.sf_inject_object);
    }
  }, [workspace?.sf_inject_object]);

  useEffect(() => {
    const sfConnectedParam = searchParams.get('sf_connected');
    const sfErrorParam = searchParams.get('sf_error');
    const connectedParam = searchParams.get('connected');

    if (sfConnectedParam === 'true') {
      toast({ title: 'Salesforce connected!', description: 'Your Salesforce account is now linked.' });
    }
    if (sfErrorParam) {
      toast({ title: 'Salesforce connection failed', description: 'Connection was canceled or denied.', variant: 'destructive' });
    }
    if (connectedParam === 'true') {
      toast({ title: 'HubSpot connected!', description: 'Your HubSpot account is now linked.' });
    }
  }, [searchParams]);

  const handleHubSpotConnect = async () => {
    setConnecting(true);
    const res = await fetch('/api/crm/hubspot/connect');
    const { url } = await res.json();
    window.location.href = url;
  };

  const handleHubSpotDisconnect = async () => {
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

  const handleSfConnect = () => {
    setSfConnecting(true);
    window.location.href = '/api/crm/salesforce/connect';
  };

  const handleSfDisconnect = async () => {
    setSfDisconnecting(true);
    try {
      const res = await fetch('/api/crm/salesforce/disconnect', { method: 'POST' });
      if (!res.ok) throw new Error('Disconnect failed');
      toast({ title: 'Salesforce disconnected', description: 'Your Salesforce connection has been removed.' });
      window.location.reload();
    } catch {
      toast({ title: 'Error', description: 'Failed to disconnect Salesforce.', variant: 'destructive' });
    } finally {
      setSfDisconnecting(false);
    }
  };

  const handleInjectObjectChange = async (value: string) => {
    setSfInjectObject(value);
    setSavingInjectObject(true);
    try {
      await fetch('/api/crm/salesforce/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sf_inject_object: value }),
      });
    } catch {
      toast({ title: 'Error', description: 'Failed to save preference.', variant: 'destructive' });
    } finally {
      setSavingInjectObject(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">

        {/* HubSpot Card */}
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
                  onClick={handleHubSpotDisconnect}
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
                  onClick={handleHubSpotConnect}
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

        {/* Salesforce Card */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,161,224,0.12)' }}>
                  <Cloud className="h-5 w-5" style={{ color: '#00A1E0' }} />
                </div>
                <div>
                  <CardTitle className="text-foreground text-base">Salesforce CRM</CardTitle>
                  <CardDescription className="text-muted-foreground">Push signals as Tasks, Leads, Contacts, or Opportunities</CardDescription>
                </div>
              </div>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : sfConnected ? (
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" />Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="border-border text-muted-foreground">Not connected</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {sfConnected ? (
              <div className="space-y-4">
                {workspace?.sf_instance_url && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Instance:</span>{' '}
                    <a
                      href={workspace.sf_instance_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline inline-flex items-center gap-1"
                      style={{ color: '#00A1E0' }}
                    >
                      {workspace.sf_instance_url.replace('https://', '')}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
                {workspace?.sf_connected_at && (
                  <p className="text-sm text-muted-foreground">
                    Connected since {format(new Date(workspace.sf_connected_at), 'MMM d, yyyy')}
                  </p>
                )}

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Inject signals as</label>
                  <div className="flex items-center gap-2">
                    <Select value={sfInjectObject} onValueChange={handleInjectObjectChange} disabled={savingInjectObject}>
                      <SelectTrigger className="w-44 bg-background border-border" data-testid="select-sf-inject-object">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Task">Task</SelectItem>
                        <SelectItem value="Lead">Lead</SelectItem>
                        <SelectItem value="Contact">Contact</SelectItem>
                        <SelectItem value="Opportunity">Opportunity</SelectItem>
                      </SelectContent>
                    </Select>
                    {savingInjectObject && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-rose-500/20 text-rose-400 hover:bg-rose-500/10"
                      disabled={sfDisconnecting}
                      data-testid="button-disconnect-salesforce"
                    >
                      {sfDisconnecting ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : null}
                      Disconnect Salesforce
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Disconnect Salesforce?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove Salesforce access from OCTOPILOT. Your Salesforce data will not be deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-rose-500 hover:bg-rose-600 text-white"
                        onClick={handleSfDisconnect}
                      >
                        Disconnect
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Connect Salesforce to push buying signals directly into your sales pipeline as Tasks, Leads, Contacts, or Opportunities.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Choose which Salesforce object to create</li>
                  <li>AI-generated descriptions included automatically</li>
                  <li>Auto token refresh — stays connected without re-auth</li>
                </ul>
                <Button
                  className="flex items-center gap-2 text-white"
                  style={{ background: '#00A1E0' }}
                  onClick={handleSfConnect}
                  disabled={sfConnecting || isLoading}
                  data-testid="button-connect-salesforce"
                >
                  <Cloud className="h-4 w-4" />
                  {sfConnecting ? 'Connecting...' : 'Connect Salesforce'}
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
