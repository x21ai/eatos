// @ts-nocheck
'use client';

import { motion } from 'motion/react';
import ProductCard from '../../ProductCard';
import { getCollection, getCollectionProducts } from '../../catalog';

export default function CollectionClient({ slug }) {
  const collection = getCollection(slug);
  const items = getCollectionProducts(slug);

  if (!collection) {
    return (
      <div className="bg-black text-zinc-200">
        <section className="site-container pt-[128px] md:pt-[176px] pb-24">
          <h1 className="text-3xl font-bold tracking-tighter text-white">Collection not found</h1>
          <p className="mt-4 text-sm text-zinc-400">
            This collection is no longer available.{' '}
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
            <span className="text-zinc-300">{collection.title}</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-3xl font-bold leading-[1.05] tracking-tighter text-white sm:text-4xl md:text-5xl"
          >
            {collection.title}
          </motion.h1>
          {collection.descriptionHtml ? (
            <div
              className="shop-rte mt-5 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7"
              dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
            />
          ) : null}
          <p className="mt-4 text-xs text-zinc-500">
            {items.length} {items.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
