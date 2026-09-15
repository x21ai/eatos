import { ok } from '@/lib/api';
import { adminFail } from '@/lib/admin/guard';
import { tryGetAdmin } from '@/lib/admin/guard';
import { queryOne } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const admin = await tryGetAdmin(request);
  if (!admin) {
    return adminFail(new Error('Unauthorized'));
  }

  async function safeCount(sql: string): Promise<number> {
    try {
      const row = await queryOne<{ count: number }>(sql);
      return Number(row?.count ?? 0);
    } catch {
      return 0;
    }
  }

  const [products, orders, openChats, pendingPublish] = await Promise.all([
    safeCount(`SELECT COUNT(*) AS count FROM products`),
    safeCount(`SELECT COUNT(*) AS count FROM orders`),
    safeCount(
      `SELECT COUNT(*) AS count FROM maya_conversations WHERE status IN ('open', 'pending')`,
    ),
    safeCount(`SELECT COUNT(*) AS count FROM publish_requests WHERE status = 'pending'`),
  ]);

  return ok({
    products,
    orders,
    open_maya_conversations: openChats,
    pending_publish_requests: pendingPublish,
  });
}
