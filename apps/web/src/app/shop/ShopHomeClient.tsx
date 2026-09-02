// @ts-nocheck
'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import {
  bundleProducts,
  collectionHref,
  contentPageHref,
  featuredProducts,
  formatMoney,
  processingRate,
  products,
  railCollections,
  shopContentPages,
} from './catalog';

export default function ShopHomeClient() {
  return (
    <div className="bg-black text-zinc-200">
      <section className="pt-[128px] md:pt-[176px] pb-14 md:pb-20">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.28em] text-brand-on-dark">
              eatOS SHOP
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Restaurant hardware, built for the floor
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
              Point of Sale terminals, handhelds, kitchen displays, self service kiosks, customer
              facing displays and every accessory that goes with them. Build a bundle or buy exactly
              what your service needs.
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              {products.length} products across {railCollections.length} collections.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/bookademo"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Book a Demo <ArrowRight size={15} aria-hidden />
              </a>
              <a
                href={contentPageHref('get-a-quote')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50"
              >
                Request a Quote
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collection rail */}
      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="site-container">
          <h2 className="text-xl font-bold tracking-tighter text-white sm:text-2xl">
            Shop by collection
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {railCollections.map((collection, index) => (
              <motion.a
                key={collection.slug}
                href={collectionHref(collection.slug)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.04 }}
                className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/30"
              >
                <h3 className="text-sm font-bold tracking-tight text-white transition-colors group-hover:text-brand-on-dark sm:text-base">
                  {collection.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {collection.productSlugs.length}{' '}
                  {collection.productSlugs.length === 1 ? 'product' : 'products'}
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Bundles */}
      {bundleProducts.length ? (
        <section className="border-t border-white/10 py-12 md:py-16">
          <div className="site-container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tighter text-white sm:text-2xl">Bundles</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
                  Complete setups for a single store or a whole group, priced as one package.
                </p>
              </div>
              <a
                href={collectionHref('bundles')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-on-dark"
              >
                View all <ArrowRight size={13} aria-hidden />
              </a>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {bundleProducts.map((product) => (
                <div key={product.slug} className="flex flex-col">
                  <ProductCard product={product} />
                  {formatMoney(product.priceFrom) ? (
                    <p className="mt-3 px-1 text-[11px] leading-5 text-zinc-500">
                      Starting at {formatMoney(product.priceFrom)} with {processingRate}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Featured products */}
      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="site-container">
          <h2 className="text-xl font-bold tracking-tighter text-white sm:text-2xl">Featured hardware</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Content pages */}
      {shopContentPages.length ? (
        <section className="border-t border-white/10 py-12 md:py-16">
          <div className="site-container">
            <h2 className="text-xl font-bold tracking-tighter text-white sm:text-2xl">More from the shop</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {shopContentPages.map((page) => (
                <a
                  key={page.slug}
                  href={contentPageHref(page.slug)}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
                >
                  {page.title}
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="site-container text-center">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
            Not sure what you need?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400">
            Our specialists size the right setup for your floor plan, service style and volume.
          </p>
          <a
            href="/bookademo"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Talk to an expert <ArrowRight size={15} aria-hidden />
          </a>
        </div>
      </section>
    </div>
  );
}
