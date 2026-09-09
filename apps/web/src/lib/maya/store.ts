import { execute, queryOne } from '@/lib/db/client';

const CACHE_TTL_HOURS = 24;

export type CachedMayaAnswer = {
  answer_json: string;
  article_ids: string | null;
  model: string | null;
};

export async function readChatCache(questionHash: string): Promise<CachedMayaAnswer | null> {
  try {
    return await queryOne<CachedMayaAnswer>(
      `SELECT answer_json, article_ids, model
       FROM maya_chat_cache
       WHERE question_hash = ? AND expires_at > datetime('now')`,
      [questionHash],
    );
  } catch {
    return null;
  }
}

export async function writeChatCache(opts: {
  questionHash: string;
  answerJson: string;
  articleIds: string;
  model: string | null;
}): Promise<void> {
  try {
    await execute(
      `INSERT INTO maya_chat_cache (question_hash, answer_json, article_ids, model, expires_at)
       VALUES (?, ?, ?, ?, datetime('now', '+${CACHE_TTL_HOURS} hours'))
       ON CONFLICT(question_hash) DO UPDATE SET
         answer_json = excluded.answer_json,
         article_ids = excluded.article_ids,
         model = excluded.model,
         created_at = datetime('now'),
         expires_at = excluded.expires_at`,
      [opts.questionHash, opts.answerJson, opts.articleIds, opts.model],
    );
  } catch (error) {
    console.error('maya_chat_cache write failed', error);
  }
}

export async function writeChatLog(opts: {
  id: string;
  traceId: string;
  questionHash: string;
  model: string | null;
  inputTokens: number | null;
  outputTokens: number | null;
  latencyMs: number;
  costUsd: number | null;
  articleIds: string;
  cacheHit: boolean;
}): Promise<void> {
  try {
    await execute(
      `INSERT INTO maya_chat_logs (
         id, trace_id, question_hash, model,
         input_tokens, output_tokens, latency_ms, cost_usd,
         article_ids, cache_hit
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        opts.id,
        opts.traceId,
        opts.questionHash,
        opts.model,
        opts.inputTokens,
        opts.outputTokens,
        opts.latencyMs,
        opts.costUsd,
        opts.articleIds,
        opts.cacheHit ? 1 : 0,
      ],
    );
  } catch (error) {
    console.error('maya_chat_logs write failed', error);
  }
}
