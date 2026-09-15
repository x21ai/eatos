-- Maya helpdesk: agent inbox, conversation threads, canned replies.
-- Agents must also exist in admin_users; maya_agents adds helpdesk-specific roles.

CREATE TABLE IF NOT EXISTS maya_agents (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'agent', -- agent | lead | viewer
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_maya_agents_user ON maya_agents (user_id);
CREATE INDEX IF NOT EXISTS idx_maya_agents_email ON maya_agents (email);
CREATE INDEX IF NOT EXISTS idx_maya_agents_active ON maya_agents (is_active);

CREATE TABLE IF NOT EXISTS maya_conversations (
  id TEXT PRIMARY KEY,
  trace_id TEXT NOT NULL UNIQUE,
  visitor_id TEXT NOT NULL,
  visitor_email TEXT,
  visitor_name TEXT,
  page_url TEXT,
  page_title TEXT,
  status TEXT NOT NULL DEFAULT 'open', -- open | pending | resolved
  assigned_agent_id TEXT,
  priority TEXT NOT NULL DEFAULT 'normal', -- low | normal | high
  subject TEXT,
  article_slugs TEXT, -- JSON array
  metadata_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT,
  FOREIGN KEY (assigned_agent_id) REFERENCES maya_agents (id)
);

CREATE INDEX IF NOT EXISTS idx_maya_conversations_status ON maya_conversations (status);
CREATE INDEX IF NOT EXISTS idx_maya_conversations_assigned ON maya_conversations (assigned_agent_id);
CREATE INDEX IF NOT EXISTS idx_maya_conversations_visitor ON maya_conversations (visitor_id);
CREATE INDEX IF NOT EXISTS idx_maya_conversations_updated ON maya_conversations (updated_at DESC);

CREATE TABLE IF NOT EXISTS maya_messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL, -- visitor | agent | maya
  body_text TEXT NOT NULL,
  article_slugs TEXT, -- JSON array
  sender_agent_id TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (conversation_id) REFERENCES maya_conversations (id),
  FOREIGN KEY (sender_agent_id) REFERENCES maya_agents (id)
);

CREATE INDEX IF NOT EXISTS idx_maya_messages_conversation ON maya_messages (conversation_id, created_at);

CREATE TABLE IF NOT EXISTS maya_canned_replies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  shortcut TEXT,
  body_text TEXT NOT NULL,
  article_slugs TEXT, -- JSON array
  category TEXT,
  created_by TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_maya_canned_shortcut ON maya_canned_replies (shortcut) WHERE shortcut IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_maya_canned_active ON maya_canned_replies (is_active);

-- Starter quick replies for new helpdesks
INSERT OR IGNORE INTO maya_canned_replies (id, title, shortcut, body_text, article_slugs, category)
VALUES
  (
    'mcanned_welcome',
    'Welcome',
    '/welcome',
    'Hi there — thanks for reaching out to eatOS support. I am reviewing your conversation and will follow up shortly.',
    NULL,
    'General'
  ),
  (
    'mcanned_escalated',
    'Escalation received',
    '/escalated',
    'We received your escalation and assigned it to a specialist. You will hear back through your preferred channel soon.',
    NULL,
    'General'
  ),
  (
    'mcanned_article',
    'Share help article',
    '/article',
    'This guide should help — let me know if anything is still unclear after you try the steps.',
    '["getting-started-with-eatos"]',
    'Articles'
  );
