// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { showcaseVideos } from '@/components/marketing/customerShowcase';
import { stats } from '../../homepage2/data/stats';

const CLIP_MS = 7000;

/**
 * Full width hero with real customer footage playing behind the headline.
 * The clips cross fade one into the next. On small screens and for anyone who
 * asks for reduced motion the video never loads and a brand gradient shows
 * instead, so phones do not pay for a background video.
 */
export function HeroVideoSection() {
  const [active, setActive] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wide = window.matchMedia('(min-width: 768px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => setPlayVideo(wide.matches && !calm.matches);
    decide();
    wide.addEventListener('change', decide);
    calm.addEventListener('change', decide);
    return () => {
      wide.removeEventListener('change', decide);
      calm.removeEventListener('change', decide);
    };
  }, []);

  useEffect(() => {
    if (!playVideo) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % showcaseVideos.length),
      CLIP_MS,
    );
    return () => clearInterval(timer);
  }, [playVideo]);

  useEffect(() => {
    if (!playVideo) return;
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        el.currentTime = 0;
        el.play?.().catch(() => {});
      } else {
        el.pause?.();
      }
    });
  }, [active, playVideo]);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-black text-white">
      {/* Background: gradient always, footage on larger screens */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(215,4,128,0.35),transparent_60%),radial-gradient(circle_at_80%_10%,rgba(79,70,229,0.35),transparent_55%)] bg-zinc-950" />
        {playVideo
          ? showcaseVideos.map((clip, i) => (
              <video
                key={clip.src}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={`${clip.src}#t=0.1`}
                muted
                loop
                playsInline
                preload={i === 0 ? 'auto' : 'none'}
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
                  i === active ? 'opacity-60' : 'opacity-0'
                }`}
              />
            ))
          : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black" />
      </div>

      <div className="site-container relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur-md"
          style={{ color: '#f9a8d4' }}
        >
          <Sparkles size={14} />
          <span>Real restaurants, running on eatOS right now</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="max-w-4xl text-5xl font-bold leading-[1.03] tracking-tighter md:text-7xl lg:text-[5.5rem]"
        >
          We run the
          <br />
          hardest hours.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-gray-300 md:text-2xl"
        >
          Point of Sale, payments, kitchen, kiosk and intelligence on one
          platform, built for the rush and the people working it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="/bookademo"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-transform duration-300 hover:scale-105"
          >
            Book a Demo
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="/platform"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white/10"
          >
            Explore the platform
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/10 pt-8 md:mt-20 md:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label}>
                <Icon size={18} className="mb-3 text-white/40" />
                <div className="text-2xl font-bold tracking-tighter md:text-3xl">
                  {stat.value}
                  {stat.unit}
                </div>
                <div className="mt-1 text-sm leading-snug text-gray-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <ChevronDown size={24} className="animate-bounce text-white/40" />
      </div>
    </section>
  );
}
