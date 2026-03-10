"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, badge, className }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-surface border border-border/50 rounded-xl p-6 flex flex-col gap-4 group",
        className
      )}
    >
      {(icon || badge) && (
        <div className="flex items-start justify-between">
          {icon && (
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              {icon}
            </div>
          )}
          {badge && (
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
              {badge}
            </Badge>
          )}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="font-display font-semibold text-foreground text-base">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
