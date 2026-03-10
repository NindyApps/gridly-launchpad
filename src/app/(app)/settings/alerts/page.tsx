"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function AlertsSettingsPage() {
  const { toast } = useToast();
  const { workspace, profile, isLoading } = useAuth();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState('');
  const [threshold, setThreshold] = useState([70]);
  const [saving, setSaving] = useState(false);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (!initialised && !isLoading && workspace && profile) {
      const prefs = (profile.notification_prefs ?? {}) as { email?: boolean; slack?: boolean };
      setEmailAlerts(prefs.email ?? true);
      setSlackAlerts(prefs.slack ?? false);
      setSlackWebhook(workspace.slack_webhook_url ?? '');
      setThreshold([Math.round((workspace.alert_confidence_threshold ?? 0.7) * 100)]);
      setInitialised(true);
    }
  }, [workspace, profile, isLoading, initialised]);

  const handleSave = async () => {
    if (!workspace?.id || !profile?.id) return;
    setSaving(true);
    const supabase = createClient();

    const [wsResult, profResult] = await Promise.all([
      supabase
        .from('workspaces')
        .update({
          alert_confidence_threshold: threshold[0] / 100,
          slack_webhook_url: slackAlerts ? slackWebhook : null,
        })
        .eq('id', workspace.id),
      supabase
        .from('profiles')
        .update({
          notification_prefs: { email: emailAlerts, slack: slackAlerts, in_app: true },
        })
        .eq('id', profile.id),
    ]);

    setSaving(false);

    if (wsResult.error || profResult.error) {
      toast({ title: 'Save failed', description: wsResult.error?.message ?? profResult.error?.message, variant: 'destructive' });
    } else {
      toast({ title: 'Settings saved', description: 'Your notification preferences have been updated.' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground text-base">Confidence Threshold</CardTitle>
            <CardDescription className="text-muted-foreground">
              Only receive alerts for signals above this confidence score.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Minimum confidence</span>
              <span className="text-sm font-semibold text-primary">{threshold[0]}%</span>
            </div>
            <Slider
              value={threshold}
              onValueChange={setThreshold}
              min={0}
              max={100}
              step={5}
              className="w-full"
              data-testid="slider-confidence-threshold"
            />
            <p className="text-xs text-muted-foreground">Lower = more signals, Higher = only the most confident ones.</p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground text-base">Notification Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Email Alerts</Label>
                <p className="text-xs text-muted-foreground">Receive a daily digest of high-intent signals.</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} data-testid="switch-email-alerts" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Slack Alerts</Label>
                <p className="text-xs text-muted-foreground">Get real-time notifications in Slack.</p>
              </div>
              <Switch checked={slackAlerts} onCheckedChange={setSlackAlerts} data-testid="switch-slack-alerts" />
            </div>
            {slackAlerts && (
              <div className="space-y-2">
                <Label className="text-muted-foreground">Slack Webhook URL</Label>
                <Input
                  value={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.value)}
                  placeholder="https://hooks.slack.com/services/..."
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  data-testid="input-slack-webhook"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={handleSave}
          disabled={saving || !initialised}
          data-testid="button-save-alerts"
        >
          {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</> : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
