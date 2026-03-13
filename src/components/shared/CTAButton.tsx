"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  showIcon?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
}

export function CTAButton({
  children,
  href,
  onClick,
  showIcon = false,
  className,
  size = "md",
  variant = "primary",
}: CTAButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const baseClasses = cn(
    "inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer",
    sizeClasses[size],
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
      : "border border-border text-foreground hover:bg-secondary/50",
    className
  );

  const inner = (
    <>
      {showIcon && <Sparkles className="w-4 h-4" />}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={baseClasses}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
      onClick={onClick}
    >
      {inner}
    </motion.button>
  );
}
