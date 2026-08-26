// @ts-nocheck
import { ArrowRight, Check, ChevronDown, Sparkles, Phone } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black text-white">
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://raw.createusercontent.com/2772a9ef-4ecd-4833-95e5-94b09a81c2a7/"
          alt="Restaurant atmosphere"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
      </motion.div>

      <div className="site-container relative z-10 text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-sm font-medium mb-10 text-indigo-300"
        >
          <Sparkles size={14} />
          <span>
            Now with <strong>eatOS</strong> Intelligence, AI built for
            restaurants
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tighter leading-[1.05] mb-8"
        >
          The operating system
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400">
            for modern restaurants.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Point of Sale. Payments. Kitchen. AI. Workforce. Marketing. One platform that
          runs your entire restaurant, so you can focus on hospitality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/get-started"
            className="group px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Get Started Free{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="/contact-sales"
            className="px-8 py-4 rounded-full text-lg font-medium text-white border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Phone size={18} /> Talk to Sales
          </a>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
        >
          <span className="flex items-center gap-1.5">
            <Check size={14} className="text-green-500" /> No setup fees
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={14} className="text-green-500" /> Live in 24 hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={14} className="text-green-500" /> 24/7 support
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={14} className="text-green-500" /> Cancel anytime
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown size={24} className="text-white/40 animate-bounce" />
      </motion.div>
    </section>
  );
}
