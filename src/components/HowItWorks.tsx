import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Define Your Offer",
    description: "Tell us what you sell and who your ideal buyer is",
    cta: "Define Your Offer",
  },
  {
    num: "2",
    title: "AI Discovers High-Intent Buyers",
    description: "We surface conversations where prospects are actively seeking solutions like yours",
    cta: "AI Discovers Buyers",
  },
  {
    num: "3",
    title: "Engage and Convert",
    description: "Reach out with personalized messages and close deals directly from one dashboard",
    cta: "Engage and Convert",
  },
];

const HowItWorks = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
            From <span className="text-gradient">zero to qualified</span>{" "}
            leads at <span className="text-gradient">warp speed</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-background rounded-2xl border border-border p-7 text-center hover:border-accent/30 transition-all group flex flex-col"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {step.num}
              </div>
              <h3 className="font-display font-bold text-base text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{step.description}</p>
              <Button
                variant="outline"
                className="rounded-full text-xs font-medium gap-1 border-border text-foreground hover:bg-secondary mx-auto"
              >
                {step.cta} <ArrowRight className="w-3 h-3" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
