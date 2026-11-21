'use client';
import Link from 'next/link';
import { DemoTag, useFresh } from '../../components/ui';
import { KINDS, time, update, useDemo } from '../../lib/store';

export default function Dashboard() {
  const s = useDemo();
  const open = s.alerts.filter((a) => !a.seen);
  const fresh = useFresh(s.alerts.map((a) => a.id));
  const crises = s.alerts.filter((a) => a.kind === 'criza').length;
  const byKind = KINDS.map((k) => [k, s.reports.filter((r) => r.kind === k).length] as const);
  const max = Math.max(1, ...byKind.map(([, n]) => n));

  return (
    <>
      <div className="stack">
        <h1>Panou</h1>
        <p className="muted">Ce are nevoie de tine azi, apoi imaginea de ansamblu a școlii, fără nume. <DemoTag /></p>
      </div>

      <section className="panel" aria-labelledby="al">
        <h2 id="al" className="h-sm">Alerte</h2>
        {open.length === 0 ? (
          <p className="muted">Nicio alertă nouă. Când un elev scrie ceva îngrijorător sau un mesaj e raportat, apare aici.</p>
        ) : (
          <ul className="items">
            {open.map((a) => (
              <li key={a.id} className={fresh(a.id) ? (a.kind === 'criza' ? 'arrive ring' : 'arrive') : undefined}>
                <div className="item-head">
                  <span className="row" style={{ gap: 8 }}>
                    <span className={a.kind === 'criza' ? 'pill danger' : 'pill'}>{a.kind === 'criza' ? 'Posibil pericol' : 'Mesaj raportat'}</span>
                    <b>{a.who}</b><span className="muted small">· {a.where}</span>
                  </span>
                  <span className="muted small">{time(a.at)}</span>
                </div>
                <p>„{a.text}"</p>
                <div className="row">
                  {a.kind === 'criza' && <Link className="btn btn-sm btn-secondary" href="/psiholog/conversatii">Scrie-i elevului</Link>}
                  <button className="btn btn-sm btn-secondary" onClick={() => update((d) => { d.alerts.find((x) => x.id === a.id)!.seen = true; })}>Am preluat</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="st" className="stack">
        <h2 id="st" className="h-sm">Școala, pe scurt</h2>
        <div className="tiles">
          <div className={crises ? 'tile hot' : 'tile'}><b>{crises}</b><span className="muted small">alerte de pericol</span></div>
          <div className="tile"><b>{s.reports.length}</b><span className="muted small">rapoarte „Am văzut ceva"</span></div>
          <div className="tile"><b>{s.circle.length}</b><span className="muted small">mesaje în Cerc</span></div>
          <div className="tile"><b>{s.bookings.length}</b><span className="muted small">programări</span></div>
        </div>
        <div className="panel">
          <h3>Rapoarte după tip</h3>
          <ul className="bars">
            {byKind.map(([k, n]) => (
              <li key={k}>
                <span>{k}</span>
                <span className="bar" role="img" aria-label={`${n} rapoarte`}><i style={{ width: `${(n / max) * 100}%` }} /></span>
                <b>{n}</b>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
