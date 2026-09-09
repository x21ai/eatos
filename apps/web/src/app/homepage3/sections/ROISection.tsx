// @ts-nocheck
import { Quote } from "lucide-react";
import { motion } from "motion/react";
import { stats } from "../../homepage2/data/stats";

export function ROISection() {
  return (
    <section className="py-20 md:py-28 bg-black text-white">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-semibold tracking-widest text-brand-on-dark uppercase mb-4">
            The impact
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            How <strong>eatOS</strong> helps your
            <br />
            <span className="text-gray-500">restaurant grow.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900 rounded-3xl p-8 border border-white/5"
              >
                <Icon size={24} className="text-brand-on-dark mb-6" />
                <div className="text-5xl md:text-6xl font-bold tracking-tighter mb-2">
                  {stat.value}
                  <span className="text-brand-on-dark">{stat.unit}</span>
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial inside stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-zinc-900 rounded-3xl p-10 md:p-14 border border-white/5 flex flex-col md:flex-row items-start gap-10"
        >
          <Quote size={40} className="text-brand/40 flex-shrink-0" />
          <div>
            <blockquote className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-6 italic">
              "<strong>eatOS</strong> completely transformed how we run our
              restaurant. From the Point of Sale to kitchen display to payments,
              everything just works together seamlessly. We saved 12 hours a
              week on admin alone."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-soft0/20 flex items-center justify-center text-sm font-bold text-brand-on-dark">
                JM
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  James Miller
                </div>
                <div className="text-xs text-gray-500">
                  Owner, The Corner Kitchen, NYC
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
