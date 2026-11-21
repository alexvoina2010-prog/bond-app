'use client';
import { useState } from 'react';
import { uid, update, useDemo } from '../../../lib/store';

export default function PsyResources() {
  const s = useDemo();
  const [saved, setSaved] = useState('');

  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const title = String(f.get('title')).trim();
    const body = String(f.get('body')).trim();
    if (!title || !body) return;
    update((d) => { d.articles.unshift({ id: uid(), title, body, minutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)) }); });
    form.reset();
    setSaved(`„${title}" e publicat pentru elevi.`);
  }

  return (
    <>
      <h1>Resurse</h1>
      <div className="two" style={{ alignItems: 'start' }}>
        <form className="panel" onSubmit={add}>
          <h2 className="h-sm">Scrie o resursă nouă</h2>
          <div><label htmlFor="title">Titlu</label><input id="title" name="title" required maxLength={80} /></div>
          <div><label htmlFor="body">Text</label><textarea id="body" name="body" rows={6} required maxLength={4000} /></div>
          <button className="btn" type="submit">Publică pentru elevi</button>
          {saved && <p className="ok-note" role="status">{saved}</p>}
        </form>
        <section className="panel" aria-labelledby="pub">
          <h2 id="pub" className="h-sm">Publicate ({s.articles.length})</h2>
          <ul className="items">
            {s.articles.map((a) => <li key={a.id}><b>{a.title}</b><span className="muted small">{a.minutes} min</span></li>)}
          </ul>
        </section>
      </div>
    </>
  );
}
