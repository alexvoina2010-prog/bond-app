'use client';
import { useState } from 'react';
import { Composer, CrisisSheet, Presence, Thread } from '@/components/bond';
import { Ink } from '@/components/ink';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioRow } from '@/components/ui/choice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ME, SLOTS, uid, update, useDemo } from '@/lib/store';

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
          <div className="moment">
            <Ink name="chairs" width={150} draw />
            <p role="status">{mine.slot}, la cabinet · <b>{mine.status === 'confirmată' ? 'confirmată' : 'așteaptă confirmarea'}</b></p>
          </div>
        ) : booking ? (
          <form className="stack" onSubmit={book}>
            <fieldset>
              <legend>Alege o oră</legend>
              <RadioGroup name="slot" required>
                {SLOTS.map((slot, i) => (
                  <RadioRow key={slot} id={`slot-${i}`} value={slot} disabled={taken.has(slot)}>
                    {slot}{taken.has(slot) && <span className="muted small"> · ocupat</span>}
                  </RadioRow>
                ))}
              </RadioGroup>
            </fieldset>
            <div>
              <Label htmlFor="note">Vrei să-i spui ceva înainte? (opțional)</Label>
              <Input id="note" name="note" maxLength={200} />
            </div>
            <div className="row">
              <Button type="submit">Cere programarea</Button>
              <Button variant="ghost" type="button" onClick={() => setBooking(false)}>Renunță</Button>
            </div>
          </form>
        ) : (
          <div className="stack-tight justify-items-start"><Button variant="secondary" onClick={() => setBooking(true)}>Programează-te la cabinet</Button><p className="muted small">Programarea o vede doar psihologul. Nu apare în orarul clasei.</p></div>
        )}
      </section>

      <section className="chat" aria-label="Conversația cu psihologul">
        <Thread msgs={thread.msgs} me="elev" />
        <Composer label="Scrie-i psihologului…" onSend={send} />
      </section>
      <CrisisSheet open={crisis} onClose={() => setCrisis(false)} />
    </>
  );
}
