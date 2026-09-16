// Client-side cart token + API helpers for the shop UI.

const TOKEN_KEY = 'eatos_cart_token';

export function getCartToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setCartToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

async function parse(res: Response) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.error) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }
  return json.data;
}

export async function ensureCart() {
  const existing = getCartToken();
  if (existing) {
    try {
      return await parse(await fetch(`/api/cart/${existing}`));
    } catch {
      // fall through and create a fresh cart
    }
  }
  const cart = await parse(
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    }),
  );
  setCartToken(cart.token);
  return cart;
}

export async function addToCart(opts: {
  variantId?: string | null;
  productSlug: string;
  quantity: number;
}) {
  const cart = await ensureCart();
  return parse(
    await fetch(`/api/cart/${cart.token}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variant_id: opts.variantId || `default:${opts.productSlug}`,
        product_slug: opts.productSlug,
        quantity: opts.quantity,
      }),
    }),
  );
}

export async function fetchCart() {
  const token = getCartToken();
  if (!token) return null;
  return parse(await fetch(`/api/cart/${token}`));
}

export async function updateCartItem(itemId: string, quantity: number) {
  const token = getCartToken();
  if (!token) throw new Error('No cart');
  return parse(
    await fetch(`/api/cart/${token}/items/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    }),
  );
}

export async function removeCartItem(itemId: string) {
  const token = getCartToken();
  if (!token) throw new Error('No cart');
  return parse(await fetch(`/api/cart/${token}/items/${itemId}`, { method: 'DELETE' }));
}

export type CheckoutShippingInput = {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  region?: string;
  postal?: string;
  country?: string;
  phone?: string;
};

export async function quoteShipping(country = 'US') {
  const token = getCartToken();
  if (!token) throw new Error('No cart');
  return parse(
    await fetch('/api/shipping/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_token: token, country }),
    }),
  );
}

export async function validateDiscountCode(code: string) {
  const token = getCartToken();
  if (!token) throw new Error('No cart');
  return parse(
    await fetch('/api/discounts/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_token: token, code }),
    }),
  );
}

export async function startCheckout(
  email: string,
  shipping?: CheckoutShippingInput,
  discountCode?: string,
) {
  const token = getCartToken();
  if (!token) throw new Error('No cart');
  return parse(
    await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart_token: token,
        email,
        shipping: shipping || undefined,
        discount_code: discountCode || undefined,
      }),
    }),
  );
}

export function formatMinor(money: { amount: number; currency: string } | null | undefined) {
  if (!money || typeof money.amount !== 'number') return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currency || 'USD',
  }).format(money.amount / 100);
}
