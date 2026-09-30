# Project architecture

- The public `/chatapp` workspace and its `/chatapp/visitors` view use a dedicated full-height shell without website chrome or login while the interface is being built; `/admin` remains protected.
- Front-end chat, live-visitor, and contact-profile prototype data lives in typed local modules, so persistence can later be added without redesigning the interface.
- Contact previews and `/chatapp/contacts/[contactId]` profiles share the same typed contact data and profile-card components to keep both views consistent.
- Scope the legacy admin dark palette through `AdminChatShell` semantic tokens so every `/chatapp` view and portaled control stays consistent without changing public pages.
- Keep Knowledge Base configuration under `/chatapp/knowledge-base/settings`, with URL-addressable sections and session-only prototype state, so the article editor stays focused.
