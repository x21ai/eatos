import {
  chatCompletion,
  getOpenAIKey,
  type ChatMessage,
  type OpenAIChatResult,
} from '@/lib/maya/openai';

export type ProductCatalogAiInput = {
  title: string;
  description_html?: string;
  vendor?: string | null;
  product_type?: string | null;
};

export type ProductCatalogAiSuggestion = {
  seo_title: string;
  seo_description: string;
  description_html: string | null;
};

const CATALOG_MAX_TOKENS = 800;

export function productCatalogSystemPrompt(): string {
  return [
    'You are Maya, the eatOS catalog assistant for restaurant commerce.',
    'Suggest SEO metadata and optional description improvements for a product listing.',
    'Write in clear, professional language. Do not mimic Shopify or other platform copy.',
    'Respond with JSON only:',
    '{"seo_title":string,"seo_description":string,"description_html":string|null}',
    'seo_title: concise page title, ideally under 60 characters.',
    'seo_description: meta description for search results, ideally under 160 characters.',
    'description_html: improved HTML body only when the input description is empty or weak; otherwise null.',
    'When improving description_html, keep factual tone and simple HTML (p, ul, li, strong).',
  ].join(' ');
}

export function buildProductCatalogUserPrompt(input: ProductCatalogAiInput): string {
  const plainDescription = stripHtml(input.description_html || '');
  return [
    `Product title: ${input.title.trim()}`,
    input.vendor ? `Vendor: ${input.vendor}` : null,
    input.product_type ? `Type: ${input.product_type}` : null,
    `Current description:\n${plainDescription || '(empty)'}`,
  ]
    .filter(Boolean)
    .join('\n');
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseProductCatalogAiJson(raw: string): ProductCatalogAiSuggestion {
  try {
    const parsed = JSON.parse(raw) as {
      seo_title?: unknown;
      seo_description?: unknown;
      description_html?: unknown;
    };
    const seo_title =
      typeof parsed.seo_title === 'string' ? parsed.seo_title.trim().slice(0, 120) : '';
    const seo_description =
      typeof parsed.seo_description === 'string'
        ? parsed.seo_description.trim().slice(0, 320)
        : '';
    const description_html =
      typeof parsed.description_html === 'string' && parsed.description_html.trim()
        ? parsed.description_html.trim()
        : null;
    return { seo_title, seo_description, description_html };
  } catch {
    return { seo_title: '', seo_description: '', description_html: null };
  }
}

export async function suggestProductCatalogFields(
  input: ProductCatalogAiInput,
): Promise<{ suggestion: ProductCatalogAiSuggestion; meta: OpenAIChatResult | null }> {
  const apiKey = await getOpenAIKey();
  if (!apiKey) {
    const title = input.title.trim();
    return {
      suggestion: {
        seo_title: title.slice(0, 60),
        seo_description: `Shop ${title} from eatOS — restaurant-grade hardware and software.`,
        description_html: input.description_html?.trim()
          ? null
          : `<p>${title} for modern restaurant operations.</p>`,
      },
      meta: null,
    };
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: productCatalogSystemPrompt() },
    { role: 'user', content: buildProductCatalogUserPrompt(input) },
  ];

  const result = await chatCompletion(apiKey, messages, {
    maxTokens: CATALOG_MAX_TOKENS,
    temperature: 0.3,
  });

  return {
    suggestion: parseProductCatalogAiJson(result.text),
    meta: result,
  };
}
