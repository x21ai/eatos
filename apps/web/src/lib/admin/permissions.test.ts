import { describe, expect, it } from 'vitest';
import {
  buildAdminIdentity,
  canApproveAnyPublishRequest,
  canApprovePublishForContentType,
  canPublishContent,
  hasCapability,
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

  it('allows developer to draft across blog, newsroom, shop, and media', () => {
    const developer = buildAdminIdentity(
      '4',
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

  it('scopes publisher approval to their content areas', () => {
    const publisher = buildAdminIdentity('5', 'pub@eigital.com', '["publisher"]');
    expect(canPublishContent(publisher, 'blog')).toBe(true);
    expect(canApprovePublishForContentType(publisher, 'blog')).toBe(true);
    expect(canApprovePublishForContentType(publisher, 'shop')).toBe(true);
    expect(canApproveAnyPublishRequest(publisher)).toBe(true);
  });

  it('allows blogger to write but not approve publish queue items', () => {
    const blogger = buildAdminIdentity('6', 'blog@eigital.com', '["blogger"]');
    expect(hasCapability(blogger, 'blog:write')).toBe(true);
    expect(canPublishContent(blogger, 'blog')).toBe(false);
    expect(canApprovePublishForContentType(blogger, 'blog')).toBe(false);
    expect(canApproveAnyPublishRequest(blogger)).toBe(false);
  });
});
