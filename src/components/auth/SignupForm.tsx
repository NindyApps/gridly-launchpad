"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export function SignupForm() {
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push('/onboarding'), 1500);
  };

  return (
    <Card className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-white">Create your account</CardTitle>
        <CardDescription className="text-zinc-400">Start finding buyers in 5 minutes</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-500/10 border border-green-500/20 px-3 py-2 text-sm text-green-400">
              Account created! Redirecting to onboarding...
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="full-name" className="text-zinc-300">Full Name</Label>
            <Input
              id="full-name"
              type="text"
              placeholder="Jane Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
              data-testid="input-full-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
              data-testid="input-email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
              data-testid="input-password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            disabled={loading || success}
            data-testid="button-submit"
          >
            {loading ? 'Creating account...' : 'Get Started Free'}
          </Button>
          <p className="text-sm text-zinc-400 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
              Sign in
            </Link>
          </p>
          <p className="text-xs text-zinc-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
