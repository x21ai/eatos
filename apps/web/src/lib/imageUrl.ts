// @ts-nocheck
/**
 * Returns a right-sized version of a remote image URL.
 *
 * Both image hosts used by the site can resize and re-encode on the fly, so a
 * 1920px original never has to travel down the wire for a 400px slot. URLs that
 * already carry a transform, or that live on hosts without one, are returned
 * untouched, and the file name/address itself never changes.
 */
export function sizedImage(url, width = 900, height) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('data:')) return url;

  const w = Math.round(width);

  // Wix media: /media/<id>.jpg -> /media/<id>.jpg/v1/fit/w_,h_,q_80,enc_auto/file.jpg
  if (url.includes('static.wixstatic.com/media/')) {
    if (url.includes('/v1/')) return url;
    const h = Math.round(height || w * 2);
    return `${url}/v1/fit/w_${w},h_${h},q_80,enc_auto/file.jpg`;
  }

  // Uploadcare: append a resize + auto format transform.
  if (url.includes('ucarecdn.com/')) {
    if (url.includes('/-/resize/') || url.includes('/-/scale_crop/')) return url;
    const base = url.endsWith('/') ? url : `${url}/`;
    if (base.includes('/-/format/')) return `${base}-/quality/smart/-/resize/${w}x/`;
    return `${base}-/format/auto/-/quality/smart/-/resize/${w}x/`;
  }

  return url;
}

export default sizedImage;
