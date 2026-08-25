// @ts-nocheck
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronDown, ShoppingBag, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { formatMoney, unitPrice } from '../catalog';
import { addToBag } from '../cart';

export default function ProductDetail({ product }) {
  const router = useRouter();
  const [selections, setSelections] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((o) => [o.id, o.values[0].id]))
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('Highlights');

  const unit = unitPrice(product, selections);
  const total = unit * quantity;

  const selectionLabels = product.options.map((opt) => {
    const val = opt.values.find((v) => v.id === selections[opt.id]);
    return `${opt.label}: ${val?.label}`;
  });

  const bagItem = {
    productSlug: product.slug,
    name: product.name,
    image: product.image,
    unitAmount: unit,
    selections,
    selectionLabels,
  };

  const handleAdd = () => {
    addToBag(bagItem, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToBag(bagItem, quantity);
    router.push('/shop/checkout');
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <div className="h-20" />

      {/* Product hero: sticky gallery + buy panel */}
      <section className="pt-10 md:pt-16 pb-20">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="lg:sticky lg:top-28 self-start">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent aspect-square flex items-center justify-center p-10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-white/60">
                <div className="rounded-2xl border border-white/10 p-4 flex flex-col items-center gap-2">
                  <Truck size={18} className="text-white/80" /> Free delivery
                </div>
                <div className="rounded-2xl border border-white/10 p-4 flex flex-col items-center gap-2">
                  <RotateCcw size={18} className="text-white/80" /> 30-day returns
                </div>
                <div className="rounded-2xl border border-white/10 p-4 flex flex-col items-center gap-2">
                  <ShieldCheck size={18} className="text-white/80" /> 2-year warranty
                </div>
              </div>
            </div>

            {/* Buy panel */}
            <div>
              {product.badge && (
                <span className="text-orange-400 text-sm font-semibold">{product.badge}</span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mt-2 mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-white/70 mb-6">{product.description}</p>
              <div className="mb-8">
                <div className="text-2xl font-semibold">{formatMoney(product.price)}</div>
                {product.monthlyFrom && (
                  <div className="text-sm text-white/50">or {product.monthlyFrom}</div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-6 mb-8">
                {product.options.map((opt) => (
                  <div key={opt.id}>
                    <div className="text-sm font-semibold mb-3">
                      {opt.label}{' '}
                      <span className="text-white/50 font-normal">
                        {opt.values.find((v) => v.id === selections[opt.id])?.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {opt.values.map((val) => {
                        const active = selections[opt.id] === val.id;
                        return (
                          <button
                            key={val.id}
                            onClick={() =>
                              setSelections((s) => ({ ...s, [opt.id]: val.id }))
                            }
                            className={`px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                              active
                                ? 'border-blue-500 bg-blue-500/10 text-white'
                                : 'border-white/15 text-white/70 hover:border-white/40'
                            }`}
                          >
                            {val.label}
                            {val.priceDelta ? ` (+$${val.priceDelta})` : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div>
                  <div className="text-sm font-semibold mb-3">Quantity</div>
                  <div className="inline-flex items-center border border-white/15 rounded-full">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-4 py-2 text-white/70 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-4 py-2 text-white/70 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 mb-4">
                <button
                  onClick={handleAdd}
                  className="w-full py-4 rounded-full bg-blue-500 hover:bg-blue-400 font-semibold transition-colors inline-flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check size={18} /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Bag
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 rounded-full border border-white/20 hover:bg-white/10 font-semibold transition-colors"
                >
                  Buy Now: ${total.toLocaleString('en-US')}
                </button>
              </div>
              <p className="text-xs text-white/40 text-center">
                Ships free within 5 business days.
              </p>

              {/* Accordions */}
              <div className="mt-10 divide-y divide-white/10 border-t border-b border-white/10">
                {[
                  { title: 'Highlights', items: product.highlights },
                  { title: "What's in the Box", items: product.inTheBox },
                  { title: 'Compatibility', items: product.compatibility },
                ].map((section) => (
                  <div key={section.title}>
                    <button
                      onClick={() =>
                        setOpenSection(openSection === section.title ? null : section.title)
                      }
                      className="w-full flex items-center justify-between py-4 text-left font-semibold"
                    >
                      {section.title}
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${openSection === section.title ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openSection === section.title && (
                      <ul className="pb-5 space-y-2 text-sm text-white/70">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="w-1 h-1 rounded-full bg-white/40 mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech specs */}
      <section className="pb-24">
        <div className="site-container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-10 text-center">
            Tech Specs
          </h2>
          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {product.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-4">
                <div className="text-sm font-semibold text-white/90">{spec.label}</div>
                <div className="sm:col-span-2 text-sm text-white/60">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
