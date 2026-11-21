'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Composer, CrisisSheet, Empty, useFresh, useScrollEnd } from '@/components/bond';
import { Button } from '@/components/ui/button';
import { ME, time, uid, update, useDemo } from '@/lib/store';

export default function Circle() {
  const s = useDemo();
  const router = useRouter();
  const [crisis, setCrisis] = useState(false);
  const [held, setHeld] = useState('');
  const end = useScrollEnd(s.circle.length);
  const fresh = useFresh(s.circle.map((m) => m.id));

  function send(text: string, isCrisis: boolean) {
    const at = Date.now();
    if (isCrisis) {
      // A crisis message is not posted to peers: it goes to the psychologist only.
      update((d) => { d.alerts.unshift({ id: uid(), kind: 'criza', where: `Cercul (${d.myAlias})`, who: ME, text, at, seen: false }); });
      setHeld('Mesajul tău a ajuns doar la psiholog, nu în Cerc.');
      setCrisis(true);
      return;
    }
    setHeld('');
    update((d) => { d.circle.push({ id: uid(), alias: d.myAlias, text, at }); });
  }

  function report(id: string) {
    update((d) => {
      const m = d.circle.find((x) => x.id === id);
      if (!m || m.reported) return;
      m.reported = true;
      d.alerts.unshift({ id: uid(), kind: 'raportare', where: 'Cercul', who: m.alias, text: m.text, at: Date.now(), seen: false });
    });
  }

  return (
    <>
      <div className="stack">
        <h1>Cercul</h1>
        <p className="notice">Aici ești <b>{s.myAlias}</b>. Ceilalți elevi nu văd cine ești. Psihologul află doar dacă ești în pericol. Mesajele cu jigniri nu pleacă.</p>
      </div>
      <section className="chat" aria-label="Mesajele din Cerc">
        {s.circle.length === 0 && <Empty ink="circle">Nimeni n-a scris încă. Poți fi primul sau prima.</Empty>}
        <ol className="thread" aria-live="polite" style={{ gap: 0 }}>
          {s.circle.map((m) => (
            <li key={m.id} className={fresh(m.id) ? 'circle-msg arrive' : 'circle-msg'}>
              <div className="meta">
                <span className="alias">{m.alias === s.myAlias ? `${m.alias} (tu)` : m.alias}</span>
                <span className="muted small">{time(m.at)}</span>
              </div>
              {m.reported ? (
                <p className="muted small">Mesaj raportat. E ascuns până îl verifică psihologul.</p>
              ) : (
                <>
                  <p>{m.text}</p>
                  {m.alias !== s.myAlias && (
                    <Button variant="link" className="justify-self-start" onClick={() => report(m.id)} aria-label={`Raportează mesajul lui ${m.alias}`}>Raportează</Button>
                  )}
                </>
              )}
            </li>
          ))}
          <li ref={end} aria-hidden="true" />
        </ol>
        {held && <p className="ok-note" role="status">{held}</p>}
        <Composer label="Scrie în Cerc…" onSend={send} />
      </section>
      <CrisisSheet open={crisis} onClose={() => setCrisis(false)} onTalk={() => router.push('/elev/psiholog')} />
    </>
  );
}
