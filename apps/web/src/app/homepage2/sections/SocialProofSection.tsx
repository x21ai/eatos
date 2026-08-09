// @ts-nocheck
import { motion } from "motion/react";

export function SocialProofSection() {
  return (
    <section className="py-20 bg-[#fafafa] border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-8">
            Built for restaurants of every size, coast to coast
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-30">
            {/* TODO: Replace with verified eatOS customer logos from the CRM/customer API.
              Do not display brand names of restaurants that are not confirmed eatOS customers. */}
            {[
              "Selfie Fusion Kitchen",
              "Local Pho",
              "Bollywood Bites",
              "Figaro Bistro",
              "Becky's Taqueria",
            ].map((name) => (
              <span
                key={name}
                className="text-xl md:text-2xl font-bold tracking-tighter text-black"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-14"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold tracking-tighter text-black">
              All service types
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Food truck to fine dining
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold tracking-tighter text-black">
              99.9%
            </div>
            <div className="text-sm text-gray-500 mt-1">Uptime target</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold tracking-tighter text-black">
              One platform
            </div>
            <div className="text-sm text-gray-500 mt-1">
              POS · Payments · AI
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold tracking-tighter text-black">
              Nationwide
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Available across the US
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
