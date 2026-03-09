"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap, CheckCircle2 } from 'lucide-react';

const STEPS = ['Workspace', 'First Tracker', 'Done'];

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(0);
  const [workspaceName, setWorkspaceName] = useState('');
  const [trackerName, setTrackerName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    const slug = workspaceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const { error } = await supabase.from('workspaces').insert({
      name: workspaceName,
      slug,
      plan: 'pro',
      alert_confidence_threshold: 0.7,
      seats_limit: 5,
    });

    if (error) { setError(error.message); setLoading(false); return; }
    setLoading(false);
    setStep(1);
  };

  const handleTracker = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    const { data: workspace } = await supabase
      .from('workspaces')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (workspace) {
      await supabase.from('trackers').insert({
        workspace_id: workspace.id,
        name: trackerName,
        keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
        competitor_names: [],
        subreddits: ['startups', 'sales'],
        platforms: ['reddit'],
        is_active: true,
        confidence_override: null,
      });
    }

    setLoading(false);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">OCTOPILOT</span>
      </div>

      <div className="mb-8 flex items-center gap-3">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${i <= step ? 'bg-indigo-600 text-white' : 'bg-white/10 text-zinc-400'}`}>
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm ${i === step ? 'text-white' : 'text-zinc-500'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className="w-8 h-px bg-white/10" />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <Card className="w-full max-w-md border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Name your workspace</CardTitle>
            <CardDescription className="text-zinc-400">This is your team's OCTOPILOT workspace.</CardDescription>
          </CardHeader>
          <form onSubmit={handleWorkspace}>
            <CardContent className="space-y-4">
              {error && <div className="text-sm text-red-400">{error}</div>}
              <div className="space-y-2">
                <Label className="text-zinc-300">Workspace Name</Label>
                <Input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Acme Corp"
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
                  data-testid="input-workspace-name"
                />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading} data-testid="button-continue">
                {loading ? 'Creating...' : 'Continue'}
              </Button>
            </CardContent>
          </form>
        </Card>
      )}

      {step === 1 && (
        <Card className="w-full max-w-md border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Create your first tracker</CardTitle>
            <CardDescription className="text-zinc-400">Tell OCTOPILOT what buying signals to watch for.</CardDescription>
          </CardHeader>
          <form onSubmit={handleTracker}>
            <CardContent className="space-y-4">
              {error && <div className="text-sm text-red-400">{error}</div>}
              <div className="space-y-2">
                <Label className="text-zinc-300">Tracker Name</Label>
                <Input value={trackerName} onChange={(e) => setTrackerName(e.target.value)} placeholder="CRM Buyers" required className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500" data-testid="input-tracker-name" />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">Keywords (comma-separated)</Label>
                <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="crm software, hubspot alternative" required className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500" data-testid="input-keywords" />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading} data-testid="button-continue">
                {loading ? 'Saving...' : 'Continue'}
              </Button>
            </CardContent>
          </form>
        </Card>
      )}

      {step === 2 && (
        <Card className="w-full max-w-md border border-white/10 bg-white/5 text-center">
          <CardContent className="pt-10 pb-8 space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white">You're all set!</h2>
            <p className="text-zinc-400 text-sm">Your tracker is active. OCTOPILOT will start finding buyers for you.</p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 w-full mt-4" onClick={() => router.push('/dashboard')} data-testid="button-go-to-dashboard">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
