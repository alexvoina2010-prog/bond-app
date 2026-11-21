'use client';
import Link from 'next/link';
import { Presence } from '../../components/ui';
import { useDemo } from '../../lib/store';

const DOORS = [
  { href: '/elev/cercul', title: 'Intră în Cerc', text: 'Vorbești anonim cu alți elevi care au trecut prin asta.' },
  { href: '/elev/raport', title: 'Am văzut ceva', text: 'Spune ce s-a întâmplat cu altcineva, fără numele tău.' },
];

export default function StudentHome() {
  const s = useDemo();
  return (
    <>
      <div className="stack">
        <h1>Aici te ascultă cineva.</h1>
        <Presence on={s.psyOnline} />
      </div>
      <div className="stack-tight">
        <Link className="btn btn-block" href="/elev/psiholog">Vorbește cu psihologul</Link>
        <p className="muted small">Doar psihologul școlii vede cine ești.</p>
      </div>
      <ul className="doors">
        {DOORS.map((d) => (
          <li key={d.href}>
            <Link href={d.href}>
              <span><strong>{d.title}</strong><span className="muted">{d.text}</span></span>
              <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </Link>
          </li>
        ))}
      </ul>
      <p className="notice">Ești în pericol acum? <a href="tel:112"><b>Sună la 112.</b></a></p>
    </>
  );
}
