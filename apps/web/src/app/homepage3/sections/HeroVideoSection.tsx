// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles, Star } from 'lucide-react';
import { showcaseVideos } from '@/components/marketing/customerShowcase';
import heroPoster from '../../../assets/svc-full-service-v2.jpg.asset.json';

const CLIP_MS = 7000;

/**
 * Same hero as the live home page, with real customer footage behind it.
 *
 * The poster still shows immediately so the hero is never blank. Tablet and
 * desktop cross fade through every clip, phones play a single clip, and anyone
 * asking for reduced motion or hitting a network error keeps the poster.
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
    <section className="relative flex items-center justify-center overflow-hidden py-28 md:h-[100dvh] md:min-h-screen md:py-0">
      <div className="absolute inset-0 z-0">
        <img
          src={heroPoster.url}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </div>

      <div className="site-container relative z-10 pt-10 text-center md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium backdrop-blur-md md:mb-8 md:px-4 md:py-2 md:text-sm"
          style={{ color: 'var(--brand-on-dark)' }}
        >
          <Star size={14} fill="currentColor" />
          <span>
            The all-new <strong>eatOS</strong> 2.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-5 text-5xl font-bold leading-[1.05] tracking-tighter sm:text-6xl md:mb-8 md:text-9xl"
        >
          Beyond <br />
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Operating.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mx-auto mb-8 max-w-3xl text-[15px] font-light leading-relaxed text-gray-300 md:mb-12 md:text-[22px]"
        >
          The restaurant operating system that sees, thinks, acts quietly and
          reliably at scale. Beautiful hardware. Invisible software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6"
        >
          <a
            href="/bookademo"
            className="group relative w-full overflow-hidden rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black transition-all duration-300 hover:scale-105 sm:w-auto md:py-4 md:text-lg"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Book a Demo <ChevronRight size={18} />
            </span>
          </a>
          <a
            href="/ai"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 sm:w-auto md:py-4 md:text-lg"
          >
            <Sparkles size={18} /> Explore Intelligence
          </a>
        </motion.div>
      </div>
    </section>
  );
}
