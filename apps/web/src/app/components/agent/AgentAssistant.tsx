// @ts-nocheck
'use client';

// The eatOS support agent. Mounted once in the root layout, opened from the
// launcher, the /support hero composer, or openAgent() anywhere on the site.
//
// It answers only from the generated help-center index (loaded lazily on first
// open, so no page pays for it up front). When it cannot answer confidently it
// runs triage: product, severity, description, then routes to the channel that
// matches the severity with the collected context attached.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Loader2,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { AGENT_OPEN_EVENT } from './agentBus';
import { composeReply, starterQuestions } from './retrieval';
import {
  AGENT_NAME,
  buildEscalation,
  productRoutes,
  severityOptions,
} from './knowledge';

const articleHref = (slug) => `/support/article/${slug}`;

let indexPromise = null;
function loadIndex() {
  if (!indexPromise) {
    indexPromise = import('./assistantIndex.generated.json').then((m) => m.default ?? m);
  }
  return indexPromise;
}

function useAgentIndex(open) {
  const [index, setIndex] = useState(null);
  useEffect(() => {
    if (!open || index) return;
    let alive = true;
    loadIndex().then((data) => {
      if (alive) setIndex(data);
    });
    return () => {
      alive = false;
    };
  }, [open, index]);
  return index;
}

function Bubble({ role, children }) {
  const isAgent = role === 'agent';
  return (
    <div className={isAgent ? 'flex gap-3' : 'flex justify-end gap-3'}>
      {isAgent ? (
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] text-brand-on-dark">
          <Sparkles size={15} aria-hidden />
        </span>
      ) : null}
      <div
        className={
          isAgent
            ? 'min-w-0 max-w-[calc(100%-2.75rem)] rounded-3xl rounded-tl-lg border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm leading-6 text-zinc-200'
            : 'min-w-0 max-w-[85%] rounded-3xl rounded-tr-lg bg-white px-4 py-3 text-sm font-medium leading-6 text-black'
        }
      >
        {children}
      </div>
    </div>
  );
}

function SourceLink({ entry }) {
  return (
    <a
      href={articleHref(entry.slug)}
      className="group mt-2 flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-black/40 px-3.5 py-3 transition-colors hover:border-white/30"
    >
      <span className="mt-0.5 shrink-0 text-brand-on-dark">
        <BookOpen size={15} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
          {entry.categoryTitle}
        </span>
        <span className="mt-1 block text-[13px] font-semibold leading-5 text-white transition-colors group-hover:text-brand-on-dark">
          {entry.title}
        </span>
      </span>
      <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-zinc-500" aria-hidden />
    </a>
  );
}

function ChipRow({ items, onSelect }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id ?? item.label}
          type="button"
          onClick={() => onSelect(item)}
          className="rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-2 text-left text-xs font-semibold text-zinc-200 transition-colors hover:border-white/40 hover:text-white"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function AnswerBody({ reply, onTriage }) {
  if (reply.kind === 'answer') {
    return (
      <div className="min-w-0">
        <p className="whitespace-pre-line">{reply.answer}</p>
        {reply.outline?.length ? (
          <ul className="mt-3 space-y-1.5 border-l border-white/12 pl-3.5">
            {reply.outline.map((step) => (
              <li key={step} className="text-[13px] leading-5 text-zinc-400">
                {step}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Source
        </p>
        <SourceLink entry={reply.source} />
        {reply.related?.length ? (
          <>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Related guides
            </p>
            {reply.related.map((entry) => (
              <SourceLink key={entry.slug} entry={entry} />
            ))}
          </>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/8 pt-3">
          <span className="text-[11px] text-zinc-500">Did that solve it?</span>
          <button
            type="button"
            onClick={() => onTriage(null)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 transition-colors hover:border-white/40 hover:text-white"
          >
            <Check size={12} aria-hidden />
            Yes
          </button>
          <button
            type="button"
            onClick={() => onTriage(reply.product ?? null)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 transition-colors hover:border-white/40 hover:text-white"
          >
            No, get me help
          </button>
        </div>
      </div>
    );
  }

  if (reply.kind === 'facts') {
    return (
      <div className="min-w-0">
        <p>Here is what applies to that:</p>
        {reply.facts.map((fact) => (
          <div key={fact.id} className="mt-3 rounded-2xl border border-white/10 bg-black/40 px-3.5 py-3">
            <p className="text-[13px] font-semibold text-white">{fact.title}</p>
            <p className="mt-1.5 text-[13px] leading-5 text-zinc-400">{fact.body}</p>
            <a
              href={fact.href}
              className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-on-dark"
            >
              {fact.linkLabel}
              <ArrowRight size={12} aria-hidden />
            </a>
          </div>
        ))}
        {reply.related?.length ? (
          <>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Guides that may help
            </p>
            {reply.related.map((entry) => (
              <SourceLink key={entry.slug} entry={entry} />
            ))}
          </>
        ) : null}
        <button
          type="button"
          onClick={() => onTriage(reply.product ?? null)}
          className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-brand-on-dark"
        >
          Still stuck, get me help
          <ArrowRight size={12} aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <p>
        I could not find a guide that answers that confidently, so I will not guess. Let me get you to
        the right person instead.
      </p>
      {reply.related?.length ? (
        <>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Closest guides
          </p>
          {reply.related.map((entry) => (
            <SourceLink key={entry.slug} entry={entry} />
          ))}
        </>
      ) : null}
      <button
        type="button"
        onClick={() => onTriage(reply.product ?? null)}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition-colors hover:bg-zinc-200"
      >
        Start triage
        <ArrowRight size={12} aria-hidden />
      </button>
    </div>
  );
}

export default function AgentAssistant() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [pending, setPending] = useState(null);
  const [triage, setTriage] = useState(null);
  const [seedContext, setSeedContext] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const index = useAgentIndex(open);

  useEffect(() => setMounted(true), []);

  const ask = useCallback((question) => {
    const text = String(question ?? '').trim();
    if (!text) return;
    setTriage(null);
    setInput('');
    setTurns((prev) => [...prev, { id: `${Date.now()}-q`, role: 'visitor', text }]);
    setThinking(true);
    setPending(text);
  }, []);

  // Answer once the index is available. Keeps the "thinking" state honest: it
  // reflects the index actually loading, not a fake delay.
  useEffect(() => {
    if (!pending || !index) return;
    const reply = composeReply(pending, index);
    setTurns((prev) => [...prev, { id: `${Date.now()}-a`, role: 'agent', reply }]);
    setThinking(false);
    setPending(null);
  }, [pending, index]);

  useEffect(() => {
    function onOpen(event) {
      const detail = event.detail ?? {};
      setOpen(true);
      if (detail.context) setSeedContext(detail.context);
      if (detail.question) ask(detail.question);
    }
    window.addEventListener(AGENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(AGENT_OPEN_EVENT, onOpen);
  }, [ask]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [turns, thinking, triage, open]);

  const startTriage = useCallback((product) => {
    setTriage({ step: product ? 'severity' : 'product', product: product ?? null, severity: null, note: '' });
  }, []);

  const transcriptSummary = useMemo(() => {
    const asked = turns.filter((t) => t.role === 'visitor').map((t) => t.text);
    const lines = ['Sent from the eatOS support agent.', ''];
    if (seedContext) lines.push(`Page context: ${seedContext}`);
    if (triage?.product) lines.push(`Product: ${triage.product.label}`);
    if (triage?.severity) lines.push(`Severity: ${triage.severity.label} (${triage.severity.note})`);
    if (triage?.note) lines.push(`Details: ${triage.note}`);
    if (asked.length) {
      lines.push('', 'What I already asked the agent:');
      asked.forEach((q) => lines.push(`- ${q}`));
    }
    return lines.join('\n');
  }, [turns, triage, seedContext]);

  const escalation = triage?.severity ? buildEscalation(triage.severity.route, transcriptSummary) : null;

  if (!mounted) return null;

  const launcher = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open the eatOS support agent"
      className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black px-4 py-3 text-sm font-semibold text-white shadow-2xl transition-transform hover:scale-[1.03] sm:px-5"
    >
      <span className="relative grid h-6 w-6 place-items-center rounded-full bg-brand text-white">
        <Sparkles size={13} aria-hidden />
      </span>
      <span className="hidden sm:inline">Ask the support agent</span>
      <span className="sm:hidden">Support</span>
    </button>
  );

  const panel = open ? (
    <div className="fixed inset-0 z-[80] flex items-stretch justify-end sm:items-end sm:p-5">
      <button
        type="button"
        aria-label="Close the support agent"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={AGENT_NAME}
        className="relative flex h-full w-full flex-col overflow-hidden border border-white/12 bg-zinc-950 text-zinc-200 sm:h-[min(760px,calc(100vh-2.5rem))] sm:w-[min(460px,calc(100vw-2.5rem))] sm:rounded-[28px]"
      >
        <header className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-on-dark">
              <span className="relative grid h-1.5 w-1.5 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-on-dark/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-on-dark" />
              </span>
              Online 24/7
            </p>
            <h2 className="mt-1.5 truncate text-base font-bold tracking-tight text-white">{AGENT_NAME}</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 text-zinc-400 transition-colors hover:border-white/40 hover:text-white"
          >
            <X size={16} />
          </button>
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <Bubble role="agent">
            <p>
              I answer from the eatOS help center and always show you the guide I used. If I cannot
              answer something, I will route you to a specialist with your details attached.
            </p>
            {seedContext ? (
              <p className="mt-2 text-[12px] text-zinc-400">Context: {seedContext}</p>
            ) : null}
            {turns.length === 0 ? (
              <ChipRow
                items={starterQuestions.map((q) => ({ id: q, label: q }))}
                onSelect={(item) => ask(item.label)}
              />
            ) : null}
          </Bubble>

          {turns.map((turn) =>
            turn.role === 'visitor' ? (
              <Bubble key={turn.id} role="visitor">
                {turn.text}
              </Bubble>
            ) : (
              <Bubble key={turn.id} role="agent">
                <AnswerBody reply={turn.reply} onTriage={startTriage} />
              </Bubble>
            ),
          )}

          {thinking ? (
            <Bubble role="agent">
              <span className="inline-flex items-center gap-2 text-zinc-400">
                <Loader2 size={14} className="animate-spin" aria-hidden />
                Searching the help center
              </span>
            </Bubble>
          ) : null}

          {triage ? (
            <Bubble role="agent">
              {triage.step === 'product' ? (
                <div className="min-w-0">
                  <p>Which part of eatOS is this about?</p>
                  <ChipRow
                    items={productRoutes.map((p) => ({ id: p.id, label: p.label, product: p }))}
                    onSelect={(item) => setTriage({ ...triage, product: item.product, step: 'severity' })}
                  />
                </div>
              ) : null}

              {triage.step === 'severity' ? (
                <div className="min-w-0">
                  <p>
                    {triage.product ? `${triage.product.label}. ` : ''}How badly is it affecting service
                    right now?
                  </p>
                  <ChipRow
                    items={severityOptions.map((s) => ({ id: s.id, label: s.label, severity: s }))}
                    onSelect={(item) => setTriage({ ...triage, severity: item.severity, step: 'note' })}
                  />
                </div>
              ) : null}

              {triage.step === 'note' ? (
                <div className="min-w-0">
                  <p>Add anything that helps, then I will hand this over with the full context.</p>
                  <textarea
                    value={triage.note}
                    onChange={(event) => setTriage({ ...triage, note: event.target.value })}
                    rows={3}
                    placeholder="Terminal 2 stopped printing after the update"
                    className="mt-3 w-full resize-none rounded-2xl border border-white/12 bg-black/50 px-3.5 py-3 text-[13px] text-white outline-none placeholder:text-zinc-600 focus:border-white/40"
                  />
                  <button
                    type="button"
                    onClick={() => setTriage({ ...triage, step: 'done' })}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition-colors hover:bg-zinc-200"
                  >
                    Hand this over
                    <ArrowRight size={12} aria-hidden />
                  </button>
                </div>
              ) : null}

              {triage.step === 'done' && escalation ? (
                <div className="min-w-0">
                  <p>
                    Routed. Based on {triage.severity.label.toLowerCase()}, this goes to{' '}
                    {escalation.label.toLowerCase()} with your product, severity and notes attached.
                  </p>
                  <a
                    href={escalation.href}
                    target={escalation.external ? '_blank' : undefined}
                    rel={escalation.external ? 'noreferrer' : undefined}
                    className="mt-3 flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/12 bg-black/50 px-4 py-3.5 transition-colors hover:border-white/40"
                  >
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold text-white">{escalation.label}</span>
                      <span className="mt-1 block truncate text-[12px] text-zinc-400">
                        {escalation.detail}
                      </span>
                    </span>
                    <ArrowUpRight size={15} className="shrink-0 text-brand-on-dark" aria-hidden />
                  </a>
                  <p className="mt-2.5 text-[11px] text-zinc-500">{escalation.meta}</p>
                  <a
                    href="/system-status"
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-white"
                  >
                    Check live service health
                    <ArrowRight size={12} aria-hidden />
                  </a>
                </div>
              ) : null}
            </Bubble>
          ) : null}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            ask(input);
          }}
          className="border-t border-white/10 px-5 py-4"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 focus-within:border-white/40">
            <MessageSquare size={16} className="shrink-0 text-zinc-500" aria-hidden />
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about setup, hardware, payments"
              aria-label="Ask the eatOS support agent"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!input.trim()}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-black transition-opacity disabled:opacity-30"
            >
              <Send size={14} />
            </button>
          </div>
          <p className="mt-2.5 text-[10px] leading-4 text-zinc-600">
            Answers are quoted from eatOS help articles with sources shown. Account actions require
            sign-in.
          </p>
        </form>
      </div>
    </div>
  ) : null;

  return createPortal(
    <>
      {!open ? launcher : null}
      {panel}
    </>,
    document.body,
  );
}
