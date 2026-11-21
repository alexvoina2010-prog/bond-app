'use client';
import { Empty } from '@/components/bond';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { update, useDemo } from '@/lib/store';

export default function Bookings() {
  const s = useDemo();
  return (
    <>
      <h1>Programări</h1>
      <section className="panel">
        {s.bookings.length === 0 ? (
          <Empty ink="chairs">Nicio programare. Elevii se pot programa din aplicație.</Empty>
        ) : (
          <ul className="items">
            {s.bookings.map((b) => (
              <li key={b.id}>
                <div className="item-head">
                  <b>{b.slot}</b>
                  <Badge variant={b.status === 'cerută' ? 'new' : 'outline'}>{b.status}</Badge>
                </div>
                <p>{b.who}{b.note && <span className="muted"> · „{b.note}”</span>}</p>
                {b.status === 'cerută' && (
                  <div className="row">
                    <Button variant="secondary" size="sm" onClick={() => update((d) => { d.bookings.find((x) => x.id === b.id)!.status = 'confirmată'; })}>Confirmă</Button>
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
