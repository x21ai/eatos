import { fail, ok, readJson } from '@/lib/api';
import { createCart, getCartByToken, listCartItems, serializeCart } from '@/lib/shop/cart';

export async function POST(request: Request) {
  const body = (await readJson(request)) || {};
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : null;
  try {
    const cart = await createCart(email);
    const items = await listCartItems(cart.id);
    return ok(serializeCart(cart, items), 201);
  } catch (error) {
    console.error('create cart failed', error);
    return fail('write_failed', 'Could not create a cart.', 500);
  }
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  if (!token) return fail('validation_failed', 'token query param is required.');
  const cart = await getCartByToken(token);
  if (!cart) return fail('not_found', 'Cart not found.', 404);
  const items = await listCartItems(cart.id);
  return ok(serializeCart(cart, items));
}
