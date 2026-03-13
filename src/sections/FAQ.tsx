"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does OCTOPILOT find intent?",
    answer:
      "Our AI agents continuously monitor relevant subreddits, HN discussions, and social feeds for specific keywords and buying patterns related to your product.",
  },
  {
    question: "Which CRMs do you integrate with?",
    answer:
      "We currently support direct integrations with Salesforce and HubSpot. You can also export data via CSV or connect via our API.",
  },
  {
    question: "Is this compliant with platform terms?",
    answer:
      "Yes, we only access public data through official APIs and standard web crawling practices that respect robots.txt.",
  },
  {
    question: "How long does setup take?",
    answer:
      "You can be up and running in less than 5 minutes. Just enter your target keywords, connect your CRM, and signals will start flowing immediately.",
  },
  {
    question: "Can I try it before buying?",
    answer:
      "Yes, all plans come with a 14-day free trial so you can evaluate the quality of leads before committing.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium tracking-wide uppercase mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-foreground"
          >
            Frequently asked questions
          </motion.h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`border border-border rounded-xl overflow-hidden transition-colors duration-200 ${
                openIndex === i ? "bg-card" : "bg-transparent hover:bg-card/50"
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-testid={`faq-toggle-${i}`}
              >
                <span className="font-medium text-base md:text-lg text-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
