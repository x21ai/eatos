import { fail, ok, readJson } from '@/lib/api';
import {
  deleteItem,
  getCartByToken,
  listCartItems,
  serializeCart,
  setItemQuantity,
} from '@/lib/shop/cart';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ token: string; itemId: string }> },
) {
  const { token, itemId } = await context.params;
  const cart = await getCartByToken(token);
  if (!cart) return fail('not_found', 'Cart not found.', 404);

  const body = (await readJson(request)) || {};
  const quantity = parseInt(String(body.quantity), 10);
  if (!Number.isFinite(quantity)) {
    return fail('validation_failed', 'quantity must be a number.');
  }

  try {
    await setItemQuantity(cart.id, itemId, quantity);
    const items = await listCartItems(cart.id);
    return ok(serializeCart(cart, items));
  } catch (error) {
    console.error('patch cart item failed', error);
    return fail('write_failed', 'Could not update the cart item.', 500);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ token: string; itemId: string }> },
) {
  const { token, itemId } = await context.params;
  const cart = await getCartByToken(token);
  if (!cart) return fail('not_found', 'Cart not found.', 404);

  try {
    await deleteItem(cart.id, itemId);
    const items = await listCartItems(cart.id);
    return ok(serializeCart(cart, items));
  } catch (error) {
    console.error('delete cart item failed', error);
    return fail('write_failed', 'Could not remove the cart item.', 500);
  }
}
