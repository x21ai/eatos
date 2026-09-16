import { fail, ok, readJson, moneyMinor } from '@/lib/api';
import { getCartByToken, listCartItems } from '@/lib/shop/cart';
import { validateDiscountCode } from '@/lib/shop/discounts';

export async function POST(request: Request) {
  const body = (await readJson(request)) || {};
  const token = typeof body.cart_token === 'string' ? body.cart_token : '';
  const code = typeof body.code === 'string' ? body.code : '';

  if (!token) return fail('validation_failed', 'cart_token is required.');
  if (!code.trim()) return fail('validation_failed', 'code is required.');

  const cart = await getCartByToken(token);
  if (!cart) return fail('not_found', 'Cart not found.', 404);

  const items = await listCartItems(cart.id);
  if (!items.length) return fail('cart_empty', 'Cart is empty.', 400);

  const subtotal = items.reduce((s, i) => s + i.unit_amount * i.quantity, 0);
  const currency = items[0]?.currency || 'USD';
  const result = await validateDiscountCode(code, subtotal);

  if (!result.valid) {
    return fail('invalid_discount', result.reason || 'Invalid discount code.', 400);
  }

  return ok({
    code: result.code,
    type: result.type,
    discount: moneyMinor(result.discount_amount ?? 0, currency),
    subtotal: moneyMinor(subtotal, currency),
    subtotal_after: moneyMinor(result.subtotal_after ?? subtotal, currency),
  });
}
