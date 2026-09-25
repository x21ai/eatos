import { describe, expect, it, vi } from 'vitest';
import {
  SUPPORT_ASK_INPUT_ID,
  answerSupportQuestion,
  focusSupportAsk,
  resolveStartAgent,
  resolveSupportAsk,
} from './supportAgent';

describe('resolveSupportAsk', () => {
  it('opens Maya with the question on staging', () => {
    expect(resolveSupportAsk('s.eatos.dev', 'How do I reset an employee PIN?')).toBe('maya');
  });

  it('answers inline on the live hosts', () => {
    expect(resolveSupportAsk('www.eatos.com', 'How do I reset an employee PIN?')).toBe('inline');
    expect(resolveSupportAsk('eatos.com', 'printer offline')).toBe('inline');
  });

  it('answers inline when no public chat widget is mounted', () => {
    expect(resolveSupportAsk('localhost', 'How do I add an item to my menu?')).toBe('inline');
  });

  it('opens the mounted widget when Ask is clicked with an empty question', () => {
    expect(resolveSupportAsk('www.eatos.com', '   ')).toBe('open-widget');
    expect(resolveSupportAsk('s.eatos.dev', '')).toBe('open-widget');
  });

  it('ignores an empty question when no widget is mounted', () => {
    expect(resolveSupportAsk('localhost', '  ')).toBe('ignore');
  });
});

describe('resolveStartAgent', () => {
  it('starts the mounted widget on live and staging hosts', () => {
    expect(resolveStartAgent('www.eatos.com')).toBe('widget');
    expect(resolveStartAgent('eatos.com')).toBe('widget');
    expect(resolveStartAgent('s.eatos.dev')).toBe('widget');
  });

  it('focuses the ask field on other hosts', () => {
    expect(resolveStartAgent('localhost')).toBe('focus-ask');
    expect(resolveStartAgent('preview.eatos.dev')).toBe('focus-ask');
  });
});

describe('focusSupportAsk', () => {
  it('scrolls the ask field into view and focuses it', () => {
    document.body.innerHTML = `<input id="${SUPPORT_ASK_INPUT_ID}" />`;
    const input = document.getElementById(SUPPORT_ASK_INPUT_ID) as HTMLInputElement;
    input.scrollIntoView = vi.fn();

    focusSupportAsk();

    expect(input.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    expect(document.activeElement).toBe(input);
  });
});

describe('answerSupportQuestion', () => {
  it('returns a grounded reply for the employee PIN prompt', async () => {
    const reply = await answerSupportQuestion('How do I reset an employee PIN?');

    expect(['answer', 'facts', 'miss']).toContain(reply.kind);
    if (reply.kind === 'answer') {
      expect(reply.answer.length).toBeGreaterThan(20);
      expect(reply.source.slug).toBeTruthy();
    } else if (reply.kind === 'facts') {
      const facts = reply.facts ?? [];
      expect(facts.length).toBeGreaterThan(0);
      expect(facts[0]?.href).toBeTruthy();
    } else {
      expect(Array.isArray(reply.related)).toBe(true);
    }
  });
});
