import { fail, ok, readJson, newId } from '@/lib/api';
import { composeReply, retrieve } from '@/app/components/agent/retrieval';
import { articleIds, buildArticleContext, slimSource } from '@/lib/maya/context';
import { hashQuestion } from '@/lib/maya/hash';
import {
  chatCompletion,
  getOpenAIKey,
  mayaSystemPrompt,
  parseMayaModelJson,
  type ChatMessage,
} from '@/lib/maya/openai';
import { readChatCache, writeChatCache, writeChatLog } from '@/lib/maya/store';

type AssistantReply = {
  kind: string;
  question?: string;
  answer?: string;
  outline?: string[];
  source?: Record<string, unknown>;
  related?: Record<string, unknown>[];
  facts?: Record<string, unknown>[];
  product?: unknown;
};

type ChatPayload = {
  answer: string;
  sources: ReturnType<typeof slimSource>[];
  trace_id: string;
  cache_hit: boolean;
  reply: AssistantReply;
};

let indexPromise: Promise<unknown> | null = null;

function loadIndex() {
  if (!indexPromise) {
    indexPromise = import('@/app/components/agent/assistantIndex.generated.json').then(
      (m) => (m as { default?: unknown }).default ?? m,
    );
  }
  return indexPromise;
}

function answerTextFromReply(reply: AssistantReply): string {
  if (reply.kind === 'answer') return String(reply.answer ?? '');
  if (reply.kind === 'facts') {
    return (reply.facts ?? [])
      .map((f) => `${String(f.title ?? '')}: ${String(f.body ?? '')}`)
      .join('\n\n');
  }
  return 'I could not find a guide that answers that confidently, so I will not guess. I can get you to the right person instead.';
}

function sourcesFromReply(reply: AssistantReply) {
  const out: ReturnType<typeof slimSource>[] = [];
  if (reply.kind === 'answer' && reply.source) out.push(slimSource(reply.source));
  for (const entry of reply.related ?? []) out.push(slimSource(entry));
  return out;
}

function toPayload(reply: AssistantReply, traceId: string, cacheHit: boolean): ChatPayload {
  return {
    answer: answerTextFromReply(reply),
    sources: sourcesFromReply(reply),
    trace_id: traceId,
    cache_hit: cacheHit,
    reply,
  };
}

function sanitizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) return [];
  const out: ChatMessage[] = [];
  for (const turn of history as { role?: string; content?: string }[]) {
    const content = typeof turn?.content === 'string' ? turn.content.trim() : '';
    if (!content) continue;
    const role = turn.role === 'assistant' || turn.role === 'agent' ? 'assistant' : 'user';
    out.push({ role, content: content.slice(0, 2000) });
    if (out.length >= 8) break;
  }
  return out;
}

function groundedReplyFromModel(opts: {
  question: string;
  known: boolean;
  answer: string;
  results: Record<string, unknown>[];
  facts: Record<string, unknown>[];
  product: unknown;
  localReply: AssistantReply;
}): AssistantReply {
  const { question, known, answer, results, facts, product, localReply } = opts;
  const [best, ...rest] = results;

  // Never claim a grounded answer without a supporting article.
  if (known && best) {
    return {
      kind: 'answer',
      question,
      answer,
      outline: Array.isArray(best.steps) ? (best.steps as string[]) : [],
      source: best,
      related: rest.slice(0, 3),
      facts,
      product,
    };
  }

  // Model declined or lacked sources: keep platform facts, otherwise hand off.
  if (localReply.kind === 'facts') return localReply;

  return {
    kind: 'miss',
    question,
    related: results.slice(0, 3),
    product,
  };
}

export async function POST(request: Request) {
  const started = Date.now();
  const body = (await readJson(request)) || {};
  const question = typeof body.question === 'string' ? body.question.trim() : '';
  if (!question || question.length > 2000) {
    return fail('validation_failed', 'question is required (max 2000 characters).');
  }

  const traceId =
    typeof body.trace_id === 'string' && body.trace_id.trim()
      ? body.trace_id.trim().slice(0, 80)
      : newId('maya');
  const history = sanitizeHistory(body.history);
  const questionHash = await hashQuestion(question);
  const logId = newId('mlog');

  let payload: ChatPayload | null = null;
  let model: string | null = null;
  let inputTokens: number | null = null;
  let outputTokens: number | null = null;
  let costUsd: number | null = null;
  let cacheHit = false;
  let ids = '';

  try {
    const cached = await readChatCache(questionHash);
    if (cached?.answer_json) {
      try {
        const parsed = JSON.parse(cached.answer_json) as ChatPayload;
        if (parsed?.reply && typeof parsed.answer === 'string') {
          payload = { ...parsed, trace_id: traceId, cache_hit: true };
          cacheHit = true;
          model = cached.model;
          ids = cached.article_ids || '';
        }
      } catch {
        // ignore corrupt cache
      }
    }

    if (!payload) {
      const index = await loadIndex();
      const localReply = composeReply(question, index) as AssistantReply;
      const { results, facts, product } = retrieve(question, index) as {
        results: Record<string, unknown>[];
        facts: Record<string, unknown>[];
        product: unknown;
      };
      ids = articleIds(results);

      const apiKey = await getOpenAIKey();
      if (!apiKey) {
        payload = toPayload(localReply, traceId, false);
        model = 'composeReply';
      } else {
        try {
          const context = buildArticleContext(results, facts);
          const userBlock = [
            `Visitor question: ${question}`,
            '',
            'Help-article context:',
            context || '(no matching articles)',
          ].join('\n');

          const messages: ChatMessage[] = [
            { role: 'system', content: mayaSystemPrompt() },
            ...history,
            { role: 'user', content: userBlock },
          ];

          const completion = await chatCompletion(apiKey, messages);
          model = completion.model;
          inputTokens = completion.inputTokens;
          outputTokens = completion.outputTokens;
          costUsd = completion.costUsd;

          const { known, answer } = parseMayaModelJson(completion.text);
          const reply = groundedReplyFromModel({
            question,
            known,
            answer,
            results,
            facts,
            product,
            localReply,
          });
          payload = toPayload(reply, traceId, false);
          // Surface the model's handoff wording on misses when present.
          if (reply.kind === 'miss' && answer) {
            payload = { ...payload, answer };
          }
        } catch (error) {
          console.error('maya openai failed; falling back to composeReply', error);
          payload = toPayload(localReply, traceId, false);
          model = 'composeReply-fallback';
          inputTokens = null;
          outputTokens = null;
          costUsd = null;
        }
      }

      await writeChatCache({
        questionHash,
        answerJson: JSON.stringify({ ...payload, cache_hit: false }),
        articleIds: ids,
        model,
      });
    }
  } catch (error) {
    console.error('maya chat failed', error);
    try {
      const index = await loadIndex();
      payload = toPayload(composeReply(question, index) as AssistantReply, traceId, false);
      model = model || 'composeReply-error';
    } catch {
      return fail('chat_failed', 'The support assistant is temporarily unavailable.', 503);
    }
  }

  const latencyMs = Date.now() - started;
  await writeChatLog({
    id: logId,
    traceId,
    questionHash,
    model,
    inputTokens,
    outputTokens,
    latencyMs,
    costUsd,
    articleIds: ids,
    cacheHit,
  });

  return ok(payload);
}
