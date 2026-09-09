// Serve Lovable media from Cloudflare R2 (eatos-web-assets / MEDIA_R2).
// Falls back to eatos.lovable.app when the object is missing (new uploads).
// Folder is URL-encoded because Next.js treats leading-underscore segments as private.
import { getCloudflareContext } from '@opennextjs/cloudflare';

const LOVABLE_ASSET_ORIGIN = 'https://eatos.lovable.app';
const CACHE =
  'public, max-age=86400, stale-while-revalidate=604800';

function objectKey(segments: string[]) {
  return `__l5e/assets-v1/${segments.join('/')}`;
}

function parseRange(header: string | null, size: number) {
  if (!header || !header.startsWith('bytes=')) return null;
  const part = header.slice(6).split(',')[0]?.trim();
  if (!part) return null;
  const [startRaw, endRaw] = part.split('-');
  let start = startRaw === '' ? NaN : Number(startRaw);
  let end = endRaw === '' || endRaw === undefined ? size - 1 : Number(endRaw);
  if (Number.isNaN(start)) {
    // suffix: bytes=-N
    const suffix = Number(endRaw);
    if (!Number.isFinite(suffix) || suffix <= 0) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  }
  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start) {
    return null;
  }
  end = Math.min(end, size - 1);
  return { offset: start, length: end - start + 1, start, end };
}

function responseHeaders(opts: {
  contentType?: string | null;
  contentLength?: number | string | null;
  contentRange?: string | null;
  status?: number;
}) {
  const out = new Headers();
  if (opts.contentType) out.set('Content-Type', opts.contentType);
  if (opts.contentLength != null) out.set('Content-Length', String(opts.contentLength));
  if (opts.contentRange) out.set('Content-Range', opts.contentRange);
  out.set('Accept-Ranges', 'bytes');
  out.set('Cache-Control', CACHE);
  return out;
}

async function fromR2(request: Request, segments: string[]) {
  try {
    const { env } = getCloudflareContext();
    const bucket = (env as { MEDIA_R2?: R2Bucket }).MEDIA_R2;
    if (!bucket) return null;

    const key = objectKey(segments);
    const rangeHeader = request.headers.get('Range');
    const head = await bucket.head(key);
    if (!head) return null;

    const contentType =
      head.httpMetadata?.contentType || 'application/octet-stream';
    const size = head.size;
    const range = parseRange(rangeHeader, size);

    if (range) {
      const obj = await bucket.get(key, {
        range: { offset: range.offset, length: range.length },
      });
      if (!obj) return null;
      return new Response(obj.body, {
        status: 206,
        headers: responseHeaders({
          contentType,
          contentLength: range.length,
          contentRange: `bytes ${range.start}-${range.end}/${size}`,
        }),
      });
    }

    const obj = await bucket.get(key);
    if (!obj) return null;
    return new Response(obj.body, {
      status: 200,
      headers: responseHeaders({
        contentType,
        contentLength: size,
      }),
    });
  } catch {
    return null;
  }
}

async function fromLovable(request: Request, segments: string[]) {
  const upstream = `${LOVABLE_ASSET_ORIGIN}/__l5e/assets-v1/${segments
    .map(encodeURIComponent)
    .join('/')}`;
  const headers = new Headers();
  const range = request.headers.get('Range');
  if (range) headers.set('Range', range);

  const res = await fetch(upstream, { headers });
  if (!res.ok) return new Response('Not Found', { status: res.status });

  return new Response(res.body, {
    status: res.status,
    headers: responseHeaders({
      contentType: res.headers.get('Content-Type'),
      contentLength: res.headers.get('Content-Length'),
      contentRange: res.headers.get('Content-Range'),
    }),
  });
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await context.params;
  const segments = path ?? [];
  if (segments.length === 0) {
    return new Response('Not Found', { status: 404 });
  }

  const r2 = await fromR2(request, segments);
  if (r2) return r2;
  return fromLovable(request, segments);
}
