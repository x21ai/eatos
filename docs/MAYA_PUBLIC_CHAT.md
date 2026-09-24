# Maya public chat

Maya is the first-party visitor chat for the eatOS marketing site. It combines the
grounded help-center assistant with a D1-backed helpdesk inbox and a
`MayaConversationRoom` Durable Object for realtime visitor/agent messages.

## Enablement

The widget is off unless it is explicitly enabled at build time:

```sh
NEXT_PUBLIC_MAYA_CHAT_ENABLED=true
NEXT_PUBLIC_MAYA_CHAT_HOSTS=eatos.com,www.eatos.com
```

`NEXT_PUBLIC_MAYA_CHAT_HOSTS` defaults to `eatos.com,www.eatos.com`. Add
`s.eatos.dev` only when staging chat is intentionally being tested:

```sh
NEXT_PUBLIC_MAYA_CHAT_HOSTS=eatos.com,www.eatos.com,s.eatos.dev
```

Because these are `NEXT_PUBLIC_` values, set them in the environment used by
`yarn cf:build`; changing Worker runtime variables after the build does not change
the client bundle. The widget is also excluded from `/admin`, `/account`, `/login`,
checkout, cart, kiosk, order-status, and API routes, so auth/admin flows remain
separate.

## Deploy

Apply D1 migrations before serving the widget:

```sh
cd apps/web
yarn cf:migrate:remote
yarn cf:build
yarn cf:deploy
```

The Wrangler config retains the existing D1/R2 bindings and adds
`MAYA_CONVERSATION_ROOM`. The first deploy registers the
`v1-maya-realtime` Durable Object migration. `OPENAI_API_KEY` remains optional:
without it, Maya falls back to the bundled help-center retrieval.

An admin must already exist in `admin_users`. Visit `/admin/maya` and register the
first lead agent, then use `/admin/maya/inbox` for conversations.

## Anonymous lead smoke

1. Build with chat enabled for the host under test and open a marketing page in a
   private browser session.
2. Open the floating Maya launcher and send a question. Confirm Maya answers and the
   conversation appears in `/admin/maya/inbox`.
3. Choose human help, select product and severity, then enter name, email, and notes.
4. Confirm the inbox conversation is pending and contains the captured lead fields.
5. Reply from the inbox. Confirm the visitor receives it immediately over WebSocket.
6. Block WebSockets and repeat; confirm the reply arrives through the 3-second HTTP
   fallback.
7. Open `/login` and `/admin`; confirm the public launcher is not mounted.

## Crisp parity gaps

- No attachments, screenshots, voice notes, or file scanning.
- No browser push, email follow-up delivery, or offline-message notification.
- No proactive campaigns, targeted triggers, chatbot workflow builder, or A/B tests.
- No visitor-company enrichment, shared cross-device identity, or CRM sync.
- No transcript export, satisfaction score, agent presence/schedule, SLA dashboard,
  collision detection, or advanced inbox search/reporting.
- Anonymous message integrity and abuse controls are basic: no CAPTCHA, per-IP rate
  limiting, spam scoring, or signed client events yet.
- Conversation state uses session storage, so a new tab/device starts a new visitor
  identity and prior transcripts are not restored.
