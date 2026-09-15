import { fail, ok, readJson } from '@/lib/api';
import { adminFail } from '@/lib/admin/guard';
import { requireMayaAgent } from '@/lib/maya/helpdesk/guard';
import { createCannedReply, listCannedReplies } from '@/lib/maya/helpdesk/store';

export async function GET(request: Request) {
  try {
    await requireMayaAgent(request, { minRole: 'viewer' });
    const url = new URL(request.url);
    const includeInactive = url.searchParams.get('all') === '1';
    const replies = await listCannedReplies(!includeInactive);
    return ok(replies);
  } catch (error) {
    return adminFail(error);
  }
}

export async function POST(request: Request) {
  try {
    const ctx = await requireMayaAgent(request, { minRole: 'agent' });
    const body = (await readJson(request)) || {};
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const bodyText = typeof body.body_text === 'string' ? body.body_text.trim() : '';
    const shortcut = typeof body.shortcut === 'string' ? body.shortcut.trim() : null;
    const category = typeof body.category === 'string' ? body.category.trim() : null;
    const articleSlugs = Array.isArray(body.article_slugs)
      ? body.article_slugs.filter((s: unknown) => typeof s === 'string')
      : [];

    if (!title) return fail('validation_failed', 'title is required.');
    if (!bodyText) return fail('validation_failed', 'body_text is required.');

    const reply = await createCannedReply({
      title,
      bodyText,
      shortcut,
      category,
      articleSlugs,
      createdBy: ctx.agent.id,
    });
    return ok(reply, 201);
  } catch (error) {
    return adminFail(error);
  }
}
