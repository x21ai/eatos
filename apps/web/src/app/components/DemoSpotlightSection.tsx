'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { demoSources, displayName } from './demoSources';

export function DemoSpotlightSection() {
  const [activeId, setActiveId] = useState(demoSources[0].id);
  const demo = demoSources.find((d) => d.id === activeId) ?? demoSources[0];
  const others = demoSources.filter((d) => d.id !== demo.id);

  return (
    <section className="py-12 md:py-16 bg-black border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-3">
            Option F, Spotlight grid
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
            How it Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            One product holds the spotlight while the rest sit beside it, ready to swap in with a single click.
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
          {/* Spotlight */}
          <div className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="text-sm text-gray-400 font-medium">{displayName(demo.id)}</div>
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
            <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[500px] bg-black">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={demo.id}
                  src={demo.url}
                  title={displayName(demo.id)}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  allow="fullscreen"
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
            <div className="px-4 py-3 border-t border-white/10 bg-zinc-900/50">
              <div className="text-base font-bold tracking-tighter text-white">
                {displayName(demo.id)}
              </div>
              <p className="text-xs md:text-sm text-gray-400 mt-1 leading-snug">{demo.blurb}</p>
            </div>
          </div>

          {/* Other products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:content-start">
            {others.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveId(d.id)}
                className="rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-left transition-colors hover:border-white/30 hover:bg-zinc-900"
              >
                <span className="block text-sm font-bold tracking-tighter text-gray-200">
                  {displayName(d.id)}
                </span>
                <span className="mt-1 hidden lg:block text-[11px] leading-snug text-gray-500">
                  {d.blurb}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
