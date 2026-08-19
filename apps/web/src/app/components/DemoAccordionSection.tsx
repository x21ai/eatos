'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { demoSources, displayName } from './demoSources';

export function DemoAccordionSection() {
  const [openId, setOpenId] = useState<string | null>(demoSources[0].id);

  return (
    <section className="py-12 md:py-16 bg-black border-t border-white/5">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-10">
        <div className="text-center mb-8">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-3">
            Option E, Accordion stack
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
            How it Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the full eatOS platform in your browser. Switch between products to see every feature in action and explore the complete workflow.
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-3">
          {demoSources.map((d) => {
            const open = d.id === openId;
            return (
              <div
                key={d.id}
                className={`relative overflow-hidden rounded-xl border transition-colors ${
                  open ? 'border-white/25 bg-zinc-900' : 'border-white/10 bg-zinc-900/50'
                }`}
              >
                {open && <span className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />}
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : d.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="min-w-0">
                    <span
                      className={`block text-base md:text-lg font-bold tracking-tighter ${
                        open ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {displayName(d.id)}
                    </span>
                    <span className="mt-1 block text-xs md:text-sm text-gray-500 leading-snug">
                      {d.blurb}
                    </span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                      open ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key={`${d.id}-panel`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <div className="rounded-lg border border-white/10 overflow-hidden bg-black">
                          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-zinc-900/60">
                            <div className="text-xs text-gray-400 font-medium">
                              {displayName(d.id)}
                            </div>
                            <a
                              href={d.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                            >
                              <ExternalLink size={13} />
                              Open
                            </a>
                          </div>
                          <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[440px]">
                            <iframe
                              src={d.url}
                              title={displayName(d.id)}
                              className="absolute inset-0 w-full h-full border-0"
                              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                              allow="fullscreen"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
