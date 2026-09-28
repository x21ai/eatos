# Project architecture

- Admin support pages use a dedicated full-height shell and bypass the public website chrome, because the inbox needs an uninterrupted multi-panel workspace.
- Front-end chat prototype data lives in a typed local module, so persistence can later be added without redesigning the interface.