/**
 * ⚠ ANYTHING PLATFORM — DO NOT REWRITE THIS FILE ⚠
 *
 * Shipped v2 better-auth configuration. The hooks.before middleware (backfills
 * `name` from email), bearer() plugin (mobile Authorization: Bearer flow),
 * trustedOrigins list, and socialProviders block are ALL load-bearing. A prior
 * AI removed the name backfill and broke every signup with [body.name]
 * validation errors. DO NOT simplify this config without understanding why each
 * piece is present.
 *
 *   Safe:   add user fields to `user.additionalFields`, tune session options.
 *   Unsafe: removing hooks.before, the bearer plugin, or trustedOrigins;
 *           changing cookie attributes (sameSite:'none' is required for
 *           mobile iframes); changing the database pool; hand-editing the
 *           socialProviders block (the platform injects the OAuth credentials
 *           via env vars when a provider is enabled in project settings).
 */
import { argon2Verify } from 'argon2-wasm-edge';
import { betterAuth } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';
import { verifyPassword } from 'better-auth/crypto';
import { bearer } from 'better-auth/plugins';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { D1Dialect } from 'kysely-d1';

// --- Cloudflare D1 port note ---------------------------------------------
// Previously this used a Neon (Postgres) Pool. On Cloudflare Workers the
// database is D1 (SQLite), reached through a per-request binding, so the auth
// instance must be created lazily inside a request (where getCloudflareContext
// can resolve `env.DB`). Everything ELSE below (hooks.before name backfill,
// bearer plugin, trustedOrigins, socialProviders, cookie attributes) is kept
// exactly as shipped — only the database wiring changed.
// -------------------------------------------------------------------------

// Read a config value from the Worker env first, falling back to process.env
// (populated by the OpenNext adapter). Called at request time.
function readEnv(cfEnv: Record<string, any>, key: string): string | undefined {
  return (cfEnv?.[key] as string | undefined) ?? process.env[key];
}

function buildTrustedOrigins(cfEnv: Record<string, any>): string[] {
  return Array.from(
    new Set(
      [
        readEnv(cfEnv, 'BETTER_AUTH_URL'),
        readEnv(cfEnv, 'EXPO_PUBLIC_PROXY_BASE_URL'),
        readEnv(cfEnv, 'NEXT_PUBLIC_CREATE_BASE_URL'),
        readEnv(cfEnv, 'NEXT_PUBLIC_CREATE_HOST')
          ? `https://${readEnv(cfEnv, 'NEXT_PUBLIC_CREATE_HOST')}`
          : null,
        ...(readEnv(cfEnv, 'BETTER_AUTH_TRUSTED_ORIGINS') ?? '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      ].filter((v): v is string => Boolean(v))
    )
  );
}

function buildSocialProviders(cfEnv: Record<string, any>) {
  const g = {
    id: readEnv(cfEnv, 'GOOGLE_CLIENT_ID'),
    secret: readEnv(cfEnv, 'GOOGLE_CLIENT_SECRET'),
  };
  const a = {
    id: readEnv(cfEnv, 'APPLE_CLIENT_ID'),
    secret: readEnv(cfEnv, 'APPLE_CLIENT_SECRET'),
    bundle: readEnv(cfEnv, 'APPLE_APP_BUNDLE_IDENTIFIER'),
  };
  return {
    ...(g.id && g.secret
      ? { google: { clientId: g.id, clientSecret: g.secret } }
      : {}),
    ...(a.id && a.secret
      ? {
          apple: {
            clientId: a.id,
            clientSecret: a.secret,
            ...(a.bundle ? { appBundleIdentifier: a.bundle } : {}),
          },
        }
      : {}),
  };
}

async function verifyCompatiblePassword({
  hash,
  password,
}: {
  hash: string;
  password: string;
}) {
  if (hash.startsWith('$argon2')) {
    return argon2Verify({
      hash,
      password,
    });
  }

  return verifyPassword({
    hash,
    password,
  });
}

// Inferred from createAuth so the concrete option generics are preserved
// (ReturnType<typeof betterAuth> widens to BetterAuthOptions and mismatches).
type AuthInstance = ReturnType<typeof createAuth>;

// Memoize the auth instance per D1 binding (stable within a Worker isolate).
let cachedAuth: AuthInstance | null = null;
let cachedDb: unknown = null;

function createAuth(db: any, cfEnv: Record<string, any>) {
  return betterAuth({
    database: { dialect: new D1Dialect({ database: db }), type: 'sqlite' },
    // Session/token signing secret. Must be set in the Worker env
    // (BETTER_AUTH_SECRET) in every non-dev environment; better-auth refuses
    // to run with its built-in default secret on Workers.
    secret: readEnv(cfEnv, 'BETTER_AUTH_SECRET'),
    trustedOrigins: buildTrustedOrigins(cfEnv),
    socialProviders: buildSocialProviders(cfEnv),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      password: {
        verify: verifyCompatiblePassword,
      },
    },
    hooks: {
      // better-auth's /sign-up/email schema requires `name`. Generated user
      // apps often collect only email+password, so backfill a name from the
      // email local-part to keep signup working without a visible name field.
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path !== '/sign-up/email') return;
        const body = ctx.body as { email?: unknown; name?: unknown } | undefined;
        if (!body || typeof body.email !== 'string') return;
        if (typeof body.name === 'string' && body.name.trim().length > 0) return;
        const derived = body.email.split('@')[0];
        body.name = derived && derived.length > 0 ? derived : 'User';
      }),
    },
    advanced: {
      cookiePrefix: 'better-auth',
      defaultCookieAttributes: {
        sameSite: 'none', // Required for iframes
        secure: true,
        httpOnly: true,
        path: '/',
      },
      cookies: {
        sessionToken: {
          attributes: {
            sameSite: 'none', // Required for iframes
            secure: true,
          },
        },
      },
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    },
    user: {
      additionalFields: {
        image: {
          type: 'string',
          required: false,
        },
      },
    },
    // Enable Authorization: Bearer <session-token> so mobile apps (which can't
    // carry cookies through a WebView) authenticate API calls with the token
    // returned from /api/auth/token.
    plugins: [bearer()],
  });
}

// Resolve the D1-backed better-auth instance. Must be called at request time so
// getCloudflareContext() can access the `DB` binding.
export function getAuth(): AuthInstance {
  const { env } = getCloudflareContext();
  const db = (env as any).DB;
  if (!db) {
    throw new Error(
      'No D1 database binding `DB` was found for better-auth. Check wrangler.jsonc d1_databases.'
    );
  }
  if (cachedAuth && cachedDb === db) return cachedAuth;
  cachedDb = db;
  cachedAuth = createAuth(db, env as Record<string, any>);
  return cachedAuth;
}

// Lazy proxy so existing consumers can keep `import { auth }` and use
// `auth.handler`, `auth.api.getSession(...)`, and `toNextJsHandler(auth)`
// unchanged. Property access resolves the real instance at request time.
export const auth = new Proxy({} as AuthInstance, {
  get(_target, prop, receiver) {
    const instance = getAuth();
    const value = Reflect.get(instance as object, prop, receiver);
    return typeof value === 'function' ? value.bind(instance) : value;
  },
  has(_target, prop) {
    return prop in (getAuth() as object);
  },
});

export type Session = AuthInstance['$Infer']['Session'];
