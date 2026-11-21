'use client';
import { useState } from 'react';
import { Composer, Empty, Steps, Thread } from '@/components/bond';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { STATUS_LABEL, STATUSES, time, uid, update, useDemo, type Report } from '@/lib/store';

/** CSV for the school's violence-prevention commission: only reports the student allowed, never a name. */
function exportCpcv(reports: Report[]) {
  const rows = reports.filter((r) => r.cpcv);
  const q = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const head = ['Nr', 'Data', 'Tip', 'Loc', 'Când', 'Cui', 'Descriere', 'Dovezi', 'Stare'];
  const lines = rows.map((r) => [r.no, new Date(r.at).toLocaleDateString('ro-RO'), r.kind, r.place, r.when, r.self ? 'elevului care raportează' : 'altui elev', r.text, r.evidence.length, STATUS_LABEL[r.status]].map(q).join(','));
  // BOM so Excel opens the Romanian letters correctly.
  const blob = new Blob(['﻿' + [head.map(q).join(','), ...lines].join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `bond-cpcv-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
  return rows.length;
}

export default function Reports() {
  const s = useDemo();
  const [open, setOpen] = useState<string | null>(null);
  const [exported, setExported] = useState<number | null>(null);
  const setStatus = (id: string, st: Report['status']) => update((d) => { d.reports.find((x) => x.id === id)!.status = st; });

  function reply(id: string, text: string) {
    update((d) => {
      const r = d.reports.find((x) => x.id === id)!;
      r.msgs.push({ id: uid(), from: 'psiholog', text, at: Date.now() });
      if (r.status === 'primit') r.status = 'văzut'; // answering means it was seen
    });
  }

  return (
    <>
      <div className="stack">
        <h1>Rapoarte</h1>
        <p className="muted">Trimise de elevi cărora li s-a întâmplat ceva sau care au văzut. La cele anonime nu vezi cine a scris, dar îi poți răspunde. Elevul vede starea și răspunsul tău.</p>
        <div className="row">
          <Button variant="secondary" onClick={() => setExported(exportCpcv(s.reports))}>Export pentru comisia împotriva violenței (CPCV), fără nume</Button>
          {exported !== null && <span className="muted small" role="status">{exported} rapoarte exportate (doar cele permise de elevi).</span>}
        </div>
      </div>

      <details className="panel">
        <summary><b>Cum acționezi fără să arăți cine a scris</b></summary>
        <ul className="bullets">
          <li>Nu spune „mi-a spus cineva" și nu citi raportul în clasă.</li>
          <li>Observă întâi: o pauză, o oră, grupul în care se întâmplă.</li>
          <li>Vorbește cu mai mulți elevi, nu doar cu cel care ar putea fi bănuit că a spus.</li>
          <li>La ora de dirigenție, vorbește general, fără detalii din raport.</li>
          <li>Scrie-i elevului aici ce urmează, chiar dacă e doar „am văzut, mă ocup". Răspunsul promis: 2 zile de școală.</li>
        </ul>
      </details>

      <section className="panel">
        {s.reports.length === 0 ? (
          <Empty ink="cup">Niciun raport încă.</Empty>
        ) : (
          <ul className="items">
            {s.reports.map((r) => {
              const isOpen = open === r.id;
              return (
                <li key={r.id} className="stack-tight">
                  <div className="item-head">
                    <span className="row" style={{ gap: 8 }}>{r.status === 'primit' && <Badge variant="new">nou</Badge>}<b>#{r.no} · {r.kind}</b></span>
                    <span className="muted small">{time(r.at)}</span>
                  </div>
                  <p className="muted small">{r.place} · {r.when} · {r.self ? 'i s-a întâmplat lui/ei' : 'a văzut la altcineva'} · {r.anon ? 'anonim' : r.who}{r.evidence.length ? ` · ${r.evidence.length === 1 ? '1 dovadă' : `${r.evidence.length} dovezi`}` : ''}{r.cpcv ? ' · permis la CPCV' : ''}</p>
                  {r.text && <p>{r.text}</p>}
                  <Steps status={r.status} />
                  {isOpen ? (
                    <div className="stack-tight">
                      <div className="row" role="group" aria-label="Schimbă starea">
                        {STATUSES.slice(1).map((st) => (
                          <Button key={st} size="sm" variant={r.status === st ? 'default' : 'secondary'} aria-pressed={r.status === st} onClick={() => setStatus(r.id, st)}>{STATUS_LABEL[st]}</Button>
                        ))}
                      </div>
                      {r.evidence.length > 0 && <p className="muted small">Dovezi: {r.evidence.join(', ')}</p>}
                      <section className="chat" aria-label={`Mesaje în raportul #${r.no}`}>
                        {r.msgs.length > 0 && <Thread msgs={r.msgs} me="psiholog" />}
                        <Composer label="Răspunde elevului…" onSend={(t) => reply(r.id, t)} />
                      </section>
                      <Button variant="ghost" size="sm" className="justify-self-start" onClick={() => setOpen(null)}>Închide fereastra</Button>
                    </div>
                  ) : (
                    <Button variant="secondary" size="sm" className="justify-self-start" onClick={() => setOpen(r.id)}>Deschide</Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
