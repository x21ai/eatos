import { describe, expect, it } from 'vitest';
import {
  buildAdminIdentity,
  hasCapability,
  parseRoles,
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
    expect(hasCapability(admin, 'publish:approve')).toBe(false);
    expect(hasCapability(admin, 'users:manage')).toBe(true);
  });

  it('restricts draft_editor from publishing', () => {
    const editor = buildAdminIdentity('3', 'jaspreet.singh@eigital.com', '["draft_editor"]');
    expect(hasCapability(editor, 'blog:write')).toBe(true);
    expect(hasCapability(editor, 'blog:publish')).toBe(false);
  });
});
