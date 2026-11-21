'use client';
import { useState } from 'react';
import { Composer, CrisisSheet, Presence, Thread } from '../../../components/ui';
import { ME, SLOTS, uid, update, useDemo } from '../../../lib/store';

export default function StudentPsy() {
  const s = useDemo();
  const [crisis, setCrisis] = useState(false);
  const [booking, setBooking] = useState(false);
  const thread = s.threads.find((t) => t.live)!;
  const mine = s.bookings.find((b) => b.who === ME);
  const taken = new Set(s.bookings.map((b) => b.slot));

  function send(text: string, isCrisis: boolean) {
    update((d) => {
      const at = Date.now();
      d.threads.find((t) => t.live)!.msgs.push({ id: uid(), from: 'elev', text, at });
      if (isCrisis) d.alerts.unshift({ id: uid(), kind: 'criza', where: 'Chat cu psihologul', who: ME, text, at, seen: false });
    });
    if (isCrisis) setCrisis(true);
  }

  function book(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const slot = String(f.get('slot') || '');
    if (!slot) return;
    update((d) => { d.bookings.push({ id: uid(), slot, who: ME, note: String(f.get('note') || ''), status: 'cerută' }); });
    setBooking(false);
  }

  return (
    <>
      <div className="stack">
        <h1>Psihologul școlii</h1>
        <Presence on={s.psyOnline} />
      </div>

      <section className="panel" aria-labelledby="b-title">
        <h2 id="b-title" className="h-sm">Discuție față în față</h2>
        {mine ? (
          <p role="status">{mine.slot}, la cabinet · <b>{mine.status === 'confirmată' ? 'confirmată' : 'așteaptă confirmarea'}</b></p>
        ) : booking ? (
          <form className="stack" onSubmit={book}>
            <fieldset>
              <legend>Alege o oră</legend>
              {SLOTS.map((slot) => (
                <label key={slot} className="choice">
                  <input type="radio" name="slot" value={slot} required disabled={taken.has(slot)} />
                  {slot}{taken.has(slot) && <span className="muted small"> · ocupat</span>}
                </label>
              ))}
            </fieldset>
            <div>
              <label htmlFor="note">Vrei să-i spui ceva înainte? (opțional)</label>
              <input id="note" name="note" maxLength={200} />
            </div>
            <div className="row">
              <button className="btn" type="submit">Cere programarea</button>
              <button className="btn btn-ghost" type="button" onClick={() => setBooking(false)}>Renunță</button>
            </div>
          </form>
        ) : (
          <button className="btn btn-secondary" onClick={() => setBooking(true)}>Programează-te la cabinet</button>
        )}
      </section>

      <section className="chat" aria-label="Conversația cu psihologul">
        <Thread msgs={thread.msgs} me="elev" />
        <Composer label="Scrie-i psihologului…" onSend={send} />
      </section>
      <CrisisSheet open={crisis} online={s.psyOnline} onClose={() => setCrisis(false)} />
    </>
  );
}
