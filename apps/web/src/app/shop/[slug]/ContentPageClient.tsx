// @ts-nocheck
'use client';

import { motion } from 'motion/react';
import { getContentPage } from '../catalog';

export default function ShopContentPageClient({ slug }) {
  const page = getContentPage(slug);

  if (!page) {
    return (
      <div className="bg-black text-zinc-200">
        <section className="site-container pt-[128px] md:pt-[176px] pb-24">
          <h1 className="text-3xl font-bold tracking-tighter text-white">Page not found</h1>
          <p className="mt-4 text-sm text-zinc-400">
            This page is no longer available.{' '}
            <a href="/shop" className="text-brand-on-dark">
              Browse the shop
            </a>
            .
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-black text-zinc-200">
      <section className="pt-[128px] md:pt-[176px] pb-10 md:pb-14">
        <div className="site-container">
          <nav className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            <a href="/shop" className="hover:text-white">
              Shop
            </a>
            <span className="px-2">/</span>
            <span className="text-zinc-300">{page.title}</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-3xl text-3xl font-bold leading-[1.05] tracking-tighter text-white sm:text-4xl md:text-5xl"
          >
            {page.title}
          </motion.h1>
        </div>
      </section>

      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="site-container">
          {page.hasBody ? (
            <div
              className="shop-rte max-w-3xl text-sm leading-7 text-zinc-300"
              dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
            />
          ) : (
            <div className="max-w-2xl">
              <p className="text-sm leading-7 text-zinc-400">
                Our team can walk you through {page.title.toLowerCase()} and put together the right
                package for your restaurant.
              </p>
              <a
                href="/bookademo"
                className="mt-8 inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Talk to an expert
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
