// @ts-nocheck
import { ChefHat } from "lucide-react";
import { motion } from "motion/react";

export function KitchenDisplaySection() {
  return (
    <section className="py-12 md:py-16 bg-black text-white">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900 rounded-[2rem] p-6 md:p-10 text-center border border-white/5 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="bg-green-500/10 text-green-400 p-3 rounded-xl w-fit mx-auto mb-4">
              <ChefHat size={24} />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-3">
              Chaos, controlled.
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-6 max-w-2xl mx-auto">
              The Kitchen Display System that keeps front and back of house in
              perfect sync. Real-time updates, color-coded alerts, and
              performance tracking.
            </p>
            <img
              src="https://ucarecdn.com/3532d108-2981-4a5d-bd16-9f6adf89c04d/-/format/auto/"
              alt="Kitchen Display System"
              loading="lazy"
              className="rounded-2xl border border-white/10 shadow-2xl mx-auto max-w-3xl w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
