"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";

export function useWorkspaces() {
  const { user } = useAuth();
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("active_workspace_id");
  });

  const { data: workspaces = [], isLoading } = useQuery({
    queryKey: ["workspaces", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspaces")
        .select("id, name, slug, plan")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (workspaces.length > 0 && !activeWorkspaceId) {
      setActiveWorkspaceId(workspaces[0].id);
      localStorage.setItem("active_workspace_id", workspaces[0].id);
    }
  }, [workspaces, activeWorkspaceId]);

  const switchWorkspace = (id: string) => {
    setActiveWorkspaceId(id);
    localStorage.setItem("active_workspace_id", id);
  };

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) ?? workspaces[0] ?? null;

  return { workspaces, activeWorkspace, switchWorkspace, isLoading };
}
