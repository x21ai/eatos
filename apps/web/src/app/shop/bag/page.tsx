// @ts-nocheck
'use client';

import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useBag, updateQuantity, removeFromBag, bagTotal } from '../cart';

export default function BagPage() {
  const bag = useBag();
  const subtotal = bagTotal(bag);
  const estimatedTax = Math.round(subtotal * 0.0875 * 100) / 100;
  const total = subtotal + estimatedTax;

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <div className="h-20" />

      <section className="pt-16 md:pt-24 pb-24">
        <div className="site-container max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Your Bag</h1>
          <p className="text-white/50 mb-12">
            {bag.length > 0 ? 'Free delivery on all hardware orders.' : 'Your bag is empty.'}
          </p>

          {bag.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 p-16 text-center">
              <ShoppingBag size={40} className="mx-auto mb-6 text-white/30" />
              <p className="text-white/60 mb-8">Add some hardware to get started.</p>
              <a
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-400 font-semibold transition-colors"
              >
                Continue Shopping <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Line items */}
              <div className="lg:col-span-2 divide-y divide-white/10 border-t border-b border-white/10">
                {bag.map((item, index) => (
                  <div key={index} className="py-6 flex gap-6">
                    <div className="w-28 h-28 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center p-3 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="text-xs text-white/50 mt-1 space-y-0.5">
                            {item.selectionLabels.map((label, i) => (
                              <div key={i}>{label}</div>
                            ))}
                          </div>
                        </div>
                        <div className="font-semibold whitespace-nowrap">
                          ${(item.unitAmount * item.quantity).toLocaleString('en-US')}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center border border-white/15 rounded-full">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="p-2 text-white/70 hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="p-2 text-white/70 hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromBag(index)}
                          className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-28 self-start rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
                <h2 className="font-semibold text-lg mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Estimated tax</span>
                    <span>${estimatedTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <a
                  href="/shop/checkout"
                  className="mt-8 block text-center w-full py-4 rounded-full bg-blue-500 hover:bg-blue-400 font-semibold transition-colors"
                >
                  Check Out
                </a>
                <a
                  href="/shop"
                  className="mt-3 block text-center text-sm text-blue-400 hover:underline"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
