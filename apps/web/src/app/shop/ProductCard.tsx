// @ts-nocheck
'use client';

import { formatMoney, productHref } from './catalog';

export default function ProductCard({ product }) {
  const price = formatMoney(product.priceFrom);
  const compare = formatMoney(product.compareAtPrice);
  const image = product.images[0];
  return (
    <a
      href={productHref(product.slug)}
      className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/30"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        {image ? (
          <img
            src={image.url}
            alt={image.alt || product.title}
            loading="lazy"
            className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-zinc-900" />
        )}
        {compare && price && compare !== price ? (
          <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            Save
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {product.collectionSlugs[0] ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {product.collectionSlugs[0].replace(/-/g, ' ')}
          </p>
        ) : null}
        <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-brand-on-dark">
          {product.title}
        </h3>
        <div className="mt-auto flex items-baseline gap-2 pt-4">
          {price ? (
            <span className="text-sm font-semibold text-white">{price}</span>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
              Price on request
            </span>
          )}
          {compare && compare !== price ? (
            <span className="text-xs text-zinc-500 line-through">{compare}</span>
          ) : null}
        </div>
      </div>
    </a>
  );
}
