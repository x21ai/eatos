// @ts-nocheck
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { serviceModels } from "../data/serviceModels";

export function ServiceModelsSection() {
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
            Built for every service model.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Designed to adapt to your needs, whether you run a fast-casual
            counter, upscale dining room, busy bar, or cozy café.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceModels.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img
                src={model.image}
                alt={model.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${model.gradient} via-black/30 to-transparent`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{model.title}</h3>
                <p className="text-white/70 text-sm mb-4">{model.subtitle}</p>
                <ul className="space-y-1.5">
                  {model.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-white/80"
                    >
                      <Check size={13} className="text-white flex-shrink-0" />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
