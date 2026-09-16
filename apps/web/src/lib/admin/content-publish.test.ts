import { describe, expect, it, vi, beforeEach } from 'vitest';
import { buildAdminIdentity } from '@/lib/admin/permissions';
import { resolvePublishStatus } from '@/lib/admin/content-publish';

vi.mock('@/lib/db/client', () => ({
  queryOne: vi.fn(),
  execute: vi.fn(),
}));

import { queryOne, execute } from '@/lib/db/client';

describe('resolvePublishStatus', () => {
  beforeEach(() => {
    vi.mocked(queryOne).mockReset();
    vi.mocked(execute).mockReset();
  });

  it('queues developer publish attempts for approval', async () => {
    const developer = buildAdminIdentity(
      'dev-1',
      'jaspreet.singh@eigital.com',
      '["developer"]',
    );
    vi.mocked(queryOne).mockResolvedValue(null);
    vi.mocked(execute).mockResolvedValue(undefined);

    const result = await resolvePublishStatus(
      developer,
      'blog',
      'my-post',
      'published',
      'draft',
    );

    expect(result.status).toBe('pending_publish');
    expect(result.queuedForApproval).toBe(true);
    expect(execute).toHaveBeenCalled();
  });

  it('lets publisher go live without queueing', async () => {
    const publisher = buildAdminIdentity('pub-1', 'pub@eigital.com', '["publisher"]');

    const result = await resolvePublishStatus(
      publisher,
      'blog',
      'my-post',
      'published',
      'draft',
    );

    expect(result.status).toBe('published');
    expect(result.queuedForApproval).toBeUndefined();
    expect(execute).not.toHaveBeenCalled();
  });

  it('lets developer_publish go live without queueing', async () => {
    const devPub = buildAdminIdentity(
      'devpub-1',
      'devpub@eigital.com',
      '["developer_publish"]',
    );

    const result = await resolvePublishStatus(
      devPub,
      'shop',
      'widget',
      'published',
      'draft',
    );

    expect(result.status).toBe('published');
    expect(result.queuedForApproval).toBeUndefined();
    expect(execute).not.toHaveBeenCalled();
  });

  it('queues developer_view publish attempts even though they cannot write', async () => {
    const viewer = buildAdminIdentity('view-1', 'viewer@eigital.com', '["developer_view"]');
    vi.mocked(queryOne).mockResolvedValue(null);
    vi.mocked(execute).mockResolvedValue(undefined);

    const result = await resolvePublishStatus(
      viewer,
      'blog',
      'my-post',
      'published',
      'draft',
    );

    expect(result.status).toBe('pending_publish');
    expect(result.queuedForApproval).toBe(true);
  });

  it('preserves non-publish status changes for developers', async () => {
    const developer = buildAdminIdentity(
      'dev-2',
      'jaspreet.singh@eigital.com',
      '["developer"]',
    );

    const result = await resolvePublishStatus(
      developer,
      'shop',
      'widget',
      'draft',
      'pending_publish',
    );

    expect(result.status).toBe('draft');
    expect(execute).not.toHaveBeenCalled();
  });
});
