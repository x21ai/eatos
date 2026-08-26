// @ts-nocheck
import { ArrowRight, Command, CreditCard } from "lucide-react";
import { motion } from "motion/react";

export function HardwareSection() {
  return (
    <section className="py-20 md:py-28 bg-black text-white relative overflow-hidden">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Faster service.{" "}
            <span className="text-gray-500">Smoother operations.</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Beautiful hardware and seamless payments, designed to keep up with
            the speed of your restaurant.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Point of Sale Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 group"
          >
            <div className="p-10 pb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-4 text-white/80">
                <Command size={14} /> Point of Sale
              </div>
              <h3 className="text-3xl font-bold mb-2">Modern Point of Sale</h3>
              <p className="text-gray-400 mb-6">
                Intuitive, fast, and built for every service style. Manage
                orders, tables, and menus from a single beautiful interface.
              </p>
            </div>
            <div className="px-6 pb-0">
              <img
                src="https://ucarecdn.com/c0c7e8e9-324d-4d51-8fa6-8a867032ad32/-/format/auto/"
                alt="eatOS Point of Sale"
                loading="lazy"
                className="w-full rounded-t-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Payments + Handheld Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 group"
          >
            <div className="p-10 pb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-4 text-white/80">
                <CreditCard size={14} /> Payments & Hardware
              </div>
              <h3 className="text-3xl font-bold mb-2">
                Payments & handheld ordering
              </h3>
              <p className="text-gray-400 mb-6">
                Accept every payment type at 2.99%+20¢ flat rate. Plus handheld
                devices that let your staff take orders from anywhere.
              </p>
            </div>
            <div className="px-6 pb-0">
              <img
                src="https://ucarecdn.com/894a0c84-afe1-429a-9cb7-9b9c3bd6929e/-/format/auto/"
                alt="eatOS Hardware"
                loading="lazy"
                className="w-full rounded-t-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-10"
        >
          <a
            href="/hardware"
            className="inline-flex items-center gap-2 text-white font-semibold border-b border-white/30 pb-1 hover:border-white transition-colors"
          >
            Explore all hardware <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
