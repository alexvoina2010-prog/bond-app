'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Lamp } from '../../../components/ui';
import { KINDS, uid, update, useDemo } from '../../../lib/store';

const PLACES = ['În clasă', 'Pe hol', 'În curte', 'La toaletă', 'Pe drum spre școală', 'Online'];
const WHEN = ['Azi', 'Ieri', 'Săptămâna asta', 'Mai demult'];

export default function Report() {
  const s = useDemo();
  const [done, setDone] = useState(false);
  const thanks = useRef<HTMLHeadingElement>(null);
  // Move focus to the thank-you heading so screen readers announce that the report was sent.
  useEffect(() => { if (done) thanks.current?.focus(); }, [done]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    update((d) => {
      d.reports.unshift({
        id: uid(), kind: String(f.get('kind')), place: String(f.get('place')), when: String(f.get('when')),
        text: String(f.get('text') || '').trim(), anon: f.get('anon') === 'on', at: Date.now(), seen: false,
      });
    });
    setDone(true);
  }

  if (done) {
    return (
      <div className="stack done">
        <Lamp on={s.psyOnline} size={40} />
        <h1 ref={thanks} tabIndex={-1} className="focus-target">Mulțumim că ai spus.</h1>
        <p className="muted">Psihologul școlii a primit raportul. Ce ai văzut poate schimba ceva pentru cineva.</p>
        <Link className="btn" href="/elev">Înapoi acasă</Link>
      </div>
    );
  }

  return (
    <>
      <div className="stack">
        <h1>Am văzut ceva</h1>
        <p className="muted">Spune ce s-a întâmplat cu altcineva. Durează un minut.</p>
      </div>
      <form className="stack" onSubmit={submit}>
        <fieldset>
          <legend>Ce s-a întâmplat?</legend>
          {KINDS.map((k, i) => (
            <label key={k} className="choice"><input type="radio" name="kind" value={k} required defaultChecked={i === 0} />{k}</label>
          ))}
        </fieldset>
        <div className="two">
          <div>
            <label htmlFor="place">Unde?</label>
            <select id="place" name="place">{PLACES.map((p) => <option key={p}>{p}</option>)}</select>
          </div>
          <div>
            <label htmlFor="when">Când?</label>
            <select id="when" name="when">{WHEN.map((w) => <option key={w}>{w}</option>)}</select>
          </div>
        </div>
        <div>
          <label htmlFor="text">Câteva cuvinte despre ce ai văzut (opțional)</label>
          <textarea id="text" name="text" rows={4} maxLength={1000} placeholder="Nu e nevoie de nume. Spune doar ce ai văzut." />
        </div>
        <label className="choice"><input type="checkbox" name="anon" defaultChecked />Trimite anonim (nici psihologul nu vede cine ești)</label>
        <button className="btn" type="submit">Trimite raportul</button>
      </form>
    </>
  );
}
