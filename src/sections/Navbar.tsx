"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Radar } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0d0f]/60 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0d0f]/40">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Radar className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">OCTOPILOT</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/5">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold rounded-full px-6">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} data-testid="mobile-menu-toggle">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a0d0f] border-b border-white/5 px-6 pb-4 space-y-3">
          <a href="#how-it-works" className="block text-sm font-medium text-zinc-400 hover:text-white">How it Works</a>
          <a href="#features" className="block text-sm font-medium text-zinc-400 hover:text-white">Features</a>
          <a href="#pricing" className="block text-sm font-medium text-zinc-400 hover:text-white">Pricing</a>
          <Button asChild variant="ghost" className="w-full text-sm text-zinc-300">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-full font-semibold">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
