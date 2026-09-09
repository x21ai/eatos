import { fail, ok } from '@/lib/api';
import { getCartByToken, listCartItems, serializeCart } from '@/lib/shop/cart';

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const cart = await getCartByToken(token);
  if (!cart) return fail('not_found', 'Cart not found.', 404);
  const items = await listCartItems(cart.id);
  return ok(serializeCart(cart, items));
}
