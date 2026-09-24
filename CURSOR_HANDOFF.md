# Cursor handoff

- **Last update:** 2026-09-24
- **Branch:** `cursor/maya-public-chat-1cb4`
- **Commit:** `905800c2` (realtime store/type validation)

## Current focus

Ship Maya as the feature-gated public marketing chat on `eatos.com` and
`www.eatos.com` without mounting it in auth/admin surfaces.

## Recent changes

- Added public hostname/path gating and anonymous name/email lead capture.
- Restored the visitor polling store methods omitted by the stacked Maya PR and
  added local Worker binding types without changing browser `Response.json()` types.
- Cloudflare build now explicitly uses the repository's Yarn package manager even
  when Lovable's coexisting Bun lockfile is present.
- Added Maya realtime Durable Object transport with HTTP polling fallback.
- Added D1 helpdesk conversations, agent inbox, canned replies, and agent setup.
- Added enablement, deployment, anonymous smoke, and Crisp parity documentation.

## Next actions

- Apply D1 migrations and build with the production chat environment flags.
- Register the first lead at `/admin/maya`.
- Run the anonymous lead and bidirectional reply smoke in the deployed environment.

## Blockers

- Production activation requires deployment-time environment configuration and D1
  migration application; the PR intentionally does not deploy or merge itself.
