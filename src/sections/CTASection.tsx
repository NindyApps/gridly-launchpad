"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const router = useRouter();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 tracking-tight text-foreground text-balance max-w-3xl mx-auto"
        >
          Start finding your next customers today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Join the forward-thinking revenue teams already using OCTOPILOT to
          turn social noise into high-converting pipeline.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="h-13 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full w-full sm:w-auto text-base shadow-lg shadow-primary/20"
            onClick={() => router.push("/signup")}
            data-testid="cta-get-started-button"
          >
            Get Started for Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-13 px-8 border-border hover:bg-secondary/50 font-medium rounded-full w-full sm:w-auto text-base text-foreground"
          >
            Talk to Sales
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-sm text-muted-foreground/70"
        >
          14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;
