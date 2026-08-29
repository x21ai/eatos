// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import ProductCard from '../../ProductCard';
import {
  collectionHref,
  formatMoney,
  getCollection,
  getProduct,
  getRelatedProducts,
  processingRate,
} from '../../catalog';

export default function ProductClient({ slug }) {
  const product = getProduct(slug);
  const related = getRelatedProducts(slug, 3);
  const [activeImage, setActiveImage] = useState(0);
  const [variantId, setVariantId] = useState(product?.variants?.[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);

  const variant = useMemo(
    () => product?.variants?.find((v) => v.id === variantId) ?? product?.variants?.[0] ?? null,
    [product, variantId],
  );

  if (!product) {
    return (
      <div className="bg-black text-zinc-200">
        <section className="site-container pt-32 pb-24">
          <h1 className="text-3xl font-bold tracking-tighter text-white">Product not found</h1>
          <p className="mt-4 text-sm text-zinc-400">
            This product is no longer available.{' '}
            <a href="/shop" className="text-brand-on-dark">
              Browse the shop
            </a>
            .
          </p>
        </section>
      </div>
    );
  }

  const price = formatMoney(variant?.price ?? product.priceFrom);
  const compare = formatMoney(variant?.compareAtPrice ?? product.compareAtPrice);
  const primaryCollection = product.collectionSlugs[0] ? getCollection(product.collectionSlugs[0]) : null;
  const images = product.images.length ? product.images : [null];

  return (
    <div className="bg-black text-zinc-200">
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="site-container">
          <nav className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            <a href="/shop" className="hover:text-white">
              Shop
            </a>
            {primaryCollection ? (
              <>
                <span className="px-2">/</span>
                <a href={collectionHref(primaryCollection.slug)} className="hover:text-white">
                  {primaryCollection.title}
                </a>
              </>
            ) : null}
          </nav>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Gallery */}
            <div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white">
                {images[activeImage] ? (
                  <img
                    src={images[activeImage].url}
                    alt={images[activeImage].alt || product.title}
                    className="aspect-square w-full object-contain p-8"
                  />
                ) : (
                  <div className="aspect-square w-full bg-zinc-900" />
                )}
              </div>
              {product.images.length > 1 ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={image.url}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View image ${index + 1}`}
                      className={`h-16 w-16 overflow-hidden rounded-xl border bg-white transition-colors ${
                        index === activeImage ? 'border-brand' : 'border-white/15 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || product.title}
                        loading="lazy"
                        className="h-full w-full object-contain p-1.5"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Detail */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl font-bold leading-[1.1] tracking-tighter text-white sm:text-3xl md:text-4xl">
                {product.title}
              </h1>
              <div className="mt-5 flex items-baseline gap-3">
                {price ? <span className="text-2xl font-semibold text-white">{price}</span> : null}
                {compare && compare !== price ? (
                  <span className="text-sm text-zinc-500 line-through">{compare}</span>
                ) : null}
              </div>
              {price ? (
                <p className="mt-2 text-xs text-zinc-500">Starting at {price} with {processingRate}</p>
              ) : null}

              {product.options
                .filter((option) => option.name && option.name.toLowerCase() !== 'title')
                .map((option) => (
                  <div key={option.name} className="mt-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      {option.name}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const match = product.variants.find((v) => v.options.includes(value));
                        const selected = variant?.options?.includes(value);
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => match && setVariantId(match.id)}
                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                              selected
                                ? 'border-brand bg-brand text-white'
                                : 'border-white/15 text-zinc-300 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center rounded-full border border-white/15">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-sm text-zinc-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-white">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 text-sm text-zinc-300 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <a
                  href="/bookademo"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Request this setup <ArrowRight size={15} aria-hidden />
                </a>
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                {product.available && variant?.available
                  ? 'In stock and ready to ship.'
                  : 'Currently on request. Our team will confirm lead time.'}
              </p>

              {product.descriptionHtml ? (
                <div
                  className="shop-rte mt-10 border-t border-white/10 pt-8 text-sm leading-6 text-zinc-400"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : null}

              <ul className="mt-10 grid gap-3 border-t border-white/10 pt-8 text-sm text-zinc-400">
                {['Setup and onboarding support included', 'Works with the full eatOS cloud', 'Warranty and replacement coverage'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand-on-dark" aria-hidden />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-white/10 py-12 md:py-16">
          <div className="site-container">
            <h2 className="text-xl font-bold tracking-tighter text-white sm:text-2xl">You may also need</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
