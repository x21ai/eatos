'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

// TODO: replace these placeholder mockups with the final product renders.
// Swap only the `image` value (a .asset.json pointer url) for each product.
import posPlaceholder from './assets/pos-demo-poster.jpg.asset.json';
import kdsPlaceholder from './assets/kds-demo-poster.jpg.asset.json';
import kioskPlaceholder from './assets/kiosk-demo-poster.jpg.asset.json';
import cfdPlaceholder from './assets/cfd3-demo-poster.jpg.asset.json';
import dashPlaceholder from './assets/dashboard-demo-poster.jpg.asset.json';
import invPlaceholder from './assets/inventoryos-demo-poster.jpg.asset.json';

type ShowcaseProduct = {
  name: string;
  href: string;
  image: string;
};

const showcaseProducts: ShowcaseProduct[] = [
  { name: 'Point of Sale', href: '/pointofsale', image: posPlaceholder.url },
  {
    name: 'Kitchen Display System',
    href: '/products/kitchen-display-system',
    image: kdsPlaceholder.url,
  },
  {
    name: 'Self Service Kiosk',
    href: '/products/self-service-kiosk',
    image: kioskPlaceholder.url,
  },
  {
    name: 'Customer Facing Display',
    href: '/products/customer-facing-display',
    image: cfdPlaceholder.url,
  },
  {
    name: 'Table Side Order & Pay',
    href: '/products/tableside-order-and-pay',
    image: invPlaceholder.url,
  },
  {
    name: 'Analytics & Reporting',
    href: '/products/reporting-analytics',
    image: dashPlaceholder.url,
  },
  {
    name: 'Autonomous & Automated Delivery',
    href: '/products/autonomous-and-automated-delivery',
    image: invPlaceholder.url,
  },
];

interface ProductShowcaseSectionProps {
  title?: string;
  description?: string;
}

export function ProductShowcaseSection({
  title = 'How it Works',
  description = 'Everything your restaurant needs today and for the future.',
}: ProductShowcaseSectionProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);

  const scrollByCards = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-showcase-card]');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section className="py-14 md:py-20 bg-black border-t border-white/5">
      <div className="site-container">
        <div className="text-center mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/85 text-lg font-medium max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        <div className="relative">
          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 backdrop-blur-md text-white transition-all hover:bg-white/10 hover:border-white/30 disabled:opacity-25 disabled:pointer-events-none"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next products"
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 backdrop-blur-md text-white transition-all hover:bg-white/10 hover:border-white/30 disabled:opacity-25 disabled:pointer-events-none"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-2 md:px-14 pb-2"
          >
            {showcaseProducts.map((product) => (
              <a
                key={product.name}
                href={product.href}
                data-showcase-card
                className="group snap-start shrink-0 basis-[66%] sm:basis-[calc((100%-3rem)/3)] lg:basis-[calc((100%-6rem)/5)] flex flex-col items-center text-center"
              >
                <div className="relative w-full aspect-[3/4] flex items-end justify-center">
                  <div className="absolute bottom-6 h-16 w-3/5 rounded-[100%] bg-white/10 blur-2xl" />
                  <img
                    src={product.image}
                    alt={`${product.name} shown on an eatOS device`}
                    loading="lazy"
                    className="relative z-10 max-h-full w-auto max-w-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-6 text-base md:text-lg font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors max-w-[14rem] leading-snug">
                  {product.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
