// @ts-nocheck
'use client';

import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  Check,
  ChefHat,
  ChevronRight,
  ClipboardList,
  CloudCog,
  CreditCard,
  Globe,
  Heart,
  Layers,
  Mic,
  Minus,
  ShieldCheck,
  Sparkles,
  Truck,
  Wallet,
  Wifi,
  Zap,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { getCompetitor } from '../competitors';
import { trademarkNote } from '../content';

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

const iconMap = {
  shield: { Icon: ShieldCheck, tone: 'bg-emerald-500/12 text-emerald-400' },
  delivery: { Icon: Truck, tone: 'bg-sky-500/12 text-sky-400' },
  sparkles: { Icon: Sparkles, tone: 'bg-fuchsia-500/12 text-fuchsia-400' },
  cloud: { Icon: CloudCog, tone: 'bg-indigo-500/12 text-indigo-400' },
  layers: { Icon: Layers, tone: 'bg-amber-500/12 text-amber-400' },
  card: { Icon: CreditCard, tone: 'bg-rose-500/12 text-rose-400' },
  zap: { Icon: Zap, tone: 'bg-yellow-500/12 text-yellow-400' },
  chef: { Icon: ChefHat, tone: 'bg-orange-500/12 text-orange-400' },
  chart: { Icon: BarChart3, tone: 'bg-teal-500/12 text-teal-400' },
  clipboard: { Icon: ClipboardList, tone: 'bg-lime-500/12 text-lime-400' },
  calendar: { Icon: CalendarClock, tone: 'bg-cyan-500/12 text-cyan-400' },
  wallet: { Icon: Wallet, tone: 'bg-violet-500/12 text-violet-400' },
  heart: { Icon: Heart, tone: 'bg-pink-500/12 text-pink-400' },
  globe: { Icon: Globe, tone: 'bg-blue-500/12 text-blue-400' },
  wifi: { Icon: Wifi, tone: 'bg-emerald-500/12 text-emerald-400' },
  mic: { Icon: Mic, tone: 'bg-purple-500/12 text-purple-400' },
};

function Mark({ on, accent = false }) {
  if (on) {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          accent ? 'bg-emerald-500 text-black' : 'bg-white/12 text-white/70'
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

export default function CompetitorClient({ slug }) {
  const data = getCompetitor(slug);
  if (!data) return null;
  const { name, highlights, reasons, rows } = data;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 via-emerald-600/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none opacity-50" />

        <div className="site-container relative z-10 pt-32 md:pt-44 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <a href="/comparison" className="hover:text-white transition-colors">
              Comparison
            </a>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-white">eatOS vs {name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="min-w-0">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-semibold tracking-[0.24em] text-emerald-400 sm:text-xs mb-5"
              >
                eatOS vs {name}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6"
              >
                eatOS vs {name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl"
              >
                What is the best all-in-one restaurant Point of Sale for your business? See how
                eatOS stacks up against {name} across the tools restaurants use every day.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="/book-demo"
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center inline-flex items-center justify-center gap-2"
                >
                  Book a Demo <ArrowRight size={18} />
                </a>
                <a
                  href="/pricing"
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  View Pricing
                </a>
              </motion.div>
            </div>

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

      {/* Head to head */}
      <section className="bg-black text-white border-t border-white/5">
        <div className="site-container py-20 md:py-28 lg:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-[26ch] text-center font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
              How eatOS compares to {name}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-zinc-400 sm:text-base">
              A feature by feature look at what comes built in with eatOS.
            </p>
          </Reveal>

          {/* Table, tablet and up */}
          <Reveal delay={0.1} className="mt-14 hidden md:block">
            <div className="mx-auto max-w-4xl">
              <table className="w-full border-separate border-spacing-0 text-left">
                <thead>
                  <tr>
                    <th className="pb-6 pr-6 align-bottom text-base font-semibold tracking-tight sm:text-lg">
                      Features
                    </th>
                    <th className="rounded-t-[20px] bg-white/[0.07] px-4 pb-6 pt-7 text-center align-bottom text-sm font-semibold tracking-tight text-white">
                      eatOS
                    </th>
                    <th className="px-4 pb-6 text-center align-bottom text-sm font-semibold tracking-tight text-zinc-500">
                      {name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, r) => (
                    <tr key={row.feature}>
                      <td className="border-t border-white/8 py-5 pr-6 text-sm leading-6 text-zinc-300">
                        {row.feature}
                      </td>
                      <td
                        className={`border-t border-white/8 bg-white/[0.07] px-4 py-5 text-center ${
                          r === rows.length - 1 ? 'rounded-b-[20px]' : ''
                        }`}
                      >
                        <Mark on={row.eatos} accent />
                      </td>
                      <td className="border-t border-white/8 px-4 py-5 text-center">
                        <Mark on={row.rival} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mobile list */}
          <div className="mt-12 space-y-3 md:hidden">
            {rows.map((row, i) => (
              <Reveal key={row.feature} delay={Math.min(i, 6) * 0.03}>
                <div className="rounded-[16px] bg-white/[0.04] p-4">
                  <p className="text-[13px] leading-6 text-zinc-200">{row.feature}</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Mark on={row.eatos} accent />
                      <span className="text-xs font-semibold text-white">eatOS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mark on={row.rival} />
                      <span className="text-xs font-semibold text-zinc-400">{name}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-[11px] leading-5 text-zinc-500">
            {trademarkNote}
          </p>
        </div>
      </section>

      {/* Why switch */}
      <section className="bg-black text-white border-t border-white/5">
        <div className="site-container py-20 md:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-[26ch] text-center font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
              Why switch to eatOS
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((item, i) => {
              const { Icon, tone } = iconMap[item.icon] ?? iconMap.sparkles;
              return (
                <Reveal key={item.title} delay={i * 0.06} className="min-w-0">
                  <div className="flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.03] p-6 md:p-7">
                    <div
                      className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold tracking-tighter">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{item.body}</p>
                    <a
                      href={item.link.href}
                      className="group mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      {item.link.label}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative bg-black text-white overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-emerald-600/5 to-transparent pointer-events-none" />
        <div className="site-container relative z-10 py-20 md:py-28 text-center">
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
                href="/comparison"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-7 py-3.5 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300 sm:w-auto"
              >
                See all comparisons
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}