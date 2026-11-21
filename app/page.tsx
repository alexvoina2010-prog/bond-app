'use client';
import { useRouter } from 'next/navigation';
import { Lamp } from '../components/ui';
import { resetDemo, useDemo, useMounted } from '../lib/store';

export default function Entry() {
  const router = useRouter();
  const mounted = useMounted();
  const s = useDemo();
  return (
    <>
      <main className="entry">
        <p className="wordmark"><Lamp on={mounted && s.psyOnline} size={16} />bond</p>
        <div className="stack">
          <h1>Un loc sigur în care vorbești despre ce se întâmplă la școală.</h1>
          <p className="muted">Scrii psihologului școlii sau vorbești anonim cu alți elevi care au trecut prin același lucru.</p>
        </div>
        <form className="stack" onSubmit={(e) => { e.preventDefault(); router.push('/elev'); }}>
          <div>
            <label htmlFor="code">Codul școlii</label>
            <input id="code" defaultValue="CLJ-DEMO" autoComplete="off" />
          </div>
          <div>
            <label htmlFor="email">Emailul de la școală</label>
            <input id="email" type="email" defaultValue="elev.demo@scoala-demo.ro" autoComplete="off" />
          </div>
          <p className="muted small">Demo: datele sunt fictive și nu pleacă nicăieri. Doar psihologul ar vedea cine ești.</p>
          <button className="btn" type="submit">Intră ca elev</button>
          <button className="btn btn-secondary" type="button" onClick={() => router.push('/psiholog')}>Intră ca psiholog</button>
        </form>
        <p className="small muted">
          Pentru prezentare: deschide elevul și psihologul în două ferestre alăturate.{' '}
          <button className="link-btn" type="button" onClick={resetDemo}>Resetează datele demo</button>
        </p>
      </main>
      <footer className="made">bond · made by ttaavo</footer>
    </>
  );
}
