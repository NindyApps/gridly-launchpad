"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';
import type { UserRole } from '@/types/app';

interface MockMember {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
}

const MOCK_MEMBERS: MockMember[] = [
  { id: '1', email: 'admin@company.com', role: 'admin', full_name: 'You' },
];

const roleColors: Record<UserRole, string> = {
  admin: 'bg-red-500/10 text-red-400 border-red-500/20',
  analyst: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  sdr: 'bg-green-500/10 text-green-400 border-green-500/20',
  viewer: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

export default function TeamSettingsPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('viewer');
  const [inviting, setInviting] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    await new Promise((r) => setTimeout(r, 800));
    setInviting(false);
    setEmail('');
    toast({ title: 'Invitation sent', description: `An invite was sent to ${email}` });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
        <Card className="border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white text-base">Invite a team member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-48 space-y-2">
                <Label className="text-zinc-300">Email address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
                  data-testid="input-invite-email"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                  <SelectTrigger className="w-32 border-white/10 bg-white/5 text-white" data-testid="select-role">
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
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 flex gap-2" disabled={inviting} data-testid="button-invite">
                <UserPlus className="h-4 w-4" /> {inviting ? 'Inviting...' : 'Invite'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white text-base">Members ({MOCK_MEMBERS.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_MEMBERS.map((member) => (
              <div key={member.id} className="flex items-center justify-between" data-testid={`member-row-${member.id}`}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-indigo-600 text-white text-xs">
                      {member.full_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-white">{member.full_name}</p>
                    <p className="text-xs text-zinc-400">{member.email}</p>
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
