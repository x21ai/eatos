// @ts-nocheck
'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Placeholder } from './Placeholder';
import {
  features,
  hardware,
  hero,
  keyFeatures,
  marquee,
  offerNote,
  offers,
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
    <motion.div
      {...rise}
      transition={{ ...rise.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, className = '' }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-widest text-emerald-500 sm:text-sm ${className}`}
    >
      {children}
    </p>
  );
}

/* ------------------------------- Hero ------------------------------- */

function Hero() {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 pt-28 md:pt-32">
        <Reveal className="text-center">
          <h1 className="mx-auto max-w-[24ch] text-4xl font-bold leading-[1.05] tracking-tighter md:text-7xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-gray-400 md:text-[22px]">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={hero.primaryCta.href}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 sm:w-auto"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-7 py-3.5 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300 sm:w-auto"
            >
              {hero.secondaryCta.label}
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-12 w-full max-w-4xl md:mt-16">
          <Placeholder
            label="Kitchen Display System"
            ratio="aspect-[16/9]"
            src={hero.image}
          />
        </Reveal>
      </div>

      {/* Metric marquee */}
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-24">
        <div className="grid grid-cols-2 gap-y-8 gap-x-6 text-center lg:grid-cols-4">
          {marquee.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06} className="min-w-0">
              <div className="text-4xl font-bold leading-none tracking-tight md:text-5xl">
                {m.value}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {m.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Feature bands --------------------------- */

function Spotlight({ feature, index }) {
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;
  const light = index % 2 === 0;

  return (
    <section className={light ? 'bg-[#f5f5f7] text-black' : 'bg-white text-black'}>
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{`0${index + 1}`}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {feature.title}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 md:mt-16">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className={flip ? 'md:order-2' : ''}>
              <Placeholder
                label={feature.imageLabel}
                ratio="aspect-[16/10]"
                tone="light"
                src={feature.image}
                pad
              />
            </div>

            <div className={`min-w-0 ${flip ? 'md:order-1' : ''}`}>
              <p className="text-[15px] font-light leading-relaxed text-zinc-600 md:text-lg">
                {feature.body}
              </p>

              {open ? (
                <p className="mt-4 text-[15px] font-light leading-relaxed text-zinc-500 md:text-lg">
                  {feature.more}
                </p>
              ) : null}

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2"
              >
                {open ? 'Read less' : 'Read more'}
                <ChevronDown
                  size={15}
                  className={`transition-transform ${open ? 'rotate-180' : ''}`}
                />
              </button>

              <dl className="mt-8 grid grid-cols-2 gap-6">
                {feature.metrics.map((m) => (
                  <div key={m.label} className="min-w-0">
                    <dt className="text-3xl font-bold leading-none tracking-tight md:text-4xl">
                      {m.value}
                    </dt>
                    <dd className="mt-2 text-sm text-zinc-500">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Hardware ------------------------------ */

function Hardware() {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{hardware.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {hardware.title}
          </h2>
          <p className="mt-5 text-[15px] font-light leading-relaxed text-gray-400 md:text-lg">
            {hardware.description}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-10 max-w-4xl md:mt-16">
          <Placeholder label={hardware.imageLabel} ratio="aspect-[16/9]" src={hardware.image} pad />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 md:mt-16">
          {hardware.specs.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="min-w-0">
              <h3 className="text-base font-bold tracking-tight text-white md:text-lg">
                {s.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-gray-400">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* -------------------------------- Offers -------------------------------- */

function Offers() {
  return (
    <section className="bg-[#f5f5f7] text-black">
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {offers.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 0.08} className="min-w-0">
              <Placeholder label={offer.imageLabel} ratio="aspect-[16/10]" tone="light" />
              <h3 className="mt-6 text-xl font-bold tracking-tight md:text-2xl">
                {offer.title}
              </h3>
              <p className="mt-3 text-[15px] font-light leading-relaxed text-zinc-600">
                {offer.description}
              </p>
              <a
                href={offer.cta.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
              >
                {offer.cta.label}
                <ArrowRight size={15} />
              </a>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-3xl text-center text-xs font-light leading-relaxed text-zinc-500">
          {offerNote}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ Closing CTA ------------------------------ */

function Closing() {
  return (
    <section className="bg-white text-black">
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            Start using restaurant technology cloud
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/book-demo"
              className="inline-flex w-full items-center justify-center rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-85 sm:w-auto"
            >
              Book a Demo
            </a>
            <a
              href="/pricing"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-7 py-3.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 sm:w-auto"
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

export default function KdsPageClient() {
  return (
    <div className="bg-white font-montserrat antialiased">
      <Hero />

      {/* Capability strip */}
      <section className="bg-white text-black">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <Reveal className="text-center">
            <Eyebrow>Key Features</Eyebrow>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((f, i) => (
              <Reveal key={f} delay={(i % 3) * 0.05}>
                <div className="border-t border-zinc-200 pt-4 text-sm font-medium text-zinc-700">
                  {f}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {features.map((feature, i) => (
        <Spotlight key={feature.id} feature={feature} index={i} />
      ))}

      <Hardware />
      <Offers />
      <Closing />
    </div>
  );
}
