# Project architecture

- The public `/chatapp` workspace and its `/chatapp/visitors` view use a dedicated full-height shell without website chrome or login while the interface is being built; `/admin` remains protected.
- Front-end chat, live-visitor, and contact-profile prototype data lives in typed local modules, so persistence can later be added without redesigning the interface.
- Contact previews and `/chatapp/contacts/[contactId]` profiles share the same typed contact data and profile-card components to keep both views consistent.
- Scope the legacy admin dark palette through `AdminChatShell` semantic tokens so every `/chatapp` view and portaled control stays consistent without changing public pages.
- Keep User Docs, Settings, and View Online nested under Knowledge Base in the main Chat App navigation, with configuration under `/chatapp/knowledge-base/settings`, so no redundant Knowledge Base sidebar is needed.
- Keep Account settings as focused views selected by the `section` query parameter, so refresh and responsive navigation preserve the active subpage.
