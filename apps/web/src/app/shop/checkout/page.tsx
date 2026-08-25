// @ts-nocheck
'use client';

import { useState } from 'react';
import { Check, Lock, ShoppingBag } from 'lucide-react';
import { useBag, bagTotal, clearBag } from '../cart';

const inputClass =
  'w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors';

export default function CheckoutPage() {
  const bag = useBag();
  const subtotal = bagTotal(bag);
  const estimatedTax = Math.round(subtotal * 0.0875 * 100) / 100;
  const total = subtotal + estimatedTax;
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    delivery: 'standard',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const set = (key: string) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearBag();
  };

  if (placed) {
    return (
      <div className="bg-black min-h-screen text-white font-sans">
        <div className="h-20" />
        <section className="pt-24 pb-24">
          <div className="site-container max-w-xl text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
              <Check size={36} className="text-green-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter mb-4">Order placed</h1>
            <p className="text-white/60 mb-3">
              Thank you. This is a demo checkout, so no payment was processed and no
              order was sent.
            </p>
            <p className="text-white/40 text-sm mb-10">
              Order reference: DEMO-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <a
              href="/shop"
              className="inline-block px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-400 font-semibold transition-colors"
            >
              Back to Shop
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <div className="h-20" />

      <section className="pt-16 md:pt-20 pb-24">
        <div className="site-container max-w-6xl">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Checkout</h1>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-500/40 text-amber-400">
              Demo checkout: no real charge
            </span>
          </div>
          <p className="text-white/50 mb-12">
            <Lock size={12} className="inline mr-1 -mt-0.5" /> Secure checkout
          </p>

          {bag.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 p-16 text-center">
              <ShoppingBag size={40} className="mx-auto mb-6 text-white/30" />
              <p className="text-white/60 mb-8">Your bag is empty.</p>
              <a
                href="/shop"
                className="inline-block px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-400 font-semibold transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Form column */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Contact */}
                  <div>
                    <h2 className="font-semibold text-lg mb-4">Contact</h2>
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={form.email}
                      onChange={set('email')}
                      className={inputClass}
                    />
                  </div>

                  {/* Shipping */}
                  <div>
                    <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        required
                        placeholder="First name"
                        value={form.firstName}
                        onChange={set('firstName')}
                        className={inputClass}
                      />
                      <input
                        required
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={set('lastName')}
                        className={inputClass}
                      />
                      <input
                        required
                        placeholder="Street address"
                        value={form.address}
                        onChange={set('address')}
                        className={`${inputClass} sm:col-span-2`}
                      />
                      <input
                        required
                        placeholder="City"
                        value={form.city}
                        onChange={set('city')}
                        className={inputClass}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          required
                          placeholder="State"
                          value={form.state}
                          onChange={set('state')}
                          className={inputClass}
                        />
                        <input
                          required
                          placeholder="ZIP"
                          value={form.zip}
                          onChange={set('zip')}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery */}
                  <div>
                    <h2 className="font-semibold text-lg mb-4">Delivery</h2>
                    <div className="space-y-3">
                      {[
                        { id: 'standard', label: 'Standard delivery', note: 'Free, 5 business days' },
                        { id: 'express', label: 'Express delivery', note: '$29, 2 business days' },
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-between rounded-2xl border px-5 py-4 cursor-pointer transition-colors ${
                            form.delivery === opt.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-white/15 hover:border-white/30'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="delivery"
                              checked={form.delivery === opt.id}
                              onChange={() => setForm((f) => ({ ...f, delivery: opt.id }))}
                              className="accent-blue-500"
                            />
                            <span className="text-sm font-medium">{opt.label}</span>
                          </span>
                          <span className="text-sm text-white/50">{opt.note}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <h2 className="font-semibold text-lg mb-4">Payment</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        required
                        placeholder="Name on card"
                        value={form.cardName}
                        onChange={set('cardName')}
                        className={`${inputClass} sm:col-span-2`}
                      />
                      <input
                        required
                        placeholder="Card number"
                        inputMode="numeric"
                        value={form.cardNumber}
                        onChange={set('cardNumber')}
                        className={`${inputClass} sm:col-span-2`}
                      />
                      <input
                        required
                        placeholder="MM / YY"
                        value={form.expiry}
                        onChange={set('expiry')}
                        className={inputClass}
                      />
                      <input
                        required
                        placeholder="CVC"
                        inputMode="numeric"
                        value={form.cvc}
                        onChange={set('cvc')}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary sidebar */}
                <div className="lg:sticky lg:top-28 self-start rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
                  <h2 className="font-semibold text-lg mb-6">Your Order</h2>
                  <div className="space-y-4 mb-6">
                    {bag.map((item, i) => (
                      <div key={i} className="flex gap-4 items-center">
                        <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center p-1.5 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{item.name}</div>
                          <div className="text-xs text-white/50">Qty {item.quantity}</div>
                        </div>
                        <div className="text-sm font-semibold">
                          ${(item.unitAmount * item.quantity).toLocaleString('en-US')}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                    <div className="flex justify-between text-white/70">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Shipping</span>
                      <span>{form.delivery === 'express' ? '$29.00' : 'Free'}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Estimated tax</span>
                      <span>${estimatedTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>
                        ${(total + (form.delivery === 'express' ? 29 : 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-8 w-full py-4 rounded-full bg-blue-500 hover:bg-blue-400 font-semibold transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Lock size={16} /> Place Order
                  </button>
                  <p className="mt-3 text-xs text-white/40 text-center">
                    Demo only. No payment is processed.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
