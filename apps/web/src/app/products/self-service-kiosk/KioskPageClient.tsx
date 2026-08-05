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

function Hero() {
  return (
    <section className="bg-[#f7f7f8] text-black">
      <div className="mx-auto w-full max-w-[1180px] px-5 pt-28 pb-16 sm:px-8 md:pt-36 md:pb-24 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal className="min-w-0">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 max-w-[22ch] font-semibold leading-[1.06] tracking-[-0.03em] text-[clamp(2.125rem,4.4vw,3.5rem)]">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600 sm:text-lg">
              {hero.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={hero.primaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-85 sm:w-auto"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-7 py-3.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 sm:w-auto"
              >
                {hero.secondaryCta.label}
                <ArrowRight size={15} />
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-y-8 gap-x-6 border-t border-zinc-200 pt-8 sm:grid-cols-3">
              {hero.stats.map((s) => (
                <div key={s.label} className="min-w-0">
                  <dt className="font-semibold leading-none tracking-[-0.03em] text-indigo-600 text-[clamp(1.5rem,3vw,2.25rem)]">
                    {s.value}
                  </dt>
                  <dd className="mt-2.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <Placeholder
              label={hero.imageLabel}
              tone="light"
              ratio="aspect-[4/5] sm:aspect-[4/5] lg:aspect-[3/4]"
              src={hero.image}
            />
          </Reveal>
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
            <h3 className="font-semibold leading-[1.12] tracking-[-0.025em] text-[clamp(1.375rem,2.8vw,2.125rem)]">
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
                <dt className="font-semibold leading-none tracking-[-0.03em] text-[clamp(1.375rem,2.6vw,2rem)]">
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
            <h2 className="mt-4 max-w-[16ch] font-semibold leading-[1.12] tracking-[-0.03em] text-[clamp(1.625rem,2.8vw,2.25rem)]">
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
                <h3 className="mt-7 font-semibold tracking-[-0.02em] text-[clamp(1.25rem,2.4vw,1.75rem)]">
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
          <h2 className="mt-4 font-semibold leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,4vw,3rem)]">
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
              <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
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
          <h2 className="max-w-xl font-semibold leading-[1.1] tracking-[-0.03em] text-[clamp(1.625rem,3.6vw,2.75rem)]">
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
      <Capabilities />
      <FeatureList />
      <Offers />
      <Hardware />
      <Closing />
    </div>
  );
}