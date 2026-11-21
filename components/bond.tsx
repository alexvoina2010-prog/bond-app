'use client';
import { useEffect, useRef, useState } from 'react';
import { isCrisis } from '@/lib/filter.mjs';
import { STATUS_LABEL, STATUSES, time, type Msg, type Status } from '@/lib/store';
import { Ink, type InkName } from '@/components/ink';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

/** Ids present on first render are "at rest"; anything added later is new and plays its arrival. */
export function useFresh(ids: string[]) {
  const seen = useRef<Set<string> | null>(null);
  if (!seen.current) seen.current = new Set(ids);
  return (id: string) => !seen.current!.has(id);
}

/** Scroll a list's end into view: instantly on mount, smoothly for new items unless motion is reduced. */
export function useScrollEnd(count: number) {
  const end = useRef<HTMLLIElement>(null);
  const first = useRef(true);
  useEffect(() => {
    const calm = first.current || matchMedia('(prefers-reduced-motion: reduce)').matches;
    end.current?.scrollIntoView({ block: 'end', behavior: calm ? 'instant' : 'smooth' });
    first.current = false;
  }, [count]);
  return end;
}

/** Presence is a plain status line (precise layer): a dot plus words, never colour alone. */
export function Presence({ on }: { on: boolean }) {
  return (
    <p className="presence">
      <span className="presence-dot" data-on={on || undefined} aria-hidden="true" />
      <span key={String(on)} className="swap-in">{on ? 'Psihologul școlii e aici acum' : 'Psihologul nu e online. Îți răspunde în program, L–V 8–16.'}</span>
    </p>
  );
}

export function DemoTag() {
  return <span className="demo-tag">date demo</span>;
}

/** An empty state: a small drawing, one line of what will appear here. */
export function Empty({ ink, children }: { ink: InkName; children: React.ReactNode }) {
  return (
    <div className="empty">
      <Ink name={ink} width={150} />
      <p className="muted">{children}</p>
    </div>
  );
}

/** Crisis sheet: helplines first, then the psychologist. Shown when a message matches a crisis phrase. */
export function CrisisSheet({ open, onClose, onTalk }: { open: boolean; onClose: () => void; onTalk?: () => void }) {
  const title = useRef<HTMLHeadingElement>(null);
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent
        // Focus starts on the heading, never on a call button: a stray Enter must not dial.
        onOpenAutoFocus={(e) => { e.preventDefault(); title.current?.focus(); }}
        // Back to the field the student was writing in.
        onCloseAutoFocus={(e) => { e.preventDefault(); document.getElementById('msg')?.focus(); }}
      >
        <div className="breathe" aria-hidden="true"><Ink name="breath" width={150} /></div>
        <DialogTitle ref={title} tabIndex={-1} className="focus-target text-[length:var(--text-h2)] font-normal">Ce ai scris contează. Nu trebuie să treci singur sau singură prin asta.</DialogTitle>
        <DialogDescription>Psihologul școlii a primit un semnal și îți scrie cât de repede poate.</DialogDescription>
        <ul className="lines">
          {/* Numbers checked 2026-11-20: 116 111 Telefonul Copilului, free, daily 8–20; 119 child-abuse line, 24/7. Re-verify before any real launch. */}
          <li><Button asChild variant="destructive" size="block"><a href="tel:112">Ești în pericol acum? Sună la 112</a></Button></li>
          <li><Button asChild variant="secondary" size="block"><a href="tel:116111">Telefonul Copilului: 116 111 (gratuit, zilnic 8–20)</a></Button></li>
          <li><Button asChild variant="secondary" size="block"><a href="tel:119">Semnalează un abuz: 119 (non-stop)</a></Button></li>
        </ul>
        <p className="muted small">Respiră odată cu cercul de sus: inspiră cât crește, expiră cât scade.</p>
        <div className="row">
          {onTalk && <Button variant="secondary" onClick={onTalk}>Scrie-i psihologului</Button>}
          <Button variant="ghost" onClick={onClose}>Închide</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Composer with the crisis check. onSend receives the text and whether it is a crisis.
 *  No language filter: messages only go to the psychologist, and a student must be able to quote what was said to them. */
export function Composer({ onSend, label }: { onSend: (text: string, crisis: boolean) => void; label: string }) {
  const [text, setText] = useState('');
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setText('');
    onSend(t, isCrisis(t));
  }
  return (
    <form className="composer" onSubmit={submit}>
      <label htmlFor="msg" className="sr-only">{label}</label>
      <Textarea
        id="msg" rows={2} value={text} maxLength={1000} placeholder={label}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(e); } }}
      />
      <Button type="submit" disabled={!text.trim()}>Trimite</Button>
    </form>
  );
}

/** The four report steps as a line of segments with words, never colour alone. */
export function Steps({ status }: { status: Status }) {
  const at = STATUSES.indexOf(status);
  return (
    <ol className="steps" aria-label={`Stare: ${STATUS_LABEL[status]}`}>
      {STATUSES.map((st, i) => (
        <li key={st} data-done={i <= at || undefined} aria-current={i === at ? 'step' : undefined}>{STATUS_LABEL[st]}</li>
      ))}
    </ol>
  );
}

export function Thread({ msgs, me }: { msgs: Msg[]; me: 'elev' | 'psiholog' }) {
  const end = useScrollEnd(msgs.length);
  const fresh = useFresh(msgs.map((m) => m.id));
  return (
    <ol className="thread" aria-live="polite">
      {msgs.map((m) => (
        <li key={m.id} className={(m.from === me ? 'bubble mine' : 'bubble') + (fresh(m.id) ? ' arrive' : '')}>
          <p>{m.text}</p>
          <time className="muted small">{m.from === 'psiholog' ? 'Psiholog' : 'Elev'} · {time(m.at)}</time>
        </li>
      ))}
      <li ref={end} aria-hidden="true" />
    </ol>
  );
}
