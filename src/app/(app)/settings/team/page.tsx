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
import { useToast } from '@/hooks/use-toast';
import { useWorkspaces } from '@/hooks/use-workspaces';
import { UserPlus, Loader2 } from 'lucide-react';
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
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
                <Badge className={`text-xs border ${roleColors[member.role]}`}>{member.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
