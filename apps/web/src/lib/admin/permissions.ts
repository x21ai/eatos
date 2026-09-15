import { isSuperadminEmail } from '@/lib/auth/allowlist';

export type AdminRole =
  | 'superadmin'
  | 'admin'
  | 'blogger'
  | 'newsroom'
  | 'publisher'
  | 'draft_editor'
  | 'maya_agent'
  | 'help_agent';

export type Capability =
  | 'admin:access'
  | 'users:manage'
  | 'users:invite'
  | 'blog:read'
  | 'blog:write'
  | 'blog:publish'
  | 'news:read'
  | 'news:write'
  | 'news:publish'
  | 'shop:read'
  | 'shop:write'
  | 'shop:publish'
  | 'orders:read'
  | 'orders:manage'
  | 'media:manage'
  | 'publish:approve'
  | 'maya:access'
  | 'maya:manage'
  | 'help:access'
  | 'help:manage';

export const ALL_ADMIN_ROLES: AdminRole[] = [
  'superadmin',
  'admin',
  'blogger',
  'newsroom',
  'publisher',
  'draft_editor',
  'maya_agent',
  'help_agent',
];

export const ROLE_LABELS: Record<AdminRole, string> = {
  superadmin: 'Superadmin',
  admin: 'Admin',
  blogger: 'Blogger',
  newsroom: 'Newsroom',
  publisher: 'Publisher',
  draft_editor: 'Draft editor',
  maya_agent: 'Maya agent',
  help_agent: 'Help agent',
};

/** Capabilities granted by each role (superadmin email gets all via guard). */
export const ROLE_CAPABILITIES: Record<AdminRole, Capability[]> = {
  superadmin: [
    'admin:access',
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
  ],
  admin: [
    'admin:access',
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
    'maya:access',
    'maya:manage',
    'help:access',
    'help:manage',
  ],
  blogger: ['admin:access', 'blog:read', 'blog:write', 'media:manage'],
  newsroom: ['admin:access', 'news:read', 'news:write', 'media:manage'],
  publisher: [
    'admin:access',
    'blog:read',
    'blog:write',
    'blog:publish',
    'news:read',
    'news:write',
    'news:publish',
    'shop:read',
    'shop:write',
    'shop:publish',
    'media:manage',
  ],
  draft_editor: [
    'admin:access',
    'blog:read',
    'blog:write',
    'news:read',
    'news:write',
    'shop:read',
    'shop:write',
    'media:manage',
  ],
  maya_agent: ['admin:access', 'maya:access'],
  help_agent: ['admin:access', 'help:access'],
};

const LEGACY_ROLE_MAP: Record<string, AdminRole[]> = {
  owner: ['admin'],
  editor: ['draft_editor'],
};

export function parseRoles(raw: string | null | undefined, legacyRole?: string): AdminRole[] {
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const roles = parsed.filter((r): r is AdminRole =>
          ALL_ADMIN_ROLES.includes(r as AdminRole),
        );
        if (roles.length) return roles;
      }
    } catch {
      // fall through
    }
  }
  if (legacyRole && LEGACY_ROLE_MAP[legacyRole]) {
    return LEGACY_ROLE_MAP[legacyRole];
  }
  return ['draft_editor'];
}

export type AdminIdentity = {
  userId: string;
  email: string;
  roles: AdminRole[];
  isSuperadmin: boolean;
};

export function buildAdminIdentity(
  userId: string,
  email: string,
  rolesRaw: string | null | undefined,
  legacyRole?: string,
): AdminIdentity {
  const normalizedEmail = email.trim().toLowerCase();
  let roles = parseRoles(rolesRaw, legacyRole);

  if (isSuperadminEmail(normalizedEmail)) {
    roles = Array.from(new Set<AdminRole>(['superadmin', ...roles]));
  } else {
    roles = roles.filter((r) => r !== 'superadmin');
  }

  return {
    userId,
    email: normalizedEmail,
    roles,
    isSuperadmin: isSuperadminEmail(normalizedEmail),
  };
}

export function hasCapability(admin: AdminIdentity, capability: Capability): boolean {
  if (admin.isSuperadmin) return true;
  for (const role of admin.roles) {
    const caps = ROLE_CAPABILITIES[role];
    if (caps?.includes(capability)) return true;
  }
  return false;
}

export function hasAnyCapability(
  admin: AdminIdentity,
  capabilities: Capability[],
): boolean {
  return capabilities.some((c) => hasCapability(admin, c));
}

export function canPublishContent(
  admin: AdminIdentity,
  contentType: 'blog' | 'news' | 'shop',
): boolean {
  const cap: Capability =
    contentType === 'blog'
      ? 'blog:publish'
      : contentType === 'news'
        ? 'news:publish'
        : 'shop:publish';
  return hasCapability(admin, cap);
}

export function roleSummary(admin: AdminIdentity): {
  canPublishLive: boolean;
  canApprovePublish: boolean;
  draftOnly: boolean;
} {
  const canPublishLive =
    admin.isSuperadmin ||
    hasAnyCapability(admin, ['blog:publish', 'news:publish', 'shop:publish']);
  const canApprovePublish = hasCapability(admin, 'publish:approve');
  return {
    canPublishLive,
    canApprovePublish,
    draftOnly: !canPublishLive,
  };
}
