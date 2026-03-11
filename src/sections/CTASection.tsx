"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const router = useRouter();

  return (
    <section className="py-32 relative overflow-hidden border-t border-[#2D5A3D]">
      <div className="absolute inset-0 bg-[#0F2A1D]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6B8F71]/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight text-[#EAF0E2]">
          Start finding your next customers
        </h2>
        <p className="text-xl text-[#A3B18A] mb-10 max-w-2xl mx-auto">
          Join the forward-thinking revenue teams already using OCTOPILOT to turn social
          noise into high-converting pipeline.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="h-14 px-10 bg-[#6B8F71] hover:bg-[#7DA383] text-[#0F2A1D] font-bold rounded-full w-full sm:w-auto text-lg shadow-[0_0_30px_-5px_rgba(107,143,113,0.3)]"
            onClick={() => router.push("/signup")}
            data-testid="cta-get-started-button"
          >
            Get Started for Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-10 border-[#2D5A3D] hover:bg-[#2D5A3D]/30 font-semibold rounded-full w-full sm:w-auto text-lg backdrop-blur-sm text-[#EAF0E2]"
          >
            Talk to Sales
          </Button>
        </div>
        <p className="mt-6 text-sm text-[#A3B18A]/60">14-day free trial. No credit card required.</p>
      </div>
    </section>
  );
};

export default CTASection;
