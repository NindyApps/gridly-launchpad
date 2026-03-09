"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { FullPageLoader } from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";

export default function AcceptInvitePage() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workspaceName, setWorkspaceName] = useState<string | null>(null);
  const [inviterEmail, setInviterEmail] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("workspace_id")
          .eq("id", session.user.id)
          .single();

        if (profile?.workspace_id) {
          const { data: ws } = await supabase
            .from("workspaces")
            .select("name")
            .eq("id", profile.workspace_id)
            .single();
          setWorkspaceName(ws?.name ?? null);
        }

        setInviterEmail(session.user.email ?? null);
      }
      setChecking(false);
    };
    init();
  }, []);

  const passwordsMatch = !confirmPassword || password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const token = params.get("token");
    if (token) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "invite",
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  if (checking) return <FullPageLoader />;

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">OCTOPILOT</span>
      </div>

      <Card className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader className="space-y-2">
          {workspaceName && (
            <div className="flex items-center gap-2 mb-2 text-green-400 text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>Invitation verified</span>
            </div>
          )}
          <CardTitle className="text-xl text-white">
            {workspaceName
              ? `Join ${workspaceName} on OCTOPILOT`
              : "Accept your invitation"}
          </CardTitle>
          <CardDescription className="text-zinc-400">
            {inviterEmail
              ? `You've been invited to join${workspaceName ? ` ${workspaceName}` : ""}. Set a password to activate your account.`
              : "Set a password to activate your account."}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="pr-10 border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-zinc-300">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={cn(
                    "pr-10 border-white/10 bg-white/5 text-white placeholder:text-zinc-500",
                    !passwordsMatch && "border-red-500/50"
                  )}
                  data-testid="input-confirm-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {!passwordsMatch && (
                <p className="text-xs text-red-400">Passwords do not match</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
              disabled={loading}
              data-testid="button-submit"
            >
              {loading ? "Activating account..." : "Activate Account"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
