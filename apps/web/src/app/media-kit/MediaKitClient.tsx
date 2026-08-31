// @ts-nocheck
'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { featured, hero, items } from './content';

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
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

function Visual({ item, large = false }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[20px] ${
        item.light ? 'bg-white' : 'bg-zinc-950'
      } ${large ? 'aspect-[16/10] md:rounded-[28px]' : 'aspect-[4/3]'}`}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={`${item.title} preview`}
          loading={large ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full ${
            item.contain ? 'object-contain p-8' : 'object-cover'
          }`}
        />
      ) : (
        <>
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-soft blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/[0.06] blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="max-w-[16ch] px-8 text-center font-bold leading-[1.1] tracking-tighter text-white text-2xl md:text-3xl">
              {item.title}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function Action({ item }) {
  const isDownload = item.action === 'Download';
  return (
    <a
      href={item.href}
      {...(item.download ? { download: item.download } : {})}
      className="inline-flex items-center gap-1.5 text-[15px] font-medium text-brand-on-dark transition-colors hover:text-white"
    >
      {isDownload ? <Download size={15} /> : null}
      {item.action}
      {isDownload ? null : <ArrowUpRight size={15} />}
    </a>
  );
}

export default function MediaKitClient() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="site-container pt-[128px] md:pt-[176px] pb-16 text-center md:pb-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-on-dark sm:text-xs">
              {hero.eyebrow}
            </p>
            <h1 className="mx-auto mt-5 max-w-[20ch] font-bold leading-[1.1] tracking-tighter text-4xl md:text-6xl">
              {hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {hero.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured cards */}
      <section className="site-container pb-4 md:pb-8">
        <div className="flex flex-col gap-8 md:gap-10">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <article className="grid items-center gap-8 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 md:grid-cols-2 md:gap-12 md:p-10">
                <div className="order-2 md:order-1">
                  <h2 className="font-bold leading-[1.1] tracking-tighter text-3xl md:text-4xl">
                    {item.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
                    {item.description}
                  </p>
                  <div className="mt-7">
                    <Action item={item} />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <Visual item={item} large />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="site-container py-14 md:py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 0.06}>
              <article className="group flex h-full flex-col rounded-[24px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <div className="grid items-center gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-[19px] font-bold tracking-tighter text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-zinc-400">{item.description}</p>
                    <div className="mt-6">
                      <Action item={item} />
                    </div>
                  </div>
                  <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                    <Visual item={item} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white">
        <div className="site-container pb-20 text-center md:pb-28">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
              See the platform in action
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-400">
              Book a walkthrough with a specialist and get a tailored plan for your restaurant, menu, and team.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/bookademo"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 sm:w-auto"
              >
                Book a Demo
              </a>
              <a
                href="/pricing"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                View Pricing
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
