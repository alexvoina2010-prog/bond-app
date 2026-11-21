'use client';
import { Empty } from '@/components/bond';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { time, update, useDemo } from '@/lib/store';

export default function Reports() {
  const s = useDemo();
  return (
    <>
      <div className="stack">
        <h1>Rapoarte „Am văzut ceva”</h1>
        <p className="muted">Trimise de elevi care au văzut bullying. Cele anonime nu au nume nici pentru tine.</p>
      </div>
      <section className="panel">
        {s.reports.length === 0 ? (
          <Empty ink="cup">Niciun raport încă.</Empty>
        ) : (
          <ul className="items">
            {s.reports.map((r) => (
              <li key={r.id}>
                <div className="item-head">
                  <span className="row" style={{ gap: 8 }}>{!r.seen && <Badge variant="new">nou</Badge>}<b>{r.kind}</b></span>
                  <span className="muted small">{time(r.at)}</span>
                </div>
                <p className="muted small">{r.place} · {r.when} · {r.anon ? 'anonim' : 'cu nume'}</p>
                {r.text && <p>{r.text}</p>}
                {!r.seen && (
                  <div className="row">
                    <Button variant="secondary" size="sm" onClick={() => update((d) => { d.reports.find((x) => x.id === r.id)!.seen = true; })}>Marchează ca văzut</Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
