'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { demoSources } from './demoSources';

export function DemoCarouselSection() {
  const [index, setIndex] = useState(0);
  const demo = demoSources[index];
  const total = demoSources.length;

  const displayLabel = (id: string) => {
    switch (id) {
      case 'kds':
        return 'Kitchen Display System';
      case 'cfd':
        return 'Customer Facing Display';
      case 'kiosk':
        return 'Self Service Kiosk';
      default:
        return demo.label;
    }
  };

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <section className="py-12 md:py-16 bg-black border-t border-white/5">
      <div className="site-container">
      <div className="text-center mb-8">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-3">
          Option B, Carousel
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
          How it Works
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Slide through the eatOS platform one product at a time and see exactly how each screen behaves in a real service.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
      <div className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="text-sm text-gray-400 font-medium">{displayLabel(demo.id)}</div>
          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ExternalLink size={14} />
            Open
          </a>
        </div>

        <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[480px] bg-black">
          <AnimatePresence mode="wait">
            <motion.iframe
              key={demo.id}
              src={demo.url}
              title={displayLabel(demo.id)}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              allow="fullscreen"
              loading="lazy"
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous demo"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-zinc-900/70 text-gray-300 hover:text-white hover:border-white/40 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="min-w-0 flex-1 text-center">
          <div className="text-base md:text-lg font-bold tracking-tighter text-white truncate">
            {displayLabel(demo.id)}
          </div>
          <p className="text-sm text-gray-400 truncate">{demo.blurb}</p>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next demo"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-zinc-900/70 text-gray-300 hover:text-white hover:border-white/40 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {demoSources.map((d, i) => (
          <button
            key={d.id}
            type="button"
            aria-label={displayLabel(d.id)}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-8 bg-white' : 'w-2 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
      </div>
      </div>
    </section>
  );
}
