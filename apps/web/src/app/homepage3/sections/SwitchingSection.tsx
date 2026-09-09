// @ts-nocheck
import { Shield, Headphones, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { switchingSteps } from "../../homepage2/data/switchingSteps";

export function SwitchingSection() {
  return (
    <section className="py-20 md:py-28 bg-zinc-50">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Switching made effortless.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Go live within 24 hours. Our white-glove onboarding team handles
            everything so you don't skip a beat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {switchingSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative"
              >
                <div className="text-6xl font-bold text-gray-100 absolute top-6 right-6">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl w-fit mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
        >
          <span className="flex items-center gap-1.5">
            <Shield size={14} className="text-indigo-500" /> Free data migration
          </span>
          <span className="flex items-center gap-1.5">
            <Headphones size={14} className="text-indigo-500" /> Dedicated
            onboarding specialist
          </span>
          <span className="flex items-center gap-1.5">
            <Wifi size={14} className="text-indigo-500" /> Works with your
            existing hardware
          </span>
        </motion.div>
      </div>
    </section>
  );
}
