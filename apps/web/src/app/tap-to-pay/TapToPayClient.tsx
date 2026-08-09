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
import { RevealProvider, Reveal } from '@/components/AIIntelligence/Reveal';
import {
  images,
  stats,
  steps,
  features,
  places,
  requirements,
} from './content';

const featureIcons = { CreditCard, ShieldCheck, Percent, WifiOff, Receipt, Layers };

export default function TapToPayClient() {
  return (
    <RevealProvider>
      <div className="bg-black text-white selection:bg-white/20">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500">
                Payments
              </p>
              <h1 className="mb-8 text-5xl font-bold leading-[1.05] tracking-tighter md:text-8xl">
                Tap to Pay.
                <br />
                <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                  Right at the table.
                </span>
              </h1>
              <p className="mx-auto mb-12 max-w-[34ch] text-[15px] font-light leading-relaxed text-gray-400 md:max-w-[46ch] md:text-[22px]">
                Take the payment in the same breath as the order. Your phone is the terminal.
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
                  See Pricing
                </a>
              </div>
            </div>

            <Reveal id="ttp-hero-img">
              <div className="mx-auto mt-16 max-w-5xl md:mt-24">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.95)] md:rounded-[32px]">
                  <img
                    src={images.hero}
                    alt="A guest tapping a contactless card on a server's phone"
                    width={1600}
                    height={1008}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
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

            <Reveal id="ttp-steps-img">
              <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-6">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 md:rounded-3xl">
                  <img
                    src={images.counter}
                    alt="Guest tapping a smartwatch on a phone at a coffee counter"
                    loading="lazy"
                    width={1600}
                    height={1008}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 md:rounded-3xl">
                  <img
                    src={images.detail}
                    alt="Phone showing a tipping and receipt screen"
                    loading="lazy"
                    width={1600}
                    height={1008}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
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

        {/* Where it works */}
        <section className="border-t border-white/5 bg-zinc-950 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <Reveal id="ttp-places">
              <div className="mb-14 max-w-3xl md:mb-20">
                <h2 className="text-4xl font-bold tracking-tighter md:text-6xl">
                  Wherever service
                  <br />
                  <span className="text-gray-500">actually happens.</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                {places.map((p) => (
                  <div key={p.title} className="border-t border-white/10 pt-8">
                    <h3 className="mb-3 text-2xl font-bold tracking-tighter md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="text-base font-light leading-relaxed text-gray-400">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
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