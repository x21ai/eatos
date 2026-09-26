import { describe, expect, it } from 'vitest';
import articles from './articles.generated.json';
import { getArticleEmbeds, prepareArticle, type ArticleBlock } from './articleBodyModel';

type Fixture = {
  slug: string;
  blocks: ArticleBlock[];
};

const library = articles as Fixture[];

function article(slug: string) {
  const found = library.find((item) => item.slug === slug);
  if (!found) throw new Error(`missing article ${slug}`);
  return found;
}

function prepared(slug: string) {
  const found = article(slug);
  return prepareArticle(found.blocks, getArticleEmbeds(slug));
}

describe('prepareArticle', () => {
  it('fills a blank Table of Contents with links to later sections', () => {
    const nodes = prepared('customer-onboarding-account-setup-guide-1m3u0hd');
    const toc = nodes.find((node) => node.kind === 'toc');
    expect(toc && toc.kind === 'toc' ? toc.items.map((item) => item.text) : []).toEqual([
      'Getting Started',
      'Point of Sale Settings',
    ]);
    expect(toc && toc.kind === 'toc' ? toc.items.every((item) => item.id.startsWith('section-')) : false).toBe(
      true,
    );
  });

  it('replaces a scraped Vimeo player with the real video', () => {
    const nodes = prepared('customer-onboarding-account-setup-guide-1m3u0hd');
    const video = nodes.find((node) => node.kind === 'video');
    expect(video).toMatchObject({
      kind: 'video',
      provider: 'vimeo',
      id: '996627511',
      title: 'Creating Your eatOS Dashboard Account',
    });
    const dumped = nodes
      .filter((node) => node.kind === 'block')
      .map((node) => (node.kind === 'block' ? node.block.text || node.block.src || '' : ''));
    expect(dumped.some((text) => text.includes('Playing in picture-in-picture'))).toBe(false);
    expect(dumped.some((text) => text.includes('QualityAuto'))).toBe(false);
    expect(dumped.some((text) => text.includes('vimeocdn.com'))).toBe(false);
  });

  it('pairs a later Vimeo with its own embed when an earlier video was not imported', () => {
    const nodes = prepared('dashboard-workforce-department-1w7ht32');
    const videos = nodes.filter((node) => node.kind === 'video');
    expect(videos.map((node) => (node.kind === 'video' ? node.id : null))).toEqual(['989548499', '990690936']);
  });

  it('drops plain-text contents lines that repeat real headings', () => {
    const nodes = prepared('customizing-your-point-of-purchase-app-51647x');
    const toc = nodes.find((node) => node.kind === 'toc');
    expect(toc && toc.kind === 'toc' ? toc.items.some((item) => item.text === 'Font Size') : false).toBe(true);
    const paragraphs = nodes.filter(
      (node) => node.kind === 'block' && node.block.type === 'p' && node.block.text === 'Font Size',
    );
    expect(paragraphs).toHaveLength(0);
  });

  it('clears player chrome and plays every imported video in the help center', () => {
    for (const entry of library) {
      const embeds = getArticleEmbeds(entry.slug);
      const hasVideo = entry.blocks.some(
        (block) =>
          (block.type === 'image' && /vimeocdn\.com\/video\//.test(block.src || '')) ||
          block.text === 'myeatOS837 subscribers',
      );
      if (!hasVideo && !entry.blocks.some((block) => (block.text || '').trim().toLowerCase() === 'table of contents')) {
        continue;
      }
      const nodes = prepareArticle(entry.blocks, embeds);
      const texts = nodes.flatMap((node) => {
        if (node.kind === 'block') return [node.block.text || '', node.block.src || ''];
        if (node.kind === 'video') return [node.title];
        return [];
      });
      expect(texts.some((text) => text.includes('Playing in picture-in-picture'))).toBe(false);
      expect(texts.some((text) => text.includes('QualityAuto'))).toBe(false);
      expect(texts.some((text) => text.includes('myeatOS837 subscribers'))).toBe(false);
      expect(texts.some((text) => text.includes('vimeocdn.com'))).toBe(false);

      const placeholders = entry.blocks.filter(
        (block) =>
          (block.type === 'image' && /vimeocdn\.com\/video\//.test(block.src || '')) ||
          block.text === 'myeatOS837 subscribers',
      ).length;
      const videos = nodes.filter((node) => node.kind === 'video');
      expect(videos).toHaveLength(placeholders);
      expect(videos.every((node) => node.kind === 'video' && node.id)).toBe(true);

      const tocHeading = entry.blocks.findIndex(
        (block) => (block.text || '').trim().toLowerCase() === 'table of contents',
      );
      if (tocHeading >= 0) {
        const toc = nodes.find((node) => node.kind === 'toc');
        const laterSections = entry.blocks.slice(tocHeading + 1).some(
          (block) => block.type === 'h2' || block.type === 'h3' || block.type === 'h4',
        );
        if (laterSections) {
          expect(toc && toc.kind === 'toc' ? toc.items.length : 0).toBeGreaterThan(0);
        }
      }
    }
  });
});
