"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#2A2A2A]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🐙</span>
          <span className="font-semibold text-[#F0F0F0] tracking-tight">
            OCTOPILOT
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A0A0A0]">
          <a
            href="#how-it-works"
            className="hover:text-[#F0F0F0] transition-colors duration-200"
          >
            How it Works
          </a>
          <a
            href="#features"
            className="hover:text-[#F0F0F0] transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-[#F0F0F0] transition-colors duration-200"
          >
            Pricing
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-[#A0A0A0] hover:text-[#F0F0F0] hover:bg-transparent"
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            asChild
            className="gradient-primary text-white font-semibold rounded-[10px] px-5 hover:opacity-90 transition-opacity"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        <button
          className="md:hidden text-[#F0F0F0] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="mobile-menu-toggle"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-md border-b border-[#2A2A2A] px-6 pb-6 pt-2 space-y-4">
          <a
            href="#how-it-works"
            className="block text-sm font-medium text-[#A0A0A0] hover:text-[#F0F0F0] py-2"
          >
            How it Works
          </a>
          <a
            href="#features"
            className="block text-sm font-medium text-[#A0A0A0] hover:text-[#F0F0F0] py-2"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block text-sm font-medium text-[#A0A0A0] hover:text-[#F0F0F0] py-2"
          >
            Pricing
          </a>
          <div className="pt-2 space-y-3">
            <Button
              asChild
              variant="ghost"
              className="w-full text-sm text-[#A0A0A0]"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              asChild
              className="w-full gradient-primary text-white rounded-[10px] font-semibold"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
