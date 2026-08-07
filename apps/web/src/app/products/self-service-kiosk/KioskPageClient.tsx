// @ts-nocheck
'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Placeholder } from '@/components/marketing/Placeholder';
import {
  features,
  hardware,
  hero,
  keyFeatures,
  offerNote,
  offers,
} from './content';

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div {...rise} transition={{ ...rise.transition, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, className = '' }) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-600 sm:text-xs ${className}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------- Hero -------------------------------- */

/* -------------------------------- Hero -------------------------------- */

function Hero() {
  return (
    <section className="relative h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background image with cinematic zoom */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img
          src={hero.image}
          alt={hero.imageLabel}
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </motion.div>

      {/* Centered copy */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]"
        >
          {hero.title} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            {hero.titleAccent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-[15px] md:text-[22px] text-gray-400 mb-12 max-w-3xl leading-relaxed font-light"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href={hero.primaryCta.href}
            className="group relative px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10">{hero.primaryCta.label}</span>
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm w-full sm:w-auto"
          >
            {hero.secondaryCta.label}
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- Stats strip --------------------------- */

function StatsStrip() {
  return (
    <section className="bg-black text-white border-t border-white/10">
      <div className="mx-auto w-full max-w-[1180px] px-5 pt-24 pb-12 sm:px-8 md:pt-32 md:pb-16">
        <div className="grid grid-cols-3 divide-x divide-white/10">
          {hero.stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-4 text-center">
              <div className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
                {s.value}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Capability strip --------------------------- */

function Capabilities() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 md:py-20">
        <Reveal>
          <Eyebrow>Key features</Eyebrow>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {keyFeatures.map((f, i) => (
            <Reveal key={f} delay={(i % 3) * 0.05}>
              <div className="border-t border-zinc-200 pt-4 text-sm font-medium text-zinc-700 sm:text-base">
                {f}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Feature list ---------------------------- */

function FeatureBlock({ feature, index }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal className="border-t border-zinc-200 pt-10 first:border-t-0 first:pt-0 md:pt-14">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12">
        <div className="min-w-0">
          <Placeholder
            label={feature.imageLabel}
            tone="light"
            ratio={feature.ratio}
            src={feature.image}
            pad={feature.pad}
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-4">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-indigo-600">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-bold leading-[1.12] tracking-tighter text-2xl md:text-4xl">
              {feature.title}
            </h3>
          </div>

          <p className="mt-5 text-base leading-8 text-zinc-600 sm:text-lg">{feature.body}</p>

          {open ? (
            <p className="mt-4 text-base leading-8 text-zinc-500 sm:text-lg">{feature.more}</p>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2"
          >
            {open ? 'Read less' : 'Read more'}
            <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-zinc-200 pt-6">
            {feature.metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <dt className="font-bold leading-none tracking-tighter text-2xl md:text-4xl">
                  {m.value}
                </dt>
                <dd className="mt-2.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Reveal>
  );
}

function FeatureList() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-20 sm:px-8 md:pb-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Why kiosk</Eyebrow>
            <h2 className="mt-4 max-w-[16ch] font-bold leading-[1.12] tracking-tighter text-3xl md:text-4xl">
              Three reasons guests order for themselves
            </h2>
          </div>

          <div className="flex min-w-0 flex-col gap-14 md:gap-20">
            {features.map((feature, i) => (
              <FeatureBlock key={feature.id} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Offers -------------------------------- */

function Offers() {
  return (
    <section className="bg-[#f7f7f8] text-black">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {offers.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 0.08} className="min-w-0">
              <div className="group transition-transform duration-500 hover:-translate-y-1">
                <Placeholder label={offer.imageLabel} tone="light" src={offer.image} />
                <h3 className="mt-7 font-bold tracking-tight text-2xl md:text-3xl">
                  {offer.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base">
                  {offer.description}
                </p>
                <a
                  href={offer.cta.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                >
                  {offer.cta.label}
                  <ArrowRight size={15} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-3xl text-center text-[11px] leading-relaxed text-zinc-500">
          {offerNote}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------- Hardware ------------------------------- */

function Hardware() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-400 sm:text-xs">
            {hardware.eyebrow}
          </p>
          <h2 className="mt-4 font-bold leading-[1.08] tracking-tighter text-3xl md:text-5xl">
            {hardware.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
            {hardware.description}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <Placeholder
            label={hardware.imageLabel}
            ratio="aspect-[4/3] sm:aspect-[16/9]"
            src={hardware.image}
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:mt-20">
          {hardware.specs.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="min-w-0">
              <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Closing CTA ----------------------------- */

function Closing() {
  return (
    <section className="bg-[#111113] text-white">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 md:py-24">
        <Reveal className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
            Start using restaurant technology cloud
          </h2>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
            <a
              href="/book-demo"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 sm:w-auto"
            >
              Book a Demo
            </a>
            <a
              href="/pricing"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-7 py-3.5 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300 sm:w-auto"
            >
              View Pricing
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Page --------------------------------- */

export default function KioskPageClient() {
  return (
    <div className="bg-white font-montserrat antialiased">
      <Hero />
      <StatsStrip />
      <Capabilities />
      <FeatureList />
      <Offers />
      <Hardware />
      <Closing />
    </div>
  );
}