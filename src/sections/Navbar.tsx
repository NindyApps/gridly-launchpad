"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Radar } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[#2D5A3D] bg-[#0F2A1D]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0F2A1D]/80">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#6B8F71]/10 flex items-center justify-center border border-[#6B8F71]/20">
            <Radar className="w-5 h-5 text-[#6B8F71]" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[#EAF0E2]">OCTOPILOT</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A3B18A]">
          <a href="#how-it-works" className="hover:text-[#EAF0E2] transition-colors">How it Works</a>
          <a href="#features" className="hover:text-[#EAF0E2] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#EAF0E2] transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="ghost" className="text-[#A3B18A] hover:text-[#EAF0E2] hover:bg-[#2D5A3D]/30">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="bg-[#6B8F71] hover:bg-[#7DA383] text-[#0F2A1D] font-semibold rounded-full px-6">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden text-[#EAF0E2]" onClick={() => setMobileOpen(!mobileOpen)} data-testid="mobile-menu-toggle">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0F2A1D] border-b border-[#2D5A3D] px-6 pb-4 space-y-3">
          <a href="#how-it-works" className="block text-sm font-medium text-[#A3B18A] hover:text-[#EAF0E2]">How it Works</a>
          <a href="#features" className="block text-sm font-medium text-[#A3B18A] hover:text-[#EAF0E2]">Features</a>
          <a href="#pricing" className="block text-sm font-medium text-[#A3B18A] hover:text-[#EAF0E2]">Pricing</a>
          <Button asChild variant="ghost" className="w-full text-sm text-[#A3B18A]">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="w-full bg-[#6B8F71] hover:bg-[#7DA383] text-[#0F2A1D] rounded-full font-semibold">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
