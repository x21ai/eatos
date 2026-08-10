'use client';
// @ts-nocheck
import {
  ArrowRight,
  Play,
  Check,
  CreditCard,
  ShieldCheck,
  Percent,
  WifiOff,
  Receipt,
  Layers,
} from 'lucide-react';
import { ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { RevealProvider, Reveal } from '@/components/AIIntelligence/Reveal';
import {
  images,
  stats,
  steps,
  features,
  requirements,
} from './content';

const featureIcons = { CreditCard, ShieldCheck, Percent, WifiOff, Receipt, Layers };

export default function TapToPayClient() {
  return (
    <RevealProvider>
      <div className="bg-black text-white selection:bg-white/20">
        {/* Cinematic Hero */}
        <section className="relative flex h-[100dvh] min-h-screen items-center justify-center overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <img
              src={images.hero}
              alt="Server taking a contactless payment at a restaurant table"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </motion.div>

          <div className="container relative z-10 mx-auto px-4 pt-20 text-center md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300 backdrop-blur-md"
            >
              <Star size={14} fill="currentColor" />
              <span>
                <strong>eatOS</strong> Tap to Pay
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mb-8 text-6xl font-bold leading-[1.05] tracking-tighter md:text-9xl"
            >
              Tap. <br />
              <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                Paid.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mx-auto mb-12 max-w-3xl text-[15px] font-light leading-relaxed text-gray-400 md:text-[22px]"
            >
              Take the payment in the same breath as the order. Your phone is the terminal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <a
                href="/book-demo"
                className="group w-full rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Book a Demo <ChevronRight size={18} />
                </span>
              </a>
              <a
                href="/pricing"
                className="w-full rounded-full border border-white/20 px-8 py-4 text-lg font-medium text-white/90 transition-colors hover:border-white/40 hover:bg-white/5 sm:w-auto"
              >
                See Pricing
              </a>
            </motion.div>
          </div>
        </section>

        {/* Video demo */}
        <section className="border-t border-white/5 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <Reveal id="ttp-video">
              <div className="mx-auto max-w-5xl">
                <div className="mb-8 text-center md:mb-12">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Watch it work
                  </p>
                  <h2 className="text-4xl font-bold tracking-tighter md:text-6xl">
                    Sixty seconds,
                    <br className="hidden sm:block" />{' '}
                    <span className="text-gray-500">start to receipt.</span>
                  </h2>
                </div>

                {/* Video placeholder, drop a <video src> in here later */}
                <div className="group relative aspect-video w-full overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900 md:rounded-[32px]">
                  <img
                    src={images.poster}
                    alt="Server taking a tap payment at a restaurant table"
                    loading="lazy"
                    width={1920}
                    height={1088}
                    className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-2xl transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                      <Play size={26} className="ml-1" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:text-sm">
                      Demo video coming soon
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-left md:bottom-8 md:left-8">
                    <p className="text-sm font-light text-gray-300 md:text-base">
                      Taking a tap payment mid-order
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-white/5 bg-black py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="mb-2 text-4xl font-bold tracking-tighter text-white md:text-5xl">
                    {s.value}
                  </div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="border-t border-white/5 bg-zinc-950 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <Reveal id="ttp-steps-head">
              <div className="mb-14 max-w-3xl md:mb-20">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                  During the order
                </p>
                <h2 className="text-4xl font-bold tracking-tighter md:text-6xl">
                  Payment stops being
                  <br />
                  <span className="text-gray-500">a separate trip.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {steps.map((s, i) => (
                <Reveal key={s.step} id={`ttp-step-${i}`}>
                  <div className="h-full rounded-3xl border border-white/10 bg-black p-8 md:p-10">
                    <div className="mb-6 text-sm font-semibold tracking-widest text-blue-400">
                      {s.step}
                    </div>
                    <h3 className="mb-4 text-2xl font-bold tracking-tighter md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="text-base font-light leading-relaxed text-gray-400">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-white/5 bg-black py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <Reveal id="ttp-feat-head">
              <div className="mb-14 text-center md:mb-20">
                <h2 className="text-4xl font-bold tracking-tighter md:text-6xl">
                  Everything the terminal did.
                  <br />
                  <span className="text-gray-500">Nothing you have to carry.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={f.title} id={`ttp-feat-${i}`}>
                  <div className="h-full rounded-3xl border border-white/10 bg-zinc-950 p-8 transition-colors hover:border-white/20">
                    {(() => {
                      const Icon = featureIcons[f.icon] ?? CreditCard;
                      return (
                        <div
                          className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border ${f.iconBg} ${f.iconBorder} ${f.iconColor}`}
                        >
                          <Icon size={22} />
                        </div>
                      );
                    })()}
                    <h3 className="mb-3 text-xl font-bold tracking-tighter md:text-2xl">
                      {f.title}
                    </h3>
                    <p className="text-[15px] font-light leading-relaxed text-gray-400">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="border-t border-white/5 bg-black py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
                What you need to start
              </h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:flex-wrap md:justify-end md:gap-8">
                {requirements.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-sm text-gray-400 md:text-base">
                    <Check size={16} className="shrink-0 text-blue-400" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-white/5 bg-black py-20 md:py-28">
          <div className="container mx-auto px-4 text-center md:px-6">
            <Reveal id="ttp-cta">
              <h2 className="mb-6 text-4xl font-bold tracking-tighter md:text-7xl">
                Ready when
                <br />
                <span className="text-gray-500">your next table is.</span>
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-[15px] font-light leading-relaxed text-gray-400 md:text-xl">
                Turn the phones already in your team's pockets into payment terminals.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/book-demo"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-transform hover:scale-[1.03] sm:w-auto"
                >
                  Book a Demo <ArrowRight size={18} />
                </a>
                <a
                  href="/pricing"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white/90 transition-colors hover:border-white/40 hover:bg-white/5 sm:w-auto"
                >
                  View Pricing
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </RevealProvider>
  );
}
