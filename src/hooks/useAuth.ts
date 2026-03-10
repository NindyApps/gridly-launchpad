"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import type { Profile, Workspace, UserRole } from "@/types/app";

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  workspace: Workspace | null;
  role: UserRole | null;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    profile: null,
    workspace: null,
    role: null,
    isLoading: true,
  });

  const supabase = createClient();

  const fetchProfileAndWorkspace = useCallback(async (userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!profile) return { profile: null, workspace: null, role: null };

    const typedProfile = profile as unknown as Profile;

    const { data: workspace } = await supabase
      .from("workspaces")
      .select("*")
      .eq("id", typedProfile.workspace_id)
      .single();

    return {
      profile: typedProfile,
      workspace: workspace as unknown as Workspace | null,
      role: typedProfile.role as UserRole,
    };
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      if (user) {
        const { profile, workspace, role } = await fetchProfileAndWorkspace(user.id);
        setState({ user, session, profile, workspace, role, isLoading: false });
      } else {
        setState({ user: null, session: null, profile: null, workspace: null, role: null, isLoading: false });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user ?? null;
        if (user) {
          const { profile, workspace, role } = await fetchProfileAndWorkspace(user.id);
          setState({ user, session, profile, workspace, role, isLoading: false });
        } else {
          setState({ user: null, session: null, profile: null, workspace: null, role: null, isLoading: false });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfileAndWorkspace]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({ user: null, session: null, profile: null, workspace: null, role: null, isLoading: false });
  };

  return { ...state, signOut };
}
