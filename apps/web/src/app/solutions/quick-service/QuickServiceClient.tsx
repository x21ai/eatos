// @ts-nocheck
'use client';

import { useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { bundle, hero, marquee, pillars } from './content';

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
      className={`text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-500 sm:text-xs ${className}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------- Hero -------------------------------- */

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);

  return (
    <section className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1120px] px-5 pt-24 sm:px-8 md:pt-32 lg:pt-40">
        <Reveal className="text-center">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-[28ch] font-semibold leading-[1.1] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.5rem)]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            {hero.description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
      </div>

      <div ref={ref} className="mx-auto mt-14 w-full max-w-[1320px] px-0 sm:px-8 md:mt-20">
        <motion.div style={reduce ? undefined : { scale }}>
          <Placeholder
            label={hero.imageLabel}
            ratio="aspect-[4/3] sm:aspect-[16/9]"
            className="rounded-none sm:rounded-[32px]"
          />
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 md:py-24">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 text-center lg:grid-cols-4">
          {marquee.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06} className="min-w-0">
              <div className="font-semibold leading-none tracking-[-0.03em] text-[clamp(2rem,4.5vw,3.5rem)]">
                {m.value}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
                {m.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Spotlight ------------------------------ */

function Spotlight({ pillar, index }) {
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;
  const light = index % 2 === 0;

  return (
    <section className={light ? 'bg-[#f5f5f7] text-black' : 'bg-white text-black'}>
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 md:py-28 lg:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{`0${index + 1}`}</Eyebrow>
          <h2 className="mt-4 font-semibold leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,4vw,3rem)]">
            {pillar.title}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
            <div className={flip ? 'md:order-2' : ''}>
              <Placeholder label={pillar.imageLabel} tone="light" pad />
            </div>

            <div className={`min-w-0 ${flip ? 'md:order-1' : ''}`}>
              <p className="text-base leading-8 text-zinc-600 sm:text-lg">{pillar.body}</p>

              {open ? (
                <p className="mt-5 text-base leading-8 text-zinc-500 sm:text-lg">{pillar.more}</p>
              ) : null}

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2"
              >
                {open ? 'Read less' : 'Read more'}
                <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>

              <dl className="mt-10 grid grid-cols-2 gap-6">
                {pillar.metrics.map((m) => (
                  <div key={m.label} className="min-w-0">
                    <dt className="font-semibold leading-none tracking-[-0.03em] text-[clamp(1.5rem,3vw,2.25rem)]">
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
      </div>
    </section>
  );
}

/* ------------------------------- Bundle ------------------------------- */

function Bundle() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 md:py-28 lg:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{bundle.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-semibold leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,4vw,3rem)]">
            {bundle.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">{bundle.description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={bundle.primaryCta.href}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 sm:w-auto"
            >
              {bundle.primaryCta.label}
            </a>
            <a
              href={bundle.secondaryCta.href}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-7 py-3.5 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300 sm:w-auto"
            >
              {bundle.secondaryCta.label}
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <Placeholder label={bundle.imageLabel} ratio="aspect-[16/9]" pad />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:mt-20">
          {bundle.specs.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="min-w-0">
              <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-3xl text-center text-[11px] leading-relaxed text-zinc-500">
          {bundle.note}
        </p>
      </div>
    </section>
  );
}


/* -------------------------------- Closing -------------------------------- */

function Closing() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-semibold leading-[1.1] tracking-[-0.03em] text-[clamp(1.75rem,4vw,3rem)]">
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

export default function QuickServiceClient() {
  return (
    <div className="bg-white font-montserrat antialiased">
      <Hero />

      {pillars.map((pillar, i) => (
        <Spotlight key={pillar.id} pillar={pillar} index={i} />
      ))}

      <Bundle />
      <Closing />
    </div>
  );
}