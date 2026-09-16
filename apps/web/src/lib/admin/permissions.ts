import { isSuperadminEmail } from '@/lib/auth/allowlist';

export type AdminRole =
  | 'superadmin'
  | 'admin'
  | 'blogger'
  | 'newsroom'
  | 'publisher'
  | 'developer_view'
  | 'developer'
  | 'developer_publish'
  | 'draft_editor'
  | 'maya_agent'
  | 'help_agent';

/** Mutually exclusive Developer access tiers (view → draft → publish). */
export const DEVELOPER_ACCESS_ROLES = [
  'developer_view',
  'developer',
  'developer_publish',
] as const satisfies readonly AdminRole[];

export type DeveloperAccessRole = (typeof DEVELOPER_ACCESS_ROLES)[number];

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
  'developer_view',
  'developer',
  'developer_publish',
  'draft_editor',
  'maya_agent',
  'help_agent',
];

/** Roles that can be assigned via Team invite (excludes superadmin). */
export const INVITABLE_ADMIN_ROLES: AdminRole[] = ALL_ADMIN_ROLES.filter(
  (role) => role !== 'superadmin',
);

export const ROLE_LABELS: Record<AdminRole, string> = {
  superadmin: 'Superadmin',
  admin: 'Admin',
  blogger: 'Blogger',
  newsroom: 'Newsroom',
  publisher: 'Publisher',
  developer_view: 'Developer (view)',
  developer: 'Developer (draft)',
  developer_publish: 'Developer (publish)',
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
    'publish:approve',
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
  developer_view: ['admin:access', 'blog:read', 'news:read', 'shop:read'],
  developer: [
    'admin:access',
    'blog:read',
    'blog:write',
    'news:read',
    'news:write',
    'shop:read',
    'shop:write',
    'media:manage',
  ],
  developer_publish: [
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
    'media:manage',
  ],
  maya_agent: ['admin:access', 'maya:access'],
  help_agent: ['admin:access', 'help:access'],
};

const LEGACY_ROLE_MAP: Record<string, AdminRole[]> = {
  owner: ['admin'],
  editor: ['draft_editor'],
};

const DEVELOPER_ACCESS_SET = new Set<AdminRole>(DEVELOPER_ACCESS_ROLES);

/** Keep at most one Developer access tier; prefer publish > draft > view. */
export function normalizeAssignedRoles(roles: AdminRole[]): AdminRole[] {
  const devTiers = roles.filter((role) => DEVELOPER_ACCESS_SET.has(role));
  const otherRoles = roles.filter((role) => !DEVELOPER_ACCESS_SET.has(role));

  if (!devTiers.length) return otherRoles;

  const tier: DeveloperAccessRole = devTiers.includes('developer_publish')
    ? 'developer_publish'
    : devTiers.includes('developer')
      ? 'developer'
      : 'developer_view';

  return [...otherRoles, tier];
}

export function getDeveloperAccessRole(roles: AdminRole[]): DeveloperAccessRole | null {
  for (const role of DEVELOPER_ACCESS_ROLES) {
    if (roles.includes(role)) return role;
  }
  return null;
}

export function parseRoles(raw: string | null | undefined, legacyRole?: string): AdminRole[] {
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const roles = parsed.filter((r): r is AdminRole =>
          ALL_ADMIN_ROLES.includes(r as AdminRole),
        );
        if (roles.length) return normalizeAssignedRoles(roles);
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

export type PublishContentType = 'blog' | 'news' | 'shop';

export function canPublishContent(
  admin: AdminIdentity,
  contentType: PublishContentType,
): boolean {
  const cap: Capability =
    contentType === 'blog'
      ? 'blog:publish'
      : contentType === 'news'
        ? 'news:publish'
        : 'shop:publish';
  return hasCapability(admin, cap);
}

/** Approve queued publish requests — admin/superadmin or Publisher (not Developer publish tier). */
export function canApprovePublishForContentType(
  admin: AdminIdentity,
  contentType: PublishContentType,
): boolean {
  if (admin.isSuperadmin) return true;
  if (hasCapability(admin, 'publish:approve')) return true;
  if (admin.roles.includes('publisher')) {
    return canPublishContent(admin, contentType);
  }
  return false;
}

export function canApproveAnyPublishRequest(admin: AdminIdentity): boolean {
  if (admin.isSuperadmin) return true;
  if (hasCapability(admin, 'publish:approve')) return true;
  return admin.roles.includes('publisher');
}

export function roleSummary(admin: AdminIdentity): {
  canPublishLive: boolean;
  canApprovePublish: boolean;
  draftOnly: boolean;
} {
  const canPublishLive =
    admin.isSuperadmin ||
    hasAnyCapability(admin, ['blog:publish', 'news:publish', 'shop:publish']);
  const canApprovePublish = canApproveAnyPublishRequest(admin);
  return {
    canPublishLive,
    canApprovePublish,
    draftOnly: !canPublishLive,
  };
}
