"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const router = useRouter();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#0A0A0A', borderTop: '1px solid #2A2A2A' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[150px]" style={{ background: 'rgba(0, 201, 106, 0.08)' }} />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px]" style={{ background: 'rgba(124, 58, 237, 0.06)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-balance max-w-3xl mx-auto"
          style={{ color: '#F0F0F0' }}
        >
          Start finding your next customers today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: '#A0A0A0' }}
        >
          Join the forward-thinking revenue teams already using OCTOPILOT to
          turn social noise into high-converting pipeline.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            size="lg"
            className="h-12 px-7 gradient-primary text-white font-semibold rounded-[10px] w-full sm:w-auto text-base shadow-glow transition-all hover:scale-[1.02]"
            onClick={() => router.push("/signup")}
            data-testid="cta-get-started-button"
          >
            Get Started for Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-7 font-medium rounded-[10px] w-full sm:w-auto text-base bg-transparent transition-all"
            style={{ border: '1px solid #2A2A2A', color: '#A0A0A0' }}
          >
            Talk to Sales
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-sm"
          style={{ color: '#606060' }}
        >
          14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;
