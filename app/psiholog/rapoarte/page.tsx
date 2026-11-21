'use client';
import { time, update, useDemo } from '../../../lib/store';

export default function Reports() {
  const s = useDemo();
  return (
    <>
      <div className="stack">
        <h1>Rapoarte „Am văzut ceva"</h1>
        <p className="muted">Trimise de elevi care au văzut bullying. Cele anonime nu au nume nici pentru tine.</p>
      </div>
      <section className="panel">
        {s.reports.length === 0 ? (
          <p className="muted">Niciun raport încă.</p>
        ) : (
          <ul className="items">
            {s.reports.map((r) => (
              <li key={r.id}>
                <div className="item-head">
                  <span className="row" style={{ gap: 8 }}>{!r.seen && <span className="pill new">nou</span>}<b>{r.kind}</b></span>
                  <span className="muted small">{time(r.at)}</span>
                </div>
                <p className="muted small">{r.place} · {r.when} · {r.anon ? 'anonim' : 'cu nume'}</p>
                {r.text && <p>{r.text}</p>}
                {!r.seen && (
                  <div className="row">
                    <button className="btn btn-sm btn-secondary" onClick={() => update((d) => { d.reports.find((x) => x.id === r.id)!.seen = true; })}>Marchează ca văzut</button>
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
