"use client";

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { useWorkspaces } from '@/hooks/use-workspaces';
import { UserPlus, Loader2, Trash2 } from 'lucide-react';
import type { UserRole } from '@/types/app';

interface Member {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url: string | null;
  is_you: boolean;
}

const roleColors: Record<UserRole, string> = {
  admin: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  analyst: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  sdr: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  viewer: 'bg-muted text-muted-foreground border-border',
};

export default function TeamSettingsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { activeWorkspace } = useWorkspaces();

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('viewer');
  const [inviting, setInviting] = useState(false);
  const [changingRoleId, setChangingRoleId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const { data: members = [], isLoading } = useQuery<Member[]>({
    queryKey: ['team-members', activeWorkspace?.id],
    queryFn: async () => {
      const res = await fetch(`/api/team/members?workspace_id=${activeWorkspace?.id}`);
      if (!res.ok) throw new Error('Failed to fetch members');
      const { members } = await res.json();
      return members;
    },
    enabled: !!activeWorkspace?.id,
  });

  const currentUser = members.find((m) => m.is_you);
  const isAdmin = currentUser?.role === 'admin';

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWorkspace?.id) return;
    setInviting(true);

    const res = await fetch('/api/team/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role, workspace_id: activeWorkspace.id }),
    });

    setInviting(false);

    if (!res.ok) {
      const { error } = await res.json();
      toast({ title: 'Invite failed', description: error, variant: 'destructive' });
    } else {
      setEmail('');
      toast({ title: 'Invitation sent', description: `An invite was sent to ${email}.` });
      queryClient.invalidateQueries({ queryKey: ['team-members', activeWorkspace.id] });
    }
  };

  const handleChangeRole = async (memberId: string, newRole: UserRole) => {
    if (!activeWorkspace?.id) return;
    setChangingRoleId(memberId);
    try {
      const res = await fetch('/api/team/members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member_id: memberId, workspace_id: activeWorkspace.id, role: newRole }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        toast({ title: 'Role update failed', description: error, variant: 'destructive' });
      } else {
        toast({ title: 'Role updated' });
        queryClient.invalidateQueries({ queryKey: ['team-members', activeWorkspace.id] });
      }
    } catch {
      toast({ title: 'Role update failed', description: 'Something went wrong.', variant: 'destructive' });
    } finally {
      setChangingRoleId(null);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!activeWorkspace?.id) return;
    setRemovingId(memberId);
    try {
      const res = await fetch(`/api/team/members?member_id=${memberId}&workspace_id=${activeWorkspace.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const { error } = await res.json();
        toast({ title: 'Remove failed', description: error, variant: 'destructive' });
      } else {
        toast({ title: 'Member removed' });
        queryClient.invalidateQueries({ queryKey: ['team-members', activeWorkspace.id] });
      }
    } catch {
      toast({ title: 'Remove failed', description: 'Something went wrong.', variant: 'destructive' });
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
        {isAdmin && (
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground text-base">Invite a team member</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInvite} className="flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-48 space-y-2">
                  <Label className="text-muted-foreground">Email address</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    required
                    className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                    data-testid="input-invite-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Role</Label>
                  <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                    <SelectTrigger className="w-32 border-border bg-background text-foreground" data-testid="select-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="sdr">SDR</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 flex gap-2"
                  disabled={inviting}
                  data-testid="button-invite"
                >
                  {inviting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  {inviting ? 'Inviting...' : 'Invite'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground text-base">
              Members {!isLoading && `(${members.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading && (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
            {!isLoading && members.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No members found</p>
            )}
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between" data-testid={`member-row-${member.id}`}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {(member.full_name[0] ?? '?').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-foreground">
                      {member.full_name}
                      {member.is_you && <span className="text-muted-foreground text-xs ml-1.5">(you)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAdmin && !member.is_you ? (
                    <>
                      <Select
                        value={member.role}
                        onValueChange={(v) => handleChangeRole(member.id, v as UserRole)}
                        disabled={changingRoleId === member.id}
                      >
                        <SelectTrigger
                          className="w-28 h-7 text-xs border-border bg-background text-foreground"
                          data-testid={`select-role-${member.id}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="sdr">SDR</SelectItem>
                          <SelectItem value="analyst">Analyst</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-red-400"
                            disabled={removingId === member.id}
                            data-testid={`button-remove-${member.id}`}
                          >
                            {removingId === member.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove team member</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {member.full_name} from this workspace? They will lose access immediately.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveMember(member.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <Badge className={`text-xs border ${roleColors[member.role]}`}>{member.role}</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
