// @ts-nocheck
import { ArrowRight, ChefHat, Clock, Languages, Route } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Route,
    title: "Prep station routing",
    desc: "Send orders to the right station automatically so every dish starts on time.",
  },
  {
    icon: Languages,
    title: "Multi-lingual support",
    desc: "Kitchen staff see tickets in their preferred language, no translation delays.",
  },
  {
    icon: Clock,
    title: "Real-time updates",
    desc: "Color-coded alerts and live timing keep the line moving and tickets accurate.",
  },
];

export function KitchenDisplaySection() {
  return (
    <section className="py-20 md:py-28 bg-black text-white relative overflow-hidden">
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold mb-6">
              <ChefHat size={14} />
              <span>Kitchen Display System</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              Chaos, controlled.
            </h2>

            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
              The Kitchen Display System that keeps front and back of house in
              perfect sync. Real-time updates, color-coded alerts, and
              performance tracking.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="bg-green-500/10 text-green-400 p-2.5 rounded-xl flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="/products/kitchen-display-system"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Explore Kitchen Display <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-tr from-green-500/10 to-emerald-500/5 rounded-[3rem] blur-3xl" />
            <img
              src="https://ucarecdn.com/3532d108-2981-4a5d-bd16-9f6adf89c04d/-/format/auto/"
              alt="Kitchen Display System"
              loading="lazy"
              className="relative z-10 rounded-3xl border border-white/10 shadow-2xl w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
