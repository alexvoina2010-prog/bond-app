'use client';
import { useEffect, useRef, useState } from 'react';
import { checkMessage } from '../lib/filter.mjs';
import { time, type Msg } from '../lib/store';

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

/** The signature: lit only when a real person is online (DESIGN.md, Signature). */
export function Lamp({ on, size = 14 }: { on: boolean; size?: number }) {
  return <span className={on ? 'lamp lamp-on' : 'lamp'} style={{ width: size, height: size }} aria-hidden="true" />;
}

export function Presence({ on }: { on: boolean }) {
  return (
    <p className="presence">
      <Lamp on={on} />
      <span key={String(on)} className="swap-in">{on ? 'Psihologul școlii e aici acum' : 'Psihologul nu e online. Îți răspunde în program, L–V 8–16.'}</span>
    </p>
  );
}

export function DemoTag() {
  return <span className="demo-tag">date demo</span>;
}

/** Crisis sheet: helplines first, then the psychologist. Shown when a message matches a crisis phrase. */
export function CrisisSheet({ open, online, onClose, onTalk }: { open: boolean; online: boolean; onClose: () => void; onTalk?: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="sheet" onClose={onClose} aria-labelledby="crisis-title">
      {/* Unlit when the psychologist is offline; the outline still breathes as the guide. */}
      <div className="breathe" aria-hidden="true"><Lamp on={online} size={56} /></div>
      {/* Focus starts on the heading, never on a call button: a stray Enter must not dial. */}
      <h2 id="crisis-title" tabIndex={-1} autoFocus className="focus-target">Ce ai scris contează. Nu ești singur sau singură cu asta.</h2>
      <p>Psihologul școlii a fost anunțat și îți scrie cât de repede poate.</p>
      <ul className="lines">
        {/* Numbers checked 2026-11-20: 116 111 Telefonul Copilului, free, daily 8–20; 119 child-abuse line, 24/7. Re-verify before any real launch. */}
        <li><a className="btn btn-danger" href="tel:112">Ești în pericol acum? Sună la 112</a></li>
        <li><a className="btn btn-secondary" href="tel:116111">Telefonul Copilului: 116 111 (gratuit, zilnic 8–20)</a></li>
        <li><a className="btn btn-secondary" href="tel:119">Semnalează un abuz: 119 (non-stop)</a></li>
      </ul>
      <p className="muted small">Respiră odată cu {online ? 'lumina' : 'cercul'} de sus: inspiră cât crește, expiră cât scade.</p>
      <div className="row">
        {onTalk && <button className="btn btn-secondary" onClick={onTalk}>Scrie-i psihologului</button>}
        <button className="btn btn-ghost" onClick={onClose}>Închide</button>
      </div>
    </dialog>
  );
}

/** Composer with the language filter and crisis check. onSend receives the text and whether it is a crisis. */
export function Composer({ onSend, label }: { onSend: (text: string, crisis: boolean) => void; label: string }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const field = useRef<HTMLTextAreaElement>(null);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    const verdict = checkMessage(t);
    if (verdict === 'offensive') {
      setError('Mesajul are cuvinte jignitoare, așa că nu a fost trimis. Poți să-l reformulezi.');
      // Failed attempt: shake the field once (a remount would steal focus, so use WAAPI).
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        field.current?.animate({ transform: ['translateX(0)', 'translateX(-10px)', 'translateX(10px)', 'translateX(-6px)', 'translateX(6px)', 'translateX(-3px)', 'translateX(0)'] }, { duration: 360, easing: 'ease-out' });
      }
      return;
    }
    setError('');
    setText('');
    onSend(t, verdict === 'crisis');
  }
  return (
    <form className="composer" onSubmit={submit}>
      <label htmlFor="msg" className="sr-only">{label}</label>
      <textarea
        ref={field}
        id="msg" rows={2} value={text} maxLength={1000} placeholder={label}
        aria-invalid={!!error} aria-describedby={error ? 'msg-err' : undefined}
        onChange={(e) => { setText(e.target.value); if (error) setError(''); }}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(e); } }}
      />
      <button className="btn" type="submit" disabled={!text.trim()}>Trimite</button>
      {error && <p id="msg-err" className="error" role="alert">{error}</p>}
    </form>
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
