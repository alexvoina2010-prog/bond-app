'use client';
import Link from 'next/link';
import { DemoTag, Empty, useFresh } from '@/components/bond';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { KINDS, time, update, useDemo } from '@/lib/store';

export default function Dashboard() {
  const s = useDemo();
  const open = s.alerts.filter((a) => !a.seen);
  const fresh = useFresh(s.alerts.map((a) => a.id));
  const crises = s.alerts.length;
  const waiting = s.reports.filter((r) => r.status === 'primit').length;
  const openReports = s.reports.filter((r) => r.status !== 'închis').length;
  const byKind = KINDS.map((k) => [k, s.reports.filter((r) => r.kind === k).length] as const);
  const max = Math.max(5, ...byKind.map(([, n]) => n)); // a floor of 5, so one report never draws a full bar

  return (
    <>
      <div className="stack">
        <h1>Panou</h1>
        <p className="muted">Ce are nevoie de tine azi, apoi imaginea de ansamblu a școlii, fără nume. <DemoTag /></p>
      </div>

      <section className="panel" aria-labelledby="al">
        <h2 id="al" className="h-sm">Alerte</h2>
        {open.length === 0 ? (
          <Empty ink="cup">Nicio alertă nouă. Când un elev scrie ceva îngrijorător, apare aici.</Empty>
        ) : (
          <ul className="items">
            {open.map((a) => (
              <li key={a.id} className={fresh(a.id) ? 'arrive ring' : undefined}>
                <div className="item-head">
                  <span className="row" style={{ gap: 8 }}>
                    <Badge variant="danger">Posibil pericol</Badge>
                    <b>{a.who}</b><span className="muted small">· {a.where}</span>
                  </span>
                  <span className="muted small">{time(a.at)}</span>
                </div>
                <p>„{a.text}”</p>
                <div className="row">
                  <Button asChild variant="secondary" size="sm"><Link href={a.where.startsWith('Raportul') ? '/psiholog/rapoarte' : '/psiholog/conversatii'}>Scrie-i elevului</Link></Button>
                  <Button variant="secondary" size="sm" onClick={() => update((d) => { d.alerts.find((x) => x.id === a.id)!.seen = true; })}>Am preluat</Button>
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
          <div className="tile"><b>{openReports}</b><span className="muted small">rapoarte deschise</span></div>
          <div className={waiting ? 'tile hot' : 'tile'}><b>{waiting}</b><span className="muted small">rapoarte fără răspuns</span></div>
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
