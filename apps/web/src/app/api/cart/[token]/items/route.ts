import { fail, ok, readJson } from '@/lib/api';
import {
  addOrUpdateItem,
  getCartByToken,
  listCartItems,
  resolveVariantPrice,
  serializeCart,
} from '@/lib/shop/cart';

export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const cart = await getCartByToken(token);
  if (!cart) return fail('not_found', 'Cart not found.', 404);

  const body = (await readJson(request)) || {};
  const variantId = typeof body.variant_id === 'string' ? body.variant_id : '';
  const productSlug = typeof body.product_slug === 'string' ? body.product_slug : undefined;
  const quantity = Math.max(1, parseInt(String(body.quantity || 1), 10) || 1);

  if (!variantId && !productSlug) {
    return fail('validation_failed', 'variant_id or product_slug is required.');
  }

  const priced = await resolveVariantPrice(variantId || `default:${productSlug}`, productSlug);
  if (!priced || priced.amountMajor <= 0) {
    return fail(
      'price_unavailable',
      'This item is quote-on-request and cannot be added to the cart.',
      400,
    );
  }
  if (!priced.available) {
    return fail('unavailable', 'This item is currently unavailable.', 409);
  }

  try {
    await addOrUpdateItem({
      cartId: cart.id,
      variantId: priced.variantId,
      productSlug: priced.productSlug,
      title: priced.title,
      quantity,
      unitAmountMajor: priced.amountMajor,
      currency: priced.currency,
    });
    const items = await listCartItems(cart.id);
    return ok(serializeCart(cart, items), 201);
  } catch (error) {
    console.error('add cart item failed', error);
    return fail('write_failed', 'Could not add the item to the cart.', 500);
  }
}
