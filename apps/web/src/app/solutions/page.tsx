// @ts-nocheck
'use client';

import {
  Zap,
  Utensils,
  Star,
  Coffee,
  Wine,
  Truck,
  Package,
  Building2,
  Network,
  ArrowRight,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';

const solutions = [
  {
    href: '/solutions/quick-service',
    title: 'Quick Service',
    description:
      'Built for speed and volume. Take orders fast, move lines, and process payments without friction.',
    Icon: Zap,
    color: 'orange',
    features: ['Lightning-fast order entry', 'Self-service kiosk mode', 'Next-day deposits'],
    image: 'https://ucarecdn.com/570caf20-51b9-47b0-98a7-778538be2392/-/format/auto/',
  },
  {
    href: '/solutions/full-service',
    title: 'Full Service',
    description:
      'Seamless table-to-kitchen flow. Manage your floor, pace courses, and close checks with ease.',
    Icon: Utensils,
    color: 'indigo',
    features: ['Visual floor plan management', 'Course pacing and firing', 'Flexible split checks'],
    image: 'https://ucarecdn.com/95432288-86ee-4542-a032-acde33a12956/-/format/auto/',
  },
  {
    href: '/solutions/fast-casual',
    title: 'Fast Casual',
    description:
      'Speed with accuracy. Move more guests through the counter without slowing your team down.',
    Icon: Star,
    color: 'purple',
    features: [
      'Counter and kiosk ordering',
      'Accurate order fulfillment',
      'Kitchen display routing',
    ],
    image: null,
  },
  {
    href: '/solutions/cafe',
    title: 'Cafe and Coffee Shop',
    description:
      'Handle the morning rush without missing a beat. Fast modifiers, loyalty built in, and reliable hardware.',
    Icon: Coffee,
    color: 'amber',
    features: ['Quick modifier entry', 'Built-in loyalty', 'Mobile handheld ordering'],
    image: null,
  },
  {
    href: '/solutions/bar',
    title: 'Bar and Nightclub',
    description:
      'Fast tabs, real-time inventory, and the flexibility to keep the night moving at full speed.',
    Icon: Wine,
    color: 'rose',
    features: ['Open tab management', 'Inventory tracking by pour', 'End-of-night reporting'],
    image: null,
  },
  {
    href: '/solutions/food-truck',
    title: 'Food Truck',
    description:
      'Mobile, powerful, and reliable. Run your truck anywhere with hardware that works offline.',
    Icon: Truck,
    color: 'green',
    features: ['Offline mode', 'Compact hardware', 'Tap-to-pay ready'],
    image: null,
  },
  {
    href: '/solutions/ghost-kitchen',
    title: 'Ghost Kitchen',
    description:
      'Delivery-first operations built for multi-brand kitchens. One platform, multiple storefronts.',
    Icon: Package,
    color: 'slate',
    features: [
      'Multi-brand menu management',
      'Delivery platform integrations',
      'Kitchen ticket routing',
    ],
    image: null,
  },
  {
    href: '/solutions/catering',
    title: 'Catering',
    description:
      'Handle large event orders swiftly, with custom menus, live inventory and repeat client data.',
    Icon: Building2,
    color: 'blue',
    features: ['Event menu customization', 'Large-order logistics', 'Client CRM and repeat business'],
    image: null,
  },
  {
    href: '/solutions/enterprise',
    title: 'Enterprise',
    description:
      'Built for enterprise scale. Central control of menus, staff and reporting across every property.',
    Icon: Network,
    color: 'violet',
    features: ['Central menu control', 'Workforce and attendance', 'Open API and Marketplace'],
    image: null,
  },
];

const colorMap = {
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  slate: { bg: 'bg-slate-500/10', text: 'text-slate-300', border: 'border-slate-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat selection:bg-indigo-500/30">
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-black pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="site-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm font-medium mb-6 text-white/90"
          >
            Built for every type of restaurant
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[1.05]"
          >
            Your restaurant type.
            <br />
            <span className="text-white/70">Your way.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12"
          >
            eatOS adapts to how you serve. Whether you run a food truck or a fine dining room, we
            have a configuration built for it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/get-started"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-all"
            >
              Get Started
            </a>
            <a
              href="/book-demo"
              className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Book a Demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 md:py-28">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, i) => {
              const colors = colorMap[solution.color];
              return (
                <motion.a
                  key={solution.href}
                  href={solution.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className={`group bg-zinc-900 rounded-[2rem] p-8 border border-white/5 hover:border-white/10 transition-all flex flex-col overflow-hidden relative`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`${colors.bg} ${colors.text} p-3 rounded-2xl w-fit mb-5`}>
                      <solution.Icon size={22} />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{solution.title}</h2>
                    <p className="text-white/90 leading-relaxed mb-6 flex-grow">
                      {solution.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-white/90">
                          <Check size={14} className={colors.text} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className={`flex items-center gap-2 text-sm font-semibold ${colors.text}`}>
                      Learn more
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="site-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Not sure which fits?
            </h2>
            <p className="text-white/90 text-xl max-w-xl mx-auto mb-10">
              Talk to one of our specialists. We will map the right configuration to your floor
              plan, volume, and service style.
            </p>
            <a
              href="/contact-sales"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-all"
            >
              Talk to Sales <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
