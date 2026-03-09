"use client";

import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function AlertsSettingsPage() {
  const { toast } = useToast();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState('');
  const [threshold, setThreshold] = useState([70]);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast({ title: 'Alert settings saved', description: 'Your notification preferences have been updated.' });
  };

  return (
    <div className="h-full flex flex-col">
      <TopBar title="Alerts" subtitle="Configure when and how you're notified" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
        <Card className="border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white text-base">Confidence Threshold</CardTitle>
            <CardDescription className="text-zinc-400">
              Only receive alerts for signals above this confidence score.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-300">Minimum confidence</span>
              <span className="text-sm font-semibold text-indigo-400">{threshold[0]}%</span>
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
            <p className="text-xs text-zinc-500">Lower = more signals, Higher = only the most confident ones.</p>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white text-base">Notification Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-zinc-200">Email Alerts</Label>
                <p className="text-xs text-zinc-500">Receive a daily digest of high-intent signals.</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} data-testid="switch-email-alerts" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-zinc-200">Slack Alerts</Label>
                <p className="text-xs text-zinc-500">Get real-time notifications in Slack.</p>
              </div>
              <Switch checked={slackAlerts} onCheckedChange={setSlackAlerts} data-testid="switch-slack-alerts" />
            </div>
            {slackAlerts && (
              <div className="space-y-2">
                <Label className="text-zinc-300">Slack Webhook URL</Label>
                <Input
                  value={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.value)}
                  placeholder="https://hooks.slack.com/services/..."
                  className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
                  data-testid="input-slack-webhook"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSave} disabled={saving} data-testid="button-save-alerts">
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
