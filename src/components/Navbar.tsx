import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent-foreground">
              <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
              <path d="M6 16C6 16 4 14 4 12C4 8 8 4 12 4C16 4 20 8 20 12C20 14 18 16 18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 18L6 22M16 18L18 22M10 19L9 22M14 19L15 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">COPIT</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            Resources <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </div>

        <div className="hidden md:block">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 rounded-full">
            Login
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          <a href="#about" className="block text-sm font-medium text-muted-foreground">About</a>
          <a href="#resources" className="block text-sm font-medium text-muted-foreground">Resources</a>
          <a href="#pricing" className="block text-sm font-medium text-muted-foreground">Pricing</a>
          <Button className="w-full bg-primary text-primary-foreground rounded-full">Login</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
