// Turns migrated help-article blocks into render nodes.
// Crisp import stored "Table of Contents" as a heading with no list, and stored
// Vimeo/YouTube players as a thumbnail plus the player's own control labels.

import articleEmbeds from './articleEmbeds.generated.json';

export type ArticleBlock = {
  type?: string;
  text?: string;
  src?: string;
  alt?: string;
  items?: string[];
  head?: string[];
  rows?: string[][];
};

export type ArticleEmbed = {
  provider: 'vimeo' | 'youtube';
  id: string;
  title: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: 'h2' | 'h3' | 'h4';
};

export type PreparedNode =
  | { kind: 'block'; index: number; block: ArticleBlock }
  | { kind: 'toc'; items: TocItem[] }
  | {
      kind: 'video';
      provider: 'vimeo' | 'youtube' | null;
      id: string | null;
      title: string;
      posterSrc: string | null;
    };

const PLAYER_CHROME = new Set([
  'playing in picture-in-picture',
  'play',
  'cc/subtitles',
  'settings',
  'transcript',
  'picture-in-picture',
  'fullscreen',
  'qualityauto',
  'cc/subtitlesoff',
  'english (auto-generated)',
  'off',
  'english (auto-generated) cc',
]);

const embedTable = articleEmbeds as Record<string, ArticleEmbed[]>;

export function sectionDomId(index: number) {
  return `section-${index}`;
}

export function isTocHeading(text: string | undefined) {
  return (text || '').trim().toLowerCase() === 'table of contents';
}

export function getArticleEmbeds(slug: string | undefined): ArticleEmbed[] {
  if (!slug) return [];
  const list = embedTable[slug];
  if (!list) return [];
  return list.filter(
    (item) => (item.provider === 'vimeo' || item.provider === 'youtube') && item.id,
  );
}

function normHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(the|a|an)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function looseNorm(value: string) {
  return value
    .toLowerCase()
    .replace(/\.png/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isStepHeading(text: string) {
  return /^step\s*\d+\b/i.test(text.trim());
}

function isPlayerChromeText(text: string) {
  const trimmed = text.trim();
  if (PLAYER_CHROME.has(trimmed.toLowerCase())) return true;
  return /^\d{1,2}:\d{2}$/.test(trimmed);
}

function isVimeoThumb(block: ArticleBlock | undefined) {
  return block?.type === 'image' && /vimeocdn\.com\/video\//.test(block.src || '');
}

function isVimeoTitle(block: ArticleBlock | undefined) {
  return block?.type === 'p' && /\son Vimeo$/i.test((block.text || '').trim());
}

function isYoutubeSubscriberLine(block: ArticleBlock | undefined) {
  return block?.type === 'p' && (block.text || '').trim() === 'myeatOS837 subscribers';
}

function isYoutubeTitle(block: ArticleBlock | undefined) {
  return block?.type === 'p' && /\smyeatOS$/i.test((block.text || '').trim());
}

function vimeoLocalTitle(text: string) {
  return text
    .replace(/\s+from eatOS - Restaurants Made Simple on Vimeo$/i, '')
    .replace(/\s+on Vimeo$/i, '')
    .trim();
}

function youtubeLocalTitle(text: string) {
  return text
    .replace(/\s+(from|using) eatOS (Dashboard|Point of Sale) myeatOS$/i, '')
    .replace(/\s+myeatOS$/i, '')
    .trim();
}

function posterSrc(src: string) {
  try {
    const url = new URL(src);
    url.searchParams.set('mw', '1280');
    url.searchParams.set('q', '85');
    return url.toString();
  } catch {
    return src.replace(/([?&])mw=\d+/i, '$1mw=1280');
  }
}

function isTocCrumb(text: string, headingNorms: Set<string>) {
  const normalized = normHeading(text);
  if (!normalized) return false;
  if (headingNorms.has(normalized)) return true;
  if (normalized.length < 12) return false;
  for (const heading of headingNorms) {
    if (heading.length < 12) continue;
    if (heading.includes(normalized) || normalized.includes(heading)) return true;
  }
  return false;
}

function titleScore(localTitle: string, embedTitle: string) {
  const local = looseNorm(localTitle);
  const embed = looseNorm(embedTitle);
  if (!local || !embed) return 0;
  if (local === embed) return 100;
  if (local.includes(embed) || embed.includes(local)) return 80;
  const words = local.split(' ').filter((word) => word.length > 3);
  const overlap = words.filter((word) => embed.includes(word)).length;
  return overlap >= 2 ? 50 + overlap : 0;
}

function takeEmbed(provider: 'vimeo' | 'youtube', localTitle: string, embeds: ArticleEmbed[], used: Set<number>) {
  let bestIndex = -1;
  let bestScore = 0;
  embeds.forEach((embed, index) => {
    if (used.has(index) || embed.provider !== provider) return;
    const score = titleScore(localTitle, embed.title);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });
  if (bestIndex >= 0) {
    used.add(bestIndex);
    return embeds[bestIndex];
  }
  const sequential = embeds.findIndex((embed, index) => !used.has(index) && embed.provider === provider);
  if (sequential >= 0) {
    used.add(sequential);
    return embeds[sequential];
  }
  return null;
}

function sectionLinks(blocks: ArticleBlock[], tocIndex: number): TocItem[] {
  const start = tocIndex >= 0 ? tocIndex + 1 : 0;
  const later = blocks
    .map((block, index) => ({ block, index }))
    .slice(start)
    .filter(
      ({ block }) =>
        (block.type === 'h2' || block.type === 'h3' || block.type === 'h4') &&
        !isTocHeading(block.text) &&
        Boolean((block.text || '').trim()),
    );
  const primary = later.filter(({ block }) => block.type === 'h2' || block.type === 'h3');
  const chosen = primary.length
    ? primary
    : later.filter(({ block }) => block.type === 'h4' && !isStepHeading(block.text || ''));
  return chosen.map(({ block, index }) => ({
    id: sectionDomId(index),
    text: (block.text || '').trim(),
    level: block.type as TocItem['level'],
  }));
}

export function prepareArticle(blocks: ArticleBlock[] = [], embeds: ArticleEmbed[] = []): PreparedNode[] {
  const tocIndex = blocks.findIndex(
    (block) =>
      (block.type === 'h2' || block.type === 'h3' || block.type === 'h4') && isTocHeading(block.text),
  );
  const headingNorms = new Set(
    blocks
      .filter((block) => block.type === 'h2' || block.type === 'h3' || block.type === 'h4')
      .map((block) => normHeading(block.text || ''))
      .filter(Boolean),
  );

  const skip = new Set<number>();
  if (tocIndex >= 0) {
    for (let index = tocIndex + 1; index < blocks.length; index += 1) {
      const block = blocks[index];
      if (block.type !== 'p') break;
      if (!isTocCrumb(block.text || '', headingNorms)) break;
      skip.add(index);
    }
  }

  const videos = new Map<number, PreparedNode>();
  const usedEmbeds = new Set<number>();

  blocks.forEach((block, index) => {
    if (isVimeoThumb(block)) {
      const previous = blocks[index - 1];
      const localTitle = isVimeoTitle(previous) ? vimeoLocalTitle(previous?.text || '') : '';
      if (isVimeoTitle(previous)) skip.add(index - 1);
      skip.add(index);
      for (let cursor = index + 1; cursor < blocks.length; cursor += 1) {
        const next = blocks[cursor];
        if (next.type !== 'p' || !isPlayerChromeText(next.text || '')) break;
        skip.add(cursor);
      }
      const embed = takeEmbed('vimeo', localTitle, embeds, usedEmbeds);
      videos.set(index, {
        kind: 'video',
        provider: embed?.provider ?? null,
        id: embed?.id ?? null,
        title: embed?.title || localTitle || 'eatOS tutorial video',
        posterSrc: block.src ? posterSrc(block.src) : null,
      });
      return;
    }

    if (isYoutubeSubscriberLine(block)) {
      const previous = blocks[index - 1];
      const localTitle = isYoutubeTitle(previous) ? youtubeLocalTitle(previous?.text || '') : '';
      if (isYoutubeTitle(previous)) skip.add(index - 1);
      skip.add(index);
      const embed = takeEmbed('youtube', localTitle, embeds, usedEmbeds);
      videos.set(index, {
        kind: 'video',
        provider: embed?.provider ?? 'youtube',
        id: embed?.id ?? null,
        title: embed?.title || localTitle || 'eatOS tutorial video',
        posterSrc: null,
      });
    }
  });

  const tocItems = tocIndex >= 0 ? sectionLinks(blocks, tocIndex) : [];
  const nodes: PreparedNode[] = [];

  blocks.forEach((block, index) => {
    if (videos.has(index)) {
      nodes.push(videos.get(index)!);
      return;
    }
    if (skip.has(index)) return;
    if (index === tocIndex) {
      nodes.push({ kind: 'toc', items: tocItems });
      return;
    }
    nodes.push({ kind: 'block', index, block });
  });

  return nodes;
}
