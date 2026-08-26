// @ts-nocheck
'use client';

import {
  ChevronRight,
  RefreshCw,
  Wifi,
  Network,
  CloudUpload,
  Monitor,
  CreditCard,
  Bot,
  ChefHat,
  TabletSmartphone,
  Smartphone,
  BarChart3,
  Package,
} from 'lucide-react';
import { motion } from 'motion/react';
import MeshDiagram from './MeshDiagram';
import { hero, syncPoints, capabilities, platform, cta } from './content';

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const syncIcons = [RefreshCw, Wifi, CloudUpload];
const capabilityIcons = [Network, Wifi, CloudUpload];

const platformLinks = [
  { title: 'Point of Sale', href: '/point-of-sale', Icon: Monitor, tint: 'bg-sky-500/10 text-sky-400' },
  { title: 'Payments', href: '/accept-payments', Icon: CreditCard, tint: 'bg-emerald-500/10 text-emerald-400' },
  { title: 'Kitchen Display', href: '/products/kitchen-display-system', Icon: ChefHat, tint: 'bg-amber-500/10 text-amber-400' },
  { title: 'Self-Service Kiosk', href: '/products/self-service-kiosk', Icon: TabletSmartphone, tint: 'bg-violet-500/10 text-violet-400' },
  { title: 'Handheld', href: '/products/point-of-purchase', Icon: Smartphone, tint: 'bg-rose-500/10 text-rose-400' },
  { title: 'Analytics', href: '/products/reporting-analytics', Icon: BarChart3, tint: 'bg-sky-500/10 text-sky-400' },
  { title: 'Inventory', href: '/products/simplified-inventory-management', Icon: Package, tint: 'bg-emerald-500/10 text-emerald-400' },
  { title: 'Autonomous Delivery', href: '/products/autonomous-delivery', Icon: Bot, tint: 'bg-violet-500/10 text-violet-400' },
];

export default function OfflinePosClient() {
  return (
    <main className="min-h-screen bg-black text-white font-montserrat selection:bg-sky-500/30">
      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-14 md:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none opacity-60" />
        <div className="site-container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter max-w-4xl mx-auto whitespace-pre-line"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto"
          >
            {hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10"
          >
            <a
              href={hero.primaryCta.href}
              className="inline-block px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
            >
              {hero.primaryCta.label}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-14 md:mt-20"
          >
            <MeshDiagram />
          </motion.div>
        </div>
      </section>

      {/* Run fully offline */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <motion.div {...rise} className="mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-400 mb-4">
              {hero.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl">
              Run fully offline. Stay fully connected.
            </h2>
            <p className="mt-5 text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed">
              Powered by the eatOS peer-to-peer mesh network and cloud sync
              technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {syncPoints.map((point, index) => {
              const Icon = syncIcons[index % syncIcons.length];
              return (
                <motion.div
                  key={point.title}
                  {...rise}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10"
                >
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tighter mb-3">
                    {point.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">{point.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-t border-white/5 py-12 md:py-16">
        <div className="site-container">
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            {hero.stats.map((stat) => (
              <motion.div key={stat.label} {...rise} className="min-w-0 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-sky-400">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical capabilities */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <motion.div {...rise} className="mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-400 mb-4">
              Technical Capabilities
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Built to never miss an order
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((cap, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              return (
                <motion.div
                  key={cap.title}
                  {...rise}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10"
                >
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tighter mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">{cap.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform cross-links */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <motion.div {...rise} className="mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-400 mb-4">
              {platform.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              {platform.title}
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white/80">{platform.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {platformLinks.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                {...rise}
                transition={{ delay: index * 0.05 }}
                className="group rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 md:p-8 transition-all hover:border-white/25"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${item.tint}`}
                >
                  <item.Icon size={24} />
                </div>
                <h3 className="text-base md:text-lg font-bold tracking-tighter mb-4">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-sm font-semibold text-white/80 group-hover:text-white group-hover:gap-2 transition-all">
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
          <motion.div {...rise} className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-sky-600/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="relative z-10 p-10 md:p-20 text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-3">
                {cta.title}
              </h2>
              <p className="mx-auto max-w-2xl text-xl md:text-2xl text-white/80 mb-10">{cta.subtitle}</p>
              <a
                href={cta.button.href}
                className="inline-block px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
              >
                {cta.button.label}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
