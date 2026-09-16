import { describe, expect, it } from 'vitest';
import {
  buildAdminIdentity,
  canApproveAnyPublishRequest,
  canApprovePublishForContentType,
  canPublishContent,
  hasCapability,
  normalizeAssignedRoles,
  parseRoles,
  roleSummary,
} from '@/lib/admin/permissions';
import { isSignupEmailAllowed } from '@/lib/auth/allowlist';

describe('signup allowlist', () => {
  it('allows only approved emails (case-insensitive)', () => {
    expect(isSignupEmailAllowed('PMT@eatos.com')).toBe(true);
    expect(isSignupEmailAllowed('pmt@eigital.com')).toBe(true);
    expect(isSignupEmailAllowed('jaspreet.singh@eigital.com')).toBe(true);
    expect(isSignupEmailAllowed('random@example.com')).toBe(false);
  });
});

describe('RBAC permissions', () => {
  it('maps legacy owner/editor roles', () => {
    expect(parseRoles(null, 'owner')).toEqual(['admin']);
    expect(parseRoles(null, 'editor')).toEqual(['draft_editor']);
  });

  it('normalizes multiple developer tiers to the highest level', () => {
    expect(
      normalizeAssignedRoles(['developer_view', 'developer', 'developer_publish', 'blogger']),
    ).toEqual(['blogger', 'developer_publish']);
  });

  it('grants superadmin all capabilities only for pmt@eatos.com', () => {
    const superadmin = buildAdminIdentity('1', 'pmt@eatos.com', '["admin"]', 'admin');
    expect(superadmin.isSuperadmin).toBe(true);
    expect(hasCapability(superadmin, 'publish:approve')).toBe(true);

    const admin = buildAdminIdentity('2', 'pmt@eigital.com', '["admin"]', 'admin');
    expect(admin.isSuperadmin).toBe(false);
    expect(hasCapability(admin, 'publish:approve')).toBe(true);
    expect(hasCapability(admin, 'users:manage')).toBe(true);
  });

  it('restricts draft_editor from publishing', () => {
    const editor = buildAdminIdentity('3', 'jaspreet.singh@eigital.com', '["draft_editor"]');
    expect(hasCapability(editor, 'blog:write')).toBe(true);
    expect(hasCapability(editor, 'blog:publish')).toBe(false);
    expect(hasCapability(editor, 'shop:write')).toBe(false);
  });

  it('developer_view is read-only across content areas', () => {
    const viewer = buildAdminIdentity(
      '4',
      'viewer@eigital.com',
      '["developer_view"]',
    );
    expect(hasCapability(viewer, 'blog:read')).toBe(true);
    expect(hasCapability(viewer, 'news:read')).toBe(true);
    expect(hasCapability(viewer, 'shop:read')).toBe(true);
    expect(hasCapability(viewer, 'blog:write')).toBe(false);
    expect(hasCapability(viewer, 'shop:write')).toBe(false);
    expect(hasCapability(viewer, 'media:manage')).toBe(false);
    expect(roleSummary(viewer).draftOnly).toBe(true);
  });

  it('developer (draft) can write drafts but not publish live', () => {
    const developer = buildAdminIdentity(
      '5',
      'jaspreet.singh@eigital.com',
      '["developer"]',
    );
    expect(hasCapability(developer, 'blog:write')).toBe(true);
    expect(hasCapability(developer, 'news:write')).toBe(true);
    expect(hasCapability(developer, 'shop:write')).toBe(true);
    expect(hasCapability(developer, 'media:manage')).toBe(true);
    expect(hasCapability(developer, 'blog:publish')).toBe(false);
    expect(hasCapability(developer, 'publish:approve')).toBe(false);
    expect(roleSummary(developer).draftOnly).toBe(true);
    expect(roleSummary(developer).canApprovePublish).toBe(false);
  });

  it('developer_publish can publish live but not approve others or manage users', () => {
    const devPub = buildAdminIdentity(
      '6',
      'devpub@eigital.com',
      '["developer_publish"]',
    );
    expect(hasCapability(devPub, 'blog:write')).toBe(true);
    expect(hasCapability(devPub, 'blog:publish')).toBe(true);
    expect(hasCapability(devPub, 'news:publish')).toBe(true);
    expect(hasCapability(devPub, 'shop:publish')).toBe(true);
    expect(hasCapability(devPub, 'users:manage')).toBe(false);
    expect(hasCapability(devPub, 'publish:approve')).toBe(false);
    expect(roleSummary(devPub).draftOnly).toBe(false);
    expect(canApprovePublishForContentType(devPub, 'blog')).toBe(false);
    expect(canApproveAnyPublishRequest(devPub)).toBe(false);
  });

  it('scopes publisher approval to their content areas', () => {
    const publisher = buildAdminIdentity('7', 'pub@eigital.com', '["publisher"]');
    expect(canPublishContent(publisher, 'blog')).toBe(true);
    expect(canApprovePublishForContentType(publisher, 'blog')).toBe(true);
    expect(canApprovePublishForContentType(publisher, 'shop')).toBe(true);
    expect(canApproveAnyPublishRequest(publisher)).toBe(true);
  });

  it('allows blogger to write but not approve publish queue items', () => {
    const blogger = buildAdminIdentity('8', 'blog@eigital.com', '["blogger"]');
    expect(hasCapability(blogger, 'blog:write')).toBe(true);
    expect(canPublishContent(blogger, 'blog')).toBe(false);
    expect(canApprovePublishForContentType(blogger, 'blog')).toBe(false);
    expect(canApproveAnyPublishRequest(blogger)).toBe(false);
  });
});
