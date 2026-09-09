// @ts-nocheck
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function OnePlatformSection() {
  return (
    <section className="py-24 bg-white">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-widest text-brand uppercase mb-4">
            One platform. Every tool.
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Everything you need in
            <br />
            <span className="text-gray-400">one place.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            No more juggling vendors. eatOS combines Point of Sale, payments, kitchen
            management, AI, workforce tools, marketing, and more into a single
            unified system.
          </p>
        </motion.div>

        {/* Product pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {[
            "Point of Sale",
            "Payments",
            "Kitchen Display",
            "Self-Service Kiosk",
            "Online Ordering",
            "Analytics",
            "Workforce",
            "Inventory",
            "Loyalty",
            "Gift Cards",
            "Marketing",
            "Handheld Point of Sale",
            "Tableside",
            "Delivery",
          ].map((name) => (
            <a
              key={name}
              href="/products"
              className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand hover:bg-brand-soft hover:text-brand transition-all"
            >
              {name}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="/products"
            className="text-brand font-semibold text-sm hover:underline inline-flex items-center gap-1"
          >
            Explore all products <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
