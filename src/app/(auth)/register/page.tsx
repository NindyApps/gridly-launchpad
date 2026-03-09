"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock, User, Building2, Check, ArrowLeft, ArrowRight } from "lucide-react";

const PLANS = [
  { id: "starter", name: "Starter", desc: "500 signals/mo · Basic analytics", price: "Free" },
  { id: "growth", name: "Growth", desc: "5,000 signals/mo · AI outreach · CRM", price: "$79/mo" },
  { id: "enterprise", name: "Enterprise", desc: "Unlimited · Custom integrations", price: "Custom" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");

  const [plan, setPlan] = useState("starter");

  const handleSlugGenerate = (name: string) => {
    setWorkspaceName(name);
    setWorkspaceSlug(
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/onboarding" },
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error("Signup failed");

      const userId = authData.user.id;

      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({ id: userId, display_name: displayName });
      if (profileError) throw profileError;

      const { data: wsData, error: wsError } = await supabase.functions.invoke(
        "create-workspace",
        { body: { name: workspaceName, slug: workspaceSlug, plan, user_id: userId } }
      );
      if (wsError) throw wsError;

      toast.success("Account created! Please check your email to verify.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="flex items-center gap-3 justify-center">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-accent-foreground">
              <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
              <path d="M6 16C6 16 4 14 4 12C4 8 8 4 12 4C16 4 20 8 20 12C20 14 18 16 18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 18L6 22M16 18L18 22M10 19L9 22M14 19L15 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-xl text-foreground">OCTOPILOT</span>
        </div>

        <div className="flex items-center gap-2 justify-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                s <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${s < step ? "bg-accent" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Create your account</h2>
              <p className="text-muted-foreground mt-1">Tell us about yourself</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Jane Smith" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="password" placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
                </div>
              </div>
            </div>
            <Button className="w-full" onClick={() => setStep(2)} disabled={!email || !password || password.length < 6 || !displayName}>
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Set up your workspace</h2>
              <p className="text-muted-foreground mt-1">This is where your team collaborates</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Workspace Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Acme Corp" value={workspaceName} onChange={(e) => handleSlugGenerate(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Workspace URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">octopilot.app/</span>
                  <Input placeholder="acme-corp" value={workspaceSlug} onChange={(e) => setWorkspaceSlug(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)} disabled={!workspaceName || !workspaceSlug}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Choose your plan</h2>
              <p className="text-muted-foreground mt-1">You can upgrade anytime</p>
            </div>
            <div className="space-y-3">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    plan === p.id ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">{p.desc}</p>
                    </div>
                    <span className="font-display font-bold text-foreground">{p.price}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating…" : "Create Account"}
              </Button>
            </div>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
