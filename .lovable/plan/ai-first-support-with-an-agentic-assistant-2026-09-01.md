# AI-first support with an agentic assistant

Reposition eatOS support around an AI agent that answers, triages and acts, shipped in two phases so the story goes live now and the working agent follows once the app runs on a real runtime host.

## Phase 1: AI-first support narrative (ships on the current static host)

### /support rebuilt around the agent

Replaces the current channel-first landing page with an agent-first one:

- Hero: "Support that resolves, not just responds." The search box becomes an ask-anything composer. Typing and submitting opens the assistant panel.
- Assistant panel: a real chat UI with the eatOS visual language, running in guided mode. It answers from a prebuilt static index of the 320 help articles using local keyword and title matching, cites the articles it used, and shows suggested next steps. No model call, no invented answers: if nothing matches confidently it hands off.
- Capability strip: three tiers of what the agent does, stated as what ships and what is coming, so nothing overclaims: Answer (grounded in the help center), Triage (collects device, product, severity, then routes), Act (account actions, gated behind sign-in).
- Handoff row: the existing four channels stay, reframed as escalation paths the agent chooses between, with the conversation context carried into the WhatsApp, email and phone links.
- Steps, most-read guides, all 18 categories, hardware and expert bands: kept, restyled to sit under the agent.

### Site-wide AI-first support story

- Persistent assistant launcher in the layout, present on every page, opening the same panel. Off-support pages open it in "ask about eatOS" mode with the same grounded index.
- /platform: an AI support section describing the agent as part of the platform, linked to /support.
- /pricing: a line making it explicit that agentic support is included in every plan at no extra cost, matching the existing unlimited-support claim.
- Product pages for Point of Sale, Kitchen Display System, Kiosk, Guest Facing Display, Dashboard: a short support band stating the agent knows that product's setup and troubleshooting, linked to the matching help category.
- Support article and category pages: an "ask the agent about this article" entry point that seeds the conversation with the article context.

Every claim on these surfaces describes what phase 1 actually does. Deflection rates, resolution times and satisfaction numbers are omitted until you give me real figures.

## Phase 2: the working agent (needs a runtime host)

Phase 2 cannot run on the current static-file host, which serves fixed files only. The app already carries an OpenNext Cloudflare Workers config and a D1 SQL helper, so the move is a hosting switch, not a rewrite. Phase 2 work starts once that switch is agreed.

### Agent runtime

- A streaming chat endpoint using the AI SDK against Lovable AI Gateway, with retrieval over the help center plus product and pricing content, answering only from retrieved sources and citing them.
- Reasoning-capable model for the agent loop, cheap model for classification and routing, so cost tracks usage.
- Conversation threads persisted in D1, keyed per visitor, with the transcript attached to any escalation.

### Tool catalog (MCP-compatible)

Each tool gets a JSON Schema definition with parameters, return type, error states, when to call, when not to call, plus a version. Answer tools are read-only. Triage and act tools mutate, so they require confirmation before running.

- Answer: search help articles, fetch article, search product and pricing content.
- Triage: classify issue (product, severity, category), collect diagnostics, create support ticket, escalate to human channel with transcript.
- Act: order status, device and terminal health check, resend receipt, and similar account actions. All authenticated and scoped to the signed-in merchant, never inferred from the conversation.

### Guardrails

- Every factual claim in an agent reply must trace to a retrieved source; unsupported replies are withheld and escalated instead.
- Structured tool output validated against its schema, with a retry then a graceful fallback.
- Act tools are idempotent by key so a retried call never double-applies.
- Deterministic code, not the model, owns pricing, plan entitlements and anything with a compliance or billing consequence.
- Per-conversation trace id linking messages, tool calls and outputs, plus per-feature cost and latency logging with a monthly ceiling and cheapest-capable-model default.

## Order of work

1. /support rebuilt agent-first with the grounded static assistant.
2. Site-wide launcher, then the /platform, /pricing, product and article touchpoints.
3. Verify at mobile and desktop, then publish phase 1.
4. Phase 2 after the hosting switch: runtime endpoint, tool catalog, guardrails, observability.

## Technical notes

- Phase 1 adds no server dependency. The assistant index is generated at build time from `apps/web/src/app/support/articles.generated.json` into a compact static index, so it works inside the current export.
- New shared components live under `apps/web/src/app/components`, with support copy staying in `apps/web/src/app/support/content.ts`.
- Phase 1 has no model calls, so it adds no AI cost.
- Phase 2 endpoints belong under `apps/web/src/app/api`, secrets read inside handlers only, and the existing mock `api/ai/text` route gets replaced rather than extended.
- Support page JSON-LD is extended with the assistant as a support channel.

## Open item

Phase 2 depends on moving off the static-file host. Confirm that move when you are ready and I will plan the migration alongside the agent build.
