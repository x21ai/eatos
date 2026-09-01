// @ts-nocheck
// Deterministic retrieval over the generated help-center index plus the
// hand-maintained platform facts. Pure functions, no model call: an answer is
// only ever produced from text that exists in the index, and a weak match is
// reported as a miss so the agent hands off instead of guessing.

import { matchProduct, platformFacts } from './knowledge';

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'your',
  'you', 'is', 'are', 'how', 'do', 'does', 'i', 'my', 'it', 'at', 'be', 'can',
  'from', 'this', 'that', 'will', 'was', 'we', 'us', 'our', 'as', 'by', 'if',
  'then', 'me', 'not', 'what', 'why', 'when', 'where', 'get', 'got', 'need',
  'please', 'help', 'eatos', 'there', 'any',
]);

export function tokenize(text = '') {
  return String(text)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 3 && !STOP.has(token));
}

// Score is comparable across queries because it is normalized by term count,
// which is what makes a single confidence threshold meaningful.
function scoreEntry(entry, terms, phrase) {
  const title = entry.title.toLowerCase();
  const excerpt = entry.excerpt.toLowerCase();
  const answer = entry.answer.toLowerCase();
  const category = entry.categoryTitle.toLowerCase();
  const keywords = new Set(entry.keywords);

  let score = 0;
  let matched = 0;

  for (const term of terms) {
    let termScore = 0;
    if (title.includes(term)) termScore += 6;
    if (keywords.has(term)) termScore += 3;
    if (excerpt.includes(term)) termScore += 2;
    if (answer.includes(term)) termScore += 1;
    if (category.includes(term)) termScore += 1;
    if (termScore > 0) matched += 1;
    score += termScore;
  }

  if (phrase.length >= 8) {
    if (title.includes(phrase)) score += 10;
    else if (excerpt.includes(phrase) || answer.includes(phrase)) score += 4;
  }

  const coverage = terms.length ? matched / terms.length : 0;
  return { score: score * coverage, coverage };
}

export const CONFIDENT = 7;

/**
 * Searches the index for a question.
 *
 * @returns {{ results: object[], confident: boolean, product: object|null, facts: object[] }}
 */
export function retrieve(question, index) {
  const terms = Array.from(new Set(tokenize(question)));
  const phrase = String(question).toLowerCase().trim();
  const entries = index?.entries ?? [];

  if (terms.length === 0) {
    return { results: [], confident: false, product: null, facts: [] };
  }

  const scored = [];
  for (const entry of entries) {
    const { score, coverage } = scoreEntry(entry, terms, phrase);
    if (score > 0 && coverage >= 0.5) scored.push({ entry, score });
  }

  scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  const facts = platformFacts
    .map((fact) => {
      const hits = terms.filter((term) => fact.keywords.some((k) => k.includes(term) || term.includes(k)));
      return { fact, hits: hits.length };
    })
    .filter((f) => f.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 2)
    .map((f) => f.fact);

  const results = scored.slice(0, 4).map((s) => s.entry);
  const top = scored[0];

  return {
    results,
    confident: Boolean(top && top.score >= CONFIDENT),
    product: matchProduct(question),
    facts,
  };
}

/**
 * Builds the agent reply for a question. Returns a structured reply the UI
 * renders; every sentence of `answer` comes from the retrieved article.
 */
export function composeReply(question, index) {
  const { results, confident, product, facts } = retrieve(question, index);

  if (confident) {
    const [best, ...rest] = results;
    return {
      kind: 'answer',
      question,
      answer: best.answer,
      outline: best.steps,
      source: best,
      related: rest.slice(0, 3),
      facts,
      product,
    };
  }

  if (facts.length > 0) {
    return {
      kind: 'facts',
      question,
      facts,
      related: results.slice(0, 3),
      product,
    };
  }

  return {
    kind: 'miss',
    question,
    related: results.slice(0, 3),
    product,
  };
}

/** Suggestion chips shown before the visitor types anything. */
export const starterQuestions = [
  'How do I reset an employee PIN?',
  'My kitchen printer stopped printing tickets',
  'How do I add an item to my menu?',
  'How do I run an end of day report?',
];
