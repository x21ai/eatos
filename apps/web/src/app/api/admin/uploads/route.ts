import { getCloudflareContext } from '@opennextjs/cloudflare';
import { fail, ok, okList } from '@/lib/api';
import { adminFail, requireAdmin } from '@/lib/admin/guard';

/** R2 object key prefix that `/__l5e/assets-v1/[...path]` serves. */
const ASSETS_PREFIX = '__l5e/assets-v1';
const SHOP_PREFIX = `${ASSETS_PREFIX}/shop/`;

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
]);

function mediaBucket(): R2Bucket | null {
  try {
    const { env } = getCloudflareContext();
    return (env as { MEDIA_R2?: R2Bucket }).MEDIA_R2 ?? null;
  } catch {
    return null;
  }
}

function sanitizeSlug(raw: string | null | undefined): string {
  const s = String(raw || 'misc')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return s || 'misc';
}

function extFromFile(file: File): string {
  const name = file.name || '';
  const fromName = name.includes('.')
    ? name.split('.').pop()!.toLowerCase().replace(/[^a-z0-9]/g, '')
    : '';
  if (fromName && fromName.length <= 8) return fromName;

  const mime = (file.type || '').toLowerCase();
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png') return 'png';
  if (mime === 'image/gif') return 'gif';
  if (mime === 'image/webp') return 'webp';
  if (mime === 'image/svg+xml') return 'svg';
  return 'bin';
}

function publicUrlFromKey(key: string): string {
  if (key.startsWith(`${ASSETS_PREFIX}/`)) {
    return `/${key}`;
  }
  return `/${ASSETS_PREFIX}/${key.replace(/^\//, '')}`;
}

/** Best-effort image dimensions from raw bytes; null when unknown. */
function probeDimensions(
  bytes: Uint8Array,
  mime: string,
): { width: number | null; height: number | null } {
  try {
    if (mime === 'image/png' || (bytes[0] === 0x89 && bytes[1] === 0x50)) {
      if (bytes.length < 24) return { width: null, height: null };
      const width =
        (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19];
      const height =
        (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23];
      return { width, height };
    }

    if (mime === 'image/gif' || (bytes[0] === 0x47 && bytes[1] === 0x49)) {
      if (bytes.length < 10) return { width: null, height: null };
      const width = bytes[6] | (bytes[7] << 8);
      const height = bytes[8] | (bytes[9] << 8);
      return { width, height };
    }

    if (
      mime === 'image/webp' ||
      (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[8] === 0x57)
    ) {
      // RIFF....WEBP
      if (bytes.length < 30) return { width: null, height: null };
      const chunk = String.fromCharCode(bytes[12], bytes[13], bytes[14], bytes[15]);
      if (chunk === 'VP8X' && bytes.length >= 30) {
        const width =
          1 + (bytes[24] | (bytes[25] << 8) | (bytes[26] << 16));
        const height =
          1 + (bytes[27] | (bytes[28] << 8) | (bytes[29] << 16));
        return { width, height };
      }
      if (chunk === 'VP8 ' && bytes.length >= 30) {
        const width = bytes[26] | (bytes[27] << 8);
        const height = bytes[28] | (bytes[29] << 8);
        return { width: width & 0x3fff, height: height & 0x3fff };
      }
      if (chunk === 'VP8L' && bytes.length >= 25) {
        const b0 = bytes[21];
        const b1 = bytes[22];
        const b2 = bytes[23];
        const b3 = bytes[24];
        const width = 1 + (((b1 & 0x3f) << 8) | b0);
        const height =
          1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
        return { width, height };
      }
    }

    if (
      mime === 'image/jpeg' ||
      (bytes[0] === 0xff && bytes[1] === 0xd8)
    ) {
      let i = 2;
      while (i + 9 < bytes.length) {
        if (bytes[i] !== 0xff) {
          i += 1;
          continue;
        }
        const marker = bytes[i + 1];
        if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) {
          i += 2;
          continue;
        }
        const len = (bytes[i + 2] << 8) | bytes[i + 3];
        // SOF0–SOF3, SOF5–SOF7, SOF9–SOF11, SOF13–SOF15
        if (
          (marker >= 0xc0 && marker <= 0xc3) ||
          (marker >= 0xc5 && marker <= 0xc7) ||
          (marker >= 0xc9 && marker <= 0xcb) ||
          (marker >= 0xcd && marker <= 0xcf)
        ) {
          const height = (bytes[i + 5] << 8) | bytes[i + 6];
          const width = (bytes[i + 7] << 8) | bytes[i + 8];
          return { width, height };
        }
        if (len < 2) break;
        i += 2 + len;
      }
    }
  } catch {
    // fall through
  }
  return { width: null, height: null };
}

/**
 * GET /api/admin/uploads — list recent objects under shop/ in MEDIA_R2.
 * Query: ?limit=50&cursor=<r2 continuation token>
 */
export async function GET(request: Request) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const bucket = mediaBucket();
  if (!bucket) {
    return fail('r2_unavailable', 'MEDIA_R2 binding unavailable.', 503);
  }

  const url = new URL(request.url);
  const limit = Math.min(
    Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1),
    100,
  );
  const cursor = url.searchParams.get('cursor') || undefined;

  try {
    const listed = await bucket.list({
      prefix: SHOP_PREFIX,
      limit,
      cursor,
    });

    const items = (listed.objects || [])
      .map((obj) => ({
        key: obj.key,
        url: publicUrlFromKey(obj.key),
        size: obj.size,
        uploaded: obj.uploaded?.toISOString?.() ?? null,
        etag: obj.etag ?? null,
      }))
      .sort((a, b) => String(b.uploaded || '').localeCompare(String(a.uploaded || '')));

    const next =
      listed.truncated && listed.cursor ? String(listed.cursor) : null;
    return okList(items, next, Boolean(listed.truncated));
  } catch (error) {
    console.error('admin uploads list failed', error);
    return fail('list_failed', 'Failed to list uploads.', 500);
  }
}

/**
 * POST /api/admin/uploads — multipart: file + optional product_slug (default misc).
 * Stores at `__l5e/assets-v1/shop/<slug>/<uuid>.<ext>` so the assets-v1 route can serve it.
 */
export async function POST(request: Request) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const bucket = mediaBucket();
  if (!bucket) {
    return fail('r2_unavailable', 'MEDIA_R2 binding unavailable.', 503);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail('validation_failed', 'Expected multipart form data.');
  }

  const fileEntry = form.get('file');
  if (!(fileEntry instanceof File) || fileEntry.size === 0) {
    return fail('validation_failed', 'file is required.');
  }

  const mime = (fileEntry.type || 'application/octet-stream').toLowerCase();
  if (mime && !ALLOWED_TYPES.has(mime) && !mime.startsWith('image/')) {
    return fail('validation_failed', 'Only image uploads are allowed.');
  }

  const slug = sanitizeSlug(
    typeof form.get('product_slug') === 'string'
      ? (form.get('product_slug') as string)
      : 'misc',
  );
  const ext = extFromFile(fileEntry);
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  // Match assets-v1 route objectKey: `__l5e/assets-v1/${segments.join('/')}`
  const relative = `shop/${slug}/${id}.${ext}`;
  const key = `${ASSETS_PREFIX}/${relative}`;
  const publicUrl = `/${ASSETS_PREFIX}/${relative}`;

  const buffer = new Uint8Array(await fileEntry.arrayBuffer());
  const { width, height } = probeDimensions(buffer, mime);

  try {
    await bucket.put(key, buffer, {
      httpMetadata: {
        contentType: mime || 'application/octet-stream',
        cacheControl: 'public, max-age=31536000, immutable',
      },
      customMetadata: {
        product_slug: slug,
        original_name: fileEntry.name || '',
      },
    });
  } catch (error) {
    console.error('admin uploads put failed', error);
    return fail('upload_failed', 'Failed to write object to R2.', 500);
  }

  return ok(
    {
      url: publicUrl,
      width,
      height,
      key,
    },
    201,
  );
}
