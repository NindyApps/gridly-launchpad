"use client";

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '@/types/app';

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    profile: null,
    loading: true,
  });

  const supabase = createClient();

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return data as Profile | null;
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user ?? null;
        let profile = null;
        if (user) profile = await fetchProfile(user.id);
        setState({ user, session, profile, loading: false });
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      let profile = null;
      if (user) profile = await fetchProfile(user.id);
      setState({ user, session, profile, loading: false });
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { ...state, signOut };
}
