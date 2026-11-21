'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Composer, CrisisSheet, Empty, Steps, Thread } from '@/components/bond';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ME, STATUS_LABEL, time, uid, update, useDemo } from '@/lib/store';

export default function MyReports() {
  const s = useDemo();
  const [open, setOpen] = useState<string | null>(null);
  const [crisis, setCrisis] = useState(false);
  const mine = s.reports.filter((r) => r.mine);

  function reply(id: string, text: string, isCrisis: boolean) {
    update((d) => {
      const r = d.reports.find((x) => x.id === id)!;
      const at = Date.now();
      r.msgs.push({ id: uid(), from: 'elev', text, at });
      if (isCrisis) d.alerts.unshift({ id: uid(), kind: 'criza', where: `Raportul #${r.no}`, who: r.anon ? 'Anonim' : ME, text, at, seen: false });
    });
    if (isCrisis) setCrisis(true);
  }

  return (
    <>
      <div className="stack">
        <h1>Rapoartele mele</h1>
        <p className="muted">Doar tu le vezi aici. Psihologul îți răspunde în raport, în cel mult 2 zile de școală.</p>
      </div>
      {mine.length === 0 ? (
        <Empty ink="door">Încă nu ai trimis nimic. <Link href="/elev/raport">Spune ce s-a întâmplat</Link>.</Empty>
      ) : (
        <ul className="items">
          {mine.map((r) => {
            const isOpen = open === r.id;
            const news = r.msgs.at(-1)?.from === 'psiholog';
            return (
              <li key={r.id} className="stack-tight">
                <div className="item-head">
                  <span className="row" style={{ gap: 8 }}><b>Raportul #{r.no}</b>{news && <Badge variant="new">mesaj nou</Badge>}</span>
                  <span className="muted small">{time(r.at)}</span>
                </div>
                <Steps status={r.status} />
                {isOpen ? (
                  <div className="stack-tight">
                    <p className="muted small">{r.kind} · {r.place} · {r.when} · {r.anon ? 'anonim' : 'cu numele tău'}{r.cpcv ? ' · poate ajunge la CPCV, fără nume' : ''}</p>
                    {r.text && <p>{r.text}</p>}
                    {r.evidence.length > 0 && <p className="muted small">Dovezi: {r.evidence.join(', ')}</p>}
                    <section className="chat" aria-label={`Mesaje în raportul #${r.no}`}>
                      {r.msgs.length ? <Thread msgs={r.msgs} me="elev" /> : <p className="muted small">Încă nu ți-a răspuns nimeni. Stare: {STATUS_LABEL[r.status]}.</p>}
                      <Composer label="Răspunde psihologului…" onSend={(t, c) => reply(r.id, t, c)} />
                    </section>
                    <Button variant="ghost" size="sm" onClick={() => setOpen(null)}>Ascunde</Button>
                  </div>
                ) : (
                  <Button variant="secondary" size="sm" className="justify-self-start" onClick={() => setOpen(r.id)}>Deschide</Button>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <CrisisSheet open={crisis} onClose={() => setCrisis(false)} />
    </>
  );
}
