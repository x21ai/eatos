/** OpenAI chat completions for Maya. Key stays server-side only. */

const MODEL = 'gpt-4o-mini';
const MAX_OUTPUT_TOKENS = 500;

// Approximate list prices (USD per 1M tokens) for cost logging.
const INPUT_USD_PER_M = 0.15;
const OUTPUT_USD_PER_M = 0.6;

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export type OpenAIChatResult = {
  text: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
};

export async function getOpenAIKey(): Promise<string | null> {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = getCloudflareContext();
    const key = (env as { OPENAI_API_KEY?: string } | undefined)?.OPENAI_API_KEY;
    return key || null;
  } catch {
    return null;
  }
}

export function estimateCostUsd(inputTokens: number, outputTokens: number): number {
  return (inputTokens * INPUT_USD_PER_M + outputTokens * OUTPUT_USD_PER_M) / 1_000_000;
}

export function mayaSystemPrompt(): string {
  return [
    'You are Maya, the eatOS support agent.',
    'Answer ONLY from the supplied help-article context.',
    'If the context is insufficient, say you do not know and offer to hand the visitor to a human specialist.',
    'Do not invent features, prices, steps, or policies that are not in the context.',
    'Be concise and practical. Prefer short paragraphs or numbered steps when the context has them.',
    'Respond with JSON only: {"known":boolean,"answer":string}',
    'Set known=true only when the context clearly supports the answer.',
    'When known=false, the answer must decline to guess and offer human handoff.',
  ].join(' ');
}

export async function chatCompletion(
  apiKey: string,
  messages: ChatMessage[],
): Promise<OpenAIChatResult> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      max_tokens: MAX_OUTPUT_TOKENS,
      response_format: { type: 'json_object' },
      messages,
    }),
  });

  if (!res.ok) {
    throw new Error(`openai_http_${res.status}`);
  }

  const data = (await res.json()) as {
    model?: string;
    choices?: { message?: { content?: string } }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };

  const text = data.choices?.[0]?.message?.content?.trim() ?? '';
  if (!text) throw new Error('openai_empty');

  const inputTokens = Number(data.usage?.prompt_tokens ?? 0);
  const outputTokens = Number(data.usage?.completion_tokens ?? 0);

  return {
    text,
    model: data.model || MODEL,
    inputTokens,
    outputTokens,
    costUsd: estimateCostUsd(inputTokens, outputTokens),
  };
}

export function parseMayaModelJson(raw: string): { known: boolean; answer: string } {
  try {
    const parsed = JSON.parse(raw) as { known?: unknown; answer?: unknown };
    const answer = typeof parsed.answer === 'string' ? parsed.answer.trim() : '';
    const known = Boolean(parsed.known) && answer.length > 0;
    return {
      known,
      answer:
        answer ||
        'I could not find a guide that answers that confidently, so I will not guess. I can get you to a specialist instead.',
    };
  } catch {
    return {
      known: false,
      answer:
        'I could not find a guide that answers that confidently, so I will not guess. I can get you to a specialist instead.',
    };
  }
}
