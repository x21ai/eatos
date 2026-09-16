'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  RealtimeConnectionStatus,
  RealtimeMessagePayload,
  RealtimeRole,
  RealtimeServerEvent,
} from './realtime-types';
import { parseRealtimeServerEvent } from './realtime-types';

type UseMayaRealtimeOptions = {
  enabled: boolean;
  role: RealtimeRole;
  wsUrl: string | null;
  onMessage?: (message: RealtimeMessagePayload) => void;
  onTyping?: (role: RealtimeRole, isTyping: boolean) => void;
  onRead?: (messageIds: string[], readAt: string, readBy: RealtimeRole) => void;
  onMeta?: (meta: Extract<RealtimeServerEvent, { type: 'meta' }>) => void;
  onFallback?: () => void;
};

const RECONNECT_BASE_MS = 800;
const RECONNECT_MAX_MS = 8000;
const PING_INTERVAL_MS = 25000;

export function useMayaRealtime({
  enabled,
  role,
  wsUrl,
  onMessage,
  onTyping,
  onRead,
  onMeta,
  onFallback,
}: UseMayaRealtimeOptions) {
  const [status, setStatus] = useState<RealtimeConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempt = useRef(0);
  const reconnectTimer = useRef<number | null>(null);
  const pingTimer = useRef<number | null>(null);
  const fallbackTriggered = useRef(false);
  const handlersRef = useRef({ onMessage, onTyping, onRead, onMeta, onFallback });
  handlersRef.current = { onMessage, onTyping, onRead, onMeta, onFallback };

  const clearTimers = useCallback(() => {
    if (reconnectTimer.current) {
      window.clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }
    if (pingTimer.current) {
      window.clearInterval(pingTimer.current);
      pingTimer.current = null;
    }
  }, []);

  const triggerFallback = useCallback(() => {
    if (fallbackTriggered.current) return;
    fallbackTriggered.current = true;
    setStatus('fallback');
    handlersRef.current.onFallback?.();
  }, []);

  const connectRef = useRef<() => void>(() => {});

  const scheduleReconnect = useCallback(() => {
    if (!enabled || !wsUrl) return;
    clearTimers();
    const delay = Math.min(
      RECONNECT_BASE_MS * 2 ** reconnectAttempt.current,
      RECONNECT_MAX_MS,
    );
    reconnectAttempt.current += 1;
    setStatus('reconnecting');
    reconnectTimer.current = window.setTimeout(() => {
      connectRef.current();
    }, delay);
  }, [clearTimers, enabled, wsUrl]);

  const handleEvent = useCallback((event: RealtimeServerEvent) => {
    switch (event.type) {
      case 'connected':
        setStatus('connected');
        break;
      case 'message':
        handlersRef.current.onMessage?.(event.message);
        break;
      case 'typing':
        handlersRef.current.onTyping?.(event.role, event.is_typing);
        break;
      case 'read':
        handlersRef.current.onRead?.(event.message_ids, event.read_at, event.read_by);
        break;
      case 'meta':
        handlersRef.current.onMeta?.(event);
        break;
      default:
        break;
    }
  }, []);

  const connect = useCallback(() => {
    if (!enabled || !wsUrl || typeof window === 'undefined') return;

    clearTimers();
    wsRef.current?.close();

    setStatus(reconnectAttempt.current > 0 ? 'reconnecting' : 'connecting');

    let ws: WebSocket;
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const absolute = wsUrl.startsWith('ws')
        ? wsUrl
        : `${protocol}//${window.location.host}${wsUrl}`;
      ws = new WebSocket(absolute);
    } catch {
      triggerFallback();
      return;
    }

    wsRef.current = ws;

    ws.onopen = () => {
      reconnectAttempt.current = 0;
      setStatus('connected');
      pingTimer.current = window.setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, PING_INTERVAL_MS);
    };

    ws.onmessage = (messageEvent) => {
      const parsed = parseRealtimeServerEvent(String(messageEvent.data ?? ''));
      if (parsed) handleEvent(parsed);
    };

    ws.onerror = () => {
      if (reconnectAttempt.current >= 3) triggerFallback();
    };

    ws.onclose = () => {
      clearTimers();
      if (!enabled) {
        setStatus('disconnected');
        return;
      }
      if (reconnectAttempt.current >= 3) {
        triggerFallback();
        return;
      }
      scheduleReconnect();
    };
  }, [clearTimers, enabled, handleEvent, scheduleReconnect, triggerFallback, wsUrl]);

  connectRef.current = connect;

  useEffect(() => {
    fallbackTriggered.current = false;
    reconnectAttempt.current = 0;

    if (!enabled || !wsUrl) {
      clearTimers();
      wsRef.current?.close();
      wsRef.current = null;
      setStatus('disconnected');
      return undefined;
    }

    connect();
    return () => {
      clearTimers();
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [clearTimers, connect, enabled, wsUrl]);

  const sendTyping = useCallback((isTyping: boolean) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || status === 'fallback') return;
    ws.send(JSON.stringify({ type: 'typing', is_typing: isTyping }));
  }, [status]);

  const sendRead = useCallback((messageIds: string[]) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || status === 'fallback') return false;
    ws.send(JSON.stringify({ type: 'read', message_ids: messageIds }));
    return true;
  }, [status]);

  return {
    status,
    sendTyping,
    sendRead,
    isRealtime: status === 'connected',
    isFallback: status === 'fallback',
  };
}
