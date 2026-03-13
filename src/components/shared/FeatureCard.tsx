"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  badge,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-card border border-border rounded-xl p-6 flex flex-col gap-4 group transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
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
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground text-base">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
