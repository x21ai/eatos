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
            <h2 className="truncate text-sm font-bold text-white sm:text-base">{item.title}</h2>
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

function Cover({ title, index, large = false, src }) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-zinc-950 ${
        large ? 'aspect-[16/10] rounded-[24px] md:rounded-[32px]' : 'aspect-[4/3] rounded-[20px]'
      }`}
    >
      {src ? (
        <img
          src={src}
          alt={`${title} brochure cover`}
          loading={large ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/[0.06] blur-3xl" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
            eatOS
          </span>
          <span className="text-[10px] font-medium tabular-nums tracking-[0.2em] text-zinc-600">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <span
          className={`max-w-[16ch] font-bold leading-[1.08] tracking-tighter text-white ${
            large ? 'text-3xl md:text-4xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {title}
        </span>
      </div>
        </>
      )}
    </div>
  );
}

export default function BrochuresClient() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  const [featured, ...rest] = brochures;

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto w-full max-w-[1120px] px-5 pb-16 pt-28 text-center sm:px-8 md:pb-20 md:pt-36">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-500 sm:text-xs">
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

        {/* Featured brochure */}
        <div className="mx-auto w-full max-w-[1220px] px-5 pb-20 sm:px-8 md:pb-28">
          <Reveal>
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <Cover title={featured.title} index={0} large src={featured.cover} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-500">
                  Start here
                </p>
                <h2 className="mt-4 font-bold leading-[1.1] tracking-tighter text-3xl md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
                  {featured.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActive(featured)}
                    className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85"
                  >
                    Read brochure
                  </button>
                  <a
                    href={featured.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                  >
                    <Download size={15} />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto w-full max-w-[1220px] px-5 py-20 sm:px-8 md:py-28">
        <Reveal className="mb-12 md:mb-16">
          <h2 className="font-bold leading-[1.1] tracking-tighter text-zinc-900 text-3xl md:text-4xl">
            The full library.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-zinc-500">
            One brochure for every product in the eatOS restaurant technology cloud.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.06}>
              <article className="group flex h-full flex-col">
                <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                  <Cover title={item.title} index={i + 1} src={item.cover} />
                </div>
                <h3 className="mt-6 text-[19px] font-bold tracking-tighter text-zinc-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-7 text-zinc-500">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="inline-flex items-center gap-1.5 text-[15px] font-medium text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                    Read brochure
                    <ArrowUpRight size={15} />
                  </button>
                  <a
                    href={item.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[15px] font-medium text-zinc-500 transition-colors hover:text-zinc-900"
                  >
                    <Download size={15} />
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
            <h2 className="mx-auto max-w-[22ch] font-bold leading-[1.1] tracking-tighter text-3xl md:text-5xl">
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