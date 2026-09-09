// Cart persistence in D1. Tokens are opaque and stored client-side (cookie/localStorage).

import { execute, queryAll, queryOne } from '@/lib/db/client';
import { majorToMinor, moneyMinor, newId } from '@/lib/api';

export type CartRow = {
  id: string;
  token: string;
  user_id: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
};

export type CartItemRow = {
  id: string;
  cart_id: string;
  variant_id: string;
  product_slug: string;
  title: string;
  quantity: number;
  unit_amount: number;
  currency: string;
};

export function serializeCart(cart: CartRow, items: CartItemRow[]) {
  const subtotal = items.reduce((sum, i) => sum + i.unit_amount * i.quantity, 0);
  const currency = items[0]?.currency || 'USD';
  return {
    id: cart.id,
    token: cart.token,
    email: cart.email,
    items: items.map((i) => ({
      id: i.id,
      variant_id: i.variant_id,
      product_slug: i.product_slug,
      title: i.title,
      quantity: i.quantity,
      unit_price: moneyMinor(i.unit_amount, i.currency),
      line_total: moneyMinor(i.unit_amount * i.quantity, i.currency),
    })),
    subtotal: moneyMinor(subtotal, currency),
    item_count: items.reduce((n, i) => n + i.quantity, 0),
    updated_at: cart.updated_at,
  };
}

export async function createCart(email?: string | null, userId?: string | null) {
  const id = newId('cart');
  const token = newId('ctok');
  await execute(
    `INSERT INTO carts (id, token, user_id, email) VALUES (?, ?, ?, ?)`,
    [id, token, userId ?? null, email ?? null],
  );
  const cart = await queryOne<CartRow>(`SELECT * FROM carts WHERE id = ?`, [id]);
  return cart!;
}

export async function getCartByToken(token: string) {
  return queryOne<CartRow>(`SELECT * FROM carts WHERE token = ?`, [token]);
}

export async function listCartItems(cartId: string) {
  return (
    (await queryAll<CartItemRow>(
      `SELECT * FROM cart_items WHERE cart_id = ? ORDER BY created_at ASC`,
      [cartId],
    )) ?? []
  );
}

export async function touchCart(cartId: string) {
  await execute(`UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [cartId]);
}

export async function addOrUpdateItem(opts: {
  cartId: string;
  variantId: string;
  productSlug: string;
  title: string;
  quantity: number;
  unitAmountMajor: number;
  currency: string;
}) {
  const unitMinor = majorToMinor(opts.unitAmountMajor, opts.currency);
  const existing = await queryOne<CartItemRow>(
    `SELECT * FROM cart_items WHERE cart_id = ? AND variant_id = ?`,
    [opts.cartId, opts.variantId],
  );
  if (existing) {
    const qty = Math.max(1, existing.quantity + opts.quantity);
    await execute(
      `UPDATE cart_items SET quantity = ?, unit_amount = ?, title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [qty, unitMinor, opts.title, existing.id],
    );
  } else {
    await execute(
      `INSERT INTO cart_items (id, cart_id, variant_id, product_slug, title, quantity, unit_amount, currency)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newId('citem'),
        opts.cartId,
        opts.variantId,
        opts.productSlug,
        opts.title,
        Math.max(1, opts.quantity),
        unitMinor,
        opts.currency || 'USD',
      ],
    );
  }
  await touchCart(opts.cartId);
}

export async function setItemQuantity(cartId: string, itemId: string, quantity: number) {
  if (quantity <= 0) {
    await execute(`DELETE FROM cart_items WHERE id = ? AND cart_id = ?`, [itemId, cartId]);
  } else {
    await execute(
      `UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND cart_id = ?`,
      [quantity, itemId, cartId],
    );
  }
  await touchCart(cartId);
}

export async function deleteItem(cartId: string, itemId: string) {
  await execute(`DELETE FROM cart_items WHERE id = ? AND cart_id = ?`, [itemId, cartId]);
  await touchCart(cartId);
}

export async function resolveVariantPrice(variantId: string, productSlug?: string) {
  if (variantId) {
    const variant = await queryOne<Record<string, any>>(
      `SELECT id, product_slug, title, price_amount, currency, available
         FROM product_variants WHERE id = ? LIMIT 1`,
      [variantId],
    );
    if (variant) {
      return {
        variantId: String(variant.id),
        productSlug: String(variant.product_slug),
        title: String(variant.title),
        amountMajor: Number(variant.price_amount) || 0,
        currency: String(variant.currency || 'USD'),
        available: variant.available !== 0,
      };
    }
  }

  const slug =
    productSlug ||
    (variantId.startsWith('default:') ? variantId.slice('default:'.length) : null);
  if (!slug) return null;

  const product = await queryOne<Record<string, any>>(
    `SELECT slug, title, price_amount, currency, available FROM products WHERE slug = ? LIMIT 1`,
    [slug],
  );
  if (!product) return null;

  // Prefer a stored default variant id when present; otherwise synthesize one.
  const fallbackVariant = await queryOne<Record<string, any>>(
    `SELECT id, title, price_amount, currency, available FROM product_variants
      WHERE product_slug = ? ORDER BY position ASC LIMIT 1`,
    [slug],
  );

  return {
    variantId: fallbackVariant ? String(fallbackVariant.id) : `default:${product.slug}`,
    productSlug: String(product.slug),
    title: fallbackVariant
      ? `${product.title} (${fallbackVariant.title})`
      : String(product.title),
    amountMajor: Number(fallbackVariant?.price_amount ?? product.price_amount) || 0,
    currency: String(fallbackVariant?.currency || product.currency || 'USD'),
    available:
      (fallbackVariant ? fallbackVariant.available !== 0 : true) && product.available !== 0,
  };
}
