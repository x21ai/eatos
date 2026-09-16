export type ConversationStatus = 'open' | 'pending' | 'resolved';
export type ConversationPriority = 'low' | 'normal' | 'high';
export type MessageRole = 'visitor' | 'agent' | 'maya';
export type MayaAgentRole = 'agent' | 'lead' | 'viewer';

export type MayaAgent = {
  id: string;
  user_id: string;
  email: string;
  display_name: string | null;
  role: MayaAgentRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type MayaConversation = {
  id: string;
  trace_id: string;
  visitor_id: string;
  visitor_email: string | null;
  visitor_name: string | null;
  page_url: string | null;
  page_title: string | null;
  status: ConversationStatus;
  assigned_agent_id: string | null;
  priority: ConversationPriority;
  subject: string | null;
  article_slugs: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
};

export type MayaMessage = {
  id: string;
  conversation_id: string;
  role: MessageRole;
  body_text: string;
  article_slugs: string[];
  sender_agent_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  read_at: string | null;
};

export type MayaCannedReply = {
  id: string;
  title: string;
  shortcut: string | null;
  body_text: string;
  article_slugs: string[];
  category: string | null;
  created_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ConversationSummary = MayaConversation & {
  message_count: number;
  last_message_at: string | null;
  last_message_preview: string | null;
  assigned_agent_name: string | null;
  assigned_agent_email: string | null;
};

export type ConversationDetail = MayaConversation & {
  messages: MayaMessage[];
  assigned_agent: MayaAgent | null;
  visitor_page_history: string[];
};
