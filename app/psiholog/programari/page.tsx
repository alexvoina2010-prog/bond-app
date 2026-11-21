'use client';
import { update, useDemo } from '../../../lib/store';

export default function Bookings() {
  const s = useDemo();
  return (
    <>
      <h1>Programări</h1>
      <section className="panel">
        {s.bookings.length === 0 ? (
          <p className="muted">Nicio programare. Elevii se pot programa din aplicație.</p>
        ) : (
          <ul className="items">
            {s.bookings.map((b) => (
              <li key={b.id}>
                <div className="item-head">
                  <b>{b.slot}</b>
                  <span className={b.status === 'cerută' ? 'pill new' : 'pill'}>{b.status}</span>
                </div>
                <p>{b.who}{b.note && <span className="muted"> · „{b.note}"</span>}</p>
                {b.status === 'cerută' && (
                  <div className="row">
                    <button className="btn btn-sm btn-secondary" onClick={() => update((d) => { d.bookings.find((x) => x.id === b.id)!.status = 'confirmată'; })}>Confirmă</button>
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
