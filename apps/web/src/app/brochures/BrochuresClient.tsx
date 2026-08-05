// @ts-nocheck
'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Download, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { brochures, hero } from './content';

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

function FlipbookModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} brochure`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-0 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-[1200px] flex-col overflow-hidden bg-zinc-950 shadow-2xl sm:h-[88vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-500">
              Brochure
            </p>
            <h2 className="truncate text-sm font-semibold text-white sm:text-base">{item.title}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={item.flipbook}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex"
            >
              Open in new tab
              <ArrowUpRight size={14} />
            </a>
            <a
              href={item.download}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-85"
            >
              <Download size={14} />
              PDF
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close brochure"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <iframe
          src={item.flipbook}
          title={`${item.title} flipbook`}
          className="h-full w-full flex-1 bg-white"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function Cover({ title }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400">
          eatOS
        </span>
        <span className="text-lg font-semibold uppercase leading-tight tracking-[-0.01em] text-white">
          {title}
        </span>
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
    </div>
  );
}

export default function BrochuresClient() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto w-full max-w-[1120px] px-5 pb-20 pt-28 text-center sm:px-8 md:pb-28 md:pt-36">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-500 sm:text-xs">
              {hero.eyebrow}
            </p>
            <h1 className="mx-auto mt-5 max-w-[20ch] font-semibold leading-[1.1] tracking-[-0.03em] text-[clamp(2.25rem,4.5vw,3.5rem)]">
              {hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {hero.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto w-full max-w-[1220px] px-5 py-16 sm:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brochures.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.06}>
              <article className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 transition-all hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_24px_60px_-40px_rgba(0,0,0,0.5)] sm:p-6">
                <Cover title={item.title} />
                <h2 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-zinc-900">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600">{item.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-85"
                  >
                    More
                  </button>
                  <a
                    href={item.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-5 py-2.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-20 text-center sm:px-8 md:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] font-semibold leading-[1.1] tracking-[-0.03em] text-[clamp(1.85rem,3.6vw,2.75rem)]">
              See the platform in action
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-400">
              Book a walkthrough with a specialist and get a plan tailored to your restaurant.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/book-demo"
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

      {active ? <FlipbookModal item={active} onClose={close} /> : null}
    </main>
  );
}