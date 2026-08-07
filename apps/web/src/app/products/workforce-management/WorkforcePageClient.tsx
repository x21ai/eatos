// @ts-nocheck
'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Placeholder } from '@/components/marketing/Placeholder';
import {
  benefits,
  features,
  hero,
  integration,
  keyFeatures,
  offerNote,
} from './content';

const rise = {
  initial: { opacity: 0, y: 28 },
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
      className={`text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-400 sm:text-xs ${className}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------- Hero -------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.18),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 pt-24 sm:px-8 md:pt-32 lg:pt-36">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="text-center lg:text-left">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="mx-auto mt-4 max-w-[14ch] font-bold leading-[1.05] tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:mx-0">
              {hero.title} <span className="text-indigo-400">{hero.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg lg:mx-0">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={hero.primaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 sm:w-auto"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-7 py-3.5 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300 sm:w-auto"
              >
                {hero.secondaryCta.label}
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative">
            <div className="absolute -inset-4 rounded-full bg-indigo-500/10 blur-[80px]" />
            <Placeholder
              label={hero.imageLabel}
              src={hero.image}
              ratio="aspect-[4/3]"
              className="relative"
            />
          </Reveal>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 lg:grid-cols-4">
          {hero.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center px-4 py-6 text-center md:py-8"
            >
              <div className="text-3xl font-bold leading-none tracking-tighter text-white md:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Key features grid --------------------------- */

function KeyFeatures() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 md:py-20">
        <Reveal className="text-center">
          <Eyebrow>Key Features</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[20ch] font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
            Everything your team needs
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {keyFeatures.map((feature, i) => (
            <Reveal key={feature} delay={(i % 3) * 0.05}>
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                  <span className="text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <span className="text-sm font-semibold text-zinc-200 sm:text-base">{feature}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Feature blocks --------------------------- */

function FeatureBlock({ feature, index }) {
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;

  return (
    <div className="border-t border-white/10 py-12 first:border-t-0 first:pt-0 md:py-16">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className={flip ? 'md:order-2' : ''}>
          <Placeholder label={feature.imageLabel} src={feature.image} ratio="aspect-[16/9]" />
        </div>

        <div className={`min-w-0 ${flip ? 'md:order-1' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-indigo-400">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 font-bold leading-[1.12] tracking-tighter text-2xl md:text-3xl">
            {feature.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">{feature.body}</p>

          {open ? (
            <p className="mt-4 text-base leading-7 text-zinc-500 sm:text-lg">{feature.more}</p>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2"
          >
            {open ? 'Read less' : 'Read more'}
            <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
            {feature.metrics.map((m) => (
              <div key={m.label} className="min-w-0">
                <dt className="font-bold leading-none tracking-tighter text-2xl md:text-3xl">
                  {m.value}
                </dt>
                <dd className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8 md:pb-24">
        {features.map((feature, i) => (
          <FeatureBlock key={feature.id} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Benefits bento --------------------------- */

function Benefits() {
  return (
    <section className="bg-[#0a0a0f] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 md:py-20">
        <Reveal className="text-center">
          <Eyebrow>More capabilities</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[20ch] font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
            Built for restaurant teams
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.04]">
                <h3 className="font-bold tracking-tight text-xl md:text-2xl">{benefit.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-zinc-400 sm:text-base">
                  {benefit.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Closing CTA --------------------------- */

function Closing() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.15),transparent_50%)]" />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 md:py-20">
        <Reveal className="flex flex-col items-start gap-6 rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-2xl">
            <Eyebrow>{integration.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-bold leading-[1.1] tracking-tighter text-3xl md:text-4xl">
              Ready to run your team on autopilot?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              {integration.description}
            </p>
          </div>
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
        <p className="mx-auto mt-10 max-w-3xl text-center text-[11px] leading-relaxed text-zinc-500">
          {offerNote}
        </p>
      </div>
    </section>
  );
}

/* --------------------------------- Page --------------------------------- */

export default function WorkforcePageClient() {
  return (
    <div className="bg-black font-montserrat antialiased">
      <Hero />
      <KeyFeatures />
      <Features />
      <Benefits />
      <Closing />
    </div>
  );
}
