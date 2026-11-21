'use client';
import { useState } from 'react';
import { Composer, Thread } from '../../../components/ui';
import { time, uid, update, useDemo } from '../../../lib/store';

export default function Conversations() {
  const s = useDemo();
  const [id, setId] = useState('live');
  const t = s.threads.find((x) => x.id === id) ?? s.threads[0];

  function send(text: string) {
    update((d) => { d.threads.find((x) => x.id === t.id)!.msgs.push({ id: uid(), from: 'psiholog', text, at: Date.now() }); });
  }

  return (
    <>
      <h1>Conversații</h1>
      <div className="split">
        <nav aria-label="Elevi">
          <ul>
            {s.threads.map((x) => {
              const last = x.msgs.at(-1);
              return (
                <li key={x.id}>
                  <button aria-pressed={x.id === t.id} onClick={() => setId(x.id)}>
                    <span className="item-head"><b>{x.who}</b>{last?.from === 'elev' && <span className="pill new">nou</span>}</span>
                    <span className="muted small">{last ? `${time(last.at)} · ${last.text.slice(0, 48)}${last.text.length > 48 ? '…' : ''}` : ''}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <section className="panel chat" aria-label={`Conversația cu ${t.who}`}>
          <h2 className="h-sm">{t.who}</h2>
          <Thread msgs={t.msgs} me="psiholog" />
          <Composer label="Răspunde…" onSend={send} />
        </section>
      </div>
    </>
  );
}
