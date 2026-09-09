/** Build grounded article context for the model (size-capped). */

const MAX_CONTEXT_CHARS = 12_000;
const MAX_ARTICLES = 4;

export type ArticleLike = {
  slug?: string;
  title?: string;
  categoryTitle?: string;
  excerpt?: string;
  answer?: string;
  steps?: string[];
};

export type FactLike = {
  id?: string;
  title?: string;
  body?: string;
};

export function articleIds(articles: ArticleLike[]): string {
  return articles
    .map((a) => a.slug)
    .filter(Boolean)
    .join(',');
}

export function slimSource(entry: ArticleLike) {
  return {
    slug: entry.slug ?? '',
    title: entry.title ?? '',
    categoryTitle: entry.categoryTitle ?? '',
    excerpt: entry.excerpt ?? '',
  };
}

export function buildArticleContext(articles: ArticleLike[], facts: FactLike[] = []): string {
  const parts: string[] = [];
  let used = 0;

  for (const fact of facts.slice(0, 2)) {
    const block = `FACT: ${fact.title ?? ''}\n${fact.body ?? ''}`;
    if (used + block.length > MAX_CONTEXT_CHARS) break;
    parts.push(block);
    used += block.length;
  }

  for (const article of articles.slice(0, MAX_ARTICLES)) {
    const steps =
      Array.isArray(article.steps) && article.steps.length
        ? `\nSteps:\n- ${article.steps.join('\n- ')}`
        : '';
    const block = [
      `ARTICLE slug=${article.slug ?? ''}`,
      `Title: ${article.title ?? ''}`,
      `Category: ${article.categoryTitle ?? ''}`,
      `Excerpt: ${article.excerpt ?? ''}`,
      `Answer: ${article.answer ?? ''}${steps}`,
    ].join('\n');
    if (used + block.length > MAX_CONTEXT_CHARS) {
      const room = Math.max(0, MAX_CONTEXT_CHARS - used - 40);
      if (room > 200) {
        parts.push(`${block.slice(0, room)}\n[truncated]`);
      }
      break;
    }
    parts.push(block);
    used += block.length;
  }

  return parts.join('\n\n---\n\n');
}
