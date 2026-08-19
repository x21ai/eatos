// @ts-nocheck
'use client';

import {
  Beer,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Package,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { hero, marquee, pillars } from './content';

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const related = [
  {
    href: '/tap-to-pay',
    title: 'Table Side Order and Pay',
    tagline: 'Take the order and the payment at the rail.',
    Icon: CreditCard,
    iconClass: 'bg-violet-500/15 text-violet-400',
  },
  {
    href: '/point-of-sale',
    title: 'Point of Sale',
    tagline: 'Fast order entry built for high volume nights.',
    Icon: Zap,
    iconClass: 'bg-sky-500/15 text-sky-400',
  },
  {
    href: '/products/workforce-management',
    title: 'Workforce Management',
    tagline: 'Scheduling, clock-ins and labor in one place.',
    Icon: Users,
    iconClass: 'bg-teal-500/15 text-teal-400',
  },
];

const pillarIcons = {
  tabs: { Icon: CreditCard, iconClass: 'bg-rose-500/15 text-rose-400' },
  inventory: { Icon: Package, iconClass: 'bg-emerald-500/15 text-emerald-400' },
  handheld: { Icon: Smartphone, iconClass: 'bg-violet-500/15 text-violet-400' },
};

export default function FoodTruckClient() {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat selection:bg-rose-500/30">
      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/20 via-rose-600/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rose-500/10 rounded-full blur-[150px] pointer-events-none opacity-50" />

        <div className="site-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <a href="/solutions" className="hover:text-white transition-colors">
              Solutions
            </a>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-white">Bar &amp; Nightclub</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            <div className="min-w-0 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-8 text-rose-400"
              >
                <Beer size={36} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4"
              >
                {hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 text-rose-400"
              >
                {hero.eyebrow}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-400 leading-relaxed mb-10 max-w-xl"
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

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto lg:mx-0 rounded-[2rem] md:rounded-[2.5rem] border border-rose-500/20 bg-white/5 overflow-hidden"
            >
              <Placeholder
                label={hero.imageLabel}
                src={hero.image}
                ratio="aspect-[4/3]"
                className="rounded-none"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-white/5 py-14 md:py-20">
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {marquee.map((item, index) => (
              <motion.div
                key={item.value}
                {...rise}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-5">
                  <Check size={18} />
                </div>
                <div className="text-lg md:text-xl font-bold tracking-tighter">{item.value}</div>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.label}</p>
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
              pillarIcons[pillar.id] ?? { Icon: Beer, iconClass: 'bg-white/10 text-white' };
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
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-5">
                    {pillar.title}
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed mb-5">{pillar.body}</p>
                  <p className="text-base text-gray-500 leading-relaxed mb-8">{pillar.more}</p>
                </div>

                <div className={`min-w-0 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
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

      {/* Why bars */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <motion.div {...rise} className="text-center mb-14 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Why eatOS for bars and nightclubs?
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto whitespace-pre-line">
              Built for the pace of the rail, from the first{"\n"}round poured to last call.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                Icon: Zap,
                title: 'Speed at the rail',
                body: 'Favorites, quick keys and repeat rounds keep bartenders pouring instead of tapping through menus.',
                iconClass: 'bg-rose-500/15 text-rose-400',
              },
              {
                Icon: ShieldCheck,
                title: 'Reliable through last call',
                body: 'Online or offline, across every station and handheld, tabs stay open and payments keep clearing.',
                iconClass: 'bg-violet-500/15 text-violet-400',
              },
              {
                Icon: Clock,
                title: '24/7 support',
                body: 'Real people, real help, any time. We are here when you need us, especially after midnight.',
                iconClass: 'bg-emerald-500/15 text-emerald-400',
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
                <p className="text-gray-400 leading-relaxed">{body}</p>
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
                <p className="text-gray-500 mb-6">{tagline}</p>
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
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-rose-600/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="relative z-10 p-10 md:p-20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Keep the night moving
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 whitespace-pre-line">
                See the bar setup in action. Book a demo and we{"\n"}will show you how it fits your rail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/book-demo"
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