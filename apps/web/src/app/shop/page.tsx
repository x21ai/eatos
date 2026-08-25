// @ts-nocheck
'use client';

import { ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { catalog, formatMoney } from './catalog';
import { useBagCount } from './cart';

export default function ShopPage() {
  const count = useBagCount();

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <div className="h-20" />

      {/* Apple-style store header */}
      <section className="pt-16 pb-10 md:pt-24 md:pb-16 border-b border-white/10">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] max-w-3xl">
              <span className="text-white/60">Shop.</span> Premium hardware
              for the way you serve.
            </h1>
            <a
              href="/contact-sales"
              className="text-blue-400 hover:underline text-sm font-medium inline-flex items-center gap-1 shrink-0"
            >
              Need help choosing? Talk to a specialist <ArrowRight size={14} />
            </a>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-white/50">
            <span>All hardware ships free. Financing available at checkout.</span>
            <a href="/shop/bag" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
              <ShoppingBag size={16} />
              Bag{count > 0 ? ` (${count})` : ''}
            </a>
          </div>
        </div>
      </section>

      {/* Product shelves */}
      <section className="py-16 md:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {catalog.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8 md:p-10 overflow-hidden"
              >
                {product.badge && (
                  <span className="absolute top-6 left-6 text-xs font-semibold px-3 py-1 rounded-full bg-white text-black">
                    {product.badge}
                  </span>
                )}
                <a href={`/shop/${product.slug}`} className="block">
                  <div className="aspect-square flex items-center justify-center mb-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="text-sm text-white/50 font-medium mb-1">{product.category}</div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {product.name}
                  </h2>
                  <p className="text-white/70 mb-6">{product.tagline}</p>
                </a>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-lg font-semibold">{formatMoney(product.price)}</div>
                    {product.monthlyFrom && (
                      <div className="text-xs text-white/50">or {product.monthlyFrom}</div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`/shop/${product.slug}`}
                      className="px-5 py-2.5 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/10 transition-colors"
                    >
                      Learn more
                    </a>
                    <a
                      href={`/shop/${product.slug}`}
                      className="px-5 py-2.5 rounded-full bg-blue-500 text-sm font-semibold hover:bg-blue-400 transition-colors"
                    >
                      Buy
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width feature strip */}
      <section className="pb-24">
        <div className="site-container">
          <div className="rounded-[3rem] bg-gradient-to-br from-indigo-950/60 via-black to-black border border-white/10 p-10 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
                Not sure what fits your floor?
              </h3>
              <p className="text-white/70 text-lg">
                Tell us about your service style and volume, and we will design the
                perfect hardware setup for your restaurant.
              </p>
            </div>
            <a
              href="/contact-sales"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform shrink-0"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
