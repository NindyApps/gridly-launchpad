import { SignupForm } from '@/components/auth/SignupForm';
import { Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account | OCTOPILOT',
  description: 'Start finding B2B buyers the moment they say they need you.',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">OCTOPILOT</span>
      </div>
      <SignupForm />
    </div>
  );
}
