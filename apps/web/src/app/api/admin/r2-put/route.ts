import { getCloudflareContext } from '@opennextjs/cloudflare';
import { fail, ok } from '@/lib/api';
import { adminFail, requireAdmin } from '@/lib/admin/guard';

export const dynamic = 'force-dynamic';

const ASSETS_PREFIX = '__l5e/assets-v1/';
const ALLOWED_PREFIX = `${ASSETS_PREFIX}support/`;

function mediaBucket(): R2Bucket | null {
  try {
    const { env } = getCloudflareContext();
    return (env as { MEDIA_R2?: R2Bucket }).MEDIA_R2 ?? null;
  } catch {
    return null;
  }
}

/**
 * POST multipart: key + file
 * Puts directly via MEDIA_R2 binding (avoids Cloudflare REST API account rate limits).
 * Only keys under __l5e/assets-v1/support/ are accepted.
 */
export async function POST(request: Request) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const bucket = mediaBucket();
  if (!bucket) return fail('r2_unavailable', 'MEDIA_R2 binding unavailable.', 503);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail('validation_failed', 'Expected multipart form data.');
  }

  const keyRaw = typeof form.get('key') === 'string' ? String(form.get('key')) : '';
  const key = keyRaw.replace(/^\/+/, '');
  if (!key.startsWith(ALLOWED_PREFIX)) {
    return fail('validation_failed', `key must start with ${ALLOWED_PREFIX}`);
  }
  if (key.includes('..') || key.length > 240) {
    return fail('validation_failed', 'invalid key');
  }

  const fileEntry = form.get('file');
  if (!(fileEntry instanceof File) || fileEntry.size === 0) {
    return fail('validation_failed', 'file is required.');
  }

  const mime = (fileEntry.type || 'application/octet-stream').toLowerCase();
  const buffer = new Uint8Array(await fileEntry.arrayBuffer());

  try {
    await bucket.put(key, buffer, {
      httpMetadata: {
        contentType: mime,
        cacheControl: 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('r2-put failed', error);
    return fail('upload_failed', 'Failed to write object to R2.', 500);
  }

  return ok({ key, url: `/${key}`, bytes: buffer.length }, 201);
}
