import { fail, ok, readJson } from '@/lib/api';
import { adminFail, requireAdmin } from '@/lib/admin/guard';
import { suggestProductCatalogFields } from '@/lib/ai/catalog';

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const body = (await readJson(request)) || {};
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) return fail('validation_failed', 'title is required.');

  try {
    const { suggestion, meta } = await suggestProductCatalogFields({
      title,
      description_html:
        typeof body.description_html === 'string' ? body.description_html : undefined,
      vendor: typeof body.vendor === 'string' ? body.vendor : null,
      product_type: typeof body.product_type === 'string' ? body.product_type : null,
    });

    return ok({
      ...suggestion,
      ai_used: Boolean(meta),
    });
  } catch (error) {
    console.error('product catalog ai failed', error);
    return fail('ai_failed', 'Could not generate catalog suggestions.', 500);
  }
}
