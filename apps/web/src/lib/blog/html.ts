// Bridges the two shapes an article can be in:
//   - body blocks, which the public blog and newsroom pages render
//   - one HTML string, which the rich text editor in the admin area produces
//
// Both live on the row, so editing never loses formatting and the public pages
// keep rendering from the structured blocks.

import type { BlogBodyBlock } from './types';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function blocksToHtml(blocks: BlogBodyBlock[] | null | undefined): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map((b) => {
      if (b.type === 'ul') {
        const items = (b.items || []).map((i) => `<li>${escape(i)}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      const text = escape(b.text || '');
      if (b.type === 'h2') return `<h2>${text}</h2>`;
      if (b.type === 'h3') return `<h3>${text}</h3>`;
      if (b.type === 'quote') return `<blockquote>${text}</blockquote>`;
      return `<p>${text}</p>`;
    })
    .join('\n');
}

const stripTags = (s: string) =>
  s
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

/** Turn editor HTML back into the block list the public pages render. */
export function htmlToBlocks(html: string | null | undefined): BlogBodyBlock[] {
  if (!html) return [];
  const blocks: BlogBodyBlock[] = [];
  const pattern = /<(h2|h3|p|blockquote|ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  let matched = false;

  while ((match = pattern.exec(html)) !== null) {
    matched = true;
    const tag = (match[1] || '').toLowerCase();
    const inner = match[2] || '';

    if (tag === 'ul' || tag === 'ol') {
      const items = [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((m) => stripTags(m[1] || ''))
        .filter(Boolean);
      if (items.length) blocks.push({ type: 'ul', items });
      continue;
    }

    const text = stripTags(inner);
    if (!text) continue;
    if (tag === 'h2') blocks.push({ type: 'h2', text });
    else if (tag === 'h3') blocks.push({ type: 'h3', text });
    else if (tag === 'blockquote') blocks.push({ type: 'quote', text });
    else blocks.push({ type: 'p', text });
  }

  if (!matched) {
    const text = stripTags(html);
    if (text) blocks.push({ type: 'p', text });
  }

  return blocks;
}

/** First paragraph, trimmed, for an excerpt when the author leaves it empty. */
export function excerptFromBlocks(blocks: BlogBodyBlock[], max = 180): string {
  const first = blocks.find((b) => b.type === 'p' && b.text);
  const text = first?.text || '';
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}...` : text;
}
