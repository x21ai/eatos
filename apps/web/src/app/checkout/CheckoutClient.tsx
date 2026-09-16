// @ts-nocheck
'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import {
  fetchCart,
  formatMinor,
  quoteShipping,
  startCheckout,
  validateDiscountCode,
} from '@/lib/shop/cart-client';

const emptyAddress = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  region: '',
  postal: '',
  country: 'US',
  phone: '',
};

export default function CheckoutClient() {
  const [cart, setCart] = useState(null);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState(emptyAddress);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quoting, setQuoting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [discountInput, setDiscountInput] = useState('');
  const [discount, setDiscount] = useState(null);
  const [discountBusy, setDiscountBusy] = useState(false);
  const [discountError, setDiscountError] = useState('');

  const refreshQuote = useCallback(async (country) => {
    setQuoting(true);
    try {
      setQuote(await quoteShipping(country || address.country || 'US'));
    } catch {
      setQuote(null);
    } finally {
      setQuoting(false);
    }
  }, [address.country]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const nextCart = await fetchCart();
        setCart(nextCart);
        if (nextCart?.email) setEmail(nextCart.email);
        if (nextCart?.items?.length) {
          await refreshQuote('US');
        }
      } catch (err) {
        setError(err.message || 'Could not load cart');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshQuote]);

  useEffect(() => {
    if (!cart?.items?.length) return;
    const timer = setTimeout(() => refreshQuote(address.country), 300);
    return () => clearTimeout(timer);
  }, [address.country, cart?.items?.length, refreshQuote]);

  async function onPay(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result = await startCheckout(
        email,
        quote?.requires_shipping ? address : { country: 'US' },
        discount?.code,
      );
      if (result?.checkout_url) {
        window.location.href = result.checkout_url;
        return;
      }
      setError('Checkout did not return a payment URL.');
    } catch (err) {
      setError(err.message || 'Checkout failed');
    } finally {
      setBusy(false);
    }
  }

  const requiresShipping = quote?.requires_shipping !== false;
  const shippingMoney = quote?.shipping ?? { amount: 0, currency: cart?.subtotal?.currency || 'USD' };
  const discountMinor = discount?.discount?.amount || 0;
  const totalMinor =
    (cart?.subtotal?.amount || 0) -
    discountMinor +
    (typeof shippingMoney.amount === 'number' ? shippingMoney.amount : 0);

  async function applyDiscount(e) {
    e.preventDefault();
    setDiscountBusy(true);
    setDiscountError('');
    try {
      const result = await validateDiscountCode(discountInput);
      setDiscount(result);
    } catch (err) {
      setDiscount(null);
      setDiscountError(err.message || 'Invalid code');
    } finally {
      setDiscountBusy(false);
    }
  }

  const freeShipThreshold = quote?.shipping_rates?.domestic_free_over;

  return (
    <div className="bg-black text-zinc-200 min-h-screen">
      <section className="site-container pt-[128px] md:pt-[176px] pb-24">
        <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">Checkout</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Confirm delivery details, review shipping, then pay securely with Stripe.
        </p>

        {loading ? (
          <p className="mt-10 flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="animate-spin" size={16} /> Loading…
          </p>
        ) : null}

        {error ? <p className="mt-6 text-sm text-red-400">{error}</p> : null}

        {!loading && (!cart || !cart.items?.length) ? (
          <div className="mt-10 rounded-3xl border border-white/10 p-8">
            <p className="text-zinc-300">Your cart is empty.</p>
            <a href="/shop" className="mt-4 inline-flex items-center gap-2 text-brand-on-dark text-sm font-semibold">
              Browse the shop <ArrowRight size={14} />
            </a>
          </div>
        ) : null}

        {cart?.items?.length ? (
          <form onSubmit={onPay} className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 p-6 space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Contact</p>
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Email for receipt
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
                    placeholder="you@restaurant.com"
                  />
                </label>
              </div>

              {requiresShipping ? (
                <div className="rounded-3xl border border-white/10 p-6 space-y-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Ship to
                  </p>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Full name
                    <input
                      required
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Address
                    <input
                      required
                      value={address.line1}
                      onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Apt / suite (optional)
                    <input
                      value={address.line2}
                      onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      City
                      <input
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      State / region
                      <input
                        required
                        value={address.region}
                        onChange={(e) => setAddress({ ...address, region: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Postal code
                      <input
                        required
                        value={address.postal}
                        onChange={(e) => setAddress({ ...address, postal: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Country
                      <input
                        required
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value.toUpperCase().slice(0, 2) })}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
                        placeholder="US"
                        maxLength={2}
                      />
                    </label>
                  </div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Phone (optional)
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
                    />
                  </label>
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 p-6">
                  <p className="text-sm text-zinc-300">Digital delivery — no shipping address required.</p>
                </div>
              )}
            </div>

            <aside className="rounded-3xl border border-white/10 p-6 h-fit space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Order summary</p>

              <form onSubmit={applyDiscount} className="flex gap-2">
                <input
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                  placeholder="Discount code"
                  className="flex-1 rounded-xl border border-white/15 bg-black px-3 py-2 text-sm text-white outline-none focus:border-brand"
                />
                <button
                  type="submit"
                  disabled={discountBusy || !discountInput.trim()}
                  className="rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-wide disabled:opacity-50"
                >
                  Apply
                </button>
              </form>
              {discountError ? <p className="text-xs text-red-400">{discountError}</p> : null}
              {discount?.code ? (
                <p className="text-xs text-green-400">
                  {discount.code} applied (−{formatMinor(discount.discount)})
                </p>
              ) : null}
              <ul className="space-y-3 border-b border-white/10 pb-4 text-sm">
                {cart.items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-3">
                    <span className="text-zinc-300">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="text-white">{formatMinor(item.line_total)}</span>
                  </li>
                ))}
              </ul>
              <p className="flex justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="font-semibold text-white">{formatMinor(cart.subtotal)}</span>
              </p>
              {discountMinor > 0 ? (
                <p className="flex justify-between text-sm">
                  <span className="text-zinc-400">Discount</span>
                  <span className="font-semibold text-green-400">−{formatMinor(discount.discount)}</span>
                </p>
              ) : null}
              <p className="flex justify-between text-sm">
                <span className="text-zinc-400">Shipping</span>
                <span className="font-semibold text-white">
                  {quoting ? '…' : formatMinor(shippingMoney) || '$0.00'}
                </span>
              </p>
              <p className="flex justify-between text-base border-t border-white/10 pt-4">
                <span className="text-zinc-300">Total</span>
                <span className="font-semibold text-white">
                  {formatMinor({ amount: totalMinor, currency: cart.subtotal.currency })}
                </span>
              </p>
              <button
                type="submit"
                disabled={busy || quoting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busy ? <Loader2 className="animate-spin" size={16} /> : null}
                Pay with card <ArrowRight size={15} />
              </button>
              <p className="text-xs text-zinc-500">
                {freeShipThreshold?.amount
                  ? `US orders over ${formatMinor(freeShipThreshold)} ship free. `
                  : 'US orders may qualify for free shipping. '}
                Secure checkout via Stripe.
              </p>
              <a href="/cart" className="block text-center text-xs text-zinc-500 hover:text-zinc-300">
                ← Back to cart
              </a>
            </aside>
          </form>
        ) : null}
      </section>
    </div>
  );
}
