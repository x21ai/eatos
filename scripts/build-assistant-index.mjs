// Builds the compact, lazy-loaded index the support agent answers from.
//
// The agent must never invent an answer, so the index carries the real article
// text: title, excerpt, the opening paragraphs and any step list found in the
// article body. Generated from the migrated help center so the agent and the
// published articles can never drift apart.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ARTICLES = path.join(
  ROOT,
  "apps/web/src/app/support/articles.generated.json",
);
const OUT = path.join(
  ROOT,
  "apps/web/src/app/components/agent/assistantIndex.generated.json",
);

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "your",
  "you", "is", "are", "how", "do", "i", "my", "it", "at", "be", "can", "from",
  "this", "that", "will", "was", "we", "us", "our", "as", "by", "if", "then",
]);

const clean = (value) =>
  String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (value, max) => {
  const text = clean(value);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" "));
  return `${cut.slice(0, lastStop > max * 0.5 ? lastStop : max).trim()}...`;
};

function keywordsFor(article) {
  const source = `${article.title} ${article.categoryTitle} ${article.excerpt}`;
  const seen = new Set();
  for (const raw of source.toLowerCase().split(/[^a-z0-9]+/)) {
    if (raw.length < 3 || STOP.has(raw)) continue;
    seen.add(raw);
    if (seen.size >= 24) break;
  }
  return Array.from(seen);
}

// Articles carry paragraphs and headings only, so the agent quotes the opening
// paragraphs as the answer and uses the headings as the guide outline.
function summarize(blocks) {
  const paragraphs = [];
  const steps = [];
  const seenStep = new Set();

  for (const block of Array.isArray(blocks) ? blocks : []) {
    const text = clean(block?.text);
    const type = block?.type;

    if (type === "p" && text.length > 40 && paragraphs.length < 3) {
      paragraphs.push(text);
    }
    if ((type === "h2" || type === "h3" || type === "h4") && text && steps.length < 6) {
      const key = text.toLowerCase();
      if (key === "introduction" || key === "conclusion" || seenStep.has(key)) continue;
      seenStep.add(key);
      steps.push(truncate(text, 120));
    }
  }

  return {
    answer: truncate(paragraphs.join(" "), 520),
    steps,
  };
}

const articles = JSON.parse(readFileSync(ARTICLES, "utf8"));

const entries = articles.map((article) => {
  const { answer, steps } = summarize(article.blocks);
  return {
    slug: article.slug,
    title: clean(article.title),
    excerpt: truncate(article.excerpt, 200),
    categorySlug: article.categorySlug,
    categoryTitle: clean(article.categoryTitle),
    readMinutes: article.readMinutes,
    popularity: article.popularity,
    answer: answer || truncate(article.excerpt, 320),
    steps,
    keywords: keywordsFor(article),
  };
});

writeFileSync(
  OUT,
  `${JSON.stringify({ generatedFrom: "support/articles.generated.json", count: entries.length, entries })}\n`,
);

const bytes = readFileSync(OUT).length;
console.log(
  `assistant index: ${entries.length} articles, ${(bytes / 1024).toFixed(1)} KB -> ${path.relative(ROOT, OUT)}`,
);
