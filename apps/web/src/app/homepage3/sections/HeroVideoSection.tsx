// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { showcaseVideos } from '@/components/marketing/customerShowcase';
import { stats } from '../../homepage2/data/stats';
import heroPoster from '../../../assets/svc-full-service-v2.jpg.asset.json';

const CLIP_MS = 7000;

/**
 * Full width hero with real customer footage playing behind the headline.
 *
 * The poster still shows immediately, so the hero is never an empty black box.
 * Desktop and tablet cross fade through every clip, phones play a single clip
 * so mobile data is not burned, and anyone asking for reduced motion or hitting
 * a network error keeps the poster plus the brand gradient.
 */
export function HeroVideoSection() {
  const [active, setActive] = useState(0);
  const [clipCount, setClipCount] = useState(0);
  const [failed, setFailed] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wide = window.matchMedia('(min-width: 640px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => {
      if (calm.matches) {
        setClipCount(0);
        return;
      }
      setClipCount(wide.matches ? showcaseVideos.length : 1);
    };
    decide();
    wide.addEventListener('change', decide);
    calm.addEventListener('change', decide);
    return () => {
      wide.removeEventListener('change', decide);
      calm.removeEventListener('change', decide);
    };
  }, []);

  useEffect(() => {
    if (clipCount < 2) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % clipCount),
      CLIP_MS,
    );
    return () => clearInterval(timer);
  }, [clipCount]);

  useEffect(() => {
    if (clipCount === 0) return;
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        try {
          el.currentTime = 0;
        } catch {
          // Safari throws when the clip has not buffered yet; harmless.
        }
        el.play?.().catch(() => {});
      } else {
        el.pause?.();
      }
    });
  }, [active, clipCount]);

  const clips = failed ? [] : showcaseVideos.slice(0, clipCount);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black text-white">
      {/* Background: poster and gradient always, footage layered over them */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPoster.url}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(215,4,128,0.42),transparent_60%),radial-gradient(circle_at_80%_10%,rgba(215,4,128,0.22),transparent_55%)]" />
        {clips.map((clip, i) => (
          <video
            key={clip.src}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={`${clip.src}#t=0.1`}
            poster={heroPoster.url}
            muted
            loop
            autoPlay={i === 0}
            playsInline
            preload={i === 0 ? 'metadata' : 'none'}
            aria-hidden="true"
            onError={() => {
              if (i === 0) setFailed(true);
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
              i === active ? 'opacity-60' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>

      <div className="site-container relative z-10 py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium backdrop-blur-md sm:text-sm"
          style={{ color: 'var(--brand-on-dark)' }}
        >
          <Sparkles size={14} />
          <span>Real restaurants, running on eatOS right now</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="max-w-4xl text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.04] tracking-tighter"
        >
          We run the
          <br />
          hardest hours.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-5 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:text-lg md:text-xl"
        >
          Point of Sale, payments, kitchen, kiosk and intelligence on one
          platform, built for the rush and the people working it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href="/bookademo"
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black transition-transform duration-300 hover:scale-105 md:text-lg"
          >
            Book a Demo
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="/platform"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-7 py-3.5 text-base font-medium text-white transition-all hover:bg-white/10 md:text-lg"
          >
            Explore the platform
          </a>
        </motion.div>

        {/* Outcomes strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-7 md:mt-14 md:grid-cols-4 md:gap-x-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label}>
                <Icon size={18} className="mb-2.5 text-brand-on-dark" />
                <div className="text-sm font-medium uppercase tracking-widest text-white/50">
                  {stat.value}
                  {stat.unit}
                </div>
                <div className="mt-1.5 text-sm font-semibold leading-snug text-white sm:text-base">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <ChevronDown size={24} className="animate-bounce text-white/40" />
      </div>
    </section>
  );
}
