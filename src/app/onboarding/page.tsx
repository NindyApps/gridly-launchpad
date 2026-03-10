"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TagInput } from "@/components/shared/TagInput";
import { FullPageLoader } from "@/components/shared/LoadingSpinner";
import { Zap, CheckCircle2, Plus, X } from "lucide-react";
import type { UserRole } from "@/types/app";

const STEPS = ["Welcome", "Connect CRM", "Create Tracker", "Invite Team"];

interface Invite { email: string; role: UserRole; sent: boolean }

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(0);
  const [initializing, setInitializing] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hubspotConnected, setHubspotConnected] = useState(false);

  const [trackerName, setTrackerName] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [subreddits, setSubreddits] = useState<string[]>([]);
  const [trackerLoading, setTrackerLoading] = useState(false);
  const [trackerError, setTrackerError] = useState<string | null>(null);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("viewer");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }
      setUserId(user.id);

      const name = user.user_metadata?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "there";
      setFirstName(name);

      const { data: profile } = await supabase
        .from("profiles")
        .select("workspace_id, onboarding_completed, onboarding_step")
        .eq("id", user.id)
        .single();

      if (profile?.onboarding_completed) { router.replace("/dashboard"); return; }
      if (profile?.workspace_id) {
        setWorkspaceId(profile.workspace_id);
        const { data: ws } = await supabase
          .from("workspaces")
          .select("hubspot_token_enc")
          .eq("id", profile.workspace_id)
          .single();
        setHubspotConnected(!!ws?.hubspot_token_enc);
      }

      if (profile?.onboarding_step) setStep(profile.onboarding_step);
      setInitializing(false);
    };
    init();
  }, []);

  const saveStep = async (nextStep: number) => {
    if (userId) {
      await supabase
        .from("profiles")
        .update({ onboarding_step: nextStep })
        .eq("id", userId);
    }
    setStep(nextStep);
  };

  const handleCreateTracker = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackerError(null);
    if (!workspaceId || !userId) return;
    if (!trackerName.trim()) { setTrackerError("Tracker name is required."); return; }

    setTrackerLoading(true);
    const { error } = await supabase.from("trackers").insert({
      workspace_id: workspaceId,
      created_by: userId,
      name: trackerName,
      keywords,
      competitor_names: competitors,
      subreddits,
      platforms: ["reddit", "hackernews"],
      is_active: true,
    });
    setTrackerLoading(false);
    if (error) { setTrackerError(error.message); return; }
    await saveStep(3);
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId) return;
    setInviteError(null);
    setInviteLoading(true);

    const res = await fetch("/api/team/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail, role: inviteRole, workspace_id: workspaceId }),
    });
    const data = await res.json();
    setInviteLoading(false);

    if (!res.ok) { setInviteError(data.error || "Failed to send invite"); return; }
    setInvites((prev) => [...prev, { email: inviteEmail, role: inviteRole, sent: true }]);
    setInviteEmail("");
    setInviteRole("viewer");
  };

  const handleFinish = async () => {
    if (!userId) return;
    setFinishing(true);
    await supabase
      .from("profiles")
      .update({ onboarding_completed: true, onboarding_step: 3 })
      .eq("id", userId);
    router.push("/dashboard");
  };

  if (initializing) return <FullPageLoader />;

  const progress = (step / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">OCTOPILOT</span>
      </div>

      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, i) => (
            <span key={s} className={`text-xs ${i === step ? "text-indigo-400 font-medium" : i < step ? "text-green-400" : "text-zinc-500"}`}>
              {i < step ? "✓ " : ""}{s}
            </span>
          ))}
        </div>
        <Progress value={progress} className="h-1.5 bg-white/10" />
      </div>

      <div className="w-full max-w-lg">
        {step === 0 && (
          <Card className="border border-border bg-white/5">
            <CardContent className="pt-10 pb-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-indigo-400" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome to OCTOPILOT, {firstName}!</h1>
                <p className="text-zinc-400 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                  In the next few minutes you'll connect your CRM, set up your first signal tracker, and invite your team. Let's go.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-left text-xs text-zinc-400 pt-2">
                {["Connect HubSpot", "Monitor Reddit & HN", "Auto-inject signals"].map((f) => (
                  <div key={f} className="rounded-lg border border-border bg-white/5 p-3 text-center">{f}</div>
                ))}
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 w-full text-white font-semibold" onClick={() => saveStep(1)} data-testid="button-get-started">
                Get Started →
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
          <Card className="border border-border bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Connect your CRM</CardTitle>
              <CardDescription className="text-zinc-400">
                Connect HubSpot to auto-inject buying signals as tasks for your sales team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {hubspotConnected ? (
                <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-400">Connected to HubSpot</p>
                    <p className="text-xs text-zinc-400">Signals will be auto-injected as tasks.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border border-border bg-white/5 p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-xl shrink-0">🔶</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">HubSpot CRM</p>
                      <p className="text-xs text-zinc-400">Auto-create contacts and task with AI openers</p>
                    </div>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 shrink-0"
                      size="sm"
                      onClick={() => window.location.href = "/api/crm/hubspot/connect"}
                      data-testid="button-connect-hubspot"
                    >
                      Connect
                    </Button>
                  </div>
                  <p className="text-xs text-zinc-500 text-center">
                    You can always connect your CRM later in Settings.
                  </p>
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 border-border text-zinc-400" onClick={() => saveStep(0)}>
                  ← Back
                </Button>
                <Button
                  className={`flex-1 ${hubspotConnected ? "bg-indigo-600 hover:bg-indigo-700" : "border-border text-zinc-400"}`}
                  variant={hubspotConnected ? "default" : "outline"}
                  onClick={() => saveStep(2)}
                  data-testid="button-next-or-skip"
                >
                  {hubspotConnected ? "Continue →" : "Skip for now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border border-border bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Create your first tracker</CardTitle>
              <CardDescription className="text-zinc-400">
                Tell OCTOPILOT what buying signals to watch for.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateTracker}>
              <CardContent className="space-y-4">
                {trackerError && (
                  <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
                    {trackerError}
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-zinc-300">Tracker Name *</Label>
                  <Input
                    value={trackerName}
                    onChange={(e) => setTrackerName(e.target.value)}
                    placeholder="e.g. CRM Buyers"
                    className="border-border bg-white/5 text-white placeholder:text-zinc-500"
                    data-testid="input-tracker-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Keywords</Label>
                  <TagInput
                    tags={keywords}
                    onChange={setKeywords}
                    placeholder='Type a keyword, press Enter'
                    data-testid="input-keywords"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Competitor Names</Label>
                  <TagInput
                    tags={competitors}
                    onChange={setCompetitors}
                    placeholder='Type a competitor, press Enter'
                    data-testid="input-competitors"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Subreddits to monitor</Label>
                  <TagInput
                    tags={subreddits}
                    onChange={setSubreddits}
                    placeholder='Type a subreddit name, press Enter'
                    prefix="r/"
                    data-testid="input-subreddits"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1 border-border text-zinc-400" onClick={() => saveStep(1)}>
                    ← Back
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-border text-zinc-400"
                    onClick={() => saveStep(3)}
                  >
                    Skip
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    disabled={trackerLoading}
                    data-testid="button-create-tracker"
                  >
                    {trackerLoading ? "Creating..." : "Create →"}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        )}

        {step === 3 && (
          <Card className="border border-border bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Invite your team</CardTitle>
              <CardDescription className="text-zinc-400">
                Bring your sales team into OCTOPILOT. They'll receive an email invitation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <form onSubmit={handleSendInvite} className="space-y-3">
                {inviteError && (
                  <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
                    {inviteError}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="flex-1 border-border bg-white/5 text-white placeholder:text-zinc-500"
                    data-testid="input-invite-email"
                  />
                  <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as UserRole)}>
                    <SelectTrigger className="w-28 border-border bg-white/5 text-white shrink-0" data-testid="select-invite-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="sdr">SDR</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 shrink-0"
                    disabled={inviteLoading || !inviteEmail}
                    data-testid="button-send-invite"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    {inviteLoading ? "..." : "Invite"}
                  </Button>
                </div>
              </form>

              {invites.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500">Invitations sent</p>
                  {invites.map((inv, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-white/5 px-3 py-2" data-testid={`invite-row-${i}`}>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                        <span className="text-sm text-zinc-300">{inv.email}</span>
                      </div>
                      <span className="text-xs text-zinc-500 capitalize">{inv.role}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="border-border text-zinc-400" onClick={() => saveStep(2)}>
                  ← Back
                </Button>
                <Button
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                  onClick={handleFinish}
                  disabled={finishing}
                  data-testid="button-go-to-dashboard"
                >
                  {finishing ? "Setting up..." : "Go to Dashboard →"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
