// @ts-nocheck
'use client';

import { ArrowRight, Check, ChevronRight, LayoutGrid, Minus } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { slugForCompetitor } from './competitors';
import {
  competitors,
  hero,
  highlights,
  matrix,
  reasons,
  trademarkNote,
  whySwitch,
  whySwitchMedia,
} from './content';

const rise = {
  initial: { opacity: 0, y: 30 },
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

/* --------------------------------- Hero --------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 via-emerald-600/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 md:pt-44 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
        >
          <a href="/products" className="hover:text-white transition-colors">
            Restaurant Type
          </a>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-white">Comparison</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 text-emerald-400"
            >
              <LayoutGrid size={36} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4"
            >
              Compare. Decide. Grow.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 text-emerald-400"
            >
              {hero.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl"
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
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center inline-flex items-center justify-center gap-2"
              >
                {hero.primaryCta.label} <ArrowRight size={18} />
              </a>
              <a
                href={hero.secondaryCta.href}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
              >
                {hero.secondaryCta.label}
              </a>
            </motion.div>
          </div>

          {/* Key Highlights card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2rem] md:rounded-[2.5rem] border border-emerald-500/20 bg-white/5 backdrop-blur-xl p-8 md:p-10"
          >
            <h2 className="text-xl font-bold tracking-tighter mb-8">Key highlights</h2>
            <div className="space-y-5 md:space-y-6">
              {highlights.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 shrink-0 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mt-0.5">
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
  );
}

/* ------------------------------- Why switch ------------------------------ */

function WhySwitch() {
  return (
    <section className="bg-black text-white border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Sticky intro rail */}
          <Reveal className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-400 sm:text-xs">
              Why switch
            </p>
            <h2 className="mt-4 max-w-[16ch] font-bold leading-[1.1] tracking-tighter text-3xl md:text-4xl">
              Why switch to eatOS
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
              One platform, built end to end, so every part of your restaurant works together.
            </p>
            <div className="mt-7 overflow-hidden rounded-[22px] ring-1 ring-white/10">
              <Placeholder
                label={whySwitchMedia.label}
                src={whySwitchMedia.src}
                ratio="aspect-[4/3]"
                tone="dark"
              />
            </div>
          </Reveal>

          {/* Numbered editorial list */}
          <div className="min-w-0">
            {whySwitch.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05} className="min-w-0">
                <a
                  href={item.link.href}
                  className="group grid grid-cols-[auto_minmax(0,1fr)] gap-5 border-t border-white/10 py-8 first:border-t-0 first:pt-0 sm:gap-8 sm:py-10"
                >
                  <span className="pt-1 text-xs font-semibold tabular-nums tracking-[0.2em] text-zinc-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 block">
                    <h3 className="text-lg font-bold tracking-tighter sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">{item.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                      {item.link.label}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Matrix -------------------------------- */

function Mark({ on, accent = false }) {
  if (on) {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          accent ? 'bg-emerald-500 text-black' : 'bg-white/12 text-white/60'
        }`}
      >
        <Check size={15} strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04] text-white/20">
      <Minus size={14} strokeWidth={3} />
    </span>
  );
}

function Matrix() {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-28 lg:py-40">
        <Reveal>
          <h2 className="mx-auto max-w-[26ch] text-center font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
            Compare eatOS with other Point of Sale software
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-zinc-400 sm:text-base">
            See why thousands of restaurant brands pick eatOS over other Point of Sale software.
          </p>
        </Reveal>

        {/* Table, tablet and up, horizontal scroll with sticky feature column */}
        <Reveal delay={0.1} className="mt-14 hidden md:block">
          <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[860px] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-black pb-6 pr-6 align-bottom text-base font-semibold tracking-tight sm:text-lg">
                    Feature Set
                  </th>
                  {competitors.map((name, i) => (
                    <th
                      key={name}
                      className={`pb-6 text-center align-bottom text-sm font-semibold tracking-tight ${
                        i === 0
                          ? 'rounded-t-[20px] bg-white/[0.07] px-4 pt-7 text-white'
                          : 'px-3 text-zinc-500'
                      }`}
                    >
                      {i === 0 ? (
                        name
                      ) : (
                        <a
                          href={`/comparison/${slugForCompetitor(name)}`}
                          className="inline-flex flex-col items-center gap-1 transition-colors hover:text-white"
                        >
                          {name}
                          <span className="text-[10px] font-medium text-emerald-400/80">
                            Compare
                          </span>
                        </a>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, r) => (
                  <tr key={row.feature}>
                    <td className="sticky left-0 z-10 border-t border-white/8 bg-black py-5 pr-6 text-sm leading-6 text-zinc-300">
                      {row.feature}
                    </td>
                    <td
                      className={`border-t border-white/8 bg-white/[0.07] px-4 py-5 text-center ${
                        r === matrix.length - 1 ? 'rounded-b-[20px]' : ''
                      }`}
                    >
                      <Mark on accent />
                    </td>
                    {row.support.map((on, c) => (
                      <td
                        key={c}
                        className="border-t border-white/8 px-3 py-5 text-center"
                      >
                        <Mark on={on} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile, stacked per-brand cards */}
        <div className="mt-12 space-y-4 md:hidden">
          {competitors.map((name, ci) => (
            <Reveal key={name} delay={ci * 0.04}>
              <div
                className={`rounded-[20px] p-5 ${
                  ci === 0 ? 'bg-white/[0.08]' : 'bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="min-w-0 truncate text-base font-bold tracking-tighter">
                    {name}
                  </h3>
                  {ci === 0 && (
                    <span className="shrink-0 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-black">
                      All-in-one
                    </span>
                  )}
                </div>
                {ci !== 0 && (
                  <a
                    href={`/comparison/${slugForCompetitor(name)}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400"
                  >
                    See full comparison
                    <ArrowRight size={13} />
                  </a>
                )}
                <ul className="mt-4 space-y-3">
                  {matrix.map((row) => {
                    const on = ci === 0 ? true : row.support[ci - 1];
                    return (
                      <li
                        key={row.feature}
                        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-white/8 pt-3 first:border-0 first:pt-0"
                      >
                        <span className="min-w-0 text-[13px] leading-6 text-zinc-300">
                          {row.feature}
                        </span>
                        <Mark on={on} accent={ci === 0} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-[11px] leading-5 text-zinc-500">
          {trademarkNote}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------- Reasons -------------------------------- */

function Reasons() {
  return (
    <section className="bg-black text-white border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-28 lg:py-40">
        <Reveal>
          <h2 className="mx-auto max-w-[26ch] text-center font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
            Why businesses choose eatOS over other Point of Sale software
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {reasons.map((item, i) => (
            <div
              key={item.title}
              className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <Reveal className={`min-w-0 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <h3 className="font-bold leading-[1.15] tracking-tighter text-2xl md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  {item.body}
                </p>
              </Reveal>
              <Reveal delay={0.1} className="min-w-0">
                <Placeholder
                  label={item.media}
                  src={item.mediaSrc}
                  ratio="aspect-[16/11]"
                  tone="dark"
                  pad
                />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- CTA ---------------------------------- */

function ClosingCta() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-emerald-600/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 md:py-28 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[22ch] font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
            Start Using Restaurant Technology Cloud
          </h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/book-demo"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 sm:w-auto"
            >
              Book a Demo
            </a>
            <a
              href="/pricing"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-7 py-3.5 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300 sm:w-auto"
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

export default function ComparisonClient() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">
      <Hero />
      <WhySwitch />
      <Matrix />
      <Reasons />
      <ClosingCta />
    </div>
  );
}
