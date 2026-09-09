// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Trash2 } from 'lucide-react';
import {
  fetchCart,
  formatMinor,
  removeCartItem,
  startCheckout,
  updateCartItem,
} from '@/lib/shop/cart-client';

export default function CartClient() {
  const [cart, setCart] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function reload() {
    setLoading(true);
    setError('');
    try {
      setCart(await fetchCart());
    } catch (err) {
      setError(err.message || 'Could not load cart');
      setCart(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function onQty(itemId, quantity) {
    setBusy(true);
    try {
      setCart(await updateCartItem(itemId, quantity));
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setBusy(false);
    }
  }

  async function onRemove(itemId) {
    setBusy(true);
    try {
      setCart(await removeCartItem(itemId));
    } catch (err) {
      setError(err.message || 'Remove failed');
    } finally {
      setBusy(false);
    }
  }

  async function onCheckout(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result = await startCheckout(email);
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

  return (
    <div className="bg-black text-zinc-200 min-h-screen">
      <section className="site-container pt-[128px] md:pt-[176px] pb-24">
        <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">Your cart</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Hardware and accessories for your eatOS setup. Prices shown before tax and shipping.
        </p>

        {loading ? (
          <p className="mt-10 flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="animate-spin" size={16} /> Loading cart…
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
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 p-5"
                >
                  <div>
                    <a
                      href={`/shop/products/${item.product_slug}`}
                      className="text-base font-semibold text-white hover:text-brand-on-dark"
                    >
                      {item.title}
                    </a>
                    <p className="mt-1 text-xs text-zinc-500">{formatMinor(item.unit_price)} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center rounded-full border border-white/15">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => onQty(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-sm text-zinc-300"
                      >
                        -
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => onQty(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-sm text-zinc-300"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-white w-20 text-right">
                      {formatMinor(item.line_total)}
                    </span>
                    <button
                      type="button"
                      disabled={busy}
                      aria-label="Remove item"
                      onClick={() => onRemove(item.id)}
                      className="text-zinc-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={onCheckout} className="rounded-3xl border border-white/10 p-6 h-fit">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Checkout</p>
              <p className="mt-4 flex justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="font-semibold text-white">{formatMinor(cart.subtotal)}</span>
              </p>
              <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
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
              <button
                type="submit"
                disabled={busy}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busy ? <Loader2 className="animate-spin" size={16} /> : null}
                Pay with card <ArrowRight size={15} />
              </button>
              <p className="mt-3 text-xs text-zinc-500">
                Secure checkout via Stripe. You can look up the order later with your email.
              </p>
            </form>
          </div>
        ) : null}
      </section>
    </div>
  );
}
