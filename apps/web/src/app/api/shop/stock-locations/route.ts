import { fail, ok, readJson } from '@/lib/api';
import { adminFail, requireAdmin } from '@/lib/admin/guard';
import { createStockLocation, listStockLocations } from '@/lib/shop/stock';

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const locations = await listStockLocations();
  return ok(locations);
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const body = (await readJson(request)) || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) return fail('validation_failed', 'name is required.');

  try {
    const location = await createStockLocation(name, body.label);
    return ok(location, 201);
  } catch (error) {
    console.error('create stock location failed', error);
    return fail('write_failed', 'Could not create stock location.', 500);
  }
}
