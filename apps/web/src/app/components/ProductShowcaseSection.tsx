'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion } from 'motion/react';
import { demoSources } from './demoSources';

// TODO: Dashboard and inventoryOS still use placeholder mockups.
import posPlaceholder from './assets/pos-demo-poster.jpg.asset.json';
import dashPlaceholder from './assets/dashboard-demo-poster.jpg.asset.json';
import invPlaceholder from './assets/inventoryos-demo-poster.jpg.asset.json';

import posShot from './assets/showcase-pos.png.asset.json';
import kdsShot from './assets/showcase-kds.png.asset.json';
import kioskShot from './assets/showcase-kiosk.png.asset.json';
import cfdShot from './assets/showcase-CFD.png.asset.json';
import tablesideShot from './assets/showcase-Tableside_Ordering.png.asset.json';
import analyticsShot from './assets/showcase-Analytics.png.asset.json';
import deliveryShot from './assets/showcase-Servebot.png.asset.json';
import popShot from './assets/showcase-POP_edited.png.asset.json';
import onlineShot from './assets/showcase-OrderOS.png.asset.json';
import workforceShot from './assets/showcase-Workforce.png.asset.json';

type ShowcaseProduct = {
  name: string;
  href: string;
  image: string;
  demoId?: string;
  frame?: 'tablet';
};

function TabletFrame({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[94%] rounded-[1.4rem] border border-white/15 bg-zinc-900 p-[2.5%] shadow-[0_25px_45px_rgba(0,0,0,0.65)] ${className}`}
    >
      <div className="absolute left-1/2 top-[1.1%] h-1 w-1 -translate-x-1/2 rounded-full bg-white/30" />
      <div className="overflow-hidden rounded-[0.7rem] bg-black">
        <img src={src} alt={alt} loading="lazy" className="block w-full object-cover" />
      </div>
    </div>
  );
}


const showcaseProducts: ShowcaseProduct[] = [
  { name: 'AI Enabled\nPoint of Sale', href: '/pointofsale', image: posShot.url, demoId: 'pos' },
  {
    name: 'AI Enabled\nKitchen Display System',
    href: '/products/kitchen-display-system',
    image: kdsShot.url,
    demoId: 'kds',
  },
  {
    name: 'Self Service Kiosk',
    href: '/products/self-service-kiosk',
    image: kioskShot.url,
    demoId: 'kiosk',
  },
  {
    name: 'Customer Facing Display',
    href: '/products/customer-facing-display',
    image: cfdShot.url,
    demoId: 'cfd',
  },
  {
    name: 'Dashboard',
    href: '/products/reporting-analytics',
    image: dashPlaceholder.url,
    demoId: 'dashboard',
    frame: 'tablet',
  },
  {
    name: 'inventoryOS',
    href: '/products/simplified-inventory-management',
    image: invPlaceholder.url,
    demoId: 'inventoryos',
    frame: 'tablet',
  },
  {
    name: 'Table Side\nOrder & Pay',
    href: '/products/tableside-order-and-pay',
    image: tablesideShot.url,
    demoId: 'pos',
  },
  {
    name: 'Analytics & Reporting',
    href: '/products/reporting-analytics',
    image: analyticsShot.url,
    demoId: 'dashboard',
  },
  {
    name: 'Autonomous & Automated Delivery',
    href: '/products/autonomous-and-automated-delivery',
    image: deliveryShot.url,
    demoId: 'inventoryos',
  },
  {
    name: 'AI Enabled\nPoint of Purchase',
    href: '/products/point-of-purchase',
    image: popShot.url,
    demoId: 'pos',
  },

  {
    name: 'Online Ordering',
    href: '/products/apponlineorderingdelivery',
    image: onlineShot.url,
    demoId: 'kiosk',
  },
  {
    name: 'Workforce Management',
    href: '/products/workforce-management',
    image: workforceShot.url,
    demoId: 'dashboard',
  },
];



function ProductAnimationModal({
  product,
  onClose,
}: {
  product: ShowcaseProduct;
  onClose: () => void;
}) {
  const demo = demoSources.find((d) => d.id === product.demoId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} demo`}
      style={{ zIndex: 2147483000 }}
      className="fixed inset-0 flex items-center justify-center bg-black/85 p-0 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-[1100px] flex-col overflow-hidden bg-zinc-950 shadow-2xl sm:h-auto sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-on-dark">
              How it Works
            </p>
            <h2 className="truncate text-sm font-bold text-white sm:text-base">{product.name}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={product.href}
              className="hidden rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex"
            >
              Learn more
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close demo"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center bg-black p-3 sm:p-6">
          {demo?.media ? (
            <>
              <video
                key={demo.id}
                className="w-full rounded-xl bg-black"
                poster={demo.media.poster}
                autoPlay
                muted
                loop
                playsInline
                controls
              >
                {demo.media.sources.map((s) => (
                  <source key={s.src} src={s.src} type={s.type} />
                ))}
              </video>
              <p className="mt-3 text-center text-sm text-white/70">{demo.media.caption}</p>
            </>
          ) : (
            <img
              src={product.image}
              alt={`${product.name} on an eatOS device`}
              className="max-h-[70vh] w-auto max-w-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}


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
  const [activeProduct, setActiveProduct] = useState<ShowcaseProduct | null>(null);
  const closeModal = useCallback(() => setActiveProduct(null), []);


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
            className="flex gap-16 md:gap-24 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hidden px-2 md:px-14 pb-2"
          >
            {showcaseProducts.map((product) => (
              <button
                key={product.name}
                type="button"
                onClick={() => setActiveProduct(product)}
                aria-label={`Watch the ${product.name} demo`}
                data-showcase-card
                className="group snap-start shrink-0 basis-[72%] sm:basis-[calc((100%-6rem)/3)] lg:basis-[calc((100%-12rem)/5)] flex flex-col items-center text-center"
              >
                <div className="relative w-full aspect-[5/5] flex items-center justify-center">
                  <div className="absolute bottom-6 h-16 w-3/5 rounded-[100%] bg-white/10 blur-2xl" />
                  <img
                    src={product.image}
                    alt={`${product.name} shown on an eatOS device`}
                    loading="lazy"
                    className="relative z-10 max-h-full w-auto max-w-full scale-110 object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.14]"
                  />
                </div>
                <h3 className="mt-5 whitespace-pre-line text-xs md:text-sm font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors max-w-[12rem] leading-snug">
                  {product.name}
                </h3>

              </button>
            ))}
          </div>
        </div>
      </div>

      {activeProduct ? (
        <ProductAnimationModal product={activeProduct} onClose={closeModal} />
      ) : null}
    </section>
  );

}
