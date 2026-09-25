'use client';

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export function WhyFeatureCard({
  icon: Icon,
  tint,
  title,
  body,
  delay = 0,
}: {
  icon: LucideIcon;
  tint: string;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <motion.div
      {...rise}
      transition={{ delay }}
      className="min-w-0 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tint}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-bold tracking-tighter mb-3">{title}</h3>
      <p className="text-white/90 leading-relaxed">{body}</p>
    </motion.div>
  );
}

/**
 * "Why …?" reasons and the following spec cards share one 3-column grid.
 * They used to be two sections, which drew a divider and a large vertical
 * gap between the first three cards and the next three.
 */
export function WhyFeatureSection({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="py-20 md:py-28 border-t border-white/5">
      <div className="site-container">
        <motion.div {...rise} className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{title}</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-pretty">{description}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">{children}</div>
      </div>
    </section>
  );
}
