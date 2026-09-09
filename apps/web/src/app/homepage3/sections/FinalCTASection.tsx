// @ts-nocheck
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      <div className="site-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">
            New to <strong>eatOS</strong>?
            <br />
            Get started today.
          </h2>
          <p className="text-xl text-white/80 max-w-xl mx-auto mb-10">
            Restaurants across the US run on <strong>eatOS</strong>. No setup
            fees, no long-term contracts, live in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/bookademo"
              className="px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:scale-105 transition-all flex items-center gap-2 shadow-xl"
            >
              Start Free <ArrowRight size={18} />
            </a>
            <a
              href="/contact"
              className="px-8 py-4 rounded-full text-lg font-medium text-white border border-white/30 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Phone size={18} /> Schedule a Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
