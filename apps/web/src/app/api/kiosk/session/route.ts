import { fail, ok, readJson } from '@/lib/api';
import { queryOne } from '@/lib/db/client';

/** Pair a kiosk device by opaque token stored on the device. */
export async function POST(request: Request) {
  const body = (await readJson(request)) || {};
  const deviceToken =
    typeof body.device_token === 'string' ? body.device_token.trim() : '';

  if (!deviceToken) {
    return fail('validation_failed', 'device_token is required.');
  }

  const device = await queryOne<{ id: string; label: string }>(
    `SELECT id, label FROM kiosk_devices WHERE token = ? LIMIT 1`,
    [deviceToken],
  );

  if (!device) {
    return fail('forbidden', 'Invalid kiosk device token.', 403);
  }

  return ok({
    device_id: device.id,
    label: device.label,
  });
}
