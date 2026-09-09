'use client';

import { useCallback, useEffect, useState } from 'react';
import { formatMinor } from '@/lib/shop/cart-client';

const DEVICE_TOKEN_KEY = 'eatos_kiosk_device_token';
const DEVICE_ID_KEY = 'eatos_kiosk_device_id';
const DEVICE_LABEL_KEY = 'eatos_kiosk_device_label';
const CART_TOKEN_KEY = 'eatos_kiosk_cart_token';

type Money = { amount: number; currency: string };

type CatalogItem = {
  slug: string;
  title: string;
  variant_id: string;
  variant_title: string;
  price: Money;
};

type CartItem = {
  id: string;
  variant_id: string;
  product_slug: string;
  title: string;
  quantity: number;
  unit_price: Money;
  line_total: Money;
};

type Cart = {
  token: string;
  items: CartItem[];
  subtotal: Money;
  item_count: number;
};

async function parseJson(res: Response) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.error) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }
  return json.data;
}

export default function KioskClient() {
  const [deviceToken, setDeviceToken] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceLabel, setDeviceLabel] = useState('');
  const [paired, setPaired] = useState(false);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const persistCartToken = (token: string) => {
    window.localStorage.setItem(CART_TOKEN_KEY, token);
  };

  const ensureCart = useCallback(async (): Promise<Cart> => {
    const existing = window.localStorage.getItem(CART_TOKEN_KEY);
    if (existing) {
      try {
        const data = await parseJson(await fetch(`/api/cart/${existing}`));
        setCart(data);
        return data;
      } catch {
        // create fresh
      }
    }
    const data = await parseJson(
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      }),
    );
    persistCartToken(data.token);
    setCart(data);
    return data;
  }, []);

  const loadCatalog = useCallback(async () => {
    const data = await parseJson(await fetch('/api/kiosk/catalog'));
    setCatalog(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(DEVICE_TOKEN_KEY) || '';
    const storedId = window.localStorage.getItem(DEVICE_ID_KEY) || '';
    const storedLabel = window.localStorage.getItem(DEVICE_LABEL_KEY) || '';
    setDeviceToken(storedToken);
    setDeviceId(storedId);
    setDeviceLabel(storedLabel);

    (async () => {
      setLoading(true);
      setError('');
      try {
        if (storedToken) {
          const session = await parseJson(
            await fetch('/api/kiosk/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ device_token: storedToken }),
            }),
          );
          setDeviceId(session.device_id);
          setDeviceLabel(session.label);
          window.localStorage.setItem(DEVICE_ID_KEY, session.device_id);
          window.localStorage.setItem(DEVICE_LABEL_KEY, session.label);
          setPaired(true);
          await Promise.all([loadCatalog(), ensureCart()]);
        }
      } catch (err: any) {
        setPaired(false);
        setError(err?.message || 'Could not restore kiosk session.');
      } finally {
        setLoading(false);
      }
    })();
  }, [ensureCart, loadCatalog]);

  async function onPair(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const session = await parseJson(
        await fetch('/api/kiosk/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ device_token: deviceToken.trim() }),
        }),
      );
      window.localStorage.setItem(DEVICE_TOKEN_KEY, deviceToken.trim());
      window.localStorage.setItem(DEVICE_ID_KEY, session.device_id);
      window.localStorage.setItem(DEVICE_LABEL_KEY, session.label);
      setDeviceId(session.device_id);
      setDeviceLabel(session.label);
      setPaired(true);
      await Promise.all([loadCatalog(), ensureCart()]);
    } catch (err: any) {
      setPaired(false);
      setError(err?.message || 'Invalid device token.');
    } finally {
      setBusy(false);
    }
  }

  async function onAdd(item: CatalogItem) {
    setBusy(true);
    setError('');
    try {
      const current = cart || (await ensureCart());
      const next = await parseJson(
        await fetch(`/api/cart/${current.token}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            variant_id: item.variant_id,
            product_slug: item.slug,
            quantity: 1,
          }),
        }),
      );
      setCart(next);
    } catch (err: any) {
      setError(err?.message || 'Could not add item.');
    } finally {
      setBusy(false);
    }
  }

  async function onCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!cart?.token) return;
    setBusy(true);
    setError('');
    try {
      const result = await parseJson(
        await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cart_token: cart.token,
            email: email.trim() || undefined,
            source: 'kiosk',
            device_id: deviceId,
          }),
        }),
      );
      if (result?.checkout_url) {
        window.location.href = result.checkout_url;
        return;
      }
      setError('Checkout did not return a payment URL.');
    } catch (err: any) {
      setError(err?.message || 'Checkout failed.');
    } finally {
      setBusy(false);
    }
  }

  function onUnpair() {
    window.localStorage.removeItem(DEVICE_TOKEN_KEY);
    window.localStorage.removeItem(DEVICE_ID_KEY);
    window.localStorage.removeItem(DEVICE_LABEL_KEY);
    window.localStorage.removeItem(CART_TOKEN_KEY);
    setPaired(false);
    setDeviceId('');
    setDeviceLabel('');
    setCatalog([]);
    setCart(null);
    setError('');
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-8 sm:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">eatOS</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Kiosk</h1>
          {paired && deviceLabel ? (
            <p className="mt-2 text-sm text-zinc-400">{deviceLabel}</p>
          ) : (
            <p className="mt-2 text-sm text-zinc-400">Enter the device token to start ordering.</p>
          )}
        </header>

        {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}

        {loading ? (
          <p className="text-sm text-zinc-400">Loading…</p>
        ) : !paired ? (
          <form onSubmit={onPair} className="space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Device token
              <input
                value={deviceToken}
                onChange={(e) => setDeviceToken(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black px-4 py-4 text-base text-white outline-none focus:border-white/40"
                placeholder="Paste device token"
                autoComplete="off"
                required
              />
            </label>
            <button
              type="submit"
              disabled={busy || !deviceToken.trim()}
              className="w-full rounded-2xl bg-white px-4 py-4 text-base font-semibold text-black disabled:opacity-50"
            >
              {busy ? 'Pairing…' : 'Start kiosk'}
            </button>
          </form>
        ) : (
          <>
            <section className="flex-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Menu
              </h2>
              <ul className="mt-4 space-y-3">
                {catalog.map((item) => (
                  <li
                    key={item.variant_id}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-base font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-400">{formatMinor(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => onAdd(item)}
                      className="shrink-0 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Add
                    </button>
                  </li>
                ))}
                {!catalog.length ? (
                  <li className="text-sm text-zinc-400">No available products.</li>
                ) : null}
              </ul>
            </section>

            <section className="mt-8 border-t border-white/10 pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Cart · {cart?.item_count || 0}
              </h2>
              <ul className="mt-3 space-y-2">
                {(cart?.items || []).map((item) => (
                  <li key={item.id} className="flex justify-between gap-3 text-sm">
                    <span className="text-zinc-300">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="text-white">{formatMinor(item.line_total)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-semibold text-white">
                Total {formatMinor(cart?.subtotal) || '$0.00'}
              </p>

              <form onSubmit={onCheckout} className="mt-4 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Receipt email (optional)
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white/40"
                    placeholder="guest@example.com"
                  />
                </label>
                <button
                  type="submit"
                  disabled={busy || !cart?.items?.length}
                  className="w-full rounded-2xl bg-white px-4 py-4 text-base font-semibold text-black disabled:opacity-50"
                >
                  {busy ? 'Starting checkout…' : 'Pay'}
                </button>
              </form>

              <button
                type="button"
                onClick={onUnpair}
                className="mt-4 w-full text-center text-xs text-zinc-500 underline"
              >
                Unpair device
              </button>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
