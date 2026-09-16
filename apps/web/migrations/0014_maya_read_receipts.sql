-- Read receipts for Maya helpdesk messages.
-- read_at is set when the other party (visitor or agent) has seen the message.

ALTER TABLE maya_messages ADD COLUMN read_at TEXT;

CREATE INDEX IF NOT EXISTS idx_maya_messages_unread
  ON maya_messages (conversation_id, role, read_at);
