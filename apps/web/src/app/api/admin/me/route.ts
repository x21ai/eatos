import { adminFail, requireAdmin } from '@/lib/admin/guard';
import { hasCapability, roleSummary } from '@/lib/admin/permissions';

export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    const summary = roleSummary(admin);
    const capabilities = [
      'users:manage',
      'users:invite',
      'blog:read',
      'blog:write',
      'blog:publish',
      'news:read',
      'news:write',
      'news:publish',
      'shop:read',
      'shop:write',
      'shop:publish',
      'orders:read',
      'orders:manage',
      'media:manage',
      'publish:approve',
      'maya:access',
      'maya:manage',
      'help:access',
      'help:manage',
    ] as const;

    const granted = capabilities.filter((c) => hasCapability(admin, c));

    return Response.json({
      data: {
        userId: admin.userId,
        email: admin.email,
        roles: admin.roles,
        isSuperadmin: admin.isSuperadmin,
        capabilities: granted,
        permissions: summary,
      },
    });
  } catch (error) {
    return adminFail(error);
  }
}
