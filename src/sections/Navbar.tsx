"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Radar } from "lucide-react";

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
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Radar className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            OCTOPILOT
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a
            href="#how-it-works"
            className="hover:text-foreground transition-colors duration-200"
          >
            How it Works
          </a>
          <a
            href="#features"
            className="hover:text-foreground transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-foreground transition-colors duration-200"
          >
            Pricing
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-5"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="mobile-menu-toggle"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border px-6 pb-6 pt-2 space-y-4">
          <a
            href="#how-it-works"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground py-2"
          >
            How it Works
          </a>
          <a
            href="#features"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground py-2"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground py-2"
          >
            Pricing
          </a>
          <div className="pt-2 space-y-3">
            <Button
              asChild
              variant="ghost"
              className="w-full text-sm text-muted-foreground"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold"
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
