'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { demoSources, displayName, journeySteps } from './demoSources';

export function DemoJourneySection() {
  const [active, setActive] = useState(journeySteps[0].step);
  const step = journeySteps.find((s) => s.step === active) ?? journeySteps[0];
  const demo = demoSources.find((d) => d.id === step.demoId) ?? demoSources[0];
  const progress = ((active - 1) / (journeySteps.length - 1)) * 100;

  return (
    <section className="py-12 md:py-16 bg-black border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-3">
            Option D, Guided journey
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
            How it Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the full eatOS platform in your browser. Switch between products to see every feature in action and explore the complete workflow.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Step strip */}
          <div className="relative mb-8">
            <div className="absolute left-0 right-0 top-5 h-px bg-white/10 hidden md:block" />
            <div
              className="absolute left-0 top-5 h-px bg-emerald-400 hidden md:block transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
            <div className="relative flex gap-3 md:gap-0 overflow-x-auto md:overflow-visible scrollbar-hidden md:grid md:grid-cols-5">
              {journeySteps.map((s) => {
                const isActive = s.step === active;
                const isDone = s.step < active;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActive(s.step)}
                    className="group shrink-0 md:shrink text-left min-w-[150px] md:min-w-0 md:flex md:flex-col md:items-center md:text-center"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-colors ${
                        isActive
                          ? 'bg-white text-black border-white'
                          : isDone
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60'
                            : 'bg-zinc-900 text-gray-500 border-white/10 group-hover:border-white/30 group-hover:text-white'
                      }`}
                    >
                      {s.step}
                    </span>
                    <span
                      className={`mt-3 block text-sm font-bold tracking-tighter transition-colors ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500 md:hidden">
                      {displayName(s.demoId)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Demo frame */}
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
            <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[480px] bg-black">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={demo.id}
                  src={demo.url}
                  title={displayName(demo.id)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  allow="fullscreen"
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 text-center max-w-2xl mx-auto">
            <div className="text-lg font-bold tracking-tighter text-white">
              Step {step.step}, {step.title}
            </div>
            <p className="text-sm text-gray-400 mt-1">{step.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
