// @ts-nocheck
'use client';

import {
  LayoutGrid,
  Check,
  RefreshCw,
  Wallet,
  CreditCard,
  Layers,
  WifiOff,
} from 'lucide-react';
import { motion } from 'motion/react';
import BrochureButton from '@/components/BrochureButton';
import { Placeholder } from '@/components/marketing/Placeholder';
import { features, hero } from './content';
import { demoSources } from '../components/demoSources';
import LazyVideo from '@/components/marketing/LazyVideo';

const posDemo = demoSources.find((d) => d.id === 'pos');


const featureIcons = [
  { Icon: RefreshCw, tint: 'bg-emerald-500/10 text-emerald-400' },
  { Icon: LayoutGrid, tint: 'bg-sky-500/10 text-sky-400' },
  { Icon: Wallet, tint: 'bg-amber-500/10 text-amber-400' },
  { Icon: CreditCard, tint: 'bg-violet-500/10 text-violet-400' },
  { Icon: Layers, tint: 'bg-indigo-500/10 text-indigo-400' },
  { Icon: WifiOff, tint: 'bg-rose-500/10 text-rose-400' },
];

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};


export default function PosPageClient() {
  return (
    <div className="relative overflow-hidden bg-black min-h-screen font-montserrat selection:bg-orange-500/30 text-white">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-screen z-0 opacity-40 pointer-events-none">

        <img
          src="https://raw.createusercontent.com/0f9f7bed-312b-405c-a290-ec7efd519ed4/"
          className="w-full h-full object-cover blur-sm"
          alt=""
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-[128px] md:pt-[176px] pb-10 md:pb-14">
          <div className="site-container text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6"
            >
              {hero.title} <br />
              <span className="text-orange-500">{hero.titleAccent}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-400 mb-5"
            >
              {hero.eyebrow}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10"
            >
              {hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={hero.primaryCta.href}
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center"
              >
                {hero.primaryCta.label}
              </a>
              <BrochureButton brochureId="point-of-sale" />
            </motion.div>
          </div>
        </section>

        {/* Interactive canvas */}
        <section className="pb-20 md:pb-28">
          <div className="site-container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-8 md:mb-12 text-center text-3xl md:text-5xl font-bold tracking-tighter"
            >
              How it Works
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="mx-auto min-w-0 max-w-3xl"
            >
              <div className="bg-zinc-900 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden relative">
                <LazyVideo
              className="w-full h-auto block"
              poster={posDemo?.media?.poster}
              sources={posDemo?.media?.sources || []}
              ariaLabel="Point of Sale demo animation"
            />

              </div>

            </motion.div>
          </div>
        </section>

        {/* Feature rows */}
        <section className="py-20 md:py-28 border-t border-white/5 bg-black">
          <div className="site-container space-y-16 md:space-y-24">
            {features.map((feature, index) => {
              const { Icon, tint } = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={feature.id}
                  id={feature.id}
                  {...rise}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                  <div className={`min-w-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tint}`}
                    >
                      <Icon size={28} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-5">
                      {feature.title}
                    </h2>
                    <p className="text-base md:text-lg text-white/90 leading-relaxed mb-5">
                      {feature.body}
                    </p>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">
                      {feature.more}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {feature.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 min-w-0"
                        >
                          <div className="text-2xl font-bold tracking-tighter text-orange-400">
                            {metric.value}
                          </div>
                          <div className="mt-1 text-xs text-white/70">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`min-w-0 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <Placeholder
                      label={feature.imageLabel}
                      src={feature.image || undefined}
                      ratio="aspect-[16/10]"
                    />

                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 md:pb-28">
          <div className="site-container">
            <motion.div {...rise} className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="relative z-10 p-10 md:p-20 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                  Ready to get started?
                </h2>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
                  See the Point of Sale in action. Book a demo and we will show you exactly how it fits your operation from day one.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/bookademo"
                    className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
                  >
                    Book a Demo
                  </a>
                  <a
                    href="/contact"
                    className="px-10 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
