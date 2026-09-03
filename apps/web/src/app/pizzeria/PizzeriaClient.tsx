// @ts-nocheck
'use client';

import {
  Check,
  ChefHat,
  ChevronRight,
  Clock,
  Layers,
  Monitor,
  Pizza,
  Shield,
  Truck,
  Users,
  Warehouse,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { capabilities, hero, marquee, pillars } from './content';

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const related = [
  {
    href: '/products/online-ordering',
    title: 'Online Ordering',
    tagline: 'Direct Web orders with no extra Fee.',
    Icon: Monitor,
    iconClass: 'bg-sky-500/15 text-sky-400',
  },
  {
    href: '/products/kitchen-display-system',
    title: 'Kitchen Display System',
    tagline: 'Kitchen tickets routed to the right station.',
    Icon: ChefHat,
    iconClass: 'bg-orange-500/15 text-orange-400',
  },
  {
    href: '/products/workforce-management',
    title: 'Workforce Management',
    tagline: 'Scheduling, clock-ins are in one place.',
    Icon: Users,
    iconClass: 'bg-teal-500/15 text-teal-400',
  },
];

const pillarIcons = {
  builder: { Icon: Layers, iconClass: 'bg-red-500/15 text-red-400' },
  delivery: { Icon: Truck, iconClass: 'bg-amber-500/15 text-amber-400' },
  cost: { Icon: Warehouse, iconClass: 'bg-sky-500/15 text-sky-400' },
};

export default function PizzeriaClient() {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat selection:bg-red-500/30">
      {/* Hero */}
      <section className="relative pt-[128px] md:pt-[176px] pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-red-600/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none opacity-50" />

        <div className="site-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/70 mb-8"
          >
            <a href="/solutions" className="hover:text-white transition-colors">
              Concepts
            </a>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-white">Pizzeria</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8 text-red-400"
              >
                <Pizza size={36} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4"
              >
                {hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 text-red-400"
              >
                {hero.eyebrow}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-xl text-white/90 leading-relaxed mb-10 max-w-xl"
              >
                {hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href={hero.primaryCta.href}
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center"
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  {hero.secondaryCta.label}
                </a>
              </motion.div>
            </div>

            {/* Key features card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-[2rem] md:rounded-[2.5rem] border border-red-500/20 bg-white/5 backdrop-blur-xl p-8 md:p-10"
            >
              <h2 className="text-xl font-bold tracking-tighter mb-8">Key features</h2>
              <div className="space-y-5 md:space-y-6">
                {capabilities.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mt-0.5">
                      <Check size={16} />
                    </div>
                    <div className="min-w-0 text-base md:text-lg font-medium">{feature}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="border-t border-white/5 py-12 md:py-16">
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {marquee.map((stat) => (
              <motion.div key={stat.label} {...rise} className="min-w-0 text-center">
                <div className="text-3xl md:text-4xl font-bold tracking-tighter">{stat.value}</div>
                <div className="mt-2 text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature rows */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container space-y-16 md:space-y-24">
          {pillars.map((pillar, index) => {
            const { Icon, iconClass } =
              pillarIcons[pillar.id] ?? { Icon: Pizza, iconClass: 'bg-white/10 text-white' };
            return (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                {...rise}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <div className={`min-w-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconClass}`}
                  >
                    <Icon size={28} />
                  </div>
                  <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter mb-5">
                    {pillar.title}
                  </h2>
                  <p className="text-lg text-white/90 leading-relaxed mb-5">{pillar.body}</p>
                  <p className="text-base text-white/70 leading-relaxed mb-8">{pillar.more}</p>
                  <div className="flex flex-wrap gap-4">
                    {pillar.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 min-w-0"
                      >
                        <div className="text-2xl font-bold tracking-tighter text-red-400">
                          {metric.value}
                        </div>
                        <div className="mt-1 text-xs text-white/70">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`min-w-0 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div
                    className={
                      pillar.id === 'cost'
                        ? 'overflow-hidden'
                        : 'rounded-[2rem] border border-white/10 bg-white/5 overflow-hidden'
                    }
                  >
                    <Placeholder
                      label={pillar.imageLabel}
                      src={pillar.image}
                      ratio="aspect-[16/10]"
                      className="rounded-none"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why pizzeria */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <motion.div {...rise} className="text-center mb-14 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Why eatOS for <br className="md:hidden" />
              pizzerias?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Built for custom orders, delivery volume and tight food cost.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                Icon: Zap,
                title: 'Built for custom builds',
                body: 'Halves, toppings and crusts ring in fast, so a complicated pie takes no longer than a slice.',
                iconClass: 'bg-amber-500/15 text-amber-400',
              },
              {
                Icon: Shield,
                title: 'Reliable through the rush',
                body: 'Online and offline modes keep the register, oven line and delivery board running on Friday night.',
                iconClass: 'bg-sky-500/15 text-sky-400',
              },
              {
                Icon: Clock,
                title: '24/7 support',
                body: 'Real people, real help, any time. We are here when you need us, especially during peak hours.',
                iconClass: 'bg-red-500/15 text-red-400',
              },
            ].map(({ Icon, title, body, iconClass }, index) => (
              <motion.div
                key={title}
                {...rise}
                transition={{ delay: index * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconClass}`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold tracking-tighter mb-3">{title}</h3>
                <p className="text-white/90 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works great with */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <motion.div
            {...rise}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Works great with</h2>
            <a
              href="/products"
              className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors flex items-center gap-1"
            >
              View all products <ChevronRight size={16} className="shrink-0" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(({ href, title, tagline, Icon, iconClass }, index) => (
              <motion.a
                key={href}
                href={href}
                {...rise}
                transition={{ delay: index * 0.1 }}
                className="group rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 transition-all hover:border-white/20"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconClass}`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold tracking-tighter mb-2">{title}</h3>
                <p className="text-white/70 mb-6">{tagline}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                  Learn more
                  <ChevronRight
                    size={16}
                    className="shrink-0 transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="site-container">
          <motion.div
            {...rise}
            className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-red-600/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="relative z-10 p-10 md:p-20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Start using restaurant technology cloud
              </h2>
              <p className="text-sm md:text-xl text-white/90 max-w-2xl mx-auto mb-10 whitespace-pre-line">
                See the pizzeria setup in action. Book a demo and we will show you exactly how it fits your shop from day one.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/bookademo"
                  className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
                >
                  Book a Demo
                </a>
                <a
                  href="/pricing"
                  className="px-10 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
