// @ts-nocheck
'use client';

import { useState } from 'react';
import { ArrowRight, Check, ChefHat, ChevronDown, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { Placeholder } from './Placeholder';
import {
  cloudProducts,
  features,
  hero,
  keyFeatures,
  offerNote,
  offers,
  testimonial,
} from './content';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

function Metric({ value, label }) {
  return (
    <div className="min-w-0">
      <div className="text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl">
        {value}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">{label}</div>
    </div>
  );
}

function FeatureRow({ feature, index }) {
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;

  return (
    <motion.div
      {...fadeUp}
      className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
    >
      <div className={flip ? 'md:order-2' : ''}>
        <Placeholder label={feature.imageLabel} />
      </div>

      <div className={`min-w-0 ${flip ? 'md:order-1' : ''}`}>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          0{index + 1}
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {feature.title}
        </h3>

        <div className="mt-6 grid grid-cols-2 gap-6 border-y border-white/10 py-6">
          {feature.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>

        <p className="mt-6 text-base leading-relaxed text-zinc-400">{feature.body}</p>

        {open ? (
          <p className="mt-4 text-base leading-relaxed text-zinc-500">{feature.more}</p>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          {open ? 'Read less' : 'Read more'}
          <ChevronDown
            size={16}
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </motion.div>
  );
}

export default function KdsPageClient() {
  return (
    <div className="bg-black font-montserrat text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 md:pt-36 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.18),transparent_70%)]"
        />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                <ChefHat size={14} />
                {hero.eyebrow}
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
                {hero.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={hero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                >
                  {hero.primaryCta.label}
                  <ArrowRight size={16} />
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Play size={15} />
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>

            <Placeholder label="Kitchen Display System" ratio="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="border-b border-white/10 py-14 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Key Features
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                  <Check size={14} className="text-emerald-400" />
                </span>
                <span className="min-w-0 truncate text-sm font-medium text-zinc-200">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature rows */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto space-y-20 px-4 md:space-y-28 md:px-6">
          {features.map((feature, i) => (
            <FeatureRow key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="border-y border-white/10 bg-zinc-950 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {offers.map((offer) => (
              <motion.div
                key={offer.title}
                {...fadeUp}
                className="flex flex-col rounded-3xl border border-white/10 bg-black/40 p-6 md:p-8"
              >
                <Placeholder label={offer.imageLabel} />
                <h3 className="mt-7 text-xl font-bold tracking-tight sm:text-2xl">
                  {offer.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{offer.description}</p>
                <a
                  href={offer.cta.href}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                >
                  {offer.cta.label}
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-[11px] leading-relaxed text-zinc-600">
            {offerNote}
          </p>
        </div>
      </section>

      {/* Cloud grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              All-in-One Restaurant Technology Cloud
            </h2>
            <p className="mt-4 text-base text-zinc-400">
              Every tool you need to run, grow and manage your restaurant.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cloudProducts.map((p) => (
              <a
                key={p.title}
                href={p.href}
                className="group rounded-3xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
              >
                <Placeholder label={p.title} />
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-sm font-semibold text-white">
                    {p.title}
                  </span>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-y border-white/10 bg-zinc-900 py-14 md:py-16">
        <div className="container mx-auto grid grid-cols-[minmax(0,1fr)] items-center gap-6 px-4 text-center md:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:text-left">
          <h2 className="min-w-0 text-2xl font-bold tracking-tight sm:text-3xl">
            Start Using Restaurant Technology Cloud
          </h2>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              Book a Demo
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Customers Say
          </h2>
          <motion.div
            {...fadeUp}
            className="mx-auto mt-12 grid max-w-5xl grid-cols-1 items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-2 md:p-8"
          >
            <div className="min-w-0">
              <blockquote className="text-lg leading-relaxed text-zinc-200 md:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                <div className="mt-1 text-sm text-zinc-400">{testimonial.role}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-600">
                  {testimonial.since}
                </div>
              </div>
            </div>
            <Placeholder label={testimonial.imageLabel} />
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-white/10 py-14 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Connect to the Future
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Get product news and restaurant technology insights in your inbox.
              </p>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="sr-only" htmlFor="kds-newsletter-email">
                Email address
              </label>
              <input
                id="kds-newsletter-email"
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-400/60 focus:outline-none sm:w-80"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}