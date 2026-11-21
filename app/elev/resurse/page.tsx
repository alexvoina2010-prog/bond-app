'use client';
import { DemoTag } from '../../../components/ui';
import { useDemo } from '../../../lib/store';

export default function Resources() {
  const s = useDemo();
  return (
    <>
      <div className="stack">
        <h1>Resurse</h1>
        <p className="muted small">Scrise de psihologul școlii. <DemoTag /></p>
      </div>
      <div className="stack">
        {s.articles.map((a) => (
          <details key={a.id} className="panel">
            <summary><b>{a.title}</b> <span className="muted small">· {a.minutes} min</span></summary>
            <p>{a.body}</p>
          </details>
        ))}
      </div>
    </>
  );
}
