import { fail, ok, readJson, moneyMinor } from '@/lib/api';
import { getCartByToken, listCartItems } from '@/lib/shop/cart';
import { quoteCartShipping, normalizeCountry } from '@/lib/shop/shipping';

export async function POST(request: Request) {
  const body = (await readJson(request)) || {};
  const token = typeof body.cart_token === 'string' ? body.cart_token : '';
  const country = normalizeCountry(typeof body.country === 'string' ? body.country : 'US');

  if (!token) return fail('validation_failed', 'cart_token is required.');

  const cart = await getCartByToken(token);
  if (!cart) return fail('not_found', 'Cart not found.', 404);

  const items = await listCartItems(cart.id);
  if (!items.length) return fail('cart_empty', 'Cart is empty.', 400);

  const quote = await quoteCartShipping(items, country);

  return ok({
    requires_shipping: quote.requires_shipping,
    shipping: moneyMinor(quote.shipping_amount, quote.currency),
    subtotal: moneyMinor(quote.subtotal_all, quote.currency),
    subtotal_shippable: moneyMinor(quote.subtotal_shippable, quote.currency),
    total: moneyMinor(quote.subtotal_all + quote.shipping_amount, quote.currency),
    method: quote.method,
    country,
  });
}
