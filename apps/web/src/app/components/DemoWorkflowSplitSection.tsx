'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { workflowPairs } from './demoSources';

export function DemoWorkflowSplitSection() {
  const [activeId, setActiveId] = useState(workflowPairs[0].id);
  const pair = workflowPairs.find((p) => p.id === activeId) ?? workflowPairs[0];

  return (
    <section className="py-12 md:py-16 bg-black border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-3">
            Option D, Workflow split view
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
            How it Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how two eatOS products connect in a real service flow, side by side.
          </p>
        </div>

        {/* Pair switcher */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {workflowPairs.map((p) => {
            const active = p.id === activeId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-900/60 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pair.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Split demo panes */}
            <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
              {/* Left pane */}
              <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-900/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{pair.left.label}</div>
                  <a
                    href={pair.left.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                    Open
                  </a>
                </div>
                <div className="relative w-full aspect-[16/10] bg-black">
                  <iframe
                    key={`${pair.id}-left`}
                    src={pair.left.url}
                    title={pair.left.label}
                    className="absolute inset-0 w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    allow="fullscreen"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Connector */}
              <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                  <div className="w-12 h-12 rounded-full bg-emerald-500/30 border border-emerald-400/80 flex items-center justify-center shadow-[0_0_28px_rgba(16,185,129,0.5)]">
                    <ArrowRight size={24} className="text-white" />
                  </div>
                  <div className="w-10 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                </div>
              </div>

              {/* Mobile connector */}
              <div className="flex lg:hidden items-center justify-center py-1">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-3 w-0.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                  <div className="w-10 h-10 rounded-full bg-emerald-500/30 border border-emerald-400/80 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.5)]">
                    <ArrowRight size={20} className="text-white rotate-90" />
                  </div>
                  <div className="h-3 w-0.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                </div>
              </div>

              {/* Right pane */}
              <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-900/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{pair.right.label}</div>
                  <a
                    href={pair.right.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                    Open
                  </a>
                </div>
                <div className="relative w-full aspect-[16/10] bg-black">
                  <iframe
                    key={`${pair.id}-right`}
                    src={pair.right.url}
                    title={pair.right.label}
                    className="absolute inset-0 w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    allow="fullscreen"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Pair description */}
            <div className="mt-6 text-center max-w-xl">
              <div className="text-lg font-bold tracking-tighter text-white">{pair.label}</div>
              <p className="text-sm text-gray-400 mt-1">{pair.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
