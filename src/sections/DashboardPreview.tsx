"use client";

import { motion } from "framer-motion";
const dashboardView = "/dashboard-view.png";

const DashboardPreview = () => {
  return (
    <section className="relative grid-bg pb-20 -mt-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-border bg-card" style={{ boxShadow: "0 20px 60px -15px hsl(220 40% 13% / 0.15)" }}>
            <img
              src={dashboardView}
              alt="Copit Dashboard"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
