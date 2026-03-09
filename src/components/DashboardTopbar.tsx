"use client";

import { Bell, Check, ChevronDown, LogOut, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardTopbar() {
  const { user, signOut } = useAuth();
  const { workspaces, activeWorkspace, switchWorkspace, isLoading } = useWorkspaces();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors text-sm font-medium text-foreground">
              <div className="w-5 h-5 rounded bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                {activeWorkspace?.name?.charAt(0).toUpperCase() ?? "W"}
              </div>
              {isLoading ? (
                <Skeleton className="h-4 w-20" />
              ) : (
                <span className="max-w-[140px] truncate">{activeWorkspace?.name ?? "No workspace"}</span>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Workspaces</div>
            {workspaces.map((ws) => (
              <DropdownMenuItem
                key={ws.id}
                onClick={() => switchWorkspace(ws.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                    {ws.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate">{ws.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{ws.plan}</span>
                </div>
                {ws.id === activeWorkspace?.id && <Check className="w-4 h-4 text-accent" />}
              </DropdownMenuItem>
            ))}
            {workspaces.length === 0 && !isLoading && (
              <div className="px-2 py-3 text-sm text-muted-foreground text-center">No workspaces found</div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="w-4 h-4 text-accent" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5 text-sm text-muted-foreground truncate">
              {user?.email}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
